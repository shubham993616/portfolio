import { cn } from '@/lib/cn'

import { Icon } from './Icon'

interface PlaceholderNoticeProps {
  className?: string
  label?: string
}

/**
 * Marks generated placeholder art so it is impossible to ship by accident.
 * Delete the `isPlaceholder` flag in `src/data/projects.ts` once you drop a
 * real image in and this badge disappears with it.
 */
export function PlaceholderNotice({ className, label = 'Placeholder' }: PlaceholderNoticeProps) {
  return (
    <span
      className={cn(
        'bg-warning/12 inline-flex items-center gap-1.5 rounded-full border border-warning/40 px-2 py-0.5 text-[0.65rem] font-medium text-warning backdrop-blur',
        className
      )}
      title="Generated placeholder — replace with a real image before publishing."
    >
      <Icon name="alert-circle" className="h-3 w-3" />
      {label}
    </span>
  )
}
