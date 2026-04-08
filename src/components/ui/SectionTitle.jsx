import { motion } from 'framer-motion'

export default function SectionTitle({ children }) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <h2>{children}</h2>
    </motion.div>
  )
}
