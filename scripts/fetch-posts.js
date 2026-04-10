#!/usr/bin/env node
/**
 * 빌드 전에 실행: GitHub API로 블로그 포스트를 가져와 public/posts.json에 저장
 * GitHub Actions에서 GITHUB_READ_TOKEN 환경변수로 인증
 */

import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const GITHUB_USERNAME = 'SunghyunP-ark'
const GITHUB_REPO     = 'sunghyunp-ark.github.io'
const BRANCH          = 'main'
const BLOG_DIR        = 'blogs'
const TOKEN           = process.env.GITHUB_READ_TOKEN || ''  // 빌드 서버에서만 사용, 번들에 포함 안 됨

const headers = {
  'Accept': 'application/vnd.github+json',
  ...(TOKEN ? { Authorization: `token ${TOKEN}` } : {}),
}

function parseFrontMatter(md) {
  const match = md.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)/)
  if (!match) return { front: {}, content: md }
  const front = {}
  match[1].split(/\r?\n/).forEach(line => {
    const idx = line.indexOf(':')
    if (idx < 0) return
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    front[key] = val
  })
  return { front, content: match[2] }
}

function rewriteImageUrl(src) {
  if (!src || src.match(/^https?:\/\//) || src.startsWith('data:')) return src
  const clean = src.replace(/^\/+/, '')
  return `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_REPO}/${BRANCH}/${clean}`
}

async function fetchDir(dir = '', parentPath = []) {
  const basePath = BLOG_DIR + (dir ? '/' + dir : '')
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${GITHUB_REPO}/contents/${basePath}?ref=${BRANCH}`
  const resp = await fetch(url, { headers })
  if (!resp.ok) throw new Error(`GitHub API ${resp.status} for ${basePath}`)
  const files = await resp.json()

  files.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name)
    return a.type === 'dir' ? -1 : 1
  })

  const posts = []
  for (const item of files) {
    if (item.type === 'dir') {
      const sub = await fetchDir(dir ? `${dir}/${item.name}` : item.name, [...parentPath, item.name])
      posts.push(...sub)
    } else if (item.type === 'file' && item.name.endsWith('.md')) {
      const res  = await fetch(item.download_url, { headers })
      const md   = await res.text()
      const { front, content } = parseFrontMatter(md)
      const slug  = item.name.replace(/\.md$/, '')
      const cat   = front.category || ''
      const catParts = cat ? cat.split('/').map(s => s.trim()) : []
      const categoryPaths = catParts.length ? [catParts] : (parentPath.length ? [parentPath] : [])
      posts.push({
        slug,
        title:         front.title || slug,
        date:          front.date  || '',
        author:        front.author || 'Sunghyun Park',
        image:         front.image ? rewriteImageUrl(front.image) : '',
        excerpt:       front.summary || content.replace(/#{1,6}\s/g, '').replace(/\*\*/g, '').split(/\s+/).slice(0, 40).join(' '),
        content,
        categoryPaths,
        sha:           item.sha,
      })
    }
  }
  return posts
}

console.log('📥 블로그 포스트 가져오는 중...')
const posts = await fetchDir()
posts.sort((a, b) => b.date.localeCompare(a.date))
console.log(`✅ ${posts.length}개 포스트 완료`)

const outDir  = join(__dirname, '..', 'public')
const outFile = join(outDir, 'posts.json')
mkdirSync(outDir, { recursive: true })
writeFileSync(outFile, JSON.stringify(posts, null, 2), 'utf-8')
console.log(`💾 저장 완료: public/posts.json`)
