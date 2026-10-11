/*
 * The week of 3 to 11 October: a picture for every note on the six pages
 * after The notes so far. Most are the simulator, the builder or the board
 * as a visitor sees them, in the state the note describes, so a shot here
 * often presses, types or flies something first (`act`).
 *
 * Two of the three are served from a checkout. The simulator as for the
 * rest of the chapter; the board (WebFPVSimulator-LeaderBoard) on
 * 127.0.0.1:3100 with its file store, seeded by tools/shoot/seed-board.mjs
 * with an example club, example times and example tunes, and shown at its
 * public address so its own address lines read the way a visitor sees
 * them. Nothing on the live board is pictured as if it were the example:
 * the official tracks and the top rated order are read from the live board
 * itself.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
/* A returning pilot: every guide seen, the Weight hint dismissed. */
const RETURNING = { guidedRace: true, guidedWhoop: true, guidedFreestyle: true, hasFlown: true, airframeAsked: true, graphics: 'high', graphicsAuto: false };
const QUIET = { 'webfpv.airhint.v2': '1', 'webfpv.support.prompt.v1': { lastShownMs: Date.now() } };

/* Into the air: the launch link puts the quad on its pad, and the run
 * start's orbit plays before the lens is the pilot's. */
async function flying(page) {
  await page.waitForFunction(() => window.__ui && window.__ui.screen === 'flight', null, { timeout: 120000 });
  await page.waitForFunction(() => { const i = window.__intro && window.__intro(); return i && !i.orbiting && !i.approaching && !i.zooming; }, null, { timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1200);
}

const path = require('path');
const fs = require('fs');
const TRACKS = path.join(__dirname, 'tracks');
const D = Math.PI / 180;
function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
function norm(a) { const l = Math.hypot(a[0], a[1], a[2]) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }
function yawToward(from, to) { const f = sub(to, from); return Math.atan2(-f[0], -f[2]) / D; }

/* WCMRC Round 5 in the simulator's world: the pads, and its first gate
 * fifteen metres in front of them (tools/shoot/c1.js). */
const PAD = [15.57, 0.15, 29.85];
const GATE0 = [17.88, 0.88, 15.01];

const BOARD = process.env.BOARD_LOCAL || 'http://127.0.0.1:3100';
const PUBLIC = 'https://webfpv.org/board';
const CLUB = PUBLIC + '/CommunityGow/example-whoop-club';

function boardAt(url, viewport, extra) {
  return Object.assign({ url, route: [PUBLIC, BOARD], wait: 5000, viewport, dpr: 2 }, extra || {});
}

module.exports = {
  worlds: {
    cgClub: boardAt(CLUB, [1280, 800]),
    cgPortal: boardAt(PUBLIC + '/CommunityGow', [430, 900]),
    cgRound: boardAt(CLUB + '/1#post', [420, 900]),
    cgPhone: boardAt(CLUB, [430, 860]),
    /* The whoop builder sent from the club's organiser link: the organiser
     * key comes from the seed (CG_KEY) and is never in a picture. */
    cgBuilder: {
      path: '/src/trackbuilder/index.html?class=micro&community=example-whoop-club&board=' + encodeURIComponent(BOARD) + '#cgkey=' + (process.env.CG_KEY || 'x'.repeat(24)),
      wait: 14000, viewport: [760, 940], dpr: 2
    },
    /* The simulator on its Quad screen, for the tunes dialog. */
    simQuad: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', ui: 'quad', dpr: 2 },
    tunesTab: boardAt(PUBLIC + '/#tunes', [1000, 900]),
    /* A whoop room by its launch link, with the first flight guide asked
     * for again by ?guide=1. */
    guideWhoop: {
      preset: 'racegow5-track1', airframe: 'whoop65', query: '?map=custom&craft=whoop65&fly=1&guide=1', hud: true, dpr: 2,
      settings: Object.assign({}, RETURNING, { airframe: 'whoop65' }), storage: QUIET, prep: flying
    },
    /* The Nice flying card, due after two tracks flown (its own record of
     * them seeded the way scripts/tuneinvite-check.js seeds it). */
    inviteField: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: RETURNING,
      storage: Object.assign({ 'webfpv.tuneinvite.v1': { v: 1, tracks: { aaaaaaaa: 30000, bbbbbbbb: 30000 }, free: 0, asked: 0, answer: '' } }, QUIET),
      prep: flying
    },
    /* The bundle the whoop builder exports, made from main by the
     * simulator's own script: node scripts/trackbundle.js racegow5-track3
     * --out captures/bundle/t3.zip, unzipped where it lands. */
    /* WEBFPV in pipe letters, one letter gate each, made for this page by
     * hand (tools/shoot/tracks/webfpv-letters.json, the letters' own
     * default sizes from src/props/letters.js), read the way they are flown. */
    letters: { track: path.join(TRACKS, 'webfpv-letters.json'), airframe: '5inch' },
    /* WCMRC Round 5 with its first gate made Invisible. */
    invisible: { track: path.join(TRACKS, 'wcmrc-invisible.json'), airframe: '5inch' },
    /* The builder's animation page, which renders Export animation. */
    animate: { path: '/src/trackbuilder/animate.html', wait: 6000, viewport: [840, 1024] },
    feelPad: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: Object.assign({}, RETURNING, { feelTuning: true, airGrip: 115, motorKv: 105 }), storage: QUIET, prep: flying
    },
    padAuto: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: Object.assign({}, RETURNING, { autoReset: true, autoResetS: 1 }), storage: QUIET, prep: flying
    },
    field: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch' },
    whoopRoom: { preset: 'racegow5-track1', airframe: 'whoop65', settings: { airframe: 'whoop65' } },
    town: { map: 'city', settings: Object.assign({}, RETURNING, { map: 'city', freestyleScoring: 'off' }) },
    padView: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: RETURNING, storage: QUIET, prep: flying
    },
    /* The same, without the week's record of a Support prompt shown. */
    padCue: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: RETURNING, storage: QUIET, prep: flying
    },
    padFresh: {
      track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', query: '?map=custom&craft=5inch&fly=1', hud: true, dpr: 2,
      settings: RETURNING, storage: { 'webfpv.airhint.v2': '1' }, prep: flying
    },
    simRates: { track: 'tracks/json/trk-a75a1bc4.json', airframe: '5inch', ui: 'rates', dpr: 2, settings: RETURNING, storage: QUIET },
    /* A whoop room with the Race line on, the lens handed to the rig once
     * the line is solved. */
    raceRoom: {
      preset: 'racegow5-track1', airframe: 'whoop65', query: '?map=custom&craft=whoop65&fly=1',
      settings: Object.assign({}, RETURNING, { airframe: 'whoop65', raceLine: true }), storage: QUIET,
      prep: async (page) => {
        /* The line is never solved inside a flying frame, so the run is
         * paused while it is (render/raceline.js). */
        await flying(page);
        await page.keyboard.press('Escape');
        await page.waitForFunction(() => { const r = window.__raceLine && window.__raceLine(); return r && r.state && r.state.phase === 'ready'; }, null, { timeout: 120000 });
      }
    },
    /* The five inch builder holding WCMRC Round 5 with one stack made a
     * triple of three opening sizes (tools/shoot/tracks/wcmrc-stack.json). */
    stackBuilder: { path: '/src/trackbuilder/index.html', wait: 12000, viewport: [1100, 1250], dpr: 2 },
    /* The live board and the live front door, as a visitor sees them, with
     * Global Privacy Control on and the front door's invitation seen. */
    liveBoard: { url: 'https://webfpv.org/board', landing: true, wait: 7000, viewport: [340, 900], dpr: 2 },
    frontPhone: { url: 'https://webfpv.org/', landing: true, wait: 6000, viewport: [400, 860], dpr: 2 },
    frontDesk: { url: 'https://webfpv.org/', landing: true, wait: 6000, viewport: [1280, 920], dpr: 2 },
    bundle: { url: 'file://' + require('path').join(__dirname, '..', '..', 'captures', 'bundle', 'instructions.html'), wait: 2500, viewport: [620, 857], dpr: 2 }
  },
  shots: [
    /* ---- CommunityGow ---- */
    { id: 'w-cg1', page: 'c1-p14b', panel: 'n1', world: 'cgClub', viewport: [1280, 800], clip: [90, 70, 1100, 690] },
    {
      id: 'w-cg2', page: 'c1-p14b', panel: 'n2', world: 'cgPortal', viewport: [430, 900], clip: [0, 150, 430, 552],
      act: async (page) => { await page.fill('form.start input[type=text]', 'Your Whoop Club'); await page.waitForTimeout(1500); }
    },
    {
      id: 'w-cg3', page: 'c1-p14b', panel: 'n3', world: 'cgBuilder', viewport: [760, 940], clip: [180, 128, 580, 710],
      act: async (page) => {
        await page.evaluate(async () => {
          const m = await import('/src/trackbuilder/presets.js');
          window.trackBuilder.openIncoming(JSON.parse(JSON.stringify(m.presetById('racegow5-track3'))), '');
        });
        await page.waitForTimeout(3000);
        await page.evaluate(() => { window.trackBuilder.frameAll(); });
        await page.waitForTimeout(2500);
        await page.waitForTimeout(1200);
      }
    },
    {
      id: 'w-cg4', page: 'c1-p14b-2', panel: 'n1', world: 'cgRound', viewport: [420, 900],
      act: async (page) => {
        const box = await page.$('input[inputmode=decimal]');
        await page.evaluate(() => { const f = document.querySelector('input[inputmode=decimal]').closest('form'); f.scrollIntoView({ block: 'start' }); window.scrollBy(0, -12); });
        const name = await box.evaluate((el) => !!el.closest('form').querySelector('input[type=text]:not([inputmode])'));
        if (name) await page.locator('form:has(input[inputmode=decimal]) input[type=text]:not([inputmode])').first().fill('Kestrel');
        await box.fill('34.56');
        await page.waitForTimeout(600);
      }
    },
    {
      id: 'w-cg5', page: 'c1-p14b-2', panel: 'n2', world: 'cgPhone', viewport: [430, 860],
      act: async (page) => {
        await page.click('button[data-tab="season"]');
        await page.waitForTimeout(800);
        await page.evaluate(() => { const t = document.querySelector('table'); if (t) t.scrollIntoView({ block: 'end' }); });
        await page.waitForTimeout(500);
      }
    },
    {
      id: 'w-cg6', page: 'c1-p14b-2', panel: 'n3', world: 'cgPhone', viewport: [430, 860],
      act: async (page) => { await page.getByText('Invite people').first().click(); await page.waitForTimeout(1200); }
    },
    /* ---- Tunes ---- */
    {
      id: 'w-tu1', page: 'c1-p14b2', panel: 'n1', world: 'simQuad', viewport: [560, 860], page_shot: true,
      act: async (page) => {
        await page.evaluate(() => window.__ui.act('tune-share'));
        await page.waitForTimeout(1500);
        const f = page.locator('.name-dialog-box input');
        await f.nth(0).fill('Planted in the gates');
        await f.nth(1).fill('A bit more grip, softer rates.');
        await f.nth(2).fill('Kestrel');
        await page.getByRole('button', { name: 'Share', exact: true }).click();
        await page.waitForSelector('.tune-code', { timeout: 15000 });
        await page.waitForTimeout(800);
      }
    },
    {
      id: 'w-tu2', page: 'c1-p14b2', panel: 'n2', world: 'simQuad', viewport: [560, 860], page_shot: true,
      act: async (page) => {
        await page.evaluate(() => window.__ui.show('quad'));
        await page.waitForTimeout(800);
        await page.evaluate(() => window.__ui.act('tune-share'));
        await page.waitForTimeout(1500);
      }
    },
    {
      id: 'w-tu3', page: 'c1-p14b2', panel: 'n3', world: 'tunesTab', viewport: [1000, 900], clip: [0, 240, 1000, 720],
      act: async (page) => { await page.selectOption('#tune-order', 'rating'); await page.waitForTimeout(1500); }
    },
    { id: 'w-tu4', page: 'c1-p14b2-2', panel: 'n1', world: 'guideWhoop', viewport: [720, 990], page_shot: true },
    {
      id: 'w-tu5', page: 'c1-p14b2-2', panel: 'n2', world: 'bundle', viewport: [620, 857],
      act: async (page) => { await page.evaluate(() => { const h = [...document.querySelectorAll('h2')].find((e) => /room/i.test(e.textContent)); window.scrollTo(0, h.getBoundingClientRect().top + window.scrollY - 300); }); await page.waitForTimeout(500); }
    },
    {
      id: 'w-tu6', page: 'c1-p14b2-2', panel: 'n3', world: 'inviteField', viewport: [600, 1280], page_shot: true,
      act: async (page) => {
        await page.evaluate(() => { const u = window.__ui; u.invite.reason = 'tracks'; u.invite.armed = true; if (u.raiseInvite) u.raiseInvite(); });
        await page.waitForTimeout(1500);
      }
    },
    /* ---- Building ---- */
    {
      id: 'w-bd1', page: 'c1-p14c', panel: 'n1', world: 'letters',
      make: () => {
        /* Close behind the quad as it banks into the W, the rest of the
         * word reading off to the right. The model is 38 cm across, so
         * a camera more than a metre or two away loses it. */
        return { cam: [-4.6, 1.35, -12.4], look: [0, 1.6, -8.5], fov: 56, roll: -4, quad: { pos: [-3.8, 1.6, -11.9], yaw: -118, pitch: 18, roll: -25 } };
      }
    },
    {
      id: 'w-bd2', page: 'c1-p14c', panel: 'n2', world: 'invisible',
      make: () => ({ cam: [17.45, 1.0, 19.6], look: add(GATE0, [0, 0.1, 0]), fov: 64, roll: -5, quad: null })
    },
    {
      id: 'w-bd3', page: 'c1-p14c', panel: 'n3', world: 'animate', viewport: [840, 1024],
      act: async (page) => {
        await page.waitForFunction(() => window.__animateReady === true, null, { timeout: 60000 });
        const logo = 'data:image/png;base64,' + fs.readFileSync(path.join(process.env.SIM_DIR || '', 'apple-touch-icon.png')).toString('base64');
        await page.evaluate(async (logo) => {
          const doc = await (await fetch('/tracks/json/trk-a75a1bc4.json')).json();
          doc.branding = Object.assign({}, doc.branding, { logos: [{ id: 'logo-1', image: logo, name: 'webfpv.png' }] });
          const r = await window.__exportTrackGif(doc, { width: 840, height: 1024, frames: 2, field: true, camera: { eye: { x: 42, y: 2, z: 8 }, aim: { x: 27, y: 36, z: 0 }, fovDeg: 56 } });
          if (!r.ok) throw new Error(r.error);
          const b64 = r.base64;
          document.body.innerHTML = '';
          document.body.style.margin = '0';
          const img = new Image();
          img.src = 'data:image/gif;base64,' + b64;
          img.style.cssText = 'display:block;width:840px;height:1024px';
          document.body.appendChild(img);
          await img.decode();
        }, logo);
      }
    },
    {
      id: 'w-bd4', page: 'c1-p14c-2', panel: 'n1', world: 'stackBuilder', viewport: [1100, 1250], clip: [752, 182, 340, 726],
      act: async (page) => {
        const doc = JSON.parse(fs.readFileSync(path.join(TRACKS, 'wcmrc-stack.json'), 'utf8'));
        await page.evaluate(() => window.trackBuilder.closeModal());
        await page.waitForTimeout(500);
        await page.evaluate((d) => window.trackBuilder.openIncoming(d, ''), doc);
        await page.waitForTimeout(3000);
        await page.evaluate(() => { window.trackBuilder.frameAll(); window.trackBuilder.setSelection(['el-4']); window.trackBuilder.toggleDrawer(true); });
        await page.waitForTimeout(2000);
        await page.evaluate(() => { const h = [...document.querySelectorAll('h3')].find((e) => e.textContent === 'Each opening'); h.scrollIntoView({ block: 'start' }); });
        await page.waitForTimeout(800);
      }
    },
    {
      /* The live board's first official track, read from the board itself. */
      id: 'w-bd5', page: 'c1-p14c-2', panel: 'n2', world: 'liveBoard', viewport: [340, 900], clip: [0, 56, 340, 520],
      act: async (page) => {
        await page.waitForSelector('.tile-official', { state: 'attached', timeout: 60000 });
        await page.evaluate(() => { const t = document.querySelector('.tile-official').closest('.tile'); window.scrollBy(0, t.getBoundingClientRect().top - 64); });
        await page.waitForTimeout(1500);
      }
    },
    {
      /* A patron's sign in the town: Quad Configurator, from the roster's
       * PATRON_MAP_BRANDS. */
      id: 'w-bd6', page: 'c1-p14c-2', panel: 'n3', world: 'town',
      make: () => ({ cam: [30.0, 1.0, 76.6], look: [28.3, 1.6, 82.45], fov: 56, roll: 5, quad: { pos: [29.3, 1.7, 77.9], yaw: 60, pitch: 18, roll: 28 } })
    },
    /* ---- Flying ---- */
    { id: 'w-fl1', page: 'c1-p14d', panel: 'n1', world: 'feelPad', viewport: [700, 880], clip: [100, 240, 500, 640], page_shot: true },
    {
      id: 'w-fl2', page: 'c1-p14d', panel: 'n2', world: 'field',
      make: () => ({ cam: [17.0, 0.7, 19.4], look: [17.88, 1.0, 15.0], fov: 52, roll: -5, quad: { pos: [17.45, 0.95, 18.2], yaw: -12, pitch: 30, roll: -18 } })
    },
    { id: 'w-fl3', page: 'c1-p14d', panel: 'n3', world: 'simRates', viewport: [1280, 900], clip: [40, 40, 1180, 850] },
    {
      id: 'w-fl4', page: 'c1-p14d-2', panel: 'n1', world: 'whoopRoom',
      make: () => ({ cam: [-0.32, 1.08, 0.32], look: [-0.95, 1.2, 0.955], fov: 52, roll: 4, quad: { pos: [-0.95, 1.17, 0.955], yaw: -78, pitch: 18, roll: 14 } })
    },
    {
      /* The whoop over the top of the dive, the dots bunching where it has
       * to slow down. */
      id: 'w-fl5', page: 'c1-p14d-2', panel: 'n2', world: 'raceRoom',
      make: () => ({ cam: [-3.9, 1.6, -2.3], look: [-5.5, 1.0, -0.5], fov: 62, roll: -4, quad: { pos: [-4.67, 1.8, -1.39], yaw: 75, pitch: 25, roll: -15 } })
    },
    {
      /* The words the reset path puts up (main.js, 'Auto reset.'), held on
       * screen for the frame. */
      id: 'w-fl6', page: 'c1-p14d-2', panel: 'n3', world: 'padAuto', viewport: [540, 1300], page_shot: true,
      act: async (page) => { await page.evaluate(() => { const u = window.__ui; const set = u.setBanner.bind(u); u.setBanner = () => set('Auto reset.'); }); await page.waitForTimeout(1000); }
    },
    /* ---- Looks and fixes ---- */
    {
      id: 'w-lk1', page: 'c1-p14e', panel: 'n1', world: 'town',
      make: () => ({ cam: [-40, 28, 60], look: [20, 14, 0], fov: 60, roll: -5, quad: { pos: [-39.26, 27.73, 59.43], yaw: -50, pitch: 28, roll: -22 } })
    },
    {
      id: 'w-lk2', page: 'c1-p14e', panel: 'n2', world: 'town',
      make: () => ({ cam: [1.6, 1.0, -6], look: [2.6, 0.9, -30], fov: 58, roll: -4, quad: { pos: [1.85, 0.85, -7.1], yaw: -3, pitch: 26, roll: -16 } })
    },
    {
      id: 'w-lk3', page: 'c1-p14e', panel: 'n3', world: 'town',
      make: () => ({ cam: [3.7, 1.05, -13.4], look: [2.9, 0.7, -18.6], fov: 55, roll: 3, quad: { pos: [3.62, 0.93, -14.05], yaw: 40, pitch: 18, roll: 16 } })
    },
    {
      /* On the launch ramp where the plant parks it (read off the shell
       * after a launch: 15.573, 0.175, 29.854, nose up 28 degrees). */
      id: 'w-lk4', page: 'c1-p14e-2', panel: 'n1', world: 'field',
      make: () => ({ cam: [15.45, 0.38, 30.75], look: [16.6, 0.55, 24], fov: 55, quad: { pos: [15.573, 0.175, 29.854], yaw: -6, pitch: 28, roll: 0 } })
    },
    {
      id: 'w-lk5', page: 'c1-p14e-2', panel: 'n2', world: 'padFresh', viewport: [420, 620], page_shot: true,
      act: async (page) => {
        await page.keyboard.press('Escape');
        await page.waitForTimeout(1500);
        await page.evaluate(async () => { const m = await import('/src/share/supportprompt.js'); m.showSupportPrompt('pb', {}); });
        await page.waitForTimeout(1500);
      }
    },
    {
      id: 'w-lk6', page: 'c1-p14e-2', panel: 'n3', world: 'frontPhone', viewport: [400, 860], clip: [0, 0, 400, 740],
      act: async (page) => { await page.getByRole('button', { name: /menu/i }).first().click(); await page.waitForTimeout(1500); }
    },
    /* ---- Also this week ---- */
    {
      id: 'w-aw1', page: 'c1-p14f', panel: 'n1', world: 'padView', viewport: [440, 560], page_shot: true,
      act: async (page) => { await page.evaluate(() => window.__stick(0.65, 0.55, -0.45, 0.0)); await page.waitForTimeout(1500); }
    },
    {
      id: 'w-aw2', page: 'c1-p14f', panel: 'n2', world: 'simRates', viewport: [600, 820], clip: [20, 110, 560, 700],
      act: async (page) => {
        await page.evaluate(() => window.__ui.show('credits'));
        await page.waitForTimeout(2000);
        for (let i = 0; i < 2; i += 1) { await page.keyboard.press('ArrowDown'); await page.waitForTimeout(300); }
        await page.waitForTimeout(1000);
      }
    },
    { id: 'w-aw3', page: 'c1-p14f', panel: 'n3', world: 'frontDesk', viewport: [1280, 920] },
    {
      /* Cropped below the GPU row, left of the words beside the menu, and
       * with no key pressed, so Input to screen still asks for keys: on this
       * machine the row, the words and any reading describe a software
       * renderer, not a pilot's computer. */
      id: 'w-aw4', page: 'c1-p14f-2', panel: 'n1', world: 'simRates', viewport: [1280, 900], clip: [0, 300, 912, 570],
      act: async (page) => { await page.evaluate(() => window.__ui.show('advanced')); await page.waitForTimeout(2000); }
    },
    {
      id: 'w-aw5', page: 'c1-p14f-2', panel: 'n2', world: 'padView', viewport: [560, 720], page_shot: true,
      act: async (page) => { await page.keyboard.press('Escape'); await page.waitForTimeout(1500); }
    },
    {
      /* Gate 3 of 25 made the race's next gate, the lens eight metres back
       * along the way in, and the cue's brackets and distance on it. */
      id: 'w-aw6', page: 'c1-p14f-2', panel: 'n3', world: 'padCue', viewport: [560, 720], page_shot: true,
      act: async (page) => {
        await page.evaluate(() => { const u = window.__ui; const set = u.setBanner.bind(u); u.setBanner = () => set(''); });
        await page.evaluate(async () => {
          window.__setRaceNext(2); await new Promise((r) => setTimeout(r, 300));
          const g = window.__nextGate(); const prev = g.gates[0].world; const nxt = g.gates[1].world;
          window.__setRaceNext(3); await new Promise((r) => setTimeout(r, 300));
          const dx = prev.x - nxt.x; const dz = prev.z - nxt.z; const L = Math.hypot(dx, dz);
          window.__setCam(nxt.x + (dx / L) * 8, nxt.y + 0.5, nxt.z + (dz / L) * 8, nxt.x, nxt.y, nxt.z);
        });
        await page.waitForTimeout(2000);
      }
    },
  ]
};
