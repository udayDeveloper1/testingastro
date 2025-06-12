import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { UpdatedPaths } from '../../routers/Paths'
import { allHoroScopeNavigation } from '../../utils/navigations/NavigationPage'
import daliyHoroscope from '/newThemeHomePage/daily.svg'
import freeKundali from '/newThemeHomePage/freeKundali.svg'
import kundaliMatching from '/newThemeHomePage/Matching.svg'
import todaysPanchang from '/newThemeHomePage/Panchang.svg'
// import { PATHS } from "../../routers/Paths";

const ChooseCategory = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const PATHS = UpdatedPaths()
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768)

  const articles = useMemo(() => {
    return [
      {
        title: t('free_kundli'),
        image: freeKundali,
        description: t('free_kundli_text'),
        buttonText: 'View More',
        link: PATHS?.FREEKUNDALI
      },
      {
        title: t('kundli_matching'),
        image: kundaliMatching,
        description: t('kundli_matching_text'),
        buttonText: 'View More',
        link: PATHS?.KUNDALI_MATCHING
      },
      {
        title: t('Daily_Horoscope'),
        image: daliyHoroscope,
        description: t('Daily_Horoscope_text'),
        buttonText: 'View More',
        link: 'navigate_horoscop'
      },
      {
        title: t('Todays_Panchang'),
        image: todaysPanchang,
        description: t('Todays_Panchang_text'),
        buttonText: 'View More',
        link: PATHS?.TODAYS_PANCHANGAM
      }
    ]
  }, [t])

  // const settings = useMemo(
  //   () => ({
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1,
  //     autoplay: false,
  //     autoplaySpeed: 3000,
  //     arrow: false
  //     // arrows: true,
  //   }),
  //   []
  // )

  // const MobileSlide = React.memo(({ article }) => (
  //   <div className='px-2 py-3' onClick={() => handleNavigate(article.link)}>
  //     <div className='chooseCategoryCard h-full'>
  //       <div
  //         className='bg-white p-9 rounded-lg flex flex-col items-center justify-center gap-8 h-full'
  //         style={{ boxShadow: '0px 0px 34px 0px #0000000D' }}
  //       >
  //         <div className='category_slide_img_div flex justify-center items-center rounded-full'>
  //           <img
  //             src={article.image}
  //             alt={article.title}
  //             loading='lazy'
  //             decoding='async'
  //             className='w-full h-40 rounded-md category_slide_img object-contain'
  //             height={60}
  //             width={60}
  //           />
  //         </div>
  //         <h3 className='text-lg font-semibold mt-2'>{article.title}</h3>
  //       </div>
  //     </div>
  //   </div>
  // ))

  const DesktopCard = React.memo(({ article }) => (
    <div
      className=' cursor-pointer'
      onClick={() => handleNavigate(article.link)}
    >
      <div className='chooseCategoryCard h-full'>
        <div className='bg-white p-[20px] md:p-9 box_shadow_common rounded-lg flex flex-col items-center  gap-[10px] h-full'>
          <div className='category_slide_img_div flex justify-center items-center rounded-full'>
            <img
              src={article.image}
              alt={article.title}
              // loading='lazy'
              decoding='async'
              className='w-full h-20 md:h-40 rounded-md category_slide_img object-contain'
              width={60}
              height={60}
            />
          </div>
          <h3 className='text-[16px] md:text-[20px] font-medium md:font-semibold mt-2 text-center text-[#343434] '>
            {article.title}
          </h3>
          {isDesktop && (
            <p className='commonQuesP text-center break-words'>
              {article.description}
            </p>
          )}
        </div>
      </div>
    </div>
  ))

  const handleNavigate = useCallback(
    link => {
      if (link === 'navigate_horoscop') {
        allHoroScopeNavigation(
          navigate,
          'daily-horoscope',
          PATHS?.ALL_HOROSCOPE
        )
      } else {
        navigate(link)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* {isDesktop ? (
        <div className="flex flex-wrap justify-between gap-y-4">
          {articles.map((article) => (
            <DesktopCard key={article.title} article={article} />
          ))}
        </div>
      ) : (
        <Slider {...settings} className="chooseCategorySlider">
          {articles.map((article) => (
            <MobileSlide key={article.title} article={article} />
          ))}
        </Slider>
      )} */}

      <>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {articles.map(article => (
            <DesktopCard key={article.title} article={article} />
          ))}
        </div>
      </>
    </>
  )
}

export default React.memo(ChooseCategory)
