const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const is_wasm = target.result.cpu.arch == .wasm32 or target.result.cpu.arch == .wasm64;
    const is_freestanding = target.result.os.tag == .freestanding;

    const mod = b.createModule(.{
        .target = target,
        .optimize = optimize,
        .link_libcpp = !is_freestanding,
    });

    // ── Include paths ────────────────────────────────────────────────────────
    mod.addIncludePath(b.path("src/include"));
    mod.addIncludePath(b.path("src"));

    // ── Vendored dependencies (compilable) ───────────────────────────────────
    const murmur3_dep = b.dependency("murmur3", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(murmur3_dep.artifact("murmur3"));

    const linenoise_dep = b.dependency("linenoise", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(linenoise_dep.artifact("linenoise"));

    const libfort_dep = b.dependency("libfort", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(libfort_dep.artifact("fort"));

    const utf8proc_dep = b.dependency("utf8proc", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(utf8proc_dep.artifact("utf8proc"));

    const libpg_query_dep = b.dependency("libpg_query", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(libpg_query_dep.artifact("duckdb_pg_query"));

    const fmt_dep = b.dependency("fmt", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(fmt_dep.artifact("fmt"));

    const googletest_dep = b.dependency("googletest", .{ .target = target, .optimize = optimize });
    mod.linkLibrary(googletest_dep.artifact("googletest"));

    // ── Vendored dependencies (header-only) ──────────────────────────────────
    const argparse_dep = b.dependency("argparse", .{ .target = target, .optimize = optimize });
    mod.addIncludePath(argparse_dep.path("include"));

    const backward_cpp_dep = b.dependency("backward_cpp", .{ .target = target, .optimize = optimize });
    mod.addIncludePath(backward_cpp_dep.path("include"));

    const cpp_random_distributions_dep = b.dependency("cpp_random_distributions", .{ .target = target, .optimize = optimize });
    mod.addIncludePath(cpp_random_distributions_dep.path("include"));

    const readerwriterqueue_dep = b.dependency("readerwriterqueue", .{ .target = target, .optimize = optimize });
    mod.addIncludePath(readerwriterqueue_dep.path("include"));

    // ── C++ flags ────────────────────────────────────────────────────────────
    const cflags: []const []const u8 = &.{
        "-std=c++17",
        "-w",
    };

    // ── BusTub library sources ───────────────────────────────────────────────
    mod.addCSourceFiles(.{
        .root = b.path("src"),
        .files = &.{
            "binder/bind_create.cpp",
            "binder/bind_insert.cpp",
            "binder/bind_select.cpp",
            "binder/bind_variable.cpp",
            "binder/binder.cpp",
            "binder/bound_statement.cpp",
            "binder/fmt_impl.cpp",
            "binder/keyword_helper.cpp",
            "binder/node_tag_to_string.cpp",
            "binder/statement/create_statement.cpp",
            "binder/statement/delete_statement.cpp",
            "binder/statement/explain_statement.cpp",
            "binder/statement/index_statement.cpp",
            "binder/statement/insert_statement.cpp",
            "binder/statement/select_statement.cpp",
            "binder/statement/update_statement.cpp",
            "binder/transformer.cpp",
            "buffer/arc_replacer.cpp",
            "buffer/buffer_pool_manager.cpp",
            "buffer/clock_replacer.cpp",
            "buffer/lru_k_replacer.cpp",
            "buffer/lru_replacer.cpp",
            "catalog/column.cpp",
            "catalog/schema.cpp",
            "catalog/table_generator.cpp",
            "common/bustub_ddl.cpp",
            "common/bustub_instance.cpp",
            "common/config.cpp",
            "common/util/string_util.cpp",
            "concurrency/lock_manager.cpp",
            "concurrency/transaction_manager_impl.cpp",
            "concurrency/transaction_manager.cpp",
            "concurrency/watermark.cpp",
            "container/disk/hash/disk_extendible_hash_table_utils.cpp",
            "container/disk/hash/disk_extendible_hash_table.cpp",
            "container/disk/hash/linear_probe_hash_table.cpp",
            "execution/aggregation_executor.cpp",
            "execution/delete_executor.cpp",
            "execution/execution_common.cpp",
            "execution/executor_factory.cpp",
            "execution/external_merge_sort_executor.cpp",
            "execution/filter_executor.cpp",
            "execution/fmt_impl.cpp",
            "execution/hash_join_executor.cpp",
            "execution/index_scan_executor.cpp",
            "execution/init_check_executor.cpp",
            "execution/insert_executor.cpp",
            "execution/limit_executor.cpp",
            "execution/mock_scan_executor.cpp",
            "execution/nested_index_join_executor.cpp",
            "execution/nested_loop_join_executor.cpp",
            "execution/plan_node.cpp",
            "execution/projection_executor.cpp",
            "execution/seq_scan_executor.cpp",
            "execution/sort_executor.cpp",
            "execution/topn_check_executor.cpp",
            "execution/topn_executor.cpp",
            "execution/topn_per_group_executor.cpp",
            "execution/update_executor.cpp",
            "execution/values_executor.cpp",
            "execution/window_function_executor.cpp",
            "optimizer/column_pruning.cpp",
            "optimizer/eliminate_true_filter.cpp",
            "optimizer/merge_filter_nlj.cpp",
            "optimizer/merge_filter_scan.cpp",
            "optimizer/merge_projection.cpp",
            "optimizer/nlj_as_hash_join.cpp",
            "optimizer/nlj_as_index_join.cpp",
            "optimizer/optimizer_custom_rules.cpp",
            "optimizer/optimizer_internal.cpp",
            "optimizer/optimizer.cpp",
            "optimizer/order_by_index_scan.cpp",
            "optimizer/seqscan_as_indexscan.cpp",
            "optimizer/sort_limit_as_topn.cpp",
            "planner/expression_factory.cpp",
            "planner/plan_aggregation.cpp",
            "planner/plan_expression.cpp",
            "planner/plan_func_call.cpp",
            "planner/plan_insert.cpp",
            "planner/plan_select.cpp",
            "planner/plan_table_ref.cpp",
            "planner/plan_window_function.cpp",
            "planner/planner.cpp",
            "primer/count_min_sketch.cpp",
            "primer/hyperloglog_presto.cpp",
            "primer/hyperloglog.cpp",
            "primer/orset_driver.cpp",
            "primer/orset.cpp",
            "primer/skiplist.cpp",
            "primer/trie_store.cpp",
            "primer/trie.cpp",
            "recovery/checkpoint_manager.cpp",
            "recovery/log_manager.cpp",
            "storage/disk/disk_manager_memory.cpp",
            "storage/disk/disk_manager.cpp",
            "storage/disk/disk_scheduler.cpp",
            "storage/index/b_plus_tree_index.cpp",
            "storage/index/b_plus_tree.cpp",
            "storage/index/extendible_hash_table_index.cpp",
            "storage/index/index_iterator.cpp",
            "storage/index/linear_probe_hash_table_index.cpp",
            "storage/page/b_plus_tree_internal_page.cpp",
            "storage/page/b_plus_tree_leaf_page.cpp",
            "storage/page/b_plus_tree_page.cpp",
            "storage/page/extendible_htable_bucket_page.cpp",
            "storage/page/extendible_htable_directory_page.cpp",
            "storage/page/extendible_htable_header_page.cpp",
            "storage/page/extendible_htable_page_utils.cpp",
            "storage/page/hash_table_block_page.cpp",
            "storage/page/hash_table_bucket_page.cpp",
            "storage/page/hash_table_directory_page.cpp",
            "storage/page/hash_table_header_page.cpp",
            "storage/page/page_guard.cpp",
            "storage/page/table_page.cpp",
            "storage/table/table_heap.cpp",
            "storage/table/table_iterator.cpp",
            "storage/table/tuple.cpp",
            "type/bigint_type.cpp",
            "type/boolean_type.cpp",
            "type/decimal_type.cpp",
            "type/integer_parent_type.cpp",
            "type/integer_type.cpp",
            "type/smallint_type.cpp",
            "type/timestamp_type.cpp",
            "type/tinyint_type.cpp",
            "type/type.cpp",
            "type/value.cpp",
            "type/varlen_type.cpp",
            "type/vector_type.cpp",
        },
        .flags = cflags,
    });

    // ── Shell entry point ────────────────────────────────────────────────────
    mod.addCSourceFiles(.{
        .root = b.path("tools/shell"),
        .files = &.{"shell.cpp"},
        .flags = cflags,
    });

    const exe = b.addExecutable(.{
        .name = "bustub-shell",
        .root_module = mod,
    });
    b.installArtifact(exe);

    if (!is_wasm) {
        const run_cmd = b.addRunArtifact(exe);
        run_cmd.step.dependOn(b.getInstallStep());
        if (b.args) |args| run_cmd.addArgs(args);
        const run_step = b.step("run", "Build and run");
        run_step.dependOn(&run_cmd.step);
    }
}
