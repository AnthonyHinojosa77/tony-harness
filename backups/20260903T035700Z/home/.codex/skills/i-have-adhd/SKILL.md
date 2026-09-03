---
name: i-have-adhd
description: "Shape a response for a reader with ADHD when explicitly invoked: lead with the next action, number multi-step work, reduce tangents, use concrete time estimates, and make progress visible."
license: MIT
metadata:
  short-description: Action-first, ADHD-friendly responses
---

# ADHD-Friendly Output

Make the current response easier to start, follow, and finish. Preserve the substance of the task; change its presentation and execution shape.

## Invocation boundary

Apply this skill to the current invocation. Do not claim that the mode will persist automatically across later turns. If the user invokes the skill again, continue using it.

## Shape the response

1. **Lead with the next action or completed outcome.** Put the command, path, decision, or immediate action first. Skip introductory throat-clearing.
2. **Number multi-step work.** Give each step one bounded action. Use the fewest steps that still work, and cap a list at five items. Split longer lists into a short “do now” set and a separate later set.
3. **Keep state visible.** For ongoing work, say what step is complete and what comes next. If a task or plan tool is available, keep it current instead of repeating the whole plan in prose.
4. **Suppress tangents.** Finish the primary task before surfacing a secondary issue. Resolve incidental questions independently when possible; otherwise ask one focused question at the end.
5. **Use concrete estimates when timing helps.** Give a useful range in minutes or hours and name the assumption that controls it. Do not invent precision when there is no basis for an estimate.
6. **Make wins observable.** State what now works and, when useful, give the shortest verification action.
7. **Describe errors matter-of-factly.** State the failure location, likely cause, and next diagnostic or fix. Avoid emotional framing.
8. **End with one next action only when work remains.** Prefer something the user can start in under two minutes. When the task is complete and no action is needed, stop after the result.

Use concise, literal language. Avoid filler openers, recap paragraphs that merely repeat completed work, closing pleasantries, idioms, and hedging that does not communicate real uncertainty.

## Exceptions

- When the user asks for an explanation or walkthrough, explain fully but retain skimmable headings and an action-first opening.
- Before a destructive, irreversible, security-sensitive, or externally consequential action, follow the required confirmation and safety process.
- After three unsuccessful debugging cycles, stop proposing speculative fixes. Identify the assumption most likely to be wrong and ask one diagnostic question.
- When genuine ambiguity would materially change the result, ask one short clarifying question.
- System, developer, harness, and tool requirements take precedence. Required commentary or reporting formats are not optional, but keep them easy to scan.
- If these presentation rules would omit information needed to answer the request, include the information and preserve the action-oriented shape.

## Pre-send check

- Does the first line give the action, answer, or completed outcome?
- Are multi-step instructions numbered, bounded, and limited to five items per list?
- Is the current state visible without an unnecessary recap?
- Are tangents and filler removed?
- If work remains, does the response end with one concrete next action?
