# zigc safe — Memory Safety Demo

This example demonstrates `zigc safe`, a static analysis tool that detects
memory-safety bugs in C/C++ code before compilation — inspired by Rust's
ownership and borrow checking.

## What it catches

| Bug | Severity | Description |
|-----|----------|-------------|
| Use after free | error | Accessing a pointer after `free()` |
| Double free | error | Calling `free()` on an already-freed pointer |
| Memory leak | warning | Allocated memory never freed before scope exit |
| Leak on reassign | warning | Overwriting an owned pointer without freeing first |

## Quick start

### 1. Create a new project

```sh
zigc init safety-demo
cd safety-demo
```

### 2. Copy the demo files into src/

```sh
cp /path/to/zigc/examples/safety/main.c        src/main.c
cp /path/to/zigc/examples/safety/safety_bugs.h  src/
cp /path/to/zigc/examples/safety/safety_bugs.c  src/
```

### 3. Update build.zig to compile both source files

Open `build.zig` and change the `.files` line from:

```zig
.files = &.{"main.c"},
```

to:

```zig
.files = &.{ "main.c", "safety_bugs.c" },
```

Also add an include path so the `#include "safety_bugs.h"` resolves:

```zig
mod.addIncludePath(b.path("src"));
```

Add this line right before the `mod.addCSourceFiles(...)` call.

### 4. Run the safety checker

```sh
zigc safe
```

Expected output:

```
zigc safe
  src/safety_bugs.c:20: error: use after free (line 19: freed here)
  src/safety_bugs.c:21: error: use after free (line 19: freed here)
  src/safety_bugs.c:39: error: double free (line 38: previously freed here)
  src/safety_bugs.c:52: warning: memory leak (line 52: allocation goes out of scope without being freed)
  src/safety_bugs.c:72: warning: memory leak (line 70: previous allocation was never freed)

0 ok, 2 warnings, 3 errors
```

The checker found all 4 bugs without running the program.

### 5. Verify it still compiles

Even with the bugs, the code compiles — these are runtime issues, not
syntax errors:

```sh
zigc build
```

### 6. Fix the bugs

Replace `src/safety_bugs.c` with the fixed version:

```sh
cp /path/to/zigc/examples/safety/safety_bugs_fixed.c src/safety_bugs.c
```

### 7. Re-run the safety checker

```sh
zigc safe
```

Expected output:

```
zigc safe
  ✓ src/main.c — no issues
  ✓ src/safety_bugs.c — no issues

2 ok, 0 warnings, 0 errors
```

All clear.

### 8. Build and run

```sh
zigc build
zigc run
```

```
=== zigc safety demo ===

1. Use after free
use_after_free: hello, safety!

2. Double free

3. Memory leak
leak: this memory is now freed

4. Leak on reassignment

=== done ===
```

## How it works

`zigc safe` performs **ownership tracking** on every pointer variable:

- `malloc` / `calloc` / `realloc` / `new` → pointer becomes **owned**
- `free` / `delete` → pointer becomes **freed**
- `return p` → pointer is **returned** (exempt from leak checks)
- Scope exit → any **owned** pointer still alive = **leak warning**

When a **freed** pointer is used (read, dereferenced, passed to a function,
or freed again), the checker emits an **error** with the exact line where
the free happened.

## Limitations

This is an intraprocedural analysis (single function at a time). It does not:

- Track ownership across function call boundaries
- Analyse conditional paths (if one branch frees and the other doesn't)
- Handle struct fields that are pointers
- Expand preprocessor macros

These are areas for future improvement.
