import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'

import { Icon } from './Icon'

type BadgeTone = 'neutral' | 'accent' | 'secondary' | 'success' | 'warning' | 'danger'

const TONES: Record<BadgeTone, string> = {
  neutral: 'border-border bg-surface/70 text-content-secondary',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  secondary: 'border-secondary/30 bg-secondary/10 text-secondary',
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/30 bg-warning/10 text-warning',
  danger: 'border-danger/30 bg-danger/10 text-danger',
}

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  icon?: IconName
  /** Adds a soft pulsing dot — used for "currently working here". */
  pulse?: boolean
  className?: string
}

export function Badge({ children, tone = 'neutral', icon, pulse = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
        TONES[tone],
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
      )}
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

interface TagProps {
  children: ReactNode
  className?: string
}

/** Compact monospace chip used for technology lists. */
export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        'border-border bg-background-alt/80 text-content-secondary hover:border-accent/40 hover:text-content-primary',
        'inline-flex items-center rounded-md border px-2 py-1 font-mono text-[0.7rem] transition-colors duration-200',
        className
      )}
    >
      {children}
    </span>
  )
}
