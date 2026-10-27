/*
 * Chapter 4's shots, Other people's tracks: 24 to 27 October 2026.
 *
 * As in the chapters before, a picture is the simulator's own render,
 * framed here: a camera, a lens, and the craft held at a pose. Four places:
 *
 *   heads      Heads' house (?map=heads), at Nick's scale, as chapter 3
 *              (tools/shoot/c3.js). Plan metres to the world: x = -7 + 3.5
 *              px, z = -21 - 3.5 py, height 3.5 h. The yard track stands on
 *              the front lawn at plan (11.0, -5.9), YARD_AT in heads.js,
 *              which is world (31.5, -0.35). The stop sign's plate is plan
 *              (-4.07, -11.05) at 2.25 high: world (-21.2, 17.7), 7.9 up,
 *              its face toward east and west.
 *   house      Nick Burns' house (?map=house). The yard track is on his
 *              back lawn at plan (18.0, 20.0): world (7, -91).
 *   bardwell   Joshua Bardwell's house (?map=bardwell), life size. World x =
 *              -31 + px, z = -23 - py. The yard track is by the woodshed at
 *              plan (9.0, 32.8): world (-22, -55.8). The twelfth sticker
 *              rides goat 2 (STICKER_GOAT), which grazes at plan (70, 10),
 *              world (39, -33), with the craft held far away.
 *   room       The whoop room, RaceGOW Season 5 Track 1, as chapter 2.
 *
 * Screenshots Mat took are named by `file`, from the project's shared
 * folder chapter-4/ (PROJECT_FILES says where that is). A `file` job is
 * left out while its file is not there, and `missing` lists it, so the
 * book can be shot and checked before the last screenshot arrives; its
 * panel is held as paper in docs/chapters.js until then. Nothing is
 * painted in its place.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');
const rig = require('./rig');

const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const CH4 = path.join(PF, 'chapter-4');

const D = Math.PI / 180;
function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function yawToward(from, to) { const f = sub(to, from); return Math.atan2(-f[0], -f[2]) / D; }

const RETURNING = { guidedRace: true, guidedWhoop: true, guidedFreestyle: true, hasFlown: true, airframeAsked: true, graphics: 'high', graphicsAuto: false };

/* Where the goat that carries the twelfth sticker is now: the one
 * InstancedMesh of five goats, instance 2 (STICKER_GOAT). The goats wander,
 * so the camera is put by where it stands when the frame is taken. */
async function goatAt(page) {
  return page.evaluate(() => {
    let out = null;
    window.__mapScene().traverse((o) => {
      if (!out && o.isInstancedMesh && o.count === 5) {
        const T = window.__three;
        const m = new T.Matrix4();
        o.getMatrixAt(2, m);
        const v = new T.Vector3().setFromMatrixPosition(m).applyMatrix4(o.matrixWorld);
        out = [v.x, v.y, v.z];
      }
    });
    return out;
  });
}
function goatShot(side, dist, up, fov) {
  return async (page) => {
    await page.waitForTimeout(1500);
    const g = await goatAt(page);
    if (!g) throw new Error('no goat');
    const cam = [g[0] + side[0] * dist, g[1] + up, g[2] + side[1] * dist];
    /* The goat's origin is not its middle: look a little to its left. */
    const r = [-side[1] * -1, 0, side[0] * -1];
    await rig.pose(page, { cam, look: [g[0] - 0.8 * r[0] * 0.7, g[1] + 0.55, g[2] - 0.8 * r[2] * 0.7], fov, quad: null });
  };
}

/* The screenshots Mat supplies: id, page, panel, what it shows. */
const SUPPLIED = [
  ['tinylaps-editor', 'c4-p1', 'a', 'The WebFPV button on the TinyLaps editor'],
  ['tinylaps-in-sim', 'c4-p1', 'b', 'A TinyLaps track flying in the simulator'],
  ['jsl-callout', 'c4-p3', 'a', 'The JSL callout on screen'],
  ['goat-sticker-find', 'c4-p4', 'b', 'The callout for the sticker on the goat, On a goat'],
  ['sound-sliders', 'c4-p5', 'a', 'The Sound section of Settings, each level a slider with a number box']
].map(([id, page, panel, note]) => ({ id, page, panel, file: path.join(CH4, id + '.png'), note }));
const missing = SUPPLIED.filter((s) => !fs.existsSync(s.file)).map((s) => s.id);
/* The cover's first panel is the TinyLaps track in the simulator again. */
const coverTL = { id: 'cover-w1', page: 'c4-cover', panel: 'w1', file: path.join(CH4, 'tinylaps-in-sim.png'), note: 'A TinyLaps track flying in the simulator, the cover\'s first panel.' };
if (!fs.existsSync(coverTL.file)) missing.push('cover-w1 (tinylaps-in-sim.png)');

/* Frames made by the threads that built a feature, kept in the shared
 * folder, as chapters 2 and 3 did. */
const threads = [
  { id: 'p7-a', page: 'c4-p7', panel: 'a', file: path.join(PF, 'camera-angle', 'camera-angle-70.png'), clip: [0, 400, 1280, 470], note: 'The Quad screen with Camera angle at 70 and its number box (sim PR 135).' },
  { id: 'p7-b', page: 'c4-p7', panel: 'b', file: path.join(PF, 'camera-angle', 'air-fly.png'), clip: [250, 0, 700, 800], note: 'Landed, with the Camera angle slider under Weight (sim PR 136).' },
  { id: 'p7-c', page: 'c4-p7', panel: 'c', file: path.join(PF, 'webleed-whoop-room', 'close.jpg'), note: 'The weBLEEDfpv sign on the whoop room wall (sim PR 144).' },
  { id: 'p7-d', page: 'c4-p7', panel: 'd', file: path.join(PF, 'track-preview-overlays', 'after-track.png'), note: 'A course preview with the gate markings hidden (sim PR 146).' },
  { id: 'p9-a', page: 'c4-p9', panel: 'a', file: path.join(PF, 'dronefactory-logos', 'bardwell-house-wide.jpg'), note: 'The Drone Factory sign at Bardwell\'s (sim PR 155).' },
  { id: 'p9-b', page: 'c4-p9', panel: 'b', file: path.join(PF, 'dronefactory-logos', 'heads-house-wide.jpg'), note: 'The Drone Factory sign at Heads\' (sim PR 155).' },
  { id: 'p9-c', page: 'c4-p9', panel: 'c', file: path.join(PF, 'dronefactory-logos', 'nick-burns-house-close.jpg'), note: 'The Drone Factory sign at Nick\'s (sim PR 155).' }
].filter((t) => fs.existsSync(t.file));

module.exports = {
  id: 'c4',
  missing,
  worlds: {
    heads: { map: 'heads', settings: Object.assign({}, RETURNING, { map: 'heads' }) },
    house: { map: 'house', settings: Object.assign({}, RETURNING, { map: 'house' }) },
    bardwell: { map: 'bardwell', airframe: '5inch', settings: Object.assign({}, RETURNING, { map: 'bardwell', airframe: '5inch' }) },
    room: { preset: 'racegow5-track1', airframe: 'whoop65', settings: { airframe: 'whoop65' } }
  },
  shots: [
    {
      id: 'cover-hero', page: 'c4-cover', panel: 'hero', world: 'heads',
      make: () => ({ cam: [31.5, 3.2, 16], look: [31.5, 2, -2], fov: 62, quad: null })
    },
    {
      id: 'cover-w2', page: 'c4-cover', panel: 'w2', world: 'house',
      make: () => ({ cam: [7, 12, -114], look: [7, 0, -91], fov: 64, quad: null })
    },
    {
      id: 'cover-w3', page: 'c4-cover', panel: 'w3', world: 'bardwell',
      act: goatShot([-0.5, 0.86], 2.6, 0.6, 46)
    },
    {
      id: 'p2-b', page: 'c4-p2', panel: 'b', world: 'heads',
      make: () => ({ cam: [24, 2.2, 14], look: [31.5, 1.5, -2], fov: 58, quad: null })
    },
    {
      id: 'p2-c', page: 'c4-p2', panel: 'c', world: 'house',
      make: () => ({ cam: [0, 3.2, -108], look: [7, 1.5, -91], fov: 58, quad: null })
    },
    {
      id: 'p2-d', page: 'c4-p2', panel: 'd', world: 'bardwell',
      make: () => ({ cam: [-14, 4.5, -48], look: [-22, 1.0, -56], fov: 58, quad: null })
    },
    {
      id: 'p4-a', page: 'c4-p4', panel: 'a', world: 'bardwell',
      act: goatShot([-0.5, 0.86], 3.4, 0.9, 52)
    },
    {
      id: 'p6-a', page: 'c4-p6', panel: 'a', world: 'room',
      make: (L, lib) => {
        const f = L.frame(14);
        return { cam: [f.p[0] - f.fwd[0] * 3, f.p[1] + 0.1, f.p[2] - f.fwd[2] * 3], look: [f.p[0] + f.fwd[0] * 3, f.p[1], f.p[2] + f.fwd[2] * 3], fov: 90, quad: null };
      }
    },
    {
      id: 'p8-a', page: 'c4-p8', panel: 'a', world: 'heads',
      make: () => ({ cam: [-8, 6.5, 17.7], look: [-21.2, 7.9, 17.7], fov: 50, quad: null })
    },
    {
      id: 'p8-b', page: 'c4-p8', panel: 'b', world: 'room',
      paper: { probes: [[-2.6, 1.2], [-2.0, 1.0], [-3.0, 1.6]], sun: [0.05, 1, 0.12] },
      make: () => {
        const q = [-2.6, 0.9, 1.2];
        return { cam: [-2.6 - 0.7, 0.9 + 0.38, 1.2 + 0.75], look: q, fov: 24, quad: { pos: q, yaw: 45, pitch: 8, roll: -4 } };
      }
    },
    {
      id: 'p8-c', page: 'c4-p8', panel: 'c', world: 'heads',
      make: () => ({ cam: [31.0, 0.4, 10.9], look: [31.5, 0.12, 10], fov: 40, quad: { pos: [31.5, 0.1, 10], yaw: 20, pitch: 0, roll: 180 } })
    }
  ].concat(SUPPLIED.filter((s) => fs.existsSync(s.file)), fs.existsSync(coverTL.file) ? [coverTL] : [], threads),
  reuse: []
};
