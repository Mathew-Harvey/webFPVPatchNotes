/*
 * The capture rig: the WebFPV simulator in a headless browser, its menus
 * hidden, its camera put wherever a panel needs it and the quad held at a
 * pose, the way a camera operator would frame a shot. Nothing here flies:
 * a still is a pose, and the simulator draws it with its own renderer, its
 * own cel shading and its own ink.
 *
 * The simulator is read only. Serve a checkout of it and point SIM_URL at
 * it (default http://127.0.0.1:8765), and SIM_DIR at the checkout so a
 * track can be read from tracks/json:
 *
 *   cd ../WebFPVSimulator && PORT=8765 node scripts/serve.js
 *
 * Two knobs for a sandbox: PW_CHROMIUM names a Chromium to launch, and
 * THREE_DIR names a local copy of three@0.160.0 to answer the CDN with,
 * for a machine whose browser cannot reach jsDelivr. SHOOT_GL=swiftshader
 * renders on the CPU where there is no GPU.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SIM_URL = process.env.SIM_URL || 'http://127.0.0.1:8765';
const SIM_DIR = process.env.SIM_DIR || path.join(ROOT, '_upstream', 'WebFPVSimulator');

function playwright() {
  const local = path.join(ROOT, 'tools', 'survey', 'node_modules', 'playwright');
  if (fs.existsSync(local)) return require(local);
  return require('playwright');
}

async function launch() {
  const { chromium } = playwright();
  const args = [];
  if (process.env.SHOOT_GL === 'swiftshader') {
    args.push('--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist');
  } else {
    args.push('--ignore-gpu-blocklist', '--enable-gpu');
  }
  const opts = { args };
  if (process.env.PW_CHROMIUM) opts.executablePath = process.env.PW_CHROMIUM;
  return chromium.launch(opts);
}

async function routeThree(ctx) {
  const dir = process.env.THREE_DIR;
  if (!dir) return;
  await ctx.route(/cdn\.jsdelivr\.net\/npm\/three@0\.160\.0\/(.*)$/, async (route) => {
    const m = route.request().url().match(/three@0\.160\.0\/([^?#]*)/);
    const file = path.join(dir, m[1]);
    if (!fs.existsSync(file)) return route.fulfill({ status: 404, body: 'missing ' + m[1] });
    return route.fulfill({ status: 200, contentType: 'text/javascript; charset=utf-8', body: fs.readFileSync(file) });
  });
}

function readTrack(rel) {
  const file = path.isAbsolute(rel) ? rel : path.join(SIM_DIR, rel);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/* A RaceGOW room, out of the simulator's own preset list. */
async function readPreset(id) {
  const url = require('url').pathToFileURL(path.join(SIM_DIR, 'src', 'trackbuilder', 'presets.js')).href;
  const mod = await import(url);
  const doc = mod.PRESETS.find((p) => p.id === id);
  if (!doc) throw new Error('no preset ' + id);
  return JSON.parse(JSON.stringify(doc));
}

/*
 * Boot one world. `world` is { track | preset | map, airframe, ui, query }.
 * The menus are hidden unless the shot is of a menu, and the rig keeps a
 * handle on the shell's camera by catching it in lookAt, the one call the
 * harness camera makes every frame.
 */
async function open(browser, world, viewport) {
  const proxy = world.fetchFromNode && process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined;
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, proxy });
  await routeThree(ctx);
  if (world.fetchFromNode) {
    /* A live page, fetched by the rig's own Node side, which trusts what the
     * machine trusts, and handed to the browser as the answer. */
    await ctx.route(/^https:\/\//, async (route) => {
      try {
        const res = await route.fetch();
        await route.fulfill({ response: res });
      } catch (e) {
        await route.abort();
      }
    });
  }
  const page = await ctx.newPage();
  page.on('pageerror', (e) => process.stdout.write('pageerror ' + e.message + '\n'));
  let doc = null;
  if (world.track) doc = readTrack(world.track);
  if (world.preset) doc = await readPreset(world.preset);
  /* A freestyle map from the simulator's own source, as the builder ships
   * it (the showpiece is Hibari Yard Tandem), seated as the pilot's map. */
  let freestyle = null;
  if (world.freestyle) {
    const url = require('url').pathToFileURL(path.join(SIM_DIR, 'src', 'maps', 'built', world.freestyle + '.js')).href;
    const mod = await import(url);
    const make = mod[world.freestyle + 'Map'];
    if (!make) throw new Error('no map ' + world.freestyle);
    freestyle = make();
  }
  await page.addInitScript((p) => {
    const s = Object.assign({
      airframeAsked: true, hasFlown: true, feelAsked: true, airframe: p.airframe || '5inch',
      graphics: 'high', graphicsAuto: false, sound: false, mangaAndScoring: true, freestyleScoring: 'off',
      map: p.map || 'custom', flightMode: 'angle', crosshair: 'off', fullscreenFly: false,
    }, p.settings || {});
    localStorage.setItem('webfpv.settings.v3', JSON.stringify(s));
    if (p.doc) {
      const key = p.doc.trackClass === 'micro' ? 'webfpv.trackbuilder.autosave.micro.v1' : 'webfpv.trackbuilder.autosave.v1';
      localStorage.setItem(key, JSON.stringify(p.doc));
    }
    if (p.freestyle) localStorage.setItem('webfpv.trackbuilder.autosave.freestyle.v1', JSON.stringify(p.freestyle));
  }, { doc, freestyle, airframe: world.airframe, map: world.map, settings: world.settings });
  if (world.landing) {
    /* The front door, with its invitation already seen and Global Privacy
     * Control on, as its own share card script loads it (scripts/og.js). */
    await page.addInitScript(() => {
      try { localStorage.setItem('webfpv.invite.seen', String(Date.now())); } catch (e) { /* private mode */ }
      Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true, configurable: true });
    });
  }
  const target = world.url || (world.path ? SIM_URL + world.path : SIM_URL + '/' + (world.query || (world.map ? '?map=' + world.map : '')));
  await page.goto(target, { waitUntil: 'domcontentloaded', timeout: 90000 });
  if (world.path || world.url) {
    await page.waitForTimeout(world.wait || 12000);
    return { ctx, page, doc };
  }
  await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 240000 });
  if (doc) {
    await page.waitForFunction(() => { const m = window.__map && window.__map(); return m && m.ready && m.gates > 0; }, null, { timeout: 120000 });
  }
  if (!world.ui) await page.addStyleTag({ content: '#ui{visibility:hidden !important} #loading{display:none !important}' });
  await page.evaluate(() => {
    const T = window.__three;
    const orig = T.Object3D.prototype.lookAt;
    T.Object3D.prototype.lookAt = function (...a) {
      if (this.isPerspectiveCamera && !window.__mainCam) window.__mainCam = this;
      /* A camera that rides with cars (window.__follow), placed every frame
       * from their poses: beside the pair, on one side of the line from the
       * second to the first, so a moving subject is framed in any frame. */
      const f = window.__follow;
      if (f && this === window.__mainCam && window.__vehicles) {
        const cars = window.__vehicles().filter((c) => f.slots.includes(c.slot));
        if (cars.length === f.slots.length) {
          const lead = cars.find((c) => c.slot === f.slots[0]);
          const last = cars.find((c) => c.slot === f.slots[f.slots.length - 1]);
          const mx = cars.reduce((s, c) => s + c.x, 0) / cars.length;
          const mz = cars.reduce((s, c) => s + c.z, 0) / cars.length;
          let dx = lead.x - last.x;
          let dz = lead.z - last.z;
          const dl = Math.hypot(dx, dz) || 1;
          dx /= dl; dz /= dl;
          const rx = -dz * f.side;
          const rz = dx * f.side;
          this.position.set(mx + rx * f.dist + dx * (f.ahead || 0), f.up, mz + rz * f.dist + dz * (f.ahead || 0));
          const r = orig.call(this, mx + dx * (f.lookAhead || 0), f.lookUp || 0.6, mz + dz * (f.lookAhead || 0));
          if (window.__camRoll) this.rotateZ(window.__camRoll);
          return r;
        }
      }
      const r = orig.apply(this, a);
      if (this === window.__mainCam && window.__camRoll) this.rotateZ(window.__camRoll);
      return r;
    };
  });
  if (world.ui) {
    await page.evaluate((s) => window.__ui.show(s), world.ui);
    await page.waitForTimeout(1500);
  }
  await page.waitForTimeout(800);
  return { ctx, page, doc };
}

/* The racing line, sampled, for shots placed along it. */
async function line(page, n = 800) {
  return page.evaluate((n) => {
    const out = [];
    for (let k = 0; k <= n; k += 1) {
      const p = window.__trackPoint(k / n);
      if (p) out.push([p.x, p.y, p.z]);
    }
    return out;
  }, n);
}

/*
 * Frame a shot: camera position, a point to look at, a lens in degrees of
 * vertical field, a roll in degrees for a banked or dutch frame, and the
 * quad's pose (position, yaw with 0 facing -z, pitch nose down positive,
 * roll right positive), or null to leave it out of frame.
 */
async function pose(page, p) {
  await page.evaluate((p) => {
    const T = window.__three;
    /* Positive roll banks the frame right, as a quad banking right would. */
    window.__camRoll = -(p.roll || 0) * Math.PI / 180;
    window.__setCam(p.cam[0], p.cam[1], p.cam[2], p.look[0], p.look[1], p.look[2]);
    const cam = window.__mainCam;
    if (cam && p.fov) { cam.fov = p.fov; cam.updateProjectionMatrix(); }
    const scene = window.__mapScene();
    let quad = null;
    scene.traverse((o) => { if (!quad && o.name === 'craft') quad = o; });
    if (quad && !quad.__held) {
      /* The frame loop copies the plant's pose into the model every frame;
       * on this one model those two copies are made to do nothing. */
      quad.__held = true;
      quad.position.copy = function () { return this; };
      quad.quaternion.copy = function () { return this; };
      Object.defineProperty(quad, 'visible', { get() { return window.__quadVisible === true; }, set() {}, configurable: true });
    }
    window.__quadVisible = Boolean(p.quad);
    if (quad && p.quad) {
      quad.position.set(p.quad.pos[0], p.quad.pos[1], p.quad.pos[2]);
      const d = Math.PI / 180;
      quad.quaternion.setFromEuler(new T.Euler(-(p.quad.pitch || 0) * d, (p.quad.yaw || 0) * d, -(p.quad.roll || 0) * d, 'YXZ'));
    }
  }, p);
}

async function snap(page, file, settle = 1400, clip = null) {
  await page.waitForTimeout(settle);
  if (clip) await page.screenshot({ path: file, clip });
  else await page.locator('canvas#view').screenshot({ path: file });
}

/*
 * The paper passes, the front door's studio look (src/manga.js on the
 * landing page): the world goes to paper, the quad keeps its colours and
 * its ink hulls, and its cast shadow is read off a white ground so the ink
 * step can print it as dot tone.
 *   'world'  everything as the simulator draws it
 *   'matte'  the quad alone over magenta, for its cut out
 *   'shadow' a white ground and a white sky, the quad invisible but casting
 * The ground is whatever a ray straight down meets at `probes`.
 */
async function paperPass(page, mode, probes, sunDir) {
  return page.evaluate(({ mode, probes, sunDir }) => {
    const T = window.__three;
    const scene = window.__mapScene();
    if (!window.__paperStash) {
      const hits = new Set();
      const ray = new T.Raycaster();
      const solids = [];
      scene.traverse((o) => {
        if (!o.isMesh || !o.visible) return;
        let inCraft = false; for (let q = o.parent; q; q = q.parent) if (q.name === 'craft') inCraft = true;
        if (!inCraft) solids.push(o);
      });
      for (const [x, z] of (probes || [[0, 0]])) {
        ray.set(new T.Vector3(x, 60, z), new T.Vector3(0, -1, 0));
        const h = ray.intersectObjects(solids, false);
        const first = h.find((e) => { const m = Array.isArray(e.object.material) ? e.object.material[0] : e.object.material; return m && !m.transparent && m.side !== T.BackSide; });
        if (first) hits.add(first.object);
      }
      const stash = { bg: scene.background, fog: scene.fog, items: [] };
      scene.traverse((o) => {
        if (!(o.isMesh || o.isLine || o.isPoints || o.isSprite)) return;
        let inCraft = false; for (let q = o.parent; q; q = q.parent) if (q.name === 'craft') inCraft = true;
        stash.items.push({ o, inCraft, ground: hits.has(o), visible: o.visible, material: o.material });
      });
      window.__paperStash = stash;
    }
    const st = window.__paperStash;
    const white = window.__paperWhite || (window.__paperWhite = new T.MeshToonMaterial({ color: 0xffffff }));
    for (const e of st.items) {
      e.o.visible = e.visible;
      e.o.material = e.material;
      const mats = Array.isArray(e.material) ? e.material : [e.material];
      if (e.inCraft) for (const m of mats) { if (!m) continue; if (m.__cw === undefined) { m.__cw = m.colorWrite; m.__dw = m.depthWrite; } m.colorWrite = m.__cw; m.depthWrite = m.__dw; }
    }
    scene.background = st.bg;
    scene.fog = st.fog;
    let sun = null;
    scene.traverse((o) => { if (!sun && o.isDirectionalLight) sun = o; });
    if (sun && !sun.__held) {
      /* The shell re-aims the sun at the focus every frame along its own
       * direction, so the direction is swapped where it is used. */
      sun.__held = true;
      const add = sun.position.addScaledVector.bind(sun.position);
      sun.position.addScaledVector = function (v, k) { return add(window.__paperSun || v, k); };
      sun.__extent = [sun.shadow.camera.left, sun.shadow.camera.right, sun.shadow.camera.top, sun.shadow.camera.bottom,
        sun.shadow.camera.near, sun.shadow.camera.far, sun.shadow.bias, sun.shadow.normalBias];
    }
    /* Tight round the quad, and a short depth range with a small bias: the
     * field's bias is a third of a metre of depth, which is right for trees
     * and swallows the shadow of a quad sitting on the grass. */
    const tight = (on) => {
      if (!sun) return;
      const e = on ? [-7, 7, 7, -7, 110, 150, -0.0001, 0.004] : sun.__extent;
      sun.shadow.camera.left = e[0]; sun.shadow.camera.right = e[1]; sun.shadow.camera.top = e[2]; sun.shadow.camera.bottom = e[3];
      sun.shadow.camera.near = e[4]; sun.shadow.camera.far = e[5];
      sun.shadow.bias = e[6]; sun.shadow.normalBias = e[7];
      sun.shadow.camera.updateProjectionMatrix();
      if (sun.shadow.map) { sun.shadow.map.dispose(); sun.shadow.map = null; }
    };
    if (mode === 'world') {
      window.__paperSun = null;
      tight(false);
      if (window.__shadows) window.__shadows(true);
      return 'world';
    }
    window.__paperSun = new T.Vector3(...(sunDir || [0.32, 1, 0.42])).normalize();
    tight(true);
    for (const e of st.items) {
      if (e.inCraft) {
        if (mode === 'shadow') {
          const mats = Array.isArray(e.material) ? e.material : [e.material];
          for (const m of mats) { if (m) { m.colorWrite = false; m.depthWrite = false; } }
        }
        continue;
      }
      if (mode === 'matte') { e.o.visible = false; continue; }
      if (e.ground) { e.o.material = white; e.o.receiveShadow = true; continue; }
      e.o.visible = false;
    }
    scene.fog = null;
    scene.background = new T.Color(mode === 'matte' ? 0xff00ff : 0xffffff);
    /* The shell redraws its shadow map only when the focus moves, and this
     * pass has just replaced it, so ask for one now. */
    if (window.__shadows) window.__shadows(true);
    return mode;
  }, { mode, probes, sunDir });
}

/* The simulator's commit, for the sidecars. */
function simCommit() {
  try {
    return require('child_process').execSync('git rev-parse --short HEAD', { cwd: SIM_DIR }).toString().trim();
  } catch (e) {
    return 'unknown';
  }
}

module.exports = { ROOT, SIM_DIR, SIM_URL, launch, open, line, pose, snap, paperPass, simCommit, routeThree };
