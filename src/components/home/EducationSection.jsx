import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle.jsx'
import './EducationSection.css'

export default function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle>Education</SectionTitle>
        <motion.div
          className="edu-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="edu-logo-col">
            <img src="/static/img/logo/yonsei.png" alt="Yonsei University" className="edu-logo" />
          </div>
          <div className="edu-content">
            <span className="edu-period">Sep. 2026 – Present</span>
            <h4 className="edu-school">Yonsei University</h4>
            <p className="edu-degree">M.S. in Artificial Intelligence</p>
          </div>
        </motion.div>
        
      </div>
      
      <div className="container">
        <SectionTitle>Education</SectionTitle>
        <motion.div
          className="edu-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="edu-logo-col">
            <img src="/static/img/logo/yonsei.png" alt="Yonsei University" className="edu-logo" />
          </div>
          <div className="edu-content">
            <span className="edu-period">Mar. 2020 – Aug. 2026</span>
            <h4 className="edu-school">Yonsei University</h4>
            <p className="edu-degree">B.S. in Biochemistry &amp; Computer Science (Double Major)</p>
            <div className="edu-details">
              <span className="edu-gpa">
                <i className="fas fa-star" /> GPA: 3.94 / 4.3 &nbsp;·&nbsp; CS Major GPA: 4.03 / 4.3
              </span>
              <span className="edu-military">
                <i className="fas fa-shield-alt" /> Military Service: Oct. 2022 – Jul. 2024 (R.O.K Air Force Sergeant)
              </span>
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}
