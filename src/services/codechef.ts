import { DASHBOARD_CONFIG } from '@/constants/site'
import type { CodeChefStats } from '@/types/dashboard'

const { username } = DASHBOARD_CONFIG.codechef

/**
 * CodeChef exposes no public API, and its profile pages are not CORS-readable
 * from a browser — any "CodeChef API" is a third-party scraper that breaks
 * whenever the page markup changes.
 *
 * Rather than ship a widget that intermittently shows nothing, this panel
 * renders resume-verified figures and says so on the card. If you later stand
 * up your own scraper (a serverless function is the usual approach), replace
 * this constant with a fetch and the UI needs no changes.
 */
export const CODECHEF_STATS: CodeChefStats = {
  rating: 1185,
  highestRating: null,
  stars: 1,
  globalRank: null,
  countryRank: null,
  country: 'India',
}

export const CODECHEF_PROFILE_URL = `https://www.codechef.com/users/${username}`

/** CodeChef's own rating → star mapping, used for the star row. */
export const starsForRating = (rating: number): number => {
  if (rating >= 2500) return 7
  if (rating >= 2200) return 6
  if (rating >= 2000) return 5
  if (rating >= 1800) return 4
  if (rating >= 1600) return 3
  if (rating >= 1400) return 2
  return 1
}

export const RATING_BAND = (rating: number): { label: string; rgb: string } => {
  if (rating >= 2200) return { label: 'Grandmaster', rgb: '248 113 113' }
  if (rating >= 2000) return { label: 'Master', rgb: '245 158 11' }
  if (rating >= 1800) return { label: 'Expert', rgb: '129 140 248' }
  if (rating >= 1600) return { label: 'Specialist', rgb: '56 189 248' }
  if (rating >= 1400) return { label: 'Pupil', rgb: '52 211 153' }
  return { label: 'Newbie', rgb: '148 163 184' }
}
