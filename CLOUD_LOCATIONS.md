# Cloud Locations

## OneDrive source

`/Users/owner/Library/CloudStorage/OneDrive-Personal/AI Agent System/`

This is the editable source of truth. Run `scripts/manage.py` from this folder when installing or verifying the global files.

## Google Drive mirror

`/Users/owner/Library/CloudStorage/GoogleDrive-anthonymhinojosa@gmail.com/My Drive/AI Agent System/`

This is a complete byte-for-byte mirror for access from My Drive. Edit the OneDrive source first, then replace the mirror after validation so the two copies do not quietly diverge.

## Active runtime copies

- Codex instructions: `~/.codex/AGENTS.md`
- Codex skills: `~/.agents/skills/`
- Claude Code instructions: `~/.claude/CLAUDE.md`
- Claude Code skills: `~/.claude/skills/`

The cloud folders are the durable package. The home-directory files are deployed copies used by the local runtimes.
