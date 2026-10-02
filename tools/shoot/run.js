/*
 * Shoot a chapter's pictures.
 *
 *   node tools/shoot/run.js c1            every shot in tools/shoot/c1.js
 *   node tools/shoot/run.js c1 p1-a p2-b  just these
 *   node tools/shoot/run.js c1 --scale=0.4   small, for a first look
 *
 * Each shot is framed for its panel: the panel's box on the page, from
 * docs/layout.js and docs/chapters.js, sets the shape of the frame, so a
 * picture is composed for the frame it will hang in rather than cropped to
 * it afterwards. Frames go to captures/<chapter>/, which is not served and
 * not committed; tools/ink/panels.js turns them into the book's pictures.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const fs = require('fs');
const path = require('path');
const rig = require('./rig');
const lineLib = require('./line');
const Layout = require('../../docs/layout.js');
const CHAPTERS = require('../../docs/chapters.js');

/* Pixels per page unit of the book's largest picture, and how much bigger
 * than that the frame is drawn, so the ink step always shrinks. */
const PX_PER_UNIT = 1.44;
const OVERSHOOT = 1.3;

function boxFor(chapter, shot) {
  if (shot.size) return { w: shot.size[0], h: shot.size[1] };
  const page = chapter.pages.find((p) => p.id === shot.page);
  if (!page) throw new Error('no page ' + shot.page);
  const L = Layout.layoutPage(page);
  const g = L[shot.panel];
  if (!g) throw new Error('no panel ' + shot.page + '/' + shot.panel);
  return Layout.visibleBox(g.box);
}

async function main() {
  const args = process.argv.slice(2);
  const chapterId = args[0];
  if (!chapterId) throw new Error('usage: node tools/shoot/run.js <chapter> [ids] [--scale=k]');
  const flags = Object.fromEntries(args.filter((a) => a.startsWith('--')).map((a) => {
    const [k, v] = a.slice(2).split('=');
    return [k, v === undefined ? true : v];
  }));
  const only = args.slice(1).filter((a) => !a.startsWith('--'));
  const scale = Number(flags.scale || 1);
  const spec = require(path.join(__dirname, chapterId + '.js'));
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  const out = path.join(rig.ROOT, 'captures', chapterId);
  fs.mkdirSync(out, { recursive: true });
  const shots = spec.shots.filter((s) => !only.length || only.includes(s.id));
  const groups = new Map();
  for (const s of shots) {
    if (!groups.has(s.world)) groups.set(s.world, []);
    groups.get(s.world).push(s);
  }
  const commit = rig.simCommit();
  const browser = await rig.launch();
  for (const [key, list] of groups) {
    const world = spec.worlds[key];
    if (!world) throw new Error('no world ' + key);
    process.stdout.write(`world ${key} (${list.length})\n`);
    const vp = world.viewport ? { width: world.viewport[0], height: world.viewport[1] } : { width: 1280, height: 720 };
    const { ctx, page } = await rig.open(browser, world, vp);
    for (const k of world.keys || []) {
      await page.keyboard.press(k);
      await page.waitForTimeout(1500);
    }
    let line = null;
    if (!world.path && !world.url && (world.track || world.preset)) line = lineLib.makeLine(await rig.line(page));
    for (const shot of list) {
      const box = boxFor(chapter, shot);
      let W;
      let H;
      if (shot.viewport) {
        [W, H] = shot.viewport;
      } else {
        W = Math.round(box.w * PX_PER_UNIT * OVERSHOOT * scale);
        H = Math.round((W * box.h) / box.w);
      }
      await page.setViewportSize({ width: W, height: H });
      await page.waitForTimeout(700);
      if (shot.ui) {
        await page.evaluate((s) => window.__ui.show(s), shot.ui);
        await page.waitForTimeout(1500);
      }
      if (shot.scroll) {
        await page.evaluate((y) => {
          const el = document.querySelector(y.sel);
          if (el) el.scrollTop = y.top;
        }, shot.scroll);
        await page.waitForTimeout(600);
      }
      /* The simulator's own manga strokes, on a freestyle map, held on. */
      await page.evaluate((on) => {
        if (!window.__manga) return;
        window.__manga.force(on ? { lines: 1, focus: [0.5, 0.42] } : null);
        window.__manga.tone(true);
      }, Boolean(shot.lines)).catch(() => {});
      let framing = null;
      if (shot.make) {
        framing = shot.make(line, lineLib, { aspect: W / H });
        await rig.pose(page, framing);
      }
      const base = path.join(out, shot.id);
      const clip = shot.clip ? { x: shot.clip[0], y: shot.clip[1], width: shot.clip[2], height: shot.clip[3] } : null;
      const settle = shot.settle || 1600;
      if (shot.paper) {
        await rig.paperPass(page, 'matte', shot.paper.probes, shot.paper.sun);
        await rig.snap(page, base + '.matte.png', settle);
        await rig.paperPass(page, 'shadow', shot.paper.probes, shot.paper.sun);
        await rig.snap(page, base + '.shadow.png', settle);
        await rig.paperPass(page, 'world');
      } else if (world.path || world.url || world.ui || shot.ui) {
        await page.waitForTimeout(settle);
        await page.screenshot({ path: base + '.png', clip: clip || undefined });
      } else {
        await rig.snap(page, base + '.png', settle, clip);
      }
      const side = {
        id: shot.id,
        chapter: chapterId,
        page: shot.page || null,
        panel: shot.panel || null,
        world: key,
        simulator: world.path || world.url || null,
        commit,
        frame: [W, H],
        framing,
        clip: shot.clip || null,
        paper: Boolean(shot.paper),
        note: shot.note || ''
      };
      fs.writeFileSync(base + '.json', JSON.stringify(side, null, 2));
      process.stdout.write(`  ${shot.id} ${W}x${H}${shot.paper ? ' paper' : ''}\n`);
    }
    await ctx.close();
  }
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
