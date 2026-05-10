const std = @import("std");
const lib = @import("lib.zig");

// ── Usage ─────────────────────────────────────────────────────────────────────

const usage =
    \\zigc — C/C++ project build tool powered by the Zig build system
    \\
    \\Usage:
    \\  zigc init   <path> [--cpp] [--ts]  Create a new project
    \\  zigc build  [path] [flags]         Build the project  (zig build)
    \\  zigc run    [path] [flags]         Build and run
    \\  zigc safe   [path]                 Run memory-safety analysis
    \\  zigc fix    [path]                 Auto-fix safety demo bugs
    \\  zigc check  [--build]              Verify project integrity
    \\  zigc verify [--symbols]            Inspect object files and symbols
    \\  zigc add    <name|url> [--lib n]   Add a dependency
    \\  zigc remove <name>                 Remove a dependency
    \\  zigc list                          List installed dependencies
    \\  zigc clean                         Remove .zig-cache/, zig-out/, and out/
    \\  zigc upgrade                       Upgrade zigc to the latest release
    \\  zigc help                          Show this help
    \\
    \\Quick start:
    \\  zigc init /tmp/demo      Create a project with safety demo
    \\  zigc safe /tmp/demo      Find memory-safety bugs
    \\  zigc fix  /tmp/demo      Auto-fix all bugs
    \\  zigc safe /tmp/demo      Verify: 0 errors
    \\  zigc build /tmp/demo     Compile
    \\  zigc run   /tmp/demo     Run
    \\
;

// ── Entry point ───────────────────────────────────────────────────────────────

pub fn main(init: std.process.Init) !void {
    const allocator = init.gpa;
    const io = init.io;

    var args_list: std.ArrayList([]const u8) = .empty;
    defer args_list.deinit(allocator);
    var it = std.process.Args.Iterator.init(init.minimal.args);
    _ = it.skip();
    while (it.next()) |arg| try args_list.append(allocator, arg);
    const args = args_list.items;

    if (args.len == 0) {
        std.debug.print("{s}", .{usage});
        return;
    }

    const cmd = args[0];
    const rest = args[1..];

    if (std.mem.eql(u8, cmd, "init")) {
        try lib.cmdInit(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "add")) {
        try lib.cmdAdd(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "remove") or std.mem.eql(u8, cmd, "rm")) {
        try lib.cmdRemove(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "list") or std.mem.eql(u8, cmd, "ls")) {
        try lib.cmdList(io, allocator);
    } else if (std.mem.eql(u8, cmd, "check")) {
        try lib.cmdCheck(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "verify")) {
        try lib.cmdVerify(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "build")) {
        try lib.cmdBuild(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "run")) {
        try lib.cmdRun(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "registry")) {
        if (rest.len > 0 and std.mem.eql(u8, rest[0], "update")) {
            try lib.cmdRegistryUpdate(io, allocator);
        } else if (rest.len > 0 and std.mem.eql(u8, rest[0], "generate")) {
            try lib.cmdRegistryGenerate(io, allocator, rest[1..]);
        } else {
            std.debug.print("Usage: zigc registry <update|generate>\n", .{});
            return error.MissingArgument;
        }
    } else if (std.mem.eql(u8, cmd, "safe")) {
        try lib.cmdSafe(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "fix")) {
        try lib.cmdFix(io, allocator, rest);
    } else if (std.mem.eql(u8, cmd, "clean")) {
        try lib.cmdClean(io);
    } else if (std.mem.eql(u8, cmd, "upgrade")) {
        try lib.cmdUpgrade(io, allocator, "zigc", lib.VERSION, "nathanjmorton/zigc");
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
