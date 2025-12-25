import { Link } from 'react-router-dom'

export function Blog() {
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
        <h1>Blog</h1>
        <p className="subtitle">This area is under construction!</p>
        <div className="construction-bar">
          <div className="stripe"></div>
        </div>
        <p className="description">
          Coming soon: Thoughts, learnings, and occasional ramblings.
        </p>
        <Link to="/" className="back-link">
          &larr; Back to the island
        </Link>
      </div>
    </div>
  )
}
