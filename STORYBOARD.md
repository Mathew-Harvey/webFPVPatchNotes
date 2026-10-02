# Storyboard

Date: 2 October 2026. Voice is Mat, first person, plain. The verbatim interview is in STORY.md. Balloons below are that voice with the typos cleaned. They do not add claims.

Origin is curiosity. The day it flew, it became a project. It was for him, and for flying at home. Then it was for people who cannot install a sim and cannot buy one. Proudest work is the builder. The thing that nearly stopped him is the feel of a real whoop. The last page leaves the next chapter blank and hands over the sim.

Flight is from the goggles. No face. No children. No classroom. No school name. VelociDrone is named only as his words for a sim people could not buy. It is not ranked.

Every factual balloon has a row in FACTS. A balloon marked SCENE is the moment in the panel, not a claim about the product. No source, no factual balloon.

Manga and scoring are off in every flight capture, so the glass has no kana callouts. If a frame still shows a kana callout, or CJK signage, that frame is recaptured, cropped, or repainted in English, and the alt text says so.

Spot colour is mint `#7dffb4` on gates and on the one fly control. Graphite `#0c120e`. Paper `#f3ead4`. Sakura stays inside existing wordmark art.

The vertical slice is chapter 1 only: the cover and three pages, at final quality, reviewed, before any later chapter is inked.

## How a page is built

Layouts the reader knows:

| Layout | Panels |
| --- | --- |
| splash | One full page |
| stack3 | Three bands |
| stack2 | Two bands |
| top2 | One large band, two small bands under it |

Reading order is right to left across a spread, top to bottom inside a page. On a phone the same panels stack in that order, one page at a time.

Narration and speech are live text. SFX are live text unless a row says the ink bakes speed lines. Speed lines are graphite, not a second spot colour.

## Chapter 1. The gate

Date on the chapter: the simulator as it flies on 2 October 2026, commit `cbaee3f`. Almost no text. No lesson.

Course for every flight panel: a shipped five inch track whose first gate sits in front of the start pads. First choice `tracks/json/trk-a75a1bc4.json`, WCMRC Round 5. If the pad-to-gate line is a poor cold open, the shot log switches to another file in `tracks/json/` and records why. Airframe five inch. Angle mode. Graphics high. Sound off. Manga off. Scoring off.

### Cover. `c1-cover`

Layout: splash.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c1-cover | Flight. The first gate fills most of the glass. Too close. Mint opening. English OSD only. | First person view in WebFPV. A mint race gate fills the glass on a five inch approach that is already too close. | The gate is right there. It is too close. Nobody speaks. | None. The book chrome letters WEBFPV and andAgainFPV on the cover, outside the panel. |

Speed lines in the ink, at the edges. No SFX word.

### Page `c1-p1`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c1-p1-a | Just off the pad. The same gate is small, ahead. | First person view just after liftoff. A small mint gate sits ahead on a grass race field. | The quad lifts. The gate is a small opening at the far end. | None. |
| c1-p1-b | Mid approach, banked, gate larger. | First person view, banked, the mint gate larger than before. | The quad banks. The opening grows. | None. |
| c1-p1-c | The gate fills the frame. Same beat as the cover, a different frame from the burst. | First person view. The mint gate fills the frame. | The gate fills the view. The approach is too fast. | None. Speed lines only. |

### Page `c1-p2`

Layout: top2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c1-p2-a | Wide miss or a clip. Horizon tilted. The gate edge shears past. | First person view, tilted. The gate edge tears past the side of the frame. | The line misses. The horizon tips. | None. |
| c1-p2-b | Set down on the grass, low, the field still there. | First person view, low to the grass, the race field ahead. | The quad is down on the grass. | None. |
| c1-p2-c | Sitting. The gate is ahead again, smaller. | First person view from the grass. The mint gate waits ahead. | The gate is still there. | Narration, SCENE: "Too fast." |

### Page `c1-p3`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c1-p3-a | Second liftoff. Same gate. | First person view, lifting again, the mint gate ahead. | The quad lifts a second time. The same gate is ahead. | None. |
| c1-p3-b | Hold. Stable. The gate framed, not entered. End of the chapter. | First person view, steady, a mint gate framed and not yet entered. | The quad holds. The gate waits. The page turns. | None. |

### Slice as shipped

Until later chapters are inked, the book is this chapter: the cover and three pages. Page `c1-p3` is the temporary last page. It is a calm gate, an empty panel labelled Next, and the mint FLY link to https://webfpv.org/sim/. That ending moves to chapter 10 when the later chapters exist. No calm second liftoff was captured, so `c1-p3-a` prints the opening approach again, as the invitation.

Every flight frame is WCMRC Round 5, `tracks/json/trk-a75a1bc4.json`, simulator commit `cbaee3f`, angle mode, manga and scoring off. Ink keeps the mint gate. Crops are framing.

| Panel | Frame |
| --- | --- |
| c1-cover | Portrait crop of `captures/c1/debug_a1.png` on the gate. The crash notice sits above the crop. Speed lines in the ink. |
| c1-p1-a | `c1-p1-a_a1_fpv_1.png`. Glass reads 14 m. |
| c1-p1-b | `c1-p1-a_a1_fpv_2.png`. Glass reads 12 m. Level, not banked. |
| c1-p1-c | `c1-p1-a_a1_fpv_3.png`. Low and fast. Faint crash notice cropped off. Speed lines in the ink. |
| c1-p2-a | `c1-p1-b_a1_fpv_2.png`. The miss. Top buttons cropped. |
| c1-p2-b | `c1-p1-c_a1_fpv_2.png`. The horizon tips. The upright buttons stay, because the glass did not tip. |
| c1-p2-c | `c1-p2-c_a1_fpv_1.png`. Sitting. No crash sentence in this frame. Balloon: "Too fast." |
| c1-p3-a | Same frame as `c1-p1-a`. |
| c1-p3-b | Empty panel. Label: Next. Not a photograph. |

## Chapter 2. The question

Two pages. No new product UI. The pictures are crops of chapter 1, because this is the reason under the flight the reader just had. There is no photograph of the day before 11 August, and none is invented.

### Page `c2-p1`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c2-p1-a | Reuse `c1-p3-b`, darker ink. | The held gate from the page before, printed darker. | The gate holds. A question starts. | Narration, F-01. |
| c2-p1-b | Tighter crop of the gate mouth. | A tight crop of the mint gate mouth. | The opening, closer. | Narration, F-02. |
| c2-p1-c | Same frame, gated down to the opening and the paper margin. | The gate opening, most of the frame fallen to paper. | The picture falls away. The question is still there. | None. |

### Page `c2-p2`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c2-p2-a | Reuse `c1-p1-a`. | Liftoff, the gate small, reprinted. | The start of the approach, again. | Narration, F-03. |
| c2-p2-b | Paper, a thin graphite trace of the gate opening copied from the capture. No quad drawn. | A thin ink outline of a gate on blank paper. No aircraft. | A gate, drawn as a line, and nothing else. | None. |

## Chapter 3. Yes

Two pages. 11 August 2026.

### Page `c3-p1`

Layout: top2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c3-p1-a | Flight screen, status line readable: Betaflight 4.5.1, PID 1 kHz. Five inch field. | The WebFPV flight screen. The status line reads Betaflight 4.5.1 and PID 1 kHz over a race field. | The status line is on the glass. The field is already drawn. | Narration, F-04. Date stamp, F-05: "11 August 2026". |
| c3-p1-b | Crop of that status line, large enough to read after ink. | Crop of the WebFPV status line, Betaflight 4.5.1, PID 1 kHz. | The words on the status line, large. | Narration, F-06. |
| c3-p1-c | Wider field, cel shaded trees and a gate. Week one ink, still the live sim. | A cel shaded race field and a mint gate in WebFPV. | The world is inked. A gate stands in it. | None. |

### Page `c3-p2`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c3-p2-a | A hard arrival, low, tilted. | First person view, low and tilted over the race field. | The arrival is hard. | None. |
| c3-p2-b | Back at the pad after reset. | First person view back at the start, the field ahead. | The quad is back at the start. | None. |
| c3-p2-c | The pad, quiet. | The start of the field, held. | The field waits. | Narration, F-07. Then F-08. Credit line, F-09: "Mat. andAgainFPV. A pilot since 2020." |

## Chapter 4. For anyone

Two pages. Children are not drawn. The school is not named.

### Page `c4-p1`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c4-p1-a | A slow, clean approach. Angle mode. The gate arrives without the panic of chapter 1. | First person view. A calm approach to a mint gate. | The quad flies a slower line. The gate comes in clean. | Narration, F-10. |
| c4-p1-b | The same line, nearer, still smooth. | First person view, closer, still level, mint gate ahead. | The approach stays smooth. | Narration, F-11. |

### Page `c4-p2`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c4-p2-a | Live title or courses screen in a desktop browser, no installer, no account wall. | The WebFPV simulator in a browser tab, on the title or the track list. | A browser tab. The simulator is already there. | Narration, F-12. |
| c4-p2-b | The same page, the control that starts a flight. | The fly control on the WebFPV track list. | The control that starts a flight. | Narration, F-13. |
| c4-p2-c | Homepage section 07, the tab sentence visible, prices and partner marks cropped out. | The webfpv.org section that says a tab, and the controller already on your desk. | The public page says what the tab is. | Narration, F-14. Then F-15. |

## Chapter 5. Their game

Two pages. His proudest work. 13 August 2026, commit `17f0f76`, and the live builder at `cbaee3f`.

### Page `c5-p1`

Layout: top2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c5-p1-a | Builder plan with a gate, a flag, and a hurdle. English tool names. | The WebFPV track builder. A gate, a flag, and a hurdle on the plan. | The plan shows a gate, a flag, and a hurdle. | Narration, F-16. Date stamp, F-17: "13 August 2026". |
| c5-p1-b | Footer crop: length, gates, lap. | The builder footer, with lap length, gate count, and the lap. | The footer counts the lap as the pieces move. | None. The numbers stay in the picture. |
| c5-p1-c | A dive gate selected in the tool. | The builder with a dive gate selected. | A dive gate, in the tool. | None. |

### Page `c5-p2`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c5-p2-a | First person through a gate on a course placed in the builder, then flown. Real builder elements only. | First person view through a gate on a course made in the WebFPV builder. | The quad flies a gate from the course just drawn. | Narration, F-18. |
| c5-p2-b | The flag or the hurdle, from the goggles, on that same course. | First person view passing a flag or a hurdle on that course. | A flag or a hurdle goes past the glass. | None. |

## Chapter 6. The line

Two pages. Do not letter 40 m/s as a lap speed. Do not letter a commit count.

### Page `c6-p1`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c6-p1-a | A racing pass, several gates in the line, five inch. | First person view along a line of mint gates. | The quad runs a line of gates. | None. |
| c6-p1-b | OSD crop if it reads Rates as Actual 670/670/670. If the live OSD does not say that, this panel is the camera row in settings: 30 degrees, 85 degree field of view. | The rates line or the camera row from WebFPV, whichever the capture actually shows. | The picture shows the rates, or the camera angle, as the screen prints them. | Narration only if the crop matches F-19. Otherwise none. |

### Page `c6-p2`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c6-p2-a | Live board, 2 October 2026. Header visible. Handles in frame are already on the public board, so they stay. No ranking joke. | The WebFPV board on 2 October 2026. The header counts tracks, times, pilots, and maps. Pilot names on the sheet are the names the public board was showing. | The public times sheet. | Narration, F-20. The counts stay in the picture, not in a balloon. |
| c6-p2-b | One track row, a time, the weight on the row if the sheet shows it. | One row of the WebFPV board, a track and a time. | A track and a time on the sheet. | None. |

## Chapter 7. The town

Two pages. English gap labels only. Crop or repaint any CJK signage and say so in the alt text.

### Page `c7-p1`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c7-p1-a | Freestyle town, a named gap in English: crane, water tower, footbridge, billboard, or container tunnel. | First person or card view of the WebFPV town. An English gap name is readable. | The town, and a gap with an English name. | Narration, F-21. |
| c7-p1-b | Flown through that gap. Scoring off. | First person view flying an English-named gap in the town. | The quad goes through the gap. | None. |

### Page `c7-p2`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c7-p2-a | A freestyle map in the builder: crane, containers, or a road. | The WebFPV map builder, with a crane, containers, or a road. | A map, being built. | Narration, F-22. |
| c7-p2-b | Cars, Hibari Yard Tandem if that place is in the live town, otherwise the live car the town actually has. Chase meter only if its lettering is English. | Cars in the WebFPV town, from the goggles or the card that shows them. | Cars in the town. | None. |

## Chapter 8. The room

Two pages. The near-quit. Show the room. Do not letter a whoop mass. The picture is a 65 mm whoop. The plant under it, at `cbaee3f`, is the five inch. That fact may be said, without grams.

### Page `c8-p1`

Layout: stack2.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c8-p1-a | Whoop card. Facts on the card: 1S, 65 mm, indoors. Blurb about 28 inch gates if it is on screen. | The WebFPV whoop card. It reads 65 mm, 1S, indoors. | The whoop card. | Narration, F-23. |
| c8-p1-b | The sakura hall from the card or from inside the room, before a dive. Signage checked. | The indoor whoop hall in WebFPV, sakura on the walls, a gate ahead. | The hall. | Narration, F-24. |

### Page `c8-p2`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c8-p2-a | Inside the room, OSD showing 1S and 4.2 V if the live OSD does. A gate ahead. No mass. | First person view in the whoop hall. The OSD reads 1S. A gate is ahead. | The room, from the goggles. The OSD says 1S. | Narration, F-25. |
| c8-p2-b | Through a gate in that room. | First person view passing a gate in the whoop hall. | The quad passes a gate in the hall. | None. |
| c8-p2-c | Credits roll, RaceGOW rooms, as the product prints it. A capture, not a redraw of anyone's face. | The WebFPV credits. The RaceGOW room designers are named: AyyyKayyy, Cumber and Hotspur, Skittles, the Lego Dans, MrE, FPVBean. | The credits name the RaceGOW rooms. | None. The names stay in the picture. F-26 is the source if a later balloon ever lifts a name out. |

## Chapter 9. Feel

Two pages. The required line is earned here, after the work, not on the cover.

### Page `c9-p1`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c9-p1-a | Turtle prompt, or the quad on its props with the turtle control on screen. | WebFPV after a crash onto the props, the turtle control visible. | The quad is on its props. Turtle is there. | Narration, F-27. |
| c9-p1-b | Settings, Screen, predicted view on. | The WebFPV settings row for predicted view. | Predicted view, in settings. | Narration, F-28. |
| c9-p1-c | The on-screen key hints: W, A, S, D, and the arrows. | The WebFPV keyboard hints for throttle, yaw, pitch, and roll. | The keyboard hints. | Narration, F-29. |

### Page `c9-p2`

Layout: stack3.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c9-p2-a | A clean stick response in flight, five inch, after the tune. The picture is the flight, not a graph. | First person view, a crisp turn toward a mint gate. | The quad answers the stick. | Narration, F-30. |
| c9-p2-b | Credits, the four beta pilots, capture of the roll. Faces stay inside the product capture and are not redrawn. | The WebFPV credits. Beta pilots named: Asylum, Jannes, LeStar, CrapShack. | The credits name the pilots who flew it. | Narration, F-31. |
| c9-p2-c | Quiet field. One line, earned. | A quiet first person view of the race field. | The field, and one sentence. | Narration, F-32. |

## Chapter 10. Next

Two pages. The reader should want a chapter that does not exist yet. The last page is still a comic page. One control opens https://webfpv.org/sim/

### Page `c10-p1`

Layout: grid drawn as top2, four beats. This page shows how the next chapter is added. It is a comic page, not a manual.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c10-p1-a | Drawn page: an empty panel border on paper. No product. | An empty comic panel on cream paper. | An empty panel. | Narration, F-33. |
| c10-p1-b | Drawn: a folder tab lettered with a chapter id, and two picture frames. | A folder tab and two empty picture frames. | Pictures go with the chapter. | Narration, F-34. |
| c10-p1-c | Drawn: one short block, the shape of a chapter object, English words only: id, title, pages. Not a dump of the reader source. | A small hand-lettered block with the words id, title, and pages. | One object, appended. | Narration, F-35. |
| c10-p1-d | The book itself, this spread, as a photograph of the reader once it exists. Shot after the reader works. | The WebFPV comic open in the browser, this chapter's page. | The book, open. | Narration, F-36. |

### Page `c10-p2`

Layout: splash, with a blank inset panel.

| Panel | Capture | Alt | Transcript | Balloons |
| --- | --- | --- | --- | --- |
| c10-p2-a | A calm five inch approach. The gate is framed, not panicked. Opposite of the cover. | First person view. A mint gate, approached cleanly, with room to spare. | A clean approach. The gate is an invitation. | Narration, F-37. |
| c10-p2-b | Empty inset. Border only. No picture. Label: "Next". No date. | An empty panel labelled Next. | The next chapter is not drawn. | None. |
| fly | Not a picture. A mint control on this page. Live text: FLY. It is a link to https://webfpv.org/sim/ | A mint control labelled FLY. It opens the simulator. | The page offers one way to fly. | The control's accessible name is "Fly WebFPV". |

No closing caption. The empty panel is the tease. The link is the exit.

## FACTS

| Id | Balloon | Source |
| --- | --- | --- |
| F-01 | "Could I compile Betaflight, put it in a virtual world in a browser, and fly decent?" | STORY.md section 1. INTERVIEW. |
| F-02 | "Fly decent." | STORY.md section 1. The bar in that question. |
| F-03 | "It started as curiosity." | STORY.md section 1. |
| F-04 | "Yes." | STORY.md section 1. The day it flew. Picture is the live status line. |
| F-05 | "11 August 2026" | Sim commits `2f3a98c` and `983521b`, author date, Perth. First commit `45325de` the same day. |
| F-06 | "Betaflight 4.5.1. PID 1 kHz." | `src/ui/ui.js` status string at `cbaee3f`. `SIM_STEP_HZ` 1000 in `src/native/sim_abi.h`. `FC_VERSION` 4.5.1 in the pinned `version.h` at `77d01ba`. Letter this only when the panel shows the line. |
| F-07 | "It was then a project." | STORY.md section 1. |
| F-08 | "I decided to see how far we could go." | STORY.md section 1. |
| F-09 | "Mat. andAgainFPV. A pilot since 2020." | STORY.md section 7. The year is the interview, not a commit. Handle spelling is the credits file and the live board. |
| F-10 | "First it was for me. I wanted a sim that was easy to fly." | STORY.md section 2. |
| F-11 | "For my kids and for me. For flying at home." | STORY.md section 2. Words only. No child is drawn. |
| F-12 | "Most school kids have no money, and usually cannot install anything on their computers. They have no sim to fly." | STORY.md section 2. No school name. No classroom. |
| F-13 | "I wanted it for anyone who could not buy a VelociDrone, or what not." | STORY.md section 2. His noun. Not a ranking. |
| F-14 | "A quad, a radio, goggles, batteries, a charger. Hundreds of dollars and a month of crashing before any of it is fun." | webfpv.org homepage, section 07, live 2 October 2026. |
| F-15 | "A tab, and the controller already on your desk." | Homepage section 07, the emphasised sentence. Not the origin. The origin is F-03. |
| F-16 | "The part I am proudest of is the map and the track builder." | STORY.md section 4. |
| F-17 | "13 August 2026" | Commit `17f0f76`, "trackbuilder: a course authoring tool, isolated behind one JSON schema." |
| F-18 | "So people could create their own game." | STORY.md section 4. |
| F-19 | "Rates as Actual 670/670/670." Or, if the panel is the camera row: "Camera 30 degrees. Field of view 85." | Notes 26 September 2026 for the OSD sentence. `configs/rates.js` and `configs/airframes.js` at `cbaee3f` for the numbers. Letter only the sentence the picture shows. |
| F-20 | "The board. 2 October 2026." | Live board capture that day. Header in the picture: 46 tracks, 337 times, 52 pilots, 25 maps. Recapture revises this page when the sheet changes. |
| F-21 | "Freestyle is the town." | Notes, 1 September 2026. |
| F-22 | "Then the maps. People build the town too." | Notes 25 September 2026, build a freestyle map. Motive of making a game is F-18. This balloon is the map half. |
| F-23 | "Real whoops feel different. The sim feels different. How?" | STORY.md section 4. |
| F-24 | "It nearly stopped me." | STORY.md section 4. "what nearly made me quit". |
| F-25 | "A whoop plant of its own did not feel like flying. The room is scaled. The five inch flies inside it. What you see is a whoop through 28 inch gates." | `configs/airframes.js` at `cbaee3f`, the whoop65 comment and the blurb. No mass. The 15 September note's own-motors claim is superseded and is not lettered. |
| F-26 | RaceGOW designers, if lifted out of the picture: AyyyKayyy track 8, Cumber and Hotspur track 5, Skittles tracks 1 and 2, the Lego Dans tracks 3 and 4, MrE track 6, FPVBean track 7. | `src/ui/credits.js` at `cbaee3f`. Prefer to leave them in the capture. |
| F-27 | "A crash can end on the props. Turtle flips it back." | Notes: "Turtle. A crash can end on the props, and you flip back over from there." Commit `343555c`, 26 August 2026. |
| F-28 | "Predicted view draws the camera where the quad will be when the frame reaches the screen. At 60 Hz that is 17 ms, or 11 degrees of a 670 degree per second roll." | Notes, 28 September 2026. Commit `6a3a541`. |
| F-29 | "A held key is not a switch. It climbs, and full stick is late." | `src/input/input.js` `analogMag` at `cbaee3f`. About 0.16 at 90 ms, 0.34 from 240 ms to 750 ms, full only after 1250 ms. |
| F-30 | "The default tune took a quarter more feedforward. Slow to answer was ticked on 23 reports. Bounces, on nine." | Notes, 28 September 2026. Commit `eb392077`. |
| F-31 | "The testers found bugs and told me how it felt. That is where the work went." Names, from the picture: Asylum, Jannes, LeStar, CrapShack. | STORY.md section 3. Spelling from `credits.js`, not the board filter. |
| F-32 | "If it feels like a real quad, the rest is easy." | The maker's line, required verbatim with the book. Not a commit. Placed after the feel work. |
| F-33 | "A new chapter starts as an empty page." | This book. The maintainer loop. |
| F-34 | "The pictures live with the chapter." | This book. `docs/assets/chapters/` plus the chapter id. |
| F-35 | "One object, appended. Then the page is in the book." | This book. `CHAPTERS` in `docs/index.html`. |
| F-36 | "The game is built in public. The book is too." | STORY.md sections 6 and 10. |
| F-37 | "The game will keep building." | STORY.md section 5. |

SCENE, not in the table as a product fact: "Too fast." on `c1-p2-c`.

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

## Capture sheet

Chapter 1 is flown first. Later rows wait until the slice has passed review.

| Panel | Kind | Notes |
| --- | --- | --- |
| c1-cover, c1-p1-a, c1-p1-b, c1-p1-c, c1-p2-a, c1-p2-b, c1-p2-c, c1-p3-a, c1-p3-b | Flight | One closed loop approach, burst, keep two or three. Cover and `c1-p1-c` may share a burst. |
| c2-* | Reuse | Inked crops of chapter 1. `c2-p2-b` is a traced gate, no aircraft. |
| c3-p1-a, c3-p1-b, c3-p1-c, c3-p2-a, c3-p2-b, c3-p2-c | Flight | Status line must survive ink. Reset is the real reset. |
| c4-p1-a, c4-p1-b | Flight | Slower than chapter 1. |
| c4-p2-a, c4-p2-b, c4-p2-c | UI | Sim title or courses. Homepage section 07, cropped. |
| c5-p1-* | UI | Live builder. |
| c5-p2-* | Flight | Course made of real builder elements, then flown. |
| c6-p1-a | Flight | A line of gates. |
| c6-p1-b, c6-p2-* | UI | OSD or settings. Live board. |
| c7-* | Flight and UI | English labels. Manga off. |
| c8-p1-*, c8-p2-c | UI | Whoop card, credits roll. |
| c8-p2-a, c8-p2-b | Flight | Whoop room. OSD 1S. |
| c9-p1-*, c9-p2-b | UI | Turtle, settings, keys, credits. |
| c9-p2-a, c9-p2-c | Flight | Response, then a quiet field. |
| c10-p1-a to c | Drawn | Paper, graphite, one mint rule if a frame needs it. No generated quad. |
| c10-p1-d | UI | The reader, shot after it exists. |
| c10-p2-a | Flight | Calm gate. |
| c10-p2-b | Drawn | Empty frame. |

## Self review

Motive: chapter 2 is curiosity, chapter 3 is the yes and the project, chapter 4 is him and then anyone who cannot install or buy. The homepage tab sentence is a later beat, F-15, not the opening.

Unsourced claims: factual balloons are F-01 through F-37. "Too fast." is SCENE. Picture-only panels have no balloon.

Shown, not listed: chapter 1 is only flight. The builder is flown in `c5-p2`. The town is flown in `c7-p1-b`. The room is flown in `c8-p2`. Feel ends on a flight, F-32, not a list of settings.

Last page: `c10-p2` is a comic page, a clean gate, an empty Next panel, and one link to https://webfpv.org/sim/. The empty panel is the reason to want the next chapter. No caption restates a lesson.

Page count: chapter 1 is the cover plus three pages. Chapters 2 to 10 are two pages each. Twenty one pages when the book is full. The slice ships four of them.
