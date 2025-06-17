
import { lazy, memo, Suspense, useEffect, useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './assets/css/antdCss.css'
import './assets/css/custom.css'
import './assets/css/loader.css'
import './assets/css/main.css'
import './assets/css/main2.css'
import { DashboardLayout, PublicLayout, RootLayout, WithoutHeaderFooter } from './routers/DashboardLayouts'
import { LanguageInitializer } from './routers/LanguageInitializer'
import { PathRedirection } from './routers/PathRedirection'
const ScrollToTopButton = lazy(() => import('./component/Custom/ScrollToTopButton'))
function App() {
  const authRoutes = useMemo(() => PathRedirection.filter(r => r.auth === true), [])
  const publicRoutes = useMemo(() => PathRedirection.filter(r => r.auth === false), [])
  const noLayoutRoutes = useMemo(() => PathRedirection.filter(r => r.auth === undefined), [])

  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('initialLoader')?.remove()
    }, 100)
    return () => clearTimeout(timer)
  }, [])
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
              {authRoutes?.map(({ path, element }, index) =>
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
        </Route>

        {noLayoutRoutes.length > 0 && (
          <Route element={<WithoutHeaderFooter />}>
            {noLayoutRoutes?.map(({ path, element }, index) => path && element ? (<Route key={path} path={path} element={element} />) : null)} </Route>
        )}

      </Routes>
    </BrowserRouter>
  </>)
}
export default memo(App) 