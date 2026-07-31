import { DASHBOARD_CONFIG } from '@/constants/site'

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message)
    this.name = 'HttpError'
  }
}

/**
 * `fetch` with a hard timeout and typed JSON parsing.
 *
 * A hanging request is worse than a failed one here: the dashboard would sit
 * in its loading state indefinitely instead of falling back to verified
 * numbers. AbortController turns "slow" into "failed" at a known boundary.
 */
export async function fetchJson<T>(
  url: string,
  init: RequestInit = {},
  timeoutMs: number = DASHBOARD_CONFIG.requestTimeoutMs
): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { Accept: 'application/json', ...init.headers },
    })

    if (!response.ok) {
      throw new HttpError(
        response.status === 403
          ? 'Rate limit reached — showing verified figures instead.'
          : `Request failed with status ${response.status}`,
        response.status
      )
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timed out after ${timeoutMs}ms`)
    }
    throw error
  } finally {
    window.clearTimeout(timer)
  }
}
