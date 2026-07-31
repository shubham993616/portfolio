import type { JourneyMilestone } from '@/types/content'

/**
 * The scroll-animated build journey. Dates and facts follow the resume;
 * the final entry is forward-looking and clearly rendered as a goal.
 */
export const JOURNEY: readonly JourneyMilestone[] = [
  {
    id: 'class-10',
    year: '2021',
    title: 'Finished Class X',
    subtitle: '96.2%',
    description:
      'Wrapped up secondary school with 96.2% and started treating computer science as the thing I wanted to do rather than a subject I happened to like.',
    kind: 'education',
    icon: 'school',
    tags: ['Foundations'],
  },
  {
    id: 'class-12',
    year: '2023',
    title: 'Finished Class XII',
    subtitle: '92%',
    description:
      'Completed senior secondary education with 92% and moved straight into an engineering degree.',
    kind: 'education',
    icon: 'school',
    tags: ['Foundations'],
  },
  {
    id: 'btech-start',
    year: '2023',
    title: 'Started B.Tech at AKGEC',
    subtitle: 'Computer Science & Engineering (Data Science), AKTU',
    description:
      'Began a four-year degree at Ajay Kumar Garg Engineering College. The core subjects — DSA, OOP, DBMS, operating systems and computer networks — became the base everything since has been built on.',
    kind: 'education',
    icon: 'graduation',
    tags: ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
  },
  {
    id: 'java-backend',
    year: '2023 – 2025',
    title: 'Went deep on Java and backend engineering',
    subtitle: 'Java · Spring Boot · SQL · DSA',
    description:
      'Chose backend as the specialisation and built depth in Java, the Spring ecosystem and relational databases, while grinding data structures and algorithms alongside coursework.',
    kind: 'skill',
    icon: 'server',
    tags: ['Java', 'Spring Boot', 'MySQL', 'DSA'],
  },
  {
    id: 'ngo',
    year: 'April 2025',
    title: 'Joined Slum Swaraj Foundation',
    subtitle: 'Volunteer Educator',
    description:
      'Started teaching and mentoring underprivileged children in slum communities, running regular learning sessions that contribute to stronger educational outcomes.',
    kind: 'ngo',
    icon: 'heart',
    tags: ['Teaching', 'Mentoring', 'Community'],
  },
  {
    id: 'competitive',
    year: '2025 – 2026',
    title: 'Competitive programming',
    subtitle: '100+ LeetCode problems · 1185 on CodeChef',
    description:
      'Solved 100+ LeetCode problems across arrays, strings, trees, recursion and dynamic programming, and reached a 1185 rating on CodeChef through timed contests.',
    kind: 'skill',
    icon: 'flame',
    tags: ['LeetCode', 'CodeChef', 'Algorithms'],
  },
  {
    id: 'internship',
    year: 'June 2026',
    title: 'Full-stack internship at Vidyarthimitra',
    subtitle: 'Software Development Intern',
    description:
      'First production codebase. Resolved 30+ backend defects, rebuilt 20+ pages and wired them to server-side REST endpoints while supporting debugging, performance tuning and deployment cycles.',
    kind: 'internship',
    icon: 'briefcase',
    tags: ['REST APIs', 'Debugging', 'Git', 'Deployment'],
  },
  {
    id: 'banking',
    year: '2026',
    title: 'Built the Banking System',
    subtitle: 'Java 17 · Spring Boot 3 · Spring Security',
    description:
      'Architected a secure banking backend with OTP-verified auth, JWT sessions, BCrypt hashing, role-based access and 10+ REST APIs — plus 10+ unit tests with JUnit 5 and Mockito.',
    kind: 'project',
    icon: 'shield',
    tags: ['Spring Boot', 'JWT', 'MySQL', 'JUnit 5'],
  },
  {
    id: 'gate',
    year: '2026',
    title: 'Qualified GATE 2026',
    subtitle: 'Computer Science and Information Technology',
    description:
      'Cleared a national-level engineering examination in CS & IT, validating the core computer science fundamentals built up over the degree.',
    kind: 'exam',
    icon: 'trophy',
    tags: ['GATE', 'Computer Science'],
  },
  {
    id: 'neosix',
    year: 'July 2026',
    title: 'Co-founded Neosix Technologies',
    subtitle: 'Co-Founder, CPO & COO',
    description:
      'Co-founded a software solutions startup. I direct product strategy, feature planning and delivery operations for a 6–7 member team, and led the first client engagement end to end across five delivery stages.',
    kind: 'startup',
    icon: 'rocket',
    tags: ['Product strategy', 'Architecture', 'Delivery'],
  },
  {
    id: 'next',
    year: 'Next',
    title: 'Where this is heading',
    subtitle: 'Systems I own end to end',
    description:
      'Growing into a backend engineer who owns systems from design through on-call, scaling Neosix from a first engagement into a repeatable delivery practice, and continuing to push depth in algorithms and system design.',
    kind: 'goal',
    icon: 'target',
    tags: ['System design', 'Distributed systems', 'Scale'],
    isFuture: true,
  },
] as const
