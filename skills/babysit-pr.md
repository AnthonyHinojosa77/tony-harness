---
description: Use when the user asks to monitor, watch, babysit, or shepherd a pull request through CI and code review on tony-harness.
---

# Babysit Pull Request Skill

## Workflow

1. **Poll & Listen:** Monitor check runs, automated linters, and review comments on the open PR.
2. **Filter & Verify:**
   - Verify findings against commits made *after* the latest push.
   - Cross-check automated review comments against repository contracts in `packages/contracts`.
   - Dismiss false positives with factual context.
3. **Scope Protection (Critical):**
   - Strictly prevent scope creep. Address genuine regressions and contract breakages, but push back against out-of-scope feature requests.
4. **Rebase Maintenance:** Rebase cleanly onto `origin/main` if merge conflicts arise.
5. **Completion:** Confirm green CI status across typechecks, tests, and build artifacts before reporting completion.
