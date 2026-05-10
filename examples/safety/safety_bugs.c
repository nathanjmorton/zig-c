#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "safety_bugs.h"

// ── Bug 1: Use After Free ────────────────────────────────────────────────────
//
// The pointer `buf` is freed, then used to print its contents.
// This is undefined behaviour — the memory may have been reused.
//
// zigc safe reports:
//   error: use after free (line N: freed here)
//
// FIX: Move the printf() call BEFORE free(buf), or copy the data
//      into a local buffer before freeing.
//
void demo_use_after_free(void) {
    char *buf = malloc(64);
    strcpy(buf, "hello, safety!");
    free(buf);
    printf("use_after_free: %s\n", buf);  // BUG: buf already freed
}

// ── Bug 2: Double Free ──────────────────────────────────────────────────────
//
// The pointer `data` is freed twice.  The second free corrupts the
// heap allocator's internal state and can lead to crashes or exploits.
//
// zigc safe reports:
//   error: double free (line N: previously freed here)
//
// FIX: Remove the second free(data), or set data = NULL after the
//      first free so the second becomes a harmless free(NULL).
//
void demo_double_free(void) {
    int *data = malloc(10 * sizeof(int));
    data[0] = 42;
    free(data);
    free(data);  // BUG: data already freed
}

// ── Bug 3: Memory Leak ──────────────────────────────────────────────────────
//
// The pointer `leaked` is allocated but never freed before the
// function returns.  The allocation is lost — no code can reclaim it.
//
// zigc safe reports:
//   warning: memory leak (line N: allocation goes out of scope without being freed)
//
// FIX: Add free(leaked) before the function returns.
//
void demo_memory_leak(void) {
    char *leaked = malloc(256);
    strcpy(leaked, "this memory is never freed");
    printf("leak: %s\n", leaked);
    // BUG: missing free(leaked)
}

// ── Bug 4: Leak on Reassignment ─────────────────────────────────────────────
//
// The pointer `p` is assigned a new allocation without freeing the
// previous one.  The first allocation is leaked.
//
// zigc safe reports:
//   warning: memory leak (line N: previous allocation was never freed)
//
// FIX: Call free(p) before the second malloc, or use realloc().
//
void demo_leak_on_reassign(void) {
    int *p = malloc(sizeof(int));
    *p = 1;
    p = malloc(sizeof(int));  // BUG: first allocation leaked
    *p = 2;
    free(p);
}
