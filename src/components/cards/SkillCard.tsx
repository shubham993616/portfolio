import { motion } from 'framer-motion'

import { listItem } from '@/animations/variants'
import type { SkillCategory } from '@/types/content'

import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { TechIcon } from '../ui/TechIcon'

interface SkillCardProps {
  category: SkillCategory
}

export function SkillCard({ category }: SkillCardProps) {
  return (
    <motion.li variants={listItem} className="h-full">
      <Card tint={category.rgb} spotlight interactive className="h-full p-6">
        <div className="flex items-start gap-3.5">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
            style={{
              borderColor: `rgb(${category.rgb} / 0.3)`,
              backgroundColor: `rgb(${category.rgb} / 0.1)`,
              color: `rgb(${category.rgb})`,
            }}
          >
            <Icon name={category.icon} className="h-5 w-5" />
          </span>

          <div className="min-w-0">
            <h3 className="text-base font-semibold tracking-tight text-content-primary">
              {category.label}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-content-muted">
              {category.description}
            </p>
          </div>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <li key={skill.name}>
              <span
                className="group/skill flex items-center gap-2 rounded-lg border border-border bg-background-alt/70 px-2.5 py-1.5 text-xs font-medium text-content-secondary transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:text-content-primary"
                style={
                  {
                    '--skill-tint': category.rgb,
                  } as React.CSSProperties
                }
                onMouseEnter={(event) => {
                  event.currentTarget.style.borderColor = `rgb(${category.rgb} / 0.5)`
                  event.currentTarget.style.boxShadow = `0 8px 22px -14px rgb(${category.rgb})`
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.borderColor = ''
                  event.currentTarget.style.boxShadow = ''
                }}
              >
                <TechIcon tech={skill.tech ?? skill.name} className="h-3.5 w-3.5" colored />
                {skill.name}
                {skill.note && (
                  <span className="text-[0.6rem] text-content-muted">· {skill.note}</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </motion.li>
  )
}
