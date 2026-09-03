---
name: learning-loop
description: Capture what this session revealed about how the user works, and write it into the repo so future sessions start already knowing it. Reviews only the current session for durable preferences, corrections, formats that landed, workflows that worked, and constraints about devices, timing, or scope — then records each one in the right file (standing behavioral rules, repeatable procedures, or the raw dated log) and commits. Use when the user says the session is done, asks what was learned, says to log or remember something, or invokes it by name; also appropriate unprompted at the end of a substantive session.
---

# Learning loop

Turn one session's evidence into something the next session reads by default.

Portable: this works in any repo and any Claude Code agent. It creates whatever files it needs.

## Why this is a skill and not a hook

A Stop hook can run this automatically, but a Stop hook fires at the end of every **turn**, not every session. Gating it to once-per-session makes it fire on the *first* turn — before the session has produced anything to learn from — and it delays the answer the user is actually waiting for. Worse, a project hook installed from the wrong directory silently becomes a global one that fires in every unrelated repo, including automated runs.

So: run this deliberately, at the end. Reliable beats automatic when automatic fires at the wrong moment.

## Where things go

| What you learned | Destination |
|---|---|
| A standing rule about how to behave toward the user | `CLAUDE.md` |
| A repeatable procedure for getting work done here | `AGENTS.md` |
| A raw observation not yet worth promoting | `notes/preferences-log.md` |

Create any of these that don't exist. `notes/preferences-log.md` gets a one-line header explaining what it is; `AGENTS.md` gets a line saying `CLAUDE.md` wins on conflicts.

An observation earns promotion out of the log when it has happened more than once, or when the user stated it as a rule rather than a preference in passing.

## Procedure

**1. Review this session only.** Not the repo's history, not what you assume about the user. Look for:

- a preference stated outright ("always do X", "never do Y")
- a correction the user made to your output or your behavior
- a format that landed — something they responded well to, or asked you to repeat
- a workflow that worked, or one that visibly failed
- a constraint about their devices, timing, location, or scope
- a mistake you made whose root cause is generalizable

**2. Apply the evidence bar.** Record only what the user actually said or did. One ambiguous signal is not a preference. If you are inferring rather than quoting, either write it as an explicitly-marked inference or leave it out. Never invent a rule to have something to report.

**3. Write dated, sourced entries.** Every entry carries the date and enough context that the user can audit it months later — what they said, and what was happening. An entry no one can trace back is noise.

**4. Never rewrite the user's own words.** If new information supersedes an old entry, add a new dated entry and mark the old one superseded. Do not delete or edit an entry the user gave you.

**5. Commit.** Nothing outside the repo survives the session. Stage only the files this skill touched. If the directory is not a git repo, write the files anyway and say plainly that they are not committed.

**6. Report in one line per entry.** Name what you recorded and where, so the user can veto it. Do not summarize the session, and do not re-answer their last question.

## When there is nothing

Say so in one sentence and stop. A session with no durable lesson is the normal case, not a failure. Padding the log with restatements of the task makes it useless — the value of the record is entirely in its signal-to-noise.

## Entry shape

```markdown
### 2026-08-24

- **Short claim in bold.** What they actually said or did, quoted or closely paraphrased, with enough surrounding context to audit. → promoted to `AGENTS.md` (or: kept here pending a second sighting).
```

Superseding:

```markdown
- **Claim.** ~~Superseded 2026-09-02~~ — see the entry of that date. Original: …
```
