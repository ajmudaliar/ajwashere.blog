import { Link } from 'react-router-dom'

export function Travels() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="construction-icon">
          <span className="crane">
            <pre>{`
     ___
    /   \\
   |     |
   |_____|
      ||
   ===||===
      ||
    `}</pre>
          </span>
        </div>
        <h1>Travels</h1>
        <p className="subtitle">This area is under construction!</p>
        <div className="construction-bar">
          <div className="stripe"></div>
        </div>
        <p className="description">
          Coming soon: Places I've explored and adventures I've had.
        </p>
        <Link to="/" className="back-link">
          &larr; Back to the island
        </Link>
      </div>
    </div>
  )
}
