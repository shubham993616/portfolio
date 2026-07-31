import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
  /** Wider than the default reading measure — used by the projects grid. */
  wide?: boolean
}

export function Container({ children, className, as: Tag = 'div', wide = false }: ContainerProps) {
  return (
    <Tag
      className={cn('container-page', wide && 'max-w-[86rem]', className)}
      style={wide ? { maxWidth: '86rem' } : undefined}
    >
      {children}
    </Tag>
  )
}

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
  /** Vertical rhythm preset. */
  spacing?: 'sm' | 'md' | 'lg'
  'aria-labelledby'?: string
}

export function Section({
  children,
  id,
  className,
  spacing = 'lg',
  'aria-labelledby': labelledBy,
}: SectionProps) {
  const padding = {
    sm: 'py-14 sm:py-16',
    md: 'py-16 sm:py-20',
    lg: 'py-20 sm:py-28',
  }[spacing]

  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('relative', padding, className)}>
      {children}
    </section>
  )
}
