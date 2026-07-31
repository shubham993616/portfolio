import { getTech, getTechByName } from '@/lib/tech'

interface TechIconProps {
  /** Registry key (`java`) or display name (`Spring Boot 3`). */
  tech: string
  className?: string
  /** Tint the mark with the technology's brand colour. */
  colored?: boolean
}

/**
 * Brand mark for a technology.
 *
 * Renders nothing when the label has no registered icon. A generated monogram
 * would be worse than no icon at all — chips like "Curriculum planning" would
 * pick up a meaningless "CU" badge that reads as a rendering bug. Every
 * consumer uses `gap-*`, which collapses cleanly when this returns null.
 */
export function TechIcon({ tech, className = 'h-5 w-5', colored = false }: TechIconProps) {
  const meta = getTech(tech) ?? getTechByName(tech)
  if (!meta) return null

  const { Icon: Glyph } = meta

  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0"
      style={colored ? { color: `rgb(${meta.rgb})` } : undefined}
    >
      <Glyph className={className} />
    </span>
  )
}
