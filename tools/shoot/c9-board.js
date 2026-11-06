/*
 * A read only stand in for the board on 127.0.0.1:3100, the address the
 * simulator reads its board from when it is served on a loopback address
 * (src/share/board.js, DEFAULT_BOARD_ORIGIN). Every GET is answered with
 * what the live board at https://webfpv.org/board answers, fetched with
 * curl so the machine's own proxy and certificates apply; anything else is
 * refused. Chapter 9's Track of the week card and the board's top three
 * ghosts are the live board's this way, unchanged.
 *
 *   node tools/shoot/c9-board.js
 *
 * This file is part of the WebFPV comic. Copyright 2026 Mathew Harvey
 * (andAgainFPV). Licensed under CC BY-ND 4.0, see LICENSE.
 */
const http = require('http');
const { execFile } = require('child_process');

const LIVE = 'https://webfpv.org/board';
const PORT = Number(process.env.BOARD_PORT || 3100);

http.createServer((req, res) => {
  const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': 'GET, OPTIONS' };
  if (req.method === 'OPTIONS') { res.writeHead(204, cors); return res.end(); }
  if (req.method !== 'GET') { res.writeHead(405, cors); return res.end(); }
  execFile('curl', ['-sS', '-m', '30', '-w', '\n%{http_code} %{content_type}', LIVE + req.url], { encoding: 'buffer', maxBuffer: 64 << 20 }, (err, out) => {
    if (err) { res.writeHead(502, cors); return res.end(); }
    const s = out.toString('latin1');
    const cut = s.lastIndexOf('\n');
    const [code, type] = s.slice(cut + 1).split(' ');
    res.writeHead(Number(code) || 502, Object.assign({ 'content-type': type || 'application/json' }, cors));
    res.end(out.subarray(0, Buffer.byteLength(s.slice(0, cut), 'latin1')));
    process.stdout.write(`${code} ${req.url}\n`);
  });
}).listen(PORT, '127.0.0.1', () => process.stdout.write(`board stand in on ${PORT}\n`));
