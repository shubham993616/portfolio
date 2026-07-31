import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { SECTION_IDS } from '@/constants/navigation'
import { JOURNEY } from '@/data/journey'
import { cn } from '@/lib/cn'
import type { JourneyKind } from '@/types/content'

import { Tag } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Container, Section } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

const KIND_TINT: Record<JourneyKind, string> = {
  education: '79 140 255',
  skill: '52 211 153',
  project: '129 140 248',
  internship: '0 212 170',
  ngo: '236 72 153',
  startup: '245 158 11',
  exam: '251 191 36',
  goal: '148 163 184',
}

const KIND_LABEL: Record<JourneyKind, string> = {
  education: 'Education',
  skill: 'Skills',
  project: 'Project',
  internship: 'Internship',
  ngo: 'NGO',
  startup: 'Startup',
  exam: 'Exam',
  goal: 'Goal',
}

export function Journey() {
  const railRef = useRef<HTMLDivElement>(null)

  // The rail fills as the section passes through the viewport.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 75%', 'end 60%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 })
  const height = useTransform(fill, [0, 1], ['0%', '100%'])

  return (
    <Section id={SECTION_IDS.journey} aria-labelledby="journey-heading" className="overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="Build Journey"
          title="From first principles to first client"
          description="Every milestone that got me from a Class X result sheet to running delivery for a software company."
          icon="milestone"
        />

        <div ref={railRef} className="relative mt-14">
          {/* Track + animated fill */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[15px] top-0 w-px bg-border/60 sm:left-1/2 sm:-translate-x-1/2"
          />
          <motion.span
            aria-hidden="true"
            style={{ height }}
            className="absolute left-[15px] top-0 w-px bg-gradient-to-b from-accent via-secondary to-transparent sm:left-1/2 sm:-translate-x-1/2"
          />

          <ol className="space-y-8 sm:space-y-0">
            {JOURNEY.map((milestone, index) => {
              const tint = KIND_TINT[milestone.kind]
              const alignRight = index % 2 === 1

              return (
                <li
                  key={milestone.id}
                  className={cn(
                    'relative pl-11 sm:flex sm:w-full sm:items-center sm:gap-8 sm:pb-10 sm:pl-0',
                    alignRight ? 'sm:flex-row-reverse' : 'sm:flex-row'
                  )}
                >
                  {/*
                    Positioning lives on a plain span and the animation on the
                    span inside it. Framer writes `transform` inline, which
                    would otherwise clobber the `-translate-x-1/2` centring and
                    leave every node sitting off the rail.
                  */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-2 z-10 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
                  >
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background',
                        milestone.isFuture && 'border-dashed'
                      )}
                      style={{ borderColor: `rgb(${tint} / 0.55)`, color: `rgb(${tint})` }}
                    >
                      <Icon name={milestone.icon} className="h-3.5 w-3.5" />
                    </motion.span>
                  </span>

                  {/* Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="sm:w-[calc(50%-2rem)]"
                  >
                    <Card
                      tint={tint}
                      spotlight
                      interactive
                      className={cn('p-5', milestone.isFuture && 'border-dashed opacity-90')}
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-md px-2 py-0.5 font-mono text-[0.65rem] font-medium"
                          style={{
                            backgroundColor: `rgb(${tint} / 0.14)`,
                            color: `rgb(${tint})`,
                          }}
                        >
                          {milestone.year}
                        </span>
                        <span className="text-[0.65rem] uppercase tracking-wider text-content-muted">
                          {KIND_LABEL[milestone.kind]}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold tracking-tight text-content-primary">
                        {milestone.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-content-muted">{milestone.subtitle}</p>
                      <p className="mt-3 text-sm leading-relaxed text-content-secondary">
                        {milestone.description}
                      </p>

                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {milestone.tags.map((tag) => (
                          <li key={tag}>
                            <Tag>{tag}</Tag>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>

                  {/* Spacer keeps the alternating layout balanced on desktop. */}
                  <div aria-hidden="true" className="hidden sm:block sm:w-[calc(50%-2rem)]" />
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
