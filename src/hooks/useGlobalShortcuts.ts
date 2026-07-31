import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '@/constants/navigation'

import { useTheme } from './useTheme'

const isTypingTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false
  const tag = target.tagName.toLowerCase()
  return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable
}

/** `g` followed by a letter, Vim/GitHub style. */
const GO_TO: Record<string, string> = {
  h: ROUTES.home,
  p: ROUTES.projects,
  d: ROUTES.dashboard,
  c: ROUTES.contact,
  r: ROUTES.resume,
}

interface Options {
  onOpenCommandPalette: () => void
  commandPaletteOpen: boolean
}

export function useGlobalShortcuts({ onOpenCommandPalette, commandPaletteOpen }: Options): void {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const pendingGo = useRef(false)
  const pendingTimer = useRef(0)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      // ⌘K / Ctrl-K works even inside inputs — it is the escape hatch.
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        onOpenCommandPalette()
        return
      }

      if (isTypingTarget(event.target) || event.metaKey || event.ctrlKey || event.altKey) return
      if (commandPaletteOpen) return

      const key = event.key.toLowerCase()

      if (pendingGo.current && GO_TO[key]) {
        event.preventDefault()
        pendingGo.current = false
        window.clearTimeout(pendingTimer.current)
        navigate(GO_TO[key]!)
        return
      }

      if (key === 'g') {
        pendingGo.current = true
        window.clearTimeout(pendingTimer.current)
        // A chord that is never completed should not linger.
        pendingTimer.current = window.setTimeout(() => {
          pendingGo.current = false
        }, 1200)
        return
      }

      if (key === 't') {
        event.preventDefault()
        toggleTheme()
        return
      }

      if (key === '/') {
        event.preventDefault()
        onOpenCommandPalette()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(pendingTimer.current)
    }
  }, [navigate, onOpenCommandPalette, toggleTheme, commandPaletteOpen])
}
