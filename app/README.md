# Work Park app

The web app described in [../docs/SPEC.md](../docs/SPEC.md), built in the order of [../docs/PLAN.md](../docs/PLAN.md).

## Commands

```bash
pnpm install
pnpm dev        # local development server
pnpm lint       # code style checks
pnpm typecheck  # type checks
pnpm test       # unit tests
pnpm build      # production build
```

## Hosting

Deployed on Vercel. The Vercel project's root directory must be set to `app`, because the repository root holds Anthony's agent toolkit rather than the app.

## Structure

- `src/app`: routes, layout, global styles, app manifest and icon.
- `src/components`: shared interface pieces.

Design tokens live in `src/app/globals.css` and follow the "Paper stamp" direction in the spec.
