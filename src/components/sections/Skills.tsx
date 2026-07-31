import { motion } from 'framer-motion'

import { SkillCard } from '@/components/cards/SkillCard'
import { staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/constants/navigation'
import { SKILL_CATEGORIES } from '@/data/skills'

import { Container, Section } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <Section id={SECTION_IDS.skills} aria-labelledby="skills-heading">
      <Container>
        <SectionHeading
          eyebrow="Skills"
          title="The toolkit, grouped by what it is for"
          description="Backend is where I go deepest. Everything else exists so I can take an idea all the way to something running."
          icon="layers"
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer(0.08)}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILL_CATEGORIES.map((category) => (
            <SkillCard key={category.id} category={category} />
          ))}
        </motion.ul>
      </Container>
    </Section>
  )
}
