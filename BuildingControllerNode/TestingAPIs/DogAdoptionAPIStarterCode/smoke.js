const fs = require('fs');
const http = require('http');

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const opts = { method, hostname: 'localhost', port: 3000, path, headers };
    const req = http.request(opts, res => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  const out = [];
  try {
    out.push('[smoke] GET /');
    let r = await request('GET', '/');
    out.push('status: ' + r.status);
    out.push('body: ' + r.body);

    out.push('[smoke] POST /api/auth/register');
    r = await request('POST', '/api/auth/register', JSON.stringify({ username: 'smokeuser', password: 'pass' }), { 'Content-Type': 'application/json' });
    out.push('status: ' + r.status);
    out.push('body: ' + r.body);

    out.push('[smoke] POST /api/auth/login');
    r = await request('POST', '/api/auth/login', JSON.stringify({ username: 'smokeuser', password: 'pass' }), { 'Content-Type': 'application/json' });
    out.push('status: ' + r.status);
    out.push('body: ' + r.body);

    let login;
    try { login = JSON.parse(r.body); } catch (e) {}
    const token = login && login.token;
    if (token) {
      out.push('[smoke] POST /api/dogs');
      r = await request('POST', '/api/dogs', JSON.stringify({ name: 'Smokey', description: 'Smoke test dog' }), { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
      out.push('status: ' + r.status);
      out.push('body: ' + r.body);
    }

  } catch (err) {
    out.push('error: ' + err.stack);
  }

  fs.writeFileSync('smoke-output.log', out.join('\n\n'));
  console.log('[smoke] wrote smoke-output.log');
})();
