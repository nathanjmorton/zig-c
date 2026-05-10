# Makefile for zigc project

ZIGC         := $(CURDIR)/zig-out/bin/zigc
ZIGC_RELEASED := $(shell which zigc 2>/dev/null || echo $(HOME)/.zigc/bin/zigc)

# Default target
all: build demo

# Build the zigc binary
build:
	zig build

# Run the test suite
test:
	zig build test

# Clean Zig cache and output
clean:
	rm -rf .zig-cache/ zig-out/ zig-pkg/

# Release: clean build, bump version, commit, tag, push.
# Usage: make release          (auto-bumps minor, e.g. 0.3.0 → 0.4.0)
#        make release V=1.0.0  (explicit version)
release: clean build test
	./scripts/release.sh $(V)

# ── demo ──────────────────────────────────────────────────────────────────────

# Run the full quick-start workflow (init → safe → fix → safe → build → run)
demo: build demo-init demo-safe demo-fix demo-build demo-run

demo-init:
	rm -rf /tmp/zigc-demo && \
	$(ZIGC) init /tmp/zigc-demo

demo-build:
	$(ZIGC) build /tmp/zigc-demo

demo-safe:
	$(ZIGC) safe /tmp/zigc-demo || true

demo-fix:
	$(ZIGC) fix /tmp/zigc-demo
	$(ZIGC) safe /tmp/zigc-demo

demo-run:
	$(ZIGC) run /tmp/zigc-demo

# ── demo-released ─────────────────────────────────────────────────────────────

# Run all demo tasks against the installed (released) binary
demo-released: demo-released-check demo-released-init demo-released-safe demo-released-fix demo-released-build demo-released-run

demo-released-check:
	@test -x "$(ZIGC_RELEASED)" || \
		(echo "error: released zigc not found — install via 'brew install zigc' or install.sh" && exit 1)
	@echo "Testing released binary: $(ZIGC_RELEASED)"

demo-released-init:
	rm -rf /tmp/zigc-demo-released && \
	$(ZIGC_RELEASED) init /tmp/zigc-demo-released

demo-released-safe:
	$(ZIGC_RELEASED) safe /tmp/zigc-demo-released || true

demo-released-fix:
	$(ZIGC_RELEASED) fix /tmp/zigc-demo-released
	$(ZIGC_RELEASED) safe /tmp/zigc-demo-released

demo-released-build:
	$(ZIGC_RELEASED) build /tmp/zigc-demo-released

demo-released-run:
	$(ZIGC_RELEASED) run /tmp/zigc-demo-released

# ── test-all ───────────────────────────────────────────────────────────────────

# Verify both the local build and the installed release work end-to-end
test-all: all demo-released

upgrade:
	brew update && brew upgrade zigc

website:
	npm --prefix www run dev

# Ship: release, wait for CI to finish, then upgrade the local install.
# Usage: make ship          (auto-bumps minor)
#        make ship V=1.0.0  (explicit version)
ship: release
	@command -v gh > /dev/null 2>&1 || \
		(echo "error: gh CLI not found — install with: brew install gh" && exit 1)
	@echo "Waiting for release workflow to appear..."
	@sleep 5
	gh run watch $$(gh run list --workflow=release.yml --limit=1 --json databaseId -q '.[0].databaseId') --exit-status
	$(MAKE) upgrade

.PHONY: all build test clean release \
        demo demo-init demo-build demo-safe demo-fix demo-run \
        demo-released demo-released-check demo-released-init demo-released-safe \
        demo-released-fix demo-released-build demo-released-run \
        test-all upgrade ship
