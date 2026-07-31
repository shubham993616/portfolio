import {
  CODECHEF_PROFILE_URL,
  CODECHEF_STATS,
  RATING_BAND,
  starsForRating,
} from '@/services/codechef'

import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { Counter } from '../ui/Counter'
import { Icon } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'

const MAX_STARS = 7

export function CodeChefPanel() {
  const stats = CODECHEF_STATS
  const stars = starsForRating(stats.rating)
  const band = RATING_BAND(stats.rating)

  return (
    <Card tint="158 111 60" spotlight className="flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              borderColor: 'rgb(158 111 60 / 0.35)',
              backgroundColor: 'rgb(158 111 60 / 0.12)',
              color: 'rgb(196 149 96)',
            }}
          >
            <Icon name="terminal" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-content-primary">
              CodeChef
              <Badge tone="neutral">No public API</Badge>
            </h3>
            <p className="mt-0.5 text-xs text-content-muted">@imshubh4m</p>
          </div>
        </div>

        <Tooltip label="CodeChef publishes no public API and blocks cross-origin reads. These figures come from the resume.">
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-content-muted">
            <Icon name="shield" className="h-3 w-3" />
            Resume-verified
          </span>
        </Tooltip>
      </div>

      <div className="mt-6">
        <p className="text-xs text-content-muted">Contest rating</p>
        <p
          className="mt-1 flex items-baseline gap-3 text-4xl font-semibold tracking-tight"
          style={{ color: `rgb(${band.rgb})` }}
        >
          {/* A contest rating is an identifier, not a quantity — no "1,185". */}
          <Counter value={stats.rating} separator="" />
          <span className="text-sm font-normal text-content-muted">{band.label}</span>
        </p>
      </div>

      {/* Star row */}
      <div className="mt-5">
        <p className="mb-2 text-[0.7rem] text-content-muted">Rating stars</p>
        <div
          className="flex items-center gap-1"
          role="img"
          aria-label={`${stars} of ${MAX_STARS} CodeChef stars`}
        >
          {Array.from({ length: MAX_STARS }).map((_, index) => (
            <Icon
              key={index}
              name="star"
              className={index < stars ? 'h-4 w-4' : 'h-4 w-4 text-border'}
            />
          ))}
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <dt className="text-[0.7rem] text-content-muted">Global rank</dt>
          <dd className="mt-0.5 text-sm font-medium text-content-primary">
            {stats.globalRank ?? '—'}
          </dd>
        </div>
        <div>
          <dt className="text-[0.7rem] text-content-muted">Country rank</dt>
          <dd className="mt-0.5 text-sm font-medium text-content-primary">
            {stats.countryRank ?? '—'}
          </dd>
        </div>
      </dl>

      <p className="mt-4 text-[0.7rem] leading-relaxed text-content-muted">
        Rank figures need an authenticated scrape of the CodeChef profile page, which cannot run
        from the browser. Open the profile for live standings.
      </p>

      <div className="mt-auto pt-5">
        <ButtonLink
          href={CODECHEF_PROFILE_URL}
          variant="subtle"
          size="sm"
          iconRight="arrow-up-right"
          fullWidth
        >
          View CodeChef profile
        </ButtonLink>
      </div>
    </Card>
  )
}
