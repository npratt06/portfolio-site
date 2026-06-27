# Portfolio Site Project Context

## Overall Goal

Make this public GitHub Pages portfolio secure, presentable, maintainable, and worth sharing again.

The site started as a hand-built React portfolio with a playable Zomboozled game. The current cleanup effort is focused on keeping the public repo secure, honest, maintainable, and easy for future Codex sessions to continue without rediscovering the same context.

## Current State

- The app is a React portfolio deployed through GitHub Pages.
- Zomboozled is still playable, but online high scores are intentionally offline.
- The old frontend AWS/DynamoDB score integration has been removed.
- The high-score UI now shows a polished offline game-over notice and keeps the local `Play Again` flow.
- Production dependency audit is clean with `npm audit --omit=dev`.
- GitHub Dependabot security alerts are currently at 0.
- The app now uses Vite instead of the legacy CRA toolchain.
- GitHub Actions builds with a pinned Node version and deploys the Vite `dist` output to the `gh-pages` branch.
- The Vite/GitHub Pages deployment has been pushed and verified successfully.
- The repo is public, so documentation should stay sanitized and professional.

## Completed Work

- Removed legacy Zomboozled AWS access from the frontend.
- Removed obsolete direct AWS/DynamoDB code and configuration from the app.
- Added a small offline high-score service stub that preserves a future-facing high-score interface.
- Updated the game-over/high-score screen so it does not call deleted APIs or show broken submission controls.
- Removed public README claims that Zomboozled currently communicates with AWS DynamoDB.
- Removed unused direct dependencies including old utility/game packages that were no longer referenced.
- Moved test/type packages out of production dependencies where appropriate.
- Updated compatible React 18 / React Router 6 / TypeScript-era package versions.
- Migrated the build toolchain to Vite with standard `dist` output and a root `index.html`.
- Modernized GitHub Actions to use current actions, deterministic install, lint/test/build checks, and branch-based GitHub Pages deploy.
- Verified the cleanup with build, lint, test, production audit checks, successful GitHub Pages deploy, and 0 Dependabot vulnerabilities.
- Rewrote the README to describe the actual Vite/GitHub Pages project state, commands, deployment flow, and offline Zomboozled high-score status.

## Known Risks

- Test coverage is very thin and does not meaningfully cover the portfolio navigation or Zomboozled game flow.
- Historical git metadata has not been anonymized yet.
- The app currently uses hash routing. This is acceptable for GitHub Pages static hosting, but cleaner browser-history routes can be revisited later if the deployment setup is changed intentionally.

## Recommended Next Steps

1. Plan the next site/content refresh.
   - Decide what visual, content, and project updates should happen before investing in broader UI smoke coverage.

2. Add basic smoke coverage when the site shape stabilizes.
   - Cover app rendering.
   - Cover portfolio navigation.
   - Cover Zomboozled game-over/offline high-score behavior.

3. Consider git history anonymization.
   - Audit author and committer metadata first.
   - Rewrite to the current GitHub noreply identity only if comfortable force-pushing public history.
   - Treat any previously exposed credentials as already mitigated through credential deletion/rotation, not through history rewriting alone.

4. Revisit routing.
   - `BrowserRouter` with clean URLs is more conventional for hosts that support SPA rewrites.
   - GitHub Pages does not provide normal rewrite rules, so clean URLs would require a deliberate fallback strategy such as a generated `404.html`.
   - Treat this as a separate deployment/routing decision rather than mixing it into build-tool maintenance.

## Private Context Not In Repo

Any exported score data, AWS cleanup notes, or historical security details should remain outside the public repository. Future backend work should be rebuilt intentionally with infrastructure as code rather than restoring legacy frontend credential access.

## Useful Commands

```bash
npm run build
npm run lint
CI=true npm test
npm audit --omit=dev
git status --short --branch
```
