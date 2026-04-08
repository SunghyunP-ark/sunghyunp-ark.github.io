import SectionTitle from '../ui/SectionTitle.jsx'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../../data/projects.js'
import './ProjectsSection.css'

export default function ProjectsSection() {
  return (
    <section id="publications" className="section section-alt">
      <div className="container">
        <SectionTitle>Projects</SectionTitle>
        <div className="projects-grid">
          {projects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
