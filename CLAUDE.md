# AGENTS.md — Contributor Guidelines for Coding Agents

You are an expert software engineer collaborating with human maintainers on **tony-harness**. Read this document before inspecting files or proposing modifications.

> **Maintainer Context:** The primary maintainer is a non-coder directing high-level product intent. Your implementations must be rock-solid, enterprise-grade, self-healing, and fully tested. Never introduce manual maintenance burdens or fragile hacks.

---

## 1. Ground Rules & Tone

- **Enterprise Reliability First:** tony-harness must run as cleanly and stably as enterprise software. Guard every boundary with input validation, graceful error recovery, and clear UI notifications.
- **Default to Simplicity (YAGNI):** Choose the simplest robust model. Avoid premature abstraction layers, bloated indirection, or unneeded third-party libraries.
- **Questions Are Read-Only:** When asked for architectural analysis, explanations, or recommendations, perform read-only inspection. Do not modify files or trigger destructive actions without explicit user authorization.
- **User Intent Precedence:** The user's explicit instructions always override repo defaults.

---

## 2. Domain Glossary

- **You:** The AI agent reading this document and executing code.
- **Maintainer / Tony:** The product owner directing requirements from plain English.
- **Harness:** The `tony-harness` application, core runtime, and model orchestration system.
- **Workspace:** The unified session canvas where conversations, agent runs, and tool outputs occur.
- **Multi-Model Engine:** The routing and coordination layer that runs models in parallel, individually, or in sequential pipelines.
- **Sandbox:** The isolated container execution environment where agent code, builds, and scripts run safely.
- **Contracts:** The shared TypeScript validation schemas and event types governing client-server-model communication.

---

## 3. Product Invariants (Non-Negotiables)

Changes violating these rules will be rejected:

1. **Strict Type Safety:** Zero usage of `any` or unvalidated type assertions. Every API payload, event, and model response must validate through schema contracts (`zod` or similar).
2. **Mobile & Desktop Parity:** Every UI feature in `apps/web` must be responsive and fully functional on touchscreens and narrow mobile viewports, not just widescreen desktop monitors.
3. **Container Sandboxing:** Agent code execution, terminal shell commands, and untrusted scripts must run inside the container sandbox with rollback checkpoints—never directly on the host machine.
4. **Deterministic State & Teardown:** Every state toggle or background process must have an exact, testable teardown path (e.g. `startSandbox()` ↔ `destroySandbox()`, `connectStream()` ↔ `disconnectStream()`).
5. **Full Audit Logging:** All model prompts, raw responses, tool inputs, outputs, and rollback snapshots must be appended to the session audit trail.

---

## 4. "Hit Every Surface" Checklist

Before marking any feature complete, verify across all layers:

- [ ] **Contracts:** Types and schemas defined in `packages/contracts`.
- [ ] **Core Engine:** Orchestration logic and state handlers updated in `packages/core`.
- [ ] **Adapters:** Model provider updates implemented across Gemini, Claude, and OpenAI adapters in `packages/adapters`.
- [ ] **Sandbox:** Container security boundaries, timeout caps, and rollback hooks verified in `packages/sandbox`.
- [ ] **UI Surfaces:** Tested on both desktop layout and mobile responsive view in `apps/web`.
- [ ] **Documentation:** Internal maintainer specs updated in `docs/maintainer/` without exposing raw internals to user documentation.

---

## 5. Development Traps & Failure Mitigations

- **Process Leaks:** Track all spawned processes and container instances with explicit IDs. Ensure process cleanup occurs on server shutdown or reload.
- **Model Payload Bloat:** Do not stream massive raw binary outputs over WebSockets. Truncate or paginate large outputs and store raw artifacts in persistent sandbox storage.
- **Targeted Verification First:** Always verify changes locally with targeted checks (`pnpm typecheck`, `pnpm lint`, targeted unit tests) before triggering broad end-to-end suites.
- **Draft PRs:** Do not open draft PRs unless explicitly instructed.
