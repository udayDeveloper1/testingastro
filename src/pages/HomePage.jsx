import React, { lazy, Suspense, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import moment from 'moment'
// import 'slick-carousel/slick/slick-theme.css'
// import 'slick-carousel/slick/slick.css'
import '../assets/css/homepage.css'
import '../assets/css/newHomePage.css'
import backImg from '/homepage/homeBackgroundImage.webp'
import backImgMobile from '/homepage/homeBackgroundImage_mobile.webp'
import {
  getDashboardCount,
  getDashboardPanchang,
  setPanchangDetails
} from '../storemain/slice/MasterSlice'
import messageIcon from '/newThemeHomePage/MessageIcon.svg'
import astromall from '/newThemeHomePage/astromall.svg'
import bookPooja from '/newThemeHomePage/bookPooja.svg'
import { UpdatedPaths } from '../routers/Paths'
import { Constatnt } from '../utils/Constent'
import phoneIcon from '/newThemeHomePage/phoneIcon.svg'
import HeroSection from '../component/Homepage/HeroSection'
import { hasAtLeastOneResponseData } from '../utils/CommonFunction'
import { useInitialScreenSizeCategory } from './hooks/useInitialScreenSizeCategory'
import { getHomePageListing } from '../storemain/slice/HompageSlice'
import { LanguageOption } from '../utils/CommonVariable'
import useObserver from './hooks/useObserver'

const ChatWithAstrologerCard = lazy(() => import('../component/CommonChatTalkAstrologerCard'))
const HoroscopeGrid = lazy(() => import('../component/kundali/HoroscopeGrid'))
const TodaysPanchangHomePage = lazy(() => import('../component/panchang/TodaysPanchangHomePage'))

// const TestimonialSlider = lazy(() => import('../component/TestimonialSlider/TestimonialSlider'))

const CustomButton = lazy(() => import('../component/Homepage/CustomButton'))
const HomeBlog = lazy(() => import('../component/Homepage/HomeBlog'))
const HomeFAQs = lazy(() => import('../component/Homepage/HomeFAQs'))
const Numbers = lazy(() => import('../component/Homepage/Numbers'))
const Loader = lazy(() => import('../component/loader/Loader'))
const ChooseCategory = lazy(() => import('../component/Homepage/ChooseCategory'))

// import CustomButton from '../component/Homepage/CustomButton'
// import HomeBlog from '../component/Homepage/HomeBlog'
// import HomeFAQs from '../component/Homepage/HomeFAQs'
// import Numbers from '../component/Homepage/Numbers'
// import Loader from '../component/loader/Loader'
// import ChooseCategory from '../component/Homepage/ChooseCategory'

function HomePage() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const PATHS = UpdatedPaths()
  const [ourAstrogersRef, showOurAstrogers] = useObserver()
  const screenCategory = useInitialScreenSizeCategory()
  const { t } = useTranslation()
  const loader = useSelector(state => state.masterSlice?.loader)
  const locationData = useSelector(state => state.masterSlice?.location)
  const dashboardCount = useSelector(state => state?.masterSlice?.dashboardCount)
  const homapageData = useSelector(state => state.HomePageSlice?.homapageList?.data || [])
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  // const [shouldLoadAfterScroll, setShouldLoadAfterScroll] = useState(false)
  // const observerRef = useRef(null)

  const shouldShowLoader = useMemo(() => loader?.is_loading && loader?.loding_type === 'login', [loader])

  if (shouldShowLoader) {
    return <Loader />
  }

  const request = useMemo(() => ({
    date: moment().format('DD/MM/YYYY'),
    time: moment().format('HH:mm'),
    lat: locationData?.coordinates?.[0] || '19.0760',
    lon: locationData?.coordinates?.[1] || '72.8777',
    tz: locationData?.tz || '5.5',
    tzon: locationData?.tz || '5.5',
    bop: locationData?.full_name || 'Mumbai',
    u_name: '',
    lang: LocalLanguage
  }), [locationData, LocalLanguage])

  useEffect(() => {
    const isValidLocation = locationData && Object.keys(locationData).length > 0 && locationData?.name
    const panchangeData = localStorage?.getItem(Constatnt?.PANCHANGE_KEY)
    const parsedData = panchangeData && panchangeData !== 'undefined' ? JSON.parse(panchangeData) : {}
    const isDataMissing = !hasAtLeastOneResponseData(parsedData?.response)
    const isLanguageChanged = parsedData?.request?.lang !== LocalLanguage
    if (isValidLocation) {
      if (isDataMissing || isLanguageChanged) {
        // let request = {
        //   date: moment().format('DD/MM/YYYY'),
        //   time: moment().format('HH:mm'),
        //   lat: locationData?.coordinates?.[0] || '19.0760',
        //   lon: locationData?.coordinates?.[1] || '72.8777',
        //   tz: locationData?.tz || '5.5',
        //   tzon: locationData?.tz || '5.5',
        //   bop: locationData?.full_name || 'Mumbai',
        //   u_name: '',
        //   lang: LocalLanguage
        // }
        dispatch(getDashboardPanchang(request))
      } else {
        dispatch(setPanchangDetails(parsedData))
      }
    } else {
    }
  }, [request])

  useEffect(() => {
    // if (!homapageData?.AstrologerList?.length) {
    dispatch(getHomePageListing())
    dispatch(getDashboardCount())
    // }
  }, [t])

  const slicedAstrologerList = useMemo(() => homapageData?.AstrologerList?.slice(0, 6), [homapageData, t])
  const slicedBlogList = useMemo(() => homapageData?.BlogList?.slice(0, 6), [homapageData, t])

  const cardData = useMemo(
    () => [
      {
        label: t('chat_with_astrologer'),
        icon: messageIcon,
        path: PATHS?.CHATWITHASTROLOGERS
      },
      {
        label: t('talk_to_astrologer'),
        icon: phoneIcon,
        path: PATHS?.CHATWITHASTROLOGERS
      },
      {
        label: t('astro_mall'),
        icon: astromall,
        path: PATHS?.ASTRO_MALL
      },
      {
        label: t('book_a_pooja'),
        icon: bookPooja,
        path: PATHS?.BOOK_POOJA_LIST
      }
    ],
    [t]
  )

  return (
    <>
      <HeroSection
        backImg={screenCategory === '412-or-below' ? backImgMobile : backImg}
        cardData={cardData}
        navigate={navigate}
        // observerRefss={observerRef}
        t={t}
      />

      <section className=''>
        <div className='container mx-auto flex flex-col gap-[20px] md:gap-[50px]  overflow-hidden  padding100'>
          <div className='flex items-center justify-center text-center '>
            <h2 className=' mb-4 commonHeadingH2 '>
              {t('choose_your')}{' '}
              <span className='commonheadingSpan pl-2'>{t('category')}</span>{' '}
            </h2>
          </div>
          <div className='' ref={ourAstrogersRef}>
            <ChooseCategory />
          </div>
        </div>
      </section>

      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
        <section className='colorBackground'>
          <div className='container mx-auto  flex flex-col gap-5 padding50 overflow-hidden '>
            <div className=''>
              <TodaysPanchangHomePage />
            </div>
          </div>
        </section>
        <section className=''>
          <div className='container mx-auto flex flex-col gap-[20px] md:gap-[50px]  overflow-hidden padding50'>
            <div className='flex items-center justify-center text-center'>
              <h2 className=' mb-4 commonHeadingH2 '>
                {t('Free')}{' '}
                <span className='commonheadingSpan'>{t('Horoscope')}</span>{' '}
              </h2>
            </div>
            <div className=''>
              <HoroscopeGrid />
            </div>
          </div>
        </section>
      </Suspense>

      {showOurAstrogers && <>
        <section className='newColorBack' >
          <div className='container mx-auto paddingTop50 paddingBottom50 flex flex-col gap-[30px] md:gap-[50px] z-10 relative'>
            <div className='flex items-center justify-center text-center flex-col gap-3'>
              <h2 className='mb-4 commonHeadingH2 '>
                {t('our')}{' '}
                <span className='commonheadingSpan'>{t('astrologers')}</span>
              </h2>
              <p className='commonHeadingP'>
                {dashboardCount?.totalAstrologerList}+
                {t('13000_best_astrologers_from')}
              </p>
            </div>

            <div className='homepage_astroList_part'>
              {/* <OurAstrologer AstrologerList={homapageData?.AstrologerList} /> */}
              <ChatWithAstrologerCard
                // astrologersList={homapageData?.AstrologerList?.slice(0, 4)}
                astrologersList={slicedAstrologerList}

                loading_type={loader?.loding_type}
              />
              {/* <OurAstrologer AstrologerList={astrologers} /> */}
              <div className='w-full flex items-center justify-center pt-6 mt-0 md:mt-[15px] '>
                <CustomButton
                  className=' py-3 px-[30px] '
                  onClick={() => {
                    navigate(PATHS?.OUR_ASTROLOGER)
                  }}
                >
                  {t('view_all')}
                </CustomButton>
              </div>
            </div>
          </div>
        </section>
        <section className=''>
          <div className='container mx-auto paddingTop50 paddingBottom50 mb-[50px]  md:mb-0 flex flex-col gap-[20px] md:gap-[50px]'>
            <div className='flex items-center justify-center text-center flex-col  gap-3'>
              <h2 className=' mb-4 commonHeadingH2  justify-center block'>
                {t('latest_from')}{' '}
                <span className='commonheadingSpan'>{t('blog')}</span>{' '}
              </h2>
              <p className='commonHeadingP md:max-w-[55%]'>
                {t('lorem_quis_bibendum_auctor')}
              </p>
            </div>
            <div className='homepage_blogList_part'>
              <HomeBlog BlogList={slicedBlogList} />
            </div>
          </div>
        </section>

        <section className='bg-[#FFFAFA]'>
          <div className='container mx-auto paddingTop50 paddingBottom50 flex flex-col gap-[30px]'>
            <Numbers />
          </div>
        </section>

        {/* <section>
          <div className='container  padding50 mx-auto flex flex-col gap-[20px] md:gap-[50px] mb-[50px]'>
            <div className=' flex items-center justify-center text-center flex-col gap-3 gap-3'>
              <h2 className=' mb-4 commonHeadingH2 gap-1 justify-center block'>
                {t('Meet_Our')}
                <span className='commonheadingSpan'> {t('Clients')}</span>{' '}
              </h2>
              <p className='commonHeadingP md:max-w-[55%]'>
                {t('lorem_quis_bibendum_auctor')}
              </p>
            </div>
            <TestimonialSlider />
          </div>
        </section> */}
        <HomeFAQs
          text={t('Frequently_Asked_Questions')}
          highlightText={t('Astrology')}
        />
      </>}

    </>
  )
}

export default React.memo(HomePage)
