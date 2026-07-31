import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router preserves scroll position across navigations. For a content
 * site that is the wrong default — landing halfway down a case study you just
 * opened is disorienting — so every path change resets to the top, while hash
 * links are left alone for the in-page anchors to handle.
 */
export function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
