import type { NavItem } from '@/types/content'

/**
 * Home-page section ids. Used by the scroll-spy hook, the command palette and
 * the smooth-scroll helper — keep them in sync with the `id` on each <section>.
 */
export const SECTION_IDS = {
  hero: 'home',
  about: 'about',
  experience: 'experience',
  projects: 'projects',
  skills: 'skills',
  dashboard: 'dashboard',
  journey: 'journey',
  achievements: 'achievements',
  education: 'education',
  contact: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const ROUTES = {
  home: '/',
  projects: '/projects',
  projectDetail: (slug: string) => `/projects/${slug}`,
  dashboard: '/dashboard',
  contact: '/contact',
  resume: '/resume',
} as const

/** Primary navbar links. */
export const NAV_ITEMS: readonly NavItem[] = [
  {
    id: SECTION_IDS.hero,
    label: 'Home',
    href: `#${SECTION_IDS.hero}`,
    kind: 'section',
    icon: 'home',
  },
  {
    id: SECTION_IDS.about,
    label: 'About',
    href: `#${SECTION_IDS.about}`,
    kind: 'section',
    icon: 'compass',
  },
  {
    id: SECTION_IDS.experience,
    label: 'Experience',
    href: `#${SECTION_IDS.experience}`,
    kind: 'section',
    icon: 'briefcase',
  },
  {
    id: SECTION_IDS.projects,
    label: 'Projects',
    href: `#${SECTION_IDS.projects}`,
    kind: 'section',
    icon: 'folder-git',
  },
  {
    id: SECTION_IDS.skills,
    label: 'Skills',
    href: `#${SECTION_IDS.skills}`,
    kind: 'section',
    icon: 'layers',
  },
  {
    id: SECTION_IDS.achievements,
    label: 'Achievements',
    href: `#${SECTION_IDS.achievements}`,
    kind: 'section',
    icon: 'trophy',
  },
  {
    id: SECTION_IDS.education,
    label: 'Education',
    href: `#${SECTION_IDS.education}`,
    kind: 'section',
    icon: 'graduation',
  },
  { id: 'contact-page', label: 'Contact', href: ROUTES.contact, kind: 'route', icon: 'mail' },
] as const

/** Secondary links surfaced in the footer and command palette. */
export const SECONDARY_NAV: readonly NavItem[] = [
  {
    id: 'dashboard-page',
    label: 'Developer Dashboard',
    href: ROUTES.dashboard,
    kind: 'route',
    icon: 'dashboard',
  },
  {
    id: 'projects-page',
    label: 'All Projects',
    href: ROUTES.projects,
    kind: 'route',
    icon: 'folder-git',
  },
  { id: 'resume-page', label: 'Resume', href: ROUTES.resume, kind: 'route', icon: 'file-text' },
  {
    id: SECTION_IDS.journey,
    label: 'Build Journey',
    href: `#${SECTION_IDS.journey}`,
    kind: 'section',
    icon: 'milestone',
  },
] as const

/** Global keyboard shortcuts, documented inside the command palette footer. */
export const KEYBOARD_SHORTCUTS = [
  { keys: ['⌘', 'K'], alt: ['Ctrl', 'K'], description: 'Open command palette' },
  { keys: ['G', 'H'], description: 'Go home' },
  { keys: ['G', 'P'], description: 'Go to projects' },
  { keys: ['G', 'D'], description: 'Go to dashboard' },
  { keys: ['G', 'C'], description: 'Go to contact' },
  { keys: ['G', 'R'], description: 'Go to resume' },
  { keys: ['T'], description: 'Toggle theme' },
  { keys: ['Esc'], description: 'Close overlay' },
] as const
