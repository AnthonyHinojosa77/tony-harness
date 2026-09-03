# tony-harness

> An enterprise-grade, multi-model AI workspace designed for desktop and mobile.

**tony-harness** is a personal AI orchestration system that runs multiple leading foundation models (Gemini, Claude, GPT, DeepSeek) in parallel or individually within a single, unified workspace. Designed for seamless use from desktop browsers and mobile devices, it pairs high-level natural language control with an autonomous containerized sandbox—allowing agents to write, test, and execute software safely with full audit logs and rollback capability.

---

## Key Features

- **Universal Multi-Model Orchestration:** Run models simultaneously in parallel (side-by-side / consensus), individually with smart auto-routing, or as a collaborative multi-agent pipeline.
- **Enterprise Reliability on Desktop & Mobile:** A responsive, mobile-first Web App / PWA interface backed by an event-driven server runtime.
- **Autonomous Container Sandbox:** Agents execute code, shell commands, and builds inside an isolated container environment without manual interruptions, backed by automated rollback checkpoints.
- **Zero-Code Operation:** Built specifically for non-coder maintainers—no terminal wrestling needed for daily operations.
- **Comprehensive Audit Trail:** Full audit logs of every prompt, model response, tool execution, and state transition.

---

## Architecture at a Glance

The project is structured as a clean TypeScript monorepo using `pnpm` workspaces:

```text
tony-harness/
├── apps/
│   ├── web/               # Responsive Web App & PWA (Desktop & Mobile interface)
│   └── server/            # Central orchestration API & session manager
├── packages/
│   ├── core/              # Multi-model routing, agent orchestration & session state
│   ├── adapters/          # Model providers (Gemini, Claude, OpenAI) & external APIs
│   ├── sandbox/           # Containerized execution environment & rollback engine
│   └── contracts/         # Shared schemas, WebSocket/SSE event types & contracts
├── docs/
│   └── maintainer/        # Internal architecture specs & contributor playbooks
└── skills/                # Agent operational skills & workflow runbooks
```

---

## Quick Start

### Prerequisites
- Node.js `>= 20.0.0`
- `pnpm` (`npm install -g pnpm`)
- Docker (for autonomous container execution)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/AnthonyHinojosa77/tony-harness.git
cd tony-harness

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
cp .env.example .env
# Add your API keys: GEMINI_API_KEY, ANTHROPIC_API_KEY, OPENAI_API_KEY

# 4. Start the workspace
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser or navigate to your local network IP on mobile to access the workspace.

---

## Documentation

- **Contributor Playbook:** [`AGENTS.md`](./AGENTS.md)
- **Architecture & Contract Boundaries:** [`docs/maintainer/ARCHITECTURE.md`](./docs/maintainer/ARCHITECTURE.md)
- **Modular Agent Skills:** [`skills/`](./skills/)

---

## Roadmap

- [x] Phase 1: Responsive Web App & PWA with central Node.js engine and container sandbox.
- [ ] Phase 2: Cloud-hosted deployment with multi-device authentication and cloud persistence.
- [ ] Phase 3: Packaged native desktop (Tauri/Electron) and mobile application wrappers.

---

## License

[MIT](./LICENSE)
