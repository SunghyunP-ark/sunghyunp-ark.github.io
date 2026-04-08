import SectionTitle from '../ui/SectionTitle.jsx'
import SkillBar from '../ui/SkillBar.jsx'
import { skills } from '../../data/skills.js'
import './SkillsSection.css'

export default function SkillsSection() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionTitle>Skills &amp; Expertise</SectionTitle>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <SkillBar key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
