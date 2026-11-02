/*
 * Chapter 7's pictures, Game night: 28 to 30 October 2026.
 *
 * Every picture here is a frame the simulator drew, from a checkout at
 * 883f799 (its main on 1 November 2026) served by scripts/serve.js, held in
 * the capture rig (tools/shoot/rig.js) with the real game running: the page
 * is booted into a mini game on its own map, the bots fly, and the camera is
 * put beside a bot with the simulator's own camera override (window.__setCam)
 * wherever a panel wants a view the pilot's own eyes would not give. Nothing
 * is painted. A few frames were made by the thread that built the feature
 * and are kept in the project folder: those are `file` jobs, named with the
 * pull request they show.
 *
 * Never framed: where any hidden Konex Drone logo is hung. The Konex panel is
 * the logo file the simulator serves, on its own, and no map frame in this
 * chapter has been checked to leave a hidden sign out of view without a
 * person looking at it (see STORYBOARD.md, Chapter 7 pictures).
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');

const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const f = (...p) => path.join(PF, ...p);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const GUIDES = { sound: false, guidedRace: true, guidedWhoop: true, guidedFreestyle: true };
const QUIET = '.bug-chip, .osd-air, .osd-air-hint, .tune-invite, .support-prompt { display: none !important; }';

/* Boot a map into flight, answer the quad picker, set the game's rules and
 * take off, so the round is on. */
function boot(map, craft, rules, wait) {
  return async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000 });
    await page.waitForFunction((m) => { const x = window.__map && window.__map(); return x && x.ready && x.id === m; }, map, { timeout: 300000 });
    await page.waitForFunction(() => { const d = document.querySelector('.name-dialog'); return Boolean(d && !d.hidden && document.querySelector('.qp-page')); }, null, { timeout: 90000 });
    await sleep(500);
    await page.keyboard.press('Enter');
    await page.waitForFunction(() => window.__ui.screen === 'flight', null, { timeout: 90000 });
    if (rules) {
      await page.evaluate((r) => { window.__ui.dogfight = r; }, rules);
      await page.waitForFunction(() => Boolean(window.__dogfight()), null, { timeout: 90000 });
      await page.evaluate(() => window.__stick(0, 0, 0, 0.7));
      await page.waitForFunction(() => window.__dogfight().startedMs >= 0, null, { timeout: 180000 });
    }
    await sleep(wait || 1000);
  };
}

/* A camera that stays beside one slot of the running game: behind it, above
 * it and a little to one side, looking at it, updated ten times a second. */
const follow = (slot, back, up, side, ms) => async (page) => {
  await page.evaluate(({ slot, back, up, side }) => {
    if (window.__c7) clearInterval(window.__c7);
    let last = null;
    window.__c7 = setInterval(() => {
      const g = window.__dogfight && window.__dogfight();
      if (!g) return;
      const p = [g.x[slot], g.y[slot], g.z[slot]];
      let d = last ? [p[0] - last[0], 0, p[2] - last[2]] : [0, 0, 1];
      let l = Math.hypot(d[0], d[2]);
      if (l < 1e-4) d = window.__c7dir || [0, 0, 1]; else { d = [d[0] / l, 0, d[2] / l]; window.__c7dir = d; }
      last = p;
      const d2 = window.__c7dir || d;
      window.__setCam(p[0] - d2[0] * back - d2[2] * side, p[1] + up, p[2] - d2[2] * back + d2[0] * side, p[0], p[1], p[2]);
    }, 100);
  }, { slot, back, up, side });
  await sleep(ms || 3500);
};

/* A camera put low beside the thickest knot of goats on the goat map,
 * looking at them: the goat nearest the most others within 8 metres. */
const goatCam = (dist, up, ms) => async (page) => {
  await page.evaluate(({ dist, up }) => {
    if (window.__c7) clearInterval(window.__c7);
    window.__c7 = setInterval(() => {
      const G = window.__goats && window.__goats();
      if (!G) return;
      const list = G.goats.filter((g) => g.mode !== 'home');
      let best = null; let bn = -1;
      for (const a of list) {
        let n = 0;
        for (const b of list) if (Math.hypot(a.x - b.x, a.y - b.y) < 8) n += 1;
        if (n > bn) { bn = n; best = a; }
      }
      if (!best) return;
      window.__setCam(best.x - dist * 0.7, up, best.y - dist * 0.7, best.x, 0.7, best.y);
    }, 150);
  }, { dist, up });
  await sleep(ms || 3000);
};

/* A camera that rides beside the most sideways of the map's cars or bikes
 * (window.__vehicles), a few metres off and a little above, looking at it. */
const carCam = (dist, up, ms, lap) => async (page) => {
  if (lap) await page.evaluate((t) => window.__lapTo(t), lap);
  await page.evaluate(({ dist, up }) => {
    if (window.__c7) clearInterval(window.__c7);
    let pick = null;
    window.__c7 = setInterval(() => {
      const V = window.__vehicles && window.__vehicles();
      if (!V || !V.length) return;
      if (!pick || !V.find((c) => c.slot === pick.slot)) pick = V.slice().sort((a, b) => Math.abs(b.slip || 0) - Math.abs(a.slip || 0))[0];
      const c = V.find((v) => v.slot === pick.slot) || V[0];
      window.__setCam(c.x + dist * 0.8, (c.y || 0) + up, c.z + dist * 0.6, c.x, (c.y || 0) + 0.8, c.z);
    }, 100);
  }, { dist, up });
  await sleep(ms || 3000);
};
const free = async (page) => {
  await page.evaluate(() => { if (window.__c7) clearInterval(window.__c7); window.__c7 = null; window.__setCam(null); });
};

const world = (key, map, craft, rules, extra) => [key, Object.assign({
  path: `/index.html?map=${map}&craft=${craft}&fly=1`,
  wait: 1500,
  airframe: craft,
  settings: GUIDES,
  storage: { 'webfpv.airhint.v2': '1' },
  prep: boot(map, craft, rules)
}, extra || {})];

const title = ['title', {
  path: '/index.html', wait: 6000, airframe: '5inch', settings: GUIDES, storage: { 'webfpv.airhint.v2': '1' },
  prep: async (page) => {
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000 });
    await sleep(3000);
  }
}];
const pause = (ms) => async (page) => { await sleep(ms); };
const act = (name, ms) => async (page) => {
  await page.evaluate((n) => window.__ui.act(n), name);
  await sleep(ms || 3500);
};

const worlds = Object.fromEntries([
  world('df', 'city', '5inch', { bots: 5, skill: 'pilot', round: '5m', hits: 'arcade' }),
  world('rb', 'city', '5inch', { game: 'ribbon', bots: 5, skill: 'pilot', length: 'normal', round: '5m' }),
  world('goats', 'goats', 'whoop', { game: 'goats', bots: 3, skill: 'ace', round: '5m' }),
  world('drift', 'drift', '5inch', { game: 'drift', bots: 3, skill: 'ace' }),
  world('moto', 'moto', '5inch', { game: 'drift', bots: 3, skill: 'ace' }),
  world('picker', 'city', '5inch', null, { prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000 });
    await page.waitForFunction(() => { const d = document.querySelector('.name-dialog'); return Boolean(d && !d.hidden && document.querySelector('.qp-page')); }, null, { timeout: 120000 });
    await sleep(800);
  } }),
  world('whoopcity', 'city', 'whoop', null),
  title,
  ['phone', { path: '/index.html?map=city&craft=5inch&fly=1', wait: 1500, airframe: '5inch', settings: GUIDES, storage: { 'webfpv.airhint.v2': '1' }, touch: true, viewport: [844, 390], prep: boot('city', '5inch', { bots: 3, skill: 'pilot', round: '5m', hits: 'arcade' }) }]
]);

const QB = (n) => f('chapter-7', 'frames', n);

const jobs = [
  /* the cover */
  ['cover-hero', 'c7-cover', 'hero', 'df', follow(1, 7, 3, 2, 5000), 'A bot in a dogfight over the town.'],
  ['cover-w1', 'c7-cover', 'w1', 'rb', follow(2, 6, 2.5, 2, 5000), 'A bot trailing its ribbon (sim PR 180).'],
  ['cover-w2', 'c7-cover', 'w2', null, QB('quad-ball-goal.png'), 'Quad Ball after a goal (sim PR 184).'],
  ['cover-w3', 'c7-cover', 'w3', 'moto', carCam(9, 3.5, 5000, 52000), 'Ridgeline MX, a bike off a jump (sim PR 185).'],
  /* 1 dogfight */
  ['p1-d', 'c7-p1', 'd', 'df', follow(2, 8, 3.5, -2, 5000), 'A dogfight (sim PR 179).'],
  /* 9 also */
  ['p9-b', 'c7-p9', 'b', null, f('sunnyfield', 'detail', 'back.jpg'), 'Sunnyfield back gardens after the dressing, the lower half of the thread\'s before and after frame (sim PR 177).', { clip: [0, 770, 1280, 678] }],
  ['p9-c', 'c7-p9', 'c', 'drift', async (page) => { await free(page); await page.evaluate(() => window.__filmCut && window.__filmCut()); await sleep(2500); }, 'The take card on Drift Matsuri, its own labels (sim commit 6722107).'],
  ['p9-d', 'c7-p9', 'd', null, f('sunnyfield', 'detail', 'yards.jpg'), 'Sunnyfield yards from above after the dressing, the lower half of the thread\'s before and after frame (sim PR 177).', { clip: [0, 770, 1280, 678] }],
  /* 10 next */
  ['p10-a', 'c7-p10', 'a', 'df', async (page) => { await free(page); await page.evaluate(() => window.__setCam(-45, 22, 55, 0, 6, -10)); await sleep(3500); }, 'The town from above.'],
  ['p1-c', 'c7-p1', 'c', 'phone', pause(2500), 'The phone buttons, GUN and MISSILE (sim commit cb4bacc).', { viewport: [844, 390] }],
  ['p1-b', 'c7-p1', 'b', 'df', async (page) => {
    await free(page);
    await page.evaluate(() => { const g = window.__dogfight(); g.shieldUntil[0] = 0; g.damage(0, 1, 500, 'gun', g.x[0], g.y[0], g.z[0]); });
    await sleep(2500);
  }, 'POP, the pilot hit (sim PR 179).'],
  /* 2 ribbons */
  ['p2-a', 'c7-p2', 'a', 'rb', follow(1, 7, 3, 3, 4500), 'Ribbons streaming (sim PR 180).'],
  ['p2-b', 'c7-p2', 'b', 'rb', follow(4, 9, 5, 0, 4500), 'The ribbon screen from the pilot\'s own view (sim PR 180).'],
  ['p2-c', 'c7-p2', 'c', 'rb', follow(3, 5, 4, -3, 4500), 'Ribbons crossing (sim PR 180).'],
  /* 3 goats and drift */
  ['p3-a', 'c7-p3', 'a', null, f('goat-herding', 'polish', '03-goats-trotting.jpg'), 'Goats trotting, the lower half of the thread\'s before and after frame (sim PR 167, shown with bots from commit 3e2c46c).', { clip: [0, 770, 1280, 678] }],
  ['p3-b', 'c7-p3', 'b', null, f('mini-games', 'shots', 'goats-results.png'), 'The goat round\'s table, GIZMO WINS (sim commit 3e2c46c).'],
  ['p3-c', 'c7-p3', 'c', 'drift', carCam(9, 3, 4000, 30000), 'Drift Matsuri with bots (sim commit e9d5b0c).'],
  ['p3-d', 'c7-p3', 'd', 'title', async (page) => {
    await page.evaluate(() => window.__ui.act('gate-games'));
    await sleep(3500);
    /* Chips that carry a name or a store the book never letters are hidden. */
    await page.evaluate(() => { for (const e of document.querySelectorAll('*')) if (e.children.length === 0 && (/^90%\w*$/i.test((e.textContent || '').trim()) || /steam/i.test((e.textContent || '').trim()))) { const b = e.closest('a, button') || e; b.style.visibility = 'hidden'; } });
    await sleep(300);
  }, 'The Mini games page, cut to its left two columns so one card\'s thumbnail, which carries a name the book never letters, is out of frame.', { clip: [30, 180, 640, 1070] }],
  /* 4 patron goats, Konex */
  ['p4-a', 'c7-p4', 'a', null, f('goat-herding', 'polish', '02-goats-grazing.jpg'), 'Goats grazing, the lower half of the thread\'s before and after frame (sim PR 182).', { clip: [0, 770, 1280, 678] }],
  ['p4-b', 'c7-p4', 'b', null, f('chapter-7', 'frames', 'konex-logo.png'), 'The Konex Drone logo, the file the simulator serves (sim PR 183).'],
  /* 5 quad ball */
  ['p5-a', 'c7-p5', 'a', null, QB('quad-ball-goal.png'), 'Quad Ball after a goal (sim PR 184).'],
  ['p5-b', 'c7-p5', 'b', null, QB('quad-ball-kickoff.png'), 'Quad Ball kickoff (sim PR 184).'],
  ['p5-c', 'c7-p5', 'c', null, QB('quad-ball-goal-end.png'), 'Quad Ball, up the pitch (sim PR 184).'],
  /* 6 ridgeline */
  ['p6-a', 'c7-p6', 'a', null, f('moto-chase', 'pass3', 'a1.png'), 'Ridgeline MX start straight (sim PR 185).'],
  ['p6-b', 'c7-p6', 'b', 'moto', carCam(7, 3, 5000, 35000), 'Ridgeline MX bikes (sim PR 185).'],
  ['p6-c', 'c7-p6', 'c', 'moto', async (page) => { await free(page); await page.evaluate(() => window.__filmCut && window.__filmCut()); await sleep(2500); }, 'The take card (sim commit 6722107).'],
  /* 7 career */
  ['p7-a', 'c7-p7', 'a', 'title', async (page) => { await page.evaluate(() => window.__ui.act('career')); await sleep(3500); await page.keyboard.press('t'); await sleep(3000); }, 'The skill tree (sim PR 171).'],
  ['p7-b', 'c7-p7', 'b', null, f('career-skill-tree', 'build-2', '12-brief-shop-doors.png'), 'A lesson in Thomas More\'s Shop (sim PR 171).'],
  ['p7-c', 'c7-p7', 'c', 'title', async (page) => { await page.evaluate(() => window.__ui.act('career')); await sleep(3500); await page.keyboard.press('p'); await sleep(3000); }, 'The Paint Shop (sim PR 171).'],
  /* 8 picker */
  ['p8-a', 'c7-p8', 'a', 'picker', pause(500), 'The quad picker for the town (sim PR 173, commit 0f57f60).', {
    /* The picker's cards, cut above the line under them that names the tune's
     * firmware, which the book does not letter. */
    clip: (page) => page.evaluate(() => {
      const card = document.querySelector('.qp-page').getBoundingClientRect();
      let cut = card.bottom;
      for (const e of document.querySelectorAll('.qp-page *')) {
        const own = Array.from(e.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' '); if (/tune|betaflight/i.test(own) && e.getBoundingClientRect().height > 0) cut = Math.min(cut, e.getBoundingClientRect().top - 8);
      }
      return [Math.max(0, card.left), Math.max(0, card.top), card.width, Math.max(50, cut - card.top)];
    })
  }],
  ['p8-b', 'c7-p8', 'b', 'whoopcity', async (page) => { await page.evaluate(() => window.__stick(0, 0, 0, 0.55)); await sleep(2500); }, 'A whoop in the town (sim PR 173).']
].map(([id, page, panel, world, how, note, extra]) => Object.assign({ id, page, panel, note }, typeof how === 'string' ? { file: how, world: null } : { world, act: how }, extra || {}));

const missing = jobs.filter((j) => j.file && !fs.existsSync(j.file)).map((j) => j.id);
module.exports = { id: 'c7', missing, worlds, shots: jobs.filter((j) => !j.file || fs.existsSync(j.file)), reuse: [] };
