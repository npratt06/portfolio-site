# Nate's Portfolio Site

Personal portfolio site for Nate Pratt, built with React, TypeScript, and Vite. It presents selected projects, a concise experience summary, and a small archive of development experiments.

The site is published with GitHub Pages at:

https://npratt06.github.io/portfolio-site/

## Current Status

- Frontend-only React app deployed through GitHub Pages.
- Build tooling has been migrated from Create React App to Vite.
- Routing currently uses hash URLs for reliable GitHub Pages static hosting.
- The primary information architecture is Home, Projects, and Experience. Header navigation is the single path between those sections.
- Projects uses a text-first presentation without project thumbnails. It contains the live Wiffle App, the in-development Fantasy Football Recap Generator, and a quieter Experiments & Archive section.
- The former Lab route redirects to the Experiments & Archive section so old links continue to work.
- Experience focuses on role history, technical skills, and education without presenting resume bullet copy.
- Home is designed to fit comfortably on typical laptop screens; longer project and mobile layouts use intentional scrolling with responsive spacing.
- Motion is limited to page, menu, theme, and interaction transitions. These animations currently run regardless of the operating system's reduced-motion preference as an intentional design choice.
- The mobile menu uses a reversible 250ms rolling fold animation, and the top-left Home control uses a custom centered house mark with a route-driven incandescent doorway light.
- Zomboozled is playable, but online high scores are intentionally offline while any future backend is reconsidered.
- Production dependency status can be checked with `npm audit --omit=dev`; GitHub Dependabot handles repository alerting.

Most portfolio copy and structured project data lives in `src/content/portfolio.ts`. Page-specific resume history lives in `src/pages/Resume/Resume.const.tsx`.

## Final Step Before Shelving

The remaining planned milestone is an owner-led verbiage and content pass across Home, Projects, Experience, navigation labels, and supporting project descriptions. The goal is to confirm that every statement is accurate, personal, specific, and written in Nate's own voice before pausing active work on the site.

No additional visual or functional work is currently required before shelving. Reduced-motion overrides and a replacement backend for Zomboozled high scores remain intentionally deferred rather than active tasks.

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

The app uses Vite's GitHub Pages base path (`/portfolio-site/`) and `HashRouter`, so routes such as `/#/projects` and `/#/zomboozled` work without custom server rewrites. Legacy `/#/lab` links redirect to `/#/projects#experiments`.

## Zomboozled High Scores

The previous frontend AWS/DynamoDB score integration has been removed. The current high-score service is an offline stub that preserves the game-over flow without making backend/API calls.

If online scores return later, they should be rebuilt intentionally with a backend service and infrastructure-as-code rather than restoring direct frontend cloud access.
