import PostCard from './PostCard.jsx'
import './BlogFeed.css'

export default function BlogFeed({ posts, loading, error }) {
  if (loading) {
    return (
      <div className="blog-feed-status">
        <div className="blog-loader">
          <span className="blog-loader__dot" />
          <span className="blog-loader__dot" />
          <span className="blog-loader__dot" />
        </div>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--muted)' }}>
          Loading posts from GitHub…
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="blog-feed-status">
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--accent-2)' }}>
          <i className="fas fa-exclamation-triangle" /> {error}
        </p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="blog-feed-status">
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8rem', color: 'var(--muted)' }}>
          No posts found.
        </p>
      </div>
    )
  }

  return (
    <div className="blog-feed-grid">
      {posts.map(post => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
