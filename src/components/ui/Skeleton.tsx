import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div aria-hidden="true" className={cn('skeleton h-4 w-full', className)} />
}

interface SkeletonGroupProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className }: SkeletonGroupProps) {
  return (
    <div className={cn('space-y-2.5', className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className={index === lines - 1 ? 'w-2/3' : 'w-full'} />
      ))}
    </div>
  )
}

export function SkeletonStat() {
  return (
    <div
      className="space-y-3 rounded-2xl border border-border bg-surface/60 p-5"
      aria-hidden="true"
    >
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}
