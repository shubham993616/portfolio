import { type Variants, motion } from 'framer-motion'
import type { ComponentType, ElementType, ReactNode } from 'react'

import { fadeInUp, staggerContainer } from '@/animations/variants'
import { cn } from '@/lib/cn'

/**
 * `motion.create()` builds a brand-new component type on every call. Calling it
 * inside a render body therefore remounts the element on each render, which
 * resets the scroll-reveal animation and can leave a section stuck at opacity 0.
 * Caching by tag keeps the component identity stable across renders.
 */
const motionCache = new Map<ElementType, ComponentType<Record<string, unknown>>>()

const getMotionComponent = (as: ElementType): ComponentType<Record<string, unknown>> => {
  const cached = motionCache.get(as)
  if (cached) return cached
  const created = motion.create(as as never) as unknown as ComponentType<Record<string, unknown>>
  motionCache.set(as, created)
  return created
}

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  variants?: Variants
  as?: ElementType
  amount?: number
  id?: string
}

/** Scroll-triggered entrance. The default is a soft fade-and-rise. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants = fadeInUp,
  as = 'div',
  amount = 0.15,
  id,
}: RevealProps) {
  const MotionTag = getMotionComponent(as)

  return (
    <MotionTag
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  as?: ElementType
  amount?: number
}

/** Parent wrapper that staggers any `Reveal`/`motion` children. */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delayChildren = 0,
  as = 'div',
  amount = 0.15,
}: StaggerProps) {
  const MotionTag = getMotionComponent(as)

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer(stagger, delayChildren)}
    >
      {children}
    </MotionTag>
  )
}
