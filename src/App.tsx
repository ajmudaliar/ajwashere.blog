import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { GameComponent } from './game/GameComponent'
import { Projects } from './pages/Projects'
import { ReadingList } from './pages/ReadingList'
import { Blog } from './pages/Blog'
import { Travels } from './pages/Travels'
import { CoverManager } from './pages/library/CoverManager'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameComponent />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/readinglist" element={<ReadingList />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/admin/covers" element={<CoverManager />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
