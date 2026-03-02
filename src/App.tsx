import { Routes, Route } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ResumePage from './pages/ResumePage'
import PortfolioPage from './pages/PortfolioPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AboutPage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}

export default App
