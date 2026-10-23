# Storyboard

Date: 2 October 2026. Voice is Mat, first person, plain. The interview is in STORY.md, verbatim; the words below are his with the typos cleaned, and they add no claim. The copy of record for every word and where it sits is `docs/chapters.js`. This file says where each lettered line comes from.

Chapter 1 is the whole origin, told once: the question, the yes, who it is for, the builder, the feel that nearly stopped it, the testers, the line, the notes so far, and a last page that points at the sim and leaves the next chapter blank on purpose (STORY.md, How the book uses this). Later chapters are one release, or one chunk of features, each (STORY.md section 5).

Flight is from the goggles or from a camera beside the quad. No face. No children. No classroom. No school name. VelociDrone is named only as his words for a sim people could not buy, and is not ranked.

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
| F-12 | "Then I wanted it to be accessible for all the people that could not buy a VelociDrone, or what not." | STORY.md section 2. His noun, not a ranking. |
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
| 15 | Next | F-27, Chapter 04, F-28, FLY NOW | Nick waving over the pool (chapter 2's picture); the blank panel. |

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

## Self review

Motive comes before product: the question and the yes, then him, then anyone who cannot install or buy a sim. The builder is shown, then flown. The feel is asked, not answered: no mass, no formula. The testers are named as the credits name them. The line about a real quad comes after the work, not on the cover. The last page is a comic page with one link out and a blank panel, which is the reason to want the next chapter.
