import { motion } from 'framer-motion'

import { fadeInRight, listItem, staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/constants/navigation'
import { PROFILE } from '@/data/profile'
import type { IconName } from '@/lib/icons'

import { Tag } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Container, Section } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'

/** Compact journey rail shown beside the prose. */
const QUICK_TIMELINE: { year: string; label: string; icon: IconName }[] = [
  { year: '2023', label: 'Started B.Tech CSE (Data Science) at AKGEC', icon: 'graduation' },
  { year: '2025', label: 'Volunteer Educator, Slum Swaraj Foundation', icon: 'heart' },
  { year: '2026', label: 'Full-stack intern at Vidyarthimitra', icon: 'briefcase' },
  { year: '2026', label: 'Co-Founder, CPO & COO at Neosix Technologies', icon: 'rocket' },
  { year: 'Now', label: 'Building backend systems end to end', icon: 'target' },
]

export function About() {
  return (
    <Section id={SECTION_IDS.about} aria-labelledby="about-heading">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Engineering, from the layer users never see"
          description="A short version of how I got here and what I care about when I build software."
          icon="compass"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          {/* Prose */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer(0.1)}
            className="space-y-5"
          >
            {PROFILE.about.map((paragraph) => (
              <motion.p
                key={paragraph.slice(0, 24)}
                variants={listItem}
                className="text-[0.95rem] leading-[1.85] text-content-secondary"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={listItem} className="pt-2">
              <h3 className="eyebrow mb-3">Interests</h3>
              <ul className="flex flex-wrap gap-2">
                {PROFILE.interests.map((interest) => (
                  <li key={interest}>
                    <Tag>{interest}</Tag>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={listItem} className="pt-2">
              <h3 className="eyebrow mb-3">Where I am heading</h3>
              <ul className="space-y-2.5">
                {PROFILE.goals.map((goal) => (
                  <li key={goal} className="flex gap-3 text-sm text-content-secondary">
                    <Icon name="target" className="mt-1 h-3.5 w-3.5 shrink-0 text-secondary" />
                    <span className="leading-relaxed">{goal}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Timeline rail */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
          >
            <Card className="p-6" spotlight>
              <h3 className="mb-6 flex items-center gap-2 text-sm font-semibold text-content-primary">
                <Icon name="milestone" className="h-4 w-4 text-accent" />
                The short version
              </h3>

              <ol className="relative space-y-6">
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-accent/50 via-border to-transparent"
                />

                {QUICK_TIMELINE.map((item, index) => (
                  <motion.li
                    key={`${item.year}-${item.label}`}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.45 }}
                    className="relative flex gap-4 pl-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-accent/60 bg-background"
                    />
                    <div>
                      <p className="font-mono text-xs text-accent">{item.year}</p>
                      <p className="mt-1 text-sm leading-relaxed text-content-secondary">
                        {item.label}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </Card>
          </motion.div>
        </div>

        {/* Philosophy */}
        <div className="mt-16">
          <h3 className="eyebrow mb-6">Engineering philosophy</h3>
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.08)}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PROFILE.philosophy.map((item) => (
              <motion.li key={item.title} variants={listItem} className="h-full">
                <Card interactive spotlight className="h-full p-5">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Icon name={item.icon} className="h-4 w-4" />
                  </span>
                  <h4 className="text-sm font-semibold text-content-primary">{item.title}</h4>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-content-secondary">
                    {item.body}
                  </p>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </Section>
  )
}
