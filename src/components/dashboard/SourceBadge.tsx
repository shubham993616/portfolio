import { clockTime } from '@/lib/format'
import type { DataSource } from '@/types/dashboard'

import { Icon } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'

interface SourceBadgeProps {
  source: DataSource
  fetchedAt: number | null
  loading?: boolean
  /** Shown in the tooltip when the data is not live. */
  fallbackReason?: string
}

/**
 * Tells the reader where a number came from. A widget on fallback data reads
 * as deliberate rather than broken, which is the entire point.
 */
export function SourceBadge({ source, fetchedAt, loading, fallbackReason }: SourceBadgeProps) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-content-muted">
        <Icon name="loader" className="h-3 w-3 animate-spin" />
        Fetching…
      </span>
    )
  }

  if (source === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-secondary">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
        </span>
        Live{fetchedAt ? ` · ${clockTime(fetchedAt)}` : ''}
      </span>
    )
  }

  return (
    <Tooltip label={fallbackReason ?? 'Live source unavailable — showing resume-verified figures.'}>
      <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-content-muted">
        <Icon name="shield" className="h-3 w-3" />
        Resume-verified
      </span>
    </Tooltip>
  )
}
