import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode, useCallback, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'

import { Icon } from '../Icon'
import { type Toast, ToastContext, type ToastTone } from './ToastContext'

const TONE_STYLES: Record<ToastTone, { ring: string; icon: IconName; iconColor: string }> = {
  success: { ring: 'border-success/35', icon: 'check-circle', iconColor: 'text-success' },
  error: { ring: 'border-danger/35', icon: 'alert-circle', iconColor: 'text-danger' },
  info: { ring: 'border-accent/35', icon: 'sparkles', iconColor: 'text-accent' },
}

let counter = 0
const nextId = (): string => `toast-${++counter}`

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef(new Map<string, number>())

  const dismiss = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
    const timer = timers.current.get(id)
    if (timer) {
      window.clearTimeout(timer)
      timers.current.delete(id)
    }
  }, [])

  const push = useCallback<
    (toast: Omit<Toast, 'id' | 'durationMs'> & { durationMs?: number }) => string
  >(
    ({ durationMs = 5000, ...rest }) => {
      const id = nextId()
      setToasts((current) => [...current.slice(-2), { ...rest, id, durationMs }])
      timers.current.set(
        id,
        window.setTimeout(() => dismiss(id), durationMs)
      )
      return id
    },
    [dismiss]
  )

  const value = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Live region so screen readers announce every toast. */}
      <div
        role="region"
        aria-live="polite"
        aria-label="Notifications"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-2.5 sm:bottom-6 sm:right-6"
      >
        <AnimatePresence initial={false}>
          {toasts.map((toast) => {
            const tone = TONE_STYLES[toast.tone]
            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                className={cn(
                  'glass-strong pointer-events-auto flex items-start gap-3 rounded-xl border p-3.5 shadow-lifted',
                  tone.ring
                )}
              >
                <Icon name={tone.icon} className={cn('mt-0.5 h-4 w-4 shrink-0', tone.iconColor)} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-content-primary">{toast.title}</p>
                  {toast.description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-content-secondary">
                      {toast.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                  className="-m-1 shrink-0 rounded-md p-1 text-content-muted transition-colors hover:bg-surface-hover hover:text-content-primary"
                >
                  <Icon name="x" className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
