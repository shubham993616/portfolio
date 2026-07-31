import { Container } from '../ui/Container'
import { Skeleton } from '../ui/Skeleton'

/** Skeleton shown while a lazily-loaded route chunk is in flight. */
export function RouteFallback() {
  return (
    <Container className="py-20">
      <div className="space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-2/3 max-w-lg" />
          <Skeleton className="h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-4/5 max-w-xl" />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-3 rounded-2xl border border-border bg-surface/50 p-5"
            >
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">
        Loading page
      </span>
    </Container>
  )
}
