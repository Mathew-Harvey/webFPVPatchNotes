# Release notes, 12 to 20 October 2026

Written from the pull requests merged to `main` of the simulator (66 to 97), the board (17 to 27) and the front page (16 to 20), read on 20 October 2026. Anything on a `test` branch or in an open pull request is left out. Most of it has been checked by scripts and a headless browser only, and each section says where a pilot has flown it.

The book's version of these notes, together with the week before (RELEASE-NOTES-WEEK-2.md), is chapter 2, Open house, in `docs/chapters.js`. This file is the long form.

## Flying

- **A crash is a dull bounce (12 to 17 October).** A crash no longer stops the flight, sets the quad down and waits for the stick. The quad comes off the face at a walking pace (0.3 to 1.2 m/s), keeps three quarters of its speed along the face, loses the spin the hit gave it, and you keep flying. No set down, no Crashed notice, no impact frame, nothing teleports. Scoring still hears every crash. Auto reset, off by default, still works for a pilot who turned it on. Mat asked for it on 16 October: "fix crashing to not be annoying no reset, just dull bounce always". Simulator PR 76.
- **Touch the grass and slide (18 October).** Grass grabbed a quad that touched it. Now a 12 m/s skim slides about 10 m over about a second and eases to a stop, a nose forward touch slides 12 to 13 m without a tumble, and a slide thumps once instead of every 0.18 s. A hard arrival off the belly, more than 45 degrees over at 4 m/s or more, keeps the dull bounce. Simulator PR 83.
- **Flight mode is back in the pause menu and Settings (16 October).** Acro or Angle, the same rule the M key follows. Angle is Betaflight's own, holding 60 degrees at full stick. Simulator PR 72.
- **A Prop wash switch (17 October).** Settings, under Flight mode. On is the flight as it was, bit for bit. Off removes only the shake a quad feels in its own wash, and a lap flown with it off posts to the board tagged Tuned. Simulator PR 73, board PR 20.
- **The cross-hair follows the camera angle (12 October).** It sits where the nose points, so it is on the horizon in level flight at any camera tilt. Still off by default. Simulator PR 66.

## The board

- **Every lap saves (16 October).** Post a time on a track that is not on the board publishes it and posts in one go. Arcade, practice and tuned laps post too, each with its tag, and they rank on the clock. Simulator PR 71, board PR 19.
- **Hoops, hex gates, tables, chairs, banners and cubes publish (14 October).** Publish used to refuse them. Board PR 17, simulator PR 69.
- **Maps and Tracks (19 October).** The board is a manga magazine page: shelves for Maps, five inch tracks and whoop tracks, official entries big at the top and the pilots' as leaning panels, the chosen one ringed in sakura with focus lines, Fly this in a caption strip, a double click to fly. The same picker is the simulator's Tracks and Maps rooms. The page is called Maps and Tracks everywhere now, opens on the maps, and every publish draws a clean picture of the track or map. All 68 tracks and 69 maps on the live board had a picture by 11:40 UTC on 19 October. Board PRs 21 to 24, simulator PRs 89 to 91, front page PRs 19 and 20.
- **Official maps (19 October).** An admin can mark a map official, as a track already could. The official maps are the town, Nick Burns' house, Infinity Loops, Baka and Minami D1 Drift Track. Board PRs 21, 23 and 25.
- **A sheet flies its track (19 October).** A track's page replays the fastest lap that kept a ghost, the airframe on the recorded line and a camera chasing it. A map's page flies through its named gaps. Board PR 27, simulator PR 93.
- **An admin can republish a map without its key (15 October).** Board PR 18.

## Building

- **Stickers (15 to 17 October).** A map can carry many findable stickers cut from one sheet, for four draw calls. Infinity Loops, a tribute map, has 100 of them: each calls out "90%er", its name and "N of 100" every time it comes back into sight, and finding 90 gives an achievement of its own. The builder also asks before an old copy of a map overwrites a newer one on the board. Simulator PRs 70 and 80, board PR 18.
- **A windmill (17 October).** Under Industrial in the map builder: a white tower mill whose four sails turn at the speed you set. The sails are solid, and a quad in their way is knocked aside the way they turn. Simulator PR 75.
- **Balloon chase (17 October).** A light plane flies over a freestyle map streaming balloons. A round is 90 seconds from takeoff, every ninth balloon is gold and worth 3, and your best stays in the browser. It is a piece in the map builder, under Scoring, with a radius, a height and a speed. Simulator PRs 74 and 78.

## Nick Burns' house (18 to 20 October)

A freestyle world: Nick Burns' house, his yard and his end of the cul de sac at three and a half times life size, so a five inch flies it the way a whoop flies the real one, and on this map the craft is drawn as the whoop. Every room flies: the foyer and stair, the front room, the family room, the breakfast room, the kitchen with an LED cube gate on the island, the dining room, the basement lounge and Nick's blue workshop full of drone shelves, upstairs, the garage, the pergola, the pool and the street. Every chair is pushed in under its table, at Mat's word on 19 October: "push the chairs in everywhere to clear the flight lines". Ten NB stickers, one a room, call out Stickers, and the supporters' signs hang in the garage and the workshop.

Nick sits at his patio table under the red umbrella and every so often walks inside to the kitchen, the sofa or the bay window. He is a 3D model now, built from Mat's manga sheet, with six faces. His lines: "Holy Catfish!", "Boom Shakala!", "Stickers in the box!" and "Motor post to motor post!". Fly close and he says "I appreciate your time and thanks for watching!"; fly into him and he shouts "Holy Catfish!". He is not solid. He casts no shadow, which keeps the draw calls where they were. Simulator PRs 81, 84 to 87, 92, 94 and 95, board PR 26. Mat flew the first version and asked for the reactions to swap.

## Looks and sound

- **Sponsor logos have a look for their surface (12 October).** Sprayed like a pitch sponsor on grass, framed on a billboard, graffiti on a bando wall, a fascia sign on a building. The Konex Drone sign joins the freestyle maps. Simulator PRs 67 and 68.
- **Motors sound lower (17 October).** Bassier and muffled, like old GoPro Session 5 footage with the wind filter on. Simulator PR 79.
- **The first screen is manga panels (20 October).** Five inch racing, Whoop racing, Freestyle and Builder as ink framed panels with lettered names, no pills, bigger pictures; the Freestyle panel shows the town, Nick Burns' house and Hibari Yard. Simulator PRs 96 and 97.
- **Escape goes back one layer everywhere (19 October),** and on the first screen asks "Leave the simulator?". Simulator PR 88.
- **The STF mark is painted on no map (18 October).** Simulator PR 82.

## Also

- The support prompt shows once each time you leave a flight for the title. Simulator PR 77.
- On webfpv.org: a new description and an FAQ answer for an FPV drone game in the browser, and Also by Mat Harvey lists The Bodyweight Gym, AppHub and WebColoring. Front page PRs 16 to 18.

## Latency

Every one of these states its latency effect. None adds to the flight loop or the input path except as written: the windmill adds a distance test per step near its sails, Nick adds about 0.05 ms a frame while he is in view, and the balloon chase costs three draw calls on a map that has one. Nothing was measured on a real GPU or a weak laptop; the Input to screen reading on your own machine is the check that counts.
