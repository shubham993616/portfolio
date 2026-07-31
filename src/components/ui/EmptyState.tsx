import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'

import { Icon } from './Icon'

interface EmptyStateProps {
  icon?: IconName
  title: string
  description?: string
  action?: ReactNode
  className?: string
  compact?: boolean
}

export function EmptyState({
  icon = 'search',
  title,
  description,
  action,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/40 text-center',
        compact ? 'gap-2 p-6' : 'gap-3 p-10 sm:p-14',
        className
      )}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-alt text-content-muted">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <p className="font-medium text-content-primary">{title}</p>
      {description && (
        <p className="max-w-sm text-sm leading-relaxed text-content-muted">{description}</p>
      )}
      {action && <div className="pt-2">{action}</div>}
    </div>
  )
}
