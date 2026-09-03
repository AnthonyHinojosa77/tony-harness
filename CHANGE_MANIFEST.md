# Change Manifest

## Current file count

The system has **15 skills** and **237 managed file copies** across its cloud packages and active local installations:

| Location | Files | Contents |
| --- | ---: | --- |
| OneDrive `AI Agent System/` | 78 | Editable source of truth, skills, supplied sources, evidence, templates, backups, automation, and integrity list. |
| Google Drive `My Drive/AI Agent System/` | 78 | Complete mirror of the OneDrive package. |
| `~/.codex/AGENTS.md` and `~/.agents/skills/` | 48 | One Codex global instruction file plus 47 managed skill and resource files. |
| `~/.claude/CLAUDE.md` and `~/.claude/skills/` | 33 | One Claude Code global instruction file plus 32 managed skill and resource files. |

The 11 supplied originals also remain unchanged in `/Users/owner/Library/CloudStorage/OneDrive-Personal/Claude/Skills/`. Counting those originals separately, **248 related physical files** are present. Unrelated installed skills and plugin caches are excluded.

## Canonical toolkit contents

| Area | Files | Purpose |
| --- | ---: | --- |
| `skills/` | 47 | Fifteen entrypoints, Codex metadata, and the Claude Skill Creator's referenced resources. |
| `sources/supplied-skills/` | 11 | Unchanged copies of every supplied `.md` and `.skill` source. |
| `backups/` | 4 | Prior global instructions and the superseded ADHD installation. |
| `templates/` | 5 | Project orientation, agent instructions, architecture, and handoff templates. |
| `history/` | 3 | Computer History synthesis, source register, and evidence boundary. |
| Root guides, automation, and integrity | 8 | Operating guides, canonical instructions, validation, installer, and checksums. |

## Eight supplied skills added

- `can-you-please-speak-like-a-normal-person`: manual communication modes.
- `creative-precision`: automatic creative direction convergence.
- `cto-comms`: automatic evidence-bound communication discipline.
- `grill-me`: automatic interview-to-spec workflow.
- `i-have-adhd`: manual ADHD-friendly output mode.
- `claude-skill-creator`: skill creation and evaluation, renamed from the supplied `skill-creator` to avoid collision with Codex's built-in skill.
- `test-protocol`: evidence and claim testing; this resolves the earlier `show-your-work` dependency gap.
- `unslop`: manual prose revision pass.

The three Claude-only `disable-model-invocation` fields were translated into Codex `allow_implicit_invocation: false` metadata and reinserted in Claude's installed copies. The malformed plain YAML description in the supplied ADHD source was quoted in the runtime-ready entrypoint. The creator's frontmatter name and Codex display metadata were adapted. Skill instruction bodies were preserved.

## Applied global files

- Codex loads all 15 managed skills from `~/.agents/skills/` and the global operating agreement from `~/.codex/AGENTS.md`.
- Claude Code receives all 15 skills from `~/.claude/skills/` and its rendered operating agreement from `~/.claude/CLAUDE.md`.
- `scripts/manage.py` installs complete skill resource trees, adapts explicit-only metadata, backs up replaced files, and verifies byte parity.

## Supporting resources and preserved originals

The supplied creator references scripts, an evaluation viewer, schemas, and subagent instructions. These 17 supporting files, including the license, were copied from the already installed official Claude plugin at `~/.claude/plugins/cache/claude-plugins-official/skill-creator/0620a687ddd5/skills/skill-creator/`. Its entrypoint differs from the supplied file only in file-delivery guidance, so its resource contract matches.

No supplied source was edited. Every original also has an unchanged copy in `sources/supplied-skills/`. The older Codex-only ADHD installation is preserved under `backups/20260903T035700Z/`.
