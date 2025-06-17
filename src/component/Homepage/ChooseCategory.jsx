import { debounce } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { UpdatedPaths } from '../../routers/Paths'
import { allHoroScopeNavigation } from '../../utils/navigations/NavigationPage'
import daliyHoroscope from '/newThemeHomePage/dailyHore.svg'
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
    const handleResize = debounce(() => {
      setIsDesktop(window.innerWidth > 768)
    }, 200) // adjust 200ms as needed

    window.addEventListener('resize', handleResize)

    // Call once initially to set value
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      handleResize.cancel() // cancel any pending debounced calls
    }
  }, [])

  return (
    <>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          {articles.map(article => (
            <DesktopCard key={article.title} article={article} />
          ))}
        </div>
    </>
  )
}

export default React.memo(ChooseCategory)
