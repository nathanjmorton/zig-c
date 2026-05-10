# zigc Website, Install Script & Release Infrastructure
## Problem
zigc currently requires cloning and building from source. We need:
* A `curl | bash` install script (like bun.sh)
* A Remix 3 landing page/content site
* A GitHub Actions workflow to produce release binaries
* A `zigc upgrade` self-update command
* Homebrew formula instructions for the future
## Current State
* Repo: `github.com/nathanjmorton/zigc`
* Version: 0.1.0 (in `build.zig.zon`)
* No GitHub Actions, no releases, no website
* Builds with `zig build -Doptimize=ReleaseFast` → single binary at `zig-out/bin/zigc`
* Targets: macOS arm64/x86_64, Linux x86_64/aarch64 (Zig cross-compiles natively)
## Proposed Changes
### 1. GitHub Actions release workflow
File: `.github/workflows/release.yml`
* Trigger on tag push (`v*`)
* Use Zig 0.16.0 to cross-compile for 4 targets:
    * `aarch64-macos` (Apple Silicon)
    * `x86_64-macos` (Intel Mac)
    * `x86_64-linux-gnu`
    * `aarch64-linux-gnu`
* Package each as `zigc-<target>.tar.gz`
* Create a GitHub release with all 4 tarballs attached
### 2. Install script
File: `install.sh` (served from raw GitHub or the website)
* One-liner: `curl -fsSL https://raw.githubusercontent.com/nathanjmorton/zigc/main/install.sh | bash`
* Detects platform via `uname -ms`
* Downloads the correct tarball from GitHub releases (latest or pinned version)
* Installs to `~/.zigc/bin/zigc`
* Adds `ZIGC_INSTALL` and `PATH` to shell config (bash/zsh/fish)
* Colored output, error handling, Rosetta detection (matching bun's style)
### 3. `zigc upgrade` command
Added to `src/main.zig`:
* Fetches latest release tag from GitHub API
* Compares to current version (embedded at compile time or from `build.zig.zon`)
* Downloads the correct binary for the current platform
* Replaces itself in-place
* Prints old → new version
### 4. Remix 3 website
Scaffolded with `npx remix@next new` in a `www/` directory inside the repo.
Pages:
* **Landing page** (`/`) — hero with curl one-liner, feature grid, quick-start walkthrough
* **Docs page** (`/docs`) — rendered from the existing README content (install, workflow, commands)
Design: minimal, dark theme, monospace accents — similar to bun.sh's clean developer aesthetic.
### 5. Homebrew formula (instructions only)
Add a `HOMEBREW.md` or section in README with:
* Template `Formula/zigc.rb` pointing to GitHub release tarballs
* Instructions for creating a tap (`homebrew-zigc`)
* Note about `brew upgrade zigc` vs `zigc upgrade` conflict avoidance
