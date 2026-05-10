#include <stdio.h>
#include "safety_bugs.h"

int main(void) {
    printf("=== zigc safety demo ===\n\n");

    printf("1. Use after free\n");
    demo_use_after_free();

    printf("\n2. Double free\n");
    demo_double_free();

    printf("\n3. Memory leak\n");
    demo_memory_leak();

    printf("\n4. Leak on reassignment\n");
    demo_leak_on_reassign();

    printf("\n=== done ===\n");
    return 0;
}
