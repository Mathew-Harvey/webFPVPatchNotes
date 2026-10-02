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

## Pictures

Every picture is the simulator, or the board or the site, drawn by its own code. Nothing is painted over. Where a picture shows a page of the live site or the board, the partners' marks and pilots' handles in it are the ones that page already prints, and nothing from it is lettered.

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
| `c1-p15` a | `p15-a` | Five inch, WCMRC Round 5 |

## What is not lettered

- A whoop mass, in grams or any other unit. Not 16 g, not 23.4 g, not 710 g on a whoop panel.
- 40 m/s as a lap. The title blurb and `LAP_TOP_SPEED` stay in RESEARCH.md.
- Any commit count, and the notes' line count.
- Patreon tiers, from either September note.
- Matt's Flooring. It is maps-only and not on the partners page.
- A school name, a student, a child.
- Git authors as the credits. The credits sentence is the one in `credits.js`.
- Kana callouts, even as decoration.
- A ranking of any other simulator.

## Self review

Motive comes before product: the question and the yes, then him, then anyone who cannot install or buy a sim. The builder is shown, then flown. The feel is asked, not answered: no mass, no formula. The testers are named as the credits name them. The line about a real quad comes after the work, not on the cover. The last page is a comic page with one link out and a blank panel, which is the reason to want the next chapter.
