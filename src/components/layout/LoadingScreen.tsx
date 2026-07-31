import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { PROFILE } from '@/data/profile'

/**
 * Brief entry curtain shown on first load only (per browser session), so
 * returning to the tab or navigating between routes never replays it.
 */
export function LoadingScreen() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.sessionStorage.getItem('portfolio-intro-played') === '1'
  })

  useEffect(() => {
    if (done) return
    const timer = window.setTimeout(() => {
      window.sessionStorage.setItem('portfolio-intro-played', '1')
      setDone(true)
    }, 1150)
    return () => window.clearTimeout(timer)
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loading"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-background"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-16 w-16 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-2xl border-2 border-accent/25" />
            <motion.span
              className="absolute inset-0 rounded-2xl border-2 border-accent border-r-transparent border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            <span className="text-gradient-accent font-mono text-lg font-bold">
              {PROFILE.initials}
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-mono text-xs tracking-[0.25em] text-content-muted"
          >
            LOADING
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
