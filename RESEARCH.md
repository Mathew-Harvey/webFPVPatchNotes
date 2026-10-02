# Research

Survey date: 2 October 2026. Captures are in `captures/survey/`, taken in headed Chrome through Playwright, desktop 1440 by 900 and phone 390 by 844. WebGL started on the homepage, the simulator and the builder. No page showed the WebGL block.

The brief is not a source. Every line below is from a patch note, a commit, a file at one of the heads named here, or a live capture.

## Repositories

Three public repositories, plus this one.

| Repo | Role | First commit (author date, Perth) | Main on 2 Oct 2026 | Non-merge commits |
| --- | --- | --- | --- | --- |
| [Mathew-Harvey/WebFPVSimulator](https://github.com/Mathew-Harvey/WebFPVSimulator) | Simulator, physics, builder | 11 Aug 2026, `45325de` | `cbaee3f` | 925 |
| [Mathew-Harvey/WebFPVSimulator-LeaderBoard](https://github.com/Mathew-Harvey/WebFPVSimulator-LeaderBoard) | Tracks and Times | 14 Aug 2026, `8a86d7e` | `570ea3d` | 90 |
| [Mathew-Harvey/landingpage-WebFPVSimulator-](https://github.com/Mathew-Harvey/landingpage-WebFPVSimulator-) | webfpv.org, notes, wiki, stickers | 18 Aug 2026, `422cc4d` | `a9e0918` | 124 |

Total non-merge commits on those three mains: 1,139. Licence on the simulator is GPL-3.0. The landing page carries the same grant.

Clones used for this pass live in `_upstream/` and are gitignored. The maker's working copies under `Documents/dev` were not fetched, committed, or edited. Those checkouts were behind GitHub (simulator last local commit 26 Sep 2026).

Commit authors on the simulator, non-merge: Claude 770, Cursor Agent 79, Mathew Harvey 60, Mat Harvey 14, Mat 1, anupamme 1. The public credits do not list git authors. They list one pilot and the tools that pilot used. See Credits.

## What the product is

Live homepage and the simulator title, 2 Oct 2026:

- Free, no install, no account. A radio in joystick mode, or a game controller.
- Real Betaflight 4.5.1 compiled to WebAssembly. The submodule pin is `vendor/betaflight` at `77d01ba`, and that commit's `src/main/build/version.h` sets `FC_VERSION` to 4, 5, 1. The flight screen says "Connected: WASM, Betaflight 4.5.1, PID 1 kHz". The module steps at exactly 1000 Hz (`SIM_STEP_HZ` in `src/native/sim_abi.h`). The homepage FAQ says "about 1 kHz".
- Five inch card, live: "A 710 gram 6S quad at forty metres a second." The plant is `mass_kg = 0.71` (`src/native/plant.c`). The board treats forty metres a second as that blurb's top, and refuses a lap faster than the track's length at 50 m/s (`LAP_TOP_SPEED` in the board's `src/validate.js`). The same file records the fastest posted average it had measured, 22.7 m/s on 26 Sep 2026.
- Default rates are Betaflight 4.5.1 Actual: 70 deg/s at centre, 670 deg/s at full stick, no expo (`configs/rates.js`). Camera seeded at 85 degree field of view and 30 degree tilt (`configs/airframes.js`).
- Keyboard flies. Held keys do not jump to full stick. `analogMag` in `src/input/input.js`: about 0.16 at 90 ms, 0.34 from 240 ms to 750 ms, full only after 1250 ms. Throttle latches, and once the craft is airborne a release springs to hover for that pack, weight and cap. W and S are throttle, A and D are yaw, arrows are pitch and roll (`KeyW` block in the same file). The full keymap is step 6.
- The title wears a BETA stamp: "Expect bugs and rough edges. It is still being built, and it will improve."

Public story, already on the homepage, section 07: "The hard part of FPV is getting to the first lap. A quad, a radio, goggles, batteries, a charger. Hundreds of dollars and a month of crashing before any of it is fun." Then: "So I built one that asks for nothing. A tab, and the controller already on your desk." Section 08: "You must practise. Nobody gets smooth by reading about it." The brief's spine matches this page. The page is the source.

## Credits, as the simulator prints them

`src/ui/credits.js` at `cbaee3f`:

- Lede: "A browser FPV racing simulator. The controller is Betaflight. The track language comes from Track Draw. The rest is one pilot and the people who flew it until it felt right."
- Maker: andAgainFPV, YouTube `@andAgainFPV`. Note on the card: "Built this simulator, the track builder, and the public board. Orchestrated a horde of Grok and Claude along the way."
- Beta pilots, in slot order, not a ranking: Asylum, Jannes, LeStar, CrapShack.
- "The horde. Written with Grok. Built with Claude."
- RaceGOW season 5 rooms, designers named on the roll: AyyyKayyy (track 8), Cumber and Hotspur (track 5), Skittles (tracks 1 and 2), the Lego Dans (tracks 3 and 4), MrE (track 6), FPVBean (track 7). "Brought into this simulator by andAgainFPV."
- The flight-controller screen is described as a homage of Betaflight Configurator 10.10. The same paragraph says it is not that app.
- Legal line: the marks belong to their owners, the channel pictures belong to the pilots, and use here is credit, not an endorsement. WebFPV is GPLv3.

The brief spells the handle andAdgainFPV. The credits file, the YouTube link, and the live board's builder filter spell andAgainFPV.

## Timeline

Days are author dates in Perth (UTC+8), which is the calendar the patch notes use. Patch notes on the live site run from 22 Aug 2026 to 29 Sep 2026. The graph at the top of those notes was generated at heads sim `40258cd`, board `75ae0495`, site `514466b6`, and says 1,031 non-merge commits and 282,165 lines of source over 50 days from 11 Aug to 29 Sep. Counting the same way on today's mains, non-merge commits with an author date before 30 Sep 2026 Perth: simulator 848, board 72, site 124, total 1,044. The gap is commits that landed after that graph was written and still fell on 29 Sep. After 29 Sep the notes page has no new entry. The simulator's main has moved through 30 Sep, 1 Oct and 2 Oct (`cbaee3f`). The board's main is 1 Oct (`570ea3d`). The site's main is still 29 Sep, one commit past the graph (`a9e0918`, the Mantis shipping line).

Line counts were not recomputed. The figures 228,838, 23,405 and 29,922 are the graph's, at those older heads. `scripts/velocity.js` on the site is the generator. It skips vendored town code, generated files, the wiki pages, the sticker file, and the notes page itself.

### Arcs, from the commit subjects

The brief's guess was close. The history puts the world and the ink earlier than the guess, and puts cars, scoring and the manga UI in one late week.

| Arc | When | Commit to cite | What the subject says |
| --- | --- | --- | --- |
| First flight | 11 Aug 2026 | `983521b` | Stage 1 flyable shell: sticks, keyboard, crash and reset. Same day as `2f3a98c`, "compile Betaflight control loop into the module". |
| Ink, early | 11 Aug 2026 | `51bf448` | Cel shaded render stack: shading model, ink pass, world. The town look is not a September reskin. It is week one. |
| Gates as a race | 12 Aug 2026 | `18b3357` and `1a3e103` | Race gameplay, then ring aperture racing and sim clock laps. |
| Track builder | 13 Aug 2026 | `17f0f76` | "trackbuilder: a course authoring tool, isolated behind one JSON schema." |
| Product shell | 12 Aug 2026 | `acedf4f` | "Round 1: a product shell in front of the simulator." |
| Public site | 18 Aug 2026 | `422cc4d` | Landing page initial commit. The film is one canvas and a scroll. |
| Board | 14 Aug 2026 | `8a86d7e` | Leaderboard initial commit. |
| Turtle | 26 Aug 2026 | `343555c` | "Remove the crash lockout: bounce, slide, roll, and turtle." Notes of 22 Aug also announce turtle. |
| Whoop in the plant | 6 Sep 2026 | `0ce378e` | "A 65 mm whoop lives in the plant, and the five inch did not move." |
| RaceGOW | 6 Sep 2026 | `b58819f` | "A RaceGOW track is flown on a whoop." Notes of 8 Sep and 15 Sep are the public write-up: 28 inch gates, guessed tracks removed, rooms named for their designers. |
| Freestyle scoring, first cut | 1 Sep 2026 notes |  | Three positions, Off until you pick. The row said the scorer was unfinished. Trick names were hidden again on 22 Sep. |
| Town as the freestyle place | 1 Sep 2026 notes |  | "Freestyle is the town." |
| Solid world | 24 Sep 2026 notes |  | Walls, roofs, gates, trees and the train in the same 1 ms step as the ground. A crash sets you down nearby. |
| Maps, cars, chase, manga | 25 to 27 Sep 2026 | `ce80d7b`, `6d8ca51` | Build a freestyle map (25 Sep). Cars, the Tail meter, combo scoring, manga lettering and the results page (26 Sep). Menus lettered (27 Sep, `6d8ca51`). |
| Feel, in public | 28 Sep 2026 | `eb392077`, `6a3a541` | Default tune: a quarter more feedforward, after 23 feel reports ticked "slow to answer" and nine ticked "bounces back". Predicted view: draw the camera where the quad will be when the frame is on the glass. Low latency canvas actually requested. Frame pacing. |
| Partners on the door | 27 Sep 2026 | roster in `src/partners/roster.js` | Three partners named by the owner that day. See Partners. |
| After the notes | 30 Sep to 2 Oct 2026 | `cbaee3f` and the subjects under it | Whoop builder grows a cube, a hoop, a hex, a table, a chair, a banner. Five inch builder moves into the room. Menus get shorter. Each aircraft keeps its own camera, tune and PIDs. A maps-only partner is added. Freestyle builder grows flight paths, a hollow chimney, a parked wind turbine. None of this has a patch note yet. |

A week of nothing in the graph is real: the commit series has gaps on 31 Aug, 4 Sep, 5 Sep, 8 Sep, 20 Sep and 23 Sep.

## Feature inventory

Each row is something a panel could show. The source is the one to hang a balloon on. "Live" means the capture on 2 Oct 2026.

| Item | Source |
| --- | --- |
| Free, no install, no account | Homepage FAQ, live |
| Betaflight 4.5.1, WASM, GPLv3 | Homepage FAQ, `version.h` at `77d01ba`, `src/ui/ui.js` status line, GitHub licence |
| PID loop 1000 Hz | `src/native/sim_abi.h` `SIM_STEP_HZ`. FAQ says "about 1 kHz" |
| Radio in joystick mode, or a game controller. Mode 1 and Mode 2 | Notes 22 Sep. Live sim does not lead with the keyboard. Site commit `d825463` (19 Aug): "Send people to a radio or a gamepad, not a keyboard." |
| Keyboard, with ramped sticks and hover on release | `src/input/input.js` at `cbaee3f`. Notes 24 Sep for the hover change |
| Five inch, 0.71 kg, 220 mm, 6S label, 40 m/s blurb | `plant.c`, `airframes.js`, live title card |
| Rates 670/670/670 Actual, camera 30 degrees, fov 85 | `configs/rates.js`, `configs/airframes.js`. Notes 26 Sep for the OSD reading "Rates as Actual 670/670/670" |
| Gates, flags, hurdles, dive gate, up gate, launch gate, stacks, cones | Live builder. Notes  through Sep describe the earlier set. Up gate, launch gate and the in-room five inch builder are Oct commits, after the notes |
| Builder measures the lap and warns | Homepage section 02. Live builder footer: length, gates, lap, warnings. Field 60 by 40 m |
| Whoop card: 65 mm, 1S, 28 inch gates, indoors | Live title and builder chooser |
| RaceGOW season 5, eight tracks, named designers | `credits.js`, notes 15 Sep |
| Whoop room recoloured sakura, lit as a room | Notes 26 Sep |
| Freestyle town, then maps you build: cranes, containers, named gaps, roads, cars | Notes 25 and 26 Sep. Live freestyle card and builder card |
| Chase, Tail meter, combo, crash spends it | Notes 26 Sep |
| Trick names behind a switch, Off or Lines as the quiet default | Notes 22 Sep (list hidden) and 26 Sep (Scoring row, starts on Lines only). Live freestyle card: "trick names are a switch inside" |
| Board: publish, remix, times, weight on the row | Notes 24 Sep and 27 Sep. Live board header: 46 tracks, 337 times, 52 pilots, 25 maps |
| RaceGOW ranks on the fastest three consecutive laps | Notes 26 Sep |
| Ghost of your best lap | Notes 22 Aug |
| Turtle on a crash that ends on the props | Notes 22 Aug, commit `343555c` |
| Weight slider | Notes 22 Sep. Whoop weight 100 flies what 125 flew, notes 24 Sep |
| Predicted view, low latency canvas, frame pacing, auto graphics | Notes 28 Sep, commits `6a3a541` and `903f95b` |
| Stick help | Notes 29 Sep |
| Manga look can be switched off without changing the score | Notes 29 Sep |
| Practice laps are not posted. Lap times can be spoken | Notes 26 Sep |
| Wiki rewritten for a Year 10 reader, claims checked against the code | Notes 24 Sep and 27 Sep |
| Feel reports drove a tune change | Notes 28 Sep: 23 reports, nine reports |

## The whoop, three masses

This has to be settled before any balloon about the room.

1. What you see: a 65 mm ducted whoop, OSD labelled 1S and 4.2 V. Live card and notes 24 Sep. The notes say the label change did not change the physics.
2. What flies: `configs/airframes.js` sets the whoop's `simId` to 0, the five inch plant. The comment says a separate whoop plant was flown and did not feel like a whoop to the owner, so the room is scaled by `MICRO_SCALE` and the five inch plant flies inside it. The picture is a whoop through 28 inch gates. The feel underneath is the five inch.
3. What was modelled and is not selected: `plant.c` still has a whoop entry at `mass_kg = 0.0234`. Nothing selects it, per the airframe comment.
4. What a sticker says: the slap pack's chibi whoop is lettered "tiny! 16 g 1S" (live stickers page).

A balloon that says the whoop has its own weight is the 15 Sep note. The code at `cbaee3f` says that plant is no longer the one you fly. The repo wins on the fact. Whether the comic says so is a question, because saying it is a different story from showing the room.

## Partners, prices, school

Live partners page names three, and only three: Global Drone Solutions (official training partner), Mantis FPV (official retail partner), West Coast Multirotor Club (official club partner). The homepage paints their marks. `src/partners/roster.js` records that the owner named them on 27 Sep 2026.

The same file has `MAP_ONLY_PARTNERS`. One entry, Matt's Flooring Pty Ltd, added in commit `b1fc93f` on 1 Oct 2026. The comment says maps-only partners are painted in freestyle maps and are not on the front page, the board, or the partners page. The live partners page matches that: it does not list them.

Patreon is a button on the homepage, the simulator, the builder and the board. The notes give tiers. On 22 Sep: 5, 12 and 25 US dollars a month. On 26 Sep: 3, 8 and 20. The comic brief forbids pricing and commercial terms. Those numbers stay out.

A school is not named on the notes page or the five public surfaces captured here. The brief says a local school uses the sim, and that the school is not named and students are not drawn. That stands.

## Palette

From `:root` on the homepage, the notes and the stickers page:

| Token | Hex | Where it shows |
| --- | --- | --- |
| cream | `#f3ead4` | Paper, type on the dark UI |
| sakura | `#e8a8b8` | Wordmark, the FPV letters, card edges |
| amber | `#ffd45c` | BETA chip, some labels |
| mint | `#7dffb4` | Fly button, gate glow, the "just fly" fill |
| slate | `#9db3c8` | Quiet type |
| ink / deep | `#0c120e`, `#141c16` | Page ground |
| hinomaru | `#c14b52` | Stickers only |

The world palette in `src/city/vendored/core/palette.js` is a second, older set: warm paper buildings, ink `#39324f`, gate yellow `#f4c033`, blossom pinks. The live cards do not use that yellow for the gate. The gate in the builder preview and on both racing cards is a mint opening.

Spot colour for the comic: mint `#7dffb4`. It is the colour the product puts on a gate you are meant to fly through, and on the button that starts a flight. Everything else on the page is graphite and cream paper. Sakura stays in the wordmark art where a sticker already uses it. It is not a second spot colour in the balloons or the impacts.

## Art that already exists

There is no `brand/` directory in this repo or in the three clones. The slap pack is the art.

- `https://webfpv.org/stickers/` is one HTML file of inline SVG. The page says 22 stickers. Names from the live text: Chibi Whoop, Railway Town, Pen and Ink Gate, Brush Banner, Sakura Branch, Visor Strip, Manga Corner, Hinomaru Hatch, Petal Wake, Hinomaru Sea, Peeker, Wave Strip, Wave Peeker, Bubble Whoop, Livery Strip, Wave Crest, Goggle View, Cut Vinyl Wordmark, Wakaba, Ema Plaque, Pilot, Speech Bubble.
- The page says the WEBFPV lettering is set on Zen Kaku Gothic New, and that the SVGs embed that font plus Caveat Brush. The comic reader cannot ship a Japanese display font. Sticker art reused in the book has to be outlines, or redrawn with an OFL Latin font. The wordmark itself is Latin letters.
- The simulator draws its own manga hand for the wordmark, room titles, combo tiers and results (`6d8ca51`, notes 27 Sep).
- `src/ui/lettering.js` (and the site's vendored copy) draws Japanese kana as stroke art for six flight callouts and four shouts, so a machine with no Japanese font still paints them. Those glyphs do not go in the comic. Captures for the book either fly with Manga and scoring off (the 29 Sep switch, which the notes say leaves the score itself alone) or the callouts are repainted in English and the alt text says so.
- Credits marks and pilot channel pictures live under the simulator's `assets/credits`. Faces are the channels' own pictures. The credits file says using them is credit, not a claim they endorse the page. They are not a licence to draw those people in a comic.
- The homepage film is a cel shaded WebGL scroll: a quad being built, a track, Hibari Yard Tandem, a lap, the whoop room. Survey shot `home-desktop.png` caught the "Want to just fly?" dialog on top of it. A later capture for a panel should dismiss that dialog. Any CJK signage in that film gets repainted or cropped, and the alt text says so.

## Contradictions

| Topic | A | B | Which one the comic uses if we letter it |
| --- | --- | --- | --- |
| Handle | Brief: andAdgainFPV | Credits, YouTube, live board: andAgainFPV | Public spelling, unless you say otherwise. Asked below. |
| Commit count | Notes: 1,031 through 29 Sep | This count: 1,044 non-merge before 30 Sep Perth, 1,139 on today's mains | Do not letter the number. The graph is a snapshot at heads `40258cd`, `75ae0495`, `514466b6`. |
| Notes vs the sim | Notes stop at 29 Sep | Sim main is 2 Oct, board main is 1 Oct | Panels show the live UI. A balloon about a feature added after 29 Sep needs the commit, not a note that does not exist. |
| Loop rate | FAQ: about 1 kHz | `SIM_STEP_HZ` 1000 | "1 kHz" is the accurate short form. "About" is the FAQ being gentle. |
| Whoop physics | Notes 15 Sep: its own motors, weight and camera. Sticker: 16 g. Unused plant: 23.4 g | `airframes.js` at `cbaee3f`: five inch plant, room scaled, 1S is a label | Show the room and the label. Do not letter a whoop mass. |
| "Living room" | Sim card: a track that fits in a living room | Builder chooser: a ten by twelve metre hall | The hall size is the builder's. The card is the invitation. |
| Builder filter spelling | Credits: LeStar, CrapShack | Live board filter: "Le Star", "Crapshack" | Use the credits spelling if a name is cleared. |
| Kana on the glass | The product draws Japanese callouts on purpose | This book is English only | English callouts, or the manga layer off. |
| Forty metres a second | Title blurb, and the board's comment that the five inch tops out there | Fastest posted average the board had measured: 22.7 m/s | Do not letter 40 m/s as a lap. It is the blurb's top. |
| Patreon prices | 22 Sep notes and 26 Sep notes disagree, and both are prices | Brief: no pricing | Out. |
| Matt's Flooring | In the sim roster as maps-only | Not on the live partners page | Out, unless you confirm and the live site is showing the mark. |

## Image opportunities

Shots that already exist as UI, so a panel can be a real capture rather than an invention.

- Cold open: the race field behind the four cards (`sim-desktop.png`). Green gate, tree line, wordmark, BETA stamp. Dismiss nothing, or crop the cards and fly.
- First gate: a five inch lap on the MultiGP field. Has to be flown. The title only shows the field.
- Gear pile: no product shot. This page is drawn, not captured. The homepage sentence is the source for the words. No invented quad.
- The tab: a browser window on `webfpv.org/sim/`, the BETA line, then the field. Real.
- Builder: the chooser (`builder-desktop.png`) and, once the dialog is closed, the plan with a dive gate, a flag and a hurdle. The tool list is already in English.
- The board: the sheet (`board-desktop.png`). Handles are visible. Only cleared ones stay. The rest are blurred.
- The town: the freestyle card's yard, with English gap labels (crane, water tower, footbridge, billboard, container tunnel). A flown chase comes later.
- Cars: Hibari Yard Tandem is named on the homepage film and in the 26 Sep notes. Fly it.
- The room: the whoop card's sakura hall and a dive gate on a short pipe. Signage checked for kana before it is inked.
- Feel: the settings rows for predicted view, low latency, rates, and the turtle prompt. UI captures, not flight.
- Last page: the same "just fly" control the homepage already uses, pointed at `https://webfpv.org/sim/`.
- Stickers worth reusing as motifs, after the font is outlined: Pen and Ink Gate, Goggle View, Bubble Whoop, Chibi Whoop, Pilot. The Pilot sticker is a drawing, not a portrait of a real person, and it should be checked before it stands in for anyone.

## Proposed chapters

The homepage is already this book in nine short sections. The long form follows it, with the history filling the pages. Room is left for chapters after 2 Oct, because the notes have already fallen behind the sim.

1. Cover and cold open. The field, the wordmark, a gate that comes too fast. Date on the chapter: the sim as it flies now.
2. The problem. The gear, the month, the money. Words from homepage section 07 and from you. No product UI, because the product is the answer.
3. A tab. 11 Aug 2026. Betaflight in the page, 1000 Hz, a keyboard or a radio, the first crash and the reset.
4. Draw a track. From `17f0f76` to the live builder. Gates, flags, hurdles, a dive, the lap length changing as you place them.
5. The line. Racing, the camera angle, a time on the board. The board is 14 Aug 2026 onward. The live sheet is the picture.
6. The town. The cel world from week one, then maps, gaps, cranes, containers.
7. The chase and the combo. Cars, the Tail meter, a line that pays, a crash that spends it. 26 Sep 2026.
8. The room. 65 mm on the glass, 28 inch gates, RaceGOW, the sakura hall. The plant question stays out of the balloons unless you want it said.
9. Feel. Turtle, the tune the reports changed, predicted view, the keyboard that refuses to be a switch. The unglamorous week.
10. The point. Homepage section 08. The last page is still a comic page, and it hands over `https://webfpv.org/sim/`.
11. One page, in the book, that shows how the next chapter gets added. That is the maintainer page from step 8, drawn as a page rather than written as a manual.

## What this pass did not do

No storyboard, no flight harness, no ink, no reader. Those wait on the answers. The survey script is `tools/survey/shoot.js`. It is a look at the doors, not the flight captures step 6 asks for.
