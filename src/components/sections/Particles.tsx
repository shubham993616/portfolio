import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@/hooks'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

const DENSITY = 12000 // one particle per N square pixels
const MAX_PARTICLES = 70
const LINK_DISTANCE = 130

/**
 * Canvas particle field for the hero.
 *
 * Canvas rather than DOM nodes: 70 animated elements would mean 70 layout
 * boxes for the browser to composite every frame. It also respects
 * `prefers-reduced-motion` by not mounting at all, and pauses when the tab is
 * hidden so it costs nothing in the background.
 */
export function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let particles: Particle[] = []
    let frame = 0
    let width = 0
    let height = 0
    let running = true

    const readAccent = (): string => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-accent')
        .trim()
      return value || '79 140 255'
    }
    let accent = readAccent()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(MAX_PARTICLES, Math.floor((width * height) / DENSITY))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.5 + 0.6,
      }))
    }

    const draw = () => {
      if (!running) return
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > width) particle.vx *= -1
        if (particle.y < 0 || particle.y > height) particle.vy *= -1

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgb(${accent} / 0.55)`
        context.fill()
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]!
          const b = particles[j]!
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance > LINK_DISTANCE) continue

          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.strokeStyle = `rgb(${accent} / ${(0.16 * (1 - distance / LINK_DISTANCE)).toFixed(3)})`
          context.lineWidth = 1
          context.stroke()
        }
      }

      frame = window.requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      running = document.visibilityState === 'visible'
      if (running) {
        accent = readAccent()
        frame = window.requestAnimationFrame(draw)
      } else {
        window.cancelAnimationFrame(frame)
      }
    }

    resize()
    frame = window.requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  )
}
