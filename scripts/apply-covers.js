const https = require('https');
const fs = require('fs');
const path = require('path');

const PENDING_FILE = path.join(__dirname, '..', '.pending-covers.json');
const COVERS_DIR = path.join(__dirname, '..', 'public/book-covers');

async function downloadCover(googleId) {
  const url = `https://books.google.com/books/content?id=${googleId}&printsec=frontcover&img=1&zoom=2`;
  const dest = path.join(COVERS_DIR, `${googleId}.jpg`);

  console.log(`  Downloading ${googleId}...`);

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
  // Check if pending file exists
  if (!fs.existsSync(PENDING_FILE)) {
    console.log('No pending covers to apply.');
    console.log('Use the Cover Manager at /admin/covers to assign covers first.');
    process.exit(0);
  }

  const data = JSON.parse(fs.readFileSync(PENDING_FILE, 'utf-8'));
  const { pendingDownloads, assignmentsCode, coversListCode } = data;

  if (pendingDownloads.length === 0) {
    console.log('No new covers to download.');
    process.exit(0);
  }

  // Ensure directory exists
  fs.mkdirSync(COVERS_DIR, { recursive: true });

  // Download new covers
  console.log(`Downloading ${pendingDownloads.length} new covers...`);
  for (const googleId of pendingDownloads) {
    await downloadCover(googleId);
  }
  console.log('Downloads complete!\n');

  // Update cover-assignments.ts
  const assignmentsContent = `// Book cover assignments - Google Books IDs mapped to book IDs
export const COVER_ASSIGNMENTS: Record<string, string> = {
${assignmentsCode}
}
`;
  fs.writeFileSync(path.join(__dirname, '..', 'src/pages/library/cover-assignments.ts'), assignmentsContent);
  console.log('Updated cover-assignments.ts');

  // Update book-covers.ts
  const coversContent = `// IDs of books with actual covers (not Google's "image not available" placeholder)
export const AVAILABLE_COVERS_LIST = [
${coversListCode}
]

const AVAILABLE_COVERS = new Set(AVAILABLE_COVERS_LIST)

// Check if a book has a real cover available
export function hasCover(googleBooksId: string | undefined): boolean {
  return !!googleBooksId && AVAILABLE_COVERS.has(googleBooksId)
}

// Get local book cover path (pre-downloaded from Google Books)
export function getBookCoverPath(googleBooksId: string): string {
  return \`/book-covers/\${googleBooksId}.jpg\`
}
`;
  fs.writeFileSync(path.join(__dirname, '..', 'src/pages/library/book-covers.ts'), coversContent);
  console.log('Updated book-covers.ts');

  // Clean up pending file
  fs.unlinkSync(PENDING_FILE);
  console.log('\nAll done! Refresh the page to see changes.');
}

main().catch(console.error);
