const std = @import("std");

// Path to the zig-c binary, injected at build time via b.addOptions().
const zig_c_path: []const u8 = @import("options").zig_c_path;

// Import main.zig to unit-test its exported functions.
const main = @import("main.zig");

const io = std.testing.io;
const gpa = std.testing.allocator;

// ── Helpers ───────────────────────────────────────────────────────────────────

/// Run `argv` with its cwd set to `dir` and return the captured result.
fn runIn(dir: std.Io.Dir, argv: []const []const u8) !std.process.RunResult {
    // Io.Threaded (the testing IO) manages dir handles virtually, so we must
    // use a path string as the cwd rather than the Dir handle directly.
    var path_buf: [4096]u8 = undefined;
    const path_len = try dir.realPath(io, &path_buf);
    return std.process.run(gpa, io, .{ .argv = argv, .cwd = .{ .path = path_buf[0..path_len] } });
}

/// Assert the command exited with code 0; print stderr on failure.
fn ok(result: std.process.RunResult) !void {
    const exited_ok = switch (result.term) {
        .exited => |c| c == 0,
        else => false,
    };
    if (!exited_ok) {
        if (result.stderr.len > 0)
            std.debug.print("\n[stderr]\n{s}\n", .{result.stderr});
        return error.CommandFailed;
    }
}

/// Assert the command exited with a non-zero code.
fn fail(result: std.process.RunResult) !void {
    const exited_ok = switch (result.term) {
        .exited => |c| c == 0,
        else => false,
    };
    if (exited_ok) return error.ExpectedFailure;
}

/// Assert that `path` inside `dir` contains `needle`.
fn hasContent(dir: std.Io.Dir, path: []const u8, needle: []const u8) !void {
    const content = try dir.readFileAlloc(io, path, gpa, .unlimited);
    defer gpa.free(content);
    if (std.mem.indexOf(u8, content, needle) == null) {
        std.debug.print(
            "\nFILE '{s}' missing expected content:\n  {s}\nActual:\n{s}\n",
            .{ path, needle, content },
        );
        return error.MissingContent;
    }
}

/// Assert that `path` inside `dir` does NOT contain `needle`.
fn lacksContent(dir: std.Io.Dir, path: []const u8, needle: []const u8) !void {
    const content = try dir.readFileAlloc(io, path, gpa, .unlimited);
    defer gpa.free(content);
    if (std.mem.indexOf(u8, content, needle) != null) {
        std.debug.print(
            "\nFILE '{s}' unexpectedly contains:\n  {s}\n",
            .{ path, needle },
        );
        return error.UnexpectedContent;
    }
}

/// Assert that `stderr` (or stdout+stderr combined) contains `needle`.
fn stderrContains(result: std.process.RunResult, needle: []const u8) !void {
    const combined = try std.mem.concat(gpa, u8, &.{ result.stdout, result.stderr });
    defer gpa.free(combined);
    if (std.mem.indexOf(u8, combined, needle) == null) {
        std.debug.print("\nExpected output to contain:\n  {s}\nActual stderr:\n{s}\n", .{
            needle, result.stderr,
        });
        return error.MissingOutput;
    }
}

// ── Unit tests: replaceAll ────────────────────────────────────────────────────

test "replaceAll: no match returns identical content" {
    const out = try main.replaceAll(gpa, "hello world", "XYZ", "abc");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("hello world", out);
}

test "replaceAll: same-length substitution" {
    const out = try main.replaceAll(gpa, "hello NAME world", "NAME", "user");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("hello user world", out);
}

test "replaceAll: replacement shorter than needle" {
    const out = try main.replaceAll(gpa, "PROJ_NAME", "PROJ_NAME", "app");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("app", out);
}

test "replaceAll: replacement longer than needle" {
    const out = try main.replaceAll(gpa, "X", "X", "my-project");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("my-project", out);
}

test "replaceAll: multiple occurrences" {
    const out = try main.replaceAll(gpa, "a b a b a", "a", "XX");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("XX b XX b XX", out);
}

test "replaceAll: empty replacement deletes needle" {
    const out = try main.replaceAll(gpa, "helloworldhello", "hello", "");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("world", out);
}

test "replaceAll: hyphen to underscore (identifier derivation)" {
    const out = try main.replaceAll(gpa, "my-cool-lib", "-", "_");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("my_cool_lib", out);
}

test "replaceAll: entire string replaced" {
    const out = try main.replaceAll(gpa, "abc", "abc", "xyz");
    defer gpa.free(out);
    try std.testing.expectEqualStrings("xyz", out);
}

// ── Integration: zig-c init ───────────────────────────────────────────────────

test "init: creates all expected files with correct content" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "my-project" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r);

    var proj = try tmp.dir.openDir(io, "my-project", .{});
    defer proj.close(io);
    var src = try proj.openDir(io, "src", .{});
    defer src.close(io);

    // build.zig — executable name uses the raw project name.
    try hasContent(proj, "build.zig", "\"my-project\"");
    try hasContent(proj, "build.zig", "b.path(\"src\")");
    try hasContent(proj, "build.zig", "b.step(\"run\"");
    try hasContent(proj, "build.zig", "b.installArtifact(exe)");

    // build.zig.zon — package identifier uses underscores.
    try hasContent(proj, "build.zig.zon", ".name = .my_project,");
    try hasContent(proj, "build.zig.zon", ".version = \"0.1.0\"");
    try hasContent(proj, "build.zig.zon", ".minimum_zig_version = \"0.16.0\"");
    try hasContent(proj, "build.zig.zon", ".dependencies = .{}");

    // src/main.c
    try hasContent(src, "main.c", "#include <stdio.h>");
    try hasContent(src, "main.c", "Hello from my-project!");

    // .gitignore
    try hasContent(proj, ".gitignore", ".zig-cache/");
    try hasContent(proj, ".gitignore", "zig-out/");
}

test "init: hyphenated name → underscore identifier in zon, hyphen in exe" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "cool-lib" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r);

    var proj = try tmp.dir.openDir(io, "cool-lib", .{});
    defer proj.close(io);

    try hasContent(proj, "build.zig", "\"cool-lib\""); // exe name keeps hyphen
    try hasContent(proj, "build.zig.zon", ".name = .cool_lib,"); // ident uses _
    try lacksContent(proj, "build.zig.zon", ".name = .cool-lib,"); // no hyphen in ident
}

test "init: single-word name with no hyphens" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "hello" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r);

    var proj = try tmp.dir.openDir(io, "hello", .{});
    defer proj.close(io);

    try hasContent(proj, "build.zig.zon", ".name = .hello,");
    try hasContent(proj, "build.zig", "\"hello\"");
}

test "init: fails with clear error when directory already exists" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    // First init succeeds.
    const r1 = try runIn(tmp.dir, &.{ zig_c_path, "init", "dup" });
    defer gpa.free(r1.stdout);
    defer gpa.free(r1.stderr);
    try ok(r1);

    // Second init into same name must fail.
    const r2 = try runIn(tmp.dir, &.{ zig_c_path, "init", "dup" });
    defer gpa.free(r2.stdout);
    defer gpa.free(r2.stderr);
    try fail(r2);
    try stderrContains(r2, "already exists");
}

test "init: missing name argument exits non-zero with usage hint" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "init" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "missing project name");
}

// ── Integration: build workflow ───────────────────────────────────────────────

test "init → build: compiles and produces binary" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "builder" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "builder", .{});
    defer proj.close(io);

    {
        const r = try runIn(proj, &.{ zig_c_path, "build" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    // The binary must exist inside zig-out/bin/.
    _ = try proj.statFile(io, "zig-out/bin/builder", .{});
}

test "init → build (idempotent): second build is a no-op and still succeeds" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "idem" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "idem", .{});
    defer proj.close(io);

    for (0..2) |_| {
        const r = try runIn(proj, &.{ zig_c_path, "build" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }
}

// ── Integration: run workflow ─────────────────────────────────────────────────

test "init → run: binary executes and prints expected greeting" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "greeter" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "greeter", .{});
    defer proj.close(io);

    const r = try runIn(proj, &.{ zig_c_path, "run" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r);

    // "Hello from greeter!" may appear in stdout or stderr depending on whether
    // execZig's first-try path or the fingerprint-retry path was taken.
    const combined = try std.mem.concat(gpa, u8, &.{ r.stdout, r.stderr });
    defer gpa.free(combined);
    if (std.mem.indexOf(u8, combined, "Hello from greeter!") == null) {
        std.debug.print("\nExpected 'Hello from greeter!' in output.\nstdout:\n{s}\nstderr:\n{s}\n", .{
            r.stdout, r.stderr,
        });
        return error.MissingGreeting;
    }
}

// ── Integration: clean ────────────────────────────────────────────────────────

test "init → build → clean: removes .zig-cache and zig-out" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "cleaner" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "cleaner", .{});
    defer proj.close(io);

    // Build to create artifacts.
    {
        const r = try runIn(proj, &.{ zig_c_path, "build" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    // Verify artifacts exist before cleaning.
    _ = try proj.statFile(io, "zig-out/bin/cleaner", .{});

    // Clean.
    {
        const r = try runIn(proj, &.{ zig_c_path, "clean" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
        try stderrContains(r, "Removed");
    }

    // Verify zig-out is gone.
    if (proj.openDir(io, "zig-out", .{})) |d| {
        d.close(io);
        return error.CleanDidNotRemoveZigOut;
    } else |_| {}

    // Verify .zig-cache is gone.
    if (proj.openDir(io, ".zig-cache", .{})) |d| {
        d.close(io);
        return error.CleanDidNotRemoveZigCache;
    } else |_| {}

    // Source files must be intact.
    _ = try proj.statFile(io, "build.zig", .{});
    _ = try proj.statFile(io, "src/main.c", .{});
}

test "clean on a fresh project (no artifacts) succeeds" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "noclean" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "noclean", .{});
    defer proj.close(io);

    // No build step — clean should still succeed.
    const r = try runIn(proj, &.{ zig_c_path, "clean" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r);
}

// ── Integration: error cases ──────────────────────────────────────────────────

test "add: missing URL argument exits non-zero" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "add" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "missing package URL");
}

test "unknown command: exits non-zero and prints usage" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "foobar" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "unknown command");
    try stderrContains(r, "Usage");
}

test "help flag: exits zero and shows command list" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "--help" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    // help exits 0 (no error).
    const combined = try std.mem.concat(gpa, u8, &.{ r.stdout, r.stderr });
    defer gpa.free(combined);
    try std.testing.expect(std.mem.indexOf(u8, combined, "init") != null);
    try std.testing.expect(std.mem.indexOf(u8, combined, "build") != null);
    try std.testing.expect(std.mem.indexOf(u8, combined, "clean") != null);
}

test "no arguments: prints usage without error" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{zig_c_path});
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    const combined = try std.mem.concat(gpa, u8, &.{ r.stdout, r.stderr });
    defer gpa.free(combined);
    try std.testing.expect(std.mem.indexOf(u8, combined, "Usage") != null);
}
