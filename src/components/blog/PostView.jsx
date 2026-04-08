import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { rewriteImageUrl } from '../../lib/githubApi.js'
import './PostView.css'

/**
 * Fix double-escaped LaTeX in markdown files.
 * Some posts use \\log, \\frac, \_ etc. instead of \log, \frac, _.
 * We normalize the content inside math delimiters before parsing.
 */
export function fixMathEscaping(md) {
  const fixInner = (s) =>
    s
      .replace(/\u00a0/g, ' ')  // non-breaking space → regular space (KaTeX rejects U+00A0)
      .replace(/\\\\/g, '\\')   // \\cmd  → \cmd
      .replace(/\\_/g, '_')     // \_     → _  (subscript in KaTeX)
      .replace(/\\=/g, '=')     // \=     → =

  // Display math $$...$$  (may span multiple lines)
  // Normalize so that $$ is always on its own line — remark-math parses this more reliably
  md = md.replace(/\$\$([\s\S]*?)\$\$/g, (_, inner) => '\n$$\n' + fixInner(inner).trim() + '\n$$\n')
  // Inline math $...$
  md = md.replace(/\$(?!\$)([^$\n]+?)\$/g, (_, inner) => '$' + fixInner(inner) + '$')
  return md
}

// Rehype plugin: rewrite relative image src to GitHub raw URLs
function rehypeRewriteImages() {
  return (tree) => {
    function visit(node) {
      if (node.type === 'element' && node.tagName === 'img') {
        if (node.properties && node.properties.src) {
          node.properties.src = rewriteImageUrl(node.properties.src)
        }
      }
      if (node.children) node.children.forEach(visit)
    }
    visit(tree)
  }
}

export default function PostView({ post }) {
  const { title, date, author, categoryPaths, content } = post
  const tags = categoryPaths[0] || []
  const fixedContent = fixMathEscaping(content)

  return (
    <article className="post-view">
      <header className="post-view__header">
        <div className="post-view__tags">
          {tags.map((t, i) => (
            <span key={i} className="tag">{t.toUpperCase()}</span>
          ))}
        </div>
        <h1 className="post-view__title">{title}</h1>
        <div className="post-view__meta">
          <img src="/static/img/jlcrimson.png" alt={author} className="post-view__avatar" />
          <span className="post-view__author">{author}</span>
          <span className="post-view__sep">·</span>
          <time className="post-view__date">{date}</time>
        </div>
      </header>

      <hr className="post-view__divider" />

      <div className="post-view__content">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRewriteImages]}
          components={{
            img: ({ node, ...props }) => (
              <img {...props} style={{ maxWidth: '100%', borderRadius: 6, margin: '16px 0' }} />
            ),
            code: ({ node, inline, className, children, ...props }) => {
              if (inline) {
                return <code className="post-inline-code" {...props}>{children}</code>
              }
              return (
                <pre className="post-code-block">
                  <code {...props}>{children}</code>
                </pre>
              )
            },
          }}
        >
          {fixedContent}
        </ReactMarkdown>
      </div>
    </article>
  )
}
