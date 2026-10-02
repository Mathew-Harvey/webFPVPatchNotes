const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: ['--use-angle=default', '--enable-gpu', '--disable-frame-rate-limit'],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.addInitScript(() => {
    localStorage.setItem('webfpv.settings.v3', JSON.stringify({
      airframeAsked: true,
      airframe: '5inch',
      keyRaceMode: 'angle',
      graphics: 'high',
      graphicsAuto: false,
      sound: false,
      map: 'custom',
    }));
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      process.stdout.write(`console ${msg.text()}\n`);
    }
  });
  await page.goto('http://127.0.0.1:8765/?map=custom', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction(() => window.__shellReady === true, null, { timeout: 120000 });
  const before = await page.evaluate(() => ({
    screen: window.__screen,
    mode: window.__mode,
    text: document.body.innerText.slice(0, 800),
  }));
  process.stdout.write(`BEFORE ${JSON.stringify(before).slice(0, 1500)}\n`);
  await page.getByText('Five inch racing', { exact: false }).first().click();
  await page.waitForTimeout(1200);
  const courses = await page.evaluate(() => document.body.innerText.slice(0, 1800));
  process.stdout.write(`COURSES ${courses}\n`);
  const fly = page.getByText('Fly', { exact: false }).first();
  if (await fly.count()) {
    await fly.click();
    await page.waitForTimeout(2500);
  }
  const after = await page.evaluate(() => ({
    screen: window.__screen,
    mode: window.__mode,
    map: window.__map ? window.__map() : null,
    craft: window.__craftState ? window.__craftState() : null,
    gate: window.__nextGate ? window.__nextGate() : null,
  }));
  const slim = {
    screen: after.screen,
    mode: after.mode,
    world: after.craft && {
      x: after.craft.worldX, y: after.craft.worldY, z: after.craft.worldZ,
      landed: after.craft.landed, speed: after.craft.speed, pitch: after.craft.pitchDeg,
    },
    gate: after.gate && {
      gateless: after.gate.gateless,
      n: after.gate.gates ? after.gate.gates.length : 0,
      keys: Object.keys(after.gate),
    },
  };
  process.stdout.write(`AFTER ${JSON.stringify(slim)}\n`);
  await page.screenshot({ path: 'C:/Users/mathe/Documents/dev/webFPVPatchNotes/captures/survey/probe-flight.png' });
  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
