/*
 * Chapter 9's pictures, Track of the week: 3 to 5 November 2026.
 *
 * Every picture is a frame the simulator drew, from a checkout at 013cd22
 * (its main on 6 November 2026) served by scripts/serve.js and held in the
 * capture rig (tools/shoot/rig.js) with the real game running: the page is
 * booted into a map or a track and flown off the quad picker, and the
 * camera is put where a panel wants it with the simulator's own camera
 * override (window.__setCam). Places in the two rebuilt maps are named in
 * their own plan metres and turned into the world's with the map's own
 * worldAt, imported in the page, so a camera stands where the source says
 * the room is.
 *
 * The five inch tracks are two of the six chapter tracks the simulator
 * ships (src/trackbuilder/presets5.js), copied as they are into
 * tools/shoot/tracks/. A night frame is the same track with Settings, Race
 * time set to Night (sim PR 226). The Track of the week card and the board
 * ghosts are the live board's (https://webfpv.org/board), answered on the
 * simulator's loopback board address by tools/shoot/c9-board.js, which has
 * to be running.
 *
 * Three pictures are `file` jobs, frames the feature's own thread drew from
 * the real page and kept in the project folder: the pilot editor's Tag tab
 * (room-names/tag-tab.png, sim PR 231), the 369DRONE find on a back fence
 * (369drone/found-panel-heads.png, sim PR 237, the real find fired in a
 * headless flight) and the front page's Supporters block, shot here from
 * the front page's checkout.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');

const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const f = (...p) => path.join(PF, ...p);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SIM_DIR = process.env.SIM_DIR || path.join(__dirname, '..', '..', '..', 'WebFPVSimulator');

const GUIDES = { sound: false, guidedRace: true, guidedWhoop: true, guidedFreestyle: true };
const QUIET = '.bug-chip, .osd-air, .osd-air-hint, .tune-invite, .support-prompt { display: none !important; }';

/* Boot a map into flight, answering the quad picker with Enter. */
function boot(map, wait) {
  return async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 600000, polling: 1000 });
    await page.waitForFunction((m) => { const x = window.__map && window.__map(); return x && x.ready && x.id === m; }, map, { timeout: 600000, polling: 1000 });
    await page.waitForFunction(() => { const d = document.querySelector('.name-dialog'); return Boolean(d && !d.hidden && document.querySelector('.qp-page')); }, null, { timeout: 90000 });
    await sleep(500);
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.__ui.screen === 'flight', null, { timeout: 90000 });
    await sleep(wait || 1500);
  };
}

/* A camera at an eye looking at a point, both world metres. */
const cam = (eye, at, ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(([e, a]) => window.__setCam(e[0], e[1], e[2], a[0], a[1], a[2]), [eye, at]);
  await sleep(ms || 3500);
};

/* A camera in a rebuilt map's own plan metres (px, py, h), turned into the
 * world's by that map's worldAt, read from the served source. */
const plan = (mod, eye, at, ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(async ([m, e, a]) => {
    /* The house's own figure of the VIP, and his speech balloon, are hidden:
     * the book never shows or names him (STORYBOARD.md, Chapter 9). */
    if (window.__mapScene) window.__mapScene().traverse((o) => { if (o.name === 'nick' || o.name === 'nick balloon') o.visible = false; });
    const W = (await import(m)).worldAt;
    const E = W(...e);
    const A = W(...a);
    window.__setCam(E[0], E[1], E[2], A[0], A[1], A[2]);
  }, [mod, eye, at]);
  await sleep(ms || 3500);
};
const SHOP = '/src/maps/warehouse/warehouse.js';
const HOUSE = '/src/maps/house/house.js';

/* A camera relative to a track's start: the spawn's forward is
 * (sin yaw, -cos yaw) in the map's x and z, yaw in radians. */
const fromSpawn = (o, ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  const sp = await page.evaluate(() => window.__map().spawn);
  const fx = Math.sin(sp.yaw);
  const fz = -Math.cos(sp.yaw);
  const sx = -fz;
  const sz = fx;
  const e = [sp.x - fx * (o.back || 0) + sx * (o.side || 0), sp.y + (o.up || 0), sp.z - fz * (o.back || 0) + sz * (o.side || 0)];
  const a = [sp.x + fx * o.ahead + sx * (o.lside || 0), sp.y + (o.lookUp || 0), sp.z + fz * o.ahead + sz * (o.lside || 0)];
  await page.evaluate(([e, a]) => window.__setCam(e[0], e[1], e[2], a[0], a[1], a[2]), [e, a]);
  await sleep(ms || 3500);
};

/* A camera over a track's start, looking down the course at the middle of
 * its gates (window.__race().gates), `back` metres behind the start on the
 * line from the gates' middle, `up` over the ground. */
const overGates = (o, ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate((o) => {
    const sp = window.__map().spawn;
    const g = window.__race().gates;
    const c = g.reduce((a, q) => [a[0] + q.x / g.length, a[1] + q.y / g.length, a[2] + q.z / g.length], [0, 0, 0]);
    let dx = sp.x - c[0];
    let dz = sp.z - c[2];
    const d = Math.hypot(dx, dz) || 1;
    dx /= d; dz /= d;
    const sx = -dz;
    const sz = dx;
    const e = [sp.x + dx * (o.back || 0) + sx * (o.side || 0), o.up, sp.z + dz * (o.back || 0) + sz * (o.side || 0)];
    const t = o.toward == null ? 1 : o.toward;
    const a = [sp.x + (c[0] - sp.x) * t, o.lookUp || 1, sp.z + (c[2] - sp.z) * t];
    window.__setCam(e[0], e[1], e[2], a[0], a[1], a[2]);
  }, o);
  await sleep(ms || 3500);
};

/* The pause menu's Settings, scrolled to one row by its label. */
const settingsRow = (label, cursor = true) => async (page) => {
  const flying = await page.evaluate(() => window.__ui.screen === 'flight');
  if (flying) {
    await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__ui.act('pause'); window.__ui.show('paused'); });
    await sleep(800);
    await page.evaluate(() => { const all = [...document.querySelectorAll('.menu *')].filter((x) => x.children.length === 0 && /^Settings$/i.test(x.textContent.trim())); const e = all[all.length - 1]; if (e) e.click(); });
  } else {
    /* A race track's Settings, from the title, where its race rows are. */
    await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__ui.show('pilot'); });
  }
  await sleep(1500);
  const look = (l) => {
    const re = new RegExp('^' + l + '$', 'i');
    const own = (x) => [...x.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    const e = [...document.querySelectorAll('*')].find((x) => re.test(own(x)));
    if (e) e.scrollIntoView({ block: 'center' });
    if (!e) console.log('DBG rows ' + JSON.stringify([...document.querySelectorAll('body *:not(style):not(script)')].map(own).filter((t) => t.length < 60 && /reset|fish|race time/i.test(t)).slice(0, 20)));
    if (!e) return null;
    const r = e.getBoundingClientRect();
    return [r.x + r.width / 2, r.y + r.height / 2];
  };
  let found = await page.evaluate(look, label);
  if (found) { await sleep(800); found = await page.evaluate(look, label); }
  if (!found) {
    /* The race rows (Reset to among them) are on the Quad room, which the
     * pause menu's Settings does not open. */
    await page.evaluate(() => { window.__ui.show('quad'); });
    await sleep(1500);
    found = await page.evaluate(look, label);
    if (found) { await sleep(800); found = await page.evaluate(look, label); }
  }
  if (!found) throw new Error('no Settings row ' + label);
  /* The menu's own cursor on the row, so the note beside or under the
   * list is that row's. A pointer hover does not take in a headless page. */
  await page.evaluate(([l, c]) => {
    const re = new RegExp('^' + l + '$', 'i');
    const i = window.__ui.items().findIndex((x) => x && re.test(x.label || ''));
    if (i >= 0 && c) window.__ui.setCursor(i);
    /* The flying chip names the track, and the chapter tracks' names are
     * not lettered. */
    for (const e of document.querySelectorAll('*')) if (e.children.length === 0 && /^Flying$/.test((e.textContent || '').trim()) && e.parentElement && /Chapter/.test(e.parentElement.textContent) && e.parentElement.textContent.length < 80) e.parentElement.style.visibility = 'hidden';
  }, [label, cursor]);
  await sleep(800);
  await page.evaluate(look, label);
  await sleep(1200);
};

const TRACK = (id) => path.join(__dirname, 'tracks', id + '.json');
const DIVE = TRACK('trk-00a85dee');

const world = (key, map, extra) => [key, Object.assign({
  path: `/index.html?map=${map}&craft=5inch&fly=1`,
  wait: 1500,
  airframe: '5inch',
  settings: GUIDES,
  storage: { 'webfpv.airhint.v2': '1' },
  prep: boot(map)
}, extra || {})];

/* A five inch track out of the builder's list, flown by day or by night. */
const race = (key, file, time) => [key, {
  path: '/index.html?map=custom',
  wait: 1500,
  track: file,
  airframe: '5inch',
  settings: Object.assign({ raceTime: time, graphics: 'low' }, GUIDES),
  storage: { 'webfpv.airhint.v2': '1' },
  prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => { const m = window.__map && window.__map(); return Boolean(m && m.ready && m.gates > 0); }, null, { timeout: 300000, polling: 1000 });
    await sleep(4000);
  }
}];

const worlds = Object.fromEntries([
  world('shop', 'warehouse', { settings: Object.assign({ graphics: 'low' }, GUIDES) }),
  world('house', 'house', { settings: Object.assign({ graphics: 'low' }, GUIDES) }),
  world('concert', 'concert', { settings: Object.assign({ graphics: 'low' }, GUIDES) }),
  world('yume', 'yume', { settings: Object.assign({ graphics: 'low' }, GUIDES) }),
  world('lens', 'city', { settings: Object.assign({ fisheye: 60, graphics: 'low' }, GUIDES) }),
  world('menus', 'city', { settings: Object.assign({ fisheye: 60, raceTime: 'night', resetTo: 'gate', graphics: 'low' }, GUIDES) }),
  race('day', DIVE, 'day'),
  race('night', DIVE, 'night'),
  ['gateReset', Object.assign({}, race('x', DIVE, 'day')[1], { settings: Object.assign({ raceTime: 'day', graphics: 'low', resetTo: 'gate' }, GUIDES) })],
  ['solo', {
    path: '/index.html', wait: 6000, airframe: '5inch', settings: Object.assign({ graphics: 'low' }, GUIDES), storage: { 'webfpv.airhint.v2': '1' },
    prep: async (page) => {
      await page.addStyleTag({ content: QUIET });
      await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000 });
      await sleep(2000);
      await page.evaluate(() => window.__ui.turnGate('solo'));
      await page.waitForFunction(() => Boolean(window.__ui.week), null, { timeout: 120000, polling: 1000 });
      await sleep(4000);
      /* The store chip is never lettered in the book. */
      await page.evaluate(() => { for (const e of document.querySelectorAll('*')) if (e.children.length === 0 && /steam|patreon/i.test((e.textContent || '').trim())) { (e.closest('a, button') || e).style.visibility = 'hidden'; } });
      await sleep(2500);
    }
  }],
  ['ghosts', {
    path: '/index.html?map=custom&share=trk-d16e93ac', wait: 6000, airframe: '5inch', settings: Object.assign({ ghost: 'top3', graphics: 'low' }, GUIDES), storage: { 'webfpv.airhint.v2': '1' },
    prep: async (page) => {
      /* The week's track, WA State Champs 2026 (board PR 78's pick for the
       * week of 2 November), opened from the board as a shared track and
       * flown with Ghost set to Board top 3, as scripts/ghosttop-check.js
       * opens its own. */
      await page.addStyleTag({ content: QUIET });
      await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 2000 });
      await page.evaluate(() => { const ui = window.__ui; ui.onAction('fly', ui.settings); });
      await page.waitForFunction(() => { const m = window.__map && window.__map(); return Boolean(m && m.ready && m.gates > 0); }, null, { timeout: 300000, polling: 2000 });
      await page.waitForFunction(() => window.__ghost && window.__ghost().top.length === 3, null, { timeout: 120000, polling: 1000 });
      await sleep(3000);
    }
  }]
]);

/* Through the first timing gate, which starts the lap the board's three
 * ghosts fly, with the simulator's own flight helpers (scripts/lib/pilot.js),
 * then the pilot's own view a moment into the lap. */
const throughStart = (afterMs) => async (page) => {
  const { PILOT } = await import(require('url').pathToFileURL(path.join(SIM_DIR, 'scripts', 'lib', 'pilot.js')).href);
  await page.evaluate(`(async () => { ${PILOT}\n return 1; })()`);
  await page.evaluate(async () => {
    const { V } = window.__vm; const g = window.__race().gates[0];
    const a = V(g.x - g.az.x * 6, g.y + 1.0, g.z - g.az.z * 6);
    const b = V(g.x + g.az.x * 10, g.y + 1.0, g.z + g.az.z * 10);
    const hd = Math.atan2(g.az.x, g.az.z);
    /* A slow frame can miss the gate's pass; fly it again until the lap
     * starts. */
    for (let k = 0; k < 4 && window.__race().lapStartMs == null; k += 1) {
      await window.__settle(a, hd, 1.2);
      await window.__fly(window.__ramp(a, b, 3.0, 6), { heading: hd, extraMs: 1200 });
    }
    return 1;
  });
  console.log('DBG lap ' + JSON.stringify(await page.evaluate(() => { const r = window.__race(); return { start: r.lapStartMs, next: r.next, g0: r.gates[0], g1: r.gates[1], screen: window.__ui.screen, craft: window.__craftState && window.__craftState(), top: window.__ghost().extrasVisible }; })));
  await sleep(afterMs || 1200);
  /* A camera that rides behind the chased ghost every frame, along the
   * way it is going, so the three board laps are in the frame however long
   * the frame takes to draw. */
  await page.evaluate(() => {
    window.__ui.root.style.visibility = 'hidden';
    let last = null;
    let dir = [0, 0, -1];
    /* The three ghosts are rigs built alike, so the chased ghost's group,
     * found by its position, gives the shape to find the other two by. The
     * camera aims at the middle of those in the air and backs off with
     * their spread, so all three laps stay in the frame. */
    let root = window.__mapScene();
    while (root.parent) root = root.parent;
    const sig = (o) => o.children.map((c) => c.type + c.children.length).join(',');
    const g0 = window.__ghost().position;
    let mainRig = null;
    root.traverse((o) => { if (!mainRig && o.children.length && o.position.distanceTo({ x: g0[0], y: g0[1], z: g0[2] }) < 1e-6) mainRig = o; });
    const rigs = [];
    if (mainRig) { const k = sig(mainRig); root.traverse((o) => { if (o.children.length && sig(o) === k) rigs.push(o); }); }
    const near = () => rigs.filter((o) => o.visible).map((o) => { const w = o.getWorldPosition(o.position.clone()); return [w.x, w.y, w.z]; });
    let spot = null;
    let frame = 0;
    const ride = () => {
      const g = window.__ghost();
      let p = g.position;
      if (frame++ % 6 === 0) {
        const t = near();
        if (t.length) {
          const c = t.reduce((a, q) => [a[0] + q[0] / t.length, a[1] + q[1] / t.length, a[2] + q[2] / t.length], [0, 0, 0]);
          const r = Math.max(...t.map((q) => Math.hypot(q[0] - c[0], q[2] - c[2])));
          spot = { c, r };
        }
      }
      if (spot) p = [spot.c[0], spot.c[1], spot.c[2]];
      const back = 3.5 + (spot ? spot.r * 0.8 : 0);
      const side = 0.6;
      if (last) {
        const dx = p[0] - last[0];
        const dz = p[2] - last[2];
        const d = Math.hypot(dx, dz);
        if (d > 0.05) dir = [0.7 * dir[0] + 0.3 * dx / d, 0, 0.7 * dir[2] + 0.3 * dz / d];
      }
      last = p;
      const n = Math.hypot(dir[0], dir[2]) || 1;
      const fx = dir[0] / n;
      const fz = dir[2] / n;
      window.__setCam(p[0] - fx * back + fz * side, p[1] + 2.6, p[2] - fz * back - fx * side, p[0] + fx * 2, p[1] - 0.4, p[2] + fz * 2);
      requestAnimationFrame(ride);
    };
    ride();
    return rigs.length;
  }).then((n) => console.log('DBG rigs ' + n));
  await sleep(1500);
};

const jobs = [
  /* the cover */
  ['cover-hero', 'c9-cover', 'hero', 'night', overGates({ up: 5, back: -4, toward: 0.9, lookUp: 1.5 }), 'A chapter track at night, from behind the pads (sim PRs 222 and 226).'],
  ['cover-w1', 'c9-cover', 'w1', 'shop', plan(SHOP, [32.9, 2.8, 2.4], [45.5, 0.9, 0.6]), 'The print room (sim PR 230).'],
  ['cover-w2', 'c9-cover', 'w2', 'solo', async () => { await sleep(500); }, 'The Fly solo page and its Track of the week card (sim e241a8a, board PR 78).'],
  ['cover-w3', 'c9-cover', 'w3', 'lens', async (page) => { await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; }); await sleep(3000); }, 'The pilot\'s camera with Fisheye on Strong (sim PR 236).'],
  /* 1 Thomas More's Shop */
  ['p1-a', 'c9-p1', 'a', 'shop', plan(SHOP, [31.6, 0.75, 1.5], [19.5, 0.7, 0.9]), 'The red corridor behind the south racking (sim PR 232).'],
  ['p1-b', 'c9-p1', 'b', 'shop', plan(SHOP, [33.0, 3.1, 3.9], [44.0, 1.2, 0.4]), 'The print room from over its wall (sim PR 230).'],
  ['p1-c', 'c9-p1', 'c', 'shop', plan(SHOP, [20.5, 41.0, 3.8], [32.0, 53.4, 1.6]), 'The workshop\'s far corner, from the board card\'s own lens (sim PRs 229 and 232).'],
  /* 2 the house */
  ['p2-a', 'c9-p2', 'a', 'house', plan(HOUSE, [10.0, 19.0, 2.4], [22.0, 7.0, 1.8]), 'The back yard, the pavilion and the tall fence (sim PR 233).'],
  ['p2-b', 'c9-p2', 'b', 'house', plan(HOUSE, [3.4, 4.0, 1.8], [0.3, 6.4, 1.3]), 'The family room\'s chimney wall (sim PR 234).'],
  ['p2-c', 'c9-p2', 'c', 'house', plan(HOUSE, [27.0, 17.0, 5.0], [10.0, 7.0, 2.5]), 'The back of the house from over the yard, the maple and the neighbours (sim PR 235).'],
  /* 3 five inch racing */
  ['p3-a', 'c9-p3', 'a', 'day', overGates({ up: 4, back: -6, toward: 1, lookUp: 1.5 }), 'A chapter track by day, the orange gates and flags (sim PR 221).'],
  ['p3-b', 'c9-p3', 'b', 'day', fromSpawn({ up: 3, back: 10, ahead: 40, lookUp: 1 }), 'The pilots\' corner behind the pads (sim PRs 221 and 223).'],
  ['p3-c', 'c9-p3', 'c', 'day', overGates({ up: 3, back: -25, side: 8, toward: 1.6, lookUp: 3 }), 'A chapter track\'s tower and dive gate (sim PR 221).'],
  /* 4 night */
  ['p4-a', 'c9-p4', 'a', 'night', overGates({ up: 2.5, back: -8, side: -3, toward: 1.1, lookUp: 2 }), 'The same track at night (sim PRs 222 and 226).'],
  ['p4-b', 'c9-p4', 'b', 'menus', settingsRow('Race time', false), 'The Race time row in Settings (sim PR 226).', { viewport: [960, 632] }],
  /* 5 track of the week */
  ['p5-a', 'c9-p5', 'a', 'solo', async () => { await sleep(500); }, 'The Fly solo page with the Track of the week card, read from the live board (sim e241a8a, board PR 78).'],
  ['p5-b', 'c9-p5', 'b', 'ghosts', throughStart(1500), 'Ghost: Board top 3 on the week\'s track, a moment after the start gate (sim e241a8a).'],
  ['p5-c', 'c9-p5', 'c', 'gateReset', settingsRow('Reset to'), 'The Reset to row in Settings, set to Last gate (sim e241a8a).', { viewport: [700, 916], clip: [0, 64, 700, 852], focus: [0, 0.5] }],
  /* 6 fisheye */
  ['p6-a', 'c9-p6', 'a', 'lens', async (page) => { await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; }); await sleep(3000); }, 'The town with Fisheye on Strong (sim PR 236).'],
  ['p6-b', 'c9-p6', 'b', 'menus', settingsRow('Fisheye'), 'The Fisheye row in Settings (sim PR 236).', { viewport: [960, 632] }],
  /* 7 handle */
  ['p7-a', 'c9-p7', 'a', null, f('room-names', 'tag-tab.png'), 'The pilot editor\'s Tag tab, drawn by the feature\'s thread from the real page at 1280 by 720 (sim PR 231, board PR 73).'],
  /* 8 369DRONE */
  ['p8-a', 'c9-p8', 'a', null, f('369drone', 'found-panel-heads.png'), 'The 369DRONE sign on a back fence and the FOUND card, from the real find fired in a headless flight by the feature\'s thread (sim PR 237). Cut to the FOUND card side.', { focus: [1, 0.5] }],
  ['p8-b', 'c9-p8', 'b', null, f('chapter-9', 'frames', 'landing-supporters.png'), 'The front page\'s Supporters block, from the front page\'s checkout at bc17462 (landing commit 076836f).'],
  /* 9 also */
  ['p9-b', 'c9-p9', 'b', 'concert', cam([-30, 12, 8], [66, 13, 0], 3500), 'Hanabi Sound after its cartoon pass (sim PR 224).'],
  ['p9-c', 'c9-p9', 'c', 'yume', cam([-20, 14, 50], [0, 6, 28], 3500), 'Yumeboshi Land after its cartoon pass (sim PR 225).'],
  /* 10 next */
  ['p10-a', 'c9-p10', 'a', 'night', overGates({ up: 28, back: 20, toward: 1, lookUp: 0 }), 'The night track from above (sim PRs 222 and 226).']
].map(([id, page, panel, world, how, note, extra]) => Object.assign({ id, page, panel, note }, typeof how === 'string' ? { file: how, world: null } : { world, act: how }, extra || {}));

const missing = jobs.filter((j) => j.file && !fs.existsSync(j.file)).map((j) => j.id);
module.exports = { id: 'c9', missing, worlds, shots: jobs.filter((j) => !j.file || fs.existsSync(j.file)), reuse: [] };
