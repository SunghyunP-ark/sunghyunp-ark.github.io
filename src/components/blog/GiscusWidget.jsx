import { useEffect, useRef } from 'react'
import './GiscusWidget.css'

export default function GiscusWidget() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    ref.current.innerHTML = ''
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'SunghyunP-ark/sunghyunp-ark.github.io')
    // TODO: Fill in repo-id and category-id after installing Giscus app on the repo
    // Visit https://giscus.app to generate these values
    script.setAttribute('data-repo-id', '')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', '')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'dark_dimmed')
    script.setAttribute('data-lang', 'en')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
    return () => {
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [])

  return (
    <div className="giscus-container">
      <div className="giscus-header">
        <i className="fas fa-comments" />
        <span>Discussion</span>
      </div>
      <div ref={ref} />
    </div>
  )
}
