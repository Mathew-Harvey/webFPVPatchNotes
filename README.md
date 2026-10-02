# WebFPV

A public comic about [WebFPV](https://webfpv.org/sim/), the free browser FPV simulator. Chapter 1, The gate, is the book so far. Later chapters append to the same file.

Open `docs/index.html` in a browser, or read it from GitHub Pages at https://mathew-harvey.github.io/webFPVPatchNotes/ once Pages is serving `/docs`.

The words are on the page, in caption boxes. The pictures stay in the colours of the sim. One page shows at a time. It turns with a click, a drag, the arrow keys, space, Home, End, and a swipe. The last page has one link, FLY, to https://webfpv.org/sim/.

## Add a chapter

1. Append one object to the `CHAPTERS` array in `docs/index.html`.
2. Put the pictures in `docs/assets/chapters/<id>/` as `<panel>@1x.webp` and `<panel>@2x.webp`.
3. Every panel needs an id, an alt, and a transcript. A picture panel also needs a src. A factual balloon needs a source in the storyboard. The words stay in the HTML. They are not baked into the pictures.

The note at the bottom of `docs/index.html` says the same thing.

## Recapture and re-ink

Raw frames stay in `captures/`, which is not served and not committed. The simulator clone in `_upstream/` is read only.

```
node tools/fly/run.js c1
node tools/ink/ink.js
```

`tools/ink` needs `sharp` (`npm install --prefix tools/ink`). `node tools/ink/color.js` writes the colour panels the book shows.

## Checks

```
node tools/check/text.js
node tools/check/read.js
```

`text.js` rejects an em dash, an en dash, and CJK in the book and the docs. `read.js` opens the book in Chrome. It needs Playwright from `tools/survey`.

## Licence

The comic is CC BY-ND 4.0, copyright Mathew Harvey (andAgainFPV). See LICENSE. The simulator, the board, and the site are separate GPL-3.0 programs and are not in this repository.
