import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle.jsx'
import { topics } from '../../data/topics.js'
import './TopicsSection.css'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function TopicsSection() {
  return (
    <section id="topics" className="section">
      <div className="container">
        <SectionTitle>Topics of Interest</SectionTitle>
        <motion.div
          className="topics-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {topics.map(t => (
            <motion.div key={t.id} className="topic-card" variants={item}>
              <div className="topic-icon">
                <i className={`fas ${t.icon}`} />
              </div>
              <div className="topic-content">
                <h5 className="topic-title">{t.title}</h5>
                <p className="topic-desc">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
