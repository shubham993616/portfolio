import type { ExperienceEntry } from '@/types/content'

/**
 * Roles, companies, periods and bullet points are taken verbatim from the
 * resume. `technologies` are drawn from the resume's skills and projects
 * sections for the matching role.
 */
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'neosix',
    company: 'Neosix Technologies',
    role: 'Co-Founder, Chief Product Officer (CPO) & Chief Operating Officer (COO)',
    kind: 'startup',
    period: 'July 2026 – Present',
    location: 'Remote',
    current: true,
    summary:
      'Co-founded a software solutions startup and direct product strategy, feature planning, and delivery operations for a 6–7 member team.',
    responsibilities: [
      'Direct product strategy, feature planning, and delivery operations for a 6–7 member team.',
      'Translate business needs into technical specifications, system architecture, and prioritized development roadmaps.',
      'Lead the first client engagement end to end across 5 delivery stages: scoping, task allocation, timelines, quality assurance, and release.',
    ],
    achievements: [
      'Took the company’s first client engagement from scoping through release.',
      'Established the delivery process — scoping, task allocation, timelines, QA, release — the team now runs on.',
    ],
    technologies: ['Java', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST APIs'],
    website: 'https://neosix.in',
    icon: 'rocket',
  },
  {
    id: 'vidyarthimitra',
    company: 'Vidyarthimitra.org',
    role: 'Software Development Intern – Full-Stack',
    kind: 'internship',
    period: 'June 2026 – Present',
    location: 'Remote',
    current: true,
    summary:
      'Full-stack intern working across production web applications — fixing backend defects, rebuilding front-end pages, and wiring them to server-side REST endpoints.',
    responsibilities: [
      'Resolved 30+ backend defects and shipped new features across production web applications.',
      'Rebuilt 20+ pages with HTML, CSS, and JavaScript and wired the interfaces to server-side REST endpoints.',
      'Supported debugging, performance tuning, and deployment cycles while collaborating with developers through Git and GitHub.',
    ],
    achievements: [
      '30+ backend defects resolved in a live production codebase.',
      '20+ pages rebuilt and connected to server-side REST endpoints.',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'REST APIs', 'Git', 'GitHub'],
    website: 'https://vidyarthimitra.org',
    icon: 'briefcase',
  },
  {
    id: 'slum-swaraj',
    company: 'Slum Swaraj Foundation (NGO)',
    role: 'Volunteer Educator',
    kind: 'volunteer',
    period: 'April 2025 – Present',
    location: 'Uttar Pradesh, India',
    current: true,
    summary:
      'Teach and mentor underprivileged children living in slum communities through regular learning sessions.',
    responsibilities: [
      'Teach and mentor underprivileged children living in slum communities.',
      'Conduct regular learning sessions that contribute to stronger educational outcomes.',
    ],
    achievements: [
      'Sustained a regular teaching cadence alongside a full-time engineering degree since April 2025.',
    ],
    technologies: ['Mentoring', 'Curriculum planning', 'Community outreach'],
    icon: 'heart',
  },
] as const
