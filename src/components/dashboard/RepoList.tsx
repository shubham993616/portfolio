import { motion } from 'framer-motion'

import { plainNumber, relativeTime } from '@/lib/format'
import type { GitHubRepo } from '@/types/dashboard'

import { EmptyState } from '../ui/EmptyState'
import { Icon } from '../ui/Icon'
import { Skeleton } from '../ui/Skeleton'
import { TechIcon } from '../ui/TechIcon'

interface RepoListProps {
  repos: readonly GitHubRepo[]
  loading?: boolean
  limit?: number
}

export function RepoList({ repos, loading = false, limit = 5 }: RepoListProps) {
  if (loading) {
    return (
      <ul className="space-y-2.5" aria-hidden="true">
        {Array.from({ length: limit }).map((_, index) => (
          <li key={index} className="rounded-xl border border-border p-4">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="mt-2.5 h-3 w-3/4" />
          </li>
        ))}
      </ul>
    )
  }

  const visible = repos.slice(0, limit)

  if (visible.length === 0) {
    return (
      <EmptyState
        compact
        icon="folder-git"
        title="Repositories are not loading right now"
        description="GitHub's public API may be rate limited. The projects section above is unaffected."
      />
    )
  }

  return (
    <ul className="space-y-2.5">
      {visible.map((repo, index) => (
        <motion.li
          key={repo.id}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.06, duration: 0.4 }}
        >
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-xl border border-border bg-background-alt/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-content-primary transition-colors group-hover:text-accent">
                <Icon name="folder-git" className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{repo.name}</span>
              </span>
              <Icon
                name="arrow-up-right"
                className="h-3.5 w-3.5 shrink-0 text-content-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>

            {repo.description && (
              <p className="line-clamp-2 text-xs leading-relaxed text-content-secondary">
                {repo.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.7rem] text-content-muted">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <TechIcon tech={repo.language} className="h-3 w-3" colored />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Icon name="star" className="h-3 w-3" />
                {plainNumber(repo.stars)}
              </span>
              <span className="flex items-center gap-1">
                <Icon name="git-fork" className="h-3 w-3" />
                {plainNumber(repo.forks)}
              </span>
              <span className="ml-auto">Updated {relativeTime(repo.updatedAt)}</span>
            </div>
          </a>
        </motion.li>
      ))}
    </ul>
  )
}
