import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './SkillBar.css'

export default function SkillBar({ title, icon, percentage, description }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className="skill-item"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="skill-header">
        <h5 className="skill-title">
          <i className={`fas ${icon}`} />
          {title}
        </h5>
        <span className="skill-pct">{percentage}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: '0%' }}
          animate={{ width: inView ? `${percentage}%` : '0%' }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
      <p className="skill-desc">{description}</p>
    </motion.div>
  )
}
