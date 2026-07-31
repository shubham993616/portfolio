import { type IconName, getIcon } from '@/lib/icons'

interface IconProps {
  name: IconName
  className?: string
  strokeWidth?: number
  /** Provide when the icon is the only content of an interactive element. */
  label?: string
}

/**
 * Renders an icon by registry name. Decorative by default (aria-hidden);
 * pass `label` to expose it to assistive technology instead.
 */
export function Icon({ name, className = 'h-4 w-4', strokeWidth = 1.75, label }: IconProps) {
  const Glyph = getIcon(name)

  return (
    <Glyph
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
    />
  )
}
