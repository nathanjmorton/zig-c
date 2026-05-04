const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    // ── zig-c CLI ─────────────────────────────────────────────────────────────
    const cli_mod = b.createModule(.{
        .root_source_file = b.path("src/main.zig"),
        .target = target,
        .optimize = optimize,
    });
    const cli = b.addExecutable(.{
        .name = "zig-c",
        .root_module = cli_mod,
    });
    b.installArtifact(cli);

    const cli_run = b.addRunArtifact(cli);
    cli_run.step.dependOn(b.getInstallStep());
    if (b.args) |args| cli_run.addArgs(args);
    const run_step = b.step("run", "Run zig-c");
    run_step.dependOn(&cli_run.step);

    // ── hello.c lz4 demo ──────────────────────────────────────────────────────
    const lz4 = b.dependency("lz4", .{ .target = target, .optimize = optimize });
    const hello_mod = b.createModule(.{
        .target = target,
        .optimize = optimize,
        .link_libc = true,
    });
    hello_mod.addCSourceFile(.{ .file = b.path("hello.c"), .flags = &.{} });
    hello_mod.linkLibrary(lz4.artifact("lz4"));
    const hello = b.addExecutable(.{
        .name = "hello",
        .root_module = hello_mod,
    });
    b.installArtifact(hello);

    const hello_run = b.addRunArtifact(hello);
    hello_run.step.dependOn(b.getInstallStep());
    const hello_step = b.step("hello", "Build and run the lz4 demo");
    hello_step.dependOn(&hello_run.step);

    // ── test suite ───────────────────────────────────────────────────────
    // Inject the path to the zig-c binary so integration tests can invoke it.
    const test_opts = b.addOptions();
    // Use the absolute installed path so integration tests can find the binary
    // even when cwd is changed to a temp directory.
    test_opts.addOption([]const u8, "zig_c_path", b.getInstallPath(.bin, "zig-c"));

    const test_mod = b.createModule(.{
        .root_source_file = b.path("src/tests.zig"),
        .target = target,
        .optimize = optimize,
    });
    test_mod.addImport("options", test_opts.createModule());

    const test_exe = b.addTest(.{ .name = "zig-c-tests", .root_module = test_mod });
    test_exe.step.dependOn(b.getInstallStep()); // install zig-c before tests run

    const run_tests = b.addRunArtifact(test_exe);
    const test_step = b.step("test", "Run the test suite");
    test_step.dependOn(&run_tests.step);
}
