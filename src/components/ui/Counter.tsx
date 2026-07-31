import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

import { usePrefersReducedMotion } from '@/hooks'
import { cn } from '@/lib/cn'

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
  /**
   * Thousands separator. Pass an empty string for values that are identifiers
   * rather than quantities — a year (2026) or a contest rating (1185) should
   * never render as "2,026".
   */
  separator?: string
}

/**
 * Count-up that only runs once the number is actually on screen, and skips
 * straight to the final value when the user prefers reduced motion.
 */
export function Counter({
  value,
  prefix,
  suffix,
  decimals = 0,
  duration = 2,
  className,
  separator = ',',
}: CounterProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })

  const formatted = `${prefix ?? ''}${value.toFixed(decimals)}${suffix ?? ''}`

  if (reducedMotion) {
    return <span className={cn('tabular-nums', className)}>{formatted}</span>
  }

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {inView ? (
        <CountUp
          end={value}
          decimals={decimals}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          separator={separator}
          enableScrollSpy={false}
        />
      ) : (
        <span aria-hidden="true">
          {prefix ?? ''}0{suffix ?? ''}
        </span>
      )}
      <span className="sr-only">{formatted}</span>
    </span>
  )
}
