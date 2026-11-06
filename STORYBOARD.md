# Storyboard

Date: 2 October 2026. Voice is Mat, first person, plain. The interview is in STORY.md, verbatim; the words below are his with the typos cleaned, and they add no claim. The copy of record for every word and where it sits is `docs/chapters.js`. This file says where each lettered line comes from.

Chapter 1 is the whole origin, told once: the question, the yes, who it is for, the builder, the feel that nearly stopped it, the testers, the line, the notes so far, and a last page that points at the sim and leaves the next chapter blank on purpose (STORY.md, How the book uses this). Later chapters are one release, or one chunk of features, each (STORY.md section 5).

Flight is from the goggles or from a camera beside the quad. No face. No children. No classroom. No school name. No other sim is named: his words are "a paid sim", and nothing is ranked.

## The look

The front door's first screen, webfpv.org, sets it (the owner's ask on 2 October 2026). Paper pages with the panels cut out, ink borders, leaning gutters, panels that bleed. The simulator's own pictures in colour. The front door's studio where the quad is alone: paper ground and sky, an ink line round the quad, its cast shadow as a 45 degree dot tone. Titles and sound effects in the simulator's lettering hand; narration in typeset boxes; tags as the front door's boxed eyebrows. Still focus lines and speed lines. No Japanese writing anywhere, no kana callouts: manga and scoring are on in the simulator for its ink, and freestyle scoring is off, so nothing is lettered on its glass.

## Chapter 1. Fly decent

Sixteen pages: the cover and fifteen. Pictures are shot by `tools/shoot/c1.js` at simulator commit `3628663` and inked by `tools/ink/panels.js`; each picture's sidecar JSON records its world, camera, pose and crop. Five inch on WCMRC Round 5 (`tracks/json/trk-a75a1bc4.json`), whoop in RaceGOW Season 5 Track 1 (preset `racegow5-track1`), the town, Hibari Yard Tandem, the track builder, the firmware bench, the title screen, webfpv.org and the live board.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, FLY DECENT, the line under them, andAgainFPV. Three chapter panels: The gate, THE QUESTION; The builder, THEIR GAME; The room, THE FEEL. Each links to its page. | The quad on paper, banked, its dot shadow under it. A gate, the builder's plan, the room. |
| 1 | Off the pad | VRRRM, FSHOOM | From the pad; the lift off; nose down; the streak to the gate. |
| 2 | Too fast | KRAK!, "Too fast." | The gate too close; the hit, in negative; the tumble; down on the grass. |
| 3 | Title | FLY DECENT, F-01 | The quad where it came down, on paper. |
| 4 | The question | F-02, F-03 | A blank page and one small quad; closer, the thought; the lens, an eye strip. |
| 5 | Yes | F-04, WHUMMM, YES., F-05 | The firmware bench; the props spin up; the climb off the page. |
| 6 | A project | F-06, F-07 | The quad races low on paper; then the colour field. |
| 7 | For me | F-08, F-09, F-10 | Hanging calm by a gate; level and slow; through with room to spare. |
| 8 | For anyone | F-11, F-12, F-13, F-14 | The title screen; through a gate; black panel. |
| 9 | Their game | F-15, F-16 | The builder's plan, its palette, its footer. |
| 10 | Their game, flown | F-17, F-18 | Over the dive gate; the double stack; the town. |
| 11 | The feel | F-19, F-20, F-21 | The room; the whoop in the lit gate; the gate from the goggles; black panel. |
| 12 | The testers | F-22, F-23, F-24, F-25 | Black panel with the names; a hard turn at a gate; the tuning rows. |
| 13 | The line | F-26 | Straight through the last gate, full bleed. |
| 14 | The notes so far | N-01 to N-10 | One small panel for each note. |
| 15 | Next | F-27, Chapter 02, F-28, FLY NOW | A calm approach; the blank panel. |

Sound effects (VRRRM, FSHOOM, KRAK!, WHUMMM) and "Too fast." are SCENE: the moment in the panel, not a claim. The chapter panels' names on the cover and "THE NOTES SO FAR" are the book's own headings.

## FACTS

| Id | Line | Source |
| --- | --- | --- |
| F-01 | "Mat. andAgainFPV. A pilot since 2020." | STORY.md section 7. The year is his answer, not a commit. The handle as the credits and the live board spell it. |
| F-02 | "It started as curiosity." | STORY.md section 1. |
| F-03 | "Could I compile Betaflight and put it in a virtual world, in a browser, and fly decent?" | STORY.md section 1. |
| F-04 | "Betaflight 4.5.1, compiled to WebAssembly. The PID loop runs at 1 kHz." | The simulator: the status string in `src/ui/ui.js`, `SIM_STEP_HZ` 1000 in `src/native/sim_abi.h`, `FC_VERSION` 4.5.1 in the pinned `version.h`, and its CLAUDE.md: Betaflight vendored and compiled to WASM. |
| F-05 | "YES." and "11 August 2026" | STORY.md section 1, the day the answer was yes. Simulator commits `2f3a98c` and `983521b`, author date 11 August 2026, Perth (RESEARCH.md). |
| F-06 | "Soon as I realised the answer was yes, I decided to see how far we could go." | STORY.md section 1. |
| F-07 | "It was then a project." | STORY.md section 1. |
| F-08 | "First it was for me." | STORY.md section 2. |
| F-09 | "I wanted a sim that was super easy to fly in." | STORY.md section 2. |
| F-10 | "For my kids, and for me." | STORY.md section 2. Words only. No child is drawn. |
| F-11 | "Then I realised that most school kids have no money, and usually can't install stuff on their computers, so they have no sim to fly in." | STORY.md section 2. No school name, no classroom. |
| F-12 | "Then I wanted it to be accessible for all the people that could not buy a paid sim, or what not." | STORY.md section 2. His noun, not a ranking. |
| F-13 | "FREE. NO INSTALL. NO ACCOUNT." | webfpv.org, live 2 October 2026: "Free &#183; no install &#183; no account". |
| F-14 | "A tab, and the controller already on your desk." | webfpv.org, live 2 October 2026, the same sentence. |
| F-15 | "The part I'm proudest of is the map and track building system." | STORY.md section 4. |
| F-16 | "13 August 2026" | Simulator commit `17f0f76`, the track builder (RESEARCH.md). |
| F-17 | "So people could create their own game." | STORY.md section 4. |
| F-18 | "Freestyle is the town." under Notes, 1 September | Patch notes, 1 September 2026, verbatim. |
| F-19 | "What nearly made me quit..." | STORY.md section 4. |
| F-20 | "...was trying to understand the feel difference between real life whoops and the sim." | STORY.md section 4. No mass is lettered. |
| F-21 | "IT'S DIFFERENT." and "BUT HOW?" | STORY.md section 4: "its different, but HOW?" |
| F-22 | "The testers found bugs and gave feedback on the flight feel, in a chat channel." | STORY.md section 3. |
| F-23 | ASYLUM, JANNES, LESTAR, CRAPSHACK | The simulator's credits (`src/ui/credits.js`), as STORY.md allows. |
| F-24 | "The default tune has a quarter more feedforward. Slow to answer the stick was the most ticked box on the feel form, on 23 reports." under Notes, 28 September | Patch notes, 28 September 2026, verbatim. |
| F-25 | "That helped me direct my development effort." | STORY.md section 3. |
| F-26 | "If it feels like a real quad, the rest is easy." | The maker's line, given with the brief for the book. |
| F-27 | "The game will keep building." | STORY.md section 5. |
| F-28 | "WHAT'S COMING NEXT?" | STORY.md section 5: "whats coming next?" The panel under it is blank on purpose. |

The notes page. Each is one line under its date. A dated line from the patch notes is quoted from them; the three dates before the notes begin (22 August) are the repositories' own first commits.

| Id | Date | Line | Source |
| --- | --- | --- | --- |
| N-01 | 11 August | "Betaflight compiled into the page. First flight." | Simulator commits `2f3a98c` and `983521b` (RESEARCH.md). |
| N-02 | 13 August | "The track builder." | Simulator commit `17f0f76` (RESEARCH.md). |
| N-03 | 14 August | "The public board of shared courses and lap times." | The board's first commit, `8a86d7e` (RESEARCH.md). |
| N-04 | 18 August | "webfpv.org, the front door." | The site's first commit, `422cc4d` (RESEARCH.md). |
| N-05 | 22 August | "Turtle. A ghost to chase." | Patch notes, 22 August 2026: "Turtle." and "A ghost to chase". |
| N-06 | 1 September | "Freestyle is the town." | Patch notes, 1 September 2026. |
| N-07 | 15 September | "RaceGOW Season 5 went in, each track named for the person who drew it." | Patch notes, 15 September 2026. |
| N-08 | 24 September | "The solid world is in the physics." | Patch notes, 24 September 2026. |
| N-09 | 26 September | "Cars drive the roads. Chase a car." | Patch notes, 26 September 2026. |
| N-10 | 2 October | "Flight paths: fourteen figures, a power loop and a Matty flip among them." | Patch notes, 2 October 2026. |


Week two of the notes was six pages after "The notes so far", 3 to 11 October 2026, from 11 to 20 October. On 20 October chapter 2 retold that week and the next as a story, and the six pages came out of chapter 1; their rows are kept below as the record, and so are their pictures, which chapter 2 hangs in places. Every line is read from the code on main of the simulator, the board and the front page, as RELEASE-NOTES-WEEK-2.md sets out, and is not a quotation of webfpv.org/notes, which stops at 2 October. N-11 to N-16 are the CommunityGow page, N-17 to N-22 tunes and the guide, N-23 to N-28 building, N-29 to N-34 flying, N-35 to N-40 looks and fixes, N-41 to N-46 also this week, in page order, and "New this week: CommunityGow" on the cover.

## Pictures

Every picture is the simulator, or the board or the site, drawn by its own code. Nothing is painted over. Where a picture shows a page of the live site or the board, the partners' marks and pilots' handles in it are the ones that page already prints, and nothing from it is lettered.

The week's CommunityGow and Tunes pictures are a board run from a checkout and seeded by `tools/shoot/seed-board.mjs`: the club, its pilots, their times and the three tunes are examples made up for the page, because the live board had no club and no tune when they were taken. The official track on the stacks page is the live board's own. Two flight pictures hold a real state on screen for the frame: the Nice flying card raised as two flown tracks raise it, and the words the reset path puts up, Auto reset. The Advanced picture is cropped above the GPU row and left of the reading beside it, because on the machine that took it both describe a software renderer.

| Panel | Shot | World |
| --- | --- | --- |
| `c1-cover` hero | `cover-hero` | Five inch, WCMRC Round 5, on paper |
| `c1-cover` w1 | `cover-w1` | Five inch, WCMRC Round 5 |
| `c1-cover` w2 | `cover-w2` | Track builder |
| `c1-cover` w3 | `cover-w3` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p1` a | `p1-a` | Five inch, WCMRC Round 5 |
| `c1-p1` b | `p1-b` | Five inch, WCMRC Round 5 |
| `c1-p1` c | `p1-c` | Five inch, WCMRC Round 5 |
| `c1-p1` d | `p1-d` | Five inch, WCMRC Round 5 |
| `c1-p2` a | `p2-a` | Five inch, WCMRC Round 5 |
| `c1-p2` b | `p2-b` | Five inch, WCMRC Round 5 |
| `c1-p2` c | `p2-c` | Five inch, WCMRC Round 5 |
| `c1-p2` d | `p2-d` | Five inch, WCMRC Round 5 |
| `c1-p3` a | `p3` | Five inch, WCMRC Round 5, on paper |
| `c1-p4` a | `p4-a` | Five inch, WCMRC Round 5, on paper |
| `c1-p4` b | `p4-b` | Five inch, WCMRC Round 5, on paper |
| `c1-p4` c | `p4-c` | Five inch, WCMRC Round 5, on paper |
| `c1-p5` a | `p5-a` | Firmware bench |
| `c1-p5` b | `p5-b` | Five inch, WCMRC Round 5, on paper |
| `c1-p5` c | `p5-c` | Five inch, WCMRC Round 5, on paper |
| `c1-p6` a | `p6-a` | Five inch, WCMRC Round 5, on paper |
| `c1-p6` b | `p6-b` | Five inch, WCMRC Round 5 |
| `c1-p7` a | `p7-a` | Five inch, WCMRC Round 5 |
| `c1-p7` b | `p7-b` | Five inch, WCMRC Round 5 |
| `c1-p7` c | `p7-c` | Five inch, WCMRC Round 5 |
| `c1-p8` a | `p8-a` | Title screen |
| `c1-p8` b | `p8-b` | Five inch, WCMRC Round 5 |
| `c1-p9` a | `p9-a` | Track builder |
| `c1-p9` b | `p9-b` | Track builder |
| `c1-p9` c | `p9-c` | Track builder |
| `c1-p10` a | `p10-a` | Five inch, WCMRC Round 5 |
| `c1-p10` b | `p10-b` | Five inch, WCMRC Round 5 |
| `c1-p10` c | `p10-c` | The town |
| `c1-p11` a | `p11-a` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p11` b | `p11-b` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p11` c | `p11-c` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p12` b | `p12-b` | Five inch, WCMRC Round 5 |
| `c1-p12` c | `p12-c` | Firmware bench |
| `c1-p13` a | `p13` | Five inch, WCMRC Round 5 |
| `c1-p14` n1 | `n1` | Five inch, WCMRC Round 5, on paper |
| `c1-p14` n2 | `n2` | Track builder |
| `c1-p14` n3 | `n3` | The board, live |
| `c1-p14` n4 | `n4` | webfpv.org |
| `c1-p14` n5 | `n5` | Five inch, WCMRC Round 5 |
| `c1-p14` n6 | `n6` | The town |
| `c1-p14` n7 | `n7` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p14` n8 | `n8` | The town |
| `c1-p14` n9 | `n9` | Hibari Yard Tandem |
| `c1-p14` n10 | `n10` | Five inch, WCMRC Round 5 |
| `c1-p14b` n1 | `w-cg1` | The board, example club |
| `c1-p14b` n2 | `w-cg2` | The board, example club, phone |
| `c1-p14b` n3 | `w-cg3` | Whoop builder, RaceGOW Season 5 Track 3 |
| `c1-p14b-2` n1 | `w-cg4` | The board, example club, phone |
| `c1-p14b-2` n2 | `w-cg5` | The board, example club, phone |
| `c1-p14b-2` n3 | `w-cg6` | The board, example club, phone |
| `c1-p14b2` n1 | `w-tu1` | Quad screen, example tune |
| `c1-p14b2` n2 | `w-tu2` | Quad screen |
| `c1-p14b2` n3 | `w-tu3` | The board, example tunes |
| `c1-p14b2-2` n1 | `w-tu4` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p14b2-2` n2 | `w-tu5` | Bundle instructions, RaceGOW Season 5 Track 3 |
| `c1-p14b2-2` n3 | `w-tu6` | Five inch, WCMRC Round 5 |
| `c1-p14c` n1 | `w-bd1` | Five inch, WEBFPV in letter gates |
| `c1-p14c` n2 | `w-bd2` | Five inch, WCMRC Round 5, first gate Invisible |
| `c1-p14c` n3 | `w-bd3` | Export animation, Race field |
| `c1-p14c-2` n1 | `w-bd4` | Track builder, WCMRC Round 5 with a triple stack |
| `c1-p14c-2` n2 | `w-bd5` | The board, live |
| `c1-p14c-2` n3 | `w-bd6` | The town |
| `c1-p14d` n1 | `w-fl1` | Five inch, WCMRC Round 5 |
| `c1-p14d` n2 | `w-fl2` | Five inch, WCMRC Round 5 |
| `c1-p14d` n3 | `w-fl3` | Rates screen |
| `c1-p14d-2` n1 | `w-fl4` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p14d-2` n2 | `w-fl5` | Whoop, RaceGOW Season 5 Track 1 |
| `c1-p14d-2` n3 | `w-fl6` | Five inch, WCMRC Round 5 |
| `c1-p14e` n1 | `w-lk1` | The town |
| `c1-p14e` n2 | `w-lk2` | The town |
| `c1-p14e` n3 | `w-lk3` | The town |
| `c1-p14e-2` n1 | `w-lk4` | Five inch, WCMRC Round 5 |
| `c1-p14e-2` n2 | `w-lk5` | Five inch, WCMRC Round 5 |
| `c1-p14e-2` n3 | `w-lk6` | webfpv.org, phone |
| `c1-p14f` n1 | `w-aw1` | Five inch, WCMRC Round 5 |
| `c1-p14f` n2 | `w-aw2` | About screen |
| `c1-p14f` n3 | `w-aw3` | webfpv.org |
| `c1-p14f-2` n1 | `w-aw4` | Advanced screen |
| `c1-p14f-2` n2 | `w-aw5` | Five inch, WCMRC Round 5 |
| `c1-p14f-2` n3 | `w-aw6` | Five inch, WCMRC Round 5 |
| `c1-p15` a | `p15-a` | Five inch, WCMRC Round 5 |

## Chapter 2. Open house

Seventeen pages: the cover and sixteen, 3 to 20 October 2026. The owner's ask of 20 October: bring the story up to date from every pull request, as a story book and not as dry patch notes. So a page is a beat, lettered big, with at most two or three dated notes, where the week pages before it carried three notes each. Small fixes are grouped into a scene or left to the long form (RELEASE-NOTES-WEEK-2.md and RELEASE-NOTES-WEEK-3.md). Pictures are shot by `tools/shoot/c2.js` at simulator commit `7ab233a` and inked by `tools/ink/panels.js`; a few are frames from the threads that built the feature, and some are chapter 1's week pictures hung again.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, OPEN HOUSE, 3 to 20 October 2026. Three panels: The feel, NO RESET; The board, THE MAGAZINE; The house, NICK'S. Each links to its page. | Nick Burns' house from the back yard, the whoop flying in; a belly slide; the board; Nick waving. |
| 1 | Twitchy | G-01, TWITCHY., G-02, G-03, G-04 | Black panel; low over the grass; a level hover on paper; a hard turn at a gate. |
| 2 | The whoop | G-05, ONE G., G-06, BZZZT | The room; the whoop on paper; the gate from the whoop. |
| 3 | No reset | G-07, THUD., G-08, SKRRRT, G-09 | Black panel; the wall hit, in negative; off the wall; the slide. |
| 4 | Your switches | G-10, G-11, G-12 | Over the town's roofs; the pause menu; the Nice flying card (chapter 1's). |
| 5 | The rule | G-13, LATENCY, G-14, G-15 | Through a gate; black panel. |
| 6 | A track a week | A TRACK A WEEK, G-16, G-17, G-18 | A whoop through a lit gate; CommunityGow on a phone; the invite (chapter 1's, an example club). |
| 7 | Every lap counts | SHARE IT., G-19, EVERY LAP COUNTS., G-20 | Shared, and the Tunes tab (chapter 1's, example tunes); a track's sheet replaying its fastest lap. |
| 8 | Their game, bigger | G-21, G-22, G-23, WHOOSH, G-24 | WEBFPV in pipe, the invisible gate, an official track (chapter 1's); the windmill. |
| 9 | Balloon chase | POP! three times, G-25, G-26, G-27 | The plane and its balloons; close behind it; the piece in the builder. |
| 10 | Ninety per cent | 90%ER, G-28, G-29 | A sticker's callout; the skate plaza; the sticker sheet. |
| 11 | Maps and Tracks | G-30, G-31 | The live board on a desk; a map's sheet; the live board on a phone. |
| 12 | Nick Burns' house | NICK BURNS' HOUSE, G-32 | The house from over the street, full bleed. |
| 13 | Nick | G-33, G-34, G-35, G-36 | Nick at his table; the thanks; the catfish; Nick walking in. |
| 14 | Every room | G-37, STICKERS IN THE BOX! (Nick's line, G-36), G-38, G-39 | The kitchen from the breakfast room; the workshop; Nick on his sofa; the dining room's tucked chairs. |
| 15 | The look | G-40, G-41, whummm, G-42 | The first screen; a sprayed logo; the quad on paper. |
| 16 | Next | F-27, Chapter 03, F-28, FLY NOW | Nick waving over the pool from the patio; the blank panel. |

Sound effects (TWITCHY., THUD., SKRRRT, BZZZT, WHOOSH, POP!, whummm), the panel headings (A TRACK A WEEK, SHARE IT., EVERY LAP COUNTS., NICK BURNS' HOUSE, 90%ER) and the cover's panel names are SCENE or the book's own headings. Nick's balloons in the pictures are the simulator's, drawn by `src/maps/house/nickdraw.js`, not painted on. Chapter 1's last page now turns into this chapter: its panel letters OPEN HOUSE under Chapter 02, and the one link out moved to this chapter's last page.

| Id | Line | Source |
| --- | --- | --- |
| G-01 | "The testers kept writing in. 319 feel tickets, and one word came up more than any other." | Simulator PR 57: 319 feel tickets read twitchy most often (the week two note N-31). |
| G-02 | "So the default rates went a step softer: 60 and 600, from 70 and 670. Your own rates are never moved." | Simulator PR 57, 11 October. |
| G-03 | "Half the prop wash, a belly 12 mm lower, and a full yaw stop that swings back 4.1 degrees, not 7.0." | Simulator PR 56, 9 October. |
| G-04 | 'Mat flew it: "flys good."' | The owner's words on PR 56, quoted in the week two notes. |
| G-05 | "Remember the whoop, and the question? It got physics of its own." | Simulator PR 58, 10 October; the question is chapter 1, page 11. |
| G-06 | "A one cell whoop on 0702 motors, falling at one real g, in the room as built." | Simulator PR 58 and `configs/airframes.js`: 0702 28,000 kV, 1S, "the whoop in them falls at one real g". The mass is not lettered (What is not lettered). |
| G-07 | '"Fix crashing to not be annoying. No reset, just dull bounce, always."' and "Mat, 16 October" | The owner's list of 16 October, quoted in simulator PR 76: "fix crashing to not be annoying no reset, just dull bounce always". Punctuation added, words his. |
| G-08 | "Now a crash is a dull bounce. The quad comes off at a walking pace and you keep flying." | Simulator PR 76: 0.3 to 1.2 m/s, "the pilot keeps flying". |
| G-09 | "Touch the grass and you slide. A 12 m/s skim runs out about 10 m and eases to a stop, where it used to grab." | Simulator PR 83, 18 October. |
| G-10 | "Your quad. Your switches." | SCENE. |
| G-11 | "Flight mode, Acro or Angle, is back in the pause menu and Settings. Angle is Betaflight's own, 60 degrees." | Simulator PR 72, 16 October: Betaflight's ANGLE_MODE, 59.9 degrees at full stick. |
| G-12 | "After two tracks, a Nice flying card offers the feel sliders. Prop wash has its own On and Off. Off is a tuned lap, and the board tags it." | Simulator PR 65 (11 October), simulator PR 73 and board PR 20 (17 October). |
| G-13 | "Between the stick and the screen, nothing may wait." | SCENE, the rule below in the book's words. |
| G-14 | '"Latency is the most important thing in this project, and any change that increases latency is bad."' and "Mat, 9 October" | The owner's project rule of 9 October 2026, verbatim. |
| G-15 | "So the comic layer is off on every preset, shaders link before the first frame, and Nick casts no shadow." | Simulator PR 54 (9 October), the faster loads of 8 October (week two note N-38), simulator PR 94 (Nick casts no shadow, to keep the draw calls flat). |
| G-16 | "CommunityGow. A club, or a few friends, race a new whoop track every week, at home, at their own pace." | Board PR 13, 11 October; RELEASE-NOTES-WEEK-2.md. |
| G-17 | "No account and no email. A YouTube link is the evidence." | Board PR 13. |
| G-18 | "Each round is scored on F1 points, 25 for first, and the season adds them up." | Board PR 13: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1. |
| G-19 | "A tune you like is a short code now. Paste it, see what is in it, then fly it. Stars, one to five, on tunes, tracks and maps." | Board PR 15 and simulator PR 63, 11 October. |
| G-20 | "Arcade, practice and tuned laps post too, each with its tag. A track's page replays its fastest lap, flown on the line it was flown." | Board PR 19 and simulator PR 71 (16 October); board PR 27 and simulator PR 93 (19 October). |
| G-21 | "The builder kept growing. Any letter A to Z in pipe, each gap a gate." | Week two note N-23, 4 October. |
| G-22 | "A gate with nothing to hit." | Week two note N-24, the Invisible gate, 4 October. |
| G-23 | "Official tracks: anyone flies them and posts a time, and only the board's owners can change them." | Week two note N-27, 4 October; the board's CLAUDE.md, official tracks. |
| G-24 | "A windmill. Its four sails turn, and they are solid: time the gap, or be knocked aside the way they turn." | Simulator PR 75, 17 October. |
| G-25 | "Balloon chase. A plane streams balloons over a freestyle map, and you get ninety seconds to pop what you can." | Simulator PR 74, 17 October. |
| G-26 | "Every ninth balloon is gold, and worth three." | Simulator PR 74. |
| G-27 | "It is a piece in the map builder: put it down, give it a radius, a height and a speed." | Simulator PR 78, 17 October. |
| G-28 | "Infinity Loops. A tribute map with 100 stickers to find, cut from one sheet." | Simulator PR 70, 15 October. |
| G-29 | "Each one calls out every time it comes back into sight. Find 90 of the 100 and the map gives you an achievement of its own." | Simulator PR 80, 17 October. |
| G-30 | "The board turned into a magazine. Maps first, then five inch and whoop tracks, the official ones up top." | Board PRs 21 to 24, simulator PRs 89 to 91, 19 October. |
| G-31 | "Every publish draws its own picture, and every track and map on the board has one now. A map's page flies its named gaps." | Simulator PR 89; the backfill of 19 October, 11:40 UTC, every track and map on the live board, no failures; board PR 27 and simulator PR 93. |
| G-32 | "A real house, three and a half times life size, so a five inch flies it the way a whoop flies the real one." and "18 October" | Simulator PR 81 (18 October, three times), PR 92 (19 October, three and a half). |
| G-33 | "Nick is home. He sits at his patio table, and every so often he gets up and walks inside." | Simulator PR 81. |
| G-34 | "Fly close and he thanks you." | Simulator PR 87: within 1.5 m, "I appreciate your time and thanks for watching!" |
| G-35 | "Fly into him and..." | Simulator PR 87: a hit, "Holy Catfish!". The picture shows the simulator's own balloon. |
| G-36 | "He has four lines of his own: Holy Catfish! Boom Shakala! Stickers in the box! Motor post to motor post!" | Simulator PR 81, `NICK_LINES` in `src/maps/house/nick.js`. |
| G-37 | "Every room flies. The kitchen, the stair, the basement and Nick's workshop." | Simulator PRs 81, 84 and 85. |
| G-38 | "Ten NB stickers, one a room, to find." and "19 October" | Simulator PR 86. |
| G-39 | '"Push the chairs in everywhere to clear the flight lines."' and "Mat, 19 October" | The owner, 19 October 13:56 UTC, quoted in simulator PR 94. Capital added, words his. |
| G-40 | "And the game started to look like this book." | SCENE: simulator PRs 90, 96 and 97 draw the picker and the first screen as manga panels. |
| G-41 | "A logo on grass is sprayed like a pitch sponsor. On a bando wall it is graffiti." and "12 October" | Simulator PR 68. |
| G-42 | "The motors sound lower and muffled, like old GoPro Session 5 footage with the wind filter on." and "17 October" | Simulator PR 79. |

### Chapter 2 pictures

The live board pictures are webfpv.org/board as a visitor saw it on 20 October 2026, fetched by the rig's own Node side. Frames not shot by the rig are named by `file` in `tools/shoot/c2.js`, with the pull request that made them; each sidecar says which.

| Panel | Shot | World |
| --- | --- | --- |
| `c2-cover` hero | `cover-hero` | Nick Burns' house |
| `c2-cover` w1 | `cover-w1` | Five inch, WCMRC Round 5 |
| `c2-cover` w2 | `cover-w2` | The live board |
| `c2-cover` w3 | `cover-w3` | Nick Burns' house |
| `c2-p1` b, d | `p1-b`, `p1-d` | Five inch, WCMRC Round 5 |
| `c2-p1` c | `p1-c` | Paper, the five inch |
| `c2-p2` a, c | `p2-a`, `p2-c` | Whoop, RaceGOW Season 5 Track 1 |
| `c2-p2` b | `p2-b` | Paper, the whoop |
| `c2-p3` b, c | `p3-b`, `p3-c` | The town |
| `c2-p3` d | `p3-d` | Five inch, WCMRC Round 5 |
| `c2-p4` a | `p4-a` | The town |
| `c2-p4` b | `p4-b` | The pause menu |
| `c2-p4` c | `c1/w-tu6` | Five inch, WCMRC Round 5 |
| `c2-p5` a | `p5-a` | Five inch, WCMRC Round 5 |
| `c2-p6` a | `p6-a` | Whoop, RaceGOW Season 5 Track 1 |
| `c2-p6` b, c | `c1/w-cg2`, `c1/w-cg6` | The board, example club, phone |
| `c2-p7` a, b | `c1/w-tu1`, `c1/w-tu3` | Example tunes |
| `c2-p7` c | `p7-c` | A track's sheet, frame from board PR 27 |
| `c2-p8` a, b | `c1/w-bd1`, `c1/w-bd2` | Five inch, letters and an invisible gate |
| `c2-p8` c | `c1/w-bd5` | The live board, 11 October |
| `c2-p8` d | `p8-d` | Hibari Yard Tandem with a windmill |
| `c2-p9` a, b | `p9-a`, `p9-b` | Hibari Yard Tandem with a balloon chase |
| `c2-p9` c | `p9-c` | The map builder, frame from PR 78 |
| `c2-p10` a, b, c | `p10-a`, `p10-b`, `p10-c` | Infinity Loops, frames and the sheet from PRs 70 and 80 |
| `c2-p11` a, c | `p11-a`, `p11-c` | The live board |
| `c2-p11` b | `p11-b` | A map's sheet, frame from board PR 27 |
| `c2-p12` a | `p12` | Nick Burns' house |
| `c2-p13` a to d | `p13-a` to `p13-d` | Nick Burns' house |
| `c2-p14` a to d | `p14-a` to `p14-d` | Nick Burns' house |
| `c2-p15` a | `p15-a` | The first screen, frame from PR 97 |
| `c2-p15` b | `p15-b` | Race field, frame from PR 68 |
| `c2-p15` c | `p15-c` | Paper, the five inch |
| `c2-p16` a | `p16-a` | Nick Burns' house |

## Chapter 3. Three houses

Sixteen pages: the cover and fifteen, 20 to 23 October 2026. The owner's ask of 23 October: bring the story up to date as chapter 3, a page a beat, with at most two or three dated notes on a page. Dates are Perth time (AWST), as the public notes page uses. Pictures are shot by `tools/shoot/c3.js` at simulator commit `107d942` and inked by `tools/ink/panels.js`; the owner's screenshots are `file` jobs named in the table below, and a panel waits as paper until its screenshot is in `chapter-3/` of the project files. Nothing is painted in place of one. The long form is RELEASE-NOTES-WEEK-4.md. Chapter 2's last page now turns into this chapter, the way chapter 1's turned into chapter 2, and the one link out moved to this chapter's last page.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, THREE HOUSES, 20 to 23 October 2026. Three panels: The houses, THREE HOUSES; The field, GOATS; The school, CAREER. Each links to its page. | Joshua Bardwell's house with a five inch over the drive; Heads' house with the whoop; the goats grazing; the Career card on the gate (owner's screenshot). |
| 1 | Heads' house | H-01, HEADS' HOUSE, H-02 | Heads' house from the street, full bleed, the whoop in front of it. |
| 2 | Heads | H-03, H-04 | His garage; Heads waving; the whoop through the garage. |
| 3 | Under the cars | H-05, SHHHK, H-06 | Black panel; the drive at tarmac height; a parked car's side; the owner's frame under a car. |
| 4 | Joshua Bardwell's house | H-07, JOSHUA BARDWELL'S HOUSE | The yard from above, full bleed. |
| 5 | JB stickers | H-08, H-09, H-10 | The owner's sticker find; the porch sticker; the doghouse sticker. |
| 6 | Goats | H-11, GOATS., H-12, H-13, BOOM SHAKALA! | Black panel; the goats grazing; the owner's frames of the goats running and a goat caught. |
| 7 | Land on the table | H-14, H-15, H-16, H-17 | Nick at his table (chapter 2's picture); the owner's two frames of the balloons. |
| 8 | Nick's voice | H-18, H-19, HA HA HA, H-20 | The whoop on the table; the catfish (chapter 2's picture); the whoop down on the grass. |
| 9 | ALL! | H-21, ALL 10!, H-22, H-23 | Black panel; the owner's frame of the splash. |
| 10 | Career | H-24, CAREER, H-25, H-26 | The owner's frame of the gate; black panel. |
| 11 | Lift off | H-27, H-28, H-29 | The owner's frames of the briefing and a medal screen. |
| 12 | Angle to Acro | H-30, H-31, H-32 | Black panel with the ten chapters; the owner's frames of the chapter list and the open every chapter button. |
| 13 | weBLEEDfpv | H-33, H-34, WEBLEEDFPV, H-35, H-36 | Black panel; the owner's frames of the sign and of the board's card. |
| 14 | Also this week | H-37, H-38, H-39, H-40 | Settings with 3D mode; the whoop on paper; Heads' house with the whoop; Heads' side fence. |
| 15 | Next | F-27, Chapter 04, OTHER PEOPLE'S TRACKS, Turn the page. | Nick waving over the pool (chapter 2's picture); the paper panel that leads into chapter 4. It has no link out now: FLY NOW moved to chapter 4's last page. |

Sound effects (SHHHK, HA HA HA, BOOM SHAKALA!), the panel headings (HEADS' HOUSE, JOSHUA BARDWELL'S HOUSE, GOATS., ALL 10!, CAREER, WEBLEEDFPV) and the cover's panel names are SCENE or the book's own headings. BOOM SHAKALA! is the clip Nick's voice plays when a goat is caught (H-13's source). The balloons in the pictures are the simulator's own. Heads' shout is never lettered, and no picture shows one: his lines in the simulator are placeholders (`HEADS_LINES`, simulator PR 105), so the rig holds the craft far from him.

| Id | Line | Source |
| --- | --- | --- |
| H-01 | "21 October" | Simulator commit e6ed19e, on `main` with Heads' OK, 21 October 7:23am. |
| H-02 | "The second house. Heads' place, at Nick's scale: the garage, the basement, both streets and the houses across them." | Simulator commits deb0593 (20 October, 10:03pm) and a26fa8c: a world `heads` at Nick's scale, the garage and basement from the owner's stills, both streets and the houses across them. |
| H-03 | "Heads is home too. He walks his garage between four spots, and when the quad comes close he turns his head and waves." | Simulator PR 105, 21 October: `STOPS` has four spots, and `headsAt` turns his head to the camera and waves. |
| H-04 | "Fly by and he shouts." | Simulator PR 105. What he shouts is not lettered. |
| H-05 | '"You need to be able to fly under the parked cars in Heads\' yard... good spot to hide a 90% too."' and "Mat, 22 October" | The owner, 22 October, quoted in simulator PR 127. Capital and the closing stop added, words his. |
| H-06 | "Eleven 90% patches to find. The eleventh is under the car on the drive." | Simulator PR 127: `PATCH_SPOTS` has eleven, the last "Under the car on the drive". |
| H-07 | "The third house is outside only, life size, and flown on the five inch." and "21 October" | Simulator commit 965689f, 21 October; Joshua Bardwell's OK for his house on the simulator, commit cde1dd7. |
| H-08 | "Twelve JB stickers round the yard: the porch, the chimney, the woodshed, the doghouse, the mailbox and more. Find one and Joshua says something." | Simulator PR 123 and commit 0720cf9, 22 October: `STICKERS` in `src/maps/bardwell/stickers.js` has twelve. |
| H-09 | "A find plays one of eleven Joshua Bardwell clips, shuffled, and none repeats until all have played." and "22 October" | `CLIP_SETS.jb.sticker` in `src/render/clips.js` has eleven; `pickSticker` is a shuffled bag. |
| H-10 | "Find all twelve and the screen says ALL 12!" and "22 October" | Simulator PR 118: the map's stickers go through `findStickers`, which calls `callComplete` with `ALL ${total}!`. |
| H-11 | "Five goats graze in the field. Come within 24 m and they run." | Simulator PR 125, 22 October: five `START` points, `ALARM = 24`. |
| H-12 | "Catch one and you hear Nick." | Simulator PR 125: the cue `goat` plays Nick Burns' "Boom Shakala!" clip. |
| H-13 | "A catch is within 1.3 m. The goat hops, vanishes and comes back somewhere else four seconds later." and "22 October" | Simulator PR 125 and commit ded2b2a: `CATCH_R = 1.3`, `GONE_S = 4`. A goat is never solid, and the book does not say so. |
| H-14 | "Back at Nick's. Land on his patio table while he sits there, and he reads out the flight." | Simulator PR 102, 20 October. |
| H-15 | '"Also when you land on the outdoor table with nick sitting there, you should get nick saying:"' and "Mat, 20 October" | The owner's ask of 20 October, quoted in simulator PR 102. Colon added, words his. |
| H-16 | "The flight time, and the battery." | Simulator PR 102: "3 oh 4 in the flight time, 3.47, 46 battery voltage." |
| H-17 | "Then a pause, and a frown." | Simulator PR 102: a one second gap, then "Ah, not 6 7 again." with a frown. |
| H-18 | "Nick has his voice now." | Simulator PR 123, 22 October. |
| H-19 | 'Hit him: "Holy catfish, what\'s going on?" Land on the table: "Get it just right."' | Simulator PR 123: `CLIP_SETS.nb` cues `hit` and `landed`. |
| H-20 | "A hard crash anywhere on his map and he laughs. Come within a metre and he picks a line of his own. Find one of his NB stickers and he says Stickers." and "22 October" | Simulator PR 123 (the crash laugh, once every 20 seconds) and commit 7d8e8e9 ("Stickers on every find, catfish only on a hit, other lines within a metre"). The sentence about every other map being silent is left out: the goats play Nick's clip on Joshua Bardwell's map. |
| H-21 | "Find the last sticker of a map's set and the screen says so." | Simulator PR 118, 22 October. |
| H-22 | "Every sticker found" | The splash's own sub, `callComplete` in `src/main.js`. |
| H-23 | "Nick's ten NB stickers are ten. It shows once for each map in your browser." and "22 October" | Simulator PR 118: the stamp `#complete` is written once per map. Heads' 90% patches go through their own call, `callNinety`, so the book does not claim it for them. |
| H-24 | "It is the first card on the gate." | Simulator PR 119, 22 October. |
| H-25 | "Fifty lessons in ten chapters, from your first hover in Angle to a Pro Licence in Acro. Bronze, silver and gold." | Simulator PR 119: `CAREER_LESSONS = 50` in `src/ui/ui.js`, ten chapters in `src/career/curriculum.js`, medals bronze, silver and gold. |
| H-26 | "Ten chapters, fifty lessons, medals, briefings and a coach." and "22 October" | Simulator PR 119. |
| H-27 | "Lesson one: lift the quad off the pad, hold it between one and three metres for five seconds, then land." | `src/career/curriculum.js`, lesson 1 Lift Off, its goal. |
| H-28 | 'The briefing: "Gently is the whole trick."' | `src/career/curriculum.js`, lesson 1 Lift Off, its step. |
| H-29 | "Land it and the lesson gives you a medal." | Simulator PR 119: bronze is finishing. |
| H-30 | "First Hover, Angle Mode Navigation, Switching to Acro, Big Gaps, Flips and Rolls, Segmented Flips and Rolls, Gates, Racing, Freestyle, Pro Licence." | The chapter titles in `src/career/curriculum.js`. |
| H-31 | "Chapters open in order." | Simulator PR 119, `src/career/screens.js`. |
| H-32 | "Already fly? One button opens every chapter." and "22 October" | `src/career/screens.js`: "I already fly: open every chapter". |
| H-33 | "20 October" | Simulator PR 101. |
| H-34 | "A fourth partner: weBLEEDfpv, the USA micro drone partner, from Syracuse, New York." | Simulator PR 101: a fourth partner, the USA micro drone partner, an FPV company in Syracuse, New York. |
| H-35 | "Their sign is in the freestyle maps." | Simulator PR 101: their sign is in every built map, the town's wall and Nick's garage. |
| H-36 | "And on the board's partners page and the front page." | Board PR 30 and front page PR 21, 20 October. |
| H-37 | "3D mode: the motors reverse. A switch at the top of Settings, off by default." and "21 October" | Simulator PRs 106 and 107. |
| H-38 | "The whoop is drawn from Mat's Fractal65 model." and "22 October" | Simulator PR 121. |
| H-39 | "Nick's and Heads' houses are flown on the whoop now." and "23 October" | Simulator PR 130. |
| H-40 | "Sponsor signs on the houses are a quarter smaller, each brand once." and "23 October" | Simulator PR 131. |

### Chapter 3 pictures

Frames not shot by the rig are named by `file` in `tools/shoot/c3.js`. The owner's screenshots are in `chapter-3/` of the project files; a panel with no screenshot yet is paper in `docs/chapters.js`.

| Panel | Shot | World |
| --- | --- | --- |
| `c3-cover` hero | `cover-hero` | Joshua Bardwell's house |
| `c3-cover` w1 | `cover-w1` | Heads' house |
| `c3-cover` w2 | `cover-w2` | Joshua Bardwell's house, the field |
| `c3-cover` w3 | `career-gate.png` | The owner's screenshot |
| `c3-p1` a | `p1` | Heads' house |
| `c3-p2` a, b, c | `p2-a`, `p2-b`, `p2-c` | Heads' house, the garage |
| `c3-p3` b, c | `p3-b`, `p3-c` | Heads' house, the drive |
| `c3-p3` d | `heads-under-car.png` | The owner's screenshot |
| `c3-p4` a | `p4` | Joshua Bardwell's house |
| `c3-p5` a | `jb-sticker-find.png` | The owner's screenshot |
| `c3-p5` b, c | `p5-b`, `p5-c` | Joshua Bardwell's house |
| `c3-p6` b | `p6-b` | Joshua Bardwell's house, the field |
| `c3-p6` c, d | `goats-run.png`, `goat-catch.png` | The owner's screenshots |
| `c3-p7` a | `c2/p13-a` | Nick Burns' house, chapter 2's picture |
| `c3-p7` b, c | `nick-table-1.png`, `nick-table-2.png` | The owner's screenshots |
| `c3-p8` a, c | `p8-a`, `p8-c` | Nick Burns' house |
| `c3-p8` b | `c2/p13-c` | Nick Burns' house, chapter 2's picture |
| `c3-p9` b | `all-splash.png` | The owner's screenshot |
| `c3-p10` a | `career-gate.png` | The owner's screenshot |
| `c3-p11` a, b | `career-1-1-briefing.png`, `career-medal.png` | The owner's screenshots |
| `c3-p12` b, c | `career-chapters.png`, `career-open-all.png` | The owner's screenshots |
| `c3-p13` b, c | `webleed-sign.png`, `webleed-board.png` | The owner's screenshots |
| `c3-p14` a | `p14-a` | Settings, frame from PRs 106 and 107 |
| `c3-p14` b | `p14-b` | Paper, the whoop, the RaceGOW room |
| `c3-p14` c | `p14-c` | Heads' house |
| `c3-p14` d | `p14-d` | Heads' side fence, frame from PR 131 |
| `c3-p15` a | `c2/p16-a` | Nick Burns' house, chapter 2's picture |

## Chapter 4. Other people's tracks

Eleven pages: the cover and ten, 24 to 27 October 2026. The owner's ask of 27 October: bring the story up to date as chapter 4, TinyLaps first, then the yards, JSL, the goat, sound, laps, the small things, Drone Factory, and the last page. Dates are Perth time (AWST), as the public notes page uses, so a pull request merged late on 23 October UTC is lettered 24 October. Pictures are shot by `tools/shoot/c4.js` at simulator commit `6d74094` and inked by `tools/ink/panels.js`; the owner's screenshots are `file` jobs named in the table below, and a panel holds a stand-in simulator frame until its screenshot is in `chapter-4/` of the project files (see Chapter 4 pictures). Nothing is painted. The long form is RELEASE-NOTES-WEEK-5.md. Chapter 3's last page now turns into this chapter, the way chapter 2's turned into chapter 3, and the one link out moved to this chapter's last page.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, OTHER PEOPLE'S TRACKS, 24 to 27 October 2026. Three panels: The editor, TINYLAPS; The yards, YARD TRACK; The field, ON A GOAT. Each links to its page. | Heads' front lawn with the track; a TinyLaps track in the simulator (owner's screenshot); Nick's back lawn with the track; the goat with the sticker. |
| 1 | TinyLaps | J-05, J-06, J-07, TINYLAPS, J-08 | The owner's frames of their editor's button and of a track in the simulator; black panel. |
| 2 | Track 3 in the yards | J-09, J-10, J-11, J-12, J-13 | Black panel; Heads' lawn; Nick's lawn; Bardwell's lawn. |
| 3 | JSL | J-14, J-15, JSL, J-16 | The owner's frame of the callout; black panel. |
| 4 | The goat | J-17, J-18, J-19, J-20 | The goat with the sticker; the owner's frame of the callout; Nick at his table (chapter 3's picture). |
| 5 | Sound | J-21, J-22, THUD, J-23 | The owner's frame of the sliders; black panel. |
| 6 | Laps keep counting | J-24, J-25, TUNED, J-26 | A lit gate in the whoop room; black panel. |
| 7 | Also this week | J-27, J-28, J-29, J-30 | The Quad screen at 70 (frame from PR 135); the landed screen (frame from PR 136); the whoop room sign (frame from PR 144); a course preview (frame from PR 146). |
| 8 | Also this week, more | J-31, J-32, J-33 | Heads' stop sign; the whoop on paper; the whoop on its back on Heads' lawn. |
| 9 | Drone Factory | J-34, J-35 | The three signs: Bardwell's, Heads' and Nick's (frames from PR 155). |
| 10 | Next | F-27, Chapter 05, ROOMS AND MINI GAMES, Turn the page. | Nick waving over the pool (chapter 2's picture); the paper panel that leads into chapter 5. It has no link out now: FLY NOW moved to chapter 5's last page. |

The sound effects and panel headings (TINYLAPS, YARD TRACK, ON A GOAT, JSL, THUD, TUNED) and the cover's panel names are SCENE or the book's own headings. THUD is the word for the crash cue J-23 describes. JSL and TUNED are the names the simulator uses. The balloons and callouts in the pictures are the simulator's own.

| Id | Line | Source |
| --- | --- | --- |
| J-01 | "24 to 27 October 2026" | The span the owner gave for this chapter. Simulator PR 135 merged 23 October 23:29 UTC, which is 24 October in Perth. |
| J-02 | "Chapter 04" and "OTHER PEOPLE'S TRACKS" | The book's own title for the chapter, chosen from the owner's example titles. |
| J-03 | "The editor", "The yards", "The field" and their panel words | The book's own headings for the cover panels, as in chapter 3. |
| J-04 | "New: Chapter 04, Other people's tracks" | The cover of chapter 1, as chapter 3's PR did for "Three houses". |
| J-05 | "24 October" (page 1) | Simulator PR 148, merged 24 October 14:42 Perth. |
| J-06 | "Kwayzu's TinyLaps is a whoop gate editor. Tracks made there now open in WebFPV, from a button on their editor and from Import." | Simulator PR 148: the importer reads a TinyLaps `whoop-gate-editor` export, the link comes from a button on their editor, and the builder's Import recognises their files. The owner's brief of 27 October says Kwayzu has agreed to be named. |
| J-07 | "Every one goes straight to the board." | Simulator PR 148, the owner's rule of 24 October 06:28 UTC: before the flight the track is published to the board. |
| J-08 | "A track from TinyLaps draws its own thumbnail on the board, and anyone can open it there and edit a copy." and "24 October" | Simulator PR 150 (the publishing tab draws the share card and thumbnail while parked) and PR 148 (the edit key is not kept, so anyone opens it from the board with Edit and publishes a copy). |
| J-09 | "24 October" (page 2) | Simulator PR 147, merged 24 October 12:37 Perth. |
| J-10 | "The board's RaceGOW6 Track 3 stands in three yards: Heads' front lawn, Nick's back lawn, and Joshua Bardwell's lawn by the woodshed." | Simulator PR 147: trk-85c74ecc, in Heads' front yard, Nick's back yard and Bardwell's lawn north east of the woodshed. |
| J-11 | "MiniFigs.me and RaceGOW6 are painted on the floor." | Simulator commit 9120524: the floor logos are the track's own MiniFigs.me and RaceGOW6 only, the owner's word of 24 October. PR 147's first text named the partners; the commit replaced them. |
| J-12 | "Fly through the start gate and the lap clock starts. Fly away from the track and it resets." and "24 October" | Simulator PR 147, Timing. |
| J-13 | "At Bardwell's it is the whoop's 28 inch track. Land the five inch in the white box and it asks if you want to swap to the whoop." and "24 October" | Simulator PR 147: at whoop room scale there, the whoop's 28 inch track; a five inch landed in the painted white box asks "Swap to the whoop?". |
| J-14 | "24 October" (page 3) | Simulator PR 139, merged 24 October 07:59 Perth. |
| J-15 | "A new freestyle combo: a Juicy Flick, then a Slingshot, then a Laser Flip or a Power Loop, back to back." | Simulator PR 139. |
| J-16 | "It is worth 650 points in the trick list." and "24 October" | Simulator PR 139 and `EXTRA_TRICKS` in `src/game/tricks.js`: JSL, 650 points. The tier is not lettered. |
| J-17 | "24 October" (page 4) | Simulator PR 140, merged 24 October 08:21 Perth. |
| J-18 | "Nobody found the twelfth JB sticker on the mailbox. Now it rides on a goat." | Simulator PR 140: the twelfth sticker was on the mailbox at the road and nobody found it; it now sits on a goat's flank. |
| J-19 | "The callout says: On a goat." | Simulator PR 140 and `GOAT_STICKER.name` in `src/maps/bardwell/stickers.js`: "On a goat". |
| J-20 | "Nick's crash call comes one time in four now, and it is only "Poor thing."" and "24 October" | Simulator PR 138: a hard crash plays the call one time in four, and the clip is cut to "Poor thing." The PR itself says a listen is still owed. |
| J-21 | "24 October" (page 5) | Simulator PR 137, merged 24 October 08:34 Perth. |
| J-22 | "Effects and Callouts have their own levels now. Every sound level in Settings is a slider with a number box." | Simulator PR 137: two new levels, and Volume, Motors, Wind, Music, Effects and Callouts are drag sliders with a number box. |
| J-23 | "The crash is a low thud now, where it was a bright smack." and "24 October" | Simulator PR 142, "Crash sound: bass thud, not a smack". |
| J-24 | "25 October" (page 6) | Simulator PR 151, merged 25 October 08:09 Perth. |
| J-25 | "Change Air grip, Motor power, prop wash or Weight in the middle of a lap and the lap keeps going. It no longer voids." | Simulator PR 151. |
| J-26 | "The lap counts, and it is filed Tuned." | Simulator PR 151: a change inside a running lap marks it mixed, and it is filed Tuned. |
| J-27 | "The camera angle goes up to 70, with a number box beside the slider." and "24 October" | Simulator PR 135, merged 24 October 07:29 Perth. |
| J-28 | "And a camera angle slider sits on the screen you see when you have landed." and "24 October" | Simulator PR 136. |
| J-29 | "weBLEEDfpv's sign hangs on the whoop room wall." and "24 October" | Simulator PR 144. |
| J-30 | "Gate markings are hidden in course previews." and "24 October" | Simulator PR 146. |
| J-31 | "Heads' stop sign is solid now, so you can tap the wall on it." and "25 October" | Simulator PR 152, merged 25 October 08:28 Perth. The owner's ask was to wall tap it. |
| J-32 | "Whoop track GIFs are drawn in the whoop room now, with the floor logos." and "24 October" | Simulator PR 145. |
| J-33 | "3D mode: both sides of the quad count as a base." and "26 October" | Simulator PR 154, merged 26 October 09:19 Perth. |
| J-34 | "26 October" (page 9) | Simulator PR 155, merged 26 October 23:11 Perth. |
| J-35 | "Drone Factory's sign is on Heads' house, Joshua Bardwell's house and Nick Burns' house." | Simulator PR 155: Heads' house, Bardwell's house and Nick's house only, named as the roster names it (`src/partners/roster.js`, slug `dronefactory`, name "Drone Factory"). Nothing more is said about them. |

### Chapter 4 pictures

Frames not shot by the rig are named by `file` in `tools/shoot/c4.js`. The owner's screenshots are in `chapter-4/` of the project files; a panel with no screenshot yet is paper in `docs/chapters.js`. `chapter-4/` did not exist when this chapter was first drafted, and the five panels were held as paper. On 28 October the owner saw the empty middle of the book, so each of them now holds a real simulator frame until the owner's own screenshot arrives (`FALLBACK` and the rig shots in `tools/shoot/c4.js`; the owner's file wins as soon as it is in `chapter-4/`). Nothing is painted.

| Panel | Shot | World |
| --- | --- | --- |
| `c4-cover` hero | `cover-hero` | Heads' front lawn |
| `c4-cover` w1 | `cover-w1` | A TinyLaps track on the start pad, frame from PR 148 (`tinylaps-import/`); the owner's `tinylaps-in-sim.png` replaces it |
| `c4-cover` w2 | `cover-w2` | Nick Burns' back lawn |
| `c4-cover` w3 | `cover-w3` | The goat with the sticker |
| `c4-p1` a, b | `tinylaps-editor`, `tinylaps-in-sim` | A TinyLaps track in the builder and on the start pad, frames from PR 148; the owner's screenshots replace them |
| `c4-p2` b, c, d | `p2-b`, `p2-c`, `p2-d` | Heads', Nick's and Bardwell's lawns |
| `c4-p3` a | `jsl-callout` | The rig: a quad upside down over the town; the owner's callout screenshot replaces it |
| `c4-p4` a | `p4-a` | The goat with the sticker |
| `c4-p4` b | `goat-sticker-find` | The rig: the sticker close on the goat; the owner's screenshot replaces it |
| `c4-p4` c | `c3/p8-a` | Nick Burns' house, chapter 3's picture |
| `c4-p5` a | `sound-sliders` | The Sound section of Settings, frame from PR 137 (`sound-sliders/`); the owner's screenshot replaces it |
| `c4-p6` a | `p6-a` | The whoop room, a lit gate |
| `c4-p7` a | `p7-a` | Quad screen, frame from PR 135 (`camera-angle/`) |
| `c4-p7` b | `p7-b` | Landed screen, frame from PR 136 (`camera-angle/`) |
| `c4-p7` c | `p7-c` | Whoop room sign, frame from PR 144 (`webleed-whoop-room/`) |
| `c4-p7` d | `p7-d` | Course preview, frame from PR 146 (`track-preview-overlays/`) |
| `c4-p8` a | `p8-a` | Heads' stop sign |
| `c4-p8` b | `p8-b` | Paper, the whoop, the RaceGOW room |
| `c4-p8` c | `p8-c` | The whoop on its back, Heads' lawn |
| `c4-p9` a, b, c | `p9-a`, `p9-b`, `p9-c` | The signs, frames from PR 155 (`dronefactory-logos/`) |
| `c4-p10` a | `c2/p16-a` | Nick Burns' house, chapter 2's picture |

## Chapter 5. Rooms and mini games

Fourteen pages: the cover and thirteen, 27 and 28 October 2026. The owner's ask of 28 October: "update the patch notes the comic book with all the new mini games and features". Dates are Perth time (AWST). Every picture is a frame the simulator drew, made by the thread that built the feature and kept in the project's shared folder; each is a `file` job in `tools/shoot/c5.js` and is inked by `tools/ink/panels.js`, so nothing is painted and no panel is held as paper. The long form is RELEASE-NOTES-WEEK-6.md. Chapter 4's last page now turns into this chapter and the one link out moved to this chapter's last page.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, ROOMS AND MINI GAMES, 27 and 28 October 2026. Panels: The mini game, DRIFT; The town, SUNNYFIELD; The room, TOGETHER. | Goat street; a drift train; Sunnyfield's main street; the overview camera. |
| 1 | Fly together | K-03, K-04, K-05 | Front screen; multiplayer screen; three pilots in a room. |
| 2 | Your pilot | K-06, K-07, K-08 | Builder face tab; twelve pilots; gear tab. |
| 3 | Race and watch | K-09, K-10, K-11 | Standings; countdown; riding along. |
| 4 | Overview camera | K-12, K-13, K-14 | Overview; clean feed; the New: overview card. |
| 5 | Change the map | K-15, K-16 | The vote; the Follow question. |
| 6 | 90%er goats | K-17, K-18, K-19 | Goats with logos; a car and goats; goats close. |
| 7 | Herd them home | K-20, K-21 | The map from above; goats on a drive. |
| 8 | Drift Matsuri | K-22, K-23, K-24 | Lanterns; a car from the front; the festival ground. |
| 9 | The take | K-25, K-26 | The take card; filming from the side. |
| 10 | Sunnyfield | K-27, K-28, K-29 | Water tower; the dump; the town from above. |
| 11 | Thomas More's Shop | K-30, K-31 | Two frames of the shop floor. |
| 12 | Also | K-32, K-33, K-34 | Two props in view frames. |
| 13 | Next | K-35 | The circuit from above; the blank panel and FLY NOW. |

| Id | Line | Source |
| --- | --- | --- |
| K-01 | "Chapter 05" and "ROOMS AND MINI GAMES" | The book's own title for the chapter. The ask: "update the patch notes the comic book with all the new mini games and features" (owner, 28 October 11:49 UTC). |
| K-02 | "27 and 28 October 2026" | The span of the pull requests below, in Perth time. |
| K-03 | "Fly together is open to everybody. Host a room, pick one in the Rooms tab, or join with a code or a link." | Simulator PR 153; commit bde7163 "Rooms: on for everybody" (27 October), the owner's word "yes make multi player for everyone". |
| K-04 | "Nobody is matched with strangers, and a solo flight is never entered." | The room rules in PR 153: no matchmaking, a solo flight is never entered. |
| K-05 | "Pilots talk with quick lines and waves. Typed chat only exists in a private room, if its host turns it on." | PR 153: preset quick lines and waves, typed chat only in a private room whose host turns it on. |
| K-06 | "Make your pilot like a trading card: face, hair, eyes, gear and quad. Hover a part to try it on." | PR 156: the pilot builder, tabs Face, Hair, Eyes, Gear, Quad, try on by hover. |
| K-07 | "Random, Undo and Reset are on the card." | PR 156. |
| K-08 | "More hair and glasses came after, and tattoos on a Marks tab." | PR 157. The names of the real people it is based on are not lettered. |
| K-09 | "Rooms can race. Everyone waits in the pit and presses Ready, the room counts down to GO, and standings and results follow." | PR 153: racing with a pit, Ready, a GO countdown, standings and results. |
| K-10 | "Share a room link and the preview shows the host's pilot on the map." | PR 158: room link pictures on social media showing the host's pilot with the map. |
| K-11 | "Press V to ride along behind another pilot." | PR 158: watching another pilot from behind their quad with V. |
| K-12 | "A new camera over the whole room. Press O and every pilot is on the field with a trail behind." | PR 175 (commit 1b224e4): the overview camera, O key, trails. |
| K-13 | "H gives a clean feed with no panels. R is the whole field and F rides behind a pilot." | PR 175: keys H, R and F. |
| K-14 | "The question mark opens the keys." | PR 175: ? keys sheet. |
| K-15 | "The host can move the room to another map. Everyone votes, then the room goes or stays." | PR 162 (commit 3b5642e, 27 October): Change map, Move the room here, Go and Stay. |
| K-16 | "When a pilot takes a different map the room asks across the screen: follow, or stay." | PR 165 (commit 4bb2e92, 28 October): the Follow question across the middle of the screen with Follow and Stay. |
| K-17 | "A new whoop map: 90%er goat herding. Heads' house and the street around it, and a goat for every 90%er sticker." | PR 167 (commit ed2b544, 28 October). |
| K-18 | "Cars drive the streets. The goats step out of their way." | PR 167, commit 120e853. |
| K-19 | "Fly low and they run. The pause menu has a row to let them out again." | PR 167: goats flee a low whoop; the pause menu row "let them out again". |
| K-20 | "Herd them into Heads' garage. A box under the score counts the goats home and the clock since the first one ran." | PR 167. |
| K-21 | "Every goat home gets a callout with its logo. All of them home is the big finish." | PR 167. |
| K-22 | "A mini game. Drift Matsuri is a festival circuit under cherry trees, and you are the camera." | PR 170 (commit 43c4acb, 28 October). |
| K-23 | "Film the drift battles for a minute." | PR 170, the in-sim line "You are the camera. Film the drift battles for a minute." |
| K-24 | "There are seven drift cars on the circuit." | PR 170. |
| K-25 | "A shot scores on frame, close and steady. Two cars together, or a whole train, in the picture score more." | PR 170: scoring and the tandem and train multipliers. The multipliers are not lettered. |
| K-26 | "Your take is graded from S to D, and your best take is kept in your browser." | PR 170. |
| K-27 | "A new map: Sunnyfield, a cartoon American town of our own. ..." | PR 172 (commit 77e7e26, 28 October): Main Street with a clock tower and church belfry, water tower, dump. |
| K-28 | "There is a donut shop with a giant donut, a hedge tunnel, a plank bridge over a gorge and a skate park." | PR 172. |
| K-29 | "The town has twelve named gaps to find." | PR 172: twelve named gaps. |
| K-30 | "Thomas More's Shop is a whoop map now, built from his own flights." | PR 161 (commit fb02bcb, 27 October) and 56f7c4d: rebuilt from his own whoop flight. |
| K-31 | "It is on the board with the other official maps." | Official 2026-10-27, from the project notes. |
| K-32 | "Your own props are in the FPV view now, and the quad throws a shadow in the sun. A Props and shadow row in Settings turns either off." | PR 164 (commit a8d84d8): props in the FPV view, the quad's sun shadow, the Props and shadow row. |
| K-33 | "Field of view sits beside Camera angle in Settings and Rates." | PR 163 (commit ca36471, 27 October). |
| K-34 | "On a keyboard the sticks ramp steadily from cruise to full while a key is held." | PR 174 (commit 3aabc62, 28 October). |
| K-35 | "Chapter 06", "WHAT'S COMING NEXT?", "The game will keep building." | As chapter 4's last page did (F-27, F-28). |

### Chapter 5 pictures

All `file` jobs from the project's shared folder, named with their pull request in the `note` of each sidecar in `captures/c5/`. Used: `multiplayer/shots/showcase`, `multiplayer/shots/2026-10-26-final`, `multiplayer/overview-cam`, `multiplayer/map-vote`, `goat-herding`, `drift-matsuri`, `sunnyfield`, `props-in-view`, and the simulator-drawn frames in `tcmore-warehouse/shots-v2`. Not used: the photographs and stills of real places beside them.

## Chapter 7. Game night

Eleven pages: the cover and ten, 28 to 30 October 2026. The owner's ask of 1 November: add Chapter 7 for what reached the simulator's `main` after chapter 5, up to the end of 30 October, and "really work to improve the quality of the comic". Dates are Perth time (AWST) as the notes give them. Chapter 6 (Twenty two new maps) is on `main` already; its page table and FACTS were never written into this file, so its letter, L, is left free and this chapter takes M. Every picture is a frame the simulator drew, from a checkout at 883f799; see Chapter 7 pictures.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, GAME NIGHT, 28 to 30 October 2026. Panels: The ribbons, SNIP; The ball, GOAL; The track, MX. | A dogfight; a ribbon streaming; Quad Ball after a goal; the Ridgeline MX start straight. |
| 1 | Dogfight | M-04, M-05, M-06, M-07 | A dogfight; the POP card; the phone's GUN and MISSILE. |
| 2 | Ribbon cutting | M-08, M-09, M-10 | Three frames of ribbons streaming. |
| 3 | More games | M-11, M-12, M-13, M-14 | Goat herding with bots, two frames; Drift Matsuri with bots; the Mini games page. |
| 4 | Two small things | M-15, M-16 | A goat in the street; the Konex Drone logo on its own. |
| 5 | Quad Ball | M-17, M-18, M-19 | The goal burst; the kickoff count; up the pitch. |
| 6 | Ridgeline MX | M-20, M-21, M-22 | The start straight; the bikes; the take card. |
| 7 | Career | M-23, M-24, M-25 | The skill tree; a lesson in the shop; the Paint Shop. |
| 8 | Quad picker | M-26, M-27 | The picker for the town; a whoop in the town. |
| 9 | Also | M-28, M-29, M-30 | Sunnyfield's gardens and streets; the take card. |
| 10 | Next | M-31 | The town from above; the blank panel, Chapter 08 and its title. |

| Id | Line | Source |
| --- | --- | --- |
| M-01 | "Chapter 07" and "GAME NIGHT" | The book's own title for the chapter. The cover tag on Chapter 1 reads "New: Chapter 07, Game night". |
| M-02 | "28 to 30 October 2026" | The span of the pull requests and commits below, in Perth time. |
| M-03 | "SNIP", "GOAL", "MX" and the three panel tags | The game's own words for a cut ribbon (SNIP!, simulator PR 180) and a goal (GOAL!, PR 184), and the map's initials (PR 185). |
| M-04 | "Dogfight. Guns, missiles and bots, on any map, alone or in a room." | Simulator PR 179 (on `main` on 29 October with PR 180 and the bug hunt, PR 181): guns, missiles, bots, the arena picker on any map, and its room version (commit 28f2165). |
| M-05 | "Get popped and you are straight back in." | PR 179: a hit pilot is popped and put back in the air after a short wait (the card says BACK IN). |
| M-06 | "On a phone, GUN and MISSILE sit beside the right thumb plate." | Commit cb4bacc (29 October): "GUN and MISSILE beside the right thumb plate, not on it". |
| M-07 | "Up to seven bots, rookie to ace, and each has its own habits. Missiles can be dodged. In a room the host fills the roster with bots." | PR 179: bots none to seven, skills rookie, pilot and ace, seven personalities, missiles that lose a target outside their seeker cone; commit 28f2165 and commit a9e5f58 (Fill the roster). |
| M-08 | "Ribbon cutting. Every quad trails a ribbon. Cut the others and keep yours. The last pilot with a ribbon wins." | PR 180 (landed on `main` inside the dogfight's merge, 29 October): the owner's ask of 04:04Z. |
| M-09 | "Alone against bots, on any map." | PR 180, solo with bots on any map. |
| M-10 | "Or in a room, with the host's bots in the empty seats." | PR 180: rooms, and the host's bots flying in seats. |
| M-11 | "Goat herding with bots. Push the goats home. Most goats wins the round." | Commit 3e2c46c (29 October): "Goat herding with bots: a round, most goats wins". |
| M-12 | "In a room there is one herd for everybody, and the host's bots join in." | Commits 0231461 and 0967468 (29 October): goat herding in a room, the host's herd, with the host's bots. |
| M-13 | "Drift Matsuri with bots. Everyone films the cars, and the best reel wins." | Commits e9d5b0c, 0967468 and 7edea00 (29 October): best reel wins, solo and in rooms. |
| M-14 | "Every game sits on the Mini games page. A bug hunt over all of them went in too." | The Mini games page (commit fb469d7, 29 October); PR 181, the mini games bug hunt. |
| M-15 | "Patron goats are coming. A goat with your name on it in the goat herding map." | PR 182 built the goats, but main's list still holds only made up EXAMPLE entries, so on 6 November the owner had the line reworded from "Every patron adds one more goat to the goat herding map." to say it is coming, with no date. Nothing about tiers, names or amounts is lettered, and no plate is read in any picture: main's list still holds three made up EXAMPLE entries. |
| M-16 | "Konex Drone. A small Konex Drone logo is hidden in every map. Some are in hard to reach spots." | PR 183 (29 October). The name is spelled as the simulator's partner roster spells it. No map frame shows a logo and nothing says where one is. |
| M-17 | "Quad Ball. Rocket League with quads. Pink against mint, and the ball goes in their goal." | PR 184 (on `main` 30 October): the owner's ask of 29 October, "rocket league but with quads". |
| M-18 | "One against one up to three against three, with bots or in a room." | PR 184: matches from 1v1 to 3v3 alone with bots and in rooms with bots. |
| M-19 | "The arena has stands, a crowd and a cage of light. Goals set off fireworks." | PR 184: the arena art passes (commits 70a863f, 7e99887) and the goal fireworks (commit 4d90d80). |
| M-20 | "Ridgeline MX. A motocross track on the Mini games page. Fly the camera behind the pack and film it for a minute." | PR 185 (30 October): a motocross chase cam mini game on the Mini games page, modelled on Drift Matsuri. |
| M-21 | "Ten bikes in three packs. They whip, scrub, lean and throw roost." | PR 185: ten bikes in three packs; whip, scrub, lean and roost. |
| M-22 | "A finish arch, bunting, marshal huts and advertising boards line the start straight. Best reel wins." | Commits 9477fa8 (finish arch, bunting, marshal huts) and 90de503 (advertising boards); PR 185 (best reel wins). No board's lettering is read. |
| M-23 | "The career is a skill tree now. Fly the trunk to the Rookie Licence, then grow Race or Freestyle." | PR 171 (28 October): the tree, the trunk of four lessons ending in the Rookie Licence, then Race and Freestyle. |
| M-24 | "73 lessons in 18 parts. Many of them are flown in the real maps." | PR 171 and its PROGRESS entry: 73 lessons in 18 parts, lessons in the houses, the shop, the town, the drift map and board maps and tracks. |
| M-25 | "Finish a part to earn a livery for your quad. Your career title shows beside your name in a room." | PR 171: every part flown all the way through earns a livery (18 and the house paint); the title is sent to a room and printed beside the handle. |
| M-26 | "Pick your quad. Fly the five inch or the whoop on any freestyle world. The page says which one the map was built for." | PR 173 (28 October) and commit 0f57f60: the picker, Recommended on the map's quad, and the manga page before every map. |
| M-27 | "A sweep afterwards made sure everything follows the quad you pick: your props, your chase view and the other pilots in a room." | PR 178 (28 October): props in view, the ghost, the room's quads and the chase rig follow the world scale. |
| M-28 | "Sunnyfield is set dressed. Window boxes, patio sets, grills, bins and bikes." | PR 177 (28 October): the dressing on every house and shop. |
| M-29 | "The take card goes when you tap it. Its labels follow the map." | Commit 6722107 (30 October): tap to dismiss, map specific labels. |
| M-30 | "A craft wedged at the foot of a wall is set down." | Commit d431970 (29 October), bug ticket 6c405527. |
| M-31 | "Bots, ribbons, a ball and a dirt track in three days. Pick a game and go for a fly.", "Chapter 08", "TWO NEW WORLDS", "Turn the page." | Dogfight and ribbons with bots, a ball and a motocross track are PRs 179, 180, 184 and 185 over 28 to 30 October. Since Chapter 8 was added this page leads into it and carries no link, as chapters 2 to 4 did (the one link out, FLY NOW to https://webfpv.org/sim/, now closes Chapter 8). It first ended as chapters 4 and 5 did (F-27, F-28, K-35). |

### Chapter 7 pictures

Rig frames, from the simulator at 883f799 served from a checkout and run through `tools/shoot/c7.js`: the page is booted into the mini game on its own map, the bots fly, and the camera is put beside a bot with the simulator's own camera override. The goat frames (3-a, 4-a) and the goat table (3-b) are the lower half of the goat thread's frames (`goat-herding/polish`, `mini-games/shots`, PR 167 and commit 3e2c46c), because the rig could not frame a herd. The Quad Ball frames came from the simulator's own `scripts/ball-check.js --shots`, the career lesson from the career thread's frames (`career-skill-tree/build-2`, PR 171) and the Ridgeline start straight from the motocross thread's (`moto-chase/pass3`, PR 185); those are `file` jobs, and every sidecar in `captures/c7/` names its pull request. Three pictures are changed only by what is hidden or cut in the frame, never painted: the Mini games page (3-d) is cut to its left two columns and has its tag chips and the store chip hidden, because one card's thumbnail carries a name the book never letters; the picker (8-a) is cut above the line that names the tune; no frame shows a hidden Konex Drone logo. The Konex Drone panel is the logo file the simulator serves, by itself. The take card and the picker are the simulator's own pages.

## Chapter 8. Two new worlds

Nine pages: the cover and eight, 1 to 3 November 2026. The owner's ask of 3 November: add Chapter 8 for what reached `main` of the simulator, the board and the front page after chapters 6 and 7, up to that day, with Chapter 7's last page turned into the lead in and the one link out moved to this chapter's last page. Dates are Perth time (AWST) as the release notes give them. FACTS letter N follows chapter 7's M. Every picture is a frame the simulator drew, from a checkout at f23ce7f; see Chapter 8 pictures.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, TWO NEW WORLDS, 1 to 3 November 2026. Panels: The coaster, WHOOSH; The room, AGAIN; The phone, THUMB. | Hanabi Sound's stage and fireworks; the coaster and its loop; the Quad Ball results card; a phone in flight. |
| 1 | Hanabi Sound | N-04, N-05, N-06 | The stage from over the crowd; fireworks and lasers; the ferris wheel. |
| 2 | Yumeboshi Land | N-07, N-08, N-09 | The lift hill; the park's hub; the rides. |
| 3 | Quad Ball rooms | N-10, N-11, N-12, N-13 | The room before the kickoff; the results card; the card after one Rematch. |
| 4 | Sound | N-14, N-15 | The quad on its pad; the lettered THOCK. |
| 5 | Phone play | N-16, N-17 | Thumb stick size in Settings; a dogfight on a phone. |
| 6 | The manga look | N-18, N-19, N-20, N-21 | Conifers and grass; Hyoura Island's sea; Momiji Pass's car park; Hayate Circuit's pit roof. |
| 7 | Also | N-22, N-23, N-24, N-25, N-26 | The title cover; the board's Maps page; the front page's partner row. |
| 8 | Next | N-27 | Yumeboshi Land from above; the blank panel and FLY NOW. |

| Id | Line | Source |
| --- | --- | --- |
| N-01 | "Chapter 08" and "TWO NEW WORLDS" | The book's own title for the chapter. The cover tag on Chapter 1 reads "New: Chapter 08, Two new worlds". Chapter 7's last page now carries the same title as the lead in, "Turn the page.", and no link out. |
| N-02 | "1 to 3 November 2026" | The span of the pull requests and the commit below, in Perth time: simulator PR 208 merged 08:47 on 1 November, PRs 219 and 220 at 06:24 and 06:27 on 3 November. |
| N-03 | "WHOOSH", "AGAIN", "THUMB" and the three panel tags | The book's own sound effect for the coaster (simulator PR 220), the word on the results card's button (Rematch, board PR 63) and the phone's sticks (PR 209). |
| N-04 | "Hanabi Sound. A dance festival at dusk. A main stage, a crowd at the barrier, and fireworks over the field." | Simulator PR 219 (3 November): a built in freestyle map, working name Hanabi Sound, dusk, main stage, a crowd packed at the barrier, fireworks. Board PR 66 (the copy of the registry and the picture). |
| N-05 | "Lasers fan out across the sky and the crowd jumps to the beat." | PR 219: fireworks, lasers and the screens run on the GPU from one clock; the crowd jumps on a 128 BPM beat with arms up. No count of people is lettered. |
| N-06 | "There is a ferris wheel, bars, food trucks and a sound desk in its tent. Named gaps to thread include one under the decks and one through the big wheel." | PR 219: the ferris wheel, two bars, six food trucks, the sound desk under a tent, and 16 named gaps including "under the decks" and "through the big wheel". No hidden sign is framed or placed. |
| N-07 | "Yumeboshi Land. A theme park with a roller coaster to fly. A chain lift, a drop, a loop, a helix and a tunnel through the dragon mountain." | Simulator PR 220 (3 November): the Ryusei coaster, with a chain lift, a drop, a loop, a helix and a tunnel through the dragon mountain. Board PR 67. |
| N-08 | "A gate, a main street of shops, a hub with a carousel, a castle and a lake with swan boats." | PR 220: the gate, the main street of shops, the hub, the castle, the lake with swan boats, and the carousel among the rides. |
| N-09 | "The big wheel, the carousel, the drop tower and the other rides move, and they are solid where they are drawn. A train runs the coaster." | PR 220: rides that move and are solid where they are drawn (big wheel, carousel, drop tower, teacups, swing ride, swinging ship); a five car train runs the coaster on a timetable. |
| N-10 | "Quad Ball rooms got fixed up. The match clock runs, and each pilot starts at their own team's end." | Simulator PR 208 (1 November): the room match clock that froze now runs; a room's ball pilot is seated at their own team's end. |
| N-11 | "Every mini game now asks how you want to play: with bots, make a game or join with a code." | PR 208: every mini game asks "How do you want to play?" with Play with bots, Make a game, Join with a code (and Quick match for Quad Ball, not lettered, see What is not lettered). |
| N-12 | "When a match ends everybody gets Rematch, Fly on or Leave." | Simulator PR 208 and board PR 63 (1 November): the results card carries Rematch, Fly on and Leave for every pilot, checked in the simulator's quickball scene. |
| N-13 | "More than half the pilots asking starts the next match. A pilot who leaves keeps a bot in their seat, and a pilot left alone gets a bot to play." | Board PR 63: `blAgain`, more than half the pilots starts the next match, a pilot left alone gets a bot; `ballLeft`, a bot in a leaver's seat. |
| N-14 | "The sounds got softer. Cues are rounder, clicks and crashes start slower with less top end, and the wind is a steadier, lower hush." | Simulator PR 216 (2 November): sine cues, gate click and crash with slower attacks and less top, gentler menu taps, a smoother low leaning wind in the pull request, lettered as a steadier, lower hush. Nothing about level, speed or response. |
| N-15 | "THOCK" and "Landing and take off are a deep thock now, and the motors have more body." | Simulator PR 217 (2 November): landing and take off are a deep thock; the motor bus gets a bigger low shelf. |
| N-16 | "Thumb stick size. On a touchscreen, pick Small, Normal or Large sticks. Bigger sticks are easier to hit and give your thumb more room." | Simulator PR 209 (1 November): a "Thumb stick size" row, Small, Normal, Large, shown only on touchscreens; the Settings row's own words say bigger sticks are easier to hit and give the thumb more room. |
| N-17 | "In the mini games the GUN and MISSILE buttons follow the stick size. On the ground they fade away, and in the air they come back." | Simulator PR 215 (2 November): the mini game fire buttons read the plate's size and fade out on the ground and back in the air. |
| N-18 | "The new maps got a manga pass. Conifers are drawn as layers of points and the grass is inked in tufts." | Simulator PR 210 (1 November): drawn conifers (whorls of points) and drawn grass tufts on the new maps. |
| N-19 | "Hyoura Island has an inked sea. Shiokaze Point's cliffs show rock seams." | Simulator PR 213 (1 November): the inked sea is shared and Hyoura Island's flat sea becomes inked swell; the rock seams are Shiokaze Point's sea stacks and cliff. The owner's brief put the seams on Hyoura Island; the pull request says Shiokaze Point, so the book follows the pull request. |
| N-20 | "Momiji Pass. The car park is worn asphalt with repair patches." | Simulator PR 214 (1 November): worn asphalt with repair patches and a darker fresh aisle. |
| N-21 | "Hayate Circuit. The pit roof has seams, a walkway and its name painted on." | PR 214: seams, a walkway with a yellow safety line, and the name painted on two stretches. The name is in Japanese in the game and is not lettered. |
| N-22 | "Smaller things went in too." and "Also, 1 to 3 November" | The book's own heading. |
| N-23 | "The title cover asks one thing: Fly solo or Multiplayer. Mini games moved under Fly solo." | Simulator PR 211 (1 November). |
| N-24 | "The board's Maps page takes its worlds from the simulator's own list." | Board PR 64 (1 November): the page builds its world list from the simulator's registry. |
| N-25 | "Konex Drone is on the front page as our Spanish partner." | Front page commit f415510 (1 November, "KoneX Drone as the Spanish partner in the footer's partner row"), spelled as the simulator's partner roster spells it. |
| N-26 | "A fly note pass on the new maps made what is drawn solid, so a gap you can see is a gap you can fly." | Simulator PR 212 (1 November): the fly notes, with the owner's rule that every visible gap is flyable and every drawn solid collides. |
| N-27 | "A festival at dusk and a theme park with a roller coaster. Pick one and go for a fly.", "Chapter 09", "THE GAME WILL KEEP BUILDING.", "FLY NOW" | PRs 219 and 220. The last page is as chapters 4, 5 and 7 ended: the one link out, to https://webfpv.org/sim/. |

### Chapter 8 pictures

Rig frames, from the simulator at f23ce7f served from a checkout and run through `tools/shoot/c8.js`: the page is booted into the map and flown off the quad picker, and the camera is put where the panel wants it with the simulator's own camera override. The Quad Ball room frames (3-a, 3-b, 3-c and the cover's results card) came from the simulator's own `scripts/together-shots.js` quickball scene, which runs a board from the leaderboard checkout and has two pilots fly in one room; its door line had to be pointed at the new Mini games page to run on main (the scene fails on main without that, because the title cover changed in PR 211), done in a throwaway copy that was never committed to the simulator. The frames are kept in the project folder, `chapter-8/frames/`. The board's Maps page (7-c) and the front page's partner row (7-d) were captured from the board's `public/` and the front page's checkout, each served with a static server, so the board's own database was not running: 7-c has the cards that carry a person's name hidden, and 7-d is cut to the partner row, without the owner's address. The phone frames were shot in a 844 by 390 touch window. Nothing is painted. No frame shows a hidden Konex Drone logo, and no map frame has been checked by a person to leave one out of view.

## Chapter 9. Track of the week

Eleven pages: the cover and ten, 3 to 5 November 2026. The owner's ask of 6 November: add Chapter 9 for what reached `main` of the simulator, the board and the front page after Chapter 8, up to that day, with Chapter 8's last page turned into the lead in and the one link out moved to this chapter's last page, and fix Chapter 7's patron goat line in the same branch. Dates are Perth time (AWST), from each pull request's merge time. FACTS letter O follows Chapter 8's N. Anything already lettered in Chapters 6, 7 and 8 stays out. Every picture is a frame the simulator drew, from a checkout at 013cd22, or a frame of the real page kept by the thread that built the feature; see Chapter 9 pictures. The FPV VIP whose house was rebuilt is not named on any page, in any alt text or in any caption, by the owner's rule.

| Page | Beat | Lettered | Pictures |
| --- | --- | --- | --- |
| Cover | The book | WEBFPV, TRACK OF THE WEEK, 3 to 5 November 2026. Panels: The shop, REBUILT; The week, TOP 3; The lens, FISHEYE. | A night race; the print room; the Fly solo page; the town through the fisheye. |
| 1 | Thomas More's Shop | O-04, O-05, O-06 | The red corridor; the print room from over its wall; the workshop's far corner. |
| 2 | An FPV VIP's house | O-07, O-08, O-09 | The back yard and the pavilion; the family room; the back of the house from over the yard. |
| 3 | Five inch racing | O-10, O-11, O-12 | A chapter track by day; the pilots' corner; a tower and a dive gate. |
| 4 | Night races | O-13, O-14 | The same track at night; the Race time row. |
| 5 | Track of the week | O-15, O-16, O-17 | The Fly solo page; the board's top three ghosts; the Reset to row. |
| 6 | Fisheye | O-18, O-19 | The town through the fisheye; the Fisheye row. |
| 7 | Your handle | O-20, O-21 | The pilot editor's Tag tab; the handle lettered. |
| 8 | 369DRONE | O-22, O-23 | The FOUND card over the back fence; the front page's Supporters block. |
| 9 | Also | O-24, O-25, O-26, O-27, O-28 | Hanabi Sound and Yumeboshi Land after their cartoon passes. |
| 10 | Next | O-29 | The night track from above; the blank panel, Chapter 10 and FLY NOW. |

| Id | Line | Source |
| --- | --- | --- |
| O-01 | "Chapter 09" and "TRACK OF THE WEEK" | The book's own title for the chapter, the name of the Fly solo card (simulator commit e241a8a, board PR 78). The cover tag on Chapter 1 reads "New: Chapter 09, Track of the week". Chapter 8's last page now carries the same title as the lead in, "Turn the page.", and no link out. |
| O-02 | "3 to 5 November 2026" | The span of the pull requests below, in Perth time: simulator PR 221 merged 10:34 on 3 November, PR 238 (commit e241a8a) at 23:11 on 5 November. |
| O-03 | "REBUILT", "TOP 3", "FISHEYE" and the three panel tags | The book's own word for the shop's new layout (simulator PRs 228 to 232), the Ghost row's own words, Board top 3 (commit e241a8a), and the Settings row's own name (PR 236). |
| O-04 | "Thomas More's Shop was laid out again from the real building's photos and flights. A new floor plan, a white block of rooms, and a red corridor behind the racking." | Simulator PR 228 (4 November: the 19 flight frames and 70 phone photos, read for the building) and PR 232 (4 November: the floor plan, the white block walled to the roof, the red corridor behind the south racking to the washroom). Board PRs 71, 72 and 74 copy the redrawn thumbnail. |
| O-05 | "Behind the grey door is the print room. It has no ceiling, so you can climb over the walls and look down into it." | Simulator PR 230 (4 November): in at the grey door, now open, to the print room, "No ceilings, so you can climb over the walls and look down into the rooms". |
| O-06 | "The paint shop has its one door, the racking is full, and two plain booths stand on the floor to fly through. A sweep made sure no wall can be flown through." | Simulator PR 229 (the paint shop's one door, full racking, the workshop floor), PR 230 (two plain exhibit booths, no names or logos, flown through), PR 232 (the leak check: the air leaves the hall only through an open door, and no drawn sheet has air on both sides). |
| O-07 | "An FPV VIP's house was rebuilt from two real flights through it. The ground floor, the basement, and a back yard with a tall fence and a pavilion in the corner." | Simulator PR 233 (4 November, rounds 1 and 2): rebuilt from frames of two flights; ground floor, basement, back yard, the tall fence, the pavilion moved into the corner of the house and the garage. Board PR 75 (thumbnail). The owner's rule: "FPV VIPs", never the name. |
| O-08 | "Then the inside: the family room's wood built ins, a grey sectional, and a guest room downstairs with a second door." | Simulator PR 234 (4 November, round 3): warm wood built ins, the sectional is grey, the basement guest room has a second door. |
| O-09 | "Then the outside: two maples, the houses next door and over the back fence, and the upstairs windows where the flights show them." | Simulator PR 235 (5 November, round 4): two Japanese maples, the neighbours west and behind the back fence, the upstairs back wall's four windows. Board PR 76 (thumbnail). |
| O-10 | "Five inch racing got a pass. Gates and flags are printed race orange and yellow, so they read across the field." | Simulator PR 221 (3 November), commit 61f0f23: gate headers and sleeves race orange, flags yellow and orange, so they read across the field. |
| O-11 | "Behind the start pads is a pilots' corner: a shade, the timing table and a net, all solid." | PR 221, commit 43c1a84: a pop up shade, the timing table and a safety net, solid as drawn. |
| O-12 | "Six new tracks are in the builder's list, with slaloms, spirals, split S, loops and dives. On the board a five inch track's sheet has a race pack and a setup sheet to print." | PR 221, commits f13d686 and 8cf102d: six original tracks in the builder's list, rebuilt around the owner's "slalom, spiral up and down, split S, loops, dives"; board PR 68 (3 November): the race pack and Print the setup sheet on every five inch track's sheet. The tracks' names start with the word Chapter and are not lettered, so they are not read as this book's chapters. |
| O-13 | "Night races. In the builder a five inch track can be set to Night. It is flown under a moon and stars, with every gate outlined in LED strip." | Simulator PR 222 (3 November): Race time, Day or Night, in the builder's field panel; a dark sky with a moon and stars, every gate opening in LED strip, the flag masts lit. |
| O-14 | "Race time in Settings flies any five inch track by day or at night, or at the time its builder picked. The six new tracks are on the board too, so your laps on them go up." | Simulator PR 226 (3 November): Settings, Screen, Race time: Track (the default), Day, Night. Simulator PR 222 (commit f849cec): the six tracks carry the ids they were published to the board under, so a lap on one posts to that board track. |
| O-15 | "Track of the week. Fly solo has a card for one official track each week. The best lap by Monday wins the week." | Simulator commit e241a8a (PR 238, 5 November) and board PR 78 (5 November): `/api/week` names one official full size track a week; the card's own caption ends "The best lap by Monday wins the week." |
| O-16 | "Ghost: Board top 3 flies the three fastest laps on the board with you at once. With the ghost off, every gate reads your gap to your best lap." | Commit e241a8a: "Ghost: Board top 3 flies the three fastest board ghosts at once"; "The gate gap reads against your own best lap when the ghost is off". |
| O-17 | "Reset to: Last gate puts you back just past the last gate you flew through. A knock on a prop alone now arms auto reset, unless you climb out upright." | Commit e241a8a: Settings, Reset to: Last gate (the row's own help: "put you down just past the last gate you flew through"); "A prop only knock arms auto reset, and a pilot climbing out upright is let go". |
| O-18 | "Fisheye. A row under Field of view bends the picture the way a real FPV lens does: Off, Slight, Medium or Strong." | Simulator PR 236 (5 November): a Fisheye row under Field of view, Off, Slight, Medium, Strong, bending the lens toward a real FPV lens's projection. |
| O-19 | "It is off until you pick it, and only your own camera bends. The career's target marker and the mini game markers bend with it." | PR 236 (Off is the default; only the pilot's own lens; the mini game HUD markers bend with it) and PR 238's fix, commit aae8534 (the career target marker bends with the fisheye). |
| O-20 | "Rooms. Pick your own made up handle on the pilot editor's Tag tab: a first word, a second word and a number." | Simulator PR 231 and board PR 73 (4 November): the Tag tab, two closed word lists and a number. |
| O-21 | "ECHO KOI 61" and "Listed, school safe and streamer rooms still never show a typed name, so every handle comes from the lists." | The handle on the tab in the picture (a made up one, `tag-tab.png`); the tab's own words and board PR 73 ("Listed, school safe and streamer rooms still never show typed text"). |
| O-22 | "369DRONE, a Japanese FPV brand, is supporting WebFPV. Its sign is in the freestyle maps to find, and a find gets its FOUND card." | Simulator PR 237 and board PR 77 (5 November): a map only supporter, not a partner, painted in freestyle maps and findable, with the found panel. Spelled 369DRONE. "Japanese FPV brand" is the front page's own label. No price, tier or amount is lettered, and it is not put in any partner row. |
| O-23 | "On the front page it sits in the Supporters block in the footer, beside YourFPV." | Front page commit 076836f on `main` (5 November): "Add 369DRONE to the footer's Supporters block", beside YourFPV, not in the Official partners row. |
| O-24 | "Smaller things went in too." and "Also, 3 and 4 November" | The book's own heading. |
| O-25 | "On the newer Chrome for Android, yaw from a radio no longer goes missing." | Simulator PR 227 (4 November): the newer Chrome on Android lays a radio out with yaw on axis 2, and the guess now reads it there. Not flown on a phone. |
| O-26 | "The pilots' corner net no longer streaks, and its canopy is solid where it is drawn." | Simulator PR 223 (3 November). |
| O-27 | "Hanabi Sound got more cartoon: a rounder crowd, round trees and pods on the big wheel." | Simulator PR 224 (3 November): manga proportions for the crowd, round cartoon trees, round pods on the ferris wheel. The pull request's "cheaper to draw" is not lettered. |
| O-28 | "So did Yumeboshi Land: its own trees, striped awnings and a round topped castle arch." | Simulator PR 225 (3 November): the park's own trees, striped awnings, a round topped castle arch. |
| O-29 | "Two places rebuilt, races at night and a new track every week. Pick one and go for a fly.", "Chapter 10", "THE GAME WILL KEEP BUILDING.", "FLY NOW" | O-04 to O-17. The last page is as chapters 4, 5, 7 and 8 ended: the one link out, to https://webfpv.org/sim/. |

### Chapter 9 pictures

Rig frames, from the simulator at 013cd22 served from a checkout and run through `tools/shoot/c9.js`: the page is booted into the map or track and flown off the quad picker, and the camera is put where the panel wants it with the simulator's own camera override. In Thomas More's Shop and the house the camera stands in the map's own plan metres, turned into the world's by the map's `worldAt`. Every map is drawn on the Low graphics preset, because on High the headless software renderer took minutes a frame and the rig timed out. The five inch frames are the chapter track Tower Dive, copied from the simulator's builder list into `tools/shoot/tracks/`, by day and with Race time set to Night. The Fly solo page and the board top 3 ghosts read the live board at https://webfpv.org/board: a simulator served on loopback asks for its board at 127.0.0.1:3100, and `tools/shoot/c9-board.js` answers there by passing each GET on to the live board, so the Track of the week card and the ghosts carry the handles and times the board shows. The ghosts (5-b) are the board's top 3 laps on a chapter track, opened by its share link with Ghost set to Board top 3, and the frame's quad is flown through the start gate by the simulator's own test pilot (`scripts/lib/pilot.js`) so the lap starts. The house's figure is hidden in the house frames, because it sits at the patio table and walks to the sofa and is not part of the rebuild. In the Settings frames the pointer rests on the row, so the note beside the list is that row's own. Two pictures are frames of the real page drawn by the thread that built the feature and kept in the project folder: the Tag tab (`room-names/tag-tab.png`, sim PR 231) and the 369DRONE find on a back fence (`369drone/found-panel-heads.png`, sim PR 237, a real find fired in a headless flight). The front page's Supporters block (8-b) was shot from the front page's checkout at bc17462, served with a static server, cut to the Supporters row, without the owner's address or anything else in the footer; that frame is kept in the project folder, `chapter-9/frames/landing-supporters.png`. Nothing is painted. No frame shows a hidden Konex Drone logo on purpose, and no map frame has been checked by a person to leave one out of view.

## What is not lettered

- A whoop mass, in grams or any other unit. Not 16 g, not 23.4 g, not 710 g on a whoop panel. Chapter 2 keeps to it: its whoop page letters the gravity and the motors, not the mass.
- 40 m/s as a lap. The title blurb and `LAP_TOP_SPEED` stay in RESEARCH.md.
- Any commit count, and the notes' line count.
- Patreon tiers, from either September note.
- Matt's Flooring. It is maps-only and not on the partners page.
- A school name, a student, a child.
- Git authors as the credits. The credits sentence is the one in `credits.js`.
- Kana callouts, even as decoration.
- A ranking of any other simulator.
- Chapter 3 leaves out: Dan judging the pilot in every RaceGOW room (his lines are written by Mat and Claude, not his own words, and the owner has not said yes), Heads' shouted lines (placeholders), the camera angle slider and the Air grip slider's new top (small), the default tunes (no picture), xWallow's name (the owner has not said to credit it), the goats being solid or crashable (they are not), the claim that every other map is silent (the goats play Nick's clip on Joshua Bardwell's map), and any claim the sources do not make.
- Chapter 4 leaves out: multiplayer rooms, the front screen's Fly solo or Multiplayer choice and the pilot builder (simulator PRs 153, 156 and 157, and the multiplayer commits), which are behind `?mp=1` and not public yet; anything for the Steam edition (board PRs 36 and 37); the board's `?ref=` tag count (board PR 40); the board's concurrent flyers history (board PR 38), which is an API and which no page shows; Heads' and Dan's lines in the simulator (placeholders); the JSL trick's tier; the prices, tiers and amounts of any plan; any claim about speed, delay or smoothness, including the pull requests' own latency notes; anything about Betaflight.
- Chapter 5 leaves out: the quad picker (PR 173) and the career skill tree (PR 171), which are open drafts and not on `main`; anything for the Steam edition; any claim about speed, delay or smoothness, including the pull requests' own latency notes and the town drawing less on Low; the multipliers and score numbers of Drift Matsuri; counts, scale and sizes of any map; the Sunnyfield plant's board of days without a mishap, and any word that names another show or town; the names of the real people behind the pilot builder's parts, and the photographs and stills of real places and people; typed chat in a public room; Betaflight.
- Chapter 7 leaves out: anything for the Steam edition; the deploy's minify and the town's lower quality buckets (commit 8c008d7, which is internal); every latency, speed, delay or smoothness claim, including the pull requests' own latency notes and the arena's entries in PROGRESS.md; Patreon names, tiers and amounts, with the patron goats (PR 182) lettered only as coming, a goat with your name on it, since main's list holds only made up example entries (reworded on 6 November from "Every patron adds one more goat"); where any hidden Konex Drone logo hangs, and the logo challenge and prizes it belongs to; every brand on the Ridgeline MX boards; the bots' names as anything but names on the screen; Quad Ball's quick match and its door (30 October, after the owner's word on matchmaking, still to be settled in the board's CLAUDE.md), its ball spin and cushioned touches, and everything merged on 31 October and 1 November (Chapter 6's maps, the bug board fixes, the thumb stick size, the title page's Fly solo and Multiplayer, Quad Ball's rematch vote). Heads' and Dan's lines are placeholders and are not quoted.
- Chapter 8 leaves out: anything for the Steam edition (simulator PR 186, front page commit 5405d7b and any wishlist button, which the title and front page frames have hidden or cropped out); the support prompt shown count (board PR 65, internal); every latency, speed, delay, smoothness or response claim, including the pull requests' own latency notes; Quad Ball's quick match and its door (the board's CLAUDE.md line on matchmaking is still the owner's to settle); the motor voice work still in draft (simulator PR 218); the 5 inch race pass (simulator PR 221 and board PR 68, both open); the counts of people, trees, rides and metres in the pull requests; the Japanese lettering on the boards of the new maps; where any hidden Konex Drone logo hangs; and what merged after simulator PR 220: commits dceceb4 and f23ce7f on 3 November (offering a tune on the plant it was measured on), held for the owner's word.
- Chapter 9 leaves out: anything for the Steam edition and any wishlist button (the Fly solo frame has the store chip hidden); the support prompt and its beacon; every latency, speed, delay, smoothness or response claim, including the pull requests' own latency notes and "cheaper to draw" in the titles of simulator PRs 224 and 225; prices, tiers and amounts, including what 369DRONE gave; the name of the FPV VIP whose house was rebuilt (the owner's rule: "FPV VIPs"); the chapter tracks' own names, which begin with the word Chapter; the capture mode for mini game footage (commit d9176df), which no pilot sees; the dive and launch gate frame bake (simulator PR 221, internal); the frame counts, metres, triangle and call counts in every pull request; the Konex Drone logo on the front page's first screen (front page commit 7691021, 5 November), which the owner did not list and is held for the owner's word; and what merged after simulator PR 238 and board PR 78: commits 76dce4a (the joystick picker and the calibration wizard end when their screen is gone), fdc86df and 4965e2a (the bug report's throttle line), all on 6 November, held for the owner's word. Patreon and the patron goats stay out apart from Chapter 7's reworded line.

## Self review

Motive comes before product: the question and the yes, then him, then anyone who cannot install or buy a sim. The builder is shown, then flown. The feel is asked, not answered: no mass, no formula. The testers are named as the credits name them. The line about a real quad comes after the work, not on the cover. The last page is a comic page with one link out and a blank panel, which is the reason to want the next chapter.
