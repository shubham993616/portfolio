import { CodeChefPanel } from '@/components/dashboard/CodeChefPanel'
import { GitHubPanel } from '@/components/dashboard/GitHubPanel'
import { LeetCodePanel } from '@/components/dashboard/LeetCodePanel'
import { LinkedInPanel } from '@/components/dashboard/LinkedInPanel'
import { ROUTES, SECTION_IDS } from '@/constants/navigation'

import { ButtonRoute } from '../ui/Button'
import { Container, Section } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'

interface DashboardProps {
  /** `page` drops the section chrome for the standalone /dashboard route. */
  variant?: 'section' | 'page'
}

export function Dashboard({ variant = 'section' }: DashboardProps) {
  const panels = (
    <div className="space-y-5">
      <GitHubPanel />

      <div className="grid gap-5 lg:grid-cols-3">
        <LeetCodePanel />
        <CodeChefPanel />
        <LinkedInPanel />
      </div>
    </div>
  )

  if (variant === 'page') return panels

  return (
    <Section id={SECTION_IDS.dashboard} aria-labelledby="dashboard-heading">
      <Container wide>
        <SectionHeading
          eyebrow="Developer Dashboard"
          title="Live signal, not screenshots"
          description="GitHub numbers are fetched from the official API on every visit. Where a platform has no public API, the card says so and shows resume-verified figures instead."
          icon="dashboard"
        />

        <div className="mt-14">{panels}</div>

        <div className="mt-10 flex justify-center">
          <ButtonRoute to={ROUTES.dashboard} variant="outline" size="lg" iconRight="arrow-right">
            Open the full dashboard
          </ButtonRoute>
        </div>
      </Container>
    </Section>
  )
}
