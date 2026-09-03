# Maintainer Architecture & Contract Boundary

> **Audience Notice:** This document describes internal abstractions and adapter layers. Do not reference these internal paths in end-user product documentation.

## Layer Boundaries

1. **Adapters (`/packages/adapters`):** Responsible for translating third-party protocols/APIs into domain models. Keep orchestration logic out of adapters.
2. **Core Domain (`/packages/core`):** Contains pure business logic. Must remain free of UI code and third-party network drivers.
3. **Clients (`/apps/*`):** Dumb display consumers rendering data supplied by the core contracts.

## Adding a New Provider/Adapter

When adding or updating an adapter:

1. Implement the interface defined in `/packages/contracts`.
2. Add explicit error handling for unsupported operations rather than silently skipping them.
3. Verify that the "Hit Every Surface" checklist in `AGENTS.md` is fulfilled.
