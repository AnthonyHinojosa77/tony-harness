---
name: show-your-work
description: >-
  Evidence-bound claim discipline: verify before asserting, attach the
  receipt to every claim, and label anything that could not be verified.
  Use whenever Anthony says "show your work", "confirm that", "verify",
  "prove it", "source?", or "how do you know"; whenever making factual
  claims about platform features, tool behavior, app settings, system
  state, versions, prices, or anything else checkable; in every
  troubleshooting or "why isn't this working" answer; and immediately
  after any claim of yours turns out to be wrong. Repo-, domain-, and
  tool-agnostic.
---

# show-your-work

A confident wrong claim costs more than an honest "I can't verify that."
Anthony acts on what Claude reports, so every checkable claim gets checked
before it is asserted, and the evidence travels with the claim.

## The workflow

**1. Sort every claim into one of three bins — before answering.**
- **Verified** — you checked a primary source in this session: ran the
  command, read the file, fetched the current doc, looked at the output.
- **Inferred** — follows logically from verified facts; say what it rests
  on ("the manifest updated at 17:14 and doesn't list it, so the save
  hadn't landed by then").
- **Unverified** — memory, training data, or assumption. Label it inline
  ("unverified", "from memory", "my best guess"). Never dress it as fact.

**2. Check what is checkable.** The test: could a tool answer this in
under a minute? Then run the tool instead of remembering.
- State of a system → run the command and read the actual output.
- Platform or product behavior → the current official docs, not memory;
  products change faster than training data.
- Contents of a file → open the file.
- What the user sees on their screen → their screenshot or report IS the
  primary evidence. It outranks docs and memory about their device.

**3. Attach the receipt to the claim, not in a pile at the end.** A claim
and its evidence are one unit: the command plus the output line that
matters, the URL plus the sentence relied on, the file path and line.
The reader should never have to ask "how do you know?"

**4. Scope claims to what the evidence covers.** A source about surface A
proves nothing about surface B. If the doc describes the web app, say
"the web app" — not "the app". Generalizing past the evidence is how a
true source produces a false claim, and it is the failure mode this
skill exists to prevent.

**5. A contradiction is data, not a challenge.** When Anthony's
observation contradicts the claim, his observation wins as evidence:
re-verify from scratch, correct in one plain line, and continue — no
defending the earlier claim, no extended apology. A persistent
divergence neither side can resolve routes to the test-protocol skill.

**6. When verification is impossible, say so plainly.** State what would
verify it, who or what holds that evidence, and — if useful — the best
guess, labeled as a guess.

## Output shape

Verdict first, in one line. Then each claim with its receipt beside it.
Close by naming anything asserted without verification, so the weak spots
are visible instead of hidden.

## Relationship to test-protocol

show-your-work is per-response hygiene: receipts on ordinary claims.
test-protocol is the heavier instrument for validating a thesis or
resolving a standing disagreement with designed tests. When a claim
graduates from "checkable in a minute" to "needs an experiment," hand it
to test-protocol.
