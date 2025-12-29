const https = require('https');
const fs = require('fs');
const path = require('path');

const COVERS_DIR = path.join(__dirname, 'public/book-covers');

// Read existing cover IDs from book-covers.ts
const bookCoversFile = fs.readFileSync(path.join(__dirname, 'src/pages/library/book-covers.ts'), 'utf-8');
const match = bookCoversFile.match(/AVAILABLE_COVERS_LIST = \[([\s\S]*?)\]/);
const coverIds = match[1]
  .split('\n')
  .map(line => line.match(/'([^']+)'/))
  .filter(Boolean)
  .map(m => m[1]);

console.log(`Found ${coverIds.length} covers to re-download at zoom=2\n`);

async function downloadCover(googleId) {
  const url = `https://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=2`;
  const dest = path.join(COVERS_DIR, `${googleId}.jpg`);

  // Delete existing file first
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }

  console.log(`  Downloading: ${googleId}`);

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        });
      } else {
        response.pipe(file);
        file.on('finish', () => { file.close(); resolve(); });
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('Re-downloading all covers at zoom=2 (high-res)...\n');

  for (const id of coverIds) {
    await downloadCover(id);
  }

  console.log('\nDone! All covers updated to high-res.');
}

main().catch(console.error);
