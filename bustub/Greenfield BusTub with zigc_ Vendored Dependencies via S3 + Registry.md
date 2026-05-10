# Greenfield BusTub with zigc
## Problem
Recreate the bustub C++ project (currently CMake-based with 11 vendored third-party libs) as a pure `zigc` project. No CMake anywhere — all deps managed via `zigc add`, hosted as vendored Zig packages (potentially on S3), and registered in the zigc global registry.
## Current State
BusTub vendors 11 third-party libraries in `third_party/`, each built via CMake `add_subdirectory()`. The main project links against them as static libraries. The `zigc` tooling expects each dependency to be a **Zig package** (with `build.zig` + `build.zig.zon`) that exposes a compiled artifact via `dep.artifact("name")`.
## Dependency Audit
**Compilable deps (produce static libs):**
* `murmur3` — 1 source file, trivial
* `linenoise` — 2 source files, trivial
* `libfort` — small C lib (a few core .c files, rest are tests)
* `utf8proc` — small C lib (a few core .c files + generated data)
* `libpg_query` — 11 source files, extracted from duckdb
* `fmt` — C++ formatting lib (~10 core .cc files, rest are tests)
* `googletest` — C++ test framework (~10 core .cc files, rest are tests)
**Header-only deps (no compiled artifact):**
* `argparse` — C++ header-only (`include/argparse/argparse.hpp`)
* `backward-cpp` — C++ header-only (`backward.hpp`)
* `cpp_random_distributions` — C++ header-only
* `readerwriterqueue` — C++ header-only (`readerwriterqueue.h`)
## Proposed Approach
### 1. Scaffold the project
```warp-runnable-command
zigc init bustub --cpp
```
This gives us `build.zig`, `build.zig.zon`, and `src/main.cpp`. We'll then manually restructure `src/` to match bustub's layout and adjust `build.zig` to compile all the bustub source modules (binder, buffer, catalog, common, execution, etc.) instead of just `main.cpp`.
### 2. Package each dependency as a Zig package
Each dep needs its own standalone directory containing:
* The library source code (vendored)
* A `build.zig` that compiles it into a static library using `b.addStaticLibrary()`
* A `build.zig.zon` with name, version, paths
Example for `murmur3` (simplest case):
```warp-runnable-command
murmur3/
  src/MurmurHash3.c
  src/MurmurHash3.h
  build.zig          # addStaticLibrary, addCSourceFiles, installHeadersDirectory
  build.zig.zon      # .name = .murmur3, .version = "1.0.0"
```
The `build.zig` for each package must expose its artifact so the consuming project can do `dep.artifact("murmur3")`.
### 3. Handle header-only deps
The current `zigc add` flow calls `mod.linkLibrary(dep.artifact("name"))`, which requires a compiled artifact. Header-only libraries don't produce one. Two options:
**Option A (recommended): Create stub static libs.** Each header-only dep still uses `addStaticLibrary` but with zero source files — it just exposes headers via `installHeadersDirectory`. The consuming `build.zig` would use `dep.artifact("argparse")` and get the include paths.
**Option B: Extend zigc.** Add a `--header-only` flag to `zigc add` that inserts only include-path boilerplate (`mod.addIncludePath(dep.path("include"))`) instead of `linkLibrary`. This is cleaner but requires modifying zigc.
Option B is the better long-term solution and could be a relatively small change to `insertBuildLink`.
### 4. Host packages on S3
The Zig build system supports fetching tarballs from HTTP URLs. Workflow:
1. For each dep, create the Zig package directory (source + `build.zig` + `build.zig.zon`)
2. Tar and gzip it: `tar czf murmur3-1.0.0.tar.gz murmur3/`
3. Upload to S3: `aws s3 cp murmur3-1.0.0.tar.gz s3://your-bucket/zigc-packages/`
4. Add via URL: `zigc add https://your-bucket.s3.amazonaws.com/zigc-packages/murmur3-1.0.0.tar.gz`
Alternatively, push each to its own git repo and use `git+https://` URLs (matches the allyourcodebase pattern).
### 5. Register in zigc global registry
Add entries to `registry.json` so any user can `zigc add murmur3` by name:
```json
"murmur3": {
  "url": "https://your-bucket.s3.amazonaws.com/zigc-packages/murmur3-1.0.0.tar.gz",
  "hash": "<hash-from-zig-fetch>",
  "lib": "murmur3"
}
```
The hash is obtained by running `zig fetch <url>` which downloads and computes the content hash.
### 6. Final project assembly
```warp-runnable-command
zigc init bustub --cpp
cd bustub
zigc registry update
zigc add murmur3
zigc add linenoise
zigc add libfort
zigc add utf8proc
zigc add libpg_query
zigc add fmt
zigc add googletest
zigc add argparse --header-only    # (if Option B implemented)
zigc add backward-cpp --header-only
zigc add cpp_random_distributions --header-only
zigc add readerwriterqueue --header-only
zigc build
```
## Key Challenges & Decisions
**1. Header-only deps:** Needs either a zigc extension (Option B above) or a workaround with stub libs. This is the biggest gap in the current tooling.
**2. C++ deps:** `fmt` and `googletest` are C++ libs. The dep packages' `build.zig` files need to use `link_libcpp = true` and `.flags = &.{"-std=c++17"}`. The consuming project also needs `link_libcpp`. The current zigc C++ template already handles this.
**3. libpg_query provenance:** This was extracted from duckdb's tree, not from an upstream repo. The vendored copy would need to be packaged as-is.
**4. S3 vs Git hosting:** S3 tarballs are simpler for vendored code with no upstream. Git repos are better if the packages will evolve. Could use S3 initially and migrate to git repos later.
**5. build.zig complexity:** The scaffolded `build.zig` from `zigc init` compiles a single `src/main.cpp`. BusTub has 13 source subdirectories. The `build.zig` would need significant manual expansion to `addCSourceFiles` for each module, set include paths, etc. This is the part that replaces the CMake build system.
## Execution Order
1. Start with the two simplest compilable deps (`murmur3`, `linenoise`) as proof-of-concept Zig packages
2. Add the `--header-only` support to zigc for header-only deps
3. Package the remaining compilable deps
4. Package the header-only deps
5. Upload all packages to S3, run `zig fetch` to get hashes
6. Add all entries to `registry.json`
7. Scaffold bustub, add all deps, build the main project
