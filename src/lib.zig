const std = @import("std");

// ── Version ───────────────────────────────────────────────────────────────────

pub const VERSION = "0.5.0";

// ── Templates ────────────────────────────────────────────────────────────────
// Placeholders replaced at runtime (not fmt strings — safe to contain { }):
//   PROJ_NAME  → raw project name, e.g. "my-app"
//   PROJ_IDENT → valid Zig identifier,  e.g. "my_app"

pub const TMPL_BUILD_ZIG =
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
    \\    mod.addIncludePath(b.path("src"));
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
    \\        .files = &.{ "main.c", "safety_bugs.c" },
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

pub const TMPL_BUILD_ZIG_ZON =
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

pub const TMPL_MAIN_C =
    \\#include <stdio.h>
    \\#include "safety_bugs.h"
    \\
    \\int main(void) {
    \\    printf("=== PROJ_NAME — zigc safety demo ===\n\n");
    \\
    \\    printf("1. Use after free\n");
    \\    demo_use_after_free();
    \\
    \\    printf("\n2. Double free\n");
    \\    demo_double_free();
    \\
    \\    printf("\n3. Memory leak\n");
    \\    demo_memory_leak();
    \\
    \\    printf("\n4. Leak on reassignment\n");
    \\    demo_leak_on_reassign();
    \\
    \\    printf("\n=== done ===\n");
    \\    return 0;
    \\}
    \\
;

pub const TMPL_SAFETY_BUGS_H =
    \\#ifndef SAFETY_BUGS_H
    \\#define SAFETY_BUGS_H
    \\
    \\// Each function demonstrates a memory-safety bug that `zigc safe` detects.
    \\// See safety_bugs.c for annotated implementations with fix instructions.
    \\
    \\void demo_use_after_free(void);
    \\void demo_double_free(void);
    \\void demo_memory_leak(void);
    \\void demo_leak_on_reassign(void);
    \\
    \\#endif
    \\
;

pub const TMPL_SAFETY_BUGS_C =
    \\#include <stdlib.h>
    \\#include <stdio.h>
    \\#include <string.h>
    \\#include "safety_bugs.h"
    \\
    \\// ── Bug 1: Use After Free ──────────────────────────────────────────────
    \\//
    \\// FIX: Move the printf() call BEFORE free(buf).
    \\//
    \\void demo_use_after_free(void) {
    \\    char *buf = malloc(64);
    \\    strcpy(buf, "hello, safety!");
    \\    free(buf);
    \\    printf("use_after_free: %s\n", buf);  // BUG: buf already freed
    \\}
    \\
    \\// ── Bug 2: Double Free ────────────────────────────────────────────────
    \\//
    \\// FIX: Remove the second free(data).
    \\//
    \\void demo_double_free(void) {
    \\    int *data = malloc(10 * sizeof(int));
    \\    data[0] = 42;
    \\    free(data);
    \\    free(data);  // BUG: data already freed
    \\}
    \\
    \\// ── Bug 3: Memory Leak ──────────────────────────────────────────────
    \\//
    \\// FIX: Add free(leaked) before the function returns.
    \\//
    \\void demo_memory_leak(void) {
    \\    char *leaked = malloc(256);
    \\    strcpy(leaked, "this memory is never freed");
    \\    printf("leak: %s\n", leaked);
    \\    // BUG: missing free(leaked)
    \\}
    \\
    \\// ── Bug 4: Leak on Reassignment ──────────────────────────────────────
    \\//
    \\// FIX: Call free(p) before the second malloc.
    \\//
    \\void demo_leak_on_reassign(void) {
    \\    int *p = malloc(sizeof(int));
    \\    *p = 1;
    \\    p = malloc(sizeof(int));  // BUG: first allocation leaked
    \\    *p = 2;
    \\    free(p);
    \\}
    \\
;

pub const TMPL_SAFETY_README =
    \\# zigc safe — Memory Safety Demo
    \\
    \\This project demonstrates `zigc safe`, which detects memory-safety bugs
    \\in your C/C++ code before compilation.
    \\
    \\## Step 1: Run the safety checker
    \\
    \\    zigc safe
    \\
    \\You will see errors for use-after-free, double-free, and memory leaks
    \\in `src/safety_bugs.c`.
    \\
    \\## Step 2: Read the fix instructions
    \\
    \\Each bug in `src/safety_bugs.c` has a FIX comment explaining how to
    \\resolve it.  Open the file, apply the fixes, then re-run:
    \\
    \\    zigc safe
    \\
    \\Once all issues are resolved you will see:
    \\
    \\    3 ok, 0 warnings, 0 errors
    \\
    \\## Step 3: Build and run
    \\
    \\    zigc build
    \\    zigc run
    \\
    \\## What zigc safe detects
    \\
    \\  - Use after free — accessing a pointer after free()
    \\  - Double free    — calling free() on an already-freed pointer
    \\  - Memory leak    — allocated memory never freed before scope exit
    \\  - Leak on reassign — overwriting an owned pointer without freeing
    \\
;

pub const TMPL_BUILD_ZIG_CPP =
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

pub const TMPL_MAIN_CPP =
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

pub const TMPL_GITIGNORE =
    \\.zig-cache/
    \\zig-out/
    \\out/
    \\
;

pub const TMPL_BUILD_ZIG_MIXED =
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
    \\    mod.addIncludePath(b.path("src"));
    \\
    \\    // C entrypoint (generated by zigtsc)
    \\    mod.addCSourceFiles(.{
    \\        .root = b.path("src"),
    \\        .files = &.{"main.c"},
    \\        .flags = &.{ "-std=c11", "-Wall", "-Wextra" },
    \\    });
    \\
    \\    // C++ class + bridge (generated by zigtsc)
    \\    mod.addCSourceFiles(.{
    \\        .root = b.path("src"),
    \\        .files = &.{"main.cpp"},
    \\        .flags = &.{ "-std=c++17", "-Wall", "-Wextra" },
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

/// TypeScript project template — embedded so `zigc init --ts` is self-contained.
pub const TMPL_INIT_TS =
    \\// zigtsc starter — transpile with: zigtsc main.ts
    \\//
    \\// Produces: main.h  main.c  main.cpp  main.js
    \\// Compile:  zigc init myapp --ts && cd myapp && zigtsc main.ts && zigc run
    \\
    \\interface Point {
    \\    x: number;
    \\    y: number;
    \\}
    \\
    \\class Counter {
    \\    value: i32;
    \\
    \\    constructor(init: i32) {
    \\        this.value = init;
    \\    }
    \\
    \\    increment(): void {
    \\        this.value = this.value + 1;
    \\    }
    \\
    \\    getVal(): i32 {
    \\        return this.value;
    \\    }
    \\}
    \\
    \\const p: Point = { x: 3, y: 4 };
    \\console.log(p.x);
    \\
    \\const c = new Counter(0);
    \\c.increment();
    \\c.increment();
    \\c.increment();
    \\console.log(c.getVal());
    \\
;

// ── Integrity-check types + helpers ─────────────────────────────────────────

/// Accumulates pass / warn / fail counts for `zigc check`.
pub const Check = struct {
    n_ok: usize = 0,
    n_warn: usize = 0,
    n_fail: usize = 0,

    pub fn ok(c: *Check, msg: []const u8) void {
        std.debug.print("  \u{2713} {s}\n", .{msg});
        c.n_ok += 1;
    }
    pub fn warn(c: *Check, msg: []const u8) void {
        std.debug.print("  ! {s}\n", .{msg});
        c.n_warn += 1;
    }
    pub fn fail(c: *Check, msg: []const u8) void {
        std.debug.print("  \u{2717} {s}\n", .{msg});
        c.n_fail += 1;
    }
};

/// Return true if `sub_path` exists as either a file or a directory.
pub fn pathExists(dir: std.Io.Dir, io: std.Io, sub_path: []const u8) bool {
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

pub const REGISTRY_URL = "https://raw.githubusercontent.com/nathanjmorton/zigc/main/registry.json";

pub const RegistryEntry = struct {
    url: []const u8,
    hash: []const u8,
    lib: []const u8,
};

/// Load the local registry cache (~/.zigc/registry.json) and look up `name`.
pub fn registryLookup(allocator: std.mem.Allocator, io: std.Io, name: []const u8) ?RegistryEntry {
    const home = std.mem.sliceTo(std.c.getenv("HOME") orelse return null, 0);
    const path = std.fmt.allocPrint(allocator, "{s}/.zigc/registry.json", .{home}) catch return null;
    defer allocator.free(path);
    const cwd = std.Io.Dir.cwd();
    const data = cwd.readFileAlloc(io, path, allocator, .unlimited) catch return null;
    defer allocator.free(data);
    const raw = registryLookupFromJson(data, name) orelse return null;
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
    const needle_open = findJsonKey(data, name) orelse return null;
    const block_end = findMatchingBrace(data, needle_open) orelse return null;
    const block = data[needle_open .. block_end + 1];
    return RegistryEntry{
        .url = extractJsonString(block, "url") orelse return null,
        .hash = extractJsonString(block, "hash") orelse return null,
        .lib = extractJsonString(block, "lib") orelse return null,
    };
}

/// Find the position of '{' for the value of a given top-level key in JSON.
pub fn findJsonKey(data: []const u8, key: []const u8) ?usize {
    var pos: usize = 0;
    while (pos < data.len) {
        const q1 = std.mem.indexOfScalarPos(u8, data, pos, '"') orelse return null;
        const ks = q1 + 1;
        const q2 = std.mem.indexOfScalarPos(u8, data, ks, '"') orelse return null;
        const found_key = data[ks..q2];
        pos = q2 + 1;
        if (std.mem.eql(u8, found_key, key)) {
            const brace = std.mem.indexOfScalarPos(u8, data, pos, '{') orelse return null;
            return brace;
        }
    }
    return null;
}

/// Find the matching '}' for a '{' at `start`.
pub fn findMatchingBrace(data: []const u8, start: usize) ?usize {
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
pub fn extractJsonString(block: []const u8, key: []const u8) ?[]const u8 {
    var pos: usize = 0;
    while (pos < block.len) {
        const q1 = std.mem.indexOfScalarPos(u8, block, pos, '"') orelse return null;
        const ks = q1 + 1;
        const q2 = std.mem.indexOfScalarPos(u8, block, ks, '"') orelse return null;
        const found_key = block[ks..q2];
        pos = q2 + 1;
        if (std.mem.eql(u8, found_key, key)) {
            const v1 = std.mem.indexOfScalarPos(u8, block, pos, '"') orelse return null;
            const vs = v1 + 1;
            const v2 = std.mem.indexOfScalarPos(u8, block, vs, '"') orelse return null;
            return block[vs..v2];
        }
    }
    return null;
}

/// Extract all values of `key` from a JSON array of objects.
pub fn extractJsonArrayField(allocator: std.mem.Allocator, json: []const u8, key: []const u8) ![][]const u8 {
    var list: std.ArrayList([]const u8) = .empty;
    var pos: usize = 0;
    while (pos < json.len) {
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
pub fn extractJsonNestedField(json: []const u8, outer_key: []const u8, inner_key: []const u8) ?[]const u8 {
    const obj_start = std.mem.indexOfScalar(u8, json, '{') orelse return null;
    const obj_end = findMatchingBrace(json, obj_start) orelse return null;
    const obj = json[obj_start .. obj_end + 1];
    const nested_start = findJsonKey(obj, outer_key) orelse return null;
    const nested_end = findMatchingBrace(obj, nested_start) orelse return null;
    const nested = obj[nested_start .. nested_end + 1];
    return extractJsonString(nested, inner_key);
}

// ── Package management types + helpers ───────────────────────────────────────

pub const Dependency = struct {
    key: []const u8,
    url: []const u8,
};

pub fn freeDeps(allocator: std.mem.Allocator, deps: []Dependency) void {
    for (deps) |d| {
        allocator.free(d.key);
        allocator.free(d.url);
    }
    allocator.free(deps);
}

pub fn parseZonDeps(allocator: std.mem.Allocator, zon: []const u8) ![]Dependency {
    var list: std.ArrayList(Dependency) = .empty;

    const DEPS_OPEN = ".dependencies = .{";
    const deps_pos = std.mem.indexOf(u8, zon, DEPS_OPEN) orelse
        return list.toOwnedSlice(allocator);

    var pos = deps_pos + DEPS_OPEN.len;
    var depth: usize = 1;
    var cur_key: ?[]const u8 = null;
    var dep_open: usize = 0;

    while (pos < zon.len) : (pos += 1) {
        switch (zon[pos]) {
            '{' => depth += 1,
            '}' => {
                if (depth == 1) break;
                if (depth == 2) {
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
            '.' => if (depth == 1) {
                const ks = pos + 1;
                var ke = ks;
                while (ke < zon.len and (std.ascii.isAlphanumeric(zon[ke]) or zon[ke] == '_')) ke += 1;
                if (ke > ks) {
                    var r = ke;
                    while (r < zon.len and (zon[r] == ' ' or zon[r] == '\t')) r += 1;
                    if (r + 4 <= zon.len and std.mem.startsWith(u8, zon[r..], "= .{")) {
                        cur_key = zon[ks..ke];
                        dep_open = r + 3;
                    }
                }
            },
            else => {},
        }
    }

    return list.toOwnedSlice(allocator);
}

pub fn removeZonDep(allocator: std.mem.Allocator, zon: []const u8, key: []const u8) ![]u8 {
    const pattern = try std.fmt.allocPrint(allocator, ".{s} = .{{", .{key});
    defer allocator.free(pattern);

    const dep_pos = std.mem.indexOf(u8, zon, pattern) orelse return error.DepNotFound;

    var line_start = dep_pos;
    while (line_start > 0 and zon[line_start - 1] != '\n') line_start -= 1;

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

pub fn insertBuildLink(allocator: std.mem.Allocator, build_zig: []const u8, key: []const u8, lib_name: []const u8) ![]u8 {
    const var_name = try std.fmt.allocPrint(allocator, "{s}_dep", .{key});
    defer allocator.free(var_name);
    if (std.mem.indexOf(u8, build_zig, var_name) != null) return allocator.dupe(u8, build_zig);

    const MARKER = "const exe = b.addExecutable";
    var ins = std.mem.indexOf(u8, build_zig, MARKER) orelse return allocator.dupe(u8, build_zig);
    while (ins > 0 and build_zig[ins - 1] != '\n') ins -= 1;

    const snippet = try std.fmt.allocPrint(allocator,
        \\    const {s}_dep = b.dependency("{s}", .{{ .target = target, .optimize = optimize }});
        \\    mod.linkLibrary({s}_dep.artifact("{s}"));
        \\
        \\
    , .{ key, key, key, lib_name });
    defer allocator.free(snippet);

    return std.mem.concat(allocator, u8, &.{ build_zig[0..ins], snippet, build_zig[ins..] });
}

pub fn insertBuildInclude(allocator: std.mem.Allocator, build_zig: []const u8, key: []const u8, include_subdir: []const u8) ![]u8 {
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

pub fn insertZonDep(allocator: std.mem.Allocator, zon: []const u8, key: []const u8, url: []const u8, hash: []const u8) ![]u8 {
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
    const delta: isize = @as(isize, @intCast(replacement.len)) - @as(isize, @intCast(needle.len));
    const out_len: usize = @intCast(@as(isize, @intCast(src.len)) + delta * @as(isize, @intCast(count)));
    const out = try allocator.alloc(u8, out_len);
    _ = std.mem.replace(u8, src, needle, replacement, out);
    return out;
}

/// Spawn `argv`, inheriting stdio. Returns error if the process exits non-zero.
pub fn exec(io: std.Io, argv: []const []const u8) !void {
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
pub fn execZig(io: std.Io, allocator: std.mem.Allocator, argv: []const []const u8) !void {
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

pub fn cmdInit(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    if (args.len == 0) {
        std.debug.print("error: missing project name\nUsage: zigc init <name> [--cpp] [--ts]\n", .{});
        return error.MissingArgument;
    }

    var name: []const u8 = undefined;
    var cpp = false;
    var ts = false;
    var got_name = false;
    for (args) |arg| {
        if (std.mem.eql(u8, arg, "--cpp")) {
            cpp = true;
        } else if (std.mem.eql(u8, arg, "--ts")) {
            ts = true;
        } else if (!got_name) {
            name = arg;
            got_name = true;
        }
    }
    if (!got_name) {
        std.debug.print("error: missing project name\nUsage: zigc init <name> [--cpp] [--ts]\n", .{});
        return error.MissingArgument;
    }

    const ident = try allocator.dupe(u8, name);
    defer allocator.free(ident);
    for (ident) |*ch| {
        if (ch.* == '-') ch.* = '_';
    }

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

    if (ts) {
        // ── TypeScript project — write embedded template directly ──────
        var src_dir = try dir.openDir(io, "src", .{});
        defer src_dir.close(io);
        try src_dir.writeFile(io, .{ .sub_path = "main.ts", .data = TMPL_INIT_TS });

        // build.zig — mixed C + C++ compilation.
        {
            const content = try replaceAll(allocator, TMPL_BUILD_ZIG_MIXED, "PROJ_NAME", name);
            defer allocator.free(content);
            try dir.writeFile(io, .{ .sub_path = "build.zig", .data = content });
        }
    } else {
        // ── Plain C or C++ ──────────────────────────────────────────────
        {
            const tmpl = if (cpp) TMPL_BUILD_ZIG_CPP else TMPL_BUILD_ZIG;
            const content = try replaceAll(allocator, tmpl, "PROJ_NAME", name);
            defer allocator.free(content);
            try dir.writeFile(io, .{ .sub_path = "build.zig", .data = content });
        }
        {
            var src_dir = try dir.openDir(io, "src", .{});
            defer src_dir.close(io);
            if (cpp) {
                const content = try replaceAll(allocator, TMPL_MAIN_CPP, "PROJ_NAME", name);
                defer allocator.free(content);
                try src_dir.writeFile(io, .{ .sub_path = "main.cpp", .data = content });
            } else {
                // Default: safety demo project
                const main_content = try replaceAll(allocator, TMPL_MAIN_C, "PROJ_NAME", name);
                defer allocator.free(main_content);
                try src_dir.writeFile(io, .{ .sub_path = "main.c", .data = main_content });
                try src_dir.writeFile(io, .{ .sub_path = "safety_bugs.h", .data = TMPL_SAFETY_BUGS_H });
                try src_dir.writeFile(io, .{ .sub_path = "safety_bugs.c", .data = TMPL_SAFETY_BUGS_C });
                try src_dir.writeFile(io, .{ .sub_path = "README.md", .data = TMPL_SAFETY_README });
            }
        }
    }

    // build.zig.zon
    {
        const content = try replaceAll(allocator, TMPL_BUILD_ZIG_ZON, "PROJ_IDENT", ident);
        defer allocator.free(content);
        try dir.writeFile(io, .{ .sub_path = "build.zig.zon", .data = content });
    }

    // .gitignore
    try dir.writeFile(io, .{ .sub_path = ".gitignore", .data = TMPL_GITIGNORE });

    // Auto-insert fingerprint (Zig 0.16+ requires it).
    autoFingerprint(io, allocator, dir, name);

    if (ts) {
        std.debug.print("Created TypeScript project '{s}'\n", .{name});
        std.debug.print("  cd {s}\n", .{name});
        std.debug.print("  zigtsc ./src/main.ts   # generate C/C++ sources\n", .{});
        std.debug.print("  zigc run               # build and run\n", .{});
    } else if (cpp) {
        std.debug.print("Created C++ project '{s}'\n", .{name});
        std.debug.print("  cd {s}\n", .{name});
        std.debug.print("  zigc build         # compile\n", .{});
        std.debug.print("  zigc run           # compile and run\n", .{});
    } else {
        std.debug.print("Created C project '{s}' with safety demo\n", .{name});
        std.debug.print("  cd {s}\n", .{name});
        std.debug.print("  zigc safe          # find memory-safety bugs\n", .{});
        std.debug.print("  zigc build         # compile\n", .{});
        std.debug.print("  zigc run           # compile and run\n", .{});
        std.debug.print("  See src/README.md for fix instructions\n", .{});
    }
}

fn autoFingerprint(io: std.Io, allocator: std.mem.Allocator, dir: std.Io.Dir, name: []const u8) void {
    const result = std.process.run(allocator, io, .{
        .argv = &.{ "zig", "build" },
        .cwd = .{ .path = name },
    }) catch return;
    defer allocator.free(result.stdout);
    defer allocator.free(result.stderr);

    const marker = "suggested value: ";
    const pos = std.mem.indexOf(u8, result.stderr, marker) orelse return;
    const start = pos + marker.len;
    const len = std.mem.indexOfAny(u8, result.stderr[start..], "\n\r ") orelse result.stderr[start..].len;
    const fp = result.stderr[start .. start + len];

    insertFingerprintInDir(io, allocator, fp, dir) catch {};
}

fn insertFingerprintInDir(io: std.Io, allocator: std.mem.Allocator, fp_str: []const u8, dir: std.Io.Dir) !void {
    const content = try dir.readFileAlloc(io, "build.zig.zon", allocator, .unlimited);
    defer allocator.free(content);
    const insert_pos = std.mem.lastIndexOf(u8, content, "}") orelse return error.InvalidManifest;
    const new_content = try std.mem.concat(allocator, u8, &.{
        content[0..insert_pos],
        "    .fingerprint = ",
        fp_str,
        ",\n}\n",
    });
    defer allocator.free(new_content);
    try dir.writeFile(io, .{ .sub_path = "build.zig.zon", .data = new_content });
}

fn insertFingerprint(io: std.Io, allocator: std.mem.Allocator, fp_str: []const u8) !void {
    return insertFingerprintInDir(io, allocator, fp_str, std.Io.Dir.cwd());
}

pub fn cmdAdd(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    if (args.len == 0) {
        std.debug.print("error: missing package name or URL\nUsage: zigc add <name|url> [--lib <lib-name>] [--header-only [subdir]]\n", .{});
        return error.MissingArgument;
    }
    const target = args[0];

    var lib_override: ?[]const u8 = null;
    var header_only = false;
    var header_include_subdir: []const u8 = "include";
    var i: usize = 1;
    while (i < args.len) : (i += 1) {
        if (std.mem.eql(u8, args[i], "--lib") and i + 1 < args.len) {
            lib_override = args[i + 1];
            i += 1;
        } else if (std.mem.eql(u8, args[i], "--header-only")) {
            header_only = true;
            if (i + 1 < args.len and !std.mem.startsWith(u8, args[i + 1], "--")) {
                header_include_subdir = args[i + 1];
                i += 1;
            }
        }
    }

    const is_url = std.mem.indexOf(u8, target, "://") != null or std.mem.startsWith(u8, target, "git+");

    if (!is_url) {
        const entry = registryLookup(allocator, io, target) orelse {
            std.debug.print("error: '{s}' not found in registry\n", .{target});
            std.debug.print("  Run 'zigc registry update' to refresh, or pass a full URL.\n", .{});
            return error.RegistryMiss;
        };
        defer freeRegistryEntry(allocator, entry);
        const key = target;
        const lib_name = lib_override orelse entry.lib;

        const cwd = std.Io.Dir.cwd();

        const zon = cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited) catch {
            std.debug.print("error: no build.zig.zon found — are you inside a zigc project?\n", .{});
            return error.NoManifest;
        };
        defer allocator.free(zon);
        const new_zon = try insertZonDep(allocator, zon, key, entry.url, entry.hash);
        defer allocator.free(new_zon);
        try cwd.writeFile(io, .{ .sub_path = "build.zig.zon", .data = new_zon });

        const build_zig = cwd.readFileAlloc(io, "build.zig", allocator, .unlimited) catch {
            std.debug.print("Added '{s}' to build.zig.zon.\n", .{key});
            std.debug.print("warning: could not read build.zig to auto-link.\n", .{});
            return;
        };
        defer allocator.free(build_zig);
        const updated = if (header_only)
            try insertBuildInclude(allocator, build_zig, key, header_include_subdir)
        else
            try insertBuildLink(allocator, build_zig, key, lib_name);
        defer allocator.free(updated);
        try cwd.writeFile(io, .{ .sub_path = "build.zig", .data = updated });

        if (header_only) {
            std.debug.print("Added '{s}' from registry (header-only) in build.zig.\n", .{key});
            std.debug.print("  include: {s}_dep.path(\"{s}\")\n", .{ key, header_include_subdir });
        } else {
            std.debug.print("Added '{s}' from registry and linked in build.zig.\n", .{key});
            std.debug.print("  artifact: {s}_dep.artifact(\"{s}\")\n", .{ key, lib_name });
        }
        return;
    }

    // ── URL-based add (original flow) ────────────────────────────────────
    const url = target;
    const cwd = std.Io.Dir.cwd();

    const zon_before = cwd.readFileAlloc(io, "build.zig.zon", allocator, .unlimited) catch "";
    defer if (zon_before.len > 0) allocator.free(zon_before);
    const deps_before = try parseZonDeps(allocator, zon_before);
    defer freeDeps(allocator, deps_before);

    try execZig(io, allocator, &.{ "zig", "fetch", "--save", url });

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
    const lib_name = lib_override orelse key;

    const build_zig = cwd.readFileAlloc(io, "build.zig", allocator, .unlimited) catch {
        std.debug.print("warning: could not read build.zig to auto-link.\n", .{});
        return;
    };
    defer allocator.free(build_zig);

    const updated = if (header_only)
        try insertBuildInclude(allocator, build_zig, key, header_include_subdir)
    else
        try insertBuildLink(allocator, build_zig, key, lib_name);
    defer allocator.free(updated);
    try cwd.writeFile(io, .{ .sub_path = "build.zig", .data = updated });

    if (header_only) {
        std.debug.print("Added '{s}' (header-only) in build.zig.\n", .{key});
        std.debug.print("  include: {s}_dep.path(\"{s}\")\n", .{ key, header_include_subdir });
    } else {
        std.debug.print("Added '{s}' and linked in build.zig.\n", .{key});
        std.debug.print("  artifact: {s}_dep.artifact(\"{s}\")\n", .{ key, lib_name });
        std.debug.print("  override artifact name with: zigc add <url> --lib <name>\n", .{});
    }
}

pub fn cmdRemove(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    if (args.len == 0) {
        std.debug.print("error: missing dependency name\nUsage: zigc remove <name>\n", .{});
        return error.MissingArgument;
    }
    const key = args[0];
    const cwd = std.Io.Dir.cwd();

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

pub fn cmdVerify(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
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

    // 1. Compiled libraries in .zig-cache
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
            const lib_file_name = blk: {
                const sep = std.mem.lastIndexOfScalar(u8, lib_path, '/') orelse break :blk lib_path;
                break :blk lib_path[sep + 1 ..];
            };
            const lib_stat = cwd.statFile(io, lib_path, .{}) catch continue;
            var dep_label: []const u8 = "";
            for (deps) |dep| {
                const expected = try std.fmt.allocPrint(ar, "lib{s}.a", .{dep.key});
                if (std.mem.eql(u8, lib_file_name, expected)) {
                    dep_label = try std.fmt.allocPrint(ar, "  — dep '{s}'", .{dep.key});
                    break;
                }
            }
            c.ok(try std.fmt.allocPrint(ar, "{s}  ({d:.1} MB){s}", .{
                lib_file_name,
                @as(f64, @floatFromInt(lib_stat.size)) / (1024.0 * 1024.0),
                dep_label,
            }));
        }
    }

    // 2. Final binary in zig-out/bin/
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

    for (binaries.items) |bin_name| {
        const path = try std.fmt.allocPrint(ar, "zig-out/bin/{s}", .{bin_name});
        const stat = bin_dir.statFile(io, bin_name, .{}) catch {
            c.fail(try std.fmt.allocPrint(ar, "'{s}': stat failed", .{bin_name}));
            continue;
        };

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
                bin_name, desc, @as(f64, @floatFromInt(stat.size)) / 1024.0,
            }));
        } else {
            c.fail(try std.fmt.allocPrint(ar, "'{s}' not a valid executable: {s}", .{ bin_name, desc }));
            continue;
        }

        const nm_res = try std.process.run(ar, io, .{ .argv = &.{ "nm", "-g", path } });
        const nm_ok = switch (nm_res.term) {
            .exited => |code| code == 0,
            else => false,
        };
        if (!nm_ok) {
            c.fail(try std.fmt.allocPrint(ar, "nm failed on '{s}' — is nm installed?", .{bin_name}));
            continue;
        }

        std.debug.print("\nSymbol analysis ({s}):\n", .{bin_name});

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
                n_defined += 1;
                _ = t2;
                const bare = if (sym.len > 0 and sym[0] == '_') sym[1..] else sym;
                if (std.mem.eql(u8, bare, "main")) has_main = true;
            } else {
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

        if (deps.len > 0) std.debug.print("\nDependency symbols:\n", .{});
        for (deps) |dep| {
            const prefix = try std.fmt.allocPrint(ar, "{s}_", .{dep.key});
            var sym_count: usize = 0;
            var sym_pos: usize = 0;
            while (std.mem.indexOf(u8, nm_res.stdout[sym_pos..], prefix)) |p| {
                sym_count += 1;
                sym_pos += p + 1;
            }
            if (sym_count > 0) {
                c.ok(try std.fmt.allocPrint(ar,
                    "dep '{s}' — {d} symbols compiled in  (e.g. {s}open, {s}exec…)",
                    .{ dep.key, sym_count, prefix, prefix }));
            } else {
                c.warn(try std.fmt.allocPrint(ar,
                    "dep '{s}' — no '{s}*' symbols found in binary (linking issue?)",
                    .{ dep.key, prefix }));
            }
        }

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

    const ws: []const u8 = if (c.n_warn == 1) "" else "s";
    const es: []const u8 = if (c.n_fail == 1) "" else "s";
    std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{
        c.n_ok, c.n_warn, ws, c.n_fail, es,
    });
    if (c.n_fail > 0) return error.VerifyFailed;
}

pub fn cmdCheck(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    var do_build = false;
    for (args) |arg| {
        if (std.mem.eql(u8, arg, "--build")) do_build = true;
    }

    var c: Check = .{};
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const ar = arena.allocator();
    const cwd = std.Io.Dir.cwd();

    std.debug.print("zigc check\n", .{});

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

    if (build_zig) |bz| {
        std.debug.print("\nbuild.zig:\n", .{});
        if (std.mem.indexOf(u8, bz, "pub fn build(b: *std.Build)") != null) {
            c.ok("pub fn build(b: *std.Build) declared");
        } else {
            c.fail("pub fn build(b: *std.Build) not found");
        }
    }

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

    {
        std.debug.print("\nDependency consistency:\n", .{});
        const z = zon orelse "";
        const bz = build_zig orelse "";
        const zon_deps = try parseZonDeps(ar, z);
        const build_keys = try parseBuildDeps(ar, bz);

        if (zon_deps.len == 0 and build_keys.len == 0) {
            c.ok("no dependencies declared");
        } else {
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

    if (do_build) {
        std.debug.print("\nCompilation (zig build):\n", .{});
        if (exec(io, &.{"zig", "build"})) |_| {
            c.ok("zig build succeeded");
        } else |_| {
            c.fail("zig build failed (see errors above)");
        }
    }

    const ws_str: []const u8 = if (c.n_warn == 1) "" else "s";
    const es_str: []const u8 = if (c.n_fail == 1) "" else "s";
    std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{
        c.n_ok, c.n_warn, ws_str, c.n_fail, es_str,
    });

    if (c.n_fail > 0) return error.CheckFailed;
}

pub fn cmdList(io: std.Io, allocator: std.mem.Allocator) !void {
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
pub fn mapOptFlag(arg: []const u8) ?[]const u8 {
    if (std.mem.eql(u8, arg, "-O1") or std.mem.eql(u8, arg, "-O2") or
        std.mem.eql(u8, arg, "-O3") or std.mem.eql(u8, arg, "-Ofast"))
        return "-Doptimize=ReleaseFast";
    if (std.mem.eql(u8, arg, "-Os"))
        return "-Doptimize=ReleaseSmall";
    if (std.mem.eql(u8, arg, "-Og") or std.mem.eql(u8, arg, "-O"))
        return "-Doptimize=ReleaseSafe";
    return null;
}

pub fn isBuildOption(name: []const u8) bool {
    return name.len > 0 and std.ascii.isLower(name[0]);
}

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
            try argv.append(ar, arg);
        } else if (std.mem.eql(u8, arg, "--wasm")) {
            try argv.append(ar, "-Dtarget=wasm32-freestanding");
        } else if (std.mem.eql(u8, arg, "--wasi")) {
            try argv.append(ar, "-Dtarget=wasm32-wasi");
        } else if (std.mem.startsWith(u8, arg, "--")) {
            try argv.append(ar, arg);
        } else if (std.mem.startsWith(u8, arg, "-")) {
            try cflags.append(ar, arg);
        } else {
            try argv.append(ar, arg);
        }
    }

    if (cflags.items.len > 0) {
        const joined = try std.mem.join(ar, ",", cflags.items);
        try argv.append(ar, try std.fmt.allocPrint(ar, "-Dcflags={s}", .{joined}));
    }

    return argv.toOwnedSlice(ar);
}

pub fn cmdBuild(io: std.Io, allocator: std.mem.Allocator, extra: []const []const u8) !void {
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const argv = try buildArgv(arena.allocator(), &.{ "zig", "build" }, extra);
    try execZig(io, allocator, argv);
}

pub fn cmdRun(io: std.Io, allocator: std.mem.Allocator, extra: []const []const u8) !void {
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const ar = arena.allocator();
    const argv = try buildArgv(ar, &.{ "zig", "build", "run" }, extra);
    try execZig(io, allocator, argv);
}

/// Best-effort wasm build: build to a temp prefix, then copy artifacts to out/wasm/.
fn buildWasm(io: std.Io, allocator: std.mem.Allocator, ar: std.mem.Allocator, extra: []const []const u8) void {
    const cwd = std.Io.Dir.cwd();
    const TMP_PREFIX = ".zig-wasm-out";

    // Build for wasm32-wasi with temp prefix
    var wasm_extra: std.ArrayList([]const u8) = .empty;
    wasm_extra.appendSlice(ar, extra) catch return;
    // Only add wasm target if user hasn't specified a target
    var has_target = false;
    for (extra) |arg| {
        if (std.mem.startsWith(u8, arg, "-Dtarget=") or
            std.mem.eql(u8, arg, "--wasm") or
            std.mem.eql(u8, arg, "--wasi")) has_target = true;
    }
    if (!has_target) wasm_extra.append(ar, "--wasi") catch return;

    const wasm_argv = buildArgv(ar, &.{ "zig", "build", "--prefix", TMP_PREFIX }, wasm_extra.items) catch return;
    execZig(io, allocator, wasm_argv) catch {
        std.debug.print("note: wasm build skipped (build failed)\n", .{});
        return;
    };

    // Move artifacts from .zig-wasm-out/bin/ to out/wasm/
    cwd.createDirPath(io, "out/wasm") catch return;
    var wasm_bin = cwd.openDir(io, TMP_PREFIX ++ "/bin", .{ .iterate = true }) catch return;
    defer wasm_bin.close(io);
    var out_wasm = cwd.openDir(io, "out/wasm", .{}) catch return;
    defer out_wasm.close(io);

    var iter = wasm_bin.iterate();
    while (iter.next(io) catch null) |entry| {
        if (entry.kind == .directory) continue;
        const data = wasm_bin.readFileAlloc(io, entry.name, ar, .unlimited) catch continue;
        out_wasm.writeFile(io, .{ .sub_path = entry.name, .data = data }) catch continue;
    }

    // Clean up temp dir
    cwd.deleteTree(io, TMP_PREFIX) catch {};
}

pub fn cmdRegistryGenerate(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    const API_BASE = "https://api.github.com";
    const ORG = "allyourcodebase";

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

    const token_ptr = std.c.getenv("GITHUB_TOKEN");
    const auth_header: ?[]const u8 = if (token_ptr) |tp|
        try std.fmt.allocPrint(ar, "Authorization: token {s}", .{std.mem.sliceTo(tp, 0)})
    else
        null;

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
        if (!ok or result.stdout.len < 3) break;
        const names = try extractJsonArrayField(ar, result.stdout, "name");
        if (names.len == 0) break;
        try all_repos.appendSlice(ar, names);
        if (names.len < 100) break;
        page += 1;
    }
    std.debug.print("Found {d} repos\n", .{all_repos.items.len});

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

    var json_buf: std.ArrayList(u8) = .empty;
    try json_buf.appendSlice(ar, "{\n");
    var n_ok: usize = 0;
    var n_skip: usize = 0;
    const count = @min(all_repos.items.len, limit);

    for (all_repos.items[0..count], 0..) |repo_name, idx| {
        std.debug.print("[{d}/{d}] {s}...", .{ idx + 1, count, repo_name });

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

        const lib_name = try ar.dupe(u8, repo_name);
        for (lib_name) |*ch| {
            if (ch.* == '-') ch.* = '_';
            ch.* = std.ascii.toLower(ch.*);
        }

        if (n_ok > 0) try json_buf.appendSlice(ar, ",\n");
        const entry = try std.fmt.allocPrint(ar,
            "  \"{s}\": {{\n    \"url\": \"{s}\",\n    \"hash\": \"{s}\",\n    \"lib\": \"{s}\"\n  }}",
            .{ lib_name, git_url, hash, lib_name });
        try json_buf.appendSlice(ar, entry);
        n_ok += 1;
        std.debug.print(" ok ({s})\n", .{tag_name});
    }

    try json_buf.appendSlice(ar, "\n}\n");

    try cwd.writeFile(io, .{ .sub_path = "registry.json", .data = json_buf.items });
    std.debug.print("\nWrote registry.json: {d} packages ({d} skipped)\n", .{ n_ok, n_skip });

    cwd.deleteTree(io, tmp_dir) catch {};
}

pub fn cmdRegistryUpdate(io: std.Io, allocator: std.mem.Allocator) !void {
    const home_ptr = std.c.getenv("HOME") orelse {
        std.debug.print("error: HOME not set\n", .{});
        return error.NoHome;
    };
    const home = std.mem.sliceTo(home_ptr, 0);
    const dir_path = try std.fmt.allocPrint(allocator, "{s}/.zigc", .{home});
    defer allocator.free(dir_path);
    const file_path = try std.fmt.allocPrint(allocator, "{s}/.zigc/registry.json", .{home});
    defer allocator.free(file_path);

    const cwd = std.Io.Dir.cwd();
    cwd.createDir(io, dir_path, .default_dir) catch |err| {
        if (err != error.PathAlreadyExists) return err;
    };

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

    const data = cwd.readFileAlloc(io, file_path, allocator, .unlimited) catch {
        std.debug.print("Registry saved to {s}\n", .{file_path});
        return;
    };
    defer allocator.free(data);
    var n_entries: usize = 0;
    var pos: usize = 0;
    while (pos < data.len) {
        const q = std.mem.indexOfScalarPos(u8, data, pos, '{') orelse break;
        pos = q + 1;
        n_entries += 1;
    }
    if (n_entries > 0) n_entries -= 1;
    std.debug.print("Registry updated: {d} package{s} cached in {s}\n", .{
        n_entries, if (n_entries == 1) "" else "s", file_path,
    });
}

pub fn cmdClean(io: std.Io) !void {
    const cwd = std.Io.Dir.cwd();
    for ([_][]const u8{ ".zig-cache", "zig-out", "out" }) |path| {
        cwd.deleteTree(io, path) catch {};
        std.debug.print("Removed {s}/\n", .{path});
    }
}

// ── Safety analysis ──────────────────────────────────────────────────────────

const safety = @import("safety.zig");
const c_ast = @import("c_ast.zig");
const CParser = @import("c_parser.zig").Parser;

pub fn cmdSafe(io: std.Io, allocator: std.mem.Allocator, args: []const []const u8) !void {
    var arena = std.heap.ArenaAllocator.init(allocator);
    defer arena.deinit();
    const ar = arena.allocator();

    // Collect source files to analyse.
    var files: std.ArrayList([]const u8) = .empty;

    if (args.len > 0) {
        // Explicit files passed on the command line.
        for (args) |arg| {
            if (!std.mem.startsWith(u8, arg, "--"))
                try files.append(ar, arg);
        }
    } else {
        // Default: scan src/ for .c and .cpp files.
        const cwd = std.Io.Dir.cwd();
        var src_dir = cwd.openDir(io, "src", .{ .iterate = true }) catch {
            std.debug.print("error: could not open src/ directory\n", .{});
            return error.NoSrcDir;
        };
        defer src_dir.close(io);
        var iter = src_dir.iterate();
        while (try iter.next(io)) |entry| {
            if (entry.kind == .directory) continue;
            const name = entry.name;
            if (std.mem.endsWith(u8, name, ".c") or std.mem.endsWith(u8, name, ".cpp") or
                std.mem.endsWith(u8, name, ".cc") or std.mem.endsWith(u8, name, ".h") or
                std.mem.endsWith(u8, name, ".hpp"))
            {
                try files.append(ar, try std.fmt.allocPrint(ar, "src/{s}", .{name}));
            }
        }
    }

    if (files.items.len == 0) {
        std.debug.print("zigc safe: no C/C++ source files found\n", .{});
        return;
    }

    var c: Check = .{};
    const cwd = std.Io.Dir.cwd();

    std.debug.print("zigc safe\n", .{});

    for (files.items) |path| {
        const source = cwd.readFileAlloc(io, path, ar, .unlimited) catch {
            std.debug.print("  warning: could not read {s}\n", .{path});
            c.n_warn += 1;
            continue;
        };

        var parser = CParser.init(source, ar);
        defer parser.deinit();
        const root = parser.parse() catch {
            std.debug.print("  warning: parse error in {s}\n", .{path});
            c.n_warn += 1;
            continue;
        };

        var checker = safety.SafetyChecker.init(&parser.tree, ar);
        checker.check(root) catch {
            std.debug.print("  warning: analysis error in {s}\n", .{path});
            c.n_warn += 1;
            continue;
        };

        if (checker.diagnostics.items.len == 0) {
            c.ok(try std.fmt.allocPrint(ar, "{s} — no issues", .{path}));
            continue;
        }

        for (checker.diagnostics.items) |d| {
            const line = parser.tree.lineNumber(d.loc);
            const sev_str: []const u8 = switch (d.severity) {
                .@"error" => "error",
                .warning => "warning",
            };
            if (d.note_msg.len > 0) {
                const note_line = parser.tree.lineNumber(d.note_loc);
                std.debug.print("  {s}:{d}: {s}: {s} (line {d}: {s})\n", .{
                    path, line, sev_str, d.msg, note_line, d.note_msg,
                });
            } else {
                std.debug.print("  {s}:{d}: {s}: {s}\n", .{
                    path, line, sev_str, d.msg,
                });
            }
            switch (d.severity) {
                .@"error" => c.n_fail += 1,
                .warning => c.n_warn += 1,
            }
        }
    }

    const ws: []const u8 = if (c.n_warn == 1) "" else "s";
    const es: []const u8 = if (c.n_fail == 1) "" else "s";
    std.debug.print("\n{d} ok, {d} warning{s}, {d} error{s}\n", .{
        c.n_ok, c.n_warn, ws, c.n_fail, es,
    });
    if (c.n_fail > 0) {
        std.debug.print("\nSee src/README.md for fix instructions.\n", .{});
        return error.SafetyErrors;
    }
}

// ── Generalized upgrade

/// Detect the Zig target triple for the current platform at comptime.
pub fn detectTarget() []const u8 {
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
    @compileError("unsupported platform for upgrade");
}

/// Generic upgrade function usable by both zigc and zigtsc.
/// `tool_name`: e.g. "zigc" or "zigtsc"
/// `current_version`: e.g. "0.3.0"
/// `github_repo`: e.g. "nathanjmorton/zigc"
pub fn cmdUpgrade(io: std.Io, allocator: std.mem.Allocator, tool_name: []const u8, current_version: []const u8, github_repo: []const u8) !void {
    const api_url = try std.fmt.allocPrint(allocator, "https://api.github.com/repos/{s}/releases/latest", .{github_repo});
    defer allocator.free(api_url);

    const api_result = try std.process.run(allocator, io, .{
        .argv = &.{ "curl", "-sfL", "-H", "Accept: application/vnd.github.v3+json", api_url },
    });
    defer allocator.free(api_result.stdout);
    defer allocator.free(api_result.stderr);

    const api_ok = switch (api_result.term) { .exited => |c| c == 0, else => false };
    if (!api_ok or api_result.stdout.len == 0) {
        std.debug.print("error: failed to check for updates\n", .{});
        return error.FetchFailed;
    }

    const tag = extractJsonString(api_result.stdout, "tag_name") orelse {
        std.debug.print("error: could not parse latest release\n", .{});
        return error.ParseFailed;
    };

    const latest_version = if (tag.len > 0 and tag[0] == 'v') tag[1..] else tag;

    if (std.mem.eql(u8, latest_version, current_version)) {
        std.debug.print("{s} is already up to date (v{s})\n", .{ tool_name, current_version });
        return;
    }

    std.debug.print("Upgrading {s} v{s} → {s}\n", .{ tool_name, current_version, tag });

    const platform = comptime detectTarget();

    const download_url = try std.fmt.allocPrint(allocator,
        "https://github.com/{s}/releases/download/{s}/{s}-{s}.tar.gz",
        .{ github_repo, tag, tool_name, platform });
    defer allocator.free(download_url);

    const which_result = try std.process.run(allocator, io, .{
        .argv = &.{ "which", tool_name },
    });
    defer allocator.free(which_result.stdout);
    defer allocator.free(which_result.stderr);

    const which_ok = switch (which_result.term) { .exited => |c| c == 0, else => false };
    if (!which_ok or which_result.stdout.len == 0) {
        std.debug.print("error: could not find {s} on PATH\n", .{tool_name});
        return error.NotFound;
    }
    const self_path = std.mem.trimEnd(u8, which_result.stdout, "\n\r ");

    if (std.mem.indexOf(u8, self_path, "/homebrew/") != null or
        std.mem.indexOf(u8, self_path, "/Cellar/") != null)
    {
        std.debug.print("{s} is installed via Homebrew ({s}).\n", .{ tool_name, self_path });
        std.debug.print("Use 'brew upgrade {s}' instead of '{s} upgrade'.\n", .{ tool_name, tool_name });
        return;
    }

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

    const cwd = std.Io.Dir.cwd();
    cwd.deleteFile(io, tmp_tar) catch {};

    const chmod_result = try std.process.run(allocator, io, .{
        .argv = &.{ "chmod", "+x", self_path },
    });
    defer allocator.free(chmod_result.stdout);
    defer allocator.free(chmod_result.stderr);

    std.debug.print("{s} upgraded to {s}\n", .{ tool_name, tag });
}
