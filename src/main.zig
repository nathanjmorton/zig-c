const std = @import("std");

// ── Usage ─────────────────────────────────────────────────────────────────────

const usage =
    \\zig-c — C project build tool powered by the Zig build system
    \\
    \\Usage:
    \\  zig-c init <name>   Create a new C project in ./<name>/
    \\  zig-c add  <url>    Add a dependency (zig fetch --save <url>)
    \\  zig-c build         Build the current project  (zig build)
    \\  zig-c run           Build and run the project  (zig build run)
    \\  zig-c clean         Remove .zig-cache/ and zig-out/
    \\  zig-c help          Show this help
    \\
;

// ── Templates ────────────────────────────────────────────────────────────────
// Placeholders replaced at runtime (not fmt strings — safe to contain { }):
//   PROJ_NAME  → raw project name, e.g. "my-app"
//   PROJ_IDENT → valid Zig identifier,  e.g. "my_app"

const TMPL_BUILD_ZIG =
    \\const std = @import("std");
    \\
    \\pub fn build(b: *std.Build) void {
    \\    const target = b.standardTargetOptions(.{});
    \\    const optimize = b.standardOptimizeOption(.{});
    \\
    \\    const mod = b.createModule(.{
    \\        .target = target,
    \\        .optimize = optimize,
    \\        .link_libc = true,
    \\    });
    \\    mod.addCSourceFiles(.{
    \\        .root = b.path("src"),
    \\        .files = &.{"main.c"},
    \\        .flags = &.{ "-std=c11", "-Wall", "-Wextra" },
    \\    });
    \\
    \\    const exe = b.addExecutable(.{
    \\        .name = "PROJ_NAME",
    \\        .root_module = mod,
    \\    });
    \\    b.installArtifact(exe);
    \\
    \\    const run_cmd = b.addRunArtifact(exe);
    \\    run_cmd.step.dependOn(b.getInstallStep());
    \\    if (b.args) |args| run_cmd.addArgs(args);
    \\    const run_step = b.step("run", "Build and run");
    \\    run_step.dependOn(&run_cmd.step);
    \\}
    \\
;

const TMPL_BUILD_ZIG_ZON =
    \\.{
    \\    .name = .PROJ_IDENT,
    \\    .version = "0.1.0",
    \\    .minimum_zig_version = "0.16.0",
    \\    .paths = .{
    \\        "build.zig",
    \\        "build.zig.zon",
    \\        "src",
    \\    },
    \\    .dependencies = .{},
    \\}
    \\
;

const TMPL_MAIN_C =
    \\#include <stdio.h>
    \\
    \\int main(void) {
    \\    printf("Hello from PROJ_NAME!\n");
    \\    return 0;
    \\}
    \\
;

const TMPL_GITIGNORE =
    \\.zig-cache/
    \\zig-out/
    \\
;

// ── Helpers ──────────────────────────────────────────────────────────────────

/// Returns a new allocation with every occurrence of `needle` replaced by `replacement`.
fn replaceAll(
    allocator: std.mem.Allocator,
    src: []const u8,
    needle: []const u8,
    replacement: []const u8,
) ![]u8 {
    const count = std.mem.count(u8, src, needle);
    if (count == 0) return allocator.dupe(u8, src);
    // Compute length using signed arithmetic to handle shrinking replacements.
    const delta: isize = @as(isize, @intCast(replacement.len)) - @as(isize, @intCast(needle.len));
    const out_len: usize = @intCast(@as(isize, @intCast(src.len)) + delta * @as(isize, @intCast(count)));
    const out = try allocator.alloc(u8, out_len);
    _ = std.mem.replace(u8, src, needle, replacement, out);
    return out;
}


/// Spawn `argv`, inheriting stdio. Returns error if the process exits non-zero.
fn exec(io: std.Io, argv: []const []const u8) !void {
    var child = try std.process.spawn(io, .{
        .argv = argv,
        .stdin = .inherit,
        .stdout = .inherit,
        .stderr = .inherit,
    });
    const term = try child.wait(io);
    switch (term) {
        .exited => |code| if (code != 0) {
            std.debug.print("error: command exited with code {d}\n", .{code});
            return error.CommandFailed;
        },
        else => {
            std.debug.print("error: command terminated abnormally\n", .{});
            return error.CommandFailed;
        },
    }
}

/// Like exec, but on first run captures stderr to detect and auto-fix a missing
/// fingerprint in build.zig.zon, then retries with live output.
fn execZig(io: std.Io, allocator: std.mem.Allocator, argv: []const []const u8) !void {
    const result = try std.process.run(allocator, io, .{ .argv = argv });
    defer allocator.free(result.stdout);
    defer allocator.free(result.stderr);

    if (result.stdout.len > 0) std.debug.print("{s}", .{result.stdout});

    const ok = switch (result.term) {
        .exited => |c| c == 0,
        else => false,
    };
    if (ok) return;

    const marker = "suggested value: ";
    if (std.mem.indexOf(u8, result.stderr, marker)) |pos| {
        const start = pos + marker.len;
        const len = std.mem.indexOfAny(u8, result.stderr[start..], "\n\r ") orelse result.stderr[start..].len;
        const fp = result.stderr[start .. start + len];
        std.debug.print("Auto-inserting fingerprint {s} into build.zig.zon...\n", .{fp});
        try insertFingerprint(io, allocator, fp);
        return exec(io, argv); // retry with live output
    }

    if (result.stderr.len > 0) std.debug.print("{s}", .{result.stderr});
    return error.CommandFailed;
}

// ── Commands ─────────────────────────────────────────────────────────────────

fn cmdInit(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    if (args.len == 0) {
        std.debug.print("error: missing project name\nUsage: zig-c init <name>\n", .{});
        return error.MissingArgument;
    }
    const name = args[0];

    // Derive a valid Zig identifier (hyphens → underscores).
    const ident = try allocator.dupe(u8, name);
    defer allocator.free(ident);
    for (ident) |*ch| {
        if (ch.* == '-') ch.* = '_';
    }

    // Create project directory.
    const cwd = std.Io.Dir.cwd();
    cwd.createDir(io, name, .default_dir) catch |err| {
        if (err == error.PathAlreadyExists) {
            std.debug.print("error: directory '{s}' already exists\n", .{name});
            return error.DirectoryExists;
        }
        return err;
    };
    var dir = try cwd.openDir(io, name, .{});
    defer dir.close(io);
    try dir.createDir(io, "src", .default_dir);

    // build.zig
    {
        const content = try replaceAll(allocator, TMPL_BUILD_ZIG, "PROJ_NAME", name);
        defer allocator.free(content);
        try dir.writeFile(io, .{ .sub_path = "build.zig", .data = content });
    }

    // build.zig.zon
    {
        const content = try replaceAll(allocator, TMPL_BUILD_ZIG_ZON, "PROJ_IDENT", ident);
        defer allocator.free(content);
        try dir.writeFile(io, .{ .sub_path = "build.zig.zon", .data = content });
    }

    // src/main.c
    {
        const content = try replaceAll(allocator, TMPL_MAIN_C, "PROJ_NAME", name);
        defer allocator.free(content);
        var src_dir = try dir.openDir(io, "src", .{});
        defer src_dir.close(io);
        try src_dir.writeFile(io, .{ .sub_path = "main.c", .data = content });
    }

    // .gitignore
    try dir.writeFile(io, .{ .sub_path = ".gitignore", .data = TMPL_GITIGNORE });

    std.debug.print("Created project '{s}'\n", .{name});
    std.debug.print("  cd {s}\n", .{name});
    std.debug.print("  zig-c build         # compile\n", .{});
    std.debug.print("  zig-c run           # compile and run\n", .{});
    std.debug.print("  zig-c add <url>     # add a C library dependency\n", .{});
}

/// Inserts a .fingerprint field into build.zig.zon before the closing brace.
fn insertFingerprint(io: std.Io, allocator: std.mem.Allocator, fp_str: []const u8) !void {
    const cwd = std.Io.Dir.cwd();
    const content = try cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited);
    defer allocator.free(content);
    const insert_pos = std.mem.lastIndexOf(u8, content, "}") orelse return error.InvalidManifest;
    const new_content = try std.mem.concat(allocator, u8, &.{
        content[0..insert_pos],
        "    .fingerprint = ",
        fp_str,
        ",\n}\n",
    });
    defer allocator.free(new_content);
    try cwd.writeFile(io, .{ .sub_path = "build.zig.zon", .data = new_content });
}

fn cmdAdd(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    if (args.len == 0) {
        std.debug.print("error: missing package URL\nUsage: zig-c add <url>\n", .{});
        return error.MissingArgument;
    }
    try execZig(io, allocator, &.{ "zig", "fetch", "--save", args[0] });

    // {{ and }} are fmt-string escapes that produce literal { and }.
    std.debug.print(
        \\
        \\Dependency saved to build.zig.zon.
        \\To link it, add to your build.zig:
        \\
        \\  const dep = b.dependency("<name>", .{{ .target = target, .optimize = optimize }});
        \\  mod.linkLibrary(dep.artifact("<lib>"));
        \\
    , .{});
}

fn cmdBuild(io: std.Io, allocator: std.mem.Allocator) !void {
    try execZig(io, allocator, &.{ "zig", "build" });
}

fn cmdRun(io: std.Io, allocator: std.mem.Allocator) !void {
    try execZig(io, allocator, &.{ "zig", "build", "run" });
}

fn cmdClean(io: std.Io) !void {
    const cwd = std.Io.Dir.cwd();
    for ([_][]const u8{ ".zig-cache", "zig-out" }) |path| {
        try cwd.deleteTree(io, path);
        std.debug.print("Removed {s}/\n", .{path});
    }
}

// ── Entry point ───────────────────────────────────────────────────────────────
// Zig 0.16.0: main receives std.process.Init which provides gpa, io, and args.

pub fn main(init: std.process.Init) !void {
    const allocator = init.gpa;
    const io = init.io;

    // Collect CLI args into a slice (skip argv[0]).
    var args_list: std.ArrayList([]const u8) = .empty;
    defer args_list.deinit(allocator);
    var it = std.process.Args.Iterator.init(init.minimal.args);
    _ = it.skip(); // argv[0] = program name
    while (it.next()) |arg| try args_list.append(allocator, arg);
    const args = args_list.items;

    if (args.len == 0) {
        std.debug.print("{s}", .{usage});
        return;
    }

    const cmd = args[0];
    const rest = args[1..];

    if (std.mem.eql(u8, cmd, "init")) {
        try cmdInit(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "add")) {
        try cmdAdd(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "build")) {
        try cmdBuild(io, allocator);
    } else if (std.mem.eql(u8, cmd, "run")) {
        try cmdRun(io, allocator);
    } else if (std.mem.eql(u8, cmd, "clean")) {
        try cmdClean(io);
    } else if (std.mem.eql(u8, cmd, "help") or
        std.mem.eql(u8, cmd, "--help") or
        std.mem.eql(u8, cmd, "-h"))
    {
        std.debug.print("{s}", .{usage});
    } else {
        std.debug.print("error: unknown command '{s}'\n\n{s}", .{ cmd, usage });
        return error.UnknownCommand;
    }
}
