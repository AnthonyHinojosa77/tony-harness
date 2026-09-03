# Project Agent Instructions

Read Anthony's global instructions first, then use this file for verified project facts. Replace every bracketed field and delete anything that does not apply.

## Product

- Outcome: [what the product must achieve]
- Users: [real audience]
- Source of truth: [canonical spec, data, or artifact]
- Definition of done: [observable acceptance criteria]

## Architecture

- Framework and runtime: [verified values]
- Package manager: [verified value]
- Deployment target: [verified value]
- Important boundaries: [components, services, adapters, data]
- Product invariants: [rules a change must preserve]

## Commands

```bash
[install]
[development]
[format]
[lint]
[typecheck]
[targeted tests]
[build]
```

## Implementation rules

- Match [named conventions or representative files].
- Update shared contracts before their consumers when an interface changes.
- Cover every applicable entry point and supported surface.
- Keep unsupported behavior explicit.
- Check for a running development server before starting another.
- Update maintainer documentation when architecture or operating behavior changes.

## Verification

- Required automated gates: [commands]
- Required rendered or end-user checks: [flows and viewports]
- Known test limitations: [facts only]

## Known traps

- [project-specific failure, cause, and reliable prevention]

