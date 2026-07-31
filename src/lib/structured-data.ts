import { SITE } from '@/constants/site'
import { EDUCATION } from '@/data/education'
import { EXPERIENCE } from '@/data/experience'
import { PROFILE } from '@/data/profile'
import { SOCIALS } from '@/data/socials'
import type { Project } from '@/types/content'

/** schema.org Person — the primary entity for a personal portfolio. */
export const personSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFILE.name,
  url: SITE.url,
  image: `${SITE.url}${PROFILE.avatarPath}`,
  email: `mailto:${PROFILE.email}`,
  telephone: PROFILE.phone,
  jobTitle: PROFILE.role,
  description: PROFILE.summary,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ghaziabad',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  alumniOf: EDUCATION.map((entry) => ({
    '@type': 'EducationalOrganization',
    name: entry.institution,
  })),
  worksFor: EXPERIENCE.filter((entry) => entry.current).map((entry) => ({
    '@type': 'Organization',
    name: entry.company,
    ...(entry.website ? { url: entry.website } : {}),
  })),
  knowsAbout: [
    'Java',
    'Spring Boot',
    'Spring Security',
    'REST API design',
    'MySQL',
    'Data Structures and Algorithms',
    'React',
    'TypeScript',
  ],
  sameAs: SOCIALS.filter((social) => social.id !== 'email' && social.id !== 'phone').map(
    (social) => social.href
  ),
})

export const websiteSchema = (): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en',
  author: { '@type': 'Person', name: PROFILE.name, url: SITE.url },
})

export const projectSchema = (project: Project): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: project.title,
  description: project.summary,
  url: `${SITE.url}/projects/${project.slug}`,
  ...(project.links.repository ? { codeRepository: project.links.repository } : {}),
  programmingLanguage: project.technologies,
  author: { '@type': 'Person', name: PROFILE.name, url: SITE.url },
  dateCreated: project.year,
})

export const breadcrumbSchema = (
  crumbs: readonly { name: string; path: string }[]
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: `${SITE.url}${crumb.path === '/' ? '' : crumb.path}`,
  })),
})
