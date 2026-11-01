/*
 * Chapter 6's pictures, Twenty two new maps: 31 October 2026.
 *
 * Every picture here is a frame the simulator drew at b285dc5, its main
 * on 1 November 2026, served from a checkout (scripts/serve.js) and held
 * in the capture rig (tools/shoot/rig.js) with the menus hidden: the
 * title flight over each map, or the camera put over the map with
 * window.__setCam. The craft in frame is the simulator's own five inch,
 * and its whoop on Hoshino Shoji. Nothing is painted.
 *
 * The raw frames are kept outside the book (captures/ is ignored); put
 * each one at captures/c6/<id>.png, named by `src` below, before inking.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const jobs = [
  ['cover-hero', 'c6-cover', 'hero', 'dock-t2', 'Kamome Wharf, the title flight past the port tower.'],
  ['cover-w1', 'c6-cover', 'w1', 'touge-t3', 'Momiji Pass, the title flight down the road.'],
  ['cover-w2', 'c6-cover', 'w2', 'arctic-t1', 'Hyoura Island, the title flight over the floes.'],
  ['cover-w3', 'c6-cover', 'w3', 'towers-c2', 'Kumoi Towers, a tower face from the street.'],
  ['p1-b', 'c6-p1', 'b', 'touge-t0', 'Momiji Pass, the red bridge.'],
  ['p1-c', 'c6-p1', 'c', 'cedar-x1', 'Kodama Onsen through the cedars.'],
  ['p1-d', 'c6-p1', 'd', 'alps-c2', 'Raicho Ridge and its lake.'],
  ['p2-a', 'c6-p2', 'a', 'dunes-t2', 'Kazesuna Dunes, the big ridge.'],
  ['p2-b', 'c6-p2', 'b', 'shiokaze-c3', 'Shiokaze Point from the sea.'],
  ['p2-c', 'c6-p2', 'c', 'arctic-c3', 'Hyoura Island and its harbour.'],
  ['p3-a', 'c6-p3', 'a', 'towers-t3', 'Kumoi Towers from below.'],
  ['p3-b', 'c6-p3', 'b', 'ekimae-c0', 'Ekimae Drift, the expressway, the station and the viaduct.'],
  ['p3-c', 'c6-p3', 'c', 'haikyo-t2', 'Tsukimi Danchi and the viaduct.'],
  ['p3-d', 'c6-p3', 'd', 'park-t1', 'Hinode Park, the pond.'],
  ['p4-a', 'c6-p4', 'a', 'dock-c3', 'Kamome Wharf, boxes and cranes.'],
  ['p4-b', 'c6-p4', 'b', 'factory-c3', 'Hamakaze Works, the stack and the spheres.'],
  ['p4-c', 'c6-p4', 'c', 'airfield-c0', 'Kazami Airfield, the strip and the hangar.'],
  ['p5-a', 'c6-p5', 'a', 'hayate-t2', 'Hayate Circuit, the pits.'],
  ['p5-b', 'c6-p5', 'b', 'rally-t1', 'Tanada RX, a corner.'],
  ['p5-c', 'c6-p5', 'c', 'dome-c1', 'Bakuon Dome, the stadium and its floor.'],
  ['p5-d', 'c6-p5', 'd', 'fmx-c0', 'Shiroyama FMX and the castle.'],
  ['p6-a', 'c6-p6', 'a', 'hotaru-c1', 'Hotaru Valley and the torii in the sea.'],
  ['p6-b', 'c6-p6', 'b', 'kaza-t2', 'Kazahana Plain, the balloons.'],
  ['p6-c', 'c6-p6', 'c', 'fest-t0', 'Tonbo Fest, the stalls.'],
  ['p7-a', 'c6-p7', 'a', 'office-t0', 'Hoshino Shoji, the sales floor.'],
  ['p7-b', 'c6-p7', 'b', 'sana-x1', 'Kirigaoka Sanatorium and its clock tower.'],
  ['p8-a', 'c6-p8', 'a', 'touge-c1', 'Momiji Pass from above.']
].map(([id, page, panel, src, note]) => ({ id, page, panel, src, note }));

/* Where a picture is held in its panel, as shares of the frame, so the
 * quad stays in the cut. */
const FOCUS = { 'p3-c': [0.6, 0.1], 'p5-a': [0.75, 0.1], 'p5-b': [0.7, 0.1], 'p7-a': [1, 0.3] };
for (const j of jobs) if (FOCUS[j.id]) j.focus = FOCUS[j.id];

module.exports = { id: 'c6', missing: [], worlds: {}, shots: jobs, reuse: [] };
