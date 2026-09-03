# AI Workflow Review — September 2, 2026

## Scope and confidence

Computer History was `running` when this review began, and its active event file was fresh. The review screened every available summary in the current Skysight resource set: 11 six-hour summaries and 131 ten-minute summaries spanning August 27 through September 2. It also inventoried 6,065 parseable pre-task raw events across 46 segments from September 1–2 and inspected targeted raw events for ambiguous high-value patterns. The earlier August 15–30 workflow index supplied longer-term comparison context.

This is a workflow review, not a personality profile. Capture was intermittent, several six-hour windows were partial, locked periods contained no useful activity, and the raw event retention window was shorter than the summary window. Repeated patterns are marked high confidence; a single clear workflow remains medium or emerging.

## Executive findings

| Pattern | Evidence-backed implication | Design response | Confidence |
| --- | --- | --- | --- |
| Multi-tool research and creation | Anthony moves among ChatGPT/Codex, Claude, Grok, Gemini, Cursor, ZCode, T3 Code, NotebookLM, and local artifacts. Repeating the full task causes drift and unclear ownership. | One lead, at most two independent support lanes for ordinary work, and a compact handoff record. | High |
| Completion-state ambiguity | Provider setup, source imports, saved skills, agent progress, order tickets, and cloud files repeatedly looked complete before end-to-end confirmation. | Separate configured, authorized, visible, callable, tested, adopted, and final outcome states. | High |
| Cross-runtime skill friction | A skill visible or saved in one product was repeatedly expected to be available in another. | Keep one canonical source, materialize it per runtime, then perform fresh discovery and invocation in that runtime. | High |
| Plain systems explanations | Anthony repeatedly asked agents to explain the exact surface and causal relationship more clearly, without oversimplifying. | Answer first; name the product surface; explain components and cause; omit generic background. | High |
| Full delivery versus guided learning | Delegated product, research, and document tasks benefit from end-to-end agent ownership. In coursework, Anthony explicitly asked for guidance and teaching rather than silent completion. | Select delivery or learning mode from the request and preserve authorship in learning mode. | High |
| Stale and unsynced reads | A saved coursework file was judged from a stale version, and a new ERD was briefly invisible across the agent/file boundary. | Save, re-read the canonical path, and timestamp the final verification before assessing it. | Medium |
| Volatile operational state | Provider status, market data, account/order state, benchmarks, and app behavior changed within or between sessions. | Reopen the live source and timestamp the check. Keep analysis, intended action, UI ticket, and confirmed outcome separate. | High |
| Visual and editable deliverables | Work often moved from references to generated images, Markdown, DOCX, HTML, ERDs, or code and then into visual review. | Preserve references, produce an editable source when applicable, render or open the output, and verify the user-visible result. | High |
| Interruptions and resumptions | Login gaps, app switching, personal interruptions, and long-running agents broke continuity. | Maintain current state, do-not-redo items, source of truth, next action, and stop rule in the handoff. | High |
| Read-aloud usage | Long research and technical responses were repeatedly reviewed with Speechify or native read-aloud. | Use connected prose, clear sequencing, short headings, and tables only where comparison benefits. | Medium |

## Workflow system implemented from the evidence

The global instructions now make the following loop explicit:

**Establish the requested outcome → inspect the real source → name the source of truth and definition of done → implement → verify automated and user-visible behavior → record final state → hand off only what remains.**

Four explicit-only skills handle tasks that should not silently run:

- `file-pr`: create a focused, review-ready pull request after implementation is complete.
- `babysit-pr`: monitor one specifically authorized pull request through CI and review.
- `html-communication`: create and render-check a self-contained decision or findings artifact.
- `capability-check`: test a skill, model, connector, provider, MCP, or automation in its exact target surface.

Project templates hold architecture and verified commands outside the always-loaded personal instructions. A handoff/outcome template gives interrupted and cross-tool work one consistent continuation record.

## What should remain surface-specific

- Browser and cloud assistants do not inherit files on this Mac merely because they exist in the canonical folder.
- Claude Code and Codex use different global instruction locations and different manual-only skill metadata.
- Project architecture, framework commands, and repository traps belong in project instructions after inspection.
- Live finance, account, connector, and provider conclusions must be refreshed; this review is context, not current-state proof.
- The prior `unslop` preference remains separate and manually invoked. It was not folded into global behavior.

## Coverage register

`source-register.csv` lists every six-hour and ten-minute summary screened for this review. Raw events are represented by segment rather than copied into the register; this keeps the review auditable without duplicating observed content.

