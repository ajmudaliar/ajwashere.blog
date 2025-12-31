import { Link } from 'react-router-dom'
import { LibraryScene } from './library/LibraryScene'

export function ReadingList() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <LibraryScene />

      {/* Back link overlay */}
      <Link
        to="/"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          color: '#10b981',
          textDecoration: 'none',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: '0.9rem',
          padding: '0.5rem 1rem',
          border: '1px solid #10b981',
          borderRadius: '4px',
          background: 'rgba(0, 0, 0, 0.5)',
          transition: 'all 0.2s ease',
          zIndex: 100,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#10b981'
          e.currentTarget.style.color = '#000'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)'
          e.currentTarget.style.color = '#10b981'
        }}
      >
        &larr; Back to the island
      </Link>
    </div>
  )
}
