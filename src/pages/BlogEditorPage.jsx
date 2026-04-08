import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import FrontMatterForm from '../components/editor/FrontMatterForm.jsx'
import EditorPane from '../components/editor/EditorPane.jsx'
import PreviewPane from '../components/editor/PreviewPane.jsx'
import ImageHelper from '../components/editor/ImageHelper.jsx'
import { useBlogPosts, invalidateBlogCache } from '../hooks/useBlogPosts.js'
import { commitBlogFile } from '../lib/githubApi.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import './BlogEditorPage.css'

function todayISO() {
  return new Date().toISOString().split('T')[0]
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

function assembleMd(fm, body) {
  const lines = ['---']
  if (fm.title)    lines.push(`title: ${fm.title}`)
  if (fm.date)     lines.push(`date: ${fm.date}`)
  if (fm.category) lines.push(`category: ${fm.category}`)
  if (fm.image)    lines.push(`image: ${fm.image}`)
  if (fm.summary)  lines.push(`summary: "${fm.summary}"`)
  lines.push('---', '')
  return lines.join('\n') + body
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
}

export default function BlogEditorPage() {
  const [searchParams] = useSearchParams()
  const editSlug = searchParams.get('slug')
  const { posts } = useBlogPosts()

  const [token, setToken] = useLocalStorage('github_pat', '')
  const [showTokenModal, setShowTokenModal] = useState(false)
  const [tokenInput, setTokenInput] = useState(token || '')

  const existingPost = editSlug ? posts.find(p => p.slug === editSlug) : null

  const [fm, setFm] = useState({
    title: existingPost?.title || '',
    date: existingPost?.date || todayISO(),
    category: existingPost?.categoryPaths?.[0]?.join('/') || '',
    image: '',
    summary: existingPost?.excerpt || '',
  })
  const [body, setBody] = useState(existingPost?.content || '')
  const [committing, setCommitting] = useState(false)
  const [commitMsg, setCommitMsg] = useState(null)
  const editorRef = useRef(null)

  // Pre-fill when existing post loads (async)
  useEffect(() => {
    if (existingPost && !fm.title) {
      setFm({
        title: existingPost.title,
        date: existingPost.date,
        category: existingPost.categoryPaths?.[0]?.join('/') || '',
        image: '',
        summary: existingPost.excerpt || '',
      })
      setBody(existingPost.content)
    }
  }, [existingPost])

  const handleInsertImage = useCallback((snippet) => {
    setBody(prev => prev + '\n' + snippet + '\n')
  }, [])

  const handleCommit = async () => {
    if (!fm.title) { alert('Title is required.'); return }
    if (!token) { setShowTokenModal(true); return }
    setCommitting(true)
    setCommitMsg(null)
    try {
      const filename = editSlug
        ? `${editSlug}.md`
        : `${fm.date}-${slugify(fm.title)}.md`
      const path = `blogs/${filename}`
      const fullMd = assembleMd(fm, body)
      await commitBlogFile({
        token,
        path,
        content: fullMd,
        sha: existingPost?.sha,
        message: editSlug ? `Update post: ${fm.title}` : `Add post: ${fm.title}`,
      })
      invalidateBlogCache()
      setCommitMsg({ ok: true, text: `✓ Published as blogs/${filename}` })
    } catch (err) {
      setCommitMsg({ ok: false, text: `Error: ${err.message}` })
    }
    setCommitting(false)
  }

  const preview = assembleMd(fm, body).replace(/^---[\s\S]*?---\n/, '')

  return (
    <motion.div className="editor-page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {/* Top bar */}
      <div className="editor-topbar">
        <Link to="/blog" className="editor-topbar__back">
          <i className="fas fa-arrow-left" /> Blog
        </Link>
        <span className="editor-topbar__title">
          {editSlug ? `Editing: ${editSlug}` : 'New Post'}
        </span>
        <div className="editor-topbar__actions">
          <ImageHelper onInsert={handleInsertImage} />
          <button
            className="btn-outline"
            onClick={() => { setTokenInput(token || ''); setShowTokenModal(true) }}
            title="GitHub token settings"
          >
            <i className="fas fa-cog" />
          </button>
          <button
            className="btn-solid"
            onClick={handleCommit}
            disabled={committing}
          >
            <i className={committing ? 'fas fa-spinner fa-spin' : 'fas fa-upload'} />
            {committing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>

      {commitMsg && (
        <div className={`editor-banner ${commitMsg.ok ? 'editor-banner--ok' : 'editor-banner--err'}`}>
          {commitMsg.text}
          <button onClick={() => setCommitMsg(null)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {/* Body */}
      <div className="editor-body">
        {/* Left: frontmatter + code mirror */}
        <div className="editor-left">
          <FrontMatterForm values={fm} onChange={setFm} />
          <div className="editor-cm-wrap">
            <EditorPane value={body} onChange={setBody} editorRef={editorRef} />
          </div>
        </div>
        {/* Right: preview */}
        <div className="editor-right">
          <PreviewPane content={preview} />
        </div>
      </div>

      {/* Token modal */}
      {showTokenModal && (
        <div className="editor-modal-overlay" onClick={() => setShowTokenModal(false)}>
          <div className="editor-modal" onClick={e => e.stopPropagation()}>
            <h4 className="editor-modal__title">GitHub Personal Access Token</h4>
            <p className="editor-modal__desc">
              Required to publish posts. Create a token at{' '}
              <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer">
                github.com/settings/tokens
              </a>{' '}
              with <code>repo</code> scope. Stored in localStorage — never sent anywhere except GitHub API.
            </p>
            <input
              className="fm-input"
              type="password"
              placeholder="ghp_xxxxxxxxxxxx"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
            />
            <div className="editor-modal__actions">
              <button className="btn-outline" onClick={() => setShowTokenModal(false)}>Cancel</button>
              <button className="btn-solid" onClick={() => { setToken(tokenInput); setShowTokenModal(false) }}>Save</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
