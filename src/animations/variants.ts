import type { Transition, Variants } from 'framer-motion'

/**
 * Shared motion vocabulary. Every animation in the site composes from these,
 * which is what keeps the whole thing feeling like one product rather than a
 * collection of effects.
 */

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

export const springSoft: Transition = { type: 'spring', stiffness: 260, damping: 30, mass: 0.8 }
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 }

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_PREMIUM } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_PREMIUM } },
}

/** Blur reveal — used for headline text. */
export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE_PREMIUM },
  },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const listItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_PREMIUM } },
}

/** Route-level transition wrapper. */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: EASE_PREMIUM } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.22, ease: 'easeIn' } },
}

/** Overlays: command palette, mobile menu, modals. */
export const overlayBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
}

export const overlayPanel: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: -8 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSnappy },
  exit: { opacity: 0, scale: 0.98, y: -6, transition: { duration: 0.14 } },
}

/** Expand/collapse for accordions and expandable project cards. */
export const collapse: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.36, ease: EASE_PREMIUM },
      opacity: { duration: 0.24, delay: 0.06 },
    },
  },
}

/** Shared viewport config so scroll reveals trigger consistently. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const
export const VIEWPORT_ONCE_SOFT = { once: true, amount: 0.1 } as const
