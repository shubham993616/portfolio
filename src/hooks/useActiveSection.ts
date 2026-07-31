import { useEffect, useState } from 'react'

/**
 * Scroll-spy for the sticky navbar.
 *
 * IntersectionObserver alone is unreliable for this: with sections of wildly
 * different heights, several can intersect at once and the "active" one flips
 * around. Instead we track scroll position against each section's measured
 * offset and pick the last one whose top has passed the navbar — which matches
 * what a reader perceives as "the section I am currently in".
 */
export function useActiveSection(sectionIds: readonly string[], offset = 120): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    if (sectionIds.length === 0) return

    let frame = 0

    const update = () => {
      frame = 0
      const scrollY = window.scrollY + offset
      let current = sectionIds[0] ?? ''

      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.offsetTop <= scrollY) current = id
      }

      // Pin the final section once the page is scrolled to the very bottom,
      // otherwise a short last section can never become active.
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 24
      if (atBottom) {
        const last = sectionIds[sectionIds.length - 1]
        if (last && document.getElementById(last)) current = last
      }

      setActiveId((previous) => (previous === current ? previous : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
