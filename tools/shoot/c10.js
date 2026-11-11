/*
 * Chapter 10's pictures, Infected: 6 to 10 November 2026.
 *
 * Every picture is a frame the simulator drew, from a checkout at 62b0df7
 * (its main on 10 November 2026) served by scripts/serve.js and held in the
 * capture rig (tools/shoot/rig.js) with the real game running. Nothing is
 * painted. The school is flown on the whoop it is made for; the Infected
 * round is the real round with bots in a mix of skills, put at each moment
 * by the round's own methods (a tag, the sniff, the last one), the way the
 * simulator's own check (scripts/infected-check.js) puts it. The camera is
 * put where a panel wants it with the simulator's own camera override
 * (window.__setCam), in the school's own plan metres turned into the
 * world's by its worldAt, imported in the page.
 *
 * The track builder frames open a copy of a chapter track (copied into
 * tools/shoot/tracks/) under a plain name, since the chapter tracks' names
 * are not lettered.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const path = require('path');
const fs = require('fs');
const os = require('os');

const PF = process.env.PROJECT_FILES || '/mnt/project-files';
const f = (...p) => path.join(PF, ...p);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const GUIDES = { sound: false, guidedRace: true, guidedWhoop: true, guidedFreestyle: true };
const QUIET = '.bug-chip, .osd-air, .osd-air-hint, .tune-invite, .support-prompt { display: none !important; }';
const SCHOOL = '/src/maps/school/school.js';
const G = 'const g = window.__dogfight();';

/* A page booted into the school, on the whoop, and waited for. */
function bootSchool() {
  return async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 600000, polling: 1000 });
    await page.waitForFunction(() => { const m = window.__map && window.__map(); return m && m.ready && m.id === 'school'; }, null, { timeout: 600000, polling: 1000 });
    await sleep(3000);
    await page.waitForFunction(() => window.__ui.screen === 'flight', null, { timeout: 60000, polling: 500 });
    await sleep(1000);
  };
}

/* A camera in the school's plan metres (px, py, h), the menus hidden. */
const plan = (eye, at, ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await page.evaluate(async ([m, e, a]) => {
    const W = (await import(m)).worldAt;
    const E = W(...e);
    const A = W(...a);
    window.__setCam(E[0], E[1], E[2], A[0], A[1], A[2]);
  }, [SCHOOL, eye, at]);
  await sleep(ms || 3000);
};

/* A camera a little behind and over bot `i` (an expression), looking along its way. */
const behind = (i, back, up, ms) => async (page) => {
  await page.evaluate(`(() => { ${G} const k = g.k; const i = ${i};
    const fx = g.fx[i], fz = g.fz[i]; const n = Math.hypot(fx, fz) || 1;
    window.__setCam(g.x[i] - fx / n * ${back} * k, g.y[i] + ${up} * k, g.z[i] - fz / n * ${back} * k, g.x[i] + fx / n * 2 * k, g.y[i], g.z[i] + fz / n * 2 * k); return 1; })()`);
  await sleep(ms || 1500);
};


/* A camera that rides a little behind and over bot `i` every frame, along
 * the way it is going, so a slow frame still finds it in the picture. */
const ride = (i, back, up) => async (page) => {
  await page.evaluate(([expr, back, up]) => {
    window.__rideStop = false;
    const step = () => {
      if (window.__rideStop) return;
      const g = window.__dogfight();
      if (g) {
        const i = typeof expr === 'string' ? Function('g', 'return ' + expr)(g) : expr;
        const k = g.k; const fx = g.fx[i]; const fz = g.fz[i]; const n = Math.hypot(fx, fz) || 1;
        window.__setCam(g.x[i] - fx / n * back * k, g.y[i] + up * k, g.z[i] - fz / n * back * k, g.x[i] + fx / n * 2 * k, g.y[i], g.z[i] + fz / n * 2 * k);
      }
      requestAnimationFrame(step);
    };
    step();
  }, [i, back, up]);
};

/* The round's HUD up, the camera the pilot's own. */
const hudView = (ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__setCam(); });
  await sleep(ms || 1500);
};

/* The pilot takes off, which starts the head start, and the HUD calls RUN!. */
const takeoff = (ms) => async (page) => {
  await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__setCam(); window.__stick(0, 0, 0, 0.62); });
  await page.waitForFunction(() => { const g = window.__dogfight(); return g.startedMs >= 0; }, null, { timeout: 180000, polling: 500 });
  await sleep(ms || 800);
  await page.evaluate(() => window.__stick(0, 0, 0, 0.0));
};

/* The first infected let out, and the hunt a few seconds old. */
const hunting = async (page) => {
  await page.waitForFunction(() => window.__dogfight().hunting, null, { timeout: 300000, polling: 500 });
  await page.waitForFunction(() => { const g = window.__dogfight(); return g.clockMs - g.huntAt > 3000; }, null, { timeout: 300000, polling: 500 });
};

/* Everybody but one tagged: the last clean pilot is gold. */
const lastOne = async (page) => {
  await page.evaluate(`(() => { ${G} if (!g.inf[0]) g.tag(g.pz, 0, g.clockMs); let left = 0; for (let i = 1; i < 10; i += 1) { if (!g.inf[i]) left = i; }
    for (let i = 1; i < 10; i += 1) { if (!g.inf[i] && i !== left) g.tag(0, i, g.clockMs); } window.__goldBot = left; return 1; })()`);
  await sleep(800);
};

/* The round paused with two bots put in the hallway, one clean at the eye
 * and one infected behind it, as the simulator's own check stages its
 * Mini games card art (scripts/infected-check.js); gold when the last one is
 * clean. Positions are the school's plan metres. */
const stage = (px, py, h, spread, gold) => async (page) => {
  await page.evaluate(() => { window.__ui.act('pause'); });
  await sleep(800);
  await page.evaluate(([px, py, h, gold]) => { const g = window.__dogfight(); const P = g.plan;
    let c = gold ? window.__goldBot : -1; let fi = -1;
    for (let i = 1; i < g.cap; i += 1) { if (!g.inFight[i]) continue; if (i === c) continue; if (g.inf[i] || i === g.pz) { if (fi < 0) fi = i; } else if (c < 0) c = i; }
    if (fi < 0) { for (let i = 1; i < g.cap; i += 1) { if (g.inFight[i] && i !== c) { fi = i; break; } } }
    g.inf[fi] = 1;
    const put = (i, x, y, hh, fz, ux, uz) => { const [wx, wy, wz] = P.worldAt(x, y, hh);
      g.x[i] = wx; g.y[i] = wy; g.z[i] = wz; g.xPrev[i] = wx; g.yPrev[i] = wy; g.zPrev[i] = wz;
      g.fx[i] = 1; g.fy[i] = 0; g.fz[i] = fz; g.fxPrev[i] = 1; g.fyPrev[i] = 0; g.fzPrev[i] = fz;
      g.ux[i] = ux; g.uy[i] = 0.95; g.uz[i] = uz; g.uxPrev[i] = ux; g.uyPrev[i] = 0.95; g.uzPrev[i] = uz; };
    for (let i = 1; i < g.cap; i += 1) { if (g.inFight[i] && i !== c && i !== fi) put(i, 2, 2, -3, 0, 0, 0); }
    put(c, px, py, h, 0.15, 0.3, 0.15); put(fi, px - 0.29, py + 0.18, h + 0.16, 0.1, -0.3, 0.1);
    const [ex, ey, ez] = P.worldAt(px + 0.33, py + 0.1, h + 0.1); const [lx, ly, lz] = P.worldAt(px - 4.3, py + 0.03, h + 0.02);
    window.__setCam(ex, ey, ez, lx, ly, lz); }, [px, py, h, gold]);
  await page.evaluate(() => { window.__ui.root.style.visibility = 'hidden'; });
  await sleep(2500);
};

const world = (key, extra) => [key, Object.assign({
  wait: 1500,
  airframe: 'whoop65',
  settings: Object.assign({ graphics: 'low' }, GUIDES),
  storage: { 'webfpv.airhint.v2': '1' }
}, extra)];

/* A chapter track under a plain name, since the chapter tracks' names are
 * not lettered. */
const FLAGS_TRACK = (() => {
  const d = JSON.parse(fs.readFileSync(path.join(__dirname, 'tracks', 'trk-00a85dee.json'), 'utf8'));
  d.name = 'Practice course';
  const file = path.join(os.tmpdir(), 'c10-practice-course.json');
  fs.writeFileSync(file, JSON.stringify(d));
  return file;
})();

/* The builder, a card open for the first element of a kind. */
const card = (type, ms) => async (page) => {
  await page.evaluate(() => window.trackBuilder.setSelection([]));
  await sleep(1200);
  await page.evaluate((t) => { const e = window.trackBuilder.doc.elements.find((x) => x.type === t); window.trackBuilder.setSelection([e.id]); }, type);
  await sleep(ms || 2500);
};
/* The box of a page element by selector, for a clip. */
const boxOf = (sel, pad = 8) => async (page) => page.evaluate(([sel, pad]) => {
  const e = document.querySelector(sel); const r = e.getBoundingClientRect();
  const x = Math.max(0, r.x - pad); const y = Math.max(0, r.y - pad);
  return [x, y, Math.min(innerWidth - x, r.width + 2 * pad), Math.min(innerHeight - y, r.height + 2 * pad)];
}, [sel, pad]);

/* The simulator's own results page, drawn by its own showResults from a lap
 * log of the kind its own check (scripts/features-check.js) feeds it: two
 * laps with their gate splits and a missed gate. The names on the board
 * rows are made up for the picture. */
const RESULTS = (rivals) => async (page) => {
  await page.evaluate((rivals) => {
    const sp = (a) => { let t = 0; return a.map((x) => (t += x)); };
    const log = [
      { n: 1, ms: 15230, splits: sp([2100, 2600, 3100, 2900, 2230, 2300]) },
      { n: 2, ms: 14800, splits: sp([2000, 2700, 2900, 2800, 2200, 2200]) },
      { n: 3, ms: null, reason: 'Missed gate 4' }
    ];
    const ui = window.__ui;
    ui.settings.feelAsked = true; ui.firstRun = false;
    ui.share = { id: 'trk-demoA', name: 'Practice course', author: 'WebFPV' };
    ui.boardCourses = [{ id: 'trk-demoA', name: 'Practice course', trackClass: 'full' }, { id: 'trk-demoB', name: 'Kingston Loop', author: 'WebFPV', trackClass: 'full' }];
    ui.standingsFor = { id: 'trk-demoA' };
    ui.standingsTimes = [{ lapMs: 13000, threeMs: 40000 }, { lapMs: 14000, threeMs: 42000 }, { lapMs: 14500, threeMs: 43000 }, { lapMs: 15500, threeMs: 47000 }];
    if (rivals) ui.boardGhostTimes = [{ id: 'tm-a', name: 'Koi', lapMs: 12000, hasGhost: true }, { id: 'tm-b', name: 'Momo', lapMs: 14400, hasGhost: true }];
    ui.osdMode = 'race';
    ui.showResults(log, 14100, 14100, null, { threeMs: null, trackClass: 'full' });
  }, rivals);
  await page.waitForFunction(() => window.__ui.screen === 'results', null, { timeout: 30000, polling: 300 });
  await sleep(2500);
};

/* The career to its first lesson's briefing. */
const toBriefing = async (page) => {
  await page.evaluate(() => window.__ui.turnGate('solo'));
  await sleep(1500);
  await page.evaluate(() => window.__ui.act('career'));
  await page.waitForFunction(() => Boolean(document.querySelector('#career .cr-cover')), null, { timeout: 120000, polling: 500 });
  await sleep(2500);
  await page.evaluate(() => { const b = document.querySelector('#career .cr-continue .cr-btn'); if (b) b.click(); });
  await page.waitForFunction(() => { const b = document.querySelector('#career .cr-brief .cr-btn.primary'); return b && !b.disabled; }, null, { timeout: 180000, polling: 500 });
  await sleep(1500);
};
const intoLesson = async (page) => {
  await page.evaluate(() => document.querySelector('#career .cr-brief .cr-btn.primary').click());
  await page.waitForFunction(() => window.__ui.screen === 'flight' && Boolean(document.querySelector('#career .cr-hud')), null, { timeout: 180000, polling: 500 });
  await sleep(3500);
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
  await page.evaluate(look, label);
  await page.evaluate((l) => { const re = new RegExp('^' + l + '$', 'i'); const i = window.__ui.items().findIndex((x) => x && re.test(x.label || '')); if (i >= 0) window.__ui.setCursor(i); }, label);
  await sleep(1500);
  await page.evaluate(look, label);
  await sleep(800);
};

const worlds = Object.fromEntries([
  world('school', { path: '/index.html?map=school&craft=whoop65&fly=1', prep: bootSchool() }),
  world('pad', { path: '/index.html?map=school&craft=whoop65&fly=1', prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 600000, polling: 1000 });
    await page.waitForFunction(() => { const m = window.__map && window.__map(); return m && m.ready && m.id === 'school'; }, null, { timeout: 600000, polling: 1000 });
    await sleep(2500);
  } }),
  world('builder', { path: '/src/trackbuilder/index.html?class=full', track: FLAGS_TRACK, wait: 3000, settings: {}, airframe: '5inch', storage: {}, prep: async (page) => {
    await page.waitForFunction(() => Boolean(window.trackBuilder && window.trackBuilder.doc), null, { timeout: 120000, polling: 500 });
    await page.waitForFunction(() => window.trackBuilder.mode === '3d' && Boolean(window.trackBuilder.view3d && window.trackBuilder.view3d.renderer), null, { timeout: 120000, polling: 500 }).catch(() => {});
    await sleep(6000);
    /* The Patreon chip is never lettered in the book. */
    await page.evaluate(() => { for (const e of document.querySelectorAll('a, button')) if (/patreon/i.test(e.textContent || '')) e.style.visibility = 'hidden'; });
  } }),
  world('results', { path: '/index.html', wait: 6000, prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 1000 });
    await sleep(2000);
  } }),
  world('resultsPhone', { path: '/index.html', touch: true, wait: 6000, prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 1000 });
    await sleep(2000);
  } }),
  world('career', { path: '/index.html', wait: 6000, prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 1000 });
    await sleep(2000);
  } }),
  world('careerPhone', { path: '/index.html', touch: true, wait: 6000, prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 1000 });
    await sleep(2000);
  } }),
  world('chooser', { path: '/src/trackbuilder/index.html', wait: 3000, settings: {}, airframe: '5inch', storage: {}, prep: async (page) => {
    await page.waitForSelector('.tb-chooser', { timeout: 120000 });
    await sleep(3000);
    await page.evaluate(() => { for (const e of document.querySelectorAll('a, button')) if (/patreon/i.test(e.textContent || '')) e.style.visibility = 'hidden'; });
  } }),
  world('fps', { path: '/index.html?map=school&craft=whoop65&fly=1', settings: Object.assign({ graphics: 'low', showFps: true }, GUIDES), prep: bootSchool() }),
  world('mp', { path: '/index.html?mp=1', wait: 6000, prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 1000 });
    await page.waitForFunction(() => window.__ui.screen === 'title' && window.__ui.onGate(), null, { timeout: 120000, polling: 500 });
    await sleep(1500);
  } }),
  world('title', { path: '/index.html', wait: 6000, prep: async (page) => {
    await page.addStyleTag({ content: QUIET });
    await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 300000, polling: 1000 });
    await sleep(2000);
  } }),
  world('round2', {
    path: '/index.html?map=school&craft=whoop65&fly=1',
    prep: async (page) => {
      await bootSchool()(page);
      await page.evaluate(() => {
        window.__ui.dogfight = { game: 'infected', bots: 9, skills: ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard'], round: '2m', head: 5, first: 'bot' };
      });
      await page.waitForFunction(() => { const g = window.__dogfight && window.__dogfight(); return Boolean(g && g.infRules); }, null, { timeout: 120000, polling: 500 });
      await sleep(2500);
    }
  }),
  world('round', {
    path: '/index.html?map=school&craft=whoop65&fly=1',
    prep: async (page) => {
      await bootSchool()(page);
      /* The real round, ten pilots: the pilot and nine bots in a mix of skills. */
      await page.evaluate(() => {
        window.__ui.dogfight = { game: 'infected', bots: 9, skills: ['easy', 'easy', 'easy', 'medium', 'medium', 'medium', 'hard', 'hard', 'hard'], round: '2m', head: 5, first: 'bot' };
      });
      await page.waitForFunction(() => { const g = window.__dogfight && window.__dogfight(); return Boolean(g && g.infRules); }, null, { timeout: 120000, polling: 500 });
      await sleep(2500);
    }
  })
]);

const jobs = [
  ['p1-a', 'c10-p1', 'a', 'school', plan([2.6, 8.7, 1.25], [30, 8.7, 1.0]), 'The ground floor hallway from its west end (sim a1f1a8d).'],
  ['p1-b', 'c10-p1', 'b', 'school', plan([13.0, 6.4, 1.4], [16.0, 3.8, 0.9]), 'The science lab and its glass tank (sim a1f1a8d).'],
  ['p1-c', 'c10-p1', 'c', 'school', plan([20.55, 2.0, 1.15], [20.55, 0.3, 1.1]), 'The book lift in the lab corner (sim a1f1a8d).'],
  ['p2-b', 'c10-p2', 'b', 'round', plan([15.2, 4.5, 0.5], [16.0, 4.5, 0.3], 2500), 'The first infected pilot waiting in the glass tank (sim fa9331d).'],
  ['p2-a', 'c10-p2', 'a', 'round', takeoff(100), 'The HUD calling RUN! as the pilot takes off (sim e16ac70).', { settle: 50 }],
  ['cover-hero', 'c10-cover', 'hero', 'round2', async (page) => {
    await stage(24.27, 8.82, 1.08, [-0.4, 0, 0.3], false)(page);
  }, 'A clean pilot flying at the eye with a green one behind it, the round paused to hold them there (sim e16ac70).'],
  ['p2-c', 'c10-p2', 'c', 'round', async (page) => {
    await hunting(page);
    await page.evaluate(() => { window.__ui.root.style.visibility = ''; });
    await lastOne(page);
    await page.waitForFunction(() => { const g = window.__dogfight(); return g.phase === 'last' && g.gold === window.__goldBot; }, null, { timeout: 60000, polling: 300 });
    await ride('window.__goldBot', 1.2, 0.3)(page);
    await sleep(3000);
  }, 'The last clean pilot in gold, ridden from behind with the HUD up (sim e16ac70).', { settle: 800 }],
  ['p3-a', 'c10-p3', 'a', 'round', async (page) => {
    await page.evaluate(() => { window.__stop && 0; window.__rideStop = true; window.__setCam(); window.__ui.root.style.visibility = ''; });
    await page.evaluate(`(() => { ${G} g.tag(0, g.gold, g.clockMs); return 1; })()`);
    await page.waitForFunction(() => { const r = document.querySelector('.if-hud .df-result'); return Boolean(r) && !r.classList.contains('is-off'); }, null, { timeout: 60000, polling: 300 });
    await sleep(500);
    await page.evaluate(() => window.__ui.act('fight-change'));
    await page.waitForFunction(() => Boolean(document.querySelector('.if-wait')), null, { timeout: 60000, polling: 300 });
    await sleep(1500);
  }, 'The Infected waiting room, bots seated at their skills (sim e16ac70).', { settle: 800 }],
  ['p3-b', 'c10-p3', 'b', 'title', async (page) => {
    await page.evaluate(() => { const u = window.__ui; u.mode = null; u.craftGate = true; u.gatePage = 'games'; u.gameReturn = false; u.show('title'); u.renderMenu(); });
    await page.waitForFunction(() => { const e = document.querySelector('.gate-card-mg-infected'); if (!e) return false; const r = e.getBoundingClientRect(); return r.width > 120 && r.height > 30; }, null, { timeout: 60000, polling: 300 });
    /* The store chip, Patreon, the career's chapter chip and the Goat
     * Herding card's sticker are never lettered in the book. */
    await page.evaluate(() => {
      for (const e of document.querySelectorAll('*')) {
        if (e.children.length) continue;
        const t = (e.textContent || '').trim();
        if (/steam|patreon|^chapter \d+$|90%\s*er/i.test(t)) { const h = e.closest('a, button, .gp-sticker, .gate-card-tag') || e; h.style.visibility = 'hidden'; }
      }
    });
    await sleep(2500);
  }, 'The Mini games page with the Infected card (sim e16ac70).', { settle: 800 }],
  ['p3-c', 'c10-p3', 'c', 'round2', async (page) => {
    await stage(15.0, 8.7, 4.35, [-0.4, 0, 0.3], false)(page);
  }, 'A clean pilot flying away with a green one close behind in the upstairs hallway, the round paused to hold them there (sim c78208f: the bots chase and flee).'],
  ['cover-w1', 'c10-cover', 'w1', 'school', plan([3.0, 8.7, 4.5], [30, 8.7, 4.2]), 'The first floor hallway (sim a1f1a8d).'],
  ['p4-a', 'c10-p4', 'a', 'mp', async (page) => {
    await page.evaluate(() => window.__ui.act('gate-together'));
    await sleep(1500);
    await page.evaluate(() => window.__ui.act('mp-host'));
    await page.waitForFunction(() => Boolean(document.querySelector('#tg-handle')), null, { timeout: 60000, polling: 300 });
    await sleep(2000);
  }, 'The pilot card that meets a pilot before hosting, with its name field (sim a6bc93e).', { viewport: [960, 760] }],
  ['p5-a', 'c10-p5', 'a', 'builder', card('flag'), 'The builder with a flag selected, its card showing Round it, How far and How (sim 8b52bc6).', { viewport: [1180, 840] }],
  ['cover-w3', 'c10-cover', 'w3', 'builder', card('flag'), 'The flag\'s card (sim 8b52bc6).', { viewport: [1280, 800], clip: [772, 140, 300, 620] }],
  ['p5-b', 'c10-p5', 'b', 'builder', card('flaggedGate'), 'A flagged gate\'s card, with Round the flag and the Flag mast field (sim b72ee98, 8b52bc6).', { viewport: [1280, 1040], clip: [565, 160, 290, 755] }],
  ['p5-c', 'c10-p5', 'c', 'builder', async (page) => {
    await page.evaluate(() => { window.trackBuilder.setSelection([]); window.trackBuilder.exportAnimation(); });
    await page.waitForSelector('#tb-animation-view', { timeout: 30000 });
    await sleep(1500);
  }, 'The animation export dialog with its View row (sim b72ee98).', { viewport: [1280, 800], clip: [330, 190, 630, 420] }],
  ['p7-a', 'c10-p7', 'a', 'results', RESULTS(false), 'The results page on paper with its stamp and gate strip (sim 0fbcace). The lap log is the simulator\'s own check\'s, fed to its own page.', { viewport: [1280, 900] }],
  ['p7-c', 'c10-p7', 'c', 'results', RESULTS(true), 'The results page\'s rows with the Chase row (sim 5d5d081). The rival names are made up for the picture.', { viewport: [640, 860] }],
  ['p7-b', 'c10-p7', 'b', 'resultsPhone', RESULTS(false), 'The results page on a phone (sim 0fbcace).', { viewport: [390, 844] }],
  ['p8-a', 'c10-p8', 'a', 'career', async (page) => { await toBriefing(page); await intoLesson(page); }, 'A first lesson in flight with the plainer display (sim 76a6b4f).', { viewport: [1280, 720], settle: 800 }],
  ['p8-b', 'c10-p8', 'b', 'career', async () => { await sleep(300); }, 'The same lesson on the pad before the first takeoff, the stick plate small and low (sim 76a6b4f).', { viewport: [1280, 720], settle: 300, clip: [380, 470, 520, 250] }],
  ['p8-c', 'c10-p8', 'c', 'careerPhone', async (page) => { await toBriefing(page); }, 'The career\'s briefing on a phone held sideways, Fly on the first view (sim 8981c89).', { viewport: [844, 390], settle: 800 }],
  ['p9-b', 'c10-p9', 'b', 'chooser', async () => { await sleep(500); }, 'The builder\'s What are you building? chooser (sim 0b60f1a).', { viewport: [820, 700], focus: [0.05, 0.5] }],
  ['p9-c', 'c10-p9', 'c', 'fps', async (page) => {
    await page.evaluate(() => { window.__ui.root.style.visibility = ''; window.__setCam(); });
    await sleep(6000);
  }, 'Show FPS laid out like a hardware monitor overlay, in flight (sim 5d62fe4).', { viewport: [900, 820], settle: 500, clip: [0, 20, 520, 420], focus: [0, 0.2] }],
  ['p10-a', 'c10-p10', 'a', 'school', plan([4.0, 16.2, 4.5], [14.0, 12.0, 4.0], 3500), 'The art room upstairs (sim a1f1a8d).'],
  ['cover-w2', 'c10-cover', 'w2', 'mp', async (page) => {
    await page.evaluate(() => window.__ui.act('gate-together'));
    await sleep(1500);
    await page.evaluate(() => window.__ui.act('mp-host'));
    await page.waitForFunction(() => Boolean(document.querySelector('#tg-handle')), null, { timeout: 60000, polling: 300 });
    await sleep(2000);
  }, 'The pilot card that meets a pilot, cut to the pilot (sim a6bc93e).', { viewport: [960, 760], clip: [55, 225, 285, 410] }],
  ['p6-a', 'c10-p6', 'a', 'title', settingsRow('Stick deadzone'), 'The Settings rows Stick deadzone and Gamepad throttle (sim 37c5d95).', { viewport: [960, 700] }],
].map(([id, page, panel, w, how, note, extra]) => Object.assign({ id, page, panel, note }, typeof how === 'string' ? { file: how, world: null } : { world: w, act: how }, extra || {}));

const missing = jobs.filter((j) => j.file && !fs.existsSync(j.file)).map((j) => j.id);
module.exports = { id: 'c10', missing, worlds, shots: jobs.filter((j) => !j.file || fs.existsSync(j.file)), reuse: [] };
