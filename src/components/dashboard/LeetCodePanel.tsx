import { motion } from 'framer-motion'
import { useCallback } from 'react'

import { DASHBOARD_CONFIG } from '@/constants/site'
import { useRemoteData } from '@/hooks'
import { plainNumber } from '@/lib/format'
import { LEETCODE_FALLBACK, LEETCODE_PROFILE_URL, fetchLeetCodeStats } from '@/services/leetcode'

import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { Counter } from '../ui/Counter'
import { Icon } from '../ui/Icon'
import { SourceBadge } from './SourceBadge'

const DIFFICULTY = [
  { key: 'easySolved', label: 'Easy', rgb: '52 211 153' },
  { key: 'mediumSolved', label: 'Medium', rgb: '245 158 11' },
  { key: 'hardSolved', label: 'Hard', rgb: '248 113 113' },
] as const

export function LeetCodePanel() {
  const fetcher = useCallback(() => fetchLeetCodeStats(), [])
  const { data, source, fetchedAt, status, error } = useRemoteData(fetcher, {
    fallback: LEETCODE_FALLBACK,
    refreshIntervalMs: DASHBOARD_CONFIG.refreshIntervalMs,
  })

  const stats = data ?? LEETCODE_FALLBACK
  const loading = status === 'loading' && source === 'fallback'
  const isLive = source === 'live'
  const maxSolved = Math.max(stats.easySolved, stats.mediumSolved, stats.hardSolved, 1)

  return (
    <Card tint="255 161 22" spotlight className="flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              borderColor: 'rgb(255 161 22 / 0.3)',
              backgroundColor: 'rgb(255 161 22 / 0.1)',
              color: 'rgb(255 161 22)',
            }}
          >
            <Icon name="code" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-content-primary">
              LeetCode
              <Badge tone="neutral">Community API</Badge>
            </h3>
            <p className="mt-0.5 text-xs text-content-muted">@imshubh4m</p>
          </div>
        </div>

        <SourceBadge
          source={source}
          fetchedAt={fetchedAt}
          loading={loading}
          fallbackReason={error ?? 'LeetCode has no official API — showing the resume figure.'}
        />
      </div>

      <div className="mt-6">
        <p className="text-xs text-content-muted">Problems solved</p>
        <p
          className="mt-1 text-4xl font-semibold tracking-tight"
          style={{ color: 'rgb(255 161 22)' }}
        >
          <Counter value={stats.totalSolved} suffix={isLive ? '' : '+'} />
          {stats.totalQuestions && (
            <span className="ml-2 text-sm font-normal text-content-muted">
              / {plainNumber(stats.totalQuestions)}
            </span>
          )}
        </p>
      </div>

      {/* Difficulty split only renders when live — the resume does not break it out. */}
      {isLive ? (
        <ul className="mt-6 space-y-3">
          {DIFFICULTY.map((tier) => {
            const value = stats[tier.key]
            return (
              <li key={tier.key}>
                <div className="mb-1.5 flex items-center justify-between text-xs">
                  <span className="text-content-secondary">{tier.label}</span>
                  <span className="font-medium tabular-nums text-content-primary">{value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-background-alt">
                  <motion.span
                    className="block h-full rounded-full"
                    style={{ backgroundColor: `rgb(${tier.rgb})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(value / maxSolved) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-content-secondary">
          Arrays, strings, trees, recursion and dynamic programming. The difficulty breakdown
          appears here when the live source responds.
        </p>
      )}

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <dt className="text-[0.7rem] text-content-muted">Global ranking</dt>
          <dd className="mt-0.5 text-sm font-medium tabular-nums text-content-primary">
            {stats.ranking ? `#${plainNumber(stats.ranking)}` : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-[0.7rem] text-content-muted">Acceptance rate</dt>
          <dd className="mt-0.5 text-sm font-medium tabular-nums text-content-primary">
            {stats.acceptanceRate ? `${stats.acceptanceRate}%` : '—'}
          </dd>
        </div>
      </dl>

      <div className="mt-5">
        <ButtonLink
          href={LEETCODE_PROFILE_URL}
          variant="subtle"
          size="sm"
          iconRight="arrow-up-right"
          fullWidth
        >
          View LeetCode profile
        </ButtonLink>
      </div>
    </Card>
  )
}
