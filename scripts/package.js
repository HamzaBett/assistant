const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const pkg = require('../package.json');
const version = pkg.version || '0.0.0';
const outName = `assistant-v${version}.zip`;
const distDir = path.resolve(__dirname, '..', 'dist');
const outPath = path.resolve(__dirname, '..', outName);

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run `npm run build` first.');
  process.exit(1);
}

const output = fs.createWriteStream(outPath);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

output.on('close', () => {
  console.log(`${outName} created: ${archive.pointer()} total bytes`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(distDir + '/', false);
archive.finalize();
