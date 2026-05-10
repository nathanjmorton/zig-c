const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const mod = b.createModule(.{
        .target = target,
        .optimize = optimize,
        .link_libc = true,
    });

    mod.addIncludePath(b.path("src"));

    // Base C flags.  Pass extra ones with -Dcflags=-DFOO,-Werror
    var cflags: std.ArrayList([]const u8) = .empty;
    cflags.appendSlice(b.allocator, &.{ "-std=c11", "-Wall", "-Wextra" }) catch @panic("OOM");
    if (b.option([]const u8, "cflags", "Extra C flags (comma-separated)")) |extra| {
        var it = std.mem.tokenizeScalar(u8, extra, ',');
        while (it.next()) |f| cflags.append(b.allocator, f) catch @panic("OOM");
    }
    mod.addCSourceFiles(.{
        .root = b.path("src"),
        .files = &.{ "main.c", "safety_bugs.c" },
        .flags = cflags.items,
    });

    const exe = b.addExecutable(.{
        .name = "zigc-demo",
        .root_module = mod,
    });
    b.installArtifact(exe);

    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| run_cmd.addArgs(args);
    const run_step = b.step("run", "Build and run");
    run_step.dependOn(&run_cmd.step);
}
