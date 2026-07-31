import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'portfolio-theme'

const readInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  // Must match the inline bootstrap script in index.html, or the first paint
  // and the first React render disagree and the page visibly flips.
  return window.localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark'
}

const applyTheme = (theme: Theme): void => {
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#0B0F17' : '#F8FAFC')
}

/**
 * Dark/light theme with localStorage persistence.
 *
 * The initial attribute is written by an inline script in `index.html` so the
 * correct palette is painted before React hydrates — this hook only keeps
 * React state in sync with what is already on the document.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, setTheme, toggleTheme, isDark: theme === 'dark' }
}
