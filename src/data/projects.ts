import type { Project } from '@/types/content'

/* =============================================================================
 * CONTENT REVIEW NOTE
 * -----------------------------------------------------------------------------
 * Every hard fact below — stack, counts, roles, endpoints-per-project, feature
 * lists, repository URLs — comes straight from the resume.
 *
 * The case-study prose (Problem / Research / Planning / Challenges / Lessons /
 * Future Scope) expands those bullets into the engineering narrative a reviewer
 * expects to read. It is written to be true to the resume, but it is YOUR
 * story: read it once end to end and adjust the wording so it sounds like you.
 * Anything you are not comfortable defending in an interview, delete.
 *
 * Cover art and gallery images are generated placeholders. Swap the files in
 * `public/images/projects/` — see README > Replacing placeholder images.
 * ===========================================================================*/

export const PROJECTS: readonly Project[] = [
  /* ------------------------------------------------------------------------ */
  /*  Banking System                                                          */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'banking-system',
    title: 'Banking System',
    subtitle: 'Secure transactional banking backend',
    year: '2026',
    kind: 'system',
    featured: true,
    tagline:
      'A Spring Boot banking backend where every rupee that moves is authenticated, authorised, owned and audited.',
    summary:
      'A secure banking application built on Java 17 and Spring Boot 3 with a clean controller–service–repository split. OTP-verified auth, JWT sessions, BCrypt hashing and role-based access guard 10+ REST APIs across six core money operations.',
    role: 'Sole engineer — architecture, implementation and tests',
    timeline: '2026',
    status: 'Shipped',
    technologies: [
      'Java 17',
      'Spring Boot 3',
      'Spring Security',
      'JWT',
      'Spring Data JPA',
      'MySQL',
      'H2',
      'JUnit 5',
      'Mockito',
      'Maven',
    ],
    stackTags: ['Java', 'Spring Boot', 'Spring Security', 'MySQL', 'JWT', 'JUnit 5'],
    highlights: [
      'Three-layer architecture — controller, service, repository — with no business logic above or below the service tier.',
      'OTP-verified registration and login, JWT session management and BCrypt password hashing.',
      'Role-based access control across two roles (USER, ADMIN) plus per-request ownership validation.',
      '10+ REST APIs covering account creation, deposits, withdrawals, transfers, transaction history and admin actions.',
      'Global exception handling that turns every failure into a structured, predictable response body.',
      '10+ unit tests written with JUnit 5 and Mockito against the service layer.',
    ],
    metrics: [
      { label: 'REST APIs', value: '10', suffix: '+' },
      { label: 'Core operations', value: '6' },
      { label: 'Unit tests', value: '10', suffix: '+' },
      { label: 'Access roles', value: '2' },
    ],
    cover: { src: '/images/projects/banking-system-cover.svg', isPlaceholder: false },
    links: {
      repository: 'https://github.com/shubham993616/Banking_System',
    },
    rgb: '0 212 170',
    caseStudy: {
      sections: [
        {
          id: 'problem',
          title: 'The problem',
          icon: 'target',
          body: [
            'Most tutorial banking projects are CRUD apps wearing a suit. They store a balance, add to it, subtract from it, and quietly assume the caller is honest. The interesting part of banking software is not the arithmetic — it is everything that has to be true before the arithmetic is allowed to happen.',
            'I set out to build a banking backend where that ordering is explicit: prove who you are, prove the account is yours, prove the operation is legal, and only then move money. Every design decision in this project rolls up to that single sentence.',
          ],
          bullets: [
            'A balance change must never be reachable without an authenticated, authorised caller.',
            'A user must never be able to read or modify an account they do not own — even with a valid token.',
            'Every failure mode must produce a predictable response shape, never a raw stack trace.',
            'Business rules must be testable without booting a web server or a database.',
          ],
        },
        {
          id: 'research',
          title: 'Research & constraints',
          icon: 'search',
          body: [
            'Before writing code I worked through what a minimally credible security posture looks like in the Spring ecosystem, and where the standard tutorials cut corners. Three findings shaped the build.',
            'First, passwords: storing anything reversible is indefensible, so BCrypt hashing was non-negotiable. Second, sessions: server-side session state is simple but couples the API to a single instance, so stateless JWT was the better fit for a REST backend. Third — and this is the one most projects skip — authentication answers "who are you", not "is this yours". Ownership is a separate check that has to live in the service layer, because only the service knows what "owning" means for a given operation.',
          ],
          bullets: [
            'Spring Security with a stateless filter chain — no server-side session store to scale or invalidate.',
            'BCrypt for password hashing, chosen for its work factor rather than raw speed.',
            'An OTP step on registration and login so a leaked password alone is not enough to get in.',
            'H2 in-memory for fast local runs and tests; MySQL for the persistent environment.',
          ],
        },
        {
          id: 'planning',
          title: 'Planning & scope',
          icon: 'list-checks',
          body: [
            'I fixed the surface area up front at six core operations and refused to grow it mid-build. Scope creep in a security-sensitive project is how gaps appear: every new endpoint is another place to forget an ownership check.',
            'Those six operations expanded into 10+ REST endpoints once auth, registration, OTP verification and admin actions were included. Each endpoint was specified as a contract — method, path, request shape, response shape, failure modes, required role — before any implementation started.',
          ],
          bullets: [
            'Account creation',
            'Deposits',
            'Withdrawals',
            'Transfers between accounts',
            'Transaction history',
            'Admin actions',
          ],
        },
        {
          id: 'architecture',
          title: 'Architecture',
          icon: 'network',
          body: [
            'The application is a strict three-layer stack. Controllers translate HTTP and nothing else — parse, validate shape, delegate, serialise. Services hold every business rule, including all authorisation and ownership logic. Repositories, backed by Spring Data JPA, do persistence and nothing else.',
            'The payoff shows up in the tests. Because no business rule lives in a controller and no rule leaks into a repository, the entire behaviour of the system can be unit-tested by instantiating a service with mocked repositories. No web server, no database, no fixtures.',
          ],
          code: {
            caption: 'Request path through the layers',
            content: `HTTP request
   │
   ▼
┌──────────────────────────────────────────────┐
│  Spring Security filter chain                │
│  • JWT extracted, signature + expiry checked │
│  • Authentication placed in SecurityContext  │
└──────────────────────────────────────────────┘
   │
   ▼
┌──────────────────────────────────────────────┐
│  Controller layer                            │
│  • Bean-validated request DTO                │
│  • No business logic. Ever.                  │
└──────────────────────────────────────────────┘
   │
   ▼
┌──────────────────────────────────────────────┐
│  Service layer                               │
│  • Role check (USER / ADMIN)                 │
│  • Ownership validation                      │
│  • Balance + transfer rules, @Transactional  │
└──────────────────────────────────────────────┘
   │
   ▼
┌──────────────────────────────────────────────┐
│  Repository layer (Spring Data JPA)          │
│  • Persistence only                          │
└──────────────────────────────────────────────┘
   │
   ▼
   MySQL  (H2 in-memory for local runs + tests)

Any thrown exception unwinds into @RestControllerAdvice,
which renders one consistent error body for every failure.`,
          },
        },
        {
          id: 'database',
          title: 'Data model',
          icon: 'database',
          body: [
            'The schema is deliberately small: users, the accounts they own, and an append-only record of every transaction. Relationships are mapped with Spring Data JPA over Hibernate, with MySQL in the persistent environment and H2 in memory for tests.',
            'The important property is that transaction history is derived, never authored. A balance is the consequence of the transaction log, not a field somebody remembered to update — which means history and balance cannot silently disagree.',
          ],
          code: {
            caption: 'Core entities and relationships',
            content: `USER
  id            PK
  email         unique
  password      BCrypt hash — never plaintext
  role          USER | ADMIN
  otp_verified  boolean

     │ 1
     │
     │ N
ACCOUNT
  id            PK
  user_id       FK → USER.id      ← the ownership edge
  account_no    unique
  balance       decimal
  created_at

     │ 1
     │
     │ N
TRANSACTION
  id            PK
  account_id    FK → ACCOUNT.id
  type          DEPOSIT | WITHDRAWAL | TRANSFER
  amount        decimal
  timestamp
  counterparty  nullable — set on transfers

Every ownership check walks exactly one edge:
  authenticated user id  ==  ACCOUNT.user_id`,
          },
        },
        {
          id: 'api',
          title: 'API design',
          icon: 'workflow',
          body: [
            'Endpoints are grouped by resource and named for the operation, not the implementation. Requests and responses are DTOs — entities never cross the HTTP boundary, so a schema change cannot accidentally become an API change.',
            'Success and failure both have a fixed shape. A client integrating against this API can write one error handler and trust it, because a validation failure, an ownership violation and an insufficient-balance error all arrive with the same envelope and differ only in code and message.',
          ],
        },
        {
          id: 'auth',
          title: 'Authentication & authorization',
          icon: 'key',
          body: [
            'Registration and login both run through an OTP verification step, so possession of a password is not by itself sufficient to obtain a session. Once verified, the user receives a signed JWT which is presented on every subsequent request and validated by the Spring Security filter chain before a controller is ever reached.',
            "Authorisation then happens twice, at two different granularities. Role-based access control separates USER from ADMIN at the endpoint level — admin actions are simply unreachable for a normal user. Ownership validation runs inside the service layer for every account-scoped operation, comparing the authenticated principal against the account's owner. A valid token for user A is worthless against user B's account.",
          ],
          bullets: [
            'OTP-verified registration and login.',
            'Stateless JWT sessions — signature and expiry checked per request.',
            'BCrypt password hashing with no reversible storage anywhere in the system.',
            'Two roles, USER and ADMIN, enforced at the endpoint boundary.',
            'Ownership validation in the service layer for every account-scoped operation.',
          ],
        },
        {
          id: 'testing',
          title: 'Testing & error handling',
          icon: 'test-tube',
          body: [
            '10+ unit tests written with JUnit 5 and Mockito cover the service layer, where all the rules live. Repositories are mocked, so a test asserts business behaviour — "a withdrawal larger than the balance is rejected", "a transfer between two accounts moves exactly one amount" — rather than asserting that Hibernate works.',
            'Error handling is centralised in a global exception handler. Domain exceptions carry their own meaning; the handler is the single place that decides how meaning becomes an HTTP status and a response body. Adding a new failure mode is one exception class and one mapping, not a scattered set of try/catch blocks.',
          ],
        },
        {
          id: 'challenges',
          title: 'Challenges',
          icon: 'bug',
          body: ['Three problems took real thought rather than real typing.'],
          bullets: [
            'Ownership vs. authentication. Early on, a valid JWT was treated as sufficient authorisation. It is not. Separating "authenticated" from "authorised for this specific row" meant threading the principal into the service layer and making ownership an explicit, testable precondition on every account-scoped call.',
            'Transfers as one unit of work. A transfer is two balance mutations and two ledger rows. Half a transfer is worse than no transfer, so the operation is transactional — it commits completely or not at all.',
            'Consistent errors without leaking internals. The first version returned whatever the exception happened to say, occasionally including implementation detail. Moving to a global handler with explicit domain exceptions fixed both the inconsistency and the leak.',
            'Testing security-adjacent logic. Mockito made it possible to assert that an ownership violation throws before a repository is ever touched — the mock recording zero interactions is itself the assertion.',
          ],
        },
      ],
      endpoints: [
        {
          method: 'POST',
          path: '/api/auth/register',
          purpose: 'Create an account and trigger OTP verification',
          auth: 'Public',
        },
        {
          method: 'POST',
          path: '/api/auth/verify-otp',
          purpose: 'Confirm the one-time password and activate the user',
          auth: 'Public',
        },
        {
          method: 'POST',
          path: '/api/auth/login',
          purpose: 'Authenticate and issue a signed JWT',
          auth: 'Public',
        },
        {
          method: 'POST',
          path: '/api/accounts',
          purpose: 'Open a new account for the authenticated user',
          auth: 'USER',
        },
        {
          method: 'GET',
          path: '/api/accounts/{id}',
          purpose: 'Fetch account details',
          auth: 'USER · ownership checked',
        },
        {
          method: 'POST',
          path: '/api/accounts/{id}/deposit',
          purpose: 'Credit the account',
          auth: 'USER · ownership checked',
        },
        {
          method: 'POST',
          path: '/api/accounts/{id}/withdraw',
          purpose: 'Debit the account after a balance check',
          auth: 'USER · ownership checked',
        },
        {
          method: 'POST',
          path: '/api/accounts/{id}/transfer',
          purpose: 'Move funds between accounts in one transaction',
          auth: 'USER · ownership checked',
        },
        {
          method: 'GET',
          path: '/api/accounts/{id}/transactions',
          purpose: 'Return the append-only transaction history',
          auth: 'USER · ownership checked',
        },
        {
          method: 'GET',
          path: '/api/admin/users',
          purpose: 'List users for administrative review',
          auth: 'ADMIN',
        },
        {
          method: 'GET',
          path: '/api/admin/accounts',
          purpose: 'List every account across the system',
          auth: 'ADMIN',
        },
      ],
      gallery: [
        {
          id: 'banking-architecture',
          caption: 'PLACEHOLDER — layer diagram / architecture screenshot',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
        {
          id: 'banking-postman',
          caption: 'PLACEHOLDER — Postman collection running the six core operations',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
        {
          id: 'banking-tests',
          caption: 'PLACEHOLDER — JUnit 5 + Mockito suite passing',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
      ],
      lessons: [
        'Authentication and authorisation are different questions. Answering the first does not answer the second, and conflating them is how data leaks between users.',
        'A strict layer boundary is not architectural ceremony — it is what makes the business rules unit-testable in isolation.',
        'Centralised exception handling is worth writing on day one. Retrofitting consistent error contracts across a grown codebase costs far more.',
        'An append-only ledger with a derived balance removes an entire category of "the history and the number disagree" bugs.',
      ],
      futureScope: [
        'Idempotency keys on money-moving endpoints so a retried request cannot double-charge.',
        'Integration tests over an ephemeral MySQL instance to complement the service-layer unit tests.',
        'Refresh-token rotation and server-side revocation for compromised sessions.',
        'Structured audit logging on every admin action, queryable independently of the transaction ledger.',
        'Rate limiting on the OTP and login endpoints to blunt brute-force attempts.',
      ],
    },
  },

  /* ------------------------------------------------------------------------ */
  /*  Neosix.in                                                               */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'neosix-platform',
    title: 'Neosix.in',
    subtitle: 'Software solutions platform',
    year: '2026',
    kind: 'product',
    featured: true,
    tagline:
      'The full product surface of a software services company — 10 pages, 15+ endpoints, one engineer on the backend.',
    summary:
      'The platform behind Neosix Technologies. I engineered the complete Java and MySQL backend independently and paired it with a responsive React, TypeScript and Tailwind interface spanning 10 pages, backed by 15+ RESTful endpoints.',
    role: 'Backend owner + front-end engineer',
    timeline: '2026',
    status: 'In production',
    technologies: ['Java', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'REST APIs'],
    stackTags: ['Java', 'MySQL', 'React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    highlights: [
      'Engineered the complete Java and MySQL backend independently.',
      'Built a responsive React, TypeScript and Tailwind CSS interface across 10 pages.',
      'Designed 15+ RESTful endpoints with a relational schema, authentication and input validation.',
      'Returned structured error responses so the client can handle failure predictably.',
      'Tuned database queries and packaged reusable service layers to support ongoing feature rollout.',
    ],
    metrics: [
      { label: 'REST endpoints', value: '15', suffix: '+' },
      { label: 'Pages shipped', value: '10' },
      { label: 'Backend engineers', value: '1' },
      { label: 'Status', value: 'Live' },
    ],
    cover: { src: '/images/projects/neosix-cover.svg', isPlaceholder: false },
    links: {
      live: 'https://www.neosix.in/',
      repository: 'https://github.com/technologiesneosix/neo1',
    },
    rgb: '79 140 255',
    caseStudy: {
      sections: [
        {
          id: 'problem',
          title: 'The problem',
          icon: 'target',
          body: [
            'Neosix Technologies needed a public platform that did two jobs at once: present the company credibly to prospective clients, and act as the working software surface behind that presentation. A brochure site would have covered the first and none of the second.',
            "As co-founder I also had a constraint most side projects do not: this is the company's own front door. It had to be defensible under real traffic, maintainable by a 6–7 person team I would be handing parts of it to, and structured so features could keep shipping after launch rather than requiring a rewrite.",
          ],
        },
        {
          id: 'research',
          title: 'Research & constraints',
          icon: 'search',
          body: [
            'The decisive constraint was headcount: I was the only engineer on the backend. That ruled out any architecture whose correctness depended on several people holding a shared mental model, and it argued strongly for boring, well-documented technology over anything novel.',
            'Java and MySQL were the right call for the same reason — they are what the team already knows, which means the code stays reviewable and extendable by people other than me. On the client, React with TypeScript and Vite gave fast iteration and, critically, a compiler that catches the class of mistakes a solo developer makes at 1am.',
          ],
          bullets: [
            'One engineer on the backend — the architecture had to be legible without a handover meeting.',
            'The interface had to hold up across ten distinct pages on phone, tablet and desktop.',
            'The API needed a contract stable enough that front-end work could proceed in parallel.',
            'The service layer had to be reusable, because feature rollout was continuing after launch.',
          ],
        },
        {
          id: 'planning',
          title: 'Planning',
          icon: 'list-checks',
          body: [
            'I specified the API before building either side. Fifteen-plus endpoints were mapped against the ten pages first, so every screen had a known data source and no endpoint existed without a caller.',
            'Working API-first meant the relational schema, the authentication approach, the validation rules and the error envelope were all decided while they were still cheap to change — on paper rather than in a migration.',
          ],
        },
        {
          id: 'architecture',
          title: 'Architecture',
          icon: 'network',
          body: [
            'A Java backend over MySQL exposes a REST API that a Vite-built React client consumes. The split is clean: the server owns data, authentication and every business rule; the client owns presentation and interaction and holds no authoritative state.',
            'Inside the backend, logic lives in reusable service layers rather than being written inline per endpoint. That was a deliberate bet on the future — when the next feature needs the same rule, it calls the existing service instead of copying it, which is what keeps a small team from accumulating three subtly different versions of the same behaviour.',
          ],
          code: {
            caption: 'System shape',
            content: `┌────────────────────────────────────────────┐
│  Client — React + TypeScript + Vite        │
│  Tailwind CSS · responsive across 10 pages │
│  No authoritative state; renders API data  │
└────────────────────────────────────────────┘
                  │  HTTPS / JSON
                  ▼
┌────────────────────────────────────────────┐
│  REST API — 15+ endpoints                  │
│  • Authentication                          │
│  • Input validation on every write         │
│  • Structured error responses              │
└────────────────────────────────────────────┘
                  │
                  ▼
┌────────────────────────────────────────────┐
│  Reusable service layer (Java)             │
│  Business rules live here, once            │
└────────────────────────────────────────────┘
                  │
                  ▼
┌────────────────────────────────────────────┐
│  MySQL — relational schema, tuned queries  │
└────────────────────────────────────────────┘`,
          },
        },
        {
          id: 'database',
          title: 'Database',
          icon: 'database',
          body: [
            'The schema is relational and normalised, designed alongside the endpoint list rather than after it. Because both were specified together, every table exists to serve a known query — there are no speculative columns.',
            'Once real usage began I profiled the read paths and tuned the queries behind the heaviest pages. Query tuning is unglamorous and it is also the difference between a site that feels instant and one that feels like a form from 2009.',
          ],
        },
        {
          id: 'api',
          title: 'API design',
          icon: 'workflow',
          body: [
            '15+ RESTful endpoints follow one convention: resource-oriented paths, HTTP verbs used for what they mean, and validation applied at the boundary before anything reaches the service layer.',
            'Errors are structured rather than free-text. Every failure returns the same envelope, so the React client handles them in one place instead of pattern-matching on strings — which also means adding an endpoint does not mean adding error-handling code on the front end.',
          ],
        },
        {
          id: 'frontend',
          title: 'Interface',
          icon: 'layers',
          body: [
            'Ten pages built with React, TypeScript and Tailwind CSS, responsive from small phones up to wide desktops. TypeScript covers the API boundary, so a change to a response shape surfaces as a compile error rather than as a blank section in production.',
            'Tailwind kept the visual language consistent across all ten pages without a growing pile of bespoke CSS — spacing, type scale and colour come from one system, and a new page inherits it by default.',
          ],
        },
        {
          id: 'challenges',
          title: 'Challenges',
          icon: 'bug',
          body: [
            'Owning both sides of a production system alone surfaces a specific set of problems.',
          ],
          bullets: [
            'Being the only backend engineer. There was no second reviewer, so the discipline had to be structural: specify the endpoint contract first, validate everything at the boundary, and keep rules in services where they can be reasoned about in one place.',
            'Keeping ten pages coherent. Consistency across ten screens is a systems problem, not a design-taste problem. Tailwind plus shared components meant page ten looked like page one without anyone policing it.',
            'Performance under real reads. Some pages were noticeably slow once real data arrived. Profiling and tuning the underlying queries fixed it at the source rather than papering over it with client-side caching.',
            'Building for handover. Features kept shipping after launch, so the service layer had to be reusable by teammates I had not yet onboarded. Writing for the next reader is a constraint that changes how you name things.',
          ],
        },
      ],
      gallery: [
        {
          id: 'neosix-home',
          caption: 'PLACEHOLDER — landing page',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
        {
          id: 'neosix-responsive',
          caption: 'PLACEHOLDER — responsive layouts across breakpoints',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
        {
          id: 'neosix-api',
          caption: 'PLACEHOLDER — API surface / schema overview',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
      ],
      lessons: [
        'Specifying the API before either side is built removes the most expensive kind of rework: discovering at integration time that the contract was wrong.',
        'Reusable service layers are how a small team avoids three divergent implementations of the same business rule.',
        'Query tuning belongs in the build, not in a later performance sprint — the slow page is the one users judge you on.',
        'Owning backend and front-end at once makes the value of a typed boundary obvious, because you personally feel every mismatch.',
      ],
      futureScope: [
        'Publish an OpenAPI specification and generate the TypeScript client from it.',
        'Add caching in front of the read-heavy public pages.',
        'Automated end-to-end coverage of the critical journeys across all ten pages.',
        'Structured request logging and error tracking to shorten diagnosis time in production.',
        'A CI pipeline that runs typecheck, lint and tests on every pull request before the team grows further.',
      ],
    },
  },

  /* ------------------------------------------------------------------------ */
  /*  This portfolio — remove this entry if you would rather not feature it.   */
  /* ------------------------------------------------------------------------ */
  {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio',
    subtitle: 'This website',
    year: '2026',
    kind: 'website',
    featured: false,
    tagline: 'The site you are reading — typed end to end, with a live developer dashboard.',
    summary:
      'A production React 19, TypeScript and Tailwind portfolio with route-level code splitting, a command palette, per-project case studies and a dashboard that pulls live GitHub statistics with resume-verified fallbacks.',
    role: 'Design and engineering',
    timeline: '2026',
    status: 'Actively maintained',
    technologies: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'Vercel',
    ],
    stackTags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    highlights: [
      'Strict TypeScript across the whole codebase — no implicit any, no unused symbols.',
      'Route-level code splitting with React.lazy so the first paint ships only what it needs.',
      'A live developer dashboard over the official GitHub API with graceful fallbacks.',
      'Command palette, theme toggle, scroll-spy navigation and full keyboard navigation.',
      'SEO handled properly: canonical URLs, Open Graph, Twitter cards and JSON-LD structured data.',
    ],
    metrics: [
      { label: 'Routes', value: '7' },
      { label: 'TypeScript', value: '100', suffix: '%' },
      { label: 'Runtime deps', value: '11' },
    ],
    cover: { src: '/images/projects/portfolio-cover.svg', isPlaceholder: false },
    links: {
      live: 'https://shubhammodanwal.vercel.app',
    },
    rgb: '129 140 248',
    caseStudy: {
      sections: [
        {
          id: 'problem',
          title: 'The problem',
          icon: 'target',
          body: [
            'A recruiter gives a portfolio somewhere between thirty and ninety seconds. In that window the site has to answer three questions: what does this person build, is it real, and can they write code I would merge.',
            'Template portfolios answer the first and fail the other two. So this one is built the way I would build a product: typed boundaries, a real content model, modular components, and engineering write-ups substantial enough to survive a follow-up question.',
          ],
        },
        {
          id: 'architecture',
          title: 'Architecture',
          icon: 'network',
          body: [
            'Content lives in a typed data layer under `src/data`, entirely separate from presentation. Adding a project means adding one object to an array — no JSX is touched — and the compiler rejects it if a required field is missing.',
            "Routes are lazily loaded so the home page ships without the case studies, contact form or dashboard in its bundle. Vendor code is split into stable chunks that survive redeploys in a returning visitor's cache.",
          ],
        },
        {
          id: 'dashboard',
          title: 'Live data',
          icon: 'activity',
          body: [
            'The developer dashboard reads from the official GitHub REST API at runtime — profile, repositories, stars, forks and a language breakdown computed from the repository list.',
            'LeetCode and CodeChef publish no official API. LeetCode is read through a community proxy; CodeChef falls back to resume-verified figures. Every widget renders from the same async envelope carrying a `source` flag, so when a fetch fails the panel shows verified numbers with a quiet "verified" badge instead of an error.',
          ],
        },
      ],
      gallery: [
        {
          id: 'portfolio-hero',
          caption: 'PLACEHOLDER — hero section',
          src: '/images/projects/placeholder-wide.svg',
          isPlaceholder: false,
        },
      ],
      lessons: [
        'Separating content from presentation turns "update my portfolio" from a coding task into a data edit.',
        'A fallback path is a feature. A dashboard that degrades quietly is strictly better than one that shows a recruiter an error state.',
      ],
      futureScope: [
        'A view-transition powered route animation once browser support is broad enough.',
        'MDX-authored case studies so long-form writing does not live in TypeScript string literals.',
        'Real analytics behind the resume-download counter placeholder.',
      ],
    },
  },
] as const

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured)

export const getProjectBySlug = (slug: string): Project | undefined =>
  PROJECTS.find((project) => project.slug === slug)

/** Unique, sorted stack chips powering the projects filter. */
export const PROJECT_STACK_FILTERS: readonly string[] = Array.from(
  new Set(PROJECTS.flatMap((project) => project.stackTags))
).sort((a, b) => a.localeCompare(b))
