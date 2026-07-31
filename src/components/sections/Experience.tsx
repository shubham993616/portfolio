import { ExperienceCard } from '@/components/cards/ExperienceCard'
import { SECTION_IDS } from '@/constants/navigation'
import { EXPERIENCE } from '@/data/experience'

import { Container, Section } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Experience() {
  return (
    <Section id={SECTION_IDS.experience} aria-labelledby="experience-heading">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I have shipped work"
          description="A startup I co-founded, a production codebase I debug daily, and a classroom I keep showing up for."
          icon="briefcase"
        />

        <ol className="mt-14">
          {EXPERIENCE.map((entry, index) => (
            <ExperienceCard
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === EXPERIENCE.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  )
}
