---
description: Use when the user asks to file, open, submit, or create a PR or pull request for tony-harness.
---

# File Pull Request Skill

## Workflow

1. **Diff Audit:** Review the staged changes against `origin/main` to ensure only intended files are modified.
2. **Surface Verification:** Confirm the changes conform to the *"Hit Every Surface"* checklist in `AGENTS.md` (contracts, adapters, desktop/mobile UI, and docs).
3. **Format PR:**
   - **Title:** Clear, imperative, and outcome-oriented.
   - **Body Structure:**
     - **Problem / Motivation:** Why is this change needed?
     - **Solution:** How was it solved?
     - **Surfaces Affected:** List impacted packages (`core`, `adapters`, `sandbox`, `web`).
     - **Verification:** Detail tests and validation run.
4. **Provenance:** Conclude with the executing model and harness attribution.
