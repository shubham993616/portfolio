import { motion } from 'framer-motion'
import { useRef } from 'react'

import { blurReveal, fadeInUp, staggerContainer } from '@/animations/variants'
import { ROUTES, SECTION_IDS } from '@/constants/navigation'
import { HERO_STATS } from '@/data/achievements'
import { PROFILE } from '@/data/profile'
import { HERO_SOCIALS } from '@/data/socials'
import { useRelativePointer, useTypewriter } from '@/hooks'
import { cn } from '@/lib/cn'
import { scrollToSection } from '@/utils/scroll'

import { Button, ButtonLink, ButtonRoute } from '../ui/Button'
import { Container } from '../ui/Container'
import { Counter } from '../ui/Counter'
import { Icon } from '../ui/Icon'
import { PlaceholderNotice } from '../ui/PlaceholderNotice'
import { TechIcon } from '../ui/TechIcon'
import { Particles } from './Particles'

/** Orbiting marks around the portrait. */
const ORBIT_TECH = ['java', 'springboot', 'mysql', 'react', 'typescript', 'git'] as const

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const pointer = useRelativePointer(stageRef)
  const typed = useTypewriter(PROFILE.taglines)

  return (
    <section
      id={SECTION_IDS.hero}
      ref={stageRef}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100vh-var(--nav-height))] items-center overflow-hidden py-16 sm:py-20"
    >
      <Particles />

      {/* Animated gradient wash, nudged by the pointer for a parallax feel. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ x: pointer.x * -18, y: pointer.y * -14 }}
        transition={{ type: 'spring', stiffness: 60, damping: 22 }}
      >
        <div
          className="absolute left-1/2 top-1/4 h-[34rem] w-[52rem] -translate-x-1/2 animate-gradient-pan opacity-60 blur-[110px]"
          style={{
            backgroundImage:
              'linear-gradient(120deg, rgb(var(--color-accent) / 0.22), rgb(var(--color-secondary) / 0.14), transparent 70%)',
            backgroundSize: '200% 200%',
          }}
        />
      </motion.div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
          {/* Copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.09, 0.15)}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5 text-xs font-medium text-secondary backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
              </span>
              {PROFILE.availability}
            </motion.div>

            <motion.h1
              id="hero-heading"
              variants={blurReveal}
              className="mt-6 text-[2.5rem] leading-[1.05] tracking-tightest sm:text-6xl lg:text-[4.1rem]"
            >
              <span className="block text-content-primary">{PROFILE.name}</span>
              <span className="text-gradient mt-1 block">{PROFILE.role}</span>
            </motion.h1>

            {/* Typing line — the live region keeps it from being announced letter by letter. */}
            <motion.div
              variants={fadeInUp}
              className="mt-4 flex h-7 items-center font-mono text-sm sm:text-base"
            >
              <span className="mr-2 select-none text-content-muted">&gt;</span>
              <span className="text-secondary" aria-live="off">
                {typed}
              </span>
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-4 w-[2px] animate-caret-blink bg-secondary"
              />
              <span className="sr-only">{PROFILE.taglines.join(', ')}</span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-6 text-base leading-relaxed text-content-secondary sm:text-lg"
            >
              {PROFILE.headline}{' '}
              <span className="text-content-primary">
                Currently Co-Founder &amp; CPO at Neosix Technologies
              </span>{' '}
              and a full-stack development intern at Vidyarthimitra, studying Computer Science at
              AKGEC.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink
                href={PROFILE.resumePath}
                download={PROFILE.resumeFileName}
                external={false}
                variant="primary"
                size="lg"
                iconLeft="download"
              >
                Download Resume
              </ButtonLink>

              <Button
                variant="outline"
                size="lg"
                iconRight="arrow-right"
                onClick={() => scrollToSection(SECTION_IDS.projects)}
              >
                View Projects
              </Button>

              <ButtonRoute to={ROUTES.contact} variant="secondary" size="lg" iconLeft="sparkles">
                Hire Me
              </ButtonRoute>
            </motion.div>

            {/* Socials */}
            <motion.ul variants={fadeInUp} className="mt-8 flex flex-wrap items-center gap-2.5">
              {HERO_SOCIALS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} — ${social.handle}`}
                    style={{ '--tint': social.rgb } as React.CSSProperties}
                    className={cn(
                      'group flex h-10 items-center gap-2 rounded-xl border border-border bg-surface/50 px-3 text-content-secondary backdrop-blur',
                      'transition-all duration-300 ease-premium hover:-translate-y-0.5',
                      'hover:border-[rgb(var(--tint)/0.6)] hover:text-[rgb(var(--tint))] hover:shadow-[0_8px_24px_-12px_rgb(var(--tint))]'
                    )}
                  >
                    <Icon name={social.icon} className="h-4 w-4" />
                    <span className="text-xs font-medium">{social.label}</span>
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* Stat strip */}
            <motion.dl
              variants={fadeInUp}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-7 sm:grid-cols-4"
            >
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold tracking-tight text-content-primary sm:text-[1.75rem]">
                      <Counter
                        value={stat.value}
                        suffix={stat.suffix}
                        decimals={stat.decimals ?? 0}
                      />
                    </span>
                    <span className="mt-1 block text-[0.7rem] leading-snug text-content-muted">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Portrait + orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            className="relative mx-auto hidden w-full max-w-sm lg:block"
          >
            <motion.div
              animate={{ x: pointer.x * 14, y: pointer.y * 12 }}
              transition={{ type: 'spring', stiffness: 90, damping: 20 }}
              className="relative aspect-square"
            >
              {/* Rotating ring */}
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-accent/25"
              />
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-full border border-secondary/20"
              />

              {/* Orbiting technology marks */}
              {ORBIT_TECH.map((tech, index) => {
                const angle = (index / ORBIT_TECH.length) * Math.PI * 2 - Math.PI / 2
                const radius = 50
                return (
                  // The outer span owns the -50%/-50% centring offset. Framer
                  // writes `transform` inline on whatever it animates, so the
                  // float has to live on a separate element or the centring
                  // gets overwritten and every mark jumps half a tile.
                  <span
                    key={tech}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${50 + Math.cos(angle) * radius}%`,
                      top: `${50 + Math.sin(angle) * radius}%`,
                    }}
                  >
                    <motion.span
                      className="glass flex h-11 w-11 items-center justify-center rounded-xl shadow-card"
                      animate={{ y: [0, -7, 0] }}
                      transition={{
                        duration: 3.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.32,
                      }}
                    >
                      <TechIcon tech={tech} className="h-5 w-5" colored />
                    </motion.span>
                  </span>
                )
              })}

              {/* Portrait — PLACEHOLDER, replace public/images/profile.svg */}
              <div className="absolute inset-[18%] overflow-hidden rounded-full shadow-lifted ring-1 ring-white/10">
                <img
                  src={PROFILE.avatarPath}
                  alt={`Portrait of ${PROFILE.name} (placeholder image)`}
                  width={320}
                  height={320}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                />
              </div>

              <PlaceholderNotice
                className="absolute bottom-[14%] left-1/2 -translate-x-1/2"
                label="Replace photo"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.button
        type="button"
        onClick={() => scrollToSection(SECTION_IDS.about)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        aria-label="Scroll to the about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-content-muted transition-colors hover:text-accent md:flex"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.2em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon name="chevron-down" className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}
