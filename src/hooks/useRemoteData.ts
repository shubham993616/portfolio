import { useCallback, useEffect, useRef, useState } from 'react'

import type { RemoteData } from '@/types/dashboard'

interface Options<T> {
  /** Resume-verified values rendered whenever the live fetch cannot be used. */
  fallback: T
  /** Re-fetch cadence in ms. Pass 0 to disable polling. */
  refreshIntervalMs?: number
  enabled?: boolean
}

/**
 * Fetch-with-fallback primitive behind every dashboard widget.
 *
 * The guarantee it provides: `data` is never null after the first settle. If
 * the network call fails, times out, or the API disappears entirely, the
 * widget renders verified fallback figures and flags `source: 'fallback'`.
 * A recruiter never sees a broken panel.
 */
export function useRemoteData<T>(
  fetcher: () => Promise<T>,
  { fallback, refreshIntervalMs = 0, enabled = true }: Options<T>
): RemoteData<T> & { refresh: () => void } {
  const [state, setState] = useState<RemoteData<T>>({
    status: 'idle',
    data: fallback,
    error: null,
    source: 'fallback',
    fetchedAt: null,
  })

  const mounted = useRef(true)
  const fetcherRef = useRef(fetcher)
  fetcherRef.current = fetcher

  const run = useCallback(async () => {
    if (!enabled) return
    setState((previous) => ({ ...previous, status: 'loading' }))

    try {
      const data = await fetcherRef.current()
      if (!mounted.current) return
      setState({
        status: 'success',
        data,
        error: null,
        source: 'live',
        fetchedAt: Date.now(),
      })
    } catch (error) {
      if (!mounted.current) return
      setState({
        status: 'error',
        data: fallback,
        error: error instanceof Error ? error.message : 'Request failed',
        source: 'fallback',
        fetchedAt: Date.now(),
      })
    }
    // `fallback` is a module-level constant in every call site; including it in
    // the dep array would only churn the callback identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled])

  useEffect(() => {
    mounted.current = true
    void run()

    return () => {
      mounted.current = false
    }
  }, [run])

  useEffect(() => {
    if (!refreshIntervalMs || !enabled) return

    const id = window.setInterval(() => {
      // Never poll a tab nobody is looking at.
      if (document.visibilityState === 'visible') void run()
    }, refreshIntervalMs)

    return () => window.clearInterval(id)
  }, [refreshIntervalMs, run, enabled])

  return { ...state, refresh: run }
}
