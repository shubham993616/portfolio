import { ContactForm } from '@/components/forms/ContactForm'
import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container, Section } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useToast } from '@/components/ui/toast'
import { SITE } from '@/constants/site'
import { PROFILE } from '@/data/profile'
import { SOCIALS } from '@/data/socials'
import { useCopyToClipboard } from '@/hooks'
import { breadcrumbSchema } from '@/lib/structured-data'

export default function ContactPage() {
  const { copy } = useCopyToClipboard()
  const { push } = useToast()

  const copyValue = async (label: string, value: string) => {
    const ok = await copy(value)
    push({
      tone: ok ? 'success' : 'error',
      title: ok ? `${label} copied` : 'Could not copy',
      description: ok ? value : 'Your browser blocked clipboard access.',
    })
  }

  return (
    <PageTransition>
      <Seo
        title={`Contact — ${SITE.name}`}
        description="Get in touch with Shubham Modanwal about backend engineering roles, internships, freelance projects or collaboration."
        path="/contact"
        keywords={['contact', 'hire', 'backend developer', 'Java developer', 'freelance']}
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />

      <Section spacing="md">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something worth shipping"
            description="Open to SDE internships, full-time backend roles and freelance work. Fill in the form and it lands directly in my inbox — or reach me on any channel below."
            icon="mail"
          />

          {/*
            `minmax(0, …)` plus `min-w-0` on both children: without them a grid
            item's automatic minimum size is its min-content width, and a single
            long unbreakable string (an email address) widens the whole track.
          */}
          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
            {/* Form */}
            <Card className="min-w-0 p-6 sm:p-8" spotlight>
              <h2 className="mb-1 text-lg font-semibold text-content-primary">Send a message</h2>
              <p className="mb-7 text-sm text-content-muted">
                Fields marked <span className="text-danger">*</span> are required.
              </p>
              <ContactForm />
            </Card>

            {/* Direct channels */}
            <div className="min-w-0 space-y-5">
              <Card className="p-6" spotlight>
                <h2 className="mb-5 text-sm font-semibold text-content-primary">Direct</h2>

                <ul className="space-y-3">
                  <li>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background-alt/50 p-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <Icon name="mail" className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.7rem] text-content-muted">Email</p>
                        <a
                          href={`mailto:${PROFILE.email}`}
                          className="block truncate text-sm text-content-primary transition-colors hover:text-accent"
                        >
                          {PROFILE.email}
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Copy email address"
                        onClick={() => void copyValue('Email', PROFILE.email)}
                      >
                        <Icon name="copy" className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background-alt/50 p-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary">
                        <Icon name="phone" className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[0.7rem] text-content-muted">Phone</p>
                        <a
                          href={PROFILE.phoneHref}
                          className="block truncate text-sm text-content-primary transition-colors hover:text-accent"
                        >
                          {PROFILE.phone}
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Copy phone number"
                        onClick={() => void copyValue('Phone number', PROFILE.phone)}
                      >
                        <Icon name="copy" className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>

                  <li>
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-background-alt/50 p-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-content-secondary">
                        <Icon name="map-pin" className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.7rem] text-content-muted">Location</p>
                        <p className="text-sm text-content-primary">{PROFILE.location}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </Card>

              <Card className="p-6" spotlight>
                <h2 className="mb-5 text-sm font-semibold text-content-primary">Profiles</h2>
                <ul className="space-y-2">
                  {SOCIALS.filter((social) => social.showInHero).map((social) => (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ '--tint': social.rgb } as React.CSSProperties}
                        className="group flex items-center gap-3 rounded-xl border border-border p-3 transition-all duration-300 hover:border-[rgb(var(--tint)/0.5)] hover:bg-surface"
                      >
                        <span className="flex h-8 w-8 items-center justify-center text-content-secondary transition-colors group-hover:text-[rgb(var(--tint))]">
                          <Icon name={social.icon} className="h-4 w-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-content-primary">{social.label}</span>
                          <span className="block truncate text-xs text-content-muted">
                            {social.handle}
                          </span>
                        </span>
                        <Icon
                          name="arrow-up-right"
                          className="h-3.5 w-3.5 text-content-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6" spotlight>
                <div className="flex items-start gap-3">
                  <Icon name="sparkles" className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-content-primary">Availability</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-content-secondary">
                      {PROFILE.availability}. Typical reply time is under 24 hours.
                    </p>
                    <Badge tone="secondary" pulse className="mt-3">
                      Accepting new opportunities
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </PageTransition>
  )
}
