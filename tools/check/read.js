/*
 * Open the book in Chromium and read it the way a reader does.
 *
 *   node tools/check/read.js
 *
 * On a desk (1440 by 900, spreads) and on a phone (390 by 844, one page at
 * a time): walk every view with the arrow keys, wait for its pictures, and
 * fail on a picture that did not load, a page error, a page wider than the
 * window, or a link out that is not the simulator. Then the contents, the
 * text view, a drag and a swipe. Screenshots of every view go to OUT
 * (default: the system temp folder, webfpv-book), for a person to look at.
 *
 * Playwright comes from tools/survey (npm install --prefix tools/survey) or
 * NODE_PATH; PW_CHROMIUM names a Chromium to launch instead of Chrome.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

function playwright() {
  const local = path.join(__dirname, '..', 'survey', 'node_modules', 'playwright');
  if (fs.existsSync(local)) return require(local);
  return require('playwright');
}
const { chromium } = playwright();

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = process.env.OUT || path.join(os.tmpdir(), 'webfpv-book');
const FILE = 'file://' + (process.platform === 'win32' ? '/' : '') + path.join(ROOT, 'docs', 'index.html').replace(/\\/g, '/');
const problems = [];

function say(line) { process.stdout.write(line + '\n'); }

async function settle(page) {
  await page.waitForFunction(() => {
    const imgs = Array.from(document.querySelectorAll('#book .slot:not([hidden]) img, #book .leaf img'));
    return imgs.every((img) => img.complete);
  }, null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(250);
}

async function views(page) {
  return page.evaluate(() => {
    const c = window.__comic;
    return c.mode === 'spread' ? Math.ceil((c.flat.length + 1) / 2) : c.flat.length;
  });
}

async function walk(page, label) {
  const n = await views(page);
  for (let i = 0; i < n; i += 1) {
    await settle(page);
    const state = await page.evaluate(() => {
      const shown = Array.from(document.querySelectorAll('#book .slot img'));
      const broken = shown.filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.getAttribute('src'));
      const noAlt = shown.filter((img) => !img.getAttribute('alt')).length;
      const wide = document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
      return { where: document.getElementById('where').textContent, broken, noAlt, wide };
    });
    if (state.broken.length) problems.push(`${label} view ${i}: did not load ${state.broken.join(', ')}`);
    if (state.noAlt) problems.push(`${label} view ${i}: ${state.noAlt} pictures with no alt`);
    if (state.wide) problems.push(`${label} view ${i}: the page is wider than the window`);
    await page.screenshot({ path: path.join(OUT, `${label}-${String(i).padStart(2, '0')}.png`) });
    say(`${label} ${i} ${state.where}`);
    if (i < n - 1) {
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(label === 'desk' ? 1100 : 800);
    }
  }
  const fly = await page.locator('#book a.fly').evaluateAll((as) => as.map((a) => [a.getAttribute('href'), a.getAttribute('aria-label')]));
  if (fly.length !== 1 || fly[0][0] !== 'https://webfpv.org/sim/') problems.push(`${label}: the last view's link out is ${JSON.stringify(fly)}`);
  else say(`${label} fly ${fly[0][0]} (${fly[0][1]})`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const exe = process.env.PW_CHROMIUM;
  const browser = await chromium.launch(exe ? { executablePath: exe } : { channel: 'chrome' });
  const errors = [];

  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await desk.newPage();
  page.on('pageerror', (err) => errors.push('desk ' + err));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('desk ' + m.text()); });
  await page.goto(FILE);
  await page.waitForFunction(() => window.__comic && document.querySelector('#book .page'));
  say('desk mode ' + (await page.evaluate(() => window.__comic.mode)));
  await walk(page, 'desk');

  await page.keyboard.press('Home');
  await page.waitForTimeout(900);
  const box = await page.locator('#book').boundingBox();
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.7);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.6, { steps: 12 });
  await page.screenshot({ path: path.join(OUT, 'desk-drag.png') });
  await page.mouse.up();
  await page.waitForTimeout(1200);
  say('desk after drag ' + (await page.locator('#where').innerText()));

  await page.click('#contents-btn');
  const rows = await page.locator('#contents a').count();
  if (!rows) problems.push('the contents sheet is empty');
  await page.locator('#contents a').nth(Math.min(5, rows - 1)).click();
  await page.waitForTimeout(1200);
  say(`contents ${rows} rows, jumped to ${await page.locator('#where').innerText()}`);

  await page.click('#text-btn');
  await page.waitForTimeout(300);
  const script = await page.locator('#script').innerText();
  if (script.length < 800 || !script.includes('fly decent')) problems.push('the text view is short, or does not carry the question');
  say(`text view ${script.length} characters`);
  await page.screenshot({ path: path.join(OUT, 'desk-text.png') });
  await page.keyboard.press('Escape');
  await desk.close();

  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, isMobile: true });
  const mobile = await phone.newPage();
  mobile.on('pageerror', (err) => errors.push('phone ' + err));
  mobile.on('console', (m) => { if (m.type() === 'error') errors.push('phone ' + m.text()); });
  await mobile.goto(FILE);
  await mobile.waitForFunction(() => window.__comic && document.querySelector('#book .page'));
  say('phone mode ' + (await mobile.evaluate(() => window.__comic.mode)));
  await walk(mobile, 'phone');
  await mobile.keyboard.press('Home');
  await mobile.waitForTimeout(800);
  const b = await mobile.locator('#book').boundingBox();
  await mobile.mouse.move(b.x + b.width * 0.85, b.y + b.height * 0.5);
  await mobile.mouse.down();
  await mobile.mouse.move(b.x + b.width * 0.15, b.y + b.height * 0.5, { steps: 10 });
  await mobile.mouse.up();
  await mobile.waitForTimeout(1000);
  say('phone after swipe ' + (await mobile.locator('#where').innerText()));
  await phone.close();

  const still = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const sp = await still.newPage();
  sp.on('pageerror', (err) => errors.push('still ' + err));
  await sp.goto(FILE + '#c1-p5');
  await sp.waitForFunction(() => window.__comic && document.querySelector('#book .page'));
  await sp.click('#next');
  await sp.waitForTimeout(400);
  say('reduced motion ' + (await sp.locator('#where').innerText()));
  await still.close();

  await browser.close();
  errors.forEach((e) => problems.push(e));
  say('screenshots in ' + OUT);
  if (problems.length) {
    problems.forEach((p) => process.stderr.write('FAIL ' + p + '\n'));
    process.exit(1);
  }
  say('read check ok');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
