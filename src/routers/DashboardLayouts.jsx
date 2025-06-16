import React, {
  lazy,
  useEffect,
  useRef,
  Suspense,
  useCallback,
  useLayoutEffect
} from 'react'
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigationType
} from 'react-router'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setPageScroll } from '../storemain/slice/MasterSlice'
import { Constatnt } from '../utils/Constent'
import { PATHS } from './Paths'

const SEO = lazy(() => import('../SEO'))
const NavBar = lazy(() => import('../Layout/NavBar'))
const Footer = lazy(() => import('../Layout/Footer'))
const LayoutWrapper = lazy(() => import('../Layout/LayoutWrapper'))

// export const RootLayout = React.memo(() => {
//   const scrollRef = useRef(null)
//   const location = useLocation()
//   const dispatch = useDispatch()

//   const pageScroll = useSelector(state => state?.masterSlice?.pageScroll, shallowEqual)

//   const scrollToTop = useCallback(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: 'smooth' })
//     }
//     dispatch(setPageScroll(false))
//   }, [dispatch])

//   useEffect(() => {
//     scrollToTop()
//   }, [location.pathname, pageScroll])

//   const navigationType = useNavigationType()
//   const prevIdxRef = useRef(window.history.state?.idx || 0)
//   // useLayoutEffect(() => {
//   //   const currentIdx = window.history.state?.idx
//   //   if (navigationType === 'POP' && location.pathname.includes('/chat/')) {
//   //     const prevIdx = prevIdxRef.current
//   //     if (currentIdx < prevIdx) {
//   //       window.history.go(-2)
//   //     } else if (currentIdx > prevIdx) {
//   //       window.history.go(2)
//   //     } else {
//   //       window.history.go(-2)
//   //     }
//   //     prevIdxRef.current = currentIdx
//   //   }
//   // }, [location, navigationType])
//   useLayoutEffect(() => {
//     const currentIdx = window.history.state?.idx ?? 0;
//     const prevIdx = prevIdxRef.current;

//     if (navigationType === 'POP' && location.pathname.includes('/chat/')) {
//       const delta = currentIdx - prevIdx;

//       if (delta !== 0) {
//         window.history.go(delta * 2);
//       } else {
//         window.history.go(-2);
//       }

//       prevIdxRef.current = currentIdx;
//     }
//   }, [location, navigationType]);

// useEffect(() => {
//   const timer = setTimeout(() => {
//     const element = document.getElementById('initialLoader')
//     if (element) element.remove()
//   }, 100) // 100ms

//   return () => clearTimeout(timer)
// }, [])
//   return (
//     <div className={pageScroll.is_scroll ? 'isScroll' : ''} ref={scrollRef}>
//       <NavBar />
//       <Suspense fallback={null}>
//         <SEO />
//       </Suspense>
//       <main>
//         <Outlet />
//       </main>

//       <Suspense fallback={null}>
//         <Footer />
//       </Suspense>
//     </div>
//   )
// })

export const RootLayout = () => {
  const scrollRef = useRef(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigationType = useNavigationType()
  const pageScroll = useSelector(state => state.masterSlice.pageScroll, shallowEqual)

  const scrollToTop = useCallback(() => {
    if (scrollRef.current) {
      requestAnimationFrame(() => { scrollRef.current.scrollIntoView({ behavior: 'smooth' }) })
    }
    dispatch(setPageScroll(false))
  }, [dispatch])

  useEffect(() => {
    scrollToTop()
  }, [location.pathname, pageScroll])

  const prevIdxRef = useRef(window.history.state?.idx || 0)
  useLayoutEffect(() => {
    const currentIdx = window.history.state?.idx
    if (navigationType === 'POP' && location.pathname.includes('/chat/')) {
      const prevIdx = prevIdxRef.current
      if (currentIdx < prevIdx) {
        window.history.go(-2)
      } else if (currentIdx > prevIdx) {
        window.history.go(2)
      } else {
        window.history.go(-2)
      }
      prevIdxRef.current = currentIdx
    }
  }, [location, navigationType])

  useEffect(() => {
    // const timer = setTimeout(() => {
      document.getElementById('initialLoader')?.remove()
    // }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={pageScroll.is_scroll ? 'isScroll' : ''} ref={scrollRef}>
      <NavBar />
      <Suspense fallback={null}>
        <SEO />
      </Suspense>
      <main>
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}


export const DashboardLayout = React.memo(() => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = localStorage.getItem(Constatnt.LOGIN_KEY)
    if (!isLogin) {
      navigate(PATHS?.HOMEPAGE)
    }
  }, [navigate])

  return <Outlet />
})

export const PublicLayout = () => <Outlet />

export const WithoutHeaderFooter = React.memo(({ children }) => (
  <LayoutWrapper showFooter={false}>{children}</LayoutWrapper>
))
