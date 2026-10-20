/*
 * Chapter 2's shots, Open house: 3 to 20 October 2026.
 *
 * As in chapter 1, a picture is the simulator's own render, framed here: a
 * camera, a lens, and the craft held at a pose. Five places:
 *
 *   house      Nick Burns' house (?map=house). The house's plan is in real
 *              metres and the world is 3.5 times that (S in the simulator's
 *              src/maps/house/house.js): world x = -56 + 3.5 x, world z =
 *              -21 - 3.5 y, height 3.5 h. Nick's chair is plan (8.25,
 *              11.88), world (-27.1, -62.6). On this map the craft is drawn
 *              as the whoop. Nick answers the drawn craft: within 1.5 real
 *              metres he thanks you, inside his body he shouts, so the shots
 *              that want a line put the craft there, in that order. His
 *              clock is held (the group's userData.holdMs) for the shots
 *              that want him somewhere else in his hour.
 *   field      WCMRC Round 5, as chapter 1 (tools/shoot/c1.js).
 *   room       RaceGOW Season 5 Track 1, the whoop room, as chapter 1.
 *   town       The freestyle town.
 *   windyard   Hibari Yard Tandem with a windmill and a balloon chase
 *              placed on it (tools/shoot/tracks/yard-windmill.json, made
 *              from the simulator's showpiece map with two pieces added).
 *
 * The board is the live board at webfpv.org/board, fetched by the rig's
 * Node side. A few frames were not shot here: they are pictures made by the
 * threads that built the feature (the sticker callout, a board sheet, the
 * first screen, a sponsor's spray), kept in the project's shared folder,
 * and named by `file`. PROJECT_FILES says where that folder is.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');
const rig = require('./rig');

const D = Math.PI / 180;
const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const TRACKS = path.join(__dirname, 'tracks');

function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
function norm(a) { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function yawToward(from, to) { const f = sub(to, from); return Math.atan2(-f[0], -f[2]) / D; }
function azOf(v) { return Math.atan2(v[0], v[2]) / D; }
function around(t, dist, az, el) {
  return [t[0] + dist * Math.cos(el * D) * Math.sin(az * D), t[1] + dist * Math.sin(el * D), t[2] + dist * Math.cos(el * D) * Math.cos(az * D)];
}
/* Chapter 1's framing: the craft at `at` on the frame, filling `fill` of it. */
function frame(q, ctx, o) {
  const tv = Math.tan((o.fov * D) / 2);
  const th = tv * ctx.aspect;
  const span = o.span || 0.38;
  const dist = o.dist || span / ((o.fill || 0.4) * 2 * th);
  const cam = around(q, dist, o.az, o.el);
  const v = norm(sub(q, cam));
  const r = norm([-v[2], 0, v[0]]);
  const u = norm(cross(r, v));
  const at = o.at || [0, 0];
  const f = norm(sub(sub(v, mul(r, at[0] * th)), mul(u, at[1] * tv)));
  return { cam, look: add(cam, mul(f, 6)), fov: o.fov, roll: o.roll || 0, quad: o.quad };
}
function fpv(L, d, o = {}) {
  const f = L.frame(d);
  const cam = add(f.p, [0, o.lift != null ? o.lift : 0.1, 0]);
  const look = add(L.at(d + (o.ahead || 6)), [0, o.lookLift || 0, 0]);
  return { cam, look, fov: o.fov || 96, roll: o.roll != null ? o.roll : Math.max(-40, Math.min(40, (f.turn / D) * (o.bank || 1.6))), quad: null };
}

/* The house: plan metres to the world. */
const S = 3.5;
function H(x, y, h) { return [-56 + S * x, S * h, -21 - S * y]; }
const NICK = [-27.1, 0, -62.6];

/* WCMRC Round 5: the pads and the first gate (chapter 1). */
const PAD = [15.57, 0.15, 29.85];
const GATE0 = [17.88, 0.88, 15.01];
const PAD_YAW = yawToward(PAD, GATE0);
const SUN_HIGH = [0.18, 1, 0.3];
const SUN_TOP = [0.05, 1, 0.12];

/* Hibari Yard Tandem with its windmill, which stands at world
 * (-16, 0, 61) with its hub 14 m up, facing south. */
const MILL = [-16, 14, 61];

const RETURNING = { guidedRace: true, guidedWhoop: true, guidedFreestyle: true, hasFlown: true, airframeAsked: true, graphics: 'high', graphicsAuto: false };
const QUIET = { 'webfpv.airhint.v2': '1', 'webfpv.support.prompt.v1': { lastShownMs: Date.now() } };

async function flying(page) {
  await page.waitForFunction(() => window.__ui && window.__ui.screen === 'flight', null, { timeout: 120000 });
  await page.waitForFunction(() => { const i = window.__intro && window.__intro(); return i && !i.orbiting && !i.approaching && !i.zooming; }, null, { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1200);
}

/* Hold Nick's clock at ms, with the camera put near where he will be first,
 * since he is moved only when he is near the camera or in view. */
async function holdNick(page, ms, near) {
  await rig.pose(page, { cam: near, look: NICK, fov: 60, quad: null });
  await page.evaluate((ms) => {
    window.__mapScene().traverse((o) => { if (o.name === 'nick' && o.isGroup) o.userData.holdMs = ms; });
  }, ms);
  await page.waitForTimeout(2500);
  return page.evaluate(() => {
    let m = null;
    window.__mapScene().traverse((o) => { if (o.name === 'nick' && o.isMesh) m = o; });
    return [m.position.x, m.position.y, m.position.z];
  });
}

/* Where the balloon plane is now, and which way it flies. */
async function plane(page) {
  return page.evaluate(() => { const g = window.__balloons(); return { p: [g.p[0], g.p[1], g.p[2]], h: [g.hx, 0, g.hz] }; });
}

const yard = JSON.parse(fs.readFileSync(path.join(TRACKS, 'yard-windmill.json'), 'utf8'));

module.exports = {
  id: 'c2',
  worlds: {
    house: { map: 'house', settings: Object.assign({}, RETURNING, { map: 'house' }) },
    field: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch' },
    room: { preset: 'racegow5-track1', airframe: 'whoop65', settings: { airframe: 'whoop65' } },
    town: { map: 'city', settings: Object.assign({}, RETURNING, { map: 'city', freestyleScoring: 'off' }) },
    windyard: {
      map: 'built', settings: Object.assign({}, RETURNING, { map: 'built', freestyleScoring: 'off' }),
      storage: { 'webfpv.trackbuilder.autosave.freestyle.v1': yard }
    },
    /* The run paused on the field, for the pause menu's Flight mode row. */
    paused: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: RETURNING, storage: QUIET,
      prep: async (page) => { await flying(page); await page.keyboard.press('Escape'); await page.waitForTimeout(1500); }
    },
    boardDesk: { url: 'https://webfpv.org/board/', wait: 12000, viewport: [1440, 1000], fetchFromNode: true },
    boardPhone: { url: 'https://webfpv.org/board/', wait: 12000, viewport: [400, 860], dpr: 2, fetchFromNode: true }
  },
  shots: [
    /* ---- the house, in an order that keeps Nick's answers right ---- */
    {
      id: 'p12', page: 'c2-p12', panel: 'a', world: 'house',
      make: () => {
        const q = [-28, 13, 8];
        return { cam: [-26, 34, 34], look: [-30, 6, -30], fov: 58, quad: { pos: q, yaw: 0, pitch: 28, roll: -6 } };
      }
    },
    {
      id: 'cover-hero', page: 'c2-cover', panel: 'hero', world: 'house',
      make: () => {
        const cam = [-21, 9.5, -104];
        const q = [-23.4, 8.2, -95.5];
        return { cam, look: [-31, 13, -52], fov: 56, quad: { pos: q, yaw: yawToward(q, [-30, 6, -60]), pitch: 22, roll: 12 } };
      }
    },
    {
      id: 'p16-a', page: 'c2-p16', panel: 'a', world: 'house',
      make: () => ({ cam: [-27.5, 5.6, -57.4], look: [-24, 3.4, -100], fov: 98, quad: null })
    },
    {
      id: 'p13-a', page: 'c2-p13', panel: 'a', world: 'house',
      make: () => ({ cam: [-15.5, 6.2, -55.5], look: [-27.5, 4.0, -62.8], fov: 50, quad: null })
    },
    {
      id: 'cover-w3', page: 'c2-cover', panel: 'w3', world: 'house',
      make: () => {
        const q = [-23.9, 3.6, -60.4];
        return { cam: [-22.2, 4.9, -58.6], look: [-27.1, 4.3, -62.6], fov: 46, quad: { pos: q, yaw: yawToward(q, NICK), pitch: 6, roll: 0 } };
      }
    },
    {
      id: 'p13-b', page: 'c2-p13', panel: 'b', world: 'house',
      make: () => {
        const q = [-24.6, 4.6, -60.0];
        return { cam: [-20.8, 6.0, -56.2], look: [-27.1, 4.6, -62.6], fov: 50, quad: { pos: q, yaw: yawToward(q, NICK), pitch: 8, roll: -4 } };
      }
    },
    {
      /* Away, so his answer can go off again. */
      id: 'p14-d', page: 'c2-p14', panel: 'd', world: 'house',
      make: () => {
        const q = H(2.35, 2.6, 1.3);
        return { cam: [-48, 6.0, -39.5], look: [-48, 2.6, -24], fov: 74, quad: { pos: q, yaw: 0, pitch: 18, roll: 14 } };
      }
    },
    {
      id: 'p14-a', page: 'c2-p14', panel: 'a', world: 'house',
      make: () => ({ cam: [-36.5, 5.0, -43.5], look: [-15, 4.4, -43.0], fov: 84, roll: -4, quad: null })
    },
    {
      id: 'p14-b', page: 'c2-p14', panel: 'b', world: 'house',
      make: () => ({ cam: [-9.2, -4.6, -23.2], look: [-13.5, -6.6, -46], fov: 78, quad: null })
    },
    {
      id: 'p13-c', page: 'c2-p13', panel: 'c', world: 'house',
      make: () => {
        const q = [-27.0, 3.4, -62.3];
        return { cam: [-23.6, 4.8, -58.4], look: [-27.1, 4.2, -62.6], fov: 50, quad: { pos: q, yaw: yawToward([-23.6, 4.8, -58.4], q), pitch: 20, roll: 10 } };
      }
    },
    {
      /* Nick walking in through the slider, his clock held mid walk. */
      id: 'p13-d', page: 'c2-p13', panel: 'd', world: 'house',
      act: async (page) => {
        /* 99.5 s on his clock: on the patio, walking to the back door. */
        const at = await holdNick(page, 99500, [-38, 5.6, -44]);
        await rig.pose(page, { cam: add(at, [6.5, 5.0, -7.5]), look: add(at, [-0.5, 3.4, 1.5]), fov: 64, quad: null });
      }
    },
    {
      /* Nick on his sofa. */
      id: 'p14-c', page: 'c2-p14', panel: 'c', world: 'house',
      act: async (page) => {
        const at = await holdNick(page, 222000, [-38, 6, -44]);
        await rig.pose(page, { cam: add(at, [-3.0, 3.8, 1.4]), look: add(at, [0, 3.2, 0]), fov: 60, quad: null });
      }
    },

    /* ---- the field ---- */
    { id: 'p1-b', page: 'c2-p1', panel: 'b', world: 'field', make: (L) => fpv(L, 60, { ahead: 7, fov: 100, lift: 0.4 }) },
    {
      id: 'p1-d', page: 'c2-p1', panel: 'd', world: 'field',
      make: (L, lib, ctx) => {
        const f = L.frame(150);
        const q = add(f.p, [0, 0.35, 0]);
        return frame(q, ctx, { az: azOf(add(mul(f.right, 1), mul(f.fwd, -0.5))), el: 10, fov: 40, fill: 0.26, at: [-0.1, 0.05], quad: { pos: q, yaw: lib.yawFor(f.fwd), pitch: 26, roll: -62 } });
      }
    },
    { id: 'p5-a', page: 'c2-p5', panel: 'a', world: 'field', make: (L) => fpv(L, L.total - 1.9, { ahead: 4, fov: 96, roll: 0 }) },
    {
      id: 'p3-d', page: 'c2-p3', panel: 'd', world: 'field',
      make: (L, lib, ctx) => frame([18.4, 0.14, 9.5], ctx, { az: 100, el: 4, fov: 30, fill: 0.24, at: [0.12, -0.2], quad: { pos: [18.4, 0.14, 9.5], yaw: 95, pitch: -4, roll: 5 } })
    },
    {
      id: 'cover-w1', page: 'c2-cover', panel: 'w1', world: 'field',
      make: (L, lib, ctx) => frame([18.4, 0.14, 9.5], ctx, { az: 150, el: 9, fov: 30, fill: 0.62, at: [0, -0.3], quad: { pos: [18.4, 0.14, 9.5], yaw: 95, pitch: -4, roll: 5 } })
    },
    {
      id: 'p1-c', page: 'c2-p1', panel: 'c', world: 'field',
      paper: { probes: [[17, 11], [17, 13], [16, 11]], sun: SUN_TOP },
      make: (L, lib, ctx) => frame([17.0, 0.9, 11.0], ctx, { az: 210, el: 14, fov: 30, fill: 0.5, at: [0, 0.18], quad: { pos: [17.0, 0.9, 11.0], yaw: 30, pitch: 0, roll: 0 } })
    },
    {
      id: 'p15-c', page: 'c2-p15', panel: 'c', world: 'field',
      paper: { probes: [[17, 11], [17, 13], [16, 11]], sun: SUN_HIGH },
      make: (L, lib, ctx) => frame([17.0, 0.7, 11.0], ctx, { az: 270, el: 6, fov: 28, fill: 0.56, at: [0, 0.12], quad: { pos: [17.0, 0.7, 11.0], yaw: 0, pitch: 12, roll: 0 } })
    },
    {
      id: 'p2-b', page: 'c2-p2', panel: 'b', world: 'room',
      paper: { probes: [[-2.6, 1.2], [-2.0, 1.0], [-3.0, 1.6]], sun: SUN_TOP },
      make: (L, lib, ctx) => frame([-2.6, 0.9, 1.2], ctx, { az: 225, el: 18, fov: 26, span: 0.1, fill: 0.36, at: [0.22, 0.02], quad: { pos: [-2.6, 0.9, 1.2], yaw: 45, pitch: 6, roll: -4 } })
    },

    /* ---- the room ---- */
    {
      id: 'p2-a', page: 'c2-p2', panel: 'a', world: 'room',
      make: () => {
        const cam = [-7.8, 3.4, 5.4];
        const q = [-2.6, 1.6, 1.2];
        return { cam, look: [0.4, 1.0, -1.0], fov: 60, quad: { pos: q, yaw: yawToward(q, [0.4, 1.0, -1.0]), pitch: 14, roll: -18 } };
      }
    },
    { id: 'p2-c', page: 'c2-p2', panel: 'c', world: 'room', make: (L) => fpv(L, 2.4, { ahead: 3.2, fov: 104, lift: 0.05 }) },
    {
      id: 'p6-a', page: 'c2-p6', panel: 'a', world: 'room',
      make: (L, lib, ctx) => {
        const f = L.frame(14);
        const q = add(f.p, [0, 0.05, 0]);
        return frame(q, ctx, { az: azOf(add(mul(f.fwd, -1), mul(f.right, 0.7))), el: 12, fov: 54, span: 0.1, fill: 0.12, at: [0.18, -0.1], quad: { pos: q, yaw: lib.yawFor(f.fwd), pitch: 24, roll: -20 } });
      }
    },

    /* ---- the town ---- */
    {
      id: 'p3-b', page: 'c2-p3', panel: 'b', world: 'town',
      make: (L, lib, ctx) => {
        const cam0 = [2.96, 19.6, -55.06];
        const dir = norm([0.35, -0.2, -0.93]);
        const q = add(cam0, add(mul(dir, 3.6), [0, -0.5, 0]));
        return frame(q, ctx, { az: azOf(mul(dir, -1)) + 40, el: 10, fov: 44, fill: 0.3, at: [0, 0], quad: { pos: q, yaw: yawToward(cam0, q), pitch: 50, roll: -24 } });
      }
    },
    {
      id: 'p3-c', page: 'c2-p3', panel: 'c', world: 'town',
      make: (L, lib, ctx) => {
        const cam0 = [2.96, 19.6, -55.06];
        const dir = norm([0.35, -0.2, -0.93]);
        const q = add(cam0, add(mul(dir, 2.3), [0, -0.3, 0]));
        return frame(q, ctx, { az: azOf(mul(dir, -1)) + 40, el: 10, fov: 44, fill: 0.3, at: [0, 0], quad: { pos: q, yaw: yawToward(cam0, q), pitch: -8, roll: 4 } });
      }
    },
    {
      id: 'p4-a', page: 'c2-p4', panel: 'a', world: 'town',
      make: () => ({ cam: [21.3, 23.5, 20.0], look: [12.0, 13.5, 42.0], fov: 100, roll: 12, quad: null })
    },

    /* ---- the yard with its windmill and its plane ---- */
    {
      id: 'p8-d', page: 'c2-p8', panel: 'd', world: 'windyard',
      make: () => {
        const q = [-26.5, 11.5, 75];
        return { cam: [-31, 9.5, 84], look: [-16.5, 13, 61], fov: 60, quad: { pos: q, yaw: yawToward(q, MILL), pitch: 14, roll: 8 } };
      }
    },
    {
      id: 'p9-a', page: 'c2-p9', panel: 'a', world: 'windyard',
      act: async (page) => {
        const pl = await plane(page);
        const h = norm(pl.h);
        const side = [-h[2], 0, h[0]];
        const cam = add(add(pl.p, mul(h, -26)), add(mul(side, 9), [0, 3, 0]));
        const q = lerp(cam, pl.p, 0.16);
        await rig.pose(page, { cam, look: add(pl.p, mul(h, -6)), fov: 58, roll: -8, quad: { pos: add(q, [0, -1.2, 0]), yaw: yawToward(q, pl.p), pitch: 24, roll: -14 } });
      }
    },
    {
      id: 'p9-b', page: 'c2-p9', panel: 'b', world: 'windyard',
      act: async (page) => {
        const pl = await plane(page);
        const h = norm(pl.h);
        const side = [-h[2], 0, h[0]];
        const cam = add(add(pl.p, mul(h, -14)), add(mul(side, -3.5), [0, 1.2, 0]));
        await rig.pose(page, { cam, look: add(pl.p, mul(h, -5)), fov: 46, quad: null });
      }
    },

    /* ---- the pause menu ---- */
    { id: 'p4-b', page: 'c2-p4', panel: 'b', world: 'paused', viewport: [1280, 800] },

    /* ---- the live board ---- */
    { id: 'p11-a', page: 'c2-p11', panel: 'a', world: 'boardDesk', viewport: [1440, 1000], page_shot: true },
    { id: 'cover-w2', page: 'c2-cover', panel: 'w2', world: 'boardDesk', viewport: [1440, 1000], page_shot: true },
    { id: 'p11-c', page: 'c2-p11', panel: 'c', world: 'boardPhone', viewport: [400, 860], page_shot: true },

    /* ---- frames from the threads that built them ---- */
    { id: 'p7-c', page: 'c2-p7', panel: 'c', file: path.join(PF, 'board-sheet-manga', 'ghost-five-inch.png'), clip: [144, 96, 1168, 544], note: 'The board sheet of WCMRC 2026 Winter Heat Grand Finals, its fastest lap replayed (board PR 27, sim PR 93).' },
    { id: 'p9-c', page: 'c2-p9', panel: 'c', file: path.join(PF, 'balloon-chase', 'builder-piece-3d.jpg'), clip: [199, 142, 1066, 526], note: 'The Balloon chase piece in the map builder\'s 3D view (sim PR 78).' },
    { id: 'p10-a', page: 'c2-p10', panel: 'a', file: path.join(PF, 'infinity-loops-map', 'pictures', 'callout.jpg'), clip: [560, 80, 720, 520], note: 'A sticker found on the Infinity Loops map, its callout (sim PRs 70 and 80).' },
    { id: 'p10-b', page: 'c2-p10', panel: 'b', file: path.join(PF, 'infinity-loops-map', 'pictures', 'plaza.jpg'), note: 'The skate plaza on the Infinity Loops map.' },
    { id: 'p10-c', page: 'c2-p10', panel: 'c', file: path.join(PF, 'infinity-loops-map', 'inputs', 'sticker-bomb-sheet.png'), note: 'The owner\'s sticker sheet the map\'s stickers are cut from.' },
    { id: 'p11-b', page: 'c2-p11', panel: 'b', file: path.join(PF, 'board-sheet-manga', 'desktop-map.png'), clip: [140, 96, 630, 512], note: 'A map\'s sheet on the board (board PR 27).' },
    { id: 'p15-a', page: 'c2-p15', panel: 'a', file: path.join(PF, 'first-screen-manga', 'nopills-desktop.png'), clip: [0, 0, 1600, 830], note: 'The first screen as manga panels (sim PRs 96 and 97).' },
    { id: 'p15-b', page: 'c2-p15', panel: 'b', file: path.join(PF, 'sponsor-logos', 'race-field-before-after.jpg'), clip: [800, 60, 800, 330], note: 'A sponsor\'s logo sprayed on the race field\'s grass (sim PR 68).' }
  ],
  reuse: []
};
