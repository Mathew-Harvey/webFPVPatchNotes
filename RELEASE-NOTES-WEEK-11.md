# Release notes, 6 November to 10 November 2026

Written from what reached `main` of the simulator after Chapter 9's notes, read on 10 November 2026. Times are Perth time (AWST). Chapter 9's notes ended on 5 November. The simulator is `Mathew-Harvey/WebFPVSimulator`.

The book's version of these notes is chapter 10, Infected, in `docs/chapters.js`. Every bullet ends with where it came from.

## Infected and Midori Gakuen

- **Midori Gakuen (8 November).** An original two floor school in the manga look, at the size of the houses and flown on a whoop: a hallway down each floor, classrooms, a science lab with a glass tank, a library, a lunch room, a nurse's room and more. Every room has two ways out, and four vents and a book lift are the tight ways through. Simulator commit a1f1a8d.
- **Infected, the seventh mini game (8 November).** One pilot starts infected, held in the science lab's glass tank through the head start. A tag needs line of sight, tagged pilots join the infected, chains and close shaves count, the last clean pilot is gold, and a match is three rounds. The bots fly at easy, medium or hard. Simulator commit fa9331d.
- **How it looks (8 November).** Clean pilots white, infected green and the last one gold, with RUN! and INFECTED! calls, a waiting room that seats up to fifteen bots, and a card of its own on the Mini games page. Simulator commit e16ac70.
- **In rooms (8 November).** An Infected room on the school, with friends and bots in any seat. Simulator commit a0dd003.
- **After the first flights (9 November).** R and auto reset keep the round and put you back on your pad, the pads are solid mats, and the bots lean into turns and floor it when chased. Simulator commit c78208f.
- **The school on High (9 November).** Plain cel shade and ink lines with no dots. Simulator commit ea4d6f5.

## Rooms

- **Your own name (8 November).** A typed name on the pilot editor is shown in every room except a school safe one, which only shows a made up handle. A rude word gets a made up name, and the host can give any pilot a made up name for the rest of the room. Simulator commits a6bc93e and 731fc4f.

## Track builder

- **Flags (9 November).** A flag, cone or pole has Round it, How far and How on its card, with Spiral up beside Spiral down and Flat. A flagged gate has the same rows and a Flag mast field, and Left or Right on a gate with no flag puts one on that upright. The animation export draws the flags and has a View row. Simulator commits b72ee98 and 8b52bc6.
- **The whoop builder (7 November).** Floating gates, decor gates, and poles, flags and cones as decor. Simulator commits 9132df2 and f32a8f3.

## Controls

- **Stick deadzone and Gamepad throttle (6 November).** Two Settings rows for a gamepad. Simulator commit 37c5d95.
- **3D mode and Check sticks (6 November).** 3D mode takes two presses and says so in flight, and Check sticks has a button for each channel. Simulator commit 9de585a.
- **A radio with no axes (7 November).** It is named, with the setting that makes its sticks show. Simulator commit 19e03de.

## Results and lessons

- **Results as a magazine page (6 November).** Paper, stamps, a gate by gate strip and a Next track row. Simulator commit 0fbcace.
- **Chase NAME (6 November).** The results page offers the nearest quicker board lap as a ghost. Simulator commit 5d5d081.
- **The first lessons (6 and 7 November).** A plainer display, a smaller stick plate on the pad, a coach who asks you to come down, and Career on a phone with Fly on the first view. Simulator commits 76a6b4f, 3c6d941 and 8981c89.

## Also

- **Mini game pause menus (9 November).** One menu shape for every mini game. Simulator commit 4173dab.
- **Recommended arenas (7 November).** Dogfight and ribbon cutting open on a recommended arena. Simulator commit f5ae4e4.
- **Show FPS (6 November).** Laid out like a hardware monitor's overlay, off until you turn it on. Simulator commits 2bca0f3 and 5d62fe4.
- **Paper and ink (6 to 9 November).** The loading screen, the builder's chooser and the flight buttons. Simulator commits d4ca03b, 0b60f1a and 044f490.
- **Flight music (6 November).** Polyrhythmic Build. Simulator commit 1e00d7f.
