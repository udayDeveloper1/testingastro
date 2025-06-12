
import { lazy, memo, Suspense, useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './assets/css/antdCss.css'
import './assets/css/custom.css'
import './assets/css/loader.css'
import './assets/css/main.css'
import './assets/css/main2.css'
const ScrollToTopButton = lazy(() => import('./component/Custom/ScrollToTopButton'))
import { DashboardLayout, PublicLayout, RootLayout, WithoutHeaderFooter } from './routers/DashboardLayouts'
import { LanguageInitializer } from './routers/LanguageInitializer'
import { PathRedirection } from './routers/PathRedirection'
function App() {
  // Memoize route groups to avoid recalculation
  const authRoutes = useMemo(() => PathRedirection.filter(r => r.auth === true), [])
  const publicRoutes = useMemo(() => PathRedirection.filter(r => r.auth === false), [])
  const noLayoutRoutes = useMemo(() => PathRedirection.filter(r => r.auth === undefined), [])
  return (<>
    <BrowserRouter>
      <Suspense fallback={null}>
        <ScrollToTopButton />
      </Suspense>
      <LanguageInitializer />
      <Routes>
        <Route element={<RootLayout />}>
          {authRoutes?.length > 0 && (
            <Route element={<DashboardLayout />}>
              {authRoutes.map(({ path, element }, index) =>
                path && element ? (
                  <Route key={path} path={path} element={element} />
                ) : null
              )}
            </Route>
          )}
          {publicRoutes.length > 0 && (
            <Route element={<PublicLayout />}>
              {publicRoutes.map(({ path, element }, index) =>
                path && element ? (
                  <Route key={path} path={path} element={element} />
                ) : null
              )}
            </Route>
          )}
          {noLayoutRoutes.length > 0 && (
            <Route element={<WithoutHeaderFooter />}> {noLayoutRoutes.map(({ path, element }, index) => path && element ? (<Route key={path} path={path} element={element} />) : null)} </Route>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  </>)
}
export default memo(App) 