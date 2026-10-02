const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const out = path.resolve(__dirname, '../../captures/survey');
fs.mkdirSync(out, { recursive: true });

const pages = [
  ['home', 'https://webfpv.org/', 12000],
  ['sim', 'https://webfpv.org/sim/', 22000],
  ['board', 'https://webfpv.org/board/', 10000],
  ['builder', 'https://webfpv.org/sim/src/trackbuilder/index.html', 18000],
  ['notes', 'https://webfpv.org/notes/', 6000],
  ['stickers', 'https://webfpv.org/stickers/', 6000],
];

async function shoot(browser, label, viewport, mobile) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: mobile ? 2 : 1,
    isMobile: mobile,
    hasTouch: mobile,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(60000);
  for (const [name, url, wait] of pages) {
    process.stdout.write(`${label} ${name}\n`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(wait);
    const text = await page.locator('body').innerText().catch(() => '');
    fs.writeFileSync(path.join(out, `${name}-${label}.txt`), text.slice(0, 12000), 'utf8');
    await page.screenshot({ path: path.join(out, `${name}-${label}.png`) });
    const webgl = /needs WebGL/i.test(text);
    process.stdout.write(`  chars ${text.length} webgl-block ${webgl}\n`);
  }
  await context.close();
}

(async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: ['--use-angle=default', '--enable-gpu'],
  });
  await shoot(browser, 'desktop', { width: 1440, height: 900 }, false);
  await shoot(browser, 'phone', { width: 390, height: 844 }, true);
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
