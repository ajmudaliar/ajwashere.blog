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
          top: '2rem',
          left: '2rem',
          color: '#10b981',
          textDecoration: 'none',
          fontFamily: "'SF Mono', 'Fira Code', monospace",
          fontSize: '0.9rem',
          padding: '0.5rem 1rem',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '4px',
          background: 'rgba(10, 10, 18, 0.8)',
          transition: 'all 0.2s ease',
          zIndex: 100,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(10, 10, 18, 0.8)'
          e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.3)'
        }}
      >
        &larr; Back to the island
      </Link>
    </div>
  )
}
