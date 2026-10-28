/*
 * Chapter 5's pictures, Rooms and mini games: 26 to 28 October 2026.
 *
 * Every picture here is a frame the simulator drew, made by the thread that
 * built the feature and kept in the project's shared folder (PROJECT_FILES),
 * as chapters 2 to 4 did for their `file` jobs. Nothing is painted. No
 * photograph is used: the stills and photos of real places and people that
 * those folders also hold are left alone.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');

const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const f = (...p) => path.join(PF, ...p);
const MP = (...p) => f('multiplayer', ...p);

const jobs = [
  ['cover-hero', 'c5-cover', 'hero', f('goat-herding', '01-heads-street.png'), 'The goat street, sim PR 167.'],
  ['cover-w1', 'c5-cover', 'w1', f('drift-matsuri', '08-film-train.jpg'), 'Filming a drift train, sim PR 170.'],
  ['cover-w2', 'c5-cover', 'w2', f('sunnyfield', 'main.jpg'), 'Sunnyfield\'s main street, sim PR 172.'],
  ['cover-w3', 'c5-cover', 'w3', MP('overview-cam', '04-main.png'), 'The overview camera over a room, sim PR 175.'],
  ['p1-a', 'c5-p1', 'a', MP('shots', 'showcase', '01-front-screen.jpg'), 'The front screen, Fly solo or Multiplayer (sim PR 156).'],
  ['p1-b', 'c5-p1', 'b', MP('shots', 'showcase', '02-multiplayer.jpg'), 'The multiplayer screen (sim PR 156).'],
  ['p1-c', 'c5-p1', 'c', MP('shots', '2026-10-26-final', 'host-three-pilots.png'), 'Three pilots in a room (sim PR 153).'],
  ['p2-a', 'c5-p2', 'a', MP('shots', 'showcase', '05-builder-face-trying-laugh.jpg'), 'Make your pilot, the Face tab (sim PR 156).'],
  ['p2-b', 'c5-p2', 'b', MP('shots', 'showcase', '09-twelve-random-pilots.jpg'), 'Twelve random pilots (sim PR 156).'],
  ['p2-c', 'c5-p2', 'c', MP('shots', 'showcase', '06-builder-gear.jpg'), 'The Gear tab (sim PR 156).'],
  ['p3-a', 'c5-p3', 'a', MP('shots', '2026-10-26-final', 'race-standings.png'), 'Race standings in a room (sim PR 153).'],
  ['p3-b', 'c5-p3', 'b', MP('shots', '2026-10-26-final', 'race-countdown.png'), 'The countdown before GO (sim PR 153).'],
  ['p3-c', 'c5-p3', 'c', MP('watch-mode', '04-riding.png'), 'Riding along behind another pilot (sim PR 158).'],
  ['p4-a', 'c5-p4', 'a', MP('overview-cam', '04-main.png'), 'The overview camera (sim PR 175).'],
  ['p4-b', 'c5-p4', 'b', MP('overview-cam', '06-clean.png'), 'The overview with the clean feed (sim PR 175).'],
  ['p4-c', 'c5-p4', 'c', MP('overview-cam', '01-room.png'), 'The New: overview callout (sim PR 175).'],
  ['p5-a', 'c5-p5', 'a', MP('map-vote', 'vote-tally.png'), 'The room votes on moving to another map (sim PR 162).'],
  ['p5-b', 'c5-p5', 'b', MP('map-vote', 'follow-splash.png'), 'Follow the host? (sim PR 165).'],
  ['p6-a', 'c5-p6', 'a', f('goat-herding', '02-goats-with-logos.png'), 'Goats with the 90%er logo (sim PR 167).'],
  ['p6-b', 'c5-p6', 'b', f('goat-herding', 'cars', '4-goats-step-aside.jpg'), 'Goats step aside for a car (sim PR 167).'],
  ['p6-c', 'c5-p6', 'c', f('goat-herding', 'polish', '01-goats-up-close.jpg'), 'Goats up close (sim PR 167).'],
  ['p7-a', 'c5-p7', 'a', f('goat-herding', '05-from-above.png'), 'The neighbourhood from above (sim PR 167).'],
  ['p7-b', 'c5-p7', 'b', f('goat-herding', '03-goats-on-the-drive.png'), 'Goats on a drive (sim PR 167).'],
  ['p8-a', 'c5-p8', 'a', f('drift-matsuri', '03-torii.jpg'), 'Under the lanterns (sim PR 170).'],
  ['p8-b', 'c5-p8', 'b', f('drift-matsuri', '10-film-front.jpg'), 'Filming from in front (sim PR 170).'],
  ['p8-c', 'c5-p8', 'c', f('drift-matsuri', '05-festival.jpg'), 'The festival ground (sim PR 170).'],
  ['p9-a', 'c5-p9', 'a', f('drift-matsuri', '11-take-card.jpg'), 'The take card (sim PR 170).'],
  ['p9-b', 'c5-p9', 'b', f('drift-matsuri', '09-film-side.jpg'), 'Filming from the side (sim PR 170).'],
  ['p10-b', 'c5-p10', 'b', f('sunnyfield', 'tower.jpg'), 'The water tower (sim PR 172).'],
  ['p10-c', 'c5-p10', 'c', f('sunnyfield', 'dump.jpg'), 'The dump (sim PR 172).'],
  ['p10-d', 'c5-p10', 'd', f('sunnyfield', 'over.jpg'), 'The town from above (sim PR 172).'],
  ['p11-a', 'c5-p11', 'a', f('tcmore-warehouse', 'shots-v2', '10-start.jpg'), 'The shop floor from the start (sim PR 161).'],
  ['p11-b', 'c5-p11', 'b', f('tcmore-warehouse', 'shots-v2', '12-workshop-south-west.jpg'), 'The workshop (sim PR 161).'],
  ['p12-a', 'c5-p12', 'a', f('props-in-view', '2m-nose-down-props-and-shadow.jpg'), 'Props and the quad\'s shadow in view (sim PR 164).'],
  ['p12-b', 'c5-p12', 'b', f('props-in-view', '2m-zoom-left.jpg'), 'A prop in view, left (sim PR 164).'],
  ['p13-a', 'c5-p13', 'a', f('drift-matsuri', '02-overview.jpg'), 'The festival circuit from above (sim PR 170).']
].map(([id, page, panel, file, note]) => ({ id, page, panel, file, note }));

module.exports = {
  id: 'c5',
  missing: jobs.filter((j) => !fs.existsSync(j.file)).map((j) => j.id),
  worlds: {},
  shots: jobs.filter((j) => fs.existsSync(j.file)),
  reuse: []
};
