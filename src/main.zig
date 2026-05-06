const std = @import("std");

// ── Version ───────────────────────────────────────────────────────────────────

const VERSION = "0.1.0";

// ── Usage ─────────────────────────────────────────────────────────────────────

const usage =
    \\zigc — C/C++ project build tool powered by the Zig build system
    \\
    \\Usage:
    \\  zigc init   <name> [--cpp]  Create a new C (or C++) project in ./<name>/
    \\  zigc add    <name|url> [--lib n] [--header-only]  Add a dependency
    \\  zigc remove <name>          Remove a dependency
    \\  zigc list                   List installed dependencies
    \\  zigc registry update        Fetch the latest package registry
    \\  zigc registry generate [--limit N]  Scrape allyourcodebase → registry.json
    \\  zigc check  [--build]       Verify project integrity
    \\  zigc verify [--symbols]     Inspect object files and symbols
    \\  zigc build  [flags]         Build the current project  (zig build)
    \\  zigc build  --wasm          Build targeting wasm32-freestanding
    \\  zigc build  --wasi          Build targeting wasm32-wasi
    \\  zigc run    [flags]         Build and run the project  (zig build run)
    \\  zigc clean                  Remove .zig-cache/ and zig-out/
    \\  zigc upgrade                Upgrade zigc to the latest release
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
    \\    const is_wasm = target.result.cpu.arch == .wasm32 or target.result.cpu.arch == .wasm64;
    \\    const is_freestanding = target.result.os.tag == .freestanding;
    \\
    \\    const mod = b.createModule(.{
    \\        .target = target,
    \\        .optimize = optimize,
    \\        .link_libc = !is_freestanding,
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
    \\    if (!is_wasm) {
    \\        const run_cmd = b.addRunArtifact(exe);
    \\        run_cmd.step.dependOn(b.getInstallStep());
    \\        if (b.args) |args| run_cmd.addArgs(args);
    \\        const run_step = b.step("run", "Build and run");
    \\        run_step.dependOn(&run_cmd.step);
    \\    }
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
    \\int main(int argc, char *argv[]) {
    \\    const char *name = (argc > 1) ? argv[1] : "PROJ_NAME";
    \\    printf("Hello from %s!\n", name);
    \\    return 0;
    \\}
    \\
;

const TMPL_BUILD_ZIG_CPP =
    \\const std = @import("std");
    \\
    \\pub fn build(b: *std.Build) void {
    \\    const target = b.standardTargetOptions(.{});
    \\    const optimize = b.standardOptimizeOption(.{});
    \\
    \\    const is_wasm = target.result.cpu.arch == .wasm32 or target.result.cpu.arch == .wasm64;
    \\    const is_freestanding = target.result.os.tag == .freestanding;
    \\
    \\    const mod = b.createModule(.{
    \\        .target = target,
    \\        .optimize = optimize,
    \\        .link_libcpp = !is_freestanding,
    \\    });
    \\
    \\    // Base C++ flags.  Pass extra ones with -Dcflags=-DFOO,-Werror
    \\    var cflags: std.ArrayList([]const u8) = .empty;
    \\    cflags.appendSlice(b.allocator, &.{ "-std=c++17", "-Wall", "-Wextra" }) catch @panic("OOM");
    \\    if (b.option([]const u8, "cflags", "Extra C++ flags (comma-separated)")) |extra| {
    \\        var it = std.mem.tokenizeScalar(u8, extra, ',');
    \\        while (it.next()) |f| cflags.append(b.allocator, f) catch @panic("OOM");
    \\    }
    \\    mod.addCSourceFiles(.{
    \\        .root = b.path("src"),
    \\        .files = &.{"main.cpp"},
    \\        .flags = cflags.items,
    \\    });
    \\
    \\    const exe = b.addExecutable(.{
    \\        .name = "PROJ_NAME",
    \\        .root_module = mod,
    \\    });
    \\    b.installArtifact(exe);
    \\
    \\    if (!is_wasm) {
    \\        const run_cmd = b.addRunArtifact(exe);
    \\        run_cmd.step.dependOn(b.getInstallStep());
    \\        if (b.args) |args| run_cmd.addArgs(args);
    \\        const run_step = b.step("run", "Build and run");
    \\        run_step.dependOn(&run_cmd.step);
    \\    }
    \\}
    \\
;

const TMPL_MAIN_CPP =
    \\#include <iostream>
    \\#include <string>
    \\
    \\int main(int argc, char *argv[]) {
    \\    const std::string name = (argc > 1) ? argv[1] : "PROJ_NAME";
    \\    std::cout << "Hello from " << name << "!\n";
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

// ── Registry types + helpers ─────────────────────────────────────────────────

const REGISTRY_URL = "https://raw.githubusercontent.com/nathanjmorton/zigc/main/registry.json";

pub const RegistryEntry = struct {
    url: []const u8,
    hash: []const u8,
    lib: []const u8,
};

/// Load the local registry cache (~/.zigc/registry.json) and look up `name`.
/// Returns null if the file doesn't exist or `name` isn't in it.
/// The returned entry's strings are heap-allocated; caller must free them
/// with `freeRegistryEntry`.
pub fn registryLookup(allocator: std.mem.Allocator, io: std.Io, name: []const u8) ?RegistryEntry {
    const home = std.mem.sliceTo(std.c.getenv("HOME") orelse return null, 0);
    const path = std.fmt.allocPrint(allocator, "{s}/.zigc/registry.json", .{home}) catch return null;
    defer allocator.free(path);
    const cwd = std.Io.Dir.cwd();
    const data = cwd.readFileAlloc(io, path, allocator, .unlimited) catch return null;
    defer allocator.free(data);
    const raw = registryLookupFromJson(data, name) orelse return null;
    // raw slices point into data which is about to be freed — dupe them.
    return RegistryEntry{
        .url = allocator.dupe(u8, raw.url) catch return null,
        .hash = allocator.dupe(u8, raw.hash) catch return null,
        .lib = allocator.dupe(u8, raw.lib) catch return null,
    };
}

/// Free strings owned by a RegistryEntry returned from `registryLookup`.
pub fn freeRegistryEntry(allocator: std.mem.Allocator, entry: RegistryEntry) void {
    allocator.free(entry.url);
    allocator.free(entry.hash);
    allocator.free(entry.lib);
}

/// Look up `name` in raw JSON registry content. Returns null if not found.
pub fn registryLookupFromJson(data: []const u8, name: []const u8) ?RegistryEntry {
    // Manual extraction: find `"name"` key, then extract url/hash/lib strings.
    // This avoids std.json allocator requirements and keeps it simple.
    const needle_open = findJsonKey(data, name) orelse return null;
    // needle_open points to the '{' of the entry object.
    const block_end = findMatchingBrace(data, needle_open) orelse return null;
    const block = data[needle_open .. block_end + 1];
    return RegistryEntry{
        .url = extractJsonString(block, "url") orelse return null,
        .hash = extractJsonString(block, "hash") orelse return null,
        .lib = extractJsonString(block, "lib") orelse return null,
    };
}

/// Find the position of '{' for the value of a given top-level key in JSON.
fn findJsonKey(data: []const u8, key: []const u8) ?usize {
    var pos: usize = 0;
    while (pos < data.len) {
        // Find next '"'
        const q1 = std.mem.indexOfScalarPos(u8, data, pos, '"') orelse return null;
        const ks = q1 + 1;
        const q2 = std.mem.indexOfScalarPos(u8, data, ks, '"') orelse return null;
        const found_key = data[ks..q2];
        pos = q2 + 1;
        if (std.mem.eql(u8, found_key, key)) {
            // Skip to the '{' after the colon.
            const brace = std.mem.indexOfScalarPos(u8, data, pos, '{') orelse return null;
            return brace;
        }
    }
    return null;
}

/// Find the matching '}' for a '{' at `start`.
fn findMatchingBrace(data: []const u8, start: usize) ?usize {
    var depth: usize = 0;
    var i = start;
    while (i < data.len) : (i += 1) {
        if (data[i] == '{') depth += 1
        else if (data[i] == '}') {
            depth -= 1;
            if (depth == 0) return i;
        }
    }
    return null;
}

/// Extract the string value for a given key inside a JSON object fragment.
fn extractJsonString(block: []const u8, key: []const u8) ?[]const u8 {
    var pos: usize = 0;
    while (pos < block.len) {
        const q1 = std.mem.indexOfScalarPos(u8, block, pos, '"') orelse return null;
        const ks = q1 + 1;
        const q2 = std.mem.indexOfScalarPos(u8, block, ks, '"') orelse return null;
        const found_key = block[ks..q2];
        pos = q2 + 1;
        if (std.mem.eql(u8, found_key, key)) {
            // Next quoted string is the value.
            const v1 = std.mem.indexOfScalarPos(u8, block, pos, '"') orelse return null;
            const vs = v1 + 1;
            const v2 = std.mem.indexOfScalarPos(u8, block, vs, '"') orelse return null;
            return block[vs..v2];
        }
    }
    return null;
}

/// Extract all values of `key` from a JSON array of objects.
/// e.g. from `[{"name":"lz4"},{"name":"zlib"}]` with key="name" → {"lz4","zlib"}
pub fn extractJsonArrayField(allocator: std.mem.Allocator, json: []const u8, key: []const u8) ![][]const u8 {
    var list: std.ArrayList([]const u8) = .empty;
    // Walk through array elements (top-level objects).
    var pos: usize = 0;
    while (pos < json.len) {
        // Find next object open brace at depth 1 (inside the array).
        const obj_start = std.mem.indexOfScalarPos(u8, json, pos, '{') orelse break;
        const obj_end = findMatchingBrace(json, obj_start) orelse break;
        const obj = json[obj_start .. obj_end + 1];
        if (extractJsonString(obj, key)) |val| {
            try list.append(allocator, try allocator.dupe(u8, val));
        }
        pos = obj_end + 1;
    }
    return list.toOwnedSlice(allocator);
}

/// Extract a nested string field from the first object in a JSON array.
/// e.g. from `[{"commit":{"sha":"abc"}}]`, outer="commit", inner="sha" → "abc"
pub fn extractJsonNestedField(json: []const u8, outer_key: []const u8, inner_key: []const u8) ?[]const u8 {
    // Find the first object.
    const obj_start = std.mem.indexOfScalar(u8, json, '{') orelse return null;
    const obj_end = findMatchingBrace(json, obj_start) orelse return null;
    const obj = json[obj_start .. obj_end + 1];
    // Find the nested object for outer_key.
    const nested_start = findJsonKey(obj, outer_key) orelse return null;
    const nested_end = findMatchingBrace(obj, nested_start) orelse return null;
    const nested = obj[nested_start .. nested_end + 1];
    return extractJsonString(nested, inner_key);
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

/// Insert `b.dependency` + `mod.addIncludePath` calls for header-only deps.
/// Placed just before `const exe = b.addExecutable`.  No-op if `key_dep`
/// already appears in the file.
pub fn insertBuildInclude(allocator: std.mem.Allocator, build_zig: []const u8, key: []const u8, include_subdir: []const u8) ![]u8 {
    // Idempotency guard.
    const var_name = try std.fmt.allocPrint(allocator, "{s}_dep", .{key});
    defer allocator.free(var_name);
    if (std.mem.indexOf(u8, build_zig, var_name) != null) return allocator.dupe(u8, build_zig);

    const MARKER = "const exe = b.addExecutable";
    var ins = std.mem.indexOf(u8, build_zig, MARKER) orelse return allocator.dupe(u8, build_zig);
    while (ins > 0 and build_zig[ins - 1] != '\n') ins -= 1;

    const snippet = if (include_subdir.len > 0)
        try std.fmt.allocPrint(allocator,
            \\    const {s}_dep = b.dependency("{s}", .{{ .target = target, .optimize = optimize }});
            \\    mod.addIncludePath({s}_dep.path("{s}"));
            \\
            \\
        , .{ key, key, key, include_subdir })
    else
        try std.fmt.allocPrint(allocator,
            \\    const {s}_dep = b.dependency("{s}", .{{ .target = target, .optimize = optimize }});
            \\    mod.addIncludePath({s}_dep.path(""));
            \\
            \\
        , .{ key, key, key });
    defer allocator.free(snippet);

    return std.mem.concat(allocator, u8, &.{ build_zig[0..ins], snippet, build_zig[ins..] });
}

/// Insert a dependency entry directly into build.zig.zon content (no zig fetch).
/// The new block looks like:
///     .key = .{
///         .url = "...",
///         .hash = "...",
///     },
pub fn insertZonDep(allocator: std.mem.Allocator, zon: []const u8, key: []const u8, url: []const u8, hash: []const u8) ![]u8 {
    // Idempotency: if the key already exists, return a copy.
    const pattern = try std.fmt.allocPrint(allocator, ".{s} = .", .{key});
    defer allocator.free(pattern);
    if (std.mem.indexOf(u8, zon, pattern) != null) return allocator.dupe(u8, zon);

    const DEPS_OPEN = ".dependencies = .{";
    const deps_pos = std.mem.indexOf(u8, zon, DEPS_OPEN) orelse return allocator.dupe(u8, zon);
    const insert_at = deps_pos + DEPS_OPEN.len;

    const snippet = try std.fmt.allocPrint(allocator,
        "\n        .{s} = .{{\n            .url = \"{s}\",\n            .hash = \"{s}\",\n        }},"
    , .{ key, url, hash });
    defer allocator.free(snippet);

    return std.mem.concat(allocator, u8, &.{ zon[0..insert_at], snippet, zon[insert_at..] });
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
        std.debug.print("error: missing project name\nUsage: zigc init <name> [--cpp]\n", .{});
        return error.MissingArgument;
    }

    // Parse name and optional --cpp flag.
    var name: []const u8 = undefined;
    var cpp = false;
    var got_name = false;
    for (args) |arg| {
        if (std.mem.eql(u8, arg, "--cpp")) {
            cpp = true;
        } else if (!got_name) {
            name = arg;
            got_name = true;
        }
    }
    if (!got_name) {
        std.debug.print("error: missing project name\nUsage: zigc init <name> [--cpp]\n", .{});
        return error.MissingArgument;
    }

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
        const tmpl = if (cpp) TMPL_BUILD_ZIG_CPP else TMPL_BUILD_ZIG;
        const content = try replaceAll(allocator, tmpl, "PROJ_NAME", name);
        defer allocator.free(content);
        try dir.writeFile(io, .{ .sub_path = "build.zig", .data = content });
    }

    // build.zig.zon
    {
        const content = try replaceAll(allocator, TMPL_BUILD_ZIG_ZON, "PROJ_IDENT", ident);
        defer allocator.free(content);
        try dir.writeFile(io, .{ .sub_path = "build.zig.zon", .data = content });
    }

    // src/main.c or src/main.cpp
    {
        const tmpl = if (cpp) TMPL_MAIN_CPP else TMPL_MAIN_C;
        const src_file = if (cpp) "main.cpp" else "main.c";
        const content = try replaceAll(allocator, tmpl, "PROJ_NAME", name);
        defer allocator.free(content);
        var src_dir = try dir.openDir(io, "src", .{});
        defer src_dir.close(io);
        try src_dir.writeFile(io, .{ .sub_path = src_file, .data = content });
    }

    // .gitignore
    try dir.writeFile(io, .{ .sub_path = ".gitignore", .data = TMPL_GITIGNORE });

    const lang = if (cpp) "C++" else "C";
    std.debug.print("Created {s} project '{s}'\n", .{ lang, name });
    std.debug.print("  cd {s}\n", .{name});
    std.debug.print("  zigc build         # compile\n", .{});
    std.debug.print("  zigc run           # compile and run\n", .{});
    std.debug.print("  zigc add <url>     # add a library dependency\n", .{});
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
        std.debug.print("error: missing package name or URL\nUsage: zigc add <name|url> [--lib <lib-name>] [--header-only [subdir]]\n", .{});
        return error.MissingArgument;
    }
    const target = args[0];

    // Optional --lib <name> overrides the artifact name (defaults to dep key).
    var lib_override: ?[]const u8 = null;
    // Optional --header-only [subdir] for header-only deps (include path only, no linking).
    var header_only = false;
    var header_include_subdir: []const u8 = "include";
    var i: usize = 1;
    while (i < args.len) : (i += 1) {
        if (std.mem.eql(u8, args[i], "--lib") and i + 1 < args.len) {
            lib_override = args[i + 1];
            i += 1;
        } else if (std.mem.eql(u8, args[i], "--header-only")) {
            header_only = true;
            // Optional next arg is the include subdir (default "include")
            if (i + 1 < args.len and !std.mem.startsWith(u8, args[i + 1], "--")) {
                header_include_subdir = args[i + 1];
                i += 1;
            }
        }
    }

    // Determine if this is a URL or a friendly registry name.
    const is_url = std.mem.indexOf(u8, target, "://") != null or std.mem.startsWith(u8, target, "git+");

    if (!is_url) {
        // ── Registry-based add ────────────────────────────────────────────
        const entry = registryLookup(allocator, io, target) orelse {
            std.debug.print("error: '{s}' not found in registry\n", .{target});
            std.debug.print("  Run 'zigc registry update' to refresh, or pass a full URL.\n", .{});
            return error.RegistryMiss;
        };
        defer freeRegistryEntry(allocator, entry);
        const key = target;
        const lib = lib_override orelse entry.lib;

        const cwd = std.Io.Dir.cwd();

        // Insert dep into build.zig.zon directly (we already have the hash).
        const zon = cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited) catch {
            std.debug.print("error: no build.zig.zon found — are you inside a zigc project?\n", .{});
            return error.NoManifest;
        };
        defer allocator.free(zon);
        const new_zon = try insertZonDep(allocator, zon, key, entry.url, entry.hash);
        defer allocator.free(new_zon);
        try cwd.writeFile(io, .{ .sub_path = "build.zig.zon", .data = new_zon });

        // Insert linking boilerplate into build.zig.
        const build_zig = cwd.readFileAlloc(io, "build.zig", allocator, .unlimited) catch {
            std.debug.print("Added '{s}' to build.zig.zon.\n", .{key});
            std.debug.print("warning: could not read build.zig to auto-link.\n", .{});
            return;
        };
        defer allocator.free(build_zig);
        const updated = if (header_only)
            try insertBuildInclude(allocator, build_zig, key, header_include_subdir)
        else
            try insertBuildLink(allocator, build_zig, key, lib);
        defer allocator.free(updated);
        try cwd.writeFile(io, .{ .sub_path = "build.zig", .data = updated });

        if (header_only) {
            std.debug.print("Added '{s}' from registry (header-only) in build.zig.\n", .{key});
            std.debug.print("  include: {s}_dep.path(\"{s}\")\n", .{ key, header_include_subdir });
        } else {
            std.debug.print("Added '{s}' from registry and linked in build.zig.\n", .{key});
            std.debug.print("  artifact: {s}_dep.artifact(\"{s}\")\n", .{ key, lib });
        }
        return;
    }

    // ── URL-based add (original flow) ────────────────────────────────────
    const url = target;
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

    const updated = if (header_only)
        try insertBuildInclude(allocator, build_zig, key, header_include_subdir)
    else
        try insertBuildLink(allocator, build_zig, key, lib);
    defer allocator.free(updated);
    try cwd.writeFile(io, .{ .sub_path = "build.zig", .data = updated });

    if (header_only) {
        std.debug.print("Added '{s}' (header-only) in build.zig.\n", .{key});
        std.debug.print("  include: {s}_dep.path(\"{s}\")\n", .{ key, header_include_subdir });
    } else {
        std.debug.print("Added '{s}' and linked in build.zig.\n", .{key});
        std.debug.print("  artifact: {s}_dep.artifact(\"{s}\")\n", .{ key, lib });
        std.debug.print("  override artifact name with: zigc add <url> --lib <name>\n", .{});
    }
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

/// Return true if `name` (the part after `-D`) looks like a Zig build option.
/// Zig options are lower-snake-case (e.g. `optimize`, `target`, `cflags`).
/// C macros are typically UPPER_CASE (e.g. `NDEBUG`, `DEBUG`, `FOO=1`).
/// This lets us route `-DNDEBUG` to -Dcflags while `-Doptimize=...` passes through.
pub fn isBuildOption(name: []const u8) bool {
    return name.len > 0 and std.ascii.isLower(name[0]);
}

/// Build the argv for a `zig build [step]` invocation with flag passthrough.
/// Rules:
///   -O1 / -O2 / -O3 / -Ofast        → -Doptimize=ReleaseFast
///   -Os                               → -Doptimize=ReleaseSmall
///   -Og / -O                          → -Doptimize=ReleaseSafe
///   -D<lower>… (Zig option)  / --…   → passed through unchanged
///   -D<UPPER>… (C macro, e.g. -DFOO) → accumulated into -Dcflags=
///   any other -flag (-Wall, -Werror…) → accumulated into -Dcflags=
///   --                                → separator; everything after → run step
pub fn buildArgv(
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
        } else if (std.mem.startsWith(u8, arg, "-D") and isBuildOption(arg[2..])) {
            try argv.append(ar, arg); // Zig build option (-Doptimize=…, -Dcflags=…)
        } else if (std.mem.eql(u8, arg, "--wasm")) {
            try argv.append(ar, "-Dtarget=wasm32-freestanding");
        } else if (std.mem.eql(u8, arg, "--wasi")) {
            try argv.append(ar, "-Dtarget=wasm32-wasi");
        } else if (std.mem.startsWith(u8, arg, "--")) {
            try argv.append(ar, arg); // long zig flags (--verbose, --summary)
        } else if (std.mem.startsWith(u8, arg, "-")) {
            try cflags.append(ar, arg); // C flags: -Wall, -DFOO, -DNDEBUG, …
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

fn cmdRegistryGenerate(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    const API_BASE = "https://api.github.com";
    const ORG = "allyourcodebase";

    // Optional --limit N to cap the number of repos processed.
    var limit: usize = std.math.maxInt(usize);
    var i: usize = 0;
    while (i < args.len) : (i += 1) {
        if (std.mem.eql(u8, args[i], "--limit") and i + 1 < args.len) {
            limit = std.fmt.parseInt(usize, args[i + 1], 10) catch 0;
            i += 1;
        }
    }

    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const ar = arena.allocator();

    // Build curl auth header if GITHUB_TOKEN is set.
    const token_ptr = std.c.getenv("GITHUB_TOKEN");
    const auth_header: ?[]const u8 = if (token_ptr) |tp|
        try std.fmt.allocPrint(ar, "Authorization: token {s}", .{std.mem.sliceTo(tp, 0)})
    else
        null;

    // ── 1. Fetch repo list (paginated) ──────────────────────────────────────
    std.debug.print("Fetching repo list from {s}...\n", .{ORG});
    var all_repos: std.ArrayList([]const u8) = .empty;
    var page: usize = 1;
    while (true) {
        const api_url = try std.fmt.allocPrint(ar,
            "{s}/orgs/{s}/repos?per_page=100&page={d}", .{ API_BASE, ORG, page });
        var curl_args: std.ArrayList([]const u8) = .empty;
        try curl_args.appendSlice(ar, &.{ "curl", "-sf" });
        if (auth_header) |h| try curl_args.appendSlice(ar, &.{ "-H", h });
        try curl_args.append(ar, api_url);
        const result = try std.process.run(ar, io, .{ .argv = curl_args.items });
        const ok = switch (result.term) { .exited => |c| c == 0, else => false };
        if (!ok or result.stdout.len < 3) break; // empty page or error
        const names = try extractJsonArrayField(ar, result.stdout, "name");
        if (names.len == 0) break;
        try all_repos.appendSlice(ar, names);
        if (names.len < 100) break; // last page
        page += 1;
    }
    std.debug.print("Found {d} repos\n", .{all_repos.items.len});

    // ── 2. Create temp directory for zig fetch ──────────────────────────────
    const cwd = std.Io.Dir.cwd();
    const tmp_dir = "/tmp/zigc-registry-gen";
    cwd.deleteTree(io, tmp_dir) catch {};
    try cwd.createDir(io, tmp_dir, .default_dir);
    var td = try cwd.openDir(io, tmp_dir, .{});
    defer td.close(io);
    try td.writeFile(io, .{ .sub_path = "build.zig.zon",
        .data = ".{ .name = .tmp, .version = \"0.0.0\", .paths = .{}, .dependencies = .{} }\n" });
    try td.writeFile(io, .{ .sub_path = "build.zig",
        .data = "const std = @import(\"std\");\npub fn build(b: *std.Build) void { _ = b; }\n" });

    // ── 3. Process each repo ────────────────────────────────────────────────
    var json_buf: std.ArrayList(u8) = .empty;
    try json_buf.appendSlice(ar, "{\n");
    var n_ok: usize = 0;
    var n_skip: usize = 0;
    const count = @min(all_repos.items.len, limit);

    for (all_repos.items[0..count], 0..) |repo_name, idx| {
        std.debug.print("[{d}/{d}] {s}...", .{ idx + 1, count, repo_name });

        // Fetch latest tag.
        const tags_url = try std.fmt.allocPrint(ar,
            "{s}/repos/{s}/{s}/tags?per_page=1", .{ API_BASE, ORG, repo_name });
        var tag_args: std.ArrayList([]const u8) = .empty;
        try tag_args.appendSlice(ar, &.{ "curl", "-sf" });
        if (auth_header) |h| try tag_args.appendSlice(ar, &.{ "-H", h });
        try tag_args.append(ar, tags_url);
        const tag_result = try std.process.run(ar, io, .{ .argv = tag_args.items });
        const tag_ok = switch (tag_result.term) { .exited => |c| c == 0, else => false };
        if (!tag_ok or tag_result.stdout.len < 3) {
            std.debug.print(" skip (no tags)\n", .{});
            n_skip += 1;
            continue;
        }

        // Extract tag name and commit SHA.
        const tag_names = try extractJsonArrayField(ar, tag_result.stdout, "name");
        if (tag_names.len == 0) {
            std.debug.print(" skip (no tags)\n", .{});
            n_skip += 1;
            continue;
        }
        const tag_name = tag_names[0];
        const commit_sha = extractJsonNestedField(tag_result.stdout, "commit", "sha") orelse {
            std.debug.print(" skip (no commit sha)\n", .{});
            n_skip += 1;
            continue;
        };

        // Build the URL and run zig fetch.
        const git_url = try std.fmt.allocPrint(ar,
            "git+https://github.com/{s}/{s}.git?ref={s}#{s}",
            .{ ORG, repo_name, tag_name, commit_sha });

        const fetch_result = try std.process.run(ar, io, .{
            .argv = &.{ "zig", "fetch", git_url },
            .cwd = .{ .path = tmp_dir },
        });
        const fetch_ok = switch (fetch_result.term) { .exited => |c| c == 0, else => false };
        if (!fetch_ok or fetch_result.stdout.len == 0) {
            std.debug.print(" skip (zig fetch failed)\n", .{});
            n_skip += 1;
            continue;
        }
        const hash = std.mem.trimEnd(u8, fetch_result.stdout, "\n\r ");

        // Derive lib name: lowercase the repo name, replace hyphens with underscores.
        const lib = try ar.dupe(u8, repo_name);
        for (lib) |*ch| {
            if (ch.* == '-') ch.* = '_';
            ch.* = std.ascii.toLower(ch.*);
        }

        // Append JSON entry.
        if (n_ok > 0) try json_buf.appendSlice(ar, ",\n");
        const entry = try std.fmt.allocPrint(ar,
            "  \"{s}\": {{\n    \"url\": \"{s}\",\n    \"hash\": \"{s}\",\n    \"lib\": \"{s}\"\n  }}",
            .{ lib, git_url, hash, lib });
        try json_buf.appendSlice(ar, entry);
        n_ok += 1;
        std.debug.print(" ok ({s})\n", .{tag_name});
    }

    try json_buf.appendSlice(ar, "\n}\n");

    // ── 4. Write registry.json ──────────────────────────────────────────────
    try cwd.writeFile(io, .{ .sub_path = "registry.json", .data = json_buf.items });
    std.debug.print("\nWrote registry.json: {d} packages ({d} skipped)\n", .{ n_ok, n_skip });

    // Clean up temp dir.
    cwd.deleteTree(io, tmp_dir) catch {};
}

fn cmdRegistryUpdate(io: std.Io, allocator: std.mem.Allocator) !void {
    const home_ptr = std.c.getenv("HOME") orelse {
        std.debug.print("error: HOME not set\n", .{});
        return error.NoHome;
    };
    const home = std.mem.sliceTo(home_ptr, 0);
    const dir_path = try std.fmt.allocPrint(allocator, "{s}/.zigc", .{home});
    defer allocator.free(dir_path);
    const file_path = try std.fmt.allocPrint(allocator, "{s}/.zigc/registry.json", .{home});
    defer allocator.free(file_path);

    // Create ~/.zigc/ if needed.
    const cwd = std.Io.Dir.cwd();
    cwd.createDir(io, dir_path, .default_dir) catch |err| {
        if (err != error.PathAlreadyExists) return err;
    };

    // Fetch registry.json from remote using curl.
    std.debug.print("Fetching registry from {s}...\n", .{REGISTRY_URL});
    const result = try std.process.run(allocator, io, .{
        .argv = &.{ "curl", "-sfL", "-o", file_path, REGISTRY_URL },
    });
    defer allocator.free(result.stdout);
    defer allocator.free(result.stderr);

    const ok = switch (result.term) {
        .exited => |c| c == 0,
        else => false,
    };
    if (!ok) {
        std.debug.print("error: failed to fetch registry\n", .{});
        if (result.stderr.len > 0) std.debug.print("{s}", .{result.stderr});
        return error.FetchFailed;
    }

    // Count entries in the downloaded file.
    const data = cwd.readFileAlloc(io, file_path, allocator, .unlimited) catch {
        std.debug.print("Registry saved to {s}\n", .{file_path});
        return;
    };
    defer allocator.free(data);
    // Quick count: number of top-level keys (count '"key": {' patterns).
    var n_entries: usize = 0;
    var pos: usize = 0;
    while (pos < data.len) {
        const q = std.mem.indexOfScalarPos(u8, data, pos, '{') orelse break;
        pos = q + 1;
        n_entries += 1;
    }
    if (n_entries > 0) n_entries -= 1; // subtract the outer object brace
    std.debug.print("Registry updated: {d} package{s} cached in {s}\n", .{
        n_entries, if (n_entries == 1) "" else "s", file_path,
    });
}

fn cmdClean(io: std.Io) !void {
    const cwd = std.Io.Dir.cwd();
    for ([_][]const u8{ ".zig-cache", "zig-out" }) |path| {
        try cwd.deleteTree(io, path);
        std.debug.print("Removed {s}/\n", .{path});
    }
}

// ── upgrade command ──────────────────────────────────────────────────────────

fn cmdUpgrade(io: std.Io, allocator: std.mem.Allocator) !void {
    const GITHUB_API = "https://api.github.com/repos/nathanjmorton/zigc/releases/latest";

    // 1. Fetch latest release tag from GitHub API.
    const api_result = try std.process.run(allocator, io, .{
        .argv = &.{ "curl", "-sfL", "-H", "Accept: application/vnd.github.v3+json", GITHUB_API },
    });
    defer allocator.free(api_result.stdout);
    defer allocator.free(api_result.stderr);

    const api_ok = switch (api_result.term) { .exited => |c| c == 0, else => false };
    if (!api_ok or api_result.stdout.len == 0) {
        std.debug.print("error: failed to check for updates\n", .{});
        return error.FetchFailed;
    }

    // Extract "tag_name" from the JSON response.
    const tag = extractJsonString(api_result.stdout, "tag_name") orelse {
        std.debug.print("error: could not parse latest release\n", .{});
        return error.ParseFailed;
    };

    // Strip leading 'v' if present for version comparison.
    const latest_version = if (tag.len > 0 and tag[0] == 'v') tag[1..] else tag;

    if (std.mem.eql(u8, latest_version, VERSION)) {
        std.debug.print("zigc is already up to date (v{s})\n", .{VERSION});
        return;
    }

    std.debug.print("Upgrading zigc v{s} → {s}\n", .{ VERSION, tag });

    // 2. Detect current platform.
    const target = comptime detectTarget();

    // 3. Build download URL.
    const download_url = try std.fmt.allocPrint(allocator,
        "https://github.com/nathanjmorton/zigc/releases/download/{s}/zigc-{s}.tar.gz",
        .{ tag, target });
    defer allocator.free(download_url);

    // 4. Find the actual binary location via `which zigc`.
    const which_result = try std.process.run(allocator, io, .{
        .argv = &.{ "which", "zigc" },
    });
    defer allocator.free(which_result.stdout);
    defer allocator.free(which_result.stderr);

    const which_ok = switch (which_result.term) { .exited => |c| c == 0, else => false };
    if (!which_ok or which_result.stdout.len == 0) {
        std.debug.print("error: could not find zigc on PATH\n", .{});
        return error.NotFound;
    }
    const self_path = std.mem.trimEnd(u8, which_result.stdout, "\n\r ");

    // Detect Homebrew installs and warn the user.
    if (std.mem.indexOf(u8, self_path, "/homebrew/") != null or
        std.mem.indexOf(u8, self_path, "/Cellar/") != null)
    {
        std.debug.print("zigc is installed via Homebrew ({s}).\n", .{self_path});
        std.debug.print("Use 'brew upgrade zigc' instead of 'zigc upgrade'.\n", .{});
        return;
    }

    // 5. Download to a temp file and extract.
    const tmp_tar = try std.fmt.allocPrint(allocator, "{s}.tar.gz", .{self_path});
    defer allocator.free(tmp_tar);

    const dl_result = try std.process.run(allocator, io, .{
        .argv = &.{ "curl", "-fL", "--progress-bar", "-o", tmp_tar, download_url },
    });
    defer allocator.free(dl_result.stdout);
    defer allocator.free(dl_result.stderr);

    const dl_ok = switch (dl_result.term) { .exited => |c| c == 0, else => false };
    if (!dl_ok) {
        std.debug.print("error: failed to download {s}\n", .{download_url});
        return error.DownloadFailed;
    }

    // Extract the binary, overwriting the existing one.
    const bin_dir = self_path[0 .. std.mem.lastIndexOfScalar(u8, self_path, '/') orelse 0];
    const extract_result = try std.process.run(allocator, io, .{
        .argv = &.{ "tar", "-xzf", tmp_tar, "-C", bin_dir },
    });
    defer allocator.free(extract_result.stdout);
    defer allocator.free(extract_result.stderr);

    const extract_ok = switch (extract_result.term) { .exited => |c| c == 0, else => false };
    if (!extract_ok) {
        std.debug.print("error: failed to extract update\n", .{});
        return error.ExtractFailed;
    }

    // Clean up the tarball.
    const cwd = std.Io.Dir.cwd();
    cwd.deleteFile(io, tmp_tar) catch {};

    // Make executable.
    const chmod_result = try std.process.run(allocator, io, .{
        .argv = &.{ "chmod", "+x", self_path },
    });
    defer allocator.free(chmod_result.stdout);
    defer allocator.free(chmod_result.stderr);

    std.debug.print("zigc upgraded to {s}\n", .{tag});
}

/// Detect the Zig target triple for the current platform at comptime.
fn detectTarget() []const u8 {
    const arch = @import("builtin").cpu.arch;
    const os = @import("builtin").os.tag;
    if (os == .macos) {
        if (arch == .aarch64) return "aarch64-macos";
        if (arch == .x86_64) return "x86_64-macos";
    }
    if (os == .linux) {
        if (arch == .aarch64) return "aarch64-linux-gnu";
        if (arch == .x86_64) return "x86_64-linux-gnu";
    }
    @compileError("unsupported platform for zigc upgrade");
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
    } else if (std.mem.eql(u8, cmd, "registry")) {
        if (rest.len > 0 and std.mem.eql(u8, rest[0], "update")) {
            try cmdRegistryUpdate(io, allocator);
        } else if (rest.len > 0 and std.mem.eql(u8, rest[0], "generate")) {
            try cmdRegistryGenerate(io, allocator, rest[1..]);
        } else {
            std.debug.print("Usage: zigc registry <update|generate>\n", .{});
            return error.MissingArgument;
        }
    } else if (std.mem.eql(u8, cmd, "clean")) {
        try cmdClean(io);
    } else if (std.mem.eql(u8, cmd, "upgrade")) {
        try cmdUpgrade(io, allocator);
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
