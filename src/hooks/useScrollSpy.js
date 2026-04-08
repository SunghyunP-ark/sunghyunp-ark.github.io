import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, offset = 100) {
  const [active, setActive] = useState(sectionIds[0] || '')

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + offset
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [sectionIds, offset])

  return active
}
