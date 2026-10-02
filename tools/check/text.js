/*
 * Reject an em dash, an en dash, or CJK in the book and the writing around it.
 * Also check that every inked panel file named in the reader exists.
 *
 * node tools/check/text.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const bad = [];

function walk(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === 'captures' || name === '_upstream') continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, out);
    else out.push(full);
  }
}

const files = [];
for (const name of fs.readdirSync(ROOT)) {
  if (name === 'node_modules' || name === 'captures' || name === '_upstream') continue;
  const full = path.join(ROOT, name);
  const stat = fs.statSync(full);
  if (stat.isDirectory()) {
    if (name === 'docs' || name === 'tools') walk(full, files);
  } else if (/\.(md|html|js|yml|yaml)$/.test(name) || name === 'LICENSE') {
    files.push(full);
  }
}

const dash = /[\u2013\u2014]/;
const cjk = /[\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uff00-\uffef]/;

const TEXT = /\.(md|html|js|css|json|yml|yaml|txt)$/i;

for (const file of files) {
  if (file.includes(`${path.sep}vendor${path.sep}fonts${path.sep}OFL`)) continue;
  if (!TEXT.test(file) && path.basename(file) !== 'LICENSE') continue;
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\n/);
  lines.forEach((line, i) => {
    if (dash.test(line)) bad.push(`${path.relative(ROOT, file)}:${i + 1} dash`);
    if (cjk.test(line)) bad.push(`${path.relative(ROOT, file)}:${i + 1} cjk`);
  });
}

const html = fs.readFileSync(path.join(ROOT, 'docs', 'index.html'), 'utf8');
const srcs = html.match(/assets\/chapters\/[^"' ]+@1x\.webp/g) || [];
if (!srcs.length) bad.push('docs/index.html has no panel images');
for (const src of srcs) {
  for (const scale of ['@1x', '@2x']) {
    const rel = src.replace('@1x', scale);
    if (!fs.existsSync(path.join(ROOT, 'docs', rel))) bad.push('missing ' + rel);
  }
}
if (!html.includes('https://webfpv.org/sim/')) bad.push('fly link missing');
if (!html.includes('alt:')) bad.push('alt fields missing');
if (!html.includes('transcript:')) bad.push('transcript fields missing');

if (bad.length) {
  bad.forEach((row) => process.stderr.write(row + '\n'));
  process.exit(1);
}
process.stdout.write('text check ok, ' + srcs.length + ' panels\n');
