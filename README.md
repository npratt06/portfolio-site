# Nate's Portfolio Site

Personal portfolio site for Nate Pratt, built with React, TypeScript, and Vite. It includes a resume, projects, an about page, and a playable React version of Zomboozled.

The site is published with GitHub Pages at:

https://npratt06.github.io/portfolio-site/

## Current Status

- Frontend-only React app deployed through GitHub Pages.
- Build tooling has been migrated from Create React App to Vite.
- Routing currently uses hash URLs for reliable GitHub Pages static hosting.
- Zomboozled is playable, but online high scores are intentionally offline while any future backend is reconsidered.
- Production dependency audit and Dependabot security alerts are currently clean.

## Local Development

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173/portfolio-site/
```

`npm start` is also available as an alias for `npm run dev`.

## Useful Commands

```bash
npm run lint
CI=true npm test
npm run build
npm run preview
npm audit --omit=dev
```

- `npm run lint` runs ESLint.
- `CI=true npm test` runs the Vitest test suite once.
- `npm run build` type-checks and builds the production app into `dist/`.
- `npm run preview` serves the production build locally.
- `npm audit --omit=dev` checks production dependencies.

## Deployment

Pushing to `main` runs the GitHub Actions `build-deploy` workflow. The workflow installs with `npm ci`, runs lint/tests/build, and deploys the Vite `dist/` output to the `gh-pages` branch.

The app uses Vite's GitHub Pages base path (`/portfolio-site/`) and `HashRouter`, so routes such as `/#/projects` and `/#/zomboozled` work without custom server rewrites.

## Zomboozled High Scores

The previous frontend AWS/DynamoDB score integration has been removed. The current high-score service is an offline stub that preserves the game-over flow without making backend/API calls.

If online scores return later, they should be rebuilt intentionally with a backend service and infrastructure-as-code rather than restoring direct frontend cloud access.
