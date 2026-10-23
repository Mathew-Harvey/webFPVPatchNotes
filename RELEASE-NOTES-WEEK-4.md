# Release notes, 20 to 23 October 2026

Written from what reached `main` of the simulator (pull requests 98 to 134 and the owner's direct pushes, linked as commits), the board (28 to 34) and the front page (21 to 23), read on 23 October 2026. Times are Perth time (AWST), as the public notes page uses. Anything on a `test` branch or in an open pull request is left out. Most of it has been checked by scripts and a headless browser only.

The book's version of these notes is chapter 3, Three houses, in `docs/chapters.js`. This file is the long form. Every bullet ends with where it came from: the simulator is `Mathew-Harvey/WebFPVSimulator`, the board is `Mathew-Harvey/WebFPVSimulator-LeaderBoard`, the front page is `Mathew-Harvey/landingpage-WebFPVSimulator-`.

## Maps

- **Heads' house (20 and 21 October).** A new freestyle world at Nick's scale: the garage and basement from the owner's stills, both streets and the houses across them. It was made official with the sponsors' signs, Infinity Loops logos and ten 90% patches to find, and went to `main` with Heads' OK on 21 October. Simulator commits deb0593, a26fa8c and e6ed19e.
- **Manga Heads (21 October).** Heads walks his garage between four spots, turns his head and waves when the quad comes close, and shouts when you fly by. The lines he shouts are placeholders. Simulator PR 105.
- **Fly under the parked cars (22 October).** Heads' cars are open underneath, and an eleventh 90% patch, "Under the car on the drive", is hidden there. Mat's ask: "you need to be able to fly under the parked cars in Heads' yard... good spot to hide a 90% too". Simulator PR 127.
- **Joshua Bardwell's house (21 October).** A new world, outside only and life size, for the five inch. Joshua Bardwell's OK for his house on the simulator is recorded in simulator commit cde1dd7. Simulator commit 965689f.
- **Nick Burns' patio table (20 October).** Land on the table while Nick sits there and he reads out the flight: "3 oh 4 in the flight time, 3.47, 46 battery voltage.", then, after a pause, "Ah, not 6 7 again." The pergola now faces the back fence. Mat's ask: "Also when you land on the outdoor table with nick sitting there, you should get nick saying". Simulator PR 102.
- **A framed picture in Nick's upstairs hall (23 October).** Simulator PR 134.

## Mini games

- **JB stickers (22 October).** Twelve stickers round Joshua Bardwell's yard: the porch, the porch table, the chimney, the east window, the air conditioner, the back stoop, the woodshed, the firewood, the doghouse, the lean to, the wheelbarrow and the mailbox. A find plays one of eleven Joshua Bardwell clips, shuffled, with no repeat until all have played. Simulator PR 123 and commit 0720cf9.
- **Goats (22 October).** Five goats graze in Joshua Bardwell's field and run when the craft is within 24 m. A catch within 1.3 m plays Nick's "Boom Shakala!" clip; the goat hops, vanishes and comes back somewhere else four seconds later. Goats are not solid. Simulator PR 125 and commit ded2b2a.
- **Nick's voice (22 October).** Nine clips on Nick Burns' house: a laugh on a hard crash (once every 20 seconds), "Holy catfish, what's going on?" when he is hit, "Get it just right" on a table landing, "Stickers" on every sticker find of his, and a line of his own when the craft is within a metre. Nick Burns and Joshua Bardwell are both happy for their recorded voices to be used. Simulator PR 123 and commit 7d8e8e9.
- **ALL N! (22 October).** Find the last sticker of a map's set and the screen says ALL, with the number, and "Every sticker found". It shows once per browser per map. Simulator PR 118.

## Career

- **Fifty lessons in ten chapters (22 October).** Career is the first card on the gate, with medals, briefings and a coach. The chapters are First Hover, Angle Mode Navigation, Switching to Acro, Big Gaps, Flips and Rolls, Segmented Flips and Rolls, Gates, Racing, Freestyle and Pro Licence. Lesson one, Lift Off, asks you to lift the quad off the pad, hold it between one and three metres for five seconds, then land. "I already fly: open every chapter" opens them all; otherwise they open in order. Simulator PR 119.

## Partners

- **weBLEEDfpv (20 October).** A fourth partner, the USA micro drone partner, an FPV company in Syracuse, New York. Their sign is in every built map, the town's wall and Nick's garage (simulator PR 101), on the board's partners page, masthead and footer (board PR 30) and in the front page's partner rows (front page PR 21).

## Also

- **3D mode (21 October).** Reversible motors, off by default, a switch at the top of Settings. Simulator PRs 106 and 107.
- **Defaults follow the tunes pilots fly (21 October).** Air grip 100 to 110 on the five inch, from 37 pilots' tunes, and Motor power 100 to 90 on the whoop, from 11 pilots' tunes, read from the board's flight feel tickets. Simulator PR 110.
- **Air grip reaches 175 (22 October).** Simulator PR 126 and board PR 34.
- **The whoop is drawn from Mat's Fractal65 model (22 October).** Simulator PR 121.
- **Nick's and Heads' houses are flown on the whoop (23 October).** Simulator PR 130.
- **Sponsor signs on the houses are a quarter smaller, each brand only once (23 October).** Mat's ask: "make the sponsors logos a bit smaller, and only once, it's a bit full on". Simulator PR 131.
- **The camera angle slider reaches 60 degrees (23 October).** Simulator PR 128.
