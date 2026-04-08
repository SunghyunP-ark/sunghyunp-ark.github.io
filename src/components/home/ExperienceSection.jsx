import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle.jsx'
import { experience } from '../../data/experience.js'
import './ExperienceSection.css'

export default function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionTitle>Experience</SectionTitle>
        <div className="exp-list">
          {experience.map((e, i) => (
            <motion.div
              key={e.id}
              className="exp-row"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="exp-left">
                <div className="exp-logo-wrap">
                  <img src={e.logo} alt={e.org} className="exp-logo" />
                </div>
                <div className="exp-meta">
                  <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" className="exp-org">{e.org}</a>
                  <span className="exp-subtitle">{e.subtitle}</span>
                  <span className="exp-role">{e.role}</span>
                  <span className="exp-period">{e.period}</span>
                </div>
              </div>
              <div className="exp-right">
                <p>{e.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
