import { useState } from 'react'

export function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored !== null ? stored : defaultValue
    } catch {
      return defaultValue
    }
  })

  const set = v => {
    setValue(v)
    try {
      if (v === null || v === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, v)
    } catch {}
  }

  return [value, set]
}
