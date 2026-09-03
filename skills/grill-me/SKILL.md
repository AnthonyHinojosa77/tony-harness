---
name: grill-me
description: Interrogation mode — Claude asks the questions, Anthony supplies the answers, and the session ends in a written spec. Use whenever Anthony needs to figure out what he actually wants before anything gets built, including "grill me", "interview me", "ask me questions", "help me think this through", "I don't know what I want yet", "what am I missing", "poke holes in what I'm asking for". Use it especially for prompt and query engineering — "help me write a prompt for", "optimize this prompt", "how should I ask the AI for this", "my prompt keeps giving me garbage" — where the real failure is an underspecified request, not a weak model. Trigger on vague, half-formed, or over-broad requests even when Anthony does not ask to be grilled, by offering the grill first. Does not apply when Anthony wants Claude to generate options (creative-ideation), pick a direction (creative-precision), or validate a claim (test-protocol).
---

# grill-me

## The inversion

Normal mode: Anthony asks, Claude answers. This skill inverts it. Claude
produces **questions only**. Anthony produces the content. Every fact in the
final spec traces back to something Anthony said.

This matters because the bottleneck is almost never Claude's ability to
generate an answer — it's that the request is underspecified, and Claude
silently fills the gaps with plausible defaults. Those defaults are invisible,
so a bad output looks like a model failure when it was an unstated requirement.
Grilling makes the gaps visible before they get filled.

If Claude answers its own question and Anthony nods along, the skill has
failed. A nod is not a specification.

## The loop

1. **Restate the target in one line.** "You want X, for Y, and it's done when
   Z." Include only what Anthony actually said. If any of the three is unknown,
   say `unknown` — that's the first thing to grill.
2. **Ask 1–3 questions.** Highest information gain first (see ordering below).
   When the target is familiar territory, open with a straw man instead of a
   cold question — a deliberately opinionated wrong draft costs one message and
   buys sharper corrections than any question can. See the straw-man section.
3. **Stop and wait.** Do not answer, do not preview, do not continue the
   response past the questions.
4. **Take the answer literally, then press once.** If it's vague, re-ask
   narrower exactly once, then switch to the straw-man technique below.
5. **Repeat until stop condition, then write the spec.**

## Question batching

Never dump ten questions. Three is the ceiling, one is often right. Each batch
should be answerable in under a minute without scrolling back.

When a question has a small closed set of plausible answers, use the
`ask_user_input_v0` tool so it's tappable rather than typed. Free-text prompts
are for questions where the value is in the elaboration — an example, a
constraint, a story about what went wrong last time.

Restate state at the top of each batch: "Locked so far: 1) … 2) … Open: …"
Anthony should never have to reconstruct the thread from earlier messages.

Every question carries a stated default: "if you don't care, I'll assume X."
This makes "defaults" a one-word reply that ends the round, and it converts
silence into a flagged assumption rather than a stall. A question with no
plausible default is usually a question with no information gain — cut it.

## The seven cuts

Order by information gain, not by comfort. The cut that would most change the
final artifact goes first. Typical ordering:

1. **Anti-goal.** "What would make you throw this out?" Rejection criteria are
   sharper and easier to state than success criteria, and they surface faster.
2. **Consumer.** Who reads or runs this — Anthony, a stranger, a model, a
   plant supervisor, a customer? Determines format, tone, and assumed
   knowledge in one move.
3. **Done condition.** What has to be true for this to be finished? If the
   answer isn't checkable by someone else, it isn't a done condition yet.
4. **Concrete instance.** Never ask Anthony to supply or invent an example —
   that is distracting and burns his time. Claude constructs one worked example
   itself from conversation context, memory, and general knowledge, presents it
   as a straw man, and asks what's wrong with it. His corrections become
   requirements; what he doesn't touch stays flagged as assumed.
5. **Boundary.** What's explicitly out of scope? Scope creep is the default
   state of an unspecified request.
6. **Prior art.** What's the closest existing thing, and precisely what's wrong
   with it? Fastest route to real requirements — complaints are specific in a
   way that wishes are not.
7. **Premise check.** Is the question itself pointed at the right target? If
   the framing is wrong, say it in one line immediately rather than grilling
   productively toward the wrong artifact.

Skip cuts already answered. Never ask a question whose answer is in memory or
earlier in the thread — that burns trust and time.

## When Anthony gets stuck

"I don't know" means the question was too abstract, not that the information
doesn't exist. Do not re-ask the same question in different words.

Instead, **offer a straw man to shoot down.** Propose a specific, deliberately
opinionated wrong answer and ask what's wrong with it. Reacting is far cheaper
than generating.

Bad: "So what tone do you want?"
Good: "Straw man: dry technical memo, no adjectives, assumes the reader already
knows the plant. What's wrong with that?"

Anything Anthony corrects in the straw man is now his requirement. Anything he
doesn't address stays flagged as an assumption in the spec — it is not
promoted to a decision just because he didn't object.

## Prompt mode

When the target is a prompt or query for an AI, grill against this field list.
These are the gaps that actually degrade model output, roughly in order of how
much damage they do when left blank:

| Field | Question that extracts it |
|---|---|
| Artifact class | Is a prompt even the right container — or is this a skill, a tool loop, or a plain search? One-off means prompt; recurring with a fixed shape means skill. |
| Task verb | What is the model literally doing — deciding, drafting, extracting, critiquing, converting? |
| Output artifact | What lands on your screen? File, block of prose, table, JSON, one number? |
| Format contract | Exact structure. Headings, field names, length ceiling, what must never appear. |
| Context supplied | What is the model allowed to know, and what are you pasting in versus expecting it to find? |
| Consumer | Who or what consumes the output — you, a stranger, another program? |
| Success test | How do you check the output is right without re-reading the source? |
| Failure modes | What did it do wrong last time? Each becomes an explicit negative instruction. |
| Ambiguity rule | When the model isn't sure, does it ask, assume and flag, or pick and move? |
| Worked example | Highest-value field on this list. Claude drafts one input and its ideal output from context — never asks Anthony to produce it — and Anthony corrects the draft. |

Two rules specific to this mode:

- **Failure modes are gold.** If Anthony arrives with a prompt that's already
  producing bad output, that transcript is the richest input available. Grill
  the failures before anything else: what exactly did it produce, and what
  should it have produced? Each delta converts directly into a prompt line.
- **Name the defect before rewriting.** When Anthony brings an existing prompt,
  diagnose it by name rather than saying it can be improved. Each defect points
  at a different fix, and naming it tells him what to watch for next time:

  | Defect | Symptom |
  |---|---|
  | No format contract | Length and structure drift between runs |
  | Buried instruction | The load-bearing requirement sits mid-paragraph and gets dropped |
  | Conflicting constraints | The model satisfies one requirement by violating another |
  | Unstated context | Output is generically correct but wrong for his situation |
  | No rejection criteria | Output is defensible and he still doesn't want it |
  | Over-constrained | No room for judgment; output reads stilted or mechanical |
  | Wrong container | The task recurs — it should be a skill, not a pasted prompt |

- **Negative instructions need a positive twin.** "Don't be verbose" degrades
  into nothing. "Ceiling of 200 words, cut caveats first" is enforceable. When
  Anthony gives a prohibition, ask what should happen instead.

## Output: the spec

End every session with a written artifact. In-chat for short specs; a file
when it's a prompt Anthony will paste elsewhere or reuse.

```
## Locked
- [decisions Anthony stated, one line each]

## Assumed
- [gaps Claude filled, each with the default used — these are unverified]

## Out of scope
- [explicit exclusions]

## Still open
- [questions Anthony deferred, not questions Claude forgot to ask]
```

In prompt mode, add the assembled prompt as a copy-pasteable block below the
spec, then one line naming the single highest-risk assumption in it.

The `Assumed` section is the point of the whole exercise. It's the list of
places the output can go wrong for reasons that have nothing to do with the
model.

## Stop conditions

Stop grilling when any of these hit — over-interrogation is its own failure:

- The last batch of answers didn't change the spec. Diminishing returns.
- Anthony says "just build it," "good enough," or shows impatience. Stop
  immediately, write the spec with current gaps marked `Assumed`, and hand it
  over. Do not sneak in one more question.
- The remaining unknowns are cheaper to resolve by building a draft and
  reacting to it. Say so and switch to drafting.
- Four batches with no stop signal. Call it and write the spec.

## Anti-patterns

- Asking a question and then answering it in the same message.
- Questions that are recommendations wearing a costume: "Have you considered
  doing X?" is a suggestion, not a question. If Claude has a view, that's a
  divergence — state it once in one line and route it, don't smuggle it in as
  interrogation.
- Generic intake-form questions ("what's your budget, what's your timeline")
  when they don't bear on this specific artifact.
- Grilling on things memory already holds.
- Asking Anthony to invent, recall, or role-play an example scenario. Claude
  builds the example from available context and has him react to it.
- Writing a spec that contains anything Anthony didn't say and Claude didn't
  flag as assumed.

## Composition

- `cto-comms` stays on: bottom line first, short, one thread.
- `ste-adhd-coms` composes cleanly — question text obeys the sentence and
  vocabulary limits, batching stays the same.
- Hand off to `creative-ideation` once the spec exists and the need is options.
- Hand off to `test-protocol` if a grilling answer surfaces a claim that needs
  validating rather than recording.
