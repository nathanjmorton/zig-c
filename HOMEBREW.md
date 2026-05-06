# Homebrew distribution for zigc

This document covers the full process for distributing zigc through Homebrew,
from a personal tap to an eventual `homebrew-core` submission.

---

## 1. Create a Homebrew tap

A tap is a GitHub repo named `homebrew-<name>` that contains your formula files.

```sh
# Create the repo on GitHub
gh repo create nathanjmorton/homebrew-zigc --public --clone
cd homebrew-zigc
mkdir Formula
```

## 2. Write the formula

Create `Formula/zigc.rb`:

```ruby
class Zigc < Formula
  desc "C/C++ project & package manager powered by Zig's build system"
  homepage "https://github.com/nathanjmorton/zigc"
  version "0.1.0"
  license "MIT"

  on_macos do
    on_arm do
      url "https://github.com/nathanjmorton/zigc/releases/download/v#{version}/zigc-aarch64-macos.tar.gz"
      sha256 "REPLACE_WITH_ACTUAL_SHA256"
    end
    on_intel do
      url "https://github.com/nathanjmorton/zigc/releases/download/v#{version}/zigc-x86_64-macos.tar.gz"
      sha256 "REPLACE_WITH_ACTUAL_SHA256"
    end
  end

  on_linux do
    on_arm do
      url "https://github.com/nathanjmorton/zigc/releases/download/v#{version}/zigc-aarch64-linux-gnu.tar.gz"
      sha256 "REPLACE_WITH_ACTUAL_SHA256"
    end
    on_intel do
      url "https://github.com/nathanjmorton/zigc/releases/download/v#{version}/zigc-x86_64-linux-gnu.tar.gz"
      sha256 "REPLACE_WITH_ACTUAL_SHA256"
    end
  end

  def install
    bin.install "zigc"
  end

  test do
    system "#{bin}/zigc", "help"
  end
end
```

## 3. Generate sha256 hashes

After a GitHub release is published (triggered by `git tag v0.1.0 && git push origin v0.1.0`),
download each tarball and compute its sha256:

```sh
VERSION=0.1.0

for target in aarch64-macos x86_64-macos x86_64-linux-gnu aarch64-linux-gnu; do
  URL="https://github.com/nathanjmorton/zigc/releases/download/v${VERSION}/zigc-${target}.tar.gz"
  echo "${target}: $(curl -fsSL "$URL" | shasum -a 256 | cut -d' ' -f1)"
done
```

Replace each `REPLACE_WITH_ACTUAL_SHA256` in the formula with the corresponding hash.

## 4. Install from your tap

```sh
brew tap nathanjmorton/zigc
brew install zigc
```

Users can then upgrade with:

```sh
brew upgrade zigc
```

## 5. Release workflow

When you tag a new version:

1. Update `VERSION` in `src/main.zig` and `build.zig.zon`.
2. Commit and tag:
   ```sh
   git tag v0.2.0
   git push origin v0.2.0
   ```
3. Wait for the GitHub Actions release workflow to finish.
4. Recompute sha256 hashes (step 3 above).
5. Update `Formula/zigc.rb` in the `homebrew-zigc` repo:
   - Bump `version`
   - Replace all `sha256` values
6. Commit and push the formula update.

Users on the tap get the new version on their next `brew upgrade`.

## 6. Automate formula updates (optional)

You can add a step to the release workflow that auto-updates the formula:

```yaml
# Add to .github/workflows/release.yml after the release job
update-homebrew:
  needs: release
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
      with:
        repository: nathanjmorton/homebrew-zigc
        token: ${{ secrets.HOMEBREW_TAP_TOKEN }}

    - name: Update formula
      run: |
        VERSION=${GITHUB_REF_NAME#v}
        for target in aarch64-macos x86_64-macos x86_64-linux-gnu aarch64-linux-gnu; do
          SHA=$(curl -fsSL "https://github.com/nathanjmorton/zigc/releases/download/v${VERSION}/zigc-${target}.tar.gz" | shasum -a 256 | cut -d' ' -f1)
          # Map target to the right sha256 line and replace
          sed -i "s|sha256 \".*\" # ${target}|sha256 \"${SHA}\" # ${target}|" Formula/zigc.rb
        done
        sed -i "s/version \".*\"/version \"${VERSION}\"/" Formula/zigc.rb

    - name: Commit and push
      run: |
        git config user.name "github-actions[bot]"
        git config user.email "github-actions[bot]@users.noreply.github.com"
        git add Formula/zigc.rb
        git commit -m "zigc ${GITHUB_REF_NAME}"
        git push
```

This requires a `HOMEBREW_TAP_TOKEN` secret (a GitHub PAT with `repo` scope for the
`homebrew-zigc` repo). If you use this, add `# <target>` comments to each `sha256`
line in the formula so the sed replacements work.

## 7. Submit to homebrew-core (eventual)

Homebrew-core acceptance criteria (as of 2025):

- **Notable**: the project should have meaningful adoption or unique value.
  Homebrew generally expects 30+ GitHub stars, 20+ forks, or evidence of real users.
- **Stable**: at least one tagged release; the formula should point to a versioned tarball.
- **No binaries**: homebrew-core prefers building from source. Since zigc is a Zig project,
  you'd need a formula that invokes `zig build` (Zig is already in homebrew-core).
- **Tests**: the `test do` block must exercise the binary meaningfully.
- **License**: must be open source (MIT is fine).

### Source-build formula for homebrew-core

```ruby
class Zigc < Formula
  desc "C/C++ project & package manager powered by Zig's build system"
  homepage "https://github.com/nathanjmorton/zigc"
  url "https://github.com/nathanjmorton/zigc/archive/refs/tags/v0.1.0.tar.gz"
  sha256 "REPLACE_WITH_SOURCE_TARBALL_SHA256"
  license "MIT"

  depends_on "zig" => "0.16.0"

  def install
    system "zig", "build", "-Doptimize=ReleaseFast", "--prefix", prefix
  end

  test do
    system "#{bin}/zigc", "help"
    system "#{bin}/zigc", "init", "test-project"
    assert_predicate testpath/"test-project/build.zig", :exist?
  end
end
```

### Submission steps

1. Fork [Homebrew/homebrew-core](https://github.com/Homebrew/homebrew-core).
2. Add `Formula/z/zigc.rb` (formulas are bucketed by first letter).
3. Run `brew audit --strict --new zigc` locally to validate.
4. Run `brew test zigc` to confirm the test block passes.
5. Open a PR to `homebrew-core` with a description of what zigc does.
6. Address any review feedback from the Homebrew maintainers.

### Conflict with `zigc upgrade`

If a user installs via Homebrew, `zigc upgrade` would replace the Homebrew-managed
binary in `~/.zigc/bin/zigc`, which could confuse Homebrew's version tracking.

The `zigc upgrade` command checks `ZIGC_INSTALL` first, then falls back to `~/.zigc/bin/`.
Since Homebrew installs to its own prefix (`/opt/homebrew/bin/zigc` on Apple Silicon),
the two paths don't overlap by default.

**Recommendation for users:**
- Installed via curl script → use `zigc upgrade`
- Installed via Homebrew → use `brew upgrade zigc`
