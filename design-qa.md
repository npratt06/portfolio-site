# Design QA

- Source: `/Users/natepratt/.codex/generated_images/019f81a6-6bde-7442-8374-f75523a83e50/exec-2c4a34f6-8907-434d-bf04-f6c13a450d60.png`
- Implementation screenshot: `/private/tmp/portfolio-home-door-yellow-open.png`
- Closed-state screenshot: `/private/tmp/portfolio-home-door-yellow-closed.png`
- Combined comparison: `/private/tmp/portfolio-home-door-yellow-comparison.png`
- Viewport: 390 × 844
- State: light theme; Home route for the open-door state, Projects route for the closed-door state

## Comparison

- Full view: existing responsive layout remains intact; the selected outlined-home direction replaces the NP mark without changing the header footprint.
- Focused header view: the door is centered on the house's visual axis and its baseline now meets the house floor. The regular-weight house and bold 12px door remain proportionate to the adjacent sun and menu icons.

## Comparison history

- Earlier P2 finding: the 10px door sat two pixels below the house floor, its rotation pivot was outside the visible door edge, and the light-weight shell made the combined mark look faint and optically offset.
- Fix: raised the doorway by 2px, moved the hinge to the door glyph's visible edge, changed the house from light to regular weight, and changed the door states to bold 12px Phosphor icons.
- Post-fix evidence: the final focused comparison shows the closed door centered and seated on the house floor; the open state uses a dedicated open-door icon after the swinging panel clears, avoiding the previous overlapping shape.
- Later P2 finding: at native size, the closed and open outline glyphs still shared too much of the same silhouette, making the state change easy to miss.
- Fix: kept the swinging panel visible, moved it 3px clear of the doorway, and revealed a filled doorway with a short light-on settle near the end of the 340ms swing.
- Post-fix evidence: the focused spatial comparison shows a centered outlined door when closed and a visibly filled doorway with a separated panel when open, while the house frame remains stationary.
- Later P2 finding: the 3px separation made the panel translate across the threshold instead of reading as a hinged rotation, and pulled the active mark off its optical center.
- Fix: removed all lateral translation, pinned the transform origin to the visible left hinge edge, and reduced the swing to 64 degrees with a slightly deeper perspective. The stationary doorway remains exactly centered beneath the roof peak.
- Post-fix evidence: the focused hinge comparison shows matching centerlines in both states, with the moving layer narrowing around a fixed left edge rather than sliding sideways.
- Later P2 finding: the green doorway light bled through the outline-only swinging panel, and the doorway centering was not explicit enough to verify optically.
- Fix: centered the 12px doorway with equal left/right insets and auto margins, changed the backlight to warm yellow, and built the swinging panel from an opaque background-colored fill beneath its green outline.
- Post-fix evidence: the measured house and doorway centers both resolve to x=39px at the 390px viewport, the yellow light remains behind the panel, and the open panel blocks the glow in both light and dark themes.

## Interaction and quality checks

- Confirmed the door is closed off Home and opens when the brand link navigates back to Home.
- Confirmed the route-driven transition reverses through the same 360ms easing curve.
- Confirmed the icon remains legible in light and dark themes.
- Confirmed mobile menu interaction still opens and navigates successfully at the target viewport.
- Confirmed no browser console warnings or errors.
- Confirmed build, lint, and all four tests pass.
- Confirmed no `prefers-reduced-motion` overrides remain in site source.

final result: passed
