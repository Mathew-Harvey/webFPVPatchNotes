/*
 * Chapter 11's pictures, Thomas walks the shop: 10 to 17 November 2026.
 *
 * Every picture is a frame the simulator drew, from a checkout at d2a2855
 * (its main on 17 November 2026) served by scripts/serve.js and held in the
 * capture rig (tools/shoot/rig.js) with the real game running. Nothing is
 * painted. Thomas More's Shop is flown on the whoop it is made for, and the
 * camera is put where a panel wants it with the simulator's own camera
 * override (window.__setCam), in the shop's own plan metres turned into the
 * world's by its worldAt, imported in the page. Thomas is held on his own
 * clock and the craft he answers is stood in for, through the two handles
 * his drawing leaves for the simulator's scripts (group.userData.holdMs and
 * craftAt in src/maps/warehouse/thomasdraw.js).
 *
 * The gate with a sponsor's mark is an official five inch track off the
 * public board, copied into tools/shoot/tracks/ as the board served it on
 * 17 November 2026, flown in the world from its own start. Its name is not
 * lettered, and neither is any sponsor's.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const GUIDES = { sound: false, guidedRace: true, guidedWhoop: true, guidedFreestyle: true };
const QUIET = '.bug-chip, .osd-air, .osd-air-hint, .tune-invite, .support-prompt { display: none !important; }';
const SHOP = '/src/maps/warehouse/warehouse.js';
const THOMAS = '/src/maps/warehouse/thomas.js';

/* The shell up and the title page drawn. */
const shell = async (page) => {
  await page.addStyleTag({ content: QUIET });
  await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 600000, polling: 1000 });
  await sleep(2000);
};

/* A page booted into a map and flying it. */
function bootMap(id) {
  return async (page) => {
    await shell(page);
    await page.waitForFunction((id) => { const m = window.__map && window.__map(); return m && m.ready && m.id === id; }, id, { timeout: 600000, polling: 1000 });
    await sleep(3000);
    /* The address no longer flies on its own from the title page: press Fly. */
    await page.evaluate(() => { if (window.__ui.screen !== 'flight') window.__ui.act('fly'); });
    await page.waitForFunction(() => window.__ui.screen === 'flight', null, { timeout: 120000, polling: 500 });
    await sleep(1000);
  };
}

/* Hide whatever the book never letters: the store chip, Patreon and the
 * career's chapter chip. */
const hideChips = async (page) => {
  await page.evaluate(() => {
    for (const e of document.querySelectorAll('*')) {
      if (e.children.length) continue;
      const t = (e.textContent || '').trim();
      if (/steam|wishlist|patreon|paypal|^chapter \d+$/i.test(t)) { const h = e.closest('a, button, .gp-sticker, .gate-card-tag') || e; h.style.visibility = 'hidden'; }
      /* Words on the screen that name an FPV VIP (the goat herding card
       * names the garage after one) are hidden, and nothing else of them. */
      else if (/nick|heads|bardwell/i.test(t) && !e.closest('.wp-card')) e.style.visibility = 'hidden';
    }
    /* No FPV VIP is named in the book: a map card whose name is a person's
     * keeps its picture and loses its name, lettered or typed. */
    for (const c of document.querySelectorAll('.wp-card')) {
      if (/nick|heads|bardwell/i.test(c.textContent || '') || /nick|heads|bardwell/i.test(c.getAttribute('aria-label') || '')) {
        for (const n of c.querySelectorAll('.wp-nm, .wp-name')) n.style.visibility = 'hidden';
      }
    }
  });
};

/* A camera in the shop's plan metres (px, py, h), the menus hidden. */
const plan = (eye, at, ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(async ([m, e, a]) => {
    const W = (await import(m)).worldAt;
    const E = W(...e);
    const A = W(...a);
    window.__setCam(E[0], E[1], E[2], A[0], A[1], A[2]);
  }, [SHOP, eye, at]);
  await sleep(ms || 3000);
};

/*
 * Thomas held at a moment of his own clock (a phase of his walk, `kind`,
 * the `nth` of that kind, `into` ms into it), and the camera put `dist`
 * plan metres off him at `bear` degrees from the way he faces, `up` metres
 * high, looking at his chest. With `shout`, the craft he answers is stood
 * in for at the camera, so he calls out as he would to a whoop that close.
 */
const thomas = ({ kind, nth = 0, into = 1500, dist = 2.2, bear = 0, up = 1.5, look = 1.25, side = 0, shout = false, ms = 2500 }) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(async ([shop, th, o]) => {
    const { FRAME, worldAt } = await import(shop);
    const { THOMAS_PHASES } = await import(th);
    const ph = THOMAS_PHASES.filter((p) => p.kind === o.kind)[o.nth];
    let g = null;
    window.__mapScene().traverse((x) => { if (!g && x.name === 'thomas' && x.isGroup) g = x; });
    if (!g) throw new Error('no Thomas');
    g.userData.craftAt = null;
    g.userData.holdMs = ph.t0 + o.into;
    await new Promise((r) => setTimeout(r, 600));
    let mesh = null;
    g.traverse((x) => { if (!mesh && x.isSkinnedMesh) mesh = x; });
    mesh = mesh || g.children[0];
    const px = (mesh.position.x - FRAME.OX) / FRAME.S;
    const py = (FRAME.OZ - mesh.position.z) / FRAME.S;
    const yaw = mesh.rotation.y + o.bear * Math.PI / 180;
    /* Facing: yaw 0 looks along minus plan y (thomas.js yawOf). */
    const fx = Math.sin(yaw);
    const fy = -Math.cos(yaw);
    const ex = px + fx * o.dist + (-fy) * o.side;
    const ey = py + fy * o.dist + fx * o.side;
    const E = worldAt(ex, ey, o.up);
    const A = worldAt(px, py, o.look);
    window.__setCam(E[0], E[1], E[2], A[0], A[1], A[2]);
    if (o.shout) {
      await new Promise((r) => setTimeout(r, 800));
      const [cx, cy, cz] = worldAt(px + fx * 1.4, py + fy * 1.4, 1.2);
      g.userData.craftAt = { x: cx, y: cy, z: cz };
    }
    window.__thomasAt = [px, py, mesh.rotation.y];
  }, [SHOP, THOMAS, { kind, nth, into, dist, bear, up, look, side, shout }]);
  await sleep(ms);
};

const world = (key, extra) => [key, Object.assign({
  wait: 1500,
  airframe: '5inch',
  settings: Object.assign({ graphics: 'low', realPhysicsTold: true, quadAlways: ALWAYS }, GUIDES),
  storage: { 'webfpv.airhint.v2': '1' }
}, extra)];

/* The quad each map flies, ticked Always, so the Fly is not asked about. */
const ALWAYS = 'city:5inch,goats:whoop65,ekimae:5inch,concert:5inch,warehouse:whoop65';

/* A camera off the craft where it sits on its pad: `back` metres behind
 * it (negative is ahead), `up` high, looking `ahead` metres along its way
 * at `aimUp` high. */
const fromCraft = (back, up, ahead, aimUp) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(([back, up, ahead, aimUp]) => {
    let q = null;
    window.__mapScene().traverse((o) => { if (!q && o.name === 'craft') q = o; });
    const T = window.__three;
    const f = new T.Vector3(0, 0, -1).applyQuaternion(q.quaternion); f.y = 0; f.normalize();
    const p = q.position;
    window.__setCam(p.x - f.x * back, p.y + up, p.z - f.z * back, p.x + f.x * ahead, p.y + aimUp, p.z + f.z * ahead);
  }, [back, up, ahead, aimUp]);
  await sleep(3000);
};

/* Settings, scrolled to one row by its label, the menu's own cursor on it. */
const settingsRow = (label) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__ui.show('pilot'); });
  await sleep(1800);
  const look = (l) => {
    const re = new RegExp('^' + l + '$', 'i');
    const own = (x) => [...x.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    const e = [...document.querySelectorAll('*')].find((x) => re.test(own(x)));
    if (e) e.scrollIntoView({ block: 'center' });
    return Boolean(e);
  };
  if (!(await page.evaluate(look, label))) throw new Error('no Settings row ' + label);
  await sleep(800);
  await page.evaluate((l) => { const re = new RegExp('^' + l + '$', 'i'); const i = window.__ui.items().findIndex((x) => x && re.test(x.label || '')); if (i >= 0) window.__ui.setCursor(i); }, label);
  await sleep(1500);
  await page.evaluate(look, label);
  await sleep(800);
};

/* The pause menu over a flight, its cursor on the row with `action`. */
const pauseOn = (action) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__setCam(); window.__ui.act('pause'); window.__ui.show('paused'); });
  await page.waitForFunction(() => window.__ui.screen === 'paused', null, { timeout: 30000, polling: 300 });
  await sleep(1500);
  await page.evaluate((a) => { const i = window.__ui.items().findIndex((x) => x && x.action === a); if (i >= 0) window.__ui.setCursor(i); }, action);
  await hideChips(page);
  await sleep(1500);
};

/* Where on the racing line the gate frame stands: from, toward, and how
 * far over the line. */
const GATE_CAM = (process.env.GATE_CAM || '0.012,0.03,0.5').split(',').map(Number);

/* The track off the board, as it served it, under no name of its own. */
const GATE_TRACK = (() => {
  const file = path.join(__dirname, 'tracks', 'trk-e9486d86.json');
  if (!fs.existsSync(file)) return null;
  const d = JSON.parse(fs.readFileSync(file, 'utf8'));
  d.name = 'Practice course';
  const out = path.join(require('os').tmpdir(), 'c11-practice-course.json');
  fs.writeFileSync(out, JSON.stringify(d));
  return out;
})();

const worlds = Object.fromEntries([
  world('shop', { path: '/index.html?map=warehouse&craft=whoop65&fly=1', airframe: 'whoop65', prep: bootMap('warehouse') }),
  world('goats', { path: '/index.html?map=goats&craft=whoop65&fly=1', airframe: 'whoop65', prep: bootMap('goats') }),
  world('ekimae', { path: '/index.html?map=ekimae&craft=5inch&fly=1', prep: bootMap('ekimae') }),
  world('town', { path: '/index.html?map=city&craft=5inch&fly=1', prep: bootMap('city') }),
  world('high', { path: '/index.html?map=concert&craft=5inch&fly=1', settings: Object.assign({ graphics: 'high', realPhysicsTold: true, quadAlways: ALWAYS }, GUIDES), prep: bootMap('concert') }),
  world('title', { path: '/index.html', wait: 6000, prep: async (page) => {
    await shell(page);
    await page.waitForFunction(() => window.__ui.screen === 'title' && window.__ui.onGate(), null, { timeout: 120000, polling: 500 });
    await hideChips(page);
    await sleep(1500);
  } }),
  /* A pilot who has flown before, on the five inch, not yet told: the
   * explainer is what the first Fly meets (tellRealPhysics in src/ui/ui.js). */
  world('told', { path: '/index.html', wait: 6000, settings: Object.assign({ graphics: 'low', realPhysicsTold: false }, GUIDES), prep: async (page) => {
    await shell(page);
    await page.waitForFunction(() => window.__ui.screen === 'title', null, { timeout: 120000, polling: 500 });
    await sleep(1500);
  } }),
  world('gates', { path: '/index.html?map=custom&craft=5inch&fly=1', track: GATE_TRACK, prep: async (page) => {
    await shell(page);
    await page.waitForFunction(() => { const m = window.__map && window.__map(); return m && m.ready && m.gates > 0; }, null, { timeout: 600000, polling: 1000 });
    await sleep(3000);
    await page.evaluate(() => { if (window.__ui.screen !== 'flight') window.__ui.act('fly'); });
    await page.waitForFunction(() => window.__ui.screen === 'flight', null, { timeout: 120000, polling: 500 });
    await sleep(1500);
  } }),
]);

const jobs = [
  /* Thomas More's Shop. */
  ['cover-hero', 'c11-cover', 'hero', 'shop', thomas({ kind: 'stand', nth: 1, into: 3000, dist: 2.3, bear: -30, up: 1.25, look: 1.5 }), 'Thomas at one of his stops, turned to the camera (sim 6d71b8b).'],
  ['p3-a', 'c11-p3', 'a', 'shop', thomas({ kind: 'stand', nth: 0, into: 2500, dist: 2.4, bear: -15, up: 1.5, look: 1.45, shout: true, ms: 900 }), 'Thomas calling out to a whoop that has come close; the craft he answers is stood in for at the camera (sim 6d71b8b).', { settle: 200 }],
  ['p3-b', 'c11-p3', 'b', 'shop', thomas({ kind: 'walk', nth: 1, into: 1800, dist: 3.6, bear: 80, up: 1.6, look: 1.0 }), 'Thomas on a walk between his stops at the south end of the workshop (sim 6d71b8b).'],
  ['p2-a', 'c11-p2', 'a', 'shop', plan([8.3, 12.45, 3.05], [11.5, 12.15, 3.0]), 'The two rows of tubes over the barani doorway, from the crate aisle (sim dde9b91).'],
  ['p2-b', 'c11-p2', 'b', 'shop', plan([16.2, 6.0, 1.35], [30.0, 6.0, 1.2]), 'The office area\'s corridor, looking east (sim 578bb14).'],
  ['p2-c', 'c11-p2', 'c', 'shop', plan([20.4, 10.75, 1.9], [27.0, 10.75, 1.3]), 'The dive slot behind the teal racking (sim dde9b91).'],
  ['p9-a', 'c11-p9', 'a', 'shop', plan([24.5, 13.0, 4.6], [24.0, 24.0, 1.0]), 'The workshop floor from over the start, looking north (sim 2cae556).'],
  /* Settings and the explainer. */
  ['p1-a', 'c11-p1', 'a', 'title', settingsRow('Realistic physics'), 'The Settings row Realistic physics on the five inch (sim 971e369, d6da8d6).', { viewport: [1280, 560] }],
  ['cover-w1', 'c11-cover', 'w1', 'title', settingsRow('Realistic physics'), 'The Settings row Realistic physics, cut to the row (sim 971e369).', { viewport: [1280, 720] }],
  ['p1-b', 'c11-p1', 'b', 'told', async (page) => {
    await page.evaluate(() => { const u = window.__ui; u.act('gate-solo'); u.act('way-race-5inch'); });
    await page.waitForFunction(() => { const u = window.__ui; return u.screen === 'courses' && Boolean(u.pickerLib) && u.pickerEntries().some((e) => e.item && e.item.action === 'map:custom'); }, null, { timeout: 60000, polling: 500 });
    await sleep(1500);
    await page.evaluate(() => { const u = window.__ui; u.pickerAction('fly', u.pickerEntries().find((e) => e.item && e.item.action === 'map:custom')); });
    await page.waitForFunction(() => /Realistic physics is on/.test(document.body.innerText), null, { timeout: 60000, polling: 300 });
    await hideChips(page);
    await sleep(1500);
  }, 'The card in front of the first Fly on a five inch with Realistic physics on, cut to the card (sim d6da8d6).', { viewport: [960, 700], clip: (page) => page.evaluate(() => {
    const e = [...document.querySelectorAll('.name-dialog-box')].find((x) => /Realistic physics is on/.test(x.textContent)); const r = e.getBoundingClientRect(); const p = 40;
    return [Math.max(0, r.x - p), Math.max(0, r.y - p), Math.min(innerWidth, r.width + 2 * p), Math.min(innerHeight, r.height + 2 * p)];
  }) }],
  /* The menus. */
  ['p5-a', 'c11-p5', 'a', 'title', async (page) => {
    await page.evaluate(() => { const u = window.__ui; u.show('title'); u.turnGate('mpway'); });
    await page.waitForFunction(() => window.__ui.gatePageNow() === 'mpway', null, { timeout: 30000, polling: 300 });
    await hideChips(page);
    await sleep(2500);
  }, 'Multiplayer\'s first page: what to fly together (sim 27a7aad).', { viewport: [1280, 720] }],
  ['p5-b', 'c11-p5', 'b', 'title', async (page) => {
    await page.evaluate(() => { const u = window.__ui; u.show('title'); u.turnGate('cover'); });
    await page.waitForFunction(() => window.__ui.gatePageNow() === 'cover', null, { timeout: 30000, polling: 300 });
    await hideChips(page);
    await sleep(2500);
  }, 'The drawn cover with Fly solo, Multiplayer and Mini games (sim 6f4d68b).', { viewport: [1280, 720] , focus: [0.95, 0.5] }],
  ['p4-b', 'c11-p4', 'b', 'title', async (page) => {
    await page.evaluate(() => { const u = window.__ui; u.show('title'); u.turnGate('cover'); u.act('gate-solo'); u.act('way-freestyle-5inch'); });
    await page.waitForFunction(() => window.__ui.screen === 'freestyle' && Boolean(document.querySelector('.wp-quad')), null, { timeout: 60000, polling: 500 });
    await hideChips(page);
    await sleep(3000);
  }, 'The freestyle picker, the chosen map\'s caption led by its quad and Change (sim 27a7aad).', { viewport: [1280, 720] }],
  ['p4-a', 'c11-p4', 'a', 'town', pauseOn('quad-swap'), 'The town\'s pause with the Quad row as pictures (sim 99e053f, 3457bd1).', { viewport: [1280, 720] }],
  ['cover-w2', 'c11-cover', 'w2', 'town', pauseOn('quad-swap'), 'The Quad row, cut to the row (sim 99e053f).', { viewport: [1280, 720] }],
  ['p5-c', 'c11-p5', 'c', 'town', pauseOn('freestyle'), 'The town\'s pause with Change map (sim b1f0c9a).', { viewport: [1280, 720] }],
  /* Goat herding. */
  ['p6-a', 'c11-p6', 'a', 'goats', async (page) => {
    /* Out in the street, so the card has a way and a distance to give:
     * the craft is put there by the simulator's own harness
     * (window.__placeCraft), `k[0]` metres from where it started in the
     * garage at `k[1]` degrees, and the camera rides `k[3]` behind it and
     * `k[4]` over it, looking back toward the garage. The HUD is the
     * flight's own. */
    await page.evaluate((k) => {
      let q = null;
      window.__mapScene().traverse((o) => { if (!q && o.name === 'craft') q = o; });
      const p = q.position.clone();
      const a = k[1] * Math.PI / 180; const dx = Math.cos(a); const dz = Math.sin(a);
      window.__placeCraft(p.x + dx * k[0], p.y + k[2], p.z + dz * k[0]);
      window.__goatCam = [p.x + dx * (k[0] + k[3]), p.y + k[2] + k[4], p.z + dz * (k[0] + k[3]), p.x, p.y + 0.5, p.z];
    }, (process.env.GOAT_AT || '30,90,1.2,4,1.5').split(',').map(Number));
    await sleep(1500);
    await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__setCam(...window.__goatCam); });
    await hideChips(page);
    await sleep(2500);
    await hideChips(page);
  }, 'Goat herding in flight, out of the garage, with the arrow card under the score; the card\'s line and the coach line name the garage after an FPV VIP and are hidden (sim dd6bfb7).', { viewport: [1280, 720], settle: 300 , focus: [0, 0.5] }],
  ['cover-w3', 'c11-cover', 'w3', 'goats', async (page) => { await hideChips(page); await sleep(300); }, 'The goat herding score and card, cut to them (sim dd6bfb7).', { viewport: [1280, 720], settle: 300, clip: (page) => page.evaluate(() => {
    const a = document.querySelector('.goat-aim').getBoundingClientRect(); const p = 24;
    return [0, Math.max(0, a.y - 190), Math.min(innerWidth, a.right + p), a.height + 190 + p];
  }) }],
  /* Gates, the look, Ekimae. */
  ['p7-a', 'c11-p7', 'a', 'gates', async (page) => {
    await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
    await page.evaluate(([a, b, up]) => {
      const p = window.__trackPoint(a); const q = window.__trackPoint(b);
      window.__setCam(p.x, p.y + up, p.z, q.x, q.y + up * 0.6, q.z);
    }, GATE_CAM);
    await sleep(3000);
  }, 'Five inch gates in the world, a sponsor\'s mark on each approach face, the camera over the racing line just after the start (sim ae0b538). The track is an official one off the public board, renamed.', { viewport: [1280, 900] }],
  ['p7-b', 'c11-p7', 'b', 'high', fromCraft(-3, 2.5, 30, 3), 'Hanabi Sound at dusk on the High preset (sim cbeef2c, ebec766, 340d897).'],
  ['p8-b', 'c11-p8', 'b', 'ekimae', async (page) => {
    await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
    await page.evaluate(async (o) => {
      const { ekimaeLayout } = await import('/src/maps/ekimae/plan.js');
      const B = ekimaeLayout().parts.filter((p) => p.name === 'barrier' && p.a[1] === 0);
      const b = B[o[0]];
      const mx = (b.a[0] + b.b[0]) / 2; const mz = (b.a[2] + b.b[2]) / 2;
      let dx = b.b[0] - b.a[0]; let dz = b.b[2] - b.a[2]; const n = Math.hypot(dx, dz); dx /= n; dz /= n;
      const px = -dz * o[1]; const pz = dx * o[1];
      window.__setCam(mx + px * o[2] - dx * o[3], o[4], mz + pz * o[2] - dz * o[3], mx + dx * 3, 0.4, mz + dz * 3);
    }, (process.env.BARRIER_CAM || '300,1,2.5,5,1.3').split(',').map(Number));
    await sleep(3000);
  }, 'Ekimae\'s barriers on the ground (sim a562bb6).']
].map(([id, page, panel, w, how, note, extra]) => Object.assign({ id, page, panel, note }, typeof how === 'string' ? { file: how, world: null } : { world: w, act: how }, extra || {}));

const missing = jobs.filter((j) => j.file && !fs.existsSync(j.file)).map((j) => j.id);
module.exports = { id: 'c11', missing, worlds, shots: jobs.filter((j) => !j.file || fs.existsSync(j.file)), reuse: [] };
