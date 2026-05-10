#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include "safety_bugs.h"

// ── Bug 1: Use After Free ──────────────────────────────────────────────
// FIX: Comment the two BUG lines, uncomment the two FIX lines.
void demo_use_after_free(void) {
    char *buf = malloc(64);
    strcpy(buf, "hello, safety!");
    free(buf);                             // BUG
    printf("use_after_free: %s\n", buf);   // BUG
    // printf("use_after_free: %s\n", buf); // FIX
    // free(buf);                           // FIX
}

// ── Bug 2: Double Free ────────────────────────────────────────────────
// FIX: Comment the BUG line.
void demo_double_free(void) {
    int *data = malloc(10 * sizeof(int));
    data[0] = 42;
    free(data);
    free(data);  // BUG
}

// ── Bug 3: Memory Leak ──────────────────────────────────────────────
// FIX: Uncomment the FIX line.
void demo_memory_leak(void) {
    char *leaked = malloc(256);
    strcpy(leaked, "this memory is never freed");
    printf("leak: %s\n", leaked);
    // free(leaked);  // FIX
}

// ── Bug 4: Leak on Reassignment ──────────────────────────────────────
// FIX: Uncomment the FIX line.
void demo_leak_on_reassign(void) {
    int *p = malloc(sizeof(int));
    *p = 1;
    // free(p);  // FIX
    p = malloc(sizeof(int));
    *p = 2;
    free(p);
}
