import { AnimatePresence, motion } from 'framer-motion'

import { useScrollProgress, useScrolledPast } from '@/hooks'
import { scrollToTop } from '@/utils/scroll'

import { Icon } from '../ui/Icon'

/** Floating scroll-to-top control with a circular progress ring. */
export function BackToTop() {
  const visible = useScrolledPast(600)
  const progress = useScrollProgress()

  const radius = 20
  const circumference = 2 * Math.PI * radius

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          className="glass-strong group fixed bottom-5 left-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full text-content-secondary shadow-lifted transition-colors hover:text-accent sm:bottom-7 sm:left-7"
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgb(var(--color-border-strong))"
              strokeWidth="1.5"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="rgb(var(--color-accent))"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
            />
          </svg>
          <Icon
            name="arrow-up"
            className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
