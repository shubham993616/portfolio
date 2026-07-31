/* -------------------------------------------------------------------------- */
/*  Async state envelope                                                       */
/* -------------------------------------------------------------------------- */

export type DataSource = 'live' | 'fallback'

/**
 * Every dashboard widget renders from this envelope. `source` tells the UI
 * whether it is showing freshly fetched numbers or the resume-verified
 * fallback, so a recruiter never sees a broken panel — only a quieter badge.
 */
export interface RemoteData<T> {
  readonly status: 'idle' | 'loading' | 'success' | 'error'
  readonly data: T | null
  readonly error: string | null
  readonly source: DataSource
  readonly fetchedAt: number | null
}

/* -------------------------------------------------------------------------- */
/*  GitHub                                                                     */
/* -------------------------------------------------------------------------- */

export interface GitHubProfile {
  readonly login: string
  readonly name: string | null
  readonly avatarUrl: string
  readonly bio: string | null
  readonly htmlUrl: string
  readonly followers: number
  readonly following: number
  readonly publicRepos: number
  readonly createdAt: string
  readonly location: string | null
  readonly company: string | null
}

export interface GitHubRepo {
  readonly id: number
  readonly name: string
  readonly fullName: string
  readonly description: string | null
  readonly htmlUrl: string
  readonly homepage: string | null
  readonly language: string | null
  readonly stars: number
  readonly forks: number
  readonly watchers: number
  readonly topics: readonly string[]
  readonly updatedAt: string
  readonly isFork: boolean
}

export interface LanguageSlice {
  readonly name: string
  readonly count: number
  readonly percentage: number
}

export interface ContributionDay {
  readonly date: string
  readonly count: number
  /** 0–4, matching GitHub's own intensity scale. */
  readonly level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubStats {
  readonly profile: GitHubProfile
  readonly repos: readonly GitHubRepo[]
  readonly totalStars: number
  readonly totalForks: number
  readonly languages: readonly LanguageSlice[]
}

/* -------------------------------------------------------------------------- */
/*  LeetCode                                                                   */
/* -------------------------------------------------------------------------- */

export interface LeetCodeStats {
  readonly totalSolved: number
  readonly easySolved: number
  readonly mediumSolved: number
  readonly hardSolved: number
  readonly totalQuestions: number | null
  readonly acceptanceRate: number | null
  readonly ranking: number | null
  readonly contributionPoints: number | null
}

/* -------------------------------------------------------------------------- */
/*  CodeChef                                                                   */
/* -------------------------------------------------------------------------- */

export interface CodeChefStats {
  readonly rating: number
  readonly highestRating: number | null
  readonly stars: number
  readonly globalRank: number | null
  readonly countryRank: number | null
  readonly country: string
}
