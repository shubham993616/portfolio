import type { SkillCategory } from '@/types/content'

/**
 * Mirrors the "Technical Skills" section of the resume, one category per line
 * of that section. `tech` keys map into `src/lib/tech.ts` for brand marks.
 */
export const SKILL_CATEGORIES: readonly SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    description: 'What I reach for depending on the problem in front of me.',
    icon: 'braces',
    rgb: '79 140 255',
    skills: [
      { name: 'Java', tech: 'java', note: 'Primary language' },
      { name: 'Python', tech: 'python' },
      { name: 'SQL', tech: 'sql' },
      { name: 'JavaScript', tech: 'javascript' },
      { name: 'TypeScript', tech: 'typescript' },
      { name: 'HTML', tech: 'html' },
      { name: 'CSS', tech: 'css' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'Where most of my engineering time goes.',
    icon: 'server',
    rgb: '0 212 170',
    skills: [
      { name: 'Spring Boot', tech: 'springboot' },
      { name: 'Spring Security', tech: 'springsecurity' },
      { name: 'Spring Data JPA', tech: 'spring' },
      { name: 'Hibernate', tech: 'hibernate' },
      { name: 'REST APIs', tech: 'rest' },
      { name: 'JWT Authentication', tech: 'jwt' },
      { name: 'BCrypt', tech: 'bcrypt' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Enough front-end to ship a product without waiting on anyone.',
    icon: 'layers',
    rgb: '129 140 248',
    skills: [
      { name: 'React', tech: 'react' },
      { name: 'Tailwind CSS', tech: 'tailwind' },
      { name: 'Vite', tech: 'vite' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    description: 'Relational by default, document stores when the shape fits.',
    icon: 'database',
    rgb: '245 158 11',
    skills: [
      { name: 'MySQL', tech: 'mysql' },
      { name: 'MongoDB', tech: 'mongodb' },
      { name: 'H2', tech: 'h2' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Testing',
    description: 'The day-to-day toolchain around writing and verifying code.',
    icon: 'wrench',
    rgb: '236 72 153',
    skills: [
      { name: 'Git', tech: 'git' },
      { name: 'GitHub', tech: 'github' },
      { name: 'Maven', tech: 'maven' },
      { name: 'Postman', tech: 'postman' },
      { name: 'JUnit 5', tech: 'junit' },
      { name: 'Mockito', tech: 'mockito' },
      { name: 'IntelliJ IDEA', tech: 'intellij' },
      { name: 'VS Code', tech: 'vscode' },
    ],
  },
  {
    id: 'core-cs',
    label: 'Core CS',
    description: 'The fundamentals everything else is built on.',
    icon: 'cpu',
    rgb: '52 211 153',
    skills: [
      { name: 'Data Structures & Algorithms', tech: 'dsa' },
      { name: 'Object-Oriented Programming', tech: 'oop' },
      { name: 'Database Management Systems', tech: 'dbms' },
      { name: 'Operating Systems', tech: 'os' },
      { name: 'Computer Networks', tech: 'networks' },
      { name: 'Software Development Life Cycle', tech: 'sdlc' },
    ],
  },
] as const

/** Flat list used by the command palette and the projects tech filter. */
export const ALL_SKILL_NAMES = SKILL_CATEGORIES.flatMap((category) =>
  category.skills.map((skill) => skill.name)
)
