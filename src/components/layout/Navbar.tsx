import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { NAV_ITEMS, ROUTES, SECTION_IDS } from '@/constants/navigation'
import { PROFILE } from '@/data/profile'
import { useActiveSection, useLockBodyScroll, useScrolledPast, useTheme } from '@/hooks'
import { cn } from '@/lib/cn'
import { anchorToId, scrollToSection } from '@/utils/scroll'

import { ButtonLink } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'

const SECTION_ORDER = Object.values(SECTION_IDS)

interface NavbarProps {
  onOpenCommandPalette: () => void
}

export function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const scrolled = useScrolledPast(16)
  const { isDark, toggleTheme } = useTheme()

  const isHome = location.pathname === ROUTES.home
  const activeSection = useActiveSection(isHome ? SECTION_ORDER : [], 140)

  useLockBodyScroll(mobileOpen)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  /**
   * Anchor links have to work from anywhere. On the home route we scroll
   * directly; from a sub-route we push `/#section` and let the home page pick
   * the hash up on mount.
   */
  const handleNavClick = useCallback(
    (href: string, kind: 'section' | 'route') => (event: React.MouseEvent) => {
      if (kind === 'route') return

      event.preventDefault()
      const id = anchorToId(href)
      if (!id) return

      setMobileOpen(false)

      if (isHome) {
        scrollToSection(id)
        window.history.replaceState(null, '', href)
      } else {
        navigate(`${ROUTES.home}#${id}`)
      }
    },
    [isHome, navigate]
  )

  const isActive = useMemo(
    () =>
      (item: (typeof NAV_ITEMS)[number]): boolean => {
        if (item.kind === 'route') return location.pathname === item.href
        return isHome && activeSection === item.id
      },
    [activeSection, isHome, location.pathname]
  )

  return (
    <>
      <a
        href="#main-content"
        className="sr-only-focusable fixed left-4 top-4 z-[120] rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white focus:ring-4 focus:ring-accent/40"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[65] transition-all duration-500 ease-premium',
          scrolled ? 'py-2.5' : 'py-4'
        )}
      >
        <div className="container-page">
          <nav
            aria-label="Primary"
            className={cn(
              'flex items-center justify-between gap-3 rounded-2xl px-3 transition-all duration-500 ease-premium sm:px-4',
              scrolled ? 'glass-strong h-14 shadow-lifted' : 'h-14 border border-transparent'
            )}
          >
            {/* Wordmark */}
            <Link
              to={ROUTES.home}
              onClick={handleNavClick(`#${SECTION_IDS.hero}`, isHome ? 'section' : 'route')}
              className="group flex shrink-0 items-center gap-2.5 rounded-lg"
              aria-label={`${PROFILE.name} — home`}
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent-sheen font-mono text-xs font-bold text-white shadow-[0_4px_16px_-6px_rgb(var(--color-accent))]">
                {PROFILE.initials}
              </span>
              <span className="flex min-w-0 flex-col leading-none">
                <span className="truncate text-sm font-semibold tracking-tight text-content-primary">
                  {PROFILE.name}
                </span>
                <span className="mt-0.5 hidden font-mono text-[0.65rem] text-content-muted sm:block">
                  {PROFILE.role}
                </span>
              </span>
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item)
                const to =
                  item.kind === 'route' ? item.href : `${isHome ? '' : ROUTES.home}${item.href}`

                return (
                  <li key={item.id}>
                    <Link
                      to={to}
                      onClick={handleNavClick(item.href, item.kind)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative flex items-center rounded-lg px-3 py-2 text-[0.82rem] font-medium transition-colors duration-300',
                        active
                          ? 'text-content-primary'
                          : 'text-content-secondary hover:text-content-primary'
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-lg border border-border bg-surface-hover"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-1.5">
              <Tooltip label="Search — ⌘K" className="hidden md:inline-flex">
                <button
                  type="button"
                  onClick={onOpenCommandPalette}
                  aria-label="Open command palette"
                  className="flex h-9 items-center gap-2 rounded-lg border border-border bg-surface/60 px-2.5 text-content-muted transition-colors hover:border-border-strong hover:text-content-primary"
                >
                  <Icon name="search" className="h-3.5 w-3.5" />
                  <kbd className="font-mono text-[0.65rem]">⌘K</kbd>
                </button>
              </Tooltip>

              <Tooltip label={isDark ? 'Switch to light' : 'Switch to dark'}>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-content-secondary transition-colors hover:border-border-strong hover:text-content-primary"
                >
                  <Icon name={isDark ? 'sun' : 'moon'} className="h-4 w-4" />
                </button>
              </Tooltip>

              <ButtonLink
                href={PROFILE.resumePath}
                download={PROFILE.resumeFileName}
                external={false}
                variant="primary"
                size="sm"
                iconLeft="download"
                className="hidden sm:inline-flex"
              >
                Resume
              </ButtonLink>

              <button
                type="button"
                onClick={() => setMobileOpen((open) => !open)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-content-primary lg:hidden"
              >
                <Icon name={mobileOpen ? 'x' : 'menu'} className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[64] lg:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className="glass-strong absolute inset-x-4 top-[4.75rem] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl p-3 shadow-lifted"
            >
              <ul className="flex flex-col gap-0.5">
                {NAV_ITEMS.map((item) => {
                  const active = isActive(item)
                  const to =
                    item.kind === 'route' ? item.href : `${isHome ? '' : ROUTES.home}${item.href}`

                  return (
                    <li key={item.id}>
                      <Link
                        to={to}
                        onClick={handleNavClick(item.href, item.kind)}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors',
                          active
                            ? 'bg-accent/12 text-accent'
                            : 'text-content-secondary hover:bg-surface-hover hover:text-content-primary'
                        )}
                      >
                        <Icon name={item.icon} className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Link
                  to={ROUTES.dashboard}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm text-content-secondary hover:text-content-primary"
                >
                  <Icon name="dashboard" className="h-4 w-4" />
                  Dashboard
                </Link>
                <ButtonLink
                  href={PROFILE.resumePath}
                  download={PROFILE.resumeFileName}
                  external={false}
                  variant="primary"
                  size="md"
                  iconLeft="download"
                >
                  Resume
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
