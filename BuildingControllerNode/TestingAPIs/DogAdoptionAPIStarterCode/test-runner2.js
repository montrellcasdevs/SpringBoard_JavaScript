const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

console.log('[test-runner2] starting');

const mocha = new Mocha({ reporter: 'spec', timeout: 20000 });
const testDir = path.join(__dirname, 'tests');

const files = fs.readdirSync(testDir).filter(f => f.endsWith('.js'));
if (files.length === 0) {
  console.error('[test-runner2] no test files found');
  process.exit(1);
}

files.forEach(f => mocha.addFile(path.join(testDir, f)));

let out = '';
fs.writeFileSync('test-output.log', '[test-runner2] starting tests\n');

const runner = mocha.run(failures => {
  out = `\n=== SUMMARY ===\nFailures: ${failures}\n`;
  fs.appendFileSync('test-output.log', out);
  console.log('[test-runner2] wrote test-output.log');
  process.exit(failures ? 1 : 0);
});

runner.on('test', test => {
  fs.appendFileSync('test-output.log', `TEST START: ${test.fullTitle()}\n`);
});

runner.on('pass', test => {
  fs.appendFileSync('test-output.log', `PASS: ${test.fullTitle()}\n`);
});

runner.on('fail', (test, err) => {
  fs.appendFileSync('test-output.log', `FAIL: ${test.fullTitle()} - ${err.message}\n`);
});

runner.on('end', () => {
  fs.appendFileSync('test-output.log', '[test-runner2] runner ended\n');
});
