import { PageTransition } from '@/components/layout/PageTransition'
import { Dashboard } from '@/components/sections/Dashboard'
import { Seo } from '@/components/seo/Seo'
import { Card } from '@/components/ui/Card'
import { Container, Section } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE } from '@/constants/site'
import { breadcrumbSchema } from '@/lib/structured-data'

const LIMITATIONS = [
  {
    platform: 'GitHub',
    status: 'Live',
    detail:
      'Profile, repositories, stars, forks and the language mix come from the official public REST API on every visit. The activity grid is derived from the public events feed, which retains roughly 90 days — GitHub publishes no API for the lifetime contribution graph.',
    icon: 'github' as const,
    tone: 'text-secondary',
  },
  {
    platform: 'LeetCode',
    status: 'Community proxy',
    detail:
      'LeetCode has no official public API. Stats are read through a community proxy over its internal GraphQL endpoint; if that proxy is rate limited or offline, the card falls back to the resume-verified figure.',
    icon: 'code' as const,
    tone: 'text-warning',
  },
  {
    platform: 'CodeChef',
    status: 'Resume-verified',
    detail:
      'CodeChef exposes no public API and blocks cross-origin reads, so any third-party endpoint is a scraper that breaks without warning. The rating shown is the resume-verified figure; the profile link goes to live standings.',
    icon: 'terminal' as const,
    tone: 'text-content-muted',
  },
  {
    platform: 'LinkedIn',
    status: 'Resume-verified',
    detail:
      "LinkedIn's profile API is partner-gated and scraping breaches their terms. The card renders the same verified experience data used across this site.",
    icon: 'linkedin' as const,
    tone: 'text-content-muted',
  },
]

export default function DashboardPage() {
  return (
    <PageTransition>
      <Seo
        title={`Developer Dashboard — ${SITE.name}`}
        description="Live GitHub statistics, competitive programming ratings and open-source activity for Shubham Modanwal, with documented fallbacks for platforms without a public API."
        path="/dashboard"
        keywords={['GitHub stats', 'LeetCode', 'CodeChef', 'developer dashboard', 'open source']}
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Developer Dashboard', path: '/dashboard' },
        ])}
      />

      <Section spacing="md">
        <Container wide>
          <SectionHeading
            eyebrow="Developer Dashboard"
            title="Live signal, not screenshots"
            description="Numbers fetched at page load, refreshed every five minutes while the tab is visible, and clearly labelled when a platform does not expose a public API."
            icon="dashboard"
          />

          <div className="mt-12">
            <Dashboard variant="page" />
          </div>

          {/* Honest documentation of what is live and what is not. */}
          <div className="mt-14">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-content-primary">
              <Icon name="shield" className="h-4 w-4 text-accent" />
              Data sources &amp; limitations
            </h2>
            <p className="mb-6 max-w-3xl text-sm leading-relaxed text-content-secondary">
              A dashboard that quietly invents numbers is worse than no dashboard. Here is exactly
              where each figure comes from.
            </p>

            <ul className="grid gap-4 sm:grid-cols-2">
              {LIMITATIONS.map((item) => (
                <li key={item.platform}>
                  <Card className="h-full p-5" spotlight>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5 text-sm font-semibold text-content-primary">
                        <Icon name={item.icon} className="h-4 w-4" />
                        {item.platform}
                      </span>
                      <span className={`text-[0.7rem] font-medium ${item.tone}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-content-secondary">
                      {item.detail}
                    </p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </PageTransition>
  )
}
