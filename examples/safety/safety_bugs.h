#ifndef SAFETY_BUGS_H
#define SAFETY_BUGS_H

// Each function demonstrates a memory-safety bug that `zigc safe` detects.
// See safety_bugs.c for annotated implementations with fix instructions.

void demo_use_after_free(void);
void demo_double_free(void);
void demo_memory_leak(void);
void demo_leak_on_reassign(void);

#endif
