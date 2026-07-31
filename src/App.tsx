import { AnimatePresence } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { RootLayout } from '@/components/layout/RootLayout'
import { RouteFallback } from '@/components/layout/RouteFallback'
import { ROUTES } from '@/constants/navigation'

/**
 * Route-level code splitting. The home page ships in the initial bundle
 * because it is what nearly every visitor lands on; every other route is
 * fetched on demand.
 */
import HomePage from '@/pages/HomePage'

const ProjectsPage = lazy(() => import('@/pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ContactPage = lazy(() => import('@/pages/ContactPage'))
const ResumePage = lazy(() => import('@/pages/ResumePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export default function App() {
  const location = useLocation()

  return (
    <Routes location={location}>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <AnimatePresence mode="wait">
              <HomePage key="home" />
            </AnimatePresence>
          }
        />
        <Route
          path={ROUTES.projects}
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProjectsPage />
            </Suspense>
          }
        />
        <Route
          path="/projects/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProjectDetailPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.dashboard}
          element={
            <Suspense fallback={<RouteFallback />}>
              <DashboardPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.contact}
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.resume}
          element={
            <Suspense fallback={<RouteFallback />}>
              <ResumePage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
