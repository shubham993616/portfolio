import type { Achievement } from '@/types/content'

/** Every figure here appears verbatim in the resume's Achievements section. */
export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: 'gate-2026',
    title: 'GATE 2026 Qualified',
    issuer: 'Computer Science and Information Technology',
    description:
      'Qualified the Graduate Aptitude Test in Engineering 2026 in Computer Science and Information Technology, a national-level engineering examination.',
    icon: 'trophy',
    rgb: '245 158 11',
    badge: 'National level',
    stat: { value: 2026, label: 'GATE CS & IT', separator: '' },
  },
  {
    id: 'leetcode-100',
    title: '100+ Problems Solved',
    issuer: 'LeetCode',
    description:
      'Solved 100+ problems spanning arrays, strings, trees, recursion and dynamic programming.',
    icon: 'code',
    rgb: '255 161 22',
    badge: 'DSA',
    stat: { value: 100, suffix: '+', label: 'Problems solved' },
    href: 'https://leetcode.com/u/imshubh4m',
  },
  {
    id: 'codechef-1185',
    title: '1185 Rating',
    issuer: 'CodeChef',
    description:
      'Achieved a 1185 rating through regular participation in timed competitive programming contests.',
    icon: 'terminal',
    rgb: '158 111 60',
    badge: 'Competitive programming',
    stat: { value: 1185, label: 'Contest rating', separator: '' },
    href: 'https://www.codechef.com/users/imshubh4m',
  },
  {
    id: 'cgpa',
    title: '8.3 CGPA',
    issuer: 'Ajay Kumar Garg Engineering College, AKTU',
    description:
      'B.Tech in Computer Science and Engineering (Data Science), maintained alongside an internship, a startup role and weekly volunteer teaching.',
    icon: 'graduation',
    rgb: '79 140 255',
    badge: 'Academics',
    stat: { value: 8.3, decimals: 1, label: 'CGPA · 2023–2027' },
  },
] as const

/** Compact stat strip shown under the hero. */
export const HERO_STATS: readonly {
  label: string
  value: number
  suffix?: string
  decimals?: number
}[] = [
  { label: 'Backend defects resolved', value: 30, suffix: '+' },
  { label: 'REST endpoints designed', value: 25, suffix: '+' },
  { label: 'LeetCode problems solved', value: 100, suffix: '+' },
  { label: 'CGPA', value: 8.3, decimals: 1 },
] as const
