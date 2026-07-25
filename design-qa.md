# Portfolio Design Checkpoint

Last updated: July 25, 2026

This document is the handoff for the current navigation and portfolio-polish milestone. The implementation at this checkpoint is intentionally accepted as a stable place to resume from. The next and likely final step before shelving the site is an owner-led verbiage and content review.

## Current behavior

### Mobile fold-out menu

- The mobile menu uses explicit `closed`, `open`, and `closing` phases in `src/pages/PageLayout.tsx`.
- Opening and closing each run for `250ms`.
- The three links move continuously in thirds of the animation, producing a single rolling sequence without pauses between items.
- The container height advances and retracts on the same thirds as the items.
- Closing is the timing reversal of opening: the third item leaves first, followed by the second and first.
- The container remains visible during the closing phase and is hidden only after `mobile-menu-container-close` completes.
- The authoritative motion variable is `--mobile-menu-motion-duration` inside the `max-width: 820px` media query in `src/index.css`.

### Home brand mark

- The top-left brand link is still the Home control and retains the accessible name `Nate Pratt`.
- Its visual mark is a custom inline SVG rather than a layered icon-library house and door.
- The roof apex, house outline, doorway, and light share a single `24 × 24` SVG coordinate system.
- The house and doorway are structurally centered on `x=12`; there are no overlay offsets or optical-centering transforms.
- The house outline path itself turns upward around the doorway. There is no foundation line behind the opening and no masking layer.
- The mark renders at `27 × 27px` inside a `40 × 40px` desktop control. Header controls become `38 × 38px` on small screens.
- The doorway has a shallow arched top. It remains an opening only, with no door slab, hinge, handle, perspective movement, or ground-light spill.
- The house, sun, and moon render with the same effective `1.575px` stroke weight.
- The Home and theme controls use matching `1px` accent borders and `6px` corner radii.

### Incandescent doorway light

The Home route (`/`) is the lit state. Other routes use the unlit state.

`HomeMark` tracks four phases:

- `inactive`
- `igniting`
- `active`
- `cooling`

Ignition:

- Duration: `560ms`
- Reaches `82%` opacity at `36%` of the animation.
- The remainder eases more slowly into the full warm light and wider glow.

Cooling:

- Duration: `720ms`
- Drops to `18%` opacity at `30%` of the animation.
- The remaining amber glow decays gradually to zero.

The palette is intentionally muted and theme-aware rather than a saturated yellow or orange:

- Dark theme: light `#e8ddb0`, glow `#c5b66f`, ember `#8f7e49`, dim `#54492d`
- Light theme: light `#dccb94`, glow `#b19a4c`, ember `#7e692d`, dim `#51431f`

Brightness, saturation, fill color, and glow radius animate together with asymmetric timing curves. Hovering or focusing the Home link while away from Home reveals only a subtle ember preview.

### Projects presentation

- Featured projects use a text-first layout with no thumbnails.
- Desktop uses a narrow number/status rail beside a wider copy column.
- Mobile moves the number and status into one compact row above the project title.
- Project statuses remain on one line, and the copy, detail list, and action spacing are tuned for the image-free layout.
- Experiments & Archive remains visually quieter than Featured Work.

## Intentional decisions

- Do not bring back the detailed 3D door swing. It was difficult to read at the mark’s native size and repeatedly introduced optical-alignment problems.
- Do not replace the custom house path with a third-party house glyph while keeping a separate doorway overlay. Centered CSS bounding boxes did not guarantee centered visible strokes.
- Do not restore a ground-light spill below the doorway. At the mark's native size it competed with the opening and reduced clarity.
- Keep Featured Work text-first unless a future project has imagery that adds substantive context rather than decoration.
- Site animations intentionally run regardless of the operating system’s reduced-motion preference. This is a current product choice requested during this iteration; there is no `prefers-reduced-motion` override in the site CSS.

## Next step before shelving

- Nate will review all visible copy for accuracy, specificity, tone, and personal voice.
- The review should cover Home, Projects, Experience, navigation labels, project descriptions, and supporting calls to action.
- After the copy is accepted, rerun lint, tests, and the production build, then allow the site to remain stable without additional speculative polish.

No other visual or functional work is currently tracked as required before shelving.

## Files to start with

- `src/pages/PageLayout.tsx`
  - `HomeMark`
  - `HomeLightPhase`
  - mobile-menu phase handling
- `src/index.css`
  - `.brand-home-mark*`
  - `home-doorway-ignite`
  - `home-doorway-cool`
  - `.featured-projects`
  - `.project-entry`
  - `.project-meta`
  - mobile-menu rules under `@media (max-width: 820px)`
- `src/pages/Projects/Projects.tsx`
  - Featured project structure
- `src/content/portfolio.ts`
  - Primary portfolio copy and project data
- `src/pages/Resume/Resume.const.tsx`
  - Experience history and supporting content

## Verification at checkpoint

- Visually checked the Projects layout at desktop and a `390 × 844` mobile viewport.
- Checked the Home and Projects routes in light and dark themes.
- Confirmed the lit and unlit opening remain centered and the inactive opening has no line across its base.
- Confirmed Home, sun, and moon stroke weights match and the Home/theme control borders have equal visual weight.
- Confirmed Featured Work contains no project images and has no horizontal overflow on mobile.
- Confirmed no browser console warnings or errors.
- Confirmed `npm run build` passes.
- Confirmed `npm run lint` passes.
- Confirmed all four Vitest tests pass.
- Confirmed `git diff --check` passes.

Checkpoint result: passed.
