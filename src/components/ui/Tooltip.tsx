import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface TooltipProps {
  label: string
  children: ReactNode
  side?: 'top' | 'bottom'
  className?: string
}

/**
 * CSS-only tooltip. Uses `group-hover`/`group-focus-within` so it works for
 * keyboard users too, and is marked `role="tooltip"` for screen readers.
 */
export function Tooltip({ label, children, side = 'top', className }: TooltipProps) {
  return (
    <span className={cn('group/tooltip relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'glass-strong pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-xs text-content-primary shadow-lifted',
          // Long labels wrap and stay inside the viewport instead of widening
          // the document and creating a horizontal scrollbar on mobile.
          'w-max max-w-[min(18rem,calc(100vw-2.5rem))] text-balance text-center',
          'scale-95 opacity-0 transition-all duration-200 ease-premium',
          'group-hover/tooltip:scale-100 group-hover/tooltip:opacity-100',
          'group-focus-within/tooltip:scale-100 group-focus-within/tooltip:opacity-100',
          side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        )}
      >
        {label}
      </span>
    </span>
  )
}
