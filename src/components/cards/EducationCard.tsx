import { motion } from 'framer-motion'

import type { EducationEntry } from '@/types/content'

import { Tag } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

interface EducationCardProps {
  entry: EducationEntry
  index: number
  isLast: boolean
}

export function EducationCard({ entry, index, isLast }: EducationCardProps) {
  return (
    <li className="relative pl-10 sm:pl-14">
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[15px] top-12 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-border to-border/10 sm:left-[23px]"
        />
      )}

      <span
        aria-hidden="true"
        className="absolute left-0 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-accent/35 bg-background text-accent sm:h-12 sm:w-12"
      >
        <Icon name={entry.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
      </span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
        className={isLast ? '' : 'pb-8'}
      >
        <Card spotlight interactive className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-tight text-content-primary sm:text-lg">
                {entry.institution}
              </h3>
              <p className="mt-1 text-sm text-content-secondary">
                {entry.qualification}
                {entry.field && <span className="text-accent"> · {entry.field}</span>}
              </p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-content-muted">
                <Icon name="map-pin" className="h-3 w-3" />
                {entry.location}
                <span aria-hidden="true">·</span>
                <Icon name="calendar" className="h-3 w-3" />
                {entry.period}
              </p>
            </div>

            <div className="bg-accent/8 shrink-0 rounded-xl border border-accent/25 px-4 py-2.5 text-center">
              <p className="text-[0.65rem] uppercase tracking-wider text-content-muted">
                {entry.score.label}
              </p>
              <p className="mt-0.5 text-xl font-semibold text-accent">{entry.score.value}</p>
            </div>
          </div>

          {entry.coursework.length > 0 && (
            <div className="mt-5 border-t border-border pt-4">
              <h4 className="eyebrow mb-2.5">Relevant coursework</h4>
              <ul className="flex flex-wrap gap-1.5">
                {entry.coursework.map((course) => (
                  <li key={course}>
                    <Tag>{course}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </motion.div>
    </li>
  )
}
