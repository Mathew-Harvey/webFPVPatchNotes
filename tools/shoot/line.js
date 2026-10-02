/*
 * A racing line as a curve you can stand on: the simulator's own line,
 * sampled, measured in metres from its first gate, so a shot can say "four
 * metres before the dive gate, looking through it" and mean it.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
function mul(a, k) { return [a[0] * k, a[1] * k, a[2] * k]; }
function len(a) { return Math.hypot(a[0], a[1], a[2]); }
function norm(a) { const l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; }

function makeLine(samples) {
  const S = [0];
  for (let i = 1; i < samples.length; i += 1) S.push(S[i - 1] + len(sub(samples[i], samples[i - 1])));
  const total = S[S.length - 1];
  function at(d) {
    let s = ((d % total) + total) % total;
    let lo = 0;
    let hi = S.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (S[mid] <= s) lo = mid; else hi = mid;
    }
    const t = (s - S[lo]) / Math.max(1e-6, S[hi] - S[lo]);
    const a = samples[lo];
    const b = samples[hi];
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  }
  /* Where the line is at d, which way it runs, which way is right of it, and
   * how hard it turns there (radians per metre, positive to the right). */
  function frame(d, h = 1.5) {
    const p = at(d);
    const a = at(d - h);
    const b = at(d + h);
    const fwd = norm(sub(b, a));
    const right = norm([-fwd[2], 0, fwd[0]]);
    const h1 = Math.atan2(p[0] - a[0], -(p[2] - a[2]));
    const h2 = Math.atan2(b[0] - p[0], -(b[2] - p[2]));
    let dh = h2 - h1;
    while (dh > Math.PI) dh -= Math.PI * 2;
    while (dh < -Math.PI) dh += Math.PI * 2;
    return { p, fwd, right, turn: dh / h };
  }
  return { total, at, frame };
}

/* The quad's yaw, in the rig's convention (0 faces -z), for a heading. */
function yawFor(fwd) {
  return Math.atan2(-fwd[0], -fwd[2]) * 180 / Math.PI;
}

module.exports = { makeLine, yawFor, sub, add, mul, len, norm };
