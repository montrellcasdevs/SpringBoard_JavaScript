const { exec } = require('child_process');
const fs = require('fs');

console.log('[test-runner] Starting mocha via child process');

exec('node node_modules/mocha/bin/_mocha --reporter spec --timeout 20000', { maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
  const out = [];
  out.push('=== STDOUT ===');
  out.push(stdout || '(no stdout)');
  out.push('=== STDERR ===');
  out.push(stderr || '(no stderr)');
  out.push('=== ERROR ===');
  out.push(err ? err.stack || String(err) : '(no error)');

  fs.writeFileSync('test-output.log', out.join('\n\n'));
  console.log('[test-runner] Wrote test-output.log');
  if (err) process.exit(1);
  process.exit(0);
});
