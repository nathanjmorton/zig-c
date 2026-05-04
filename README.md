# zigc

A C project and package manager built on top of [Zig's build system](https://ziglang.org/learn/build-system/).

`zigc` handles scaffolding, dependency management, build orchestration, integrity checking, and binary symbol inspection — all without writing a build script by hand.

**Requires Zig 0.16.0.**

---

## Project structure

```
zig-c/
├── src/
│   ├── main.zig      # All commands, parsers, and integrity helpers
│   └── tests.zig     # 45 tests: unit (pure functions) + integration (full CLI)
├── build.zig         # Zig build script for zigc itself
├── build.zig.zon     # Package manifest (depends on lz4 for the hello.c demo)
├── hello.c           # lz4 compression demo — proves the package pipeline works
└── README.md
```

### Inside `src/main.zig`

| Symbol | Role |
|---|---|
| `Check` struct | Accumulates ✓ / ! / ✗ results; shared by `check` and `verify` |
| `Dependency` struct | `{ key, url }` pair parsed from `build.zig.zon` |
| `parseZonDeps` | Brace-depth scanner for `.dependencies = .{…}` |
| `parseZonPaths` | Extracts quoted strings from `.paths = .{…}` |
| `parseBuildDeps` | Collects (deduplicated) `b.dependency("key")` calls from `build.zig` |
| `insertBuildLink` | Injects `b.dependency` + `mod.linkLibrary` before `addExecutable` (idempotent) |
| `removeBuildLink` | Strips linking lines matching `<key>_dep` |
| `removeZonDep` | Removes a named dep block from `build.zig.zon` |
| `insertFingerprint` | Appends `.fingerprint` before the closing `}` |
| `buildArgv` | Constructs `zig build` argv with flag translation and `-Dcflags=` passthrough |
| `execZig` | Runs a zig subcommand; auto-inserts missing fingerprint and retries |
| `cmdInit` … `cmdVerify` | Nine command handlers |

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

A complete example: create a project, add a C library, inspect the build, verify it.

### 1 — Create a project

```sh
zigc init my-app
cd my-app
```

Scaffolds:

```
my-app/
  src/main.c        # hello-world entry point
  build.zig         # generated Zig build script
  build.zig.zon     # package manifest
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

Dependencies are pulled from any URL `zig fetch` understands — typically a tagged release from [allyourcodebase](https://github.com/allyourcodebase).

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

### 4 — Inspect dependencies

```sh
zigc list
```

```
1 dependency:
  lz4
    git+https://github.com/allyourcodebase/lz4.git?ref=1.10.0-6#41f52a...
```

Remove a dependency (strips it from `build.zig.zon` **and** the linking lines from `build.zig`):

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

### 6 — Inspect object files and symbols

After building, `zigc verify` confirms the compilation produced valid artifacts:

```sh
zigc verify
```

```
zigc verify

Compiled libraries (.zig-cache):
  ✓ liblz4.a  (0.6 MB)  — dep 'lz4'

Binary artifacts (zig-out/bin):
  ✓ 'my-app' — Mach-O 64-bit executable arm64  (12.3 KB)

Symbol analysis (my-app):
  ✓ main entrypoint defined
  ✓ 14 defined symbols,  8 undefined (OS / libc calls)

Dependency symbols:
  ✓ dep 'lz4' — 38 symbols compiled in  (e.g. lz4_open, lz4_exec…)

5 ok, 0 warnings, 0 errors
```

Pass `--symbols` to print the first 50 defined symbols with type codes (`T`=code, `D`=data):

```sh
zigc verify --symbols
```

### 7 — Clean build artifacts

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
| `zigc check [--build]` | Verify manifest fields, paths, and dep consistency |
| `zigc verify [--symbols]` | Inspect compiled object files and binary symbol table |
| `zigc build [flags]` | Compile the project (`zig build`) |
| `zigc run [flags]` | Compile and run (`zig build run`) |
| `zigc clean` | Remove `.zig-cache/` and `zig-out/` |
| `zigc help` | Print usage |

### `zigc build` / `zigc run` — flag passthrough

Both commands accept flags that are translated or forwarded to `zig build`:

| Flag | Becomes |
|---|---|
| `-O3`, `-O2`, `-O1`, `-Ofast` | `-Doptimize=ReleaseFast` |
| `-Os` | `-Doptimize=ReleaseSmall` |
| `-Og`, `-O` | `-Doptimize=ReleaseSafe` |
| `-Doptimize=…`, `--verbose`, any `-D…`/`--…` | passed through unchanged |
| `-Wall`, `-Werror`, `-DDEBUG`, any other `-flag` | accumulated into `-Dcflags=flag1,flag2,…` |
| `-- arg` | separator; `arg` is passed to the running program (`run` only) |

```sh
zigc build -O3                 # → zig build -Doptimize=ReleaseFast
zigc build -Wall -Werror       # → zig build -Dcflags=-Wall,-Werror
zigc build -O3 -Wall -DNDEBUG  # → zig build -Doptimize=ReleaseFast -Dcflags=-Wall,-DNDEBUG
zigc run   -- myarg            # → zig build run -- myarg
```

The `-Dcflags=` option is wired into the generated `build.zig` so the extra flags reach the C compiler alongside the defaults (`-std=c11 -Wall -Wextra`).

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
| Every `b.dependency()` in `build.zig.zon` | error | Dangling reference (build failure) |
| `zig build` succeeds | error | Compilation errors (`--build` only) |

### `zigc verify` — what is inspected

| Layer | Tool | Checks |
|---|---|---|
| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matched to dep keys by filename |
| Binary format | `file(1)` | Valid executable; architecture (Mach-O arm64 / ELF x86-64 …) |
| Symbol table | `nm -g` | `main` entrypoint defined; defined vs undefined counts; dep symbols present |

---

## How it works

`zigc` generates and manipulates two files per project:

- **`build.zig`** — a Zig build script using the 0.16.0 module API (`b.createModule`, `mod.addCSourceFiles`, `mod.linkLibrary`)
- **`build.zig.zon`** — the package manifest that pins dependency URLs and content hashes

**`zigc add` flow:**
1. Snapshot existing dep keys from `build.zig.zon`
2. Run `zig fetch --save <url>` to resolve and pin the package
3. Diff before/after to identify the new dep key
4. Insert `b.dependency(…)` + `mod.linkLibrary(…)` into `build.zig`

**Fingerprint handling:** Zig 0.16.0 requires a `.fingerprint` field in `build.zig.zon`. `zigc` captures the suggested value from `zig fetch`'s stderr on first use and inserts it automatically.

**Flag translation:** `zigc build -O3 -Wall` is translated to `zig build -Doptimize=ReleaseFast -Dcflags=-Wall` by the `buildArgv` helper before invoking `zig build`. The generated `build.zig` template accepts the `-Dcflags` option and appends each comma-separated flag to the C compiler invocation.

**Static linking:** `zigc add` links deps statically by default. `zigc verify` confirms this by checking that dep symbols (e.g. `sqlite3_`, `lz4_`) are present directly in the final binary.

---

## Running the test suite

```sh
zig build test --summary all
```
