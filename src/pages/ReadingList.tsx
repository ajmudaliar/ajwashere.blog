import { Link } from 'react-router-dom'

export function ReadingList() {
  return (
    <div className="page-container">
      <div className="page-content">
        <div className="construction-icon">
          <span className="books">
            {/* Simple ASCII books */}
            <pre>{`
    ____
   |    |
   | [] |
   |____|
   /____\\
    `}</pre>
          </span>
        </div>
        <h1>What I'm reading</h1>
        <p className="subtitle">This shelf is being organized!</p>
        <div className="construction-bar">
          <div className="stripe"></div>
        </div>
        <p className="description">
          Coming soon: Books, articles, and rabbit holes I've fallen into.
        </p>
        <Link to="/" className="back-link">
          &larr; Back to the island
        </Link>
      </div>
    </div>
  )
}
