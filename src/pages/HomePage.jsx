import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection.jsx'
import EducationSection from '../components/home/EducationSection.jsx'
import ProjectsSection from '../components/home/ProjectsSection.jsx'
import TopicsSection from '../components/home/TopicsSection.jsx'
import SkillsSection from '../components/home/SkillsSection.jsx'
import ExperienceSection from '../components/home/ExperienceSection.jsx'
import AwardsSection from '../components/home/AwardsSection.jsx'
import ContactSection from '../components/home/ContactSection.jsx'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function HomePage() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <HeroSection />
      <EducationSection />
      <ProjectsSection />
      <TopicsSection />
      <SkillsSection />
      <ExperienceSection />
      <AwardsSection />
      <ContactSection />
      <footer style={{ padding: '32px 40px', borderTop: '1px solid var(--border-2)', textAlign: 'center', fontFamily: 'var(--font-ui)', fontSize: '0.72rem', color: 'var(--muted)' }}>
        © 2025 Sunghyun Park
      </footer>
    </motion.div>
  )
}
