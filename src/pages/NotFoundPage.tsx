import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { ButtonRoute } from '@/components/ui/Button'
import { Container, Section } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { NAV_ITEMS, ROUTES, SECONDARY_NAV } from '@/constants/navigation'
import { SITE } from '@/constants/site'

const SUGGESTIONS = [...NAV_ITEMS.filter((item) => item.kind === 'route'), ...SECONDARY_NAV].filter(
  (item) => item.kind === 'route'
)

export default function NotFoundPage() {
  return (
    <PageTransition>
      <Seo
        title={`404 — Page not found | ${SITE.name}`}
        description="That page does not exist. Head back to the portfolio home page."
        path="/404"
        noIndex
      />

      <Section className="flex min-h-[70vh] items-center">
        <Container className="text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient font-mono text-[6rem] font-bold leading-none sm:text-[9rem]"
          >
            404
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-4 text-2xl tracking-tight sm:text-3xl"
          >
            This route was never deployed
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
            className="mx-auto mt-4 max-w-md leading-relaxed text-content-secondary"
          >
            The page you asked for does not exist — most likely a stale link or a typo in the URL.
            Everything worth reading is one hop away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <ButtonRoute to={ROUTES.home} variant="primary" size="lg" iconLeft="home">
              Back to home
            </ButtonRoute>
            <ButtonRoute to={ROUTES.projects} variant="outline" size="lg" iconRight="arrow-right">
              Browse projects
            </ButtonRoute>
          </motion.div>

          <motion.nav
            aria-label="Suggested pages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.34 }}
            className="mt-12"
          >
            <p className="eyebrow mb-4">Or jump straight to</p>
            <ul className="flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-3.5 py-2 text-sm text-content-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:text-content-primary"
                  >
                    <Icon name={item.icon} className="h-3.5 w-3.5" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </Container>
      </Section>
    </PageTransition>
  )
}
