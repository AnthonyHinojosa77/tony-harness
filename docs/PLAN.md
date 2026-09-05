# Build Plan

The shared plan for building the app described in [SPEC.md](./SPEC.md). Anthony and Claude both read this file. Claude updates it in the same pull request as the work, so the checkboxes always match what has actually shipped.

**Goal:** A personal AI workspace on Anthony's phones and laptop that replaces his daily use of the Claude and ChatGPT apps and of coding agents, with every model available through one app and every model following his rules.

**How to read this:** Each milestone ends with something Anthony can open on his phone and try. Each step inside a milestone is one pull request. A step is checked only after its pull request is merged and the preview behaved as described.

Status key: `[ ]` not started, `[~]` in progress, `[x]` done.

---

## Milestone 1: A chat app you can use every day

**What you get:** Sign in, pick a model, talk to it, hear it read aloud, see what it cost, and install it on your home screen. This alone replaces the basic chat apps.

- [ ] 1.1 Project skeleton on Vercel. A blank page with the app name loads at a public address. Preview links work on every pull request.
- [ ] 1.2 Design foundation. Colors, type, spacing, buttons, and inputs in the light, rounded, friendly style. A style page shows every element.
- [ ] 1.3 Accounts. Sign in with Google, Apple, GitHub, Microsoft, passkey, or email and password. Only signed-in users can open the app.
- [ ] 1.4 Onboarding. First-run flow that sets a starter list of favorite models, list or network navigation, voice preference, and a monthly spending limit. Skippable, re-openable from Settings.
- [ ] 1.5 Chat through OpenRouter. Send a message, choose a model from favorites, watch the answer stream in. Conversations save and appear on every device.
- [ ] 1.6 Rules as system prompt. `AGENTS.md` is imported as the live rules, editable in Settings, applied to every request, and exportable back to the repository.
- [ ] 1.7 Cost tracking in Settings. Per-message cost recorded, totals by day and model, alert when the monthly limit is near.
- [ ] 1.8 Read-aloud. Play button on every response and a hands-free toggle that reads each response automatically. Speechify voice with the device voice as fallback.
- [ ] 1.9 Home-screen install. Works as an installed app on iPhone and Android with an icon and splash screen.

**Checkpoint:** Anthony uses it as his main chat app for a few days and lists what is missing or annoying.

---

## Milestone 2: The app decides how to work

**What you get:** Type naturally and the app picks the right approach, searches the web, reads your attachments, compares models with an impartial judge, and runs deeper research.

- [ ] 2.1 Capability router. A message is classified as Ask, Compare, Research, Code, or Pipeline without a picker. The chosen capability shows as a small label on the response that can be tapped to switch.
- [ ] 2.2 Web search. Models can search and cite sources inside any conversation.
- [ ] 2.3 Attachments. Files and images can be added to a message and read by the model.
- [ ] 2.4 Compare. Two or more models answer side by side. A judge model, chosen by Anthony, checks evidence and flags incorrect claims without picking a winner. The judge can search the web.
- [ ] 2.5 Research. One lead model with up to two supporting lanes, producing a cited answer.
- [ ] 2.6 Full model catalog in Settings. Search every OpenRouter model with prices, star any to add it to favorites.

**Checkpoint:** Anthony runs one real research question and one real comparison and judges whether the output beats his current tools.

---

## Milestone 3: It remembers and stays organized

**What you get:** Projects that hold related conversations and files, and a memory that asks before it saves.

- [ ] 3.1 Projects. Create a project, move conversations into it, attach files, add project-specific instructions.
- [ ] 3.2 Sidebar navigation. Projects and conversations in a clean list, searchable, works on the phone.
- [ ] 3.3 Memory with confirmation. The model proposes a memory in plain text, Anthony confirms or adjusts, then it saves. A "remembered" note appears on the response.
- [ ] 3.4 Memory management. Every saved memory listed in Settings, editable and deletable.

**Checkpoint:** Anthony organizes his existing work into projects and confirms memories behave as expected.

---

## Milestone 4: It can build software

**What you get:** Give it a coding task and it works in a cloud container, runs tests, and saves the result to your workspace or GitHub.

- [ ] 4.1 Cloud workspace. Each project has a file area in the app. Files can be uploaded, viewed, and downloaded.
- [ ] 4.2 Coding agent. A task starts a Vercel Sandbox container with the project's files, the agent edits and runs code, and results save back to the workspace.
- [ ] 4.3 Permissions. Per-project setting from "ask before anything irreversible" (default) to full autonomy.
- [ ] 4.4 Developer portal. Task list, live progress, change review, and approve or reject, all usable on the phone. Code editor on the laptop.
- [ ] 4.5 GitHub connection. Optional GitHub App install per project. The agent can open pull requests or push directly when permitted.

**Checkpoint:** Anthony gives it a real coding task and reviews the result from his phone.

---

## Milestone 5: Deliberate workflows

**What you get:** A Workflows area, separate from chat, where strategies are chosen on purpose and multi-step plans are saved and reused.

- [ ] 5.1 Single-strategy runs. Pick Compare, Research, Code, or Pipeline, set models and judge by hand, run it.
- [ ] 5.2 Saved plans. Name a multi-step sequence once, reuse it with new inputs.
- [ ] 5.3 Skills in chat. Slash commands from the repository's skills folder plus automatic skills, each labeled in chat, managed in Settings.

**Checkpoint:** Anthony saves one plan he expects to reuse weekly.

---

## Milestone 6: Connected to everything

**What you get:** Your cloud drives inside the app and a visual map of your work.

- [ ] 6.1 Google Drive. Read any file Anthony points at, write only into a dedicated app folder.
- [ ] 6.2 OneDrive. Same rules as Google Drive.
- [ ] 6.3 Visual network view. Projects, conversations, and files as a connected map, chosen as primary navigation in onboarding or opened as a secondary view.

**Checkpoint:** Anthony decides whether the app has replaced his current AI tools.

---

## Decisions that come up during the build

Recorded here when Anthony makes them, so no one has to search the conversation.

- Product name: pending.
- Custom domain: after the name.

## Not in this plan

Multi-user features, native app store builds, direct provider keys, phone code editor, Mac Mini hosting. See the "Out of scope" section of SPEC.md.
