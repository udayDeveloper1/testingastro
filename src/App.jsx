import { memo, useEffect, useMemo, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './assets/css/antdCss.css'
import './assets/css/custom.css'
import './assets/css/loader.css'
import './assets/css/main.css'
import './assets/css/main2.css'

import ScrollToTopButton from './component/Custom/ScrollToTopButton'
import {
  DashboardLayout,
  PublicLayout,
  RootLayout,
  WithoutHeaderFooter
} from './routers/DashboardLayouts'
import { PathRedirection } from './routers/PathRedirection'
import { LanguageInitializer } from './routers/LanguageInitializer'

function App() {

  const scrolltoTopRef = useRef()

  // Optional: Only remove preloader if it exists
  // useEffect(() => {
  //   const preloader = document.getElementById('preloader')
  //   if (preloader) preloader.remove()
  // }, [])

  useEffect(() => {
    if (scrolltoTopRef.current) {
      scrolltoTopRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.pathname])

  // Memoize route groups to avoid recalculation
  const authRoutes = useMemo(
    () => PathRedirection.filter(r => r.auth === true),
    []
  )
  const publicRoutes = useMemo(
    () => PathRedirection.filter(r => r.auth === false),
    []
  )
  const noLayoutRoutes = useMemo(
    () => PathRedirection.filter(r => r.auth === undefined),
    []
  )



  return (<>
    {/* // <div className={isScroll.is_scroll ? 'isScroll' : ''} ref={scrolltoTopRef}> */}
    <ScrollToTopButton />
    <BrowserRouter>
      <LanguageInitializer />
      {/* <Suspense fallback={<div className='min-h-100'></div>}> */}
      <Routes>
        <Route element={<RootLayout />}>

          {authRoutes?.length > 0 && (
            <Route element={<DashboardLayout />}>
              {authRoutes.map(({ path, element }, index) =>
                path && element ? (
                  <Route key={index} path={path} element={element} />
                ) : null
              )}
            </Route>
          )}

          {publicRoutes.length > 0 && (
            <Route element={<PublicLayout />}>
              {publicRoutes.map(({ path, element }, index) =>
                path && element ? (
                  <Route key={index} path={path} element={element} />
                ) : null
              )}
            </Route>
          )}

          {noLayoutRoutes.length > 0 && (
            <Route element={<WithoutHeaderFooter />}>
              {noLayoutRoutes.map(({ path, element }, index) =>
                path && element ? (
                  <Route key={index} path={path} element={element} />
                ) : null
              )}
            </Route>
          )}

        </Route>
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
    {/* // </div> */}
  </>)
}

export default memo(App)
