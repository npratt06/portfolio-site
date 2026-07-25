# Navigation Design Checkpoint

Last updated: July 25, 2026

This document is the handoff for the current header navigation work. The implementation at this checkpoint is intentionally accepted as a stable place to resume from; future iterations should build on it rather than restoring the earlier swinging-door experiments.

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
- The mark renders at `25 × 25px` inside the existing `38 × 38px` brand control.
- The doorway is an opening only. It has no door slab, hinge, handle, or perspective movement.

### Incandescent doorway light

The Home route (`/`) is the lit state. Other routes use the unlit state.

`HomeMark` tracks four phases:

- `inactive`
- `igniting`
- `active`
- `cooling`

Ignition:

- Duration: `560ms`
- Reaches `86%` opacity at `36%` of the animation.
- The remainder eases more slowly into the full warm light and wider glow.

Cooling:

- Duration: `720ms`
- Drops to `20%` opacity at `30%` of the animation.
- The remaining amber glow decays gradually to zero.

The palette is intentionally closer to a warm tungsten bulb than a saturated yellow LED:

- Light: `#ffd1a3`
- Glow: `#f3a14f`
- Ember: `#c96b25`

Brightness, saturation, fill color, and glow radius animate together with asymmetric timing curves. Hovering or focusing the Home link while away from Home reveals only a subtle ember preview.

## Intentional decisions

- Do not bring back the detailed 3D door swing. It was difficult to read at the mark’s native size and repeatedly introduced optical-alignment problems.
- Do not replace the custom house path with a third-party house glyph while keeping a separate doorway overlay. Centered CSS bounding boxes did not guarantee centered visible strokes.
- Site animations intentionally run regardless of the operating system’s reduced-motion preference. This is a current product choice requested during this iteration; there is no `prefers-reduced-motion` override in the site CSS.

## Files to start with

- `src/pages/PageLayout.tsx`
  - `HomeMark`
  - `HomeLightPhase`
  - mobile-menu phase handling
- `src/index.css`
  - `.brand-home-mark*`
  - `home-doorway-ignite`
  - `home-doorway-cool`
  - mobile-menu rules under `@media (max-width: 820px)`

## Verification at checkpoint

- Visually checked at a `390 × 844` mobile viewport.
- Checked the Home and Projects routes in light and dark themes.
- Confirmed the lit and unlit opening remain centered and the inactive opening has no line across its base.
- Confirmed no browser console warnings or errors.
- Confirmed `npm run build` passes.
- Confirmed `npm run lint` passes.
- Confirmed all four Vitest tests pass.
- Confirmed `git diff --check` passes.

Checkpoint result: passed.
