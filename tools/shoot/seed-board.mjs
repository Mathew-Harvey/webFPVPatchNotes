/*
 * The example club, times and tunes the week's CommunityGow and Tunes
 * pictures show (tools/shoot/c1-week.js). Run against a board started from a
 * checkout with its file store, never against the live board:
 *
 *   PORT=3100 BOARD_FILE=/tmp/board.json node src/server.js      (in the board)
 *   node tools/shoot/seed-board.mjs track1.webfpv.zip track8.webfpv.zip > seed.json
 *
 * The two zips are whoop bundles, made by the simulator's own script
 * (node scripts/trackbundle.js racegow5-track1 --out ...). The club's
 * organiser key is printed in seed.json and handed to the shoot as CG_KEY,
 * for the builder's Send to community picture; it is never in a picture.
 * Every name, time and tune here is made up for the page.
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
import { readFileSync } from 'node:fs';

const B = process.env.BOARD_LOCAL || 'http://127.0.0.1:3100';
const [pack1, pack2] = process.argv.slice(2);
if (!pack1 || !pack2) throw new Error('usage: node tools/shoot/seed-board.mjs <round 1 zip> <round 2 zip>');

async function post(p, body) {
  const r = await fetch(B + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const t = await r.text();
  if (!r.ok) throw new Error(p + ' ' + r.status + ' ' + t.slice(0, 300));
  return JSON.parse(t);
}

const club = await post('/api/communities', { name: 'Example Whoop Club', tagline: 'One whoop track a week, flown at home' });
const key = club.organiserKey;
const base = `/api/communities/${club.slug}`;
await post(`${base}/rounds`, { organiserKey: key, pack: readFileSync(pack1).toString('base64'), title: 'Round 1', note: 'Three laps from the pad.', opensUtc: '2026-10-05T00:00:00Z', closesUtc: '2026-10-12T00:00:00Z' });
await post(`${base}/rounds`, { organiserKey: key, pack: readFileSync(pack2).toString('base64'), title: 'Round 2', note: 'Low and tight.', opensUtc: '2026-10-09T00:00:00Z' });

/* A placeholder video link, so a row shows its Watch button. */
const VIDEO = 'https://youtu.be/dQw4w9WgXcQ';
const round1 = [['Kestrel', 34560, VIDEO], ['Tofu', 36120, VIDEO], ['Moss', 38900, null], ['Juno', 41250, VIDEO], ['Rook', 44010, null], ['Pip', 52300, null]];
const ids = [];
for (const [name, ms, video] of round1) {
  const e = await post(`${base}/rounds/1/entries`, { name, timeMs: ms, bestLapMs: Math.floor(ms / 3) - 40, video: video || undefined, where: 'room' });
  ids.push(e.entry.id);
}
for (const [name, ms] of [['Tofu', 39800], ['Kestrel', 40120], ['Juno', 43100], ['Moss', 47750]]) {
  await post(`${base}/rounds/2/entries`, { name, timeMs: ms, bestLapMs: Math.floor(ms / 3) - 40, where: 'room' });
}
for (const id of ids.slice(0, 2)) await post(`${base}/rounds/1/entries/${id}`, { verified: true, organiserKey: key });

/* Three tunes and their ratings, each rating from its own made up browser key. */
const stock = {
  base: 'betaflight-default',
  rates: { type: 'BETAFLIGHT', throttleCap: 100, thrMid: 50, thrExpo: 0, roll: { rcRate: 100, srate: 60, expo: 0 }, pitch: { rcRate: 100, srate: 60, expo: 0 }, yaw: { rcRate: 100, srate: 60, expo: 0 } },
  weight: 100, airGrip: 100, motorKv: 100, packVoltage: 4.2, cameraFov: 85, cameraAngle: 30,
};
const tune = (author, name, notes, airframe, raterKey, extra) => ({ author, name, notes, airframe, raterKey, setup: Object.assign({}, stock, extra) });
const tunes = [
  [tune('Kestrel', 'Locked in gates', 'Soft D, a bit more grip. Feels planted in the turns.', '5inch', 'a'.repeat(32), { pids: { mode: 'sliders', sliders: { master: 110, d: 120 } }, airGrip: 110, cameraAngle: 35 }), [5, 5, 4, 5]],
  [tune('Juno', 'Floaty freestyle', 'Lighter, slower rates for big lines in the town.', '5inch', 'b'.repeat(32), { weight: 90, airGrip: 80 }), [4, 3, 4]],
  [tune('Moss', 'Tiny whoop, calm', 'Gentle rates for a first whoop room.', 'whoop65', 'c'.repeat(32), { cameraAngle: 15 }), [5, 4]],
];
const codes = [];
for (const [body, stars] of tunes) {
  const t = await post('/api/setups', body);
  codes.push(t.code);
  for (const [j, n] of stars.entries()) await post('/api/ratings', { kind: 'setup', id: t.id, stars: n, raterKey: String(j + 1).repeat(32) });
}
process.stdout.write(JSON.stringify({ slug: club.slug, organiserKey: key, tunes: codes }) + '\n');
