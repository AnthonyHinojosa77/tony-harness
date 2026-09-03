---
description: Use when the user asks to monitor, watch, babysit, or shepherd a pull request through CI and code review.
---

# Babysit Pull Request Skill

## Workflow

1. **Poll & Listen:** Monitor check runs and review comments on the open PR.
2. **Filter & Verify:**
   - Evaluate findings only against commits made *after* the latest push.
   - Cross-check automated review bot comments against the source code before modifying anything. Dismiss false positives with a brief, factual explanation.
3. **Scope Protection (Critical):**
   - **Do not** allow review feedback to expand the PR beyond the original prompt objective. Address real regressions, but reject out-of-scope feature requests.
4. **Rebase Maintenance:** Rebase onto `origin/main` if merge conflicts emerge or branch drift breaks integration checks.
5. **Completion:** Report back once CI checks pass green and all pending comments are addressed.
