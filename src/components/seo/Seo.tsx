import { useEffect } from 'react'

import { type SeoInput, applySeo, applyStructuredData } from '@/lib/seo'

interface SeoProps extends SeoInput {
  /** JSON-LD injected into <head> for this route. */
  structuredData?: Record<string, unknown> | null
}

/**
 * Declarative wrapper around the imperative SEO helpers. Render one per route.
 */
export function Seo({ structuredData = null, ...seo }: SeoProps) {
  const { title, description, path, image, type, keywords, noIndex } = seo
  const serializedKeywords = keywords?.join(',') ?? ''
  const serializedStructuredData = structuredData ? JSON.stringify(structuredData) : ''

  useEffect(() => {
    applySeo({ title, description, path, image, type, keywords, noIndex })
    applyStructuredData(serializedStructuredData ? JSON.parse(serializedStructuredData) : null)
    // Serialized deps keep this effect from re-running on every render just
    // because an inline object literal has a fresh identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, type, serializedKeywords, noIndex, serializedStructuredData])

  return null
}
