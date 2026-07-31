import { EducationCard } from '@/components/cards/EducationCard'
import { SECTION_IDS } from '@/constants/navigation'
import { EDUCATION } from '@/data/education'

import { Container, Section } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Education() {
  return (
    <Section id={SECTION_IDS.education} aria-labelledby="education-heading">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="Computer Science and Engineering with a Data Science specialisation, on top of a consistent school record."
          icon="graduation"
        />

        <ol className="mt-14">
          {EDUCATION.map((entry, index) => (
            <EducationCard
              key={entry.id}
              entry={entry}
              index={index}
              isLast={index === EDUCATION.length - 1}
            />
          ))}
        </ol>
      </Container>
    </Section>
  )
}
