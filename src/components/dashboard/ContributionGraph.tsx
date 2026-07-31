import { motion } from 'framer-motion'

import { cn } from '@/lib/cn'
import type { ContributionDay } from '@/types/dashboard'

import { EmptyState } from '../ui/EmptyState'
import { Skeleton } from '../ui/Skeleton'

const LEVEL_STYLE: Record<ContributionDay['level'], string> = {
  0: 'bg-border/45',
  1: 'bg-secondary/25',
  2: 'bg-secondary/45',
  3: 'bg-secondary/70',
  4: 'bg-secondary',
}

interface ContributionGraphProps {
  days: readonly ContributionDay[]
  loading?: boolean
}

/**
 * GitHub-style intensity grid.
 *
 * The data is derived from the public events feed rather than the contribution
 * graph (which has no public API), so the caption below says exactly what the
 * squares represent instead of implying a lifetime total.
 */
export function ContributionGraph({ days, loading = false }: ContributionGraphProps) {
  if (loading) {
    return (
      <div className="flex gap-1" aria-hidden="true">
        {Array.from({ length: 13 }).map((_, column) => (
          <div key={column} className="flex flex-col gap-1">
            {Array.from({ length: 7 }).map((__, row) => (
              <Skeleton key={row} className="h-3 w-3 rounded-[3px]" />
            ))}
          </div>
        ))}
      </div>
    )
  }

  if (days.length === 0) {
    return (
      <EmptyState
        compact
        icon="activity"
        title="No recent public activity to chart"
        description="GitHub's public events feed only retains about 90 days of history."
      />
    )
  }

  const total = days.reduce((sum, day) => sum + day.count, 0)
  const activeDays = days.filter((day) => day.count > 0).length

  // Chunk into weeks so the grid reads vertically like GitHub's own.
  const weeks: ContributionDay[][] = []
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7))
  }

  return (
    <div>
      <div className="no-scrollbar overflow-x-auto pb-1">
        <div
          className="flex gap-1"
          role="img"
          aria-label={`${total} public events across ${activeDays} active days in the last ${days.length} days`}
        >
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <motion.span
                  key={day.date}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: Math.min((weekIndex * 7 + dayIndex) * 0.003, 0.5),
                    duration: 0.25,
                  }}
                  title={`${day.date}: ${day.count} public event${day.count === 1 ? '' : 's'}`}
                  className={cn('h-3 w-3 rounded-[3px] transition-colors', LEVEL_STYLE[day.level])}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.7rem] text-content-muted">
          <span className="font-medium text-content-primary">{total}</span> public events ·{' '}
          <span className="font-medium text-content-primary">{activeDays}</span> active days
        </p>

        <div className="flex items-center gap-1.5 text-[0.7rem] text-content-muted">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span key={level} className={cn('h-2.5 w-2.5 rounded-[2px]', LEVEL_STYLE[level])} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
