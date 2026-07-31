import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { FEATURE_FLAGS } from '@/constants/site'
import { useGlobalShortcuts } from '@/hooks/useGlobalShortcuts'

import { CommandPalette } from '../command/CommandPalette'
import { BackToTop } from './BackToTop'
import { BackgroundGrid } from './BackgroundGrid'
import { CursorGlow } from './CursorGlow'
import { Footer } from './Footer'
import { LoadingScreen } from './LoadingScreen'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'
import { ScrollToTopOnNavigate } from './ScrollToTopOnNavigate'

/**
 * App shell. Everything persistent — background, navbar, footer, overlays —
 * lives here so route changes only swap the `<Outlet />` content.
 */
export function RootLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])

  useGlobalShortcuts({ onOpenCommandPalette: openPalette, commandPaletteOpen: paletteOpen })

  return (
    <div className="relative flex min-h-screen flex-col">
      <BackgroundGrid />
      {FEATURE_FLAGS.cursorGlow && <CursorGlow />}
      {FEATURE_FLAGS.loadingScreen && <LoadingScreen />}

      <ScrollProgress />
      <ScrollToTopOnNavigate />

      <Navbar onOpenCommandPalette={openPalette} />

      <main id="main-content" className="flex-1 pt-[var(--nav-height)]">
        <Outlet />
      </main>

      <Footer />
      <BackToTop />

      {FEATURE_FLAGS.commandPalette && (
        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      )}
    </div>
  )
}
