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
 * 1414 unit page is 7.86 units, and a dot under a full shadow is as heavy
 * as the front door prints the shadow of its quad, a little over half ink. */
const PITCH_UNITS = 1414 / 180;
const TONE_K = 0.85;
/* The ink line round the quad, the front door's hull, in page units: one
 * weight on every page, as a pen has, whatever size the quad is drawn. */
const HULL_UNITS = 2.6;
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
 * no pink fringe is left on the paper. The simulator vignettes its frame,
 * so the key is not one colour: it is the clean magenta round each pixel,
 * averaged over a window from a summed area table, and what fringe the
 * unmixing leaves at the very edge is pulled back toward grey.
 */
function isKey(r, g, b) { return g < 70 && r > 150 && b > 140 && Math.abs(r - b) < 50; }
function cutOut(m) {
  const { w, h, data } = m;
  const n = w * h;
  const W1 = w + 1;
  const sum = [new Float64Array(W1 * (h + 1)), new Float64Array(W1 * (h + 1)), new Float64Array(W1 * (h + 1)), new Float64Array(W1 * (h + 1))];
  for (let y = 0; y < h; y += 1) {
    const row = [0, 0, 0, 0];
    for (let x = 0; x < w; x += 1) {
      const i = y * w + x;
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      if (isKey(r, g, b)) { row[0] += r; row[1] += g; row[2] += b; row[3] += 1; }
      const j = (y + 1) * W1 + x + 1;
      for (let c = 0; c < 4; c += 1) sum[c][j] = sum[c][j - W1] + row[c];
    }
  }
  const R = Math.max(8, Math.round(Math.max(w, h) / 40));
  const global = [data[0], data[1], data[2]];
  const rgba = Buffer.alloc(n * 4);
  const key = [0, 0, 0];
  for (let y = 0; y < h; y += 1) {
    const y0 = Math.max(0, y - R);
    const y1 = Math.min(h, y + R + 1);
    for (let x = 0; x < w; x += 1) {
      const i = y * w + x;
      const r = data[i * 3];
      const g = data[i * 3 + 1];
      const b = data[i * 3 + 2];
      const x0 = Math.max(0, x - R);
      const x1 = Math.min(w, x + R + 1);
      const at = (c) => sum[c][y1 * W1 + x1] - sum[c][y0 * W1 + x1] - sum[c][y1 * W1 + x0] + sum[c][y0 * W1 + x0];
      const k = at(3);
      if (k > 0) { key[0] = at(0) / k; key[1] = at(1) / k; key[2] = at(2) / k; } else { key[0] = global[0]; key[1] = global[1]; key[2] = global[2]; }
      const d = Math.hypot(r - key[0], g - key[1], b - key[2]);
      const a = smooth(30, 120, d);
      let cr = r;
      let cg = g;
      let cb = b;
      if (a > 0.01 && a < 0.999) {
        cr = clamp((r - (1 - a) * key[0]) / a, 0, 255);
        cg = clamp((g - (1 - a) * key[1]) / a, 0, 255);
        cb = clamp((b - (1 - a) * key[2]) / a, 0, 255);
      }
      /* Despill: a magenta cast, red and blue both well over green, is
       * drawn back toward green wherever it is, because a spinning prop's
       * see through disc carries the key into the blades under it. The
       * quad's own pinks keep red and blue within 30 of green, so they are
       * not touched. */
      const m2 = Math.min(cr, cb);
      if (m2 > cg + 34) {
        const k2 = m2 - cg - 34;
        cr -= k2;
        cb -= k2;
      }
      rgba[i * 4] = clamp(cr, 0, 255);
      rgba[i * 4 + 1] = cg;
      rgba[i * 4 + 2] = clamp(cb, 0, 255);
      rgba[i * 4 + 3] = Math.round(a * 255);
    }
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

/* The quad's silhouette grown by r pixels: a disc of offsets, the largest
 * alpha under it, so the hull is as round at a prop tip as along an arm.
 * Only what is solid counts: a spinning prop's disc is drawn see through,
 * and a pen does not outline a blur. */
function grow(alpha, W, H, r) {
  const offs = [];
  const R = Math.ceil(r);
  for (let dy = -R; dy <= R; dy += 1) {
    for (let dx = -R; dx <= R; dx += 1) {
      const d = Math.hypot(dx, dy);
      if (d <= r + 0.5) offs.push([dx, dy, clamp(r + 0.5 - d, 0, 1)]);
    }
  }
  const out = new Float32Array(W * H);
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      let m = 0;
      for (const [dx, dy, k] of offs) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
        const a = smooth(0.45, 0.75, alpha[(yy * W + xx) * 4 + 3] / 255) * k;
        if (a > m) { m = a; if (m >= 1) break; }
      }
      out[y * W + x] = m;
    }
  }
  return out;
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
  if (process.env.INK_DEBUG) {
    const a8 = Buffer.alloc(m.w * m.h);
    for (let i = 0; i < amt.length; i += 1) a8[i] = Math.round(amt[i] * 255);
    await sharp(a8, { raw: { width: m.w, height: m.h, channels: 1 } }).png().toFile(src + '.amt.png');
  }
  const aspect = box.w / box.h;
  const crop = cropFor(m.w, m.h, aspect, job.focus);
  const results = [];
  for (const [suffix, k] of SCALES) {
    const W = Math.round(box.w * k);
    const H = Math.round(box.h * k);
    const quadC = await sharp(quad, { raw: { width: m.w, height: m.h, channels: 4 } }).extract(crop).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).raw().toBuffer();
    const amt8 = Buffer.alloc(m.w * m.h);
    for (let i = 0; i < amt.length; i += 1) amt8[i] = Math.round(amt[i] * 255);
    /* sharp hands a one channel raw image back as three channels. */
    const amtC = await sharp(amt8, { raw: { width: m.w, height: m.h, channels: 1 } }).extract(crop).resize(W, H, { fit: 'fill', kernel: 'lanczos3' }).toColourspace('b-w').raw().toBuffer();
    if (amtC.length !== W * H) throw new Error('tone map is ' + amtC.length + ' bytes, not ' + W * H);
    const pitch = Math.max(4, PITCH_UNITS * (W / box.w));
    const lineW = Math.max(1.2, 1.1 * (W / box.w));
    const hull = grow(quadC, W, H, Math.max(1.2, HULL_UNITS * (W / box.w)));
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
        ink = Math.max(ink, hull[i]);
        let r = PAPER[0] + (INK[0] - PAPER[0]) * ink;
        let g = PAPER[1] + (INK[1] - PAPER[1]) * ink;
        let b = PAPER[2] + (INK[2] - PAPER[2]) * ink;
        /* The quad over its hull with a hard edge: the soft pixels of its
         * outline are mixed with the key, and the pen's line is what shows
         * there instead. */
        const a = smooth(0.5, 0.92, quadC[i * 4 + 3] / 255);
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
