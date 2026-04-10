import { useState, useEffect } from 'react'
import { fetchBlogFiles } from '../lib/githubApi.js'

// Module-level cache so route changes don't re-fetch
let cachedPosts = null
let fetchPromise = null

function buildCategoryTree(posts) {
  const root = { name: 'All', path: [], children: {}, postIndices: [] }
  posts.forEach((post, idx) => {
    post.categoryPaths.forEach(cp => {
      let node = root
      for (const seg of cp) {
        if (!node.children[seg]) {
          node.children[seg] = {
            name: seg,
            path: [...(node.path || []), seg],
            children: {},
            postIndices: [],
          }
        }
        node = node.children[seg]
      }
      node.postIndices.push(idx)
    })
  })
  return root
}

export function countPostsInNode(node) {
  let count = node.postIndices ? node.postIndices.length : 0
  for (const key in node.children) count += countPostsInNode(node.children[key])
  return count
}

export function useBlogPosts() {
  const [state, setState] = useState({
    posts: cachedPosts || [],
    categoryTree: buildCategoryTree(cachedPosts || []),
    loading: !cachedPosts,
    error: null,
  })

  useEffect(() => {
    if (cachedPosts) return
    if (fetchPromise) {
      fetchPromise.then(posts => {
        setState({ posts, categoryTree: buildCategoryTree(posts), loading: false, error: null })
      })
      return
    }
    // 1순위: 빌드 시 생성된 정적 파일 (GitHub API 호출 없음)
    // 2순위: 실시간 GitHub API (개발 환경 또는 정적 파일 없을 때)
    fetchPromise = fetch('/posts.json')
      .then(r => {
        if (!r.ok) throw new Error('no static posts')
        return r.json()
      })
      .catch(() => fetchBlogFiles('', []))
      .then(posts => {
        cachedPosts = posts
        setState({ posts, categoryTree: buildCategoryTree(posts), loading: false, error: null })
        return posts
      }).catch(err => {
        setState(s => ({ ...s, loading: false, error: err.message }))
        fetchPromise = null
      })
  }, [])

  return state
}

export function invalidateBlogCache() {
  cachedPosts = null
  fetchPromise = null
}
