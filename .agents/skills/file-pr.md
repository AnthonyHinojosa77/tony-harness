---
description: Use when the user asks to file, open, submit, or create a PR or pull request.
---

# File Pull Request Skill

## Workflow

1. **Diff Audit:** Run a local diff against `origin/main` to ensure only intended changes are staged.
2. **Branch Check:** Verify whether an open PR already exists for the current branch.
3. **Format PR:**
   - Write a human-readable title following repository conventions.
   - Lead the description with the core problem/motivation, followed by the solution.
   - Avoid dumping file inventories or raw commit logs.

## Title & Summary Conventions

- **Bad Title:** `Update websocket handler per-message deflate flags in runtime server`
- **Good Title:** `Cut WebSocket frame size by 70% with gzip deflate`
- **Bad Description:**
  > Modified files A, B, and C. Adjusted state variables and changed conditional branches to pass thread context.
- **Good Description:**
  > **Problem:** Opening a new thread inside an existing workspace silently dropped user layout preferences.
  > **Fix:** Injected the root workspace preference store into the thread initialization handshake.

4. **Provenance:** Conclude the PR body with a footer noting the executing model and harness.
