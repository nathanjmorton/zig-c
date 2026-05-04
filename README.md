# zigc

A C project and package manager built on top of [Zig's build system](https://ziglang.org/learn/build-system/).

`zigc` handles scaffolding, dependency management, build orchestration, integrity checking, and binary symbol inspection — all without writing a build script by hand.

**Requires Zig 0.16.0.**

---

## Project structure

```
zig-c/
├── src/
│   ├── main.zig      # All commands, parsers, and integrity helpers (~1 000 lines)
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
| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| `p| ` | Extracts quoted strings from `.paths = .{…}` |
| `parseBuildDeps` | Collects (deduplicated) `b.dependency("key")` calls from `build.zig` |
| `insertBuildLink` | Injects `b.dependency` + `mod.lin| `insertBuildLink` | Iecutable` (idempotent) |
| `removeBuildLink` | Strips linking lines matching `<key>_dep` |
| `removeZonDep` | Removes a named dep block from `build.zig.zon` |
| `insertFingerprint` | Appends `.fingerprint` before the closing `}` |
| `exe| `exe| `exe| `exe| `exe| `exe| `exe| `exe| `exe| `exe| `exe|nt and retries |
| `cmdInit` … `cmdVerify` | Nine command handlers |

---

## Install## Install## Install## Install## Install## Install## Install## Install## Instald -Doptimize=ReleaseFast
```

The binary lands at `zig-out/bin/zigc`. Add it to your `PATHThe binary lands at `zig-out/bin/zigc`. Add it to your `PATHThe binary lands at `zigmple: create a project, add a C library, inspect the build, verify it.

### 1 — Create a project

```sh
zigc init my-app
cd my-app
```

Scaffolds:

```
my-app/
  src/main.c        # hello-world entry point
  build.  build.  build.  build.  build.  build.  build.  build.  build.  build.  build.  build.  re
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

Dependencies are pulled from any URL `zig fetch` understands — typically a tagged release from [allyourcodebaseDependencies are pulled from any URL `zig fetch` understands — typically a taggyourcodebase/lz4.git#1.10.0-6
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
````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````ersion is set
  ✓ .fingerprint is set

.paths entries:
  ✓ 'build.zig' exists on disk
  ✓ 'build.zig.zon' exists on disk
  ✓ 'src' exists on disk

DependeDependeDependeDependeDependeDependeDependeDependeDependeDependeDependeDepe0 ok, 0 warnings, 0 errors
```

Pass `--build` to also compile:

```sh
zigc check --build
```

### 6 — Inspect object files and symbols

After building, `zigc verify` confirms the compilation produced valid artifacts:

```sh
zigzigzigzigzigzigzigzigzigzigzi

Compiled libraries (.zig-cCompiled lib liblz4.a  (0.6 MB)  — dep 'lz4'

Binary artifacts (zig-out/bin):
  ✓ 'my-app' —   ✓ 'my-app' —   ✓ 'my-app' —   ✓ 'my-app' —   ✓ 'my-app' —   ✓ 'my-app' — ned
  ✓ 14 defined symbols,  8 undefined (OS / libc calls)

Dependency symbols:
  ✓ dep 'lz4' — 38 symbols compiled in  (e.g. lz4_open, lz4_exec…)

5 ok, 0 warnings, 0 errors
```

Pass `--symbols` to print the first 50 defined symbols with type codes (`T`=code, `D`=data):

```sh
zigc verify --symbols
```

### 7 ### 7 ### 7 ### 7 ### 7 s

```sh
zigc clean        # removes .zig-cache/ and zig-out/
```

---

## Command reference

| Command | Description| Command | Description| Command | Description| Command | Description| Command | Description| Command | Deme>]` | Fetch a dependency and auto-link| Coin `build.zig` |
| `zigc r| `zigc r| `zigc r| `zigc r| `zigc r| `zithe| `zigc r| `zigc r| `zigc r| `zigc r| `zigc r| `zithe| `zigc r| `zigc r| `zigd their pin| `zigc r| `zigc r| `zigc r| `zld]` | Verify manifest fields, paths, and dep consistency |
| `zigc verify [--symbols]` | Inspect compiled ob| `zigc verify [--symbols]` | Inspect compiled ob| `zigc verify [--symbols]` | Inspect compiled ob| `zigc verify [-- run (`zig build run`) |
| `zigc clean` | Remove `.zig-cache/` and `zig-out/` |
| `zigc clean` | Remove `.zig-cache/` and `zig-out/` |
c verify [--symbe

When the package's artifact nameWhen the package's artifact nameWhen the package's artifact nameWhen the package's artifactllyourcodebase/grpc.git#master --libWhen the package's artifact na� what isWhen the package's artifact nameWhen the package's ---|
| `buil| `buil| `buil| `buor | `buil| `buil| `buil| `buor | `buil| `buil| `buil| `buor | `buil| `buil| `buil| `buor | `buil| `buil| `buil| `buor | `buil| `buil| `buil| `buor | `buil| `buil| `buil| `buor | `buil| `builIncomplete manifest |
| `.fingerprint` set | warn | Missing (auto-inserted by `zigc add`) |
| All `.paths` entries on disk | error | Stale manifest entries |
| Every zon dep linked in `build.zig` | warn | Declared but unused |
| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Every| Everyrify` — what is inspected

| Layer | Tool | Checks |
|---|---|---|
| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matche| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matche| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matche| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matche| Objezi| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matche| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exist; matche| Object files (`.zig-cache`) | `find … lib*.a` | Static libraries exipins dependency URLs and content hashes

**`zigc add` flow:**
1. Snapshot1. Snapshot1. Snapshot1. Snapshot1. Snapshot1. Snapshot1. Snsave <1. Snapshot1. Snapshot1. Snapshot1. Snapshot1. Snapshot1. Snapshotify the new dep key
4. Insert `b.dependency(…)` + `mod.linkLibrary(…)` into `build.zig`

**Fingerprint handling:** Zig 0.16.0 requires a `.fingerprint` field in `build.zig.zon`. `zigc` captures the suggested value from `zig fetch`'s stderr on first use and inserts it automatically.

**Static linking:** `zigc add` links deps statically by default. `zigc verify` confirms this by checking that dep symbols (e.g. `sqlite3_`, `lz4_`) are present directly in the final binary.

---

## Running the test suite

```sh
zig build test --summary all
```
