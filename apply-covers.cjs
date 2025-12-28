const https = require('https');
const fs = require('fs');
const path = require('path');

const COVERS_DIR = path.join(__dirname, 'public/book-covers');
const DATA_FILE = path.join(__dirname, 'cover-data.json');

async function downloadCover(googleId) {
  const url = 'https://books.google.com/books/content?id=' + googleId + '&printsec=frontcover&img=1&zoom=2';
  const dest = path.join(COVERS_DIR, googleId + '.jpg');

  // Skip if already exists
  if (fs.existsSync(dest)) {
    console.log('  Skipping (exists):', googleId);
    return;
  }

  console.log('  Downloading:', googleId);

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
  // Read the data file
  if (!fs.existsSync(DATA_FILE)) {
    console.error('No cover-data.json found. Generate it from /admin/covers');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  const { assignments, coverIds } = data;

  // Ensure directory exists
  fs.mkdirSync(COVERS_DIR, { recursive: true });

  // Download all covers
  console.log('Downloading covers...');
  for (const id of coverIds) {
    await downloadCover(id);
  }
  console.log('Downloads complete!');

  // Update cover-assignments.ts
  const assignmentsLines = Object.entries(assignments)
    .map(([bookId, googleId]) => `  '${bookId}': '${googleId}',`)
    .join('\n');

  const assignmentsContent = `// Book cover assignments - Google Books IDs mapped to book IDs
export const COVER_ASSIGNMENTS: Record<string, string> = {
${assignmentsLines}
}
`;
  fs.writeFileSync('src/pages/library/cover-assignments.ts', assignmentsContent);
  console.log('Updated cover-assignments.ts');

  // Update book-covers.ts
  const coverIdsLines = coverIds.map(id => `  '${id}',`).join('\n');

  const coversContent = `// IDs of books with actual covers
export const AVAILABLE_COVERS_LIST = [
${coverIdsLines}
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
  fs.writeFileSync('src/pages/library/book-covers.ts', coversContent);
  console.log('Updated book-covers.ts');

  // Clean up
  fs.unlinkSync(DATA_FILE);
  console.log('Cleaned up cover-data.json');

  console.log('\nAll done! Refresh the page to see changes.');
}

main().catch(console.error);
