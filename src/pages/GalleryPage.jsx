import { motion } from 'framer-motion'
import GalleryGrid from '../components/gallery/GalleryGrid.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function GalleryPage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '48px 0 32px', marginBottom: 40 }}>
        <div className="container">
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Gallery
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: 8 }}>
            A few snapshots from life outside the lab.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <GalleryGrid />
      </div>
    </motion.div>
  )
}
