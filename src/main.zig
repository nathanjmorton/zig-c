const std = @import("std");

// ── Usage ─────────────────────────────────────────────────────────────────────

const usage =
    \\zigc — C project build tool powered by the Zig build system
    \\
    \\Usage:
    \\  zigc init   <name>          Create a new C project in ./<name>/
    \\  zigc add    <url> [--lib n] Add and auto-link a dependency
    \\  zigc remove <name>          Remove a dependency
    \\  zigc list                   List installed dependencies
    \\  zigc check  [--build]       Verify project integrity
    \\  zigc verify [--symbols]     Inspect object files and symbols
    \\  zigc build  [flags]         Build the current project  (zig build)
    \\  zigc run    [flags]         Build and run the project  (zig build run)
    \\  zigc clean                  Remove .zig-cache/ and zig-out/
    \\  zigc help                   Show this help
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
    \\
    \\    // Base C flags.  Pass extra ones with -Dcflags=-DFOO,-Werror
    \\    var cflags: std.ArrayList([]const u8) = .empty;
    \\    cflags.appendSlice(b.allocator, &.{ "-std=c11", "-Wall", "-Wextra" }) catch @panic("OOM");
    \\    if (b.option([]const u8, "cflags", "Extra C flags (comma-separated)")) |extra| {
    \\        var it = std.mem.tokenizeScalar(u8, extra, ',');
    \\        while (it.next()) |f| cflags.append(b.allocator, f) catch @panic("OOM");
    \\    }
    \\    mod.addCSourceFiles(.{
    \\        .root = b.path("src"),
    \\        .files = &.{"main.c"},
    \\        .flags = cflags.items,
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

// ── Integrity-check types + helpers ─────────────────────────────────────────

/// Accumulates pass / warn / fail counts for `zigc check`.
const Check = struct {
    n_ok: usize = 0,
    n_warn: usize = 0,
    n_fail: usize = 0,

    fn ok(c: *Check, msg: []const u8) void {
        std.debug.print("  \u{2713} {s}\n", .{msg});
        c.n_ok += 1;
    }
    fn warn(c: *Check, msg: []const u8) void {
        std.debug.print("  ! {s}\n", .{msg});
        c.n_warn += 1;
    }
    fn fail(c: *Check, msg: []const u8) void {
        std.debug.print("  \u{2717} {s}\n", .{msg});
        c.n_fail += 1;
    }
};

/// Return true if `sub_path` exists as either a file or a directory.
fn pathExists(dir: std.Io.Dir, io: std.Io, sub_path: []const u8) bool {
    if (dir.statFile(io, sub_path, .{})) |_| return true else |_| {}
    if (dir.openDir(io, sub_path, .{})) |d| { d.close(io); return true; } else |_| {}
    return false;
}

/// Extract the quoted string values from a `.paths = .{ "a", "b", ... }` block.
pub fn parseZonPaths(allocator: std.mem.Allocator, zon: []const u8) ![][]const u8 {
    var list: std.ArrayList([]const u8) = .empty;

    const PATHS_OPEN = ".paths = .{";
    const start = std.mem.indexOf(u8, zon, PATHS_OPEN) orelse
        return list.toOwnedSlice(allocator);

    var pos = start + PATHS_OPEN.len;
    var depth: usize = 1;

    while (pos < zon.len and depth > 0) : (pos += 1) {
        switch (zon[pos]) {
            '{' => depth += 1,
            '}' => depth -= 1,
            '"' => if (depth == 1) {
                pos += 1;
                const s = pos;
                while (pos < zon.len and zon[pos] != '"') pos += 1;
                if (pos > s) try list.append(allocator, try allocator.dupe(u8, zon[s..pos]));
            },
            else => {},
        }
    }

    return list.toOwnedSlice(allocator);
}

/// Collect (deduplicated) dep-key strings from all `b.dependency("key", ...)` calls.
pub fn parseBuildDeps(allocator: std.mem.Allocator, build_zig: []const u8) ![][]const u8 {
    var keys: std.ArrayList([]const u8) = .empty;
    const MARKER = "b.dependency(\"";
    var pos: usize = 0;
    while (pos < build_zig.len) {
        const rel = std.mem.indexOf(u8, build_zig[pos..], MARKER) orelse break;
        const ks = pos + rel + MARKER.len;
        const ke = std.mem.indexOf(u8, build_zig[ks..], "\"") orelse break;
        const key = build_zig[ks .. ks + ke];
        // Deduplicate.
        const seen = for (keys.items) |k| {
            if (std.mem.eql(u8, k, key)) break true;
        } else false;
        if (!seen) try keys.append(allocator, try allocator.dupe(u8, key));
        pos = ks + ke + 1;
    }
    return keys.toOwnedSlice(allocator);
}

// ── Package management types + helpers ───────────────────────────────────────

/// One entry from the .dependencies table in build.zig.zon.
pub const Dependency = struct {
    key: []const u8, // Zig identifier used as the dep key
    url: []const u8, // Remote URL (empty for path deps)
};

/// Free every string in `deps` then free the slice itself.
fn freeDeps(allocator: std.mem.Allocator, deps: []Dependency) void {
    for (deps) |d| {
        allocator.free(d.key);
        allocator.free(d.url);
    }
    allocator.free(deps);
}

/// Parse all entries from the `.dependencies = .{ ... }` block of a
/// build.zig.zon file.  Returns a heap-allocated slice; caller owns it
/// and should free with `freeDeps`.
pub fn parseZonDeps(allocator: std.mem.Allocator, zon: []const u8) ![]Dependency {
    var list: std.ArrayList(Dependency) = .empty;

    const DEPS_OPEN = ".dependencies = .{";
    const deps_pos = std.mem.indexOf(u8, zon, DEPS_OPEN) orelse
        return list.toOwnedSlice(allocator);

    var pos = deps_pos + DEPS_OPEN.len;
    var depth: usize = 1; // depth relative to the .dependencies = .{ }
    var cur_key: ?[]const u8 = null;
    var dep_open: usize = 0; // index of '{' for the current dep block

    while (pos < zon.len) : (pos += 1) {
        switch (zon[pos]) {
            '{' => depth += 1,
            '}' => {
                if (depth == 1) break; // end of .dependencies block
                if (depth == 2) { // closing a dep block
                    if (cur_key) |key| {
                        const block = zon[dep_open .. pos + 1];
                        const url = url: {
                            const pfx = ".url = \"";
                            if (std.mem.indexOf(u8, block, pfx)) |u| {
                                const us = u + pfx.len;
                                const ue = std.mem.indexOf(u8, block[us..], "\"") orelse break :url "";
                                break :url block[us .. us + ue];
                            }
                            break :url "";
                        };
                        try list.append(allocator, .{
                            .key = try allocator.dupe(u8, key),
                            .url = try allocator.dupe(u8, url),
                        });
                        cur_key = null;
                    }
                }
                depth -= 1;
            },
            // At depth 1 inside .dependencies, look for `.key = .{` patterns.
            '.' => if (depth == 1) {
                const ks = pos + 1;
                var ke = ks;
                while (ke < zon.len and (std.ascii.isAlphanumeric(zon[ke]) or zon[ke] == '_')) ke += 1;
                if (ke > ks) {
                    var r = ke;
                    while (r < zon.len and (zon[r] == ' ' or zon[r] == '\t')) r += 1;
                    if (r + 4 <= zon.len and std.mem.startsWith(u8, zon[r..], "= .{")) {
                        cur_key = zon[ks..ke];
                        dep_open = r + 3; // position of '{'
                    }
                }
            },
            else => {},
        }
    }

    return list.toOwnedSlice(allocator);
}

/// Remove the named dependency block from build.zig.zon content.
/// Returns `error.DepNotFound` if the key is absent.
fn removeZonDep(allocator: std.mem.Allocator, zon: []const u8, key: []const u8) ![]u8 {
    const pattern = try std.fmt.allocPrint(allocator, ".{s} = .{{", .{key});
    defer allocator.free(pattern);

    const dep_pos = std.mem.indexOf(u8, zon, pattern) orelse return error.DepNotFound;

    // Rewind to start of the line so we include leading whitespace.
    var line_start = dep_pos;
    while (line_start > 0 and zon[line_start - 1] != '\n') line_start -= 1;

    // Scan forward to the matching closing `}` of this dep block.
    var i = dep_pos;
    var depth: usize = 0;
    while (i < zon.len) : (i += 1) {
        if (zon[i] == '{') depth += 1 else if (zon[i] == '}') {
            depth -= 1;
            if (depth == 0) { i += 1; break; }
        }
    }
    if (i < zon.len and zon[i] == ',') i += 1;
    if (i < zon.len and zon[i] == '\n') i += 1;

    return std.mem.concat(allocator, u8, &.{ zon[0..line_start], zon[i..] });
}

/// Insert `b.dependency` + `mod.linkLibrary` calls into build.zig content,
/// placed just before `const exe = b.addExecutable`.  No-op if `key_dep`
/// already appears in the file.
pub fn insertBuildLink(allocator: std.mem.Allocator, build_zig: []const u8, key: []const u8, lib: []const u8) ![]u8 {
    // Idempotency guard.
    const var_name = try std.fmt.allocPrint(allocator, "{s}_dep", .{key});
    defer allocator.free(var_name);
    if (std.mem.indexOf(u8, build_zig, var_name) != null) return allocator.dupe(u8, build_zig);

    const MARKER = "const exe = b.addExecutable";
    // Rewind to the start of the line so leading whitespace stays with build_zig[ins..]
    // and the snippet isn't double-indented.
    var ins = std.mem.indexOf(u8, build_zig, MARKER) orelse return allocator.dupe(u8, build_zig);
    while (ins > 0 and build_zig[ins - 1] != '\n') ins -= 1;

    // {{ and }} in the format string produce literal { and } in the output.
    const snippet = try std.fmt.allocPrint(allocator,
        \\    const {s}_dep = b.dependency("{s}", .{{ .target = target, .optimize = optimize }});
        \\    mod.linkLibrary({s}_dep.artifact("{s}"));
        \\
        \\
    , .{ key, key, key, lib });
    defer allocator.free(snippet);

    return std.mem.concat(allocator, u8, &.{ build_zig[0..ins], snippet, build_zig[ins..] });
}

/// Remove all lines referencing `<key>_dep` from build.zig content.
pub fn removeBuildLink(allocator: std.mem.Allocator, build_zig: []const u8, key: []const u8) ![]u8 {
    const dep_var = try std.fmt.allocPrint(allocator, "{s}_dep", .{key});
    defer allocator.free(dep_var);

    var out: std.ArrayList(u8) = .empty;
    var iter = std.mem.splitScalar(u8, build_zig, '\n');
    while (iter.next()) |line| {
        if (std.mem.indexOf(u8, line, dep_var) != null) continue;
        try out.appendSlice(allocator, line);
        try out.append(allocator, '\n');
    }
    // Restore original trailing-newline behaviour.
    if (out.items.len > 0 and build_zig.len > 0 and build_zig[build_zig.len - 1] != '\n') {
        out.items.len -= 1;
    }
    return out.toOwnedSlice(allocator);
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/// Returns a new allocation with every occurrence of `needle` replaced by `replacement`.
pub fn replaceAll(
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
        std.debug.print("error: missing project name\nUsage: zigc init <name>\n", .{});
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
    std.debug.print("  zigc build         # compile\n", .{});
    std.debug.print("  zigc run           # compile and run\n", .{});
    std.debug.print("  zigc add <url>     # add a C library dependency\n", .{});
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
        std.debug.print("error: missing package URL\nUsage: zigc add <url> [--lib <lib-name>]\n", .{});
        return error.MissingArgument;
    }
    const url = args[0];

    // Optional --lib <name> overrides the artifact name (defaults to dep key).
    var lib_override: ?[]const u8 = null;
    var i: usize = 1;
    while (i < args.len) : (i += 1) {
        if (std.mem.eql(u8, args[i], "--lib") and i + 1 < args.len) {
            lib_override = args[i + 1];
            i += 1;
        }
    }

    const cwd = std.Io.Dir.cwd();

    // Snapshot existing dep keys so we can identify the new one after fetch.
    const zon_before = cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited) catch "";
    defer if (zon_before.len > 0) allocator.free(zon_before);
    const deps_before = try parseZonDeps(allocator, zon_before);
    defer freeDeps(allocator, deps_before);

    // Run zig fetch --save (handles fingerprint insertion automatically).
    try execZig(io, allocator, &.{ "zig", "fetch", "--save", url });

    // Find the newly added dep key by diffing before vs after.
    const zon_after = cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited) catch {
        std.debug.print("warning: could not re-read build.zig.zon to auto-link.\n", .{});
        return;
    };
    defer allocator.free(zon_after);
    const deps_after = try parseZonDeps(allocator, zon_after);
    defer freeDeps(allocator, deps_after);

    var new_key: ?[]const u8 = null;
    outer: for (deps_after) |after| {
        for (deps_before) |before| {
            if (std.mem.eql(u8, before.key, after.key)) continue :outer;
        }
        new_key = after.key;
        break;
    }

    const key = new_key orelse {
        std.debug.print("Dependency added.  Could not detect new key; edit build.zig manually.\n", .{});
        return;
    };
    const lib = lib_override orelse key; // default: artifact name == dep key

    // Insert the linking boilerplate into build.zig.
    const build_zig = cwd.readFileAlloc(io, "build.zig", allocator, .unlimited) catch {
        std.debug.print("warning: could not read build.zig to auto-link.\n", .{});
        return;
    };
    defer allocator.free(build_zig);

    const updated = try insertBuildLink(allocator, build_zig, key, lib);
    defer allocator.free(updated);
    try cwd.writeFile(io, .{ .sub_path = "build.zig", .data = updated });

    std.debug.print("Added '{s}' and linked in build.zig.\n", .{key});
    std.debug.print("  artifact: {s}_dep.artifact(\"{s}\")\n", .{ key, lib });
    std.debug.print("  override artifact name with: zigc add <url> --lib <name>\n", .{});
}

fn cmdRemove(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    if (args.len == 0) {
        std.debug.print("error: missing dependency name\nUsage: zigc remove <name>\n", .{});
        return error.MissingArgument;
    }
    const key = args[0];
    const cwd = std.Io.Dir.cwd();

    // Remove from build.zig.zon.
    const zon = try cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited);
    defer allocator.free(zon);
    const new_zon = removeZonDep(allocator, zon, key) catch |err| {
        if (err == error.DepNotFound) {
            std.debug.print("error: '{s}' not found in build.zig.zon\n", .{key});
        }
        return err;
    };
    defer allocator.free(new_zon);
    try cwd.writeFile(io, .{ .sub_path = "build.zig.zon", .data = new_zon });

    // Remove from build.zig.
    const build_zig = cwd.readFileAlloc(io, "build.zig", allocator, .unlimited) catch {
        std.debug.print("Removed '{s}' from build.zig.zon.\n", .{key});
        std.debug.print("warning: could not update build.zig — remove the linking code manually.\n", .{});
        return;
    };
    defer allocator.free(build_zig);
    const new_build_zig = try removeBuildLink(allocator, build_zig, key);
    defer allocator.free(new_build_zig);
    try cwd.writeFile(io, .{ .sub_path = "build.zig", .data = new_build_zig });

    std.debug.print("Removed '{s}' from build.zig.zon and build.zig.\n", .{key});
}

fn cmdVerify(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    var show_symbols = false;
    for (args) |arg| {
        if (std.mem.eql(u8, arg, "--symbols")) show_symbols = true;
    }

    var c: Check = .{};
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const ar = arena.allocator();
    const cwd = std.Io.Dir.cwd();
    const zon = cwd.readFileAlloc(io, "build.zig.zon", ar, .unlimited) catch "";
    const deps = try parseZonDeps(ar, zon);

    std.debug.print("zigc verify\n", .{});

    // ── 1. Compiled libraries in .zig-cache (object-file layer) ───────────────
    std.debug.print("\nCompiled libraries (.zig-cache):\n", .{});

    const find_res = try std.process.run(ar, io, .{
        .argv = &.{ "find", ".zig-cache", "-name", "lib*.a", "-type", "f" },
    });
    if (find_res.stdout.len == 0) {
        c.warn("no .a files found in .zig-cache — run 'zigc build' first");
    } else {
        var lib_lines = std.mem.splitScalar(u8, std.mem.trimEnd(u8, find_res.stdout, "\n"), '\n');
        while (lib_lines.next()) |lib_path| {
            if (lib_path.len == 0) continue;
            // Derive filename from the path.
            const lib_name = blk: {
                const sep = std.mem.lastIndexOfScalar(u8, lib_path, '/') orelse break :blk lib_path;
                break :blk lib_path[sep + 1 ..];
            };
            const lib_stat = cwd.statFile(io, lib_path, .{}) catch continue;
            // Try to match the library name to a dep key.
            var dep_label: []const u8 = "";
            for (deps) |dep| {
                const expected = try std.fmt.allocPrint(ar, "lib{s}.a", .{dep.key});
                if (std.mem.eql(u8, lib_name, expected)) {
                    dep_label = try std.fmt.allocPrint(ar, "  — dep '{s}'", .{dep.key});
                    break;
                }
            }
            c.ok(try std.fmt.allocPrint(ar, "{s}  ({d:.1} MB){s}", .{
                lib_name,
                @as(f64, @floatFromInt(lib_stat.size)) / (1024.0 * 1024.0),
                dep_label,
            }));
        }
    }

    // ── 2. Final binary in zig-out/bin/ ──────────────────────────────────────────
    std.debug.print("\nBinary artifacts (zig-out/bin):\n", .{});

    var bin_dir = cwd.openDir(io, "zig-out/bin", .{ .iterate = true }) catch {
        c.fail("zig-out/bin not found — run 'zigc build' first");
        const ws: []const u8 = if (c.n_warn == 1) "" else "s";
        const es: []const u8 = if (c.n_fail == 1) "" else "s";
        std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{ c.n_ok, c.n_warn, ws, c.n_fail, es });
        return error.VerifyFailed;
    };
    defer bin_dir.close(io);

    var binaries: std.ArrayList([]const u8) = .empty;
    {
        var iter = bin_dir.iterate();
        while (try iter.next(io)) |entry| {
            if (entry.kind != .directory) {
                try binaries.append(ar, try ar.dupe(u8, entry.name));
            }
        }
    }
    if (binaries.items.len == 0) {
        c.fail("zig-out/bin is empty — run 'zigc build' first");
        const ws: []const u8 = if (c.n_warn == 1) "" else "s";
        const es: []const u8 = if (c.n_fail == 1) "" else "s";
        std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{ c.n_ok, c.n_warn, ws, c.n_fail, es });
        return error.VerifyFailed;
    }

    for (binaries.items) |name| {
        const path = try std.fmt.allocPrint(ar, "zig-out/bin/{s}", .{name});
        const stat = bin_dir.statFile(io, name, .{}) catch {
            c.fail(try std.fmt.allocPrint(ar, "'{s}': stat failed", .{name}));
            continue;
        };

        // file(1) — format and architecture.
        const file_res = try std.process.run(ar, io, .{ .argv = &.{ "file", path } });
        const is_exec =
            std.mem.indexOf(u8, file_res.stdout, "executable") != null or
            std.mem.indexOf(u8, file_res.stdout, "Mach-O") != null or
            std.mem.indexOf(u8, file_res.stdout, "ELF") != null;
        const desc = if (std.mem.indexOf(u8, file_res.stdout, ": ")) |colon|
            std.mem.trimEnd(u8, file_res.stdout[colon + 2 ..], "\n\r")
        else
            std.mem.trimEnd(u8, file_res.stdout, "\n\r");

        if (is_exec) {
            c.ok(try std.fmt.allocPrint(ar, "'{s}' — {s}  ({d:.1} KB)", .{
                name, desc, @as(f64, @floatFromInt(stat.size)) / 1024.0,
            }));
        } else {
            c.fail(try std.fmt.allocPrint(ar, "'{s}' not a valid executable: {s}", .{ name, desc }));
            continue;
        }

        // nm -g — global (exported) symbols.
        const nm_res = try std.process.run(ar, io, .{ .argv = &.{ "nm", "-g", path } });
        const nm_ok = switch (nm_res.term) {
            .exited => |code| code == 0,
            else => false,
        };
        if (!nm_ok) {
            c.fail(try std.fmt.allocPrint(ar, "nm failed on '{s}' — is nm installed?", .{name}));
            continue;
        }

        // ── 3. Parse nm output ─────────────────────────────────────────────────
        // nm line format (after whitespace-tokenization):
        //   3 tokens → defined:   addr  TYPE  symbol
        //   2 tokens → undefined: U     symbol
        std.debug.print("\nSymbol analysis ({s}):\n", .{name});

        var n_defined: usize = 0;
        var n_undefined: usize = 0;
        var has_main = false;

        var lines = std.mem.splitScalar(u8, nm_res.stdout, '\n');
        while (lines.next()) |line| {
            if (line.len == 0) continue;
            var toks = std.mem.tokenizeScalar(u8, line, ' ');
            const t1 = toks.next() orelse continue;
            const t2 = toks.next() orelse continue;
            if (toks.next()) |sym| {
                // Defined symbol: t1=addr, t2=type (unused in defined branch), sym=name.
                n_defined += 1;
                _ = t2;
                // macOS nm prepends '_' to C symbols; strip it for comparison.
                const bare = if (sym.len > 0 and sym[0] == '_') sym[1..] else sym;
                if (std.mem.eql(u8, bare, "main")) has_main = true;
            } else {
                // Undefined symbol: t1=type, t2=name.
                if (std.mem.eql(u8, t1, "U")) n_undefined += 1;
            }
        }

        if (has_main) {
            c.ok("main entrypoint defined");
        } else {
            c.fail("main entrypoint missing");
        }
        c.ok(try std.fmt.allocPrint(ar, "{d} defined symbols,  {d} undefined (OS / libc calls)", .{
            n_defined, n_undefined,
        }));
        if (n_undefined > 200) {
            c.warn(try std.fmt.allocPrint(ar,
                "{d} undefined symbols is unusually high — possible missing static dep", .{n_undefined}));
        }

        // ── 4. Dep symbol presence ──────────────────────────────────────────────
        // Search for "depname_" in nm output. On macOS nm output contains
        // "_sqlite3_open", so "sqlite3_" is a substring match on both platforms.
        if (deps.len > 0) std.debug.print("\nDependency symbols:\n", .{});
        for (deps) |dep| {
            const prefix = try std.fmt.allocPrint(ar, "{s}_", .{dep.key});
            var count: usize = 0;
            var pos: usize = 0;
            while (std.mem.indexOf(u8, nm_res.stdout[pos..], prefix)) |p| {
                count += 1;
                pos += p + 1;
            }
            if (count > 0) {
                c.ok(try std.fmt.allocPrint(ar,
                    "dep '{s}' — {d} symbols compiled in  (e.g. {s}open, {s}exec…)",
                    .{ dep.key, count, prefix, prefix }));
            } else {
                c.warn(try std.fmt.allocPrint(ar,
                    "dep '{s}' — no '{s}*' symbols found in binary (linking issue?)",
                    .{ dep.key, prefix }));
            }
        }

        // ── 5. Optional: full symbol table ──────────────────────────────────────
        if (show_symbols) {
            std.debug.print("\nDefined symbols (first 50):\n", .{});
            var shown: usize = 0;
            lines = std.mem.splitScalar(u8, nm_res.stdout, '\n');
            while (lines.next()) |line| {
                if (line.len == 0) continue;
                var toks = std.mem.tokenizeScalar(u8, line, ' ');
                const ta = toks.next() orelse continue;
                const tb = toks.next() orelse continue;
                _ = ta;
                if (toks.next()) |sym| {
                    const bare = if (sym.len > 0 and sym[0] == '_') sym[1..] else sym;
                    std.debug.print("  {s}  {s}\n", .{ tb, bare });
                    shown += 1;
                    if (shown >= 50) {
                        std.debug.print("  … ({d} more)\n", .{n_defined - 50});
                        break;
                    }
                }
            }
        }
    }

    // ── Summary ────────────────────────────────────────────────────────────
    const ws: []const u8 = if (c.n_warn == 1) "" else "s";
    const es: []const u8 = if (c.n_fail == 1) "" else "s";
    std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{
        c.n_ok, c.n_warn, ws, c.n_fail, es,
    });
    if (c.n_fail > 0) return error.VerifyFailed;
}

fn cmdCheck(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    var do_build = false;
    for (args) |arg| {
        if (std.mem.eql(u8, arg, "--build")) do_build = true;
    }

    var c: Check = .{};
    // Arena for all temporary strings produced during checking.
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const ar = arena.allocator();
    const cwd = std.Io.Dir.cwd();

    std.debug.print("zigc check\n", .{});

    // ── 1. Required files ──────────────────────────────────────────────────
    std.debug.print("\nRequired files:\n", .{});

    var build_zig: ?[]const u8 = null;
    if (cwd.readFileAlloc(io, "build.zig", ar, .unlimited)) |v| {
        build_zig = v;
        c.ok("build.zig found");
    } else |_| {
        c.fail("build.zig missing");
    }

    var zon: ?[]const u8 = null;
    if (cwd.readFileAlloc(io, "build.zig.zon", ar, .unlimited)) |v| {
        zon = v;
        c.ok("build.zig.zon found");
    } else |_| {
        c.fail("build.zig.zon missing");
    }

    // ── 2. build.zig structure ─────────────────────────────────────────────
    if (build_zig) |bz| {
        std.debug.print("\nbuild.zig:\n", .{});
        if (std.mem.indexOf(u8, bz, "pub fn build(b: *std.Build)") != null) {
            c.ok("pub fn build(b: *std.Build) declared");
        } else {
            c.fail("pub fn build(b: *std.Build) not found");
        }
    }

    // ── 3. build.zig.zon fields ────────────────────────────────────────────
    if (zon) |z| {
        std.debug.print("\nbuild.zig.zon fields:\n", .{});

        if (std.mem.indexOf(u8, z, ".name = .") != null)
            c.ok(".name is set")
        else
            c.fail(".name is missing");

        if (std.mem.indexOf(u8, z, ".version = \"") != null)
            c.ok(".version is set")
        else
            c.warn(".version not specified");

        if (std.mem.indexOf(u8, z, ".minimum_zig_version = \"") != null)
            c.ok(".minimum_zig_version is set")
        else
            c.warn(".minimum_zig_version not specified");

        if (std.mem.indexOf(u8, z, ".fingerprint = ") != null)
            c.ok(".fingerprint is set")
        else
            c.warn(".fingerprint missing — zigc add will insert it on first use");

        // ── 4. .paths entries exist on disk ──────────────────────────────
        std.debug.print("\n.paths entries:\n", .{});
        const paths = try parseZonPaths(ar, z);
        if (paths.len == 0) {
            c.warn(".paths block is empty or missing");
        } else {
            for (paths) |path| {
                if (pathExists(cwd, io, path)) {
                    c.ok(try std.fmt.allocPrint(ar, "'{s}' exists on disk", .{path}));
                } else {
                    c.fail(try std.fmt.allocPrint(ar, "'{s}' listed in .paths but missing from disk", .{path}));
                }
            }
        }
    }

    // ── 5. Dependency consistency ──────────────────────────────────────────
    {
        std.debug.print("\nDependency consistency:\n", .{});
        const z = zon orelse "";
        const bz = build_zig orelse "";
        const zon_deps = try parseZonDeps(ar, z);
        const build_keys = try parseBuildDeps(ar, bz);

        if (zon_deps.len == 0 and build_keys.len == 0) {
            c.ok("no dependencies declared");
        } else {
            // Forward: every dep declared in build.zig.zon should be linked.
            for (zon_deps) |dep| {
                const linked = for (build_keys) |bk| {
                    if (std.mem.eql(u8, bk, dep.key)) break true;
                } else false;
                if (linked) {
                    c.ok(try std.fmt.allocPrint(ar, "dep '{s}' declared in zon is linked in build.zig", .{dep.key}));
                } else {
                    c.warn(try std.fmt.allocPrint(ar, "dep '{s}' declared in zon is not linked in build.zig", .{dep.key}));
                }
            }
            // Backward: every b.dependency("key") must have a zon entry.
            for (build_keys) |bk| {
                const declared = for (zon_deps) |dep| {
                    if (std.mem.eql(u8, dep.key, bk)) break true;
                } else false;
                if (!declared) {
                    c.fail(try std.fmt.allocPrint(ar,
                        "b.dependency(\"{s}\") in build.zig has no entry in build.zig.zon",
                        .{bk}));
                }
            }
        }
    }

    // ── 6. Optional: compilation check ────────────────────────────────────
    if (do_build) {
        std.debug.print("\nCompilation (zig build):\n", .{});
        if (exec(io, &.{"zig", "build"})) |_| {
            c.ok("zig build succeeded");
        } else |_| {
            c.fail("zig build failed (see errors above)");
        }
    }

    // ── Summary ────────────────────────────────────────────────────────────
    const ws: []const u8 = if (c.n_warn == 1) "" else "s";
    const es: []const u8 = if (c.n_fail == 1) "" else "s";
    std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{
        c.n_ok, c.n_warn, ws, c.n_fail, es,
    });

    if (c.n_fail > 0) return error.CheckFailed;
}

fn cmdList(io: std.Io, allocator: std.mem.Allocator) !void {
    const cwd = std.Io.Dir.cwd();
    const zon = cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited) catch {
        std.debug.print("error: no build.zig.zon found — are you inside a zigc project?\n", .{});
        return error.NoManifest;
    };
    defer allocator.free(zon);

    const deps = try parseZonDeps(allocator, zon);
    defer freeDeps(allocator, deps);

    if (deps.len == 0) {
        std.debug.print("No dependencies.\n", .{});
        return;
    }
    std.debug.print("{d} dependenc{s}:\n", .{ deps.len, if (deps.len == 1) "y" else "ies" });
    for (deps) |dep| {
        if (dep.url.len > 0) {
            std.debug.print("  {s}\n    {s}\n", .{ dep.key, dep.url });
        } else {
            std.debug.print("  {s}\n", .{dep.key});
        }
    }
}

/// Map a C-style optimisation flag to the Zig build equivalent, if known.
fn mapOptFlag(arg: []const u8) ?[]const u8 {
    if (std.mem.eql(u8, arg, "-O1") or std.mem.eql(u8, arg, "-O2") or
        std.mem.eql(u8, arg, "-O3") or std.mem.eql(u8, arg, "-Ofast"))
        return "-Doptimize=ReleaseFast";
    if (std.mem.eql(u8, arg, "-Os"))
        return "-Doptimize=ReleaseSmall";
    if (std.mem.eql(u8, arg, "-Og") or std.mem.eql(u8, arg, "-O"))
        return "-Doptimize=ReleaseSafe";
    return null;
}

/// Build the argv for a `zig build [step]` invocation with flag passthrough.
/// Rules:
///   -O1 / -O2 / -O3 / -Ofast  → -Doptimize=ReleaseFast
///   -Os                         → -Doptimize=ReleaseSmall
///   -Og / -O                    → -Doptimize=ReleaseSafe
///   -D… / --…                   → passed through unchanged
///   -W* / -f* / -D* (C macros)  → accumulated into -Dcflags=flag1,flag2
///   --                          → separator; everything after goes to the run step
fn buildArgv(
    ar: std.mem.Allocator,
    base: []const []const u8,
    extra: []const []const u8,
) ![]const []const u8 {
    var argv: std.ArrayList([]const u8) = .empty;
    var cflags: std.ArrayList([]const u8) = .empty;

    try argv.appendSlice(ar, base);

    var past_sep = false;
    for (extra) |arg| {
        if (past_sep) {
            try argv.append(ar, arg);
        } else if (std.mem.eql(u8, arg, "--")) {
            past_sep = true;
            try argv.append(ar, arg);
        } else if (mapOptFlag(arg)) |mapped| {
            try argv.append(ar, mapped);
        } else if (std.mem.startsWith(u8, arg, "-D") or
                   std.mem.startsWith(u8, arg, "--"))
        {
            try argv.append(ar, arg); // native zig build flags pass through
        } else if (std.mem.startsWith(u8, arg, "-")) {
            try cflags.append(ar, arg); // C-style flags → -Dcflags=
        } else {
            try argv.append(ar, arg); // step names or positional args
        }
    }

    if (cflags.items.len > 0) {
        const joined = try std.mem.join(ar, ",", cflags.items);
        try argv.append(ar, try std.fmt.allocPrint(ar, "-Dcflags={s}", .{joined}));
    }

    return argv.toOwnedSlice(ar);
}

fn cmdBuild(io: std.Io, allocator: std.mem.Allocator, extra: []const []const u8) !void {
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const argv = try buildArgv(arena.allocator(), &.{ "zig", "build" }, extra);
    try execZig(io, allocator, argv);
}

fn cmdRun(io: std.Io, allocator: std.mem.Allocator, extra: []const []const u8) !void {
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const argv = try buildArgv(arena.allocator(), &.{ "zig", "build", "run" }, extra);
    try execZig(io, allocator, argv);
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
    } else if (std.mem.eql(u8, cmd, "remove") or std.mem.eql(u8, cmd, "rm")) {
        try cmdRemove(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "list") or std.mem.eql(u8, cmd, "ls")) {
        try cmdList(io, allocator);
    } else if (std.mem.eql(u8, cmd, "check")) {
        try cmdCheck(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "verify")) {
        try cmdVerify(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "build")) {
        try cmdBuild(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "run")) {
        try cmdRun(io, allocator, rest);
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
