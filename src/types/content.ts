import type { IconName } from '@/lib/icons'

/* -------------------------------------------------------------------------- */
/*  Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

export interface ExternalLinkRef {
  readonly label: string
  readonly href: string
  /** Rendered next to the label. */
  readonly icon?: IconName
}

/* -------------------------------------------------------------------------- */
/*  Profile                                                                    */
/* -------------------------------------------------------------------------- */

export interface Profile {
  readonly name: string
  readonly shortName: string
  readonly initials: string
  /** Formal role used in JSON-LD and the document title. */
  readonly role: string
  /** Punchy one-liner for the hero. */
  readonly headline: string
  /** Rotating strings for the hero typing animation. */
  readonly taglines: readonly string[]
  readonly summary: string
  readonly location: string
  readonly email: string
  readonly phone: string
  /** `tel:` formatted phone number. */
  readonly phoneHref: string
  readonly availability: string
  readonly resumePath: string
  readonly resumeFileName: string
  readonly avatarPath: string
  readonly about: readonly string[]
  readonly philosophy: readonly {
    readonly title: string
    readonly body: string
    readonly icon: IconName
  }[]
  readonly interests: readonly string[]
  readonly goals: readonly string[]
}

/* -------------------------------------------------------------------------- */
/*  Socials                                                                    */
/* -------------------------------------------------------------------------- */

export type SocialPlatform = 'github' | 'linkedin' | 'leetcode' | 'codechef' | 'email' | 'phone'

export interface SocialLink {
  readonly id: SocialPlatform
  readonly label: string
  /** Username or handle shown under the label. */
  readonly handle: string
  readonly href: string
  /** Lucide icon name; brand marks fall back to this when unavailable. */
  readonly icon: IconName
  /** Brand accent used for hover glow, as an `r g b` triplet. */
  readonly rgb: string
  readonly showInHero: boolean
}

/* -------------------------------------------------------------------------- */
/*  Education                                                                  */
/* -------------------------------------------------------------------------- */

export interface EducationEntry {
  readonly id: string
  readonly institution: string
  readonly qualification: string
  readonly field?: string
  readonly period: string
  readonly location: string
  readonly icon: IconName
  /** e.g. `{ label: 'CGPA', value: '8.3' }` */
  readonly score: { readonly label: string; readonly value: string }
  readonly coursework: readonly string[]
}

/* -------------------------------------------------------------------------- */
/*  Experience                                                                 */
/* -------------------------------------------------------------------------- */

export type ExperienceKind = 'startup' | 'internship' | 'volunteer'

export interface ExperienceEntry {
  readonly id: string
  readonly company: string
  readonly role: string
  readonly kind: ExperienceKind
  readonly period: string
  readonly location: string
  readonly current: boolean
  readonly summary: string
  readonly responsibilities: readonly string[]
  readonly achievements: readonly string[]
  readonly technologies: readonly string[]
  readonly website?: string
  readonly icon: IconName
}

/* -------------------------------------------------------------------------- */
/*  Skills                                                                     */
/* -------------------------------------------------------------------------- */

export type SkillCategoryId =
  'languages' | 'backend' | 'frontend' | 'databases' | 'tools' | 'core-cs'

export interface Skill {
  readonly name: string
  /** Key into the tech registry (`src/lib/tech.ts`). Falls back to a glyph. */
  readonly tech?: string
  readonly note?: string
}

export interface SkillCategory {
  readonly id: SkillCategoryId
  readonly label: string
  readonly description: string
  readonly icon: IconName
  /** `r g b` triplet driving the card's glow. */
  readonly rgb: string
  readonly skills: readonly Skill[]
}

/* -------------------------------------------------------------------------- */
/*  Projects & case studies                                                    */
/* -------------------------------------------------------------------------- */

export interface CaseStudySection {
  readonly id: string
  readonly title: string
  readonly icon: IconName
  /** Paragraphs of prose. */
  readonly body: readonly string[]
  /** Optional bulleted detail rendered under the prose. */
  readonly bullets?: readonly string[]
  /** Optional monospace block — schema, endpoint table, folder tree, flow. */
  readonly code?: { readonly caption: string; readonly content: string }
}

export interface ApiEndpoint {
  readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  readonly path: string
  readonly purpose: string
  readonly auth: string
}

export interface GalleryItem {
  readonly id: string
  readonly caption: string
  /** Placeholder art ships with the project; swap for a real screenshot. */
  readonly src: string
  readonly isPlaceholder: boolean
}

export interface Project {
  readonly slug: string
  readonly title: string
  readonly subtitle: string
  readonly year: string
  readonly kind: 'product' | 'system' | 'website'
  /** Shown on the card; ~2 sentences. */
  readonly summary: string
  /** One-line hook used in the case study hero. */
  readonly tagline: string
  readonly role: string
  readonly timeline: string
  readonly status: 'Shipped' | 'In production' | 'Actively maintained'
  readonly featured: boolean
  readonly technologies: readonly string[]
  /** Chips used by the tech filter on the projects grid. */
  readonly stackTags: readonly string[]
  readonly highlights: readonly string[]
  readonly metrics: readonly {
    readonly label: string
    readonly value: string
    readonly suffix?: string
  }[]
  readonly cover: { readonly src: string; readonly isPlaceholder: boolean }
  readonly links: {
    readonly live?: string
    readonly repository?: string
  }
  readonly caseStudy: {
    readonly sections: readonly CaseStudySection[]
    readonly endpoints?: readonly ApiEndpoint[]
    readonly gallery: readonly GalleryItem[]
    readonly futureScope: readonly string[]
    readonly lessons: readonly string[]
  }
  /** `r g b` triplet used for the card's gradient border and glow. */
  readonly rgb: string
}

/* -------------------------------------------------------------------------- */
/*  Achievements                                                               */
/* -------------------------------------------------------------------------- */

export interface Achievement {
  readonly id: string
  readonly title: string
  readonly issuer: string
  readonly description: string
  readonly icon: IconName
  readonly rgb: string
  /** Drives the count-up animation. Omit for non-numeric achievements. */
  readonly stat?: {
    readonly value: number
    readonly prefix?: string
    readonly suffix?: string
    readonly label: string
    readonly decimals?: number
    /** Set to '' for years and ratings so they never render as "2,026". */
    readonly separator?: string
  }
  readonly badge?: string
  readonly href?: string
}

/* -------------------------------------------------------------------------- */
/*  Build journey                                                              */
/* -------------------------------------------------------------------------- */

export type JourneyKind =
  'education' | 'skill' | 'project' | 'internship' | 'ngo' | 'startup' | 'exam' | 'goal'

export interface JourneyMilestone {
  readonly id: string
  readonly year: string
  readonly title: string
  readonly subtitle: string
  readonly description: string
  readonly kind: JourneyKind
  readonly icon: IconName
  readonly tags: readonly string[]
  /** Future goals render with a dashed connector and muted styling. */
  readonly isFuture?: boolean
}

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                 */
/* -------------------------------------------------------------------------- */

export interface NavItem {
  readonly id: string
  readonly label: string
  /** In-page anchor on the home route, or a full route path. */
  readonly href: string
  readonly kind: 'section' | 'route'
  readonly icon: IconName
}
