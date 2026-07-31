import { motion } from 'framer-motion'

import { ROUTES, SECTION_IDS } from '@/constants/navigation'
import { PROFILE } from '@/data/profile'
import { SOCIALS } from '@/data/socials'
import { useCopyToClipboard } from '@/hooks'

import { Button, ButtonLink, ButtonRoute } from '../ui/Button'
import { Container, Section } from '../ui/Container'
import { Icon } from '../ui/Icon'
import { useToast } from '../ui/toast'

export function ContactCTA() {
  const { copy } = useCopyToClipboard()
  const { push } = useToast()

  const handleCopyEmail = async () => {
    const ok = await copy(PROFILE.email)
    push({
      tone: ok ? 'success' : 'error',
      title: ok ? 'Email copied' : 'Could not copy',
      description: ok ? PROFILE.email : 'Your browser blocked clipboard access.',
    })
  }

  return (
    <Section id={SECTION_IDS.contact} spacing="md" aria-labelledby="contact-cta-heading">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="gradient-border relative overflow-hidden rounded-3xl bg-surface/60 p-8 backdrop-blur sm:p-12"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 animate-gradient-pan opacity-70"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 70% 90% at 15% 0%, rgb(var(--color-accent) / 0.16), transparent 60%), radial-gradient(ellipse 60% 80% at 90% 100%, rgb(var(--color-secondary) / 0.14), transparent 60%)',
              backgroundSize: '180% 180%',
            }}
          />

          <div className="relative z-10 flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow mb-3">Contact</p>
              <h2
                id="contact-cta-heading"
                className="text-3xl leading-tight tracking-tightest sm:text-4xl"
              >
                Have a role, a project, or a problem worth solving?
              </h2>
              <p className="mt-4 leading-relaxed text-content-secondary">
                I am open to SDE internships, full-time roles and freelance backend work. The
                fastest way to reach me is the contact form — it lands straight in my inbox.
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {SOCIALS.filter((social) => social.showInHero).map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} — ${social.handle}`}
                      style={{ '--tint': social.rgb } as React.CSSProperties}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface/60 text-content-secondary backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgb(var(--tint)/0.6)] hover:text-[rgb(var(--tint))]"
                    >
                      <Icon name={social.icon} className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex w-full flex-col gap-3 sm:max-w-xs">
              <ButtonRoute
                to={ROUTES.contact}
                variant="primary"
                size="lg"
                iconRight="arrow-right"
                fullWidth
              >
                Start a conversation
              </ButtonRoute>

              <Button
                variant="outline"
                size="lg"
                iconLeft="copy"
                fullWidth
                onClick={handleCopyEmail}
              >
                Copy email
              </Button>

              <ButtonLink
                href={PROFILE.phoneHref}
                external={false}
                variant="ghost"
                size="lg"
                iconLeft="phone"
                fullWidth
              >
                {PROFILE.phone}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
