// Generate Google Books cover URL from volume ID
export function getGoogleBooksCoverUrl(volumeId: string, zoom: number = 1): string {
  // zoom: 0 = small thumbnail, 1 = thumbnail, 2 = small, 3 = medium, 4 = large
  return `https://books.google.com/books/content?id=${volumeId}&printsec=frontcover&img=1&zoom=${zoom}`
}

// Known cover URLs for books without Google IDs (can be expanded)
const MANUAL_COVERS: Record<string, string> = {
  // Add manual cover URLs here for books without Google IDs
}

export function getBookCoverUrl(book: { title: string; googleBooksId?: string }): string | undefined {
  if (book.googleBooksId) {
    return getGoogleBooksCoverUrl(book.googleBooksId, 2)
  }
  return MANUAL_COVERS[book.title]
}
