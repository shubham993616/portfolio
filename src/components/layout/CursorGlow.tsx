import { useEffect, useRef } from 'react'

import { useIsTouch, usePrefersReducedMotion } from '@/hooks'

/**
 * A soft light that trails the cursor.
 *
 * Position is written straight to the element's transform inside a rAF loop
 * with a little easing — never through React state, which would re-render the
 * entire tree on every mouse move.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const isTouch = useIsTouch()
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (isTouch || reducedMotion) return

    const element = ref.current
    if (!element) return

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const current = { ...target }
    let frame = 0
    let visible = false

    const onMove = (event: MouseEvent) => {
      target.x = event.clientX
      target.y = event.clientY
      if (!visible) {
        visible = true
        element.style.opacity = '1'
      }
    }

    const onLeave = () => {
      visible = false
      element.style.opacity = '0'
    }

    const tick = () => {
      current.x += (target.x - current.x) * 0.12
      current.y += (target.y - current.y) * 0.12
      element.style.transform = `translate3d(${current.x - 240}px, ${current.y - 240}px, 0)`
      frame = window.requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [isTouch, reducedMotion])

  if (isTouch || reducedMotion) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 -z-[5] h-[480px] w-[480px] opacity-0 transition-opacity duration-500 will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgb(var(--color-accent) / 0.10) 0%, transparent 62%)',
      }}
    />
  )
}
