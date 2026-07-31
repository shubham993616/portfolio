import { DASHBOARD_CONFIG } from '@/constants/site'
import type {
  ContributionDay,
  GitHubProfile,
  GitHubRepo,
  GitHubStats,
  LanguageSlice,
} from '@/types/dashboard'

import { fetchJson } from './http'

const { username, token, apiBase } = DASHBOARD_CONFIG.github

const headers = (): HeadersInit => ({
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
})

/* -------------------------------------------------------------------------- */
/*  Raw API shapes (only the fields we actually consume)                       */
/* -------------------------------------------------------------------------- */

interface RawUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  html_url: string
  followers: number
  following: number
  public_repos: number
  created_at: string
  location: string | null
  company: string | null
}

interface RawRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  topics?: string[]
  updated_at: string
  fork: boolean
  archived: boolean
}

interface RawEvent {
  type: string
  created_at: string
  payload?: { commits?: unknown[]; size?: number }
}

/* -------------------------------------------------------------------------- */
/*  Public API                                                                 */
/* -------------------------------------------------------------------------- */

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [rawUser, rawRepos] = await Promise.all([
    fetchJson<RawUser>(`${apiBase}/users/${username}`, { headers: headers() }),
    fetchJson<RawRepo[]>(`${apiBase}/users/${username}/repos?per_page=100&sort=updated`, {
      headers: headers(),
    }),
  ])

  const profile: GitHubProfile = {
    login: rawUser.login,
    name: rawUser.name,
    avatarUrl: rawUser.avatar_url,
    bio: rawUser.bio,
    htmlUrl: rawUser.html_url,
    followers: rawUser.followers,
    following: rawUser.following,
    publicRepos: rawUser.public_repos,
    createdAt: rawUser.created_at,
    location: rawUser.location,
    company: rawUser.company,
  }

  const repos: GitHubRepo[] = rawRepos
    .filter((repo) => !repo.archived)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      htmlUrl: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      topics: repo.topics ?? [],
      updatedAt: repo.updated_at,
      isFork: repo.fork,
    }))

  return {
    profile,
    repos,
    totalStars: repos.reduce((sum, repo) => sum + repo.stars, 0),
    totalForks: repos.reduce((sum, repo) => sum + repo.forks, 0),
    languages: summariseLanguages(repos),
  }
}

/**
 * Language mix computed from primary repository languages.
 *
 * GitHub's per-repo `/languages` endpoint would give byte-accurate figures but
 * costs one request per repository — a fast way to burn the unauthenticated
 * rate limit. Repo counts are a good enough signal for a portfolio widget, and
 * the label says exactly what is being measured.
 */
function summariseLanguages(repos: readonly GitHubRepo[]): LanguageSlice[] {
  const counts = new Map<string, number>()

  for (const repo of repos) {
    if (!repo.language || repo.isFork) continue
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)
  }

  const total = [...counts.values()].reduce((sum, value) => sum + value, 0)
  if (total === 0) return []

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
}

/**
 * Activity heatmap built from the public events feed.
 *
 * LIMITATION, stated plainly in the UI: GitHub's official REST API exposes no
 * contribution graph. The events endpoint only retains roughly the last 90
 * days and 300 events, so this is a *recent public activity* chart, not the
 * lifetime contribution graph shown on a GitHub profile.
 */
export async function fetchRecentActivity(days = 91): Promise<ContributionDay[]> {
  const events = await fetchJson<RawEvent[]>(
    `${apiBase}/users/${username}/events/public?per_page=100`,
    { headers: headers() }
  )

  const byDay = new Map<string, number>()

  for (const event of events) {
    const key = event.created_at.slice(0, 10)
    const weight =
      event.type === 'PushEvent' ? (event.payload?.commits?.length ?? event.payload?.size ?? 1) : 1
    byDay.set(key, (byDay.get(key) ?? 0) + weight)
  }

  const today = new Date()
  const series: ContributionDay[] = []

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const date = new Date(today)
    date.setDate(today.getDate() - offset)
    const key = date.toISOString().slice(0, 10)
    const count = byDay.get(key) ?? 0
    series.push({ date: key, count, level: intensity(count) })
  }

  return series
}

const intensity = (count: number): ContributionDay['level'] => {
  if (count <= 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

/* -------------------------------------------------------------------------- */
/*  Fallbacks — rendered whenever the live call cannot be used                  */
/* -------------------------------------------------------------------------- */

export const GITHUB_FALLBACK: GitHubStats = {
  profile: {
    login: username,
    name: 'Shubham Modanwal',
    avatarUrl: '/images/profile.svg',
    bio: 'Backend-focused software engineer — Java, Spring Boot, MySQL.',
    htmlUrl: `https://github.com/${username}`,
    followers: 0,
    following: 0,
    publicRepos: 0,
    createdAt: '2023-01-01T00:00:00Z',
    location: 'Ghaziabad, India',
    company: 'Neosix Technologies',
  },
  repos: [],
  totalStars: 0,
  totalForks: 0,
  languages: [],
}

export const ACTIVITY_FALLBACK: ContributionDay[] = []
