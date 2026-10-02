# WebFPV, the comic

A manga about [WebFPV](https://webfpv.org/sim/), the free browser FPV simulator, in the words of andAgainFPV, the pilot who built it. Chapter 1, Fly decent, is the book so far: the question, the yes, who it is for, the builder, the room that nearly stopped it, the testers, and the notes so far. A chapter is added for each release worth a story.

Read it at https://mathew-harvey.github.io/webFPVPatchNotes/ once GitHub Pages is serving `/docs`, or open `docs/index.html` in a browser.

## How it looks

The book is drawn the way the first screen of [webfpv.org](https://webfpv.org/) is drawn. A page is paper with its panels cut out of it, at the front door's margin, gutter and border (3.5, 2.2 and 0.65 per cent of the page's short side), with leaning cuts and panels that bleed off the edge. In the panels is the simulator itself, in its own colours, shot through its own renderer. Where the quad is alone the page is the front door's studio: paper for the ground and the sky, the quad with an ink line round it, and its shadow printed as a 45 degree dot tone. Titles and sound effects are lettered in the simulator's hand, drawn over the reader's own heaviest system font, so no font ships with the book. Focus lines and speed lines are still, drawn from a seed, never animated. The palette is the simulator's: cream, sakura, amber, mint, slate, ink.

On a wide window the book opens as spreads, the cover alone, and turns a leaf at a time. On a phone it is one page at a time. A click, a drag, a swipe, the arrow keys, space, Home and End turn it. Contents jumps to any page, and Read as text gives every word in reading order. The last page has the one link out, FLY NOW, to https://webfpv.org/sim/.

## The files

| Path | What it is |
| --- | --- |
| `docs/index.html` | The reader. |
| `docs/layout.js` | Page geometry: the cut tree, gutters, borders and bleeds. |
| `docs/chapters.js` | The book, as data. Every word on every page is here, tied to its panel. The comment at its top is the schema. |
| `docs/assets/chapters/<id>/` | The pictures, `@1x` and `@2x` WebP, each with a JSON sidecar saying which world, commit, camera and crop it came from. |
| `tools/shoot/` | The capture rig. `rig.js` runs the simulator in headless Chromium and holds a camera and a pose; `<id>.js` is a chapter's shot list; `run.js` shoots it. |
| `tools/ink/panels.js` | Frames into pictures: colour panels cut to their panel, paper panels composited with their dot tone. |
| `tools/check/` | `text.js` and `read.js`, below. |
| `STORY.md` | The interview, verbatim. |
| `STORYBOARD.md` | The page plan, and the source of every lettered line. |
| `RESEARCH.md` | Dates, commits and what the repositories say. |

## Add a chapter

1. Append one object to `CHAPTERS` in `docs/chapters.js`.
2. Write `tools/shoot/<id>.js`: a world for each place, and a shot for each panel with a picture.
3. Shoot and ink it, below.
4. Give every lettered line a row in the FACTS table in `STORYBOARD.md`, and run the checks.

## Shoot and ink

Raw frames go to `captures/`, which is not served and not committed. The simulator is read only: serve a checkout of it, and the rig points a browser at it.

```
cd ../WebFPVSimulator && PORT=8765 node scripts/serve.js
SIM_DIR=../WebFPVSimulator node tools/shoot/run.js c1
node tools/ink/panels.js c1
```

`run.js c1 p3 p4-a` shoots just those, and `--scale=0.4` shoots small for a first look. The front door's shot needs the site served too (`LANDING_URL`, default http://127.0.0.1:8766/), and the board's is the live board. For a sandbox: `PW_CHROMIUM` names a Chromium, `THREE_DIR` a local copy of three@0.160.0 for a browser that cannot reach the CDN, and `SHOOT_GL=swiftshader` renders without a GPU. The rig needs Playwright (`npm install --prefix tools/survey`) and the ink step needs sharp (`npm install --prefix tools/ink`).

## Checks

```
node tools/check/text.js
node tools/check/read.js
```

`text.js` rejects an em dash, an en dash and CJK in the book and the docs, and checks that every page lays out, every panel has an alt, every picture is on disk, every word sits in a panel, and the book ends on its one link out. `read.js` opens the book in Chromium on a desk and a phone, walks every view, and fails on a picture that did not load, a page error or a page wider than the window. It leaves a screenshot of every view for a person to look at.

## Licence

The comic is CC BY-ND 4.0, copyright Mathew Harvey (andAgainFPV). See LICENSE. The simulator, the board and the site are separate GPL-3.0 programs and are not in this repository.
