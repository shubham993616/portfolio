import { Link, useLocation, useNavigate } from 'react-router-dom'

import { NAV_ITEMS, ROUTES, SECONDARY_NAV } from '@/constants/navigation'
import { PROFILE } from '@/data/profile'
import { SOCIALS } from '@/data/socials'
import { currentYear } from '@/lib/format'
import { anchorToId, scrollToSection, scrollToTop } from '@/utils/scroll'

import { Container } from '../ui/Container'
import { Icon } from '../ui/Icon'

const BUILT_WITH = ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Vercel']

export function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === ROUTES.home

  const handleAnchor = (href: string) => (event: React.MouseEvent) => {
    const id = anchorToId(href)
    if (!id) return
    event.preventDefault()
    if (isHome) scrollToSection(id)
    else navigate(`${ROUTES.home}#${id}`)
  }

  return (
    <footer className="relative mt-8 border-t border-border bg-background-alt/60 backdrop-blur">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
          {/* Identity */}
          <div className="space-y-4">
            <Link
              to={ROUTES.home}
              onClick={scrollToTop}
              className="inline-flex items-center gap-2.5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-sheen font-mono text-xs font-bold text-white">
                {PROFILE.initials}
              </span>
              <span className="font-semibold tracking-tight text-content-primary">
                {PROFILE.name}
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-relaxed text-content-secondary">
              {PROFILE.headline}
            </p>

            <div className="flex items-center gap-2 text-xs text-content-muted">
              <Icon name="map-pin" className="h-3.5 w-3.5" />
              {PROFILE.location}
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              {PROFILE.availability}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h2 className="mb-4 text-sm font-semibold text-content-primary">Quick links</h2>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={
                      item.kind === 'route' ? item.href : `${isHome ? '' : ROUTES.home}${item.href}`
                    }
                    onClick={item.kind === 'section' ? handleAnchor(item.href) : undefined}
                    className="inline-flex items-center gap-1.5 text-sm text-content-secondary transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* More */}
          <nav aria-label="More pages">
            <h2 className="mb-4 text-sm font-semibold text-content-primary">More</h2>
            <ul className="space-y-2.5">
              {SECONDARY_NAV.map((item) => (
                <li key={item.id}>
                  <Link
                    to={
                      item.kind === 'route' ? item.href : `${isHome ? '' : ROUTES.home}${item.href}`
                    }
                    onClick={item.kind === 'section' ? handleAnchor(item.href) : undefined}
                    className="inline-flex items-center gap-1.5 text-sm text-content-secondary transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={PROFILE.resumePath}
                  download={PROFILE.resumeFileName}
                  className="inline-flex items-center gap-1.5 text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  Download Resume
                  <Icon name="download" className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact + socials */}
          <div>
            <h2 className="mb-4 text-sm font-semibold text-content-primary">Get in touch</h2>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  <Icon name="mail" className="h-3.5 w-3.5 shrink-0" />
                  {PROFILE.email}
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-content-secondary transition-colors hover:text-accent"
                >
                  <Icon name="phone" className="h-3.5 w-3.5 shrink-0" />
                  {PROFILE.phone}
                </a>
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {SOCIALS.filter((social) => social.showInHero).map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} — ${social.handle}`}
                    style={{ '--tint': social.rgb } as React.CSSProperties}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-content-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--tint))] hover:text-[rgb(var(--tint))]"
                  >
                    <Icon name={social.icon} className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-content-muted">
            © {currentYear()} {PROFILE.name}. All rights reserved.
          </p>

          <p className="flex flex-wrap items-center gap-1.5 text-xs text-content-muted">
            <span>Built with</span>
            {BUILT_WITH.map((tech, index) => (
              <span key={tech} className="font-mono text-content-secondary">
                {tech}
                {index < BUILT_WITH.length - 1 && <span className="text-content-muted">,</span>}
              </span>
            ))}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 self-start text-xs font-medium text-content-secondary transition-colors hover:text-accent sm:self-auto"
          >
            Back to top
            <Icon name="arrow-up" className="h-3 w-3" />
          </button>
        </div>
      </Container>
    </footer>
  )
}
