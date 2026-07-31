# Shubham Modanwal — Developer Portfolio

A production-grade personal portfolio built with React 19, TypeScript (strict), Vite, Tailwind CSS
and Framer Motion. Deployed on Vercel.

Every piece of content lives in a typed data layer under `src/data`, so updating the site is a data
edit, not a coding task — and the TypeScript compiler rejects an incomplete entry before it ever
reaches the browser.

---

## Table of contents

- [Highlights](#highlights)
- [Quick start](#quick-start)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Folder structure](#folder-structure)
- [Deploying on Vercel](#deploying-on-vercel)
- [Customization guide](#customization-guide)
  - [Replacing my information](#replacing-my-information)
  - [Adding or editing a project](#adding-or-editing-a-project)
  - [Changing the theme](#changing-the-theme)
  - [Updating social links](#updating-social-links)
  - [Configuring Web3Forms](#configuring-web3forms)
  - [Replacing placeholder images](#replacing-placeholder-images)
  - [Adding a new page or section](#adding-a-new-page-or-section)
- [Developer dashboard: data sources & limitations](#developer-dashboard-data-sources--limitations)
- [Content review checklist](#content-review-checklist)
- [Architecture notes](#architecture-notes)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [SEO](#seo)
- [Troubleshooting](#troubleshooting)

---

## Highlights

| Area          | What is in here                                                                                          |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| Content model | Fully typed data layer — projects, experience, skills, education, achievements, journey                  |
| Routing       | React Router 7, route-level code splitting via `React.lazy`, animated page transitions                   |
| Case studies  | A dedicated page per project: problem, research, architecture, schema, API contract, challenges, lessons |
| Live data     | Developer dashboard reading the official GitHub API, with documented fallbacks per platform              |
| Interactions  | Command palette (`⌘K`), keyboard shortcuts, theme toggle, scroll-spy nav, toasts, tech filtering         |
| Contact       | React Hook Form + Web3Forms, full validation, honeypot spam trap, success/error toasts                   |
| SEO           | Per-route titles, canonical URLs, Open Graph, Twitter cards, JSON-LD, sitemap, robots                    |
| Quality       | Strict TypeScript, ESLint (incl. `jsx-a11y`), Prettier + Tailwind class sorting                          |

---

## Quick start

Requires **Node 18.18+** (Node 20 or 22 recommended).

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env

# 3. Start the dev server → http://localhost:5173
npm run dev
```

The site runs correctly with no `.env` file at all — every variable falls back to the value
documented in `.env.example`.

---

## Scripts

| Script                 | What it does                                      |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Vite dev server with HMR on port 5173             |
| `npm run build`        | Type-checks with `tsc -b`, then builds to `dist/` |
| `npm run preview`      | Serves the production build locally on port 4173  |
| `npm run typecheck`    | Type-check only, no emit                          |
| `npm run lint`         | ESLint across the whole project                   |
| `npm run lint:fix`     | ESLint with autofix                               |
| `npm run format`       | Prettier write (sorts Tailwind classes)           |
| `npm run format:check` | Prettier check, no writes — useful in CI          |

`npm run build` fails on any type error. That is deliberate: a broken type should never reach a
deploy.

---

## Environment variables

Copy `.env.example` to `.env` and fill it in. On Vercel, add the same keys under
**Project → Settings → Environment Variables**.

> **Vite only exposes variables prefixed with `VITE_` to the browser, and everything exposed ends up
> in the client bundle. Never put a real secret in this file.**

| Variable                    | Required | Default                                    | Purpose                                                     |
| --------------------------- | -------- | ------------------------------------------ | ----------------------------------------------------------- |
| `VITE_WEB3FORMS_ACCESS_KEY` | Yes      | the key shipped in `.env.example`          | Contact-form delivery. A public submission id, not a secret |
| `VITE_SITE_URL`             | Yes      | `https://shubhammodanwal.vercel.app`       | Canonical URLs, Open Graph, JSON-LD. **No trailing slash**  |
| `VITE_GITHUB_USERNAME`      | No       | `shubham993616`                            | Dashboard GitHub panel                                      |
| `VITE_GITHUB_TOKEN`         | No       | empty                                      | Raises the public API limit from 60 to 5,000 req/h          |
| `VITE_LEETCODE_USERNAME`    | No       | `imshubh4m`                                | LeetCode panel                                              |
| `VITE_LEETCODE_API_BASE`    | No       | `https://leetcode-stats-api.herokuapp.com` | Community LeetCode proxy — swap freely                      |
| `VITE_CODECHEF_USERNAME`    | No       | `imshubh4m`                                | CodeChef profile link                                       |

**About `VITE_GITHUB_TOKEN`:** anything in the client bundle is public. Only ever use a fine-grained
token with **zero scopes and no repository access** (it still raises the rate limit), or leave it
empty. The dashboard works fine unauthenticated.

---

## Folder structure

```
portfolio/
├── public/                       # Served as-is at the site root
│   ├── resume_shubham.pdf        # The downloadable resume
│   ├── favicon.svg
│   ├── og-image.png              # 1200×630 social preview
│   ├── robots.txt
│   ├── sitemap.xml               # Static — add a <url> when you add a route
│   ├── site.webmanifest
│   └── images/
│       ├── profile.svg           # PLACEHOLDER portrait
│       └── projects/             # PLACEHOLDER covers + gallery art
│
├── src/
│   ├── animations/               # Shared Framer Motion variants
│   ├── assets/                   # Bundled assets imported from code
│   ├── components/
│   │   ├── cards/                # Project, skill, experience, education, achievement cards
│   │   ├── command/              # ⌘K command palette
│   │   ├── dashboard/            # GitHub / LeetCode / CodeChef / LinkedIn panels
│   │   ├── forms/                # Contact form
│   │   ├── layout/               # Navbar, footer, background, overlays, app shell
│   │   ├── sections/             # Home-page sections
│   │   ├── seo/                  # <Seo /> per-route metadata
│   │   └── ui/                   # Design-system primitives (Button, Card, Badge, Toast…)
│   ├── constants/                # Site config, routes, nav items, shortcuts
│   ├── data/                     # ← ALL CONTENT LIVES HERE
│   ├── hooks/                    # Reusable hooks
│   ├── lib/                      # Pure helpers: cn, format, seo, icons, tech registry
│   ├── pages/                    # One file per route
│   ├── services/                 # Network I/O: github, leetcode, codechef, contact
│   ├── styles/globals.css        # Theme tokens, base styles, component classes
│   ├── types/                    # Shared TypeScript types
│   └── utils/                    # Scroll + validation helpers
│
├── .env.example                  # Documented environment template
├── eslint.config.js
├── tailwind.config.js
├── vercel.json                   # SPA rewrites + cache/security headers
└── vite.config.ts                # Aliases, manual vendor chunking
```

**The `@/` alias maps to `src/`.** Import as `@/components/ui/Button`, never `../../../`.

---

## Deploying on Vercel

1. Push the project to GitHub.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repository.
3. Vercel auto-detects Vite. `vercel.json` already pins the settings, so you can accept the defaults:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add your environment variables under **Settings → Environment Variables** (at minimum
   `VITE_SITE_URL` and `VITE_WEB3FORMS_ACCESS_KEY`).
5. **Deploy.**

`vercel.json` also sets:

- A catch-all rewrite to `/index.html` — without it, refreshing `/projects/banking-system` returns a
  404 because the server has no such file. This is the single most common SPA deployment bug.
- Immutable one-year caching on `/assets/*` (safe — filenames are content-hashed).
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and `Permissions-Policy` headers.

### After you attach a custom domain

Update the host in **four** places:

1. `VITE_SITE_URL` in the Vercel environment variables
2. `public/robots.txt` — the `Sitemap:` line
3. `public/sitemap.xml` — every `<loc>`
4. `index.html` — the static `canonical`, `og:url` and `og:image` tags (these are the fallback that
   crawlers which do not run JavaScript will read)

---

## Customization guide

### Replacing my information

Everything is in `src/data/`. Nothing below requires touching a component.

| What                                   | File                          |
| -------------------------------------- | ----------------------------- |
| Name, headline, about, philosophy      | `src/data/profile.ts`         |
| GitHub / LinkedIn / LeetCode / …       | `src/data/socials.ts`         |
| Jobs, internships, volunteering        | `src/data/experience.ts`      |
| Degrees, scores, coursework            | `src/data/education.ts`       |
| Skill categories and chips             | `src/data/skills.ts`          |
| Projects and their case studies        | `src/data/projects.ts`        |
| Achievements + hero stat strip         | `src/data/achievements.ts`    |
| Scroll-animated build journey          | `src/data/journey.ts`         |
| Site title, description, feature flags | `src/constants/site.ts`       |
| Nav links, routes, keyboard shortcuts  | `src/constants/navigation.ts` |

Icons are referenced by name (`icon: 'server'`). The full list of valid names is the `ICONS` object
in `src/lib/icons.ts` — TypeScript autocompletes them and rejects a typo. To add one, import it from
`lucide-react` and add a line to that object.

### Adding or editing a project

Append an object to the `PROJECTS` array in `src/data/projects.ts`. TypeScript enforces the shape,
so a missing field is a compile error rather than a blank space on the page.

```ts
{
  slug: 'my-new-project',            // becomes /projects/my-new-project
  title: 'My New Project',
  subtitle: 'One-line positioning',
  year: '2026',
  kind: 'system',                    // 'product' | 'system' | 'website'
  featured: true,                    // featured projects surface first
  tagline: 'The hook for the case-study hero.',
  summary: 'Two sentences for the card.',
  role: 'What you personally owned',
  timeline: '2026',
  status: 'Shipped',                 // 'Shipped' | 'In production' | 'Actively maintained'
  technologies: ['Java 17', 'Spring Boot 3'],
  stackTags: ['Java', 'Spring Boot'],// these become filter chips
  highlights: ['…'],
  metrics: [{ label: 'REST APIs', value: '10', suffix: '+' }],
  cover: { src: '/images/projects/my-cover.png', isPlaceholder: false },
  links: { live: 'https://…', repository: 'https://github.com/…' },
  rgb: '0 212 170',                  // accent colour, space-separated RGB
  caseStudy: {
    sections: [{ id: 'problem', title: 'The problem', icon: 'target', body: ['…'] }],
    endpoints: [/* optional API table */],
    gallery: [/* optional screenshots */],
    lessons: ['…'],
    futureScope: ['…'],
  },
}
```

Then add a `<url>` entry to `public/sitemap.xml`.

A case-study section supports three optional extras:

- `bullets` — a list rendered under the prose
- `code` — a monospace block (schema, folder tree, request flow) with a caption
- `endpoints` — a formatted API reference table on the case-study page

### Changing the theme

All colours are CSS custom properties in `src/styles/globals.css`, stored as space-separated RGB
channels so Tailwind's opacity modifiers (`bg-surface/60`) keep working.

```css
:root,
[data-theme='dark'] {
  --color-background: 11 15 23; /* #0B0F17 */
  --color-surface: 20 27 45; /* #141B2D */
  --color-accent: 79 140 255; /* #4F8CFF */
  --color-secondary: 0 212 170; /* #00D4AA */
  /* … */
}
```

Change a channel triple and the entire site follows — cards, glows, gradients, borders, the particle
field and the favicon-adjacent theme colour. The `[data-theme='light']` block below it does the same
for light mode.

**Dark is the default for every first-time visitor** regardless of OS preference; light mode is
opt-in through the toggle and persists in `localStorage`. If you would rather follow the OS setting,
change the two matching places: the inline bootstrap script in `index.html` and `readInitialTheme()`
in `src/hooks/useTheme.ts`. They must agree, or the page visibly flips on first paint.

Fonts: Inter (UI) and JetBrains Mono (code) are self-hosted via `@fontsource-variable`, imported at
the top of `globals.css`. Swap the packages and the `fontFamily` entries in `tailwind.config.js`.

### Updating social links

Edit `src/data/socials.ts`. `showInHero: true` puts a link in the hero, the footer, the contact page
and the ContactCTA. `rgb` sets its hover glow.

### Configuring Web3Forms

1. Go to [web3forms.com](https://web3forms.com/#start), enter the email address that should receive
   submissions, and copy the access key it emails you.
2. Put it in `.env` as `VITE_WEB3FORMS_ACCESS_KEY`, and in Vercel's environment variables.
3. Send yourself a test message from `/contact`.

The submission payload is built in `src/services/contact.ts` — edit that file to change the subject
line or add fields. The form already includes a honeypot field (`botcheck`): bots fill it, humans
never see it, and a submission with it populated is silently discarded without hitting the network.

### Replacing placeholder images

Generated placeholder art ships with the project and is clearly badged in the UI so it cannot go
live by accident.

| Placeholder                                   | Replace with                        | Then update                                                                                               |
| --------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `public/images/profile.svg`                   | A square headshot, 800×800+         | `avatarPath` in `src/data/profile.ts`; delete `<PlaceholderNotice>` in `src/components/sections/Hero.tsx` |
| `public/images/projects/*-cover.svg`          | A 1600×900 screenshot               | `cover.src` and set `cover.isPlaceholder: false`                                                          |
| `public/images/projects/placeholder-wide.svg` | Real gallery screenshots            | The `gallery` entries; set `isPlaceholder: false`                                                         |
| `public/og-image.png`                         | Optional — regenerate if rebranding | `SITE.ogImage` in `src/constants/site.ts`                                                                 |

Setting `isPlaceholder: false` removes the amber "Placeholder" badge.

### Adding a new page or section

**New route:** create `src/pages/MyPage.tsx` with a default export, add a lazy import and a `<Route>`
in `src/App.tsx`, add the path to `ROUTES` in `src/constants/navigation.ts`, and add a `<url>` to
`public/sitemap.xml`.

**New home-page section:** create it under `src/components/sections/`, add an id to `SECTION_IDS`
(this wires up the scroll-spy and the command palette automatically), and render it in
`src/pages/HomePage.tsx`.

---

## Developer dashboard: data sources & limitations

The dashboard is honest about where every number comes from. Each widget renders through one async
envelope (`useRemoteData`) that guarantees data is never null after the first settle — a failed
fetch shows resume-verified figures with a quiet "Resume-verified" badge instead of an error state.

| Platform     | Status             | Detail                                                                                                                                                                                                                                                       |
| ------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **GitHub**   | Live, official API | Profile, repos, stars, forks, language mix. The activity grid comes from the **public events feed**, which retains ~90 days — GitHub publishes no API for the lifetime contribution graph, so the card says "recent public activity", not an all-time total. |
| **LeetCode** | Community proxy    | No official public API exists. Read through a community proxy over LeetCode's internal GraphQL endpoint. Configurable via `VITE_LEETCODE_API_BASE`. Falls back to the resume figure (100+ solved) when unavailable.                                          |
| **CodeChef** | Resume-verified    | No public API, and profile pages are not CORS-readable from a browser. Any "CodeChef API" is a scraper that breaks when the markup changes. Shows the resume-verified rating (1185) and links to live standings.                                             |
| **LinkedIn** | Resume-verified    | The profile API is partner-gated and scraping breaches their terms. The card renders the same verified experience data used across the site.                                                                                                                 |

**Want live CodeChef/LinkedIn data?** Stand up a serverless function (a Vercel Function works well)
that fetches and parses server-side, then point a new fetcher at it. The UI needs no changes — swap
the constant in `src/services/codechef.ts` for a fetch and pass it to `useRemoteData`.

**Rate limits:** unauthenticated GitHub allows 60 requests/hour per IP. The dashboard makes 3 per
load and refreshes every 5 minutes only while the tab is visible. If you hit the limit the panel
degrades to fallback figures rather than breaking.

---

## Content review checklist

Read this once before your first deploy.

- [ ] **Case-study prose.** Every hard fact in `src/data/projects.ts` (stack, counts, features,
      repository URLs) comes straight from the resume. The narrative sections — Problem, Research,
      Planning, Challenges, Lessons, Future Scope — expand those bullets into the engineering story a
      reviewer expects. Read them end to end and adjust the wording so they sound like you. **Delete
      anything you would not be comfortable defending in an interview.**
- [ ] **The API endpoint table** on the Banking System case study is a representative contract
      derived from the six core operations named in the resume. Align the paths with your actual
      controller mappings.
- [ ] **The third project** (`developer-portfolio`) is this website. Remove that entry from
      `PROJECTS` if you would rather not feature it.
- [ ] **The `about` paragraphs and `philosophy`** in `src/data/profile.ts` are written around your
      resume facts. Make the voice yours.
- [ ] **Placeholder art** — see the table above. Nothing ships to production with an amber badge.
- [ ] **`VITE_SITE_URL`** matches your real deployment before the first crawl.

---

## Architecture notes

A few decisions worth knowing about if you plan to extend this.

**Content is data, not JSX.** `src/data` holds plain typed objects with no React imports. Components
read from it. This is why adding a project never means editing a component, and why the compiler can
catch an incomplete entry.

**Icons are referenced by name.** `src/lib/icons.ts` maps string keys to Lucide components with
`satisfies Record<string, LucideIcon>`, and `IconName` is derived from that object. You get
autocomplete and compile-time validation without the data layer importing React.

**Three-layer separation in `services/`.** Network I/O, response validation and fallback constants
live together per platform, so the components never see a raw API shape.

**`motion.create()` is cached.** Calling it inside a render body creates a new component type every
render, which remounts the element and can leave scroll-reveal sections stuck at `opacity: 0`.
`src/components/ui/Reveal.tsx` caches by tag. If you write a component that takes a polymorphic `as`
prop and animates, do the same.

**Framer Motion owns `transform`.** Any element animating `x`, `y`, `scale` or `rotate` gets an
inline `transform`, which silently overrides Tailwind classes like `-translate-x-1/2` or
`scale-[1.06]`. Where both are needed, positioning goes on a plain wrapper and the animation on an
inner element — see the hero's orbiting tech marks and the journey timeline nodes.

**Grid tracks use `minmax(0, …)`.** A grid item's automatic minimum size is its min-content width, so
one long unbreakable string (an email address) can widen a whole column and create a horizontal
scrollbar on mobile. Every custom grid template in this project pins the minimum to `0`.

---

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `section` with `aria-labelledby`)
- A "Skip to main content" link as the first tab stop
- Visible focus rings on every interactive element (`:focus-visible`, so mouse users are unaffected)
- The command palette is a proper `combobox` + `listbox` with `aria-activedescendant`
- Modals trap focus, restore it on close, and respond to `Escape`
- Form fields have real `<label>`s, `aria-invalid` and `aria-describedby` error wiring
- Toasts announce through a polite live region
- Decorative visuals (particles, blooms, cursor glow) are `aria-hidden` and `pointer-events-none`
- `prefers-reduced-motion` is respected: CSS animations collapse, the particle field and cursor glow
  do not mount, the typing effect renders static text, and counters jump to their final value
- `eslint-plugin-jsx-a11y` runs on every lint

## Performance

- Route-level code splitting; the dashboard is split out of the home bundle
- Vendor chunks split by package so app updates do not invalidate the React/Motion cache
- Self-hosted variable fonts with `unicode-range` subsetting — non-Latin subsets are never fetched
- Below-the-fold images use `loading="lazy"` and `decoding="async"`; the hero portrait is eager
- Scroll, pointer and resize handlers are throttled to `requestAnimationFrame`
- The particle canvas pauses when the tab is hidden; dashboard polling only runs while visible
- Explicit `width`/`height` on images to avoid layout shift

**Bundle budget:** Framer Motion is ~45 kB gzipped and, because the hero animates immediately, it
sits on the critical path. If you want it smaller, migrate to `LazyMotion` + `domAnimation` and the
`m.*` components — roughly a 30 kB saving at the cost of touching every animated element.

## SEO

- Per-route `<title>`, description, canonical URL, Open Graph and Twitter Card tags
- JSON-LD structured data: `Person` on the home page, `SoftwareSourceCode` + `BreadcrumbList` on
  case studies, `BreadcrumbList` elsewhere
- `robots.txt` and `sitemap.xml` in `public/`
- The 404 route is marked `noindex, nofollow`
- Static fallback tags in `index.html` for crawlers that do not execute JavaScript

Metadata is applied imperatively by `src/lib/seo.ts` (no helmet dependency). If you later need
server-rendered metadata for crawlers that ignore client-side updates, migrating this project to
Next.js or adding `vite-plugin-ssr` is the path.

---

## Troubleshooting

**A route 404s after refresh in production.** The host is not rewriting unknown paths to
`index.html`. On Vercel this is handled by `vercel.json`; on Netlify add a `_redirects` file with
`/*  /index.html  200`.

**The contact form returns an error.** Check `VITE_WEB3FORMS_ACCESS_KEY` is set in the _deployment_
environment (not just locally) and that the key is active in your Web3Forms dashboard.

**The GitHub panel shows "Resume-verified".** You have most likely hit the 60 req/h unauthenticated
rate limit. Wait an hour, or add a zero-scope `VITE_GITHUB_TOKEN`.

**The build fails on a type error.** That is the intended behaviour. Run `npm run typecheck` for the
full list — it is usually a missing required field on a new entry in `src/data`.

**Tailwind classes are not applying.** Tailwind only scans the paths in `content` in
`tailwind.config.js`. Class names must appear as complete literal strings — `` `text-${color}-500` ``
is invisible to the scanner. Use a lookup object with full class names instead.

---

Built by Shubham Modanwal · [GitHub](https://github.com/shubham993616) ·
[LinkedIn](https://www.linkedin.com/in/shubham-modanwal)
