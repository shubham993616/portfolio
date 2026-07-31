import { AnimatePresence, motion } from 'framer-motion'
import { type ReactNode, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { overlayBackdrop, overlayPanel } from '@/animations/variants'
import { useLockBodyScroll } from '@/hooks'
import { cn } from '@/lib/cn'

import { Icon } from './Icon'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
  /** Hide the visible heading but keep it for assistive tech. */
  hideTitle?: boolean
}

/**
 * Accessible dialog: focus is moved in on open, restored on close, trapped
 * while open, and Escape always closes.
 */
export function Modal({ open, onClose, title, children, className, hideTitle }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return

    previouslyFocused.current = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    panel?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return

      const first = focusable[0]!
      const last = focusable[focusable.length - 1]!

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused.current?.focus()
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center p-4 sm:p-6">
          <motion.div
            variants={overlayBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            variants={overlayPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'glass-strong relative mt-[8vh] w-full max-w-2xl rounded-2xl shadow-lifted focus:outline-none',
              className
            )}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <h2
                className={cn(
                  'text-base font-semibold text-content-primary',
                  hideTitle && 'sr-only'
                )}
              >
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="ml-auto rounded-lg p-1.5 text-content-muted transition-colors hover:bg-surface-hover hover:text-content-primary"
              >
                <Icon name="x" className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
