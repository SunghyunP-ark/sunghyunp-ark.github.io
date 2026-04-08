/**
 * Zero-dependency YAML front matter parser.
 * Handles: title, date, author, image, summary, category (single), categories (array/string)
 */
export function parseFrontMatter(md) {
  md = md.replace(/\r\n/g, '\n')
  const fmMatch = md.match(/^---\s*\n([\s\S]*?)\n---\s*\n/)
  let front = {}
  let content = md
  if (fmMatch) {
    const frontRaw = fmMatch[1]
    frontRaw.split('\n').forEach(line => {
      const idx = line.indexOf(':')
      if (idx !== -1) {
        const key = line.slice(0, idx).trim()
        let val = line.slice(idx + 1).trim()
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1)
        }
        front[key] = val
      }
    })
    content = md.slice(fmMatch[0].length)
  }
  return { front, content }
}

export function extractCategoryPaths(front, parentPath = []) {
  let categoryPaths = []
  if (front.categories !== undefined) {
    let cats = front.categories.trim()
    let arr =
      cats.startsWith('[') && cats.endsWith(']')
        ? JSON.parse(cats)
        : [cats]
    arr.forEach(cat => {
      const segs = cat
        .split('/')
        .map(s => s.trim())
        .filter(Boolean)
      if (segs.length > 0) categoryPaths.push(segs)
    })
  } else if (front.category !== undefined) {
    const cat = front.category.trim()
    const segs = cat
      .split('/')
      .map(s => s.trim())
      .filter(Boolean)
    if (segs.length > 0) categoryPaths.push(segs)
  }
  if (categoryPaths.length === 0) {
    categoryPaths.push(parentPath)
  }
  return categoryPaths
}
