pub const Token = struct {
    tag: Tag,
    loc: Loc,

    pub const Loc = struct {
        start: usize,
        end: usize,
    };

    pub fn slice(self: Token, source: []const u8) []const u8 {
        return source[self.loc.start..self.loc.end];
    }

    /// Map source offset → 1-based line number.
    pub fn line(self: Token, source: []const u8) usize {
        var n: usize = 1;
        for (source[0..self.loc.start]) |ch| {
            if (ch == '\n') n += 1;
        }
        return n;
    }

    pub const Tag = enum {
        // Literals
        number_literal,
        string_literal,
        char_literal,

        // Identifiers
        identifier,

        // Type keywords (subset relevant to pointer tracking)
        kw_void,
        kw_int,
        kw_char,
        kw_short,
        kw_long,
        kw_float,
        kw_double,
        kw_unsigned,
        kw_signed,
        kw_const,
        kw_struct,
        kw_enum,
        kw_typedef,
        kw_static,
        kw_extern,
        kw_auto,
        kw_register,
        kw_volatile,
        kw_inline,
        kw_size_t,

        // Control-flow keywords
        kw_if,
        kw_else,
        kw_while,
        kw_for,
        kw_do,
        kw_switch,
        kw_case,
        kw_default,
        kw_break,
        kw_continue,
        kw_return,
        kw_goto,

        // Safety-relevant identifiers (recognised as keywords)
        kw_malloc,
        kw_calloc,
        kw_realloc,
        kw_free,
        kw_new,
        kw_delete,
        kw_null,
        kw_sizeof,

        // Operators
        plus,
        minus,
        star, // also pointer deref / declaration
        slash,
        percent,
        assign,
        equal,
        not_equal,
        less,
        greater,
        less_equal,
        greater_equal,
        ampersand, // also address-of
        pipe,
        caret,
        tilde,
        bang,
        ampersand_ampersand,
        pipe_pipe,
        plus_plus,
        minus_minus,
        plus_assign,
        minus_assign,
        star_assign,
        slash_assign,
        percent_assign,
        ampersand_assign,
        pipe_assign,
        caret_assign,
        lshift,
        rshift,
        lshift_assign,
        rshift_assign,
        arrow, // ->
        dot,
        question_mark,

        // Punctuation
        colon,
        semicolon,
        comma,
        lparen,
        rparen,
        lbrace,
        rbrace,
        lbracket,
        rbracket,
        ellipsis, // ...
        hash, // preprocessor (we skip lines starting with this)

        // Special
        eof,
        invalid,
    };

    pub const keywords = std.StaticStringMap(Tag).initComptime(.{
        // Type keywords
        .{ "void", .kw_void },
        .{ "int", .kw_int },
        .{ "char", .kw_char },
        .{ "short", .kw_short },
        .{ "long", .kw_long },
        .{ "float", .kw_float },
        .{ "double", .kw_double },
        .{ "unsigned", .kw_unsigned },
        .{ "signed", .kw_signed },
        .{ "const", .kw_const },
        .{ "struct", .kw_struct },
        .{ "enum", .kw_enum },
        .{ "typedef", .kw_typedef },
        .{ "static", .kw_static },
        .{ "extern", .kw_extern },
        .{ "auto", .kw_auto },
        .{ "register", .kw_register },
        .{ "volatile", .kw_volatile },
        .{ "inline", .kw_inline },
        .{ "size_t", .kw_size_t },
        // Control flow
        .{ "if", .kw_if },
        .{ "else", .kw_else },
        .{ "while", .kw_while },
        .{ "for", .kw_for },
        .{ "do", .kw_do },
        .{ "switch", .kw_switch },
        .{ "case", .kw_case },
        .{ "default", .kw_default },
        .{ "break", .kw_break },
        .{ "continue", .kw_continue },
        .{ "return", .kw_return },
        .{ "goto", .kw_goto },
        // Safety-relevant
        .{ "malloc", .kw_malloc },
        .{ "calloc", .kw_calloc },
        .{ "realloc", .kw_realloc },
        .{ "free", .kw_free },
        .{ "new", .kw_new },
        .{ "delete", .kw_delete },
        .{ "NULL", .kw_null },
        .{ "nullptr", .kw_null },
        .{ "sizeof", .kw_sizeof },
    });

    pub fn getKeyword(bytes: []const u8) ?Tag {
        return keywords.get(bytes);
    }

    /// True if the tag is a type-specifier keyword (used by the parser to
    /// recognise the start of a declaration).
    pub fn isTypeKeyword(tag: Tag) bool {
        return switch (tag) {
            .kw_void, .kw_int, .kw_char, .kw_short, .kw_long,
            .kw_float, .kw_double, .kw_unsigned, .kw_signed,
            .kw_const, .kw_struct, .kw_enum, .kw_static, .kw_extern,
            .kw_auto, .kw_register, .kw_volatile, .kw_inline,
            .kw_size_t,
            => true,
            else => false,
        };
    }
};

const std = @import("std");
