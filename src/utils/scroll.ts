/** Height of the sticky navbar, mirrored from `--nav-height` in globals.css. */
const NAV_OFFSET = 68

export const scrollToSection = (sectionId: string, extraOffset = 24): void => {
  const element = document.getElementById(sectionId)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - extraOffset
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })

  // Move focus so keyboard and screen-reader users land where sighted users do.
  element.setAttribute('tabindex', '-1')
  element.focus({ preventScroll: true })
  element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true })
}

export const scrollToTop = (): void => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}

/** `#projects` -> `projects`; returns null for route paths. */
export const anchorToId = (href: string): string | null =>
  href.startsWith('#') ? href.slice(1) : null
