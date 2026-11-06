/*
 * The front page's Supporters block for Chapter 9 (page 8, panel b): the
 * front page's checkout served with a static server on 8766
 * (python3 -m http.server 8766), its boot screen hidden, every outside
 * request refused, and the frame cut to the Supporters row alone, without
 * the owner's address or the rest of the footer. Run it with tools/survey's
 * Playwright: cd tools/survey && node ../shoot/c9-landing.js
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const { chromium } = require(require('path').join(__dirname, '..', 'survey', 'node_modules', 'playwright'));
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 900, height: 600 }, deviceScaleFactor: 2 });
  await p.route(/^https:\/\//, (r) => r.abort());
  await p.goto('http://127.0.0.1:8766/index.html', { waitUntil: 'domcontentloaded' });
  await p.waitForTimeout(4000); await p.addStyleTag({ content: '#boot{display:none !important}' });
  const el = await p.$('.supporter-marks');
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1500);
  const bb = await el.boundingBox();
  console.log(JSON.stringify(bb));
  const pad = 40;
  await p.screenshot({ path: '/mnt/project-files/chapter-9/frames/landing-supporters.png', clip: { x: 30, y: bb.y - 22, width: 480, height: bb.height + 50 } });
  await b.close();
})();
