import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './PostCard.css'

export default function PostCard({ post }) {
  const { slug, title, date, image, excerpt, categoryPaths } = post
  const tags = categoryPaths[0] || []

  return (
    <motion.article
      className="post-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/blog/${slug}`} className="post-card__link">
        {image ? (
          <div className="post-card__img-wrap">
            <img src={image} alt={title} className="post-card__img" />
          </div>
        ) : (
          <div className="post-card__img-placeholder" />
        )}
        <div className="post-card__body">
          <div className="post-card__tags">
            {tags.map((t, i) => (
              <span key={i} className="tag">{t.toUpperCase()}</span>
            ))}
          </div>
          {date && (
            <time className="post-card__date">{date}</time>
          )}
          <h3 className="post-card__title">{title}</h3>
          {excerpt && (
            <p className="post-card__excerpt">
              {excerpt.replace(/\.+$/, '')}…
            </p>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
