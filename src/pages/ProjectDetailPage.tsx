import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import { PageTransition } from '@/components/layout/PageTransition'
import { Seo } from '@/components/seo/Seo'
import { Badge, Tag } from '@/components/ui/Badge'
import { ButtonLink, ButtonRoute } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Container, Section } from '@/components/ui/Container'
import { Icon } from '@/components/ui/Icon'
import { PlaceholderNotice } from '@/components/ui/PlaceholderNotice'
import { Reveal } from '@/components/ui/Reveal'
import { TechIcon } from '@/components/ui/TechIcon'
import { ROUTES } from '@/constants/navigation'
import { SITE } from '@/constants/site'
import { PROJECTS, getProjectBySlug } from '@/data/projects'
import { useActiveSection } from '@/hooks'
import { cn } from '@/lib/cn'
import { breadcrumbSchema, projectSchema } from '@/lib/structured-data'
import type { ApiEndpoint } from '@/types/content'
import { scrollToSection } from '@/utils/scroll'

const METHOD_TONE: Record<ApiEndpoint['method'], string> = {
  GET: 'text-secondary border-secondary/35 bg-secondary/10',
  POST: 'text-accent border-accent/35 bg-accent/10',
  PUT: 'text-warning border-warning/35 bg-warning/10',
  PATCH: 'text-warning border-warning/35 bg-warning/10',
  DELETE: 'text-danger border-danger/35 bg-danger/10',
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  const index = PROJECTS.findIndex((entry) => entry.slug === slug)
  const previous = index > 0 ? PROJECTS[index - 1] : undefined
  const next = index >= 0 && index < PROJECTS.length - 1 ? PROJECTS[index + 1] : undefined

  const sectionIds = useMemo(() => {
    if (!project) return []
    const ids = project.caseStudy.sections.map((section) => section.id)
    if (project.caseStudy.endpoints?.length) ids.push('endpoints')
    if (project.caseStudy.gallery.length) ids.push('gallery')
    ids.push('lessons', 'future')
    return ids
  }, [project])

  const activeSection = useActiveSection(sectionIds, 160)

  if (!project) return <Navigate to="/404" replace />

  const { caseStudy } = project

  return (
    <PageTransition>
      <Seo
        title={`${project.title} — Case Study | ${SITE.name}`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        type="article"
        keywords={[project.title, ...project.stackTags, 'case study', 'architecture']}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            projectSchema(project),
            breadcrumbSchema([
              { name: 'Home', path: '/' },
              { name: 'Projects', path: '/projects' },
              { name: project.title, path: `/projects/${project.slug}` },
            ]),
          ],
        }}
      />

      {/* Hero */}
      <Section spacing="sm" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-96"
          style={{
            background: `radial-gradient(ellipse 70% 100% at 50% 0%, rgb(${project.rgb} / 0.16), transparent 70%)`,
          }}
        />

        <Container className="relative">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-xs text-content-muted"
          >
            <Link to={ROUTES.home} className="transition-colors hover:text-accent">
              Home
            </Link>
            <Icon name="chevron-right" className="h-3 w-3" />
            <Link to={ROUTES.projects} className="transition-colors hover:text-accent">
              Projects
            </Link>
            <Icon name="chevron-right" className="h-3 w-3" />
            <span className="text-content-secondary">{project.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge tone="accent">{project.year}</Badge>
              <Badge tone="secondary">{project.status}</Badge>
              <Badge tone="neutral">{project.subtitle}</Badge>
            </div>

            <h1 className="text-4xl leading-[1.08] tracking-tightest sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-content-secondary">{project.tagline}</p>

            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-4">
              <div>
                <dt className="eyebrow">Role</dt>
                <dd className="mt-1.5 text-sm text-content-primary">{project.role}</dd>
              </div>
              <div>
                <dt className="eyebrow">Timeline</dt>
                <dd className="mt-1.5 text-sm text-content-primary">{project.timeline}</dd>
              </div>
              <div>
                <dt className="eyebrow">Status</dt>
                <dd className="mt-1.5 text-sm text-content-primary">{project.status}</dd>
              </div>
              <div>
                <dt className="eyebrow">Type</dt>
                <dd className="mt-1.5 text-sm capitalize text-content-primary">{project.kind}</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live && (
                <ButtonLink
                  href={project.links.live}
                  variant="primary"
                  size="lg"
                  iconRight="external-link"
                >
                  Live Website
                </ButtonLink>
              )}
              {project.links.repository && (
                <ButtonLink
                  href={project.links.repository}
                  variant="outline"
                  size="lg"
                  iconLeft="github"
                >
                  Repository
                </ButtonLink>
              )}
              <ButtonRoute to={ROUTES.contact} variant="ghost" size="lg" iconRight="arrow-right">
                Discuss this project
              </ButtonRoute>
            </div>
          </motion.div>

          {/* Cover */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="gradient-border relative mt-12 overflow-hidden rounded-3xl"
            style={{ '--tint': project.rgb } as React.CSSProperties}
          >
            <img
              src={project.cover.src}
              alt={`${project.title} cover art (placeholder)`}
              width={1600}
              height={900}
              className="aspect-[16/9] w-full object-cover"
            />
            {project.cover.isPlaceholder && (
              <PlaceholderNotice className="absolute right-4 top-4" label="Replace cover" />
            )}
          </motion.figure>

          {/* Metrics */}
          <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {project.metrics.map((metric) => (
              <Card key={metric.label} tint={project.rgb} className="p-4" spotlight>
                <dt className="text-[0.7rem] text-content-muted">{metric.label}</dt>
                <dd
                  className="mt-1 text-2xl font-semibold tracking-tight"
                  style={{ color: `rgb(${project.rgb})` }}
                >
                  {metric.value}
                  {metric.suffix ?? ''}
                </dd>
              </Card>
            ))}
          </dl>

          {/* Stack */}
          <div className="mt-8">
            <h2 className="eyebrow mb-3">Tech stack</h2>
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Tag className="gap-1.5 px-2.5 py-1.5 text-xs">
                    <TechIcon tech={tech} className="h-3.5 w-3.5" colored />
                    {tech}
                  </Tag>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Body + sticky contents */}
      <Section spacing="sm">
        <Container>
          <div className="grid min-w-0 gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-14">
            {/* Table of contents */}
            <aside className="hidden lg:block">
              <nav aria-label="Case study contents" className="sticky top-28">
                <h2 className="eyebrow mb-4">Contents</h2>
                <ul className="space-y-1 border-l border-border">
                  {caseStudy.sections.map((section) => (
                    <TocLink
                      key={section.id}
                      id={section.id}
                      label={section.title}
                      active={activeSection === section.id}
                    />
                  ))}
                  {caseStudy.endpoints?.length ? (
                    <TocLink
                      id="endpoints"
                      label="Endpoint reference"
                      active={activeSection === 'endpoints'}
                    />
                  ) : null}
                  {caseStudy.gallery.length > 0 && (
                    <TocLink id="gallery" label="Gallery" active={activeSection === 'gallery'} />
                  )}
                  <TocLink
                    id="lessons"
                    label="Lessons learned"
                    active={activeSection === 'lessons'}
                  />
                  <TocLink
                    id="future"
                    label="Future improvements"
                    active={activeSection === 'future'}
                  />
                </ul>

                <div className="mt-6 space-y-2 border-t border-border pt-5">
                  {project.links.repository && (
                    <ButtonLink
                      href={project.links.repository}
                      variant="subtle"
                      size="sm"
                      iconLeft="github"
                      fullWidth
                    >
                      Repository
                    </ButtonLink>
                  )}
                  {project.links.live && (
                    <ButtonLink
                      href={project.links.live}
                      variant="subtle"
                      size="sm"
                      iconLeft="globe"
                      fullWidth
                    >
                      Live site
                    </ButtonLink>
                  )}
                </div>
              </nav>
            </aside>

            {/* Article */}
            <article className="min-w-0 max-w-3xl">
              {caseStudy.sections.map((section) => (
                <Reveal
                  key={section.id}
                  as="section"
                  id={section.id}
                  className="scroll-mt-28 pb-14"
                >
                  <h2 className="flex items-center gap-3 text-2xl tracking-tight text-content-primary sm:text-3xl">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `rgb(${project.rgb} / 0.3)`,
                        backgroundColor: `rgb(${project.rgb} / 0.1)`,
                        color: `rgb(${project.rgb})`,
                      }}
                    >
                      <Icon name={section.icon} className="h-4 w-4" />
                    </span>
                    {section.title}
                  </h2>

                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        className="leading-[1.85] text-content-secondary"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-5 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet.slice(0, 24)} className="flex gap-3 text-content-secondary">
                          <Icon name="circle-dot" className="mt-1.5 h-3 w-3 shrink-0 text-accent" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.code && (
                    <figure className="mt-6">
                      <div className="overflow-hidden rounded-xl border border-border bg-background-alt/80">
                        <figcaption className="flex items-center gap-2 border-b border-border px-4 py-2.5 font-mono text-[0.7rem] text-content-muted">
                          <Icon name="terminal" className="h-3 w-3" />
                          {section.code.caption}
                        </figcaption>
                        <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-content-secondary sm:text-xs">
                          <code>{section.code.content}</code>
                        </pre>
                      </div>
                    </figure>
                  )}
                </Reveal>
              ))}

              {/* Endpoint reference */}
              {caseStudy.endpoints && caseStudy.endpoints.length > 0 && (
                <Reveal as="section" id="endpoints" className="scroll-mt-28 pb-14">
                  <h2 className="flex items-center gap-3 text-2xl tracking-tight text-content-primary sm:text-3xl">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `rgb(${project.rgb} / 0.3)`,
                        backgroundColor: `rgb(${project.rgb} / 0.1)`,
                        color: `rgb(${project.rgb})`,
                      }}
                    >
                      <Icon name="workflow" className="h-4 w-4" />
                    </span>
                    Endpoint reference
                  </h2>

                  <div className="mt-5 overflow-hidden rounded-xl border border-border">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[38rem] text-left text-sm">
                        <thead className="bg-background-alt/80 text-content-muted">
                          <tr>
                            <th
                              scope="col"
                              className="px-4 py-3 text-[0.7rem] font-medium uppercase tracking-wider"
                            >
                              Method
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-[0.7rem] font-medium uppercase tracking-wider"
                            >
                              Path
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-[0.7rem] font-medium uppercase tracking-wider"
                            >
                              Purpose
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-3 text-[0.7rem] font-medium uppercase tracking-wider"
                            >
                              Access
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {caseStudy.endpoints.map((endpoint) => (
                            <tr
                              key={`${endpoint.method}-${endpoint.path}`}
                              className="transition-colors hover:bg-surface/50"
                            >
                              <td className="px-4 py-3">
                                <span
                                  className={cn(
                                    'inline-flex rounded-md border px-2 py-0.5 font-mono text-[0.65rem] font-semibold',
                                    METHOD_TONE[endpoint.method]
                                  )}
                                >
                                  {endpoint.method}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-content-primary">
                                {endpoint.path}
                              </td>
                              <td className="px-4 py-3 text-xs leading-relaxed text-content-secondary">
                                {endpoint.purpose}
                              </td>
                              <td className="whitespace-nowrap px-4 py-3 text-xs text-content-muted">
                                {endpoint.auth}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Gallery */}
              {caseStudy.gallery.length > 0 && (
                <Reveal as="section" id="gallery" className="scroll-mt-28 pb-14">
                  <h2 className="flex items-center gap-3 text-2xl tracking-tight text-content-primary sm:text-3xl">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                      style={{
                        borderColor: `rgb(${project.rgb} / 0.3)`,
                        backgroundColor: `rgb(${project.rgb} / 0.1)`,
                        color: `rgb(${project.rgb})`,
                      }}
                    >
                      <Icon name="eye" className="h-4 w-4" />
                    </span>
                    Gallery
                  </h2>

                  <p className="mt-3 text-sm text-content-muted">
                    Screenshots are placeholders — drop real captures into{' '}
                    <code className="font-mono text-xs text-content-secondary">
                      public/images/projects/
                    </code>{' '}
                    and update the gallery entries in{' '}
                    <code className="font-mono text-xs text-content-secondary">
                      src/data/projects.ts
                    </code>
                    .
                  </p>

                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {caseStudy.gallery.map((item) => (
                      <li key={item.id}>
                        <figure className="overflow-hidden rounded-xl border border-border">
                          <div className="relative">
                            <img
                              src={item.src}
                              alt={item.caption}
                              loading="lazy"
                              decoding="async"
                              width={800}
                              height={450}
                              className="aspect-[16/9] w-full object-cover"
                            />
                            {item.isPlaceholder && (
                              <PlaceholderNotice className="absolute right-3 top-3" />
                            )}
                          </div>
                          <figcaption className="bg-background-alt/60 px-4 py-2.5 text-xs text-content-muted">
                            {item.caption}
                          </figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {/* Lessons */}
              <Reveal as="section" id="lessons" className="scroll-mt-28 pb-14">
                <h2 className="flex items-center gap-3 text-2xl tracking-tight text-content-primary sm:text-3xl">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `rgb(${project.rgb} / 0.3)`,
                      backgroundColor: `rgb(${project.rgb} / 0.1)`,
                      color: `rgb(${project.rgb})`,
                    }}
                  >
                    <Icon name="lightbulb" className="h-4 w-4" />
                  </span>
                  Lessons learned
                </h2>

                <ul className="mt-5 space-y-3">
                  {caseStudy.lessons.map((lesson) => (
                    <li key={lesson.slice(0, 24)}>
                      <Card className="p-4" spotlight tint={project.rgb}>
                        <p className="flex gap-3 text-sm leading-relaxed text-content-secondary">
                          <Icon
                            name="check-circle"
                            className="mt-0.5 h-4 w-4 shrink-0 text-secondary"
                          />
                          {lesson}
                        </p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Future */}
              <Reveal as="section" id="future" className="scroll-mt-28 pb-8">
                <h2 className="flex items-center gap-3 text-2xl tracking-tight text-content-primary sm:text-3xl">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border"
                    style={{
                      borderColor: `rgb(${project.rgb} / 0.3)`,
                      backgroundColor: `rgb(${project.rgb} / 0.1)`,
                      color: `rgb(${project.rgb})`,
                    }}
                  >
                    <Icon name="rocket" className="h-4 w-4" />
                  </span>
                  Future improvements
                </h2>

                <ul className="mt-5 space-y-3">
                  {caseStudy.futureScope.map((item) => (
                    <li key={item.slice(0, 24)} className="flex gap-3 text-content-secondary">
                      <Icon name="arrow-right" className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </article>
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Project navigation"
            className="mt-10 grid gap-4 border-t border-border pt-10 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                to={ROUTES.projectDetail(previous.slug)}
                className="group flex flex-col rounded-2xl border border-border p-5 transition-all duration-300 hover:border-accent/40 hover:bg-surface"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-content-muted">
                  <Icon
                    name="arrow-left"
                    className="h-3 w-3 transition-transform group-hover:-translate-x-0.5"
                  />
                  Previous
                </span>
                <span className="mt-2 font-medium text-content-primary transition-colors group-hover:text-accent">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                to={ROUTES.projectDetail(next.slug)}
                className="group flex flex-col items-end rounded-2xl border border-border p-5 text-right transition-all duration-300 hover:border-accent/40 hover:bg-surface sm:col-start-2"
              >
                <span className="inline-flex items-center gap-1.5 text-xs text-content-muted">
                  Next
                  <Icon
                    name="arrow-right"
                    className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="mt-2 font-medium text-content-primary transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>
        </Container>
      </Section>
    </PageTransition>
  )
}

/* -------------------------------------------------------------------------- */

function TocLink({ id, label, active }: { id: string; label: string; active: boolean }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => scrollToSection(id, 8)}
        aria-current={active ? 'true' : undefined}
        className={cn(
          '-ml-px block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-all duration-300',
          active
            ? 'border-accent font-medium text-content-primary'
            : 'border-transparent text-content-muted hover:text-content-secondary'
        )}
      >
        {label}
      </button>
    </li>
  )
}
