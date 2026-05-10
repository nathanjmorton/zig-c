# zigc safe — Memory Safety Demo

This project demonstrates `zigc safe`, which detects memory-safety bugs
in your C/C++ code before compilation.

## Step 1: Run the safety checker

    zigc safe

You will see errors for use-after-free, double-free, and memory leaks
in `src/safety_bugs.c`.

## Step 2: Read the fix instructions

Each bug in `src/safety_bugs.c` has a FIX comment explaining how to
resolve it.  Open the file, apply the fixes, then re-run:

    zigc safe

Once all issues are resolved you will see:

    3 ok, 0 warnings, 0 errors

## Step 3: Build and run

    zigc build
    zigc run

## What zigc safe detects

  - Use after free — accessing a pointer after free()
  - Double free    — calling free() on an already-freed pointer
  - Memory leak    — allocated memory never freed before scope exit
  - Leak on reassign — overwriting an owned pointer without freeing
