const std = @import("std");
const Token = @import("c_token.zig").Token;

pub const Lexer = struct {
    source: []const u8,
    pos: usize = 0,

    pub fn init(source: []const u8) Lexer {
        return .{ .source = source };
    }

    pub fn next(self: *Lexer) Token {
        self.skipWhitespaceAndComments();
        if (self.pos >= self.source.len)
            return .{ .tag = .eof, .loc = .{ .start = self.pos, .end = self.pos } };

        const start = self.pos;
        const c = self.source[self.pos];

        // Preprocessor line — skip entirely
        if (c == '#') return self.skipPreprocessor(start);

        // String literal
        if (c == '"') return self.readString('"', start);

        // Char literal
        if (c == '\'') return self.readChar(start);

        // Number
        if (std.ascii.isDigit(c) or
            (c == '.' and self.pos + 1 < self.source.len and std.ascii.isDigit(self.source[self.pos + 1])))
            return self.readNumber(start);

        // Identifier / keyword
        if (std.ascii.isAlphabetic(c) or c == '_')
            return self.readIdentifier(start);

        return self.readOperator(start);
    }

    fn skipPreprocessor(self: *Lexer, start: usize) Token {
        // Skip to end of line (handling backslash-newline continuation).
        while (self.pos < self.source.len) {
            if (self.source[self.pos] == '\\' and self.pos + 1 < self.source.len and self.source[self.pos + 1] == '\n') {
                self.pos += 2;
                continue;
            }
            if (self.source[self.pos] == '\n') {
                self.pos += 1;
                break;
            }
            self.pos += 1;
        }
        return .{ .tag = .hash, .loc = .{ .start = start, .end = self.pos } };
    }

    fn readString(self: *Lexer, quote: u8, start: usize) Token {
        self.pos += 1;
        while (self.pos < self.source.len and self.source[self.pos] != quote) {
            if (self.source[self.pos] == '\\') self.pos += 1;
            self.pos += 1;
        }
        if (self.pos < self.source.len) self.pos += 1;
        return .{ .tag = .string_literal, .loc = .{ .start = start, .end = self.pos } };
    }

    fn readChar(self: *Lexer, start: usize) Token {
        self.pos += 1; // opening '
        while (self.pos < self.source.len and self.source[self.pos] != '\'') {
            if (self.source[self.pos] == '\\') self.pos += 1;
            self.pos += 1;
        }
        if (self.pos < self.source.len) self.pos += 1;
        return .{ .tag = .char_literal, .loc = .{ .start = start, .end = self.pos } };
    }

    fn readNumber(self: *Lexer, start: usize) Token {
        // Hex prefix
        if (self.pos + 1 < self.source.len and self.source[self.pos] == '0' and
            (self.source[self.pos + 1] == 'x' or self.source[self.pos + 1] == 'X'))
        {
            self.pos += 2;
            while (self.pos < self.source.len and isHexDigit(self.source[self.pos])) self.pos += 1;
        } else {
            while (self.pos < self.source.len and (std.ascii.isDigit(self.source[self.pos]) or self.source[self.pos] == '.'))
                self.pos += 1;
            // Exponent
            if (self.pos < self.source.len and (self.source[self.pos] == 'e' or self.source[self.pos] == 'E')) {
                self.pos += 1;
                if (self.pos < self.source.len and (self.source[self.pos] == '+' or self.source[self.pos] == '-'))
                    self.pos += 1;
                while (self.pos < self.source.len and std.ascii.isDigit(self.source[self.pos])) self.pos += 1;
            }
        }
        // Consume optional suffix (u, l, f, etc.)
        while (self.pos < self.source.len and (self.source[self.pos] == 'u' or self.source[self.pos] == 'U' or
            self.source[self.pos] == 'l' or self.source[self.pos] == 'L' or
            self.source[self.pos] == 'f' or self.source[self.pos] == 'F'))
            self.pos += 1;
        return .{ .tag = .number_literal, .loc = .{ .start = start, .end = self.pos } };
    }

    fn readIdentifier(self: *Lexer, start: usize) Token {
        while (self.pos < self.source.len and (std.ascii.isAlphanumeric(self.source[self.pos]) or self.source[self.pos] == '_'))
            self.pos += 1;
        const text = self.source[start..self.pos];
        const tag = Token.getKeyword(text) orelse .identifier;
        return .{ .tag = tag, .loc = .{ .start = start, .end = self.pos } };
    }

    fn readOperator(self: *Lexer, start: usize) Token {
        const c = self.source[self.pos];
        self.pos += 1;
        const tag: Token.Tag = switch (c) {
            '(' => .lparen,
            ')' => .rparen,
            '{' => .lbrace,
            '}' => .rbrace,
            '[' => .lbracket,
            ']' => .rbracket,
            ':' => .colon,
            ';' => .semicolon,
            ',' => .comma,
            '?' => .question_mark,
            '~' => .tilde,
            '.' => blk: {
                if (self.pos + 1 < self.source.len and
                    self.source[self.pos] == '.' and self.source[self.pos + 1] == '.')
                {
                    self.pos += 2;
                    break :blk .ellipsis;
                }
                break :blk .dot;
            },
            '+' => blk: {
                if (self.match('+')) break :blk .plus_plus;
                if (self.match('=')) break :blk .plus_assign;
                break :blk .plus;
            },
            '-' => blk: {
                if (self.match('>')) break :blk .arrow;
                if (self.match('-')) break :blk .minus_minus;
                if (self.match('=')) break :blk .minus_assign;
                break :blk .minus;
            },
            '*' => if (self.match('=')) .star_assign else .star,
            '/' => if (self.match('=')) .slash_assign else .slash,
            '%' => if (self.match('=')) .percent_assign else .percent,
            '=' => if (self.match('=')) .equal else .assign,
            '!' => if (self.match('=')) .not_equal else .bang,
            '<' => blk: {
                if (self.match('<')) break :blk if (self.match('=')) .lshift_assign else .lshift;
                if (self.match('=')) break :blk .less_equal;
                break :blk .less;
            },
            '>' => blk: {
                if (self.match('>')) break :blk if (self.match('=')) .rshift_assign else .rshift;
                if (self.match('=')) break :blk .greater_equal;
                break :blk .greater;
            },
            '&' => blk: {
                if (self.match('&')) break :blk .ampersand_ampersand;
                if (self.match('=')) break :blk .ampersand_assign;
                break :blk .ampersand;
            },
            '|' => blk: {
                if (self.match('|')) break :blk .pipe_pipe;
                if (self.match('=')) break :blk .pipe_assign;
                break :blk .pipe;
            },
            '^' => if (self.match('=')) .caret_assign else .caret,
            else => .invalid,
        };
        return .{ .tag = tag, .loc = .{ .start = start, .end = self.pos } };
    }

    fn match(self: *Lexer, expected: u8) bool {
        if (self.pos < self.source.len and self.source[self.pos] == expected) {
            self.pos += 1;
            return true;
        }
        return false;
    }

    fn skipWhitespaceAndComments(self: *Lexer) void {
        while (self.pos < self.source.len) {
            const c = self.source[self.pos];
            if (c == ' ' or c == '\t' or c == '\r' or c == '\n') {
                self.pos += 1;
                continue;
            }
            // Line comment
            if (c == '/' and self.pos + 1 < self.source.len and self.source[self.pos + 1] == '/') {
                while (self.pos < self.source.len and self.source[self.pos] != '\n') self.pos += 1;
                continue;
            }
            // Block comment
            if (c == '/' and self.pos + 1 < self.source.len and self.source[self.pos + 1] == '*') {
                self.pos += 2;
                while (self.pos + 1 < self.source.len) {
                    if (self.source[self.pos] == '*' and self.source[self.pos + 1] == '/') {
                        self.pos += 2;
                        break;
                    }
                    self.pos += 1;
                }
                continue;
            }
            break;
        }
    }

    fn isHexDigit(c: u8) bool {
        return std.ascii.isDigit(c) or (c >= 'a' and c <= 'f') or (c >= 'A' and c <= 'F');
    }
};
