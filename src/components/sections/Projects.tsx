import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'

import { ProjectCard } from '@/components/cards/ProjectCard'
import { ROUTES, SECTION_IDS } from '@/constants/navigation'
import { PROJECTS, PROJECT_STACK_FILTERS } from '@/data/projects'
import { cn } from '@/lib/cn'

import { ButtonRoute } from '../ui/Button'
import { Container, Section } from '../ui/Container'
import { EmptyState } from '../ui/EmptyState'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechIcon'

const ALL = 'All'

interface ProjectsProps {
  /** The standalone /projects page renders every card and its own heading. */
  variant?: 'section' | 'page'
}

export function Projects({ variant = 'section' }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>(ALL)

  const filtered = useMemo(() => {
    if (activeFilter === ALL) return PROJECTS
    return PROJECTS.filter((project) => project.stackTags.includes(activeFilter))
  }, [activeFilter])

  const body = (
    <>
      {/* Tech filter */}
      <div
        className="mt-10 flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter projects by technology"
      >
        <span className="mr-1 inline-flex items-center gap-1.5 text-xs text-content-muted">
          <Icon name="puzzle" className="h-3.5 w-3.5" />
          Filter
        </span>

        {[ALL, ...PROJECT_STACK_FILTERS].map((filter) => {
          const active = filter === activeFilter
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={active}
              className={cn(
                'relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300',
                active
                  ? 'bg-accent/12 border-accent/50 text-accent'
                  : 'border-border bg-surface/50 text-content-secondary hover:border-border-strong hover:text-content-primary'
              )}
            >
              {filter !== ALL && <TechIcon tech={filter} className="h-3 w-3" colored />}
              {filter}
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.ul
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-8 grid gap-6 lg:grid-cols-2"
          >
            {filtered.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8"
          >
            <EmptyState
              icon="folder-git"
              title="No projects use that stack yet"
              description="Try another technology, or clear the filter to see everything."
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )

  if (variant === 'page') return body

  return (
    <Section id={SECTION_IDS.projects} aria-labelledby="projects-heading">
      <Container wide>
        <SectionHeading
          eyebrow="Projects"
          title="Systems I designed, built and shipped"
          description="Each one has a full case study — the problem, the architecture, the schema, the API contract and what I would do differently."
          icon="folder-git"
        />

        {body}

        <div className="mt-10 flex justify-center">
          <ButtonRoute to={ROUTES.projects} variant="outline" size="lg" iconRight="arrow-right">
            Browse all projects
          </ButtonRoute>
        </div>
      </Container>
    </Section>
  )
}
