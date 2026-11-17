# Release notes, 10 November to 17 November 2026

Written from what reached `main` of the simulator after Chapter 10's notes, read on 17 November 2026, up to d2a2855. Times are Perth time (AWST). Chapter 10's notes ended on 10 November with 044f490. The simulator is `Mathew-Harvey/WebFPVSimulator`.

The book's version of these notes is chapter 11, Thomas walks the shop, in `docs/chapters.js`. Every bullet ends with where it came from.

## Realistic physics

- **A Realistic physics switch (14 November).** Settings, Pilot, Realistic physics. On, the quad flies at its true weight in real gravity, turns more freely, and its pack sags on a punch; in solo freestyle the pack also runs down until you reset. Realistic laps keep a best lap of their own. Simulator commits 375a2b7 and 971e369.
- **Set from real flight logs (14 November).** Its turning, its motors and its pack are matched to flight logs of two of andAgainFPV's own quads. Simulator commit 9f3a3b7.
- **The five inch's default (14 November).** Realistic physics is on for the five inch and stays off for the whoop. Before the first Fly a card says what changed and that it is experimental, with a Use the old feel button. Simulator commit d6da8d6.
- **Keyboard hover (15 November).** On the keys, the rest throttle hovers on Realistic physics at every weight and keeps hovering as the pack runs down. Simulator commit 9f8cd19.

## Thomas More's Shop

- **Rebuilt from Thomas's photos and markup (15 November).** The barani doorway is the wood lined opening under the rolls at the flat wall's corner, with the Digital Department, the paint shop and the machine room where his markup has them. Simulator commits 48dacfa and 2cae556.
- **Offices to fly (16 November).** The office area behind the flat wall is rooms under a ceiling: a corridor, reception, offices and a meeting room. The paint shop runs east from its sliding door. Simulator commit 578bb14.
- **Tubes and a dive slot (16 November).** The rolls over the barani doorway are two rows of open tubes to fly through, the Digital Department lines up with the paint shop, and there is a slot to dive into behind the teal racking. Simulator commit dde9b91.
- **Thomas walks his shop (17 November).** He walks the south end of the workshop, turns to a camera that comes near and calls out when you fly close. Simulator commit 6d71b8b.

## Your quad and the menus

- **Quad on the pause (11 November).** On a freestyle map or in a mini game the pause has a Quad row, the whoop and the five inch as pictures; in a room the host's press changes the room's quad. Simulator commits 3457bd1 and 99e053f.
- **The quad on the map picker (11 November).** The picker shows the quad the map will fly, hovering, with a button to change it. Simulator commit 27a7aad.
- **The front door (11 November).** Quit to title lands on the drawn cover, and Multiplayer asks five inch racing, whoop racing, freestyle or mini games before Host, Find or a code. Simulator commit 27a7aad.
- **Mini games on the cover (11 November).** A third panel beside Fly solo and Multiplayer. Simulator commit 6f4d68b.
- **The menu sweep (11 November).** Back from Tracks or Maps is Fly solo, and Settings from the pause comes back to Settings. Simulator commit 89fc7ee.
- **Change map (14 November).** Pause and Results have Change map, or Change track in a race. Simulator commit b1f0c9a.

## Mini games

- **Goat herding (12 November).** An arrow and a card that always say where the goats go and how far it is. Simulator commit dd6bfb7.
- **Dogfight controls (12 November).** Gun and missile can be bound to a switch or a button on a radio. Simulator commit 18ec988.
- **POP! in rooms (14 November).** POP! shows only for a pilot who was popped. Simulator commit 7daf4b4.
- **Infected and drift (11 November).** Infected's room flies the whoop, and the drift smoke is partly see through. Simulator commits 99e053f and 86654e1.

## Gates and the look

- **Sponsor marks (15 November).** A sponsor's mark on a five inch gate is printed on the face you fly toward, and a gate flown both ways keeps it on both. Simulator commit ae0b538.
- **High (10 November).** High alone gets light wrap, lamp glow at dusk and a soft contact shade; the outline is back to its normal weight on Medium and High and the pen thins with distance. Simulator commits cbeef2c, ebec766, 340d897 and 4ada209.

## Fixes pilots asked for

- **Land in a lesson (10 November).** A lesson's Land counts a quad resting on the pad with the throttle still up. Simulator commit fb4c765.
- **Into the Goggles (13 November).** It says why a turn is not counting. Simulator commit 08c4af2.
- **Meta Quest (11 November).** A Quest gets the Android stick help. Simulator commit 0fa5b7a.
- **Crash flip (14 November).** A crash flip by hand in Angle mode no longer breaks the flight; the fix reached the game when its module was rebuilt. Simulator commits b8cb3d2 and 375a2b7.
- **Map vote in rooms (16 November).** A guest's map vote no longer hides under the pause menu. Simulator commit 0d271fa.
- **Ekimae (16 November).** The barriers meet the ground, so you cannot get stuck under one. Simulator commit a562bb6.
