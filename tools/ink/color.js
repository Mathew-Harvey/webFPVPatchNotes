/*
 * Print the flight frames and the builder in colour.
 * The book keeps these WebP files. The words stay in the reader.
 *
 * node tools/ink/color.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'docs', 'assets', 'chapters', 'c1');

const jobs = [
  {
    id: 'gate-cover',
    file: 'captures/c1/debug_a1.png',
    cover: true,
    enlarge: 1400,
    note: 'Colour portrait on the gate. The crash notice sits above this crop.',
  },
  {
    id: 'gate-approach',
    file: 'captures/c1/c1-p1-a_a1_fpv_1.png',
    note: 'Colour approach. The glass reads 14 m, 8 km/h, 2.0 m, ANGLE.',
  },
  {
    id: 'gate-fast',
    file: 'captures/c1/c1-p1-a_a1_fpv_3.png',
    dropYellow: true,
    note: 'Colour, low and fast. Crash notice cropped off the top.',
  },
  {
    id: 'gate-level',
    file: 'captures/c1/c1-p1-a_a1_fpv_2.png',
    note: 'Colour, closer, level. The glass reads 12 m, 12 km/h, 1.3 m.',
  },
  {
    id: 'gate-sit',
    file: 'captures/c1/c1-p2-c_a1_fpv_1.png',
    extract: { left: 0, top: 188, width: 1920, height: 892 },
    note: 'Colour, sitting. The gate is still ahead. Top buttons cropped.',
  },
  {
    id: 'gate-miss',
    file: 'captures/c1/c1-p1-b_a1_fpv_2.png',
    extract: { left: 0, top: 188, width: 1920, height: 892 },
    note: 'Colour miss. Gate edge at the bottom of the glass. Top buttons cropped.',
  },
  {
    id: 'gate-tip',
    file: 'captures/c1/c1-p1-c_a1_fpv_2.png',
    note: 'Colour. The horizon tips. Sky and the field.',
  },
  {
    id: 'builder-worlds',
    file: 'captures/survey/builder-desktop.png',
    extract: { left: 170, top: 155, width: 1100, height: 520 },
    note: 'The builder asking what you are building: five inch, whoop room, freestyle town. Patreon is outside this crop.',
  },
  {
    id: 'whoop-room',
    file: 'captures/survey/builder-desktop.png',
    extract: { left: 545, top: 318, width: 300, height: 168 },
    enlarge: 1400,
    note: 'The whoop room picture from the builder card. English sign. No mass.',
  },
  {
    id: 'town',
    file: 'captures/survey/builder-desktop.png',
    extract: { left: 890, top: 318, width: 300, height: 168 },
    enlarge: 1400,
    note: 'The freestyle town from the builder card. Sakura is in the map art.',
  },
];

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function mintScore(r, g, b) {
  if (g < 165 || b < 95) return 0;
  if (g < r + 28 || b < r - 10) return 0;
  if (g < b - 10) return 0;
  return clamp((g - 150) / 105, 0, 1);
}

function isYellow(r, g, b) {
  return r > 200 && g > 155 && b < 110 && r > b + 80;
}

function yellowBottom(data, w, h) {
  let bottom = 0;
  const yMax = Math.floor(h * 0.46);
  for (let y = 0; y < yMax; y += 2) {
    let count = 0;
    for (let x = Math.floor(w * 0.15); x < w * 0.85; x += 3) {
      const i = (y * w + x) * 4;
      if (isYellow(data[i], data[i + 1], data[i + 2])) count += 1;
    }
    if (count > 6) bottom = y;
  }
  return bottom;
}

function coverExtract(data, w, h) {
  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  let n = 0;
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (y > h - 160 && x < w * 0.38) continue;
      const i = (y * w + x) * 4;
      if (mintScore(data[i], data[i + 1], data[i + 2]) < 0.4) continue;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      n += 1;
    }
  }
  const cut = yellowBottom(data, w, h);
  const topLimit = cut ? cut + 16 : 0;
  const cx = n ? (minX + maxX) / 2 : w / 2;
  const cy = n ? (minY + maxY) / 2 : h * 0.62;
  let height = h - topLimit;
  let top = topLimit;
  const gateH = n ? maxY - minY : height * 0.4;
  const want = Math.round(Math.max(gateH * 2.15, 760));
  height = Math.min(height, want);
  top = Math.round(cy - height * 0.58);
  if (top < topLimit) top = topLimit;
  if (top + height > h) height = h - top;
  let width = Math.round(height * 0.82);
  if (width > w) width = w;
  let left = Math.round(cx - width / 2);
  if (left < 0) left = 0;
  if (left + width > w) left = w - width;
  return { left, top, width, height };
}

async function one(job) {
  const srcPath = path.join(ROOT, job.file);
  const input = sharp(srcPath).rotate();
  const full = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let extract = job.extract || null;
  if (job.cover) extract = coverExtract(full.data, full.info.width, full.info.height);
  else if (job.dropYellow) {
    const cut = yellowBottom(full.data, full.info.width, full.info.height);
    const top = cut ? cut + 78 : 90;
    extract = { left: 0, top, width: full.info.width, height: full.info.height - top };
  }
  if (!extract) extract = { left: 0, top: 0, width: full.info.width, height: full.info.height };
  const left = clamp(Math.round(extract.left), 0, full.info.width - 2);
  const top = clamp(Math.round(extract.top), 0, full.info.height - 2);
  const width = clamp(Math.round(extract.width), 2, full.info.width - left);
  const height = clamp(Math.round(extract.height), 2, full.info.height - top);
  const base = sharp(srcPath).extract({ left, top, width, height });
  for (const scale of [1, 2]) {
    const target = scale === 1 ? Math.min(900, job.enlarge || 900) : (job.enlarge || 1600);
    const buf = await base.clone().resize({ width: target, withoutEnlargement: !job.enlarge }).webp({ quality: 82, effort: 5 }).toBuffer();
    const name = `${job.id}@${scale}x.webp`;
    fs.writeFileSync(path.join(OUT, name), buf);
    process.stdout.write(`${name} ${buf.length} ${width}x${height}\n`);
  }
  fs.writeFileSync(path.join(OUT, `${job.id}.json`), JSON.stringify({
    id: job.id,
    source: job.file.replace(/\\/g, '/'),
    extract: { left, top, width, height },
    colour: true,
    note: job.note,
  }, null, 2));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const job of jobs) await one(job);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
