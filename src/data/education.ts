import type { EducationEntry } from '@/types/content'

/**
 * Institutions, periods and scores are taken verbatim from the resume.
 * `coursework` lists the Core Concepts named in the resume's skills section.
 */
export const EDUCATION: readonly EducationEntry[] = [
  {
    id: 'akgec',
    institution: 'Ajay Kumar Garg Engineering College, AKTU',
    qualification: 'B.Tech in Computer Science and Engineering',
    field: 'Data Science',
    period: '2023 – 2027',
    location: 'Ghaziabad, India',
    icon: 'graduation',
    score: { label: 'CGPA', value: '8.3' },
    coursework: [
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
      'Software Development Life Cycle',
    ],
  },
  {
    id: 'class-12',
    institution: 'Senior Secondary Education (Class XII)',
    qualification: 'Higher Secondary Certificate',
    period: '2023',
    location: 'Uttar Pradesh, India',
    icon: 'school',
    score: { label: 'Percentage', value: '92%' },
    coursework: [],
  },
  {
    id: 'class-10',
    institution: 'Secondary School Education (Class X)',
    qualification: 'Secondary School Certificate',
    period: '2021',
    location: 'Uttar Pradesh, India',
    icon: 'school',
    score: { label: 'Percentage', value: '96.2%' },
    coursework: [],
  },
] as const
