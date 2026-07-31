import { useCallback } from 'react'

import { DASHBOARD_CONFIG } from '@/constants/site'
import { useRemoteData } from '@/hooks'
import {
  ACTIVITY_FALLBACK,
  GITHUB_FALLBACK,
  fetchGitHubStats,
  fetchRecentActivity,
} from '@/services/github'

import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { ContributionGraph } from './ContributionGraph'
import { LanguageBar } from './LanguageBar'
import { RepoList } from './RepoList'
import { SourceBadge } from './SourceBadge'
import { StatTile } from './StatTile'

export function GitHubPanel() {
  const statsFetcher = useCallback(() => fetchGitHubStats(), [])
  const activityFetcher = useCallback(() => fetchRecentActivity(), [])

  const stats = useRemoteData(statsFetcher, {
    fallback: GITHUB_FALLBACK,
    refreshIntervalMs: DASHBOARD_CONFIG.refreshIntervalMs,
  })

  const activity = useRemoteData(activityFetcher, {
    fallback: ACTIVITY_FALLBACK,
    refreshIntervalMs: DASHBOARD_CONFIG.refreshIntervalMs,
  })

  const loading = stats.status === 'loading' && stats.source === 'fallback'
  const data = stats.data ?? GITHUB_FALLBACK

  return (
    <div className="space-y-5">
      {/* Header */}
      <Card className="p-5" spotlight>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-alt text-content-primary">
              <Icon name="github" className="h-5 w-5" />
            </span>
            <div>
              <h3 className="flex items-center gap-2 text-base font-semibold text-content-primary">
                GitHub
                <Badge tone="accent">Official API</Badge>
              </h3>
              <p className="mt-0.5 text-xs text-content-muted">
                @{data.profile.login}
                {data.profile.company ? ` · ${data.profile.company}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <SourceBadge
              source={stats.source}
              fetchedAt={stats.fetchedAt}
              loading={loading}
              fallbackReason={stats.error ?? undefined}
            />
            <ButtonLink
              href={data.profile.htmlUrl}
              variant="subtle"
              size="sm"
              iconRight="arrow-up-right"
            >
              Profile
            </ButtonLink>
          </div>
        </div>
      </Card>

      {/* Tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          label="Public repositories"
          value={data.profile.publicRepos}
          icon="folder-git"
          rgb="79 140 255"
          loading={loading}
        />
        <StatTile
          label="Followers"
          value={data.profile.followers}
          icon="users"
          rgb="0 212 170"
          loading={loading}
        />
        <StatTile
          label="Total stars"
          value={data.totalStars}
          icon="star"
          rgb="245 158 11"
          loading={loading}
        />
        <StatTile
          label="Total forks"
          value={data.totalForks}
          icon="git-fork"
          rgb="129 140 248"
          loading={loading}
        />
      </div>

      {/* Activity + languages */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="p-5" spotlight>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-content-primary">
              <Icon name="activity" className="h-4 w-4 text-secondary" />
              Recent public activity
            </h4>
            <SourceBadge
              source={activity.source}
              fetchedAt={activity.fetchedAt}
              loading={activity.status === 'loading' && activity.source === 'fallback'}
              fallbackReason={activity.error ?? undefined}
            />
          </div>

          <ContributionGraph
            days={activity.data ?? []}
            loading={activity.status === 'loading' && activity.source === 'fallback'}
          />

          <p className="mt-3 text-[0.7rem] leading-relaxed text-content-muted">
            Built from GitHub&apos;s public events feed, which retains roughly the last 90 days.
            GitHub publishes no API for the lifetime contribution graph, so this is recent activity
            rather than an all-time total.
          </p>
        </Card>

        <Card className="p-5" spotlight>
          <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-content-primary">
            <Icon name="code" className="h-4 w-4 text-accent" />
            Language mix
          </h4>
          <LanguageBar languages={data.languages} loading={loading} />
        </Card>
      </div>

      {/* Repos */}
      <Card className="p-5" spotlight>
        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-content-primary">
          <Icon name="git-branch" className="h-4 w-4 text-accent" />
          Latest repositories
        </h4>
        <RepoList repos={data.repos} loading={loading} limit={5} />
      </Card>
    </div>
  )
}
