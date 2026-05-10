# Memory Safety Checker for zigc
Add a `zigc safe` command that performs static analysis on C/C++ source files to detect memory safety violations before compilation — inspired by Rust's ownership and borrow rules.
## Current State
* `zigc` is a C/C++ build tool (src/main.zig, src/lib.zig) with commands: init, build, run, check, verify, etc.
* `zigtsc` has a full lexer→parser→AST→checker pipeline for TypeScript, which provides good patterns to follow.
* There is no pre-compilation safety analysis for C/C++ code today.
## Approach
Build a focused, pattern-based static analyzer — not a full C/C++ parser. We only need to understand enough C/C++ structure to track pointer lifetimes and ownership. The analysis operates on source files in `src/` before `zig build` runs.
### Ownership Model
Every pointer variable is in one of these states:
* **uninitialized** — declared but not assigned
* **owned** — holds a heap allocation (from malloc/calloc/realloc/new)
* **borrowed** — points to memory owned by another variable (assigned from another pointer)
* **freed** — memory has been released (via free/delete)
* **returned** — ownership transferred out of the function via return
State transitions:
* `malloc/calloc/realloc/new` → owned
* `free(p)/delete p` → freed
* `p = q` (pointer-to-pointer assign) → p becomes borrowed, q stays owned
* `return p` → returned (exempt from leak check)
* Scope exit → any owned pointer not freed/returned = leak warning
### Violations Detected
1. **Use after free** — accessing a pointer in `freed` state
2. **Double free** — calling free on a pointer in `freed` state  
3. **Leak** — owned pointer goes out of scope without free/return (warning)
4. **Uninitialized use** — dereferencing a pointer in `uninitialized` state
5. **Dangling return** — returning address of a stack-local variable
## New Files
All new source files go in `zigc/src/`:
### `src/c_token.zig` — C/C++ Token Types
Minimal token set: identifiers, number/string literals, operators, braces, keywords relevant to safety (malloc, free, calloc, realloc, new, delete, return, if, else, while, for, NULL, sizeof, void, const, struct). Uses the same `Token { tag, loc }` pattern as zigtsc.
### `src/c_lexer.zig` — C/C++ Lexer
Tokenizes C/C++ source. Same structure as zigtsc's Lexer: `init(source) → next() → Token`. Handles C-style comments, string/char literals, preprocessor lines (skip `#include`/`#define` lines). Recognizes pointer-relevant identifiers (malloc, free, etc.) as keyword tokens.
### `src/c_ast.zig` — Simplified C AST
Not a full C AST. Node types focused on safety-relevant constructs:
* `var_decl` — type info (is_pointer), name, initializer
* `func_decl` — name, params, body
* `call_expr` — callee name, arguments (for malloc/free/calloc/realloc detection)
* `assign_expr` — target, value
* `return_stmt` — return value
* `block` — scoped statement list
* `if_stmt`, `while_stmt`, `for_stmt` — for scope tracking
* `expr_stmt` — general expression statement
* `member_expr` — for `ptr->field` access detection
* `deref_expr` — for `*ptr` detection
* `addr_of_expr` — for `&local` detection (dangling return)
Uses the same flat array + extra data pattern as zigtsc's AST.
### `src/c_parser.zig` — Simplified C/C++ Parser
Parses only the constructs needed for safety analysis. Skips/ignores things it doesn't understand (preprocessor output, complex expressions, etc.) rather than erroring. Key parsing targets:
* Function definitions (to establish scope boundaries)
* Variable declarations (especially pointer types: `int *p`, `char *buf`, etc.)
* Assignment statements involving pointers
* `malloc/calloc/realloc/free/new/delete` calls
* Return statements
* Block scopes `{ }`
* Control flow (if/while/for) for scope tracking
### `src/safety.zig` — Ownership Checker
The core analysis pass. Walks the AST and maintains:
* `PtrState` enum: `uninitialized`, `owned`, `borrowed`, `freed`, `returned`
* `ScopeStack` — stack of scopes, each containing a map of variable name → PtrState
* `Diagnostic` — list of safety violations with location info
Algorithm:
1. For each function, push a scope
2. Walk statements sequentially
3. On `var_decl` of pointer type → register as `uninitialized` (or `owned` if initialized with malloc)
4. On `assign_expr` to pointer → update state (owned if rhs is malloc, borrowed if rhs is another pointer)
5. On `free(p)` → check p is owned/borrowed, set to freed
6. On any use of pointer → check not freed or uninitialized
7. On `return &local` → emit dangling return diagnostic
8. On scope exit → check for owned pointers not freed/returned → emit leak warning
9. Collect all diagnostics and report at the end
## Changes to Existing Files
### `src/main.zig`
Add `zigc safe` command that calls `lib.cmdSafe(io, allocator, rest)`.
### `src/lib.zig`
Add `cmdSafe` function that:
1. Finds all `.c` and `.cpp` files in `src/`
2. For each file: lex → parse → check
3. Reports diagnostics (file:line: error/warning: message)
4. Exits non-zero if any errors found
### `build.zig`
No changes needed — new .zig files are imported via `@import` from lib.zig.
### `src/tests.zig`
Add unit tests for the safety checker using inline C source strings:
* Use after free detection
* Double free detection
* Leak detection
* Clean code passes
* Integration test: `zigc init` → write unsafe code → `zigc safe` reports errors
## Output Format
```warp-runnable-command
zigc safe
src/main.c:12: error: use after free — 'buf' was freed on line 10
src/main.c:15: error: double free — 'buf' was already freed on line 10
src/main.c:20: warning: memory leak — 'data' allocated on line 18 is never freed
0 ok, 1 warning, 2 errors
```
Uses the same `Check` struct pattern already in lib.zig for consistent output.
## Scope Limitations (initial version)
* Intraprocedural only (does not track ownership across function calls, except malloc/free)
* Does not handle conditional paths (if one branch frees and the other doesn't)
* Does not handle arrays of pointers or struct fields that are pointers
* Does not handle `realloc` failure (NULL return)
* Preprocessor macros are skipped — only raw source is analyzed
These can be addressed in follow-up iterations.