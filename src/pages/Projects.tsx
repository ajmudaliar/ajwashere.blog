import { Link } from 'react-router-dom'

export function Projects() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="construction-icon">
          <span className="crane">
            {/* Simple ASCII crane */}
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
        <h1>Projects and stuff</h1>
        <p className="subtitle">This area is under construction!</p>
        <div className="construction-bar">
          <div className="stripe"></div>
        </div>
        <p className="description">
          Coming soon: A collection of things I've built, broken, and occasionally fixed.
        </p>
        <Link to="/" className="back-link">
          &larr; Back to the island
        </Link>
      </div>
    </div>
  )
}
