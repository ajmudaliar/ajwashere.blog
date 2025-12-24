import { useState, useEffect } from 'react'
import './App.css'

const message = "something coming soon..."

function App() {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const doneTyping = displayedText.length >= message.length

  useEffect(() => {
    if (displayedText.length < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(message.slice(0, displayedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [displayedText])

  useEffect(() => {
    if (doneTyping) {
      const interval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 530)
      return () => clearInterval(interval)
    }
  }, [doneTyping])

  return (
    <div className="terminal">
      <span className="prompt">$</span>
      <span className="text">{displayedText}</span>
      <span className={`cursor ${showCursor ? 'visible' : ''}`}>▋</span>
    </div>
  )
}

export default App
