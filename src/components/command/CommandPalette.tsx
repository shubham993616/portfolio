import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { overlayBackdrop, overlayPanel } from '@/animations/variants'
import { KEYBOARD_SHORTCUTS, NAV_ITEMS, ROUTES, SECONDARY_NAV } from '@/constants/navigation'
import { PROFILE } from '@/data/profile'
import { PROJECTS } from '@/data/projects'
import { SOCIALS } from '@/data/socials'
import { useLockBodyScroll, useTheme } from '@/hooks'
import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'
import { anchorToId, scrollToSection } from '@/utils/scroll'

import { Icon } from '../ui/Icon'

type CommandGroup = 'Navigation' | 'Projects' | 'Actions' | 'Connect'

interface CommandItem {
  id: string
  label: string
  hint?: string
  icon: IconName
  group: CommandGroup
  keywords: string
  run: () => void
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/**
 * ⌘K / Ctrl-K spotlight search.
 *
 * Fully keyboard driven: arrows move, Enter runs, Escape closes, and the
 * active row is announced through `aria-activedescendant` on the input so
 * screen-reader users track the selection without focus ever leaving the box.
 */
export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleTheme, isDark } = useTheme()

  useLockBodyScroll(open)

  const close = useCallback(() => onOpenChange(false), [onOpenChange])

  const goToSection = useCallback(
    (href: string) => {
      const id = anchorToId(href)
      if (!id) return
      close()
      if (location.pathname === ROUTES.home) {
        window.setTimeout(() => scrollToSection(id), 60)
      } else {
        navigate(`${ROUTES.home}#${id}`)
      }
    },
    [close, location.pathname, navigate]
  )

  const goToRoute = useCallback(
    (path: string) => {
      close()
      navigate(path)
    },
    [close, navigate]
  )

  const items = useMemo<CommandItem[]>(() => {
    const navigation: CommandItem[] = [...NAV_ITEMS, ...SECONDARY_NAV].map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      hint: item.kind === 'route' ? 'Page' : 'Section',
      icon: item.icon,
      group: 'Navigation',
      keywords: `${item.label} ${item.href}`,
      run: () => (item.kind === 'route' ? goToRoute(item.href) : goToSection(item.href)),
    }))

    const projects: CommandItem[] = PROJECTS.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      hint: project.subtitle,
      icon: 'folder-git',
      group: 'Projects',
      keywords: `${project.title} ${project.subtitle} ${project.stackTags.join(' ')}`,
      run: () => goToRoute(ROUTES.projectDetail(project.slug)),
    }))

    const actions: CommandItem[] = [
      {
        id: 'action-resume-download',
        label: 'Download resume',
        hint: 'PDF',
        icon: 'download',
        group: 'Actions',
        keywords: 'resume cv download pdf',
        run: () => {
          close()
          const anchor = document.createElement('a')
          anchor.href = PROFILE.resumePath
          anchor.download = PROFILE.resumeFileName
          anchor.click()
        },
      },
      {
        id: 'action-resume-view',
        label: 'View resume in browser',
        icon: 'file-text',
        group: 'Actions',
        keywords: 'resume cv view read',
        run: () => goToRoute(ROUTES.resume),
      },
      {
        id: 'action-email',
        label: 'Copy email address',
        hint: PROFILE.email,
        icon: 'copy',
        group: 'Actions',
        keywords: 'email copy contact mail',
        run: () => {
          void navigator.clipboard.writeText(PROFILE.email)
          close()
        },
      },
      {
        id: 'action-theme',
        label: isDark ? 'Switch to light theme' : 'Switch to dark theme',
        hint: 'T',
        icon: isDark ? 'sun' : 'moon',
        group: 'Actions',
        keywords: 'theme dark light toggle appearance',
        run: () => {
          toggleTheme()
          close()
        },
      },
    ]

    const connect: CommandItem[] = SOCIALS.map((social) => ({
      id: `social-${social.id}`,
      label: social.label,
      hint: social.handle,
      icon: social.icon,
      group: 'Connect',
      keywords: `${social.label} ${social.handle}`,
      run: () => {
        close()
        window.open(
          social.href,
          social.id === 'email' || social.id === 'phone' ? '_self' : '_blank'
        )
      },
    }))

    return [...navigation, ...projects, ...actions, ...connect]
  }, [close, goToRoute, goToSection, isDark, toggleTheme])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return items
    return items.filter((item) => `${item.label} ${item.keywords}`.toLowerCase().includes(needle))
  }, [items, query])

  const grouped = useMemo(() => {
    const order: CommandGroup[] = ['Navigation', 'Projects', 'Actions', 'Connect']
    return order
      .map((group) => ({ group, items: filtered.filter((item) => item.group === group) }))
      .filter((section) => section.items.length > 0)
  }, [filtered])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, open])

  useEffect(() => {
    if (!open) {
      setQuery('')
      return
    }
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40)
    return () => window.clearTimeout(timer)
  }, [open])

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    if (!open) return
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (index + 1) % Math.max(filtered.length, 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (index - 1 + filtered.length) % Math.max(filtered.length, 1))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      filtered[activeIndex]?.run()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  let runningIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-start justify-center p-4">
          <motion.div
            variants={overlayBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            variants={overlayPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass-strong relative mt-[10vh] w-full max-w-xl overflow-hidden rounded-2xl shadow-lifted"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Icon name="search" className="h-4 w-4 shrink-0 text-content-muted" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={filtered[activeIndex]?.id}
                aria-autocomplete="list"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, projects, actions…"
                className="h-14 w-full bg-transparent text-sm text-content-primary outline-none placeholder:text-content-muted"
              />
              <kbd className="hidden rounded border border-border px-1.5 py-0.5 font-mono text-[0.65rem] text-content-muted sm:block">
                ESC
              </kbd>
            </div>

            <ul
              ref={listRef}
              id="command-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(24rem,55vh)] overflow-y-auto p-2"
            >
              {grouped.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-content-muted">
                  No results for “{query}”.
                </li>
              )}

              {grouped.map((section) => (
                <li key={section.group}>
                  <p className="eyebrow px-3 pb-1 pt-3">{section.group}</p>
                  <ul>
                    {section.items.map((item) => {
                      runningIndex += 1
                      const index = runningIndex
                      const active = index === activeIndex

                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            id={item.id}
                            data-index={index}
                            role="option"
                            aria-selected={active}
                            onMouseEnter={() => setActiveIndex(index)}
                            onClick={item.run}
                            className={cn(
                              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                              active
                                ? 'bg-accent/12 text-content-primary'
                                : 'text-content-secondary hover:bg-surface-hover'
                            )}
                          >
                            <Icon
                              name={item.icon}
                              className={cn('h-4 w-4 shrink-0', active && 'text-accent')}
                            />
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.hint && (
                              <span className="truncate text-xs text-content-muted">
                                {item.hint}
                              </span>
                            )}
                            {active && (
                              <Icon
                                name="arrow-right"
                                className="h-3.5 w-3.5 shrink-0 text-accent"
                              />
                            )}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-4 border-t border-border px-4 py-2.5 text-[0.7rem] text-content-muted sm:flex">
              {KEYBOARD_SHORTCUTS.slice(0, 4).map((shortcut) => (
                <span key={shortcut.description} className="flex items-center gap-1.5">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className="rounded border border-border bg-background-alt px-1.5 py-0.5 font-mono"
                    >
                      {key}
                    </kbd>
                  ))}
                  {shortcut.description}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
