/*
 * Ink a chapter's frames into the book's pictures.
 *
 *   node tools/ink/panels.js c1            every shot
 *   node tools/ink/panels.js c1 p3 p4-a    just these
 *
 * Two treatments, both the front door's (webfpv.org):
 *
 *   colour  the simulator's own picture, cut to its panel. The chapter tier
 *           on the front door's first screen is this: the game, in a frame.
 *   paper   the front door's studio, the look src/manga.js gives act one
 *           there: paper for a ground and a sky, the quad in its own colours
 *           and ink hulls, and its cast shadow as a 45 degree dot tone, each
 *           dot as big as the shadow under it, at the frame's height over
 *           180 and never under 4 pixels. A horizon, where the shot has one,
 *           is one ink line.
 *
 * Each picture is written twice, @1x for a page 720 pixels wide and @2x for
 * one 1440 wide, and the dots are drawn at each size rather than shrunk, so
 * neither one is a halftone resampled into a moire.
 *
 * Needs sharp: npm install --prefix tools/ink
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const Layout = require('../../docs/layout.js');
const CHAPTERS = require('../../docs/chapters.js');

function sharpLib() {
  const local = path.join(__dirname, 'node_modules', 'sharp');
  if (fs.existsSync(local)) return require(local);
  return require('sharp');
}
const sharp = sharpLib();

const PAPER = [247, 240, 220];
const INK = [11, 17, 22];
/* The front door's tone: pitch is the frame height over 180, which on a
 * 1414 unit page is 7.86 units, and a dot at full shadow covers what a
 * 0.62 amount does in its shader. */
const PITCH_UNITS = 1414 / 180;
const TONE_K = 0.62;
const SCALES = [['@1x', 0.72], ['@2x', 1.44]];

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function smooth(e0, e1, x) { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); }

function boxFor(chapter, job) {
  const page = chapter.pages.find((p) => p.id === job.page);
  const L = Layout.layoutPage(page);
  return Layout.visibleBox(L[job.panel].box);
}

async function raw(file) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height };
}

/*
 * The quad's cut out, from the matte pass: its distance from the magenta
 * key is its alpha, and an edge pixel's colour is unmixed from the key so
 * no pink fringe is left on the paper.
 */
function cutOut(m) {
  const n = m.w * m.h;
  const key = [m.data[0], m.data[1], m.data[2]];
  const rgba = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i += 1) {
    const r = m.data[i * 3];
    const g = m.data[i * 3 + 1];
    const b = m.data[i * 3 + 2];
    const d = Math.hypot(r - key[0], g - key[1], b - key[2]);
    const a = smooth(28, 110, d);
    let cr = r;
    let cg = g;
    let cb = b;
    if (a > 0.01 && a < 0.999) {
      cr = clamp((r - (1 - a) * key[0]) / a, 0, 255);
      cg = clamp((g - (1 - a) * key[1]) / a, 0, 255);
      cb = clamp((b - (1 - a) * key[2]) / a, 0, 255);
    }
    rgba[i * 4] = cr;
    rgba[i * 4 + 1] = cg;
    rgba[i * 4 + 2] = cb;
    rgba[i * 4 + 3] = Math.round(a * 255);
  }
  return rgba;
}

/*
 * How much shadow is under each pixel of the shadow pass, from 0 to 1, and
 * where the horizon is in each column. The white ground is not white where
 * it is lit at a slant, so each row is measured against its own lit level.
 */
function shadowMap(s, alpha, opts) {
  const { w, h, data } = s;
  const L = new Float32Array(w * h);
  for (let i = 0; i < w * h; i += 1) {
    L[i] = (0.2126 * data[i * 3] + 0.7152 * data[i * 3 + 1] + 0.0722 * data[i * 3 + 2]) / 255;
  }
  const horizon = new Int32Array(w).fill(-1);
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < h; y += 1) {
      if (L[y * w + x] < 0.975) { horizon[x] = y; break; }
    }
  }
  /* Keep the quad's own outline out of the shadow: the post pass inks a
   * silhouette even when the quad itself is not drawn. */
  const near = new Uint8Array(w * h);
  const R = Math.max(2, Math.round(w / 300));
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      if (alpha[(y * w + x) * 4 + 3] < 20) continue;
      for (let dy = -R; dy <= R; dy += 1) {
        const yy = y + dy;
        if (yy < 0 || yy >= h) continue;
        for (let dx = -R; dx <= R; dx += 1) {
          const xx = x + dx;
          if (xx >= 0 && xx < w) near[yy * w + xx] = 1;
        }
      }
    }
  }
  const amt = new Float32Array(w * h);
  const row = [];
  for (let y = 0; y < h; y += 1) {
    row.length = 0;
    for (let x = 0; x < w; x += 1) {
      if (horizon[x] >= 0 && y > horizon[x] + 1) row.push(L[y * w + x]);
    }
    if (!row.length) continue;
    row.sort((a, b) => a - b);
    const lit = row[Math.floor(row.length * 0.9)];
    for (let x = 0; x < w; x += 1) {
      const i = y * w + x;
      if (near[i] || horizon[x] < 0 || y <= horizon[x] + 1) continue;
      amt[i] = smooth(0.06, 0.4, (lit - L[i]) / Math.max(0.05, lit));
    }
  }
  return { amt, horizon };
}

/* The 45 degree grid, a dot as big as the amount under it, antialiased. */
function dots(amount, x, y, pitch) {
  if (amount < 0.015) return 0;
  const gx = (x + 0.5) / pitch;
  const gy = (y + 0.5) / pitch;
  const u = (gx + gy) * Math.SQRT1_2;
  const v = (gx - gy) * Math.SQRT1_2;
  const cu = u - Math.floor(u) - 0.5;
  const cv = v - Math.floor(v) - 0.5;
  const dist = Math.hypot(cu, cv) * pitch;
  const rad = Math.sqrt(clamp(amount, 0, 1)) * 0.46 * pitch;
  return 1 - smooth(rad - 0.6, rad + 0.6, dist);
}

async function resizeRaw(buf, w, h, channels, W, H) {
  const out = await sharp(buf, { raw: { width: w, height: h, channels } })
    .resize(W, H, { fit: 'fill', kernel: 'lanczos3' })
    .raw()
    .toBuffer();
  return out;
}

/* Cut a frame to an aspect, round a focus point (shares of the frame). */
function cropFor(w, h, aspect, focus) {
  let cw = w;
  let ch = Math.round(w / aspect);
  if (ch > h) { ch = h; cw = Math.round(h * aspect); }
  const fx = focus ? focus[0] : 0.5;
  const fy = focus ? focus[1] : 0.5;
  const left = clamp(Math.round(w * fx - cw / 2), 0, w - cw);
  const top = clamp(Math.round(h * fy - ch / 2), 0, h - ch);
  return { left, top, width: cw, height: ch };
}

async function inkPaper(job, box, src, outBase) {
  const m = await raw(src + '.matte.png');
  const s = await raw(src + '.shadow.png');
  const quad = cutOut(m);
  const { amt, horizon } = shadowMap(s, quad, job);
  const aspect = box.w / box.h;
  const crop = cropFor(m.w, m.h, aspect, job.focus);
  const results = [];
  for (const [suffix, k] of SCALES) {
    const W = Math.round(box.w * k);
    const H = Math.round(box.h * k);
    const quadC = await sharp(quad, { raw: { width: m.w, height: m.h, channels: 4 } }).extract(crop).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).raw().toBuffer();
    const amt8 = Buffer.alloc(m.w * m.h);
    for (let i = 0; i < amt.length; i += 1) amt8[i] = Math.round(amt[i] * 255);
    const amtC = await sharp(amt8, { raw: { width: m.w, height: m.h, channels: 1 } }).extract(crop).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).raw().toBuffer();
    const pitch = Math.max(4, PITCH_UNITS * (W / box.w));
    const lineW = Math.max(1.2, 1.1 * (W / box.w));
    const out = Buffer.alloc(W * H * 3);
    const hz = new Float32Array(W).fill(-1);
    if (job.horizon !== false) {
      for (let X = 0; X < W; X += 1) {
        const sx = crop.left + Math.floor(((X + 0.5) / W) * crop.width);
        const y0 = horizon[clamp(sx, 0, m.w - 1)];
        hz[X] = y0 < 0 ? -1 : ((y0 - crop.top) / crop.height) * H;
      }
    }
    for (let Y = 0; Y < H; Y += 1) {
      for (let X = 0; X < W; X += 1) {
        const i = Y * W + X;
        let ink = dots((amtC[i] / 255) * TONE_K, X, Y, pitch);
        if (hz[X] >= 0) ink = Math.max(ink, 1 - smooth(lineW * 0.5 - 0.5, lineW * 0.5 + 0.5, Math.abs(Y - hz[X])));
        let r = PAPER[0] + (INK[0] - PAPER[0]) * ink;
        let g = PAPER[1] + (INK[1] - PAPER[1]) * ink;
        let b = PAPER[2] + (INK[2] - PAPER[2]) * ink;
        const a = quadC[i * 4 + 3] / 255;
        if (a > 0) {
          r = r * (1 - a) + quadC[i * 4] * a;
          g = g * (1 - a) + quadC[i * 4 + 1] * a;
          b = b * (1 - a) + quadC[i * 4 + 2] * a;
        }
        out[i * 3] = r;
        out[i * 3 + 1] = g;
        out[i * 3 + 2] = b;
      }
    }
    const file = outBase + suffix + '.webp';
    await sharp(out, { raw: { width: W, height: H, channels: 3 } }).webp({ quality: 88, effort: 6, smartSubsample: true }).toFile(file);
    results.push([path.basename(file), W, H, fs.statSync(file).size]);
  }
  return { results, crop };
}

async function inkColour(job, box, src, outBase) {
  const meta = await sharp(src + '.png').metadata();
  const aspect = box.w / box.h;
  const crop = cropFor(meta.width, meta.height, aspect, job.focus);
  const results = [];
  for (const [suffix, k] of SCALES) {
    const W = Math.round(box.w * k);
    const H = Math.round(box.h * k);
    const file = outBase + suffix + '.webp';
    await sharp(src + '.png').extract(crop).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).webp({ quality: suffix === '@2x' ? 80 : 82, effort: 6 }).toFile(file);
    results.push([path.basename(file), W, H, fs.statSync(file).size]);
  }
  return { results, crop };
}

async function main() {
  const args = process.argv.slice(2);
  const chapterId = args[0];
  const only = args.slice(1);
  const spec = require(path.join(ROOT, 'tools', 'shoot', chapterId + '.js'));
  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  const jobs = spec.shots.concat(spec.reuse || []).filter((s) => !only.length || only.includes(s.id));
  const outDir = path.join(ROOT, 'docs', 'assets', 'chapters', chapterId);
  fs.mkdirSync(outDir, { recursive: true });
  for (const job of jobs) {
    const box = boxFor(chapter, job);
    const srcId = job.from || job.id;
    const src = path.join(ROOT, 'captures', chapterId, srcId);
    const from = spec.shots.find((s) => s.id === srcId) || job;
    const paper = Boolean(from.paper);
    const sideIn = fs.existsSync(src + '.json') ? JSON.parse(fs.readFileSync(src + '.json', 'utf8')) : {};
    const outBase = path.join(outDir, job.id);
    const r = paper ? await inkPaper(Object.assign({}, from.paper, job), box, src, outBase) : await inkColour(job, box, src, outBase);
    const side = {
      id: job.id,
      treatment: paper ? 'paper' : 'colour',
      from: srcId,
      world: sideIn.world || null,
      simulator: sideIn.simulator || null,
      commit: sideIn.commit || null,
      frame: sideIn.frame || null,
      crop: r.crop,
      framing: sideIn.framing || null,
      clip: sideIn.clip || null
    };
    fs.writeFileSync(outBase + '.json', JSON.stringify(side, null, 2) + '\n');
    process.stdout.write(job.id + ' ' + r.results.map((x) => `${x[0]} ${x[1]}x${x[2]} ${Math.round(x[3] / 1024)}k`).join('  ') + '\n');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
