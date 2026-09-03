# Anthony's Global AI Agent System

This private toolkit gives Anthony one durable operating agreement for AI agents, plus native copies for the tools that can load local instruction and skill files. It was derived from Computer History evidence gathered on this MacBook and from the active Codex and Claude Code instruction files.

## What is installed

| Surface | Global instructions | On-demand skills | Verification |
| --- | --- | --- | --- |
| Codex | `~/.codex/AGENTS.md` | `~/.agents/skills/<name>/` | Fresh session must report loaded instructions and discover each skill. |
| Claude Code | `~/.claude/CLAUDE.md` | `~/.claude/skills/<name>/` | Fresh session: `/memory`, `/skills`, then invoke one harmless skill. |
| Cursor, ZCode, T3 Code | Use the project template in the project itself. | Materialize only skills that the exact runtime supports. | Check inside that runtime; another app's status is not evidence. |
| ChatGPT, Claude web/desktop, Grok, Gemini, Kimi | Use that product's supported custom instructions, project files, or a handoff capsule. | Use native skills only where they are actually exposed. | Start a fresh chat and test the exact behavior. |

Local files do not automatically become available to browser or cloud assistants. The canonical files here preserve intent; the install location, discovery mechanism, and fresh invocation establish whether a specific runtime can use them.

## Files

- `AGENTS.md` is the shared source for agent behavior.
- `CLAUDE.md` adds the few Claude-specific rules that are already established.
- `templates/` contains project files to tailor after an agent has inspected a real project.
- `skills/` contains 15 reusable workflows. Explicit-only skills retain manual activation, while the others preserve their supplied automatic behavior.
- `sources/supplied-skills/` preserves all 11 files Anthony supplied, unchanged, before cross-runtime adaptation.
- `CLOUD_LOCATIONS.md` records the OneDrive source and Google Drive mirror.
- `history/AI_WORKFLOW_REVIEW_2026-09-02.md` explains the evidence and why each rule exists.
- `scripts/manage.py` installs, verifies, and reports drift without touching unrelated files.

## Manage the installation

Preview changes:

```bash
python3 scripts/manage.py install
```

Apply the managed global files:

```bash
python3 scripts/manage.py install --apply
```

Verify byte-for-byte installation and skill metadata:

```bash
python3 scripts/manage.py verify
```

The installer backs up an existing managed instruction file before replacing it. It copies only the named files and skill folders in this toolkit. It does not change credentials, permissions, MCP configuration, environment variables, observation settings, or unrelated skills.

The supplied Claude workflow named `skill-creator` is installed as `claude-skill-creator`. Codex already ships a built-in `skill-creator`; the distinct name keeps both workflows directly selectable.

## Use in a new project

An agent should inspect the actual project before creating project instructions. After that inspection, copy and tailor `templates/README.md`, `templates/AGENTS.md`, and `templates/CLAUDE.md`. Replace every bracketed prompt with verified project facts; remove sections that do not apply. Project guidance should hold architecture, commands, business rules, and acceptance criteria. Personal working preferences stay in the global file.

The reusable handoff and completion records live in `templates/docs/maintainer/`. They solve the recurring losses seen when work changes apps, resumes after an interruption, or depends on a cloud-synced file.

## Authoritative format references

- [Codex global `AGENTS.md` guidance](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex user skill locations](https://learn.chatgpt.com/docs/build-skills)
- [Claude Code instruction scopes and `AGENTS.md` imports](https://code.claude.com/docs/en/memory)
- [Claude Code manual-only skill configuration](https://code.claude.com/docs/en/skills)
