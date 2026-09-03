---
name: repo-review
description: >-
  Automated end-to-end technical review of any code repository, delivered
  as a plain-language report a non-technical owner can act on. Use whenever
  Anthony invokes /repo-review, or asks to "review this repo", "analyze
  this codebase", "summarize what this repo does", "audit this project",
  "what am I looking at here", or points at a repository (his or someone
  else's) and wants to understand its contents, architecture, quality, or
  risks — even if he doesn't say "review". Also use before big decisions
  about a repo — rewriting it, handing it to a contractor, buying/adopting
  a project, or onboarding a new tool built on it. Repo-agnostic; works on
  any language or stack.
---

# repo-review

Turn an unfamiliar repository into a report the owner can actually use:
what it is, how it works, what shape it's in, and what deserves attention.
The reader is intelligent but not a programmer — every technical claim
gets translated into its consequence ("the API key never reaches the
browser" beats "server-side env var injection").

Never skim-and-guess. Every claim in the report must trace to a file you
actually read. If something can't be verified from the repo (runtime
behavior, third-party service reliability, whether a deploy is live),
label it as unverified instead of asserting it.

## Phase 1 — Census

Get the true size and shape before reading anything:

```bash
find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*" \
  -not -path "*/dist/*" -not -path "*/build/*" -not -path "*/vendor/*" \
  -not -path "*/.venv/*" -not -path "*/target/*" | sort
```

Count the files. The count picks your strategy:

- **≤ ~60 source files** → read everything. No sampling, no excuses.
- **~60–300** → read all entry points, configs, and core logic in full;
  skim repetitive leaves (one representative per pattern — e.g. one CRUD
  screen out of eight look-alikes) and say in the report which files got
  the lighter pass.
- **300+** → fan out subagents (or an Explore agent) per subsystem, each
  returning a structured summary; you read the connective tissue —
  entry points, configs, shared libraries — yourself.

Also capture `git log --oneline -15` and the branch list: commit history
tells you the project's story (rewrites, pivots, abandonment, cadence)
faster than any file does.

## Phase 2 — Frame before code

Read these before any application code, because they tell you what the
repo *claims* to be, and the review's real job is checking that claim:

1. `README` / docs — the stated purpose and promises
2. Manifest (`package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`,
   `pom.xml`…) — dependencies, scripts, version
3. CI config (`.github/workflows/`, etc.) — what "passing" actually means
4. Deploy config (`vercel.json`, `Dockerfile`, `netlify.toml`,
   `fly.toml`…) — where and how it runs
5. Agent/instruction files (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`) —
   working conventions already in force

Note every mismatch between claim and config now; verify against code in
Phase 3. (Two deploy configs, scripts that don't exist, CI that tests
nothing — these are findings.)

## Phase 3 — Read the code

Order matters: entry point → shared libraries/state → features → UI/leaf
files. You're building a mental model, not a file list. While reading,
keep four running answers:

- **Data flow**: where does data enter, where does it live (database,
  localStorage, files, memory), where does it leave? Who can see it?
- **Trust boundaries**: every place the code talks to the outside world
  (APIs, user input, env vars, secrets). Is each one validated? Where do
  the secrets live and can they leak to a client?
- **Failure behavior**: what happens when the network dies, input is
  garbage, a key is missing? Graceful degradation or a blank screen?
- **Craft signals**: consistency of idiom, dead code, copy-paste blocks,
  error handling discipline, comments that lie. These predict how the
  repo will behave under change.

## Phase 4 — Assess

Judge against what the project is *trying* to be — a weekend PWA is not
graded like a bank backend. For each area, one verdict + evidence:

- **Security**: secret handling, input validation, injection surface,
  what an attacker gets if the deploy is compromised.
- **Correctness risks**: logic that will bite (timezone math, race
  conditions, unvalidated parsing of external data, silent catch blocks).
- **Gaps**: what's missing that this kind of project normally has —
  tests, error tracking, data export/backup, accessibility — and whether
  each gap actually matters at this project's scale.
- **Operational story**: can a stranger clone, run, and deploy it from
  the docs alone? Does CI enforce anything real?

Do not manufacture findings to seem thorough. "This is fine" is a valid
verdict, and inflated risk lists destroy trust in the real ones.

## Phase 5 — Report

Deliver the report in chat as the final message (plus a file/artifact
copy if the environment supports it and the report is long). Use this
structure:

```
# <Repo name> — technical review

**Bottom line** — 2–4 sentences: what it is, overall condition, the one
thing most worth knowing.

## What it is
Purpose, audience, and the 30-second tour of what it does.

## How it's built
Stack and architecture in plain language: the moving parts, where data
lives, how the pieces talk. Name real files (path:line) so claims are
checkable. Explain *why* the architecture choices matter to the owner.

## What's good
Genuine strengths, with evidence. Be specific enough that the owner
learns what to preserve.

## What to watch
Ranked list, worst first. Each item: the issue, the plain-language
consequence, and the size of the fix. Separate "will bite" from "cosmetic".

## Verdict
Condition grade in words (not a letter), what the repo is ready for
today, and what it would take to reach the next level.
```

Length: proportional to the repo. A 40-file project earns ~600–900 words;
don't pad. Tables only for enumerable facts (env vars, endpoints,
screens). Every jargon term used gets a gloss in a few words the first
time.

## Calibration

- Answer the review's implicit question first. If the owner asked
  something specific ("is this safe to deploy?"), the bottom line
  answers *that*, then the standard report follows.
- Findings are observations, not accusations — the owner may have
  written none, some, or all of the code.
- If the repo is mid-refactor or obviously generated/recovered, say what
  the history shows and review what's *there*, not what's promised.
- Never run the project's code or install dependencies unless asked —
  a review is read-only. (Typecheck/lint via the repo's own scripts is
  allowed when cheap, and its result is evidence.)
