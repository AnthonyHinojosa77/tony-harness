# tony-harness

> **An enterprise-grade, multi-model AI workspace built by Anthony for Anthony.**  
> Designed to give a non-technical product owner deep control, empirical instruction adherence, and seamless parallel model evaluation across desktop and mobile.

---

## 1. Project Motivation: The "Empirical Substrate"

Commercial AI coding tools like **Codex** and **Claude Code** are designed as generic, one-size-fits-all platforms for broad consumer audiences. As a consequence, they inject massive vendor system prompts, silent moderation rewrites, and soft guardrails that cause models to drift, ignore negative constraints, and falsely claim tasks are complete.

**tony-harness** solves this by putting models inside a custom, rigid **execution substrate**:

* **Direct Lab API & OpenRouter Routing:** Bypasses vendor harness wrappers and calls model provider endpoints directly (Google Gemini, Anthropic Claude, OpenAI, or OpenRouter gateway).
* **Raw Prompt Injection:** Injects Anthony's exact operating guidelines (`AGENTS.md`) without third-party prompt dilution or hidden transformations.
* **Deterministic Execution Parameters:** Uses tight parameter control (`temperature: 0.2`) to eliminate speculative fluff and enforce empirical compliance.
* **Objective Evidence Gate:** Tasks require verifiable proof (clean contract checks, diffs, exit codes) rather than trusting a model's self-reported success.

---

## 2. Core Architecture & Product Specifications

The specifications below were defined and locked through product discovery interviews:

### A. Multi-Model Parallel Studio
* **Simultaneous Dispatch:** Submit a single prompt or task and stream responses concurrently across 2 to 3 leading foundation models (e.g., **Claude 3.5 Sonnet**, **Gemini 1.5 Pro**, **GPT-4o**, or **DeepSeek Coder**).
* **Automated Consensus & Diff Engine:** Rather than forcing the user to manually read thousands of words to spot differences, an automated consensus layer compares the outputs, flags where logic or code diverge, and recommends the strongest, highest-density solution.
* **Promotion & Synthesis:** 1-click action to accept the top recommended model output or synthesize the best points into a unified decision.

### B. Enterprise UI Benchmark (Google / Linear Standard)
* **Approachable to Anyone:** Built for non-programmers and curious users—clean layout, readable typography (Inter/system sans), intuitive labels, and zero terminal friction.
* **Restrained Dark Aesthetic:** A calm, high-contrast obsidian and slate palette with refined emerald accents used strictly for focus and status.
* **Zero Gimmicks:** Strict prohibition on sci-fi clichés (no falling digital rain, no CRT scanlines, no faux-hacker telemetry gauges).
* **T3 Code-Style Customization:** User-facing preference drawer allowing customization of theme accents (Emerald, Cyan, Amber, Monochrome) and layout density.

### C. Zero-Clone Remote Operations
* Operates directly against remote GitHub repositories via the GitHub API (branching, commits, file edits, PR creation) without forcing local file synchronization or disk duplication.

---

## 3. Toolkit Inventory (Imported from Google Drive)

The repository houses Anthony's durable, portable AI operating system migrated directly from Google Drive (`AI Agent System`):

### Operating Agreements & Specs
* **`AGENTS.md`**: Non-negotiable contributor guidelines and invariants for all AI agents.
* **`CLAUDE.md`**: Specific directives tailored for Claude Code environments.
* **`CLOUD_LOCATIONS.md`**: Mappings between the OneDrive source of truth and Google Drive mirrors.
* **`CHANGE_MANIFEST.md` & `VALIDATION.md`**: Drift verification and package validation manifests.
* **`artifacts.sha256`**: Cryptographic integrity checksums.

### The 15 Reusable Agent Skills (`skills/`)
Each package contains a self-contained `SKILL.md` workflow and `agents/openai.yaml` descriptor:
1. **`grill-me`**: Inverts standard Q&A to interrogate ideas with sharp questions and straw men to extract exact specifications.
2. **`file-pr`**: Audits diffs, formats human-readable problem/solution descriptions, and creates pull requests.
3. **`babysit-pr`**: Monitors check runs, triages review comments, dismisses false positives, and guards scope creep.
4. **`unslop`**: Strips conversational filler, buzzwords, and marketing fluff from AI text and code.
5. **`repo-review`**: High-coverage codebase architecture audits and contract boundary checks.
6. **`cto-comms`**: Formats technical proposals into crisp, executive-grade decision briefs.
7. **`html-communication`**: Generates self-contained responsive HTML decision matrices and visual spec artifacts.
8. **`test-protocol`**: Targeted verification plans covering typechecks, linters, and regression suites.
9. **`learning-loop`**: Captures and persists instructions from user corrections.
10. **`capability-check`**: Probes and verifies model and tool execution boundaries.
11. **`creative-precision`**: Balances creative exploration with strict engineering rigor.
12. **`i-have-adhd`**: Cognitive-friendly task decomposition and progress tracking.
13. **`show-your-work`**: Step-by-step reasoning traceability and audit logging.
14. **`can-you-please-speak-like-a-normal-person`**: Enforces natural, human-style communication over robotic AI prose.
15. **`claude-skill-creator`**: Complete evaluation, benchmarking, and packaging suite for new skills.

### Tooling & History
* **`scripts/manage.py`**: Python utility for installing, verifying, and reporting drift across local agent runtimes.
* **`templates/`**: Starter templates for new projects (`README.md`, `AGENTS.md`, `CLAUDE.md`, architecture, and handoff docs).
* **`sources/supplied-skills/`**: Original source documents preserved before cross-runtime adaptation.
* **`history/`**: Historical workflow reviews and source registers.

---

## 4. Session History & Development Chronology

A complete record of what was established and evaluated during the initial project kickoff:

1. **Remote Cloud Architecture Established:** Configured the environment to interact directly with `AnthonyHinojosa77/tony-harness` on GitHub via the GitHub CLI and API, honoring the requirement of zero local file copying.
2. **Google Drive Cloud Migration:** Launched an automated browser agent to connect to Google Drive, locate the user's `AI Agent System` folder under `My Drive`, download the 78-file package, and commit it directly to GitHub.
3. **Product Definition (`/grill-me`):** Conducted a multi-round product interrogation aligning on the non-coder maintainer persona, parallel multi-model dispatch, consensus diff engine, and container sandbox requirements.
4. **Prototyping & QC Sprint 1:** Scaffolded a TypeScript monorepo with direct model adapters and a Next.js web application.
5. **Critical QC Review & Course Correction:**
   * *Feedback:* Initial design attempts leaned into superficial sci-fi/hacker tropes (digital rain, scanlines, neon borders) and exposed internal debug labels (`SUBSTRATE: EMPIRICAL (0.2)`), failing the enterprise software benchmark.
   * *Action:* Removed all gimmicks, reinforced the Google/Linear/Vertex AI visual standard, and verified that the Empirical Substrate remains strictly an internal engine governor.
6. **Reset to Clean Baseline:** Rolled the repository back to a clean state containing only Anthony's authentic Google Drive toolkit files, providing an unencumbered foundation for the next sprint.

---

## 5. Roadmap

* [x] **Phase 0: Foundation & Tooling Migration** — Ingest the 15-skill toolkit, operating agreements, and management scripts from Google Drive into GitHub.
* [ ] **Phase 1: Enterprise Multi-Model Studio** — Implement the clean, restrained web application and empirical direct-API router (Gemini, Claude, GPT-4o, OpenRouter) with the Consensus Engine.
* [ ] **Phase 2: Cloud Deployment & Mobile Sync** — Deploy the studio to cloud hosting with user authentication and home-screen PWA capabilities.
* [ ] **Phase 3: Autonomous Container Sandbox** — Integrate isolated container execution for unattended, testable coding agent tasks with instant rollback checkpoints.

---

## License

[MIT](./LICENSE)
