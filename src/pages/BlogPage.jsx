import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useBlogPosts } from '../hooks/useBlogPosts.js'
import CategoryTree from '../components/blog/CategoryTree.jsx'
import BlogFeed from '../components/blog/BlogFeed.jsx'
import './BlogPage.css'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function BlogPage() {
  const { posts, categoryTree, loading, error } = useBlogPosts()
  const [activePath, setActivePath] = useState([])
  const [query, setQuery] = useState('')

  const filtered = posts
    .filter(post => {
      const matchCat =
        activePath.length === 0 ||
        post.categoryPaths.some(cp =>
          activePath.every((seg, i) => cp[i] === seg)
        )
      const lq = query.toLowerCase()
      const matchSearch =
        !query ||
        post.title.toLowerCase().includes(lq) ||
        post.date.includes(lq) ||
        post.excerpt.toLowerCase().includes(lq)
      return matchCat && matchSearch
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

  return (
    <motion.div className="blog-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <div className="blog-page__header">
        <div className="container">
          <div className="blog-page__title-row">
            <h1 className="blog-page__title">Posts</h1>
            <Link to="/blog/editor" className="btn-outline" title="Write a new post">
              <i className="fas fa-pen" /> New Post
            </Link>
          </div>
          <p className="blog-page__desc">
            All posts are stored as Markdown files in the{' '}
            <code style={{ fontFamily: 'var(--font-ui)', fontSize: '0.85em', color: 'var(--code)', background: 'var(--surface-2)', padding: '1px 6px', borderRadius: 4 }}>blogs/</code>{' '}
            folder. Use the category tree and search to explore.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="blog-page__layout">
          <aside className="blog-page__sidebar">
            <CategoryTree
              categoryTree={categoryTree}
              activePath={activePath}
              onSelect={setActivePath}
              totalCount={posts.length}
            />
          </aside>

          <div className="blog-page__main">
            <div className="blog-search-wrap">
              <i className="fas fa-search blog-search-icon" />
              <input
                type="search"
                className="blog-search"
                placeholder="Search posts…"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <BlogFeed posts={filtered} loading={loading} error={error} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
