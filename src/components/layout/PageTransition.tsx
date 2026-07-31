import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { pageTransition } from '@/animations/variants'

/** Wraps a route so it fades in and out under `<AnimatePresence>`. */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}
