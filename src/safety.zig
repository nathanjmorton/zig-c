const std = @import("std");
const ast_mod = @import("c_ast.zig");
const Ast = ast_mod.Ast;
const Node = ast_mod.Node;
const NodeIndex = ast_mod.NodeIndex;
const null_node = ast_mod.null_node;
const unpackStringRef = ast_mod.unpackStringRef;

// ── Pointer ownership state ──────────────────────────────────────────────

pub const PtrState = enum {
    uninitialized,
    owned, // holds heap allocation (malloc/calloc/new)
    borrowed, // points to another variable's allocation
    freed, // memory released via free/delete
    returned, // ownership transferred out via return
    null_state, // assigned NULL
};

pub const PtrInfo = struct {
    state: PtrState,
    /// Source offset where the state was last changed (for diagnostics).
    state_loc: u32 = 0,
    /// Source offset where the pointer was declared.
    decl_loc: u32 = 0,
    /// Is this a pointer variable?
    is_pointer: bool = false,
};

// ── Diagnostics ─────────────────────────────────────────────────────────

pub const Severity = enum { @"error", warning };

pub const Diagnostic = struct {
    severity: Severity,
    loc: u32, // source offset
    msg: []const u8,
    note_loc: u32 = 0, // optional related location
    note_msg: []const u8 = "",
};

// ── Safety checker ──────────────────────────────────────────────────────

pub const SafetyChecker = struct {
    tree: *const Ast,
    allocator: std.mem.Allocator,
    diagnostics: std.ArrayList(Diagnostic) = .empty,
    /// Stack of scopes. Each scope maps variable names → PtrInfo.
    scopes: std.ArrayList(std.StringHashMapUnmanaged(PtrInfo)) = .empty,

    pub fn init(tree: *const Ast, allocator: std.mem.Allocator) SafetyChecker {
        return .{ .tree = tree, .allocator = allocator };
    }

    pub fn deinit(self: *SafetyChecker) void {
        for (self.scopes.items) |*s| s.deinit(self.allocator);
        self.scopes.deinit(self.allocator);
        self.diagnostics.deinit(self.allocator);
    }

    // ── Public API ──────────────────────────────────────────────────

    pub fn check(self: *SafetyChecker, root: NodeIndex) !void {
        const node = self.tree.nodes.items[root];
        if (node.tag != .program) return;
        const start = node.data.lhs;
        const count = node.data.rhs;
        var i: u32 = 0;
        while (i < count) : (i += 1) {
            try self.checkNode(self.tree.extra.items[start + i]);
        }
    }

    pub fn hasErrors(self: *const SafetyChecker) bool {
        for (self.diagnostics.items) |d| {
            if (d.severity == .@"error") return true;
        }
        return false;
    }

    pub fn errorCount(self: *const SafetyChecker) usize {
        var n: usize = 0;
        for (self.diagnostics.items) |d| {
            if (d.severity == .@"error") n += 1;
        }
        return n;
    }

    pub fn warningCount(self: *const SafetyChecker) usize {
        var n: usize = 0;
        for (self.diagnostics.items) |d| {
            if (d.severity == .warning) n += 1;
        }
        return n;
    }

    // ── Node dispatch ───────────────────────────────────────────────

    fn checkNode(self: *SafetyChecker, idx: NodeIndex) anyerror!void {
        if (idx == null_node) return;
        const node = self.tree.nodes.items[idx];
        switch (node.tag) {
            .func_decl => try self.checkFuncDecl(idx, node),
            .var_decl => try self.checkVarDecl(node),
            .assign_expr => try self.checkAssign(node),
            .expr_stmt => try self.checkExprStmt(node),
            .return_stmt => try self.checkReturn(node),
            .block => try self.checkBlock(idx, node),
            .if_stmt => try self.checkIf(node),
            .while_stmt => try self.checkWhile(node),
            .for_stmt => try self.checkFor(node),
            else => {},
        }
    }

    // ── Function declarations ───────────────────────────────────────

    fn checkFuncDecl(self: *SafetyChecker, _: NodeIndex, node: Node) !void {
        try self.pushScope();

        // Register parameters
        const es = node.data.extra;
        const param_count = self.tree.extra.items[es];
        var i: u32 = 0;
        while (i < param_count) : (i += 1) {
            const param_idx = self.tree.extra.items[es + 1 + i];
            const param = self.tree.nodes.items[param_idx];
            if (param.tag == .var_decl) {
                const name = self.tree.getString(unpackStringRef(param.data.lhs));
                const pes = param.data.extra;
                const is_ptr = self.tree.extra.items[pes] != 0;
                if (is_ptr and name.len > 0) {
                    try self.define(name, .{
                        .state = .borrowed, // params are borrows from caller
                        .state_loc = param.loc,
                        .decl_loc = param.loc,
                        .is_pointer = true,
                    });
                }
            }
        }

        // Check body
        try self.checkNode(node.data.rhs);
        try self.popScopeWithLeakCheck();
    }

    // ── Variable declarations ───────────────────────────────────────

    fn checkVarDecl(self: *SafetyChecker, node: Node) !void {
        const name = self.tree.getString(unpackStringRef(node.data.lhs));
        const es = node.data.extra;
        const is_ptr = self.tree.extra.items[es] != 0;

        if (!is_ptr or name.len == 0) return;

        // Determine initial state from initializer
        const init_idx = node.data.rhs;
        const state = self.classifyExprAsState(init_idx);
        // Check if initializer uses a freed/uninit pointer
        try self.checkExprUses(init_idx);

        try self.define(name, .{
            .state = state,
            .state_loc = node.loc,
            .decl_loc = node.loc,
            .is_pointer = true,
        });
    }

    // ── Assignments ─────────────────────────────────────────────────

    fn checkAssign(self: *SafetyChecker, node: Node) !void {
        // If the LHS is a dereference (*p = value), this is writing through
        // the pointer, not reassigning the pointer itself.  Only check for
        // use-after-free on the pointer being dereferenced.
        const lhs_node = self.tree.nodes.items[node.data.lhs];
        if (lhs_node.tag == .deref_expr or lhs_node.tag == .member_expr) {
            try self.checkExprUses(node.data.lhs);
            try self.checkExprUses(node.data.rhs);
            return;
        }

        const target_name = self.resolveIdentName(node.data.lhs);
        if (target_name == null) return;

        // Check RHS for uses of freed/uninit pointers
        try self.checkExprUses(node.data.rhs);

        if (self.lookup(target_name.?)) |info| {
            if (!info.is_pointer) return;
            // Assigning to an owned pointer that hasn't been freed = leak
            if (info.state == .owned) {
                try self.emitWarning(node.loc, "memory leak", info.state_loc,
                    "previous allocation was never freed");
            }
        }

        const new_state = self.classifyExprAsState(node.data.rhs);
        self.updateState(target_name.?, new_state, node.loc);
    }

    // ── Expression statements (free, other calls, uses) ──────────

    fn checkExprStmt(self: *SafetyChecker, node: Node) !void {
        const expr_idx = node.data.lhs;
        if (expr_idx == null_node) return;
        const expr = self.tree.nodes.items[expr_idx];

        // Special-case: free(p) / delete p
        if (expr.tag == .call_expr) {
            if (self.isFreeCall(expr)) {
                try self.handleFree(expr);
                return;
            }
        }

        // General: check for uses of freed/uninit pointers in the expression
        try self.checkExprUses(expr_idx);
    }

    fn handleFree(self: *SafetyChecker, call: Node) !void {
        const arg_es = call.data.rhs;
        const arg_count = self.tree.extra.items[arg_es];
        if (arg_count == 0) return;

        const arg_idx = self.tree.extra.items[arg_es + 1];
        const arg_name = self.resolveIdentName(arg_idx);
        if (arg_name == null) return;

        if (self.lookup(arg_name.?)) |info| {
            if (info.state == .freed) {
                try self.emitError(call.loc, "double free", info.state_loc,
                    "previously freed here");
            } else if (info.state == .uninitialized) {
                try self.emitError(call.loc, "freeing uninitialized pointer", info.decl_loc,
                    "declared here without initialization");
            } else if (info.state == .null_state) {
                // free(NULL) is defined as a no-op in C — not an error
            }
        }

        self.updateState(arg_name.?, .freed, call.loc);
    }

    // ── Return statements ───────────────────────────────────────────

    fn checkReturn(self: *SafetyChecker, node: Node) !void {
        const val = node.data.lhs;
        if (val == null_node) return;

        // Check for returning address of local
        const val_node = self.tree.nodes.items[val];
        if (val_node.tag == .addr_of_expr) {
            const inner_name = self.resolveIdentName(val_node.data.lhs);
            if (inner_name != null) {
                if (self.lookup(inner_name.?)) |info| {
                    if (!info.is_pointer) {
                        // Taking address of a non-pointer local — dangling
                        try self.emitError(node.loc, "dangling return",
                            info.decl_loc, "returning address of stack-local variable");
                    }
                }
            }
        }

        // Check for uses of freed/uninit pointers in return value
        try self.checkExprUses(val);

        // Mark returned pointers so they're exempt from leak check
        const ret_name = self.resolveIdentName(val);
        if (ret_name != null) {
            self.updateState(ret_name.?, .returned, node.loc);
        }
    }

    // ── Blocks and control flow ─────────────────────────────────────

    fn checkBlock(self: *SafetyChecker, _: NodeIndex, node: Node) !void {
        try self.pushScope();
        const start = node.data.lhs;
        const count = node.data.rhs;
        var i: u32 = 0;
        while (i < count) : (i += 1) {
            try self.checkNode(self.tree.extra.items[start + i]);
        }
        try self.popScopeWithLeakCheck();
    }

    fn checkIf(self: *SafetyChecker, node: Node) !void {
        try self.checkNode(node.data.rhs); // then branch
        const else_idx = self.tree.extra.items[node.data.extra];
        if (else_idx != null_node) try self.checkNode(else_idx);
    }

    fn checkWhile(self: *SafetyChecker, node: Node) !void {
        try self.checkNode(node.data.rhs);
    }

    fn checkFor(self: *SafetyChecker, node: Node) !void {
        try self.checkNode(node.data.lhs); // body
    }

    // ── Expression use checking ─────────────────────────────────────

    /// Recursively check if an expression uses a freed or uninitialized pointer.
    fn checkExprUses(self: *SafetyChecker, idx: NodeIndex) !void {
        if (idx == null_node) return;
        const node = self.tree.nodes.items[idx];
        switch (node.tag) {
            .identifier => {
                const name = self.tree.getString(unpackStringRef(node.data.lhs));
                if (self.lookup(name)) |info| {
                    if (info.is_pointer and info.state == .freed) {
                        try self.emitError(node.loc, "use after free", info.state_loc,
                            "freed here");
                    }
                }
            },
            .deref_expr => {
                // Dereferencing — check the pointer
                try self.checkExprUses(node.data.lhs);
                // Also specifically check for deref of freed/uninit
                const inner_name = self.resolveIdentName(node.data.lhs);
                if (inner_name != null) {
                    if (self.lookup(inner_name.?)) |info| {
                        if (info.is_pointer and info.state == .uninitialized) {
                            try self.emitError(node.loc, "dereference of uninitialized pointer",
                                info.decl_loc, "declared here without initialization");
                        }
                    }
                }
            },
            .member_expr => {
                // Check the object for use-after-free (especially ptr->field)
                const is_arrow = self.tree.extra.items[node.data.extra] != 0;
                if (is_arrow) {
                    const obj_name = self.resolveIdentName(node.data.lhs);
                    if (obj_name != null) {
                        if (self.lookup(obj_name.?)) |info| {
                            if (info.is_pointer and info.state == .freed) {
                                try self.emitError(node.loc, "use after free", info.state_loc,
                                    "freed here");
                            }
                        }
                    }
                }
                try self.checkExprUses(node.data.lhs);
            },
            .call_expr => {
                // Check arguments
                const arg_es = node.data.rhs;
                const arg_count = self.tree.extra.items[arg_es];
                var i: u32 = 0;
                while (i < arg_count) : (i += 1) {
                    try self.checkExprUses(self.tree.extra.items[arg_es + 1 + i]);
                }
            },
            .addr_of_expr => try self.checkExprUses(node.data.lhs),
            .cast_expr => try self.checkExprUses(node.data.lhs),
            .opaque_expr => try self.checkExprUses(node.data.lhs),
            else => {},
        }
    }

    // ── State classification helpers ────────────────────────────────

    /// Determine what ownership state an expression would produce.
    fn classifyExprAsState(self: *SafetyChecker, idx: NodeIndex) PtrState {
        if (idx == null_node) return .uninitialized;
        const node = self.tree.nodes.items[idx];
        return switch (node.tag) {
            .call_expr => blk: {
                // Is it malloc/calloc/realloc/new?
                if (self.isAllocCall(node)) break :blk .owned;
                break :blk .borrowed; // conservative: unknown function returns a borrow
            },
            .null_lit => .null_state,
            .number_lit => .null_state, // e.g. `int *p = 0;`
            .identifier => .borrowed, // assigned from another variable
            .cast_expr => self.classifyExprAsState(node.data.lhs),
            .addr_of_expr => .borrowed,
            else => .borrowed,
        };
    }

    fn isAllocCall(self: *SafetyChecker, call: Node) bool {
        const callee_idx = call.data.lhs;
        if (callee_idx == null_node) return false;
        const callee = self.tree.nodes.items[callee_idx];
        if (callee.tag != .identifier) return false;
        const name = self.tree.getString(unpackStringRef(callee.data.lhs));
        return std.mem.eql(u8, name, "malloc") or
            std.mem.eql(u8, name, "calloc") or
            std.mem.eql(u8, name, "realloc") or
            std.mem.eql(u8, name, "new");
    }

    fn isFreeCall(self: *SafetyChecker, call: Node) bool {
        const callee_idx = call.data.lhs;
        if (callee_idx == null_node) return false;
        const callee = self.tree.nodes.items[callee_idx];
        if (callee.tag != .identifier) return false;
        const name = self.tree.getString(unpackStringRef(callee.data.lhs));
        return std.mem.eql(u8, name, "free") or std.mem.eql(u8, name, "delete");
    }

    /// Resolve the innermost identifier name from an expression.
    fn resolveIdentName(self: *SafetyChecker, idx: NodeIndex) ?[]const u8 {
        if (idx == null_node) return null;
        const node = self.tree.nodes.items[idx];
        return switch (node.tag) {
            .identifier => self.tree.getString(unpackStringRef(node.data.lhs)),
            .deref_expr => self.resolveIdentName(node.data.lhs),
            .cast_expr => self.resolveIdentName(node.data.lhs),
            else => null,
        };
    }

    // ── Scope management ────────────────────────────────────────────

    fn pushScope(self: *SafetyChecker) !void {
        try self.scopes.append(self.allocator, std.StringHashMapUnmanaged(PtrInfo).empty);
    }

    fn popScopeWithLeakCheck(self: *SafetyChecker) !void {
        if (self.scopes.items.len == 0) return;
        var scope = self.scopes.pop().?;
        var it = scope.iterator();
        while (it.next()) |entry| {
            const info = entry.value_ptr.*;
            if (info.is_pointer and info.state == .owned) {
                try self.emitWarning(info.decl_loc, "memory leak", info.state_loc,
                    "allocation goes out of scope without being freed");
            }
        }
        scope.deinit(self.allocator);
    }

    fn define(self: *SafetyChecker, name: []const u8, info: PtrInfo) !void {
        if (self.scopes.items.len > 0) {
            try self.scopes.items[self.scopes.items.len - 1].put(self.allocator, name, info);
        }
    }

    fn lookup(self: *SafetyChecker, name: []const u8) ?PtrInfo {
        var i: usize = self.scopes.items.len;
        while (i > 0) {
            i -= 1;
            if (self.scopes.items[i].get(name)) |info| return info;
        }
        return null;
    }

    fn updateState(self: *SafetyChecker, name: []const u8, state: PtrState, loc: u32) void {
        // Update in the scope where the variable was defined
        var i: usize = self.scopes.items.len;
        while (i > 0) {
            i -= 1;
            if (self.scopes.items[i].getPtr(name)) |info| {
                info.state = state;
                info.state_loc = loc;
                return;
            }
        }
    }

    // ── Diagnostic emission ─────────────────────────────────────────

    fn emitError(self: *SafetyChecker, loc: u32, msg: []const u8, note_loc: u32, note_msg: []const u8) !void {
        try self.diagnostics.append(self.allocator, .{
            .severity = .@"error",
            .loc = loc,
            .msg = msg,
            .note_loc = note_loc,
            .note_msg = note_msg,
        });
    }

    fn emitWarning(self: *SafetyChecker, loc: u32, msg: []const u8, note_loc: u32, note_msg: []const u8) !void {
        try self.diagnostics.append(self.allocator, .{
            .severity = .warning,
            .loc = loc,
            .msg = msg,
            .note_loc = note_loc,
            .note_msg = note_msg,
        });
    }
};

// ── Convenience: run full pipeline on source string ─────────────────────

const Parser = @import("c_parser.zig").Parser;

pub fn analyseSource(allocator: std.mem.Allocator, source: []const u8) !SafetyChecker {
    var parser = Parser.init(source, allocator);
    defer parser.deinit();
    const root = try parser.parse();
    var checker = SafetyChecker.init(&parser.tree, allocator);
    try checker.check(root);
    return checker;
}
