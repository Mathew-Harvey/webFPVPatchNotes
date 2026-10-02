/*
 * Check the book's words and the files it names.
 *
 *   node tools/check/text.js
 *
 * Rejects an em dash, an en dash, or CJK anywhere in the book and the
 * writing round it. Then reads docs/chapters.js the way the reader does and
 * checks that every page lays out, every panel has an alt, every picture a
 * panel names is on disk at both sizes, every word sits in a panel of its
 * own page, and the book ends on its one link out, to the simulator.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SKIP = new Set(['node_modules', 'captures', '_upstream', '.git']);
const bad = [];

function walk(dir, out) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
}

const files = [];
for (const name of fs.readdirSync(ROOT)) {
  if (SKIP.has(name)) continue;
  const full = path.join(ROOT, name);
  if (fs.statSync(full).isDirectory()) {
    if (name === 'docs' || name === 'tools') walk(full, files);
  } else {
    files.push(full);
  }
}

const dash = /[\u2013\u2014]/;
const cjk = /[\u3000-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uac00-\ud7af\uff00-\uffef]/;
const TEXT = /\.(md|html|js|css|json|yml|yaml|txt)$/i;

for (const file of files) {
  if (!TEXT.test(file) && path.basename(file) !== 'LICENSE') continue;
  const lines = fs.readFileSync(file, 'utf8').split(/\n/);
  lines.forEach((line, i) => {
    if (dash.test(line)) bad.push(`${path.relative(ROOT, file)}:${i + 1} dash`);
    if (cjk.test(line)) bad.push(`${path.relative(ROOT, file)}:${i + 1} cjk`);
  });
}

const Layout = require(path.join(ROOT, 'docs', 'layout.js'));
const CHAPTERS = require(path.join(ROOT, 'docs', 'chapters.js'));
const KINDS = new Set(['cap', 'note', 'say', 'think', 'shout', 'tag', 'letter', 'head', 'sub', 'fly']);
const pageIds = new Set();
let panels = 0;
let pictures = 0;
const flies = [];

for (const ch of CHAPTERS) {
  if (!ch.id || !ch.title || !Array.isArray(ch.pages) || !ch.pages.length) bad.push(`chapter ${ch.id || '?'} is missing an id, a title or pages`);
  for (const page of ch.pages || []) {
    const where = `${ch.id}/${page.id}`;
    if (!page.id || pageIds.has(page.id)) bad.push(`${where} has no id, or one used twice`);
    pageIds.add(page.id);
    if (!page.label) bad.push(`${where} has no label`);
    let L = null;
    try {
      L = Layout.layoutPage(page);
    } catch (err) {
      bad.push(`${where} does not lay out: ${err.message}`);
      continue;
    }
    const ids = new Set();
    for (const p of page.panels || []) {
      panels += 1;
      if (!p.id || ids.has(p.id)) bad.push(`${where} has a panel with no id, or one used twice`);
      ids.add(p.id);
      if (!L[p.id]) bad.push(`${where}/${p.id} is not cut by the layout`);
      if (!p.alt || p.alt.length < 8) bad.push(`${where}/${p.id} has no alt`);
      if (p.art) {
        pictures += 1;
        for (const scale of ['@1x', '@2x']) {
          const rel = path.join('docs', 'assets', 'chapters', p.art + scale + '.webp');
          if (!fs.existsSync(path.join(ROOT, rel))) bad.push(`${where}/${p.id} names ${rel}, which is not there`);
        }
      }
      if (p.link && !(ch.pages || []).some((q) => q.id === p.link)) bad.push(`${where}/${p.id} links to ${p.link}, which is not a page`);
    }
    for (const w of page.words || []) {
      if (!KINDS.has(w.k)) bad.push(`${where} has a word of no known kind: ${w.k}`);
      if (w.in && !ids.has(w.in)) bad.push(`${where} has a word in ${w.in}, which is not one of its panels`);
      if (w.k === 'letter' && (!Array.isArray(w.runs) || !w.runs.length)) bad.push(`${where} has lettering with no runs`);
      if (w.k !== 'letter' && w.k !== 'fly' && !w.t) bad.push(`${where} has an empty ${w.k}`);
      if (w.k === 'fly') flies.push({ where, w });
    }
  }
}

if (flies.length !== 1) bad.push(`the book has ${flies.length} links out, not one`);
else {
  const { where, w } = flies[0];
  if (w.href !== 'https://webfpv.org/sim/') bad.push(`${where} links out to ${w.href}, not the simulator`);
  const last = CHAPTERS[CHAPTERS.length - 1];
  if (!where.endsWith('/' + last.pages[last.pages.length - 1].id)) bad.push(`the link out is on ${where}, not the last page`);
}

const html = fs.readFileSync(path.join(ROOT, 'docs', 'index.html'), 'utf8');
for (const src of ['layout.js', 'chapters.js']) {
  if (!html.includes(`<script src="${src}"`)) bad.push(`docs/index.html does not load ${src}`);
}

if (bad.length) {
  bad.forEach((row) => process.stderr.write(row + '\n'));
  process.exit(1);
}
process.stdout.write(`text check ok, ${CHAPTERS.length} chapter, ${pageIds.size} pages, ${panels} panels, ${pictures} pictures\n`);
