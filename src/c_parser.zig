const std = @import("std");
const Token = @import("c_token.zig").Token;
const Lexer = @import("c_lexer.zig").Lexer;
const ast_mod = @import("c_ast.zig");
const Ast = ast_mod.Ast;
const Node = ast_mod.Node;
const NodeIndex = ast_mod.NodeIndex;
const null_node = ast_mod.null_node;
const packStringRef = ast_mod.packStringRef;

/// Simplified C/C++ parser.
///
/// This is intentionally *not* a full C parser.  It recognises the patterns
/// needed for memory-safety analysis and silently skips everything else.
pub const Parser = struct {
    lexer: Lexer,
    tree: Ast,
    current: Token,
    prev: Token,
    allocator: std.mem.Allocator,

    pub fn init(source: []const u8, allocator: std.mem.Allocator) Parser {
        var lexer = Lexer.init(source);
        const first = lexer.next();
        return .{
            .lexer = lexer,
            .tree = Ast.init(allocator, source),
            .current = first,
            .prev = first,
            .allocator = allocator,
        };
    }

    pub fn deinit(self: *Parser) void {
        _ = self;
    }

    // ── Public entry point ───────────────────────────────────────────────

    pub fn parse(self: *Parser) !NodeIndex {
        var stmts: std.ArrayList(NodeIndex) = .empty;
        defer stmts.deinit(self.allocator);
        while (self.current.tag != .eof) {
            const stmt = try self.parseTopLevel();
            if (stmt != null_node) try stmts.append(self.allocator, stmt);
        }
        const extra_start = try self.tree.addExtraSlice(stmts.items);
        return self.tree.addNode(.{
            .tag = .program,
            .data = .{ .lhs = extra_start, .rhs = @intCast(stmts.items.len) },
        });
    }

    // ── Top-level ────────────────────────────────────────────────────────

    fn parseTopLevel(self: *Parser) !NodeIndex {
        // Skip preprocessor tokens
        if (self.current.tag == .hash) { self.bump(); return null_node; }

        // Skip typedef / struct definitions we don't need to analyse
        if (self.current.tag == .kw_typedef) { self.skipToSemicolon(); return null_node; }

        // Try to parse a declaration or function definition
        if (self.looksLikeDeclaration()) {
            return self.parseDeclOrFunc();
        }

        // Anything else at the top level — skip to next semicolon or brace
        self.skipToSemicolonOrBrace();
        return null_node;
    }

    // ── Declarations & function definitions ──────────────────────────────

    /// Heuristic: does the current token start what could be a C declaration?
    fn looksLikeDeclaration(self: *Parser) bool {
        return Token.isTypeKeyword(self.current.tag) or
            (self.current.tag == .identifier and self.peekIsDeclaratorStart());
    }

    /// After an identifier, peek to see if the next tokens look like a
    /// declarator (i.e.  `*` or `identifier`).  We exclude `(` because
    /// `name(...)` inside a function body is a function call, not a
    /// declaration.  Top-level function definitions are handled separately.
    fn peekIsDeclaratorStart(self: *Parser) bool {
        // Save state
        const saved_pos = self.lexer.pos;
        const saved_current = self.current;
        // Peek one token ahead
        const next_tok = self.lexer.next();
        // Restore
        self.lexer.pos = saved_pos;
        self.current = saved_current;
        return next_tok.tag == .star or next_tok.tag == .identifier;
    }

    /// Parse either a variable declaration or function definition.
    ///
    /// Strategy: consume type specifiers + stars, then identifier.
    /// If followed by `(` → function definition.
    /// Otherwise → variable declaration.
    fn parseDeclOrFunc(self: *Parser) !NodeIndex {
        const start_loc: u32 = @intCast(self.current.loc.start);

        // Consume type-specifier keywords (const, static, unsigned, int, etc.)
        var is_pointer = false;
        var type_name: []const u8 = "";
        self.consumeTypeSpecifiers(&type_name);

        // Consume pointer stars
        while (self.current.tag == .star) {
            is_pointer = true;
            self.bump();
        }

        // Expect identifier (name of variable or function)
        if (self.current.tag != .identifier) {
            // Not something we can parse — skip
            self.skipToSemicolonOrBrace();
            return null_node;
        }
        const name = self.current.slice(self.tree.source);
        self.bump();

        // Function definition: name followed by `(`
        if (self.current.tag == .lparen) {
            return self.parseFuncDef(name, start_loc);
        }

        // Variable declaration — possibly with initializer
        return self.parseVarDecl(name, is_pointer, type_name, start_loc);
    }

    fn consumeTypeSpecifiers(self: *Parser, type_name: *[]const u8) void {
        // Consume all type-specifier keywords, keeping the last "core" type name.
        while (Token.isTypeKeyword(self.current.tag)) {
            switch (self.current.tag) {
                // Core type — remember it
                .kw_int, .kw_char, .kw_void, .kw_float, .kw_double,
                .kw_short, .kw_long, .kw_size_t,
                => {
                    type_name.* = self.current.slice(self.tree.source);
                    self.bump();
                },
                // struct Name
                .kw_struct => {
                    self.bump();
                    if (self.current.tag == .identifier) {
                        type_name.* = self.current.slice(self.tree.source);
                        self.bump();
                    }
                    // Skip struct body if present
                    if (self.current.tag == .lbrace) {
                        self.skipBraces();
                    }
                },
                // Qualifiers / storage class — just consume
                else => self.bump(),
            }
        }
        // Also accept a plain identifier as a type name (e.g. `MyType *p`)
        if (type_name.len == 0 and self.current.tag == .identifier) {
            type_name.* = self.current.slice(self.tree.source);
            self.bump();
        }
    }

    fn parseVarDecl(self: *Parser, name: []const u8, is_pointer: bool, type_name: []const u8, loc: u32) !NodeIndex {
        // Handle array declarator `int arr[10]` — treat as non-pointer for now
        if (self.current.tag == .lbracket) {
            self.skipBrackets();
        }

        var init_expr: NodeIndex = null_node;
        if (self.current.tag == .assign) {
            self.bump();
            init_expr = try self.parseExpression();
        }

        // Handle comma-separated declarations (simplified: skip them)
        while (self.current.tag == .comma) {
            self.bump();
            self.skipToSemicolon();
            break;
        }

        if (self.current.tag == .semicolon) self.bump();

        const name_ref = try self.tree.internString(name);
        const type_ref = try self.tree.internString(type_name);
        const es = try self.tree.addExtra(if (is_pointer) @as(u32, 1) else @as(u32, 0));
        _ = try self.tree.addExtra(packStringRef(type_ref));
        return self.tree.addNode(.{
            .tag = .var_decl,
            .data = .{ .lhs = packStringRef(name_ref), .rhs = init_expr, .extra = es },
            .loc = loc,
        });
    }

    fn parseFuncDef(self: *Parser, name: []const u8, loc: u32) !NodeIndex {
        self.bump(); // consume `(`

        // Parse parameters
        var params: std.ArrayList(NodeIndex) = .empty;
        defer params.deinit(self.allocator);
        while (self.current.tag != .rparen and self.current.tag != .eof) {
            // Skip `void` as sole param
            if (self.current.tag == .kw_void and self.peek() == .rparen) {
                self.bump();
                break;
            }
            const param = try self.parseParam();
            if (param != null_node) try params.append(self.allocator, param);
            if (self.current.tag == .comma) self.bump();
        }
        if (self.current.tag == .rparen) self.bump();

        // If followed by semicolon, this is a forward declaration — skip
        if (self.current.tag == .semicolon) {
            self.bump();
            return null_node;
        }

        // Parse function body
        var body: NodeIndex = null_node;
        if (self.current.tag == .lbrace) {
            body = try self.parseBlock();
        }

        const name_ref = try self.tree.internString(name);
        const es = try self.tree.addExtra(@intCast(params.items.len));
        for (params.items) |p| _ = try self.tree.addExtra(p);
        return self.tree.addNode(.{
            .tag = .func_decl,
            .data = .{ .lhs = packStringRef(name_ref), .rhs = body, .extra = es },
            .loc = loc,
        });
    }

    fn parseParam(self: *Parser) !NodeIndex {
        const start_loc: u32 = @intCast(self.current.loc.start);
        var is_pointer = false;
        var type_name: []const u8 = "";
        self.consumeTypeSpecifiers(&type_name);
        while (self.current.tag == .star) { is_pointer = true; self.bump(); }

        var name: []const u8 = "";
        if (self.current.tag == .identifier) {
            name = self.current.slice(self.tree.source);
            self.bump();
        }
        // Skip array brackets in params
        if (self.current.tag == .lbracket) self.skipBrackets();

        const name_ref = try self.tree.internString(name);
        const type_ref = try self.tree.internString(type_name);
        const es = try self.tree.addExtra(if (is_pointer) @as(u32, 1) else @as(u32, 0));
        _ = try self.tree.addExtra(packStringRef(type_ref));
        return self.tree.addNode(.{
            .tag = .var_decl,
            .data = .{ .lhs = packStringRef(name_ref), .rhs = null_node, .extra = es },
            .loc = start_loc,
        });
    }

    // ── Statements ──────────────────────────────────────────────────────

    fn parseBlock(self: *Parser) !NodeIndex {
        if (self.current.tag != .lbrace) return null_node;
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `{`

        var stmts: std.ArrayList(NodeIndex) = .empty;
        defer stmts.deinit(self.allocator);
        while (self.current.tag != .rbrace and self.current.tag != .eof) {
            const stmt = try self.parseStatement();
            if (stmt != null_node) try stmts.append(self.allocator, stmt);
        }
        if (self.current.tag == .rbrace) self.bump();

        const es = try self.tree.addExtraSlice(stmts.items);
        return self.tree.addNode(.{
            .tag = .block,
            .data = .{ .lhs = es, .rhs = @intCast(stmts.items.len) },
            .loc = loc,
        });
    }

    fn parseStatement(self: *Parser) !NodeIndex {
        // Skip preprocessor
        if (self.current.tag == .hash) { self.bump(); return null_node; }

        // Return
        if (self.current.tag == .kw_return) return self.parseReturn();

        // If
        if (self.current.tag == .kw_if) return self.parseIf();

        // While
        if (self.current.tag == .kw_while) return self.parseWhile();

        // For
        if (self.current.tag == .kw_for) return self.parseFor();

        // Block
        if (self.current.tag == .lbrace) return self.parseBlock();

        // free(…) as a statement
        if (self.current.tag == .kw_free) return self.parseFreeOrDeleteStmt();

        // delete …
        if (self.current.tag == .kw_delete) return self.parseFreeOrDeleteStmt();

        // Declaration
        if (self.looksLikeDeclaration()) return self.parseDeclOrFunc();

        // Expression statement (assignment, function call, etc.)
        return self.parseExprStmt();
    }

    fn parseReturn(self: *Parser) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `return`
        var val: NodeIndex = null_node;
        if (self.current.tag != .semicolon and self.current.tag != .eof) {
            val = try self.parseExpression();
        }
        if (self.current.tag == .semicolon) self.bump();
        return self.tree.addNode(.{
            .tag = .return_stmt,
            .data = .{ .lhs = val },
            .loc = loc,
        });
    }

    fn parseIf(self: *Parser) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `if`
        // Skip condition (we don't analyse it for safety)
        if (self.current.tag == .lparen) self.skipParens();
        const then_body = try self.parseStatementOrBlock();
        var else_body: NodeIndex = null_node;
        if (self.current.tag == .kw_else) {
            self.bump();
            else_body = try self.parseStatementOrBlock();
        }
        const es = try self.tree.addExtra(else_body);
        return self.tree.addNode(.{
            .tag = .if_stmt,
            .data = .{ .lhs = null_node, .rhs = then_body, .extra = es },
            .loc = loc,
        });
    }

    fn parseWhile(self: *Parser) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `while`
        if (self.current.tag == .lparen) self.skipParens();
        const body = try self.parseStatementOrBlock();
        return self.tree.addNode(.{
            .tag = .while_stmt,
            .data = .{ .lhs = null_node, .rhs = body },
            .loc = loc,
        });
    }

    fn parseFor(self: *Parser) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `for`
        // We skip the for-header entirely (init/cond/update) since the
        // important stuff is in the body.
        if (self.current.tag == .lparen) self.skipParens();
        const body = try self.parseStatementOrBlock();
        const es = try self.tree.addExtra(null_node);
        _ = try self.tree.addExtra(null_node);
        _ = try self.tree.addExtra(null_node);
        return self.tree.addNode(.{
            .tag = .for_stmt,
            .data = .{ .lhs = body, .extra = es },
            .loc = loc,
        });
    }

    fn parseFreeOrDeleteStmt(self: *Parser) !NodeIndex {
        // Parse `free(expr)` or `delete expr` as a call_expr wrapped in expr_stmt.
        const loc: u32 = @intCast(self.current.loc.start);
        const callee_name = self.current.slice(self.tree.source);
        self.bump(); // consume `free` / `delete`

        // For `delete[]` (C++)
        if (self.current.tag == .lbracket) {
            self.bump();
            if (self.current.tag == .rbracket) self.bump();
        }

        var arg: NodeIndex = null_node;
        if (self.current.tag == .lparen) {
            self.bump();
            if (self.current.tag != .rparen) arg = try self.parseExpression();
            if (self.current.tag == .rparen) self.bump();
        } else {
            // `delete expr;`
            arg = try self.parseExpression();
        }
        if (self.current.tag == .semicolon) self.bump();

        // Build: call_expr(identifier("free"), [arg])
        const callee_ref = try self.tree.internString(callee_name);
        const callee_node = try self.tree.addNode(.{
            .tag = .identifier,
            .data = .{ .lhs = packStringRef(callee_ref) },
            .loc = loc,
        });
        const arg_extra = try self.tree.addExtra(if (arg != null_node) @as(u32, 1) else @as(u32, 0));
        if (arg != null_node) _ = try self.tree.addExtra(arg);
        const call_node = try self.tree.addNode(.{
            .tag = .call_expr,
            .data = .{ .lhs = callee_node, .rhs = arg_extra },
            .loc = loc,
        });
        return self.tree.addNode(.{
            .tag = .expr_stmt,
            .data = .{ .lhs = call_node },
            .loc = loc,
        });
    }

    fn parseExprStmt(self: *Parser) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        const expr = try self.parseExpression();
        if (expr == null_node) {
            // If we couldn't parse anything, skip to semicolon to avoid infinite loop
            self.skipToSemicolon();
            return null_node;
        }

        // Check for assignment
        if (self.current.tag == .assign) {
            self.bump();
            const rhs = try self.parseExpression();
            if (self.current.tag == .semicolon) self.bump();
            return self.tree.addNode(.{
                .tag = .assign_expr,
                .data = .{ .lhs = expr, .rhs = rhs },
                .loc = loc,
            });
        }

        if (self.current.tag == .semicolon) self.bump();
        return self.tree.addNode(.{
            .tag = .expr_stmt,
            .data = .{ .lhs = expr },
            .loc = loc,
        });
    }

    fn parseStatementOrBlock(self: *Parser) !NodeIndex {
        if (self.current.tag == .lbrace) return self.parseBlock();
        return self.parseStatement();
    }

    // ── Expressions ─────────────────────────────────────────────────────

    fn parseExpression(self: *Parser) anyerror!NodeIndex {
        return self.parsePrimaryAndPostfix();
    }

    fn parsePrimaryAndPostfix(self: *Parser) anyerror!NodeIndex {
        var node = try self.parsePrimary();
        if (node == null_node) return null_node;

        // Postfix: `.member`, `->member`, `[index]`, `(args)`
        while (true) {
            if (self.current.tag == .arrow or self.current.tag == .dot) {
                const is_arrow: u32 = if (self.current.tag == .arrow) 1 else 0;
                const member_loc: u32 = @intCast(self.current.loc.start);
                self.bump();
                if (self.current.tag == .identifier) {
                    const member_name = self.current.slice(self.tree.source);
                    self.bump();
                    const member_ref = try self.tree.internString(member_name);
                    const es = try self.tree.addExtra(is_arrow);
                    node = try self.tree.addNode(.{
                        .tag = .member_expr,
                        .data = .{ .lhs = node, .rhs = packStringRef(member_ref), .extra = es },
                        .loc = member_loc,
                    });
                }
            } else if (self.current.tag == .lparen) {
                // Function call
                node = try self.parseCallArgs(node);
            } else if (self.current.tag == .lbracket) {
                // Array indexing — treat as a use of the pointer
                self.skipBrackets();
            } else if (self.current.tag == .plus_plus or self.current.tag == .minus_minus) {
                self.bump(); // postfix ++ / --
            } else break;
        }
        return node;
    }

    fn parsePrimary(self: *Parser) anyerror!NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        switch (self.current.tag) {
            .identifier => {
                const name = self.current.slice(self.tree.source);
                self.bump();
                const ref = try self.tree.internString(name);
                return self.tree.addNode(.{
                    .tag = .identifier,
                    .data = .{ .lhs = packStringRef(ref) },
                    .loc = loc,
                });
            },
            .kw_malloc, .kw_calloc, .kw_realloc => {
                // Parse as identifier so call_expr picks it up
                const name = self.current.slice(self.tree.source);
                self.bump();
                const ref = try self.tree.internString(name);
                return self.tree.addNode(.{
                    .tag = .identifier,
                    .data = .{ .lhs = packStringRef(ref) },
                    .loc = loc,
                });
            },
            .kw_new => {
                self.bump();
                // Skip type and possible (args) — treat as an allocation
                while (self.current.tag != .semicolon and self.current.tag != .rparen and
                    self.current.tag != .comma and self.current.tag != .eof)
                {
                    if (self.current.tag == .lparen) { self.skipParens(); break; }
                    if (self.current.tag == .lbracket) { self.skipBrackets(); break; }
                    self.bump();
                }
                const ref = try self.tree.internString("new");
                return self.tree.addNode(.{
                    .tag = .identifier,
                    .data = .{ .lhs = packStringRef(ref) },
                    .loc = loc,
                });
            },
            .kw_null => {
                self.bump();
                return self.tree.addNode(.{ .tag = .null_lit, .data = .{}, .loc = loc });
            },
            .number_literal => {
                self.bump();
                return self.tree.addNode(.{ .tag = .number_lit, .data = .{}, .loc = loc });
            },
            .string_literal => {
                self.bump();
                return self.tree.addNode(.{ .tag = .string_lit, .data = .{}, .loc = loc });
            },
            .char_literal => {
                self.bump();
                return self.tree.addNode(.{ .tag = .number_lit, .data = .{}, .loc = loc });
            },
            .kw_sizeof => {
                self.bump();
                if (self.current.tag == .lparen) self.skipParens();
                return self.tree.addNode(.{
                    .tag = .sizeof_expr,
                    .data = .{ .lhs = null_node },
                    .loc = loc,
                });
            },
            .star => {
                // Dereference: *expr
                self.bump();
                const inner = try self.parsePrimaryAndPostfix();
                return self.tree.addNode(.{
                    .tag = .deref_expr,
                    .data = .{ .lhs = inner },
                    .loc = loc,
                });
            },
            .ampersand => {
                // Address-of: &expr
                self.bump();
                const inner = try self.parsePrimaryAndPostfix();
                return self.tree.addNode(.{
                    .tag = .addr_of_expr,
                    .data = .{ .lhs = inner },
                    .loc = loc,
                });
            },
            .lparen => {
                // Could be a cast `(int *)expr` or grouped expression `(expr)`
                return self.parseParenExpr();
            },
            .bang, .tilde, .minus, .plus_plus, .minus_minus => {
                // Unary prefix — consume and parse operand
                self.bump();
                const inner = try self.parsePrimaryAndPostfix();
                return self.tree.addNode(.{
                    .tag = .opaque_expr,
                    .data = .{ .lhs = inner },
                    .loc = loc,
                });
            },
            else => return null_node,
        }
    }

    fn parseParenExpr(self: *Parser) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `(`

        // Check for cast: `(type *)expr` or `(type)expr`
        if (Token.isTypeKeyword(self.current.tag) or
            (self.current.tag == .identifier and self.peekPastIdent()))
        {
            // Likely a cast — skip type, consume `)`, parse expr
            self.skipToRparen();
            const inner = try self.parsePrimaryAndPostfix();
            return self.tree.addNode(.{
                .tag = .cast_expr,
                .data = .{ .lhs = inner },
                .loc = loc,
            });
        }

        // Grouped expression
        const inner = try self.parseExpression();
        if (self.current.tag == .rparen) self.bump();
        return inner;
    }

    /// Peek past an identifier to see if this looks like a cast: `(Foo *)`.
    fn peekPastIdent(self: *Parser) bool {
        const saved_pos = self.lexer.pos;
        const saved_current = self.current;
        self.bump(); // skip ident
        const looks_like_cast = self.current.tag == .star or self.current.tag == .rparen;
        self.lexer.pos = saved_pos;
        self.current = saved_current;
        return looks_like_cast;
    }

    fn parseCallArgs(self: *Parser, callee: NodeIndex) !NodeIndex {
        const loc: u32 = @intCast(self.current.loc.start);
        self.bump(); // consume `(`
        var args: std.ArrayList(NodeIndex) = .empty;
        defer args.deinit(self.allocator);
        while (self.current.tag != .rparen and self.current.tag != .eof) {
            const arg = try self.parseExpression();
            if (arg != null_node) try args.append(self.allocator, arg);
            if (self.current.tag == .comma) self.bump() else break;
        }
        if (self.current.tag == .rparen) self.bump();

        const es = try self.tree.addExtra(@intCast(args.items.len));
        for (args.items) |a| _ = try self.tree.addExtra(a);
        return self.tree.addNode(.{
            .tag = .call_expr,
            .data = .{ .lhs = callee, .rhs = es },
            .loc = loc,
        });
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    fn bump(self: *Parser) void {
        self.prev = self.current;
        self.current = self.lexer.next();
    }

    fn peek(self: *Parser) Token.Tag {
        const saved = self.lexer.pos;
        const tok = self.lexer.next();
        self.lexer.pos = saved;
        return tok.tag;
    }

    fn skipToSemicolon(self: *Parser) void {
        while (self.current.tag != .semicolon and self.current.tag != .eof) self.bump();
        if (self.current.tag == .semicolon) self.bump();
    }

    fn skipToSemicolonOrBrace(self: *Parser) void {
        while (self.current.tag != .semicolon and self.current.tag != .lbrace and self.current.tag != .eof) self.bump();
        if (self.current.tag == .semicolon) self.bump()
        else if (self.current.tag == .lbrace) self.skipBraces();
    }

    fn skipToRparen(self: *Parser) void {
        var depth: usize = 0;
        while (self.current.tag != .eof) {
            if (self.current.tag == .lparen) depth += 1;
            if (self.current.tag == .rparen) {
                if (depth == 0) { self.bump(); return; }
                depth -= 1;
            }
            self.bump();
        }
    }

    fn skipParens(self: *Parser) void {
        if (self.current.tag != .lparen) return;
        self.bump();
        var depth: usize = 1;
        while (depth > 0 and self.current.tag != .eof) {
            if (self.current.tag == .lparen) depth += 1;
            if (self.current.tag == .rparen) depth -= 1;
            self.bump();
        }
    }

    fn skipBraces(self: *Parser) void {
        if (self.current.tag != .lbrace) return;
        self.bump();
        var depth: usize = 1;
        while (depth > 0 and self.current.tag != .eof) {
            if (self.current.tag == .lbrace) depth += 1;
            if (self.current.tag == .rbrace) depth -= 1;
            self.bump();
        }
    }

    fn skipBrackets(self: *Parser) void {
        if (self.current.tag != .lbracket) return;
        self.bump();
        var depth: usize = 1;
        while (depth > 0 and self.current.tag != .eof) {
            if (self.current.tag == .lbracket) depth += 1;
            if (self.current.tag == .rbracket) depth -= 1;
            self.bump();
        }
    }
};
