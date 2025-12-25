import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameComponent } from './game/GameComponent'
import { Projects } from './pages/Projects'
import { ReadingList } from './pages/ReadingList'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameComponent />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/readinglist" element={<ReadingList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
