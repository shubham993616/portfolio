import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from './useMediaQuery'

interface Options {
  typeSpeedMs?: number
  deleteSpeedMs?: number
  holdMs?: number
}

/**
 * Cycles a list of phrases with a type/erase effect.
 * Falls back to plain static text when the user prefers reduced motion.
 */
export function useTypewriter(
  phrases: readonly string[],
  { typeSpeedMs = 55, deleteSpeedMs = 28, holdMs = 1800 }: Options = {}
): string {
  const reducedMotion = usePrefersReducedMotion()
  const [text, setText] = useState(phrases[0] ?? '')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return

    const current = phrases[phraseIndex] ?? ''

    if (!isDeleting && text === current) {
      const timer = window.setTimeout(() => setIsDeleting(true), holdMs)
      return () => window.clearTimeout(timer)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setPhraseIndex((index) => (index + 1) % phrases.length)
      return
    }

    const timer = window.setTimeout(
      () => {
        setText((previous) =>
          isDeleting ? current.slice(0, previous.length - 1) : current.slice(0, previous.length + 1)
        )
      },
      isDeleting ? deleteSpeedMs : typeSpeedMs
    )

    return () => window.clearTimeout(timer)
  }, [text, isDeleting, phraseIndex, phrases, typeSpeedMs, deleteSpeedMs, holdMs, reducedMotion])

  return reducedMotion ? (phrases[0] ?? '') : text
}
