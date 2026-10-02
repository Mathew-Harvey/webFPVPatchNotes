/*
 * Closed loop capture for one chapter.
 *
 * Keys first. window.__stick only if a headed GPU still cannot lift
 * the craft, which KEYMAP.md explains. No keystroke tape: every tick
 * reads window.__craftState and window.__nextGate and decides the keys.
 *
 * Usage: node tools/fly/run.js c1 [attempts]
 * The sim must already be serving at http://127.0.0.1:8765/
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require('../survey/node_modules/playwright');

const ROOT = path.resolve(__dirname, '..', '..');
const SIM = path.join(ROOT, '_upstream', 'WebFPVSimulator');
const BASE = process.env.WEBFPV || 'http://127.0.0.1:8765';
const CODES = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

function readCourse(rel) {
  const file = path.join(SIM, rel);
  return { file, doc: JSON.parse(fs.readFileSync(file, 'utf8')) };
}

function wrap(a) {
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

function sampleOf(craft, gate) {
  const g = gate && !gate.gateless && gate.gates && gate.gates[0];
  const fwd = craft && craft.fwd ? craft.fwd : { x: 0, y: 0, z: -1 };
  const up = craft && craft.up ? craft.up : { x: 0, y: 1, z: 0 };
  let dist = null;
  let yawErr = null;
  let dy = 0;
  let aperture = 0;
  let sGateY = null;
  let centred = false;
  let inFront = false;
  let screen = null;
  if (g && craft) {
    const dx = g.world.x - craft.worldX;
    const gy = g.world.y - craft.worldY;
    const dz = g.world.z - craft.worldZ;
    dy = gy;
    dist = Math.hypot(dx, gy, dz);
    const heading = Math.atan2(fwd.x, fwd.z);
    const bearing = Math.atan2(dx, dz);
    yawErr = wrap(bearing - heading);
    const vw = gate.viewport.w || 1;
    const vh = gate.viewport.h || 1;
    screen = g.screen;
    inFront = Boolean(screen && screen.inFront);
    if (inFront) {
      const nx = (screen.x - vw / 2) / vw;
      centred = Math.abs(nx) < 0.28;
      aperture = g.aperturePx ? g.aperturePx / vh : 0;
      sGateY = screen.y / vh;
    }
  }
  return {
    dist,
    dy,
    yawErr,
    aperture,
    centred,
    inFront,
    screen,
    air: Boolean(craft && !craft.landed && craft.groundClearance > 0.8),
    landed: Boolean(craft && craft.landed),
    clearance: craft ? craft.groundClearance : 0,
    speed: craft ? craft.speed : 0,
    up: up.y,
    tipped: up.y < 0.55,
    past: false,
    hit: Boolean(craft && (craft.lastHitKind || craft.bounceCount > 0 || craft.turtle)),
    roll: craft && craft.rates ? craft.rates.p : 0,
    pitchDeg: craft ? craft.pitchDeg : 0,
    heading: Math.atan2(fwd.x, fwd.z),
    hold: false,
    aligned: yawErr != null && Math.abs(yawErr) < 0.45 && inFront,
    crashed: Boolean(craft && /crashed/i.test(craft.banner || '')),
    gateY: sGateY,
    seen: {},
  };
}

function blankKeys() {
  return {
    KeyW: false, KeyS: false, KeyA: false, KeyD: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
  };
}

/*
 * signs.pitchForward is the arrow that raises pitchDeg (nose down).
 * signs.yawRight is the key that increases heading.
 * signs.rollRight is the arrow that rolls the nose to the right of the
 * horizon. Until calibration finishes, pitch forward is ArrowUp, which
 * is what the input.js header says the up arrow does.
 */
function pitchToward(k, s, signs) {
  /* gateY is 0 at the top of the glass. A gate stuck at the top means
   * the camera is in the grass. Pull the nose up. A gate along the
   * bottom means the sky has the glass. Push the nose down. */
  if (s.gateY == null || !s.inFront) {
    k[signs.pitchForward] = true;
    return;
  }
  if (s.gateY < 0.42) k[signs.pitchBack] = true;
  else if (s.gateY > 0.62) k[signs.pitchForward] = true;
}

function keysFor(s, signs, phase) {
  const k = blankKeys();
  if (phase === 'takeoff' || phase === 'second') {
    k.KeyW = true;
    return k;
  }
  if (phase === 'sit') {
    return k;
  }
  if (phase === 'dive') {
    k[signs.pitchForward] = true;
    k.KeyS = true;
    steer(k, s, signs, 0.25);
    return k;
  }
  if (phase === 'hold') {
    if (s.clearance < 1.5) k.KeyW = true;
    if (s.clearance > 3) k.KeyS = true;
    steer(k, s, signs, 0.12);
    pitchToward(k, s, signs);
    return k;
  }
  steer(k, s, signs, 0.1);
  if (k.KeyD) k[signs.rollRight] = true;
  if (k.KeyA) k[otherArrow(signs.rollRight)] = true;
  const commit = s.dist != null && s.dist < 9 && Math.abs(s.yawErr || 9) < 0.4;
  if (commit) k[signs.pitchForward] = true;
  else pitchToward(k, s, signs);
  if (s.clearance < 1.35) k.KeyW = true;
  if (s.clearance > 3.1) k.KeyS = true;
  return k;
}

function otherArrow(code) {
  if (code === 'ArrowRight') return 'ArrowLeft';
  if (code === 'ArrowLeft') return 'ArrowRight';
  if (code === 'ArrowUp') return 'ArrowDown';
  return 'ArrowUp';
}

function steer(k, s, signs, dead) {
  const err = s.yawErr || 0;
  if (Math.abs(err) < dead) return;
  const needIncrease = err > 0 === signs.yawIncreasesHeading;
  /* If yawErr > 0, bearing is ahead of heading in the atan2 sense,
   * so heading must increase to catch it. signs.yawIncreasesHeading
   * is true when KeyD increased the heading during calibration. */
  const useD = needIncrease ? signs.yawKeyIncreases : !signs.yawKeyIncreases;
  k[useD ? 'KeyD' : 'KeyA'] = true;
}

async function applyKeys(page, held, want) {
  for (const code of CODES) {
    const on = Boolean(want[code]);
    if (on && !held.has(code)) {
      await page.keyboard.down(code);
      held.add(code);
    } else if (!on && held.has(code)) {
      await page.keyboard.up(code);
      held.delete(code);
    }
  }
}

async function releaseAll(page, held) {
  for (const code of [...held]) {
    await page.keyboard.up(code);
    held.delete(code);
  }
}

async function readFlight(page) {
  return page.evaluate(() => {
    const craft = window.__craftState ? window.__craftState() : null;
    const gate = window.__nextGate ? window.__nextGate() : null;
    const intro = window.__intro ? window.__intro() : null;
    const slim = craft && {
      mode: craft.mode,
      landed: craft.landed,
      worldX: craft.worldX,
      worldY: craft.worldY,
      worldZ: craft.worldZ,
      pitchDeg: craft.pitchDeg,
      speed: craft.speed,
      up: craft.up,
      fwd: craft.fwd,
      vel: craft.vel,
      rates: craft.rates,
      groundClearance: craft.groundClearance,
      lastHitKind: craft.lastHitKind,
      bounceCount: craft.bounceCount,
      turtle: craft.turtle,
      lap: craft.lap,
      banner: craft.banner || '',
    };
    const g0 = gate && gate.gates && gate.gates[0];
    return {
      screen: window.__screen,
      mode: window.__mode,
      intro,
      flightMode: window.__flightMode ? window.__flightMode() : null,
      craft: slim,
      gate: gate && {
        gateless: gate.gateless,
        n: gate.gates ? gate.gates.length : 0,
        viewport: gate.viewport,
        mapId: gate.mapId,
        first: g0 && {
          world: g0.world,
          distance: g0.distance,
          screen: g0.screen,
          aperturePx: g0.aperturePx,
          inFront: g0.screen ? g0.screen.inFront : false,
        },
      },
    };
  });
}

async function boot(page, courseRel, airframe) {
  const { doc } = readCourse(courseRel);
  await page.addInitScript((payload) => {
    const settings = {
      airframeAsked: true,
      hasFlown: true,
      airframe: payload.airframe,
      flightMode: 'angle',
      keyRaceMode: 'angle',
      graphics: 'high',
      graphicsAuto: false,
      sound: false,
      map: 'custom',
      mangaAndScoring: false,
    };
    localStorage.setItem('webfpv.settings.v3', JSON.stringify(settings));
    localStorage.setItem('webfpv.trackbuilder.autosave.v1', JSON.stringify(payload.doc));
  }, { doc, airframe });
  await page.goto(`${BASE}/?map=custom`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 120000 });
  await page.waitForFunction(() => {
    const m = window.__map && window.__map();
    return m && m.ready && m.gates > 0;
  }, null, { timeout: 120000 });
  const before = await page.evaluate(() => window.__map());
  await page.evaluate(() => {
    if (window.__ui && window.__ui.act) window.__ui.act('restart');
  });
  await page.waitForFunction(() => {
    const intro = window.__intro && window.__intro();
    return window.__screen === 'flight' && window.__mode === 'flight' && intro && intro.ms < 0;
  }, null, { timeout: 30000 });
  const canvas = page.locator('canvas').first();
  await canvas.click({ position: { x: 40, y: 40 } });
  return { map: before, canvas };
}

async function probeTakeoff(page, held) {
  /* Release as soon as the skids leave the grass. A two second hold is
   * full stick, and full stick from the pad is a climb to the trees. */
  await applyKeys(page, held, { ...blankKeys(), KeyW: true });
  const t0 = Date.now();
  let last = null;
  while (Date.now() - t0 < 900) {
    last = await readFlight(page);
    const c = last.craft;
    if (c && !c.landed && c.groundClearance > 0.75) {
      await releaseAll(page, held);
      return { ok: true, via: 'keys', last };
    }
    await page.waitForTimeout(40);
  }
  await releaseAll(page, held);
  await page.waitForTimeout(250);
  last = await readFlight(page);
  const c = last.craft;
  return {
    ok: Boolean(c && !c.landed && c.groundClearance > 0.4),
    via: 'keys',
    last,
  };
}

async function calibrate(page, held) {
  await releaseAll(page, held);
  await page.waitForTimeout(200);
  const a = (await readFlight(page)).craft;
  await applyKeys(page, held, { ...blankKeys(), KeyD: true });
  await page.waitForTimeout(450);
  const b = (await readFlight(page)).craft;
  await releaseAll(page, held);
  await page.waitForTimeout(250);
  const c = (await readFlight(page)).craft;
  await applyKeys(page, held, { ...blankKeys(), ArrowUp: true });
  await page.waitForTimeout(500);
  const d = (await readFlight(page)).craft;
  await releaseAll(page, held);
  await page.waitForTimeout(200);
  const e = (await readFlight(page)).craft;
  await applyKeys(page, held, { ...blankKeys(), ArrowRight: true });
  await page.waitForTimeout(400);
  const f = (await readFlight(page)).craft;
  await releaseAll(page, held);
  const h0 = Math.atan2(a.fwd.x, a.fwd.z);
  const h1 = Math.atan2(b.fwd.x, b.fwd.z);
  const signs = {
    yawKeyIncreases: wrap(h1 - h0) > 0,
    yawIncreasesHeading: true,
    pitchForward: (d.pitchDeg - c.pitchDeg) >= 0 ? 'ArrowUp' : 'ArrowDown',
    pitchBack: (d.pitchDeg - c.pitchDeg) >= 0 ? 'ArrowDown' : 'ArrowUp',
    rollRight: 'ArrowRight',
    pitchDelta: d.pitchDeg - c.pitchDeg,
    yawDelta: wrap(h1 - h0),
    rollUpX: f.up.x - e.up.x,
  };
  /* If ArrowRight drove up.x the wrong way for "right", swap.
   * Right of the nose, in this camera, is positive up.x when the
   * horizon tips that way. If the measurement is tiny, keep ArrowRight. */
  if (signs.rollUpX < -0.02) signs.rollRight = 'ArrowLeft';
  return signs;
}

function steerFix(s, signs) {
  /* yawErr > 0: bearing is greater than heading, so heading must rise. */
  signs.yawIncreasesHeading = true;
  return signs;
}

async function shootBurst(page, canvas, dir, id, read) {
  const frames = [];
  for (let n = 1; n <= 3; n += 1) {
    const snap = await read();
    const file = path.join(dir, `${id}_fpv_${n}.png`);
    await canvas.screenshot({ path: file });
    frames.push({ n, file: path.relative(ROOT, file), snap });
    if (n < 3) await page.waitForTimeout(90);
  }
  return frames;
}

function bestIndex(frames, scoreFn) {
  let bi = 0;
  let bs = -Infinity;
  frames.forEach((f, i) => {
    const s = scoreFn(f.view);
    if (s > bs) {
      bs = s;
      bi = i;
    }
  });
  return bi;
}

async function flyOnce(page, canvas, spec, outDir, attempt) {
  const held = new Set();
  const seen = {};
  const saved = [];
  const log = [];
  let closest = Infinity;
  let past = false;
  let stickFallback = false;

  const probe = await probeTakeoff(page, held);
  log.push({ t: 0, event: 'takeoff-probe', ok: probe.ok, clearance: probe.last && probe.last.craft && probe.last.craft.groundClearance, landed: probe.last && probe.last.craft && probe.last.craft.landed });
  if (!probe.ok) {
    stickFallback = true;
    await page.evaluate(() => {
      if (window.__stick) window.__stick(0, 0, 0, 0.55);
    });
    const t0 = Date.now();
    while (Date.now() - t0 < 2500) {
      const now = await readFlight(page);
      if (now.craft && !now.craft.landed && now.craft.groundClearance > 0.8) break;
      await page.waitForTimeout(80);
    }
  }

  let signs = {
    yawKeyIncreases: true,
    yawIncreasesHeading: true,
    pitchForward: 'ArrowUp',
    pitchBack: 'ArrowDown',
    rollRight: 'ArrowRight',
  };
  if (!stickFallback) {
    signs = steerFix(null, await calibrate(page, held));
  }
  log.push({ event: 'signs', signs, stickFallback });

  let phase = 'rush';
  const started = Date.now();
  let holdSince = 0;
  while (Date.now() - started < 28000 && Object.keys(seen).length < spec.shots.length) {
    const raw = await readFlight(page);
    const view = sampleOf(raw.craft, raw.gate && {
      gateless: raw.gate.gateless,
      gates: raw.gate.first ? [{
        world: raw.gate.first.world,
        screen: raw.gate.first.screen,
        aperturePx: raw.gate.first.aperturePx,
      }] : [],
      viewport: raw.gate.viewport,
    });
    view.seen = seen;
    view.fpv = Boolean(raw.intro && raw.intro.ms < 0);
    if (view.dist != null) {
      if (view.dist < closest) closest = view.dist;
      if (seen['c1-p1-c'] && view.dist > closest + 1.5) past = true;
    }
    view.past = past;
    if (seen['c1-p3-a']) {
      phase = 'hold';
      if (!holdSince) holdSince = Date.now();
      view.hold = Date.now() - holdSince > 700;
    } else if (seen['c1-p2-c']) phase = 'second';
    else if (seen['c1-p2-a']) phase = 'sit';
    else if (seen['c1-p1-c']) phase = 'dive';
    else if (view.landed || view.clearance < 0.5) phase = 'takeoff';
    else phase = 'rush';

    if (stickFallback) {
      let thr = 0.36;
      if (phase === 'takeoff' || phase === 'second' || view.clearance < 1.15) thr = 0.52;
      else if (view.clearance > 2.6 || phase === 'dive') thr = 0.22;
      if (phase === 'sit') thr = 0.12;
      let pitch = -0.12;
      if (phase === 'dive' || (phase === 'rush' && view.dist != null && view.dist < 9)) pitch = -0.55;
      else if (view.gateY != null && view.gateY < 0.42) pitch = 0.2;
      else if (view.gateY != null && view.gateY > 0.62) pitch = -0.28;
      const yaw = Math.max(-0.55, Math.min(0.55, -(view.yawErr || 0) * 1.1));
      await page.evaluate(({ pitch, yaw, thr }) => {
        window.__stick(0, pitch, yaw, thr);
      }, { pitch, yaw, thr });
    } else {
      const want = keysFor(view, signs, phase);
      if (phase === 'rush' || phase === 'hold') {
        const now = Date.now();
        if (!flyOnce.chop) flyOnce.chop = now;
        if (!(view.dist != null && view.dist < 8) && now - flyOnce.chop > 480) {
          want.ArrowUp = false;
          want.ArrowDown = false;
          if (now - flyOnce.chop > 620) flyOnce.chop = now;
        }
        if (!flyOnce.thr) flyOnce.thr = now;
        if (now - flyOnce.thr > 260) {
          want.KeyW = false;
          want.KeyS = false;
          if (now - flyOnce.thr > 400) flyOnce.thr = now;
        }
      }
      await applyKeys(page, held, want);
    }

    for (const shot of spec.shots) {
      if (seen[shot.id]) continue;
      if (!shot.when(view)) continue;
      const frames = await shootBurst(page, canvas, outDir, `${shot.id}_a${attempt}`, async () => {
        const again = await readFlight(page);
        const v = sampleOf(again.craft, again.gate && {
          gateless: again.gate.gateless,
          gates: again.gate.first ? [{
            world: again.gate.first.world,
            screen: again.gate.first.screen,
            aperturePx: again.gate.first.aperturePx,
          }] : [],
          viewport: again.gate.viewport,
        });
        v.past = past;
        v.hold = view.hold;
        v.seen = seen;
        return v;
      });
      frames.forEach((f) => {
        f.view = f.snap;
        f.view.seen = seen;
        f.view.past = past;
        f.view.hold = view.hold;
      });
      const bi = bestIndex(frames, shot.score);
      seen[shot.id] = true;
      saved.push({
        id: shot.id,
        attempt,
        best: frames[bi].file,
        frames: frames.map((f) => f.file),
        signs,
        stickFallback,
        at: frames[bi].snap,
      });
      log.push({ event: 'shot', id: shot.id, best: frames[bi].file, dist: view.dist, aperture: view.aperture });
    }
    if (log.length < 80 && (Date.now() - started) % 400 < 120) {
      log.push({
        ms: Date.now() - started,
        phase,
        dist: view.dist == null ? null : Math.round(view.dist * 10) / 10,
        spd: Math.round(view.speed * 10) / 10,
        clr: Math.round(view.clearance * 10) / 10,
        ap: Math.round(view.aperture * 100) / 100,
        yaw: view.yawErr == null ? null : Math.round(view.yawErr * 100) / 100,
        up: Math.round(view.up * 100) / 100,
        landed: view.landed,
        fpv: view.fpv,
      });
    }
    if (!seen.__debug && view.fpv && view.speed > 4 && view.clearance > 0.8 && view.clearance < 5) {
      seen.__debug = true;
      await canvas.screenshot({ path: path.join(outDir, `debug_a${attempt}.png`) });
    }
    await page.waitForTimeout(70);
  }
  await releaseAll(page, held);
  if (stickFallback) {
    await page.evaluate(() => { if (window.__stick) window.__stick(); });
  }
  return { saved, log, seen: Object.keys(seen), stickFallback, signs };
}

async function main() {
  const specName = process.argv[2] || 'c1';
  const attempts = Number(process.argv[3] || 3);
  const spec = require(path.join(__dirname, 'shots', specName));
  const outDir = path.join(ROOT, 'captures', spec.id);
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: ['--use-angle=default', '--enable-gpu', '--disable-frame-rate-limit', '--ignore-gpu-blocklist'],
  });
  const context = await browser.newContext({
    viewport: { width: 960, height: 540 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !/ERR_CONNECTION_REFUSED|Failed to load resource/.test(msg.text())) {
      process.stdout.write(`console ${msg.text()}\n`);
    }
  });
  const booted = await boot(page, spec.course, spec.airframe);
  process.stdout.write(`MAP ${JSON.stringify({ id: booted.map.id, name: booted.map.name, gates: booted.map.gates, spawn: booted.map.spawn })}\n`);
  let result = null;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    process.stdout.write(`ATTEMPT ${attempt}\n`);
    await page.evaluate(() => {
      if (window.__stick) window.__stick();
      if (window.__ui && window.__ui.act) window.__ui.act('restart');
    });
    await page.waitForTimeout(400);
    await page.bringToFront();
    await page.locator('canvas').first().click({ position: { x: 30, y: 30 } });
    result = await flyOnce(page, booted.canvas, spec, outDir, attempt);
    process.stdout.write(`SEEN ${result.seen.join(',')}\n`);
    const missing = spec.shots.filter((s) => !result.seen.includes(s.id)).map((s) => s.id);
    if (missing.length === 0) break;
    process.stdout.write(`MISSING ${missing.join(',')}\n`);
    result.missing = missing;
  }
  const sidecar = {
    spec: spec.id,
    course: spec.course,
    commit: 'cbaee3f',
    base: BASE,
    attempts,
    stickFallback: result.stickFallback,
    signs: result.signs,
    saved: result.saved,
    missing: result.missing || [],
    log: result.log,
  };
  const sidePath = path.join(outDir, 'sidecar.json');
  fs.writeFileSync(sidePath, JSON.stringify(sidecar, null, 2));
  if (result.missing && result.missing.length) {
    const list = path.join(__dirname, 'SHOTLIST.md');
    const block = [
      '',
      `## ${spec.id} ${new Date().toISOString()}`,
      '',
      `Missing after ${attempts} runs: ${result.missing.join(', ')}.`,
      `Stick fallback: ${result.stickFallback ? 'yes, keys did not lift the craft' : 'no, keys flew'}.`,
      'See captures/' + spec.id + '/sidecar.json for the tick log.',
      '',
    ].join('\n');
    fs.appendFileSync(list, block);
  }
  process.stdout.write(`DONE saved ${result.saved.length} missing ${(result.missing || []).length}\n`);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
