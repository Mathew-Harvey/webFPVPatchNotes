/*
 * Open the book in Chrome and walk it like a reader.
 * node tools/check/read.js
 */
const fs = require('fs');
const path = require('path');
const { chromium } = require(path.join(__dirname, '..', 'survey', 'node_modules', 'playwright'));

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(process.env.TEMP || process.env.TMP || ROOT, 'webfpv-book');
const FILE = 'file:///' + path.join(ROOT, 'docs', 'index.html').replace(/\\/g, '/');

async function shot(page, name) {
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, fullPage: false });
  process.stdout.write('shot ' + name + '\n');
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
    args: ['--disable-gpu'],
  });
  const errors = [];
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await desktop.newPage();
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto(FILE);
  await page.waitForSelector('#book img');
  await page.waitForFunction(() => {
    const img = document.querySelector('#book img');
    return img && img.complete && img.naturalWidth > 0;
  });
  const coverAlt = await page.locator('#book img').first().getAttribute('alt');
  process.stdout.write('cover alt ' + (coverAlt || '').slice(0, 80) + '\n');
  process.stdout.write('where ' + (await page.locator('#where').innerText()) + '\n');
  await shot(page, 'desktop-cover');

  const box = await page.locator('#book').boundingBox();
  await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.72);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.28, box.y + box.height * 0.62, { steps: 12 });
  await shot(page, 'desktop-curl');
  await page.mouse.up();
  await page.waitForTimeout(1000);
  process.stdout.write('after drag ' + (await page.locator('#where').innerText()) + '\n');
  await shot(page, 'desktop-spread');
  const spread = await page.locator('#book').boundingBox();
  await page.mouse.move(spread.x + spread.width * 0.78, spread.y + spread.height * 0.62);
  await page.mouse.down();
  await page.mouse.move(spread.x + spread.width * 0.22, spread.y + spread.height * 0.5, { steps: 14 });
  await shot(page, 'desktop-spread-curl');
  await page.mouse.up();
  await page.waitForTimeout(1000);
  process.stdout.write('after spread drag ' + (await page.locator('#where').innerText()) + '\n');

  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(1000);
  process.stdout.write('after key ' + (await page.locator('#where').innerText()) + '\n');
  const fly = page.locator('a.fly');
  await page.keyboard.press('End');
  await page.waitForSelector('a.fly');
  process.stdout.write('fly count ' + (await fly.count()) + '\n');
  process.stdout.write('fly href ' + (await fly.getAttribute('href')) + '\n');
  process.stdout.write('fly name ' + (await fly.getAttribute('aria-label')) + '\n');
  process.stdout.write('captions ' + (await page.locator('.caption').count()) + '\n');
  process.stdout.write('balloon ' + (await page.locator('.balloon').count()) + '\n');
  await shot(page, 'desktop-end');

  await page.keyboard.press('Home');
  await page.waitForTimeout(400);
  process.stdout.write('home ' + (await page.locator('#where').innerText()) + '\n');
  await page.keyboard.press('End');
  await page.waitForTimeout(500);
  process.stdout.write('end ' + (await page.locator('#where').innerText()) + '\n');
  await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(1000);
  process.stdout.write('back ' + (await page.locator('#where').innerText()) + '\n');

  await page.click('#contents-btn');
  await page.click('#contents a[href="#c1-p1"]');
  await page.waitForTimeout(1000);
  process.stdout.write('contents ' + (await page.locator('#where').innerText()) + '\n');

  await page.click('#text-btn');
  await shot(page, 'desktop-text');
  const transcript = await page.locator('#book .transcript').first().innerText();
  process.stdout.write('transcript ' + transcript + '\n');
  await page.keyboard.press('Escape');
  const textPressed = await page.locator('#text-btn').getAttribute('aria-pressed');
  process.stdout.write('text after escape ' + textPressed + '\n');

  const wideOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  process.stdout.write('desktop overflow ' + wideOverflow + '\n');
  const missing = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('#book img'));
    const alts = imgs.filter((img) => !img.getAttribute('alt'));
    const figures = Array.from(document.querySelectorAll('#book figure'));
    const bare = figures.filter((fig) => !fig.querySelector('.transcript'));
    return { imgs: imgs.length, alts: alts.length, figures: figures.length, bare: bare.length };
  });
  process.stdout.write('a11y ' + JSON.stringify(missing) + '\n');

  await desktop.close();

  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    hasTouch: true,
  });
  const mobile = await phone.newPage();
  mobile.on('pageerror', (err) => errors.push('phone ' + err));
  await mobile.goto(FILE);
  await mobile.waitForSelector('#book img');
  await mobile.waitForFunction(() => {
    const img = document.querySelector('#book img');
    return img && img.complete && img.naturalWidth > 0;
  });
  await shot(mobile, 'phone-cover');
  for (let i = 1; i <= 3; i++) {
    await mobile.click('#next');
    await mobile.waitForTimeout(900);
    process.stdout.write('phone ' + i + ' ' + (await mobile.locator('#where').innerText()) + '\n');
    await shot(mobile, 'phone-p' + i);
  }
  const phoneOverflow = await mobile.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
  process.stdout.write('phone overflow ' + phoneOverflow + '\n');
  await mobile.keyboard.press('End');
  await mobile.waitForSelector('a.fly');
  const phoneFly = await mobile.locator('a.fly').getAttribute('href');
  process.stdout.write('phone fly ' + phoneFly + '\n');

  await mobile.click('#prev');
  await mobile.waitForTimeout(200);
  const swipeBox = await mobile.locator('#book').boundingBox();
  await mobile.mouse.move(swipeBox.x + swipeBox.width * 0.8, swipeBox.y + swipeBox.height * 0.5);
  await mobile.mouse.down();
  await mobile.mouse.move(swipeBox.x + swipeBox.width * 0.15, swipeBox.y + swipeBox.height * 0.5, { steps: 10 });
  await mobile.mouse.up();
  await mobile.waitForTimeout(1000);
  process.stdout.write('phone swipe ' + (await mobile.locator('#where').innerText()) + '\n');

  const still = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const stillPage = await still.newPage();
  await stillPage.goto(FILE + '#c1-cover');
  await stillPage.waitForSelector('#where');
  const motionLabel = await stillPage.locator('#motion-btn').innerText();
  process.stdout.write('reduced label ' + motionLabel + '\n');
  await stillPage.click('#next');
  await stillPage.waitForTimeout(400);
  process.stdout.write('reduced where ' + (await stillPage.locator('#where').innerText()) + '\n');
  await shot(stillPage, 'desktop-still');

  const flyPage = await desktopBrowserPage(browser);
  errors.forEach((err) => process.stdout.write('ERR ' + err + '\n'));
  await flyPage.goto(FILE + '#c1-next');
  await flyPage.waitForSelector('a.fly');
  await Promise.all([
    flyPage.waitForURL(/webfpv\.org\/sim\/?/, { timeout: 20000 }),
    flyPage.click('a.fly'),
  ]);
  process.stdout.write('opened ' + flyPage.url() + '\n');

  await browser.close();
  if (errors.length) process.exitCode = 1;
}

async function desktopBrowserPage(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  return ctx.newPage();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
