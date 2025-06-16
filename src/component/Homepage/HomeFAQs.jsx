import { memo, useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { UpdatedPaths } from '../../routers/Paths'

const HomeFAQs = ({ highlightText, text, subHeading }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const PATHS = UpdatedPaths()
  const location = useLocation()
  const listFAQs = useSelector(state => state.HomePageSlice?.listFAQs) || {}

  // const [updatedFaqs, setUpdatedFaqs] = useState([])

  const updatedFaqs = useMemo(() => {
    const typeMap = {
      [PATHS.HOMEPAGE]: 'home_screen',
      [PATHS.FREEKUNDALI]: 'kundli_matching',
      [PATHS.KUNDALI_MATCHING]: 'kundli_matching',
      [PATHS.CHATWITHASTROLOGERS]: 'kundli_matching',
      [PATHS.TODAYS_PANCHANGAM]: 'today_panchang',
    };

    const pathname = location.pathname;
    const faqType = pathname.split('/')[1] === 'horoscope' ? 'horoscope' : typeMap[pathname] || 'home_screen';

    return listFAQs?.data?.faqList?.filter((faq) => faq.type === faqType) || [];
  }, [listFAQs, location.pathname, PATHS]);

  // useEffect(() => {
  //   if (location.pathname === PATHS.HOMEPAGE) {
  //     const filterFAQs = listFAQs?.data?.faqList?.filter(
  //       faq => faq.type == 'home_screen'
  //     )
  //     setUpdatedFaqs(filterFAQs)
  //   } else if (
  //     location.pathname === PATHS.FREEKUNDALI ||
  //     location.pathname === PATHS.KUNDALI_MATCHING ||
  //     location.pathname === PATHS.CHATWITHASTROLOGERS
  //   ) {
  //     const filterFAQs = listFAQs?.data?.faqList?.filter(
  //       faq => faq.type == 'kundli_matching'
  //     )
  //     setUpdatedFaqs(filterFAQs)
  //   } else if (location.pathname.split('/')[1] === 'horoscope') {
  //     const filterFAQs = listFAQs?.data?.faqList?.filter(
  //       faq => faq.type == 'horoscope'
  //     )
  //     setUpdatedFaqs(filterFAQs)
  //   } else if (location.pathname == PATHS.TODAYS_PANCHANGAM) {
  //     const filterFAQs = listFAQs?.data?.faqList?.filter(
  //       faq => faq.type == 'today_panchang'
  //     )
  //     setUpdatedFaqs(filterFAQs)
  //   } else {
  //     const filterFAQs = listFAQs?.data?.faqList?.filter(
  //       faq => faq.type == 'home_screen'
  //     )
  //     setUpdatedFaqs(filterFAQs)
  //   }
  // }, [listFAQs, pageOption, location.pathname])










  // const toggleAccordion = index => {
  //   setActiveIndex(activeIndex === index ? null : index)
  // }

  const toggleAccordion = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section className=''>
      <div className='container mx-auto padding50  flex flex-col gap-[20px] md:gap-10 '>
        <div className='flex flex-col items-center justify-center text-center gap-3 lg:gap-2'>
          <h2 className='mb-2 commonHeadingH2  flex-wrap justify-center'>
            {text} <span className='commonheadingSpan'>{highlightText}</span>
          </h2>
          {subHeading && (
            <p className='commonHeadingP max-w-[80%] md:max-w-[55%]'>
              {subHeading}
            </p>
          )}
        </div>

        <div className=''>
          <div className='accordion  md:px-18'>
            {updatedFaqs?.map((item, index) => (
              <div
                className='accordion-item my-2 px-3 md:px-7 py-1 md:py-4 '
                key={index}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index ? 'true' : 'false'}
                >
                  <span className='accordion-title pe-8 new_body_font'>
                    {item.question}
                  </span>
                  <span className=' icon ' aria-hidden='true'></span>
                </button>
                <div
                  className='accordion-content transition-all'
                  style={{
                    maxHeight: activeIndex === index ? '9em' : '0',
                    opacity: activeIndex === index ? '1' : '0'
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(HomeFAQs)
