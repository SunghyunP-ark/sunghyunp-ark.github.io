import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Sidebar from './components/layout/Sidebar.jsx'
import MobileHeader from './components/layout/MobileHeader.jsx'
import HomePage from './pages/HomePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import BlogEditorPage from './pages/BlogEditorPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<HomePage />} />
        <Route path="/blog"        element={<BlogPage />} />
        <Route path="/blog/editor" element={<BlogEditorPage />} />
        <Route path="/blog/:slug"  element={<BlogPostPage />} />
        <Route path="/gallery"     element={<GalleryPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <BrowserRouter>
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <MobileHeader onMenuToggle={() => setMobileOpen(o => !o)} />
      <div className="main-content">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}
