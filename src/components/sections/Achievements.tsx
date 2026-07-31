import { motion } from 'framer-motion'

import { AchievementCard } from '@/components/cards/AchievementCard'
import { staggerContainer } from '@/animations/variants'
import { SECTION_IDS } from '@/constants/navigation'
import { ACHIEVEMENTS } from '@/data/achievements'

import { Container, Section } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function Achievements() {
  return (
    <Section id={SECTION_IDS.achievements} aria-labelledby="achievements-heading">
      <Container>
        <SectionHeading
          eyebrow="Achievements"
          title="Measurable results"
          description="A national exam, a few hundred solved problems, and a CGPA held steady through an internship, a startup and weekly teaching."
          icon="trophy"
        />

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer(0.09)}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ACHIEVEMENTS.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </motion.ul>
      </Container>
    </Section>
  )
}
