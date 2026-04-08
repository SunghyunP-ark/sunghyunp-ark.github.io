import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useBlogPosts } from '../hooks/useBlogPosts.js'
import PostView from '../components/blog/PostView.jsx'
import GiscusWidget from '../components/blog/GiscusWidget.jsx'
import './BlogPostPage.css'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const { posts, loading, error } = useBlogPosts()

  const post = posts.find(p => p.slug === slug)

  if (loading) {
    return (
      <motion.div className="post-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <div className="post-page__loading">
          <div className="blog-loader">
            <span className="blog-loader__dot" />
            <span className="blog-loader__dot" />
            <span className="blog-loader__dot" />
          </div>
          <span>Loading post…</span>
        </div>
      </motion.div>
    )
  }

  if (error || !post) {
    return (
      <motion.div className="post-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <div className="container" style={{ padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-ui)', color: 'var(--muted)' }}>
            {error || 'Post not found.'}
          </p>
          <Link to="/blog" className="btn-outline" style={{ marginTop: 24, display: 'inline-flex' }}>
            ← Back to Blog
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div className="post-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="post-page__back-bar">
        <div className="container">
          <Link to="/blog" className="post-page__back">
            <i className="fas fa-arrow-left" /> Back to Posts
          </Link>
          <Link to={`/blog/editor?slug=${slug}`} className="post-page__edit">
            <i className="fas fa-pen" /> Edit
          </Link>
        </div>
      </div>
      <div className="container post-page__container">
        <PostView post={post} />
        <GiscusWidget />
      </div>
    </motion.div>
  )
}
