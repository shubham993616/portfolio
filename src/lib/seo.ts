import { SITE } from '@/constants/site'

type MetaSelector = { attribute: 'name' | 'property'; key: string }

const upsertMeta = ({ attribute, key }: MetaSelector, content: string): void => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const upsertLink = (rel: string, href: string): void => {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export interface SeoInput {
  title: string
  description: string
  path: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: readonly string[]
  noIndex?: boolean
}

/**
 * Writes document metadata imperatively.
 *
 * A helmet-style library would add a runtime dependency and a provider for
 * something the platform already does well. The trade-off: crawlers that do
 * not execute JavaScript only see the static tags in `index.html` — which is
 * why those are filled in with the site-level defaults rather than left blank.
 */
export function applySeo({
  title,
  description,
  path,
  image = SITE.ogImage,
  type = 'website',
  keywords,
  noIndex = false,
}: SeoInput): void {
  const canonical = `${SITE.url}${path === '/' ? '' : path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE.url}${image}`

  document.title = title

  upsertMeta({ attribute: 'name', key: 'description' }, description)
  if (keywords?.length) {
    upsertMeta({ attribute: 'name', key: 'keywords' }, keywords.join(', '))
  }
  upsertMeta(
    { attribute: 'name', key: 'robots' },
    noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  )

  upsertMeta({ attribute: 'property', key: 'og:title' }, title)
  upsertMeta({ attribute: 'property', key: 'og:description' }, description)
  upsertMeta({ attribute: 'property', key: 'og:type' }, type)
  upsertMeta({ attribute: 'property', key: 'og:url' }, canonical)
  upsertMeta({ attribute: 'property', key: 'og:image' }, imageUrl)
  upsertMeta({ attribute: 'property', key: 'og:site_name' }, SITE.name)
  upsertMeta({ attribute: 'property', key: 'og:locale' }, SITE.locale)

  upsertMeta({ attribute: 'name', key: 'twitter:card' }, SITE.twitterCard)
  upsertMeta({ attribute: 'name', key: 'twitter:title' }, title)
  upsertMeta({ attribute: 'name', key: 'twitter:description' }, description)
  upsertMeta({ attribute: 'name', key: 'twitter:image' }, imageUrl)

  upsertLink('canonical', canonical)
}

const STRUCTURED_DATA_ID = 'structured-data'

/** Replaces the page's JSON-LD block. */
export function applyStructuredData(payload: Record<string, unknown> | null): void {
  const existing = document.getElementById(STRUCTURED_DATA_ID)
  if (existing) existing.remove()
  if (!payload) return

  const script = document.createElement('script')
  script.id = STRUCTURED_DATA_ID
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(payload)
  document.head.appendChild(script)
}
