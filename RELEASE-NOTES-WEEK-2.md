# Release notes, 3 to 11 October 2026

DRAFT. Written from the code on `main` of the simulator, the board and the front page, not from pull request titles. Everything here is on `main` as of the draft; anything on the `test` branches or in a draft pull request is left out. Nothing in it has been flown by anyone but the owner, and most of it has been checked only by scripts and a headless browser; each section says so where it matters.

The book's version of these notes is the six pages after "The notes so far" in `docs/chapters.js`. This file is the long form, in the voice of the patch notes at webfpv.org/notes.

## CommunityGow

A club or a group of friends races a new whoop track every week, at home, at their own pace, with a YouTube link as the evidence. It is RaceGOW (at home, video checked, fastest three laps in a row) run by your own people. It lives at webfpv.org/board/CommunityGow, with a link in the board's masthead, spine and footer.

- **Starting one.** One field, "Name your club or group", and a button, Start my community. Three letters is enough. There is no account and no email, and the community is public from the first second. The address is made from the name (perth-whoop-club, say) and says live whether it is free. You land on your portal as its organiser, under a banner that asks you to keep your organiser link: the link is the only key to editing the community, and the board keeps no way to get it back. Copy it to organise from a phone or to hand it to a co-organiser.
- **Adding a round.** A round is one track. Make it in the whoop builder and press Send to the community, or drop in a pack (the zip that Export bundle in the whoop builder saves, up to 4 MB). A title, a note for pilots, and opening and closing dates are optional. A round with a future opening date shows as Upcoming and takes no times, so next week's can be lined up today. A community holds up to 120 rounds.
- **Every round is a track on the board.** Adding a round publishes its track to the board, so the round has a Fly it in the simulator button and shows in the simulator's Tracks grid. If the layout is already on the board the round reuses it, so ten clubs racing the same RaceGOW track share one track and its simulator times. The simulator's times and the community's times are two lists and are not merged.
- **The portal.** A This week card for the newest open round (picture, gates, lap length, floor space, top three, Post your time, Fly it in the simulator, See the track), then three tabs: Rounds, Season and About.
- **Posting a time.** No sign in. A name, a time and, if you like, a YouTube link. The time is read the way people say it: 34.56, 12.3, 12s, 1:02.5. It reads it back as you type and does not guess that 1234 means 12.34. The community counts either the fastest three laps in a row (the default) or the fastest lap. An unlisted video is fine. The video plays in place through YouTube's no cookie player, and nothing from YouTube loads until someone presses Watch. After posting it tells you where you landed. The browser keeps a private key for your entry, so from that browser you can add a video later, edit the note or remove your time.
- **What a row says.** Rank, pilot, time, and a badge: Verified (the organiser ticked it), Video, or No video, plus Simulator when it was flown there. Nothing is verified automatically. Only a pilot's best time ranks, and their other attempts fold under it.
- **Season.** Points for each round on the F1 table, 25, 18, 15, 12, 10, 8, 6, 4, 2, 1. Ties on total go to most wins, then name. Upcoming rounds and rounds with no times are left out.
- **A round's page.** The track in three views, Lap (the animated lap), Map (the plan with the gates numbered) and Room (up to six views of the room). Under it "Build it": the order to fly the gates, what to get, the floor space, a Printable instructions page and an Open a copy in the builder button. All of it is drawn from the pack, so a track can be built without downloading anything.
- **Inviting people.** Invite people gives the link, a QR code drawn in your own browser (nothing is fetched from anyone), the phone's share sheet where there is one, and Print a poster for the wall.
- **The organiser can** set the tagline and the rules, choose what counts as a time, require a YouTube link on every time, hide the community from the CommunityGow front page, close or reopen a round, rename or remove one, and Verify, Unverify or remove a time. A person who holds the link is the organiser, and there is no other way to change who that is.
- **Limits.** 600 communities on the board, a rate limit on starting them, up to 12 times a pilot per round and 400 a round.
- **Not checked by a pilot.** Nobody has used it on the live board. It was checked by the board's self tests and by a headless browser walk as an organiser, a pilot and a newcomer at phone and desktop width. A phone camera reading a printed poster has not been tried. The review of 9 October found and fixed ten rough edges in that walk, so expect more. Whether a club's track should be hideable from the simulator's Tracks grid is not decided; they are listed for now.

## Tunes, ratings and the first flight guide

- **Tunes library.** In the Quad room, Share this tune puts the tune you fly on the public board with a short code, like k7mq-2xrt-9vwd, and a name, an optional word about it and your pilot name. Load a tune takes a code, shows you what is in the tune before anything changes, and has Put mine back. A `?tune=` link opens the load box on a code. The board has a Tunes tab, searchable by aircraft, newest first or Top rated, each tune with its facts (rates type, whether the PIDs were adjusted) and a Load in the simulator button. You can take your own tune down, and the code stops working.
- **What a tune holds.** The tune it starts from (or your own Betaflight dump), the PID adjustment on it, the rates, weight, Air grip, Motor power, pack, lens and tilt. It holds no graphics, sticks, radio, flight mode, names or laps, and loading one never touches those. A tune off stock on Air grip or Motor power turns Flight feel tuning on and says so, and laps flown on it stay off the public board. Loading a custom dump replaces your saved dump for that aircraft, and Put mine back restores both.
- **Star ratings.** One to five stars on tunes, tracks and maps, one rating per browser, changeable and withdrawable (Take mine back). You cannot rate your own tune. Tracks has a Top rated order, the freestyle maps have a Maps from the board order and a Rate this map row, and the board's tabs have Top rated too. The rating is tied to a random key kept in the browser, so someone who clears their storage can vote again; the board damps the score for that.
- **First flight guide.** One guided first flight for each kind of place, a race track, a whoop room and a freestyle world, started at launch by every door, including the board's Fly this track, the builder's Fly and a CommunityGow round, where nothing guided a pilot before. It says which key is the throttle for your stick mode and for touch and radio. On a track or in a room it speaks before the first gate, after the first and after the second and goes at the third gate or the first lap; in a freestyle world it speaks for the first 22 seconds of airtime. Each kind is spoken once per browser, and a profile that already has laps or a map in a kind is not told about it again. `?guide=1` on the address shows the guides again. Open tabs need a reload. The Next gate cue setting and the guide do not know about each other: with the cue off, the race words still say the next gate turns green. The words are a first draft, and nobody has flown it.
- **Export bundle and Send to the community** are on the live simulator now. Export bundle, in More on the whoop builder, writes one zip made in the browser: the track file, a plan, six pictures, the lap animation and printable instructions, with the pictures optional so a weak machine can skip them. Send to the community opens from a portal's Make it in the builder link and sends the track as the next round from a strip under the bar. The builder half is checked in a headless browser only.

## New in the simulator

- **Flight feel tuning, off by default.** Settings, Quad screen, "Flight feel tuning". On, two sliders join Weight while the quad is on the ground: Air grip, 50 to 150, from Carries to Grips, and Motor power, 80 to 120, from Softer to Punchier. At 100 on both, or with the switch off, the quad is exactly the stock quad. On the five inch, hands off from 20 m/s to 10 m/s carries about 55 m at 50, 27 m at 100 and 18 m at 150. Hover is at 43.8, 35.0 and 29.1 percent stick at 80, 100 and 120. A tuned flight is not posted to the board ("Tuned flight, not posted to the board"). After a tuned flight of at least 30 seconds in the air you are asked "Did that feel better than stock?"; nothing is sent unless you press Send, and "Ask after a tuned flight" turns it off. The bands are first guesses and nobody has flown the sliders on the live build.
- **Race line, off by default.** Settings, Screen, "Race line". In a whoop room, a trail of dots from the gate you just flew to the one after the next. Close together means slow down; cream is fast and amber is slowest. The line was flown three laps through the real physics and scored by RaceGOW's rules, so a gap in the lattice counts as a wall. A few tracks have no line yet and say so. It is solved while you are in a menu, paused or loading, never in a flying frame, so if you fly before it finishes the trail arrives at your next pause.
- **Auto reset, off by default.** Settings, Flight, "Auto reset", with a wait of 0.5, 1 or 2 seconds. A crash, or the quad left on its back, puts you back on the start line and restarts the race after the wait, as the R key does. Fly out inside the wait and nothing happens. A radio switch can be bound to it with the "Auto reset switch" row. Checked by a scripted test; not flown.
- **Next gate cue, on by default.** Settings, Screen. Off, every gate looks the same and you find the next one yourself; gates still count in order. Only a syntax check was run on it.
- **Letters in the five inch builder.** A capital A to Z of pipe, with one to three gaps to fly through, each flown gap a gate in the order. The card changes the letter and sets which gap this pass uses. A gate can be made a letter and back, in the same place, in one undo step.
- **Invisible gate.** Key I, on the five inch and the whoop. An opening you fly through and score like a gate with nothing to hit. Any gate has a Frame switch to take its frame away.
- **Stacks.** Each opening of a double or triple stack has its own width and height, and Delete takes away one opening's upright stretch.
- **Export animation.** Size: Standard, High (1024 px) or Very high (2048 px; a phone may not manage it). And on a five inch track, Setting: Black stage or Race field, with the striped turf, the course's ground logos and sponsors on the gate headers. A long track name now wraps instead of being cut off.
- **Builder smaller things.** The options card can be dragged by its heading, steps aside on a map when the drawer is open, and typing an X or Y moves what stands on a piece. Logos and stickers in the map builder are now for the board's owners only.
- **Official tracks.** The board's owners can mark a track Official. Anyone can fly it and post a time; nobody else can change it or open it in the builder.
- **Stick overlay, on by default.** Settings, Screen. Two boxes at the bottom of the picture with a dot following each stick, now for radios and gamepads as well as the keyboard. Hidden on the thumb sticks. The owner flew it: "flys good".
- **Show FPS.** Settings, Screen, off by default. The frame rate at the top left, twice a second.
- **Camera angle is back on Rates**, between Yaw and Throttle.
- **Support.** About has "Buy Mat a battery ($5)" and an Instagram row. A small dismissible Support prompt shows at most once a week, after a new personal best, after about 20 minutes of flying (on the next pause or results screen, never during a run) and after you publish a map. Settings, Advanced, "Support prompts" turns it off. The Patreon links open the membership page.
- **YourFPV**, a UK FPV shop, is a map only supporter. It is not a partner.
- **Patron signs** can hang on walls in the freestyle maps and the town, up to three a map. They cannot be found or collected.

## How it flies

- **Default tune, five inch.** Prop wash halved, the controller's I term limit halved from 400 to 200, and the quad sits 12 mm lower (belly 45 mm to 33 mm, the same drawn size). A full stick yaw stop swings back 4.1 degrees where it swung 7.0. Roll and pitch settle in 52 and 66 ms where they took 210 and 229. The owner flew it: "flys good".
- **Default rates are softer.** Actual 60 and 600, from 70 and 670. A full stick is 600 degrees a second, a half stick 165 where it was 185. Your own rates are never touched, and a profile still sitting exactly on the old stock moves once. 319 feel tickets read "twitchy" most often. Betaflight's own 70 and 670 are a row away.
- **Less grip at low throttle, more at mid, five inch.** Coasting from 20 to 10 m/s takes 4.97 s and 69 m instead of 4.14 s and 58 m. From the pilot's report that low throttle gripped the air too much and mid throttle felt soft.
- **The whoop has its own physics.** A 23 g 0702 28,000 kV whoop on one cell, flown at real gravity in the room as built, where it had flown the five inch's plant at scaled gravity. The pack sags to about 3.65 V on a punch, and top speed is 18.4 m/s. Its hit box is the body and the motor bells, about two thirds of the drawn whoop, and the ducts are no longer solid. A wall hit and a landing feel different from before, and nobody has reported flying it on the live build.
- **Takeoff view.** The picture no longer drops toward the grass before the craft lifts. It was the parked camera, not the physics.
- **Crash set down.** After a crash with the right stick off centre the quad parks and says "Centre the right stick, then fly" instead of relaunching itself.

## Looks and speed

- **The Gem look** replaces the comic look of 7 and 8 October, which was switched off for every preset because it cost latency. A once per world tone pass, a fuller sky and fog, a warmer sun, a finer toon ramp and clouds without a rim. It costs the flight loop nothing.
- **Shadows**, Settings, Screen, on by default. Off removes the sun's shadow, the quickest relief for a slow laptop (about a fifth faster in the yard in the headless test). On Medium the shadow redraws at most every third frame, so a car's shadow steps at about 20 Hz.
- **Faster loads.** Shader programs link in parallel before the first frame and none link mid flight. The town loads in 28 s where it took 45 s in the headless test, a ratio and not a laptop. The town's height lookup is about 100 times faster with identical results.
- **New models.** The five inch quad is rebuilt as a bench built freestyle quad, with plates, standoffs, a stack, copper windings, twisted tri blade props and a strapped battery, in 25 draws instead of 81. The whoop has an outline and cleaner props. Cars have round arches, plates, mirrors and lamps, and a story: some are cabs, some are couriers, some carry a learner's leaf. Trees are round and lumpy, and in the town and the yard a canopy near the eye is a clump of leaves. Brushing a near canopy can stop the quad just short of a valley in the clump. The clouds are heaped.
- **Latency.** The latency rule applies to every one of these. Nothing added to the flight loop was measured on a real GPU or a weak laptop, and the frame times above come from a software renderer, so they are ratios. The simulator's Input to screen reading on a real machine is the check that counts.

## Fixes

- **"The simulator hit a fault"** every frame after about 20 minutes in the air, and laps reporting "Could not post that time" when the board had taken them. Both came from the Support prompt, live from 5 October, and both were fixed the same day. A new check flies across the 20 minute mark.
- **Two board tracks, WA State Champs 2026 and RaceGOW6 Track1**, opened in the builder to an empty 3D view. A ground logo had no height. Fixed.
- **A pinch on a phone** whose second finger landed on the builder's options card did not zoom. It does.
- **About fits a phone on its side**, in two columns, down to 568 by 320 where it still scrolls.
- **The stick report** carries the raw travel of every axis and button, for a DJI Controller 3 on Android where yaw shows nothing. The cause is not found.

## The bug sweep

On 11 October the week's code, in the simulator and on the board, was swept for faults and 24 confirmed ones were fixed. The ones a pilot could meet:

- Auto reset kept its wait when you paused inside it, and takes the reset at the start of the next frame as R does, so no frame is drawn at the crash.
- A shared tune loaded over Your edits on the same aircraft flies at once, instead of keeping the old dump until a reload. Pressing Enter in the Share dialog twice cannot publish a tune twice.
- Closing Send to community while it is sending no longer lets a second Send make a duplicate round.
- Next gate cue set to Off now holds on the title, the launch card and the results, not only in flight.
- The first flight guide no longer goes back to its first line after the third gate on a short course.
- The Weight card and the tuning card no longer read storage on every flight frame.
- On the board: CommunityGow pages show the right round number and Close button, a trailing slash no longer 404s, a club name with a dollar sign no longer breaks the page title, the YouTube links in the video player open, the Tunes tab keeps a vote's Thanks, and text the database would refuse is cleaned or refused in both stores.
- Thirteen findings were left alone on purpose, each written down with its reason in the project's records.

## The board and the front page

- **Patron hearts** beside a pilot's name in the times lists. **Instagram** beside the Patreon pill. The board's statistics show which tags and links people came from, as totals.
- **The Story.** A link to this book from the front page's top bar and footer.
- **Quad Race Lottery.** A card and a link to randomdraw.webfpv.org, a random draw for race day.
- **Tip, offers and Menu.** A Tip button beside Patreon. Four paid links in the footer, a name on a sign in the freestyle maps, a track of your spot, a club track and a lap clip, each fulfilled by hand. On a phone a Menu button reaches every link, where five pages had no way in.
- **Search.** The front page answers "Can I fly Betaflight 4.5 in a browser?" and has a new title.
- **Supporters.** A footer row with YourFPV.
- **Official tracks** and **letters** on the board: an official track is refused to everyone but the board's owners, and a letter counts as a gate on a published track.
- **Tune tickets.** The board takes the "better than stock" report as its own kind of ticket, for the owner.

## Held back, not on main, not verified

- **The comic look is not live**, and the front page's gate cards and the town's picture were drawn with it. They were not drawn again after the Gem look.
- **Never flown by a pilot on the live build:** the sliders, the race line, auto reset, next gate cue, letters, the invisible gate, the new whoop, the new models and the Gem look. The checks are scripts and a headless browser on a software renderer.
