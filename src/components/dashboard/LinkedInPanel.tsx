import { EXPERIENCE } from '@/data/experience'
import { PROFILE } from '@/data/profile'
import { getSocial } from '@/data/socials'

import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/Button'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { Tooltip } from '../ui/Tooltip'

/**
 * LinkedIn's API is partner-gated — there is no public endpoint for reading a
 * profile, and scraping violates their terms. This panel therefore renders the
 * same experience data the rest of the site uses and links straight out.
 */
export function LinkedInPanel() {
  const linkedin = getSocial('linkedin')

  return (
    <Card tint="10 102 194" spotlight className="flex h-full flex-col p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className="flex h-11 w-11 items-center justify-center rounded-xl border"
            style={{
              borderColor: 'rgb(10 102 194 / 0.35)',
              backgroundColor: 'rgb(10 102 194 / 0.12)',
              color: 'rgb(88 158 244)',
            }}
          >
            <Icon name="linkedin" className="h-5 w-5" />
          </span>
          <div>
            <h3 className="flex items-center gap-2 text-base font-semibold text-content-primary">
              LinkedIn
              <Badge tone="neutral">Partner-gated API</Badge>
            </h3>
            <p className="mt-0.5 text-xs text-content-muted">{linkedin.handle}</p>
          </div>
        </div>

        <Tooltip label="LinkedIn's profile API requires partner approval, so this card renders verified résumé data instead of a live feed.">
          <span className="inline-flex items-center gap-1.5 text-[0.7rem] text-content-muted">
            <Icon name="shield" className="h-3 w-3" />
            Resume-verified
          </span>
        </Tooltip>
      </div>

      <div className="mt-5 flex items-center gap-3.5 rounded-xl border border-dashed border-border p-4">
        <img
          src={PROFILE.avatarPath}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
          className="h-12 w-12 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-content-primary">{PROFILE.name}</p>
          <p className="truncate text-xs text-content-secondary">{PROFILE.role}</p>
          <p className="mt-0.5 truncate text-[0.7rem] text-content-muted">{PROFILE.location}</p>
        </div>
      </div>

      <ol className="mt-5 space-y-3.5">
        {EXPERIENCE.map((entry) => (
          <li key={entry.id} className="flex gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background-alt text-content-secondary">
              <Icon name={entry.icon} className="h-3.5 w-3.5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-snug text-content-primary">
                {entry.company}
              </p>
              <p className="text-xs leading-snug text-content-secondary">{entry.role}</p>
              <p className="mt-0.5 text-[0.7rem] text-content-muted">{entry.period}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-5">
        <ButtonLink
          href={linkedin.href}
          variant="subtle"
          size="sm"
          iconRight="arrow-up-right"
          fullWidth
        >
          View LinkedIn profile
        </ButtonLink>
      </div>
    </Card>
  )
}
