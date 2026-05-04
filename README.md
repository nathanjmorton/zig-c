# zigc

A C project and package manager built on top of [Zig's build system](https://ziglang.org/learn/build-system/).

`zigc` wraps `zig build` and `zig fetch` to give you a clean CLI for creating C projects, managing dependencies from the [allyourcodebase](https://github.com/allyourcodebase) ecosystem, and verifying project integrity — all without writing build scripts by hand.

**Requires Zig 0.16.0.**

---

## Installation

```sh
git clone https://github.com/nathanjmorton/zig-c
cd zig-c
zig build -Doptimize=ReleaseFast
```

The binary lands at `zig-out/bin/zigc`. Add it to your `PATH`:

```sh
export PATH="$PWD/zig-out/bin:$PATH"
```

---

## Workflow

A complete example from project creation through adding a C library dependency and running the result.

### 1 — Create a project

```sh
zigc init my-app
cd my-app
```

This scaffolds:

```
my-app/
  src/main.c        # hello-world entry point
  build.zig         # Zig build script (auto-generated, ready to edit)
  build.zig.zon     # package manifest (name, version, deps)
  .gitignore
```

### 2 — Build and run

```sh
zigc build         # compiles → zig-out/bin/my-app
zigc run           # build + run in one step
```

```
Hello from my-app!
```

### 3 — Add a dependency

Dependencies are pulled from any URL that `zig fetch` understands — typically a tagged release from [allyourcodebase](https://github.com/allyourcodebase).

```sh
zigc add git+https://github.com/allyourcodebase/lz4.git#1.10.0-6
```

```
info: resolved ref '1.10.0-6' to commit 41f52ab...
Added 'lz4' and linked in build.zig.
  artifact: lz4_dep.artifact("lz4")
```

`zigc` automatically:
- Runs `zig fetch --save` to pin the URL and content hash in `build.zig.zon`
- Detects the new package key (`lz4`)
- Injects the linking boilerplate into `build.zig`:

```zig
const lz4_dep = b.dependency("lz4", .{ .target = target, .optimize = optimize });
mod.linkLibrary(lz4_dep.artifact("lz4"));
```

Now edit `src/main.c` to use the library:

```c
#include <stdio.h>
#include <string.h>
#include <lz4.h>

int main(void) {
    const char *src = "Hello, compressed world!";
    int src_len = (int)strlen(src) + 1;
    char buf[256];

    int n = LZ4_compress_default(src, buf, src_len, (int)sizeof(buf));
    printf("Compressed %d bytes \u2192 %d bytes\n", src_len, n);
    return 0;
}
```

```sh
zigc build
zigc run
```

```
Compressed 25 bytes → 26 bytes
```

### 4 — Inspect and manage dependencies

```sh
zigc list
```

```
1 dependency:
  lz4
    git+https://github.com/allyourcodebase/lz4.git?ref=1.10.0-6#41f52a...
```

Remove a dependency (strips it from `build.zig.zon` **and** removes the linking lines from `build.zig`):

```sh
zigc remove lz4
```

### 5 — Verify project integrity

```sh
zigc check
```

```
zigc check

Required files:
  ✓ build.zig found
  ✓ build.zig.zon found

build.zig:
  ✓ pub fn build(b: *std.Build) declared

build.zig.zon fields:
  ✓ .name is set
  ✓ .version is set
  ✓ .minimum_zig_version is set
  ✓ .fingerprint is set

.paths entries:
  ✓ 'build.zig' exists on disk
  ✓ 'build.zig.zon' exists on disk
  ✓ 'src' exists on disk

Dependency consistency:
  ✓ dep 'lz4' declared in zon is linked in build.zig

10 ok, 0 warnings, 0 errors
```

Pass `--build` to also compile:

```sh
zigc check --build
```

### 6 — Clean build artifacts

```sh
zigc clean        # removes .zig-cache/ and zig-out/
```

---

## Command reference

| Command | Description |
|---|---|
| `zigc init <name>` | Scaffold a new C project in `./<name>/` |
| `zigc add <url> [--lib <name>]` | Fetch a dependency and auto-link it in `build.zig` |
| `zigc remove <name>` | Remove a dependency from the manifest and `build.zig` |
| `zigc list` | Show all declared dependencies and their pinned URLs |
| `zigc check [--build]` | Verify manifest, paths, and dep consistency; optionally compile |
| `zigc build` | Compile the project (`zig build`) |
| `zigc run` | Compile and run (`zig build run`) |
| `zigc clean` | Remove `.zig-cache/` and `zig-out/` |
| `zigc help` | Print usage |

### `zigc add` — artifact name override

When the package's artifact name differs from its dep key (uncommon), use `--lib`:

```sh
zigc add git+https://github.com/allyourcodebase/grpc.git#master --lib grpc
```

### `zigc check` — what is verified

| Check | Severity | Catches |
|---|---|---|
| `build.zig` exists | error | Missing build script |
| `build.zig.zon` exists | error | Missing manifest |
| `pub fn build(...)` declared | error | Malformed build script |
| `.name`, `.version` set | error / warn | Incomplete manifest |
| `.fingerprint` set | warn | Missing (auto-inserted by `zigc add`) |
| All `.paths` entries on disk | error | Stale manifest entries |
| Every zon dep linked in `build.zig` | warn | Declared but unused |
| Every `b.dependency()` in `build.zig.zon` | error | Dangling reference (will fail at build time) |
| `zig build` succeeds | error | Compilation errors (only with `--build`) |

---

## How it works

`zigc` is a thin Zig CLI that generates and manipulates two files:

- **`build.zig`** — a Zig build script using Zig 0.16.0’s module API (`b.createModule`, `mod.addCSourceFiles`, `mod.linkLibrary`)
- **`build.zig.zon`** — the package manifest that pins dependency URLs and content hashes

When you run `zigc add`, it:
1. Snapshots the existing deps in `build.zig.zon`
2. Calls `zig fetch --save <url>` to resolve and pin the package
3. Diffs before/after to identify the new dep key
4. Writes the `b.dependency(…)` + `mod.linkLibrary(…)` boilerplate into `build.zig`

The fingerprint in `build.zig.zon` is automatically inserted the first time `zigc add` (or `zigc build`) is called on a project that doesn’t have one yet.

---

## Running the test suite

```sh
zig build test --summary all
```
