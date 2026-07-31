import { motion } from 'framer-motion'

import { getTechByName } from '@/lib/tech'
import type { LanguageSlice } from '@/types/dashboard'

import { EmptyState } from '../ui/EmptyState'
import { Skeleton } from '../ui/Skeleton'
import { TechIcon } from '../ui/TechIcon'

const FALLBACK_RGB = '148 163 184'

interface LanguageBarProps {
  languages: readonly LanguageSlice[]
  loading?: boolean
}

export function LanguageBar({ languages, loading = false }: LanguageBarProps) {
  if (loading) {
    return (
      <div className="space-y-3" aria-hidden="true">
        <Skeleton className="h-2.5 w-full rounded-full" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>
      </div>
    )
  }

  if (languages.length === 0) {
    return (
      <EmptyState
        compact
        icon="code"
        title="No language data yet"
        description="Public repositories with a detected primary language will appear here."
      />
    )
  }

  return (
    <div>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-background-alt">
        {languages.map((language, index) => {
          const rgb = getTechByName(language.name)?.rgb ?? FALLBACK_RGB
          return (
            <motion.span
              key={language.name}
              initial={{ width: 0 }}
              whileInView={{ width: `${language.percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundColor: `rgb(${rgb})` }}
              title={`${language.name} — ${language.percentage}%`}
            />
          )
        })}
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
        {languages.map((language) => {
          const rgb = getTechByName(language.name)?.rgb ?? FALLBACK_RGB
          return (
            <li key={language.name} className="flex items-center gap-2 text-xs">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: `rgb(${rgb})` }}
                aria-hidden="true"
              />
              <TechIcon tech={language.name} className="h-3.5 w-3.5" colored />
              <span className="text-content-secondary">{language.name}</span>
              <span className="tabular-nums text-content-muted">{language.percentage}%</span>
            </li>
          )
        })}
      </ul>

      <p className="mt-3 text-[0.7rem] text-content-muted">
        Share of public repositories by primary language.
      </p>
    </div>
  )
}
