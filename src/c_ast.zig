const std = @import("std");

pub const NodeIndex = u32;
pub const null_node: NodeIndex = std.math.maxInt(NodeIndex);

pub const Ast = struct {
    nodes: std.ArrayList(Node) = .empty,
    extra: std.ArrayList(NodeIndex) = .empty,
    string_pool: std.ArrayList(u8) = .empty,
    source: []const u8,
    allocator: std.mem.Allocator,

    pub fn init(allocator: std.mem.Allocator, source: []const u8) Ast {
        return .{ .source = source, .allocator = allocator };
    }

    pub fn deinit(self: *Ast) void {
        self.nodes.deinit(self.allocator);
        self.extra.deinit(self.allocator);
        self.string_pool.deinit(self.allocator);
    }

    pub fn addNode(self: *Ast, node: Node) !NodeIndex {
        const idx: NodeIndex = @intCast(self.nodes.items.len);
        try self.nodes.append(self.allocator, node);
        return idx;
    }

    pub fn addExtra(self: *Ast, idx: NodeIndex) !u32 {
        const pos: u32 = @intCast(self.extra.items.len);
        try self.extra.append(self.allocator, idx);
        return pos;
    }

    pub fn addExtraSlice(self: *Ast, indices: []const NodeIndex) !u32 {
        const pos: u32 = @intCast(self.extra.items.len);
        try self.extra.appendSlice(self.allocator, indices);
        return pos;
    }

    pub fn internString(self: *Ast, s: []const u8) !StringRef {
        const offset: u32 = @intCast(self.string_pool.items.len);
        try self.string_pool.appendSlice(self.allocator, s);
        return .{ .offset = offset, .len = @intCast(s.len) };
    }

    pub fn getString(self: *const Ast, ref: StringRef) []const u8 {
        return self.string_pool.items[ref.offset .. ref.offset + ref.len];
    }

    /// Map a source offset to a 1-based line number.
    pub fn lineNumber(self: *const Ast, offset: usize) usize {
        var n: usize = 1;
        const end = @min(offset, self.source.len);
        for (self.source[0..end]) |ch| {
            if (ch == '\n') n += 1;
        }
        return n;
    }
};

pub const StringRef = struct { offset: u32, len: u32 };

pub fn packStringRef(ref: StringRef) u32 {
    return (@as(u32, ref.len) << 16) | (ref.offset & 0xFFFF);
}

pub fn unpackStringRef(val: u32) StringRef {
    return .{ .offset = val & 0xFFFF, .len = val >> 16 };
}

pub const Node = struct {
    tag: Tag,
    data: Data,
    /// Source offset of the first token of this node (for diagnostics).
    loc: u32 = 0,

    pub const Tag = enum {
        /// Root of the translation unit.
        /// data: lhs = extra_start (child indices), rhs = count
        program,

        /// Variable declaration:  `int *p = malloc(...)`;
        /// data: lhs = packed name StringRef
        ///       rhs = initializer NodeIndex (or null_node)
        ///       extra index → [is_pointer (0/1), type_name_ref (packed)]
        var_decl,

        /// Function definition:
        /// data: lhs = packed name StringRef
        ///       rhs = body block NodeIndex
        ///       extra index → [param_count, param_0 … param_N]
        ///       Each param is a var_decl node.
        func_decl,

        /// Function call:  `malloc(sizeof(int))`  or  `free(p)`
        /// data: lhs = callee NodeIndex (identifier or member_expr)
        ///       rhs = extra_start → [arg_count, arg_0 … arg_N]
        call_expr,

        /// Assignment:  `p = malloc(…)`
        /// data: lhs = target NodeIndex
        ///       rhs = value NodeIndex
        assign_expr,

        /// Return statement:  `return p;`
        /// data: lhs = value NodeIndex (or null_node)
        return_stmt,

        /// Block / compound statement:
        /// data: lhs = extra_start, rhs = stmt_count
        block,

        /// If:  data: lhs = condition, rhs = then_block
        ///      extra index → [else_block (or null_node)]
        if_stmt,

        /// While:  data: lhs = condition, rhs = body
        while_stmt,

        /// For:  data: lhs = body
        ///       extra index → [init, cond, update]
        for_stmt,

        /// Expression statement (bare expression followed by ;).
        /// data: lhs = expression
        expr_stmt,

        /// Member access via `.` or `->`
        /// data: lhs = object, rhs = packed member name StringRef
        ///       extra index → [is_arrow (0/1)]
        member_expr,

        /// Pointer dereference: `*p`
        /// data: lhs = operand
        deref_expr,

        /// Address-of: `&x`
        /// data: lhs = operand
        addr_of_expr,

        /// Simple identifier reference.
        /// data: lhs = packed StringRef
        identifier,

        /// Numeric literal.
        number_lit,

        /// String literal.
        string_lit,

        /// NULL literal.
        null_lit,

        /// sizeof(…) expression.
        /// data: lhs = inner expr (or null_node)
        sizeof_expr,

        /// Cast expression: `(type *)expr`
        /// data: lhs = inner expr
        cast_expr,

        /// Opaque / unparsed expression (safety checker ignores these).
        opaque_expr,
    };

    pub const Data = struct {
        lhs: u32 = 0,
        rhs: u32 = 0,
        extra: u32 = 0,
    };
};
