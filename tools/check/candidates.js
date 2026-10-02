/*
 * List simulator and site commits from the last 7 days.
 * Opens a GitHub issue only when OPEN_ISSUE=1, GH_TOKEN, and REPO are set.
 *
 * node tools/check/candidates.js
 */
const https = require('https');

const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

function get(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'webfpv-comic', Accept: 'application/vnd.github+json' } }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          resolve({ error: res.statusCode + ' ' + url });
          return;
        }
        try { resolve({ rows: JSON.parse(body) }); }
        catch (err) { resolve({ error: String(err) }); }
      });
    }).on('error', (err) => resolve({ error: String(err) }));
  });
}

function linesFrom(label, result) {
  if (result.error) return [label + ': ' + result.error];
  const rows = Array.isArray(result.rows) ? result.rows : [];
  if (!rows.length) return [label + ': none'];
  return rows.slice(0, 20).map((row) => {
    const sha = (row.sha || '').slice(0, 7);
    const date = row.commit && row.commit.author ? row.commit.author.date : '';
    const msg = row.commit && row.commit.message ? row.commit.message.split('\n')[0] : '';
    return label + ' ' + sha + ' ' + date.slice(0, 10) + ' ' + msg;
  });
}

async function main() {
  const sim = await get('https://api.github.com/repos/Mathew-Harvey/WebFPVSimulator/commits?since=' + encodeURIComponent(since) + '&per_page=20');
  const site = await get('https://api.github.com/repos/Mathew-Harvey/landingpage-WebFPVSimulator-/commits?since=' + encodeURIComponent(since) + '&per_page=20&path=notes');
  const lines = ['Window since ' + since.slice(0, 10) + '.'].concat(linesFrom('sim', sim), linesFrom('notes', site));
  const body = lines.join('\n');
  process.stdout.write(body + '\n');
  const any = lines.some((line) => /^sim [0-9a-f]{7}/.test(line) || /^notes [0-9a-f]{7}/.test(line));
  if (!any) return;
  if (process.env.OPEN_ISSUE !== '1' || !process.env.GH_TOKEN || !process.env.REPO) return;
  const title = 'Chapter candidates ' + since.slice(0, 10);
  const payload = JSON.stringify({ title, body });
  await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path: '/repos/' + process.env.REPO + '/issues',
      method: 'POST',
      headers: {
        'User-Agent': 'webfpv-comic',
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + process.env.GH_TOKEN,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }, (res) => {
      res.resume();
      if (res.statusCode >= 200 && res.statusCode < 300) resolve();
      else reject(new Error('issue create ' + res.statusCode));
    });
    req.on('error', reject);
    req.end(payload);
  });
  process.stdout.write('opened issue\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
