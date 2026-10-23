/*
 * Chapter 3's shots, Three houses: 20 to 23 October 2026.
 *
 * As in chapters 1 and 2, a picture is the simulator's own render, framed
 * here: a camera, a lens, and the craft held at a pose. Four places:
 *
 *   heads      Heads' house (?map=heads), at Nick's scale. Plan metres to
 *              the world: x = -7 + 3.5 px, z = -21 - 3.5 py, height 3.5 h.
 *              Heads is the group named 'heads'; holding his clock
 *              (userData.holdMs) puts him at a spot in his round, and
 *              userData.craftAt, set far away, stops him shouting, so no
 *              balloon is drawn: his lines in the simulator are
 *              placeholders (HEADS_LINES, PR 105) and the book never
 *              quotes them. Garage: his shelf spot is world (44.6, -38),
 *              he waves at the camera at 1 s on his clock.
 *   bardwell   Joshua Bardwell's house (?map=bardwell), outside only, life
 *              size, the five inch. World x = -31 + px, z = -23 - py.
 *              The goats graze in the pasture (plan x 52 to 86, y -46 to
 *              34), which is world x 21 to 55, z -57 to 23.
 *   house      Nick Burns' house, as chapter 2 (tools/shoot/c2.js). Nick's
 *              chair is world (-27.1, -62.6).
 *   room       The whoop room, RaceGOW Season 5 Track 1, as chapter 2.
 *
 * Screenshots Mat took are named by `file`, from the project's shared
 * folder chapter-3/ (PROJECT_FILES says where that is). A `file` job is
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
const CH3 = path.join(PF, 'chapter-3');

/* Heads' house: plan metres to the world. */
function HW(x, y, h) { return [-7 + 3.5 * x, 3.5 * h, -21 - 3.5 * y]; }
/* Joshua Bardwell's house: life size. */
function BW(x, y, h) { return [-31 + x, h, -23 - y]; }
const NICK = [-27.1, 0, -62.6];

const D = Math.PI / 180;
function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function yawToward(from, to) { const f = sub(to, from); return Math.atan2(-f[0], -f[2]) / D; }

const RETURNING = { guidedRace: true, guidedWhoop: true, guidedFreestyle: true, hasFlown: true, airframeAsked: true, graphics: 'high', graphicsAuto: false };

/* Heads, held at a spot in his round, with the craft sent far away so he
 * does not shout. */
async function holdHeads(page, ms) {
  await page.evaluate((ms) => {
    window.__mapScene().traverse((o) => {
      if (o.name === 'heads' && o.isGroup) {
        o.userData.holdMs = ms;
        o.userData.craftAt = { x: 900, y: 900, z: 900 };
      }
    });
  }, ms);
  await page.waitForTimeout(2500);
}

/* The screenshots Mat supplies: id, page, panel, file, what it shows. */
const SUPPLIED = [
  ['heads-under-car', 'c3-p3', 'd', 'FPV low under a parked car on Heads\' drive, the 90% patch in view'],
  ['jb-sticker-find', 'c3-p5', 'a', 'A JB sticker callout on Joshua Bardwell\'s house'],
  ['goats-run', 'c3-p6', 'c', 'The goats running from the quad in the field'],
  ['goat-catch', 'c3-p6', 'd', 'The moment a goat is caught, as it hops'],
  ['nick-table-1', 'c3-p7', 'b', 'Landed on the patio table, the balloon reading out the flight'],
  ['nick-table-2', 'c3-p7', 'c', 'The second balloon, Ah, not 6 7 again'],
  ['all-splash', 'c3-p9', 'b', 'The ALL 10! splash on Nick\'s house'],
  ['career-gate', 'c3-p10', 'a', 'The gate with the Career card first'],
  ['career-chapters', 'c3-p12', 'b', 'The Career chapter list'],
  ['career-1-1-briefing', 'c3-p11', 'a', 'Lesson 1-1 Lift Off, the briefing with its stick drawing'],
  ['career-medal', 'c3-p11', 'b', 'A lesson\'s medal screen'],
  ['career-open-all', 'c3-p12', 'c', 'The I already fly: open every chapter button'],
  ['webleed-sign', 'c3-p13', 'b', 'The weBLEEDfpv sign in a freestyle map'],
  ['webleed-board', 'c3-p13', 'c', 'The weBLEEDfpv card on the board\'s partners page']
];
const supplied = SUPPLIED.map(([id, page, panel, note]) => ({
  id, page, panel, file: path.join(CH3, id + '.png'), note
}));
const missing = supplied.filter((s) => !fs.existsSync(s.file)).map((s) => s.id);
/* The cover's third panel is the gate again. */
const coverGate = { id: 'cover-w3', page: 'c3-cover', panel: 'w3', file: path.join(CH3, 'career-gate.png'), note: 'The gate with the Career card first, the cover\'s third panel.' };
if (!fs.existsSync(coverGate.file)) missing.push('cover-w3 (career-gate.png)');

/* Frames made by the threads that built a feature, kept in the shared
 * folder, as chapter 2 did. */
const threads = [
  { id: 'p14-a', page: 'c3-p14', panel: 'a', file: path.join(PF, '3d-mode', 'settings.jpg'), clip: [364, 0, 551, 715], note: 'The top of Settings with 3D mode (sim PRs 106 and 107).' },
  { id: 'p14-d', page: 'c3-p14', panel: 'd', file: path.join(PF, 'house-logos', 'before-after.jpg'), clip: [570, 325, 560, 320], note: 'Heads\' side fence with each brand once, the signs smaller (sim PR 131).' }
];

module.exports = {
  id: 'c3',
  missing,
  worlds: {
    heads: { map: 'heads', settings: Object.assign({}, RETURNING, { map: 'heads' }) },
    bardwell: { map: 'bardwell', airframe: '5inch', settings: Object.assign({}, RETURNING, { map: 'bardwell', airframe: '5inch' }) },
    house: { map: 'house', settings: Object.assign({}, RETURNING, { map: 'house' }) },
    room: { preset: 'racegow5-track1', airframe: 'whoop65', settings: { airframe: 'whoop65' } }
  },
  shots: [
    /* ---- Heads' house ---- */
    {
      id: 'p1', page: 'c3-p1', panel: 'a', world: 'heads',
      make: () => ({ cam: [34, 3.2, 36], look: [34, 9, -20], fov: 62, quad: { pos: [34.55, 3.45, 33.8], yaw: -25, pitch: 20, roll: -16 } })
    },
    {
      id: 'cover-w1', page: 'c3-cover', panel: 'w1', world: 'heads',
      make: () => ({ cam: [36, 3.4, 30], look: [38, 8, -20], fov: 56, quad: { pos: [36.45, 3.5, 28.0], yaw: -25, pitch: 20, roll: -16 } })
    },
    {
      id: 'p2-a', page: 'c3-p2', panel: 'a', world: 'heads',
      act: async (page) => {
        await holdHeads(page, 1000);
        await rig.pose(page, { cam: [49.5, 4.4, -26], look: [44.6, 3.2, -38], fov: 56, quad: null });
      }
    },
    {
      id: 'p2-b', page: 'c3-p2', panel: 'b', world: 'heads',
      act: async (page) => {
        await holdHeads(page, 1000);
        await rig.pose(page, { cam: [47.8, 4.6, -31.5], look: [44.6, 4.4, -38], fov: 46, quad: null });
      }
    },
    {
      id: 'p2-c', page: 'c3-p2', panel: 'c', world: 'heads',
      act: async (page) => {
        await holdHeads(page, 5000);
        const q = [49.8, 3.9, -26.8];
        await rig.pose(page, { cam: [50.5, 4.2, -24.5], look: [45.5, 3.4, -38], fov: 52, quad: { pos: q, yaw: yawToward(q, [44.6, 3.4, -38]), pitch: 22, roll: 18 } });
      }
    },
    {
      /* Down at tarmac height between the two parked cars on the drive,
       * the whoop coming under. */
      id: 'p3-b', page: 'c3-p3', panel: 'b', world: 'heads',
      make: () => ({ cam: [52.3, 0.5, 8], look: [52.3, 0.55, -8], fov: 50, quad: { pos: [52.0, 0.62, 5.9], yaw: 0, pitch: 8, roll: 4 } })
    },
    {
      id: 'p3-c', page: 'c3-p3', panel: 'c', world: 'heads',
      make: () => {
        const q = [48.7, 0.58, -13.0];
        return { cam: [46, 0.5, -14.5], look: [52.3, 0.4, -10], fov: 50, quad: { pos: q, yaw: yawToward(q, [52.3, 0.5, -10]), pitch: 6, roll: 6 } };
      }
    },
    /* ---- Joshua Bardwell's house ---- */
    {
      id: 'cover-hero', page: 'c3-cover', panel: 'hero', world: 'bardwell',
      make: () => {
        const q = [-17.6, 4.55, 0.0];
        return { cam: [-18, 4.8, 1.6], look: [-19, 4.2, -30], fov: 52, quad: { pos: q, yaw: yawToward(q, [-21, 4, -35]), pitch: 20, roll: 18 } };
      }
    },
    {
      id: 'p4', page: 'c3-p4', panel: 'a', world: 'bardwell',
      make: () => {
        return { cam: [-4, 15, 22], look: [-21, 6, -35], fov: 64, quad: null };
      }
    },
    {
      id: 'p5-b', page: 'c3-p5', panel: 'b', world: 'bardwell',
      make: () => ({ cam: [-30.4, 1.9, -24.2], look: [-31.8, 1.4, -29.5], fov: 44, quad: null })
    },
    {
      id: 'p5-c', page: 'c3-p5', panel: 'c', world: 'bardwell',
      make: () => ({ cam: [4.6, 1.2, 3.2], look: [4.2, 0.6, 0], fov: 44, quad: null })
    },
    {
      id: 'cover-w2', page: 'c3-cover', panel: 'w2', world: 'bardwell',
      make: () => ({ cam: [30, 10, -5], look: [40, 3, -40], fov: 70, quad: null })
    },
    {
      id: 'p6-b', page: 'c3-p6', panel: 'b', world: 'bardwell',
      make: () => ({ cam: [22, 2.4, -10], look: [36, 1.0, -27], fov: 56, quad: null })
    },
    /* ---- Nick Burns' house ---- */
    {
      id: 'p8-a', page: 'c3-p8', panel: 'a', world: 'house',
      make: () => {
        const q = [-23.9, 3.4, -60.4];
        return { cam: [-19.5, 5.2, -55.2], look: [-26, 3.9, -62], fov: 50, quad: { pos: q, yaw: yawToward(q, NICK), pitch: 2, roll: 0 } };
      }
    },
    /* ---- the whoop, as it is drawn now ---- */
    {
      id: 'p14-b', page: 'c3-p14', panel: 'b', world: 'room',
      paper: { probes: [[-2.6, 1.2], [-2.0, 1.0], [-3.0, 1.6]], sun: [0.05, 1, 0.12] },
      make: (L, lib, ctx) => {
        const q = [-2.6, 0.9, 1.2];
        return { cam: [-2.6 - 0.7, 0.9 + 0.38, 1.2 + 0.75], look: q, fov: 24, quad: { pos: q, yaw: 45, pitch: 8, roll: -4 } };
      }
    },
    {
      id: 'p14-c', page: 'c3-p14', panel: 'c', world: 'heads',
      make: () => ({ cam: [60, 3.0, 20], look: [45, 8, -20], fov: 58, quad: { pos: [58.9, 3.2, 17.9], yaw: 28, pitch: 16, roll: 14 } })
    }
  ].concat(supplied.filter((s) => fs.existsSync(s.file)), fs.existsSync(coverGate.file) ? [coverGate] : [], threads),
  reuse: []
};
