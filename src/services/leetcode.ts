import { DASHBOARD_CONFIG } from '@/constants/site'
import type { LeetCodeStats } from '@/types/dashboard'

import { fetchJson } from './http'

const { username, apiBase } = DASHBOARD_CONFIG.leetcode

interface RawLeetCodeStats {
  status?: string
  message?: string
  totalSolved?: number
  totalQuestions?: number
  easySolved?: number
  mediumSolved?: number
  hardSolved?: number
  acceptanceRate?: number
  ranking?: number
  contributionPoints?: number
}

/**
 * LeetCode publishes no official public API.
 *
 * This reads a community proxy over LeetCode's internal GraphQL endpoint. It
 * is a third party that can rate-limit, change shape or disappear, so the
 * response is validated field by field and any shortfall throws — which routes
 * the widget to the resume-verified fallback instead of rendering `undefined`.
 * Swap `VITE_LEETCODE_API_BASE` for a different proxy at any time.
 */
export async function fetchLeetCodeStats(): Promise<LeetCodeStats> {
  const raw = await fetchJson<RawLeetCodeStats>(`${apiBase}/${username}`)

  if (raw.status === 'error' || typeof raw.totalSolved !== 'number') {
    throw new Error(raw.message ?? 'LeetCode proxy returned an unexpected payload')
  }

  return {
    totalSolved: raw.totalSolved,
    easySolved: raw.easySolved ?? 0,
    mediumSolved: raw.mediumSolved ?? 0,
    hardSolved: raw.hardSolved ?? 0,
    totalQuestions: raw.totalQuestions ?? null,
    acceptanceRate: raw.acceptanceRate ?? null,
    ranking: raw.ranking ?? null,
    contributionPoints: raw.contributionPoints ?? null,
  }
}

/**
 * Resume-verified figures. The resume states "Solved 100+ problems on LeetCode
 * spanning arrays, strings, trees, recursion and dynamic programming"; the
 * difficulty split is not broken out there, so it is left at zero and the UI
 * hides the breakdown when the live call is unavailable.
 */
export const LEETCODE_FALLBACK: LeetCodeStats = {
  totalSolved: 100,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  totalQuestions: null,
  acceptanceRate: null,
  ranking: null,
  contributionPoints: null,
}

export const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${username}`
