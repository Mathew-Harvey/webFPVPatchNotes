/*
 * Chapter 1's shots. Every picture in the chapter is the simulator's own
 * render, framed here: a camera, a lens, and the quad held at a pose. The
 * five inch is on WCMRC Round 5 (tracks/json/trk-a75a1bc4.json), whose
 * first gate stands fifteen metres in front of the pads; the whoop is in
 * RaceGOW Season 5 Track 1; the freestyle pictures are the town. Distances
 * on a line are metres from its first gate.
 *
 * A shot with `paper` is drawn the front door's way: the world turned to
 * paper and the quad in ink, its cast shadow printed as dots by the ink
 * step. The rest are the simulator in its own colours.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const D = Math.PI / 180;

const PAD = [15.57, 0.15, 29.85];
const GATE0 = [17.88, 0.88, 15.01];
/* Where the quad stands for the paper pages: open grass past the first gate. */
const SPOT = [17.0, 0.11, 11.0];

/* The camera's mount on the five inch, forward and up of the centre, in
 * metres (src/render/lens.js in the simulator). */
const MOUNT_FORWARD = 0.08;
const MOUNT_UP = 0.018;

/* The sun for a paper page: high for a quad in the air, so its shadow lies
 * under it; low for one on the ground, so its shadow reaches out of it. */
const SUN_HIGH = [0.18, 1, 0.3];
const SUN_LOW = [-0.95, 0.6, 0.55];

function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
function lerp(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }
function norm(a) { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }
function yawToward(from, to) { const f = sub(to, from); return Math.atan2(-f[0], -f[2]) / D; }
function forwardOf(yaw) { return [-Math.sin(yaw * D), 0, -Math.cos(yaw * D)]; }
/* The azimuth, in around()'s terms, of a horizontal direction. */
function azOf(v) { return Math.atan2(v[0], v[2]) / D; }

/* A camera round a target: az from +z towards +x, el up from level. */
function around(target, dist, az, el) {
  return [
    target[0] + dist * Math.cos(el * D) * Math.sin(az * D),
    target[1] + dist * Math.sin(el * D),
    target[2] + dist * Math.cos(el * D) * Math.cos(az * D)
  ];
}

/*
 * Frame the quad: the camera round it at az and el, far enough that it
 * fills `fill` of the frame's width, aimed so it sits at `at` on the frame
 * (x right and y up, from -1 to 1). This is how a panel is composed: where
 * the subject goes, and how big.
 */
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

/* First person on a line: the lens on the line at d, looking down it. */
function fpv(L, d, o = {}) {
  const f = L.frame(d);
  const cam = add(f.p, [0, o.lift != null ? o.lift : 0.1, 0]);
  const look = add(L.at(d + (o.ahead || 6)), [0, o.lookLift || 0, 0]);
  return { cam, look, fov: o.fov || 96, roll: o.roll != null ? o.roll : Math.max(-40, Math.min(40, (f.turn / D) * (o.bank || 1.6))), quad: null };
}

const PAD_YAW = yawToward(PAD, GATE0);

module.exports = {
  id: 'c1',
  worlds: {
    field: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch' },
    title: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', ui: 'title' },
    bench: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', ui: 'fc' },
    room: { preset: 'racegow5-track1', airframe: 'whoop65' },
    town: { map: 'city', settings: { map: 'city', freestyleScoring: 'off' } },
    builder: { path: '/src/trackbuilder/index.html?mode=race', track: 'tracks/json/trk-a75a1bc4.json', keys: ['v', 'f'], wait: 14000, viewport: [1600, 900] },
    landing: { url: process.env.LANDING_URL || 'http://127.0.0.1:8766/', landing: true, wait: 16000, viewport: [1600, 777] },
    board: { url: process.env.BOARD_URL || 'https://webfpv.org/board/', wait: 9000, viewport: [1600, 777], fetchFromNode: true }
  },
  shots: [
    /* ---- the cover ---- */
    {
      id: 'cover-hero', page: 'c1-cover', panel: 'hero', world: 'field',
      paper: { probes: [[17, 11], [17, 13], [15, 9], [19, 10]], sun: SUN_HIGH },
      make: (L, lib, ctx) => frame([17.0, 0.95, 11.0], ctx, { az: 300, el: 17, fov: 30, fill: 0.44, at: [0.34, 0.12], quad: { pos: [17.0, 0.95, 11.0], yaw: 38, pitch: 22, roll: 26 } })
    },
    {
      id: 'cover-w1', page: 'c1-cover', panel: 'w1', world: 'field',
      make: () => ({ cam: [17.55, 1.15, 21.4], look: [17.88, 1.05, 15.0], fov: 54, quad: null })
    },
    { id: 'cover-w2', page: 'c1-cover', panel: 'w2', world: 'builder', viewport: [1600, 900], clip: [650, 150, 500, 602] },
    {
      id: 'cover-w3', page: 'c1-cover', panel: 'w3', world: 'room',
      make: () => ({ cam: [-4.7, 1.55, 2.9], look: [1.4, 1.25, -1.1], fov: 62, quad: null })
    },

    /* ---- page 1: off the pad ---- */
    {
      id: 'p1-a', page: 'c1-p1', panel: 'a', world: 'field',
      make: () => ({ cam: [15.57, 0.42, 29.5], look: [17.88, 1.0, 15.0], fov: 92, quad: null })
    },
    {
      id: 'p1-b', page: 'c1-p1', panel: 'b', world: 'field',
      make: (L, lib, ctx) => frame([15.57, 0.52, 29.85], ctx, { az: 214, el: -3, fov: 40, fill: 0.66, at: [0.02, 0.18], quad: { pos: [15.57, 0.52, 29.85], yaw: PAD_YAW, pitch: 6, roll: 0 } })
    },
    {
      id: 'p1-c', page: 'c1-p1', panel: 'c', world: 'field',
      make: () => ({ cam: lerp([15.57, 0.95, 29.85], GATE0, 0.42), look: add(GATE0, [0, 0.05, 0]), fov: 102, roll: -6, quad: null })
    },
    {
      id: 'p1-d', page: 'c1-p1', panel: 'd', world: 'field',
      make: (L, lib, ctx) => {
        const q = add(lerp(PAD, GATE0, 0.55), [0, 0.68, 0]);
        return frame(q, ctx, { az: 96, el: 3, fov: 26, fill: 0.2, at: [-0.28, 0.05], quad: { pos: q, yaw: PAD_YAW, pitch: 32, roll: -4 } });
      }
    },

    /* ---- page 2: too fast ---- */
    {
      id: 'p2-a', page: 'c1-p2', panel: 'a', world: 'field',
      make: () => ({ cam: [17.25, 1.0, 16.45], look: [17.6, 0.85, 14.0], fov: 104, roll: 12, quad: null })
    },
    {
      id: 'p2-b', page: 'c1-p2', panel: 'b', world: 'field',
      make: (L, lib, ctx) => frame([17.08, 0.98, 15.42], ctx, { az: 232, el: 6, fov: 34, fill: 0.46, at: [0.08, -0.05], quad: { pos: [17.08, 0.98, 15.42], yaw: PAD_YAW, pitch: 25, roll: -55 } })
    },
    {
      id: 'p2-c', page: 'c1-p2', panel: 'c', world: 'field',
      make: (L, lib, ctx) => frame([16.4, 1.35, 13.4], ctx, { az: 150, el: -10, fov: 40, fill: 0.4, at: [0.08, 0.12], quad: { pos: [16.4, 1.35, 13.4], yaw: 60, pitch: -40, roll: 170 } })
    },
    {
      id: 'p2-d', page: 'c1-p2', panel: 'd', world: 'field',
      make: () => ({ cam: [18.9, 0.1, 9.0], look: [17.9, 0.95, 15.0], fov: 92, roll: -16, quad: null })
    },

    /* ---- page 3: the title ---- */
    {
      id: 'p3', page: 'c1-p3', panel: 'a', world: 'field',
      paper: { probes: [[17.2, 10], [17, 12], [15, 9], [19, 9]], sun: SUN_LOW },
      make: (L, lib, ctx) => frame([17.2, 0.11, 10.0], ctx, { az: 25, el: 40, fov: 30, fill: 0.36, at: [0.02, -0.34], quad: { pos: [17.2, 0.11, 10.0], yaw: 145, pitch: -3, roll: 0 } })
    },

    /* ---- page 4: the question, on paper ---- */
    {
      id: 'p4-a', page: 'c1-p4', panel: 'a', world: 'field',
      paper: { probes: [[17, 11], [17, 17], [17, 5], [20, 11]], sun: SUN_LOW },
      make: (L, lib, ctx) => frame(SPOT, ctx, { az: 20, el: 8, fov: 24, fill: 0.09, at: [0.18, -0.4], quad: { pos: SPOT, yaw: 200, pitch: -3, roll: 0 } })
    },
    {
      id: 'p4-b', page: 'c1-p4', panel: 'b', world: 'field',
      paper: { probes: [[17, 11], [17, 13]], sun: SUN_LOW },
      make: (L, lib, ctx) => frame(SPOT, ctx, { az: 35, el: 22, fov: 32, fill: 0.6, at: [0, -0.42], quad: { pos: SPOT, yaw: 200, pitch: -3, roll: 0 } })
    },
    {
      id: 'p4-c', page: 'c1-p4', panel: 'c', world: 'field',
      paper: { probes: [[17, 11]], sun: SUN_LOW },
      make: (L, lib, ctx) => {
        /* The lens itself, on its mount at the nose. */
        const fwd = forwardOf(200);
        const mount = add(add(SPOT, mul(fwd, MOUNT_FORWARD)), [0, MOUNT_UP, 0]);
        return frame(mount, ctx, { az: azOf(fwd) + 18, el: 6, fov: 22, span: 0.06, fill: 0.62, at: [0, 0.05], quad: { pos: SPOT, yaw: 200, pitch: -3, roll: 0 } });
      }
    },

    /* ---- page 5: yes ---- */
    { id: 'p5-a', page: 'c1-p5', panel: 'a', world: 'bench', viewport: [1600, 900], clip: [0, 0, 1600, 578] },
    {
      id: 'p5-b', page: 'c1-p5', panel: 'b', world: 'field',
      paper: { probes: [[17, 11], [17, 13]], sun: SUN_HIGH },
      make: (L, lib, ctx) => frame([17.0, 0.26, 11.0], ctx, { az: 200, el: 3, fov: 24, fill: 0.34, at: [-0.12, 0.05], quad: { pos: [17.0, 0.26, 11.0], yaw: 20, pitch: 0, roll: 0 } })
    },
    {
      id: 'p5-c', page: 'c1-p5', panel: 'c', world: 'field',
      paper: { probes: [[17, 11], [17, 13]], sun: SUN_HIGH },
      make: (L, lib, ctx) => frame([17.0, 2.6, 11.0], ctx, { az: 160, el: -36, fov: 44, fill: 0.32, at: [0.22, 0.3], quad: { pos: [17.0, 2.6, 11.0], yaw: 10, pitch: -12, roll: 6 } })
    },

    /* ---- page 6: a project ---- */
    {
      id: 'p6-a', page: 'c1-p6', panel: 'a', world: 'field',
      paper: { probes: [[17, 11], [16, 11], [18, 11]], sun: SUN_HIGH },
      make: (L, lib, ctx) => frame([17.0, 0.6, 11.0], ctx, { az: 0, el: 9, fov: 28, fill: 0.3, at: [0.22, 0.12], quad: { pos: [17.0, 0.6, 11.0], yaw: 90, pitch: 30, roll: 0 } })
    },
    {
      id: 'p6-b', page: 'c1-p6', panel: 'b', world: 'field',
      make: (L, lib, ctx) => {
        const q = [13.0, 4.2, 4.0];
        const yaw = yawToward(q, [-6, 0, -26]);
        return frame(q, ctx, { az: yaw + 180 + 28, el: 22, fov: 58, fill: 0.15, at: [0.12, 0.38], quad: { pos: q, yaw, pitch: 14, roll: -14 } });
      }
    },

    /* ---- page 7: for me ---- */
    {
      id: 'p7-a', page: 'c1-p7', panel: 'a', world: 'field',
      make: (L, lib, ctx) => frame([19.35, 1.1, 16.7], ctx, { az: 52, el: 7, fov: 40, fill: 0.2, at: [0.3, 0.02], quad: { pos: [19.35, 1.1, 16.7], yaw: 70, pitch: 2, roll: 0 } })
    },
    {
      id: 'p7-b', page: 'c1-p7', panel: 'b', world: 'field',
      make: () => ({ cam: [17.75, 0.9, 20.6], look: [17.9, 0.88, 12.0], fov: 85, quad: null })
    },
    {
      id: 'p7-c', page: 'c1-p7', panel: 'c', world: 'field',
      make: () => ({ cam: [17.65, 1.12, 17.4], look: [17.9, 0.85, 13.0], fov: 46, quad: { pos: [17.88, 0.92, 15.0], yaw: -3.3, pitch: 18, roll: 0 } })
    },

    /* ---- page 8: for anyone ---- */
    { id: 'p8-a', page: 'c1-p8', panel: 'a', world: 'title', viewport: [1600, 900], clip: [40, 236, 1240, 630] },
    { id: 'p8-b', page: 'c1-p8', panel: 'b', world: 'field', make: (L) => fpv(L, L.total - 4.6, { ahead: 7, fov: 98 }) },

    /* ---- page 9: their game ---- */
    { id: 'p9-a', page: 'c1-p9', panel: 'a', world: 'builder', viewport: [1600, 900], clip: [560, 140, 680, 576] },
    { id: 'p9-b', page: 'c1-p9', panel: 'b', world: 'builder', viewport: [1600, 900], clip: [8, 140, 1240, 480] },
    { id: 'p9-c', page: 'c1-p9', panel: 'c', world: 'builder', viewport: [1600, 900], clip: [205, 770, 1030, 158] },

    /* ---- page 10: their game, flown ---- */
    { id: 'p10-a', page: 'c1-p10', panel: 'a', world: 'field', make: (L) => fpv(L, 55.4 - 3.2, { ahead: 4, fov: 100 }) },
    {
      id: 'p10-b', page: 'c1-p10', panel: 'b', world: 'field',
      make: (L, lib, ctx) => {
        const d = 118.8;
        const f = L.frame(d);
        const q = f.p;
        return frame(q, ctx, { az: azOf(f.right) + 30, el: 4, fov: 46, fill: 0.2, at: [0, -0.1], quad: { pos: q, yaw: lib.yawFor(f.fwd), pitch: -30, roll: 0 } });
      }
    },
    {
      id: 'p10-c', page: 'c1-p10', panel: 'c', world: 'town', lines: true,
      make: (L, lib, ctx) => frame([-1.4, 15.4, 44.0], ctx, { az: 18, el: 28, fov: 58, fill: 0.17, at: [0.02, -0.08], quad: { pos: [-1.4, 15.4, 44.0], yaw: 8, pitch: 46, roll: 10 } })
    },

    /* ---- page 11: the feel ---- */
    {
      id: 'p11-a', page: 'c1-p11', panel: 'a', world: 'room',
      make: (L, lib, ctx) => frame([-1.9, 1.25, 1.0], ctx, { az: 140, el: 18, fov: 54, fill: 0.13, at: [-0.22, -0.08], quad: { pos: [-1.9, 1.25, 1.0], yaw: -90, pitch: 25, roll: 12 } })
    },
    {
      id: 'p11-b', page: 'c1-p11', panel: 'b', world: 'room',
      make: (L, lib, ctx) => frame([-1.0, 1.35, 0.6], ctx, { az: 150, el: 24, fov: 36, fill: 0.56, at: [0.04, -0.06], quad: { pos: [-1.0, 1.35, 0.6], yaw: -80, pitch: 18, roll: 4 } })
    },
    {
      id: 'p11-c', page: 'c1-p11', panel: 'c', world: 'room',
      make: () => ({ cam: [0.0, 1.25, -0.3], look: [2.54, 1.22, -1.42], fov: 96, quad: null })
    },

    /* ---- page 12: the testers ---- */
    {
      id: 'p12-b', page: 'c1-p12', panel: 'b', world: 'field',
      make: (L, lib, ctx) => {
        const d = 82.6;
        const f = L.frame(d);
        const q = add(f.p, [0, 0.25, 0]);
        const outside = mul(f.right, -1);
        return frame(q, ctx, { az: azOf(add(outside, mul(f.fwd, -0.6))), el: 8, fov: 42, fill: 0.3, at: [0.05, 0], quad: { pos: q, yaw: lib.yawFor(f.fwd), pitch: 22, roll: 58 } });
      }
    },
    { id: 'p12-c', page: 'c1-p12', panel: 'c', world: 'bench', viewport: [1600, 900], clip: [200, 300, 1050, 389] },

    /* ---- page 13: the line ---- */
    { id: 'p13', page: 'c1-p13', panel: 'a', world: 'field', make: (L) => fpv(L, L.total - 3.2, { ahead: 5, fov: 100 }) },

    /* ---- page 14: the notes so far ---- */
    {
      id: 'n1', page: 'c1-p14', panel: 'n1', world: 'field',
      paper: { probes: [[17, 11], [17, 17], [17, 5], [20, 11]], sun: SUN_LOW },
      make: (L, lib, ctx) => frame(SPOT, ctx, { az: 20, el: 8, fov: 24, fill: 0.15, at: [0.2, -0.32], quad: { pos: SPOT, yaw: 200, pitch: -3, roll: 0 } })
    },
    { id: 'n2', page: 'c1-p14', panel: 'n2', world: 'builder', viewport: [1600, 900], clip: [600, 300, 640, 311] },
    { id: 'n3', page: 'c1-p14', panel: 'n3', world: 'board', viewport: [1600, 777] },
    { id: 'n4', page: 'c1-p14', panel: 'n4', world: 'landing', viewport: [1600, 777] },
    {
      id: 'n5', page: 'c1-p14', panel: 'n5', world: 'field',
      make: (L, lib, ctx) => frame([18.4, 0.09, 9.5], ctx, { az: 30, el: 20, fov: 32, fill: 0.36, at: [0, -0.05], quad: { pos: [18.4, 0.09, 9.5], yaw: 40, pitch: 0, roll: 180 } })
    },
    {
      id: 'n6', page: 'c1-p14', panel: 'n6', world: 'town',
      make: () => ({ cam: [21.3, 19.0, 24.16], look: [19.6, 17.9, 34.0], fov: 52, quad: null })
    },
    { id: 'n7', page: 'c1-p14', panel: 'n7', world: 'room', make: () => ({ cam: [-4.6, 3.1, 4.0], look: [0.8, 1.0, -1.2], fov: 60, quad: null }) },
    {
      id: 'n8', page: 'c1-p14', panel: 'n8', world: 'town',
      make: (L, lib, ctx) => {
        const cam0 = [2.96, 19.6, -55.06];
        const dir = norm([0.35, -0.2, -0.93]);
        const q = add(cam0, add(mul(dir, 3.4), [0, -0.5, 0]));
        return frame(q, ctx, { az: azOf(mul(dir, -1)), el: 14, fov: 50, fill: 0.2, at: [0.1, -0.05], quad: { pos: q, yaw: yawToward(cam0, q), pitch: 30, roll: -20 } });
      }
    },
    {
      id: 'n10', page: 'c1-p14', panel: 'n10', world: 'field',
      make: (L, lib, ctx) => frame([17.88, 2.75, 15.55], ctx, { az: 35, el: 2, fov: 40, fill: 0.2, at: [0.12, 0.3], quad: { pos: [17.88, 2.75, 15.55], yaw: -3.3, pitch: 0, roll: 180 } })
    },

    /* ---- page 15: next ---- */
    { id: 'p15-a', page: 'c1-p15', panel: 'a', world: 'field', make: (L) => fpv(L, L.total - 9, { ahead: 6, fov: 86, roll: 0 }) }
  ],
  /* Pictures cut again from a frame shot for another panel. */
  reuse: []
};
