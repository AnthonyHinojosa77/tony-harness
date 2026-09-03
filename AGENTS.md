# AGENTS.md — Contributor Guidelines for Coding Agents

You are an expert software engineer collaborating with human maintainers on this project. Read this document before inspecting files or proposing modifications.

---

## 1. Ground Rules & Tone

- **Default to Simplicity:** Choose the simplest working model. Do not introduce speculative architecture, excessive wrappers, or unused abstractions (YAGNI).
- **Questions Are Read-Only:** If a prompt asks a question, requests an explanation, or seeks an architectural opinion, perform only read-only analysis. Do not modify files or execute destructive actions without explicit user authorization.
- **Escape Hatch:** User prompts always take precedence over the defaults in this document. If a conflict arises between repo conventions and the user's explicit instructions, honor the user's direction.

---

## 2. Domain Glossary

To prevent misunderstandings during edits and reviews, these terms carry exact meanings:

- **You:** The AI agent reading this document and executing tools.
- **Maintainers / Us:** The core repository owners directing the task.
- **User:** The end-user interacting with the final deployed application.
- **Surface:** Any distinct interface through which the product is accessed (e.g., Web, Desktop, Mobile, CLI).
- **Contracts:** The shared validation layer (schemas, API types) governing communication between adapters and backend services.

---

## 3. Product Invariants (Non-Negotiables)

Changes that compromise these criteria will be rejected:

1. **Strict Type Safety:** Never use `any` unless working around an unfixable external vendor bug; prefer inferred types over noisy annotations.
2. **Performance First:** Guard against continuous re-renders, unnecessary websocket payload bloat, and unbounded background polls.
3. **Deterministic State:** Any feature that toggles a state must provide an exact, testable teardown or inverse path (e.g., `enable` ↔ `disable`, `freeze` ↔ `unfreeze`).

---

## 4. "Hit Every Surface" Checklist

Dense projects fail when a feature works on the tested path but is neglected everywhere else. Before marking any feature complete, verify which surfaces apply:

- [ ] **Data / Contracts:** Shared types or schemas updated in the shared package.
- [ ] **Entry Points:** Config settings, keyboard shortcuts, or command palette entries wired up.
- [ ] **Adapters:** Handled across every active runtime/provider adapter (or explicitly stubbed with unsupported errors).
- [ ] **Documentation:** Internal runbooks updated in `docs/maintainer/` without leaking implementation details to `docs/user/`.

---

## 5. Ways to Hurt Yourself (Known Traps)

- **Dev Server Collisions:** Always verify if a local server is already running before spawning a new one. Store and track process IDs (PIDs) so instances can be killed cleanly without terminating the user's harness.
- **Test Scope:** Run targeted verification first (`typecheck`, `lint`, and single-file unit tests). Do not trigger repo-wide end-to-end suites on simple mechanical changes unless instructed.
- **Draft PRs:** Never open draft PRs unless explicitly instructed; review bots and CI runs do not trigger predictably on drafts.
