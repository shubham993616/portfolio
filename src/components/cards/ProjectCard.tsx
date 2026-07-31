import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'

import { collapse } from '@/animations/variants'
import { ROUTES } from '@/constants/navigation'
import { useRelativePointer } from '@/hooks'
import { cn } from '@/lib/cn'
import type { Project } from '@/types/content'

import { Badge, Tag } from '../ui/Badge'
import { ButtonLink, ButtonRoute } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { PlaceholderNotice } from '../ui/PlaceholderNotice'
import { TechIcon } from '../ui/TechIcon'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false)
  const mediaRef = useRef<HTMLDivElement>(null)
  const pointer = useRelativePointer(mediaRef)

  const detailsId = `project-details-${project.slug}`

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: Math.min(index * 0.08, 0.32) }}
      className="h-full"
    >
      <Card tint={project.rgb} spotlight interactive className="flex h-full flex-col">
        {/* Cover — parallaxes slightly under the cursor */}
        <div ref={mediaRef} className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={project.cover.src}
            alt={`${project.title} cover art (placeholder)`}
            loading="lazy"
            decoding="async"
            width={1200}
            height={675}
            className="h-full w-full object-cover"
            // The 6% overscale has to be a motion value, not a Tailwind class:
            // Framer writes the whole `transform` property, so a class-based
            // scale would be dropped the moment the parallax offset animates
            // and the image edges would show during the shift.
            animate={{ x: pointer.x * -10, y: pointer.y * -8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
          />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"
          />

          <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
            <Badge tone="neutral" className="glass">
              {project.year}
            </Badge>
            <Badge
              tone={project.status === 'In production' ? 'secondary' : 'accent'}
              className="glass"
            >
              {project.status}
            </Badge>
          </div>

          {project.cover.isPlaceholder && <PlaceholderNotice className="absolute right-4 top-4" />}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div>
            <p className="eyebrow mb-2">{project.subtitle}</p>
            <h3 className="text-xl font-semibold tracking-tight text-content-primary sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-content-secondary">
              {project.summary}
            </p>
          </div>

          {/* Metrics */}
          <dl className="grid grid-cols-2 gap-3 rounded-xl border border-dashed border-border p-3 sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-[0.65rem] leading-tight text-content-muted">{metric.label}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-content-primary">
                  {metric.value}
                  {metric.suffix ?? ''}
                </dd>
              </div>
            ))}
          </dl>

          {/* Stack */}
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <li key={tech}>
                <Tag className="gap-1.5">
                  <TechIcon tech={tech} className="h-3 w-3" colored />
                  {tech}
                </Tag>
              </li>
            ))}
            {project.technologies.length > 6 && (
              <li>
                <Tag>+{project.technologies.length - 6}</Tag>
              </li>
            )}
          </ul>

          {/* Expandable highlights */}
          <div className="mt-auto">
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="flex w-full items-center justify-between gap-2 rounded-lg py-2 text-sm font-medium text-content-secondary transition-colors hover:text-accent"
            >
              <span>Key features &amp; engineering highlights</span>
              <Icon
                name="chevron-down"
                className={cn(
                  'h-4 w-4 transition-transform duration-300',
                  expanded && 'rotate-180'
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={detailsId}
                  variants={collapse}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="overflow-hidden"
                >
                  <ul className="space-y-2 pb-3 pt-1 text-sm text-content-secondary">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5">
                        <Icon
                          name="check"
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-secondary"
                        />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-4">
              <ButtonRoute
                to={ROUTES.projectDetail(project.slug)}
                variant="primary"
                size="sm"
                iconRight="arrow-right"
              >
                Case Study
              </ButtonRoute>

              {project.links.live && (
                <ButtonLink
                  href={project.links.live}
                  variant="outline"
                  size="sm"
                  iconLeft="external-link"
                  ariaLabel={`Open the live site for ${project.title}`}
                >
                  Live Demo
                </ButtonLink>
              )}

              {project.links.repository && (
                <ButtonLink
                  href={project.links.repository}
                  variant="ghost"
                  size="sm"
                  iconLeft="github"
                  ariaLabel={`Open the GitHub repository for ${project.title}`}
                >
                  GitHub
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.li>
  )
}
