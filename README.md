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
│   └── tests.zig     # Unit (pure functions) + integration (full CLI) tests
├── build.zig         # Zig build script for zigc itself
├── build.zig.zon     # Package manifest (depends on lz4 for the hello.c demo)
├── registry.json     # Package registry: friendly name → url + hash + lib
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
| `RegistryEntry` struct | `{ url, hash, lib }` for a named package in the registry |
| `registryLookup` | Reads `~/.zigc/registry.json`, returns a duped `RegistryEntry` |
| `registryLookupFromJson` | Parses raw JSON registry content for a given key |
| `extractJsonArrayField` | Pulls field values from a JSON array of objects |
| `extractJsonNestedField` | Extracts a nested string field from the first JSON array element |
| `insertBuildLink` | Injects `b.dependency` + `mod.linkLibrary` before `addExecutable` (idempotent) |
| `insertZonDep` | Writes a `.dep = .{ .url, .hash }` block directly into `build.zig.zon` |
| `removeBuildLink` | Strips linking lines matching `<key>_dep` |
| `removeZonDep` | Removes a named dep block from `build.zig.zon` |
| `insertFingerprint` | Appends `.fingerprint` before the closing `}` |
| `buildArgv` | Constructs `zig build` argv with flag translation and `-Dcflags=` passthrough |
| `execZig` | Runs a zig subcommand; auto-inserts missing fingerprint and retries |
| `cmdInit` … `cmdRegistryGenerate` | Eleven command handlers |

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

The simplest way is to use a friendly name from the registry:

```sh
zigc registry update     # fetch the package registry (first time)
zigc add lz4             # resolve from registry and link
```

```
Added 'lz4' from registry and linked in build.zig.
  artifact: lz4_dep.artifact("lz4")
```

You can also pass a full URL directly (no registry needed):

```sh
zigc add git+https://github.com/allyourcodebase/lz4.git#1.10.0-6
```

**Registry-based flow** (`zigc add <name>`):
- Looks up the name in `~/.zigc/registry.json` (pre-computed URL + hash)
- Writes the dependency directly to `build.zig.zon` — no network fetch needed
- Injects the linking boilerplate into `build.zig`

**URL-based flow** (`zigc add <url>`):
- Runs `zig fetch --save` to pin the URL and content hash in `build.zig.zon`
- Detects the new package key
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

### 7 — Build for WebAssembly

`zigc` can cross-compile C and C++ projects to WebAssembly with a single flag.

**Install a WASM runtime** (one-time):

```sh
brew install wasmtime
```

**Create a project and build for WASI:**

```sh
zigc init hello-wasm
cd hello-wasm
zigc build --wasi
```

This produces `zig-out/bin/hello-wasm.wasm` — a WASI executable with wasi-libc linked. Standard C I/O (`printf`, `argc`/`argv`, file access) works out of the box.

**Run it:**

```sh
wasmtime zig-out/bin/hello-wasm.wasm
```

```
Hello from hello-wasm!
```

Pass arguments directly after the `.wasm` file:

```sh
wasmtime zig-out/bin/hello-wasm.wasm Nathan
```

**Two WASM targets are available:**

| Flag | Target | libc | Use case |
|---|---|---|---|
| `--wasi` | `wasm32-wasi` | wasi-libc | Programs that use stdio, malloc, filesystem |
| `--wasm` | `wasm32-freestanding` | none | Library modules that export functions (no libc) |

`--wasi` is the right choice for most C programs (e.g. compiling sqlite3 to WASM). `--wasm` is for freestanding library modules where you export individual functions and call them from JavaScript or another host.

Both flags combine with other build flags:

```sh
zigc build --wasi -Os              # optimized for size
zigc build --wasi -DSQLITE_OMIT_LOAD_EXTENSION   # with C defines
```

### 8 — Clean build artifacts

```sh
zigc clean        # removes .zig-cache/ and zig-out/
```

---

## Command reference

| Command | Description |
|---|---|
| `zigc init <name>` | Scaffold a new C project in `./<name>/` |
| `zigc add <name\|url> [--lib <name>]` | Add a dependency by registry name or URL |
| `zigc remove <name>` | Remove a dependency from the manifest and `build.zig` |
| `zigc list` | Show all declared dependencies and their pinned URLs |
| `zigc registry update` | Fetch the latest package registry to `~/.zigc/registry.json` |
| `zigc registry generate [--limit N]` | Scrape `allyourcodebase` org → `registry.json` in cwd |
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
| `--wasm` | `-Dtarget=wasm32-freestanding` |
| `--wasi` | `-Dtarget=wasm32-wasi` |
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

### `zigc registry generate` — scraping allyourcodebase

This is a maintainer command that auto-populates `registry.json` by scraping the [allyourcodebase](https://github.com/allyourcodebase) GitHub org.

```sh
zigc registry generate              # scrape all repos (slow, ~117 repos)
zigc registry generate --limit 10   # test with first 10 repos
```

The unauthenticated GitHub API rate limit is 60 requests/hour, which is not enough for a full scrape (~120 repos × 2 API calls + fetches). Set `GITHUB_TOKEN` for 5000 req/hr:

```sh
export GITHUB_TOKEN=ghp_your_token_here
zigc registry generate
```

You can create a token at [github.com/settings/tokens](https://github.com/settings/tokens) — no special scopes are needed (public repo read access is sufficient).

The command writes `registry.json` to the current directory. Repos without tags or whose `zig fetch` fails are skipped with a message.

### Registry synchronization workflow

The registry has two sides: a **source file** (`registry.json` in the zig-c repo) and a **local cache** (`~/.zigc/registry.json` on each user's machine).

```
┌────────────────────────────────────────────────────────────────┐
│  Maintainer (one-time, in the zig-c repo checkout)         │
│                                                            │
│  export GITHUB_TOKEN=ghp_...                               │
│  zigc registry generate    # scrapes allyourcodebase       │
│  git add registry.json && git commit && git push           │
└────────────────────────────────────────────────────────────────┘
                              │
                    git push to GitHub
                              │
                              ▼
          registry.json on main branch
          (raw.githubusercontent.com/nathanjmorton/zig-c/main/registry.json)
                              │
                    curl (via zigc)
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│  User (any machine)                                        │
│                                                            │
│  zigc registry update      # downloads to ~/.zigc/         │
│  zigc add zstd             # resolves from local cache     │
└────────────────────────────────────────────────────────────────┘
```

- **`zigc registry generate`** — maintainer tool. Scrapes `allyourcodebase`, runs `zig fetch` for each tagged repo, and writes `registry.json` in the current directory. Commit and push this file to make it available to users.
- **`zigc registry update`** — user tool. Fetches `registry.json` from the zig-c repo’s raw GitHub URL and saves it to `~/.zigc/registry.json`.
- **`zigc add <name>`** — reads `~/.zigc/registry.json` locally. No network call needed at add time since the URL and hash are pre-computed in the registry.

To refresh the registry with new packages, a maintainer runs `generate`, commits, and pushes. Users then run `update` to pull the latest.

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

**`zigc add <name>` flow (registry):**
1. Look up `name` in `~/.zigc/registry.json`
2. Write the pre-computed URL + hash directly into `build.zig.zon`
3. Insert `b.dependency(…)` + `mod.linkLibrary(…)` into `build.zig`

**`zigc add <url>` flow (direct):**
1. Snapshot existing dep keys from `build.zig.zon`
2. Run `zig fetch --save <url>` to resolve and pin the package
3. Diff before/after to identify the new dep key
4. Insert `b.dependency(…)` + `mod.linkLibrary(…)` into `build.zig`

**`zigc registry generate` flow:**
1. Fetch all repos from the `allyourcodebase` GitHub org (paginated API)
2. For each repo with tags: get the latest tag name + commit SHA
3. Run `zig fetch` to compute the content hash
4. Write `registry.json` with `name → { url, hash, lib }` entries

Supports `GITHUB_TOKEN` env var for authenticated API access (5000 req/hr vs 60). Use `--limit N` for testing.

**Fingerprint handling:**

**Flag translation:** `zigc build -O3 -Wall` is translated to `zig build -Doptimize=ReleaseFast -Dcflags=-Wall` by the `buildArgv` helper before invoking `zig build`. The generated `build.zig` template accepts the `-Dcflags` option and appends each comma-separated flag to the C compiler invocation.

**Static linking:** `zigc add` links deps statically by default. `zigc verify` confirms this by checking that dep symbols (e.g. `sqlite3_`, `lz4_`) are present directly in the final binary.

---

## Running the test suite

```sh
zig build test --summary all
```
