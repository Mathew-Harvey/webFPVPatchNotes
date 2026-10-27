# Release notes, 24 to 27 October 2026

Written from what reached `main` of the simulator (pull requests 135 to 155 and the owner's direct pushes, linked as commits), read on 27 October 2026. Times are Perth time (AWST), as the public notes page uses. Anything on a `test` branch or in an open pull request is left out. Anything not public yet is left out. Most of it has been checked by scripts and a headless browser only.

The book's version of these notes is chapter 4, Other people's tracks, in `docs/chapters.js`. This file is the long form. Every bullet ends with where it came from: the simulator is `Mathew-Harvey/WebFPVSimulator`.

## Tracks

- **TinyLaps tracks open in WebFPV (24 October).** A track made in Kwayzu's TinyLaps whoop gate editor (https://tinylaps.kwayzu.com) opens in WebFPV from a button on their editor and from Import in the track builder. Before the flight it is published to the board under an id that is a hash of the file, so the same file is found again. Nobody owns it: anyone can open it from the board with Edit and publish a copy. Simulator PR 148.
- **TinyLaps links settle (24 October).** The link no longer stays in the address once the track is seated, so a reload flies the track you picked last. Simulator PR 149.
- **TinyLaps tracks draw their thumbnail (24 October).** The tab that publishes a TinyLaps track now draws its share card and picker thumbnail, only while the quad is parked. Simulator PR 150.
- **RaceGOW6 Track 3 in the yards (24 October).** The board's RaceGOW6 Track 3 stands on Heads' front lawn and Nick's back lawn at the houses' own scale, and on Bardwell's lawn north east of the woodshed at the whoop room's scale, which makes it the whoop's 28 inch track there. Fly through the start gate and the lap clock starts, each gate beeps and each lap is called out. Fly away from the track and it resets. Land a five inch in the white box at Bardwell's and it asks "Swap to the whoop?". The floor carries MiniFigs.me and RaceGOW6. Simulator PR 147 and commit 9120524.
- **Whoop track GIFs are drawn in the whoop room (24 October).** A whoop track's lap animation is shot in the room, with the sim's posters and the course's floor logos, where it was shot on a black stage. Simulator PR 145.
- **Gate markings are hidden in course previews (24 October).** Previews in the picker, on board cards and in publish thumbnails show only the pipe gates and props, without the race's lit outline and glow. Simulator PR 146.

## Freestyle

- **JSL (24 October).** A new freestyle combo: a Juicy Flick, then a Slingshot, then a Laser Flip or a Power Loop, flown back to back. It is worth 650 points in the trick list. Simulator PR 139.

## Mini games

- **The twelfth JB sticker rides a goat (24 October).** Nobody found it on the mailbox out at the road. It now sits on the flank of one goat and moves with it, and the callout says "On a goat". Simulator PR 140.
- **Nick's crash call (24 October).** On Nick Burns' house a hard crash plays the call one time in four, and the clip is only "Poor thing." Simulator PR 138.

## Sound and camera

- **Effects and Callouts levels (24 October).** Two new sound levels, Effects (crashes, gate clicks, grazes, landing and takeoff blips, menu taps) and Callouts (the lap time aloud and every recorded voice line). In Settings, Volume, Motors, Wind, Music, Effects and Callouts are sliders with a number box. Simulator PR 137.
- **The crash is a low thud (24 October).** The crash cue was reshaped from a bright smack to a low thud. Simulator PR 142.
- **Camera angle up to 70 (24 October).** A number box sits beside the slider. Simulator PR 135.
- **Camera angle on the landed screen (24 October).** A Camera angle slider sits under Weight on the screen shown when the quad is on the ground. Simulator PR 136.

## Flying

- **Laps keep counting when you tune (25 October).** Changing Air grip, Motor power, prop wash or Weight in the middle of a lap no longer voids it. The lap counts and is filed Tuned. Simulator PR 151.
- **3D mode, both sides of the quad are a base (26 October).** In 3D mode the quad on its back lands, slides and taps walls the way it does on its belly. Normal flight is unchanged. Simulator PR 154.

## Maps and partners

- **Heads' stop sign is solid (25 October).** The sign's plate is solid, so you can tap the wall on it. Mat's ask: "The stop sign out the front of heads house should be solid so I can wall tap it". Simulator PR 152.
- **weBLEEDfpv's sign on the whoop room wall (24 October).** A sign hangs on the whoop room's east wall. Simulator PR 144.
- **Drone Factory's sign (26 October).** The Drone Factory sign hangs on three maps: Heads' house (the east fence, outside), Joshua Bardwell's house (a stand and two banner faces) and Nick Burns' house (the garage's east wall). Simulator PR 155.
