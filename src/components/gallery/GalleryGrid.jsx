import { useState } from 'react'
import { motion } from 'framer-motion'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { galleryImages } from '../../data/gallery.js'
import './GalleryGrid.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

export default function GalleryGrid() {
  const [index, setIndex] = useState(-1)

  return (
    <>
      <motion.div
        className="gallery-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {galleryImages.map((img, i) => (
          <motion.div
            key={i}
            className="gallery-item"
            variants={item}
            whileHover={{ scale: 1.03 }}
            onClick={() => setIndex(i)}
          >
            <img src={img.src} alt={img.alt} className="gallery-item__img" loading="lazy" />
            <div className="gallery-item__overlay">
              <i className="fas fa-expand-alt" />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={galleryImages.map(img => ({ src: img.src, alt: img.alt }))}
        styles={{
          container: { backgroundColor: 'rgba(4, 8, 15, 0.95)' },
        }}
      />
    </>
  )
}
