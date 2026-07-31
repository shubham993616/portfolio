import type { Profile } from '@/types/content'

/**
 * Facts here are taken verbatim from `public/resume_shubham.pdf`.
 * Narrative copy (about paragraphs, philosophy, goals) is written around those
 * facts — review and edit the voice to match your own before publishing.
 */
export const PROFILE: Profile = {
  name: 'Shubham Modanwal',
  shortName: 'Shubham',
  initials: 'SM',
  role: 'Software Engineer',
  headline: 'I build secure backend systems and ship them end to end.',
  taglines: [
    'Backend Engineer',
    'Java & Spring Boot Developer',
    'Co-Founder & CPO at Neosix',
    'Full-Stack Engineer',
    'GATE 2026 Qualified',
  ],
  summary:
    'Computer Science undergraduate specialising in backend engineering with Java and Spring Boot. Co-Founder and Chief Product Officer at Neosix Technologies, full-stack development intern at Vidyarthimitra, and a volunteer educator since 2025.',
  location: 'Ghaziabad, Uttar Pradesh, India',
  email: 'shubham.modanw@gmail.com',
  phone: '+91-9115370316',
  phoneHref: 'tel:+919115370316',
  availability: 'Open to SDE internships & full-time roles',
  resumePath: '/resume_shubham.pdf',
  resumeFileName: 'Shubham-Modanwal-Resume.pdf',
  // PLACEHOLDER — replace public/images/profile.svg with your own photo.
  // See README > Customization Guide > Replacing placeholder images.
  avatarPath: '/images/profile.jpg',
  about: [
    'I am a Computer Science and Engineering (Data Science) undergraduate at Ajay Kumar Garg Engineering College, and most of my engineering time goes into the layer users never see — the schema, the service boundary, the auth flow, the error contract.',
    'That focus started with coursework and turned practical fast. At Vidyarthimitra I joined a live production codebase, resolved 30+ backend defects, rebuilt 20+ pages and wired them to server-side REST endpoints. Debugging somebody else’s running system teaches you things no tutorial does.',
    'In July 2026 I co-founded Neosix Technologies, where I own product strategy and delivery operations for a 6–7 person team. I translate business requirements into technical specifications and system architecture, then lead client engagements through scoping, allocation, timelines, QA and release.',
    'Alongside that I have been a volunteer educator with Slum Swaraj Foundation since April 2025, teaching underprivileged children. It keeps me honest about what clear explanation actually requires — which turns out to be the same skill as good API design.',
  ],
  philosophy: [
    {
      title: 'Security is a design decision',
      body: 'Authentication, ownership validation and password hashing belong in the architecture from day one, not in a hardening sprint after launch.',
      icon: 'shield',
    },
    {
      title: 'Layers earn their keep',
      body: 'A controller that only translates HTTP, a service that only holds business rules, a repository that only talks to the database. Boring boundaries make change cheap.',
      icon: 'layers',
    },
    {
      title: 'Tests are the spec',
      body: 'Unit tests written with JUnit 5 and Mockito document what a service is actually promising far better than a comment ever will.',
      icon: 'test-tube',
    },
    {
      title: 'Ship, then sharpen',
      body: 'Working software in a user’s hands beats a perfect design in a document. Get the contract right, release, then tune the queries.',
      icon: 'rocket',
    },
  ],
  interests: [
    'Distributed systems',
    'API design',
    'Database internals',
    'Competitive programming',
    'Product strategy',
    'Teaching & mentoring',
  ],
  goals: [
    'Grow into a backend engineer who owns systems end to end — design, delivery and the on-call pager.',
    'Scale Neosix Technologies from first client engagement into a repeatable delivery practice.',
    'Keep pushing depth in DSA and system design, building on GATE 2026.',
  ],
}
