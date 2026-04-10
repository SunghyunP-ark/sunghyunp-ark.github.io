import { parseFrontMatter, extractCategoryPaths } from './parseFrontMatter.js'

const GITHUB_USERNAME = 'SunghyunP-ark'
const GITHUB_REPO = 'sunghyunp-ark.github.io'
const BRANCH = 'main'
const BLOG_DIR = 'blogs'

// Priority: 1) user-set PAT in localStorage  2) build-time read token  3) unauthenticated
const BUILD_READ_TOKEN = import.meta.env.VITE_GITHUB_READ_TOKEN || ''

function getHeaders() {
  const token = localStorage.getItem('github_pat') || BUILD_READ_TOKEN
  return token ? { Authorization: `token ${token}` } : {}
}

export function rewriteImageUrl(src) {
  if (!src) return src
  if (src.match(/^https?:\/\//) || src.startsWith('data:') || src.startsWith('#')) return src
  const clean = src.replace(/^\/+/, '')
  return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${BRANCH}/${clean}`
}

export async function fetchBlogFiles(dir = '', parentPath = []) {
  const basePath = BLOG_DIR + (dir ? '/' + dir : '')
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${basePath}?ref=${BRANCH}`
  let files
  try {
    const resp = await fetch(url, { headers: getHeaders() })
    if (!resp.ok) throw new Error(`GitHub API ${resp.status}`)
    files = await resp.json()
  } catch (err) {
    console.error('Error listing', basePath, err)
    return []
  }

  files.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name)
    return a.type === 'dir' ? -1 : 1
  })

  const posts = []
  for (const item of files) {
    if (item.type === 'dir') {
      const newPath = [...parentPath, item.name]
      const subPosts = await fetchBlogFiles(dir ? `${dir}/${item.name}` : item.name, newPath)
      posts.push(...subPosts)
    } else if (item.type === 'file' && item.name.endsWith('.md')) {
      try {
        const res = await fetch(item.download_url, { headers: getHeaders() })
        const mdContent = await res.text()
        const { front, content } = parseFrontMatter(mdContent)
        const title = front.title || item.name.replace(/\.md$/, '')
        const date = front.date || ''
        const author = front.author || 'Sunghyun Park'
        const rawImage = front.image || ''
        const image = rawImage ? rewriteImageUrl(rawImage) : ''
        const categoryPaths = extractCategoryPaths(front, parentPath)
        const slug = item.name.replace(/\.md$/, '')
        const sha = item.sha

        let excerpt = front.summary || ''
        if (!excerpt) {
          const tmp = document.createElement('div')
          // strip markdown roughly
          tmp.textContent = content.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').replace(/`/g, '')
          const words = tmp.textContent.trim().split(/\s+/).slice(0, 40)
          excerpt = words.join(' ')
        }

        posts.push({ slug, title, date, author, image, content, excerpt, categoryPaths, sha })
      } catch (err) {
        console.error('Error loading', item.name, err)
      }
    }
  }
  return posts
}

export async function commitBlogFile({ token, path, content, sha, message }) {
  const encoded = btoa(unescape(encodeURIComponent(content)))
  const body = { message, content: encoded, branch: BRANCH }
  if (sha) body.sha = sha
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error ${res.status}`)
  }
  return res.json()
}

export async function uploadImageFile({ token, filename, base64Content }) {
  const path = `static/img/${filename}`
  const body = {
    message: `Upload image: ${filename}`,
    content: base64Content,
    branch: BRANCH,
  }
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  )
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error ${res.status}`)
  }
  return res.json()
}
