# Learn Italian

An app for learning Italian that focuses on the harder parts, like grammar, which other apps usually gloss over. The aim is to go deep on the rules that actually trip people up while still keeping things light and fun: short lessons, playful exercises and quick feedback.

## Stack

- [React](https://react.dev) + TypeScript
- [Vite+](https://viteplus.dev) (`vp`): dev server, build, lint (Oxlint), format (Oxfmt) and tests in one toolchain, all configured in `vite.config.ts`
- [Ionic React](https://ionicframework.com/docs/react) 9 for native-feeling iOS and Android components, transitions and gestures
- React Router 6 (Ionic 9 doesn't support React Router 7 yet, so don't upgrade it)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app) so it installs to the home screen and works offline

## Getting started

Install [Vite+](https://viteplus.dev/guide/) once. It also manages Node and pnpm, using the versions pinned in `package.json` (Node 26 LTS).

```bash
vp install
vp dev
```

## Project structure

```
src/
  App.tsx               Ionic setup, global CSS and routes
  main.tsx              Entry point
  theme/variables.css   Colour tokens (Ionic colours + --app-* tokens), light and dark
  pages/                One component per routed screen
public/                 Static files, including the logo and generated PWA icons
vite.config.ts          Vite, lint, format, pre-commit and PWA config
pwa-assets.config.ts    PWA icon generation settings
```

### Theme

Colours come from the wireframes: Italian green `#00803d` is the primary colour, Italian red `#ce2b37` is `danger`, and ink `#1a1a1a` is `dark`. Use Ionic's `color` props (`color="primary"`) on Ionic components and the `--app-*` variables (`--app-muted`, `--app-border`, `--app-green-tint`, …) in your own CSS. Dark mode follows the device setting.

Every routed screen should be wrapped in `IonPage` with an `IonContent`, otherwise Ionic's page transitions break.

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
- **React**: rules of hooks, exhaustive effect dependencies, missing `key`s, unstable nested components, `<button>`s without a `type`, unsafe `target="_blank"` links.
- **TypeScript** (type-aware): no `any`, no unhandled promises, exhaustive `switch`es over unions, unnecessary conditions.
- **Accessibility**: `jsx-a11y` rules, e.g. missing `alt` text and unlabelled controls.
- **Imports**: no circular or duplicate imports.

`vp check` also runs a full type check as part of linting.

A pre-commit hook (installed by `vp config` on install) runs `vp check --fix` on staged files.

For format-on-save in VS Code, install the recommended Vite+ extension pack (see `.vscode/extensions.json`).

## PWA

The app is an installable Progressive Web App. `vite-plugin-pwa` (configured in `vite.config.ts`) generates the web app manifest and a service worker that caches the whole app for offline use. New versions install silently (`autoUpdate`) and appear the next time the app is opened.

### Icons

All icons in `public/` are generated from `public/logo.svg`. After changing the logo, regenerate them:

```bash
vp exec pwa-assets-generator
```

The settings are in `pwa-assets.config.ts`.

### Testing on a phone

- **Quick UI checks**: run `vp dev --host` and open the network URL on your phone. The service worker won't register over plain HTTP.
- **Installed app**: deploy `dist/` to a static host with HTTPS (Cloudflare Pages, Netlify, Vercel), open it in Safari, then Share → Add to Home Screen. Set the host to single-page-app mode so every route serves `index.html`.
- In Chrome, DevTools → Application shows the manifest, the service worker and an offline toggle.
