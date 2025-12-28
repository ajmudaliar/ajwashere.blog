import { useState, useMemo } from 'react'
import { READING_LIST } from './reading-list'
import { AVAILABLE_COVERS_LIST } from './book-covers'
import { COVER_ASSIGNMENTS } from './cover-assignments'

// What's already downloaded and in the codebase
const APPLIED_COVERS = new Set(AVAILABLE_COVERS_LIST)

interface GoogleBookResult {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: {
      thumbnail?: string
    }
  }
}

interface SearchResults {
  items?: GoogleBookResult[]
}

export function CoverManager() {
  // Initialize from the file, track changes in session
  const [assignments, setAssignments] = useState<Record<string, string>>({ ...COVER_ASSIGNMENTS })
  const [selectedBook, setSelectedBook] = useState<typeof READING_LIST[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<GoogleBookResult[]>([])
  const [loading, setLoading] = useState(false)
  const [previewResult, setPreviewResult] = useState<GoogleBookResult | null>(null)

  // All books except "Have not started", unassigned first
  const sortedBooks = READING_LIST
    .filter(book => book.status !== 'Have not started')
    .sort((a, b) => {
      const aAssigned = !!assignments[a.id]
      const bAssigned = !!assignments[b.id]
      if (aAssigned === bAssigned) return 0
      return aAssigned ? 1 : -1  // unassigned first
    })

  // Search Google Books
  const searchGoogleBooks = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setPreviewResult(null)
    try {
      const query = encodeURIComponent(searchQuery)
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=12&printType=books`
      const response = await fetch(url)
      const data: SearchResults = await response.json()
      setSearchResults(data.items || [])
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    }
    setLoading(false)
  }

  // Select a book to find cover for
  const selectBook = (book: typeof READING_LIST[0]) => {
    setSelectedBook(book)
    setSearchQuery(`${book.title} ${book.author}`)
    setSearchResults([])
    setPreviewResult(null)
  }

  // Preview a cover before confirming
  const previewCover = (result: GoogleBookResult) => {
    setPreviewResult(result)
  }

  // Confirm cover assignment
  const confirmCover = () => {
    if (!selectedBook || !previewResult) return

    setAssignments({
      ...assignments,
      [selectedBook.id]: previewResult.id
    })

    setSelectedBook(null)
    setSearchQuery('')
    setSearchResults([])
    setPreviewResult(null)
  }

  // Remove assignment
  const removeAssignment = (bookId: string) => {
    const newAssignments = { ...assignments }
    delete newAssignments[bookId]
    setAssignments(newAssignments)
  }

  // Get cover URL
  const getCoverUrl = (googleBooksId: string) => {
    return `https://books.google.com/books/content?id=${googleBooksId}&printsec=frontcover&img=1&zoom=2`
  }

  // Get thumbnail URL from search result
  const getSearchCoverUrl = (result: GoogleBookResult) => {
    if (result.volumeInfo.imageLinks?.thumbnail) {
      return result.volumeInfo.imageLinks.thumbnail
        .replace('http://', 'https://')
        .replace('&edge=curl', '')
        .replace('zoom=1', 'zoom=2')
    }
    return getCoverUrl(result.id)
  }

  // Apply changes - generate JSON data file and download it
  const applyChanges = () => {
    if (pendingChanges.length === 0) {
      alert('All covers are already applied! Nothing to download.')
      return
    }

    // Merge existing covers with new assignments
    const allCoverIds = [...new Set([
      ...AVAILABLE_COVERS_LIST,
      ...Object.values(assignments)
    ])]

    const data = {
      assignments,
      coverIds: allCoverIds
    }

    // Download as JSON file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cover-data.json'
    a.click()
    URL.revokeObjectURL(url)

    alert(`Downloaded cover-data.json!\n\nMove to project root, then run: node apply-covers.cjs`)
  }

  // Calculate what's new vs already applied
  const { pendingChanges, appliedCount, assignedCount } = useMemo(() => {
    const entries = Object.entries(assignments)
    const pending = entries.filter(([_, googleId]) => !APPLIED_COVERS.has(googleId))
    return {
      pendingChanges: pending,
      appliedCount: entries.length - pending.length,
      assignedCount: entries.length
    }
  }, [assignments])

  // Check if a cover is already applied (downloaded)
  const isApplied = (googleId: string) => APPLIED_COVERS.has(googleId)

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#f5f0e8',
      background: '#1a1612',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0 }}>Book Cover Manager</h1>
          <p style={{ opacity: 0.7, margin: '0.5rem 0' }}>
            {assignedCount} of {sortedBooks.length} assigned
            {appliedCount > 0 && <span style={{ color: '#4a9' }}> · {appliedCount} applied</span>}
            {pendingChanges.length > 0 && <span style={{ color: '#c94' }}> · {pendingChanges.length} pending</span>}
          </p>
        </div>
        {pendingChanges.length > 0 && (
          <button
            onClick={applyChanges}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              border: 'none',
              background: '#2d5a27',
              color: '#fff',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            Apply {pendingChanges.length} New
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {/* Books list */}
        <div style={{ flex: '1', maxHeight: '80vh', overflowY: 'auto' }}>
          {sortedBooks.map(book => {
            const assignedCoverId = assignments[book.id]
            const isSelected = selectedBook?.id === book.id

            return (
              <div
                key={book.id}
                onClick={() => selectBook(book)}
                style={{
                  padding: '0.75rem',
                  marginBottom: '0.5rem',
                  background: isSelected ? '#3d3530' : '#2a2520',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid #8B6914' : '2px solid transparent',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'center'
                }}
              >
                {/* Cover thumbnail or placeholder */}
                <div style={{
                  width: '45px',
                  height: '65px',
                  background: assignedCoverId ? 'transparent' : '#3d3530',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                  position: 'relative',
                  border: assignedCoverId && !isApplied(assignedCoverId) ? '2px solid #c94' : '2px solid transparent'
                }}>
                  {assignedCoverId ? (
                    <>
                      <img
                        src={getCoverUrl(assignedCoverId)}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {isApplied(assignedCoverId) && (
                        <div style={{
                          position: 'absolute',
                          bottom: 2,
                          right: 2,
                          background: '#2d5a27',
                          borderRadius: '2px',
                          padding: '1px 3px',
                          fontSize: '0.5rem',
                          color: '#fff'
                        }}>✓</div>
                      )}
                    </>
                  ) : (
                    <span style={{ fontSize: '0.6rem', opacity: 0.4 }}>No cover</span>
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {book.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{book.author}</div>
                </div>

                {assignedCoverId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeAssignment(book.id)
                    }}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid #555',
                      background: 'transparent',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      flexShrink: 0
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Search panel */}
        <div style={{ flex: '2' }}>
          {selectedBook ? (
            <>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', marginTop: 0 }}>
                {selectedBook.title}
                <span style={{ fontWeight: 400, opacity: 0.6, marginLeft: '0.5rem' }}>
                  by {selectedBook.author}
                </span>
              </h2>

              {/* Search bar */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && searchGoogleBooks()}
                  placeholder="Search Google Books..."
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    borderRadius: '6px',
                    border: '1px solid #3d3530',
                    background: '#2a2520',
                    color: '#f5f0e8',
                    fontSize: '1rem'
                  }}
                />
                <button
                  onClick={searchGoogleBooks}
                  disabled={loading}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: '#8B6914',
                    color: '#fff',
                    cursor: loading ? 'wait' : 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {loading ? '...' : 'Search'}
                </button>
              </div>

              {/* Confirmation preview */}
              {previewResult && (
                <div style={{
                  background: '#2d2a25',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '2px solid #8B6914'
                }}>
                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <img
                      src={getSearchCoverUrl(previewResult)}
                      alt=""
                      style={{
                        width: '120px',
                        height: '180px',
                        objectFit: 'contain',
                        background: '#1a1612',
                        borderRadius: '4px'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                        {previewResult.volumeInfo.title}
                      </div>
                      <div style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '1rem' }}>
                        {previewResult.volumeInfo.authors?.join(', ') || 'Unknown author'}
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={confirmCover}
                          style={{
                            padding: '0.6rem 1.5rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: '#2d5a27',
                            color: '#fff',
                            cursor: 'pointer',
                            fontWeight: 500
                          }}
                        >
                          Use this cover
                        </button>
                        <button
                          onClick={() => setPreviewResult(null)}
                          style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '6px',
                            border: '1px solid #555',
                            background: 'transparent',
                            color: '#999',
                            cursor: 'pointer'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search results grid */}
              {searchResults.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: '1rem'
                }}>
                  {searchResults.map(result => (
                    <div
                      key={result.id}
                      onClick={() => previewCover(result)}
                      style={{
                        background: previewResult?.id === result.id ? '#3d3530' : '#2a2520',
                        borderRadius: '6px',
                        padding: '0.6rem',
                        cursor: 'pointer',
                        border: previewResult?.id === result.id ? '2px solid #8B6914' : '2px solid transparent'
                      }}
                    >
                      <img
                        src={getSearchCoverUrl(result)}
                        alt=""
                        style={{
                          width: '100%',
                          height: '160px',
                          objectFit: 'contain',
                          marginBottom: '0.4rem',
                          background: '#1a1612',
                          borderRadius: '3px'
                        }}
                      />
                      <div style={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                        {result.volumeInfo.title.length > 40
                          ? result.volumeInfo.title.slice(0, 40) + '...'
                          : result.volumeInfo.title}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchResults.length === 0 && !loading && !previewResult && (
                <p style={{ opacity: 0.4, textAlign: 'center', marginTop: '3rem' }}>
                  Press Search to find book covers
                </p>
              )}
            </>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '300px',
              opacity: 0.4
            }}>
              <p>← Select a book to assign a cover</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
