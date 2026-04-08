import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { fixMathEscaping } from '../blog/PostView.jsx'
import './PreviewPane.css'

export default function PreviewPane({ content }) {
  const fixed = fixMathEscaping(content || '')
  return (
    <div className="preview-pane">
      <div className="preview-pane__header">
        <span className="preview-pane__label">
          <i className="fas fa-eye" /> Preview
        </span>
      </div>
      <div className="preview-pane__content post-view__content">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
          components={{
            img: ({ node, ...props }) => (
              <img {...props} style={{ maxWidth: '100%', borderRadius: 6, margin: '12px 0' }} />
            ),
            code: ({ node, inline, children, ...props }) => {
              if (inline) return <code className="post-inline-code" {...props}>{children}</code>
              return <pre className="post-code-block"><code {...props}>{children}</code></pre>
            },
          }}
        >
          {fixed || '*Start writing to see a preview…*'}
        </ReactMarkdown>
      </div>
    </div>
  )
}
