/*
 * Ink chosen flight frames into cream paper and graphite, with mint kept
 * on the gate. Narration is not baked. It stays live text in the reader.
 *
 * node tools/ink/ink.js
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..', '..');
const SRC = path.join(ROOT, 'captures', 'c1');
const OUT = path.join(ROOT, 'docs', 'assets', 'chapters', 'c1');

const PAPER = [243, 234, 212];
const INK = [12, 18, 14];
const MINT = [125, 255, 180];

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

const jobs = [
  {
    id: 'c1-cover',
    file: 'debug_a1.png',
    cover: true,
    speed: true,
    paintWidth: 1200,
    note: 'Portrait crop on the gate from a fast approach. The crash notice sits above this crop. The weight label shows through the gate glow.',
  },
  {
    id: 'c1-p1-a',
    file: 'c1-p1-a_a1_fpv_1.png',
    extract: { left: 0, top: 0, width: 1920, height: 1080 },
    note: 'Wide approach. The glass reads 14 m, 8 km/h, 2.0 m, ANGLE.',
  },
  {
    id: 'c1-p1-b',
    file: 'c1-p1-a_a1_fpv_2.png',
    extract: { left: 0, top: 0, width: 1920, height: 1080 },
    note: 'Closer, still level. The glass reads 12 m, 12 km/h, 1.3 m.',
  },
  {
    id: 'c1-p1-c',
    file: 'c1-p1-a_a1_fpv_3.png',
    dropYellow: true,
    speed: true,
    note: 'Low and fast. The glass reads 10 m and 30 km/h. Faint crash notice cropped off the top.',
  },
  {
    id: 'c1-p2-a',
    file: 'c1-p1-b_a1_fpv_2.png',
    extract: { left: 0, top: 188, width: 1920, height: 892 },
    note: 'The miss. Gate edge and the red back of the gate at the bottom of the glass. 5 m, 1 bounce. Top buttons cropped.',
  },
  {
    id: 'c1-p2-b',
    file: 'c1-p1-c_a1_fpv_2.png',
    extract: { left: 0, top: 0, width: 1920, height: 1080 },
    note: 'The horizon tips. Gate marker off to the side.',
  },
  {
    id: 'c1-p2-c',
    file: 'c1-p2-c_a1_fpv_1.png',
    extract: { left: 0, top: 188, width: 1920, height: 892 },
    note: 'Sitting on the grass. The gate is still ahead. This frame has no crash sentence. Top buttons cropped.',
  },
  {
    id: 'c1-p3-a',
    file: 'c1-p1-a_a1_fpv_1.png',
    extract: { left: 0, top: 0, width: 1920, height: 1080 },
    note: 'The same first approach as c1-p1-a, framed again as the invitation. Not a second liftoff.',
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

function luma(r, g, b) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
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
  return {
    left,
    top,
    width,
    height,
    mintN: n,
    yellowBottom: cut,
    bbox: [minX, minY, maxX, maxY],
  };
}

function hash(x, y) {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return (h >>> 0) / 4294967295;
}

function inkPixels(data, w, h, speed) {
  const out = Buffer.alloc(w * h * 3);
  const cell = 4;
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const ms = mintScore(r, g, b);
      let yv = luma(r, g, b);
      const t = clamp((yv - 0.05) / 0.9, 0, 1);
      let density = Math.pow(1 - t, 1.22);
      const bx = Math.floor(x / cell) % 8;
      const by = Math.floor(y / cell) % 8;
      const threshold = BAYER[by][bx] / 63;
      density = clamp(density + (density - threshold) * 0.28, 0, 1);
      let rr = PAPER[0] + (INK[0] - PAPER[0]) * density;
      let gg = PAPER[1] + (INK[1] - PAPER[1]) * density;
      let bb = PAPER[2] + (INK[2] - PAPER[2]) * density;
      if (ms > 0.18) {
        const m = clamp((ms - 0.18) / 0.55, 0, 1);
        rr = rr * (1 - m) + MINT[0] * m;
        gg = gg * (1 - m) + MINT[1] * m;
        bb = bb * (1 - m) + MINT[2] * m;
      }
      const tooth = 0.955 + hash(x, y) * 0.07;
      const o = (y * w + x) * 3;
      out[o] = clamp(Math.round(rr * tooth), 0, 255);
      out[o + 1] = clamp(Math.round(gg * tooth), 0, 255);
      out[o + 2] = clamp(Math.round(bb * tooth), 0, 255);
    }
  }
  if (speed) drawSpeed(out, w, h);
  return out;
}

function drawSpeed(out, w, h) {
  for (let i = 0; i < 14; i += 1) {
    const y = Math.floor(((i + 0.4) * h) / 14);
    const fromLeft = i % 2 === 0;
    const len = Math.floor(w * (0.07 + (i % 5) * 0.018));
    const x0 = fromLeft ? 6 : w - len - 6;
    for (let t = 0; t < 2; t += 1) {
      const yy = Math.min(h - 1, y + t);
      for (let x = x0; x < x0 + len; x += 1) {
        const along = (x - x0) / len;
        const fade = fromLeft ? 1 - along : along;
        if (fade < 0.08) continue;
        const o = (yy * w + x) * 3;
        if (out[o + 1] > 200 && out[o + 2] > 150 && out[o + 1] > out[o] + 24) continue;
        const ink = fade * 190;
        out[o] = clamp(Math.round(out[o] - ink), 0, 255);
        out[o + 1] = clamp(Math.round(out[o + 1] - ink), 0, 255);
        out[o + 2] = clamp(Math.round(out[o + 2] - ink), 0, 255);
      }
    }
  }
}

async function pixelsOf(file, job) {
  const srcPath = path.join(SRC, file);
  const input = sharp(srcPath).rotate();
  const meta = await input.metadata();
  const full = await input.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let extract = job.extract || null;
  if (job.cover) {
    extract = coverExtract(full.data, full.info.width, full.info.height);
    process.stdout.write(
      `cover bbox ${extract.bbox.join(',')} yellow ${extract.yellowBottom} mint ${extract.mintN} crop ${extract.left},${extract.top} ${extract.width}x${extract.height}\n`
    );
  } else if (job.dropYellow) {
    const cut = yellowBottom(full.data, full.info.width, full.info.height);
    const top = cut ? cut + 18 : 0;
    extract = {
      left: 0,
      top,
      width: full.info.width,
      height: full.info.height - top,
    };
    process.stdout.write(`yellow crop ${job.id} top ${top}\n`);
  }
  if (!extract) extract = { left: 0, top: 0, width: meta.width, height: meta.height };
  const left = clamp(extract.left, 0, full.info.width - 2);
  const top = clamp(extract.top, 0, full.info.height - 2);
  const width = clamp(extract.width, 2, full.info.width - left);
  const height = clamp(extract.height, 2, full.info.height - top);
  let pipeline = sharp(srcPath).extract({ left, top, width, height });
  if (job.paintWidth && job.paintWidth > width) {
    pipeline = pipeline.resize({ width: job.paintWidth });
  }
  const cropped = await pipeline.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return {
    painted: inkPixels(cropped.data, cropped.info.width, cropped.info.height, job.speed),
    width: cropped.info.width,
    height: cropped.info.height,
    extract: { left, top, width, height },
    srcPath,
  };
}

async function one(job) {
  const frame = await pixelsOf(job.file, job);
  const base = sharp(frame.painted, {
    raw: { width: frame.width, height: frame.height, channels: 3 },
  });
  for (const scale of [1, 2]) {
    const width = scale === 1 ? 720 : 1440;
    const buf = await base
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 74, effort: 5 })
      .toBuffer();
    const name = `${job.id}@${scale}x.webp`;
    fs.writeFileSync(path.join(OUT, name), buf);
    process.stdout.write(`${name} ${buf.length}\n`);
  }
  const side = {
    id: job.id,
    source: path.relative(ROOT, frame.srcPath).replace(/\\/g, '/'),
    extract: frame.extract,
    commit: 'cbaee3f',
    course: 'tracks/json/trk-a75a1bc4.json',
    note: job.note,
  };
  fs.writeFileSync(path.join(OUT, `${job.id}.json`), JSON.stringify(side, null, 2));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const job of jobs) await one(job);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
