# Learn Italian

An app for learning Italian that focuses on the harder parts, like grammar, which other apps usually gloss over. The aim is to go deep on the rules that actually trip people up while still keeping things light and fun: short lessons, playful exercises and quick feedback.

## Stack

- [React](https://react.dev) + TypeScript
- [Vite+](https://viteplus.dev) (`vp`): dev server, build, lint (Oxlint), format (Oxfmt) and tests in one toolchain, all configured in `vite.config.ts`

## Getting started

Install [Vite+](https://viteplus.dev/guide/) once. It also manages Node and pnpm, using the versions pinned in `package.json` (Node 26 LTS).

```bash
vp install
vp dev
```

## Commands

| Command          | What it does                     |
| ---------------- | -------------------------------- |
| `vp dev`         | Start the dev server             |
| `vp check`       | Format check + lint + type check |
| `vp check --fix` | Same, fixing what it can         |
| `vp lint`        | Lint only                        |
| `vp fmt`         | Format only                      |
| `vp build`       | Production build into `dist/`    |
| `vp preview`     | Serve `dist/` locally            |

## Linting

Oxlint is configured in the `lint` section of `vite.config.ts` and aims to catch likely bugs early:

- **Categories**: `correctness` rules are errors, `suspicious` and `perf` rules are warnings.
- **React**: rules of hooks, exhaustive effect dependencies, missing `key`s, unstable nested components, unsafe `target="_blank"` links.
- **TypeScript** (type-aware): no `any`, no unhandled promises, exhaustive `switch`es over unions, unnecessary conditions.
- **Accessibility**: `jsx-a11y` rules, e.g. missing `alt` text and buttons without a `type`.

`vp check` also runs a full type check as part of linting.

A pre-commit hook (installed by `vp config` on install) runs `vp check --fix` on staged files.

For format-on-save in VS Code, install the recommended Vite+ extension pack (see `.vscode/extensions.json`).
