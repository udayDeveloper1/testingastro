// import { lazy, useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import './App.css'
// import './assets/css/antdCss.css'
// import './assets/css/custom.css'
// import './assets/css/loader.css'
// import './assets/css/main.css'
// import './assets/css/main2.css'
// import ScrollToTopButton from './component/Custom/ScrollToTopButton'
// import {
//   DashboardLayout,
//   PublicLayout,
//   RootLayout,
//   WithoutHeaderFooter
// } from './routers/DashboardLayouts'


// import { usePathRedirection } from './routers/PathRedirection'

// function App() {
//   // const isAuthenticated = useSelector(selectIsAuthenticated)
//   const { isScroll } = useSelector(state => state.masterSlice)
//   const PathRedirection = usePathRedirection()

//   useEffect(() => {
//     requestAnimationFrame(() => {
//       const preloader = document.getElementById('preloader')
//       if (preloader) preloader.remove()
//     })
//   }, [])

//   return (
//     <>
//       <div className={`${isScroll.is_scroll ? 'isScroll' : ''}`}>
//         <ScrollToTopButton />
//         <BrowserRouter>
//           <Routes>
//             <Route element={<RootLayout />}>
//               {PathRedirection?.some(({ auth }) => auth === true) && (
//                 <>
//                   <Route element={<DashboardLayout />}>
//                     {PathRedirection?.filter(({ auth }) => auth === true)?.map(
//                       ({ path, element }, index) =>
//                         path && element ? (
//                           <Route key={index} path={path} element={element} />
//                         ) : null
//                     )}
//                   </Route>
//                 </>
//               )}

//               {PathRedirection?.some(({ auth }) => auth === false) && (
//                 <>
//                   <Route element={<PublicLayout />}>
//                     {PathRedirection?.filter(({ auth }) => auth === false)?.map(
//                       ({ path, element }, index) =>
//                         path && element ? (
//                           <Route key={index} path={path} element={element} />
//                         ) : null
//                     )}
//                   </Route>
//                 </>
//               )}

//               {PathRedirection?.some(({ auth }) => auth === undefined) && (
//                 <>
//                   <Route element={<WithoutHeaderFooter />}>
//                     {PathRedirection?.filter(
//                       ({ auth }) => auth === undefined
//                     )?.map(({ path, element }, index) =>
//                       path && element ? (
//                         <Route key={index} path={path} element={element} />
//                       ) : null
//                     )}
//                   </Route>
//                 </>
//               )}
//             </Route>
//           </Routes>
//         </BrowserRouter>
//       </div>
//     </>
//   )
// }

// export default App


import { Suspense, useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
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
import { usePathRedirection } from './routers/PathRedirection'
import { LanguageInitializer } from './routers/LanguageInitializer'

function App() {
  const { isScroll } = useSelector(state => state.masterSlice)
  const PathRedirection = usePathRedirection()

  // Optional: Only remove preloader if it exists
  useEffect(() => {
    const preloader = document.getElementById('preloader')
    if (preloader) preloader.remove()
  }, [])

  // Memoize route groups to avoid recalculation
  const authRoutes = useMemo(() => PathRedirection.filter(r => r.auth === true), [PathRedirection])
  const publicRoutes = useMemo(() => PathRedirection.filter(r => r.auth === false), [PathRedirection])
  const noLayoutRoutes = useMemo(() => PathRedirection.filter(r => r.auth === undefined), [PathRedirection])

  return (
    <div className={isScroll.is_scroll ? 'isScroll' : ''}>
      <ScrollToTopButton />
      <BrowserRouter>
       <LanguageInitializer />
        <Suspense fallback={<div className='min-h-100'></div>}>
          <Routes>
            <Route element={<RootLayout />}>
              {authRoutes.length > 0 && (
                <Route element={<DashboardLayout />}>
                  {authRoutes.map(({ path, element }, index) =>
                    path && element ? <Route key={index} path={path} element={element} /> : null
                  )}
                </Route>
              )}

              {publicRoutes.length > 0 && (
                <Route element={<PublicLayout />}>
                  {publicRoutes.map(({ path, element }, index) =>
                    path && element ? <Route key={index} path={path} element={element} /> : null
                  )}
                </Route>
              )}

              {noLayoutRoutes.length > 0 && (
                <Route element={<WithoutHeaderFooter />}>
                  {noLayoutRoutes.map(({ path, element }, index) =>
                    path && element ? <Route key={index} path={path} element={element} /> : null
                  )}
                </Route>
              )}
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
