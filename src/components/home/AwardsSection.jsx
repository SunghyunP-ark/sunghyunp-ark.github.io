import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle.jsx'
import { awards } from '../../data/awards.js'
import './AwardsSection.css'

export default function AwardsSection() {
  return (
    <section id="awards" className="section section-alt">
      <div className="container">
        <SectionTitle>Awards &amp; Honors</SectionTitle>
        <div className="awards-list">
          {awards.map((a, i) => (
            <motion.div
              key={a.id}
              className="award-item"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="award-icon-wrap">
                <img src={a.logo} alt="Yonsei" className="award-logo" />
              </div>
              <div className="award-content">
                <h5 className="award-title">
                  {a.title} &mdash; <em>{a.subtitle}</em>
                </h5>
                <p className="award-desc">{a.description}</p>
              </div>
              <div className="award-badge">
                <i className="fas fa-trophy" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
