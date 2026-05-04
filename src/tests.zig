const std = @import("std");

// Path to the zigc binary, injected at build time via b.addOptions().
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

// ── Unit tests: integrity-check helpers ───────────────────────────────────

const zon_with_paths =
    \\.{
    \\    .name = .foo,
    \\    .paths = .{
    \\        "build.zig",
    \\        "build.zig.zon",
    \\        "src",
    \\    },
    \\    .dependencies = .{},
    \\}
    \\
;

test "parseZonPaths: three entries" {
    const paths = try main.parseZonPaths(gpa, zon_with_paths);
    defer { for (paths) |p| gpa.free(p); gpa.free(paths); }
    try std.testing.expectEqual(@as(usize, 3), paths.len);
    try std.testing.expectEqualStrings("build.zig", paths[0]);
    try std.testing.expectEqualStrings("build.zig.zon", paths[1]);
    try std.testing.expectEqualStrings("src", paths[2]);
}

test "parseZonPaths: empty .paths block" {
    const zon = ".{ .paths = .{} }";
    const paths = try main.parseZonPaths(gpa, zon);
    defer { for (paths) |p| gpa.free(p); gpa.free(paths); }
    try std.testing.expectEqual(@as(usize, 0), paths.len);
}

test "parseZonPaths: no .paths field" {
    const zon = ".{ .name = .foo }";
    const paths = try main.parseZonPaths(gpa, zon);
    defer { for (paths) |p| gpa.free(p); gpa.free(paths); }
    try std.testing.expectEqual(@as(usize, 0), paths.len);
}

test "parseBuildDeps: single dependency" {
    const src = "const x = b.dependency(\"lz4\", .{ .target = target });";
    const keys = try main.parseBuildDeps(gpa, src);
    defer { for (keys) |k| gpa.free(k); gpa.free(keys); }
    try std.testing.expectEqual(@as(usize, 1), keys.len);
    try std.testing.expectEqualStrings("lz4", keys[0]);
}

test "parseBuildDeps: multiple distinct deps" {
    const src =
        \\const a = b.dependency("lz4", .{});
        \\const b_ = b.dependency("zstd", .{});
    ;
    const keys = try main.parseBuildDeps(gpa, src);
    defer { for (keys) |k| gpa.free(k); gpa.free(keys); }
    try std.testing.expectEqual(@as(usize, 2), keys.len);
    try std.testing.expectEqualStrings("lz4", keys[0]);
    try std.testing.expectEqualStrings("zstd", keys[1]);
}

test "parseBuildDeps: deduplicates repeated dep" {
    const src =
        \\const a = b.dependency("lz4", .{});
        \\const b_ = b.dependency("lz4", .{});
    ;
    const keys = try main.parseBuildDeps(gpa, src);
    defer { for (keys) |k| gpa.free(k); gpa.free(keys); }
    try std.testing.expectEqual(@as(usize, 1), keys.len);
}

test "parseBuildDeps: no dependency calls" {
    const keys = try main.parseBuildDeps(gpa, "const x = 1;\n");
    defer { for (keys) |k| gpa.free(k); gpa.free(keys); }
    try std.testing.expectEqual(@as(usize, 0), keys.len);
}

// ── Unit tests: flag routing (isBuildOption + buildArgv) ───────────────────────

// Helper: call buildArgv with an arena and return just the final argument slice.
// The arena is the allocator so strings stay valid for the duration of the test.
fn argvFor(ar: std.mem.Allocator, base: []const []const u8, extra: []const []const u8) ![]const []const u8 {
    return main.buildArgv(ar, base, extra);
}

test "isBuildOption: Zig options start with lowercase" {
    try std.testing.expect(main.isBuildOption("optimize=ReleaseFast"));
    try std.testing.expect(main.isBuildOption("cflags=-Wall"));
    try std.testing.expect(main.isBuildOption("target=x86_64-linux"));
    try std.testing.expect(main.isBuildOption("verbose"));
}

test "isBuildOption: C macros start with uppercase or non-alpha" {
    try std.testing.expect(!main.isBuildOption("NDEBUG"));
    try std.testing.expect(!main.isBuildOption("DEBUG=1"));
    try std.testing.expect(!main.isBuildOption("FOO=bar"));
    try std.testing.expect(!main.isBuildOption("_POSIX_SOURCE"));
    try std.testing.expect(!main.isBuildOption(""));
}

test "buildArgv: -O3 maps to -Doptimize=ReleaseFast" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{"-O3"});
    try std.testing.expectEqual(@as(usize, 3), argv.len);
    try std.testing.expectEqualStrings("-Doptimize=ReleaseFast", argv[2]);
}

test "buildArgv: -Os maps to -Doptimize=ReleaseSmall" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{"-Os"});
    try std.testing.expectEqual(@as(usize, 3), argv.len);
    try std.testing.expectEqualStrings("-Doptimize=ReleaseSmall", argv[2]);
}

test "buildArgv: -DNDEBUG goes to -Dcflags (not zig build flag)" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{"-DNDEBUG"});
    try std.testing.expectEqual(@as(usize, 3), argv.len);
    try std.testing.expectEqualStrings("-Dcflags=-DNDEBUG", argv[2]);
}

test "buildArgv: -Doptimize=ReleaseFast passes through unchanged" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{"-Doptimize=ReleaseFast"});
    try std.testing.expectEqual(@as(usize, 3), argv.len);
    try std.testing.expectEqualStrings("-Doptimize=ReleaseFast", argv[2]);
}

test "buildArgv: -Wall -Werror both go to -Dcflags" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{ "-Wall", "-Werror" });
    try std.testing.expectEqual(@as(usize, 3), argv.len);
    try std.testing.expectEqualStrings("-Dcflags=-Wall,-Werror", argv[2]);
}

test "buildArgv: -O3 -Wall -DNDEBUG combined" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{ "-O3", "-Wall", "-DNDEBUG" });
    // Expected: ["zig", "build", "-Doptimize=ReleaseFast", "-Dcflags=-Wall,-DNDEBUG"]
    try std.testing.expectEqual(@as(usize, 4), argv.len);
    try std.testing.expectEqualStrings("-Doptimize=ReleaseFast", argv[2]);
    try std.testing.expectEqualStrings("-Dcflags=-Wall,-DNDEBUG", argv[3]);
}

test "buildArgv: -- separator routes remaining args to run step" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build", "run" }, &.{ "-O3", "--", "myarg" });
    // Expected: ["zig", "build", "run", "-Doptimize=ReleaseFast", "--", "myarg"]
    try std.testing.expectEqual(@as(usize, 6), argv.len);
    try std.testing.expectEqualStrings("-Doptimize=ReleaseFast", argv[3]);
    try std.testing.expectEqualStrings("--", argv[4]);
    try std.testing.expectEqualStrings("myarg", argv[5]);
}

test "buildArgv: --verbose passes through unchanged" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{"--verbose"});
    try std.testing.expectEqual(@as(usize, 3), argv.len);
    try std.testing.expectEqualStrings("--verbose", argv[2]);
}

test "buildArgv: no extra flags returns base unchanged" {
    var arena = std.heap.ArenaAllocator.init(gpa);
    defer arena.deinit();
    const argv = try argvFor(arena.allocator(), &.{ "zig", "build" }, &.{});
    try std.testing.expectEqual(@as(usize, 2), argv.len);
}

// ── Unit tests: package management helpers ─────────────────────────────────────

const zon_fixture =
    \\.{
    \\    .name = .myapp,
    \\    .version = "0.1.0",
    \\    .minimum_zig_version = "0.16.0",
    \\    .paths = .{ "build.zig", "build.zig.zon", "src" },
    \\    .dependencies = .{
    \\        .lz4 = .{
    \\            .url = "git+https://example.com/lz4.git#abc",
    \\            .hash = "lz4-1.0-abc",
    \\        },
    \\        .zstd = .{
    \\            .url = "git+https://example.com/zstd.git#def",
    \\            .hash = "zstd-1.0-def",
    \\        },
    \\    },
    \\}
    \\
;

test "parseZonDeps: empty dependencies" {
    const zon =
        \\.{ .name = .foo, .dependencies = .{} }
    ;
    const deps = try main.parseZonDeps(gpa, zon);
    defer { for (deps) |d| { gpa.free(d.key); gpa.free(d.url); } gpa.free(deps); }
    try std.testing.expectEqual(@as(usize, 0), deps.len);
}

test "parseZonDeps: two entries" {
    const deps = try main.parseZonDeps(gpa, zon_fixture);
    defer { for (deps) |d| { gpa.free(d.key); gpa.free(d.url); } gpa.free(deps); }
    try std.testing.expectEqual(@as(usize, 2), deps.len);
    try std.testing.expectEqualStrings("lz4", deps[0].key);
    try std.testing.expectEqualStrings("git+https://example.com/lz4.git#abc", deps[0].url);
    try std.testing.expectEqualStrings("zstd", deps[1].key);
}

test "parseZonDeps: no .dependencies block" {
    const zon = ".{ .name = .foo }";
    const deps = try main.parseZonDeps(gpa, zon);
    defer { for (deps) |d| { gpa.free(d.key); gpa.free(d.url); } gpa.free(deps); }
    try std.testing.expectEqual(@as(usize, 0), deps.len);
}

const build_zig_fixture =
    \\const std = @import("std");
    \\pub fn build(b: *std.Build) void {
    \\    const target = b.standardTargetOptions(.{});
    \\    const optimize = b.standardOptimizeOption(.{});
    \\    const mod = b.createModule(.{ .target = target, .optimize = optimize, .link_libc = true });
    \\    const exe = b.addExecutable(.{ .name = "myapp", .root_module = mod });
    \\    b.installArtifact(exe);
    \\}
    \\
;

test "insertBuildLink: injects dependency before exe" {
    const updated = try main.insertBuildLink(gpa, build_zig_fixture, "lz4", "lz4");
    defer gpa.free(updated);
    try std.testing.expect(std.mem.indexOf(u8, updated, "lz4_dep") != null);
    try std.testing.expect(std.mem.indexOf(u8, updated, "b.dependency(\"lz4\"") != null);
    try std.testing.expect(std.mem.indexOf(u8, updated, "mod.linkLibrary") != null);
    // Linking code must appear BEFORE the exe declaration.
    const link_pos = std.mem.indexOf(u8, updated, "lz4_dep").?;
    const exe_pos = std.mem.indexOf(u8, updated, "b.addExecutable").?;
    try std.testing.expect(link_pos < exe_pos);
}

test "insertBuildLink: idempotent (no double-insert)" {
    const once = try main.insertBuildLink(gpa, build_zig_fixture, "lz4", "lz4");
    defer gpa.free(once);
    const twice = try main.insertBuildLink(gpa, once, "lz4", "lz4");
    defer gpa.free(twice);
    const count1 = std.mem.count(u8, once, "lz4_dep");
    const count2 = std.mem.count(u8, twice, "lz4_dep");
    try std.testing.expectEqual(count1, count2);
}

test "insertBuildLink: custom lib name" {
    const updated = try main.insertBuildLink(gpa, build_zig_fixture, "mypkg", "mylib");
    defer gpa.free(updated);
    try std.testing.expect(std.mem.indexOf(u8, updated, "mypkg_dep.artifact(\"mylib\")") != null);
}

test "removeBuildLink: removes dep lines" {
    const with_link = try main.insertBuildLink(gpa, build_zig_fixture, "lz4", "lz4");
    defer gpa.free(with_link);
    const removed = try main.removeBuildLink(gpa, with_link, "lz4");
    defer gpa.free(removed);
    try std.testing.expect(std.mem.indexOf(u8, removed, "lz4_dep") == null);
    // Everything else should still be present.
    try std.testing.expect(std.mem.indexOf(u8, removed, "b.addExecutable") != null);
}

// ── Integration: zigc init ───────────────────────────────────────────────

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

// ── Integration: zigc check ───────────────────────────────────────────────────

test "check: fresh project passes all checks" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "healthy" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "healthy", .{});
    defer proj.close(io);

    const r = try runIn(proj, &.{ zig_c_path, "check" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r); // exit 0 means all checks passed
    try stderrContains(r, "0 errors");
    try stderrContains(r, "ok");
}

test "check: missing build.zig is reported as error" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "broken" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    // Remove build.zig.
    var proj = try tmp.dir.openDir(io, "broken", .{});
    defer proj.close(io);
    try proj.deleteFile(io, "build.zig");

    const r = try runIn(proj, &.{ zig_c_path, "check" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r); // exit non-zero
    try stderrContains(r, "build.zig missing");
    try stderrContains(r, "error");
}

test "check: path listed in .paths but deleted is an error" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "missing_path" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "missing_path", .{});
    defer proj.close(io);

    // Delete src/ (which is listed in .paths).
    try proj.deleteTree(io, "src");

    const r = try runIn(proj, &.{ zig_c_path, "check" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "missing from disk");
}

test "check: b.dependency without zon entry is an error" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "dangling" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "dangling", .{});
    defer proj.close(io);

    // Append a b.dependency call that has no zon entry.
    const bz = try proj.readFileAlloc(io, "build.zig", gpa, .unlimited);
    defer gpa.free(bz);
    const injected = try std.mem.concat(gpa, u8, &.{
        bz,
        "// const ghost = b.dependency(\"ghost\", .{});\n",
    });
    defer gpa.free(injected);
    try proj.writeFile(io, .{ .sub_path = "build.zig", .data = injected });

    // Even with it in a comment parseBuildDeps won't find it,
    // so write a real (non-comment) call:
    const bz2 = try proj.readFileAlloc(io, "build.zig", gpa, .unlimited);
    defer gpa.free(bz2);
    const with_dangling = try std.mem.concat(gpa, u8, &.{
        bz2[0 .. bz2.len - 3], // trim last '\n}\n'
        "    const x = b.dependency(\"phantom\", .{});\n}\n",
    });
    defer gpa.free(with_dangling);
    try proj.writeFile(io, .{ .sub_path = "build.zig", .data = with_dangling });

    const r = try runIn(proj, &.{ zig_c_path, "check" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "has no entry in build.zig.zon");
}

// ── Integration: zigc verify ───────────────────────────────────────────────────

test "verify: passes after build — binary valid, main defined" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "vertest" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "vertest", .{});
    defer proj.close(io);

    // Build first so there are artifacts to inspect.
    {
        const r = try runIn(proj, &.{ zig_c_path, "build" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    const r = try runIn(proj, &.{ zig_c_path, "verify" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r); // exit 0 = all verify checks passed
    try stderrContains(r, "main entrypoint defined");
    try stderrContains(r, "0 errors");
}

test "verify: fails before build (no zig-out/bin)" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "nobin" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "nobin", .{});
    defer proj.close(io);

    // Intentionally skip 'zigc build'.
    const r = try runIn(proj, &.{ zig_c_path, "verify" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r); // must exit non-zero
    try stderrContains(r, "not found"); // zig-out/bin not found
}

// ── Integration: list + remove ───────────────────────────────────────────────────

test "list: no dependencies shows empty message" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "noeps" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "noeps", .{});
    defer proj.close(io);

    const r = try runIn(proj, &.{ zig_c_path, "list" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try ok(r);
    try stderrContains(r, "No dependencies");
}

test "remove: error when dep does not exist" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    {
        const r = try runIn(tmp.dir, &.{ zig_c_path, "init", "noremove" });
        defer gpa.free(r.stdout);
        defer gpa.free(r.stderr);
        try ok(r);
    }

    var proj = try tmp.dir.openDir(io, "noremove", .{});
    defer proj.close(io);

    const r = try runIn(proj, &.{ zig_c_path, "remove", "nonexistent" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "not found");
}

test "remove: missing name argument exits non-zero" {
    var tmp = std.testing.tmpDir(.{});
    defer tmp.cleanup();

    const r = try runIn(tmp.dir, &.{ zig_c_path, "remove" });
    defer gpa.free(r.stdout);
    defer gpa.free(r.stderr);
    try fail(r);
    try stderrContains(r, "missing dependency name");
}

// ── Integration: error cases ────────────────────────────────────────────────────

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
