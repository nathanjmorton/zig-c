#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "safety_bugs.h"

// ── Fix 1: Use After Free → print BEFORE free ───────────────────────────────

void demo_use_after_free(void) {
    char *buf = malloc(64);
    strcpy(buf, "hello, safety!");
    printf("use_after_free: %s\n", buf);  // FIXED: use before free
    free(buf);
}

// ── Fix 2: Double Free → remove duplicate free ──────────────────────────────

void demo_double_free(void) {
    int *data = malloc(10 * sizeof(int));
    data[0] = 42;
    free(data);  // FIXED: only freed once
}

// ── Fix 3: Memory Leak → add missing free ───────────────────────────────────

void demo_memory_leak(void) {
    char *leaked = malloc(256);
    strcpy(leaked, "this memory is now freed");
    printf("leak: %s\n", leaked);
    free(leaked);  // FIXED: free before return
}

// ── Fix 4: Leak on Reassignment → free before reassign ─────────────────────

void demo_leak_on_reassign(void) {
    int *p = malloc(sizeof(int));
    *p = 1;
    free(p);                   // FIXED: free before reassign
    p = malloc(sizeof(int));
    *p = 2;
    free(p);
}
