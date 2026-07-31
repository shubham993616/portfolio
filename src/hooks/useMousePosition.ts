import { type RefObject, useCallback, useEffect, useRef, useState } from 'react'

import { useIsTouch, usePrefersReducedMotion } from './useMediaQuery'

export interface NormalizedPointer {
  /** -1 (left/top) → 1 (right/bottom), relative to the element's centre. */
  x: number
  y: number
}

/**
 * Normalised pointer position within an element, used for the hero parallax
 * and card tilt. Returns a static centre reading on touch devices or when the
 * user prefers reduced motion, so nothing jitters where it should not.
 */
export function useRelativePointer<T extends HTMLElement>(
  ref: RefObject<T | null>
): NormalizedPointer {
  const [pointer, setPointer] = useState<NormalizedPointer>({ x: 0, y: 0 })
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()
  const frame = useRef(0)

  useEffect(() => {
    const element = ref.current
    if (!element || isTouch || reducedMotion) return

    const onMove = (event: MouseEvent) => {
      if (frame.current) return
      frame.current = window.requestAnimationFrame(() => {
        frame.current = 0
        const rect = element.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return
        setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((event.clientY - rect.top) / rect.height) * 2 - 1,
        })
      })
    }

    const onLeave = () => setPointer({ x: 0, y: 0 })

    element.addEventListener('mousemove', onMove)
    element.addEventListener('mouseleave', onLeave)

    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current)
      element.removeEventListener('mousemove', onMove)
      element.removeEventListener('mouseleave', onLeave)
    }
  }, [ref, isTouch, reducedMotion])

  return pointer
}

/**
 * Writes the pointer position into CSS custom properties on the element.
 * Used for the "spotlight follows your cursor" card highlight — doing this in
 * CSS rather than React state avoids a re-render on every mouse move.
 */
export function useSpotlight<T extends HTMLElement>(ref: RefObject<T | null>): void {
  const isTouch = useIsTouch()

  const handleMove = useCallback(
    (event: MouseEvent) => {
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    },
    [ref]
  )

  useEffect(() => {
    const element = ref.current
    if (!element || isTouch) return

    element.addEventListener('mousemove', handleMove)
    return () => element.removeEventListener('mousemove', handleMove)
  }, [ref, handleMove, isTouch])
}
