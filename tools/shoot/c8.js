/*
 * Chapter 8's pictures, Two new worlds: 1 to 3 November 2026.
 *
 * Every picture is a frame the simulator drew, from a checkout at f23ce7f
 * (its main on 3 November 2026) served by scripts/serve.js and held in the
 * capture rig (tools/shoot/rig.js) with the real game running: the page is
 * booted into a map and flown off the quad picker, and the camera is put
 * where a panel wants it with the simulator's own camera override
 * (window.__setCam). Nothing is painted. The Quad Ball room frames were
 * drawn by the simulator's own scripts/together-shots.js quickball scene,
 * which starts a board from the leaderboard checkout and has two pilots fly
 * in one room; its Quad Ball door line had to be pointed at the new Mini
 * games page to run on main (a throwaway copy, never committed to the
 * simulator), and the three frames are kept in the project folder, in
 * chapter-8/frames. Those are `file` jobs.
 *
 * Never framed: where any hidden Konex Drone logo is hung. No map frame in
 * this chapter has been checked to leave a hidden sign out of view without a
 * person looking at it (see STORYBOARD.md, Chapter 8 pictures).
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const rig = require('./rig');
const fs = require('fs');

const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const f = (...p) => path.join(PF, ...p);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pause = (ms) => async () => { await sleep(ms); };

const GUIDES = { sound: false, guidedRace: true, guidedWhoop: true, guidedFreestyle: true };
const QUIET = '.bug-chip, .osd-air, .osd-air-hint, .tune-invite, .support-prompt { display: none !important; }';

/* Boot a map into flight, answering the quad picker with Enter. */
function boot(map, wait) {
  return async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000 });
    await page.waitForFunction((m) => { const x = window.__map && window.__map(); return x && x.ready && x.id === m; }, map, { timeout: 300000 });
    await page.waitForFunction(() => { const d = document.querySelector('.name-dialog'); return Boolean(d && !d.hidden && document.querySelector('.qp-page')); }, null, { timeout: 90000 });
    await sleep(500);
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.__ui.screen === 'flight', null, { timeout: 90000 });
    await sleep(wait || 1500);
  };
}

/* A camera put at an eye looking at a point, held while the frame settles. */
const cam = (eye, at, ms, hideUi) => async (page) => {
  if (hideUi !== false) await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(([e, a]) => window.__setCam(e[0], e[1], e[2], a[0], a[1], a[2]), [eye, at]);
  await sleep(ms || 3000);
};

/* The simulator's own world coordinates for the festival: venue metres to
 * the page's, x less 140 and z as 110 less y (src/maps/concert/venue.js). */
const hz = (x, h, y) => [x - 140, h, 110 - y];

/* A dogfight round booted on a phone, so the fire buttons are on the glass. */
function bootGame(map, rules) {
  return async (page) => {
    await boot(map)(page);
    await page.evaluate((r) => { window.__ui.dogfight = r; }, rules);
    await page.waitForFunction(() => Boolean(window.__dogfight()), null, { timeout: 90000 });
    await page.evaluate(() => window.__stick(0, 0, 0, 0.7));
    await page.waitForFunction(() => window.__dogfight().startedMs >= 0, null, { timeout: 180000 });
    await sleep(2500);
  };
}

const world = (key, map, craft, extra) => [key, Object.assign({
  path: `/index.html?map=${map}&craft=${craft}&fly=1`,
  wait: 1500,
  airframe: craft,
  settings: GUIDES,
  storage: { 'webfpv.airhint.v2': '1' },
  prep: boot(map)
}, extra || {})];

const worlds = Object.fromEntries([
  world('concert', 'concert', '5inch'),
  world('yume', 'yume', '5inch'),
  world('cedar', 'cedar', '5inch'),
  world('arctic', 'arctic', '5inch'),
  world('touge', 'touge', '5inch'),
  world('hayate', 'hayate', '5inch'),
  ['phone', { path: '/index.html?map=city&craft=5inch&fly=1', wait: 1500, airframe: '5inch', settings: Object.assign({ touchSize: 'large' }, GUIDES), storage: { 'webfpv.airhint.v2': '1' }, touch: true, viewport: [844, 390], prep: bootGame('city', { bots: 3, skill: 'pilot', round: '5m', hits: 'arcade' }) }],
  ['phoneFree', { path: '/index.html?map=city&craft=5inch&fly=1', wait: 1500, airframe: '5inch', settings: Object.assign({ touchSize: 'large' }, GUIDES), storage: { 'webfpv.airhint.v2': '1' }, touch: true, viewport: [844, 390], prep: boot('city') }],
  ['title', {
    path: '/index.html', wait: 6000, airframe: '5inch', settings: GUIDES, storage: { 'webfpv.airhint.v2': '1' },
    prep: async (page) => {
      await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000 });
      await sleep(3000);
      /* The store chip is never lettered in the book. */
      await page.evaluate(() => { for (const e of document.querySelectorAll('*')) if (e.children.length === 0 && /steam/i.test((e.textContent || '').trim())) { (e.closest('a, button') || e).style.visibility = 'hidden'; } });
    }
  }]
]);

const dbgSpawn = async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  const sp = await page.evaluate(() => JSON.stringify(window.__map().spawn));
  console.log('DBG spawn ' + sp);
  await sleep(1500);
};
/* A camera put relative to the map's spawn: the spawn's forward is
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
const openSettings = async (page) => {
  await page.evaluate(() => { window.__ui.act('pause'); window.__ui.show('paused'); });
  await sleep(800);
  const rows = await page.evaluate(() => [...document.querySelectorAll('.menu *')].filter((e) => e.children.length === 0).map((e) => e.textContent.trim()).filter(Boolean).slice(0, 30));
  console.log('DBG rows ' + JSON.stringify(rows));
  await page.evaluate(() => { const all = [...document.querySelectorAll('.menu *')].filter((x) => x.children.length === 0 && /^Settings$/i.test(x.textContent.trim())); const e = all[all.length - 1]; if (e) e.click(); });
  await sleep(1500);
  await page.evaluate(() => {
    const e = [...document.querySelectorAll('*')].find((x) => x.children.length === 0 && /^Thumb stick size$/i.test((x.textContent || '').trim()));
    console.log('DBG thumbrow ' + Boolean(e));
    if (e) e.scrollIntoView({ block: 'center' });
  });
  await sleep(800);
};
const QB = (n) => f('chapter-8', 'frames', n);
const YUME = {
  loop: [[-80, 14, -10], [-52, 14, -40]],
  lift: [[-30, 12, 92], [-46, 18, 40]],
  street: [[0, 4, 112], [0, 6, 40]],
  rides: [[50, 30, 60], [80, 8, -20]],
  whole: [[-160, 90, 150], [0, 0, 0]]
};

const jobs = [
  /* the cover */
  ['cover-hero', 'c8-cover', 'hero', 'concert', cam(hz(118, 15, 110), hz(206, 13, 110), 3500), 'Hanabi Sound\'s main stage from the lawn (sim PR 219).'],
  ['cover-w1', 'c8-cover', 'w1', 'yume', cam(YUME.loop[0], YUME.loop[1], 3500), 'The Ryusei coaster and its loop (sim PR 220).'],
  ['cover-w2', 'c8-cover', 'w2', null, QB('quickball-portrait-results.png'), 'The Quad Ball results card, drawn in a portrait window so the whole card fits the panel (sim PR 208, board PR 63).'],
  ['cover-w3', 'c8-cover', 'w3', 'phoneFree', async (page) => { await page.evaluate(() => { window.__ui.root.style.visibility = ''; }); await sleep(1500); }, 'A phone in flight with Large thumb sticks (sim PR 209).', { viewport: [844, 390] }],
  /* 1 Hanabi */
  ['p1-a', 'c8-p1', 'a', 'concert', cam(hz(150, 6, 96), hz(206, 10, 110), 3500), 'Over the crowd toward the stage (sim PR 219).'],
  ['p1-b', 'c8-p1', 'b', 'concert', cam(hz(150, 4, 110), hz(206, 34, 110), 4000), 'Fireworks and lasers over the field (sim PR 219).'],
  ['p1-c', 'c8-p1', 'c', 'concert', cam(hz(40, 12, 150), hz(40, 16, 186), 3500), 'The ferris wheel (sim PR 219).'],
  /* 2 Yumeboshi */
  ['p2-a', 'c8-p2', 'a', 'yume', cam(YUME.lift[0], YUME.lift[1], 3500), 'The coaster lift hill (sim PR 220).'],
  ['p2-b', 'c8-p2', 'b', 'yume', cam([-20, 14, 50], [0, 6, 28], 3500), 'The main street from the hub (sim PR 220).'],
  ['p2-c', 'c8-p2', 'c', 'yume', cam(YUME.rides[0], YUME.rides[1], 3500), 'The rides (sim PR 220).'],
  /* 3 Quad Ball rooms */
  ['p3-a', 'c8-p3', 'a', null, QB('quickball-a-kicked-off.png'), 'A Quad Ball room before the kickoff, the clock running (sim PR 208).'],
  ['p3-b', 'c8-p3', 'b', null, QB('quickball-portrait-results.png'), 'The results card, nobody has asked for a rematch yet, drawn in a portrait window (sim PR 208, board PR 63).'],
  ['p3-c', 'c8-p3', 'c', null, QB('quickball-portrait-rematch-asked.png'), 'The results card after one Rematch, drawn in a portrait window (sim PR 208, board PR 63).'],
  /* 4 sound */
  ['p4-a', 'c8-p4', 'a', 'concert', async (page) => {
    await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
    await sleep(3500);
  }, 'The quad on its pad at the festival, the stage far ahead (sim PR 217).'],
  /* 5 phone */
  ['p5-a', 'c8-p5', 'a', 'phoneFree', openSettings, 'The Settings row for Thumb stick size on a phone (sim PR 209).', { viewport: [844, 390] }],
  ['p5-b', 'c8-p5', 'b', 'phone', async (page) => { await page.evaluate(() => { window.__ui.root.style.visibility = ''; }); await sleep(1500); }, 'Large thumb sticks and the fire buttons in a dogfight (sim PRs 209 and 215).', { viewport: [844, 390] }],
  /* 6 manga */
  ['p6-a', 'c8-p6', 'a', 'cedar', fromSpawn({ up: 14, back: 6, ahead: 40, lookUp: 2 }), 'Cedar Forest, conifers and grass (sim PR 210).'],
  ['p6-b', 'c8-p6', 'b', 'arctic', fromSpawn({ up: 5, ahead: -60, lookUp: -3 }), 'Hyoura Island\'s sea (sim PR 213).'],
  ['p6-c', 'c8-p6', 'c', 'touge', fromSpawn({ up: 12, back: 6, ahead: 12, lookUp: -9 }), 'Momiji Pass\'s car park (sim PR 214).'],
  ['p6-d', 'c8-p6', 'd', 'hayate', fromSpawn({ up: 10, back: 8, ahead: 22, lookUp: -6 }), 'Hayate Circuit\'s pit roof (sim PR 214).'],
  /* 7 also */
  ['p7-b', 'c8-p7', 'b', 'title', pause(500), 'The title cover (sim PR 211).'],
  ['p7-c', 'c8-p7', 'c', null, f('chapter-8', 'frames', 'board-maps.png'), 'The board\'s Maps page, served from the leaderboard checkout at f23ce7f-era main with a static server, with the cards that carry a person\'s name hidden (board PR 64).'],
  ['p7-d', 'c8-p7', 'd', null, f('chapter-8', 'frames', 'landing-partners.png'), 'The front page\'s partner row, set to wrap in a narrow window so it fills the panel, cut to the partners and Konex Drone (landing commit f415510).'],
  /* 8 next */
  ['p8-a', 'c8-p8', 'a', 'yume', cam(YUME.whole[0], YUME.whole[1], 3500), 'Yumeboshi Land from above (sim PR 220).']
].map(([id, page, panel, world, how, note, extra]) => Object.assign({ id, page, panel, note }, typeof how === 'string' ? { file: how, world: null } : { world, act: how }, extra || {}));

const missing = jobs.filter((j) => j.file && !fs.existsSync(j.file)).map((j) => j.id);
module.exports = { id: 'c8', missing, worlds, shots: jobs.filter((j) => !j.file || fs.existsSync(j.file)), reuse: [] };
