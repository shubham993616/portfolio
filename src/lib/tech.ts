import type { ComponentType } from 'react'
import {
  SiApachemaven,
  SiCss,
  SiGit,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJsonwebtokens,
  SiJunit5,
  SiMongodb,
  SiMysql,
  SiOpenjdk,
  SiPostman,
  SiPython,
  SiReact,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import {
  Binary,
  Boxes,
  Cpu,
  Database,
  HardDrive,
  KeyRound,
  Network,
  Share2,
  TestTube2,
  Workflow,
} from 'lucide-react'

/** Anything that renders as an inline SVG and accepts a className. */
export type TechIconComponent = ComponentType<{ className?: string }>

export interface TechMeta {
  readonly label: string
  readonly Icon: TechIconComponent
  /** Brand colour as an `r g b` triplet — drives the hover glow. */
  readonly rgb: string
}

/**
 * Brand marks and fallback glyphs for every technology named in the resume.
 * Keys are referenced from `src/data/skills.ts` and resolved via `getTech()`.
 */
export const TECH: Record<string, TechMeta> = {
  java: { label: 'Java', Icon: SiOpenjdk, rgb: '244 106 62' },
  python: { label: 'Python', Icon: SiPython, rgb: '55 118 171' },
  sql: { label: 'SQL', Icon: Database, rgb: '79 140 255' },
  javascript: { label: 'JavaScript', Icon: SiJavascript, rgb: '247 223 30' },
  typescript: { label: 'TypeScript', Icon: SiTypescript, rgb: '49 120 198' },
  html: { label: 'HTML', Icon: SiHtml5, rgb: '227 79 38' },
  css: { label: 'CSS', Icon: SiCss, rgb: '102 51 153' },

  springboot: { label: 'Spring Boot', Icon: SiSpringboot, rgb: '109 179 63' },
  springsecurity: { label: 'Spring Security', Icon: SiSpringsecurity, rgb: '109 179 63' },
  spring: { label: 'Spring Data JPA', Icon: SiSpring, rgb: '109 179 63' },
  hibernate: { label: 'Hibernate', Icon: SiHibernate, rgb: '169 139 92' },
  rest: { label: 'REST APIs', Icon: Workflow, rgb: '0 212 170' },
  jwt: { label: 'JWT', Icon: SiJsonwebtokens, rgb: '217 70 239' },
  bcrypt: { label: 'BCrypt', Icon: KeyRound, rgb: '148 163 184' },

  react: { label: 'React', Icon: SiReact, rgb: '97 218 251' },
  tailwind: { label: 'Tailwind CSS', Icon: SiTailwindcss, rgb: '56 189 248' },
  vite: { label: 'Vite', Icon: SiVite, rgb: '188 52 254' },
  vercel: { label: 'Vercel', Icon: SiVercel, rgb: '226 232 240' },

  mysql: { label: 'MySQL', Icon: SiMysql, rgb: '0 117 143' },
  mongodb: { label: 'MongoDB', Icon: SiMongodb, rgb: '71 162 72' },
  h2: { label: 'H2', Icon: HardDrive, rgb: '245 158 11' },

  git: { label: 'Git', Icon: SiGit, rgb: '240 80 51' },
  github: { label: 'GitHub', Icon: SiGithub, rgb: '203 213 225' },
  maven: { label: 'Maven', Icon: SiApachemaven, rgb: '198 33 39' },
  postman: { label: 'Postman', Icon: SiPostman, rgb: '255 108 55' },
  junit: { label: 'JUnit 5', Icon: SiJunit5, rgb: '37 164 168' },
  mockito: { label: 'Mockito', Icon: TestTube2, rgb: '129 140 248' },
  intellij: { label: 'IntelliJ IDEA', Icon: SiIntellijidea, rgb: '250 68 87' },
  vscode: { label: 'VS Code', Icon: VscVscode, rgb: '0 122 204' },

  dsa: { label: 'Data Structures & Algorithms', Icon: Binary, rgb: '52 211 153' },
  oop: { label: 'Object-Oriented Programming', Icon: Boxes, rgb: '52 211 153' },
  dbms: { label: 'Database Management Systems', Icon: Database, rgb: '52 211 153' },
  os: { label: 'Operating Systems', Icon: Cpu, rgb: '52 211 153' },
  networks: { label: 'Computer Networks', Icon: Network, rgb: '52 211 153' },
  sdlc: { label: 'Software Development Life Cycle', Icon: Share2, rgb: '52 211 153' },
}

export const getTech = (key: string | undefined): TechMeta | undefined =>
  key ? TECH[key] : undefined

/**
 * Resolve a human-readable technology name (as it appears in project data)
 * back to a registry entry, so project chips can render brand marks too.
 */
const NAME_LOOKUP: Record<string, string> = Object.entries(TECH).reduce<Record<string, string>>(
  (acc, [key, meta]) => {
    acc[meta.label.toLowerCase()] = key
    acc[key.toLowerCase()] = key
    return acc
  },
  {
    'java 17': 'java',
    'spring boot 3': 'springboot',
    'react 19': 'react',
    'spring data jpa': 'spring',
    'junit 5': 'junit',
    'framer motion': 'react',
    'react router': 'react',
  }
)

export const getTechByName = (name: string): TechMeta | undefined => {
  const key = NAME_LOOKUP[name.toLowerCase()]
  return key ? TECH[key] : undefined
}
