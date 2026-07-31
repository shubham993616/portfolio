import { motion } from 'framer-motion'

import { cn } from '@/lib/cn'
import type { ExperienceEntry } from '@/types/content'

import { Badge, Tag } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { TechIcon } from '../ui/TechIcon'

const KIND_TINT: Record<ExperienceEntry['kind'], string> = {
  startup: '79 140 255',
  internship: '0 212 170',
  volunteer: '236 72 153',
}

const KIND_LABEL: Record<ExperienceEntry['kind'], string> = {
  startup: 'Startup',
  internship: 'Internship',
  volunteer: 'Volunteer',
}

interface ExperienceCardProps {
  entry: ExperienceEntry
  index: number
  isLast: boolean
}

export function ExperienceCard({ entry, index, isLast }: ExperienceCardProps) {
  const tint = KIND_TINT[entry.kind]

  return (
    <li className="relative pl-10 sm:pl-14">
      {/* Rail */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-12 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-border to-border/10 sm:left-[23px]"
        />
      )}

      {/* Node */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.1 }}
        aria-hidden="true"
        className="absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full border bg-background sm:h-12 sm:w-12"
        style={{ borderColor: `rgb(${tint} / 0.4)`, color: `rgb(${tint})` }}
      >
        <Icon name={entry.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
        {entry.current && (
          <span
            className="absolute inset-0 animate-ping rounded-full border"
            style={{ borderColor: `rgb(${tint} / 0.4)` }}
          />
        )}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
        className={cn('pb-10', isLast && 'pb-0')}
      >
        <Card tint={tint} spotlight interactive className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone="neutral">{KIND_LABEL[entry.kind]}</Badge>
                {entry.current && (
                  <Badge tone="secondary" pulse>
                    Current
                  </Badge>
                )}
              </div>

              <h3 className="text-lg font-semibold tracking-tight text-content-primary">
                {entry.role}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">{entry.company}</p>
            </div>

            <div className="flex shrink-0 flex-col gap-1 text-xs text-content-muted sm:items-end">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="calendar-days" className="h-3.5 w-3.5" />
                {entry.period}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="map-pin" className="h-3.5 w-3.5" />
                {entry.location}
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-content-secondary">{entry.summary}</p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="eyebrow mb-2.5">Responsibilities</h4>
              <ul className="space-y-2 text-sm text-content-secondary">
                {entry.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Icon name="chevron-right" className="mt-1 h-3 w-3 shrink-0 text-accent" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="eyebrow mb-2.5">Impact</h4>
              <ul className="space-y-2 text-sm text-content-secondary">
                {entry.achievements.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Icon name="trending-up" className="mt-1 h-3 w-3 shrink-0 text-secondary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
            {entry.technologies.map((tech) => (
              <Tag key={tech} className="gap-1.5">
                <TechIcon tech={tech} className="h-3 w-3" colored />
                {tech}
              </Tag>
            ))}

            {entry.website && (
              <ButtonLink
                href={entry.website}
                variant="ghost"
                size="sm"
                iconRight="arrow-up-right"
                className="ml-auto"
                ariaLabel={`Visit the ${entry.company} website`}
              >
                Visit Company
              </ButtonLink>
            )}
          </div>
        </Card>
      </motion.div>
    </li>
  )
}
