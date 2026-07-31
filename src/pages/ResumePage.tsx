import { useState } from 'react'

import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container, Section } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Skeleton } from '@/components/ui/Skeleton'
import { SITE } from '@/constants/site'
import { EDUCATION } from '@/data/education'
import { EXPERIENCE } from '@/data/experience'
import { PROFILE } from '@/data/profile'
import { breadcrumbSchema } from '@/lib/structured-data'

/**
 * Download analytics placeholder.
 *
 * Wire this to your analytics provider (Vercel Analytics, Plausible, GA4) —
 * a one-line call is all the swap needs. Deliberately left as a no-op so the
 * site ships with zero third-party tracking by default.
 */
const trackResumeDownload = (): void => {
  if (import.meta.env.DEV) {
    console.warn('[analytics] resume_download — replace with your analytics provider')
  }
}

export default function ResumePage() {
  const [loaded, setLoaded] = useState(false)

  return (
    <PageTransition>
      <Seo
        title={`Resume — ${SITE.name}`}
        description="View or download the resume of Shubham Modanwal — backend-focused software engineer, Co-Founder & CPO at Neosix Technologies, GATE 2026 qualified."
        path="/resume"
        keywords={['resume', 'CV', 'backend engineer', 'Java', 'Spring Boot']}
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ])}
      />

      <Section spacing="md">
        <Container>
          <SectionHeading
            eyebrow="Resume"
            title="The one-page version"
            description="Everything on this site traces back to this document. Read it inline or take the PDF with you."
            icon="file-text"
          />

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink
              href={PROFILE.resumePath}
              download={PROFILE.resumeFileName}
              external={false}
              variant="primary"
              size="lg"
              iconLeft="download"
              onClick={trackResumeDownload}
            >
              Download PDF
            </ButtonLink>

            <ButtonLink
              href={PROFILE.resumePath}
              variant="outline"
              size="lg"
              iconRight="external-link"
            >
              Open in a new tab
            </ButtonLink>
          </div>

          {/* Quick summary — readable even where the embedded PDF viewer is blocked. */}
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <Card className="p-5" spotlight>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-content-primary">
                <Icon name="briefcase" className="h-4 w-4 text-accent" />
                Experience
              </h2>
              <ul className="space-y-3.5">
                {EXPERIENCE.map((entry) => (
                  <li key={entry.id}>
                    <p className="text-sm font-medium leading-snug text-content-primary">
                      {entry.company}
                    </p>
                    <p className="text-xs leading-snug text-content-secondary">{entry.role}</p>
                    <p className="mt-0.5 text-[0.7rem] text-content-muted">{entry.period}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5" spotlight>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-content-primary">
                <Icon name="graduation" className="h-4 w-4 text-accent" />
                Education
              </h2>
              <ul className="space-y-3.5">
                {EDUCATION.map((entry) => (
                  <li key={entry.id}>
                    <p className="text-sm font-medium leading-snug text-content-primary">
                      {entry.institution}
                    </p>
                    <p className="text-xs leading-snug text-content-secondary">
                      {entry.score.label} {entry.score.value}
                    </p>
                    <p className="mt-0.5 text-[0.7rem] text-content-muted">{entry.period}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5" spotlight>
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-content-primary">
                <Icon name="mail" className="h-4 w-4 text-accent" />
                Contact
              </h2>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="break-all text-content-secondary transition-colors hover:text-accent"
                  >
                    {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.phoneHref}
                    className="text-content-secondary transition-colors hover:text-accent"
                  >
                    {PROFILE.phone}
                  </a>
                </li>
                <li className="text-content-secondary">{PROFILE.location}</li>
              </ul>
            </Card>
          </div>

          {/* Embedded viewer */}
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-background-alt/60">
            {!loaded && (
              <div className="absolute inset-0 p-6">
                <Skeleton className="h-full w-full rounded-xl" />
              </div>
            )}

            <object
              data={`${PROFILE.resumePath}#view=FitH`}
              type="application/pdf"
              title={`${PROFILE.name} — resume`}
              onLoad={() => setLoaded(true)}
              className="h-[85vh] max-h-[1100px] w-full"
            >
              {/* Fallback for browsers (and most mobile devices) without an inline PDF viewer. */}
              <div className="flex flex-col items-center gap-4 p-12 text-center">
                <Icon name="file-text" className="h-8 w-8 text-content-muted" />
                <p className="text-sm text-content-secondary">
                  Your browser cannot display the PDF inline.
                </p>
                <ButtonLink
                  href={PROFILE.resumePath}
                  download={PROFILE.resumeFileName}
                  external={false}
                  variant="primary"
                  size="md"
                  iconLeft="download"
                >
                  Download the resume
                </ButtonLink>
              </div>
            </object>
          </div>
        </Container>
      </Section>
    </PageTransition>
  )
}
