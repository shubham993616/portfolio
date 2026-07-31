import { cn } from '@/lib/cn'
import type { IconName } from '@/lib/icons'

import { Card } from '../ui/Card'
import { Counter } from '../ui/Counter'
import { Icon } from '../ui/Icon'
import { Skeleton } from '../ui/Skeleton'

interface StatTileProps {
  label: string
  value: number
  suffix?: string
  icon: IconName
  rgb?: string
  loading?: boolean
  hint?: string
}

export function StatTile({
  label,
  value,
  suffix,
  icon,
  rgb = '79 140 255',
  loading = false,
  hint,
}: StatTileProps) {
  return (
    <Card tint={rgb} spotlight interactive className="p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-content-muted">{label}</p>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg border"
          style={{
            borderColor: `rgb(${rgb} / 0.28)`,
            backgroundColor: `rgb(${rgb} / 0.1)`,
            color: `rgb(${rgb})`,
          }}
        >
          <Icon name={icon} className="h-4 w-4" />
        </span>
      </div>

      {loading ? (
        <Skeleton className="mt-3 h-8 w-20" />
      ) : (
        <p
          className={cn('mt-3 text-2xl font-semibold tracking-tight sm:text-3xl')}
          style={{ color: `rgb(${rgb})` }}
        >
          <Counter value={value} suffix={suffix} />
        </p>
      )}

      {hint && <p className="mt-1.5 text-[0.7rem] text-content-muted">{hint}</p>}
    </Card>
  )
}
