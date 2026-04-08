import { motion } from 'framer-motion'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const { title, date, image, description, members, highlight, links } = project
  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      <div className="project-card__img-wrap">
        <img src={image} alt={title} className="project-card__img" />
      </div>
      <div className="project-card__body">
        <span className="project-card__date">{date}</span>
        <h5 className="project-card__title">{title}</h5>
        <p className="project-card__desc">{description}</p>
        {members && members.length > 0 && (
          <p className="project-card__members">
            <strong>Members:</strong>{' '}
            {members.map((m, i) => (
              <span key={i}>
                {i > 0 && ', '}
                <span className={m === highlight ? 'project-card__me' : ''}>{m}</span>
              </span>
            ))}
          </p>
        )}
        <div className="project-card__links">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className={l.primary ? 'btn-solid' : 'btn-outline'}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
