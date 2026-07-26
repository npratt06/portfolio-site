# Nate's Portfolio Site

Personal portfolio site for Nate Pratt. It presents selected projects, a concise experience summary, and a deliberately secondary collection of tools, games, and archived work.

[View the live site](https://npratt06.github.io/portfolio-site/).

## Project Status

The current portfolio milestone is complete, and the project is in maintenance mode. Future updates will be limited to substantive new project content, compatibility/security maintenance, or focused fixes.

- Home, Projects, and Experience form the primary information architecture.
- Projects contains the live Wiffle App, the in-development Fantasy Football Recap Generator, and a quieter Tools, Games, & Archive section.
- The former Lab route redirects to Tools, Games, & Archive so old links continue to work.
- Pong, Zomboozled, and the original jukebox portfolio are preserved as framed historical/playable artifacts.
- Zomboozled remains playable with offline high scores; the retired frontend AWS/DynamoDB integration is not used.

Most portfolio copy and structured project data lives in `src/content/portfolio.ts`. Experience history lives in `src/pages/Resume/Resume.const.tsx`.

## Tech Stack

- React 18 and TypeScript
- Vite
- React Router with hash routing for GitHub Pages
- Vitest and ESLint
- GitHub Actions and GitHub Pages

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
```

- `npm run lint` runs ESLint.
- `CI=true npm test` runs the Vitest test suite once.
- `npm run build` type-checks and builds the production app into `dist/`.
- `npm run preview` serves the production build locally.

## Deployment

Pushing to `main` runs the GitHub Actions `build-deploy` workflow. The workflow installs with `npm ci`, runs lint/tests/build, and deploys the Vite `dist/` output to the `gh-pages` branch.

The app uses Vite's GitHub Pages base path (`/portfolio-site/`) and `HashRouter`, so routes such as `/#/projects` and `/#/zomboozled` work without custom server rewrites. Legacy `/#/lab` links redirect to `/#/projects#experiments`.

## Zomboozled High Scores

The previous frontend AWS/DynamoDB score integration has been removed. The current high-score service is an offline stub that preserves the game-over flow without making backend/API calls.

If online scores return later, they should be rebuilt intentionally with a backend service and infrastructure-as-code rather than restoring direct frontend cloud access.
