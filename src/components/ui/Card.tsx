import { type ReactNode, useRef } from 'react'

import { useSpotlight } from '@/hooks'
import { cn } from '@/lib/cn'

interface CardProps {
  children: ReactNode
  className?: string
  /** `r g b` triplet driving the gradient border and hover glow. */
  tint?: string
  /** Cursor-following highlight. Disabled automatically on touch devices. */
  spotlight?: boolean
  /** Lift and glow on hover. */
  interactive?: boolean
  as?: 'div' | 'article' | 'li' | 'section'
}

/**
 * The single card surface used across the site. Everything visual —
 * glass background, gradient hairline, spotlight, hover lift — is opt-in,
 * so one component covers every context without a pile of variants.
 */
export function Card({
  children,
  className,
  tint,
  spotlight = false,
  interactive = false,
  as: Tag = 'div',
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null)
  useSpotlight(ref)

  return (
    <Tag
      ref={ref as never}
      style={tint ? ({ '--tint': tint } as React.CSSProperties) : undefined}
      className={cn(
        'gradient-border relative overflow-hidden rounded-2xl bg-surface/70 backdrop-blur-sm',
        'transition-all duration-500 ease-premium',
        interactive &&
          'focus-within:-translate-y-1 hover:-translate-y-1 hover:bg-surface/90 hover:shadow-lifted',
        spotlight && 'group/card',
        className
      )}
    >
      {spotlight && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgb(var(--tint, var(--color-accent)) / 0.14), transparent 65%)',
          }}
        />
      )}
      <div className="relative z-[2]">{children}</div>
    </Tag>
  )
}
