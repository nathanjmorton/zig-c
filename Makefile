# Makefile for zigc project

ZIGC         := ./zig-out/bin/zigc
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

# Run all demo tasks in order (builds first)
demo: build demo-init demo-build demo-safe demo-run

demo-init:
	rm -rf /tmp/zigc-demo && \
	cd /tmp && $(CURDIR)/$(ZIGC) init zigc-demo

demo-build:
	cd /tmp/zigc-demo && $(CURDIR)/$(ZIGC) build

demo-safe:
	cd /tmp/zigc-demo && $(CURDIR)/$(ZIGC) safe

demo-run:
	cd /tmp/zigc-demo && $(CURDIR)/$(ZIGC) run

# ── demo-released ─────────────────────────────────────────────────────────────

# Run all demo tasks against the installed (released) binary
demo-released: demo-released-check demo-released-init demo-released-build demo-released-safe demo-released-run

demo-released-check:
	@test -x "$(ZIGC_RELEASED)" || \
		(echo "error: released zigc not found — install via 'brew install zigc' or install.sh" && exit 1)
	@echo "Testing released binary: $(ZIGC_RELEASED)"

demo-released-init:
	rm -rf /tmp/zigc-demo-released && \
	cd /tmp && $(ZIGC_RELEASED) init zigc-demo-released

demo-released-build:
	cd /tmp/zigc-demo-released && $(ZIGC_RELEASED) build

demo-released-safe:
	cd /tmp/zigc-demo-released && $(ZIGC_RELEASED) safe

demo-released-run:
	cd /tmp/zigc-demo-released && $(ZIGC_RELEASED) run

# ── test-all ───────────────────────────────────────────────────────────────────

# Verify both the local build and the installed release work end-to-end
test-all: all demo-released

upgrade:
	brew update && brew upgrade zigc

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
        demo demo-init demo-build demo-safe demo-run \
        demo-released demo-released-check demo-released-init demo-released-build \
        demo-released-safe demo-released-run \
        test-all upgrade ship
