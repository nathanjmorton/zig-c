var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// www/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "www/node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars2) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars2.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win322) {
        return win322 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// www/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "www/node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports.basename = (path8, { windows } = {}) => {
      const segs = path8.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// www/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "www/node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base2 = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base2 && isGlob === true && lastIndex > 0) {
        base2 = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base2 = "";
        glob = str;
      } else {
        base2 = str;
      }
      if (base2 && base2 !== "" && base2 !== "/" && base2 !== str) {
        if (isPathSeparator(base2.charCodeAt(base2.length - 1))) {
          base2 = base2.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base2 && backslashes === true) {
          base2 = utils.removeBackslashes(base2);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base: base2,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n2 = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n2, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});

// www/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "www/node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v2) => utils.escapeRegex(v2)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote2 = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote2 = quote2 === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote2 === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a2 = values[i];
          const b = values[j];
          const char = a2[0];
          if (!char || a2 !== char.repeat(a2.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a2 === b || a2.startsWith(b) || b.startsWith(a2)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote2 = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote2 = quote2 === 1 ? 0 : 1;
          continue;
        }
        if (quote2 === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var getStarExtglobSequenceOutput = (pattern) => {
      let index = 0;
      const chars2 = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars2.push(branch);
        index += match.end + 1;
      }
      if (chars2.length < 1) {
        return;
      }
      const source = chars2.length === 1 ? utils.escapeRegex(chars2[0]) : `[${chars2.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      for (const branch of branches) {
        const safeOutput = getStarExtglobSequenceOutput(branch);
        if (safeOutput) {
          return { risky: true, safeOutput };
        }
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      return { risky: false };
    };
    var parse4 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants.globChars(opts.windows);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n2 = 1) => input[state.index + n2];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open2 = tokens[token.tokensIndex];
          open2.type = "text";
          open2.value = literal;
          open2.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open2.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse4(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m3, esc, chars2, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m3;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars2.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars2.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m3 : `\\${m3}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m3) => {
              return m3.length % 2 === 0 ? "\\\\" : m3 ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix2 = POSIX_REGEX_SOURCE[rest2];
                if (posix2) {
                  prev.value = pre + posix2;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open2 = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open2);
          push(open2);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse4.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse4;
  }
});

// www/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "www/node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    var scan = require_scan();
    var parse4 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject2 = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch2 = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch2(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject2(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix2 = opts.windows;
      const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix: posix2 });
        const result = { glob, state, regex, posix: posix2, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch2.test = (input, regex, options, { glob, posix: posix2 } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix2 ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch2.matchBase(input, regex, options, posix2);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch2.matchBase = (input, glob, options) => {
      const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
      return regex.test(utils.basename(input));
    };
    picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
    picomatch2.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p2) => picomatch2.parse(p2, options));
      return parse4(pattern, { ...options, fastpaths: false });
    };
    picomatch2.scan = (input, options) => scan(input, options);
    picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch2.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse4.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse4(input, options);
      }
      return picomatch2.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch2.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch2.constants = constants;
    module.exports = picomatch2;
  }
});

// www/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "www/node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils();
    function picomatch2(glob, options, returnState = false) {
      if (options && (options.windows === null || options.windows === void 0)) {
        options = { ...options, windows: utils.isWindows() };
      }
      return pico(glob, options, returnState);
    }
    Object.assign(picomatch2, pico);
    module.exports = picomatch2;
  }
});

// www/node_modules/source-map-js/lib/base64.js
var require_base64 = __commonJS({
  "www/node_modules/source-map-js/lib/base64.js"(exports) {
    var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    exports.encode = function(number) {
      if (0 <= number && number < intToCharMap.length) {
        return intToCharMap[number];
      }
      throw new TypeError("Must be between 0 and 63: " + number);
    };
    exports.decode = function(charCode) {
      var bigA = 65;
      var bigZ = 90;
      var littleA = 97;
      var littleZ = 122;
      var zero = 48;
      var nine = 57;
      var plus = 43;
      var slash = 47;
      var littleOffset = 26;
      var numberOffset = 52;
      if (bigA <= charCode && charCode <= bigZ) {
        return charCode - bigA;
      }
      if (littleA <= charCode && charCode <= littleZ) {
        return charCode - littleA + littleOffset;
      }
      if (zero <= charCode && charCode <= nine) {
        return charCode - zero + numberOffset;
      }
      if (charCode == plus) {
        return 62;
      }
      if (charCode == slash) {
        return 63;
      }
      return -1;
    };
  }
});

// www/node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = __commonJS({
  "www/node_modules/source-map-js/lib/base64-vlq.js"(exports) {
    var base64 = require_base64();
    var VLQ_BASE_SHIFT = 5;
    var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
    var VLQ_BASE_MASK = VLQ_BASE - 1;
    var VLQ_CONTINUATION_BIT = VLQ_BASE;
    function toVLQSigned(aValue) {
      return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
    }
    function fromVLQSigned(aValue) {
      var isNegative = (aValue & 1) === 1;
      var shifted = aValue >> 1;
      return isNegative ? -shifted : shifted;
    }
    exports.encode = function base64VLQ_encode(aValue) {
      var encoded = "";
      var digit;
      var vlq = toVLQSigned(aValue);
      do {
        digit = vlq & VLQ_BASE_MASK;
        vlq >>>= VLQ_BASE_SHIFT;
        if (vlq > 0) {
          digit |= VLQ_CONTINUATION_BIT;
        }
        encoded += base64.encode(digit);
      } while (vlq > 0);
      return encoded;
    };
    exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
      var strLen = aStr.length;
      var result = 0;
      var shift = 0;
      var continuation, digit;
      do {
        if (aIndex >= strLen) {
          throw new Error("Expected more digits in base 64 VLQ value.");
        }
        digit = base64.decode(aStr.charCodeAt(aIndex++));
        if (digit === -1) {
          throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
        }
        continuation = !!(digit & VLQ_CONTINUATION_BIT);
        digit &= VLQ_BASE_MASK;
        result = result + (digit << shift);
        shift += VLQ_BASE_SHIFT;
      } while (continuation);
      aOutParam.value = fromVLQSigned(result);
      aOutParam.rest = aIndex;
    };
  }
});

// www/node_modules/source-map-js/lib/util.js
var require_util = __commonJS({
  "www/node_modules/source-map-js/lib/util.js"(exports) {
    function getArg(aArgs, aName, aDefaultValue) {
      if (aName in aArgs) {
        return aArgs[aName];
      } else if (arguments.length === 3) {
        return aDefaultValue;
      } else {
        throw new Error('"' + aName + '" is a required argument.');
      }
    }
    exports.getArg = getArg;
    var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
    var dataUrlRegexp = /^data:.+\,.+$/;
    function urlParse(aUrl) {
      var match = aUrl.match(urlRegexp);
      if (!match) {
        return null;
      }
      return {
        scheme: match[1],
        auth: match[2],
        host: match[3],
        port: match[4],
        path: match[5]
      };
    }
    exports.urlParse = urlParse;
    function urlGenerate(aParsedUrl) {
      var url = "";
      if (aParsedUrl.scheme) {
        url += aParsedUrl.scheme + ":";
      }
      url += "//";
      if (aParsedUrl.auth) {
        url += aParsedUrl.auth + "@";
      }
      if (aParsedUrl.host) {
        url += aParsedUrl.host;
      }
      if (aParsedUrl.port) {
        url += ":" + aParsedUrl.port;
      }
      if (aParsedUrl.path) {
        url += aParsedUrl.path;
      }
      return url;
    }
    exports.urlGenerate = urlGenerate;
    var MAX_CACHED_INPUTS = 32;
    function lruMemoize(f2) {
      var cache = [];
      return function(input) {
        for (var i = 0; i < cache.length; i++) {
          if (cache[i].input === input) {
            var temp = cache[0];
            cache[0] = cache[i];
            cache[i] = temp;
            return cache[0].result;
          }
        }
        var result = f2(input);
        cache.unshift({
          input,
          result
        });
        if (cache.length > MAX_CACHED_INPUTS) {
          cache.pop();
        }
        return result;
      };
    }
    var normalize2 = lruMemoize(function normalize3(aPath) {
      var path8 = aPath;
      var url = urlParse(aPath);
      if (url) {
        if (!url.path) {
          return aPath;
        }
        path8 = url.path;
      }
      var isAbsolute3 = exports.isAbsolute(path8);
      var parts = [];
      var start = 0;
      var i = 0;
      while (true) {
        start = i;
        i = path8.indexOf("/", start);
        if (i === -1) {
          parts.push(path8.slice(start));
          break;
        } else {
          parts.push(path8.slice(start, i));
          while (i < path8.length && path8[i] === "/") {
            i++;
          }
        }
      }
      for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
        part = parts[i];
        if (part === ".") {
          parts.splice(i, 1);
        } else if (part === "..") {
          up++;
        } else if (up > 0) {
          if (part === "") {
            parts.splice(i + 1, up);
            up = 0;
          } else {
            parts.splice(i, 2);
            up--;
          }
        }
      }
      path8 = parts.join("/");
      if (path8 === "") {
        path8 = isAbsolute3 ? "/" : ".";
      }
      if (url) {
        url.path = path8;
        return urlGenerate(url);
      }
      return path8;
    });
    exports.normalize = normalize2;
    function join5(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      if (aPath === "") {
        aPath = ".";
      }
      var aPathUrl = urlParse(aPath);
      var aRootUrl = urlParse(aRoot);
      if (aRootUrl) {
        aRoot = aRootUrl.path || "/";
      }
      if (aPathUrl && !aPathUrl.scheme) {
        if (aRootUrl) {
          aPathUrl.scheme = aRootUrl.scheme;
        }
        return urlGenerate(aPathUrl);
      }
      if (aPathUrl || aPath.match(dataUrlRegexp)) {
        return aPath;
      }
      if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
        aRootUrl.host = aPath;
        return urlGenerate(aRootUrl);
      }
      var joined = aPath.charAt(0) === "/" ? aPath : normalize2(aRoot.replace(/\/+$/, "") + "/" + aPath);
      if (aRootUrl) {
        aRootUrl.path = joined;
        return urlGenerate(aRootUrl);
      }
      return joined;
    }
    exports.join = join5;
    exports.isAbsolute = function(aPath) {
      return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
    };
    function relative3(aRoot, aPath) {
      if (aRoot === "") {
        aRoot = ".";
      }
      aRoot = aRoot.replace(/\/$/, "");
      var level = 0;
      while (aPath.indexOf(aRoot + "/") !== 0) {
        var index = aRoot.lastIndexOf("/");
        if (index < 0) {
          return aPath;
        }
        aRoot = aRoot.slice(0, index);
        if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
          return aPath;
        }
        ++level;
      }
      return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
    }
    exports.relative = relative3;
    var supportsNullProto = (function() {
      var obj = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in obj);
    })();
    function identity(s2) {
      return s2;
    }
    function toSetString(aStr) {
      if (isProtoString(aStr)) {
        return "$" + aStr;
      }
      return aStr;
    }
    exports.toSetString = supportsNullProto ? identity : toSetString;
    function fromSetString(aStr) {
      if (isProtoString(aStr)) {
        return aStr.slice(1);
      }
      return aStr;
    }
    exports.fromSetString = supportsNullProto ? identity : fromSetString;
    function isProtoString(s2) {
      if (!s2) {
        return false;
      }
      var length = s2.length;
      if (length < 9) {
        return false;
      }
      if (s2.charCodeAt(length - 1) !== 95 || s2.charCodeAt(length - 2) !== 95 || s2.charCodeAt(length - 3) !== 111 || s2.charCodeAt(length - 4) !== 116 || s2.charCodeAt(length - 5) !== 111 || s2.charCodeAt(length - 6) !== 114 || s2.charCodeAt(length - 7) !== 112 || s2.charCodeAt(length - 8) !== 95 || s2.charCodeAt(length - 9) !== 95) {
        return false;
      }
      for (var i = length - 10; i >= 0; i--) {
        if (s2.charCodeAt(i) !== 36) {
          return false;
        }
      }
      return true;
    }
    function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
      var cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositions = compareByOriginalPositions;
    function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
      var cmp;
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0 || onlyCompareOriginal) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
    function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
    function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
      var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0 || onlyCompareGenerated) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
    function strcmp(aStr1, aStr2) {
      if (aStr1 === aStr2) {
        return 0;
      }
      if (aStr1 === null) {
        return 1;
      }
      if (aStr2 === null) {
        return -1;
      }
      if (aStr1 > aStr2) {
        return 1;
      }
      return -1;
    }
    function compareByGeneratedPositionsInflated(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.generatedColumn - mappingB.generatedColumn;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = strcmp(mappingA.source, mappingB.source);
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalLine - mappingB.originalLine;
      if (cmp !== 0) {
        return cmp;
      }
      cmp = mappingA.originalColumn - mappingB.originalColumn;
      if (cmp !== 0) {
        return cmp;
      }
      return strcmp(mappingA.name, mappingB.name);
    }
    exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
    function parseSourceMapInput(str) {
      return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
    }
    exports.parseSourceMapInput = parseSourceMapInput;
    function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
      sourceURL = sourceURL || "";
      if (sourceRoot) {
        if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") {
          sourceRoot += "/";
        }
        sourceURL = sourceRoot + sourceURL;
      }
      if (sourceMapURL) {
        var parsed = urlParse(sourceMapURL);
        if (!parsed) {
          throw new Error("sourceMapURL could not be parsed");
        }
        if (parsed.path) {
          var index = parsed.path.lastIndexOf("/");
          if (index >= 0) {
            parsed.path = parsed.path.substring(0, index + 1);
          }
        }
        sourceURL = join5(urlGenerate(parsed), sourceURL);
      }
      return normalize2(sourceURL);
    }
    exports.computeSourceURL = computeSourceURL;
  }
});

// www/node_modules/source-map-js/lib/array-set.js
var require_array_set = __commonJS({
  "www/node_modules/source-map-js/lib/array-set.js"(exports) {
    var util = require_util();
    var has = Object.prototype.hasOwnProperty;
    var hasNativeMap = typeof Map !== "undefined";
    function ArraySet() {
      this._array = [];
      this._set = hasNativeMap ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
      var set = new ArraySet();
      for (var i = 0, len = aArray.length; i < len; i++) {
        set.add(aArray[i], aAllowDuplicates);
      }
      return set;
    };
    ArraySet.prototype.size = function ArraySet_size() {
      return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    };
    ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
      var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
      var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
      var idx = this._array.length;
      if (!isDuplicate || aAllowDuplicates) {
        this._array.push(aStr);
      }
      if (!isDuplicate) {
        if (hasNativeMap) {
          this._set.set(aStr, idx);
        } else {
          this._set[sStr] = idx;
        }
      }
    };
    ArraySet.prototype.has = function ArraySet_has(aStr) {
      if (hasNativeMap) {
        return this._set.has(aStr);
      } else {
        var sStr = util.toSetString(aStr);
        return has.call(this._set, sStr);
      }
    };
    ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
      if (hasNativeMap) {
        var idx = this._set.get(aStr);
        if (idx >= 0) {
          return idx;
        }
      } else {
        var sStr = util.toSetString(aStr);
        if (has.call(this._set, sStr)) {
          return this._set[sStr];
        }
      }
      throw new Error('"' + aStr + '" is not in the set.');
    };
    ArraySet.prototype.at = function ArraySet_at(aIdx) {
      if (aIdx >= 0 && aIdx < this._array.length) {
        return this._array[aIdx];
      }
      throw new Error("No element indexed by " + aIdx);
    };
    ArraySet.prototype.toArray = function ArraySet_toArray() {
      return this._array.slice();
    };
    exports.ArraySet = ArraySet;
  }
});

// www/node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = __commonJS({
  "www/node_modules/source-map-js/lib/mapping-list.js"(exports) {
    var util = require_util();
    function generatedPositionAfter(mappingA, mappingB) {
      var lineA = mappingA.generatedLine;
      var lineB = mappingB.generatedLine;
      var columnA = mappingA.generatedColumn;
      var columnB = mappingB.generatedColumn;
      return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
    }
    function MappingList() {
      this._array = [];
      this._sorted = true;
      this._last = { generatedLine: -1, generatedColumn: 0 };
    }
    MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
      this._array.forEach(aCallback, aThisArg);
    };
    MappingList.prototype.add = function MappingList_add(aMapping) {
      if (generatedPositionAfter(this._last, aMapping)) {
        this._last = aMapping;
        this._array.push(aMapping);
      } else {
        this._sorted = false;
        this._array.push(aMapping);
      }
    };
    MappingList.prototype.toArray = function MappingList_toArray() {
      if (!this._sorted) {
        this._array.sort(util.compareByGeneratedPositionsInflated);
        this._sorted = true;
      }
      return this._array;
    };
    exports.MappingList = MappingList;
  }
});

// www/node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = __commonJS({
  "www/node_modules/source-map-js/lib/source-map-generator.js"(exports) {
    var base64VLQ = require_base64_vlq();
    var util = require_util();
    var ArraySet = require_array_set().ArraySet;
    var MappingList = require_mapping_list().MappingList;
    function SourceMapGenerator2(aArgs) {
      if (!aArgs) {
        aArgs = {};
      }
      this._file = util.getArg(aArgs, "file", null);
      this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
      this._skipValidation = util.getArg(aArgs, "skipValidation", false);
      this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
      this._sources = new ArraySet();
      this._names = new ArraySet();
      this._mappings = new MappingList();
      this._sourcesContents = null;
    }
    SourceMapGenerator2.prototype._version = 3;
    SourceMapGenerator2.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
      var sourceRoot = aSourceMapConsumer.sourceRoot;
      var generator = new SourceMapGenerator2(Object.assign(generatorOps || {}, {
        file: aSourceMapConsumer.file,
        sourceRoot
      }));
      aSourceMapConsumer.eachMapping(function(mapping) {
        var newMapping = {
          generated: {
            line: mapping.generatedLine,
            column: mapping.generatedColumn
          }
        };
        if (mapping.source != null) {
          newMapping.source = mapping.source;
          if (sourceRoot != null) {
            newMapping.source = util.relative(sourceRoot, newMapping.source);
          }
          newMapping.original = {
            line: mapping.originalLine,
            column: mapping.originalColumn
          };
          if (mapping.name != null) {
            newMapping.name = mapping.name;
          }
        }
        generator.addMapping(newMapping);
      });
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var sourceRelative = sourceFile;
        if (sourceRoot !== null) {
          sourceRelative = util.relative(sourceRoot, sourceFile);
        }
        if (!generator._sources.has(sourceRelative)) {
          generator._sources.add(sourceRelative);
        }
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          generator.setSourceContent(sourceFile, content);
        }
      });
      return generator;
    };
    SourceMapGenerator2.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, "generated");
      var original = util.getArg(aArgs, "original", null);
      var source = util.getArg(aArgs, "source", null);
      var name = util.getArg(aArgs, "name", null);
      if (!this._skipValidation) {
        if (this._validateMapping(generated, original, source, name) === false) {
          return;
        }
      }
      if (source != null) {
        source = String(source);
        if (!this._sources.has(source)) {
          this._sources.add(source);
        }
      }
      if (name != null) {
        name = String(name);
        if (!this._names.has(name)) {
          this._names.add(name);
        }
      }
      this._mappings.add({
        generatedLine: generated.line,
        generatedColumn: generated.column,
        originalLine: original != null && original.line,
        originalColumn: original != null && original.column,
        source,
        name
      });
    };
    SourceMapGenerator2.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
      var source = aSourceFile;
      if (this._sourceRoot != null) {
        source = util.relative(this._sourceRoot, source);
      }
      if (aSourceContent != null) {
        if (!this._sourcesContents) {
          this._sourcesContents = /* @__PURE__ */ Object.create(null);
        }
        this._sourcesContents[util.toSetString(source)] = aSourceContent;
      } else if (this._sourcesContents) {
        delete this._sourcesContents[util.toSetString(source)];
        if (Object.keys(this._sourcesContents).length === 0) {
          this._sourcesContents = null;
        }
      }
    };
    SourceMapGenerator2.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
      var sourceFile = aSourceFile;
      if (aSourceFile == null) {
        if (aSourceMapConsumer.file == null) {
          throw new Error(
            `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
          );
        }
        sourceFile = aSourceMapConsumer.file;
      }
      var sourceRoot = this._sourceRoot;
      if (sourceRoot != null) {
        sourceFile = util.relative(sourceRoot, sourceFile);
      }
      var newSources = new ArraySet();
      var newNames = new ArraySet();
      this._mappings.unsortedForEach(function(mapping) {
        if (mapping.source === sourceFile && mapping.originalLine != null) {
          var original = aSourceMapConsumer.originalPositionFor({
            line: mapping.originalLine,
            column: mapping.originalColumn
          });
          if (original.source != null) {
            mapping.source = original.source;
            if (aSourceMapPath != null) {
              mapping.source = util.join(aSourceMapPath, mapping.source);
            }
            if (sourceRoot != null) {
              mapping.source = util.relative(sourceRoot, mapping.source);
            }
            mapping.originalLine = original.line;
            mapping.originalColumn = original.column;
            if (original.name != null) {
              mapping.name = original.name;
            }
          }
        }
        var source = mapping.source;
        if (source != null && !newSources.has(source)) {
          newSources.add(source);
        }
        var name = mapping.name;
        if (name != null && !newNames.has(name)) {
          newNames.add(name);
        }
      }, this);
      this._sources = newSources;
      this._names = newNames;
      aSourceMapConsumer.sources.forEach(function(sourceFile2) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile2);
        if (content != null) {
          if (aSourceMapPath != null) {
            sourceFile2 = util.join(aSourceMapPath, sourceFile2);
          }
          if (sourceRoot != null) {
            sourceFile2 = util.relative(sourceRoot, sourceFile2);
          }
          this.setSourceContent(sourceFile2, content);
        }
      }, this);
    };
    SourceMapGenerator2.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
      if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
        var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
        if (this._ignoreInvalidMapping) {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }
      if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) {
        return;
      } else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) {
        return;
      } else {
        var message = "Invalid mapping: " + JSON.stringify({
          generated: aGenerated,
          source: aSource,
          original: aOriginal,
          name: aName
        });
        if (this._ignoreInvalidMapping) {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(message);
          }
          return false;
        } else {
          throw new Error(message);
        }
      }
    };
    SourceMapGenerator2.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = "";
      var next;
      var mapping;
      var nameIdx;
      var sourceIdx;
      var mappings = this._mappings.toArray();
      for (var i = 0, len = mappings.length; i < len; i++) {
        mapping = mappings[i];
        next = "";
        if (mapping.generatedLine !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generatedLine !== previousGeneratedLine) {
            next += ";";
            previousGeneratedLine++;
          }
        } else {
          if (i > 0) {
            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
              continue;
            }
            next += ",";
          }
        }
        next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generatedColumn;
        if (mapping.source != null) {
          sourceIdx = this._sources.indexOf(mapping.source);
          next += base64VLQ.encode(sourceIdx - previousSource);
          previousSource = sourceIdx;
          next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
          previousOriginalLine = mapping.originalLine - 1;
          next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
          previousOriginalColumn = mapping.originalColumn;
          if (mapping.name != null) {
            nameIdx = this._names.indexOf(mapping.name);
            next += base64VLQ.encode(nameIdx - previousName);
            previousName = nameIdx;
          }
        }
        result += next;
      }
      return result;
    };
    SourceMapGenerator2.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
      return aSources.map(function(source) {
        if (!this._sourcesContents) {
          return null;
        }
        if (aSourceRoot != null) {
          source = util.relative(aSourceRoot, source);
        }
        var key = util.toSetString(source);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
      }, this);
    };
    SourceMapGenerator2.prototype.toJSON = function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._file != null) {
        map.file = this._file;
      }
      if (this._sourceRoot != null) {
        map.sourceRoot = this._sourceRoot;
      }
      if (this._sourcesContents) {
        map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
      }
      return map;
    };
    SourceMapGenerator2.prototype.toString = function SourceMapGenerator_toString() {
      return JSON.stringify(this.toJSON());
    };
    exports.SourceMapGenerator = SourceMapGenerator2;
  }
});

// www/node_modules/source-map-js/lib/binary-search.js
var require_binary_search = __commonJS({
  "www/node_modules/source-map-js/lib/binary-search.js"(exports) {
    exports.GREATEST_LOWER_BOUND = 1;
    exports.LEAST_UPPER_BOUND = 2;
    function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow;
      var cmp = aCompare(aNeedle, aHaystack[mid], true);
      if (cmp === 0) {
        return mid;
      } else if (cmp > 0) {
        if (aHigh - mid > 1) {
          return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return aHigh < aHaystack.length ? aHigh : -1;
        } else {
          return mid;
        }
      } else {
        if (mid - aLow > 1) {
          return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
        }
        if (aBias == exports.LEAST_UPPER_BOUND) {
          return mid;
        } else {
          return aLow < 0 ? -1 : aLow;
        }
      }
    }
    exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
      if (aHaystack.length === 0) {
        return -1;
      }
      var index = recursiveSearch(
        -1,
        aHaystack.length,
        aNeedle,
        aHaystack,
        aCompare,
        aBias || exports.GREATEST_LOWER_BOUND
      );
      if (index < 0) {
        return -1;
      }
      while (index - 1 >= 0) {
        if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
          break;
        }
        --index;
      }
      return index;
    };
  }
});

// www/node_modules/source-map-js/lib/quick-sort.js
var require_quick_sort = __commonJS({
  "www/node_modules/source-map-js/lib/quick-sort.js"(exports) {
    function SortTemplate(comparator) {
      function swap(ary, x2, y) {
        var temp = ary[x2];
        ary[x2] = ary[y];
        ary[y] = temp;
      }
      function randomIntInRange(low, high) {
        return Math.round(low + Math.random() * (high - low));
      }
      function doQuickSort(ary, comparator2, p2, r2) {
        if (p2 < r2) {
          var pivotIndex = randomIntInRange(p2, r2);
          var i = p2 - 1;
          swap(ary, pivotIndex, r2);
          var pivot = ary[r2];
          for (var j = p2; j < r2; j++) {
            if (comparator2(ary[j], pivot, false) <= 0) {
              i += 1;
              swap(ary, i, j);
            }
          }
          swap(ary, i + 1, j);
          var q2 = i + 1;
          doQuickSort(ary, comparator2, p2, q2 - 1);
          doQuickSort(ary, comparator2, q2 + 1, r2);
        }
      }
      return doQuickSort;
    }
    function cloneSort(comparator) {
      let template = SortTemplate.toString();
      let templateFn = new Function(`return ${template}`)();
      return templateFn(comparator);
    }
    var sortCache = /* @__PURE__ */ new WeakMap();
    exports.quickSort = function(ary, comparator, start = 0) {
      let doQuickSort = sortCache.get(comparator);
      if (doQuickSort === void 0) {
        doQuickSort = cloneSort(comparator);
        sortCache.set(comparator, doQuickSort);
      }
      doQuickSort(ary, comparator, start, ary.length - 1);
    };
  }
});

// www/node_modules/source-map-js/lib/source-map-consumer.js
var require_source_map_consumer = __commonJS({
  "www/node_modules/source-map-js/lib/source-map-consumer.js"(exports) {
    var util = require_util();
    var binarySearch = require_binary_search();
    var ArraySet = require_array_set().ArraySet;
    var base64VLQ = require_base64_vlq();
    var quickSort = require_quick_sort().quickSort;
    function SourceMapConsumer2(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
    }
    SourceMapConsumer2.fromSourceMap = function(aSourceMap, aSourceMapURL) {
      return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
    };
    SourceMapConsumer2.prototype._version = 3;
    SourceMapConsumer2.prototype.__generatedMappings = null;
    Object.defineProperty(SourceMapConsumer2.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__generatedMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__generatedMappings;
      }
    });
    SourceMapConsumer2.prototype.__originalMappings = null;
    Object.defineProperty(SourceMapConsumer2.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        if (!this.__originalMappings) {
          this._parseMappings(this._mappings, this.sourceRoot);
        }
        return this.__originalMappings;
      }
    });
    SourceMapConsumer2.prototype._charIsMappingSeparator = function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
      var c = aStr.charAt(index);
      return c === ";" || c === ",";
    };
    SourceMapConsumer2.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      throw new Error("Subclasses must implement _parseMappings");
    };
    SourceMapConsumer2.GENERATED_ORDER = 1;
    SourceMapConsumer2.ORIGINAL_ORDER = 2;
    SourceMapConsumer2.GREATEST_LOWER_BOUND = 1;
    SourceMapConsumer2.LEAST_UPPER_BOUND = 2;
    SourceMapConsumer2.prototype.eachMapping = function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer2.GENERATED_ORDER;
      var mappings;
      switch (order) {
        case SourceMapConsumer2.GENERATED_ORDER:
          mappings = this._generatedMappings;
          break;
        case SourceMapConsumer2.ORIGINAL_ORDER:
          mappings = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var sourceRoot = this.sourceRoot;
      var boundCallback = aCallback.bind(context);
      var names = this._names;
      var sources = this._sources;
      var sourceMapURL = this._sourceMapURL;
      for (var i = 0, n2 = mappings.length; i < n2; i++) {
        var mapping = mappings[i];
        var source = mapping.source === null ? null : sources.at(mapping.source);
        if (source !== null) {
          source = util.computeSourceURL(sourceRoot, source, sourceMapURL);
        }
        boundCallback({
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : names.at(mapping.name)
        });
      }
    };
    SourceMapConsumer2.prototype.allGeneratedPositionsFor = function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
      var line = util.getArg(aArgs, "line");
      var needle = {
        source: util.getArg(aArgs, "source"),
        originalLine: line,
        originalColumn: util.getArg(aArgs, "column", 0)
      };
      needle.source = this._findSourceIndex(needle.source);
      if (needle.source < 0) {
        return [];
      }
      var mappings = [];
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        binarySearch.LEAST_UPPER_BOUND
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (aArgs.column === void 0) {
          var originalLine = mapping.originalLine;
          while (mapping && mapping.originalLine === originalLine) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        } else {
          var originalColumn = mapping.originalColumn;
          while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn) {
            mappings.push({
              line: util.getArg(mapping, "generatedLine", null),
              column: util.getArg(mapping, "generatedColumn", null),
              lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
            });
            mapping = this._originalMappings[++index];
          }
        }
      }
      return mappings;
    };
    exports.SourceMapConsumer = SourceMapConsumer2;
    function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sources = util.getArg(sourceMap, "sources");
      var names = util.getArg(sourceMap, "names", []);
      var sourceRoot = util.getArg(sourceMap, "sourceRoot", null);
      var sourcesContent = util.getArg(sourceMap, "sourcesContent", null);
      var mappings = util.getArg(sourceMap, "mappings");
      var file = util.getArg(sourceMap, "file", null);
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }
      sources = sources.map(String).map(util.normalize).map(function(source) {
        return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
      });
      this._names = ArraySet.fromArray(names.map(String), true);
      this._sources = ArraySet.fromArray(sources, true);
      this._absoluteSources = this._sources.toArray().map(function(s2) {
        return util.computeSourceURL(sourceRoot, s2, aSourceMapURL);
      });
      this.sourceRoot = sourceRoot;
      this.sourcesContent = sourcesContent;
      this._mappings = mappings;
      this._sourceMapURL = aSourceMapURL;
      this.file = file;
    }
    BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer2.prototype);
    BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer2;
    BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      if (this._sources.has(relativeSource)) {
        return this._sources.indexOf(relativeSource);
      }
      var i;
      for (i = 0; i < this._absoluteSources.length; ++i) {
        if (this._absoluteSources[i] == aSource) {
          return i;
        }
      }
      return -1;
    };
    BasicSourceMapConsumer.fromSourceMap = function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
      var smc = Object.create(BasicSourceMapConsumer.prototype);
      var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
      var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
      smc.sourceRoot = aSourceMap._sourceRoot;
      smc.sourcesContent = aSourceMap._generateSourcesContent(
        smc._sources.toArray(),
        smc.sourceRoot
      );
      smc.file = aSourceMap._file;
      smc._sourceMapURL = aSourceMapURL;
      smc._absoluteSources = smc._sources.toArray().map(function(s2) {
        return util.computeSourceURL(smc.sourceRoot, s2, aSourceMapURL);
      });
      var generatedMappings = aSourceMap._mappings.toArray().slice();
      var destGeneratedMappings = smc.__generatedMappings = [];
      var destOriginalMappings = smc.__originalMappings = [];
      for (var i = 0, length = generatedMappings.length; i < length; i++) {
        var srcMapping = generatedMappings[i];
        var destMapping = new Mapping();
        destMapping.generatedLine = srcMapping.generatedLine;
        destMapping.generatedColumn = srcMapping.generatedColumn;
        if (srcMapping.source) {
          destMapping.source = sources.indexOf(srcMapping.source);
          destMapping.originalLine = srcMapping.originalLine;
          destMapping.originalColumn = srcMapping.originalColumn;
          if (srcMapping.name) {
            destMapping.name = names.indexOf(srcMapping.name);
          }
          destOriginalMappings.push(destMapping);
        }
        destGeneratedMappings.push(destMapping);
      }
      quickSort(smc.__originalMappings, util.compareByOriginalPositions);
      return smc;
    };
    BasicSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function Mapping() {
      this.generatedLine = 0;
      this.generatedColumn = 0;
      this.source = null;
      this.originalLine = null;
      this.originalColumn = null;
      this.name = null;
    }
    var compareGenerated = util.compareByGeneratedPositionsDeflatedNoLine;
    function sortGenerated(array, start) {
      let l = array.length;
      let n2 = array.length - start;
      if (n2 <= 1) {
        return;
      } else if (n2 == 2) {
        let a2 = array[start];
        let b = array[start + 1];
        if (compareGenerated(a2, b) > 0) {
          array[start] = b;
          array[start + 1] = a2;
        }
      } else if (n2 < 20) {
        for (let i = start; i < l; i++) {
          for (let j = i; j > start; j--) {
            let a2 = array[j - 1];
            let b = array[j];
            if (compareGenerated(a2, b) <= 0) {
              break;
            }
            array[j - 1] = b;
            array[j] = a2;
          }
        }
      } else {
        quickSort(array, compareGenerated, start);
      }
    }
    BasicSourceMapConsumer.prototype._parseMappings = function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var length = aStr.length;
      var index = 0;
      var cachedSegments = {};
      var temp = {};
      var originalMappings = [];
      var generatedMappings = [];
      var mapping, str, segment, end, value;
      let subarrayStart = 0;
      while (index < length) {
        if (aStr.charAt(index) === ";") {
          generatedLine++;
          index++;
          previousGeneratedColumn = 0;
          sortGenerated(generatedMappings, subarrayStart);
          subarrayStart = generatedMappings.length;
        } else if (aStr.charAt(index) === ",") {
          index++;
        } else {
          mapping = new Mapping();
          mapping.generatedLine = generatedLine;
          for (end = index; end < length; end++) {
            if (this._charIsMappingSeparator(aStr, end)) {
              break;
            }
          }
          str = aStr.slice(index, end);
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }
          if (segment.length === 2) {
            throw new Error("Found a source, but no line and column");
          }
          if (segment.length === 3) {
            throw new Error("Found a source and line, but no column");
          }
          mapping.generatedColumn = previousGeneratedColumn + segment[0];
          previousGeneratedColumn = mapping.generatedColumn;
          if (segment.length > 1) {
            mapping.source = previousSource + segment[1];
            previousSource += segment[1];
            mapping.originalLine = previousOriginalLine + segment[2];
            previousOriginalLine = mapping.originalLine;
            mapping.originalLine += 1;
            mapping.originalColumn = previousOriginalColumn + segment[3];
            previousOriginalColumn = mapping.originalColumn;
            if (segment.length > 4) {
              mapping.name = previousName + segment[4];
              previousName += segment[4];
            }
          }
          generatedMappings.push(mapping);
          if (typeof mapping.originalLine === "number") {
            let currentSource = mapping.source;
            while (originalMappings.length <= currentSource) {
              originalMappings.push(null);
            }
            if (originalMappings[currentSource] === null) {
              originalMappings[currentSource] = [];
            }
            originalMappings[currentSource].push(mapping);
          }
        }
      }
      sortGenerated(generatedMappings, subarrayStart);
      this.__generatedMappings = generatedMappings;
      for (var i = 0; i < originalMappings.length; i++) {
        if (originalMappings[i] != null) {
          quickSort(originalMappings[i], util.compareByOriginalPositionsNoSource);
        }
      }
      this.__originalMappings = [].concat(...originalMappings);
    };
    BasicSourceMapConsumer.prototype._findMapping = function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
      if (aNeedle[aLineName] <= 0) {
        throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
      }
      return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
    };
    BasicSourceMapConsumer.prototype.computeColumnSpans = function SourceMapConsumer_computeColumnSpans() {
      for (var index = 0; index < this._generatedMappings.length; ++index) {
        var mapping = this._generatedMappings[index];
        if (index + 1 < this._generatedMappings.length) {
          var nextMapping = this._generatedMappings[index + 1];
          if (mapping.generatedLine === nextMapping.generatedLine) {
            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
            continue;
          }
        }
        mapping.lastGeneratedColumn = Infinity;
      }
    };
    BasicSourceMapConsumer.prototype.originalPositionFor = function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._generatedMappings,
        "generatedLine",
        "generatedColumn",
        util.compareByGeneratedPositionsDeflated,
        util.getArg(aArgs, "bias", SourceMapConsumer2.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._generatedMappings[index];
        if (mapping.generatedLine === needle.generatedLine) {
          var source = util.getArg(mapping, "source", null);
          if (source !== null) {
            source = this._sources.at(source);
            source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
          }
          var name = util.getArg(mapping, "name", null);
          if (name !== null) {
            name = this._names.at(name);
          }
          return {
            source,
            line: util.getArg(mapping, "originalLine", null),
            column: util.getArg(mapping, "originalColumn", null),
            name
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };
    BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function BasicSourceMapConsumer_hasContentsOfAllSources() {
      if (!this.sourcesContent) {
        return false;
      }
      return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(sc) {
        return sc == null;
      });
    };
    BasicSourceMapConsumer.prototype.sourceContentFor = function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      if (!this.sourcesContent) {
        return null;
      }
      var index = this._findSourceIndex(aSource);
      if (index >= 0) {
        return this.sourcesContent[index];
      }
      var relativeSource = aSource;
      if (this.sourceRoot != null) {
        relativeSource = util.relative(this.sourceRoot, relativeSource);
      }
      var url;
      if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
        var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
        if (url.scheme == "file" && this._sources.has(fileUriAbsPath)) {
          return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
        }
        if ((!url.path || url.path == "/") && this._sources.has("/" + relativeSource)) {
          return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + relativeSource + '" is not in the SourceMap.');
      }
    };
    BasicSourceMapConsumer.prototype.generatedPositionFor = function SourceMapConsumer_generatedPositionFor(aArgs) {
      var source = util.getArg(aArgs, "source");
      source = this._findSourceIndex(source);
      if (source < 0) {
        return {
          line: null,
          column: null,
          lastColumn: null
        };
      }
      var needle = {
        source,
        originalLine: util.getArg(aArgs, "line"),
        originalColumn: util.getArg(aArgs, "column")
      };
      var index = this._findMapping(
        needle,
        this._originalMappings,
        "originalLine",
        "originalColumn",
        util.compareByOriginalPositions,
        util.getArg(aArgs, "bias", SourceMapConsumer2.GREATEST_LOWER_BOUND)
      );
      if (index >= 0) {
        var mapping = this._originalMappings[index];
        if (mapping.source === needle.source) {
          return {
            line: util.getArg(mapping, "generatedLine", null),
            column: util.getArg(mapping, "generatedColumn", null),
            lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
          };
        }
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    };
    exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
    function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
      var sourceMap = aSourceMap;
      if (typeof aSourceMap === "string") {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }
      var version = util.getArg(sourceMap, "version");
      var sections = util.getArg(sourceMap, "sections");
      if (version != this._version) {
        throw new Error("Unsupported version: " + version);
      }
      this._sources = new ArraySet();
      this._names = new ArraySet();
      var lastOffset = {
        line: -1,
        column: 0
      };
      this._sections = sections.map(function(s2) {
        if (s2.url) {
          throw new Error("Support for url field in sections not implemented.");
        }
        var offset = util.getArg(s2, "offset");
        var offsetLine = util.getArg(offset, "line");
        var offsetColumn = util.getArg(offset, "column");
        if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) {
          throw new Error("Section offsets must be ordered and non-overlapping.");
        }
        lastOffset = offset;
        return {
          generatedOffset: {
            // The offset fields are 0-based, but we use 1-based indices when
            // encoding/decoding from VLQ.
            generatedLine: offsetLine + 1,
            generatedColumn: offsetColumn + 1
          },
          consumer: new SourceMapConsumer2(util.getArg(s2, "map"), aSourceMapURL)
        };
      });
    }
    IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer2.prototype);
    IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer2;
    IndexedSourceMapConsumer.prototype._version = 3;
    Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
      get: function() {
        var sources = [];
        for (var i = 0; i < this._sections.length; i++) {
          for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
            sources.push(this._sections[i].consumer.sources[j]);
          }
        }
        return sources;
      }
    });
    IndexedSourceMapConsumer.prototype.originalPositionFor = function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, "line"),
        generatedColumn: util.getArg(aArgs, "column")
      };
      var sectionIndex = binarySearch.search(
        needle,
        this._sections,
        function(needle2, section2) {
          var cmp = needle2.generatedLine - section2.generatedOffset.generatedLine;
          if (cmp) {
            return cmp;
          }
          return needle2.generatedColumn - section2.generatedOffset.generatedColumn;
        }
      );
      var section = this._sections[sectionIndex];
      if (!section) {
        return {
          source: null,
          line: null,
          column: null,
          name: null
        };
      }
      return section.consumer.originalPositionFor({
        line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
        column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        bias: aArgs.bias
      });
    };
    IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function IndexedSourceMapConsumer_hasContentsOfAllSources() {
      return this._sections.every(function(s2) {
        return s2.consumer.hasContentsOfAllSources();
      });
    };
    IndexedSourceMapConsumer.prototype.sourceContentFor = function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var content = section.consumer.sourceContentFor(aSource, true);
        if (content || content === "") {
          return content;
        }
      }
      if (nullOnMissing) {
        return null;
      } else {
        throw new Error('"' + aSource + '" is not in the SourceMap.');
      }
    };
    IndexedSourceMapConsumer.prototype.generatedPositionFor = function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        if (section.consumer._findSourceIndex(util.getArg(aArgs, "source")) === -1) {
          continue;
        }
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) {
          var ret = {
            line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
            column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
          };
          return ret;
        }
      }
      return {
        line: null,
        column: null
      };
    };
    IndexedSourceMapConsumer.prototype._parseMappings = function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      this.__generatedMappings = [];
      this.__originalMappings = [];
      for (var i = 0; i < this._sections.length; i++) {
        var section = this._sections[i];
        var sectionMappings = section.consumer._generatedMappings;
        for (var j = 0; j < sectionMappings.length; j++) {
          var mapping = sectionMappings[j];
          var source = section.consumer._sources.at(mapping.source);
          if (source !== null) {
            source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
          }
          this._sources.add(source);
          source = this._sources.indexOf(source);
          var name = null;
          if (mapping.name) {
            name = section.consumer._names.at(mapping.name);
            this._names.add(name);
            name = this._names.indexOf(name);
          }
          var adjustedMapping = {
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping);
          if (typeof adjustedMapping.originalLine === "number") {
            this.__originalMappings.push(adjustedMapping);
          }
        }
      }
      quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
      quickSort(this.__originalMappings, util.compareByOriginalPositions);
    };
    exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
  }
});

// www/node_modules/source-map-js/lib/source-node.js
var require_source_node = __commonJS({
  "www/node_modules/source-map-js/lib/source-node.js"(exports) {
    var SourceMapGenerator2 = require_source_map_generator().SourceMapGenerator;
    var util = require_util();
    var REGEX_NEWLINE = /(\r?\n)/;
    var NEWLINE_CODE = 10;
    var isSourceNode = "$$$isSourceNode$$$";
    function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
      this.children = [];
      this.sourceContents = {};
      this.line = aLine == null ? null : aLine;
      this.column = aColumn == null ? null : aColumn;
      this.source = aSource == null ? null : aSource;
      this.name = aName == null ? null : aName;
      this[isSourceNode] = true;
      if (aChunks != null) this.add(aChunks);
    }
    SourceNode.fromStringWithSourceMap = function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
      var node = new SourceNode();
      var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
      var remainingLinesIndex = 0;
      var shiftNextLine = function() {
        var lineContents = getNextLine();
        var newLine = getNextLine() || "";
        return lineContents + newLine;
        function getNextLine() {
          return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
        }
      };
      var lastGeneratedLine = 1, lastGeneratedColumn = 0;
      var lastMapping = null;
      aSourceMapConsumer.eachMapping(function(mapping) {
        if (lastMapping !== null) {
          if (lastGeneratedLine < mapping.generatedLine) {
            addMappingWithCode(lastMapping, shiftNextLine());
            lastGeneratedLine++;
            lastGeneratedColumn = 0;
          } else {
            var nextLine = remainingLines[remainingLinesIndex] || "";
            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
            remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
            lastGeneratedColumn = mapping.generatedColumn;
            addMappingWithCode(lastMapping, code);
            lastMapping = mapping;
            return;
          }
        }
        while (lastGeneratedLine < mapping.generatedLine) {
          node.add(shiftNextLine());
          lastGeneratedLine++;
        }
        if (lastGeneratedColumn < mapping.generatedColumn) {
          var nextLine = remainingLines[remainingLinesIndex] || "";
          node.add(nextLine.substr(0, mapping.generatedColumn));
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
        }
        lastMapping = mapping;
      }, this);
      if (remainingLinesIndex < remainingLines.length) {
        if (lastMapping) {
          addMappingWithCode(lastMapping, shiftNextLine());
        }
        node.add(remainingLines.splice(remainingLinesIndex).join(""));
      }
      aSourceMapConsumer.sources.forEach(function(sourceFile) {
        var content = aSourceMapConsumer.sourceContentFor(sourceFile);
        if (content != null) {
          if (aRelativePath != null) {
            sourceFile = util.join(aRelativePath, sourceFile);
          }
          node.setSourceContent(sourceFile, content);
        }
      });
      return node;
      function addMappingWithCode(mapping, code) {
        if (mapping === null || mapping.source === void 0) {
          node.add(code);
        } else {
          var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
          node.add(new SourceNode(
            mapping.originalLine,
            mapping.originalColumn,
            source,
            code,
            mapping.name
          ));
        }
      }
    };
    SourceNode.prototype.add = function SourceNode_add(aChunk) {
      if (Array.isArray(aChunk)) {
        aChunk.forEach(function(chunk) {
          this.add(chunk);
        }, this);
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        if (aChunk) {
          this.children.push(aChunk);
        }
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
      if (Array.isArray(aChunk)) {
        for (var i = aChunk.length - 1; i >= 0; i--) {
          this.prepend(aChunk[i]);
        }
      } else if (aChunk[isSourceNode] || typeof aChunk === "string") {
        this.children.unshift(aChunk);
      } else {
        throw new TypeError(
          "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
        );
      }
      return this;
    };
    SourceNode.prototype.walk = function SourceNode_walk(aFn) {
      var chunk;
      for (var i = 0, len = this.children.length; i < len; i++) {
        chunk = this.children[i];
        if (chunk[isSourceNode]) {
          chunk.walk(aFn);
        } else {
          if (chunk !== "") {
            aFn(chunk, {
              source: this.source,
              line: this.line,
              column: this.column,
              name: this.name
            });
          }
        }
      }
    };
    SourceNode.prototype.join = function SourceNode_join(aSep) {
      var newChildren;
      var i;
      var len = this.children.length;
      if (len > 0) {
        newChildren = [];
        for (i = 0; i < len - 1; i++) {
          newChildren.push(this.children[i]);
          newChildren.push(aSep);
        }
        newChildren.push(this.children[i]);
        this.children = newChildren;
      }
      return this;
    };
    SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
      var lastChild = this.children[this.children.length - 1];
      if (lastChild[isSourceNode]) {
        lastChild.replaceRight(aPattern, aReplacement);
      } else if (typeof lastChild === "string") {
        this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
      } else {
        this.children.push("".replace(aPattern, aReplacement));
      }
      return this;
    };
    SourceNode.prototype.setSourceContent = function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
      this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
    };
    SourceNode.prototype.walkSourceContents = function SourceNode_walkSourceContents(aFn) {
      for (var i = 0, len = this.children.length; i < len; i++) {
        if (this.children[i][isSourceNode]) {
          this.children[i].walkSourceContents(aFn);
        }
      }
      var sources = Object.keys(this.sourceContents);
      for (var i = 0, len = sources.length; i < len; i++) {
        aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
      }
    };
    SourceNode.prototype.toString = function SourceNode_toString() {
      var str = "";
      this.walk(function(chunk) {
        str += chunk;
      });
      return str;
    };
    SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
      var generated = {
        code: "",
        line: 1,
        column: 0
      };
      var map = new SourceMapGenerator2(aArgs);
      var sourceMappingActive = false;
      var lastOriginalSource = null;
      var lastOriginalLine = null;
      var lastOriginalColumn = null;
      var lastOriginalName = null;
      this.walk(function(chunk, original) {
        generated.code += chunk;
        if (original.source !== null && original.line !== null && original.column !== null) {
          if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name) {
            map.addMapping({
              source: original.source,
              original: {
                line: original.line,
                column: original.column
              },
              generated: {
                line: generated.line,
                column: generated.column
              },
              name: original.name
            });
          }
          lastOriginalSource = original.source;
          lastOriginalLine = original.line;
          lastOriginalColumn = original.column;
          lastOriginalName = original.name;
          sourceMappingActive = true;
        } else if (sourceMappingActive) {
          map.addMapping({
            generated: {
              line: generated.line,
              column: generated.column
            }
          });
          lastOriginalSource = null;
          sourceMappingActive = false;
        }
        for (var idx = 0, length = chunk.length; idx < length; idx++) {
          if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
            generated.line++;
            generated.column = 0;
            if (idx + 1 === length) {
              lastOriginalSource = null;
              sourceMappingActive = false;
            } else if (sourceMappingActive) {
              map.addMapping({
                source: original.source,
                original: {
                  line: original.line,
                  column: original.column
                },
                generated: {
                  line: generated.line,
                  column: generated.column
                },
                name: original.name
              });
            }
          } else {
            generated.column++;
          }
        }
      });
      this.walkSourceContents(function(sourceFile, sourceContent) {
        map.setSourceContent(sourceFile, sourceContent);
      });
      return { code: generated.code, map };
    };
    exports.SourceNode = SourceNode;
  }
});

// www/node_modules/source-map-js/source-map.js
var require_source_map = __commonJS({
  "www/node_modules/source-map-js/source-map.js"(exports) {
    exports.SourceMapGenerator = require_source_map_generator().SourceMapGenerator;
    exports.SourceMapConsumer = require_source_map_consumer().SourceMapConsumer;
    exports.SourceNode = require_source_node().SourceNode;
  }
});

// www/node_modules/@remix-run/fetch-router/dist/lib/request-context.js
var RequestContext = class {
  /**
   * @param request The incoming request
   */
  constructor(request) {
    this.headers = new Headers(request.headers);
    this.method = request.method.toUpperCase();
    this.params = {};
    this.request = request;
    this.url = new URL(request.url);
  }
  /**
   * The headers of the request.
   */
  headers;
  /**
   * The request method. This may differ from `request.method` when using the `methodOverride`
   * middleware, which allows HTML forms to simulate RESTful API request methods like `PUT` and
   * `DELETE` using a hidden input field.
   */
  method;
  /**
   * Params that were parsed from the URL.
   */
  params;
  /**
   * The original request that was dispatched to the router.
   *
   * Note: Various properties of the original request may not be available or may have been
   * modified by middleware. For example, the request's body may already have been consumed by the
   * `formData` middleware (available as `context.get(FormData)`), or its method may have been
   * overridden by the `methodOverride` middleware (available as `context.method`). You should
   * default to using properties of the `context` object instead of the original request.
   * However, the original request is made available in case you need it for some edge case.
   */
  request;
  #contextMap = /* @__PURE__ */ new Map();
  /**
   * Get a value from request context.
   *
   * @param key The key to read
   * @returns The value for the given key
   */
  get = (key) => {
    if (!this.#contextMap.has(key)) {
      let contextKey = key;
      if (contextKey.defaultValue === void 0) {
        throw new Error(`Missing default value in context for key ${key}`);
      }
      return contextKey.defaultValue;
    }
    return this.#contextMap.get(key);
  };
  /**
   * Check whether a value exists in request context.
   *
   * @param key The key to check
   * @returns `true` if a value has been set for the key
   */
  has = (key) => this.#contextMap.has(key);
  /**
   * Set a value in request context.
   *
   * @param key The key to write
   * @param value The value to write
   */
  set = (key, value) => {
    this.#contextMap.set(key, value);
  };
  #router;
  /**
   * The router handling this request.
   */
  get router() {
    if (this.#router == null) {
      throw new Error("No router found in request context.");
    }
    return this.#router;
  }
  set router(router2) {
    this.#router = router2;
  }
  /**
   * The URL of the current request.
   */
  url;
};

// www/node_modules/@remix-run/fetch-router/dist/lib/request-methods.js
var RequestBodyMethods = ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"];
var RequestMethods = ["GET", "HEAD", ...RequestBodyMethods];

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/split.js
function split(source) {
  let result = {
    protocol: null,
    hostname: null,
    port: null,
    pathname: null,
    search: null
  };
  let questionMarkIndex = source.indexOf("?");
  if (questionMarkIndex !== -1) {
    result.search = span(questionMarkIndex + 1, source.length);
    source = source.slice(0, questionMarkIndex);
  }
  let solidusIndex = source.indexOf("://");
  if (solidusIndex === -1) {
    result.pathname = pathnameSpan(source, 0, source.length);
    return result;
  }
  let slashIndex = source.indexOf("/");
  if (slashIndex === solidusIndex + 1) {
    slashIndex = source.indexOf("/", solidusIndex + 3);
  }
  if (slashIndex === -1) {
    result.protocol = span(0, solidusIndex);
    let host2 = span(solidusIndex + 3, source.length);
    if (host2) {
      let { hostname, port } = hostSpans(source, host2);
      result.hostname = hostname;
      result.port = port;
    }
    return result;
  }
  if (slashIndex < solidusIndex) {
    result.pathname = pathnameSpan(source, 0, source.length);
    return result;
  }
  result.protocol = span(0, solidusIndex);
  let host = span(solidusIndex + 3, slashIndex);
  if (host) {
    let { hostname, port } = hostSpans(source, host);
    result.hostname = hostname;
    result.port = port;
  }
  result.pathname = pathnameSpan(source, slashIndex, source.length);
  return result;
}
function span(start, end) {
  if (start === end)
    return null;
  return [start, end];
}
function hostSpans(source, host) {
  let lastColonIndex = source.slice(0, host[1]).lastIndexOf(":");
  if (lastColonIndex === -1 || lastColonIndex < host[0])
    return { hostname: host, port: null };
  if (source.slice(lastColonIndex + 1, host[1]).match(/^\d+$/)) {
    return { hostname: span(host[0], lastColonIndex), port: span(lastColonIndex + 1, host[1]) };
  }
  return { hostname: host, port: null };
}
function pathnameSpan(source, begin, end) {
  if (source[begin] === "/")
    begin += 1;
  return span(begin, end);
}

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/parse.js
function parseProtocol(source, span2) {
  if (!span2)
    return null;
  let protocol = source.slice(...span2);
  if (protocol === "" || protocol === "http" || protocol === "https" || protocol === "http(s)") {
    return protocol === "" ? null : protocol;
  }
  throw new ParseError("invalid protocol", source, span2[0]);
}
function parseHostname(source, span2) {
  if (!span2)
    return null;
  let part = PartPattern.parse(source, { span: span2, type: "hostname" });
  if (isNamelessWildcard(part))
    return null;
  return part;
}
function isNamelessWildcard(part) {
  if (part.tokens.length !== 1)
    return false;
  let token = part.tokens[0];
  if (token.type !== "*")
    return false;
  return token.name === "*";
}
function parseSearch(source) {
  let constraints = /* @__PURE__ */ new Map();
  let searchParams = new URLSearchParams(source);
  for (let [key, value] of searchParams) {
    let requiredValues = constraints.get(key);
    if (!requiredValues) {
      requiredValues = /* @__PURE__ */ new Set();
      constraints.set(key, requiredValues);
    }
    if (value === "")
      continue;
    requiredValues.add(value);
  }
  return constraints;
}
var ParseError = class extends Error {
  /**
   * The parse failure category.
   */
  type;
  /**
   * Original pattern source being parsed.
   */
  source;
  /**
   * Character index where parsing failed.
   */
  index;
  constructor(type, source, index) {
    let underline = " ".repeat(index) + "^";
    let message = `${type}

${source}
${underline}`;
    super(message);
    this.name = "ParseError";
    this.type = type;
    this.source = source;
    this.index = index;
  }
};

// www/node_modules/@remix-run/route-pattern/dist/lib/unreachable.js
function unreachable(value) {
  let message = value === void 0 ? "Unreachable" : `Unreachable: ${value}`;
  throw new Error(message);
}

// www/node_modules/@remix-run/route-pattern/dist/lib/regexp.js
function escape(text) {
  return text.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");
}

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/href.js
function hrefSearch(pattern, searchParams) {
  let constraints = pattern.ast.search;
  if (constraints.size === 0 && Object.keys(searchParams).length === 0) {
    return void 0;
  }
  let urlSearchParams = new URLSearchParams();
  for (let [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (let v2 of value) {
        if (v2 != null) {
          urlSearchParams.append(key, String(v2));
        }
      }
    } else if (value != null) {
      urlSearchParams.append(key, String(value));
    }
  }
  for (let [key, requiredValues] of constraints) {
    if (requiredValues.size === 0) {
      if (key in searchParams)
        continue;
      urlSearchParams.append(key, "");
    } else {
      for (let value of requiredValues) {
        if (urlSearchParams.getAll(key).includes(value))
          continue;
        urlSearchParams.append(key, value);
      }
    }
  }
  let result = urlSearchParams.toString();
  return result || void 0;
}
var HrefError = class _HrefError extends Error {
  /**
   * Structured details describing why href generation failed.
   */
  details;
  constructor(details) {
    let message = _HrefError.message(details);
    super(message);
    this.name = "HrefError";
    this.details = details;
  }
  /**
   * Formats an error message for the given href failure details.
   *
   * @param details Structured href failure details.
   * @returns A human-readable error message.
   */
  static message(details) {
    let pattern = details.pattern.toString();
    if (details.type === "missing-hostname") {
      return `pattern requires hostname

Pattern: ${pattern}`;
    }
    if (details.type === "nameless-wildcard") {
      return `pattern contains nameless wildcard

Pattern: ${pattern}`;
    }
    if (details.type === "missing-params") {
      let params = details.missingParams.map((p2) => `'${p2}'`).join(", ");
      return `missing param(s): ${params}

Pattern: ${pattern}
Params: ${JSON.stringify(details.params)}`;
    }
    unreachable(details);
  }
};

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/part-pattern.js
var IDENTIFIER_RE = /^[a-zA-Z_$][a-zA-Z_$0-9]*/;
var PartPattern = class _PartPattern {
  tokens;
  optionals;
  type;
  #regexp;
  constructor(args, options) {
    this.tokens = args.tokens;
    this.optionals = args.optionals;
    this.type = options.type;
  }
  get params() {
    let result = [];
    for (let token of this.tokens) {
      if (token.type === ":" || token.type === "*") {
        result.push(token);
      }
    }
    return result;
  }
  get separator() {
    return separatorForType(this.type);
  }
  static parse(source, options) {
    let span2 = options.span ?? [0, source.length];
    let separator = separatorForType(options.type);
    let tokens = [];
    let optionals = /* @__PURE__ */ new Map();
    let appendText = (text) => {
      let currentToken = tokens.at(-1);
      if (currentToken?.type === "text") {
        currentToken.text += text;
      } else {
        tokens.push({ type: "text", text });
      }
    };
    let i = span2[0];
    let optionalStack = [];
    while (i < span2[1]) {
      let char = source[i];
      if (char === "(") {
        optionalStack.push(tokens.length);
        tokens.push({ type: char });
        i += 1;
        continue;
      }
      if (char === ")") {
        let begin = optionalStack.pop();
        if (begin === void 0) {
          throw new ParseError("unmatched )", source, i);
        }
        optionals.set(begin, tokens.length);
        tokens.push({ type: char });
        i += 1;
        continue;
      }
      if (char === ":") {
        i += 1;
        let name = IDENTIFIER_RE.exec(source.slice(i, span2[1]))?.[0];
        if (!name) {
          throw new ParseError("missing variable name", source, i - 1);
        }
        tokens.push({ type: ":", name });
        i += name.length;
        continue;
      }
      if (char === "*") {
        i += 1;
        let name = IDENTIFIER_RE.exec(source.slice(i, span2[1]))?.[0];
        tokens.push({ type: "*", name: name ?? "*" });
        i += name?.length ?? 0;
        continue;
      }
      if (separator && char === separator) {
        tokens.push({ type: "separator" });
        i += 1;
        continue;
      }
      if (char === "\\") {
        if (i + 1 === span2[1]) {
          throw new ParseError("dangling escape", source, i);
        }
        let text = source.slice(i, i + 2);
        appendText(text);
        i += text.length;
        continue;
      }
      appendText(char);
      i += 1;
    }
    if (optionalStack.length > 0) {
      throw new ParseError("unmatched (", source, optionalStack.at(-1));
    }
    return new _PartPattern({ tokens, optionals }, { type: options.type });
  }
  get source() {
    let result = "";
    for (let token of this.tokens) {
      if (token.type === "(" || token.type === ")") {
        result += token.type;
        continue;
      }
      if (token.type === "text") {
        result += token.text;
        continue;
      }
      if (token.type === ":" || token.type === "*") {
        let name = token.name === "*" ? "" : token.name;
        result += `${token.type}${name}`;
        continue;
      }
      if (token.type === "separator") {
        result += this.separator;
        continue;
      }
      unreachable(token.type);
    }
    return result;
  }
  /**
   * Generate a partial href from a part pattern and params.
   *
   * @param pattern The route pattern containing the part pattern.
   * @param params The parameters to substitute into the pattern.
   * @returns The partial href for the given params
   */
  href(pattern, params) {
    let missingParams = [];
    let stack = [{ href: "" }];
    let i = 0;
    while (i < this.tokens.length) {
      let token = this.tokens[i];
      if (token.type === "text") {
        stack[stack.length - 1].href += token.text;
        i += 1;
        continue;
      }
      if (token.type === "separator") {
        stack[stack.length - 1].href += this.separator;
        i += 1;
        continue;
      }
      if (token.type === "(") {
        stack.push({ begin: i, href: "" });
        i += 1;
        continue;
      }
      if (token.type === ")") {
        let frame = stack.pop();
        stack[stack.length - 1].href += frame.href;
        i += 1;
        continue;
      }
      if (token.type === ":" || token.type === "*") {
        let value = params[token.name];
        if (value === void 0) {
          if (stack.length <= 1) {
            if (token.name === "*") {
              throw new HrefError({
                type: "nameless-wildcard",
                pattern
              });
            }
            missingParams.push(token.name);
          }
          let frame = stack.pop();
          i = this.optionals.get(frame.begin) + 1;
          continue;
        }
        stack[stack.length - 1].href += typeof value === "string" ? value : String(value);
        i += 1;
        continue;
      }
      unreachable(token.type);
    }
    if (missingParams.length > 0) {
      throw new HrefError({
        type: "missing-params",
        pattern,
        partPattern: this,
        missingParams,
        params
      });
    }
    if (stack.length !== 1)
      unreachable();
    return stack[0].href;
  }
  match(part, options) {
    let ignoreCase = options?.ignoreCase ?? false;
    if (this.#regexp === void 0) {
      this.#regexp = this.#toRegExp();
    }
    let regexp = ignoreCase ? this.#regexp.caseInsensitive : this.#regexp.caseSensitive;
    let reMatch = regexp.exec(part);
    if (reMatch === null)
      return null;
    let match = [];
    let params = this.params;
    for (let i = 0; i < params.length; i++) {
      let param = params[i];
      let captureIndex = i + 1;
      let span2 = reMatch.indices?.[captureIndex];
      if (span2 === void 0)
        continue;
      match.push({
        type: param.type,
        name: param.name,
        begin: span2[0],
        end: span2[1],
        value: reMatch[captureIndex]
      });
    }
    return match;
  }
  #toRegExp() {
    if (this.#regexp !== void 0)
      return this.#regexp;
    let result = "";
    for (let token of this.tokens) {
      if (token.type === "text") {
        result += escape(token.text);
        continue;
      }
      if (token.type === ":") {
        result += this.separator ? `([^${this.separator}]+?)` : `(.+?)`;
        continue;
      }
      if (token.type === "*") {
        result += `(.*)`;
        continue;
      }
      if (token.type === "(") {
        result += "(?:";
        continue;
      }
      if (token.type === ")") {
        result += ")?";
        continue;
      }
      if (token.type === "separator") {
        result += escape(this.separator ?? "");
        continue;
      }
      unreachable(token.type);
    }
    let source = `^${result}$`;
    this.#regexp = {
      caseSensitive: new RegExp(source, "d"),
      caseInsensitive: new RegExp(source, "di")
    };
    return this.#regexp;
  }
};
function separatorForType(type) {
  if (type === "hostname")
    return ".";
  return "/";
}

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/serialize.js
function serializeSearch(constraints) {
  if (constraints.size === 0)
    return void 0;
  let searchParams = new URLSearchParams();
  for (let [key, constraint] of constraints) {
    if (constraint.size === 0) {
      searchParams.append(key, "");
    } else {
      for (let value of constraint) {
        searchParams.append(key, value);
      }
    }
  }
  return searchParams.toString();
}

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/join.js
function joinPathname(a2, b) {
  if (a2.tokens.length === 0)
    return b;
  if (b.tokens.length === 0)
    return a2;
  let tokens = [];
  let aLastNonOptionalIndex = a2.tokens.findLastIndex((token) => token.type !== "(" && token.type !== ")");
  let aLastNonOptional = a2.tokens[aLastNonOptionalIndex];
  let aHasTrailingSeparator = aLastNonOptional?.type === "separator";
  a2.tokens.forEach((token, index) => {
    if (index === aLastNonOptionalIndex && token.type === "separator") {
      return;
    }
    tokens.push(token);
  });
  let bFirstNonOptional = b.tokens.find((token) => token.type !== "(" && token.type !== ")");
  let needsSeparator = bFirstNonOptional === void 0 || bFirstNonOptional.type !== "separator";
  if (needsSeparator) {
    tokens.push({ type: "separator" });
  }
  let tokenOffset = tokens.length;
  b.tokens.forEach((token) => {
    tokens.push(token);
  });
  let optionals = /* @__PURE__ */ new Map();
  for (let [begin, end] of a2.optionals) {
    if (aHasTrailingSeparator) {
      if (begin > aLastNonOptionalIndex)
        begin -= 1;
      if (end > aLastNonOptionalIndex)
        end -= 1;
    }
    optionals.set(begin, end);
  }
  for (let [begin, end] of b.optionals) {
    optionals.set(tokenOffset + begin, tokenOffset + end);
  }
  return new PartPattern({ tokens, optionals }, { type: "pathname" });
}
function joinSearch(a2, b) {
  let result = /* @__PURE__ */ new Map();
  for (let [name, requiredValues] of a2) {
    result.set(name, new Set(requiredValues));
  }
  for (let [name, requiredValues] of b) {
    let current = result.get(name);
    if (current === void 0) {
      result.set(name, new Set(requiredValues));
      continue;
    }
    for (let value of requiredValues) {
      current.add(value);
    }
  }
  return result;
}

// www/node_modules/@remix-run/route-pattern/dist/lib/punycode.js
var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter = "-";
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
var errors = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
};
var baseMinusTMin = base - tMin;
function error(type) {
  throw new RangeError(errors[type]);
}
function mapDomain(domain, callback) {
  let parts = domain.split("@");
  let result = "";
  if (parts.length > 1) {
    result = parts[0] + "@";
    domain = parts[1];
  }
  domain = domain.replace(regexSeparators, ".");
  let labels = domain.split(".");
  let encoded = labels.map(callback).join(".");
  return result + encoded;
}
function basicToDigit(codePoint) {
  if (codePoint >= 48 && codePoint < 58) {
    return 26 + (codePoint - 48);
  }
  if (codePoint >= 65 && codePoint < 91) {
    return codePoint - 65;
  }
  if (codePoint >= 97 && codePoint < 123) {
    return codePoint - 97;
  }
  return base;
}
function adapt(delta, numPoints, firstTime) {
  let k = 0;
  delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
  delta += Math.floor(delta / numPoints);
  for (
    ;
    /* no initialization */
    delta > baseMinusTMin * tMax >> 1;
    k += base
  ) {
    delta = Math.floor(delta / baseMinusTMin);
  }
  return Math.floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
}
function decode(input) {
  let output = [];
  let inputLength = input.length;
  let i = 0;
  let n2 = initialN;
  let bias = initialBias;
  let basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }
  for (let j = 0; j < basic; ++j) {
    if (input.charCodeAt(j) >= 128) {
      error("not-basic");
    }
    output.push(input.charCodeAt(j));
  }
  for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
    let oldi = i;
    for (let w2 = 1, k = base; ; k += base) {
      if (index >= inputLength) {
        error("invalid-input");
      }
      let digit = basicToDigit(input.charCodeAt(index++));
      if (digit >= base) {
        error("invalid-input");
      }
      if (digit > Math.floor((maxInt - i) / w2)) {
        error("overflow");
      }
      i += digit * w2;
      let t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) {
        break;
      }
      let baseMinusT = base - t;
      if (w2 > Math.floor(maxInt / baseMinusT)) {
        error("overflow");
      }
      w2 *= baseMinusT;
    }
    let out = output.length + 1;
    bias = adapt(i - oldi, out, oldi === 0);
    if (Math.floor(i / out) > maxInt - n2) {
      error("overflow");
    }
    n2 += Math.floor(i / out);
    i %= out;
    output.splice(i++, 0, n2);
  }
  return String.fromCodePoint(...output);
}
var toUnicode = function(input) {
  if (!input.includes("xn--"))
    return input;
  return mapDomain(input, function(string) {
    return string.startsWith("xn--") ? decode(string.slice(4).toLowerCase()) : string;
  });
};

// www/node_modules/@remix-run/route-pattern/dist/lib/decode.js
function decodePathname(source) {
  if (!source.includes("%"))
    return source;
  try {
    return decodeURI(source);
  } catch {
    return source;
  }
}

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern/match.js
function matchSearch(params, constraints) {
  for (let [name, requiredValues] of constraints) {
    let hasParam = params.has(name);
    let values = params.getAll(name);
    if (requiredValues.size === 0) {
      if (!hasParam)
        return false;
      continue;
    }
    for (let requiredValue of requiredValues) {
      if (!values.includes(requiredValue))
        return false;
    }
  }
  return true;
}

// www/node_modules/@remix-run/route-pattern/dist/lib/route-pattern.js
var RoutePattern = class _RoutePattern {
  /**
   * Parsed route-pattern AST used for matching and href generation.
   */
  ast;
  // The `join()` method bypasses the constructor and creates a new instance directly
  // using `Object.create()`. This means that the constructor will only run for instances
  // that are instantiated directly with a source string, not for all instances of `RoutePattern`.
  // This also means that we cannot use JavaScript features like `#private` fields/methods and
  // class field initializers that rely on the constructor being run.
  constructor(source) {
    let spans = split(source);
    this.ast = {
      protocol: parseProtocol(source, spans.protocol),
      hostname: parseHostname(source, spans.hostname),
      port: spans.port ? source.slice(...spans.port) : null,
      pathname: spans.pathname ? PartPattern.parse(source, { span: spans.pathname, type: "pathname" }) : PartPattern.parse("", { span: [0, 0], type: "pathname" }),
      search: spans.search ? parseSearch(source.slice(...spans.search)) : /* @__PURE__ */ new Map()
    };
  }
  // oxlint-disable-next-line remix-typescript/no-typescript-accessibility
  get hasOrigin() {
    return this.ast.protocol !== null || this.ast.hostname !== null || this.ast.port !== null;
  }
  /**
   * The protocol portion of the pattern without the trailing colon.
   */
  get protocol() {
    return this.ast.protocol ?? "";
  }
  /**
   * The hostname portion of the pattern.
   */
  get hostname() {
    return this.ast.hostname?.source ?? "";
  }
  /**
   * The explicit port portion of the pattern.
   */
  get port() {
    return this.ast.port ?? "";
  }
  /**
   * The pathname portion of the pattern without a leading slash.
   */
  get pathname() {
    return this.ast.pathname.source;
  }
  /**
   * The serialized search constraints without a leading `?`.
   */
  get search() {
    return serializeSearch(this.ast.search) ?? "";
  }
  /**
   * The serialized route-pattern source string.
   */
  get source() {
    let result = "";
    if (this.hasOrigin) {
      let protocol = this.protocol;
      let hostname = this.hostname;
      let port = this.port === "" ? "" : `:${this.port}`;
      result += `${protocol}://${hostname}${port}`;
    }
    result += "/" + this.pathname;
    let search = this.search;
    if (search)
      result += `?${search}`;
    return result;
  }
  /**
   * Returns the serialized route-pattern source string.
   *
   * @returns The pattern source.
   */
  toString() {
    return this.source;
  }
  /**
   * Joins this pattern with another pathname or route pattern.
   *
   * @param other Pattern or pathname to append.
   * @returns A new route pattern representing the joined path.
   */
  join(other) {
    other = typeof other === "string" ? new _RoutePattern(other) : other;
    return Object.create(_RoutePattern.prototype, {
      ast: {
        enumerable: true,
        value: {
          protocol: other.ast.protocol ?? this.ast.protocol,
          hostname: other.ast.hostname ?? this.ast.hostname,
          port: other.ast.port ?? this.ast.port,
          pathname: joinPathname(this.ast.pathname, other.ast.pathname),
          search: joinSearch(this.ast.search, other.ast.search)
        }
      }
    });
  }
  /**
   * Builds an href from this pattern and the supplied params.
   *
   * @param args Path params and optional search params.
   * @returns The generated href string.
   */
  href(...args) {
    let [params, searchParams] = args;
    searchParams ??= {};
    let result = "";
    if (this.hasOrigin) {
      let protocol = this.ast.protocol === null || this.ast.protocol === "http(s)" ? "https" : this.ast.protocol;
      if (this.ast.hostname === null) {
        throw new HrefError({ type: "missing-hostname", pattern: this });
      }
      let hostname = this.ast.hostname.href(this, params ?? {});
      let port = this.ast.port === null ? "" : `:${this.ast.port}`;
      result += `${protocol}://${hostname}${port}`;
    }
    let pathname = this.ast.pathname.href(this, params ?? {});
    result += "/" + pathname;
    let search = hrefSearch(this, searchParams);
    if (search)
      result += `?${search}`;
    return result;
  }
  /**
   * Match a URL against this pattern.
   *
   * @param url The URL to match
   * @param options Match options
   * @param options.ignoreCase When `true`, pathname matching is case-insensitive. Defaults to `false`. Hostname is always case-insensitive; search remains case-sensitive.
   * @returns The match result, or `null` if no match
   */
  match(url, options) {
    url = typeof url === "string" ? new URL(url) : url;
    let decodedHostname = toUnicode(url.hostname);
    let hostname = null;
    if (this.hasOrigin) {
      if (this.ast.protocol === "http(s)") {
        if (url.protocol !== "http:" && url.protocol !== "https:")
          return null;
      } else if (this.ast.protocol !== null) {
        let expectedProtocol = `${this.ast.protocol}:`;
        if (url.protocol !== expectedProtocol)
          return null;
      }
      if (this.ast.hostname !== null) {
        hostname = this.ast.hostname.match(decodedHostname, { ignoreCase: true });
        if (hostname === null)
          return null;
      }
      if (this.ast.port === null && url.port !== "")
        return null;
      if (this.ast.port !== null && url.port !== this.ast.port)
        return null;
    }
    if (this.ast.hostname === null) {
      hostname = [
        { type: "*", name: "*", begin: 0, end: decodedHostname.length, value: decodedHostname }
      ];
    }
    let pathname = this.ast.pathname.match(decodePathname(url.pathname.slice(1)), options);
    if (pathname === null)
      return null;
    if (!matchSearch(url.searchParams, this.ast.search))
      return null;
    let params = {};
    this.ast.hostname?.params.forEach((param) => {
      if (param.name === "*")
        return;
      params[param.name] = void 0;
    });
    hostname?.forEach((param) => {
      if (param.name === "*")
        return;
      params[param.name] = param.value;
    });
    this.ast.pathname.params.forEach((param) => {
      if (param.name === "*")
        return;
      params[param.name] = void 0;
    });
    pathname.forEach((param) => {
      if (param.name === "*")
        return;
      params[param.name] = param.value;
    });
    return {
      pattern: this,
      url,
      params,
      paramsMeta: { hostname: hostname ?? [], pathname }
    };
  }
  /**
   * Tests whether a URL matches this route pattern.
   *
   * @param url URL to test.
   * @returns `true` when the URL matches the pattern.
   */
  test(url) {
    return this.match(url) !== null;
  }
};

// www/node_modules/@remix-run/route-pattern/dist/lib/specificity.js
var descending = (a2, b) => compare(a2, b) * -1;
function compare(a2, b) {
  if (a2.url.href !== b.url.href) {
    throw new Error(`Cannot compare matches for different URLs: ${a2.url.href} vs ${b.url.href}`);
  }
  let hostname = toUnicode(a2.url.hostname);
  let hostnameResult = compareHostname(hostname, a2.paramsMeta.hostname, b.paramsMeta.hostname);
  if (hostnameResult !== 0)
    return hostnameResult;
  let pathnameResult = comparePathname(a2.paramsMeta.pathname, b.paramsMeta.pathname);
  if (pathnameResult !== 0)
    return pathnameResult;
  let searchResult = compareSearch(a2.pattern.ast.search, b.pattern.ast.search);
  if (searchResult !== 0)
    return searchResult;
  return 0;
}
function compareHostname(hostname, a2, b) {
  if (a2.length === 0 && b.length === 0)
    return 0;
  if (a2.length === 0 && b.length > 0)
    return 1;
  if (a2.length > 0 && b.length === 0)
    return -1;
  let aEncoding = new Int8Array(hostname.length);
  for (let range of a2) {
    aEncoding.fill(range.type === ":" ? 1 : 2, range.begin, range.end);
  }
  let bEncoding = new Int8Array(hostname.length);
  for (let range of b) {
    bEncoding.fill(range.type === ":" ? 1 : 2, range.begin, range.end);
  }
  let segments = [];
  let end = hostname.length;
  for (let i = hostname.length - 1; i >= 0; i--) {
    if (hostname[i] === ".") {
      segments.push({ begin: i + 1, end });
      end = i;
    }
  }
  segments.push({ begin: 0, end });
  for (let segment of segments) {
    for (let j = segment.begin; j < segment.end; j++) {
      if (aEncoding[j] < bEncoding[j])
        return 1;
      if (aEncoding[j] > bEncoding[j])
        return -1;
    }
  }
  return 0;
}
function comparePathname(a2, b) {
  if (a2.length === 0 && b.length === 0)
    return 0;
  if (a2.length === 0 && b.length > 0)
    return 1;
  if (a2.length > 0 && b.length === 0)
    return -1;
  let i = 0;
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < a2.length || bIndex < b.length) {
    let aRange = a2[aIndex];
    let bRange = b[bIndex];
    if (aRange === void 0)
      return 1;
    if (bRange === void 0)
      return -1;
    i = Math.min(aRange.begin, bRange.begin);
    if (i < aRange.begin)
      return 1;
    if (i < bRange.begin)
      return -1;
    if (aRange.type === ":" && bRange.type === "*")
      return 1;
    if (aRange.type === "*" && bRange.type === ":")
      return -1;
    let minEnd = Math.min(aRange.end, bRange.end);
    i = minEnd;
    if (i >= aRange.end)
      aIndex += 1;
    if (i >= bRange.end)
      bIndex += 1;
  }
  return 0;
}
function compareSearch(a2, b) {
  let aSpecificity = searchSpecificity(a2);
  let bSpecificity = searchSpecificity(b);
  if (aSpecificity.keyValue > bSpecificity.keyValue)
    return 1;
  if (aSpecificity.keyValue < bSpecificity.keyValue)
    return -1;
  if (aSpecificity.key > bSpecificity.key)
    return 1;
  if (aSpecificity.key < bSpecificity.key)
    return -1;
  return 0;
}
function searchSpecificity(constraints) {
  let specificity = { key: 0, keyValue: 0 };
  for (let constraint of constraints.values()) {
    if (constraint.size === 0) {
      specificity.key += 1;
      continue;
    }
    specificity.keyValue += constraint.size;
  }
  return specificity;
}

// www/node_modules/@remix-run/route-pattern/dist/lib/array-matcher.js
var ArrayMatcher = class {
  /**
   * Whether pathname matching is case-insensitive.
   */
  ignoreCase;
  #patterns = [];
  /**
   * @param options Constructor options
   * @param options.ignoreCase When `true`, pathname matching is case-insensitive for all patterns. Defaults to `false`.
   */
  constructor(options) {
    this.ignoreCase = options?.ignoreCase ?? false;
  }
  /**
   * Adds a pattern and associated data to the matcher.
   *
   * @param pattern Pattern to register.
   * @param data Data returned when the pattern matches.
   */
  add(pattern, data) {
    pattern = typeof pattern === "string" ? new RoutePattern(pattern) : pattern;
    this.#patterns.push({ pattern, data });
  }
  /**
   * Returns the best matching pattern for a URL.
   *
   * @param url URL to match.
   * @param compareFn Specificity comparer used to rank matches.
   * @returns The best match, or `null` when nothing matches.
   */
  match(url, compareFn = descending) {
    let bestMatch = null;
    for (let entry of this.#patterns) {
      let match = entry.pattern.match(url, { ignoreCase: this.ignoreCase });
      if (match) {
        if (bestMatch === null || compareFn(match, bestMatch) < 0) {
          bestMatch = { ...match, data: entry.data };
        }
      }
    }
    return bestMatch;
  }
  /**
   * Returns every pattern that matches a URL.
   *
   * @param url URL to match.
   * @param compareFn Specificity comparer used to sort matches.
   * @returns All matching routes sorted by specificity.
   */
  matchAll(url, compareFn = descending) {
    let matches = [];
    for (let entry of this.#patterns) {
      let match = entry.pattern.match(url, { ignoreCase: this.ignoreCase });
      if (match) {
        matches.push({ ...match, data: entry.data });
      }
    }
    return matches.sort(compareFn);
  }
};

// www/node_modules/@remix-run/fetch-router/dist/lib/request-abort.js
function raceRequestAbort(promise, request) {
  let signal = request.signal;
  if (signal.aborted) {
    throw signal.reason;
  }
  return new Promise((resolve7, reject) => {
    let onAbort = () => reject(signal.reason);
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then((value) => {
      signal.removeEventListener("abort", onAbort);
      resolve7(value);
    }, (error2) => {
      signal.removeEventListener("abort", onAbort);
      reject(error2);
    });
  });
}

// www/node_modules/@remix-run/fetch-router/dist/lib/middleware.js
function runMiddleware(middleware, context, handler2) {
  let index = -1;
  let dispatch = async (i) => {
    if (i <= index)
      throw new Error("next() called multiple times");
    index = i;
    if (context.request.signal.aborted) {
      throw context.request.signal.reason;
    }
    let fn = middleware[i];
    if (!fn) {
      return await raceRequestAbort(Promise.resolve(handler2(context)), context.request);
    }
    let nextPromise;
    let next = () => {
      nextPromise = dispatch(i + 1);
      return nextPromise;
    };
    let response = await raceRequestAbort(Promise.resolve(fn(context, next)), context.request);
    if (response instanceof Response) {
      return response;
    }
    if (nextPromise != null) {
      return nextPromise;
    }
    return next();
  };
  return dispatch(0);
}

// www/node_modules/@remix-run/fetch-router/dist/lib/controller.js
function isController(obj) {
  return typeof obj === "object" && obj != null && "actions" in obj;
}
function isActionObject(obj) {
  return typeof obj === "object" && obj != null && "handler" in obj;
}

// www/node_modules/@remix-run/fetch-router/dist/lib/route-map.js
var Route = class {
  /**
   * The HTTP method this route matches.
   */
  method;
  /**
   * The pattern this route matches.
   */
  pattern;
  /**
   * @param method The HTTP method this route matches
   * @param pattern The pattern this route matches
   */
  constructor(method, pattern) {
    this.method = method;
    this.pattern = typeof pattern === "string" ? new RoutePattern(pattern) : pattern;
  }
  /**
   * Build a URL href for this route using the given parameters.
   *
   * @param args The parameters to use for building the href
   * @returns The built URL href
   */
  href(...args) {
    return this.pattern.href(...args);
  }
  /**
   * Match a URL against this route's pattern.
   *
   * @param url The URL to match
   * @returns The match result, or `null` if the URL doesn't match
   */
  match(url) {
    return this.pattern.match(url);
  }
};
function createRoutes(baseOrDefs, defs) {
  return typeof baseOrDefs === "string" || baseOrDefs instanceof RoutePattern ? buildRouteMap(typeof baseOrDefs === "string" ? new RoutePattern(baseOrDefs) : baseOrDefs, defs) : buildRouteMap(new RoutePattern("/"), baseOrDefs);
}
function buildRouteMap(base2, defs) {
  let routes2 = {};
  for (let key in defs) {
    let def = defs[key];
    if (def instanceof Route) {
      routes2[key] = new Route(def.method, base2.join(def.pattern));
    } else if (typeof def === "string" || def instanceof RoutePattern) {
      routes2[key] = new Route("ANY", base2.join(def));
    } else if (typeof def === "object" && def != null && "pattern" in def) {
      routes2[key] = new Route(def.method ?? "ANY", base2.join(def.pattern));
    } else {
      routes2[key] = buildRouteMap(base2, def);
    }
  }
  return routes2;
}

// www/node_modules/@remix-run/fetch-router/dist/lib/router.js
function noMatchHandler({ url }) {
  return new Response(`Not Found: ${url.pathname}`, { status: 404 });
}
function normalizeAction(action) {
  if (isActionObject(action)) {
    return {
      handler: action.handler,
      middleware: action.middleware && action.middleware.length > 0 ? [...action.middleware] : void 0
    };
  }
  return {
    handler: action,
    middleware: void 0
  };
}
function mergeMiddleware(upstream, downstream) {
  if (!upstream || upstream.length === 0) {
    return downstream;
  }
  if (!downstream || downstream.length === 0) {
    return upstream;
  }
  return upstream.concat(downstream);
}
function createRequestContext(input, init2) {
  let request;
  if (input instanceof Request) {
    request = cloneRequest(input);
    if (init2 != null)
      request = new Request(request, init2);
  } else {
    request = new Request(input, init2);
  }
  if (request.signal.aborted) {
    throw request.signal.reason;
  }
  return new RequestContext(request);
}
function cloneRequest(input) {
  return input.clone();
}
function getRoutePattern(target) {
  if (target instanceof Route) {
    return target.pattern;
  }
  return typeof target === "string" ? new RoutePattern(target) : target;
}
function getMappedRouteMethod(target) {
  return target instanceof Route ? target.method : "ANY";
}
function createRouter(options) {
  let defaultHandler = options?.defaultHandler ?? noMatchHandler;
  let matcher = options?.matcher ?? new ArrayMatcher();
  let routerMiddleware = options?.middleware ? [...options.middleware] : void 0;
  async function dispatchRouter(runtime2, context) {
    let dispatch = () => dispatchMatches(runtime2, context);
    if (runtime2.middleware && runtime2.middleware.length > 0) {
      return runMiddleware(runtime2.middleware, context, dispatch);
    }
    return dispatch();
  }
  async function dispatchMatches(runtime2, context) {
    for (let match of runtime2.matcher.matchAll(context.url)) {
      if (match.data.method !== context.method && match.data.method !== "ANY") {
        continue;
      }
      context.params = { ...context.params, ...match.params };
      if (match.data.middleware && match.data.middleware.length > 0) {
        return runMiddleware(match.data.middleware, context, match.data.handler);
      }
      return raceRequestAbort(Promise.resolve(match.data.handler(context)), context.request);
    }
    return raceRequestAbort(Promise.resolve(runtime2.defaultHandler(context)), context.request);
  }
  function registerRoute(method, route, normalizedAction) {
    let pattern = getRoutePattern(route);
    let entry = {
      pattern,
      handler: normalizedAction.handler,
      method,
      middleware: normalizedAction.middleware
    };
    matcher.add(pattern, entry);
  }
  function addRoute(method, route, handler2) {
    registerRoute(method, route, normalizeAction(handler2));
  }
  function mapRoutes(target, handler2) {
    if (typeof target === "string" || target instanceof RoutePattern || target instanceof Route) {
      addRoute(getMappedRouteMethod(target), target, handler2);
      return;
    }
    if (!isController(handler2)) {
      throw new TypeError("Expected a controller with an `actions` property");
    }
    mapController(target, handler2);
  }
  function mapController(routes2, controller, parentMiddleware = []) {
    let controllerMiddleware = controller.middleware ? mergeMiddleware(parentMiddleware, controller.middleware) : parentMiddleware.length > 0 ? parentMiddleware : void 0;
    for (let key in routes2) {
      let route = routes2[key];
      let action = controller.actions[key];
      if (route instanceof Route) {
        let normalizedAction = normalizeAction(action);
        registerRoute(route.method, route.pattern, {
          handler: normalizedAction.handler,
          middleware: mergeMiddleware(controllerMiddleware, normalizedAction.middleware)
        });
      } else {
        if (!isController(action)) {
          throw new TypeError(`Expected a nested controller with an \`actions\` property at \`${key}\``);
        }
        mapController(route, action, controllerMiddleware ?? []);
      }
    }
  }
  function createVerbMethod(method) {
    return ((route, handler2) => {
      addRoute(method, route, handler2);
    });
  }
  let runtime = {
    defaultHandler,
    matcher,
    middleware: routerMiddleware
  };
  let router2 = {
    fetch(input, init2) {
      let context = createRequestContext(input, init2);
      context.router = router2;
      return dispatchRouter(runtime, context);
    },
    route(method, route, handler2) {
      addRoute(method, route, handler2);
    },
    map: mapRoutes,
    get: createVerbMethod("GET"),
    head: createVerbMethod("HEAD"),
    post: createVerbMethod("POST"),
    put: createVerbMethod("PUT"),
    patch: createVerbMethod("PATCH"),
    delete: createVerbMethod("DELETE"),
    options: createVerbMethod("OPTIONS")
  };
  return router2;
}

// www/node_modules/@remix-run/assets/dist/lib/asset-server.js
import * as path7 from "node:path";
import * as fs8 from "node:fs";

// www/node_modules/@remix-run/assets/dist/lib/file-matcher.js
var import_picomatch = __toESM(require_picomatch2(), 1);
import * as fs from "node:fs";

// www/node_modules/@remix-run/assets/dist/lib/paths.js
import * as path from "node:path";
var windowsDriveLetterRE = /^[A-Za-z]:\//;
var uncPrefixRE = /^\/\/[^/]+\/[^/]+/;
function normalizeWindowsPath(filePath) {
  return filePath.replace(/\\/g, "/").replace(windowsDriveLetterRE, (prefix) => `${prefix[0].toUpperCase()}${prefix.slice(1)}`);
}
function normalizePathname(pathname) {
  let normalized = path.posix.normalize(normalizeWindowsPath(pathname));
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  return normalized;
}
function isAbsoluteFilePath(filePath) {
  let normalized = normalizeWindowsPath(filePath);
  return normalized.startsWith("/") || windowsDriveLetterRE.test(normalized);
}
function normalizeFilePath(filePath) {
  let normalized = normalizeWindowsPath(filePath);
  let uncRoot = getUncRoot(normalized);
  if (uncRoot) {
    let remainder = normalized.slice(uncRoot.length);
    let normalizedRemainder = path.posix.normalize(remainder || "/");
    return `${uncRoot}${normalizedRemainder === "/" ? "" : normalizedRemainder}`;
  }
  if (windowsDriveLetterRE.test(normalized)) {
    return path.posix.normalize(normalized);
  }
  if (normalized.startsWith("/")) {
    return path.posix.normalize(normalized);
  }
  return path.posix.normalize(normalizeWindowsPath(path.resolve(normalized)));
}
function resolveFilePath(rootDir, filePath) {
  if (isAbsoluteFilePath(filePath)) {
    return normalizeFilePath(filePath);
  }
  return normalizeFilePath(`${rootDir.replace(/\/+$/, "")}/${normalizeWindowsPath(filePath)}`);
}
function getFilePathDirectory(filePath) {
  return path.posix.dirname(normalizeWindowsPath(filePath));
}
function getRelativeFilePath(fromPath, toPath) {
  let normalizedFromPath = normalizeFilePath(fromPath);
  let normalizedToPath = normalizeFilePath(toPath);
  if (normalizedFromPath.startsWith("//") || normalizedToPath.startsWith("//")) {
    return normalizeWindowsPath(path.win32.relative(normalizedFromPath.replace(/\//g, "\\"), normalizedToPath.replace(/\//g, "\\")));
  }
  if (windowsDriveLetterRE.test(normalizedFromPath) || windowsDriveLetterRE.test(normalizedToPath)) {
    return normalizeWindowsPath(path.win32.relative(normalizedFromPath.replace(/\//g, "\\"), normalizedToPath.replace(/\//g, "\\")));
  }
  return path.posix.relative(normalizedFromPath, normalizedToPath);
}
function getUncRoot(filePath) {
  return filePath.startsWith("//") ? filePath.match(uncPrefixRE)?.[0] ?? null : null;
}

// www/node_modules/@remix-run/assets/dist/lib/file-matcher.js
function createFileMatcher(pattern, rootDir, options = {}) {
  let resolvedPatternPath = resolveFilePath(rootDir, pattern);
  let allowDirectories = options.allowDirectories ?? true;
  let allowMissing = options.allowMissing ?? true;
  if (!containsGlobSyntax(pattern)) {
    try {
      resolvedPatternPath = normalizeFilePath(fs.realpathSync(resolvedPatternPath));
    } catch (error2) {
      if (!allowMissing || !isPathNotFoundError(error2))
        throw error2;
    }
    if (allowDirectories) {
      try {
        if (fs.statSync(resolveFilePath(rootDir, pattern)).isDirectory()) {
          return (filePath) => isSameOrDescendantPath(filePath, resolvedPatternPath);
        }
      } catch (error2) {
        if (!isPathNotFoundError(error2))
          throw error2;
      }
    }
    return (filePath) => filePath === resolvedPatternPath;
  }
  let globMatcher = (0, import_picomatch.default)(resolvedPatternPath, { dot: true });
  return (filePath) => globMatcher(filePath);
}
function isSameOrDescendantPath(filePath, directoryPath) {
  let normalizedDirectoryPath = directoryPath.replace(/\/+$/, "");
  return filePath === normalizedDirectoryPath || filePath.startsWith(`${normalizedDirectoryPath}/`);
}
function containsGlobSyntax(pattern) {
  return /[*?[\]{}()!+@]/.test(pattern);
}
function isPathNotFoundError(error2) {
  return error2 instanceof Error && "code" in error2 && (error2.code === "ENOENT" || error2.code === "ENOTDIR");
}

// www/node_modules/@remix-run/assets/dist/lib/injected-packages.js
import * as fs2 from "node:fs";
import { fileURLToPath } from "node:url";
var injectedPackageNames = ["@oxc-project/runtime"];
var injectedPackagesBasePath = "/__@remix/injected";
var resolvedInjectedPackages = /* @__PURE__ */ new Map();
function isInjectedPackageFilePath(filePath) {
  let normalizedFilePath = normalizeFilePath(filePath);
  for (let packageName of injectedPackageNames) {
    let packageRoot = getResolvedInjectedPackage(packageName).packageRoot;
    if (normalizedFilePath === packageRoot || normalizedFilePath.startsWith(`${packageRoot}/`)) {
      return true;
    }
  }
  return false;
}
function getInjectedPackageRouteConfigs() {
  return injectedPackageNames.map((packageName) => {
    let { packageRoot } = getResolvedInjectedPackage(packageName);
    return {
      fileMap: {
        [getInjectedPackageRoutePattern(packageName)]: `${packageName}/*path`
      },
      rootDir: getInjectedPackageRouteRoot(packageRoot, packageName)
    };
  });
}
function getInjectedPackageNameForSpecifier(specifier) {
  for (let packageName of injectedPackageNames) {
    if (specifier === packageName || specifier.startsWith(`${packageName}/`)) {
      return packageName;
    }
  }
  return null;
}
function mayContainInjectedPackageSpecifier(sourceText) {
  return injectedPackageNames.some((packageName) => sourceText.includes(packageName));
}
function maskAuthoredInjectedPackageSpecifier(specifier) {
  let packageName = getInjectedPackageNameForSpecifier(specifier);
  if (!packageName)
    return null;
  let maskedPackageName = getMaskedInjectedPackageName(packageName);
  return `${maskedPackageName}${specifier.slice(packageName.length)}`;
}
function restoreAuthoredInjectedPackageSpecifier(specifier) {
  for (let packageName of injectedPackageNames) {
    let maskedPackageName = getMaskedInjectedPackageName(packageName);
    if (specifier === maskedPackageName) {
      return packageName;
    }
    if (specifier.startsWith(`${maskedPackageName}/`)) {
      return `${packageName}${specifier.slice(maskedPackageName.length)}`;
    }
  }
  return null;
}
function getMaskedInjectedPackageName(packageName) {
  return `~${packageName.slice(1)}`;
}
function getInjectedPackageImporterPath() {
  return normalizeFilePath(fileURLToPath(import.meta.url));
}
function getResolvedInjectedPackage(packageName) {
  let existing = resolvedInjectedPackages.get(packageName);
  if (existing)
    return existing;
  let packageJsonUrl = import.meta.resolve(`${packageName}/package.json`);
  let packageJsonPath = normalizeFilePath(fs2.realpathSync(fileURLToPath(packageJsonUrl)));
  let resolvedInjectedPackage = {
    packageJsonPath,
    packageRoot: normalizeFilePath(fs2.realpathSync(getFilePathDirectory(packageJsonPath)))
  };
  resolvedInjectedPackages.set(packageName, resolvedInjectedPackage);
  return resolvedInjectedPackage;
}
function getInjectedPackageRoutePattern(packageName) {
  return `${injectedPackagesBasePath}/${packageName}/*path`;
}
function getInjectedPackageRouteRoot(packageRoot, packageName) {
  let routeRoot = packageRoot;
  for (let _segment of packageName.split("/")) {
    routeRoot = getFilePathDirectory(routeRoot);
  }
  return routeRoot;
}

// www/node_modules/@remix-run/assets/dist/lib/access.js
function createAccessPolicy(options) {
  let allowMatchers = options.allow.map((pattern) => createFileMatcher(pattern, options.rootDir));
  let denyMatchers = (options.deny ?? []).map((pattern) => createFileMatcher(pattern, options.rootDir));
  return {
    isAllowed(filePath) {
      if (isInjectedPackageFilePath(filePath))
        return true;
      if (!allowMatchers.some((matcher) => matcher(filePath)))
        return false;
      if (denyMatchers.length > 0 && denyMatchers.some((matcher) => matcher(filePath)))
        return false;
      return true;
    }
  };
}

// www/node_modules/@remix-run/assets/dist/lib/compilation-error.js
var AssetServerCompilationError = class extends Error {
  code;
  constructor(message, options) {
    super(message, options.cause === void 0 ? void 0 : { cause: options.cause });
    this.name = "AssetServerCompilationError";
    this.code = options.code;
  }
};
function isAssetServerCompilationError(error2) {
  return error2 instanceof AssetServerCompilationError;
}
function createAssetServerCompilationError(message, options) {
  return new AssetServerCompilationError(message, options);
}

// www/node_modules/@remix-run/assets/dist/lib/fingerprint.js
var fingerprintedExtensionRE = /^(.+)\.@([A-Za-z0-9_-]+)(\.[^./]+)$/;
var fingerprintedBasenameRE = /^(.+)\.@([A-Za-z0-9_-]+)$/;
async function hashContent(content) {
  let encoder = new TextEncoder();
  let data = encoder.encode(content);
  let hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Buffer.from(hashBuffer).toString("base64url").slice(0, 6);
}
async function generateFingerprint(options) {
  return hashContent(JSON.stringify([options.content, options.buildId]));
}
function parseFingerprintSuffix(pathname) {
  let lastSlashIndex = pathname.lastIndexOf("/");
  let directory = lastSlashIndex >= 0 ? pathname.slice(0, lastSlashIndex + 1) : "";
  let basename3 = lastSlashIndex >= 0 ? pathname.slice(lastSlashIndex + 1) : pathname;
  let extensionMatch = basename3.match(fingerprintedExtensionRE);
  if (extensionMatch) {
    return {
      pathname: `${directory}${extensionMatch[1]}${extensionMatch[3]}`,
      requestedFingerprint: extensionMatch[2]
    };
  }
  let basenameMatch = basename3.match(fingerprintedBasenameRE);
  if (basenameMatch) {
    return {
      pathname: `${directory}${basenameMatch[1]}`,
      requestedFingerprint: basenameMatch[2]
    };
  }
  return {
    pathname,
    requestedFingerprint: null
  };
}
function formatFingerprintedPathname(pathname, fingerprint) {
  if (fingerprint === null)
    return pathname;
  let lastSlashIndex = pathname.lastIndexOf("/");
  let directory = lastSlashIndex >= 0 ? pathname.slice(0, lastSlashIndex + 1) : "";
  let basename3 = lastSlashIndex >= 0 ? pathname.slice(lastSlashIndex + 1) : pathname;
  let lastDotIndex = basename3.lastIndexOf(".");
  if (lastDotIndex <= 0) {
    return `${pathname}.@${fingerprint}`;
  }
  return `${directory}${basename3.slice(0, lastDotIndex)}.@${fingerprint}${basename3.slice(lastDotIndex)}`;
}
function getFingerprintRequestCacheControl(requestedFingerprint) {
  return requestedFingerprint === null ? "no-cache" : "public, max-age=31536000, immutable";
}

// www/node_modules/@remix-run/assets/dist/lib/routes.js
function normalizeFilePattern(pattern) {
  if (isAbsoluteFilePath(pattern)) {
    throw new Error(`File route patterns must be relative to the asset server root.
Pattern: ${pattern}`);
  }
  return normalizePathname(pattern);
}
function compileRoutes(basePath, routeConfigs) {
  if (routeConfigs.every((routeConfig) => Object.keys(routeConfig.fileMap).length === 0)) {
    throw new Error("createAssetServer() requires at least one configured fileMap entry.");
  }
  let compiledRoutes = routeConfigs.flatMap((routeConfig) => Object.entries(routeConfig.fileMap).map(([urlPattern, filePattern]) => compileRoute({
    filePattern,
    urlPattern
  }, {
    basePath,
    rootDir: routeConfig.rootDir
  })));
  return {
    resolveUrlPathname(pathname) {
      let normalizedPathname = normalizePathname(pathname);
      for (let route of compiledRoutes) {
        let match = route.urlPattern.match(`http://remix.run${normalizedPathname}`);
        if (!match)
          continue;
        let relativeFilePath = route.filePattern.href(match.params).replace(/^\/+/, "");
        return resolveFilePath(route.rootDir, relativeFilePath);
      }
      return null;
    },
    toUrlPathname(filePath) {
      let normalizedFilePath = normalizeFilePath(filePath);
      for (let route of compiledRoutes) {
        let relativeFilePath = getRelativeFilePath(route.rootDir, normalizedFilePath);
        let match = route.filePattern.ast.pathname.match(relativeFilePath);
        if (!match)
          continue;
        return normalizePathname(route.urlPattern.href(getPathnameParams(route.filePattern, match)));
      }
      return null;
    }
  };
}
function compileRoute(route, options) {
  let basePath = normalizePathname(options.basePath).replace(/\/+$/, "") || "/";
  let relativeUrlPattern = normalizePathname(route.urlPattern);
  let urlPatternSource = normalizePathname(`${basePath.replace(/\/+$/, "")}/${relativeUrlPattern.replace(/^\/+/, "")}`);
  let filePatternSource = normalizeFilePattern(route.filePattern);
  let urlPattern = new RoutePattern(urlPatternSource);
  let filePattern = new RoutePattern(filePatternSource);
  validateNoUnnamedWildcards(urlPattern, "URL");
  validateNoUnnamedWildcards(filePattern, "File");
  validateRoutePatterns(urlPattern, filePattern);
  return {
    rootDir: normalizeFilePath(options.rootDir).replace(/\/+$/, ""),
    urlPattern,
    filePattern
  };
}
function getPathnameParams(pattern, match) {
  let params = {};
  for (let param of pattern.ast.pathname.params) {
    if (param.name === "*")
      continue;
    params[param.name] = void 0;
  }
  for (let param of match) {
    if (param.name === "*")
      continue;
    params[param.name] = param.value;
  }
  return params;
}
function validateRoutePatterns(urlPattern, filePattern) {
  let urlParams = urlPattern.ast.pathname.params.map((param) => `${param.type}:${param.name}`);
  let fileParams = filePattern.ast.pathname.params.map((param) => `${param.type}:${param.name}`);
  if (urlParams.length !== fileParams.length) {
    throw new Error(`Route patterns must have matching capture structure.
URL: ${urlPattern}
File: ${filePattern}`);
  }
  for (let i = 0; i < urlParams.length; i++) {
    if (urlParams[i] !== fileParams[i]) {
      throw new Error(`Route patterns must have matching capture structure.
URL: ${urlPattern}
File: ${filePattern}`);
    }
  }
}
function validateNoUnnamedWildcards(pattern, label) {
  if (pattern.ast.pathname.params.some((param) => param.type === "*" && param.name === "*")) {
    throw new Error(`${label} route patterns must use named wildcards for reversible mapping.
Pattern: ${pattern}`);
  }
}

// www/node_modules/@remix-run/assets/dist/lib/scripts/compiler.js
import * as fs5 from "node:fs";
import * as os from "node:os";
import * as path4 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// www/node_modules/@remix-run/headers/dist/lib/utils.js
function quoteEtag(tag) {
  return tag === "*" ? tag : /^(W\/)?".*"$/.test(tag) ? tag : `"${tag}"`;
}

// www/node_modules/@remix-run/headers/dist/lib/if-none-match.js
var IfNoneMatch = class _IfNoneMatch {
  tags = [];
  constructor(init2) {
    if (init2)
      return _IfNoneMatch.from(init2);
  }
  /**
   * Checks if the header contains the given entity tag.
   *
   * Note: This method checks only for exact matches and does not consider wildcards.
   *
   * @param tag The entity tag to check for
   * @returns `true` if the tag is present in the header, `false` otherwise
   */
  has(tag) {
    return this.tags.includes(quoteEtag(tag));
  }
  /**
   * Checks if this header matches the given entity tag.
   *
   * @param tag The entity tag to check for
   * @returns `true` if the tag is present in the header (or the header contains a wildcard), `false` otherwise
   */
  matches(tag) {
    return this.has(tag) || this.tags.includes("*");
  }
  /**
   * Returns the string representation of the header value.
   *
   * @returns The header value as a string
   */
  toString() {
    return this.tags.join(", ");
  }
  /**
   * Parse an If-None-Match header value.
   *
   * @param value The header value (string, string[], init object, or null)
   * @returns An IfNoneMatch instance (empty if null)
   */
  static from(value) {
    let header = new _IfNoneMatch();
    if (value !== null) {
      if (typeof value === "string") {
        header.tags.push(...value.split(/\s*,\s*/).map(quoteEtag));
      } else if (Array.isArray(value)) {
        header.tags.push(...value.map(quoteEtag));
      } else {
        header.tags.push(...value.tags.map(quoteEtag));
      }
    }
    return header;
  }
};

// www/node_modules/@jridgewell/sourcemap-codec/dist/sourcemap-codec.mjs
var comma = ",".charCodeAt(0);
var semicolon = ";".charCodeAt(0);
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c;
  charToInt[c] = i;
}
function encodeInteger(builder, num, relative3) {
  let delta = num - relative3;
  delta = delta < 0 ? -delta << 1 | 1 : delta << 1;
  do {
    let clamped = delta & 31;
    delta >>>= 5;
    if (delta > 0) clamped |= 32;
    builder.write(intToChar[clamped]);
  } while (delta > 0);
  return num;
}
var bufLength = 1024 * 16;
var td = typeof TextDecoder !== "undefined" ? /* @__PURE__ */ new TextDecoder() : typeof Buffer !== "undefined" ? {
  decode(buf) {
    const out = Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength);
    return out.toString();
  }
} : {
  decode(buf) {
    let out = "";
    for (let i = 0; i < buf.length; i++) {
      out += String.fromCharCode(buf[i]);
    }
    return out;
  }
};
var StringWriter = class {
  constructor() {
    this.pos = 0;
    this.out = "";
    this.buffer = new Uint8Array(bufLength);
  }
  write(v2) {
    const { buffer } = this;
    buffer[this.pos++] = v2;
    if (this.pos === bufLength) {
      this.out += td.decode(buffer);
      this.pos = 0;
    }
  }
  flush() {
    const { buffer, out, pos } = this;
    return pos > 0 ? out + td.decode(buffer.subarray(0, pos)) : out;
  }
};
function encode(decoded) {
  const writer = new StringWriter();
  let sourcesIndex = 0;
  let sourceLine = 0;
  let sourceColumn = 0;
  let namesIndex = 0;
  for (let i = 0; i < decoded.length; i++) {
    const line = decoded[i];
    if (i > 0) writer.write(semicolon);
    if (line.length === 0) continue;
    let genColumn = 0;
    for (let j = 0; j < line.length; j++) {
      const segment = line[j];
      if (j > 0) writer.write(comma);
      genColumn = encodeInteger(writer, segment[0], genColumn);
      if (segment.length === 1) continue;
      sourcesIndex = encodeInteger(writer, segment[1], sourcesIndex);
      sourceLine = encodeInteger(writer, segment[2], sourceLine);
      sourceColumn = encodeInteger(writer, segment[3], sourceColumn);
      if (segment.length === 4) continue;
      namesIndex = encodeInteger(writer, segment[4], namesIndex);
    }
  }
  return writer.flush();
}

// www/node_modules/magic-string/dist/magic-string.es.mjs
var BitSet = class _BitSet {
  constructor(arg) {
    this.bits = arg instanceof _BitSet ? arg.bits.slice() : [];
  }
  add(n2) {
    this.bits[n2 >> 5] |= 1 << (n2 & 31);
  }
  has(n2) {
    return !!(this.bits[n2 >> 5] & 1 << (n2 & 31));
  }
};
var Chunk = class _Chunk {
  constructor(start, end, content) {
    this.start = start;
    this.end = end;
    this.original = content;
    this.intro = "";
    this.outro = "";
    this.content = content;
    this.storeName = false;
    this.edited = false;
    {
      this.previous = null;
      this.next = null;
    }
  }
  appendLeft(content) {
    this.outro += content;
  }
  appendRight(content) {
    this.intro = this.intro + content;
  }
  clone() {
    const chunk = new _Chunk(this.start, this.end, this.original);
    chunk.intro = this.intro;
    chunk.outro = this.outro;
    chunk.content = this.content;
    chunk.storeName = this.storeName;
    chunk.edited = this.edited;
    return chunk;
  }
  contains(index) {
    return this.start < index && index < this.end;
  }
  eachNext(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.next;
    }
  }
  eachPrevious(fn) {
    let chunk = this;
    while (chunk) {
      fn(chunk);
      chunk = chunk.previous;
    }
  }
  edit(content, storeName, contentOnly) {
    this.content = content;
    if (!contentOnly) {
      this.intro = "";
      this.outro = "";
    }
    this.storeName = storeName;
    this.edited = true;
    return this;
  }
  prependLeft(content) {
    this.outro = content + this.outro;
  }
  prependRight(content) {
    this.intro = content + this.intro;
  }
  reset() {
    this.intro = "";
    this.outro = "";
    if (this.edited) {
      this.content = this.original;
      this.storeName = false;
      this.edited = false;
    }
  }
  split(index) {
    const sliceIndex = index - this.start;
    const originalBefore = this.original.slice(0, sliceIndex);
    const originalAfter = this.original.slice(sliceIndex);
    this.original = originalBefore;
    const newChunk = new _Chunk(index, this.end, originalAfter);
    newChunk.outro = this.outro;
    this.outro = "";
    this.end = index;
    if (this.edited) {
      newChunk.edit("", false);
      this.content = "";
    } else {
      this.content = originalBefore;
    }
    newChunk.next = this.next;
    if (newChunk.next) newChunk.next.previous = newChunk;
    newChunk.previous = this;
    this.next = newChunk;
    return newChunk;
  }
  toString() {
    return this.intro + this.content + this.outro;
  }
  trimEnd(rx) {
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length) return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        this.split(this.start + trimmed.length).edit("", void 0, true);
        if (this.edited) {
          this.edit(trimmed, this.storeName, true);
        }
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.intro = this.intro.replace(rx, "");
      if (this.intro.length) return true;
    }
  }
  trimStart(rx) {
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length) return true;
    const trimmed = this.content.replace(rx, "");
    if (trimmed.length) {
      if (trimmed !== this.content) {
        const newChunk = this.split(this.end - trimmed.length);
        if (this.edited) {
          newChunk.edit(trimmed, this.storeName, true);
        }
        this.edit("", void 0, true);
      }
      return true;
    } else {
      this.edit("", void 0, true);
      this.outro = this.outro.replace(rx, "");
      if (this.outro.length) return true;
    }
  }
};
function getBtoa() {
  if (typeof globalThis !== "undefined" && typeof globalThis.btoa === "function") {
    return (str) => globalThis.btoa(unescape(encodeURIComponent(str)));
  } else if (typeof Buffer === "function") {
    return (str) => Buffer.from(str, "utf-8").toString("base64");
  } else {
    return () => {
      throw new Error("Unsupported environment: `window.btoa` or `Buffer` should be supported.");
    };
  }
}
var btoa = /* @__PURE__ */ getBtoa();
var SourceMap = class {
  constructor(properties) {
    this.version = 3;
    this.file = properties.file;
    this.sources = properties.sources;
    this.sourcesContent = properties.sourcesContent;
    this.names = properties.names;
    this.mappings = encode(properties.mappings);
    if (typeof properties.x_google_ignoreList !== "undefined") {
      this.x_google_ignoreList = properties.x_google_ignoreList;
    }
    if (typeof properties.debugId !== "undefined") {
      this.debugId = properties.debugId;
    }
  }
  toString() {
    return JSON.stringify(this);
  }
  toUrl() {
    return "data:application/json;charset=utf-8;base64," + btoa(this.toString());
  }
};
function guessIndent(code) {
  const lines = code.split("\n");
  const tabbed = lines.filter((line) => /^\t+/.test(line));
  const spaced = lines.filter((line) => /^ {2,}/.test(line));
  if (tabbed.length === 0 && spaced.length === 0) {
    return null;
  }
  if (tabbed.length >= spaced.length) {
    return "	";
  }
  const min = spaced.reduce((previous, current) => {
    const numSpaces = /^ +/.exec(current)[0].length;
    return Math.min(numSpaces, previous);
  }, Infinity);
  return new Array(min + 1).join(" ");
}
function getRelativePath(from, to) {
  const fromParts = from.split(/[/\\]/);
  const toParts = to.split(/[/\\]/);
  fromParts.pop();
  while (fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  if (fromParts.length) {
    let i = fromParts.length;
    while (i--) fromParts[i] = "..";
  }
  return fromParts.concat(toParts).join("/");
}
var toString = Object.prototype.toString;
function isObject(thing) {
  return toString.call(thing) === "[object Object]";
}
function getLocator(source) {
  const originalLines = source.split("\n");
  const lineOffsets = [];
  for (let i = 0, pos = 0; i < originalLines.length; i++) {
    lineOffsets.push(pos);
    pos += originalLines[i].length + 1;
  }
  return function locate(index) {
    let i = 0;
    let j = lineOffsets.length;
    while (i < j) {
      const m3 = i + j >> 1;
      if (index < lineOffsets[m3]) {
        j = m3;
      } else {
        i = m3 + 1;
      }
    }
    const line = i - 1;
    const column = index - lineOffsets[line];
    return { line, column };
  };
}
var wordRegex = /\w/;
var Mappings = class {
  constructor(hires) {
    this.hires = hires;
    this.generatedCodeLine = 0;
    this.generatedCodeColumn = 0;
    this.raw = [];
    this.rawSegments = this.raw[this.generatedCodeLine] = [];
    this.pending = null;
  }
  addEdit(sourceIndex, content, loc, nameIndex) {
    if (content.length) {
      const contentLengthMinusOne = content.length - 1;
      let contentLineEnd = content.indexOf("\n", 0);
      let previousContentLineEnd = -1;
      while (contentLineEnd >= 0 && contentLengthMinusOne > contentLineEnd) {
        const segment2 = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
        if (nameIndex >= 0) {
          segment2.push(nameIndex);
        }
        this.rawSegments.push(segment2);
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        previousContentLineEnd = contentLineEnd;
        contentLineEnd = content.indexOf("\n", contentLineEnd + 1);
      }
      const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
      if (nameIndex >= 0) {
        segment.push(nameIndex);
      }
      this.rawSegments.push(segment);
      this.advance(content.slice(previousContentLineEnd + 1));
    } else if (this.pending) {
      this.rawSegments.push(this.pending);
      this.advance(content);
    }
    this.pending = null;
  }
  addUneditedChunk(sourceIndex, chunk, original, loc, sourcemapLocations) {
    let originalCharIndex = chunk.start;
    let first = true;
    let charInHiresBoundary = false;
    while (originalCharIndex < chunk.end) {
      if (original[originalCharIndex] === "\n") {
        loc.line += 1;
        loc.column = 0;
        this.generatedCodeLine += 1;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
        this.generatedCodeColumn = 0;
        first = true;
        charInHiresBoundary = false;
      } else {
        if (this.hires || first || sourcemapLocations.has(originalCharIndex)) {
          const segment = [this.generatedCodeColumn, sourceIndex, loc.line, loc.column];
          if (this.hires === "boundary") {
            if (wordRegex.test(original[originalCharIndex])) {
              if (!charInHiresBoundary) {
                this.rawSegments.push(segment);
                charInHiresBoundary = true;
              }
            } else {
              this.rawSegments.push(segment);
              charInHiresBoundary = false;
            }
          } else {
            this.rawSegments.push(segment);
          }
        }
        loc.column += 1;
        this.generatedCodeColumn += 1;
        first = false;
      }
      originalCharIndex += 1;
    }
    this.pending = null;
  }
  advance(str) {
    if (!str) return;
    const lines = str.split("\n");
    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        this.generatedCodeLine++;
        this.raw[this.generatedCodeLine] = this.rawSegments = [];
      }
      this.generatedCodeColumn = 0;
    }
    this.generatedCodeColumn += lines[lines.length - 1].length;
  }
};
var n = "\n";
var warned = {
  insertLeft: false,
  insertRight: false,
  storeName: false
};
var MagicString = class _MagicString {
  constructor(string, options = {}) {
    const chunk = new Chunk(0, string.length, string);
    Object.defineProperties(this, {
      original: { writable: true, value: string },
      outro: { writable: true, value: "" },
      intro: { writable: true, value: "" },
      firstChunk: { writable: true, value: chunk },
      lastChunk: { writable: true, value: chunk },
      lastSearchedChunk: { writable: true, value: chunk },
      byStart: { writable: true, value: {} },
      byEnd: { writable: true, value: {} },
      filename: { writable: true, value: options.filename },
      indentExclusionRanges: { writable: true, value: options.indentExclusionRanges },
      sourcemapLocations: { writable: true, value: new BitSet() },
      storedNames: { writable: true, value: {} },
      indentStr: { writable: true, value: void 0 },
      ignoreList: { writable: true, value: options.ignoreList },
      offset: { writable: true, value: options.offset || 0 }
    });
    this.byStart[0] = chunk;
    this.byEnd[string.length] = chunk;
  }
  addSourcemapLocation(char) {
    this.sourcemapLocations.add(char);
  }
  append(content) {
    if (typeof content !== "string") throw new TypeError("outro content must be a string");
    this.outro += content;
    return this;
  }
  appendLeft(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.appendLeft(content);
    } else {
      this.intro += content;
    }
    return this;
  }
  appendRight(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.appendRight(content);
    } else {
      this.outro += content;
    }
    return this;
  }
  clone() {
    const cloned = new _MagicString(this.original, { filename: this.filename, offset: this.offset });
    let originalChunk = this.firstChunk;
    let clonedChunk = cloned.firstChunk = cloned.lastSearchedChunk = originalChunk.clone();
    while (originalChunk) {
      cloned.byStart[clonedChunk.start] = clonedChunk;
      cloned.byEnd[clonedChunk.end] = clonedChunk;
      const nextOriginalChunk = originalChunk.next;
      const nextClonedChunk = nextOriginalChunk && nextOriginalChunk.clone();
      if (nextClonedChunk) {
        clonedChunk.next = nextClonedChunk;
        nextClonedChunk.previous = clonedChunk;
        clonedChunk = nextClonedChunk;
      }
      originalChunk = nextOriginalChunk;
    }
    cloned.lastChunk = clonedChunk;
    if (this.indentExclusionRanges) {
      cloned.indentExclusionRanges = this.indentExclusionRanges.slice();
    }
    cloned.sourcemapLocations = new BitSet(this.sourcemapLocations);
    cloned.intro = this.intro;
    cloned.outro = this.outro;
    return cloned;
  }
  generateDecodedMap(options) {
    options = options || {};
    const sourceIndex = 0;
    const names = Object.keys(this.storedNames);
    const mappings = new Mappings(options.hires);
    const locate = getLocator(this.original);
    if (this.intro) {
      mappings.advance(this.intro);
    }
    this.firstChunk.eachNext((chunk) => {
      const loc = locate(chunk.start);
      if (chunk.intro.length) mappings.advance(chunk.intro);
      if (chunk.edited) {
        mappings.addEdit(
          sourceIndex,
          chunk.content,
          loc,
          chunk.storeName ? names.indexOf(chunk.original) : -1
        );
      } else {
        mappings.addUneditedChunk(sourceIndex, chunk, this.original, loc, this.sourcemapLocations);
      }
      if (chunk.outro.length) mappings.advance(chunk.outro);
    });
    if (this.outro) {
      mappings.advance(this.outro);
    }
    return {
      file: options.file ? options.file.split(/[/\\]/).pop() : void 0,
      sources: [
        options.source ? getRelativePath(options.file || "", options.source) : options.file || ""
      ],
      sourcesContent: options.includeContent ? [this.original] : void 0,
      names,
      mappings: mappings.raw,
      x_google_ignoreList: this.ignoreList ? [sourceIndex] : void 0
    };
  }
  generateMap(options) {
    return new SourceMap(this.generateDecodedMap(options));
  }
  _ensureindentStr() {
    if (this.indentStr === void 0) {
      this.indentStr = guessIndent(this.original);
    }
  }
  _getRawIndentString() {
    this._ensureindentStr();
    return this.indentStr;
  }
  getIndentString() {
    this._ensureindentStr();
    return this.indentStr === null ? "	" : this.indentStr;
  }
  indent(indentStr, options) {
    const pattern = /^[^\r\n]/gm;
    if (isObject(indentStr)) {
      options = indentStr;
      indentStr = void 0;
    }
    if (indentStr === void 0) {
      this._ensureindentStr();
      indentStr = this.indentStr || "	";
    }
    if (indentStr === "") return this;
    options = options || {};
    const isExcluded = {};
    if (options.exclude) {
      const exclusions = typeof options.exclude[0] === "number" ? [options.exclude] : options.exclude;
      exclusions.forEach((exclusion) => {
        for (let i = exclusion[0]; i < exclusion[1]; i += 1) {
          isExcluded[i] = true;
        }
      });
    }
    let shouldIndentNextCharacter = options.indentStart !== false;
    const replacer = (match) => {
      if (shouldIndentNextCharacter) return `${indentStr}${match}`;
      shouldIndentNextCharacter = true;
      return match;
    };
    this.intro = this.intro.replace(pattern, replacer);
    let charIndex = 0;
    let chunk = this.firstChunk;
    while (chunk) {
      const end = chunk.end;
      if (chunk.edited) {
        if (!isExcluded[charIndex]) {
          chunk.content = chunk.content.replace(pattern, replacer);
          if (chunk.content.length) {
            shouldIndentNextCharacter = chunk.content[chunk.content.length - 1] === "\n";
          }
        }
      } else {
        charIndex = chunk.start;
        while (charIndex < end) {
          if (!isExcluded[charIndex]) {
            const char = this.original[charIndex];
            if (char === "\n") {
              shouldIndentNextCharacter = true;
            } else if (char !== "\r" && shouldIndentNextCharacter) {
              shouldIndentNextCharacter = false;
              if (charIndex === chunk.start) {
                chunk.prependRight(indentStr);
              } else {
                this._splitChunk(chunk, charIndex);
                chunk = chunk.next;
                chunk.prependRight(indentStr);
              }
            }
          }
          charIndex += 1;
        }
      }
      charIndex = chunk.end;
      chunk = chunk.next;
    }
    this.outro = this.outro.replace(pattern, replacer);
    return this;
  }
  insert() {
    throw new Error(
      "magicString.insert(...) is deprecated. Use prependRight(...) or appendLeft(...)"
    );
  }
  insertLeft(index, content) {
    if (!warned.insertLeft) {
      console.warn(
        "magicString.insertLeft(...) is deprecated. Use magicString.appendLeft(...) instead"
      );
      warned.insertLeft = true;
    }
    return this.appendLeft(index, content);
  }
  insertRight(index, content) {
    if (!warned.insertRight) {
      console.warn(
        "magicString.insertRight(...) is deprecated. Use magicString.prependRight(...) instead"
      );
      warned.insertRight = true;
    }
    return this.prependRight(index, content);
  }
  move(start, end, index) {
    start = start + this.offset;
    end = end + this.offset;
    index = index + this.offset;
    if (index >= start && index <= end) throw new Error("Cannot move a selection inside itself");
    this._split(start);
    this._split(end);
    this._split(index);
    const first = this.byStart[start];
    const last = this.byEnd[end];
    const oldLeft = first.previous;
    const oldRight = last.next;
    const newRight = this.byStart[index];
    if (!newRight && last === this.lastChunk) return this;
    const newLeft = newRight ? newRight.previous : this.lastChunk;
    if (oldLeft) oldLeft.next = oldRight;
    if (oldRight) oldRight.previous = oldLeft;
    if (newLeft) newLeft.next = first;
    if (newRight) newRight.previous = last;
    if (!first.previous) this.firstChunk = last.next;
    if (!last.next) {
      this.lastChunk = first.previous;
      this.lastChunk.next = null;
    }
    first.previous = newLeft;
    last.next = newRight || null;
    if (!newLeft) this.firstChunk = first;
    if (!newRight) this.lastChunk = last;
    return this;
  }
  overwrite(start, end, content, options) {
    options = options || {};
    return this.update(start, end, content, { ...options, overwrite: !options.contentOnly });
  }
  update(start, end, content, options) {
    start = start + this.offset;
    end = end + this.offset;
    if (typeof content !== "string") throw new TypeError("replacement content must be a string");
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    if (end > this.original.length) throw new Error("end is out of bounds");
    if (start === end)
      throw new Error(
        "Cannot overwrite a zero-length range \u2013 use appendLeft or prependRight instead"
      );
    this._split(start);
    this._split(end);
    if (options === true) {
      if (!warned.storeName) {
        console.warn(
          "The final argument to magicString.overwrite(...) should be an options object. See https://github.com/rich-harris/magic-string"
        );
        warned.storeName = true;
      }
      options = { storeName: true };
    }
    const storeName = options !== void 0 ? options.storeName : false;
    const overwrite = options !== void 0 ? options.overwrite : false;
    if (storeName) {
      const original = this.original.slice(start, end);
      Object.defineProperty(this.storedNames, original, {
        writable: true,
        value: true,
        enumerable: true
      });
    }
    const first = this.byStart[start];
    const last = this.byEnd[end];
    if (first) {
      let chunk = first;
      while (chunk !== last) {
        if (chunk.next !== this.byStart[chunk.end]) {
          throw new Error("Cannot overwrite across a split point");
        }
        chunk = chunk.next;
        chunk.edit("", false);
      }
      first.edit(content, storeName, !overwrite);
    } else {
      const newChunk = new Chunk(start, end, "").edit(content, storeName);
      last.next = newChunk;
      newChunk.previous = last;
    }
    return this;
  }
  prepend(content) {
    if (typeof content !== "string") throw new TypeError("outro content must be a string");
    this.intro = content + this.intro;
    return this;
  }
  prependLeft(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byEnd[index];
    if (chunk) {
      chunk.prependLeft(content);
    } else {
      this.intro = content + this.intro;
    }
    return this;
  }
  prependRight(index, content) {
    index = index + this.offset;
    if (typeof content !== "string") throw new TypeError("inserted content must be a string");
    this._split(index);
    const chunk = this.byStart[index];
    if (chunk) {
      chunk.prependRight(content);
    } else {
      this.outro = content + this.outro;
    }
    return this;
  }
  remove(start, end) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
    if (start > end) throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.intro = "";
      chunk.outro = "";
      chunk.edit("");
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  reset(start, end) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    if (start === end) return this;
    if (start < 0 || end > this.original.length) throw new Error("Character is out of bounds");
    if (start > end) throw new Error("end must be greater than start");
    this._split(start);
    this._split(end);
    let chunk = this.byStart[start];
    while (chunk) {
      chunk.reset();
      chunk = end > chunk.end ? this.byStart[chunk.end] : null;
    }
    return this;
  }
  lastChar() {
    if (this.outro.length) return this.outro[this.outro.length - 1];
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length) return chunk.outro[chunk.outro.length - 1];
      if (chunk.content.length) return chunk.content[chunk.content.length - 1];
      if (chunk.intro.length) return chunk.intro[chunk.intro.length - 1];
    } while (chunk = chunk.previous);
    if (this.intro.length) return this.intro[this.intro.length - 1];
    return "";
  }
  lastLine() {
    let lineIndex = this.outro.lastIndexOf(n);
    if (lineIndex !== -1) return this.outro.substr(lineIndex + 1);
    let lineStr = this.outro;
    let chunk = this.lastChunk;
    do {
      if (chunk.outro.length > 0) {
        lineIndex = chunk.outro.lastIndexOf(n);
        if (lineIndex !== -1) return chunk.outro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.outro + lineStr;
      }
      if (chunk.content.length > 0) {
        lineIndex = chunk.content.lastIndexOf(n);
        if (lineIndex !== -1) return chunk.content.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.content + lineStr;
      }
      if (chunk.intro.length > 0) {
        lineIndex = chunk.intro.lastIndexOf(n);
        if (lineIndex !== -1) return chunk.intro.substr(lineIndex + 1) + lineStr;
        lineStr = chunk.intro + lineStr;
      }
    } while (chunk = chunk.previous);
    lineIndex = this.intro.lastIndexOf(n);
    if (lineIndex !== -1) return this.intro.substr(lineIndex + 1) + lineStr;
    return this.intro + lineStr;
  }
  slice(start = 0, end = this.original.length - this.offset) {
    start = start + this.offset;
    end = end + this.offset;
    if (this.original.length !== 0) {
      while (start < 0) start += this.original.length;
      while (end < 0) end += this.original.length;
    }
    let result = "";
    let chunk = this.firstChunk;
    while (chunk && (chunk.start > start || chunk.end <= start)) {
      if (chunk.start < end && chunk.end >= end) {
        return result;
      }
      chunk = chunk.next;
    }
    if (chunk && chunk.edited && chunk.start !== start)
      throw new Error(`Cannot use replaced character ${start} as slice start anchor.`);
    const startChunk = chunk;
    while (chunk) {
      if (chunk.intro && (startChunk !== chunk || chunk.start === start)) {
        result += chunk.intro;
      }
      const containsEnd = chunk.start < end && chunk.end >= end;
      if (containsEnd && chunk.edited && chunk.end !== end)
        throw new Error(`Cannot use replaced character ${end} as slice end anchor.`);
      const sliceStart = startChunk === chunk ? start - chunk.start : 0;
      const sliceEnd = containsEnd ? chunk.content.length + end - chunk.end : chunk.content.length;
      result += chunk.content.slice(sliceStart, sliceEnd);
      if (chunk.outro && (!containsEnd || chunk.end === end)) {
        result += chunk.outro;
      }
      if (containsEnd) {
        break;
      }
      chunk = chunk.next;
    }
    return result;
  }
  // TODO deprecate this? not really very useful
  snip(start, end) {
    const clone = this.clone();
    clone.remove(0, start);
    clone.remove(end, clone.original.length);
    return clone;
  }
  _split(index) {
    if (this.byStart[index] || this.byEnd[index]) return;
    let chunk = this.lastSearchedChunk;
    let previousChunk = chunk;
    const searchForward = index > chunk.end;
    while (chunk) {
      if (chunk.contains(index)) return this._splitChunk(chunk, index);
      chunk = searchForward ? this.byStart[chunk.end] : this.byEnd[chunk.start];
      if (chunk === previousChunk) return;
      previousChunk = chunk;
    }
  }
  _splitChunk(chunk, index) {
    if (chunk.edited && chunk.content.length) {
      const loc = getLocator(this.original)(index);
      throw new Error(
        `Cannot split a chunk that has already been edited (${loc.line}:${loc.column} \u2013 "${chunk.original}")`
      );
    }
    const newChunk = chunk.split(index);
    this.byEnd[index] = chunk;
    this.byStart[index] = newChunk;
    this.byEnd[newChunk.end] = newChunk;
    if (chunk === this.lastChunk) this.lastChunk = newChunk;
    this.lastSearchedChunk = chunk;
    return true;
  }
  toString() {
    let str = this.intro;
    let chunk = this.firstChunk;
    while (chunk) {
      str += chunk.toString();
      chunk = chunk.next;
    }
    return str + this.outro;
  }
  isEmpty() {
    let chunk = this.firstChunk;
    do {
      if (chunk.intro.length && chunk.intro.trim() || chunk.content.length && chunk.content.trim() || chunk.outro.length && chunk.outro.trim())
        return false;
    } while (chunk = chunk.next);
    return true;
  }
  length() {
    let chunk = this.firstChunk;
    let length = 0;
    do {
      length += chunk.intro.length + chunk.content.length + chunk.outro.length;
    } while (chunk = chunk.next);
    return length;
  }
  trimLines() {
    return this.trim("[\\r\\n]");
  }
  trim(charType) {
    return this.trimStart(charType).trimEnd(charType);
  }
  trimEndAborted(charType) {
    const rx = new RegExp((charType || "\\s") + "+$");
    this.outro = this.outro.replace(rx, "");
    if (this.outro.length) return true;
    let chunk = this.lastChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimEnd(rx);
      if (chunk.end !== end) {
        if (this.lastChunk === chunk) {
          this.lastChunk = chunk.next;
        }
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted) return true;
      chunk = chunk.previous;
    } while (chunk);
    return false;
  }
  trimEnd(charType) {
    this.trimEndAborted(charType);
    return this;
  }
  trimStartAborted(charType) {
    const rx = new RegExp("^" + (charType || "\\s") + "+");
    this.intro = this.intro.replace(rx, "");
    if (this.intro.length) return true;
    let chunk = this.firstChunk;
    do {
      const end = chunk.end;
      const aborted = chunk.trimStart(rx);
      if (chunk.end !== end) {
        if (chunk === this.lastChunk) this.lastChunk = chunk.next;
        this.byEnd[chunk.end] = chunk;
        this.byStart[chunk.next.start] = chunk.next;
        this.byEnd[chunk.next.end] = chunk.next;
      }
      if (aborted) return true;
      chunk = chunk.next;
    } while (chunk);
    return false;
  }
  trimStart(charType) {
    this.trimStartAborted(charType);
    return this;
  }
  hasChanged() {
    return this.original !== this.toString();
  }
  _replaceRegexp(searchValue, replacement) {
    function getReplacement(match, str) {
      if (typeof replacement === "string") {
        return replacement.replace(/\$(\$|&|\d+)/g, (_2, i) => {
          if (i === "$") return "$";
          if (i === "&") return match[0];
          const num = +i;
          if (num < match.length) return match[+i];
          return `$${i}`;
        });
      } else {
        return replacement(...match, match.index, str, match.groups);
      }
    }
    function matchAll(re2, str) {
      let match;
      const matches = [];
      while (match = re2.exec(str)) {
        matches.push(match);
      }
      return matches;
    }
    if (searchValue.global) {
      const matches = matchAll(searchValue, this.original);
      matches.forEach((match) => {
        if (match.index != null) {
          const replacement2 = getReplacement(match, this.original);
          if (replacement2 !== match[0]) {
            this.overwrite(match.index, match.index + match[0].length, replacement2);
          }
        }
      });
    } else {
      const match = this.original.match(searchValue);
      if (match && match.index != null) {
        const replacement2 = getReplacement(match, this.original);
        if (replacement2 !== match[0]) {
          this.overwrite(match.index, match.index + match[0].length, replacement2);
        }
      }
    }
    return this;
  }
  _replaceString(string, replacement) {
    const { original } = this;
    const index = original.indexOf(string);
    if (index !== -1) {
      if (typeof replacement === "function") {
        replacement = replacement(string, index, original);
      }
      if (string !== replacement) {
        this.overwrite(index, index + string.length, replacement);
      }
    }
    return this;
  }
  replace(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceString(searchValue, replacement);
    }
    return this._replaceRegexp(searchValue, replacement);
  }
  _replaceAllString(string, replacement) {
    const { original } = this;
    const stringLength = string.length;
    for (let index = original.indexOf(string); index !== -1; index = original.indexOf(string, index + stringLength)) {
      const previous = original.slice(index, index + stringLength);
      let _replacement = replacement;
      if (typeof replacement === "function") {
        _replacement = replacement(previous, index, original);
      }
      if (previous !== _replacement) this.overwrite(index, index + stringLength, _replacement);
    }
    return this;
  }
  replaceAll(searchValue, replacement) {
    if (typeof searchValue === "string") {
      return this._replaceAllString(searchValue, replacement);
    }
    if (!searchValue.global) {
      throw new TypeError(
        "MagicString.prototype.replaceAll called with a non-global RegExp argument"
      );
    }
    return this._replaceRegexp(searchValue, replacement);
  }
};

// www/node_modules/@remix-run/assets/dist/lib/source-maps.js
var import_source_map_js = __toESM(require_source_map(), 1);
function composeSourceMaps(rewriteSourceMap, transformSourceMap) {
  let rewriteConsumer = new import_source_map_js.SourceMapConsumer(JSON.parse(rewriteSourceMap));
  let transformConsumer = new import_source_map_js.SourceMapConsumer(JSON.parse(transformSourceMap));
  let generator = new import_source_map_js.SourceMapGenerator();
  rewriteConsumer.eachMapping((mapping) => {
    if (mapping.originalLine == null || mapping.originalColumn == null || mapping.generatedLine == null || mapping.generatedColumn == null) {
      return;
    }
    let original = transformConsumer.originalPositionFor({
      line: mapping.originalLine,
      column: mapping.originalColumn
    });
    if (original.line == null || original.column == null || original.source == null)
      return;
    generator.addMapping({
      generated: {
        line: mapping.generatedLine,
        column: mapping.generatedColumn
      },
      original: {
        line: original.line,
        column: original.column
      },
      source: original.source,
      name: original.name ?? mapping.name ?? void 0
    });
  });
  for (let source of transformConsumer.sources) {
    let sourceContent = transformConsumer.sourceContentFor(source, true);
    if (sourceContent !== null) {
      generator.setSourceContent(source, sourceContent);
    }
  }
  return JSON.stringify(generator.toJSON());
}
function rewriteSourceMapSources(sourceMap, resolvedPath, stableUrlPathname, sourceMapSourcePaths, sourceContent) {
  let json = JSON.parse(sourceMap);
  json.sources = [
    sourceMapSourcePaths === "absolute" ? normalizeFilePath(resolvedPath) : stableUrlPathname
  ];
  if (sourceContent !== void 0) {
    json.sourcesContent = [sourceContent];
  }
  return JSON.stringify(json);
}
function stringifySourceMap(map) {
  if (!map)
    return null;
  if (typeof map === "string")
    return map;
  if (map instanceof Uint8Array) {
    return Buffer.from(map).toString("utf8");
  }
  if (typeof map === "object" && map !== null)
    return JSON.stringify(map);
  return String(map);
}

// www/node_modules/@remix-run/assets/dist/lib/scripts/emit.js
async function emitResolvedModule(resolvedModule, options) {
  try {
    let importUrls = await Promise.all(resolvedModule.deps.map((depPath) => options.getServedUrl(depPath)));
    let rewriteResult = await rewriteImports(resolvedModule, options);
    let finalCode = rewriteResult.code;
    if (rewriteResult.sourceMap) {
      if (options.sourceMaps === "inline") {
        let encoded = Buffer.from(rewriteResult.sourceMap).toString("base64");
        finalCode += `
//# sourceMappingURL=data:application/json;base64,${encoded}`;
      } else if (options.sourceMaps === "external") {
        finalCode += `
//# sourceMappingURL=${await options.getServedUrl(resolvedModule.identityPath)}.map`;
      }
    }
    return {
      ok: true,
      value: {
        code: await createEmittedAsset(finalCode),
        fingerprint: resolvedModule.fingerprint,
        importUrls,
        sourceMap: rewriteResult.sourceMap ? await createEmittedAsset(rewriteResult.sourceMap) : null
      }
    };
  } catch (error2) {
    return {
      ok: false,
      error: toEmitError(error2, resolvedModule.identityPath)
    };
  }
}
async function rewriteImports(resolvedModule, options) {
  let rewrittenSource = new MagicString(resolvedModule.rawCode);
  for (let imported of resolvedModule.imports) {
    let url = await options.getServedUrl(imported.depPath);
    rewrittenSource.overwrite(imported.start, imported.end, imported.quote ? `${imported.quote}${url}${imported.quote}` : url);
  }
  let code = rewrittenSource.toString();
  let sourceMap = resolvedModule.sourceMap && resolvedModule.imports.length > 0 ? composeSourceMaps(rewrittenSource.generateMap({ hires: true }).toString(), resolvedModule.sourceMap) : resolvedModule.sourceMap;
  return { code, sourceMap };
}
async function createEmittedAsset(content) {
  return {
    content,
    etag: `W/"${await hashContent(content)}"`
  };
}
function toEmitError(error2, identityPath) {
  if (isAssetServerCompilationError(error2))
    return error2;
  return createAssetServerCompilationError(`Failed to emit script ${identityPath}. ${error2 instanceof Error ? error2.message : String(error2)}`, {
    cause: error2,
    code: "EMIT_FAILED"
  });
}

// www/node_modules/@remix-run/assets/dist/lib/scripts/resolve.js
import * as fs3 from "node:fs";
import * as path2 from "node:path";
var resolverExtensionAlias = {
  ".js": [".js", ".ts", ".tsx", ".jsx"],
  ".jsx": [".jsx", ".tsx"],
  ".mjs": [".mjs", ".mts"]
};
var resolverExtensions = [".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs"];
var supportedScriptExtensions = [".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs"];
var supportedScriptExtensionSet = new Set(supportedScriptExtensions);
async function resolveModule(record, transformed, args) {
  let trackedFiles = new Set(transformed.trackedFiles);
  let trackedResolutions = [];
  let resolvedImports;
  try {
    resolvedImports = transformed.unresolvedImports.length > 0 ? await batchResolveSpecifiers(getUniqueSpecifiers(transformed.unresolvedImports), transformed.resolvedPath, args.resolverFactory) : /* @__PURE__ */ new Map();
  } catch (error2) {
    return failResolve(error2, trackedFiles, trackedResolutions, transformed.resolvedPath, {
      isWatchIgnored: args.isWatchIgnored
    });
  }
  let importsWithPaths = [];
  let deps = /* @__PURE__ */ new Set();
  for (let unresolved of transformed.unresolvedImports) {
    let displaySpecifier = getDisplayImportSpecifier(unresolved.specifier);
    let trackedResolution = getTrackedRelativeImportResolution(transformed.importerDir, displaySpecifier, args.isWatchIgnored);
    let resolvedSpec = resolvedImports.get(unresolved.specifier);
    if (!resolvedSpec?.absolutePath) {
      return failResolve(createAssetServerCompilationError(`Failed to resolve import "${displaySpecifier}" in ${transformed.resolvedPath}. Ensure it resolves to a file within the configured asset server fileMap, or mark it as external.`, {
        code: "IMPORT_RESOLUTION_FAILED"
      }), trackedFiles, trackedResolutions, transformed.resolvedPath, { isWatchIgnored: args.isWatchIgnored, trackedResolution });
    }
    let resolvedImport = args.resolveModulePath(resolvedSpec.absolutePath);
    if (!resolvedImport) {
      return failResolve(createAssetServerCompilationError(`Import "${displaySpecifier}" in ${transformed.resolvedPath}, resolved to "${resolvedSpec.absolutePath}", is not a supported script file. Supported extensions are ${supportedScriptExtensions.join(", ")}.`, {
        code: "IMPORT_NOT_SUPPORTED"
      }), trackedFiles, trackedResolutions, transformed.resolvedPath, { isWatchIgnored: args.isWatchIgnored, trackedResolution });
    }
    if (!args.isAllowed(resolvedImport.identityPath)) {
      return failResolve(createAssetServerCompilationError(`Import "${displaySpecifier}" in ${transformed.resolvedPath}, resolved to "${resolvedImport.identityPath}", is not allowed by the asset server allow/deny configuration. Add a matching allow rule for this file path, remove a conflicting deny rule for this file path, or mark this import as external.`, {
        code: "IMPORT_NOT_ALLOWED"
      }), trackedFiles, trackedResolutions, transformed.resolvedPath, { isWatchIgnored: args.isWatchIgnored, trackedResolution });
    }
    let stableUrlPathname = args.routes.toUrlPathname(resolvedImport.identityPath);
    if (!stableUrlPathname) {
      return failResolve(createAssetServerCompilationError(`Import "${displaySpecifier}" in ${transformed.resolvedPath}, resolved to "${resolvedImport.identityPath}", is outside all configured fileMap entries. Add a matching fileMap entry for this file path, or mark this import as external.`, {
        code: "IMPORT_OUTSIDE_FILE_MAP"
      }), trackedFiles, trackedResolutions, transformed.resolvedPath, { isWatchIgnored: args.isWatchIgnored, trackedResolution });
    }
    deps.add(resolvedImport.identityPath);
    if (transformed.packageSpecifiers.includes(unresolved.specifier)) {
      let packageJsonPath = resolvedSpec.packageJsonPath ?? findNearestPackageJsonPath(resolvedImport.resolvedPath);
      if (packageJsonPath && !args.isWatchIgnored(packageJsonPath)) {
        trackedFiles.add(packageJsonPath);
      }
    }
    if (trackedResolution) {
      trackedResolutions.push({
        ...trackedResolution,
        resolvedIdentityPath: resolvedImport.identityPath
      });
    }
    importsWithPaths.push({
      depPath: resolvedImport.identityPath,
      end: unresolved.end,
      quote: unresolved.quote,
      start: unresolved.start
    });
  }
  return {
    ok: true,
    tracking: toResolveTracking(trackedFiles, trackedResolutions),
    value: {
      deps: [...deps],
      fingerprint: transformed.fingerprint,
      identityPath: record.identityPath,
      imports: importsWithPaths,
      trackedFiles: [...trackedFiles],
      rawCode: transformed.rawCode,
      resolvedPath: transformed.resolvedPath,
      sourceMap: transformed.sourceMap,
      stableUrlPathname: transformed.stableUrlPathname
    }
  };
}
function findNearestPackageJsonPath(filePath) {
  let directory = path2.dirname(filePath);
  while (true) {
    let packageJsonPath = path2.join(directory, "package.json");
    if (fs3.existsSync(packageJsonPath)) {
      return normalizeFilePath(packageJsonPath);
    }
    let parentDirectory = path2.dirname(directory);
    if (parentDirectory === directory)
      return null;
    directory = parentDirectory;
  }
}
function isRelativeImportSpecifier(specifier) {
  return specifier.startsWith("./") || specifier.startsWith("../");
}
function getTrackedRelativeImportResolution(importerDir, specifier, isWatchIgnored) {
  if (!isRelativeImportSpecifier(specifier))
    return null;
  let candidatePath = resolveCandidateBasePath(importerDir, specifier);
  let candidatePrefixes = [`${candidatePath}/`].filter((candidatePrefix) => !isWatchIgnored(candidatePrefix.replace(/\/+$/, "") || "/"));
  let extension = path2.extname(specifier);
  if (extension === "") {
    let candidatePaths2 = [
      candidatePath,
      ...supportedScriptExtensions.map((candidateExtension) => `${candidatePath}${candidateExtension}`)
    ].filter((candidatePath2) => !isWatchIgnored(candidatePath2));
    return candidatePaths2.length === 0 && candidatePrefixes.length === 0 ? null : {
      candidatePaths: candidatePaths2,
      candidatePrefixes,
      specifier
    };
  }
  let candidateExtensions = resolverExtensionAlias[extension];
  if (!candidateExtensions && !supportedScriptExtensionSet.has(extension)) {
    let candidatePaths2 = [
      candidatePath,
      ...supportedScriptExtensions.map((candidateExtension) => `${candidatePath}${candidateExtension}`)
    ].filter((candidatePath2) => !isWatchIgnored(candidatePath2));
    return candidatePaths2.length === 0 && candidatePrefixes.length === 0 ? null : {
      candidatePaths: candidatePaths2,
      candidatePrefixes,
      specifier
    };
  }
  if (!candidateExtensions)
    return null;
  let candidatePaths = [
    candidatePath,
    ...candidateExtensions.map((candidateExtension) => `${candidatePath.slice(0, candidatePath.length - extension.length)}${candidateExtension}`)
  ].filter((candidatePath2) => !isWatchIgnored(candidatePath2));
  return candidatePaths.length === 0 && candidatePrefixes.length === 0 ? null : {
    candidatePaths,
    candidatePrefixes,
    specifier
  };
}
function resolveCandidateBasePath(importerDir, specifier) {
  return normalizeFilePath(path2.resolve(importerDir, specifier));
}
async function batchResolveSpecifiers(specifiers, importerPath, resolverFactory) {
  let resolvedBySpecifier = /* @__PURE__ */ new Map();
  if (specifiers.length === 0)
    return resolvedBySpecifier;
  try {
    for (let specifier of specifiers) {
      let normalizedResolution = normalizeSpecifierResolution(specifier, importerPath);
      let resolutionResult = await resolverFactory.resolveFileAsync(normalizedResolution.importerPath, normalizedResolution.specifier);
      if (resolutionResult.error) {
        throw createAssetServerCompilationError(normalizedResolution.importerPath === getInjectedPackageImporterPath() ? `Failed to resolve injected import "${specifier}" from asset server.` : `Failed to resolve import "${normalizedResolution.specifier}" in ${normalizedResolution.importerPath}. Ensure it resolves to a file within the configured asset server fileMap, or mark it as external.`, {
          code: "IMPORT_RESOLUTION_FAILED"
        });
      }
      resolvedBySpecifier.set(specifier, {
        absolutePath: resolutionResult.path && path2.isAbsolute(resolutionResult.path) ? normalizeFilePath(resolutionResult.path) : null,
        packageJsonPath: resolutionResult.packageJsonPath ? normalizeFilePath(resolutionResult.packageJsonPath) : null,
        specifier
      });
    }
  } catch (error2) {
    if (isAssetServerCompilationError(error2) && error2.code === "IMPORT_RESOLUTION_FAILED") {
      throw error2;
    }
    throw createAssetServerCompilationError(`Failed to resolve imports in ${importerPath}. ${formatUnknownError(error2)}`, {
      cause: error2,
      code: "IMPORT_RESOLUTION_FAILED"
    });
  }
  return resolvedBySpecifier;
}
function getUniqueSpecifiers(unresolvedImports) {
  return [...new Set(unresolvedImports.map((unresolved) => unresolved.specifier))];
}
function formatUnknownError(error2) {
  return error2 instanceof Error ? error2.message : String(error2);
}
function normalizeSpecifierResolution(specifier, importerPath) {
  let authoredInjectedPackageSpecifier = restoreAuthoredInjectedPackageSpecifier(specifier);
  if (authoredInjectedPackageSpecifier) {
    return {
      importerPath,
      specifier: authoredInjectedPackageSpecifier
    };
  }
  if (getInjectedPackageNameForSpecifier(specifier)) {
    return {
      importerPath: getInjectedPackageImporterPath(),
      specifier
    };
  }
  return {
    importerPath,
    specifier
  };
}
function getDisplayImportSpecifier(specifier) {
  return restoreAuthoredInjectedPackageSpecifier(specifier) ?? specifier;
}
function failResolve(error2, trackedFiles, trackedResolutions, importerPath, options = {}) {
  return {
    ok: false,
    error: toResolveError(error2, importerPath),
    tracking: toResolveTracking(trackedFiles, appendFailedTrackedResolution(trackedResolutions, options.trackedResolution))
  };
}
function toResolveTracking(trackedFiles, trackedResolutions) {
  return {
    trackedFiles: [
      ...trackedFiles,
      ...trackedResolutions.flatMap((trackedResolution) => trackedResolution.candidatePaths)
    ],
    trackedDirectories: trackedResolutions.flatMap((trackedResolution) => trackedResolution.candidatePrefixes)
  };
}
function appendFailedTrackedResolution(trackedResolutions, trackedResolution) {
  if (trackedResolution == null)
    return [...trackedResolutions];
  return [
    ...trackedResolutions,
    {
      ...trackedResolution,
      resolvedIdentityPath: null
    }
  ];
}
function toResolveError(error2, importerPath) {
  if (isAssetServerCompilationError(error2))
    return error2;
  return createAssetServerCompilationError(`Failed to resolve imports in ${importerPath}. ${formatUnknownError(error2)}`, {
    cause: error2,
    code: "IMPORT_RESOLUTION_FAILED"
  });
}

// www/node_modules/@remix-run/assets/dist/lib/module-store.js
function createModuleStore(options = {}) {
  let recordsByIdentityPath = /* @__PURE__ */ new Map();
  let recordsByTrackedFile = /* @__PURE__ */ new Map();
  let watchDirectoryRefCountByPath = /* @__PURE__ */ new Map();
  return {
    get(identityPath) {
      let existing = recordsByIdentityPath.get(identityPath);
      if (existing)
        return existing;
      let record = {
        identityPath,
        invalidationVersion: 0,
        trackedFiles: /* @__PURE__ */ new Set(),
        trackedDirectories: /* @__PURE__ */ new Set()
      };
      recordsByIdentityPath.set(identityPath, record);
      return record;
    },
    clearTransformed(identityPath, tracking) {
      let record = getOrCreateMutableRecord(identityPath);
      record.transformed = void 0;
      record.resolved = void 0;
      record.emitted = void 0;
      record.emittedSnapshot = void 0;
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
      setTracking(record, tracking);
    },
    setTransformed(identityPath, transformed, tracking) {
      let record = getOrCreateMutableRecord(identityPath);
      record.transformed = transformed;
      record.resolved = void 0;
      record.emitted = void 0;
      record.emittedSnapshot = void 0;
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
      setTracking(record, tracking);
    },
    setResolved(identityPath, resolved, tracking) {
      let record = getOrCreateMutableRecord(identityPath);
      record.resolved = resolved;
      record.emitted = void 0;
      record.emittedSnapshot = void 0;
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
      setTracking(record, tracking);
    },
    clearResolved(identityPath, tracking) {
      let record = getOrCreateMutableRecord(identityPath);
      record.resolved = void 0;
      record.emitted = void 0;
      record.emittedSnapshot = void 0;
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
      setTracking(record, tracking);
    },
    setEmitted(identityPath, emitted, snapshot) {
      let record = getOrCreateMutableRecord(identityPath);
      record.emitted = emitted;
      record.emittedSnapshot = snapshot ?? void 0;
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
    },
    invalidateForFileEvent(filePath, event) {
      let affected = new Set(recordsByTrackedFile.get(filePath) ?? []);
      if (event !== "change") {
        for (let record of recordsByIdentityPath.values()) {
          if (matchesTrackedDirectory(record.trackedDirectories, filePath)) {
            affected.add(record.identityPath);
          }
        }
      }
      for (let identityPath of affected) {
        let record = recordsByIdentityPath.get(identityPath);
        if (record)
          invalidateRecord(record, { retainStale: event === "change" });
      }
      if (event === "unlink") {
        let deletedRecord = recordsByIdentityPath.get(filePath);
        if (deletedRecord) {
          clearTracking(deletedRecord);
        }
      }
    },
    invalidateAll() {
      for (let record of recordsByIdentityPath.values()) {
        invalidateRecord(record, { retainStale: false });
      }
    }
  };
  function getOrCreateMutableRecord(identityPath) {
    let existing = recordsByIdentityPath.get(identityPath);
    if (existing)
      return existing;
    let record = {
      identityPath,
      invalidationVersion: 0,
      trackedFiles: /* @__PURE__ */ new Set(),
      trackedDirectories: /* @__PURE__ */ new Set()
    };
    recordsByIdentityPath.set(identityPath, record);
    return record;
  }
  function invalidateRecord(record, options2) {
    if (!options2.retainStale) {
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
    } else if (record.emitted && record.emittedSnapshot) {
      record.staleEmitted = record.emitted;
      record.staleEmittedSnapshot = record.emittedSnapshot;
    } else if (!record.staleEmitted || !record.staleEmittedSnapshot) {
      record.staleEmitted = void 0;
      record.staleEmittedSnapshot = void 0;
    }
    record.emitted = void 0;
    record.emittedSnapshot = void 0;
    record.resolved = void 0;
    record.transformed = void 0;
    record.invalidationVersion += 1;
  }
  function setTracking(record, tracking) {
    let previousWatchedDirectories = getWatchedDirectories(record);
    removeIndexes(record);
    let normalizedTracking = mergeTracking(tracking);
    record.trackedFiles = normalizedTracking.trackedFiles;
    record.trackedDirectories = normalizedTracking.trackedDirectories;
    for (let trackedFile of record.trackedFiles) {
      addToIndexedSet(recordsByTrackedFile, trackedFile, record.identityPath);
    }
    let nextWatchedDirectories = getWatchedDirectories(record);
    let delta = updateWatchDirectoryRefCounts(previousWatchedDirectories, nextWatchedDirectories);
    emitWatchDirectoryDelta(delta);
  }
  function clearTracking(record) {
    setTracking(record, []);
  }
  function removeIndexes(record) {
    for (let trackedFile of record.trackedFiles) {
      removeFromIndexedSet(recordsByTrackedFile, trackedFile, record.identityPath);
    }
  }
  function updateWatchDirectoryRefCounts(previousWatchedDirectories, nextWatchedDirectories) {
    let add = [];
    let remove = [];
    for (let directory of previousWatchedDirectories) {
      if (nextWatchedDirectories.has(directory))
        continue;
      let previousCount = watchDirectoryRefCountByPath.get(directory);
      if (!previousCount)
        continue;
      if (previousCount === 1) {
        watchDirectoryRefCountByPath.delete(directory);
        remove.push(directory);
      } else {
        watchDirectoryRefCountByPath.set(directory, previousCount - 1);
      }
    }
    for (let directory of nextWatchedDirectories) {
      if (previousWatchedDirectories.has(directory))
        continue;
      let previousCount = watchDirectoryRefCountByPath.get(directory) ?? 0;
      watchDirectoryRefCountByPath.set(directory, previousCount + 1);
      if (previousCount === 0) {
        add.push(directory);
      }
    }
    return { add, remove };
  }
  function emitWatchDirectoryDelta(delta) {
    if (!options.onWatchDirectoriesChange)
      return;
    if (delta.add.length === 0 && delta.remove.length === 0)
      return;
    options.onWatchDirectoriesChange(delta);
  }
}
function addToIndexedSet(map, key, value) {
  let existing = map.get(key) ?? /* @__PURE__ */ new Set();
  existing.add(value);
  map.set(key, existing);
}
function removeFromIndexedSet(map, key, value) {
  let existing = map.get(key);
  if (!existing)
    return;
  existing.delete(value);
  if (existing.size === 0) {
    map.delete(key);
  }
}
function matchesTrackedDirectory(trackedDirectories, filePath) {
  for (let trackedDirectory of trackedDirectories) {
    if (filePath === trackedDirectory || filePath.startsWith(`${trackedDirectory}/`))
      return true;
  }
  return false;
}
function normalizeTrackedDirectory(trackedDirectory) {
  return trackedDirectory.replace(/\/+$/, "") || "/";
}
function mergeTracking(tracking) {
  let trackedFiles = /* @__PURE__ */ new Set();
  let trackedDirectories = /* @__PURE__ */ new Set();
  for (let fragment of tracking) {
    for (let trackedFile of fragment.trackedFiles) {
      trackedFiles.add(trackedFile);
    }
    for (let trackedDirectory of fragment.trackedDirectories ?? []) {
      trackedDirectories.add(normalizeTrackedDirectory(trackedDirectory));
    }
  }
  return {
    trackedFiles,
    trackedDirectories
  };
}
function getWatchedDirectories(record) {
  let watchedDirectories = /* @__PURE__ */ new Set();
  for (let trackedFile of record.trackedFiles) {
    watchedDirectories.add(getFilePathDirectory(trackedFile));
  }
  for (let trackedDirectory of record.trackedDirectories) {
    watchedDirectories.add(trackedDirectory);
  }
  return watchedDirectories;
}

// www/node_modules/@remix-run/assets/dist/lib/scripts/transform.js
import * as fs4 from "node:fs";
import * as fsp from "node:fs/promises";
import * as path3 from "node:path";

// www/node_modules/get-tsconfig/dist/index.mjs
import m2 from "node:path";
import ce from "node:fs";
import Be from "node:module";

// www/node_modules/resolve-pkg-maps/dist/index.mjs
var A = (r2) => r2 !== null && typeof r2 == "object";
var a = (r2, t) => Object.assign(new Error(`[${r2}]: ${t}`), { code: r2 });
var _ = "ERR_INVALID_PACKAGE_CONFIG";
var E = "ERR_INVALID_PACKAGE_TARGET";
var I = "ERR_PACKAGE_PATH_NOT_EXPORTED";
var R = /^\d+$/;
var O = /^(\.{1,2}|node_modules)$/i;
var w = /\/|\\/;
var h = ((r2) => (r2.Export = "exports", r2.Import = "imports", r2))(h || {});
var f = (r2, t, e, o, c) => {
  if (t == null) return [];
  if (typeof t == "string") {
    const [n2, ...i] = t.split(w);
    if (n2 === ".." || i.some((l) => O.test(l))) throw a(E, `Invalid "${r2}" target "${t}" defined in the package config`);
    return [c ? t.replace(/\*/g, c) : t];
  }
  if (Array.isArray(t)) return t.flatMap((n2) => f(r2, n2, e, o, c));
  if (A(t)) {
    for (const n2 of Object.keys(t)) {
      if (R.test(n2)) throw a(_, "Cannot contain numeric property keys");
      if (n2 === "default" || o.includes(n2)) return f(r2, t[n2], e, o, c);
    }
    return [];
  }
  throw a(E, `Invalid "${r2}" target "${t}"`);
};
var s = "*";
var m = (r2, t) => {
  const e = r2.indexOf(s), o = t.indexOf(s);
  return e === o ? t.length > r2.length : o > e;
};
function d(r2, t) {
  if (!t.includes(s) && r2.hasOwnProperty(t)) return [t];
  let e, o;
  for (const c of Object.keys(r2)) if (c.includes(s)) {
    const [n2, i, l] = c.split(s);
    if (l === void 0 && t.startsWith(n2) && t.endsWith(i)) {
      const g = t.slice(n2.length, -i.length || void 0);
      g && (!e || m(e, c)) && (e = c, o = g);
    }
  }
  return [e, o];
}
var p = (r2) => Object.keys(r2).reduce((t, e) => {
  const o = e === "" || e[0] !== ".";
  if (t === void 0 || t === o) return o;
  throw a(_, '"exports" cannot contain some keys starting with "." and some not');
}, void 0);
var u = /^\w+:/;
var v = (r2, t, e) => {
  if (!r2) throw new Error('"exports" is required');
  t = t === "" ? "." : `./${t}`, (typeof r2 == "string" || Array.isArray(r2) || A(r2) && p(r2)) && (r2 = { ".": r2 });
  const [o, c] = d(r2, t), n2 = f(h.Export, r2[o], t, e, c);
  if (n2.length === 0) throw a(I, t === "." ? 'No "exports" main defined' : `Package subpath '${t}' is not defined by "exports"`);
  for (const i of n2) if (!i.startsWith("./") && !u.test(i)) throw a(E, `Invalid "exports" target "${i}" defined in the package config`);
  return n2;
};

// www/node_modules/get-tsconfig/dist/index.mjs
import $e from "fs";
import Ue from "os";
import Re from "path";
var xe = Object.defineProperty;
var r = (e, t) => xe(e, "name", { value: t, configurable: true });
function h2(e) {
  return e.startsWith("\\\\?\\") ? e : e.replace(/\\/g, "/");
}
r(h2, "slash");
var K = r((e) => {
  const t = ce[e];
  return (s2, ...n2) => {
    const o = `${e}:${n2.join(":")}`;
    let l = s2 == null ? void 0 : s2.get(o);
    return l === void 0 && (l = Reflect.apply(t, ce, n2), s2 == null || s2.set(o, l)), l;
  };
}, "cacheFs");
var x = K("existsSync");
var Se = K("readFileSync");
var Q = K("statSync");
var O2 = r((e, t, s2) => {
  for (; ; ) {
    const n2 = m2.posix.join(e, t);
    if (x(s2, n2)) return n2;
    const o = m2.dirname(e);
    if (o === e) return;
    e = o;
  }
}, "findUp");
var C = /^\.{1,2}(\/.*)?$/;
var H = r((e) => {
  const t = h2(e);
  return C.test(t) ? t : `./${t}`;
}, "normalizeRelativePath");
function Ne(e, t = false) {
  const s2 = e.length;
  let n2 = 0, o = "", l = 0, i = 16, f2 = 0, u2 = 0, g = 0, w2 = 0, d2 = 0;
  function _2(c, j) {
    let y = 0, T = 0;
    for (; y < c; ) {
      let k = e.charCodeAt(n2);
      if (k >= 48 && k <= 57) T = T * 16 + k - 48;
      else if (k >= 65 && k <= 70) T = T * 16 + k - 65 + 10;
      else if (k >= 97 && k <= 102) T = T * 16 + k - 97 + 10;
      else break;
      n2++, y++;
    }
    return y < c && (T = -1), T;
  }
  r(_2, "scanHexDigits");
  function v2(c) {
    n2 = c, o = "", l = 0, i = 16, d2 = 0;
  }
  r(v2, "setPosition");
  function p2() {
    let c = n2;
    if (e.charCodeAt(n2) === 48) n2++;
    else for (n2++; n2 < e.length && R2(e.charCodeAt(n2)); ) n2++;
    if (n2 < e.length && e.charCodeAt(n2) === 46) if (n2++, n2 < e.length && R2(e.charCodeAt(n2))) for (n2++; n2 < e.length && R2(e.charCodeAt(n2)); ) n2++;
    else return d2 = 3, e.substring(c, n2);
    let j = n2;
    if (n2 < e.length && (e.charCodeAt(n2) === 69 || e.charCodeAt(n2) === 101)) if (n2++, (n2 < e.length && e.charCodeAt(n2) === 43 || e.charCodeAt(n2) === 45) && n2++, n2 < e.length && R2(e.charCodeAt(n2))) {
      for (n2++; n2 < e.length && R2(e.charCodeAt(n2)); ) n2++;
      j = n2;
    } else d2 = 3;
    return e.substring(c, j);
  }
  r(p2, "scanNumber");
  function L() {
    let c = "", j = n2;
    for (; ; ) {
      if (n2 >= s2) {
        c += e.substring(j, n2), d2 = 2;
        break;
      }
      const y = e.charCodeAt(n2);
      if (y === 34) {
        c += e.substring(j, n2), n2++;
        break;
      }
      if (y === 92) {
        if (c += e.substring(j, n2), n2++, n2 >= s2) {
          d2 = 2;
          break;
        }
        switch (e.charCodeAt(n2++)) {
          case 34:
            c += '"';
            break;
          case 92:
            c += "\\";
            break;
          case 47:
            c += "/";
            break;
          case 98:
            c += "\b";
            break;
          case 102:
            c += "\f";
            break;
          case 110:
            c += `
`;
            break;
          case 114:
            c += "\r";
            break;
          case 116:
            c += "	";
            break;
          case 117:
            const k = _2(4);
            k >= 0 ? c += String.fromCharCode(k) : d2 = 4;
            break;
          default:
            d2 = 5;
        }
        j = n2;
        continue;
      }
      if (y >= 0 && y <= 31) if (J(y)) {
        c += e.substring(j, n2), d2 = 2;
        break;
      } else d2 = 6;
      n2++;
    }
    return c;
  }
  r(L, "scanString");
  function A4() {
    if (o = "", d2 = 0, l = n2, u2 = f2, w2 = g, n2 >= s2) return l = s2, i = 17;
    let c = e.charCodeAt(n2);
    if (ee(c)) {
      do
        n2++, o += String.fromCharCode(c), c = e.charCodeAt(n2);
      while (ee(c));
      return i = 15;
    }
    if (J(c)) return n2++, o += String.fromCharCode(c), c === 13 && e.charCodeAt(n2) === 10 && (n2++, o += `
`), f2++, g = n2, i = 14;
    switch (c) {
      case 123:
        return n2++, i = 1;
      case 125:
        return n2++, i = 2;
      case 91:
        return n2++, i = 3;
      case 93:
        return n2++, i = 4;
      case 58:
        return n2++, i = 6;
      case 44:
        return n2++, i = 5;
      case 34:
        return n2++, o = L(), i = 10;
      case 47:
        const j = n2 - 1;
        if (e.charCodeAt(n2 + 1) === 47) {
          for (n2 += 2; n2 < s2 && !J(e.charCodeAt(n2)); ) n2++;
          return o = e.substring(j, n2), i = 12;
        }
        if (e.charCodeAt(n2 + 1) === 42) {
          n2 += 2;
          const y = s2 - 1;
          let T = false;
          for (; n2 < y; ) {
            const k = e.charCodeAt(n2);
            if (k === 42 && e.charCodeAt(n2 + 1) === 47) {
              n2 += 2, T = true;
              break;
            }
            n2++, J(k) && (k === 13 && e.charCodeAt(n2) === 10 && n2++, f2++, g = n2);
          }
          return T || (n2++, d2 = 1), o = e.substring(j, n2), i = 13;
        }
        return o += String.fromCharCode(c), n2++, i = 16;
      case 45:
        if (o += String.fromCharCode(c), n2++, n2 === s2 || !R2(e.charCodeAt(n2))) return i = 16;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return o += p2(), i = 11;
      default:
        for (; n2 < s2 && D(c); ) n2++, c = e.charCodeAt(n2);
        if (l !== n2) {
          switch (o = e.substring(l, n2), o) {
            case "true":
              return i = 8;
            case "false":
              return i = 9;
            case "null":
              return i = 7;
          }
          return i = 16;
        }
        return o += String.fromCharCode(c), n2++, i = 16;
    }
  }
  r(A4, "scanNext");
  function D(c) {
    if (ee(c) || J(c)) return false;
    switch (c) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return false;
    }
    return true;
  }
  r(D, "isUnknownContentCharacter");
  function B2() {
    let c;
    do
      c = A4();
    while (c >= 12 && c <= 15);
    return c;
  }
  return r(B2, "scanNextNonTrivia"), { setPosition: v2, getPosition: r(() => n2, "getPosition"), scan: t ? B2 : A4, getToken: r(() => i, "getToken"), getTokenValue: r(() => o, "getTokenValue"), getTokenOffset: r(() => l, "getTokenOffset"), getTokenLength: r(() => n2 - l, "getTokenLength"), getTokenStartLine: r(() => u2, "getTokenStartLine"), getTokenStartCharacter: r(() => l - w2, "getTokenStartCharacter"), getTokenError: r(() => d2, "getTokenError") };
}
r(Ne, "createScanner");
function ee(e) {
  return e === 32 || e === 9;
}
r(ee, "isWhiteSpace");
function J(e) {
  return e === 10 || e === 13;
}
r(J, "isLineBreak");
function R2(e) {
  return e >= 48 && e <= 57;
}
r(R2, "isDigit");
var ge;
(function(e) {
  e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.space = 32] = "space", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.asterisk = 42] = "asterisk", e[e.backslash = 92] = "backslash", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.plus = 43] = "plus", e[e.slash = 47] = "slash", e[e.formFeed = 12] = "formFeed", e[e.tab = 9] = "tab";
})(ge || (ge = {})), new Array(20).fill(0).map((e, t) => " ".repeat(t));
var S = 200;
new Array(S).fill(0).map((e, t) => `
` + " ".repeat(t)), new Array(S).fill(0).map((e, t) => "\r" + " ".repeat(t)), new Array(S).fill(0).map((e, t) => `\r
` + " ".repeat(t)), new Array(S).fill(0).map((e, t) => `
` + "	".repeat(t)), new Array(S).fill(0).map((e, t) => "\r" + "	".repeat(t)), new Array(S).fill(0).map((e, t) => `\r
` + "	".repeat(t));
var X;
(function(e) {
  e.DEFAULT = { allowTrailingComma: false };
})(X || (X = {}));
function Pe(e, t = [], s2 = X.DEFAULT) {
  let n2 = null, o = [];
  const l = [];
  function i(u2) {
    Array.isArray(o) ? o.push(u2) : n2 !== null && (o[n2] = u2);
  }
  return r(i, "onValue"), We(e, { onObjectBegin: r(() => {
    const u2 = {};
    i(u2), l.push(o), o = u2, n2 = null;
  }, "onObjectBegin"), onObjectProperty: r((u2) => {
    n2 = u2;
  }, "onObjectProperty"), onObjectEnd: r(() => {
    o = l.pop();
  }, "onObjectEnd"), onArrayBegin: r(() => {
    const u2 = [];
    i(u2), l.push(o), o = u2, n2 = null;
  }, "onArrayBegin"), onArrayEnd: r(() => {
    o = l.pop();
  }, "onArrayEnd"), onLiteralValue: i, onError: r((u2, g, w2) => {
    t.push({ error: u2, offset: g, length: w2 });
  }, "onError") }, s2), o[0];
}
r(Pe, "parse$1");
function We(e, t, s2 = X.DEFAULT) {
  const n2 = Ne(e, false), o = [];
  let l = 0;
  function i(b) {
    return b ? () => l === 0 && b(n2.getTokenOffset(), n2.getTokenLength(), n2.getTokenStartLine(), n2.getTokenStartCharacter()) : () => true;
  }
  r(i, "toNoArgVisit");
  function f2(b) {
    return b ? (F) => l === 0 && b(F, n2.getTokenOffset(), n2.getTokenLength(), n2.getTokenStartLine(), n2.getTokenStartCharacter()) : () => true;
  }
  r(f2, "toOneArgVisit");
  function u2(b) {
    return b ? (F) => l === 0 && b(F, n2.getTokenOffset(), n2.getTokenLength(), n2.getTokenStartLine(), n2.getTokenStartCharacter(), () => o.slice()) : () => true;
  }
  r(u2, "toOneArgVisitWithPath");
  function g(b) {
    return b ? () => {
      l > 0 ? l++ : b(n2.getTokenOffset(), n2.getTokenLength(), n2.getTokenStartLine(), n2.getTokenStartCharacter(), () => o.slice()) === false && (l = 1);
    } : () => true;
  }
  r(g, "toBeginVisit");
  function w2(b) {
    return b ? () => {
      l > 0 && l--, l === 0 && b(n2.getTokenOffset(), n2.getTokenLength(), n2.getTokenStartLine(), n2.getTokenStartCharacter());
    } : () => true;
  }
  r(w2, "toEndVisit");
  const d2 = g(t.onObjectBegin), _2 = u2(t.onObjectProperty), v2 = w2(t.onObjectEnd), p2 = g(t.onArrayBegin), L = w2(t.onArrayEnd), A4 = u2(t.onLiteralValue), D = f2(t.onSeparator), B2 = i(t.onComment), c = f2(t.onError), j = s2 && s2.disallowComments, y = s2 && s2.allowTrailingComma;
  function T() {
    for (; ; ) {
      const b = n2.scan();
      switch (n2.getTokenError()) {
        case 4:
          k(14);
          break;
        case 5:
          k(15);
          break;
        case 3:
          k(13);
          break;
        case 1:
          j || k(11);
          break;
        case 2:
          k(12);
          break;
        case 6:
          k(16);
          break;
      }
      switch (b) {
        case 12:
        case 13:
          j ? k(10) : B2();
          break;
        case 16:
          k(1);
          break;
        case 15:
        case 14:
          break;
        default:
          return b;
      }
    }
  }
  r(T, "scanNext");
  function k(b, F = [], W = []) {
    if (c(b), F.length + W.length > 0) {
      let $ = n2.getToken();
      for (; $ !== 17; ) {
        if (F.indexOf($) !== -1) {
          T();
          break;
        } else if (W.indexOf($) !== -1) break;
        $ = T();
      }
    }
  }
  r(k, "handleError");
  function P2(b) {
    const F = n2.getTokenValue();
    return b ? A4(F) : (_2(F), o.push(F)), T(), true;
  }
  r(P2, "parseString");
  function M() {
    switch (n2.getToken()) {
      case 11:
        const b = n2.getTokenValue();
        let F = Number(b);
        isNaN(F) && (k(2), F = 0), A4(F);
        break;
      case 7:
        A4(null);
        break;
      case 8:
        A4(true);
        break;
      case 9:
        A4(false);
        break;
      default:
        return false;
    }
    return T(), true;
  }
  r(M, "parseLiteral");
  function V() {
    return n2.getToken() !== 10 ? (k(3, [], [2, 5]), false) : (P2(false), n2.getToken() === 6 ? (D(":"), T(), U() || k(4, [], [2, 5])) : k(5, [], [2, 5]), o.pop(), true);
  }
  r(V, "parseProperty");
  function z() {
    d2(), T();
    let b = false;
    for (; n2.getToken() !== 2 && n2.getToken() !== 17; ) {
      if (n2.getToken() === 5) {
        if (b || k(4, [], []), D(","), T(), n2.getToken() === 2 && y) break;
      } else b && k(6, [], []);
      V() || k(4, [], [2, 5]), b = true;
    }
    return v2(), n2.getToken() !== 2 ? k(7, [2], []) : T(), true;
  }
  r(z, "parseObject");
  function G() {
    p2(), T();
    let b = true, F = false;
    for (; n2.getToken() !== 4 && n2.getToken() !== 17; ) {
      if (n2.getToken() === 5) {
        if (F || k(4, [], []), D(","), T(), n2.getToken() === 4 && y) break;
      } else F && k(6, [], []);
      b ? (o.push(0), b = false) : o[o.length - 1]++, U() || k(4, [], [4, 5]), F = true;
    }
    return L(), b || o.pop(), n2.getToken() !== 4 ? k(8, [4], []) : T(), true;
  }
  r(G, "parseArray");
  function U() {
    switch (n2.getToken()) {
      case 3:
        return G();
      case 1:
        return z();
      case 10:
        return P2(true);
      default:
        return M();
    }
  }
  return r(U, "parseValue"), T(), n2.getToken() === 17 ? s2.allowEmptyContent ? true : (k(4, [], []), false) : U() ? (n2.getToken() !== 17 && k(9, [], []), true) : (k(4, [], []), false);
}
r(We, "visit");
var ke;
(function(e) {
  e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter";
})(ke || (ke = {}));
var me;
(function(e) {
  e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.Unknown = 16] = "Unknown", e[e.EOF = 17] = "EOF";
})(me || (me = {}));
var Je = Pe;
var de;
(function(e) {
  e[e.InvalidSymbol = 1] = "InvalidSymbol", e[e.InvalidNumberFormat = 2] = "InvalidNumberFormat", e[e.PropertyNameExpected = 3] = "PropertyNameExpected", e[e.ValueExpected = 4] = "ValueExpected", e[e.ColonExpected = 5] = "ColonExpected", e[e.CommaExpected = 6] = "CommaExpected", e[e.CloseBraceExpected = 7] = "CloseBraceExpected", e[e.CloseBracketExpected = 8] = "CloseBracketExpected", e[e.EndOfFileExpected = 9] = "EndOfFileExpected", e[e.InvalidCommentToken = 10] = "InvalidCommentToken", e[e.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 14] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 16] = "InvalidCharacter";
})(de || (de = {}));
var we = r((e, t) => Je(Se(t, e, "utf8")), "readJsonc");
var ne = /* @__PURE__ */ Symbol("implicitBaseUrl");
var E2 = "${configDir}";
var Me = r(() => {
  const { findPnpApi: e } = Be;
  return e && e(process.cwd());
}, "getPnpApi");
var te = r((e, t, s2, n2) => {
  const o = `resolveFromPackageJsonPath:${e}:${t}:${s2}`;
  if (n2 != null && n2.has(o)) return n2.get(o);
  const l = we(e, n2);
  if (!l) return;
  let i = t || "tsconfig.json";
  if (!s2 && l.exports) try {
    const [f2] = v(l.exports, t, ["require", "types"]);
    i = f2;
  } catch {
    return false;
  }
  else !t && l.tsconfig && (i = l.tsconfig);
  return i = m2.join(e, "..", i), n2 == null || n2.set(o, i), i;
}, "resolveFromPackageJsonPath");
var se = "package.json";
var le = "tsconfig.json";
var Ve = r((e, t, s2) => {
  let n2 = e;
  if (e === ".." && (n2 = m2.join(n2, le)), e[0] === "." && (n2 = m2.resolve(t, n2)), m2.isAbsolute(n2)) {
    if (x(s2, n2)) {
      if (Q(s2, n2).isFile()) return n2;
    } else if (!n2.endsWith(".json")) {
      const v2 = `${n2}.json`;
      if (x(s2, v2)) return v2;
    }
    return;
  }
  const [o, ...l] = e.split("/"), i = o[0] === "@" ? `${o}/${l.shift()}` : o, f2 = l.join("/"), u2 = Me();
  if (u2) {
    const { resolveRequest: v2 } = u2;
    try {
      if (i === e) {
        const p2 = v2(m2.join(i, se), t);
        if (p2) {
          const L = te(p2, f2, false, s2);
          if (L && x(s2, L)) return L;
        }
      } else {
        let p2;
        try {
          p2 = v2(e, t, { extensions: [".json"] });
        } catch {
          p2 = v2(m2.join(e, le), t);
        }
        if (p2) return p2;
      }
    } catch {
    }
  }
  const g = O2(m2.resolve(t), m2.join("node_modules", i), s2);
  if (!g || !Q(s2, g).isDirectory()) return;
  const w2 = m2.join(g, se);
  if (x(s2, w2)) {
    const v2 = te(w2, f2, false, s2);
    if (v2 === false) return;
    if (v2 && x(s2, v2) && Q(s2, v2).isFile()) return v2;
  }
  const d2 = m2.join(g, f2), _2 = d2.endsWith(".json");
  if (!_2) {
    const v2 = `${d2}.json`;
    if (x(s2, v2)) return v2;
  }
  if (x(s2, d2)) {
    if (Q(s2, d2).isDirectory()) {
      const v2 = m2.join(d2, se);
      if (x(s2, v2)) {
        const L = te(v2, "", true, s2);
        if (L && x(s2, L)) return L;
      }
      const p2 = m2.join(d2, le);
      if (x(s2, p2)) return p2;
    } else if (_2) return d2;
  }
}, "resolveExtendsPath");
var oe = r((e, t) => H(m2.relative(e, t)), "pathRelative");
var be = ["files", "include", "exclude"];
var N = r((e, t, s2) => {
  const n2 = m2.join(t, s2), o = m2.relative(e, n2);
  return h2(o) || "./";
}, "resolveAndRelativize");
var ze = r((e, t, s2) => {
  const n2 = m2.relative(e, t);
  if (!n2) return s2;
  const o = s2.startsWith("./") ? s2.slice(2) : s2;
  return h2(`${n2}/${o}`);
}, "prefixPattern");
var Ge = r((e, t, s2, n2) => {
  const o = Ve(e, t, n2);
  if (!o) throw new Error(`File '${e}' not found.`);
  if (s2.has(o)) throw new Error(`Circularity detected while resolving configuration: ${o}`);
  s2.add(o);
  const l = m2.dirname(o), i = pe(o, n2, s2);
  delete i.references;
  const { compilerOptions: f2 } = i;
  if (f2) {
    const { baseUrl: u2 } = f2;
    u2 && !u2.startsWith(E2) && (f2.baseUrl = N(t, l, u2));
    const { outDir: g } = f2;
    g && !g.startsWith(E2) && (f2.outDir = N(t, l, g));
    const { declarationDir: w2 } = f2;
    w2 && !w2.startsWith(E2) && (f2.declarationDir = N(t, l, w2));
    const { rootDir: d2 } = f2;
    d2 && !d2.startsWith(E2) && (f2.rootDir = N(t, l, d2));
    const { rootDirs: _2 } = f2;
    _2 && (f2.rootDirs = _2.map((p2) => p2.startsWith(E2) ? p2 : N(t, l, p2)));
    const { typeRoots: v2 } = f2;
    v2 && (f2.typeRoots = v2.map((p2) => p2.startsWith(E2) ? p2 : N(t, l, p2)));
  }
  for (const u2 of be) {
    const g = i[u2];
    g && (i[u2] = g.map((w2) => w2.startsWith(E2) ? w2 : ze(t, l, w2)));
  }
  return i;
}, "resolveExtends");
var ve = ["outDir", "declarationDir"];
var pe = r((e, t, s2 = /* @__PURE__ */ new Set()) => {
  let n2;
  try {
    n2 = we(e, t) || {};
  } catch {
    throw new Error(`Cannot resolve tsconfig at path: ${e}`);
  }
  if (typeof n2 != "object") throw new SyntaxError(`Failed to parse tsconfig at: ${e}`);
  const o = m2.dirname(e);
  if (n2.compilerOptions) {
    const { compilerOptions: l } = n2;
    l.paths && !l.baseUrl && (l[ne] = o);
  }
  if (n2.extends) {
    const l = Array.isArray(n2.extends) ? n2.extends : [n2.extends];
    delete n2.extends;
    for (const i of l.reverse()) {
      const f2 = Ge(i, o, new Set(s2), t), u2 = { ...f2, ...n2, compilerOptions: { ...f2.compilerOptions, ...n2.compilerOptions } };
      f2.watchOptions && (u2.watchOptions = { ...f2.watchOptions, ...n2.watchOptions }), n2 = u2;
    }
  }
  if (n2.compilerOptions) {
    const { compilerOptions: l } = n2, i = ["baseUrl", "rootDir"];
    for (const f2 of i) {
      const u2 = l[f2];
      if (u2 && !u2.startsWith(E2)) {
        const g = m2.resolve(o, u2), w2 = oe(o, g);
        l[f2] = w2;
      }
    }
    for (const f2 of ve) {
      let u2 = l[f2];
      u2 && (Array.isArray(n2.exclude) || (n2.exclude = ve.map((g) => l[g]).filter(Boolean)), u2.startsWith(E2) || (u2 = H(u2)), l[f2] = u2);
    }
  } else n2.compilerOptions = {};
  if (n2.include && (n2.include = n2.include.map(h2)), n2.files && (n2.files = n2.files.map((l) => l.startsWith(E2) ? l : H(l))), n2.watchOptions) {
    const { watchOptions: l } = n2;
    l.excludeDirectories && (l.excludeDirectories = l.excludeDirectories.map((i) => h2(m2.resolve(o, i)))), l.excludeFiles && (l.excludeFiles = l.excludeFiles.map((i) => h2(m2.resolve(o, i)))), l.watchFile && (l.watchFile = l.watchFile.toLowerCase()), l.watchDirectory && (l.watchDirectory = l.watchDirectory.toLowerCase()), l.fallbackPolling && (l.fallbackPolling = l.fallbackPolling.toLowerCase());
  }
  return n2;
}, "_parseTsconfig");
var Y = r((e, t) => {
  if (e.startsWith(E2)) return h2(m2.join(t, e.slice(E2.length)));
}, "interpolateConfigDir");
var Qe = ["outDir", "declarationDir", "outFile", "rootDir", "baseUrl", "tsBuildInfoFile"];
var He = r((e) => {
  var t, s2, n2, o, l, i, f2, u2, g, w2, d2, _2, v2, p2, L, A4, D, B2, c, j, y, T, k, P2, M, V, z, G, U, b, F, W, $;
  if (e.strict) {
    const a2 = ["noImplicitAny", "noImplicitThis", "strictNullChecks", "strictFunctionTypes", "strictBindCallApply", "strictPropertyInitialization", "strictBuiltinIteratorReturn", "alwaysStrict", "useUnknownInCatchVariables"];
    for (const I2 of a2) e[I2] === void 0 && (e[I2] = true);
  }
  if (e.composite && ((t = e.declaration) != null || (e.declaration = true), (s2 = e.incremental) != null || (e.incremental = true)), e.target) {
    let a2 = e.target.toLowerCase();
    a2 === "es2015" && (a2 = "es6"), e.target = a2, a2 === "esnext" && ((n2 = e.module) != null || (e.module = "es6"), (o = e.useDefineForClassFields) != null || (e.useDefineForClassFields = true)), (a2 === "es6" || a2 === "es2016" || a2 === "es2017" || a2 === "es2018" || a2 === "es2019" || a2 === "es2020" || a2 === "es2021" || a2 === "es2022" || a2 === "es2023" || a2 === "es2024") && ((l = e.module) != null || (e.module = "es6")), (a2 === "es2022" || a2 === "es2023" || a2 === "es2024") && ((i = e.useDefineForClassFields) != null || (e.useDefineForClassFields = true));
  }
  if (e.module) {
    let a2 = e.module.toLowerCase();
    if (a2 === "es2015" && (a2 = "es6"), e.module = a2, (a2 === "es6" || a2 === "es2020" || a2 === "es2022" || a2 === "esnext" || a2 === "none" || a2 === "system" || a2 === "umd" || a2 === "amd") && ((f2 = e.moduleResolution) != null || (e.moduleResolution = "classic")), a2 === "system" && ((u2 = e.allowSyntheticDefaultImports) != null || (e.allowSyntheticDefaultImports = true)), (a2 === "node16" || a2 === "node18" || a2 === "node20" || a2 === "nodenext" || a2 === "preserve") && ((g = e.esModuleInterop) != null || (e.esModuleInterop = true), (w2 = e.allowSyntheticDefaultImports) != null || (e.allowSyntheticDefaultImports = true)), (a2 === "node16" || a2 === "node18" || a2 === "node20" || a2 === "nodenext") && ((d2 = e.moduleDetection) != null || (e.moduleDetection = "force")), a2 === "node16" && ((_2 = e.target) != null || (e.target = "es2022"), (v2 = e.moduleResolution) != null || (e.moduleResolution = "node16")), a2 === "node18" && ((p2 = e.target) != null || (e.target = "es2022"), (L = e.moduleResolution) != null || (e.moduleResolution = "node16")), a2 === "node20" && ((A4 = e.target) != null || (e.target = "es2023"), (D = e.moduleResolution) != null || (e.moduleResolution = "node16"), (B2 = e.resolveJsonModule) != null || (e.resolveJsonModule = true)), a2 === "nodenext" && ((c = e.target) != null || (e.target = "esnext"), (j = e.moduleResolution) != null || (e.moduleResolution = "nodenext"), (y = e.resolveJsonModule) != null || (e.resolveJsonModule = true)), a2 === "node16" || a2 === "node18" || a2 === "node20" || a2 === "nodenext") {
      const I2 = e.target;
      (I2 === "es3" || I2 === "es2022" || I2 === "es2023" || I2 === "es2024" || I2 === "esnext") && ((T = e.useDefineForClassFields) != null || (e.useDefineForClassFields = true));
    }
    a2 === "preserve" && ((k = e.moduleResolution) != null || (e.moduleResolution = "bundler"));
  }
  if (e.moduleResolution) {
    let a2 = e.moduleResolution.toLowerCase();
    a2 === "node" && (a2 = "node10"), e.moduleResolution = a2, (a2 === "node16" || a2 === "nodenext" || a2 === "bundler") && ((P2 = e.resolvePackageJsonExports) != null || (e.resolvePackageJsonExports = true), (M = e.resolvePackageJsonImports) != null || (e.resolvePackageJsonImports = true)), a2 === "bundler" && ((V = e.allowSyntheticDefaultImports) != null || (e.allowSyntheticDefaultImports = true), (z = e.resolveJsonModule) != null || (e.resolveJsonModule = true));
  }
  e.jsx && (e.jsx = e.jsx.toLowerCase()), e.moduleDetection && (e.moduleDetection = e.moduleDetection.toLowerCase()), e.importsNotUsedAsValues && (e.importsNotUsedAsValues = e.importsNotUsedAsValues.toLowerCase()), e.newLine && (e.newLine = e.newLine.toLowerCase()), e.esModuleInterop && ((G = e.allowSyntheticDefaultImports) != null || (e.allowSyntheticDefaultImports = true)), e.verbatimModuleSyntax && ((U = e.isolatedModules) != null || (e.isolatedModules = true), (b = e.preserveConstEnums) != null || (e.preserveConstEnums = true)), e.isolatedModules && ((F = e.preserveConstEnums) != null || (e.preserveConstEnums = true)), e.rewriteRelativeImportExtensions && ((W = e.allowImportingTsExtensions) != null || (e.allowImportingTsExtensions = true)), e.lib && (e.lib = e.lib.map((a2) => a2.toLowerCase())), e.checkJs && (($ = e.allowJs) != null || (e.allowJs = true));
}, "normalizeCompilerOptions");
var ie = r((e, t = /* @__PURE__ */ new Map()) => {
  const s2 = m2.resolve(e), n2 = pe(s2, t), o = m2.dirname(s2), { compilerOptions: l } = n2;
  if (l) {
    for (const f2 of Qe) {
      const u2 = l[f2];
      if (u2) {
        const g = Y(u2, o);
        l[f2] = g ? oe(o, g) : u2;
      }
    }
    for (const f2 of ["rootDirs", "typeRoots"]) {
      const u2 = l[f2];
      u2 && (l[f2] = u2.map((g) => {
        const w2 = Y(g, o);
        return w2 ? oe(o, w2) : H(g);
      }));
    }
    const { paths: i } = l;
    if (i) for (const f2 of Object.keys(i)) i[f2] = i[f2].map((u2) => {
      var g;
      return (g = Y(u2, o)) != null ? g : u2;
    });
    He(l);
  }
  for (const i of be) {
    const f2 = n2[i];
    f2 && (n2[i] = f2.map((u2) => {
      var g;
      return (g = Y(u2, o)) != null ? g : u2;
    }));
  }
  return n2;
}, "parseTsconfig");
var Xe = Object.defineProperty;
var Z = r((e, t) => Xe(e, "name", { value: t, configurable: true }), "s");
var Te = Z((e) => {
  let t = "";
  for (let s2 = 0; s2 < e.length; s2 += 1) {
    const n2 = e[s2], o = n2.toUpperCase();
    t += n2 === o ? n2.toLowerCase() : o;
  }
  return t;
}, "invertCase");
var re = /* @__PURE__ */ new Map();
var Ae = Z((e, t) => {
  const s2 = Re.join(e, `.is-fs-case-sensitive-test-${process.pid}`);
  try {
    return t.writeFileSync(s2, ""), !t.existsSync(Te(s2));
  } finally {
    try {
      t.unlinkSync(s2);
    } catch {
    }
  }
}, "checkDirectoryCaseWithWrite");
var Ye = Z((e, t, s2) => {
  try {
    return Ae(e, s2);
  } catch (n2) {
    if (t === void 0) return Ae(Ue.tmpdir(), s2);
    throw n2;
  }
}, "checkDirectoryCaseWithFallback");
var Ze = Z((e, t = $e, s2 = true) => {
  const n2 = e != null ? e : process.cwd();
  if (s2 && re.has(n2)) return re.get(n2);
  let o;
  const l = Te(n2);
  return l !== n2 && t.existsSync(n2) ? o = !t.existsSync(l) : o = Ye(n2, e, t), s2 && re.set(n2, o), o;
}, "isFsCaseSensitive");
var { join: _e } = m2.posix;
var ue = { ts: [".ts", ".tsx", ".d.ts"], cts: [".cts", ".d.cts"], mts: [".mts", ".d.mts"] };
var qe = r((e) => {
  const t = [...ue.ts], s2 = [...ue.cts], n2 = [...ue.mts];
  return e != null && e.allowJs && (t.push(".js", ".jsx"), s2.push(".cjs"), n2.push(".mjs")), [...t, ...s2, ...n2];
}, "getSupportedExtensions");
var Ke = r((e) => {
  const t = [];
  if (!e) return t;
  const { outDir: s2, declarationDir: n2 } = e;
  return s2 && t.push(s2), n2 && t.push(n2), t;
}, "getDefaultExcludeSpec");
var ye = r((e) => e.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`), "escapeForRegexp");
var Oe = ["node_modules", "bower_components", "jspm_packages"];
var fe = `(?!(${Oe.join("|")})(/|$))`;
var Ce = /(?:^|\/)[^.*?]+$/;
var je = "**/*";
var q = "[^/]";
var ae = "[^./]";
var Fe = process.platform === "win32";
var De = r(({ config: e, path: t }, s2 = Ze()) => {
  if ("extends" in e) throw new Error("tsconfig#extends must be resolved. Use getTsconfig or parseTsconfig to resolve it.");
  if (!m2.isAbsolute(t)) throw new Error("The tsconfig path must be absolute");
  Fe && (t = h2(t));
  const n2 = m2.dirname(t), { files: o, include: l, exclude: i, compilerOptions: f2 } = e, u2 = r((A4) => m2.isAbsolute(A4) ? A4 : _e(n2, A4), "resolvePattern"), g = o == null ? void 0 : o.map(u2), w2 = qe(f2), d2 = s2 ? "" : "i", v2 = (i || Ke(f2)).map((A4) => {
    const D = u2(A4), B2 = ye(D).replaceAll(String.raw`\*\*/`, "(.+/)?").replaceAll(String.raw`\*`, `${q}*`).replaceAll(String.raw`\?`, q);
    return new RegExp(`^${B2}($|/)`, d2);
  }), p2 = o || l ? l : [je], L = p2 ? p2.map((A4) => {
    let D = u2(A4);
    Ce.test(D) && (D = _e(D, je));
    const B2 = ye(D).replaceAll(String.raw`/\*\*`, `(/${fe}${ae}${q}*)*?`).replaceAll(/(\/)?\\\*/g, (c, j) => {
      const y = `(${ae}|(\\.(?!min\\.js$))?)*`;
      return j ? `/${fe}${ae}${y}` : y;
    }).replaceAll(/(\/)?\\\?/g, (c, j) => {
      const y = q;
      return j ? `/${fe}${y}` : y;
    });
    return new RegExp(`^${B2}$`, d2);
  }) : void 0;
  return (A4) => {
    if (!m2.isAbsolute(A4)) throw new Error("filePath must be absolute");
    if (Fe && (A4 = h2(A4)), g != null && g.includes(A4)) return e;
    if (!(!w2.some((D) => A4.endsWith(D)) || v2.some((D) => D.test(A4))) && L && L.some((D) => D.test(A4))) return e;
  };
}, "createFilesMatcher");
var Le = r((e, t, s2) => {
  const n2 = m2.resolve(e);
  let o = h2(e);
  for (; ; ) {
    const l = O2(o, t, s2);
    if (!l) return;
    const i = m2.resolve(l), f2 = ie(i, s2), u2 = { path: h2(i), config: f2 };
    if (De(u2)(n2)) return u2;
    const w2 = m2.dirname(l), d2 = m2.dirname(w2);
    if (d2 === w2) return;
    o = d2;
  }
}, "findConfigApplicable");
var he = r((e = process.cwd(), t = "tsconfig.json", s2 = /* @__PURE__ */ new Map(), n2 = false) => {
  var o;
  return n2 ? (o = Le(e, t, s2)) == null ? void 0 : o.path : O2(h2(e), t, s2);
}, "findTsconfig");
var en = r((e = process.cwd(), t = "tsconfig.json", s2 = /* @__PURE__ */ new Map(), n2 = false) => {
  var o;
  if (!n2) {
    const l = he(e, t, s2);
    if (!l) return null;
    const i = ie(l, s2);
    return { path: l, config: i };
  }
  return (o = Le(e, t, s2)) != null ? o : null;
}, "getTsconfig");
var nn = /\*/g;
var Ee = r((e, t) => {
  const s2 = e.match(nn);
  if (s2 && s2.length > 1) throw new Error(t);
}, "assertStarCount");
var tn = r((e) => {
  if (e.includes("*")) {
    const [t, s2] = e.split("*");
    return { prefix: t, suffix: s2 };
  }
  return e;
}, "parsePattern");
var sn = r(({ prefix: e, suffix: t }, s2) => s2.startsWith(e) && s2.endsWith(t), "isPatternMatch");
var ln = r((e, t, s2) => Object.entries(e).map(([n2, o]) => (Ee(n2, `Pattern '${n2}' can have at most one '*' character.`), { pattern: tn(n2), substitutions: o.map((l) => {
  if (Ee(l, `Substitution '${l}' in pattern '${n2}' can have at most one '*' character.`), !t && !C.test(l) && !m2.isAbsolute(l)) throw new Error("Non-relative paths are not allowed when 'baseUrl' is not set. Did you forget a leading './'?");
  return m2.resolve(s2, l);
}) })), "parsePaths");
var on = r((e) => {
  const { compilerOptions: t } = e.config;
  if (!t) return null;
  const { baseUrl: s2, paths: n2 } = t;
  if (!s2 && !n2) return null;
  const o = ne in t && t[ne], l = m2.resolve(m2.dirname(e.path), s2 || o || "."), i = n2 ? ln(n2, s2, l) : [];
  return (f2) => {
    if (C.test(f2)) return [];
    const u2 = [];
    for (const _2 of i) {
      if (_2.pattern === f2) return _2.substitutions.map(h2);
      typeof _2.pattern != "string" && u2.push(_2);
    }
    let g, w2 = -1;
    for (const _2 of u2) sn(_2.pattern, f2) && _2.pattern.prefix.length > w2 && (w2 = _2.pattern.prefix.length, g = _2);
    if (!g) return s2 ? [h2(m2.join(l, f2))] : [];
    const d2 = f2.slice(g.pattern.prefix.length, f2.length - g.pattern.suffix.length);
    return g.substitutions.map((_2) => h2(_2.replace("*", d2)));
  };
}, "createPathsMatcher");

// www/node_modules/oxc-minify/index.js
import { createRequire } from "node:module";
var require2 = createRequire(import.meta.url);
var __dirname = new URL(".", import.meta.url).pathname;
var { readFileSync } = require2("node:fs");
var nativeBinding = null;
var loadErrors = [];
var isMusl = () => {
  let musl = false;
  if (process.platform === "linux") {
    musl = isMuslFromFilesystem();
    if (musl === null) {
      musl = isMuslFromReport();
    }
    if (musl === null) {
      musl = isMuslFromChildProcess();
    }
  }
  return musl;
};
var isFileMusl = (f2) => f2.includes("libc.musl-") || f2.includes("ld-musl-");
var isMuslFromFilesystem = () => {
  try {
    return readFileSync("/usr/bin/ldd", "utf-8").includes("musl");
  } catch {
    return null;
  }
};
var isMuslFromReport = () => {
  let report = null;
  if (typeof process.report?.getReport === "function") {
    process.report.excludeNetwork = true;
    report = process.report.getReport();
  }
  if (!report) {
    return null;
  }
  if (report.header && report.header.glibcVersionRuntime) {
    return false;
  }
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl)) {
      return true;
    }
  }
  return false;
};
var isMuslFromChildProcess = () => {
  try {
    return require2("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
  } catch (e) {
    return false;
  }
};
function requireNative() {
  if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) {
    try {
      return require2(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
    } catch (err) {
      loadErrors.push(err);
    }
  } else if (process.platform === "android") {
    if (process.arch === "arm64") {
      try {
        return require2("./minify.android-arm64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-android-arm64");
        const bindingPackageVersion = require2("@oxc-minify/binding-android-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "arm") {
      try {
        return require2("./minify.android-arm-eabi.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-android-arm-eabi");
        const bindingPackageVersion = require2("@oxc-minify/binding-android-arm-eabi/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      loadErrors.push(new Error(`Unsupported architecture on Android ${process.arch}`));
    }
  } else if (process.platform === "win32") {
    if (process.arch === "x64") {
      if (process.config?.variables?.shlib_suffix === "dll.a" || process.config?.variables?.node_target_type === "shared_library") {
        try {
          return require2("./minify.win32-x64-gnu.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-win32-x64-gnu");
          const bindingPackageVersion = require2("@oxc-minify/binding-win32-x64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        try {
          return require2("./minify.win32-x64-msvc.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-win32-x64-msvc");
          const bindingPackageVersion = require2("@oxc-minify/binding-win32-x64-msvc/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      }
    } else if (process.arch === "ia32") {
      try {
        return require2("./minify.win32-ia32-msvc.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-win32-ia32-msvc");
        const bindingPackageVersion = require2("@oxc-minify/binding-win32-ia32-msvc/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require2("./minify.win32-arm64-msvc.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-win32-arm64-msvc");
        const bindingPackageVersion = require2("@oxc-minify/binding-win32-arm64-msvc/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      loadErrors.push(new Error(`Unsupported architecture on Windows: ${process.arch}`));
    }
  } else if (process.platform === "darwin") {
    try {
      return require2("./minify.darwin-universal.node");
    } catch (e) {
      loadErrors.push(e);
    }
    try {
      const binding = require2("@oxc-minify/binding-darwin-universal");
      const bindingPackageVersion = require2("@oxc-minify/binding-darwin-universal/package.json").version;
      if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
        throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      }
      return binding;
    } catch (e) {
      loadErrors.push(e);
    }
    if (process.arch === "x64") {
      try {
        return require2("./minify.darwin-x64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-darwin-x64");
        const bindingPackageVersion = require2("@oxc-minify/binding-darwin-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require2("./minify.darwin-arm64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-darwin-arm64");
        const bindingPackageVersion = require2("@oxc-minify/binding-darwin-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      loadErrors.push(new Error(`Unsupported architecture on macOS: ${process.arch}`));
    }
  } else if (process.platform === "freebsd") {
    if (process.arch === "x64") {
      try {
        return require2("./minify.freebsd-x64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-freebsd-x64");
        const bindingPackageVersion = require2("@oxc-minify/binding-freebsd-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require2("./minify.freebsd-arm64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-freebsd-arm64");
        const bindingPackageVersion = require2("@oxc-minify/binding-freebsd-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      loadErrors.push(new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
    }
  } else if (process.platform === "linux") {
    if (process.arch === "x64") {
      if (isMusl()) {
        try {
          return require2("./minify.linux-x64-musl.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-x64-musl");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-x64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        try {
          return require2("./minify.linux-x64-gnu.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-x64-gnu");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-x64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      }
    } else if (process.arch === "arm64") {
      if (isMusl()) {
        try {
          return require2("./minify.linux-arm64-musl.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-arm64-musl");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-arm64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        try {
          return require2("./minify.linux-arm64-gnu.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-arm64-gnu");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-arm64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      }
    } else if (process.arch === "arm") {
      if (isMusl()) {
        try {
          return require2("./minify.linux-arm-musleabihf.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-arm-musleabihf");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-arm-musleabihf/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        try {
          return require2("./minify.linux-arm-gnueabihf.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-arm-gnueabihf");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-arm-gnueabihf/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      }
    } else if (process.arch === "loong64") {
      if (isMusl()) {
        try {
          return require2("./minify.linux-loong64-musl.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-loong64-musl");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-loong64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        try {
          return require2("./minify.linux-loong64-gnu.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-loong64-gnu");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-loong64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      }
    } else if (process.arch === "riscv64") {
      if (isMusl()) {
        try {
          return require2("./minify.linux-riscv64-musl.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-riscv64-musl");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-riscv64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      } else {
        try {
          return require2("./minify.linux-riscv64-gnu.node");
        } catch (e) {
          loadErrors.push(e);
        }
        try {
          const binding = require2("@oxc-minify/binding-linux-riscv64-gnu");
          const bindingPackageVersion = require2("@oxc-minify/binding-linux-riscv64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors.push(e);
        }
      }
    } else if (process.arch === "ppc64") {
      try {
        return require2("./minify.linux-ppc64-gnu.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-linux-ppc64-gnu");
        const bindingPackageVersion = require2("@oxc-minify/binding-linux-ppc64-gnu/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "s390x") {
      try {
        return require2("./minify.linux-s390x-gnu.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-linux-s390x-gnu");
        const bindingPackageVersion = require2("@oxc-minify/binding-linux-s390x-gnu/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      loadErrors.push(new Error(`Unsupported architecture on Linux: ${process.arch}`));
    }
  } else if (process.platform === "openharmony") {
    if (process.arch === "arm64") {
      try {
        return require2("./minify.openharmony-arm64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-openharmony-arm64");
        const bindingPackageVersion = require2("@oxc-minify/binding-openharmony-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "x64") {
      try {
        return require2("./minify.openharmony-x64.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-openharmony-x64");
        const bindingPackageVersion = require2("@oxc-minify/binding-openharmony-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else if (process.arch === "arm") {
      try {
        return require2("./minify.openharmony-arm.node");
      } catch (e) {
        loadErrors.push(e);
      }
      try {
        const binding = require2("@oxc-minify/binding-openharmony-arm");
        const bindingPackageVersion = require2("@oxc-minify/binding-openharmony-arm/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors.push(e);
      }
    } else {
      loadErrors.push(new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
    }
  } else {
    loadErrors.push(new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
  }
}
nativeBinding = requireNative();
if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
  let wasiBinding = null;
  let wasiBindingError = null;
  try {
    wasiBinding = require2("./minify.wasi.cjs");
    nativeBinding = wasiBinding;
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) {
      wasiBindingError = err;
    }
  }
  if (!nativeBinding || process.env.NAPI_RS_FORCE_WASI) {
    try {
      wasiBinding = require2("@oxc-minify/binding-wasm32-wasi");
      nativeBinding = wasiBinding;
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        if (!wasiBindingError) {
          wasiBindingError = err;
        } else {
          wasiBindingError.cause = err;
        }
        loadErrors.push(err);
      }
    }
  }
  if (process.env.NAPI_RS_FORCE_WASI === "error" && !wasiBinding) {
    const error2 = new Error("WASI binding not found and NAPI_RS_FORCE_WASI is set to error");
    error2.cause = wasiBindingError;
    throw error2;
  }
}
if (!nativeBinding && globalThis.process?.versions?.["webcontainer"]) {
  try {
    nativeBinding = require2("./webcontainer-fallback.cjs");
  } catch (err) {
    loadErrors.push(err);
  }
}
if (!nativeBinding) {
  if (loadErrors.length > 0) {
    throw new Error(
      `Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try \`npm i\` again after removing both package-lock.json and node_modules directory.`,
      {
        cause: loadErrors.reduce((err, cur) => {
          cur.cause = err;
          return cur;
        })
      }
    );
  }
  throw new Error(`Failed to load native binding`);
}
var { minify, minifySync, Severity } = nativeBinding;

// www/node_modules/oxc-parser/src-js/index.js
import { createRequire as createRequire3 } from "node:module";

// www/node_modules/oxc-parser/src-js/bindings.js
import { createRequire as createRequire2 } from "node:module";
var require3 = createRequire2(import.meta.url);
var __dirname2 = new URL(".", import.meta.url).pathname;
var { readFileSync: readFileSync2 } = require3("node:fs");
var nativeBinding2 = null;
var loadErrors2 = [];
var isMusl2 = () => {
  let musl = false;
  if (process.platform === "linux") {
    musl = isMuslFromFilesystem2();
    if (musl === null) {
      musl = isMuslFromReport2();
    }
    if (musl === null) {
      musl = isMuslFromChildProcess2();
    }
  }
  return musl;
};
var isFileMusl2 = (f2) => f2.includes("libc.musl-") || f2.includes("ld-musl-");
var isMuslFromFilesystem2 = () => {
  try {
    return readFileSync2("/usr/bin/ldd", "utf-8").includes("musl");
  } catch {
    return null;
  }
};
var isMuslFromReport2 = () => {
  let report = null;
  if (typeof process.report?.getReport === "function") {
    process.report.excludeNetwork = true;
    report = process.report.getReport();
  }
  if (!report) {
    return null;
  }
  if (report.header && report.header.glibcVersionRuntime) {
    return false;
  }
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl2)) {
      return true;
    }
  }
  return false;
};
var isMuslFromChildProcess2 = () => {
  try {
    return require3("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
  } catch (e) {
    return false;
  }
};
function requireNative2() {
  if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) {
    try {
      return require3(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
    } catch (err) {
      loadErrors2.push(err);
    }
  } else if (process.platform === "android") {
    if (process.arch === "arm64") {
      try {
        return require3("./parser.android-arm64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-android-arm64");
        const bindingPackageVersion = require3("@oxc-parser/binding-android-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "arm") {
      try {
        return require3("./parser.android-arm-eabi.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-android-arm-eabi");
        const bindingPackageVersion = require3("@oxc-parser/binding-android-arm-eabi/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else {
      loadErrors2.push(new Error(`Unsupported architecture on Android ${process.arch}`));
    }
  } else if (process.platform === "win32") {
    if (process.arch === "x64") {
      if (process.config?.variables?.shlib_suffix === "dll.a" || process.config?.variables?.node_target_type === "shared_library") {
        try {
          return require3("./parser.win32-x64-gnu.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-win32-x64-gnu");
          const bindingPackageVersion = require3("@oxc-parser/binding-win32-x64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      } else {
        try {
          return require3("./parser.win32-x64-msvc.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-win32-x64-msvc");
          const bindingPackageVersion = require3("@oxc-parser/binding-win32-x64-msvc/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      }
    } else if (process.arch === "ia32") {
      try {
        return require3("./parser.win32-ia32-msvc.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-win32-ia32-msvc");
        const bindingPackageVersion = require3("@oxc-parser/binding-win32-ia32-msvc/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require3("./parser.win32-arm64-msvc.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-win32-arm64-msvc");
        const bindingPackageVersion = require3("@oxc-parser/binding-win32-arm64-msvc/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else {
      loadErrors2.push(new Error(`Unsupported architecture on Windows: ${process.arch}`));
    }
  } else if (process.platform === "darwin") {
    try {
      return require3("./parser.darwin-universal.node");
    } catch (e) {
      loadErrors2.push(e);
    }
    try {
      const binding = require3("@oxc-parser/binding-darwin-universal");
      const bindingPackageVersion = require3("@oxc-parser/binding-darwin-universal/package.json").version;
      if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
        throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      }
      return binding;
    } catch (e) {
      loadErrors2.push(e);
    }
    if (process.arch === "x64") {
      try {
        return require3("./parser.darwin-x64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-darwin-x64");
        const bindingPackageVersion = require3("@oxc-parser/binding-darwin-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require3("./parser.darwin-arm64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-darwin-arm64");
        const bindingPackageVersion = require3("@oxc-parser/binding-darwin-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else {
      loadErrors2.push(new Error(`Unsupported architecture on macOS: ${process.arch}`));
    }
  } else if (process.platform === "freebsd") {
    if (process.arch === "x64") {
      try {
        return require3("./parser.freebsd-x64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-freebsd-x64");
        const bindingPackageVersion = require3("@oxc-parser/binding-freebsd-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require3("./parser.freebsd-arm64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-freebsd-arm64");
        const bindingPackageVersion = require3("@oxc-parser/binding-freebsd-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else {
      loadErrors2.push(new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
    }
  } else if (process.platform === "linux") {
    if (process.arch === "x64") {
      if (isMusl2()) {
        try {
          return require3("./parser.linux-x64-musl.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-x64-musl");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-x64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      } else {
        try {
          return require3("./parser.linux-x64-gnu.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-x64-gnu");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-x64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      }
    } else if (process.arch === "arm64") {
      if (isMusl2()) {
        try {
          return require3("./parser.linux-arm64-musl.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-arm64-musl");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-arm64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      } else {
        try {
          return require3("./parser.linux-arm64-gnu.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-arm64-gnu");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-arm64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      }
    } else if (process.arch === "arm") {
      if (isMusl2()) {
        try {
          return require3("./parser.linux-arm-musleabihf.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-arm-musleabihf");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-arm-musleabihf/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      } else {
        try {
          return require3("./parser.linux-arm-gnueabihf.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-arm-gnueabihf");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-arm-gnueabihf/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      }
    } else if (process.arch === "loong64") {
      if (isMusl2()) {
        try {
          return require3("./parser.linux-loong64-musl.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-loong64-musl");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-loong64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      } else {
        try {
          return require3("./parser.linux-loong64-gnu.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-loong64-gnu");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-loong64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      }
    } else if (process.arch === "riscv64") {
      if (isMusl2()) {
        try {
          return require3("./parser.linux-riscv64-musl.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-riscv64-musl");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-riscv64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      } else {
        try {
          return require3("./parser.linux-riscv64-gnu.node");
        } catch (e) {
          loadErrors2.push(e);
        }
        try {
          const binding = require3("@oxc-parser/binding-linux-riscv64-gnu");
          const bindingPackageVersion = require3("@oxc-parser/binding-linux-riscv64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors2.push(e);
        }
      }
    } else if (process.arch === "ppc64") {
      try {
        return require3("./parser.linux-ppc64-gnu.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-linux-ppc64-gnu");
        const bindingPackageVersion = require3("@oxc-parser/binding-linux-ppc64-gnu/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "s390x") {
      try {
        return require3("./parser.linux-s390x-gnu.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-linux-s390x-gnu");
        const bindingPackageVersion = require3("@oxc-parser/binding-linux-s390x-gnu/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else {
      loadErrors2.push(new Error(`Unsupported architecture on Linux: ${process.arch}`));
    }
  } else if (process.platform === "openharmony") {
    if (process.arch === "arm64") {
      try {
        return require3("./parser.openharmony-arm64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-openharmony-arm64");
        const bindingPackageVersion = require3("@oxc-parser/binding-openharmony-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "x64") {
      try {
        return require3("./parser.openharmony-x64.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-openharmony-x64");
        const bindingPackageVersion = require3("@oxc-parser/binding-openharmony-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else if (process.arch === "arm") {
      try {
        return require3("./parser.openharmony-arm.node");
      } catch (e) {
        loadErrors2.push(e);
      }
      try {
        const binding = require3("@oxc-parser/binding-openharmony-arm");
        const bindingPackageVersion = require3("@oxc-parser/binding-openharmony-arm/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors2.push(e);
      }
    } else {
      loadErrors2.push(new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
    }
  } else {
    loadErrors2.push(new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
  }
}
nativeBinding2 = requireNative2();
if (!nativeBinding2 || process.env.NAPI_RS_FORCE_WASI) {
  let wasiBinding = null;
  let wasiBindingError = null;
  try {
    wasiBinding = require3("./parser.wasi.cjs");
    nativeBinding2 = wasiBinding;
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) {
      wasiBindingError = err;
    }
  }
  if (!nativeBinding2 || process.env.NAPI_RS_FORCE_WASI) {
    try {
      wasiBinding = require3("@oxc-parser/binding-wasm32-wasi");
      nativeBinding2 = wasiBinding;
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        if (!wasiBindingError) {
          wasiBindingError = err;
        } else {
          wasiBindingError.cause = err;
        }
        loadErrors2.push(err);
      }
    }
  }
  if (process.env.NAPI_RS_FORCE_WASI === "error" && !wasiBinding) {
    const error2 = new Error("WASI binding not found and NAPI_RS_FORCE_WASI is set to error");
    error2.cause = wasiBindingError;
    throw error2;
  }
}
if (!nativeBinding2 && globalThis.process?.versions?.["webcontainer"]) {
  try {
    nativeBinding2 = require3("./webcontainer-fallback.cjs");
  } catch (err) {
    loadErrors2.push(err);
  }
}
if (!nativeBinding2) {
  if (loadErrors2.length > 0) {
    throw new Error(
      `Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try \`npm i\` again after removing both package-lock.json and node_modules directory.`,
      {
        cause: loadErrors2.reduce((err, cur) => {
          cur.cause = err;
          return cur;
        })
      }
    );
  }
  throw new Error(`Failed to load native binding`);
}
var { Severity: Severity2, ParseResult, ExportExportNameKind, ExportImportNameKind, ExportLocalNameKind, ImportNameKind, parse: parse2, parseSync, rawTransferSupported } = nativeBinding2;
var { getBufferOffset, parseRaw, parseRawSync } = nativeBinding2;

// www/node_modules/oxc-parser/src-js/wrap.js
function wrap(result) {
  let program, module, comments, errors2;
  return {
    get program() {
      if (!program) program = jsonParseAst(result.program);
      return program;
    },
    get module() {
      if (!module) module = result.module;
      return module;
    },
    get comments() {
      if (!comments) comments = result.comments;
      return comments;
    },
    get errors() {
      if (!errors2) errors2 = result.errors;
      return errors2;
    }
  };
}
function jsonParseAst(programJson) {
  const { node: program, fixes } = JSON.parse(programJson);
  for (const fixPath of fixes) {
    applyFix(program, fixPath);
  }
  return program;
}
function applyFix(program, fixPath) {
  let node = program;
  for (const key of fixPath) {
    node = node[key];
  }
  if (node.bigint) {
    node.value = BigInt(node.bigint);
  } else {
    try {
      node.value = RegExp(node.regex.pattern, node.regex.flags);
    } catch {
    }
  }
}

// www/node_modules/oxc-parser/src-js/generated/visit/keys.js
var { freeze } = Object;
var $EMPTY = freeze([]);
var DECORATORS__KEY__TYPE_ANNOTATION__VALUE = freeze([
  "decorators",
  "key",
  "typeAnnotation",
  "value"
]);
var LEFT__RIGHT = freeze(["left", "right"]);
var ARGUMENT = freeze(["argument"]);
var BODY = freeze(["body"]);
var LABEL = freeze(["label"]);
var CALLEE__TYPE_ARGUMENTS__ARGUMENTS = freeze(["callee", "typeArguments", "arguments"]);
var EXPRESSION = freeze(["expression"]);
var DECORATORS__ID__TYPE_PARAMETERS__SUPER_CLASS__SUPER_TYPE_ARGUMENTS__IMPLEMENTS__BODY = freeze([
  "decorators",
  "id",
  "typeParameters",
  "superClass",
  "superTypeArguments",
  "implements",
  "body"
]);
var TEST__CONSEQUENT__ALTERNATE = freeze(["test", "consequent", "alternate"]);
var LEFT__RIGHT__BODY = freeze(["left", "right", "body"]);
var ID__TYPE_PARAMETERS__PARAMS__RETURN_TYPE__BODY = freeze([
  "id",
  "typeParameters",
  "params",
  "returnType",
  "body"
]);
var KEY__VALUE = freeze(["key", "value"]);
var LOCAL = freeze(["local"]);
var OBJECT__PROPERTY = freeze(["object", "property"]);
var DECORATORS__KEY__TYPE_ANNOTATION = freeze(["decorators", "key", "typeAnnotation"]);
var EXPRESSION__TYPE_ANNOTATION = freeze(["expression", "typeAnnotation"]);
var TYPE_PARAMETERS__PARAMS__RETURN_TYPE = freeze(["typeParameters", "params", "returnType"]);
var EXPRESSION__TYPE_ARGUMENTS = freeze(["expression", "typeArguments"]);
var MEMBERS = freeze(["members"]);
var ID__BODY = freeze(["id", "body"]);
var TYPES = freeze(["types"]);
var TYPE_ANNOTATION = freeze(["typeAnnotation"]);
var PARAMS = freeze(["params"]);
var keys_default = freeze({
  // Leaf nodes
  DebuggerStatement: $EMPTY,
  EmptyStatement: $EMPTY,
  Literal: $EMPTY,
  PrivateIdentifier: $EMPTY,
  Super: $EMPTY,
  TemplateElement: $EMPTY,
  ThisExpression: $EMPTY,
  JSXClosingFragment: $EMPTY,
  JSXEmptyExpression: $EMPTY,
  JSXIdentifier: $EMPTY,
  JSXOpeningFragment: $EMPTY,
  JSXText: $EMPTY,
  TSAnyKeyword: $EMPTY,
  TSBigIntKeyword: $EMPTY,
  TSBooleanKeyword: $EMPTY,
  TSIntrinsicKeyword: $EMPTY,
  TSJSDocUnknownType: $EMPTY,
  TSNeverKeyword: $EMPTY,
  TSNullKeyword: $EMPTY,
  TSNumberKeyword: $EMPTY,
  TSObjectKeyword: $EMPTY,
  TSStringKeyword: $EMPTY,
  TSSymbolKeyword: $EMPTY,
  TSThisType: $EMPTY,
  TSUndefinedKeyword: $EMPTY,
  TSUnknownKeyword: $EMPTY,
  TSVoidKeyword: $EMPTY,
  // Non-leaf nodes
  AccessorProperty: DECORATORS__KEY__TYPE_ANNOTATION__VALUE,
  ArrayExpression: freeze(["elements"]),
  ArrayPattern: freeze(["decorators", "elements", "typeAnnotation"]),
  ArrowFunctionExpression: freeze(["typeParameters", "params", "returnType", "body"]),
  AssignmentExpression: LEFT__RIGHT,
  AssignmentPattern: freeze(["decorators", "left", "right", "typeAnnotation"]),
  AwaitExpression: ARGUMENT,
  BinaryExpression: LEFT__RIGHT,
  BlockStatement: BODY,
  BreakStatement: LABEL,
  CallExpression: CALLEE__TYPE_ARGUMENTS__ARGUMENTS,
  CatchClause: freeze(["param", "body"]),
  ChainExpression: EXPRESSION,
  ClassBody: BODY,
  ClassDeclaration: DECORATORS__ID__TYPE_PARAMETERS__SUPER_CLASS__SUPER_TYPE_ARGUMENTS__IMPLEMENTS__BODY,
  ClassExpression: DECORATORS__ID__TYPE_PARAMETERS__SUPER_CLASS__SUPER_TYPE_ARGUMENTS__IMPLEMENTS__BODY,
  ConditionalExpression: TEST__CONSEQUENT__ALTERNATE,
  ContinueStatement: LABEL,
  Decorator: EXPRESSION,
  DoWhileStatement: freeze(["body", "test"]),
  ExportAllDeclaration: freeze(["exported", "source", "attributes"]),
  ExportDefaultDeclaration: freeze(["declaration"]),
  ExportNamedDeclaration: freeze(["declaration", "specifiers", "source", "attributes"]),
  ExportSpecifier: freeze(["local", "exported"]),
  ExpressionStatement: EXPRESSION,
  ForInStatement: LEFT__RIGHT__BODY,
  ForOfStatement: LEFT__RIGHT__BODY,
  ForStatement: freeze(["init", "test", "update", "body"]),
  FunctionDeclaration: ID__TYPE_PARAMETERS__PARAMS__RETURN_TYPE__BODY,
  FunctionExpression: ID__TYPE_PARAMETERS__PARAMS__RETURN_TYPE__BODY,
  Identifier: freeze(["decorators", "typeAnnotation"]),
  IfStatement: TEST__CONSEQUENT__ALTERNATE,
  ImportAttribute: KEY__VALUE,
  ImportDeclaration: freeze(["specifiers", "source", "attributes"]),
  ImportDefaultSpecifier: LOCAL,
  ImportExpression: freeze(["source", "options"]),
  ImportNamespaceSpecifier: LOCAL,
  ImportSpecifier: freeze(["imported", "local"]),
  LabeledStatement: freeze(["label", "body"]),
  LogicalExpression: LEFT__RIGHT,
  MemberExpression: OBJECT__PROPERTY,
  MetaProperty: freeze(["meta", "property"]),
  MethodDefinition: freeze(["decorators", "key", "value"]),
  NewExpression: CALLEE__TYPE_ARGUMENTS__ARGUMENTS,
  ObjectExpression: freeze(["properties"]),
  ObjectPattern: freeze(["decorators", "properties", "typeAnnotation"]),
  ParenthesizedExpression: EXPRESSION,
  Program: BODY,
  Property: KEY__VALUE,
  PropertyDefinition: DECORATORS__KEY__TYPE_ANNOTATION__VALUE,
  RestElement: freeze(["decorators", "argument", "typeAnnotation"]),
  ReturnStatement: ARGUMENT,
  SequenceExpression: freeze(["expressions"]),
  SpreadElement: ARGUMENT,
  StaticBlock: BODY,
  SwitchCase: freeze(["test", "consequent"]),
  SwitchStatement: freeze(["discriminant", "cases"]),
  TaggedTemplateExpression: freeze(["tag", "typeArguments", "quasi"]),
  TemplateLiteral: freeze(["quasis", "expressions"]),
  ThrowStatement: ARGUMENT,
  TryStatement: freeze(["block", "handler", "finalizer"]),
  UnaryExpression: ARGUMENT,
  UpdateExpression: ARGUMENT,
  V8IntrinsicExpression: freeze(["name", "arguments"]),
  VariableDeclaration: freeze(["declarations"]),
  VariableDeclarator: freeze(["id", "init"]),
  WhileStatement: freeze(["test", "body"]),
  WithStatement: freeze(["object", "body"]),
  YieldExpression: ARGUMENT,
  JSXAttribute: freeze(["name", "value"]),
  JSXClosingElement: freeze(["name"]),
  JSXElement: freeze(["openingElement", "children", "closingElement"]),
  JSXExpressionContainer: EXPRESSION,
  JSXFragment: freeze(["openingFragment", "children", "closingFragment"]),
  JSXMemberExpression: OBJECT__PROPERTY,
  JSXNamespacedName: freeze(["namespace", "name"]),
  JSXOpeningElement: freeze(["name", "typeArguments", "attributes"]),
  JSXSpreadAttribute: ARGUMENT,
  JSXSpreadChild: EXPRESSION,
  TSAbstractAccessorProperty: DECORATORS__KEY__TYPE_ANNOTATION,
  TSAbstractMethodDefinition: KEY__VALUE,
  TSAbstractPropertyDefinition: DECORATORS__KEY__TYPE_ANNOTATION,
  TSArrayType: freeze(["elementType"]),
  TSAsExpression: EXPRESSION__TYPE_ANNOTATION,
  TSCallSignatureDeclaration: TYPE_PARAMETERS__PARAMS__RETURN_TYPE,
  TSClassImplements: EXPRESSION__TYPE_ARGUMENTS,
  TSConditionalType: freeze(["checkType", "extendsType", "trueType", "falseType"]),
  TSConstructSignatureDeclaration: TYPE_PARAMETERS__PARAMS__RETURN_TYPE,
  TSConstructorType: TYPE_PARAMETERS__PARAMS__RETURN_TYPE,
  TSDeclareFunction: ID__TYPE_PARAMETERS__PARAMS__RETURN_TYPE__BODY,
  TSEmptyBodyFunctionExpression: freeze(["id", "typeParameters", "params", "returnType"]),
  TSEnumBody: MEMBERS,
  TSEnumDeclaration: ID__BODY,
  TSEnumMember: freeze(["id", "initializer"]),
  TSExportAssignment: EXPRESSION,
  TSExternalModuleReference: EXPRESSION,
  TSFunctionType: TYPE_PARAMETERS__PARAMS__RETURN_TYPE,
  TSImportEqualsDeclaration: freeze(["id", "moduleReference"]),
  TSImportType: freeze(["source", "options", "qualifier", "typeArguments"]),
  TSIndexSignature: freeze(["parameters", "typeAnnotation"]),
  TSIndexedAccessType: freeze(["objectType", "indexType"]),
  TSInferType: freeze(["typeParameter"]),
  TSInstantiationExpression: EXPRESSION__TYPE_ARGUMENTS,
  TSInterfaceBody: BODY,
  TSInterfaceDeclaration: freeze(["id", "typeParameters", "extends", "body"]),
  TSInterfaceHeritage: EXPRESSION__TYPE_ARGUMENTS,
  TSIntersectionType: TYPES,
  TSJSDocNonNullableType: TYPE_ANNOTATION,
  TSJSDocNullableType: TYPE_ANNOTATION,
  TSLiteralType: freeze(["literal"]),
  TSMappedType: freeze(["key", "constraint", "nameType", "typeAnnotation"]),
  TSMethodSignature: freeze(["key", "typeParameters", "params", "returnType"]),
  TSModuleBlock: BODY,
  TSModuleDeclaration: ID__BODY,
  TSNamedTupleMember: freeze(["label", "elementType"]),
  TSNamespaceExportDeclaration: freeze(["id"]),
  TSNonNullExpression: EXPRESSION,
  TSOptionalType: TYPE_ANNOTATION,
  TSParameterProperty: freeze(["decorators", "parameter"]),
  TSParenthesizedType: TYPE_ANNOTATION,
  TSPropertySignature: freeze(["key", "typeAnnotation"]),
  TSQualifiedName: LEFT__RIGHT,
  TSRestType: TYPE_ANNOTATION,
  TSSatisfiesExpression: EXPRESSION__TYPE_ANNOTATION,
  TSTemplateLiteralType: freeze(["quasis", "types"]),
  TSTupleType: freeze(["elementTypes"]),
  TSTypeAliasDeclaration: freeze(["id", "typeParameters", "typeAnnotation"]),
  TSTypeAnnotation: TYPE_ANNOTATION,
  TSTypeAssertion: freeze(["typeAnnotation", "expression"]),
  TSTypeLiteral: MEMBERS,
  TSTypeOperator: TYPE_ANNOTATION,
  TSTypeParameter: freeze(["name", "constraint", "default"]),
  TSTypeParameterDeclaration: PARAMS,
  TSTypeParameterInstantiation: PARAMS,
  TSTypePredicate: freeze(["parameterName", "typeAnnotation"]),
  TSTypeQuery: freeze(["exprName", "typeArguments"]),
  TSTypeReference: freeze(["typeName", "typeArguments"]),
  TSUnionType: TYPES
});

// www/node_modules/oxc-parser/src-js/index.js
var require4 = createRequire3(import.meta.url);
var parseSyncRaw = null;
var parseRaw2;
var parseSyncLazy = null;
var parseLazy;
var LazyVisitor;
function loadRawTransfer() {
  if (parseSyncRaw === null) {
    ({ parseSyncRaw, parse: parseRaw2 } = require4("./raw-transfer/eager.js"));
  }
}
function loadRawTransferLazy() {
  if (parseSyncLazy === null) {
    ({ parseSyncLazy, parse: parseLazy, Visitor: LazyVisitor } = require4("./raw-transfer/lazy.js"));
  }
}
function parseSync2(filename, sourceText, options) {
  if (options?.experimentalRawTransfer) {
    loadRawTransfer();
    return parseSyncRaw(filename, sourceText, options);
  }
  if (options?.experimentalLazy) {
    loadRawTransferLazy();
    return parseSyncLazy(filename, sourceText, options);
  }
  return wrap(parseSync(filename, sourceText, options));
}

// www/node_modules/oxc-transform/index.js
import { createRequire as createRequire4 } from "node:module";
var require5 = createRequire4(import.meta.url);
var __dirname3 = new URL(".", import.meta.url).pathname;
var { readFileSync: readFileSync3 } = require5("node:fs");
var nativeBinding3 = null;
var loadErrors3 = [];
var isMusl3 = () => {
  let musl = false;
  if (process.platform === "linux") {
    musl = isMuslFromFilesystem3();
    if (musl === null) {
      musl = isMuslFromReport3();
    }
    if (musl === null) {
      musl = isMuslFromChildProcess3();
    }
  }
  return musl;
};
var isFileMusl3 = (f2) => f2.includes("libc.musl-") || f2.includes("ld-musl-");
var isMuslFromFilesystem3 = () => {
  try {
    return readFileSync3("/usr/bin/ldd", "utf-8").includes("musl");
  } catch {
    return null;
  }
};
var isMuslFromReport3 = () => {
  let report = null;
  if (typeof process.report?.getReport === "function") {
    process.report.excludeNetwork = true;
    report = process.report.getReport();
  }
  if (!report) {
    return null;
  }
  if (report.header && report.header.glibcVersionRuntime) {
    return false;
  }
  if (Array.isArray(report.sharedObjects)) {
    if (report.sharedObjects.some(isFileMusl3)) {
      return true;
    }
  }
  return false;
};
var isMuslFromChildProcess3 = () => {
  try {
    return require5("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
  } catch (e) {
    return false;
  }
};
function requireNative3() {
  if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) {
    try {
      return require5(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
    } catch (err) {
      loadErrors3.push(err);
    }
  } else if (process.platform === "android") {
    if (process.arch === "arm64") {
      try {
        return require5("./transform.android-arm64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-android-arm64");
        const bindingPackageVersion = require5("@oxc-transform/binding-android-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "arm") {
      try {
        return require5("./transform.android-arm-eabi.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-android-arm-eabi");
        const bindingPackageVersion = require5("@oxc-transform/binding-android-arm-eabi/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else {
      loadErrors3.push(new Error(`Unsupported architecture on Android ${process.arch}`));
    }
  } else if (process.platform === "win32") {
    if (process.arch === "x64") {
      if (process.config?.variables?.shlib_suffix === "dll.a" || process.config?.variables?.node_target_type === "shared_library") {
        try {
          return require5("./transform.win32-x64-gnu.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-win32-x64-gnu");
          const bindingPackageVersion = require5("@oxc-transform/binding-win32-x64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      } else {
        try {
          return require5("./transform.win32-x64-msvc.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-win32-x64-msvc");
          const bindingPackageVersion = require5("@oxc-transform/binding-win32-x64-msvc/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      }
    } else if (process.arch === "ia32") {
      try {
        return require5("./transform.win32-ia32-msvc.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-win32-ia32-msvc");
        const bindingPackageVersion = require5("@oxc-transform/binding-win32-ia32-msvc/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require5("./transform.win32-arm64-msvc.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-win32-arm64-msvc");
        const bindingPackageVersion = require5("@oxc-transform/binding-win32-arm64-msvc/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else {
      loadErrors3.push(new Error(`Unsupported architecture on Windows: ${process.arch}`));
    }
  } else if (process.platform === "darwin") {
    try {
      return require5("./transform.darwin-universal.node");
    } catch (e) {
      loadErrors3.push(e);
    }
    try {
      const binding = require5("@oxc-transform/binding-darwin-universal");
      const bindingPackageVersion = require5("@oxc-transform/binding-darwin-universal/package.json").version;
      if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
        throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
      }
      return binding;
    } catch (e) {
      loadErrors3.push(e);
    }
    if (process.arch === "x64") {
      try {
        return require5("./transform.darwin-x64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-darwin-x64");
        const bindingPackageVersion = require5("@oxc-transform/binding-darwin-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require5("./transform.darwin-arm64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-darwin-arm64");
        const bindingPackageVersion = require5("@oxc-transform/binding-darwin-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else {
      loadErrors3.push(new Error(`Unsupported architecture on macOS: ${process.arch}`));
    }
  } else if (process.platform === "freebsd") {
    if (process.arch === "x64") {
      try {
        return require5("./transform.freebsd-x64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-freebsd-x64");
        const bindingPackageVersion = require5("@oxc-transform/binding-freebsd-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "arm64") {
      try {
        return require5("./transform.freebsd-arm64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-freebsd-arm64");
        const bindingPackageVersion = require5("@oxc-transform/binding-freebsd-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else {
      loadErrors3.push(new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
    }
  } else if (process.platform === "linux") {
    if (process.arch === "x64") {
      if (isMusl3()) {
        try {
          return require5("./transform.linux-x64-musl.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-x64-musl");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-x64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      } else {
        try {
          return require5("./transform.linux-x64-gnu.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-x64-gnu");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-x64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      }
    } else if (process.arch === "arm64") {
      if (isMusl3()) {
        try {
          return require5("./transform.linux-arm64-musl.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-arm64-musl");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-arm64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      } else {
        try {
          return require5("./transform.linux-arm64-gnu.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-arm64-gnu");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-arm64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      }
    } else if (process.arch === "arm") {
      if (isMusl3()) {
        try {
          return require5("./transform.linux-arm-musleabihf.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-arm-musleabihf");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-arm-musleabihf/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      } else {
        try {
          return require5("./transform.linux-arm-gnueabihf.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-arm-gnueabihf");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-arm-gnueabihf/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      }
    } else if (process.arch === "loong64") {
      if (isMusl3()) {
        try {
          return require5("./transform.linux-loong64-musl.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-loong64-musl");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-loong64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      } else {
        try {
          return require5("./transform.linux-loong64-gnu.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-loong64-gnu");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-loong64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      }
    } else if (process.arch === "riscv64") {
      if (isMusl3()) {
        try {
          return require5("./transform.linux-riscv64-musl.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-riscv64-musl");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-riscv64-musl/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      } else {
        try {
          return require5("./transform.linux-riscv64-gnu.node");
        } catch (e) {
          loadErrors3.push(e);
        }
        try {
          const binding = require5("@oxc-transform/binding-linux-riscv64-gnu");
          const bindingPackageVersion = require5("@oxc-transform/binding-linux-riscv64-gnu/package.json").version;
          if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
            throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
          }
          return binding;
        } catch (e) {
          loadErrors3.push(e);
        }
      }
    } else if (process.arch === "ppc64") {
      try {
        return require5("./transform.linux-ppc64-gnu.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-linux-ppc64-gnu");
        const bindingPackageVersion = require5("@oxc-transform/binding-linux-ppc64-gnu/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "s390x") {
      try {
        return require5("./transform.linux-s390x-gnu.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-linux-s390x-gnu");
        const bindingPackageVersion = require5("@oxc-transform/binding-linux-s390x-gnu/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else {
      loadErrors3.push(new Error(`Unsupported architecture on Linux: ${process.arch}`));
    }
  } else if (process.platform === "openharmony") {
    if (process.arch === "arm64") {
      try {
        return require5("./transform.openharmony-arm64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-openharmony-arm64");
        const bindingPackageVersion = require5("@oxc-transform/binding-openharmony-arm64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "x64") {
      try {
        return require5("./transform.openharmony-x64.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-openharmony-x64");
        const bindingPackageVersion = require5("@oxc-transform/binding-openharmony-x64/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else if (process.arch === "arm") {
      try {
        return require5("./transform.openharmony-arm.node");
      } catch (e) {
        loadErrors3.push(e);
      }
      try {
        const binding = require5("@oxc-transform/binding-openharmony-arm");
        const bindingPackageVersion = require5("@oxc-transform/binding-openharmony-arm/package.json").version;
        if (bindingPackageVersion !== "0.121.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
          throw new Error(`Native binding package version mismatch, expected 0.121.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
        }
        return binding;
      } catch (e) {
        loadErrors3.push(e);
      }
    } else {
      loadErrors3.push(new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
    }
  } else {
    loadErrors3.push(new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
  }
}
nativeBinding3 = requireNative3();
if (!nativeBinding3 || process.env.NAPI_RS_FORCE_WASI) {
  let wasiBinding = null;
  let wasiBindingError = null;
  try {
    wasiBinding = require5("./transform.wasi.cjs");
    nativeBinding3 = wasiBinding;
  } catch (err) {
    if (process.env.NAPI_RS_FORCE_WASI) {
      wasiBindingError = err;
    }
  }
  if (!nativeBinding3 || process.env.NAPI_RS_FORCE_WASI) {
    try {
      wasiBinding = require5("@oxc-transform/binding-wasm32-wasi");
      nativeBinding3 = wasiBinding;
    } catch (err) {
      if (process.env.NAPI_RS_FORCE_WASI) {
        if (!wasiBindingError) {
          wasiBindingError = err;
        } else {
          wasiBindingError.cause = err;
        }
        loadErrors3.push(err);
      }
    }
  }
  if (process.env.NAPI_RS_FORCE_WASI === "error" && !wasiBinding) {
    const error2 = new Error("WASI binding not found and NAPI_RS_FORCE_WASI is set to error");
    error2.cause = wasiBindingError;
    throw error2;
  }
}
if (!nativeBinding3 && globalThis.process?.versions?.["webcontainer"]) {
  try {
    nativeBinding3 = require5("./webcontainer-fallback.cjs");
  } catch (err) {
    loadErrors3.push(err);
  }
}
if (!nativeBinding3) {
  if (loadErrors3.length > 0) {
    throw new Error(
      `Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try \`npm i\` again after removing both package-lock.json and node_modules directory.`,
      {
        cause: loadErrors3.reduce((err, cur) => {
          cur.cause = err;
          return cur;
        })
      }
    );
  }
  throw new Error(`Failed to load native binding`);
}
var { Severity: Severity3, HelperMode, isolatedDeclaration, isolatedDeclarationSync, moduleRunnerTransform, moduleRunnerTransformSync, transform, transformSync } = nativeBinding3;

// www/node_modules/es-module-lexer/dist/lexer.js
var ImportType;
!(function(A4) {
  A4[A4.Static = 1] = "Static", A4[A4.Dynamic = 2] = "Dynamic", A4[A4.ImportMeta = 3] = "ImportMeta", A4[A4.StaticSourcePhase = 4] = "StaticSourcePhase", A4[A4.DynamicSourcePhase = 5] = "DynamicSourcePhase", A4[A4.StaticDeferPhase = 6] = "StaticDeferPhase", A4[A4.DynamicDeferPhase = 7] = "DynamicDeferPhase";
})(ImportType || (ImportType = {}));
var A2 = 1 === new Uint8Array(new Uint16Array([1]).buffer)[0];
function parse3(E4, g = "@") {
  if (!C2) return init.then((() => parse3(E4)));
  const I2 = E4.length + 1, o = (C2.__heap_base.value || C2.__heap_base) + 4 * I2 - C2.memory.buffer.byteLength;
  o > 0 && C2.memory.grow(Math.ceil(o / 65536));
  const D = C2.sa(I2 - 1);
  if ((A2 ? B : Q2)(E4, new Uint16Array(C2.memory.buffer, D, I2)), !C2.parse()) throw Object.assign(new Error(`Parse error ${g}:${E4.slice(0, C2.e()).split("\n").length}:${C2.e() - E4.lastIndexOf("\n", C2.e() - 1)}`), { idx: C2.e() });
  const K2 = [], k = [];
  for (; C2.ri(); ) {
    const A4 = C2.is(), Q3 = C2.ie(), B2 = C2.it(), g2 = C2.ai(), I3 = C2.id(), o2 = C2.ss(), D2 = C2.se();
    let k2;
    C2.ip() && (k2 = w2(E4.slice(-1 === I3 ? A4 - 1 : A4, -1 === I3 ? Q3 + 1 : Q3)));
    const i = [];
    for (C2.rsa(); C2.ra(); ) {
      const A5 = C2.aks(), Q4 = C2.ake(), B3 = C2.avs(), g3 = C2.ave();
      i.push([N2(E4.slice(A5, Q4)), N2(E4.slice(B3, g3))]);
    }
    K2.push({ n: k2, t: B2, s: A4, e: Q3, ss: o2, se: D2, d: I3, a: g2, at: i.length > 0 ? i : null });
  }
  for (; C2.re(); ) {
    const A4 = C2.es(), Q3 = C2.ee(), B2 = C2.els(), g2 = C2.ele(), I3 = N2(E4.slice(A4, Q3)), o2 = B2 < 0 ? void 0 : N2(E4.slice(B2, g2));
    k.push({ s: A4, e: Q3, ls: B2, le: g2, n: I3, ln: o2 });
  }
  function w2(A4) {
    try {
      return (0, eval)(A4);
    } catch (A5) {
    }
  }
  function N2(A4) {
    if (!A4) return A4;
    const Q3 = A4[0];
    return ('"' === Q3 || "'" === Q3) && w2(A4) || A4;
  }
  return [K2, k, !!C2.f(), !!C2.ms()];
}
function Q2(A4, Q3) {
  const B2 = A4.length;
  let C3 = 0;
  for (; C3 < B2; ) {
    const B3 = A4.charCodeAt(C3);
    Q3[C3++] = (255 & B3) << 8 | B3 >>> 8;
  }
}
function B(A4, Q3) {
  const B2 = A4.length;
  let C3 = 0;
  for (; C3 < B2; ) Q3[C3] = A4.charCodeAt(C3++);
}
var C2;
var E3 = () => {
  return A4 = "AGFzbQEAAAABKwhgAX8Bf2AEf39/fwBgAAF/YAAAYAF/AGADf39/AX9gAn9/AX9gA39/fwADODcAAQECAgICAgICAgICAgICAgICAgICAgICAwIAAwMDBAAEAAAABQAAAAAAAwMDAAAGAAcABgIFBAUBcAEBAQUDAQABBg8CfwFBsPIAC38AQbDyAAsHnQEbBm1lbW9yeQIAAnNhAAABZQADAmlzAAQCaWUABQJzcwAGAnNlAAcCaXQACAJhaQAJAmlkAAoCaXAACwJlcwAMAmVlAA0DZWxzAA4DZWxlAA8CcmkAEAJyZQARAWYAEgJtcwATAnJhABQDYWtzABUDYWtlABYDYXZzABcDYXZlABgDcnNhABkFcGFyc2UAGgtfX2hlYXBfYmFzZQMBCrxJN2gBAX9BACAANgL0CUEAKALQCSIBIABBAXRqIgBBADsBAEEAIABBAmoiADYC+AlBACAANgL8CUEAQQA2AtQJQQBBADYC5AlBAEEANgLcCUEAQQA2AtgJQQBBADYC7AlBAEEANgLgCSABC9MBAQN/QQAoAuQJIQRBAEEAKAL8CSIFNgLkCUEAIAQ2AugJQQAgBUEoajYC/AkgBEEkakHUCSAEGyAFNgIAQQAoAsgJIQRBACgCxAkhBiAFIAE2AgAgBSAANgIIIAUgAiACQQJqQQAgBiADRiIAGyAEIANGIgQbNgIMIAUgAzYCFCAFQQA2AhAgBSACNgIEIAVCADcCICAFQQNBAUECIAAbIAQbNgIcIAVBACgCxAkgA0YiAjoAGAJAAkAgAg0AQQAoAsgJIANHDQELQQBBAToAgAoLC14BAX9BACgC7AkiBEEQakHYCSAEG0EAKAL8CSIENgIAQQAgBDYC7AlBACAEQRRqNgL8CUEAQQE6AIAKIARBADYCECAEIAM2AgwgBCACNgIIIAQgATYCBCAEIAA2AgALCABBACgChAoLFQBBACgC3AkoAgBBACgC0AlrQQF1Cx4BAX9BACgC3AkoAgQiAEEAKALQCWtBAXVBfyAAGwsVAEEAKALcCSgCCEEAKALQCWtBAXULHgEBf0EAKALcCSgCDCIAQQAoAtAJa0EBdUF/IAAbCwsAQQAoAtwJKAIcCx4BAX9BACgC3AkoAhAiAEEAKALQCWtBAXVBfyAAGws7AQF/AkBBACgC3AkoAhQiAEEAKALECUcNAEF/DwsCQCAAQQAoAsgJRw0AQX4PCyAAQQAoAtAJa0EBdQsLAEEAKALcCS0AGAsVAEEAKALgCSgCAEEAKALQCWtBAXULFQBBACgC4AkoAgRBACgC0AlrQQF1Cx4BAX9BACgC4AkoAggiAEEAKALQCWtBAXVBfyAAGwseAQF/QQAoAuAJKAIMIgBBACgC0AlrQQF1QX8gABsLJQEBf0EAQQAoAtwJIgBBJGpB1AkgABsoAgAiADYC3AkgAEEARwslAQF/QQBBACgC4AkiAEEQakHYCSAAGygCACIANgLgCSAAQQBHCwgAQQAtAIgKCwgAQQAtAIAKCysBAX9BAEEAKAKMCiIAQRBqQQAoAtwJQSBqIAAbKAIAIgA2AowKIABBAEcLFQBBACgCjAooAgBBACgC0AlrQQF1CxUAQQAoAowKKAIEQQAoAtAJa0EBdQsVAEEAKAKMCigCCEEAKALQCWtBAXULFQBBACgCjAooAgxBACgC0AlrQQF1CwoAQQBBADYCjAoLuw8BBX8jAEGA0ABrIgAkAEEAQQE6AIgKQQBBACgCzAk2ApQKQQBBACgC0AlBfmoiATYCqApBACABQQAoAvQJQQF0aiICNgKsCkEAQQA6AIAKQQBBADsBkApBAEEAOwGSCkEAQQA6AJgKQQBBADYChApBAEEAOgDwCUEAIABBgBBqNgKcCkEAIAA2AqAKQQBBADoApAoCQAJAAkACQANAQQAgAUECaiIDNgKoCiABIAJPDQECQCADLwEAIgJBd2pBBUkNAAJAAkACQAJAAkAgAkGbf2oOBQEICAgCAAsgAkEgRg0EIAJBL0YNAyACQTtGDQIMBwtBAC8BkgoNASADEBtFDQEgAUEEakGCCEEKEDYNARAcQQAtAIgKDQFBAEEAKAKoCiIBNgKUCgwHCyADEBtFDQAgAUEEakGMCEEKEDYNABAdC0EAQQAoAqgKNgKUCgwBCwJAIAEvAQQiA0EqRg0AIANBL0cNBBAeDAELQQEQHwtBACgCrAohAkEAKAKoCiEBDAALC0EAIQIgAyEBQQAtAPAJDQIMAQtBACABNgKoCkEAQQA6AIgKCwNAQQAgAUECaiIDNgKoCgJAAkACQAJAAkACQAJAIAFBACgCrApPDQACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCADLwEAIgJBYGoOEBMSCRISEhIIAQUSEgQSEgoACwJAAkACQAJAIAJBpX9qDg8FFQYVFQ4VFQMVARUVFQIACyACQXdqQQVJDRUgAkGFf2oOAwgUCRQLQQAvAZIKDRMgAxAbRQ0TIAFBBGpBgghBChA2DRMQHAwTCyADEBtFDRIgAUEEakGMCEEKEDYNEhAdDBILIAMQG0UNESABKQAEQuyAhIOwjsA5Ug0RIAEvAQwiA0F3aiIBQRdLDQ9BASABdEGfgIAEcUUNDwwQC0EAQQAvAZIKIgFBAWo7AZIKQQAoApwKIAFBA3RqIgFBATYCACABQQAoApQKNgIEDBALQQBBAC8BkgoiAUEBajsBkgpBACgCnAogAUEDdGoiAUEINgIAIAFBACgClAo2AgQMDwtBAC8BkgoiAUUNC0EAIAFBf2o7AZIKDA4LQQAvAZAKIgNFDQ1BAC8BkgoiAkUNDSACQQN0QQAoApwKakF4aigCAEEFRw0NIANBAnRBACgCoApqQXxqKAIAIgMoAgQNDUEAIAFBBGo2AqgKIANBACgClApBAmo2AgRBARAgGiADQQAoAqgKIgE2AhBBACABQX5qNgKoCgwNC0EALwGSCiIDRQ0JQQAgA0F/aiIDOwGSCkEALwGQCiICRQ0MQQAoApwKIANB//8DcUEDdGooAgBBBUcNDAJAIAJBAnRBACgCoApqQXxqKAIAIgMoAgQNACADQQAoApQKQQJqNgIEC0EAIAJBf2o7AZAKIAMgAUEEajYCDAwMCwJAQQAoApQKIgEvAQBBKUcNAEEAKALkCSIDRQ0AIAMoAgQgAUcNAEEAQQAoAugJIgM2AuQJAkAgA0UNACADQQA2AiQMAQtBAEEANgLUCQtBAEEALwGSCiIDQQFqOwGSCkEAKAKcCiADQQN0aiIDQQZBAkEALQCkChs2AgAgAyABNgIEQQBBADoApAoMCwtBAC8BkgoiAUUNB0EAIAFBf2oiATsBkgpBACgCnAogAUH//wNxQQN0aigCAEEERg0EDAoLQScQIQwJC0EiECEMCAsCQAJAIAEvAQQiAUEqRg0AIAFBL0cNARAeDAoLQQEQHwwJCwJAAkACQAJAQQAoApQKIgEvAQAiAxAiRQ0AAkACQCADQVVqDgQACQEDCQsgAUF+ai8BAEErRg0DDAgLIAFBfmovAQBBLUYNAgwHCyADQSlHDQFBACgCnApBAC8BkgoiAkEDdGooAgQQI0UNAgwGCyABQX5qLwEAQVBqQf//A3FBCk8NBQtBAC8BkgohAgsCQAJAIAJB//8DcSICRQ0AIANB5gBHDQBBACgCnAogAkF/akEDdGoiBCgCAEEBRw0AIAFBfmovAQBB7wBHDQEgAUF8ahAkRQ0BIAQoAgRBlghBAxAlRQ0BDAULIANB/QBHDQBBACgCnAogAkEDdGoiAigCBBAmDQQgAigCAEEGRg0ECyABECcNAyADRQ0DIANBL0ZBAC0AmApBAEdxDQMCQEEAKALsCSICRQ0AIAEgAigCAEkNACABIAIoAgRNDQQLIAFBfmohAUEAKALQCSECAkADQCABQQJqIgQgAk0NAUEAIAE2ApQKIAEvAQAhAyABQX5qIgQhASADEChFDQALIARBAmohBAsCQCADQf//A3EQKUUNACAEQX5qIQECQANAIAFBAmoiAyACTQ0BQQAgATYClAogAS8BACEDIAFBfmoiBCEBIAMQKQ0ACyAEQQJqIQMLIAMQKg0EC0EAQQE6AJgKDAcLQQAoApwKQQAvAZIKIgFBA3QiA2pBACgClAo2AgRBACABQQFqOwGSCkEAKAKcCiADakEDNgIACxArDAULQQAtAPAJQQAvAZAKQQAvAZIKcnJFIQIMBwsQLEEAQQA6AJgKDAMLEC1BACECDAULIANBoAFHDQELQQBBAToApAoLQQBBACgCqAo2ApQKC0EAKAKoCiEBDAALCyAAQYDQAGokACACCxoAAkBBACgC0AkgAEcNAEEBDwsgAEF+ahAuC/4KAQZ/QQBBACgCqAoiAEEMaiIBNgKoCkEAKALsCSECQQEQICEDAkACQAJAAkACQAJAAkACQAJAQQAoAqgKIgQgAUcNACADEC9FDQELAkACQAJAAkACQAJAAkAgA0EqRg0AIANB+wBHDQFBACAEQQJqNgKoCkEBECAhA0EAKAKoCiEEA0ACQAJAIANB//8DcSIDQSJGDQAgA0EnRg0AIAMQMxpBACgCqAohAwwBCyADECFBAEEAKAKoCkECaiIDNgKoCgtBARAgGgJAIAQgAxA0IgNBLEcNAEEAQQAoAqgKQQJqNgKoCkEBECAhAwsgA0H9AEYNA0EAKAKoCiIFIARGDQ8gBSEEIAVBACgCrApNDQAMDwsLQQAgBEECajYCqApBARAgGkEAKAKoCiIDIAMQNBoMAgtBAEEAOgCICgJAAkACQAJAAkACQCADQZ9/ag4MAgsEAQsDCwsLCwsFAAsgA0H2AEYNBAwKC0EAIARBDmoiAzYCqAoCQAJAAkBBARAgQZ9/ag4GABICEhIBEgtBACgCqAoiBSkAAkLzgOSD4I3AMVINESAFLwEKEClFDRFBACAFQQpqNgKoCkEAECAaC0EAKAKoCiIFQQJqQbIIQQ4QNg0QIAUvARAiAkF3aiIBQRdLDQ1BASABdEGfgIAEcUUNDQwOC0EAKAKoCiIFKQACQuyAhIOwjsA5Ug0PIAUvAQoiAkF3aiIBQRdNDQYMCgtBACAEQQpqNgKoCkEAECAaQQAoAqgKIQQLQQAgBEEQajYCqAoCQEEBECAiBEEqRw0AQQBBACgCqApBAmo2AqgKQQEQICEEC0EAKAKoCiEDIAQQMxogA0EAKAKoCiIEIAMgBBACQQBBACgCqApBfmo2AqgKDwsCQCAEKQACQuyAhIOwjsA5Ug0AIAQvAQoQKEUNAEEAIARBCmo2AqgKQQEQICEEQQAoAqgKIQMgBBAzGiADQQAoAqgKIgQgAyAEEAJBAEEAKAKoCkF+ajYCqAoPC0EAIARBBGoiBDYCqAoLQQAgBEEGajYCqApBAEEAOgCICkEBECAhBEEAKAKoCiEDIAQQMyEEQQAoAqgKIQIgBEHf/wNxIgFB2wBHDQNBACACQQJqNgKoCkEBECAhBUEAKAKoCiEDQQAhBAwEC0EAQQE6AIAKQQBBACgCqApBAmo2AqgKC0EBECAhBEEAKAKoCiEDAkAgBEHmAEcNACADQQJqQawIQQYQNg0AQQAgA0EIajYCqAogAEEBECBBABAyIAJBEGpB2AkgAhshAwNAIAMoAgAiA0UNBSADQgA3AgggA0EQaiEDDAALC0EAIANBfmo2AqgKDAMLQQEgAXRBn4CABHFFDQMMBAtBASEECwNAAkACQCAEDgIAAQELIAVB//8DcRAzGkEBIQQMAQsCQAJAQQAoAqgKIgQgA0YNACADIAQgAyAEEAJBARAgIQQCQCABQdsARw0AIARBIHJB/QBGDQQLQQAoAqgKIQMCQCAEQSxHDQBBACADQQJqNgKoCkEBECAhBUEAKAKoCiEDIAVBIHJB+wBHDQILQQAgA0F+ajYCqAoLIAFB2wBHDQJBACACQX5qNgKoCg8LQQAhBAwACwsPCyACQaABRg0AIAJB+wBHDQQLQQAgBUEKajYCqApBARAgIgVB+wBGDQMMAgsCQCACQVhqDgMBAwEACyACQaABRw0CC0EAIAVBEGo2AqgKAkBBARAgIgVBKkcNAEEAQQAoAqgKQQJqNgKoCkEBECAhBQsgBUEoRg0BC0EAKAKoCiEBIAUQMxpBACgCqAoiBSABTQ0AIAQgAyABIAUQAkEAQQAoAqgKQX5qNgKoCg8LIAQgA0EAQQAQAkEAIARBDGo2AqgKDwsQLQuFDAEKf0EAQQAoAqgKIgBBDGoiATYCqApBARAgIQJBACgCqAohAwJAAkACQAJAAkACQAJAAkAgAkEuRw0AQQAgA0ECajYCqAoCQEEBECAiAkHkAEYNAAJAIAJB8wBGDQAgAkHtAEcNB0EAKAKoCiICQQJqQZwIQQYQNg0HAkBBACgClAoiAxAxDQAgAy8BAEEuRg0ICyAAIAAgAkEIakEAKALICRABDwtBACgCqAoiAkECakGiCEEKEDYNBgJAQQAoApQKIgMQMQ0AIAMvAQBBLkYNBwtBACEEQQAgAkEMajYCqApBASEFQQUhBkEBECAhAkEAIQdBASEIDAILQQAoAqgKIgIpAAJC5YCYg9CMgDlSDQUCQEEAKAKUCiIDEDENACADLwEAQS5GDQYLQQAhBEEAIAJBCmo2AqgKQQIhCEEHIQZBASEHQQEQICECQQEhBQwBCwJAAkACQAJAIAJB8wBHDQAgAyABTQ0AIANBAmpBoghBChA2DQACQCADLwEMIgRBd2oiB0EXSw0AQQEgB3RBn4CABHENAgsgBEGgAUYNAQtBACEHQQchBkEBIQQgAkHkAEYNAQwCC0EAIQRBACADQQxqIgI2AqgKQQEhBUEBECAhCQJAQQAoAqgKIgYgAkYNAEHmACECAkAgCUHmAEYNAEEFIQZBACEHQQEhCCAJIQIMBAtBACEHQQEhCCAGQQJqQawIQQYQNg0EIAYvAQgQKEUNBAtBACEHQQAgAzYCqApBByEGQQEhBEEAIQVBACEIIAkhAgwCCyADIABBCmpNDQBBACEIQeQAIQICQCADKQACQuWAmIPQjIA5Ug0AAkACQCADLwEKIgRBd2oiB0EXSw0AQQEgB3RBn4CABHENAQtBACEIIARBoAFHDQELQQAhBUEAIANBCmo2AqgKQSohAkEBIQdBAiEIQQEQICIJQSpGDQRBACADNgKoCkEBIQRBACEHQQAhCCAJIQIMAgsgAyEGQQAhBwwCC0EAIQVBACEICwJAIAJBKEcNAEEAKAKcCkEALwGSCiICQQN0aiIDQQAoAqgKNgIEQQAgAkEBajsBkgogA0EFNgIAQQAoApQKLwEAQS5GDQRBAEEAKAKoCiIDQQJqNgKoCkEBECAhAiAAQQAoAqgKQQAgAxABAkACQCAFDQBBACgC5AkhAQwBC0EAKALkCSIBIAY2AhwLQQBBAC8BkAoiA0EBajsBkApBACgCoAogA0ECdGogATYCAAJAIAJBIkYNACACQSdGDQBBAEEAKAKoCkF+ajYCqAoPCyACECFBAEEAKAKoCkECaiICNgKoCgJAAkACQEEBECBBV2oOBAECAgACC0EAQQAoAqgKQQJqNgKoCkEBECAaQQAoAuQJIgMgAjYCBCADQQE6ABggA0EAKAKoCiICNgIQQQAgAkF+ajYCqAoPC0EAKALkCSIDIAI2AgQgA0EBOgAYQQBBAC8BkgpBf2o7AZIKIANBACgCqApBAmo2AgxBAEEALwGQCkF/ajsBkAoPC0EAQQAoAqgKQX5qNgKoCg8LAkAgBEEBcyACQfsAR3INAEEAKAKoCiECQQAvAZIKDQUDQAJAAkACQCACQQAoAqwKTw0AQQEQICICQSJGDQEgAkEnRg0BIAJB/QBHDQJBAEEAKAKoCkECajYCqAoLQQEQICEDQQAoAqgKIQICQCADQeYARw0AIAJBAmpBrAhBBhA2DQcLQQAgAkEIajYCqAoCQEEBECAiAkEiRg0AIAJBJ0cNBwsgACACQQAQMg8LIAIQIQtBAEEAKAKoCkECaiICNgKoCgwACwsCQAJAIAJBWWoOBAMBAQMACyACQSJGDQILQQAoAqgKIQYLIAYgAUcNAEEAIABBCmo2AqgKDwsgAkEqRyAHcQ0DQQAvAZIKQf//A3ENA0EAKAKoCiECQQAoAqwKIQEDQCACIAFPDQECQAJAIAIvAQAiA0EnRg0AIANBIkcNAQsgACADIAgQMg8LQQAgAkECaiICNgKoCgwACwsQLQsPC0EAIAJBfmo2AqgKDwtBAEEAKAKoCkF+ajYCqAoLRwEDf0EAKAKoCkECaiEAQQAoAqwKIQECQANAIAAiAkF+aiABTw0BIAJBAmohACACLwEAQXZqDgQBAAABAAsLQQAgAjYCqAoLmAEBA39BAEEAKAKoCiIBQQJqNgKoCiABQQZqIQFBACgCrAohAgNAAkACQAJAIAFBfGogAk8NACABQX5qLwEAIQMCQAJAIAANACADQSpGDQEgA0F2ag4EAgQEAgQLIANBKkcNAwsgAS8BAEEvRw0CQQAgAUF+ajYCqAoMAQsgAUF+aiEBC0EAIAE2AqgKDwsgAUECaiEBDAALC5wBAQN/QQAoAqgKIQECQANAAkACQCABLwEAIgJBL0cNAAJAIAEvAQIiAUEqRg0AIAFBL0cNBBAeDAILIAAQHwwBCwJAAkAgAEUNACACQXdqIgFBF0sNAUEBIAF0QZ+AgARxRQ0BDAILIAIQKUUNAwwBCyACQaABRw0CC0EAQQAoAqgKIgNBAmoiATYCqAogA0EAKAKsCkkNAAsLIAILiAEBBH9BACgCqAohAUEAKAKsCiECAkACQANAIAEiA0ECaiEBIAMgAk8NASABLwEAIgQgAEYNAgJAIARB3ABGDQAgBEF2ag4EAgEBAgELIANBBGohASADLwEEQQ1HDQAgA0EGaiABIAMvAQZBCkYbIQEMAAsLQQAgATYCqAoQLQ8LQQAgATYCqAoLbAEBfwJAAkAgAEFfaiIBQQVLDQBBASABdEExcQ0BCyAAQUZqQf//A3FBBkkNACAAQSlHIABBWGpB//8DcUEHSXENAAJAIABBpX9qDgQBAAABAAsgAEH9AEcgAEGFf2pB//8DcUEESXEPC0EBCy4BAX9BASEBAkAgAEGcCUEFECUNACAAQZYIQQMQJQ0AIABBpglBAhAlIQELIAELygEBAn8CQAJAIAAvAQAiAUF3akEFSQ0AIAFBIEYNACABQSlGDQAgAUHdAEYNACABQaABRg0AQQAhAiABQf0ARw0BC0EAKALQCSECAkACQANAIAAvAQAhASAAIAJNDQECQCABQXdqQQVJDQAgAUEgRg0AIAFBoAFGDQACQCABQSlGDQAgAUHdAEYNACABQf0ARw0EC0EBDwsgAEF+aiEADAALC0EBIQIgAUEpRg0BIAFB3QBGDQEgAUH9AEYNAQsgARAvQQFzIQILIAILRgEDf0EAIQMCQCAAIAJBAXQiAmsiBEECaiIAQQAoAtAJIgVJDQAgACABIAIQNg0AAkAgACAFRw0AQQEPCyAEEC4hAwsgAwuDAQECf0EBIQECQAJAAkACQAJAAkAgAC8BACICQUVqDgQFBAQBAAsCQCACQZt/ag4EAwQEAgALIAJBKUYNBCACQfkARw0DIABBfmpBsglBBhAlDwsgAEF+ai8BAEE9Rg8LIABBfmpBqglBBBAlDwsgAEF+akG+CUEDECUPC0EAIQELIAELtAMBAn9BACEBAkACQAJAAkACQAJAAkACQAJAAkAgAC8BAEGcf2oOFAABAgkJCQkDCQkEBQkJBgkHCQkICQsCQAJAIABBfmovAQBBl39qDgQACgoBCgsgAEF8akHACEECECUPCyAAQXxqQcQIQQMQJQ8LAkACQAJAIABBfmovAQBBjX9qDgMAAQIKCwJAIABBfGovAQAiAkHhAEYNACACQewARw0KIABBempB5QAQMA8LIABBempB4wAQMA8LIABBfGpByghBBBAlDwsgAEF8akHSCEEGECUPCyAAQX5qLwEAQe8ARw0GIABBfGovAQBB5QBHDQYCQCAAQXpqLwEAIgJB8ABGDQAgAkHjAEcNByAAQXhqQd4IQQYQJQ8LIABBeGpB6ghBAhAlDwsgAEF+akHuCEEEECUPC0EBIQEgAEF+aiIAQekAEDANBCAAQfYIQQUQJQ8LIABBfmpB5AAQMA8LIABBfmpBgAlBBxAlDwsgAEF+akGOCUEEECUPCwJAIABBfmovAQAiAkHvAEYNACACQeUARw0BIABBfGpB7gAQMA8LIABBfGpBlglBAxAlIQELIAELNAEBf0EBIQECQCAAQXdqQf//A3FBBUkNACAAQYABckGgAUYNACAAQS5HIAAQL3EhAQsgAQswAQF/AkACQCAAQXdqIgFBF0sNAEEBIAF0QY2AgARxDQELIABBoAFGDQBBAA8LQQELTgECf0EAIQECQAJAIAAvAQAiAkHlAEYNACACQesARw0BIABBfmpB7ghBBBAlDwsgAEF+ai8BAEH1AEcNACAAQXxqQdIIQQYQJSEBCyABC94BAQR/QQAoAqgKIQBBACgCrAohAQJAAkACQANAIAAiAkECaiEAIAIgAU8NAQJAAkACQCAALwEAIgNBpH9qDgUCAwMDAQALIANBJEcNAiACLwEEQfsARw0CQQAgAkEEaiIANgKoCkEAQQAvAZIKIgJBAWo7AZIKQQAoApwKIAJBA3RqIgJBBDYCACACIAA2AgQPC0EAIAA2AqgKQQBBAC8BkgpBf2oiADsBkgpBACgCnAogAEH//wNxQQN0aigCAEEDRw0DDAQLIAJBBGohAAwACwtBACAANgKoCgsQLQsLcAECfwJAAkADQEEAQQAoAqgKIgBBAmoiATYCqAogAEEAKAKsCk8NAQJAAkACQCABLwEAIgFBpX9qDgIBAgALAkAgAUF2ag4EBAMDBAALIAFBL0cNAgwECxA1GgwBC0EAIABBBGo2AqgKDAALCxAtCws1AQF/QQBBAToA8AlBACgCqAohAEEAQQAoAqwKQQJqNgKoCkEAIABBACgC0AlrQQF1NgKECgtDAQJ/QQEhAQJAIAAvAQAiAkF3akH//wNxQQVJDQAgAkGAAXJBoAFGDQBBACEBIAIQL0UNACACQS5HIAAQMXIPCyABC2gBAn9BASEBAkACQCAAQV9qIgJBBUsNAEEBIAJ0QTFxDQELIABB+P8DcUEoRg0AIABBRmpB//8DcUEGSQ0AAkAgAEGlf2oiAkEDSw0AIAJBAUcNAQsgAEGFf2pB//8DcUEESSEBCyABCz0BAn9BACECAkBBACgC0AkiAyAASw0AIAAvAQAgAUcNAAJAIAMgAEcNAEEBDwsgAEF+ai8BABAoIQILIAILMQEBf0EAIQECQCAALwEAQS5HDQAgAEF+ai8BAEEuRw0AIABBfGovAQBBLkYhAQsgAQvbBAEFfwJAIAFBIkYNACABQSdGDQAQLQ8LQQAoAqgKIQMgARAhIAAgA0ECakEAKAKoCkEAKALECRABAkAgAkEBSA0AQQAoAuQJQQRBBiACQQFGGzYCHAtBAEEAKAKoCkECajYCqApBABAgIQJBACgCqAohAQJAAkAgAkH3AEcNACABLwECQekARw0AIAEvAQRB9ABHDQAgAS8BBkHoAEYNAQtBACABQX5qNgKoCg8LQQAgAUEIajYCqAoCQEEBECBB+wBGDQBBACABNgKoCg8LQQAoAqgKIgQhA0EAIQADQEEAIANBAmo2AqgKAkACQAJAAkBBARAgIgJBJ0cNAEEAKAKoCiEFQScQIUEAKAKoCkECaiEDDAELQQAoAqgKIQUgAkEiRw0BQSIQIUEAKAKoCkECaiEDC0EAIAM2AqgKQQEQICECDAELIAIQMyECQQAoAqgKIQMLAkAgAkE6Rg0AQQAgATYCqAoPC0EAQQAoAqgKQQJqNgKoCgJAQQEQICICQSJGDQAgAkEnRg0AQQAgATYCqAoPC0EAKAKoCiEGIAIQIUEAQQAoAvwJIgJBFGo2AvwJQQAoAqgKIQcgAiAFNgIAIAJBADYCECACIAY2AgggAiADNgIEIAIgB0ECajYCDEEAQQAoAqgKQQJqNgKoCiAAQRBqQQAoAuQJQSBqIAAbIAI2AgACQAJAQQEQICIAQSxGDQAgAEH9AEYNAUEAIAE2AqgKDwtBAEEAKAKoCkECaiIDNgKoCiACIQAMAQsLQQAoAuQJIgEgBDYCECABQQAoAqgKQQJqNgIMC20BAn8CQAJAA0ACQCAAQf//A3EiAUF3aiICQRdLDQBBASACdEGfgIAEcQ0CCyABQaABRg0BIAAhAiABEC8NAkEAIQJBAEEAKAKoCiIAQQJqNgKoCiAALwECIgANAAwCCwsgACECCyACQf//A3ELqwEBBH8CQAJAQQAoAqgKIgIvAQAiA0HhAEYNACABIQQgACEFDAELQQAgAkEEajYCqApBARAgIQJBACgCqAohBQJAAkAgAkEiRg0AIAJBJ0YNACACEDMaQQAoAqgKIQQMAQsgAhAhQQBBACgCqApBAmoiBDYCqAoLQQEQICEDQQAoAqgKIQILAkAgAiAFRg0AIAUgBEEAIAAgACABRiICG0EAIAEgAhsQAgsgAwtyAQR/QQAoAqgKIQBBACgCrAohAQJAAkADQCAAQQJqIQIgACABTw0BAkACQCACLwEAIgNBpH9qDgIBBAALIAIhACADQXZqDgQCAQECAQsgAEEEaiEADAALC0EAIAI2AqgKEC1BAA8LQQAgAjYCqApB3QALSQEDf0EAIQMCQCACRQ0AAkADQCAALQAAIgQgAS0AACIFRw0BIAFBAWohASAAQQFqIQAgAkF/aiICDQAMAgsLIAQgBWshAwsgAwsL4gECAEGACAvEAQAAeABwAG8AcgB0AG0AcABvAHIAdABmAG8AcgBlAHQAYQBvAHUAcgBjAGUAcgBvAG0AdQBuAGMAdABpAG8AbgB2AG8AeQBpAGUAZABlAGwAZQBjAG8AbgB0AGkAbgBpAG4AcwB0AGEAbgB0AHkAYgByAGUAYQByAGUAdAB1AHIAZABlAGIAdQBnAGcAZQBhAHcAYQBpAHQAaAByAHcAaABpAGwAZQBpAGYAYwBhAHQAYwBmAGkAbgBhAGwAbABlAGwAcwAAQcQJCxABAAAAAgAAAAAEAAAwOQAA", "undefined" != typeof Buffer ? Buffer.from(A4, "base64") : Uint8Array.from(atob(A4), ((A5) => A5.charCodeAt(0)));
  var A4;
};
var init = WebAssembly.compile(E3()).then(WebAssembly.instantiate).then((({ exports: A4 }) => {
  C2 = A4;
}));

// www/node_modules/@remix-run/assets/dist/lib/scripts/cjs-check.js
var suspiciousCommonJSPattern = /\brequire\s*(?:\(|\.|\[)|\bmodule\s*(?:\.\s*exports|\[\s*['"`]exports['"`]\s*\])|\bexports\s*(?:\.|=|\[)/;
function mayContainCommonJSModuleGlobals(source) {
  return suspiciousCommonJSPattern.test(source);
}
function isCommonJS(source) {
  try {
    let result = parseSync2("module.js", source, {
      lang: "js",
      sourceType: "module"
    });
    if (result.errors.length > 0) {
      return suspiciousCommonJSPattern.test(source);
    }
    return containsCommonJSModuleGlobals(result.program);
  } catch {
    return suspiciousCommonJSPattern.test(source);
  }
}
function containsCommonJSModuleGlobals(program) {
  let moduleScope = createScope(null, "module");
  let nodeScopes = /* @__PURE__ */ new WeakMap();
  nodeScopes.set(program, moduleScope);
  collectScopeBindings(program, moduleScope, nodeScopes);
  return walkForCommonJS(program, nodeScopes, moduleScope);
}
function walkForCommonJS(node, nodeScopes, currentScope, parent = null, key) {
  let nextScope = nodeScopes.get(node) ?? currentScope;
  switch (node.type) {
    case "ImportDeclaration":
      return false;
    case "VariableDeclarator":
      if (isAstNode(node.init) && walkForCommonJS(node.init, nodeScopes, nextScope, node, "init")) {
        return true;
      }
      return walkPatternForCommonJS(node.id, nodeScopes, nextScope);
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression":
      for (let param of getNodeArray(node.params)) {
        if (walkPatternForCommonJS(param, nodeScopes, nextScope))
          return true;
      }
      return isAstNode(node.body) ? walkForCommonJS(node.body, nodeScopes, nextScope, node, "body") : false;
    case "CatchClause":
      if (walkPatternForCommonJS(node.param, nodeScopes, nextScope))
        return true;
      return isAstNode(node.body) ? walkForCommonJS(node.body, nodeScopes, nextScope, node, "body") : false;
    case "Property":
      if (node.computed && isAstNode(node.key) && walkForCommonJS(node.key, nodeScopes, nextScope, node, "key")) {
        return true;
      }
      return isAstNode(node.value) ? walkForCommonJS(node.value, nodeScopes, nextScope, node, "value") : false;
    case "MemberExpression":
      if (isAstNode(node.object) && walkForCommonJS(node.object, nodeScopes, nextScope, node, "object")) {
        return true;
      }
      return !!node.computed && isAstNode(node.property) && walkForCommonJS(node.property, nodeScopes, nextScope, node, "property");
    case "ExportSpecifier":
      return isAstNode(node.local) ? walkForCommonJS(node.local, nodeScopes, nextScope, node, "local") : false;
    case "Identifier":
      if (!isIdentifier(node) || !isReferenceIdentifier(node, parent, key))
        return false;
      if (resolveBindingKind(node.name, nextScope) !== null)
        return false;
      return isCommonJSReference(node, parent, key);
  }
  for (let child of getChildNodes(node)) {
    if (walkForCommonJS(child.node, nodeScopes, nextScope, node, child.key)) {
      return true;
    }
  }
  return false;
}
function walkPatternForCommonJS(node, nodeScopes, currentScope) {
  if (!isAstNode(node))
    return false;
  switch (node.type) {
    case "Identifier":
      return false;
    case "AssignmentPattern":
      return walkPatternForCommonJS(node.left, nodeScopes, currentScope) || isAstNode(node.right) && walkForCommonJS(node.right, nodeScopes, currentScope);
    case "RestElement":
      return walkPatternForCommonJS(node.argument, nodeScopes, currentScope);
    case "ArrayPattern":
      return getNodeArray(node.elements).some((element) => walkPatternForCommonJS(element, nodeScopes, currentScope));
    case "ObjectPattern":
      return getNodeArray(node.properties).some((property) => {
        if (property.type === "Property") {
          return property.computed && isAstNode(property.key) && walkForCommonJS(property.key, nodeScopes, currentScope, property, "key") || walkPatternForCommonJS(property.value, nodeScopes, currentScope);
        }
        return walkPatternForCommonJS(property.argument, nodeScopes, currentScope);
      });
  }
  return false;
}
function collectScopeBindings(node, currentScope, nodeScopes) {
  switch (node.type) {
    case "Program":
      forEachChildNode(node, (child) => collectScopeBindings(child, currentScope, nodeScopes));
      return;
    case "ImportDeclaration":
      for (let specifier of getNodeArray(node.specifiers)) {
        if (isAstNode(specifier) && isIdentifier(specifier.local)) {
          currentScope.bindings.add(specifier.local.name);
        }
      }
      return;
    case "VariableDeclaration": {
      let targetScope = node.kind === "var" ? getFunctionScope(currentScope) : currentScope;
      for (let declaration of getNodeArray(node.declarations)) {
        collectPatternBindings(declaration.id, targetScope);
        if (isAstNode(declaration.init)) {
          collectScopeBindings(declaration.init, currentScope, nodeScopes);
        }
      }
      return;
    }
    case "FunctionDeclaration": {
      if (isIdentifier(node.id)) {
        currentScope.bindings.add(node.id.name);
      }
      let functionScope = createScope(currentScope, "function");
      nodeScopes.set(node, functionScope);
      if (isIdentifier(node.id)) {
        functionScope.bindings.add(node.id.name);
      }
      for (let param of getNodeArray(node.params)) {
        collectPatternBindings(param, functionScope);
        collectPatternScopeBindings(param, functionScope, nodeScopes);
      }
      if (isAstNode(node.body)) {
        collectScopeBindings(node.body, functionScope, nodeScopes);
      }
      return;
    }
    case "FunctionExpression":
    case "ArrowFunctionExpression": {
      let functionScope = createScope(currentScope, "function");
      nodeScopes.set(node, functionScope);
      if (node.type === "FunctionExpression" && isIdentifier(node.id)) {
        functionScope.bindings.add(node.id.name);
      }
      for (let param of getNodeArray(node.params)) {
        collectPatternBindings(param, functionScope);
        collectPatternScopeBindings(param, functionScope, nodeScopes);
      }
      if (isAstNode(node.body)) {
        collectScopeBindings(node.body, functionScope, nodeScopes);
      }
      return;
    }
    case "ClassDeclaration":
      if (isIdentifier(node.id)) {
        currentScope.bindings.add(node.id.name);
      }
      break;
    case "ClassExpression":
      if (isIdentifier(node.id)) {
        let classScope = createScope(currentScope, "block");
        classScope.bindings.add(node.id.name);
        nodeScopes.set(node, classScope);
        forEachChildNode(node, (child, key) => {
          if (key !== "id") {
            collectScopeBindings(child, classScope, nodeScopes);
          }
        });
        return;
      }
      break;
    case "BlockStatement":
    case "ForStatement":
    case "ForInStatement":
    case "ForOfStatement":
    case "SwitchStatement": {
      let blockScope = createScope(currentScope, "block");
      nodeScopes.set(node, blockScope);
      forEachChildNode(node, (child) => collectScopeBindings(child, blockScope, nodeScopes));
      return;
    }
    case "CatchClause": {
      let catchScope = createScope(currentScope, "block");
      nodeScopes.set(node, catchScope);
      collectPatternBindings(node.param, catchScope);
      collectPatternScopeBindings(node.param, catchScope, nodeScopes);
      if (isAstNode(node.body)) {
        collectScopeBindings(node.body, catchScope, nodeScopes);
      }
      return;
    }
  }
  forEachChildNode(node, (child) => collectScopeBindings(child, currentScope, nodeScopes));
}
function collectPatternBindings(node, scope) {
  if (!isAstNode(node))
    return;
  switch (node.type) {
    case "Identifier":
      if (isIdentifier(node)) {
        scope.bindings.add(node.name);
      }
      return;
    case "RestElement":
      collectPatternBindings(node.argument, scope);
      return;
    case "AssignmentPattern":
      collectPatternBindings(node.left, scope);
      return;
    case "ArrayPattern":
      for (let element of getNodeArray(node.elements)) {
        collectPatternBindings(element, scope);
      }
      return;
    case "ObjectPattern":
      for (let property of getNodeArray(node.properties)) {
        if (property.type === "Property") {
          collectPatternBindings(property.value, scope);
        } else {
          collectPatternBindings(property.argument, scope);
        }
      }
      return;
  }
}
function collectPatternScopeBindings(node, currentScope, nodeScopes) {
  if (!isAstNode(node))
    return;
  switch (node.type) {
    case "AssignmentPattern":
      collectPatternScopeBindings(node.left, currentScope, nodeScopes);
      if (isAstNode(node.right)) {
        collectScopeBindings(node.right, currentScope, nodeScopes);
      }
      return;
    case "ArrayPattern":
      for (let element of getNodeArray(node.elements)) {
        collectPatternScopeBindings(element, currentScope, nodeScopes);
      }
      return;
    case "ObjectPattern":
      for (let property of getNodeArray(node.properties)) {
        if (property.type === "Property") {
          if (property.computed && isAstNode(property.key)) {
            collectScopeBindings(property.key, currentScope, nodeScopes);
          }
          collectPatternScopeBindings(property.value, currentScope, nodeScopes);
        } else {
          collectPatternScopeBindings(property.argument, currentScope, nodeScopes);
        }
      }
      return;
    case "RestElement":
      collectPatternScopeBindings(node.argument, currentScope, nodeScopes);
      return;
  }
}
function isCommonJSReference(node, parent, key) {
  if (parent === null)
    return false;
  if (node.name === "require") {
    return parent.type === "CallExpression" && key === "callee" || parent.type === "MemberExpression" && key === "object";
  }
  if (node.name === "exports") {
    return parent.type === "AssignmentExpression" && key === "left" || parent.type === "MemberExpression" && key === "object";
  }
  return node.name === "module" && parent.type === "MemberExpression" && key === "object" && isMemberPropertyNamed(parent.property, "exports");
}
function resolveBindingKind(name, currentScope) {
  let scope = currentScope;
  while (scope !== null) {
    if (scope.bindings.has(name))
      return "local";
    scope = scope.parent;
  }
  return null;
}
function createScope(parent, kind) {
  return {
    bindings: /* @__PURE__ */ new Set(),
    kind,
    parent
  };
}
function getFunctionScope(scope) {
  let current = scope;
  while (current.kind === "block" && current.parent !== null) {
    current = current.parent;
  }
  return current;
}
function isReferenceIdentifier(node, parent, key) {
  if (parent === null)
    return false;
  if (parent.type === "ClassDeclaration" || parent.type === "ClassExpression") {
    return key !== "id";
  }
  if (parent.type === "Property" && key === "key" && !parent.computed) {
    return false;
  }
  if ((parent.type === "PropertyDefinition" || parent.type === "MethodDefinition") && key === "key" && !parent.computed) {
    return false;
  }
  if (parent.type === "MemberExpression" && key === "property" && !parent.computed) {
    return false;
  }
  if (parent.type === "MetaProperty")
    return false;
  if ((parent.type === "LabeledStatement" || parent.type === "BreakStatement" || parent.type === "ContinueStatement") && key === "label") {
    return false;
  }
  if (parent.type === "ExportSpecifier" && key === "exported")
    return false;
  return true;
}
function getChildNodes(node) {
  let children = [];
  forEachChildNode(node, (child, key) => {
    children.push({ key, node: child });
  });
  return children;
}
function forEachChildNode(node, callback) {
  for (let key of keys_default[node.type] ?? []) {
    let value = node[key];
    if (Array.isArray(value)) {
      for (let child of value) {
        if (isAstNode(child)) {
          callback(child, key);
        }
      }
      continue;
    }
    if (isAstNode(value)) {
      callback(value, key);
    }
  }
}
function getNodeArray(value) {
  return Array.isArray(value) ? value.filter(isAstNode) : [];
}
function isMemberPropertyNamed(node, name) {
  if (isIdentifier(node))
    return node.name === name;
  return isStaticStringValue(node, name);
}
function isStaticStringValue(node, value) {
  if (!isAstNode(node))
    return false;
  if (node.type === "Literal")
    return node.value === value;
  return node.type === "TemplateLiteral" && Array.isArray(node.expressions) && node.expressions.length === 0 && Array.isArray(node.quasis) && node.quasis.length === 1 && isAstNode(node.quasis[0]) && !!node.quasis[0].value && typeof node.quasis[0].value === "object" && "raw" in node.quasis[0].value && node.quasis[0].value.raw === value;
}
function isAstNode(node) {
  return !!node && typeof node === "object" && "type" in node && typeof node.type === "string";
}
function isIdentifier(node) {
  return isAstNode(node) && node.type === "Identifier" && typeof node.name === "string";
}

// www/node_modules/@remix-run/assets/dist/lib/scripts/transform.js
var scriptModuleTypes = [
  { extension: ".js", lang: "js" },
  { extension: ".jsx", lang: "jsx" },
  { extension: ".mjs", lang: "js" },
  { extension: ".mts", lang: "ts" },
  { extension: ".ts", lang: "ts" },
  { extension: ".tsx", lang: "tsx" }
];
var sourceLanguageByExtension = new Map(scriptModuleTypes.map(({ extension, lang }) => [extension, lang]));
var supportedTsconfigTransformCompilerOptions = {
  allowNamespaces: "allowNamespaces",
  emitDecoratorMetadata: "emitDecoratorMetadata",
  experimentalDecorators: "experimentalDecorators",
  jsx: "jsx",
  jsxFactory: "jsxFactory",
  jsxFragmentFactory: "jsxFragmentFactory",
  jsxImportSource: "jsxImportSource",
  useDefineForClassFields: "useDefineForClassFields"
};
function createTsconfigTransformOptionsResolver() {
  let fileSystemCache = /* @__PURE__ */ new Map();
  let transformOptionsByDirectory = /* @__PURE__ */ new Map();
  return {
    clear() {
      fileSystemCache = /* @__PURE__ */ new Map();
      transformOptionsByDirectory.clear();
    },
    getTransformOptions(filePath, isWatchIgnored) {
      let directory = path3.dirname(filePath);
      let cached = transformOptionsByDirectory.get(directory);
      if (cached)
        return cached;
      let tsconfig = en(directory, "tsconfig.json", fileSystemCache);
      if (!tsconfig) {
        let transformOptions2 = { trackedFiles: [] };
        transformOptionsByDirectory.set(directory, transformOptions2);
        return transformOptions2;
      }
      let tsconfigPath = findNearestTsconfigPath(directory);
      let transformOptions = {
        trackedFiles: tsconfigPath && !isWatchIgnored(tsconfigPath) ? [tsconfigPath] : [],
        tsconfigRaw: tsconfig.config
      };
      transformOptionsByDirectory.set(directory, transformOptions);
      return transformOptions;
    }
  };
}
async function transformModule(record, args) {
  let resolvedPath = args.resolveActualPath(record.identityPath);
  if (!resolvedPath) {
    return {
      ok: false,
      error: createAssetServerCompilationError(`File not found: ${record.identityPath}`, {
        code: "FILE_NOT_FOUND"
      }),
      tracking: {
        trackedFiles: args.isWatchIgnored(record.identityPath) ? [] : [record.identityPath]
      }
    };
  }
  let transformOptions = args.tsconfigTransformOptionsResolver.getTransformOptions(resolvedPath, args.isWatchIgnored);
  let trackedFiles = [
    ...args.isWatchIgnored(resolvedPath) ? [] : [resolvedPath],
    ...transformOptions.trackedFiles
  ];
  let sourceText;
  try {
    sourceText = await fsp.readFile(resolvedPath, "utf-8");
  } catch (error2) {
    if (isNoEntityError(error2)) {
      return {
        ok: false,
        error: createAssetServerCompilationError(`File not found: ${resolvedPath}`, {
          cause: error2,
          code: "FILE_NOT_FOUND"
        }),
        tracking: {
          trackedFiles
        }
      };
    }
    return {
      ok: false,
      error: toTransformFailedError(error2, resolvedPath),
      tracking: {
        trackedFiles
      }
    };
  }
  try {
    let analysis = await analyzeModuleSource(sourceText, resolvedPath, transformOptions, {
      define: args.define ?? void 0,
      minify: args.minify,
      sourceMaps: args.sourceMaps ?? void 0,
      target: args.target ?? void 0
    });
    analysis.unresolvedImports = analysis.unresolvedImports.filter((unresolved) => !args.externalSet.has(getDisplayImportSpecifier2(unresolved.specifier)));
    if (mayContainCommonJSModuleGlobals(sourceText) && isCommonJS(analysis.rawCode)) {
      throw createAssetServerCompilationError(`CommonJS module detected: ${resolvedPath}. This module uses CommonJS (require/module.exports) which is not supported. Please use an ESM-compatible module.`, {
        code: "COMMONJS_NOT_SUPPORTED"
      });
    }
    let stableUrlPathname = args.routes.toUrlPathname(record.identityPath);
    if (!stableUrlPathname) {
      throw createAssetServerCompilationError(`File ${record.identityPath} is outside all configured fileMap entries.`, {
        code: "FILE_OUTSIDE_FILE_MAP"
      });
    }
    let sourceMap = analysis.sourceMap ? rewriteSourceMapSources(analysis.sourceMap, resolvedPath, stableUrlPathname, args.sourceMapSourcePaths, sourceText) : null;
    return {
      ok: true,
      tracking: {
        trackedFiles
      },
      value: {
        fingerprint: args.buildId === null ? null : await generateFingerprint({
          buildId: args.buildId,
          content: sourceText
        }),
        identityPath: record.identityPath,
        importerDir: path3.dirname(resolvedPath),
        packageSpecifiers: analysis.unresolvedImports.filter((unresolved) => isPackageImportSpecifier(unresolved.specifier)).map((unresolved) => unresolved.specifier),
        rawCode: analysis.rawCode,
        resolvedPath,
        sourceMap,
        stableUrlPathname,
        trackedFiles,
        unresolvedImports: analysis.unresolvedImports
      }
    };
  } catch (error2) {
    return {
      ok: false,
      error: toTransformFailedError(error2, resolvedPath),
      tracking: {
        trackedFiles
      }
    };
  }
}
function findNearestTsconfigPath(directory) {
  let currentDirectory = directory;
  while (true) {
    let tsconfigPath = path3.join(currentDirectory, "tsconfig.json");
    if (fs4.existsSync(tsconfigPath)) {
      return normalizeFilePath(tsconfigPath);
    }
    let parentDirectory = path3.dirname(currentDirectory);
    if (parentDirectory === currentDirectory)
      return null;
    currentDirectory = parentDirectory;
  }
}
function isPackageImportSpecifier(specifier) {
  return !specifier.startsWith("./") && !specifier.startsWith("../") && !specifier.startsWith("/");
}
async function analyzeModuleSource(sourceText, resolvedPath, transformOptions, options) {
  let maskedSourceText = maskAuthoredInjectedPackageImports(sourceText, resolvedPath);
  let transformResult;
  try {
    transformResult = await transform(resolvedPath, maskedSourceText, getTransformOptions(resolvedPath, transformOptions, options));
    assertNoCompilerErrors(transformResult.errors, resolvedPath, "transform");
  } catch (error2) {
    if (isAssetServerCompilationError(error2))
      throw error2;
    throw createAssetServerCompilationError(`Failed to transform script ${resolvedPath}. ${formatUnknownError2(error2)}`, {
      cause: error2,
      code: "TRANSFORM_FAILED"
    });
  }
  let rawCode = transformResult.code.trimEnd();
  let sourceMap = stringifySourceMap(transformResult.map);
  if (options.minify) {
    let minifyResult = await minifyModule(rawCode, resolvedPath, options.target, options.sourceMaps);
    rawCode = minifyResult.code.trimEnd();
    let minifyMap = stringifySourceMap(minifyResult.map);
    sourceMap = minifyMap == null ? sourceMap : sourceMap == null ? minifyMap : composeSourceMaps(minifyMap, sourceMap);
  }
  return {
    rawCode,
    sourceMap,
    unresolvedImports: await getUnresolvedImportsFromLexer(rawCode)
  };
}
async function minifyModule(rawCode, resolvedPath, target, sourceMaps) {
  try {
    let result = await minify(resolvedPath, rawCode, {
      compress: target ? { target } : true,
      mangle: true,
      module: true,
      sourcemap: sourceMaps != null
    });
    assertNoCompilerErrors(result.errors, resolvedPath, "minify");
    return result;
  } catch (error2) {
    if (isAssetServerCompilationError(error2))
      throw error2;
    throw createAssetServerCompilationError(`Failed to minify script ${resolvedPath}. ${formatUnknownError2(error2)}`, {
      cause: error2,
      code: "TRANSFORM_FAILED"
    });
  }
}
function getTransformOptions(resolvedPath, transformOptions, options) {
  let compilerOptions = transformOptions.tsconfigRaw?.compilerOptions;
  let useDefineForClassFields = getBooleanOption(compilerOptions, supportedTsconfigTransformCompilerOptions.useDefineForClassFields);
  let jsxFactory = getStringOption(compilerOptions, supportedTsconfigTransformCompilerOptions.jsxFactory);
  let jsxFragmentFactory = getStringOption(compilerOptions, supportedTsconfigTransformCompilerOptions.jsxFragmentFactory);
  return {
    assumptions: useDefineForClassFields === false ? {
      setPublicClassFields: true
    } : void 0,
    decorator: getDecoratorOptions(compilerOptions),
    define: options.define,
    jsx: getJsxOptions(resolvedPath, compilerOptions),
    lang: getSourceLanguageForPath(resolvedPath),
    sourceType: "module",
    sourcemap: options.sourceMaps != null,
    target: options.target,
    typescript: {
      allowNamespaces: getBooleanOption(compilerOptions, supportedTsconfigTransformCompilerOptions.allowNamespaces),
      jsxPragma: jsxFactory,
      jsxPragmaFrag: jsxFragmentFactory,
      removeClassFieldsWithoutInitializer: useDefineForClassFields === false ? true : void 0
    }
  };
}
function getJsxOptions(resolvedPath, compilerOptions) {
  let language = getSourceLanguageForPath(resolvedPath);
  if (language !== "jsx" && language !== "tsx")
    return void 0;
  let jsx2 = getStringOption(compilerOptions, supportedTsconfigTransformCompilerOptions.jsx);
  let importSource = getStringOption(compilerOptions, supportedTsconfigTransformCompilerOptions.jsxImportSource);
  let pragma = getStringOption(compilerOptions, supportedTsconfigTransformCompilerOptions.jsxFactory);
  let pragmaFrag = getStringOption(compilerOptions, supportedTsconfigTransformCompilerOptions.jsxFragmentFactory);
  if (jsx2 === "preserve" || jsx2 === "react-native") {
    throw createAssetServerCompilationError(`Unsupported tsconfig compilerOptions.jsx = "${jsx2}" for ${resolvedPath}. Asset server must compile JSX to browser-runnable JavaScript.`, {
      code: "TRANSFORM_FAILED"
    });
  }
  if (jsx2 === "react-jsx" || jsx2 === "react-jsxdev") {
    return {
      development: jsx2 === "react-jsxdev",
      importSource,
      runtime: "automatic"
    };
  }
  return {
    pragma,
    pragmaFrag,
    runtime: "classic"
  };
}
function getDecoratorOptions(compilerOptions) {
  let legacy = getBooleanOption(compilerOptions, supportedTsconfigTransformCompilerOptions.experimentalDecorators);
  let emitDecoratorMetadata = getBooleanOption(compilerOptions, supportedTsconfigTransformCompilerOptions.emitDecoratorMetadata);
  if (legacy !== true && emitDecoratorMetadata !== true)
    return void 0;
  return {
    emitDecoratorMetadata,
    legacy
  };
}
function getBooleanOption(compilerOptions, key) {
  let value = compilerOptions?.[key];
  return typeof value === "boolean" ? value : void 0;
}
function getStringOption(compilerOptions, key) {
  let value = compilerOptions?.[key];
  return typeof value === "string" ? value : void 0;
}
function assertNoCompilerErrors(errors2, resolvedPath, operation) {
  if (!errors2 || errors2.length === 0)
    return;
  throw createAssetServerCompilationError(`Failed to ${operation} script ${resolvedPath}. ${errors2[0].message ?? "Unknown error"}`, {
    code: "TRANSFORM_FAILED"
  });
}
async function getUnresolvedImportsFromLexer(rawCode) {
  await init;
  let [imports] = parse3(rawCode);
  let unresolvedImports = [];
  for (let imported of imports) {
    let specifier = getStaticImportSpecifier(rawCode, imported);
    if (specifier == null || shouldSkipImportSpecifier(specifier))
      continue;
    unresolvedImports.push({
      specifier,
      start: imported.s,
      end: imported.e,
      quote: getImportQuote(rawCode, imported.s)
    });
  }
  return unresolvedImports;
}
function getDisplayImportSpecifier2(specifier) {
  return restoreAuthoredInjectedPackageSpecifier(specifier) ?? specifier;
}
function maskAuthoredInjectedPackageImports(sourceText, resolvedPath) {
  if (!mayContainInjectedPackageSpecifier(sourceText)) {
    return sourceText;
  }
  let parseResult = parseSync2(resolvedPath, sourceText, {
    lang: getSourceLanguageForPath(resolvedPath),
    sourceType: "module"
  });
  if (parseResult.errors.length > 0) {
    return sourceText;
  }
  let replacements = [];
  walkAst(parseResult.program, (node) => {
    if (node.type !== "ImportDeclaration" && node.type !== "ExportAllDeclaration" && node.type !== "ExportNamedDeclaration" && node.type !== "ImportExpression") {
      return;
    }
    let source = "source" in node ? node.source : null;
    if (!isStringLiteralNode(source))
      return;
    let maskedSpecifier = maskAuthoredInjectedPackageSpecifier(source.value);
    if (maskedSpecifier == null)
      return;
    replacements.push({
      end: source.end - 1,
      specifier: maskedSpecifier,
      start: source.start + 1
    });
  });
  if (replacements.length === 0)
    return sourceText;
  let rewrittenSource = new MagicString(sourceText);
  for (let replacement of replacements) {
    rewrittenSource.overwrite(replacement.start, replacement.end, replacement.specifier);
  }
  return rewrittenSource.toString();
}
function walkAst(node, visit) {
  visit(node);
  let keys = keys_default[node.type];
  if (!keys)
    return;
  let walkableNode = node;
  for (let key of keys) {
    let value = walkableNode[key];
    if (Array.isArray(value)) {
      for (let child of value) {
        if (isAstNode2(child)) {
          walkAst(child, visit);
        }
      }
      continue;
    }
    if (isAstNode2(value)) {
      walkAst(value, visit);
    }
  }
}
function isAstNode2(value) {
  return typeof value === "object" && value !== null && "type" in value;
}
function isStringLiteralNode(node) {
  return node?.type === "Literal" && typeof node.start === "number" && typeof node.end === "number" && typeof node.value === "string";
}
function getStaticImportSpecifier(source, imported) {
  if (imported.n != null) {
    return imported.n;
  }
  if (imported.d < 0) {
    return null;
  }
  let rawSpecifier = source.slice(imported.s, imported.e);
  if (!isStaticTemplateLiteral(rawSpecifier)) {
    return null;
  }
  return rawSpecifier.slice(1, -1);
}
function isStaticTemplateLiteral(specifier) {
  return specifier.startsWith("`") && specifier.endsWith("`") && !specifier.includes("${");
}
function shouldSkipImportSpecifier(specifier) {
  return specifier.startsWith("data:") || specifier.startsWith("http://") || specifier.startsWith("https://");
}
function getImportQuote(source, start) {
  let firstCharacter = source[start];
  if (firstCharacter === '"' || firstCharacter === "'" || firstCharacter === "`") {
    return firstCharacter;
  }
  return void 0;
}
function getSourceLanguageForPath(resolvedPath) {
  let extension = path3.extname(resolvedPath).toLowerCase();
  return sourceLanguageByExtension.get(extension) ?? "js";
}
function formatUnknownError2(error2) {
  return error2 instanceof Error ? error2.message : String(error2);
}
function toTransformFailedError(error2, resolvedPath) {
  if (isAssetServerCompilationError(error2))
    return error2;
  return createAssetServerCompilationError(`Failed to transform script ${resolvedPath}. ${formatUnknownError2(error2)}`, {
    cause: error2,
    code: "TRANSFORM_FAILED"
  });
}
function isNoEntityError(error2) {
  return error2 instanceof Error && "code" in error2 && error2.code === "ENOENT";
}

// www/node_modules/@remix-run/assets/dist/lib/scripts/compiler.js
import { ResolverFactory } from "oxc-resolver";
var supportedScriptExtensionSet2 = new Set(supportedScriptExtensions);
var preloadConcurrency = Math.max(1, Math.min(8, os.availableParallelism() - 1));
function createScriptCompiler(options) {
  let resolvedOptions = {
    ...options,
    externalSet: new Set(options.external),
    watchIgnoreMatchers: (options.watchIgnore ?? []).map((pattern) => createFileMatcher(pattern, options.rootDir))
  };
  let scriptStore = createModuleStore({
    onWatchDirectoriesChange: options.onWatchDirectoriesChange
  });
  let tsconfigTransformOptionsResolver = createTsconfigTransformOptionsResolver();
  let resolverFactory = new ResolverFactory({
    aliasFields: [["browser"]],
    conditionNames: ["browser", "import", "module", "default"],
    extensionAlias: resolverExtensionAlias,
    extensions: resolverExtensions,
    mainFields: ["browser", "module", "main"],
    tsconfig: "auto"
  });
  let resolveInFlightByCacheKey = /* @__PURE__ */ new Map();
  let emitInFlightByCacheKey = /* @__PURE__ */ new Map();
  let transformArgs = {
    buildId: resolvedOptions.buildId ?? null,
    define: resolvedOptions.define ?? null,
    externalSet: resolvedOptions.externalSet,
    isWatchIgnored,
    minify: resolvedOptions.minify,
    resolveActualPath,
    routes: resolvedOptions.routes,
    sourceMapSourcePaths: resolvedOptions.sourceMapSourcePaths,
    sourceMaps: resolvedOptions.sourceMaps ?? null,
    target: resolvedOptions.target ?? null,
    tsconfigTransformOptionsResolver
  };
  let resolveArgs = {
    isAllowed: resolvedOptions.isAllowed,
    isWatchIgnored,
    resolveModulePath,
    resolverFactory,
    routes: resolvedOptions.routes
  };
  return {
    async getScript(filePath, getOptions) {
      let resolvedModule = resolveServedScriptOrThrow(resolveInputFilePath(filePath));
      let record = scriptStore.get(resolvedModule.identityPath);
      let notModified = getNotModifiedScript(record, getOptions);
      if (notModified)
        return notModified;
      let emitted = await getOrCreateEmittedScript(record);
      return {
        script: toScriptCompileResult(emitted),
        type: "script"
      };
    },
    async getPreloadLayers(filePath) {
      let resolvedEntries = [];
      let seen = /* @__PURE__ */ new Set();
      for (let resolvedModule of (Array.isArray(filePath) ? filePath : [filePath]).map((nextPath) => resolveServedScriptOrThrow(resolveInputFilePath(nextPath)))) {
        if (seen.has(resolvedModule.identityPath))
          continue;
        seen.add(resolvedModule.identityPath);
        resolvedEntries.push(resolvedModule.identityPath);
      }
      let visited = new Set(resolvedEntries);
      let queue = [...resolvedEntries];
      let layers = [];
      while (queue.length > 0) {
        let frontier = queue;
        queue = [];
        let resolvedModules = await getOrCreateResolvedScripts(frontier.map((identityPath) => scriptStore.get(identityPath)));
        let layer = [];
        for (let resolvedModule of resolvedModules) {
          layer.push(getServedUrlForResolvedScript(resolvedModule));
          for (let dep of resolvedModule.deps) {
            if (visited.has(dep))
              continue;
            visited.add(dep);
            queue.push(dep);
          }
        }
        layers.push(layer);
      }
      return layers;
    },
    async getHref(filePath) {
      let resolvedModule = resolveServedScriptOrThrow(resolveInputFilePath(filePath));
      return getServedUrl(resolvedModule.identityPath);
    },
    async handleFileEvent(filePath, event) {
      let normalizedFilePath = normalizeFilePath(filePath);
      if (isWatchIgnored(normalizedFilePath))
        return;
      if (shouldClearResolverCacheForFileEvent(normalizedFilePath, event)) {
        resolverFactory.clearCache();
      }
      if (isTsconfigPath(normalizedFilePath)) {
        tsconfigTransformOptionsResolver.clear();
        scriptStore.invalidateAll();
        return;
      }
      if (isPackageJsonPath(normalizedFilePath)) {
        scriptStore.invalidateAll();
        return;
      }
      scriptStore.invalidateForFileEvent(normalizedFilePath, event);
    },
    parseRequestPathname(pathname) {
      let parsedPathname = parseServedPathname(pathname);
      let filePath = resolvedOptions.routes.resolveUrlPathname(parsedPathname.stablePathname);
      if (!filePath)
        return null;
      if (resolvedOptions.fingerprintAssets && parsedPathname.requestedFingerprint === null)
        return null;
      return {
        cacheControl: getFingerprintRequestCacheControl(parsedPathname.requestedFingerprint),
        filePath,
        isSourceMapRequest: parsedPathname.isSourceMapRequest,
        requestedFingerprint: parsedPathname.requestedFingerprint
      };
    }
  };
  function resolveInputFilePath(filePath) {
    if (filePath.startsWith("file://")) {
      return normalizeFilePath(fileURLToPath2(new URL(filePath)));
    }
    if (filePath.includes("://")) {
      throw new TypeError(`Expected a file path or file:// URL, received "${filePath}"`);
    }
    return resolveFilePath(resolvedOptions.rootDir, filePath);
  }
  function resolveServedScriptOrThrow(absolutePath) {
    let resolvedModule = resolveModulePath(absolutePath);
    if (!resolvedModule) {
      throw createAssetServerCompilationError(`File not found: ${absolutePath}`, {
        code: "FILE_NOT_FOUND"
      });
    }
    if (!resolvedOptions.isAllowed(resolvedModule.identityPath)) {
      throw createAssetServerCompilationError(`File is not allowed: ${resolvedModule.identityPath}`, {
        code: "FILE_NOT_ALLOWED"
      });
    }
    return resolvedModule;
  }
  function getNotModifiedScript(record, options2) {
    let current = getNotModifiedResult(record.emitted, options2);
    if (current)
      return current;
    if (!record.staleEmittedSnapshot || !isModuleSnapshotFresh(record.staleEmittedSnapshot)) {
      return null;
    }
    return getNotModifiedResult(record.staleEmitted, options2);
  }
  async function getOrCreateResolvedScripts(records) {
    return mapWithConcurrency(records, preloadConcurrency, (record) => getOrCreateResolvedScript(record));
  }
  async function getOrCreateResolvedScript(record) {
    if (record.resolved)
      return record.resolved;
    let cacheKey = getRecordCacheKey(record);
    let existing = resolveInFlightByCacheKey.get(cacheKey);
    if (existing)
      return existing;
    let promise = (async () => {
      let startedVersion = record.invalidationVersion;
      let transformedModule = await getOrCreateTransformedScript(record);
      if (resolvedOptions.watchMode && transformedModule.unresolvedImports.some((unresolved) => isBareImportSpecifier(unresolved.specifier))) {
        resolverFactory.clearCache();
      }
      let resolveModuleResult = await resolveModule(record, transformedModule, resolveArgs);
      if (!resolveModuleResult.ok) {
        if (isFresh(record, startedVersion)) {
          scriptStore.clearResolved(record.identityPath, [resolveModuleResult.tracking]);
        }
        throw resolveModuleResult.error;
      }
      if (isFresh(record, startedVersion)) {
        scriptStore.setResolved(record.identityPath, resolveModuleResult.value, [
          resolveModuleResult.tracking
        ]);
      }
      return resolveModuleResult.value;
    })();
    resolveInFlightByCacheKey.set(cacheKey, promise);
    try {
      return await promise;
    } finally {
      if (resolveInFlightByCacheKey.get(cacheKey) === promise) {
        resolveInFlightByCacheKey.delete(cacheKey);
      }
    }
  }
  async function getOrCreateTransformedScript(record) {
    if (record.transformed)
      return record.transformed;
    let startedVersion = record.invalidationVersion;
    let transformModuleResult = await transformModule(record, transformArgs);
    if (!transformModuleResult.ok) {
      if (isFresh(record, startedVersion)) {
        scriptStore.clearTransformed(record.identityPath, [transformModuleResult.tracking]);
      }
      throw transformModuleResult.error;
    }
    if (isFresh(record, startedVersion)) {
      scriptStore.setTransformed(record.identityPath, transformModuleResult.value, [
        transformModuleResult.tracking
      ]);
    }
    return transformModuleResult.value;
  }
  async function getOrCreateEmittedScript(record) {
    if (record.emitted)
      return record.emitted;
    let cacheKey = getRecordCacheKey(record);
    let existing = emitInFlightByCacheKey.get(cacheKey);
    if (existing)
      return existing;
    let promise = (async () => {
      let startedVersion = record.invalidationVersion;
      let resolvedModule = await getOrCreateResolvedScript(record);
      let emitResolvedModuleResult = await emitResolvedModule(resolvedModule, {
        getServedUrl,
        sourceMaps: resolvedOptions.sourceMaps
      });
      if (!emitResolvedModuleResult.ok) {
        throw emitResolvedModuleResult.error;
      }
      if (isFresh(record, startedVersion)) {
        scriptStore.setEmitted(record.identityPath, emitResolvedModuleResult.value, createModuleSnapshot(resolvedModule.trackedFiles));
      }
      return emitResolvedModuleResult.value;
    })();
    emitInFlightByCacheKey.set(cacheKey, promise);
    try {
      return await promise;
    } finally {
      if (emitInFlightByCacheKey.get(cacheKey) === promise) {
        emitInFlightByCacheKey.delete(cacheKey);
      }
    }
  }
  async function getServedUrl(identityPath) {
    return getServedUrlForResolvedScript(await getOrCreateResolvedScript(scriptStore.get(identityPath)));
  }
  function getServedUrlForResolvedScript(resolvedModule) {
    return formatFingerprintedPathname(resolvedModule.stableUrlPathname, resolvedOptions.fingerprintAssets ? resolvedModule.fingerprint : null);
  }
  function isWatchIgnored(filePath) {
    return resolvedOptions.watchIgnoreMatchers.some((matcher) => matcher(filePath));
  }
}
function getRecordCacheKey(record) {
  return `${record.identityPath}\0${record.invalidationVersion}`;
}
function isFresh(record, version) {
  return record.invalidationVersion === version;
}
function getNotModifiedResult(emittedModule, options) {
  if (!emittedModule || options.ifNoneMatch === null)
    return null;
  if (options.requestedFingerprint !== null && emittedModule.fingerprint !== options.requestedFingerprint) {
    return null;
  }
  let asset = getEmittedAssetForRequest(emittedModule, options.isSourceMapRequest);
  if (!asset)
    return null;
  if (!IfNoneMatch.from(options.ifNoneMatch).matches(asset.etag))
    return null;
  return { type: "not-modified", etag: asset.etag };
}
function getEmittedAssetForRequest(emittedModule, isSourceMapRequest) {
  return isSourceMapRequest ? emittedModule.sourceMap : emittedModule.code;
}
function createModuleSnapshot(filePaths) {
  let snapshot = /* @__PURE__ */ new Map();
  for (let filePath of filePaths) {
    let fileSnapshot = getFileSnapshot(filePath);
    if (!fileSnapshot)
      return null;
    snapshot.set(filePath, fileSnapshot);
  }
  return snapshot;
}
function isModuleSnapshotFresh(snapshot) {
  for (let [filePath, previous] of snapshot) {
    let current = getFileSnapshot(filePath);
    if (!current)
      return false;
    if (current.mtimeNs !== previous.mtimeNs || current.size !== previous.size)
      return false;
  }
  return true;
}
function getFileSnapshot(filePath) {
  try {
    let stats = fs5.statSync(filePath, { bigint: true });
    if (!stats.isFile())
      return null;
    return {
      mtimeNs: stats.mtimeNs,
      size: stats.size
    };
  } catch (error2) {
    if (isNoEntityError2(error2))
      return null;
    throw error2;
  }
}
function parseServedPathname(pathname) {
  let isSourceMapRequest = pathname.endsWith(".map");
  let pathWithoutMap = isSourceMapRequest ? pathname.slice(0, -4) : pathname;
  let fingerprint = parseFingerprintSuffix(pathWithoutMap);
  return {
    isSourceMapRequest,
    requestedFingerprint: fingerprint.requestedFingerprint,
    stablePathname: fingerprint.pathname
  };
}
async function mapWithConcurrency(items, concurrency, mapper) {
  if (items.length === 0)
    return [];
  let results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      let index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}
function toScriptCompileResult(emittedModule) {
  return {
    code: emittedModule.code,
    fingerprint: emittedModule.fingerprint,
    sourceMap: emittedModule.sourceMap
  };
}
function isPackageJsonPath(filePath) {
  return filePath.endsWith("/package.json");
}
function isTsconfigPath(filePath) {
  return /\/tsconfig(?:\..+)?\.json$/.test(filePath);
}
function shouldClearResolverCacheForFileEvent(filePath, event) {
  return event !== "change" || isPackageJsonPath(filePath) || isTsconfigPath(filePath);
}
function resolveModulePath(absolutePath) {
  let resolvedPath;
  try {
    resolvedPath = normalizeFilePath(fs5.realpathSync(normalizeFilePath(absolutePath)));
  } catch (error2) {
    if (isNoEntityError2(error2))
      return null;
    throw error2;
  }
  if (!supportedScriptExtensionSet2.has(path4.extname(resolvedPath).toLowerCase())) {
    return null;
  }
  return {
    identityPath: resolvedPath,
    resolvedPath
  };
}
function resolveActualPath(identityPath) {
  try {
    return normalizeFilePath(fs5.realpathSync(identityPath));
  } catch (error2) {
    if (isNoEntityError2(error2))
      return null;
    throw error2;
  }
}
function isBareImportSpecifier(specifier) {
  return !specifier.startsWith("./") && !specifier.startsWith("../") && !specifier.startsWith("/") && !specifier.startsWith("file:") && !specifier.startsWith("data:") && !specifier.startsWith("http://") && !specifier.startsWith("https://");
}
function isNoEntityError2(error2) {
  return error2 instanceof Error && "code" in error2 && (error2.code === "ENOENT" || error2.code === "ENOTDIR");
}
function createResponseForScript(result, options) {
  let body;
  let etag;
  let contentType;
  if (options.isSourceMapRequest) {
    if (!result.sourceMap) {
      return new Response("Not found", { status: 404 });
    }
    body = options.method === "HEAD" ? null : result.sourceMap.content;
    etag = result.sourceMap.etag;
    contentType = "application/json; charset=utf-8";
  } else {
    body = options.method === "HEAD" ? null : result.code.content;
    etag = result.code.etag;
    contentType = "application/javascript; charset=utf-8";
  }
  if (IfNoneMatch.from(options.ifNoneMatch).matches(etag)) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }
  return new Response(body, {
    headers: {
      "Cache-Control": options.cacheControl,
      "Content-Type": contentType,
      ETag: etag
    }
  });
}

// www/node_modules/@remix-run/assets/dist/lib/styles/compiler.js
import * as os2 from "node:os";
import * as path6 from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";

// www/node_modules/@remix-run/assets/dist/lib/styles/emit.js
async function emitResolvedStyle(resolvedStyle, options) {
  try {
    let importUrls = await Promise.all(resolvedStyle.deps.map((depPath) => options.getServedUrl(depPath)));
    let rewriteResult = await rewriteDependencies(resolvedStyle, options);
    let finalCode = rewriteResult.code;
    if (rewriteResult.sourceMap) {
      if (options.sourceMaps === "inline") {
        let encoded = Buffer.from(rewriteResult.sourceMap).toString("base64");
        finalCode += `
/*# sourceMappingURL=data:application/json;base64,${encoded} */`;
      } else if (options.sourceMaps === "external") {
        finalCode += `
/*# sourceMappingURL=${await options.getServedUrl(resolvedStyle.identityPath)}.map */`;
      }
    }
    return {
      ok: true,
      value: {
        code: await createEmittedAsset2(finalCode),
        fingerprint: resolvedStyle.fingerprint,
        importUrls,
        sourceMap: rewriteResult.sourceMap ? await createEmittedAsset2(rewriteResult.sourceMap) : null
      }
    };
  } catch (error2) {
    return {
      error: toEmitError2(error2, resolvedStyle.identityPath),
      ok: false
    };
  }
}
async function rewriteDependencies(resolvedStyle, options) {
  if (resolvedStyle.dependencies.length === 0) {
    return {
      code: resolvedStyle.rawCode,
      sourceMap: resolvedStyle.sourceMap
    };
  }
  let rewrittenSource = new MagicString(resolvedStyle.rawCode);
  for (let dependency of resolvedStyle.dependencies) {
    let replacement = dependency.kind === "external" ? dependency.replacement : `${await options.getServedUrl(dependency.depPath)}${dependency.suffix}`;
    let start = resolvedStyle.rawCode.indexOf(dependency.placeholder);
    if (start < 0) {
      throw createAssetServerCompilationError(`Missing dependency placeholder "${dependency.placeholder}" while emitting style ${resolvedStyle.identityPath}.`, {
        code: "EMIT_FAILED"
      });
    }
    rewrittenSource.overwrite(start, start + dependency.placeholder.length, replacement);
  }
  return {
    code: rewrittenSource.toString(),
    sourceMap: resolvedStyle.sourceMap ? composeSourceMaps(rewrittenSource.generateMap({ hires: true }).toString(), resolvedStyle.sourceMap) : null
  };
}
async function createEmittedAsset2(content) {
  return {
    content,
    etag: `W/"${await hashContent(content)}"`
  };
}
function toEmitError2(error2, identityPath) {
  if (isAssetServerCompilationError(error2))
    return error2;
  return createAssetServerCompilationError(`Failed to emit style ${identityPath}. ${error2 instanceof Error ? error2.message : String(error2)}`, {
    cause: error2,
    code: "EMIT_FAILED"
  });
}

// www/node_modules/@remix-run/assets/dist/lib/styles/resolve.js
import * as fs6 from "node:fs";
import * as path5 from "node:path";
async function resolveStyle(record, transformed, args) {
  let trackedFiles = new Set(transformed.trackedFiles);
  let dependencies = [];
  let deps = /* @__PURE__ */ new Set();
  for (let unresolved of transformed.unresolvedDependencies) {
    let trackedFile = unresolved.type === "import" ? getTrackedImportFilePath(unresolved.url, transformed.resolvedPath) : null;
    if (trackedFile && !args.isWatchIgnored(trackedFile)) {
      trackedFiles.add(trackedFile);
    }
    try {
      let resolved = unresolved.type === "import" ? resolveImportDependency(unresolved.url, transformed.resolvedPath, unresolved.placeholder, args) : resolveUrlDependency(unresolved.url, unresolved.placeholder);
      dependencies.push(resolved);
      if (resolved.kind === "local") {
        if (!args.isWatchIgnored(resolved.depPath)) {
          trackedFiles.add(resolved.depPath);
        }
        deps.add(resolved.depPath);
      }
    } catch (error2) {
      return failResolve2(error2, trackedFiles, transformed.resolvedPath);
    }
  }
  return {
    ok: true,
    tracking: {
      trackedFiles: [...trackedFiles]
    },
    value: {
      dependencies,
      deps: [...deps],
      fingerprint: transformed.fingerprint,
      identityPath: record.identityPath,
      rawCode: transformed.rawCode,
      resolvedPath: transformed.resolvedPath,
      sourceMap: transformed.sourceMap,
      stableUrlPathname: transformed.stableUrlPathname,
      trackedFiles: [...trackedFiles]
    }
  };
}
function resolveServedStyleOrThrow(filePath, args) {
  let identityPath = resolveExistingFilePath(filePath);
  if (!identityPath) {
    throw createAssetServerCompilationError(`File not found: ${filePath}`, {
      code: "FILE_NOT_FOUND"
    });
  }
  if (!isStyleFilePath(identityPath)) {
    throw createAssetServerCompilationError(`File not found: ${identityPath}`, {
      code: "FILE_NOT_FOUND"
    });
  }
  if (!args.isAllowed(identityPath)) {
    throw createAssetServerCompilationError(`File is not allowed: ${identityPath}`, {
      code: "FILE_NOT_ALLOWED"
    });
  }
  let stableUrlPathname = args.routes.toUrlPathname(identityPath);
  if (!stableUrlPathname) {
    throw createAssetServerCompilationError(`File ${identityPath} is outside all configured fileMap entries.`, {
      code: "FILE_OUTSIDE_FILE_MAP"
    });
  }
  return { identityPath, stableUrlPathname };
}
function resolveImportDependency(url, importerPath, placeholder, args) {
  if (isExternalUrl(url)) {
    return {
      kind: "external",
      placeholder,
      replacement: url
    };
  }
  let { pathname, suffix } = splitUrlSuffix(url);
  if (pathname.length === 0 || pathname === "#") {
    return {
      kind: "external",
      placeholder,
      replacement: url
    };
  }
  if (pathname.startsWith("/")) {
    return {
      kind: "external",
      placeholder,
      replacement: url
    };
  }
  let resolvedFilePath = normalizeFilePath(path5.resolve(path5.dirname(importerPath), pathname));
  let identityPath = resolveExistingFilePath(resolvedFilePath);
  if (!identityPath || !isStyleFilePath(identityPath)) {
    throw createAssetServerCompilationError(`Failed to resolve import "${url}" in ${importerPath}.`, {
      code: "IMPORT_RESOLUTION_FAILED"
    });
  }
  if (!args.isAllowed(identityPath)) {
    throw createAssetServerCompilationError(`Import "${url}" in ${importerPath}, resolved to "${identityPath}", is not allowed by the asset server allow/deny configuration. Add a matching allow rule for this file path, remove a conflicting deny rule for this file path, or mark this import as external.`, {
      code: "IMPORT_NOT_ALLOWED"
    });
  }
  if (!args.routes.toUrlPathname(identityPath)) {
    throw createAssetServerCompilationError(`Import "${url}" in ${importerPath}, resolved to "${identityPath}", is outside all configured fileMap entries. Add a matching fileMap entry for this file path, or mark this import as external.`, {
      code: "IMPORT_OUTSIDE_FILE_MAP"
    });
  }
  return {
    depPath: identityPath,
    kind: "local",
    placeholder,
    suffix
  };
}
function resolveUrlDependency(url, placeholder) {
  return {
    kind: "external",
    placeholder,
    replacement: url
  };
}
function resolveExistingFilePath(filePath) {
  try {
    return normalizeFilePath(fs6.realpathSync(filePath));
  } catch (error2) {
    if (isNoEntityError3(error2))
      return null;
    throw error2;
  }
}
function splitUrlSuffix(url) {
  let queryIndex = url.indexOf("?");
  let hashIndex = url.indexOf("#");
  let endIndex = [queryIndex, hashIndex].filter((index) => index >= 0).sort((a2, b) => a2 - b)[0];
  if (endIndex == null) {
    return {
      pathname: url,
      suffix: ""
    };
  }
  return {
    pathname: url.slice(0, endIndex),
    suffix: url.slice(endIndex)
  };
}
function getTrackedImportFilePath(specifier, importerPath) {
  let { pathname } = splitUrlSuffix(specifier);
  if (pathname.startsWith("./") || pathname.startsWith("../")) {
    return normalizeFilePath(path5.resolve(path5.dirname(importerPath), pathname));
  }
  return null;
}
function isStyleFilePath(filePath) {
  return path5.extname(filePath).toLowerCase() === ".css";
}
function isExternalUrl(url) {
  return url.startsWith("#") || url.startsWith("//") || /^[A-Za-z][A-Za-z\d+.-]*:/.test(url);
}
function isNoEntityError3(error2) {
  return error2 instanceof Error && "code" in error2 && error2.code === "ENOENT";
}
function toResolveError2(error2, importerPath) {
  if (isAssetServerCompilationError(error2))
    return error2;
  return createAssetServerCompilationError(`Failed to resolve imports in ${importerPath}. ${error2 instanceof Error ? error2.message : String(error2)}`, {
    cause: error2,
    code: "IMPORT_RESOLUTION_FAILED"
  });
}
function failResolve2(error2, trackedFiles, importerPath) {
  return {
    ok: false,
    error: toResolveError2(error2, importerPath),
    tracking: {
      trackedFiles: [...trackedFiles]
    }
  };
}

// www/node_modules/@remix-run/assets/dist/lib/styles/transform.js
import * as fs7 from "node:fs/promises";
import { transform as transform2 } from "lightningcss";
async function transformStyle(record, args) {
  let resolvedPath = record.identityPath;
  let trackedFiles = args.isWatchIgnored(resolvedPath) ? [] : [resolvedPath];
  let rawBytes;
  try {
    rawBytes = new Uint8Array(await fs7.readFile(resolvedPath));
  } catch (error2) {
    if (isNoEntityError4(error2)) {
      return {
        ok: false,
        error: createAssetServerCompilationError(`File not found: ${resolvedPath}`, {
          cause: error2,
          code: "FILE_NOT_FOUND"
        }),
        tracking: {
          trackedFiles
        }
      };
    }
    return {
      ok: false,
      error: toTransformFailedError2(error2, resolvedPath),
      tracking: {
        trackedFiles
      }
    };
  }
  try {
    let stableUrlPathname = args.routes.toUrlPathname(record.identityPath);
    if (!stableUrlPathname) {
      throw createAssetServerCompilationError(`File ${record.identityPath} is outside all configured fileMap entries.`, {
        code: "FILE_OUTSIDE_FILE_MAP"
      });
    }
    let transformResult = runLightningTransform(resolvedPath, rawBytes, {
      minify: args.minify,
      sourceMap: args.sourceMaps != null,
      targets: args.targets
    });
    let sourceText = Buffer.from(rawBytes).toString("utf8");
    let sourceMap = stringifySourceMap(transformResult.map);
    sourceMap = sourceMap ? rewriteSourceMapSources(sourceMap, resolvedPath, stableUrlPathname, args.sourceMapSourcePaths, sourceText) : null;
    let unresolvedDependencies = [];
    for (let dependency of transformResult.dependencies ?? []) {
      if (dependency.type === "import") {
        unresolvedDependencies.push({
          placeholder: dependency.placeholder,
          type: "import",
          url: dependency.url
        });
        continue;
      }
      if (dependency.type === "url") {
        unresolvedDependencies.push({
          placeholder: dependency.placeholder,
          type: "url",
          url: dependency.url
        });
      }
    }
    return {
      ok: true,
      tracking: {
        trackedFiles
      },
      value: {
        fingerprint: args.buildId === null ? null : await generateFingerprint({
          buildId: args.buildId,
          content: sourceText
        }),
        identityPath: record.identityPath,
        rawCode: Buffer.from(transformResult.code).toString("utf8"),
        resolvedPath,
        sourceMap,
        stableUrlPathname,
        trackedFiles,
        unresolvedDependencies
      }
    };
  } catch (error2) {
    return {
      ok: false,
      error: toTransformFailedError2(error2, resolvedPath),
      tracking: {
        trackedFiles
      }
    };
  }
}
function runLightningTransform(identityPath, code, options) {
  try {
    return transform2({
      analyzeDependencies: {
        preserveImports: true
      },
      code,
      filename: identityPath,
      minify: options.minify,
      sourceMap: options.sourceMap,
      targets: options.targets ?? void 0
    });
  } catch (error2) {
    throw createAssetServerCompilationError(`Failed to transform style ${identityPath}. ${error2 instanceof Error ? error2.message : String(error2)}`, {
      cause: error2,
      code: "TRANSFORM_FAILED"
    });
  }
}
function toTransformFailedError2(error2, resolvedPath) {
  if (isAssetServerCompilationError(error2))
    return error2;
  return createAssetServerCompilationError(`Failed to transform style ${resolvedPath}. ${error2 instanceof Error ? error2.message : String(error2)}`, {
    cause: error2,
    code: "TRANSFORM_FAILED"
  });
}
function isNoEntityError4(error2) {
  return error2 instanceof Error && "code" in error2 && error2.code === "ENOENT";
}

// www/node_modules/@remix-run/assets/dist/lib/styles/compiler.js
var preloadConcurrency2 = Math.max(1, Math.min(8, os2.availableParallelism() - 1));
var styleExtension = ".css";
function createStyleCompiler(options) {
  let resolvedOptions = {
    ...options,
    watchIgnoreMatchers: (options.watchIgnore ?? []).map((pattern) => createFileMatcher(pattern, options.rootDir))
  };
  let styleStore = createModuleStore({
    onWatchDirectoriesChange: options.onWatchDirectoriesChange
  });
  let resolveInFlightByCacheKey = /* @__PURE__ */ new Map();
  let emitInFlightByCacheKey = /* @__PURE__ */ new Map();
  let resolveArgs = {
    isAllowed: resolvedOptions.isAllowed,
    isWatchIgnored,
    routes: resolvedOptions.routes
  };
  let transformArgs = {
    buildId: resolvedOptions.buildId ?? null,
    isWatchIgnored,
    minify: resolvedOptions.minify,
    routes: resolvedOptions.routes,
    sourceMapSourcePaths: resolvedOptions.sourceMapSourcePaths,
    sourceMaps: resolvedOptions.sourceMaps ?? null,
    targets: resolvedOptions.targets ?? null
  };
  return {
    async getHref(filePath) {
      let resolvedStyle = resolveServedStyleOrThrow(resolveInputFilePath(filePath), resolveArgs);
      return getServedUrl(resolvedStyle.identityPath);
    },
    async getPreloadLayers(filePath) {
      let resolvedEntries = [];
      let seen = /* @__PURE__ */ new Set();
      for (let resolvedStyle of (Array.isArray(filePath) ? filePath : [filePath]).map((nextPath) => resolveServedStyleOrThrow(resolveInputFilePath(nextPath), resolveArgs))) {
        if (seen.has(resolvedStyle.identityPath))
          continue;
        seen.add(resolvedStyle.identityPath);
        resolvedEntries.push(resolvedStyle.identityPath);
      }
      let visited = new Set(resolvedEntries);
      let queue = [...resolvedEntries];
      let layers = [];
      while (queue.length > 0) {
        let frontier = queue;
        queue = [];
        let resolvedStyles = await getOrCreateResolvedStyles(frontier.map((identityPath) => styleStore.get(identityPath)));
        let layer = [];
        for (let resolvedStyle of resolvedStyles) {
          layer.push(getServedUrlForResolvedStyle(resolvedStyle));
          for (let dep of resolvedStyle.deps) {
            if (visited.has(dep))
              continue;
            visited.add(dep);
            queue.push(dep);
          }
        }
        layers.push(layer);
      }
      return layers;
    },
    async getStyle(filePath, getOptions) {
      let resolvedStyle = resolveServedStyleOrThrow(resolveInputFilePath(filePath), resolveArgs);
      let record = styleStore.get(resolvedStyle.identityPath);
      let notModified = getNotModifiedStyle(record.emitted, getOptions);
      if (notModified)
        return notModified;
      let emitted = await getOrCreateEmittedStyle(record);
      return {
        style: toStyleCompileResult(emitted),
        type: "style"
      };
    },
    async handleFileEvent(filePath, event) {
      let normalizedFilePath = normalizeFilePath(filePath);
      if (isWatchIgnored(normalizedFilePath))
        return;
      styleStore.invalidateForFileEvent(normalizedFilePath, event);
    }
  };
  function resolveInputFilePath(filePath) {
    if (filePath.startsWith("file://")) {
      return normalizeFilePath(fileURLToPath3(new URL(filePath)));
    }
    if (filePath.includes("://")) {
      throw new TypeError(`Expected a file path or file:// URL, received "${filePath}"`);
    }
    return resolveFilePath(resolvedOptions.rootDir, filePath);
  }
  async function getOrCreateResolvedStyles(records) {
    return mapWithConcurrency2(records, preloadConcurrency2, (record) => getOrCreateResolvedStyle(record));
  }
  async function getOrCreateResolvedStyle(record) {
    if (record.resolved)
      return record.resolved;
    let cacheKey = getRecordCacheKey2(record);
    let existing = resolveInFlightByCacheKey.get(cacheKey);
    if (existing)
      return existing;
    let promise = (async () => {
      let startedVersion = record.invalidationVersion;
      let transformedStyle = await getOrCreateTransformedStyle(record);
      let resolvedStyleResult = await resolveStyle(record, transformedStyle, resolveArgs);
      if (!resolvedStyleResult.ok) {
        if (isFresh2(record, startedVersion)) {
          styleStore.clearResolved(record.identityPath, [resolvedStyleResult.tracking]);
        }
        throw resolvedStyleResult.error;
      }
      if (isFresh2(record, startedVersion)) {
        styleStore.setResolved(record.identityPath, resolvedStyleResult.value, [
          resolvedStyleResult.tracking
        ]);
      }
      return resolvedStyleResult.value;
    })();
    resolveInFlightByCacheKey.set(cacheKey, promise);
    try {
      return await promise;
    } finally {
      if (resolveInFlightByCacheKey.get(cacheKey) === promise) {
        resolveInFlightByCacheKey.delete(cacheKey);
      }
    }
  }
  async function getOrCreateTransformedStyle(record) {
    if (record.transformed)
      return record.transformed;
    let startedVersion = record.invalidationVersion;
    let transformStyleResult = await transformStyle(record, transformArgs);
    if (!transformStyleResult.ok) {
      if (isFresh2(record, startedVersion)) {
        styleStore.clearTransformed(record.identityPath, [transformStyleResult.tracking]);
      }
      throw transformStyleResult.error;
    }
    if (isFresh2(record, startedVersion)) {
      styleStore.setTransformed(record.identityPath, transformStyleResult.value, [
        transformStyleResult.tracking
      ]);
    }
    return transformStyleResult.value;
  }
  async function getOrCreateEmittedStyle(record) {
    if (record.emitted)
      return record.emitted;
    let cacheKey = getRecordCacheKey2(record);
    let existing = emitInFlightByCacheKey.get(cacheKey);
    if (existing)
      return existing;
    let promise = (async () => {
      let startedVersion = record.invalidationVersion;
      let resolvedStyle = await getOrCreateResolvedStyle(record);
      let emitResolvedStyleResult = await emitResolvedStyle(resolvedStyle, {
        getServedUrl,
        sourceMaps: resolvedOptions.sourceMaps
      });
      if (!emitResolvedStyleResult.ok) {
        throw emitResolvedStyleResult.error;
      }
      if (isFresh2(record, startedVersion)) {
        styleStore.setEmitted(record.identityPath, emitResolvedStyleResult.value, null);
      }
      return emitResolvedStyleResult.value;
    })();
    emitInFlightByCacheKey.set(cacheKey, promise);
    try {
      return await promise;
    } finally {
      if (emitInFlightByCacheKey.get(cacheKey) === promise) {
        emitInFlightByCacheKey.delete(cacheKey);
      }
    }
  }
  async function getServedUrl(identityPath) {
    return getServedUrlForResolvedStyle(await getOrCreateResolvedStyle(styleStore.get(identityPath)));
  }
  function getServedUrlForResolvedStyle(resolvedStyle) {
    return formatFingerprintedPathname(resolvedStyle.stableUrlPathname, resolvedOptions.fingerprintAssets ? resolvedStyle.fingerprint : null);
  }
  function isWatchIgnored(filePath) {
    return resolvedOptions.watchIgnoreMatchers.some((matcher) => matcher(filePath));
  }
}
function getRecordCacheKey2(record) {
  return `${record.identityPath}\0${record.invalidationVersion}`;
}
function isFresh2(record, version) {
  return record.invalidationVersion === version;
}
function getNotModifiedStyle(emittedStyle, options) {
  if (!emittedStyle || options.ifNoneMatch === null)
    return null;
  if (options.requestedFingerprint !== null && emittedStyle.fingerprint !== options.requestedFingerprint) {
    return null;
  }
  let asset = getEmittedAssetForRequest2(emittedStyle, options.isSourceMapRequest);
  if (!asset)
    return null;
  if (!IfNoneMatch.from(options.ifNoneMatch).matches(asset.etag))
    return null;
  return { etag: asset.etag, type: "not-modified" };
}
function getEmittedAssetForRequest2(emittedStyle, isSourceMapRequest) {
  return isSourceMapRequest ? emittedStyle.sourceMap : emittedStyle.code;
}
async function mapWithConcurrency2(items, concurrency, mapper) {
  if (items.length === 0)
    return [];
  let results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      let index = nextIndex++;
      results[index] = await mapper(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, () => worker()));
  return results;
}
function toStyleCompileResult(emittedStyle) {
  return {
    code: emittedStyle.code,
    fingerprint: emittedStyle.fingerprint,
    sourceMap: emittedStyle.sourceMap
  };
}
function isStyleFilePath2(filePath) {
  return path6.extname(filePath).toLowerCase() === styleExtension;
}
function createResponseForStyle(result, options) {
  let body;
  let etag;
  let contentType;
  if (options.isSourceMapRequest) {
    if (!result.sourceMap) {
      return new Response("Not found", { status: 404 });
    }
    body = options.method === "HEAD" ? null : result.sourceMap.content;
    etag = result.sourceMap.etag;
    contentType = "application/json; charset=utf-8";
  } else {
    body = options.method === "HEAD" ? null : result.code.content;
    etag = result.code.etag;
    contentType = "text/css; charset=utf-8";
  }
  if (IfNoneMatch.from(options.ifNoneMatch).matches(etag)) {
    return new Response(null, { status: 304, headers: { ETag: etag } });
  }
  return new Response(body, {
    headers: {
      "Cache-Control": options.cacheControl,
      "Content-Type": contentType,
      ETag: etag
    }
  });
}

// www/node_modules/@remix-run/assets/dist/lib/target.js
var browserTargetNames = [
  "chrome",
  "edge",
  "firefox",
  "ie",
  "ios",
  "opera",
  "safari",
  "samsung"
];
var browserTargetNameSet = new Set(browserTargetNames);
var lightningCssTargetNameByBrowserTargetName = {
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios: "ios_saf",
  opera: "opera",
  safari: "safari",
  samsung: "samsung"
};
function resolveScriptTarget(target) {
  let resolvedTarget = normalizeScriptTargetObject(target, "target");
  if (!resolvedTarget)
    return void 0;
  let oxcTarget = [];
  if (resolvedTarget.es) {
    oxcTarget.push(resolvedTarget.es);
  }
  for (let browserTargetName of browserTargetNames) {
    let version = resolvedTarget[browserTargetName];
    if (version == null)
      continue;
    oxcTarget.push(`${browserTargetName}${version}`);
  }
  return oxcTarget;
}
function resolveStyleTarget(target) {
  let resolvedTarget = normalizeStyleTargetObject(target, "target");
  if (!resolvedTarget)
    return void 0;
  let lightningCssTargets = {};
  for (let browserTargetName of browserTargetNames) {
    let version = resolvedTarget[browserTargetName];
    if (version == null)
      continue;
    lightningCssTargets[lightningCssTargetNameByBrowserTargetName[browserTargetName]] = toLightningCssTargetVersion(version);
  }
  return lightningCssTargets;
}
function normalizeScriptTargetObject(target, optionPath) {
  if (target == null)
    return void 0;
  if (!isPlainObject(target)) {
    throw new TypeError(`${optionPath} must be an object`);
  }
  let normalizedTarget = {};
  for (let [key, value] of Object.entries(target)) {
    if (key === "es") {
      normalizedTarget.es = normalizeScriptTargetVersion(value, `${optionPath}.es`);
      continue;
    }
    if (!browserTargetNameSet.has(key)) {
      throw new TypeError(`${optionPath}.${key} is not a supported target`);
    }
    normalizedTarget[key] = normalizeBrowserTargetVersion(value, `${optionPath}.${key}`);
  }
  return Object.keys(normalizedTarget).length === 0 ? void 0 : normalizedTarget;
}
function normalizeStyleTargetObject(target, optionPath) {
  if (target == null)
    return void 0;
  if (!isPlainObject(target)) {
    throw new TypeError(`${optionPath} must be an object`);
  }
  let normalizedTarget = {};
  for (let [key, value] of Object.entries(target)) {
    if (key === "es") {
      continue;
    }
    if (!browserTargetNameSet.has(key)) {
      throw new TypeError(`${optionPath}.${key} is not a supported target`);
    }
    normalizedTarget[key] = normalizeBrowserTargetVersion(value, `${optionPath}.${key}`);
  }
  return Object.keys(normalizedTarget).length === 0 ? void 0 : normalizedTarget;
}
function normalizeScriptTargetVersion(value, optionPath) {
  if (typeof value !== "string") {
    throw new TypeError(`${optionPath} must be a string`);
  }
  let normalizedValue = value.trim();
  if (normalizedValue.length === 0) {
    throw new TypeError(`${optionPath} must be a non-empty string`);
  }
  if (!/^\d+$/.test(normalizedValue)) {
    throw new TypeError(`${optionPath} must use a single numeric year like "2020"`);
  }
  if (!/^\d{4}$/.test(normalizedValue) || Number(normalizedValue) < 2015) {
    throw new TypeError(`${optionPath} must use a four-digit year of 2015 or higher`);
  }
  return `es${normalizedValue}`;
}
function normalizeBrowserTargetVersion(value, optionPath) {
  if (typeof value !== "string") {
    throw new TypeError(`${optionPath} must be a string`);
  }
  if (value.trim().length === 0) {
    throw new TypeError(`${optionPath} must be a non-empty string`);
  }
  if (!/^\d+(\.\d+){0,2}$/.test(value)) {
    throw new TypeError(`${optionPath} must use "X", "X.Y", or "X.Y.Z" version format`);
  }
  let segments = value.split(".").map(Number);
  if (segments.some((segment) => segment > 255)) {
    throw new TypeError(`${optionPath} must use version components between 0 and 255`);
  }
  return value;
}
function toLightningCssTargetVersion(version) {
  let [major, minor = 0, patch = 0] = version.split(".").map(Number);
  return major * 65536 + minor * 256 + patch;
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// www/node_modules/chokidar/index.js
import { EventEmitter } from "node:events";
import { stat as statcb, Stats } from "node:fs";
import { readdir as readdir2, stat as stat3 } from "node:fs/promises";
import * as sp2 from "node:path";

// www/node_modules/readdirp/index.js
import { lstat, readdir, realpath, stat } from "node:fs/promises";
import { join as pjoin, relative as prelative, resolve as presolve, sep as psep } from "node:path";
import { Readable } from "node:stream";
var EntryTypes = {
  FILE_TYPE: "files",
  DIR_TYPE: "directories",
  FILE_DIR_TYPE: "files_directories",
  EVERYTHING_TYPE: "all"
};
var defaultOptions = {
  root: ".",
  fileFilter: (_entryInfo) => true,
  directoryFilter: (_entryInfo) => true,
  type: EntryTypes.FILE_TYPE,
  lstat: false,
  depth: 2147483648,
  alwaysStat: false,
  highWaterMark: 4096
};
Object.freeze(defaultOptions);
var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
var ALL_TYPES = [
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
];
var DIR_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.DIR_TYPE,
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE
]);
var FILE_TYPES = /* @__PURE__ */ new Set([
  EntryTypes.EVERYTHING_TYPE,
  EntryTypes.FILE_DIR_TYPE,
  EntryTypes.FILE_TYPE
]);
var isNormalFlowError = (error2) => NORMAL_FLOW_ERRORS.has(error2.code);
var wantBigintFsStats = process.platform === "win32";
var emptyFn = (_entryInfo) => true;
var normalizeFilter = (filter) => {
  if (filter === void 0)
    return emptyFn;
  if (typeof filter === "function")
    return filter;
  if (typeof filter === "string") {
    const fl = filter.trim();
    return (entry) => entry.basename === fl;
  }
  if (Array.isArray(filter)) {
    const trItems = filter.map((item) => item.trim());
    return (entry) => trItems.some((f2) => entry.basename === f2);
  }
  return emptyFn;
};
var ReaddirpStream = class extends Readable {
  parents;
  reading;
  parent;
  _stat;
  _maxDepth;
  _wantsDir;
  _wantsFile;
  _wantsEverything;
  _root;
  _isDirent;
  _statsProp;
  _rdOptions;
  _fileFilter;
  _directoryFilter;
  constructor(options = {}) {
    super({
      objectMode: true,
      autoDestroy: true,
      highWaterMark: options.highWaterMark
    });
    const opts = { ...defaultOptions, ...options };
    const { root, type } = opts;
    this._fileFilter = normalizeFilter(opts.fileFilter);
    this._directoryFilter = normalizeFilter(opts.directoryFilter);
    const statMethod = opts.lstat ? lstat : stat;
    if (wantBigintFsStats) {
      this._stat = (path8) => statMethod(path8, { bigint: true });
    } else {
      this._stat = statMethod;
    }
    this._maxDepth = opts.depth != null && Number.isSafeInteger(opts.depth) ? opts.depth : defaultOptions.depth;
    this._wantsDir = type ? DIR_TYPES.has(type) : false;
    this._wantsFile = type ? FILE_TYPES.has(type) : false;
    this._wantsEverything = type === EntryTypes.EVERYTHING_TYPE;
    this._root = presolve(root);
    this._isDirent = !opts.alwaysStat;
    this._statsProp = this._isDirent ? "dirent" : "stats";
    this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
    this.parents = [this._exploreDir(root, 1)];
    this.reading = false;
    this.parent = void 0;
  }
  async _read(batch) {
    if (this.reading)
      return;
    this.reading = true;
    try {
      while (!this.destroyed && batch > 0) {
        const par = this.parent;
        const fil = par && par.files;
        if (fil && fil.length > 0) {
          const { path: path8, depth } = par;
          const slice = fil.splice(0, batch).map((dirent) => this._formatEntry(dirent, path8));
          const awaited = await Promise.all(slice);
          for (const entry of awaited) {
            if (!entry)
              continue;
            if (this.destroyed)
              return;
            const entryType = await this._getEntryType(entry);
            if (entryType === "directory" && this._directoryFilter(entry)) {
              if (depth <= this._maxDepth) {
                this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
              }
              if (this._wantsDir) {
                this.push(entry);
                batch--;
              }
            } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
              if (this._wantsFile) {
                this.push(entry);
                batch--;
              }
            }
          }
        } else {
          const parent = this.parents.pop();
          if (!parent) {
            this.push(null);
            break;
          }
          this.parent = await parent;
          if (this.destroyed)
            return;
        }
      }
    } catch (error2) {
      this.destroy(error2);
    } finally {
      this.reading = false;
    }
  }
  async _exploreDir(path8, depth) {
    let files;
    try {
      files = await readdir(path8, this._rdOptions);
    } catch (error2) {
      this._onError(error2);
    }
    return { files, depth, path: path8 };
  }
  async _formatEntry(dirent, path8) {
    let entry;
    const basename3 = this._isDirent ? dirent.name : dirent;
    try {
      const fullPath = presolve(pjoin(path8, basename3));
      entry = { path: prelative(this._root, fullPath), fullPath, basename: basename3 };
      entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
    } catch (err) {
      this._onError(err);
      return;
    }
    return entry;
  }
  _onError(err) {
    if (isNormalFlowError(err) && !this.destroyed) {
      this.emit("warn", err);
    } else {
      this.destroy(err);
    }
  }
  async _getEntryType(entry) {
    if (!entry && this._statsProp in entry) {
      return "";
    }
    const stats = entry[this._statsProp];
    if (stats.isFile())
      return "file";
    if (stats.isDirectory())
      return "directory";
    if (stats && stats.isSymbolicLink()) {
      const full = entry.fullPath;
      try {
        const entryRealPath = await realpath(full);
        const entryRealPathStats = await lstat(entryRealPath);
        if (entryRealPathStats.isFile()) {
          return "file";
        }
        if (entryRealPathStats.isDirectory()) {
          const len = entryRealPath.length;
          if (full.startsWith(entryRealPath) && full.substr(len, 1) === psep) {
            const recursiveError = new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`);
            recursiveError.code = RECURSIVE_ERROR_CODE;
            return this._onError(recursiveError);
          }
          return "directory";
        }
      } catch (error2) {
        this._onError(error2);
        return "";
      }
    }
  }
  _includeAsFile(entry) {
    const stats = entry && entry[this._statsProp];
    return stats && this._wantsEverything && !stats.isDirectory();
  }
};
function readdirp(root, options = {}) {
  let type = options.entryType || options.type;
  if (type === "both")
    type = EntryTypes.FILE_DIR_TYPE;
  if (type)
    options.type = type;
  if (!root) {
    throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
  } else if (typeof root !== "string") {
    throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
  } else if (type && !ALL_TYPES.includes(type)) {
    throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
  }
  options.root = root;
  return new ReaddirpStream(options);
}

// www/node_modules/chokidar/handler.js
import { watch as fs_watch, unwatchFile, watchFile } from "node:fs";
import { realpath as fsrealpath, lstat as lstat2, open, stat as stat2 } from "node:fs/promises";
import { type as osType } from "node:os";
import * as sp from "node:path";
var STR_DATA = "data";
var STR_END = "end";
var STR_CLOSE = "close";
var EMPTY_FN = () => {
};
var pl = process.platform;
var isWindows = pl === "win32";
var isMacos = pl === "darwin";
var isLinux = pl === "linux";
var isFreeBSD = pl === "freebsd";
var isIBMi = osType() === "OS400";
var EVENTS = {
  ALL: "all",
  READY: "ready",
  ADD: "add",
  CHANGE: "change",
  ADD_DIR: "addDir",
  UNLINK: "unlink",
  UNLINK_DIR: "unlinkDir",
  RAW: "raw",
  ERROR: "error"
};
var EV = EVENTS;
var THROTTLE_MODE_WATCH = "watch";
var statMethods = { lstat: lstat2, stat: stat2 };
var KEY_LISTENERS = "listeners";
var KEY_ERR = "errHandlers";
var KEY_RAW = "rawEmitters";
var HANDLER_KEYS = [KEY_LISTENERS, KEY_ERR, KEY_RAW];
var binaryExtensions = /* @__PURE__ */ new Set([
  "3dm",
  "3ds",
  "3g2",
  "3gp",
  "7z",
  "a",
  "aac",
  "adp",
  "afdesign",
  "afphoto",
  "afpub",
  "ai",
  "aif",
  "aiff",
  "alz",
  "ape",
  "apk",
  "appimage",
  "ar",
  "arj",
  "asf",
  "au",
  "avi",
  "bak",
  "baml",
  "bh",
  "bin",
  "bk",
  "bmp",
  "btif",
  "bz2",
  "bzip2",
  "cab",
  "caf",
  "cgm",
  "class",
  "cmx",
  "cpio",
  "cr2",
  "cur",
  "dat",
  "dcm",
  "deb",
  "dex",
  "djvu",
  "dll",
  "dmg",
  "dng",
  "doc",
  "docm",
  "docx",
  "dot",
  "dotm",
  "dra",
  "DS_Store",
  "dsk",
  "dts",
  "dtshd",
  "dvb",
  "dwg",
  "dxf",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "egg",
  "eol",
  "eot",
  "epub",
  "exe",
  "f4v",
  "fbs",
  "fh",
  "fla",
  "flac",
  "flatpak",
  "fli",
  "flv",
  "fpx",
  "fst",
  "fvt",
  "g3",
  "gh",
  "gif",
  "graffle",
  "gz",
  "gzip",
  "h261",
  "h263",
  "h264",
  "icns",
  "ico",
  "ief",
  "img",
  "ipa",
  "iso",
  "jar",
  "jpeg",
  "jpg",
  "jpgv",
  "jpm",
  "jxr",
  "key",
  "ktx",
  "lha",
  "lib",
  "lvp",
  "lz",
  "lzh",
  "lzma",
  "lzo",
  "m3u",
  "m4a",
  "m4v",
  "mar",
  "mdi",
  "mht",
  "mid",
  "midi",
  "mj2",
  "mka",
  "mkv",
  "mmr",
  "mng",
  "mobi",
  "mov",
  "movie",
  "mp3",
  "mp4",
  "mp4a",
  "mpeg",
  "mpg",
  "mpga",
  "mxu",
  "nef",
  "npx",
  "numbers",
  "nupkg",
  "o",
  "odp",
  "ods",
  "odt",
  "oga",
  "ogg",
  "ogv",
  "otf",
  "ott",
  "pages",
  "pbm",
  "pcx",
  "pdb",
  "pdf",
  "pea",
  "pgm",
  "pic",
  "png",
  "pnm",
  "pot",
  "potm",
  "potx",
  "ppa",
  "ppam",
  "ppm",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
  "psd",
  "pya",
  "pyc",
  "pyo",
  "pyv",
  "qt",
  "rar",
  "ras",
  "raw",
  "resources",
  "rgb",
  "rip",
  "rlc",
  "rmf",
  "rmvb",
  "rpm",
  "rtf",
  "rz",
  "s3m",
  "s7z",
  "scpt",
  "sgi",
  "shar",
  "snap",
  "sil",
  "sketch",
  "slk",
  "smv",
  "snk",
  "so",
  "stl",
  "suo",
  "sub",
  "swf",
  "tar",
  "tbz",
  "tbz2",
  "tga",
  "tgz",
  "thmx",
  "tif",
  "tiff",
  "tlz",
  "ttc",
  "ttf",
  "txz",
  "udf",
  "uvh",
  "uvi",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "viv",
  "vob",
  "war",
  "wav",
  "wax",
  "wbmp",
  "wdp",
  "weba",
  "webm",
  "webp",
  "whl",
  "wim",
  "wm",
  "wma",
  "wmv",
  "wmx",
  "woff",
  "woff2",
  "wrm",
  "wvx",
  "xbm",
  "xif",
  "xla",
  "xlam",
  "xls",
  "xlsb",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
  "xm",
  "xmind",
  "xpi",
  "xpm",
  "xwd",
  "xz",
  "z",
  "zip",
  "zipx"
]);
var isBinaryPath = (filePath) => binaryExtensions.has(sp.extname(filePath).slice(1).toLowerCase());
var foreach = (val, fn) => {
  if (val instanceof Set) {
    val.forEach(fn);
  } else {
    fn(val);
  }
};
var addAndConvert = (main, prop, item) => {
  let container = main[prop];
  if (!(container instanceof Set)) {
    main[prop] = container = /* @__PURE__ */ new Set([container]);
  }
  container.add(item);
};
var clearItem = (cont) => (key) => {
  const set = cont[key];
  if (set instanceof Set) {
    set.clear();
  } else {
    delete cont[key];
  }
};
var delFromSet = (main, prop, item) => {
  const container = main[prop];
  if (container instanceof Set) {
    container.delete(item);
  } else if (container === item) {
    delete main[prop];
  }
};
var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
var FsWatchInstances = /* @__PURE__ */ new Map();
function createFsWatchInstance(path8, options, listener, errHandler, emitRaw) {
  const handleEvent = (rawEvent, evPath) => {
    listener(path8);
    emitRaw(rawEvent, evPath, { watchedPath: path8 });
    if (evPath && path8 !== evPath) {
      fsWatchBroadcast(sp.resolve(path8, evPath), KEY_LISTENERS, sp.join(path8, evPath));
    }
  };
  try {
    return fs_watch(path8, {
      persistent: options.persistent
    }, handleEvent);
  } catch (error2) {
    errHandler(error2);
    return void 0;
  }
}
var fsWatchBroadcast = (fullPath, listenerType, val1, val2, val3) => {
  const cont = FsWatchInstances.get(fullPath);
  if (!cont)
    return;
  foreach(cont[listenerType], (listener) => {
    listener(val1, val2, val3);
  });
};
var setFsWatchListener = (path8, fullPath, options, handlers) => {
  const { listener, errHandler, rawEmitter } = handlers;
  let cont = FsWatchInstances.get(fullPath);
  let watcher;
  if (!options.persistent) {
    watcher = createFsWatchInstance(path8, options, listener, errHandler, rawEmitter);
    if (!watcher)
      return;
    return watcher.close.bind(watcher);
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_ERR, errHandler);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    watcher = createFsWatchInstance(
      path8,
      options,
      fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
      errHandler,
      // no need to use broadcast here
      fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
    );
    if (!watcher)
      return;
    watcher.on(EV.ERROR, async (error2) => {
      const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
      if (cont)
        cont.watcherUnusable = true;
      if (isWindows && error2.code === "EPERM") {
        try {
          const fd = await open(path8, "r");
          await fd.close();
          broadcastErr(error2);
        } catch (err) {
        }
      } else {
        broadcastErr(error2);
      }
    });
    cont = {
      listeners: listener,
      errHandlers: errHandler,
      rawEmitters: rawEmitter,
      watcher
    };
    FsWatchInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_ERR, errHandler);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      cont.watcher.close();
      FsWatchInstances.delete(fullPath);
      HANDLER_KEYS.forEach(clearItem(cont));
      cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var FsWatchFileInstances = /* @__PURE__ */ new Map();
var setFsWatchFileListener = (path8, fullPath, options, handlers) => {
  const { listener, rawEmitter } = handlers;
  let cont = FsWatchFileInstances.get(fullPath);
  const copts = cont && cont.options;
  if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
    unwatchFile(fullPath);
    cont = void 0;
  }
  if (cont) {
    addAndConvert(cont, KEY_LISTENERS, listener);
    addAndConvert(cont, KEY_RAW, rawEmitter);
  } else {
    cont = {
      listeners: listener,
      rawEmitters: rawEmitter,
      options,
      watcher: watchFile(fullPath, options, (curr, prev) => {
        foreach(cont.rawEmitters, (rawEmitter2) => {
          rawEmitter2(EV.CHANGE, fullPath, { curr, prev });
        });
        const currmtime = curr.mtimeMs;
        if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
          foreach(cont.listeners, (listener2) => listener2(path8, curr));
        }
      })
    };
    FsWatchFileInstances.set(fullPath, cont);
  }
  return () => {
    delFromSet(cont, KEY_LISTENERS, listener);
    delFromSet(cont, KEY_RAW, rawEmitter);
    if (isEmptySet(cont.listeners)) {
      FsWatchFileInstances.delete(fullPath);
      unwatchFile(fullPath);
      cont.options = cont.watcher = void 0;
      Object.freeze(cont);
    }
  };
};
var NodeFsHandler = class {
  fsw;
  _boundHandleError;
  constructor(fsW) {
    this.fsw = fsW;
    this._boundHandleError = (error2) => fsW._handleError(error2);
  }
  /**
   * Watch file for changes with fs_watchFile or fs_watch.
   * @param path to file or dir
   * @param listener on fs change
   * @returns closer for the watcher instance
   */
  _watchWithNodeFs(path8, listener) {
    const opts = this.fsw.options;
    const directory = sp.dirname(path8);
    const basename3 = sp.basename(path8);
    const parent = this.fsw._getWatchedDir(directory);
    parent.add(basename3);
    const absolutePath = sp.resolve(path8);
    const options = {
      persistent: opts.persistent
    };
    if (!listener)
      listener = EMPTY_FN;
    let closer;
    if (opts.usePolling) {
      const enableBin = opts.interval !== opts.binaryInterval;
      options.interval = enableBin && isBinaryPath(basename3) ? opts.binaryInterval : opts.interval;
      closer = setFsWatchFileListener(path8, absolutePath, options, {
        listener,
        rawEmitter: this.fsw._emitRaw
      });
    } else {
      closer = setFsWatchListener(path8, absolutePath, options, {
        listener,
        errHandler: this._boundHandleError,
        rawEmitter: this.fsw._emitRaw
      });
    }
    return closer;
  }
  /**
   * Watch a file and emit add event if warranted.
   * @returns closer for the watcher instance
   */
  _handleFile(file, stats, initialAdd) {
    if (this.fsw.closed) {
      return;
    }
    const dirname6 = sp.dirname(file);
    const basename3 = sp.basename(file);
    const parent = this.fsw._getWatchedDir(dirname6);
    let prevStats = stats;
    if (parent.has(basename3))
      return;
    const listener = async (path8, newStats) => {
      if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5))
        return;
      if (!newStats || newStats.mtimeMs === 0) {
        try {
          const newStats2 = await stat2(file);
          if (this.fsw.closed)
            return;
          const at = newStats2.atimeMs;
          const mt = newStats2.mtimeMs;
          if (!at || at <= mt || mt !== prevStats.mtimeMs) {
            this.fsw._emit(EV.CHANGE, file, newStats2);
          }
          if ((isMacos || isLinux || isFreeBSD) && prevStats.ino !== newStats2.ino) {
            this.fsw._closeFile(path8);
            prevStats = newStats2;
            const closer2 = this._watchWithNodeFs(file, listener);
            if (closer2)
              this.fsw._addPathCloser(path8, closer2);
          } else {
            prevStats = newStats2;
          }
        } catch (error2) {
          this.fsw._remove(dirname6, basename3);
        }
      } else if (parent.has(basename3)) {
        const at = newStats.atimeMs;
        const mt = newStats.mtimeMs;
        if (!at || at <= mt || mt !== prevStats.mtimeMs) {
          this.fsw._emit(EV.CHANGE, file, newStats);
        }
        prevStats = newStats;
      }
    };
    const closer = this._watchWithNodeFs(file, listener);
    if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
      if (!this.fsw._throttle(EV.ADD, file, 0))
        return;
      this.fsw._emit(EV.ADD, file, stats);
    }
    return closer;
  }
  /**
   * Handle symlinks encountered while reading a dir.
   * @param entry returned by readdirp
   * @param directory path of dir being read
   * @param path of this item
   * @param item basename of this item
   * @returns true if no more processing is needed for this entry.
   */
  async _handleSymlink(entry, directory, path8, item) {
    if (this.fsw.closed) {
      return;
    }
    const full = entry.fullPath;
    const dir = this.fsw._getWatchedDir(directory);
    if (!this.fsw.options.followSymlinks) {
      this.fsw._incrReadyCount();
      let linkPath;
      try {
        linkPath = await fsrealpath(path8);
      } catch (e) {
        this.fsw._emitReady();
        return true;
      }
      if (this.fsw.closed)
        return;
      if (dir.has(item)) {
        if (this.fsw._symlinkPaths.get(full) !== linkPath) {
          this.fsw._symlinkPaths.set(full, linkPath);
          this.fsw._emit(EV.CHANGE, path8, entry.stats);
        }
      } else {
        dir.add(item);
        this.fsw._symlinkPaths.set(full, linkPath);
        this.fsw._emit(EV.ADD, path8, entry.stats);
      }
      this.fsw._emitReady();
      return true;
    }
    if (this.fsw._symlinkPaths.has(full)) {
      return true;
    }
    this.fsw._symlinkPaths.set(full, true);
  }
  _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
    directory = sp.join(directory, "");
    const throttleKey = target ? `${directory}:${target}` : directory;
    throttler = this.fsw._throttle("readdir", throttleKey, 1e3);
    if (!throttler)
      return;
    const previous = this.fsw._getWatchedDir(wh.path);
    const current = /* @__PURE__ */ new Set();
    let stream = this.fsw._readdirp(directory, {
      fileFilter: (entry) => wh.filterPath(entry),
      directoryFilter: (entry) => wh.filterDir(entry)
    });
    if (!stream)
      return;
    stream.on(STR_DATA, async (entry) => {
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      const item = entry.path;
      let path8 = sp.join(directory, item);
      current.add(item);
      if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path8, item)) {
        return;
      }
      if (this.fsw.closed) {
        stream = void 0;
        return;
      }
      if (item === target || !target && !previous.has(item)) {
        this.fsw._incrReadyCount();
        path8 = sp.join(dir, sp.relative(dir, path8));
        this._addToNodeFs(path8, initialAdd, wh, depth + 1);
      }
    }).on(EV.ERROR, this._boundHandleError);
    return new Promise((resolve7, reject) => {
      if (!stream)
        return reject();
      stream.once(STR_END, () => {
        if (this.fsw.closed) {
          stream = void 0;
          return;
        }
        const wasThrottled = throttler ? throttler.clear() : false;
        resolve7(void 0);
        previous.getChildren().filter((item) => {
          return item !== directory && !current.has(item);
        }).forEach((item) => {
          this.fsw._remove(directory, item);
        });
        stream = void 0;
        if (wasThrottled)
          this._handleRead(directory, false, wh, target, dir, depth, throttler);
      });
    });
  }
  /**
   * Read directory to add / remove files from `@watched` list and re-read it on change.
   * @param dir fs path
   * @param stats
   * @param initialAdd
   * @param depth relative to user-supplied path
   * @param target child path targeted for watch
   * @param wh Common watch helpers for this path
   * @param realpath
   * @returns closer for the watcher instance.
   */
  async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath2) {
    const parentDir = this.fsw._getWatchedDir(sp.dirname(dir));
    const tracked = parentDir.has(sp.basename(dir));
    if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
      this.fsw._emit(EV.ADD_DIR, dir, stats);
    }
    parentDir.add(sp.basename(dir));
    this.fsw._getWatchedDir(dir);
    let throttler;
    let closer;
    const oDepth = this.fsw.options.depth;
    if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath2)) {
      if (!target) {
        await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
        if (this.fsw.closed)
          return;
      }
      closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
        if (stats2 && stats2.mtimeMs === 0)
          return;
        this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
      });
    }
    return closer;
  }
  /**
   * Handle added file, directory, or glob pattern.
   * Delegates call to _handleFile / _handleDir after checks.
   * @param path to file or ir
   * @param initialAdd was the file added at watch instantiation?
   * @param priorWh depth relative to user-supplied path
   * @param depth Child path actually targeted for watch
   * @param target Child path actually targeted for watch
   */
  async _addToNodeFs(path8, initialAdd, priorWh, depth, target) {
    const ready = this.fsw._emitReady;
    if (this.fsw._isIgnored(path8) || this.fsw.closed) {
      ready();
      return false;
    }
    const wh = this.fsw._getWatchHelpers(path8);
    if (priorWh) {
      wh.filterPath = (entry) => priorWh.filterPath(entry);
      wh.filterDir = (entry) => priorWh.filterDir(entry);
    }
    try {
      const stats = await statMethods[wh.statMethod](wh.watchPath);
      if (this.fsw.closed)
        return;
      if (this.fsw._isIgnored(wh.watchPath, stats)) {
        ready();
        return false;
      }
      const follow = this.fsw.options.followSymlinks;
      let closer;
      if (stats.isDirectory()) {
        const absPath = sp.resolve(path8);
        const targetPath = follow ? await fsrealpath(path8) : path8;
        if (this.fsw.closed)
          return;
        closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (absPath !== targetPath && targetPath !== void 0) {
          this.fsw._symlinkPaths.set(absPath, targetPath);
        }
      } else if (stats.isSymbolicLink()) {
        const targetPath = follow ? await fsrealpath(path8) : path8;
        if (this.fsw.closed)
          return;
        const parent = sp.dirname(wh.watchPath);
        this.fsw._getWatchedDir(parent).add(wh.watchPath);
        this.fsw._emit(EV.ADD, wh.watchPath, stats);
        closer = await this._handleDir(parent, stats, initialAdd, depth, path8, wh, targetPath);
        if (this.fsw.closed)
          return;
        if (targetPath !== void 0) {
          this.fsw._symlinkPaths.set(sp.resolve(path8), targetPath);
        }
      } else {
        closer = this._handleFile(wh.watchPath, stats, initialAdd);
      }
      ready();
      if (closer)
        this.fsw._addPathCloser(path8, closer);
      return false;
    } catch (error2) {
      if (this.fsw._handleError(error2)) {
        ready();
        return path8;
      }
    }
  }
};

// www/node_modules/chokidar/index.js
var SLASH = "/";
var SLASH_SLASH = "//";
var ONE_DOT = ".";
var TWO_DOTS = "..";
var STRING_TYPE = "string";
var BACK_SLASH_RE = /\\/g;
var DOUBLE_SLASH_RE = /\/\//g;
var DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
var REPLACER_RE = /^\.[/\\]/;
function arrify(item) {
  return Array.isArray(item) ? item : [item];
}
var isMatcherObject = (matcher) => typeof matcher === "object" && matcher !== null && !(matcher instanceof RegExp);
function createPattern(matcher) {
  if (typeof matcher === "function")
    return matcher;
  if (typeof matcher === "string")
    return (string) => matcher === string;
  if (matcher instanceof RegExp)
    return (string) => matcher.test(string);
  if (typeof matcher === "object" && matcher !== null) {
    return (string) => {
      if (matcher.path === string)
        return true;
      if (matcher.recursive) {
        const relative3 = sp2.relative(matcher.path, string);
        if (!relative3) {
          return false;
        }
        return !relative3.startsWith("..") && !sp2.isAbsolute(relative3);
      }
      return false;
    };
  }
  return () => false;
}
function normalizePath(path8) {
  if (typeof path8 !== "string")
    throw new Error("string expected");
  path8 = sp2.normalize(path8);
  path8 = path8.replace(/\\/g, "/");
  let prepend = false;
  if (path8.startsWith("//"))
    prepend = true;
  path8 = path8.replace(DOUBLE_SLASH_RE, "/");
  if (prepend)
    path8 = "/" + path8;
  return path8;
}
function matchPatterns(patterns, testString, stats) {
  const path8 = normalizePath(testString);
  for (let index = 0; index < patterns.length; index++) {
    const pattern = patterns[index];
    if (pattern(path8, stats)) {
      return true;
    }
  }
  return false;
}
function anymatch(matchers, testString) {
  if (matchers == null) {
    throw new TypeError("anymatch: specify first argument");
  }
  const matchersArray = arrify(matchers);
  const patterns = matchersArray.map((matcher) => createPattern(matcher));
  if (testString == null) {
    return (testString2, stats) => {
      return matchPatterns(patterns, testString2, stats);
    };
  }
  return matchPatterns(patterns, testString);
}
var unifyPaths = (paths_) => {
  const paths = arrify(paths_).flat();
  if (!paths.every((p2) => typeof p2 === STRING_TYPE)) {
    throw new TypeError(`Non-string provided as watch path: ${paths}`);
  }
  return paths.map(normalizePathToUnix);
};
var toUnix = (string) => {
  let str = string.replace(BACK_SLASH_RE, SLASH);
  let prepend = false;
  if (str.startsWith(SLASH_SLASH)) {
    prepend = true;
  }
  str = str.replace(DOUBLE_SLASH_RE, SLASH);
  if (prepend) {
    str = SLASH + str;
  }
  return str;
};
var normalizePathToUnix = (path8) => toUnix(sp2.normalize(toUnix(path8)));
var normalizeIgnored = (cwd = "") => (path8) => {
  if (typeof path8 === "string") {
    return normalizePathToUnix(sp2.isAbsolute(path8) ? path8 : sp2.join(cwd, path8));
  } else {
    return path8;
  }
};
var getAbsolutePath = (path8, cwd) => {
  if (sp2.isAbsolute(path8)) {
    return path8;
  }
  return sp2.join(cwd, path8);
};
var EMPTY_SET = Object.freeze(/* @__PURE__ */ new Set());
var DirEntry = class {
  path;
  _removeWatcher;
  items;
  constructor(dir, removeWatcher) {
    this.path = dir;
    this._removeWatcher = removeWatcher;
    this.items = /* @__PURE__ */ new Set();
  }
  add(item) {
    const { items } = this;
    if (!items)
      return;
    if (item !== ONE_DOT && item !== TWO_DOTS)
      items.add(item);
  }
  async remove(item) {
    const { items } = this;
    if (!items)
      return;
    items.delete(item);
    if (items.size > 0)
      return;
    const dir = this.path;
    try {
      await readdir2(dir);
    } catch (err) {
      if (this._removeWatcher) {
        this._removeWatcher(sp2.dirname(dir), sp2.basename(dir));
      }
    }
  }
  has(item) {
    const { items } = this;
    if (!items)
      return;
    return items.has(item);
  }
  getChildren() {
    const { items } = this;
    if (!items)
      return [];
    return [...items.values()];
  }
  dispose() {
    this.items.clear();
    this.path = "";
    this._removeWatcher = EMPTY_FN;
    this.items = EMPTY_SET;
    Object.freeze(this);
  }
};
var STAT_METHOD_F = "stat";
var STAT_METHOD_L = "lstat";
var WatchHelper = class {
  fsw;
  path;
  watchPath;
  fullWatchPath;
  dirParts;
  followSymlinks;
  statMethod;
  constructor(path8, follow, fsw) {
    this.fsw = fsw;
    const watchPath = path8;
    this.path = path8 = path8.replace(REPLACER_RE, "");
    this.watchPath = watchPath;
    this.fullWatchPath = sp2.resolve(watchPath);
    this.dirParts = [];
    this.dirParts.forEach((parts) => {
      if (parts.length > 1)
        parts.pop();
    });
    this.followSymlinks = follow;
    this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
  }
  entryPath(entry) {
    return sp2.join(this.watchPath, sp2.relative(this.watchPath, entry.fullPath));
  }
  filterPath(entry) {
    const { stats } = entry;
    if (stats && stats.isSymbolicLink())
      return this.filterDir(entry);
    const resolvedPath = this.entryPath(entry);
    return this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
  }
  filterDir(entry) {
    return this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
  }
};
var FSWatcher = class extends EventEmitter {
  closed;
  options;
  _closers;
  _ignoredPaths;
  _throttled;
  _streams;
  _symlinkPaths;
  _watched;
  _pendingWrites;
  _pendingUnlinks;
  _readyCount;
  _emitReady;
  _closePromise;
  _userIgnored;
  _readyEmitted;
  _emitRaw;
  _boundRemove;
  _nodeFsHandler;
  // Not indenting methods for history sake; for now.
  constructor(_opts = {}) {
    super();
    this.closed = false;
    this._closers = /* @__PURE__ */ new Map();
    this._ignoredPaths = /* @__PURE__ */ new Set();
    this._throttled = /* @__PURE__ */ new Map();
    this._streams = /* @__PURE__ */ new Set();
    this._symlinkPaths = /* @__PURE__ */ new Map();
    this._watched = /* @__PURE__ */ new Map();
    this._pendingWrites = /* @__PURE__ */ new Map();
    this._pendingUnlinks = /* @__PURE__ */ new Map();
    this._readyCount = 0;
    this._readyEmitted = false;
    const awf = _opts.awaitWriteFinish;
    const DEF_AWF = { stabilityThreshold: 2e3, pollInterval: 100 };
    const opts = {
      // Defaults
      persistent: true,
      ignoreInitial: false,
      ignorePermissionErrors: false,
      interval: 100,
      binaryInterval: 300,
      followSymlinks: true,
      usePolling: false,
      // useAsync: false,
      atomic: true,
      // NOTE: overwritten later (depends on usePolling)
      ..._opts,
      // Change format
      ignored: _opts.ignored ? arrify(_opts.ignored) : arrify([]),
      awaitWriteFinish: awf === true ? DEF_AWF : typeof awf === "object" ? { ...DEF_AWF, ...awf } : false
    };
    if (isIBMi)
      opts.usePolling = true;
    if (opts.atomic === void 0)
      opts.atomic = !opts.usePolling;
    const envPoll = process.env.CHOKIDAR_USEPOLLING;
    if (envPoll !== void 0) {
      const envLower = envPoll.toLowerCase();
      if (envLower === "false" || envLower === "0")
        opts.usePolling = false;
      else if (envLower === "true" || envLower === "1")
        opts.usePolling = true;
      else
        opts.usePolling = !!envLower;
    }
    const envInterval = process.env.CHOKIDAR_INTERVAL;
    if (envInterval)
      opts.interval = Number.parseInt(envInterval, 10);
    let readyCalls = 0;
    this._emitReady = () => {
      readyCalls++;
      if (readyCalls >= this._readyCount) {
        this._emitReady = EMPTY_FN;
        this._readyEmitted = true;
        process.nextTick(() => this.emit(EVENTS.READY));
      }
    };
    this._emitRaw = (...args) => this.emit(EVENTS.RAW, ...args);
    this._boundRemove = this._remove.bind(this);
    this.options = opts;
    this._nodeFsHandler = new NodeFsHandler(this);
    Object.freeze(opts);
  }
  _addIgnoredPath(matcher) {
    if (isMatcherObject(matcher)) {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher.path && ignored.recursive === matcher.recursive) {
          return;
        }
      }
    }
    this._ignoredPaths.add(matcher);
  }
  _removeIgnoredPath(matcher) {
    this._ignoredPaths.delete(matcher);
    if (typeof matcher === "string") {
      for (const ignored of this._ignoredPaths) {
        if (isMatcherObject(ignored) && ignored.path === matcher) {
          this._ignoredPaths.delete(ignored);
        }
      }
    }
  }
  // Public methods
  /**
   * Adds paths to be watched on an existing FSWatcher instance.
   * @param paths_ file or file list. Other arguments are unused
   */
  add(paths_, _origAdd, _internal) {
    const { cwd } = this.options;
    this.closed = false;
    this._closePromise = void 0;
    let paths = unifyPaths(paths_);
    if (cwd) {
      paths = paths.map((path8) => {
        const absPath = getAbsolutePath(path8, cwd);
        return absPath;
      });
    }
    paths.forEach((path8) => {
      this._removeIgnoredPath(path8);
    });
    this._userIgnored = void 0;
    if (!this._readyCount)
      this._readyCount = 0;
    this._readyCount += paths.length;
    Promise.all(paths.map(async (path8) => {
      const res = await this._nodeFsHandler._addToNodeFs(path8, !_internal, void 0, 0, _origAdd);
      if (res)
        this._emitReady();
      return res;
    })).then((results) => {
      if (this.closed)
        return;
      results.forEach((item) => {
        if (item)
          this.add(sp2.dirname(item), sp2.basename(_origAdd || item));
      });
    });
    return this;
  }
  /**
   * Close watchers or start ignoring events from specified paths.
   */
  unwatch(paths_) {
    if (this.closed)
      return this;
    const paths = unifyPaths(paths_);
    const { cwd } = this.options;
    paths.forEach((path8) => {
      if (!sp2.isAbsolute(path8) && !this._closers.has(path8)) {
        if (cwd)
          path8 = sp2.join(cwd, path8);
        path8 = sp2.resolve(path8);
      }
      this._closePath(path8);
      this._addIgnoredPath(path8);
      if (this._watched.has(path8)) {
        this._addIgnoredPath({
          path: path8,
          recursive: true
        });
      }
      this._userIgnored = void 0;
    });
    return this;
  }
  /**
   * Close watchers and remove all listeners from watched paths.
   */
  close() {
    if (this._closePromise) {
      return this._closePromise;
    }
    this.closed = true;
    this.removeAllListeners();
    const closers = [];
    this._closers.forEach((closerList) => closerList.forEach((closer) => {
      const promise = closer();
      if (promise instanceof Promise)
        closers.push(promise);
    }));
    this._streams.forEach((stream) => stream.destroy());
    this._userIgnored = void 0;
    this._readyCount = 0;
    this._readyEmitted = false;
    this._watched.forEach((dirent) => dirent.dispose());
    this._closers.clear();
    this._watched.clear();
    this._streams.clear();
    this._symlinkPaths.clear();
    this._throttled.clear();
    this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
    return this._closePromise;
  }
  /**
   * Expose list of watched paths
   * @returns for chaining
   */
  getWatched() {
    const watchList = {};
    this._watched.forEach((entry, dir) => {
      const key = this.options.cwd ? sp2.relative(this.options.cwd, dir) : dir;
      const index = key || ONE_DOT;
      watchList[index] = entry.getChildren().sort();
    });
    return watchList;
  }
  emitWithAll(event, args) {
    this.emit(event, ...args);
    if (event !== EVENTS.ERROR)
      this.emit(EVENTS.ALL, event, ...args);
  }
  // Common helpers
  // --------------
  /**
   * Normalize and emit events.
   * Calling _emit DOES NOT MEAN emit() would be called!
   * @param event Type of event
   * @param path File or directory path
   * @param stats arguments to be passed with event
   * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  async _emit(event, path8, stats) {
    if (this.closed)
      return;
    const opts = this.options;
    if (isWindows)
      path8 = sp2.normalize(path8);
    if (opts.cwd)
      path8 = sp2.relative(opts.cwd, path8);
    const args = [path8];
    if (stats != null)
      args.push(stats);
    const awf = opts.awaitWriteFinish;
    let pw;
    if (awf && (pw = this._pendingWrites.get(path8))) {
      pw.lastChange = /* @__PURE__ */ new Date();
      return this;
    }
    if (opts.atomic) {
      if (event === EVENTS.UNLINK) {
        this._pendingUnlinks.set(path8, [event, ...args]);
        setTimeout(() => {
          this._pendingUnlinks.forEach((entry, path9) => {
            this.emit(...entry);
            this.emit(EVENTS.ALL, ...entry);
            this._pendingUnlinks.delete(path9);
          });
        }, typeof opts.atomic === "number" ? opts.atomic : 100);
        return this;
      }
      if (event === EVENTS.ADD && this._pendingUnlinks.has(path8)) {
        event = EVENTS.CHANGE;
        this._pendingUnlinks.delete(path8);
      }
    }
    if (awf && (event === EVENTS.ADD || event === EVENTS.CHANGE) && this._readyEmitted) {
      const awfEmit = (err, stats2) => {
        if (err) {
          event = EVENTS.ERROR;
          args[0] = err;
          this.emitWithAll(event, args);
        } else if (stats2) {
          if (args.length > 1) {
            args[1] = stats2;
          } else {
            args.push(stats2);
          }
          this.emitWithAll(event, args);
        }
      };
      this._awaitWriteFinish(path8, awf.stabilityThreshold, event, awfEmit);
      return this;
    }
    if (event === EVENTS.CHANGE) {
      const isThrottled = !this._throttle(EVENTS.CHANGE, path8, 50);
      if (isThrottled)
        return this;
    }
    if (opts.alwaysStat && stats === void 0 && (event === EVENTS.ADD || event === EVENTS.ADD_DIR || event === EVENTS.CHANGE)) {
      const fullPath = opts.cwd ? sp2.join(opts.cwd, path8) : path8;
      let stats2;
      try {
        stats2 = await stat3(fullPath);
      } catch (err) {
      }
      if (!stats2 || this.closed)
        return;
      args.push(stats2);
    }
    this.emitWithAll(event, args);
    return this;
  }
  /**
   * Common handler for errors
   * @returns The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
   */
  _handleError(error2) {
    const code = error2 && error2.code;
    if (error2 && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
      this.emit(EVENTS.ERROR, error2);
    }
    return error2 || this.closed;
  }
  /**
   * Helper utility for throttling
   * @param actionType type being throttled
   * @param path being acted upon
   * @param timeout duration of time to suppress duplicate actions
   * @returns tracking object or false if action should be suppressed
   */
  _throttle(actionType, path8, timeout) {
    if (!this._throttled.has(actionType)) {
      this._throttled.set(actionType, /* @__PURE__ */ new Map());
    }
    const action = this._throttled.get(actionType);
    if (!action)
      throw new Error("invalid throttle");
    const actionPath = action.get(path8);
    if (actionPath) {
      actionPath.count++;
      return false;
    }
    let timeoutObject;
    const clear = () => {
      const item = action.get(path8);
      const count = item ? item.count : 0;
      action.delete(path8);
      clearTimeout(timeoutObject);
      if (item)
        clearTimeout(item.timeoutObject);
      return count;
    };
    timeoutObject = setTimeout(clear, timeout);
    const thr = { timeoutObject, clear, count: 0 };
    action.set(path8, thr);
    return thr;
  }
  _incrReadyCount() {
    return this._readyCount++;
  }
  /**
   * Awaits write operation to finish.
   * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
   * @param path being acted upon
   * @param threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
   * @param event
   * @param awfEmit Callback to be called when ready for event to be emitted.
   */
  _awaitWriteFinish(path8, threshold, event, awfEmit) {
    const awf = this.options.awaitWriteFinish;
    if (typeof awf !== "object")
      return;
    const pollInterval = awf.pollInterval;
    let timeoutHandler;
    let fullPath = path8;
    if (this.options.cwd && !sp2.isAbsolute(path8)) {
      fullPath = sp2.join(this.options.cwd, path8);
    }
    const now = /* @__PURE__ */ new Date();
    const writes = this._pendingWrites;
    function awaitWriteFinishFn(prevStat) {
      statcb(fullPath, (err, curStat) => {
        if (err || !writes.has(path8)) {
          if (err && err.code !== "ENOENT")
            awfEmit(err);
          return;
        }
        const now2 = Number(/* @__PURE__ */ new Date());
        if (prevStat && curStat.size !== prevStat.size) {
          writes.get(path8).lastChange = now2;
        }
        const pw = writes.get(path8);
        const df = now2 - pw.lastChange;
        if (df >= threshold) {
          writes.delete(path8);
          awfEmit(void 0, curStat);
        } else {
          timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval, curStat);
        }
      });
    }
    if (!writes.has(path8)) {
      writes.set(path8, {
        lastChange: now,
        cancelWait: () => {
          writes.delete(path8);
          clearTimeout(timeoutHandler);
          return event;
        }
      });
      timeoutHandler = setTimeout(awaitWriteFinishFn, pollInterval);
    }
  }
  /**
   * Determines whether user has asked to ignore this path.
   */
  _isIgnored(path8, stats) {
    if (this.options.atomic && DOT_RE.test(path8))
      return true;
    if (!this._userIgnored) {
      const { cwd } = this.options;
      const ign = this.options.ignored;
      const ignored = (ign || []).map(normalizeIgnored(cwd));
      const ignoredPaths = [...this._ignoredPaths];
      const list = [...ignoredPaths.map(normalizeIgnored(cwd)), ...ignored];
      this._userIgnored = anymatch(list, void 0);
    }
    return this._userIgnored(path8, stats);
  }
  _isntIgnored(path8, stat4) {
    return !this._isIgnored(path8, stat4);
  }
  /**
   * Provides a set of common helpers and properties relating to symlink handling.
   * @param path file or directory pattern being watched
   */
  _getWatchHelpers(path8) {
    return new WatchHelper(path8, this.options.followSymlinks, this);
  }
  // Directory helpers
  // -----------------
  /**
   * Provides directory tracking objects
   * @param directory path of the directory
   */
  _getWatchedDir(directory) {
    const dir = sp2.resolve(directory);
    if (!this._watched.has(dir))
      this._watched.set(dir, new DirEntry(dir, this._boundRemove));
    return this._watched.get(dir);
  }
  // File helpers
  // ------------
  /**
   * Check for read permissions: https://stackoverflow.com/a/11781404/1358405
   */
  _hasReadPermissions(stats) {
    if (this.options.ignorePermissionErrors)
      return true;
    return Boolean(Number(stats.mode) & 256);
  }
  /**
   * Handles emitting unlink events for
   * files and directories, and via recursion, for
   * files and directories within directories that are unlinked
   * @param directory within which the following item is located
   * @param item      base path of item/directory
   */
  _remove(directory, item, isDirectory) {
    const path8 = sp2.join(directory, item);
    const fullPath = sp2.resolve(path8);
    isDirectory = isDirectory != null ? isDirectory : this._watched.has(path8) || this._watched.has(fullPath);
    if (!this._throttle("remove", path8, 100))
      return;
    if (!isDirectory && this._watched.size === 1) {
      this.add(directory, item, true);
    }
    const wp = this._getWatchedDir(path8);
    const nestedDirectoryChildren = wp.getChildren();
    nestedDirectoryChildren.forEach((nested) => this._remove(path8, nested));
    const parent = this._getWatchedDir(directory);
    const wasTracked = parent.has(item);
    parent.remove(item);
    if (this._symlinkPaths.has(fullPath)) {
      this._symlinkPaths.delete(fullPath);
    }
    let relPath = path8;
    if (this.options.cwd)
      relPath = sp2.relative(this.options.cwd, path8);
    if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
      const event = this._pendingWrites.get(relPath).cancelWait();
      if (event === EVENTS.ADD)
        return;
    }
    this._watched.delete(path8);
    this._watched.delete(fullPath);
    const eventName = isDirectory ? EVENTS.UNLINK_DIR : EVENTS.UNLINK;
    if (wasTracked && !this._isIgnored(path8))
      this._emit(eventName, path8);
    this._closePath(path8);
  }
  /**
   * Closes all watchers for a path
   */
  _closePath(path8) {
    this._closeFile(path8);
    const dir = sp2.dirname(path8);
    this._getWatchedDir(dir).remove(sp2.basename(path8));
  }
  /**
   * Closes only file-specific watchers
   */
  _closeFile(path8) {
    const closers = this._closers.get(path8);
    if (!closers)
      return;
    closers.forEach((closer) => closer());
    this._closers.delete(path8);
  }
  _addPathCloser(path8, closer) {
    if (!closer)
      return;
    let list = this._closers.get(path8);
    if (!list) {
      list = [];
      this._closers.set(path8, list);
    }
    list.push(closer);
  }
  _readdirp(root, opts) {
    if (this.closed)
      return;
    const options = { type: EVENTS.ALL, alwaysStat: true, lstat: true, ...opts, depth: 0 };
    let stream = readdirp(root, options);
    this._streams.add(stream);
    stream.once(STR_CLOSE, () => {
      stream = void 0;
    });
    stream.once(STR_END, () => {
      if (stream) {
        this._streams.delete(stream);
        stream = void 0;
      }
    });
    return stream;
  }
};
function watch(paths, options = {}) {
  const watcher = new FSWatcher(options);
  watcher.add(paths);
  return watcher;
}
var chokidar_default = { watch, FSWatcher };

// www/node_modules/@remix-run/assets/dist/lib/watch.js
function createAssetServerWatcher(options) {
  let watcher = chokidar_default.watch([], {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    ...resolveChokidarWatchOptions(options)
  });
  options.onChokidarWatcherCreated?.(watcher);
  let watchedDirectories = /* @__PURE__ */ new Set();
  let watchedTargets = /* @__PURE__ */ new Set();
  for (let event of ["add", "change", "unlink"]) {
    watcher.on(event, (filePath) => {
      options.onFileEvent(filePath, event);
    });
  }
  watcher.on("error", (error2) => {
    console.error("Asset server file system watcher encountered an error.", error2);
  });
  return {
    async close() {
      await watcher.close();
    },
    getWatchedTargets() {
      return [...watchedTargets];
    },
    updateWatchedDirectories(delta) {
      let nextWatchedDirectories = new Set(watchedDirectories);
      for (let directory of delta.add) {
        nextWatchedDirectories.add(directory);
      }
      for (let directory of delta.remove) {
        nextWatchedDirectories.delete(directory);
      }
      let nextTargets = getWatchTargetsForDirectories(options.rootDir, [...nextWatchedDirectories]);
      let targetsToAdd = [...nextTargets].filter((target) => !watchedTargets.has(target));
      let targetsToRemove = [...watchedTargets].filter((target) => !nextTargets.has(target));
      if (targetsToRemove.length > 0) {
        watcher.unwatch(targetsToRemove);
      }
      if (targetsToAdd.length > 0) {
        watcher.add(targetsToAdd);
      }
      watchedDirectories = nextWatchedDirectories;
      watchedTargets = nextTargets;
    }
  };
}
function resolveChokidarWatchOptions(options) {
  return {
    awaitWriteFinish: {
      pollInterval: 10,
      stabilityThreshold: 10
    },
    depth: 0,
    ignored: ["**/.git/**", ...options.ignore ?? []],
    interval: options.pollInterval ?? 100,
    usePolling: options.poll ?? false
  };
}
function getWatchTargetsForDirectories(rootDir, directories) {
  let normalizedRootDir = normalizeFilePath(rootDir);
  let targets = /* @__PURE__ */ new Set();
  let configAncestors = /* @__PURE__ */ new Set();
  for (let directory of directories) {
    let normalizedDirectory = normalizeFilePath(directory).replace(/\/+$/, "");
    targets.add(normalizedDirectory);
    if (!isSameOrDescendantPath2(normalizedDirectory, normalizedRootDir))
      continue;
    for (let ancestor of getAncestorPaths(normalizedDirectory, normalizedRootDir)) {
      configAncestors.add(ancestor);
    }
  }
  for (let ancestor of configAncestors) {
    targets.add(ancestor);
  }
  return targets;
}
function getAncestorPaths(directoryPath, rootDir) {
  let ancestors = [];
  let currentDirectory = directoryPath;
  while (isSameOrDescendantPath2(currentDirectory, rootDir)) {
    ancestors.push(currentDirectory);
    if (currentDirectory === rootDir)
      break;
    let parentDirectory = getFilePathDirectory(currentDirectory);
    if (parentDirectory === currentDirectory)
      break;
    currentDirectory = parentDirectory;
  }
  return ancestors;
}
function isSameOrDescendantPath2(filePath, directoryPath) {
  let normalizedDirectoryPath = directoryPath.replace(/\/+$/, "");
  return filePath === normalizedDirectoryPath || filePath.startsWith(`${normalizedDirectoryPath}/`);
}

// www/node_modules/@remix-run/assets/dist/lib/asset-server.js
var scriptExtensionSet = new Set(supportedScriptExtensions);
var chokidarWatcherByAssetServer = /* @__PURE__ */ new WeakMap();
var watcherByAssetServer = /* @__PURE__ */ new WeakMap();
function createAssetServer(options) {
  let resolvedOptions = resolveAssetServerOptions(options);
  let accessPolicy = createAccessPolicy({
    allow: resolvedOptions.allow,
    deny: resolvedOptions.deny,
    rootDir: resolvedOptions.rootDir
  });
  let watcher = null;
  let chokidarWatcher = null;
  let scriptCompiler = createScriptCompiler({
    buildId: resolvedOptions.buildId,
    define: resolvedOptions.define,
    external: resolvedOptions.external,
    fingerprintAssets: resolvedOptions.fingerprintAssets,
    isAllowed: accessPolicy.isAllowed,
    minify: resolvedOptions.minify,
    onWatchDirectoriesChange: (delta) => {
      if (!watcher)
        return;
      watcher.updateWatchedDirectories(delta);
    },
    rootDir: resolvedOptions.rootDir,
    routes: resolvedOptions.routes,
    sourceMapSourcePaths: resolvedOptions.sourceMapSourcePaths,
    sourceMaps: resolvedOptions.sourceMaps,
    target: resolvedOptions.scriptsTarget,
    watchIgnore: resolvedOptions.watchOptions?.ignore,
    watchMode: resolvedOptions.watchOptions !== null
  });
  let styleCompiler = createStyleCompiler({
    buildId: resolvedOptions.buildId,
    fingerprintAssets: resolvedOptions.fingerprintAssets,
    isAllowed: accessPolicy.isAllowed,
    minify: resolvedOptions.minify,
    onWatchDirectoriesChange: (delta) => {
      if (!watcher)
        return;
      watcher.updateWatchedDirectories(delta);
    },
    rootDir: resolvedOptions.rootDir,
    routes: resolvedOptions.routes,
    sourceMapSourcePaths: resolvedOptions.sourceMapSourcePaths,
    sourceMaps: resolvedOptions.sourceMaps,
    targets: resolvedOptions.stylesTarget,
    watchIgnore: resolvedOptions.watchOptions?.ignore
  });
  if (resolvedOptions.watchOptions) {
    watcher = createAssetServerWatcher({
      ...resolvedOptions.watchOptions,
      onChokidarWatcherCreated(createdWatcher) {
        chokidarWatcher = createdWatcher;
      },
      onFileEvent: handleWatchEvent,
      rootDir: resolvedOptions.rootDir
    });
  }
  async function responseForError(error2) {
    try {
      return await resolvedOptions.onError(error2) ?? internalServerError();
    } catch (error3) {
      console.error(`There was an error in the asset server error handler: ${error3}`);
      return internalServerError();
    }
  }
  async function handleWatchEvent(filePath, event) {
    try {
      let normalizedFilePath = normalizeFilePath(filePath);
      await scriptCompiler.handleFileEvent(normalizedFilePath, event);
      await styleCompiler.handleFileEvent(normalizedFilePath, event);
    } catch (error2) {
      console.error(`There was an error invalidating the asset server cache: ${error2}`);
    }
  }
  let assetServer = {
    async fetch(request) {
      if (request.method !== "GET" && request.method !== "HEAD")
        return null;
      let parsedRequestPathname = parseAssetRequestPathname(new URL(request.url).pathname, {
        fingerprintAssets: resolvedOptions.fingerprintAssets,
        routes: resolvedOptions.routes
      });
      if (!parsedRequestPathname)
        return null;
      try {
        let ifNoneMatch = request.headers.get("If-None-Match");
        if (isStyleFilePath2(parsedRequestPathname.filePath)) {
          let styleResult = await styleCompiler.getStyle(parsedRequestPathname.filePath, {
            ifNoneMatch,
            isSourceMapRequest: parsedRequestPathname.isSourceMapRequest,
            requestedFingerprint: parsedRequestPathname.requestedFingerprint
          });
          if (styleResult.type === "not-modified") {
            return new Response(null, {
              status: 304,
              headers: { ETag: styleResult.etag }
            });
          }
          let compiledStyle = styleResult.style;
          if (parsedRequestPathname.requestedFingerprint !== null) {
            if (compiledStyle.fingerprint !== parsedRequestPathname.requestedFingerprint)
              return null;
          }
          return createResponseForStyle(compiledStyle, {
            cacheControl: parsedRequestPathname.cacheControl,
            ifNoneMatch,
            isSourceMapRequest: parsedRequestPathname.isSourceMapRequest,
            method: request.method
          });
        }
        if (!isScriptFilePath(parsedRequestPathname.filePath)) {
          return null;
        }
        let scriptResult = await scriptCompiler.getScript(parsedRequestPathname.filePath, {
          ifNoneMatch,
          isSourceMapRequest: parsedRequestPathname.isSourceMapRequest,
          requestedFingerprint: parsedRequestPathname.requestedFingerprint
        });
        if (scriptResult.type === "not-modified") {
          return new Response(null, {
            status: 304,
            headers: { ETag: scriptResult.etag }
          });
        }
        let compiledScript = scriptResult.script;
        if (parsedRequestPathname.requestedFingerprint !== null) {
          if (compiledScript.fingerprint !== parsedRequestPathname.requestedFingerprint)
            return null;
        }
        return createResponseForScript(compiledScript, {
          cacheControl: parsedRequestPathname.cacheControl,
          ifNoneMatch,
          isSourceMapRequest: parsedRequestPathname.isSourceMapRequest,
          method: request.method
        });
      } catch (error2) {
        if (isAssetServerCompilationError(error2) && (error2.code === "FILE_NOT_FOUND" || error2.code === "FILE_NOT_ALLOWED")) {
          return null;
        }
        return responseForError(error2);
      }
    },
    async getHref(filePath) {
      if (isStyleFilePath2(filePath)) {
        return styleCompiler.getHref(filePath);
      }
      return scriptCompiler.getHref(filePath);
    },
    async getPreloads(filePath) {
      let filePaths = Array.isArray(filePath) ? filePath : [filePath];
      let styleFiles = [];
      let scriptFiles = [];
      for (let nextFilePath of filePaths) {
        if (isStyleFilePath2(nextFilePath)) {
          styleFiles.push(nextFilePath);
          continue;
        }
        scriptFiles.push(nextFilePath);
      }
      if (styleFiles.length === 0 && scriptFiles.length === 0) {
        return [];
      }
      if (styleFiles.length === 0) {
        return flattenPreloadLayers(await scriptCompiler.getPreloadLayers(filePath));
      }
      if (scriptFiles.length === 0) {
        return flattenPreloadLayers(await styleCompiler.getPreloadLayers(filePath));
      }
      let scriptPreloadLayersPromise = scriptCompiler.getPreloadLayers(scriptFiles);
      let stylePreloadLayersPromise = styleCompiler.getPreloadLayers(styleFiles);
      let preloadLayerGroups = isStyleFilePath2(filePaths[0]) ? [stylePreloadLayersPromise, scriptPreloadLayersPromise] : [scriptPreloadLayersPromise, stylePreloadLayersPromise];
      return mergePreloadLayers(await Promise.all(preloadLayerGroups));
    },
    async close() {
      await watcher?.close();
    }
  };
  if (chokidarWatcher) {
    chokidarWatcherByAssetServer.set(assetServer, chokidarWatcher);
  }
  if (watcher) {
    watcherByAssetServer.set(assetServer, watcher);
  }
  return assetServer;
}
function internalServerError() {
  return new Response("Internal Server Error", {
    status: 500,
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
}
function mergePreloadLayers(preloadLayersByRoot) {
  let urls = [];
  let seen = /* @__PURE__ */ new Set();
  let maxDepth = Math.max(0, ...preloadLayersByRoot.map((layers) => layers.length));
  for (let depth = 0; depth < maxDepth; depth++) {
    for (let preloadLayers of preloadLayersByRoot) {
      for (let url of preloadLayers[depth] ?? []) {
        if (seen.has(url))
          continue;
        seen.add(url);
        urls.push(url);
      }
    }
  }
  return urls;
}
function flattenPreloadLayers(preloadLayers) {
  return preloadLayers.flatMap((layer) => layer);
}
function defaultErrorHandler(error2) {
  console.error(error2);
}
function resolveAssetServerOptions(options) {
  let rootDir = normalizeFilePath(fs8.realpathSync(path7.resolve(options.rootDir ?? process.cwd())));
  let basePath = normalizeBasePath(options.basePath);
  let scriptOptions = options.scripts ?? {};
  let fingerprintOptions = normalizeFingerprintOptions({
    fingerprint: options.fingerprint,
    watch: options.watch
  });
  return {
    allow: options.allow,
    basePath,
    buildId: fingerprintOptions.buildId,
    define: scriptOptions.define,
    deny: options.deny,
    external: scriptOptions.external ?? [],
    fingerprintAssets: fingerprintOptions.enabled,
    minify: options.minify ?? false,
    onError: options.onError ?? defaultErrorHandler,
    rootDir,
    routes: compileRoutes(basePath, [
      {
        fileMap: options.fileMap,
        rootDir
      },
      ...getInjectedPackageRouteConfigs()
    ]),
    sourceMapSourcePaths: options.sourceMapSourcePaths ?? "url",
    sourceMaps: options.sourceMaps,
    scriptsTarget: resolveScriptTarget(options.target),
    stylesTarget: resolveStyleTarget(options.target),
    watchOptions: normalizeWatchOptions(options.watch)
  };
}
function normalizeBasePath(basePath) {
  if (typeof basePath !== "string") {
    throw new TypeError("basePath must be a string");
  }
  return normalizePathname(basePath || "/").replace(/\/+$/, "") || "/";
}
function normalizeFingerprintOptions(options) {
  if (!options.fingerprint) {
    return {
      enabled: false
    };
  }
  if (typeof options.fingerprint.buildId !== "string") {
    throw new TypeError("fingerprint.buildId must be a string");
  }
  if (options.fingerprint.buildId.length === 0) {
    throw new TypeError("fingerprint.buildId must be a non-empty string");
  }
  if (options.watch !== false) {
    throw new TypeError("fingerprint cannot be used with watch mode");
  }
  return {
    enabled: true,
    buildId: options.fingerprint.buildId
  };
}
function normalizeWatchOptions(options) {
  if (options === false)
    return null;
  if (options == null || options === true)
    return {};
  return options;
}
function parseAssetRequestPathname(pathname, options) {
  let isSourceMapRequest = pathname.endsWith(".map");
  let pathWithoutMap = isSourceMapRequest ? pathname.slice(0, -4) : pathname;
  let fingerprint = parseFingerprintSuffix(pathWithoutMap);
  let filePath = options.routes.resolveUrlPathname(fingerprint.pathname);
  if (!filePath)
    return null;
  if (options.fingerprintAssets && fingerprint.requestedFingerprint === null)
    return null;
  return {
    cacheControl: getFingerprintRequestCacheControl(fingerprint.requestedFingerprint),
    filePath,
    isSourceMapRequest,
    requestedFingerprint: fingerprint.requestedFingerprint
  };
}
function isScriptFilePath(filePath) {
  return scriptExtensionSet.has(path7.extname(filePath).toLowerCase());
}

// www/app/assets.ts
var assets = createAssetServer({
  basePath: "/assets",
  rootDir: process.cwd(),
  fileMap: {
    "app/*path": "app/*path",
    "node_modules/*path": "node_modules/*path"
  },
  allow: ["app/assets/**", "app/ui/prompt-button.tsx", "node_modules/**"],
  deny: ["app/**/*.server.*"],
  sourceMaps: process.env.NODE_ENV === "development" ? "external" : void 0,
  scripts: {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV ?? "development")
    }
  }
});

// www/node_modules/@remix-run/ui/dist/runtime/jsx.js
function jsx(type, props, key) {
  return { type, props: normalizeElementProps(props), key, $rmx: true };
}
function normalizeElementProps(props) {
  if (!props)
    return {};
  if (!("mix" in props))
    return props;
  let { mix, ...rest } = props;
  let normalizedMix = normalizeMixValue(mix);
  return normalizedMix === void 0 ? rest : { ...rest, mix: normalizedMix };
}
function normalizeMixValue(mix) {
  if (!mix)
    return void 0;
  let normalizedMix = [];
  flattenMixValue(mix, normalizedMix);
  return normalizedMix.length === 0 ? void 0 : normalizedMix;
}
function flattenMixValue(mix, out) {
  if (!mix)
    return;
  if (!Array.isArray(mix)) {
    out.push(mix);
    return;
  }
  for (let item of mix) {
    flattenMixValue(item, out);
  }
}

// www/node_modules/@remix-run/ui/dist/runtime/typed-event-target.js
var TypedEventTarget = class extends EventTarget {
};

// www/node_modules/@remix-run/ui/dist/runtime/component.js
function createComponent(config) {
  let taskQueue = [];
  let renderCtrl = null;
  let connectedCtrl = null;
  let contextValue = void 0;
  function getConnectedSignal() {
    if (!connectedCtrl)
      connectedCtrl = new AbortController();
    return connectedCtrl.signal;
  }
  let getContent = null;
  let scheduleUpdate = () => {
    throw new Error("scheduleUpdate not implemented");
  };
  let props = {};
  let context = {
    set: (value) => {
      contextValue = value;
    },
    get: (type) => config.getContext(type)
  };
  let handle = {
    id: config.id,
    props,
    update: () => new Promise((resolve7) => {
      taskQueue.push((signal) => resolve7(signal));
      scheduleUpdate();
    }),
    queueTask: (task) => {
      taskQueue.push(task);
    },
    frame: config.frame,
    frames: {
      get top() {
        return config.getTopFrame?.() ?? config.frame;
      },
      get(name) {
        return config.getFrameByName(name);
      }
    },
    context,
    get signal() {
      return config.signal ?? getConnectedSignal();
    }
  };
  function dequeueTasks() {
    let needsSignal = taskQueue.some((task) => task.length >= 1);
    if (needsSignal && !renderCtrl) {
      renderCtrl = new AbortController();
    }
    let signal = renderCtrl?.signal;
    return taskQueue.splice(0, taskQueue.length).map((task) => () => task(signal));
  }
  function render2(props2) {
    if (connectedCtrl?.signal.aborted) {
      console.warn("render called after component was removed, potential application memory leak");
      return [null, []];
    }
    if (renderCtrl) {
      renderCtrl.abort();
      renderCtrl = null;
    }
    syncProps(handle.props, props2);
    let renderContent = getContent;
    if (!renderContent) {
      let result = config.type(handle);
      if (typeof result !== "function") {
        let name = config.type.name || "Anonymous";
        throw new Error(`${name} must return a render function, received ${typeof result}`);
      } else {
        getContent = result;
        renderContent = result;
      }
    }
    if (!renderContent) {
      throw new Error("component render function was not initialized");
    }
    let node = renderContent(handle.props);
    return [node, dequeueTasks()];
  }
  function remove() {
    connectedCtrl?.abort();
    renderCtrl?.abort();
    return dequeueTasks();
  }
  function setScheduleUpdate(nextScheduleUpdate) {
    scheduleUpdate = nextScheduleUpdate;
  }
  function getContextValue() {
    return contextValue;
  }
  return { render: render2, remove, setScheduleUpdate, frame: config.frame, getContextValue };
}
function syncProps(target, next) {
  for (let key in target) {
    if (!(key in next)) {
      delete target[key];
    }
  }
  for (let key in next) {
    target[key] = next[key];
  }
}
function Frame(handle) {
  void handle;
  return () => null;
}
function Fragment(handle) {
  void handle;
  return () => null;
}
function createFrameHandle(def) {
  return Object.assign(new TypedEventTarget(), {
    src: "/",
    replace: notImplemented("replace not implemented"),
    reload: notImplemented("reload not implemented")
  }, def);
}
function notImplemented(msg) {
  return () => {
    throw new Error(msg);
  };
}

// www/node_modules/@remix-run/ui/dist/runtime/invariant.js
function invariant(assertion, message) {
  let prefix = "Framework invariant";
  if (assertion)
    return;
  throw new Error(message ? `${prefix}: ${message}` : prefix);
}

// www/node_modules/@remix-run/ui/dist/style/style.js
function camelToKebab(str) {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
var NUMERIC_CSS_PROPS = /* @__PURE__ */ new Set([
  "aspect-ratio",
  "z-index",
  "opacity",
  "flex-grow",
  "flex-shrink",
  "flex-order",
  "grid-area",
  "grid-row",
  "grid-column",
  "font-weight",
  "line-height",
  "order",
  "orphans",
  "widows",
  "zoom",
  "columns",
  "column-count"
]);
function normalizeCssValue(key, value) {
  if (value == null)
    return String(value);
  if (typeof value === "number" && value !== 0) {
    let cssKey = camelToKebab(key);
    if (!NUMERIC_CSS_PROPS.has(cssKey) && !cssKey.startsWith("--")) {
      return `${value}px`;
    }
  }
  return String(value);
}
function isComplexSelector(key) {
  return key.startsWith("&") || key.startsWith("@") || key.startsWith(":") || key.startsWith("[") || key.startsWith(".");
}
function isKeyframesAtRule(key) {
  if (!key.startsWith("@"))
    return false;
  let lower = key.toLowerCase();
  return lower.startsWith("@keyframes") || lower.startsWith("@-webkit-keyframes") || lower.startsWith("@-moz-keyframes") || lower.startsWith("@-o-keyframes");
}
function hashStyle(obj) {
  let sortedEntries = Object.entries(obj).sort(([a2], [b]) => a2.localeCompare(b));
  let str = JSON.stringify(sortedEntries);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}
function styleToCss(styles, selector = "") {
  let baseDeclarations = [];
  let nestedBlocks = [];
  let atRules = [];
  let preludeAtRules = [];
  for (let [key, value] of Object.entries(styles)) {
    if (isComplexSelector(key)) {
      if (key.startsWith("@")) {
        let record2 = toRecord(value);
        if (!record2)
          continue;
        if (key.startsWith("@function")) {
          let body = atRuleBodyToCss(record2);
          if (body.trim().length > 0) {
            preludeAtRules.push(`${key} {
${indent(body, 2)}
}`);
          } else {
            preludeAtRules.push(`${key} {
}`);
          }
        } else if (isKeyframesAtRule(key)) {
          let body = keyframesBodyToCss(record2);
          if (body.trim().length > 0) {
            preludeAtRules.push(`${key} {
${indent(body, 2)}
}`);
          } else {
            preludeAtRules.push(`${key} {
}`);
          }
        } else {
          let inner = styleToCss(record2, selector);
          if (inner.trim().length > 0) {
            atRules.push(`${key} {
${indent(inner, 2)}
}`);
          } else {
            atRules.push(`${key} {
  ${selector} {
  }
}`);
          }
        }
        continue;
      }
      let record = toRecord(value);
      if (!record)
        continue;
      let nestedContent = "";
      for (let [prop, propValue] of Object.entries(record)) {
        if (propValue != null) {
          let normalizedValue = normalizeCssValue(prop, propValue);
          nestedContent += `    ${camelToKebab(prop)}: ${normalizedValue};
`;
        }
      }
      if (nestedContent) {
        nestedBlocks.push(`  ${key} {
${nestedContent}  }`);
      }
    } else {
      if (value != null) {
        let normalizedValue = normalizeCssValue(key, value);
        baseDeclarations.push(`  ${camelToKebab(key)}: ${normalizedValue};`);
      }
    }
  }
  let css2 = "";
  if (preludeAtRules.length > 0) {
    css2 += preludeAtRules.join("\n");
  }
  if (selector && (baseDeclarations.length > 0 || nestedBlocks.length > 0)) {
    css2 += (css2 ? "\n" : "") + `${selector} {
`;
    if (baseDeclarations.length > 0) {
      css2 += baseDeclarations.join("\n") + "\n";
    }
    if (nestedBlocks.length > 0) {
      css2 += nestedBlocks.join("\n") + "\n";
    }
    css2 += "}";
  }
  if (atRules.length > 0) {
    css2 += (css2 ? "\n" : "") + atRules.join("\n");
  }
  return css2;
}
function indent(text, spaces) {
  let pad = " ".repeat(spaces);
  return text.split("\n").map((line) => line.length ? pad + line : line).join("\n");
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function toRecord(value) {
  return isRecord(value) ? value : null;
}
function keyframesBodyToCss(frames) {
  let blocks = [];
  for (let [frameSelector, frameValue] of Object.entries(frames)) {
    if (!isRecord(frameValue)) {
      continue;
    }
    let declarations = [];
    for (let [prop, propValue] of Object.entries(frameValue)) {
      if (propValue == null)
        continue;
      if (isComplexSelector(prop))
        continue;
      let normalizedValue = normalizeCssValue(prop, propValue);
      declarations.push(`  ${camelToKebab(prop)}: ${normalizedValue};`);
    }
    if (declarations.length > 0) {
      blocks.push(`${frameSelector} {
${declarations.join("\n")}
}`);
    } else {
      blocks.push(`${frameSelector} {
}`);
    }
  }
  return blocks.join("\n");
}
function atRuleBodyToCss(styles) {
  let declarations = [];
  let nested = [];
  for (let [key, value] of Object.entries(styles)) {
    if (isComplexSelector(key)) {
      if (key.startsWith("@")) {
        let record = toRecord(value);
        if (!record)
          continue;
        let inner = atRuleBodyToCss(record);
        if (inner.trim().length > 0) {
          nested.push(`${key} {
${indent(inner, 2)}
}`);
        } else {
          nested.push(`${key} {
}`);
        }
      } else {
        continue;
      }
    } else {
      if (value != null) {
        let normalizedValue = normalizeCssValue(key, value);
        declarations.push(`  ${camelToKebab(key)}: ${normalizedValue};`);
      }
    }
  }
  let body = "";
  if (declarations.length > 0) {
    body += declarations.join("\n");
  }
  if (nested.length > 0) {
    body += (body ? "\n" : "") + nested.join("\n");
  }
  return body;
}
function processStyleClass(styleObj, styleCache) {
  if (Object.keys(styleObj).length === 0) {
    return { selector: "", css: "" };
  }
  let hash = hashStyle(styleObj);
  let selector = `rmxc-${hash}`;
  let cached = styleCache.get(hash);
  if (cached) {
    return cached;
  }
  let css2 = styleToCss(styleObj, `.${selector}`);
  let result = { selector, css: css2 };
  styleCache.set(hash, result);
  return result;
}

// www/node_modules/@remix-run/ui/dist/runtime/svg-attributes.js
var XLINK_NS = "http://www.w3.org/1999/xlink";
var XML_NS = "http://www.w3.org/XML/1998/namespace";
var CANONICAL_CAMEL_SVG_ATTRS = /* @__PURE__ */ new Set([
  "accentHeight",
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "viewBox",
  "preserveAspectRatio",
  "externalResourcesRequired",
  "filterRes",
  "gradientUnits",
  "gradientTransform",
  "glyphRef",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "patternUnits",
  "patternContentUnits",
  "patternTransform",
  "markerWidth",
  "numOctaves",
  "pathLength",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "clipPathUnits",
  "maskUnits",
  "maskContentUnits",
  "filterUnits",
  "primitiveUnits",
  "refX",
  "refY",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan",
  "edgeMode",
  "diffuseConstant",
  "markerUnits"
]);
var SVG_ATTR_ALIASES = /* @__PURE__ */ new Map();
for (let attr of CANONICAL_CAMEL_SVG_ATTRS) {
  SVG_ATTR_ALIASES.set(camelToKebab2(attr), attr);
}
var NAMESPACED_SVG_ALIASES = /* @__PURE__ */ new Map([
  ["xlinkHref", { ns: XLINK_NS, attr: "xlink:href" }],
  ["xlink:href", { ns: XLINK_NS, attr: "xlink:href" }],
  ["xlink-href", { ns: XLINK_NS, attr: "xlink:href" }],
  ["xlinkActuate", { ns: XLINK_NS, attr: "xlink:actuate" }],
  ["xlink:actuate", { ns: XLINK_NS, attr: "xlink:actuate" }],
  ["xlink-actuate", { ns: XLINK_NS, attr: "xlink:actuate" }],
  ["xlinkArcrole", { ns: XLINK_NS, attr: "xlink:arcrole" }],
  ["xlink:arcrole", { ns: XLINK_NS, attr: "xlink:arcrole" }],
  ["xlink-arcrole", { ns: XLINK_NS, attr: "xlink:arcrole" }],
  ["xlinkRole", { ns: XLINK_NS, attr: "xlink:role" }],
  ["xlink:role", { ns: XLINK_NS, attr: "xlink:role" }],
  ["xlink-role", { ns: XLINK_NS, attr: "xlink:role" }],
  ["xlinkShow", { ns: XLINK_NS, attr: "xlink:show" }],
  ["xlink:show", { ns: XLINK_NS, attr: "xlink:show" }],
  ["xlink-show", { ns: XLINK_NS, attr: "xlink:show" }],
  ["xlinkTitle", { ns: XLINK_NS, attr: "xlink:title" }],
  ["xlink:title", { ns: XLINK_NS, attr: "xlink:title" }],
  ["xlink-title", { ns: XLINK_NS, attr: "xlink:title" }],
  ["xlinkType", { ns: XLINK_NS, attr: "xlink:type" }],
  ["xlink:type", { ns: XLINK_NS, attr: "xlink:type" }],
  ["xlink-type", { ns: XLINK_NS, attr: "xlink:type" }],
  ["xmlBase", { ns: XML_NS, attr: "xml:base" }],
  ["xml:base", { ns: XML_NS, attr: "xml:base" }],
  ["xml-base", { ns: XML_NS, attr: "xml:base" }],
  ["xmlLang", { ns: XML_NS, attr: "xml:lang" }],
  ["xml:lang", { ns: XML_NS, attr: "xml:lang" }],
  ["xml-lang", { ns: XML_NS, attr: "xml:lang" }],
  ["xmlSpace", { ns: XML_NS, attr: "xml:space" }],
  ["xml:space", { ns: XML_NS, attr: "xml:space" }],
  ["xml-space", { ns: XML_NS, attr: "xml:space" }],
  ["xmlnsXlink", { attr: "xmlns:xlink" }],
  ["xmlns:xlink", { attr: "xmlns:xlink" }],
  ["xmlns-xlink", { attr: "xmlns:xlink" }]
]);
function normalizeSvgAttributeName(name) {
  let alias = SVG_ATTR_ALIASES.get(name);
  if (alias)
    return alias;
  if (CANONICAL_CAMEL_SVG_ATTRS.has(name))
    return name;
  return camelToKebab2(name);
}
function normalizeSvgAttribute(name) {
  let namespaced = NAMESPACED_SVG_ALIASES.get(name);
  if (namespaced) {
    return namespaced;
  }
  return { attr: normalizeSvgAttributeName(name) };
}
function camelToKebab2(input) {
  return input.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/_/g, "-").toLowerCase();
}

// www/node_modules/@remix-run/ui/dist/runtime/client-entries.js
function isEntry(component) {
  return Boolean(component && typeof component === "function" && component.$entry === true);
}

// www/node_modules/@remix-run/ui/dist/runtime/mixins/mixin.js
function renderMixinElement(element, props) {
  let { key, ...rest } = props ?? {};
  return jsx(element, rest, key);
}
function createMixin(type) {
  return (...args) => ({
    type,
    args
  });
}

// www/node_modules/@remix-run/ui/dist/style/css-mixin.js
var clientStyleCache = /* @__PURE__ */ new Map();
var css = createMixin((handle) => {
  let activeSelector = "";
  let activeGeneration = -1;
  let currentStyles = {};
  handle.addEventListener("remove", () => {
    if (!activeSelector)
      return;
    let runtime = handle.frame.$runtime;
    invariant(runtime, "css mixin requires frame runtime");
    let styleTarget = resolveStyleTarget2(runtime);
    styleTarget.styleManager?.remove(activeSelector);
    activeSelector = "";
    activeGeneration = -1;
  });
  return (styles, props) => {
    currentStyles = styles;
    let runtime = handle.frame.$runtime;
    invariant(runtime, "css mixin requires frame runtime");
    let styleTarget = resolveStyleTarget2(runtime);
    let { selector, css: cssText } = processStyleClass(currentStyles, styleTarget.styleCache);
    let styleGeneration = styleTarget.styleManager?.getGeneration?.() ?? 0;
    if (styleTarget.styleManager) {
      if (activeSelector && activeSelector !== selector) {
        styleTarget.styleManager.remove(activeSelector);
      }
      if (selector && (activeSelector !== selector || activeGeneration !== styleGeneration)) {
        styleTarget.styleManager.insert(selector, cssText);
      }
      activeSelector = selector;
      activeGeneration = selector ? styleGeneration : -1;
    }
    if (!selector) {
      return handle.element;
    }
    return renderMixinElement(handle.element, {
      ...props ?? {},
      className: props?.className ? `${props.className} ${selector}` : selector
    });
  };
});
function resolveStyleTarget2(runtime) {
  return {
    styleCache: runtime.styleCache ?? clientStyleCache,
    styleManager: runtime.styleManager
  };
}

// www/node_modules/@remix-run/fetch-router/dist/lib/route-helpers/method.js
function createGetRoute(pattern) {
  return new Route("GET", pattern);
}

// www/app/routes.ts
var routes = createRoutes({
  assets: createGetRoute("/assets/*path"),
  home: "/",
  docs: "/docs",
  install: createGetRoute("/install.sh")
});

// www/app/ui/home-page.tsx
var FONT_STACK = "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
var VERSION = "0.1.0";
function HomePage() {
  return () => /* @__PURE__ */ jsx("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { name: "color-scheme", content: "light dark" }),
      /* @__PURE__ */ jsx("title", { children: "zigc \u2014 C/C++ package manager powered by Zig" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "zigc handles scaffolding, dependency management, build orchestration, and binary inspection for C and C++ projects \u2014 all without writing a build script by hand."
        }
      ),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
        }
      ),
      /* @__PURE__ */ jsx("script", { type: "module", src: routes.assets.href({ path: "app/assets/entry.ts" }) })
    ] }),
    /* @__PURE__ */ jsx("body", { mix: css(bodyStyles), children: /* @__PURE__ */ jsx("main", { mix: css(mainStyles), children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(Features, {}),
      /* @__PURE__ */ jsx(QuickStart, {}),
      /* @__PURE__ */ jsx(Footer, {})
    ] }) })
  ] });
}
function Hero() {
  return () => /* @__PURE__ */ jsx(
    "section",
    {
      "aria-label": "Install zigc",
      mix: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        textAlign: "center"
      }),
      children: [
        /* @__PURE__ */ jsx(
          "h1",
          {
            mix: css({
              margin: 0,
              fontSize: "48px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              "@media (max-width: 600px)": { fontSize: "32px" }
            }),
            children: "zigc"
          }
        ),
        /* @__PURE__ */ jsx(
          "p",
          {
            mix: css({
              margin: 0,
              fontSize: "18px",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              maxWidth: "540px",
              "@media (max-width: 600px)": { fontSize: "15px" }
            }),
            children: [
              "A C and C++ project & package manager built on",
              " ",
              /* @__PURE__ */ jsx("a", { href: "https://ziglang.org/learn/build-system/", mix: css(linkStyles), children: "Zig's build system" }),
              ". Scaffolding, dependencies, builds, and binary inspection \u2014 no build scripts by hand."
            ]
          }
        ),
        /* @__PURE__ */ jsx(InstallBlock, {}),
        /* @__PURE__ */ jsx("p", { mix: css({ margin: 0, fontSize: "12px", color: "var(--text-tertiary)" }), children: [
          "Requires",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://ziglang.org/download/", mix: css(linkStyles), children: "Zig 0.16.0" }),
          " ",
          "\xB7 v",
          VERSION,
          " \xB7",
          " ",
          /* @__PURE__ */ jsx("a", { href: "https://github.com/nathanjmorton/zigc", mix: css(linkStyles), children: "GitHub" })
        ] })
      ]
    }
  );
}
function InstallBlock() {
  return () => /* @__PURE__ */ jsx(
    "div",
    {
      mix: css({
        width: "100%",
        maxWidth: "640px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      }),
      children: [
        /* @__PURE__ */ jsx(
          "code",
          {
            mix: css({
              display: "block",
              background: "var(--surface-3)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "16px 20px",
              fontSize: "14px",
              lineHeight: 1.5,
              color: "var(--text-primary)",
              overflowX: "auto",
              whiteSpace: "nowrap",
              textAlign: "left"
            }),
            children: [
              /* @__PURE__ */ jsx("span", { mix: css({ color: "var(--text-tertiary)" }), children: "$" }),
              " curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            mix: css({
              display: "flex",
              alignItems: "center",
              gap: "8px",
              justifyContent: "center",
              fontSize: "13px",
              color: "var(--text-tertiary)"
            }),
            children: /* @__PURE__ */ jsx("span", { children: "or" })
          }
        ),
        /* @__PURE__ */ jsx(
          "code",
          {
            mix: css({
              display: "block",
              background: "var(--surface-3)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "16px 20px",
              fontSize: "14px",
              lineHeight: 1.5,
              color: "var(--text-primary)",
              overflowX: "auto",
              whiteSpace: "nowrap",
              textAlign: "left"
            }),
            children: [
              /* @__PURE__ */ jsx("span", { mix: css({ color: "var(--text-tertiary)" }), children: "$" }),
              " brew tap nathanjmorton/zigc",
              "\n",
              /* @__PURE__ */ jsx("span", { mix: css({ color: "var(--text-tertiary)" }), children: "$" }),
              " brew install zigc"
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            mix: css({
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              fontSize: "13px",
              color: "var(--text-tertiary)"
            }),
            children: [
              /* @__PURE__ */ jsx("span", { children: "macOS" }),
              /* @__PURE__ */ jsx("span", { children: "\xB7" }),
              /* @__PURE__ */ jsx("span", { children: "Linux" }),
              /* @__PURE__ */ jsx("span", { children: "\xB7" }),
              /* @__PURE__ */ jsx("span", { children: "arm64 / x86_64" })
            ]
          }
        )
      ]
    }
  );
}
var FEATURES = [
  { title: "zigc init", desc: "Scaffold a new C or C++ project with build.zig and package manifest in one command." },
  { title: "zigc add", desc: "Add dependencies by name from the registry or by URL. Linking boilerplate is auto-generated." },
  { title: "zigc build / run", desc: "Compile with flag translation (-O3 \u2192 ReleaseFast, -Wall \u2192 -Dcflags). Cross-compile to WASM with --wasi." },
  { title: "zigc check", desc: "Verify manifest fields, .paths entries, and dependency consistency between build.zig.zon and build.zig." },
  { title: "zigc verify", desc: "Inspect compiled object files, binary format, symbol tables, and confirm dep symbols are linked." },
  { title: "zigc upgrade", desc: "Self-update to the latest release. Downloads the correct binary for your platform from GitHub." }
];
function Features() {
  return () => /* @__PURE__ */ jsx("section", { "aria-label": "Features", mix: css({ width: "100%" }), children: [
    /* @__PURE__ */ jsx("h2", { mix: css(sectionHeadingStyles), children: "What you get" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        mix: css({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px"
        }),
        children: FEATURES.map((f2) => /* @__PURE__ */ jsx(FeatureCard, { title: f2.title, desc: f2.desc }))
      }
    )
  ] });
}
function FeatureCard() {
  return ({ title, desc }) => /* @__PURE__ */ jsx(
    "div",
    {
      mix: css({
        background: "var(--surface-3)",
        borderRadius: "16px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }),
      children: [
        /* @__PURE__ */ jsx(
          "h3",
          {
            mix: css({
              margin: 0,
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--accent)",
              fontFamily: FONT_STACK
            }),
            children: title
          }
        ),
        /* @__PURE__ */ jsx("p", { mix: css({ margin: 0, fontSize: "13px", lineHeight: 1.6, color: "var(--text-secondary)" }), children: desc })
      ]
    }
  );
}
function QuickStart() {
  return () => /* @__PURE__ */ jsx("section", { "aria-label": "Quick start", mix: css({ width: "100%" }), children: [
    /* @__PURE__ */ jsx("h2", { mix: css(sectionHeadingStyles), children: "Quick start" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        mix: css({
          background: "var(--surface-3)",
          borderRadius: "16px",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "4px"
        }),
        children: [
          "zigc init my-app",
          "cd my-app",
          "zigc add lz4",
          "zigc build -O3",
          "zigc run"
        ].map((line) => /* @__PURE__ */ jsx(
          "code",
          {
            mix: css({
              display: "block",
              fontSize: "13px",
              lineHeight: 1.8,
              color: "var(--text-primary)",
              "&::before": { content: '"$ "', color: "var(--text-tertiary)" }
            }),
            children: line
          }
        ))
      }
    ),
    /* @__PURE__ */ jsx(
      "p",
      {
        mix: css({
          marginTop: "16px",
          fontSize: "13px",
          color: "var(--text-tertiary)",
          textAlign: "center"
        }),
        children: /* @__PURE__ */ jsx("a", { href: routes.docs.href(), mix: css(linkStyles), children: "Read the full docs \u2192" })
      }
    )
  ] });
}
function Footer() {
  return () => /* @__PURE__ */ jsx(
    "footer",
    {
      mix: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        fontSize: "12px",
        color: "var(--text-tertiary)",
        textAlign: "center",
        "& a": { color: "var(--text-tertiary)", textDecoration: "underline", textUnderlineOffset: "2px" },
        "& a:hover": { color: "var(--text-primary)" }
      }),
      children: [
        /* @__PURE__ */ jsx("div", { mix: css({ display: "flex", gap: "16px" }), children: [
          /* @__PURE__ */ jsx("a", { href: "https://github.com/nathanjmorton/zigc", children: "GitHub" }),
          /* @__PURE__ */ jsx("a", { href: routes.docs.href(), children: "Docs" })
        ] }),
        /* @__PURE__ */ jsx("p", { mix: css({ margin: 0 }), children: "MIT License" })
      ]
    }
  );
}
var bodyStyles = {
  "--surface-0": "#0c0d10",
  "--surface-3": "#1a1b1f",
  "--border": "#2a2b30",
  "--text-primary": "#e8e8ec",
  "--text-secondary": "#a0a0a8",
  "--text-tertiary": "#6b6b74",
  "--accent": "#f0c040",
  "@media (prefers-color-scheme: light)": {
    "--surface-0": "#f5f5f7",
    "--surface-3": "#e8e8ec",
    "--border": "#d0d0d6",
    "--text-primary": "#1a1b1f",
    "--text-secondary": "#52525a",
    "--text-tertiary": "#8b8b94",
    "--accent": "#b8860b"
  },
  "& *, & *::before, & *::after": { boxSizing: "border-box" },
  margin: 0,
  padding: "48px 24px",
  minHeight: "100vh",
  background: "var(--surface-0)",
  color: "var(--text-primary)",
  fontFamily: FONT_STACK,
  fontSize: "14px",
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center"
};
var mainStyles = {
  width: "100%",
  maxWidth: "820px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "72px",
  paddingTop: "48px"
};
var sectionHeadingStyles = {
  margin: "0 0 20px",
  fontSize: "14px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  color: "var(--text-primary)"
};
var linkStyles = {
  color: "var(--accent)",
  textDecoration: "underline",
  textUnderlineOffset: "2px",
  "&:hover": { color: "var(--text-primary)" }
};

// www/node_modules/@remix-run/ui/dist/server/stream.js
function createVNode(type, props, key) {
  return { type, props, key };
}
var SELF_CLOSING_TAGS = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
var DEFAULT_STYLE_LAYER = "rmx";
var DOCTYPE_PATTERN = /<!doctype(?:\s[^>]*)?>/gi;
function stripDoctypeMarkup(html) {
  return html.replace(DOCTYPE_PATTERN, "");
}
function getStyleLayerName(selector, layer = DEFAULT_STYLE_LAYER) {
  return `${layer}.${selector}`;
}
var NUMERIC_CSS_PROPS2 = /* @__PURE__ */ new Set([
  "z-index",
  "opacity",
  "flex-grow",
  "flex-shrink",
  "flex-order",
  "grid-area",
  "grid-row",
  "grid-column",
  "font-weight",
  "line-height",
  "order",
  "orphans",
  "widows",
  "zoom",
  "columns",
  "column-count"
]);
var FRAMEWORK_PROPS = /* @__PURE__ */ new Set(["children", "innerHTML", "on", "key", "mix"]);
var ssrSignal = Object.freeze({
  get aborted() {
    return false;
  },
  get reason() {
    return void 0;
  },
  get onabort() {
    return null;
  },
  set onabort(_2) {
  },
  addEventListener(_type, _listener, _options) {
  },
  removeEventListener(_type, _listener, _options) {
  },
  dispatchEvent(_event) {
    return true;
  },
  throwIfAborted() {
  }
});
function renderToStream(node, options) {
  let encoder = new TextEncoder();
  let onError = options?.onError ?? ((error2) => console.error(error2));
  let currentFrameSrc = normalizeFrameSrc(options?.frameSrc ?? options?.topFrameSrc);
  let topFrameSrc = normalizeFrameSrc(options?.topFrameSrc ?? currentFrameSrc);
  let rootFrameState = createSsrFrameState(currentFrameSrc, topFrameSrc);
  let context = {
    insideSvg: false,
    onError,
    resolveFrame: options?.resolveFrame ?? defaultResolveFrame,
    styleCache: /* @__PURE__ */ new Map(),
    emittedStyles: /* @__PURE__ */ new Set(),
    pendingFrames: [],
    hydrationData: /* @__PURE__ */ new Map(),
    unresolvedHydrationData: /* @__PURE__ */ new Map(),
    frameData: /* @__PURE__ */ new Map(),
    blockingFrameTails: [],
    serverIdScope: crypto.randomUUID().slice(0, 8),
    serverIdCounter: 0
  };
  return new ReadableStream({
    async start(controller) {
      try {
        let root = buildSegment(node, context, rootFrameState);
        await resolveBlocking(root);
        await resolveClientEntries(context, options?.resolveClientEntry);
        validateClientEntriesForHydration(context);
        let html = serializeSegment(root);
        let finalHtml = finalizeHtml(html, context);
        let bytes = encoder.encode(finalHtml);
        controller.enqueue(bytes);
        let tailPromise = context.blockingFrameTails.length > 0 ? streamByteStreams(context.blockingFrameTails, controller, context.onError) : Promise.resolve();
        let pendingPromise = context.pendingFrames.length > 0 ? streamPendingFrames(context, controller, encoder) : Promise.resolve();
        await Promise.all([tailPromise, pendingPromise]);
        controller.close();
      } catch (error2) {
        onError(error2);
        controller.error(error2);
      }
    }
  });
}
function defaultResolveFrame() {
  throw new Error("No resolveFrame provided");
}
function normalizeFrameSrc(value) {
  return value == null ? "" : String(value);
}
function createSsrFrameState(frameSrc, topFrameSrc = frameSrc) {
  let topFrame = createFrameHandle({ src: topFrameSrc });
  let frame = frameSrc === topFrameSrc ? topFrame : createFrameHandle({ src: frameSrc });
  return { frame, topFrame };
}
function getResolveFrameContext(frameState) {
  return {
    currentFrameSrc: frameState.frame.src,
    topFrameSrc: frameState.topFrame.src
  };
}
function randomId(prefix) {
  return prefix + crypto.randomUUID().slice(0, 8);
}
function createServerComponentId(context) {
  context.serverIdCounter++;
  return `s${context.serverIdScope}-${context.serverIdCounter}`;
}
async function splitFirstChunk(stream) {
  let reader = stream.getReader();
  let { value, done } = await reader.read();
  if (done || !value) {
    reader.releaseLock();
    return {
      first: new Uint8Array(),
      tail: new ReadableStream({
        start(controller) {
          controller.close();
        }
      })
    };
  }
  let released = false;
  function release() {
    if (released)
      return;
    released = true;
    try {
      reader.releaseLock();
    } catch {
    }
  }
  let tail = new ReadableStream({
    async pull(controller) {
      let next = await reader.read();
      if (next.done) {
        controller.close();
        release();
        return;
      }
      controller.enqueue(next.value);
    },
    cancel(reason) {
      release();
      return reader.cancel(reason);
    }
  });
  return { first: value, tail };
}
async function resolveFrameHtml(input) {
  if (typeof input === "string")
    return { html: stripDoctypeMarkup(input) };
  let decoder = new TextDecoder();
  let { first, tail } = await splitFirstChunk(input);
  return { html: stripDoctypeMarkup(decoder.decode(first)), tail };
}
function isRemixElement(node) {
  return typeof node === "object" && node !== null && "$rmx" in node;
}
function staticSeg(html) {
  return { kind: "static", html };
}
function compositeSeg(parts) {
  return { kind: "composite", parts };
}
function buildSegment(node, context, frameState) {
  if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
    return staticSeg(escapeTextContent(String(node)));
  }
  if (node === null || node === void 0 || typeof node === "boolean") {
    return staticSeg("");
  }
  if (Array.isArray(node)) {
    return compositeSeg(node.map((child) => buildSegment(child, context, frameState)));
  }
  if (isRemixElement(node)) {
    let type = node.type;
    let props = node.props;
    if (type === Fragment) {
      let children = props.children;
      return children != null ? buildSegment(children, context, frameState) : staticSeg("");
    }
    if (typeof type === "string") {
      let tag = type;
      if (tag === "html") {
        return buildElementSegment(tag, props, context, frameState);
      }
      if (tag === "head") {
        return buildHeadElementSegment(tag, props, context, frameState);
      }
      return buildElementSegment(tag, props, context, frameState);
    }
    if (typeof type === "function") {
      if (type === Frame) {
        return buildFrameSegment(props, context, frameState);
      }
      if (isEntry(type)) {
        return buildEntrySegment(type, props, context, frameState);
      }
      return buildComponentSegment(type, props, context, createServerComponentId(context), frameState);
    }
  }
  return staticSeg("");
}
function buildFrameSegment(props, context, frameState) {
  let frameId = randomId("f");
  context.frameData.set(frameId, {
    status: props.fallback ? "pending" : "resolved",
    name: props.name,
    src: props.src
  });
  let seg = {
    kind: "frame",
    frameId,
    content: null
  };
  let resolveFrameContext = getResolveFrameContext(frameState);
  let nonBlocking = !!props.fallback;
  if (nonBlocking) {
    seg.content = buildSegment(props.fallback, context, frameState);
    let framePromise = Promise.resolve(context.resolveFrame(props.src, props.name, resolveFrameContext)).then(async (resolved) => resolveFrameHtml(resolved));
    context.pendingFrames.push({ frameId, promise: framePromise });
  } else {
    seg.pending = Promise.resolve(context.resolveFrame(props.src, props.name, resolveFrameContext)).then(async (resolved) => {
      let { html, tail } = await resolveFrameHtml(resolved);
      seg.content = staticSeg(html);
      if (tail) {
        context.blockingFrameTails.push(tail);
      }
    });
  }
  return seg;
}
function buildElementSegment(tag, props, context, frameState) {
  let mixedProps = resolveSsrMixedProps(tag, props, context, frameState);
  let processedProps = processStyleProps(mixedProps);
  let currentIsSvg = context.insideSvg || tag === "svg";
  let attrs = renderAttributes(processedProps, currentIsSvg);
  if (SELF_CLOSING_TAGS.has(tag)) {
    return staticSeg(`<${tag}${attrs} />`);
  }
  if (props.innerHTML) {
    return staticSeg(`<${tag}${attrs}>${props.innerHTML}</${tag}>`);
  }
  let open2 = staticSeg(`<${tag}${attrs}>`);
  let previousInsideSvg = context.insideSvg;
  context.insideSvg = tag === "foreignObject" ? false : currentIsSvg;
  let children = props.children != null ? buildSegment(props.children, context, frameState) : staticSeg("");
  context.insideSvg = previousInsideSvg;
  let close = staticSeg(`</${tag}>`);
  return compositeSeg([open2, children, close]);
}
function buildHeadElementSegment(tag, props, context, frameState) {
  let processedProps = processStyleProps(props);
  let attrs = renderAttributes(processedProps, false);
  let open2 = staticSeg(`<${tag}${attrs}>`);
  let children = props.children != null ? buildSegment(props.children, context, frameState) : staticSeg("");
  let close = staticSeg(`</${tag}>`);
  return compositeSeg([open2, children, close]);
}
function renderAttributes(props, isSvg) {
  let attrs = "";
  for (let key in props) {
    if (FRAMEWORK_PROPS.has(key))
      continue;
    let value = props[key];
    if (value === void 0 || value === null || value === false)
      continue;
    let attrName = transformAttributeName(key, isSvg);
    if (value === true) {
      attrs += ` ${attrName}`;
    } else {
      attrs += ` ${attrName}="${escapeHtml(String(value))}"`;
    }
  }
  return attrs;
}
function resolveSsrMixedProps(hostType, initialProps, context, frameState) {
  let descriptors = resolveSsrMixDescriptors(initialProps);
  if (descriptors.length === 0)
    return initialProps;
  let composedProps = withoutSsrMix(initialProps);
  let mixinProps = withoutSsrMixinTreeProps(composedProps);
  let maxDescriptors = 1024;
  for (let index = 0; index < descriptors.length && index < maxDescriptors; index++) {
    let descriptor = descriptors[index];
    let runner = resolveSsrMixinRunner(hostType, descriptor, context, frameState);
    if (!runner)
      continue;
    let result;
    try {
      result = runner(...descriptor.args, mixinProps);
    } catch (error2) {
      console.error(error2);
      continue;
    }
    if (!result)
      continue;
    if (isSsrMixinElement(result))
      continue;
    let returnedDescriptors = resolveReturnedSsrMixDescriptors(result);
    if (returnedDescriptors) {
      for (let returned of returnedDescriptors)
        descriptors.push(returned);
      continue;
    }
    if (!isRemixElement(result)) {
      console.error(new Error("mixins must return a remix element"));
      continue;
    }
    let remixResult = result;
    let resultType = typeof remixResult.type === "string" ? remixResult.type : isSsrMixinElement(remixResult.type) ? remixResult.type.__rmxMixinElementType : null;
    if (resultType !== hostType) {
      console.error(new Error("mixins must return an element with the same host type"));
      continue;
    }
    if (remixResult.type !== resultType) {
      remixResult = { ...remixResult, type: resultType };
    }
    let nextProps = sanitizeReturnedSsrMixinProps(remixResult.props);
    let nestedDescriptors = resolveSsrMixDescriptors(nextProps);
    for (let nested of nestedDescriptors)
      descriptors.push(nested);
    composedProps = { ...composedProps, ...withoutSsrMix(nextProps) };
    mixinProps = withoutSsrMixinTreeProps(composedProps);
  }
  let nextMix = initialProps.mix;
  return {
    ...composedProps,
    ...nextMix === void 0 ? {} : { mix: nextMix }
  };
}
function resolveSsrMixinRunner(hostType, descriptor, context, frameState) {
  if (typeof descriptor.type !== "function")
    return null;
  try {
    let handle = createSsrMixinHandle(hostType, descriptor, context, frameState);
    let runner = descriptor.type(handle, hostType);
    if (typeof runner !== "function")
      return null;
    return runner;
  } catch (error2) {
    console.error(error2);
    return null;
  }
}
function createSsrMixinHandle(hostType, _descriptor, context, frameState) {
  let element = ((handle) => () => ({
    $rmx: true,
    type: hostType,
    key: null,
    props: handle.props
  }));
  element.__rmxMixinElementType = hostType;
  return {
    id: "ssr-mixin",
    context: {
      get(providerType) {
        if (typeof providerType !== "function") {
          return void 0;
        }
        let current = context.parentVNode;
        while (current) {
          if (current.type === providerType) {
            let providerHandle = current._handle;
            if (providerHandle) {
              return providerHandle.getContextValue();
            }
          }
          current = current._parent;
        }
        return void 0;
      }
    },
    frame: createFrameHandle({
      src: frameState.frame.src,
      $runtime: {
        styleCache: context.styleCache
      }
    }),
    element,
    signal: ssrSignal,
    update: () => {
      throw new Error("handle.update() is not available during SSR.");
    },
    queueTask: () => {
    },
    on: () => {
    },
    addEventListener: () => {
    },
    removeEventListener: () => {
    },
    dispatchEvent: () => true
  };
}
function resolveSsrMixDescriptors(props) {
  let mix = props.mix;
  if (!mix)
    return [];
  if (Array.isArray(mix)) {
    if (mix.length === 0)
      return [];
    return mix.filter(Boolean);
  }
  return [mix];
}
function withoutSsrMix(props) {
  if (!("mix" in props))
    return props;
  let output = { ...props };
  delete output.mix;
  return output;
}
function withoutSsrMixinTreeProps(props) {
  if (!("children" in props) && !("innerHTML" in props))
    return props;
  let output = { ...props };
  delete output.children;
  delete output.innerHTML;
  return output;
}
function sanitizeReturnedSsrMixinProps(props) {
  if (!("children" in props) && !("innerHTML" in props))
    return props;
  console.error(new Error("mixins must not return children or innerHTML"));
  return withoutSsrMixinTreeProps(props);
}
function resolveReturnedSsrMixDescriptors(value) {
  let descriptors = [];
  if (!collectReturnedSsrMixDescriptors(value, descriptors)) {
    return null;
  }
  return descriptors;
}
function collectReturnedSsrMixDescriptors(value, output) {
  if (!value) {
    return true;
  }
  if (Array.isArray(value)) {
    for (let item of value) {
      if (!collectReturnedSsrMixDescriptors(item, output)) {
        return false;
      }
    }
    return true;
  }
  if (!isSsrMixinDescriptor(value)) {
    return false;
  }
  output.push(value);
  return true;
}
function isSsrMixinElement(value) {
  if (typeof value !== "function")
    return false;
  return "__rmxMixinElementType" in value;
}
function isSsrMixinDescriptor(value) {
  if (!value || typeof value !== "object" || isRemixElement(value)) {
    return false;
  }
  let descriptor = value;
  return typeof descriptor.type === "function" && Array.isArray(descriptor.args);
}
function buildComponentSegment(type, props, context, componentId, frameState) {
  let vnode = createVNode(type, props);
  if (context.parentVNode) {
    vnode._parent = context.parentVNode;
  }
  let handle = createComponent({
    id: componentId,
    type,
    frame: frameState.frame,
    signal: ssrSignal,
    getContext(providerType) {
      let current = vnode._parent;
      while (current) {
        if (current.type === providerType) {
          let providerHandle = current._handle;
          if (providerHandle) {
            return providerHandle.getContextValue();
          }
        }
        current = current._parent;
      }
      return void 0;
    },
    getFrameByName() {
      return void 0;
    },
    getTopFrame() {
      return frameState.topFrame;
    }
  });
  vnode._handle = handle;
  let [renderedNode] = handle.render(props);
  let childContext = { ...context, parentVNode: vnode };
  return buildSegment(renderedNode, childContext, frameState);
}
function createHydrationPropsReplacer(context, frameState) {
  function unwrapNode(node) {
    if (node === null || node === void 0 || typeof node === "boolean")
      return node;
    if (typeof node === "string" || typeof node === "number" || typeof node === "bigint") {
      return node;
    }
    if (Array.isArray(node)) {
      return node.map((child) => unwrapNode(child));
    }
    if (isRemixElement(node)) {
      return unwrapElement(node);
    }
    return node;
  }
  function unwrapElement(element) {
    let type = element.type;
    let props = element.props;
    if (type === Frame) {
      return {
        $rmxFrame: true,
        props: transformProps(props),
        key: element.key
      };
    }
    if (typeof type === "string") {
      return { $rmx: true, type, props: transformProps(props) };
    }
    if (typeof type === "function") {
      let vnode = createVNode(type, props);
      if (context.parentVNode) {
        vnode._parent = context.parentVNode;
      }
      let handle = createComponent({
        id: "SERIALIZED",
        type,
        frame: frameState.frame,
        signal: ssrSignal,
        getContext(providerType) {
          let current = vnode._parent;
          while (current) {
            if (current.type === providerType) {
              let providerHandle = current._handle;
              if (providerHandle) {
                return providerHandle.getContextValue();
              }
            }
            current = current._parent;
          }
          return void 0;
        },
        getFrameByName() {
          return void 0;
        },
        getTopFrame() {
          return frameState.topFrame;
        }
      });
      vnode._handle = handle;
      let [renderedNode] = handle.render(props);
      return unwrapNode(renderedNode);
    }
    return null;
  }
  function transformProps(input) {
    let out = {};
    for (let key in input) {
      let value = input[key];
      if (key === "children") {
        out[key] = unwrapNode(value);
      } else {
        if (isRemixElement(value)) {
          out[key] = unwrapNode(value);
        } else if (Array.isArray(value)) {
          out[key] = value.map((v2) => unwrapNode(v2));
        } else {
          out[key] = value;
        }
      }
    }
    return out;
  }
  return function replacer(_key, value) {
    if (isRemixElement(value)) {
      return unwrapElement(value);
    }
    if (Array.isArray(value)) {
      return value.map((v2) => unwrapNode(v2));
    }
    return value;
  };
}
function buildEntrySegment(type, props, context, frameState) {
  let instanceId = randomId("h");
  let rendered = buildComponentSegment(type, props, context, instanceId, frameState);
  let replacer = createHydrationPropsReplacer(context, frameState);
  context.unresolvedHydrationData.set(instanceId, {
    entryId: type.$entryId,
    component: type,
    props: JSON.parse(JSON.stringify(props, replacer))
  });
  let start = staticSeg(`<!-- rmx:h:${instanceId} -->`);
  let end = staticSeg("<!-- /rmx:h -->");
  return compositeSeg([start, rendered, end]);
}
function resolveDefaultClientEntry(entryId, component) {
  let fallbackExportName = component.name || "";
  let hashIndex = entryId.lastIndexOf("#");
  if (hashIndex === -1 && fallbackExportName) {
    return {
      exportName: fallbackExportName,
      href: entryId
    };
  }
  if (hashIndex !== -1) {
    let exportName = entryId.slice(hashIndex + 1) || fallbackExportName;
    if (exportName) {
      return {
        exportName,
        href: entryId.slice(0, hashIndex)
      };
    }
  }
  throw new Error(`clientEntry() requires either an export name in the entry ID (e.g., "/js/module.js#ComponentName"), a named component function, or a resolveClientEntry hook that resolves one. Received "${entryId}".`);
}
async function resolveClientEntries(context, resolveClientEntry) {
  if (context.unresolvedHydrationData.size === 0)
    return;
  let resolvedEntries = /* @__PURE__ */ new Map();
  for (let [hydrationId, unresolvedHydrationData] of context.unresolvedHydrationData) {
    let { entryId, component, props } = unresolvedHydrationData;
    let resolvedEntry = resolvedEntries.get(entryId);
    if (!resolvedEntry) {
      resolvedEntry = resolveClientEntry ? await Promise.resolve(resolveClientEntry(entryId, component)) : resolveDefaultClientEntry(entryId, component);
      validateResolvedClientEntry(entryId, resolvedEntry);
      resolvedEntries.set(entryId, resolvedEntry);
    }
    context.hydrationData.set(hydrationId, {
      exportName: resolvedEntry.exportName,
      moduleUrl: resolvedEntry.href,
      props
    });
  }
  context.unresolvedHydrationData.clear();
}
function validateResolvedClientEntry(entryId, resolvedEntry) {
  if (!resolvedEntry || typeof resolvedEntry !== "object") {
    throw new Error(`resolveClientEntry must return an object with href and exportName. Received "${entryId}".`);
  }
  if (!resolvedEntry.href) {
    throw new Error(`resolveClientEntry must return a non-empty href. Received "${entryId}".`);
  }
  if (!resolvedEntry.exportName) {
    throw new Error(`resolveClientEntry must return a non-empty exportName. Received "${entryId}".`);
  }
}
function validateClientEntriesForHydration(context) {
  if (context.unresolvedHydrationData.size > 0) {
    let [hydrationId, unresolvedHydrationData] = context.unresolvedHydrationData.entries().next().value;
    throw new Error(`Client entry was not resolved for hydration. Received "${unresolvedHydrationData.entryId}" (${hydrationId}).`);
  }
}
async function resolveBlocking(segment) {
  if (segment.kind === "frame") {
    if (segment.pending) {
      await segment.pending;
      segment.pending = void 0;
    }
    if (segment.content)
      await resolveBlocking(segment.content);
    return;
  }
  if (segment.kind === "composite") {
    for (let part of segment.parts) {
      await resolveBlocking(part);
    }
  }
}
function serializeSegment(seg) {
  if (seg.kind === "static")
    return seg.html;
  if (seg.kind === "composite")
    return seg.parts.map(serializeSegment).join("");
  let inner = seg.content ? serializeSegment(seg.content) : "";
  let start = `<!-- rmx:f:${seg.frameId} -->`;
  let end = `<!-- /rmx:f -->`;
  return start + inner + end;
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function escapeTextContent(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeTemplateContent(html) {
  return html.replace(/<\/template/gi, "<\\/template");
}
function transformAttributeName(name, isSvg) {
  if (name.startsWith("aria-") || name.startsWith("data-"))
    return name;
  if (name === "className")
    return "class";
  if (!isSvg) {
    if (name === "htmlFor")
      return "for";
    if (name === "tabIndex")
      return "tabindex";
    if (name === "acceptCharset")
      return "accept-charset";
    if (name === "httpEquiv")
      return "http-equiv";
    return name.toLowerCase();
  }
  return normalizeSvgAttribute(name).attr;
}
function finalizeHtml(html, context) {
  let hasHtmlRoot = html.trimStart().toLowerCase().startsWith("<html");
  let styles = collectStyleTags(context);
  if (styles) {
    let headContent = styles;
    if (hasHtmlRoot) {
      let headCloseIndex = html.indexOf("</head>");
      if (headCloseIndex !== -1) {
        html = html.slice(0, headCloseIndex) + headContent + html.slice(headCloseIndex);
      } else {
        let htmlOpenMatch = html.match(/<html[^>]*>/);
        if (htmlOpenMatch) {
          let insertIndex = htmlOpenMatch.index + htmlOpenMatch[0].length;
          html = html.slice(0, insertIndex) + `<head>${headContent}</head>` + html.slice(insertIndex);
        }
      }
    } else {
      html = `<head>${headContent}</head>${html}`;
    }
  }
  html = dedupeServerStyleTagsInHtml(html, context.emittedStyles);
  let rmxData = buildRmxDataScript(context);
  if (rmxData) {
    if (hasHtmlRoot) {
      let bodyCloseIndex = html.indexOf("</body>");
      if (bodyCloseIndex !== -1) {
        html = html.slice(0, bodyCloseIndex) + rmxData + html.slice(bodyCloseIndex);
      } else {
        let htmlCloseIndex = html.indexOf("</html>");
        if (htmlCloseIndex !== -1) {
          html = html.slice(0, htmlCloseIndex) + rmxData + html.slice(htmlCloseIndex);
        } else {
          html += rmxData;
        }
      }
    } else {
      html += rmxData;
    }
  }
  return html;
}
function processStyleProps(props) {
  let processedProps = { ...props };
  let classAttr = typeof props.class === "string" ? props.class : "";
  let className = typeof props.className === "string" ? props.className : "";
  let mergedClassName = [classAttr, className].filter(Boolean).join(" ");
  if (mergedClassName) {
    processedProps.className = mergedClassName;
    delete processedProps.class;
  }
  if (typeof props.style === "object") {
    processedProps.style = serializeStyleObject(props.style);
  }
  return processedProps;
}
function collectStyleTags(context) {
  if (context.styleCache.size === 0)
    return "";
  let tags = [];
  for (let { selector, css: css2 } of context.styleCache.values()) {
    let tag = renderStyleTag(selector, css2);
    if (tag)
      tags.push(tag);
  }
  return tags.join("");
}
function wrapStyleForLayer(selector, css2, layer = DEFAULT_STYLE_LAYER) {
  let trimmed = css2.trim();
  if (!trimmed)
    return "";
  return `@layer ${getStyleLayerName(selector, layer)} { ${trimmed} }`;
}
function renderStyleTag(selector, css2, layer = DEFAULT_STYLE_LAYER) {
  let wrappedCss = wrapStyleForLayer(selector, css2, layer);
  if (!wrappedCss)
    return "";
  return `<style data-rmx="${escapeHtml(selector)}">${wrappedCss}</style>`;
}
function readStyleTagAttribute(attrs, name) {
  let match = attrs.match(new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`));
  if (!match)
    return null;
  return match[1] ?? match[2] ?? null;
}
function dedupeServerStyleTagsInHtml(html, seenStyles) {
  return html.replace(/<style\b([^>]*)>[\s\S]*?<\/style>/gi, (match, attrs) => {
    let selector = readStyleTagAttribute(attrs, "data-rmx");
    if (!selector)
      return match;
    if (seenStyles.has(selector))
      return "";
    seenStyles.add(selector);
    return match;
  });
}
function buildRmxDataScript(context) {
  if (context.hydrationData.size === 0 && context.frameData.size === 0) {
    return "";
  }
  let data = {};
  if (context.hydrationData.size > 0) {
    data.h = Object.fromEntries(context.hydrationData);
  }
  if (context.frameData.size > 0) {
    data.f = Object.fromEntries(context.frameData);
  }
  let serializedData = escapeScriptJson(JSON.stringify(data));
  return `<script type="application/json" id="rmx-data">${serializedData}</script>`;
}
function escapeScriptJson(json) {
  return json.replace(/</g, "\\u003c");
}
function serializeStyleObject(style) {
  let parts = [];
  for (let [key, value] of Object.entries(style)) {
    if (value == null)
      continue;
    if (typeof value === "boolean")
      continue;
    if (typeof value === "number" && !Number.isFinite(value))
      continue;
    let cssKey = key.replace(/[A-Z]/g, (m3) => `-${m3.toLowerCase()}`);
    let shouldAppendPx = typeof value === "number" && value !== 0 && !NUMERIC_CSS_PROPS2.has(cssKey) && !cssKey.startsWith("--");
    let cssValue = shouldAppendPx ? `${value}px` : Array.isArray(value) ? value.join(", ") : String(value);
    parts.push(`${cssKey}: ${cssValue};`);
  }
  return parts.join(" ");
}
async function streamPendingFrames(context, controller, encoder) {
  let processedFrames = /* @__PURE__ */ new Set();
  while (true) {
    let batch = context.pendingFrames.filter(({ frameId }) => !processedFrames.has(frameId));
    if (batch.length === 0)
      break;
    await Promise.all(batch.map(async ({ frameId, promise }) => {
      processedFrames.add(frameId);
      try {
        let { html, tail } = await promise;
        html = dedupeServerStyleTagsInHtml(html, context.emittedStyles);
        let templateHtml = `<template id="${frameId}">${escapeTemplateContent(html)}</template>`;
        controller.enqueue(encoder.encode(templateHtml));
        if (tail) {
          await streamByteStreams([tail], controller, context.onError);
        }
      } catch (error2) {
        context.onError(error2);
      }
    }));
  }
}
async function streamByteStreams(streams, controller, onError) {
  await Promise.all(streams.map(async (stream) => {
    let reader = stream.getReader();
    try {
      while (true) {
        let { done, value } = await reader.read();
        if (done)
          break;
        controller.enqueue(value);
      }
    } catch (error2) {
      onError(error2);
    } finally {
      reader.releaseLock();
    }
  }));
}

// www/app/utils/render.tsx
function render(node, request, init2) {
  let stream = renderToStream(node, {
    frameSrc: request.url,
    async resolveFrame(src, target) {
      let headers2 = new Headers({ accept: "text/html" });
      let cookie = request.headers.get("cookie");
      if (cookie) headers2.set("cookie", cookie);
      if (target) headers2.set("x-remix-target", target);
      let response = await router.fetch(new Request(new URL(src, request.url), { headers: headers2 }));
      return response.body ?? response.text();
    }
  });
  let headers = new Headers(init2?.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "text/html; charset=utf-8");
  }
  return new Response(stream, { ...init2, headers });
}

// www/app/controllers/home.tsx
var home = {
  handler({ request }) {
    return render(/* @__PURE__ */ jsx(HomePage, {}), request);
  }
};

// www/app/ui/docs-page.tsx
var FONT_STACK2 = "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace";
function DocsPage() {
  return () => /* @__PURE__ */ jsx("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }),
      /* @__PURE__ */ jsx("meta", { name: "color-scheme", content: "light dark" }),
      /* @__PURE__ */ jsx("title", { children: "zigc docs" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap"
        }
      ),
      /* @__PURE__ */ jsx("script", { type: "module", src: routes.assets.href({ path: "app/assets/entry.ts" }) })
    ] }),
    /* @__PURE__ */ jsx("body", { mix: css(bodyStyles2), children: [
      /* @__PURE__ */ jsx("nav", { mix: css(navStyles), children: [
        /* @__PURE__ */ jsx("a", { href: routes.home.href(), mix: css(navLinkStyles), children: "\u2190 zigc" }),
        /* @__PURE__ */ jsx("a", { href: "https://github.com/nathanjmorton/zigc", mix: css(navLinkStyles), children: "GitHub" })
      ] }),
      /* @__PURE__ */ jsx("main", { mix: css(mainStyles2), children: [
        /* @__PURE__ */ jsx("h1", { mix: css({ margin: 0, fontSize: "32px", fontWeight: 700 }), children: "Documentation" }),
        /* @__PURE__ */ jsx(Section, { title: "Installation", children: [
          /* @__PURE__ */ jsx(CodeBlock, { lines: [
            "curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash"
          ] }),
          /* @__PURE__ */ jsx(P, { children: [
            "The installer detects your platform (macOS/Linux, arm64/x86_64), downloads the correct binary from GitHub releases, and places it at ",
            /* @__PURE__ */ jsx(Code, { children: "~/.zigc/bin/zigc" }),
            ". It also adds ",
            /* @__PURE__ */ jsx(Code, { children: "ZIGC_INSTALL" }),
            " and updates your ",
            /* @__PURE__ */ jsx(Code, { children: "PATH" }),
            " in your shell config."
          ] }),
          /* @__PURE__ */ jsx(P, { children: "To install a specific version:" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: [
            "curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash -s v0.1.0"
          ] }),
          /* @__PURE__ */ jsx(P, { children: [
            "Or build from source (requires ",
            /* @__PURE__ */ jsx(A3, { href: "https://ziglang.org/download/", children: "Zig 0.16.0" }),
            "):"
          ] }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: [
            "git clone https://github.com/nathanjmorton/zigc",
            "cd zigc",
            "zig build -Doptimize=ReleaseFast",
            'export PATH="$PWD/zig-out/bin:$PATH"'
          ] })
        ] }),
        /* @__PURE__ */ jsx(Section, { title: "Upgrade", children: [
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["zigc upgrade"] }),
          /* @__PURE__ */ jsx(P, { children: "Checks GitHub for the latest release, compares to the current version, and downloads the correct binary for your platform. Replaces the existing binary in-place." })
        ] }),
        /* @__PURE__ */ jsx(Section, { title: "Workflow", children: [
          /* @__PURE__ */ jsx(H3, { children: "Create a project" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["zigc init my-app", "cd my-app"] }),
          /* @__PURE__ */ jsx(P, { children: [
            "Scaffolds ",
            /* @__PURE__ */ jsx(Code, { children: "build.zig" }),
            ", ",
            /* @__PURE__ */ jsx(Code, { children: "build.zig.zon" }),
            ",",
            " ",
            /* @__PURE__ */ jsx(Code, { children: "src/main.c" }),
            ", and ",
            /* @__PURE__ */ jsx(Code, { children: ".gitignore" }),
            ". Use ",
            /* @__PURE__ */ jsx(Code, { children: "--cpp" }),
            " for C++."
          ] }),
          /* @__PURE__ */ jsx(H3, { children: "Build and run" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["zigc build", "zigc run"] }),
          /* @__PURE__ */ jsx(H3, { children: "Add a dependency" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: [
            "zigc registry update           # fetch package registry (first time)",
            "zigc add lz4                    # resolve from registry",
            "zigc add git+https://github.com/allyourcodebase/lz4.git#1.10.0-6   # or by URL"
          ] }),
          /* @__PURE__ */ jsx(P, { children: [
            "Registry-based adds write the URL + hash directly \u2014 no network fetch needed at add time. Both methods auto-generate the ",
            /* @__PURE__ */ jsx(Code, { children: "b.dependency()" }),
            " and",
            " ",
            /* @__PURE__ */ jsx(Code, { children: "mod.linkLibrary()" }),
            " boilerplate in ",
            /* @__PURE__ */ jsx(Code, { children: "build.zig" }),
            "."
          ] }),
          /* @__PURE__ */ jsx(H3, { children: "Inspect and verify" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["zigc check --build", "zigc verify --symbols"] }),
          /* @__PURE__ */ jsx(H3, { children: "Cross-compile to WASM" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["zigc build --wasi", "wasmtime zig-out/bin/my-app.wasm"] }),
          /* @__PURE__ */ jsx(H3, { children: "Clean" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["zigc clean"] })
        ] }),
        /* @__PURE__ */ jsx(Section, { title: "Command reference", children: [
          ["zigc init <name> [--cpp]", "Scaffold a new C/C++ project"],
          ["zigc add <name|url> [--lib n]", "Add a dependency by registry name or URL"],
          ["zigc remove <name>", "Remove a dependency from manifest and build.zig"],
          ["zigc list", "Show all declared dependencies and pinned URLs"],
          ["zigc registry update", "Fetch the latest package registry"],
          ["zigc registry generate [--limit N]", "Scrape allyourcodebase \u2192 registry.json"],
          ["zigc check [--build]", "Verify manifest fields, paths, and dep consistency"],
          ["zigc verify [--symbols]", "Inspect object files and binary symbol table"],
          ["zigc build [flags]", "Compile the project (zig build)"],
          ["zigc run [flags]", "Compile and run (zig build run)"],
          ["zigc clean", "Remove .zig-cache/ and zig-out/"],
          ["zigc upgrade", "Update zigc to the latest release"],
          ["zigc help", "Print usage"]
        ].map(([cmd, desc]) => /* @__PURE__ */ jsx("div", { mix: css({ display: "flex", gap: "16px", padding: "6px 0", flexWrap: "wrap" }), children: [
          /* @__PURE__ */ jsx("code", { mix: css({ fontSize: "13px", color: "var(--accent)", whiteSpace: "nowrap", minWidth: "280px" }), children: cmd }),
          /* @__PURE__ */ jsx("span", { mix: css({ fontSize: "13px", color: "var(--text-secondary)" }), children: desc })
        ] })) }),
        /* @__PURE__ */ jsx(Section, { title: "Flag passthrough", children: [
          /* @__PURE__ */ jsx(P, { children: [
            /* @__PURE__ */ jsx(Code, { children: "zigc build" }),
            " and ",
            /* @__PURE__ */ jsx(Code, { children: "zigc run" }),
            " translate C-style flags to Zig build options:"
          ] }),
          [
            ["-O3, -O2, -O1, -Ofast", "-Doptimize=ReleaseFast"],
            ["-Os", "-Doptimize=ReleaseSmall"],
            ["-Og", "-Doptimize=ReleaseSafe"],
            ["--wasi", "-Dtarget=wasm32-wasi"],
            ["--wasm", "-Dtarget=wasm32-freestanding"],
            ["-Wall, -Werror, -DFOO", "Accumulated into -Dcflags=..."]
          ].map(([from, to]) => /* @__PURE__ */ jsx("div", { mix: css({ display: "flex", gap: "16px", padding: "4px 0", flexWrap: "wrap" }), children: [
            /* @__PURE__ */ jsx("code", { mix: css({ fontSize: "13px", color: "var(--text-primary)", minWidth: "220px" }), children: from }),
            /* @__PURE__ */ jsx("span", { mix: css({ fontSize: "13px", color: "var(--text-tertiary)" }), children: [
              "\u2192 ",
              to
            ] })
          ] }))
        ] }),
        /* @__PURE__ */ jsx(Section, { title: "Homebrew", children: [
          /* @__PURE__ */ jsx(CodeBlock, { lines: [
            "brew tap nathanjmorton/zigc",
            "brew install zigc"
          ] }),
          /* @__PURE__ */ jsx(P, { children: "Upgrade via Homebrew:" }),
          /* @__PURE__ */ jsx(CodeBlock, { lines: ["brew upgrade zigc"] }),
          /* @__PURE__ */ jsx(P, { children: [
            /* @__PURE__ */ jsx("strong", { children: "Note:" }),
            " If you installed via Homebrew, use ",
            /* @__PURE__ */ jsx(Code, { children: "brew upgrade zigc" }),
            " ",
            "instead of ",
            /* @__PURE__ */ jsx(Code, { children: "zigc upgrade" }),
            " to avoid version conflicts. The two install methods use different paths (",
            /* @__PURE__ */ jsx(Code, { children: "/opt/homebrew/bin" }),
            " vs ",
            /* @__PURE__ */ jsx(Code, { children: "~/.zigc/bin" }),
            ") so they won't shadow each other, but stick with one upgrade method."
          ] })
        ] }),
        /* @__PURE__ */ jsx("footer", { mix: css({ paddingTop: "24px", fontSize: "12px", color: "var(--text-tertiary)", textAlign: "center" }), children: /* @__PURE__ */ jsx("a", { href: routes.home.href(), mix: css({ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "2px" }), children: "\u2190 Back to zigc" }) })
      ] })
    ] })
  ] });
}
function Section() {
  return ({ title, children }) => /* @__PURE__ */ jsx("section", { mix: css({ width: "100%", display: "flex", flexDirection: "column", gap: "12px" }), children: [
    /* @__PURE__ */ jsx("h2", { mix: css({ margin: 0, fontSize: "18px", fontWeight: 700, paddingBottom: "4px", borderBottom: "1px solid var(--border)" }), children: title }),
    children
  ] });
}
function H3() {
  return ({ children }) => /* @__PURE__ */ jsx("h3", { mix: css({ margin: "8px 0 0", fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }), children });
}
function P() {
  return ({ children }) => /* @__PURE__ */ jsx("p", { mix: css({ margin: 0, fontSize: "14px", lineHeight: 1.7, color: "var(--text-secondary)" }), children });
}
function A3() {
  return ({ href, children }) => /* @__PURE__ */ jsx("a", { href, mix: css({ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "2px" }), children });
}
function Code() {
  return ({ children }) => /* @__PURE__ */ jsx("code", { mix: css({ fontSize: "13px", background: "var(--surface-3)", padding: "1px 5px", borderRadius: "4px" }), children });
}
function CodeBlock() {
  return ({ lines }) => /* @__PURE__ */ jsx("pre", { mix: css({
    margin: 0,
    background: "var(--surface-3)",
    borderRadius: "12px",
    padding: "16px 20px",
    fontSize: "13px",
    lineHeight: 1.7,
    overflowX: "auto",
    color: "var(--text-primary)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-all"
  }), children: lines.join("\n") });
}
var bodyStyles2 = {
  "--surface-0": "#0c0d10",
  "--surface-3": "#1a1b1f",
  "--border": "#2a2b30",
  "--text-primary": "#e8e8ec",
  "--text-secondary": "#a0a0a8",
  "--text-tertiary": "#6b6b74",
  "--accent": "#f0c040",
  "@media (prefers-color-scheme: light)": {
    "--surface-0": "#f5f5f7",
    "--surface-3": "#e8e8ec",
    "--border": "#d0d0d6",
    "--text-primary": "#1a1b1f",
    "--text-secondary": "#52525a",
    "--text-tertiary": "#8b8b94",
    "--accent": "#b8860b"
  },
  "& *, & *::before, & *::after": { boxSizing: "border-box" },
  margin: 0,
  padding: "48px 24px",
  minHeight: "100vh",
  background: "var(--surface-0)",
  color: "var(--text-primary)",
  fontFamily: FONT_STACK2,
  fontSize: "14px",
  lineHeight: 1.5,
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};
var mainStyles2 = {
  width: "100%",
  maxWidth: "760px",
  display: "flex",
  flexDirection: "column",
  gap: "40px",
  paddingTop: "24px"
};
var navStyles = {
  width: "100%",
  maxWidth: "760px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingBottom: "16px",
  borderBottom: "1px solid var(--border)"
};
var navLinkStyles = {
  fontSize: "13px",
  color: "var(--text-tertiary)",
  textDecoration: "none",
  "&:hover": { color: "var(--text-primary)" }
};

// www/app/controllers/docs.tsx
var docs = {
  handler({ request }) {
    return render(/* @__PURE__ */ jsx(DocsPage, {}), request);
  }
};

// www/app/router.ts
var INSTALL_SCRIPT_URL = "https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh";
var router = createRouter();
router.get(routes.assets, async ({ request }) => {
  let response = await assets.fetch(request);
  return response ?? new Response("Not Found", { status: 404 });
});
router.get(routes.install, async () => {
  const upstream = await fetch(INSTALL_SCRIPT_URL);
  if (!upstream.ok) {
    return new Response("Failed to fetch install script", { status: 502 });
  }
  return new Response(upstream.body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" }
  });
});
router.map(routes.home, home);
router.map(routes.docs, docs);

// www/api/index.ts
async function handler(req, res) {
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = new URL(req.url || "/", `${protocol}://${host}`);
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
  }
  const request = new Request(url.toString(), {
    method: req.method,
    headers,
    body: req.method !== "GET" && req.method !== "HEAD" ? req : void 0,
    // @ts-expect-error Node.js duplex option
    duplex: "half"
  });
  try {
    const response = await router.fetch(request);
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    if (response.body) {
      const reader = response.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          res.write(value);
        }
        res.end();
      };
      await pump();
    } else {
      const text = await response.text();
      res.end(text);
    }
  } catch (error2) {
    console.error(error2);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
export {
  handler as default
};
/*! Bundled license information:

chokidar/index.js:
  (*! chokidar - MIT License (c) 2012 Paul Miller (paulmillr.com) *)
*/
