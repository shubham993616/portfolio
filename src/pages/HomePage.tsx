import { Suspense, lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Seo } from '@/components/seo/Seo'
import { About } from '@/components/sections/About'
import { Achievements } from '@/components/sections/Achievements'
import { ContactCTA } from '@/components/sections/ContactCTA'
import { Education } from '@/components/sections/Education'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Journey } from '@/components/sections/Journey'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Container, Section } from '@/components/ui/Container'
import { SkeletonStat } from '@/components/ui/Skeleton'
import { SITE } from '@/constants/site'
import { SECTION_IDS } from '@/constants/navigation'
import { personSchema } from '@/lib/structured-data'
import { scrollToSection } from '@/utils/scroll'

/**
 * The dashboard is below the fold and does network work on mount, so it is
 * split out of the initial bundle. Its chunk is shared with /dashboard.
 */
const Dashboard = lazy(() =>
  import('@/components/sections/Dashboard').then((module) => ({ default: module.Dashboard }))
)

function DashboardFallback() {
  return (
    <Section id={SECTION_IDS.dashboard}>
      <Container wide>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonStat key={index} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default function HomePage() {
  const { hash } = useLocation()

  // Arriving from another route via `/#experience` should land on the section.
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const timer = window.setTimeout(() => scrollToSection(id), 120)
    return () => window.clearTimeout(timer)
  }, [hash])

  return (
    <>
      <Seo
        title={SITE.title}
        description={SITE.description}
        path="/"
        type="profile"
        keywords={[
          'Shubham Modanwal',
          'backend engineer',
          'Java developer',
          'Spring Boot',
          'REST API',
          'MySQL',
          'React',
          'TypeScript',
          'software engineer portfolio',
          'GATE 2026',
        ]}
        structuredData={personSchema()}
      />

      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Suspense fallback={<DashboardFallback />}>
        <Dashboard />
      </Suspense>
      <Journey />
      <Achievements />
      <Education />
      <ContactCTA />
    </>
  )
}
