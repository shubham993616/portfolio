import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { Projects } from '@/components/sections/Projects'
import { Container, Section } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/constants/site'
import { PROJECTS } from '@/data/projects'
import { breadcrumbSchema } from '@/lib/structured-data'

export default function ProjectsPage() {
  return (
    <PageTransition>
      <Seo
        title={`Projects — ${SITE.name}`}
        description={`${PROJECTS.length} engineering projects with full case studies: architecture, database design, API contracts, authentication and the trade-offs behind each decision.`}
        path="/projects"
        keywords={['projects', 'case studies', 'Spring Boot', 'Java', 'React', 'system design']}
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <Section spacing="md">
        <Container wide>
          <SectionHeading
            eyebrow="All projects"
            title="Every system, with the reasoning attached"
            description="Each project has a dedicated case study covering the problem, the architecture, the data model, the API contract, the challenges and what I would change next time."
            icon="folder-git"
          />

          <Projects variant="page" />
        </Container>
      </Section>
    </PageTransition>
  )
}
