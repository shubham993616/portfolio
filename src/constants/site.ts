/**
 * Single source of truth for anything environment or deployment specific.
 *
 * Every value falls back to a sensible default, so the project still builds and
 * runs correctly with no `.env` file present — the fallbacks simply mirror the
 * values documented in `.env.example`.
 */

const env = import.meta.env

const readEnv = (value: string | undefined, fallback: string): string => {
  const trimmed = value?.trim()
  return trimmed && trimmed.length > 0 ? trimmed : fallback
}

export const SITE = {
  url: readEnv(env.VITE_SITE_URL, 'https://shubhammodanwal.vercel.app').replace(/\/+$/, ''),
  name: 'Shubham Modanwal',
  title: 'Shubham Modanwal — Backend-Focused Software Engineer',
  shortTitle: 'Shubham Modanwal',
  description:
    'Backend-focused software engineer building secure Java and Spring Boot systems. Co-Founder & CPO at Neosix Technologies, full-stack intern at Vidyarthimitra, GATE 2026 qualified.',
  locale: 'en_IN',
  themeColor: '#0B0F17',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
} as const

export const CONTACT_CONFIG = {
  /**
   * Web3Forms access keys are public submission identifiers, not secrets — they
   * are safe to ship in a client bundle. See README > Environment Variables.
   */
  web3formsKey: readEnv(env.VITE_WEB3FORMS_ACCESS_KEY, '0ad17684-15dc-4017-9537-57df5c08dd9a'),
  endpoint: 'https://api.web3forms.com/submit',
  /** Hidden field bots fill in and humans never see. */
  honeypotField: 'botcheck',
} as const

export const DASHBOARD_CONFIG = {
  github: {
    username: readEnv(env.VITE_GITHUB_USERNAME, 'shubham993616'),
    token: readEnv(env.VITE_GITHUB_TOKEN, ''),
    apiBase: 'https://api.github.com',
  },
  leetcode: {
    username: readEnv(env.VITE_LEETCODE_USERNAME, 'imshubh4m'),
    apiBase: readEnv(env.VITE_LEETCODE_API_BASE, 'https://leetcode-stats-api.herokuapp.com'),
  },
  codechef: {
    username: readEnv(env.VITE_CODECHEF_USERNAME, 'imshubh4m'),
  },
  /** Widgets auto-refresh on this cadence while the tab is visible. */
  refreshIntervalMs: 5 * 60 * 1000,
  /** Abort a fetch that has not resolved within this window. */
  requestTimeoutMs: 8000,
} as const

export const FEATURE_FLAGS = {
  commandPalette: true,
  themeToggle: true,
  cursorGlow: true,
  loadingScreen: true,
  liveDashboard: true,
} as const
