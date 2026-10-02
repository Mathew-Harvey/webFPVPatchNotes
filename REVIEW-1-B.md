# Review 1 B

Reviewer B, truth. Chapter 1 as shipped.

## What I checked

- `STORYBOARD.md`, the chapter 1 rows, "Slice as shipped", and FACTS.
- The `CHAPTERS` array in `docs/index.html`: alt text, the balloon, transcripts, the noscript fallback, and the screen-reader sources line.
- The sidecars in `docs/assets/chapters/c1/*.json`, the inked panels, and the source frames those sidecars name, including HUD crops.
- The reader shots `desktop-cover.png`, `desktop-spread.png`, `desktop-end.png`, and `phone-p2.png`.

## Must-fixes

None.

## Notes

The only balloon is "Too fast." on `c1-p2-c`. No other balloon. The chapter does not letter a whoop mass, a lap speed, a commit count, a school, a child, or VelociDrone. The screen-reader line repeats the slice (commit `cbaee3f`, WCMRC Round 5, angle mode, five inch, manga and scoring off) and adds no forbidden claim.

Alt numbers match the glass. Page 1 reads 14 m, 8 km/h, 2.0 m, ANGLE, pack 25.1 volts; then 12 m, 12 km/h, 1.3 m, still level; then 10 m, 30 km/h, 0.3 m, with the faint crash notice cropped off and speed lines at the edges. The miss reads 5 m, 12 km/h, 4.7 m, and 1 bounce, with the gate edge and a red wrong-side marker at the bottom of the capture. The tipped frame reads 11 m, 7 km/h, and 6.4 m. A trackside building is in that frame, and Report bug and Pause stay upright. The sitting frame reads 9 m, 0 km/h, ANGLE, the gate ahead and tilted, with no crash sentence.

The cover is the gate at 10 m. On `captures/c1/debug_a1.png` the lines "Crashed, set down nearby." and "R restarts the run." sit above the crop. The label through the gate glow is "Weight 100%". The alt does not state a mass. That wider frame reads 26 km/h, which is what "fast approach" rests on.

`c1-p3-a@2x.webp` is the same file as `c1-p1-a@2x.webp`. The alt says it is the opening approach again, not a second liftoff. The empty panel is labelled Next, and the mint control is FLY to https://webfpv.org/sim/. Sidecars match the slice: `tracks/json/trk-a75a1bc4.json`, commit `cbaee3f`, and the named source files.
