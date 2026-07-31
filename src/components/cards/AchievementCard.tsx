import { motion } from 'framer-motion'

import { listItem } from '@/animations/variants'
import type { Achievement } from '@/types/content'

import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Counter } from '../ui/Counter'
import { Icon } from '../ui/Icon'

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const { rgb } = achievement

  const content = (
    <Card tint={rgb} spotlight interactive className="h-full p-6">
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl border"
          style={{
            borderColor: `rgb(${rgb} / 0.3)`,
            backgroundColor: `rgb(${rgb} / 0.1)`,
            color: `rgb(${rgb})`,
          }}
        >
          <Icon name={achievement.icon} className="h-5 w-5" />
        </span>

        {achievement.badge && <Badge tone="neutral">{achievement.badge}</Badge>}
      </div>

      {achievement.stat && (
        <p
          className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl"
          style={{ color: `rgb(${rgb})` }}
        >
          <Counter
            value={achievement.stat.value}
            prefix={achievement.stat.prefix}
            suffix={achievement.stat.suffix}
            decimals={achievement.stat.decimals ?? 0}
            separator={achievement.stat.separator ?? ','}
          />
        </p>
      )}

      <h3 className="mt-3 text-base font-semibold tracking-tight text-content-primary">
        {achievement.title}
      </h3>
      <p className="mt-1 text-xs text-content-muted">{achievement.issuer}</p>
      <p className="mt-3 text-sm leading-relaxed text-content-secondary">
        {achievement.description}
      </p>

      {achievement.href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent">
          View profile
          <Icon name="arrow-up-right" className="h-3 w-3" />
        </span>
      )}
    </Card>
  )

  return (
    <motion.li variants={listItem} className="h-full">
      {achievement.href ? (
        <a
          href={achievement.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full rounded-2xl"
          aria-label={`${achievement.title} on ${achievement.issuer} (opens in a new tab)`}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </motion.li>
  )
}
