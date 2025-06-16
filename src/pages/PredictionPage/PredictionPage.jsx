import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

// Static assets
import cricket from '../../assets/img/prediction/cricket.png';
import stockmarket from '../../assets/img/prediction/stockmarket.png';

// Lazy-loaded components
const Loader2 = lazy(() => import('../../component/loader/Loader2'));
const ConfirmModal = lazy(() => import('../../component/Modals/ConfirmModal'));
const NoDataFound = lazy(() => import('../NoDataFound/NoDataFound'));

// Regular import (used inside logic, not as a component)
import { KundliChartType } from '../../component/NewKundaliComp/KundliVariabls';

// API services
import {
  genralPrediction,
  genralPredictionDetails,
  getDivisionalChartTh
} from '../../services/api/api.services';

// Utils
import {
  openLoader,
  closeLoder,
  formatDate,
  formatTime
} from '../../utils/CommonFunction';
import {
  Codes,
  DateFormat,
  LanguageOption,
  TimeFormat
} from '../../utils/CommonVariable';
import { Constatnt } from '../../utils/Constent';
import { UpdatedPaths } from '../../routers/Paths';
import CommonBanner from '../../component/CommonBanner';


const PredictionPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const loder = useSelector(state => state?.masterSlice?.loader)
  // const { loginUserData } = useSelector(state => state?.masterSlice?.loginUser)
  const loginUserData = JSON.parse(localStorage.getItem(Constatnt?.AUTH_KEY))
  const PATHS = UpdatedPaths()
  const [activeCard, setActiveCard] = useState('')
  const [activeCardData, setActiveCardData] = useState('')
  const [activeTab, setActiveTab] = useState('')

  const [fetchPrediction, setFetchPrediction] = useState([])
  const [predictionSubCategory, setPredictionSubCategory] = useState([])
  const [predictionContent, setPredictionContent] = useState([])
  // const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH;
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH

  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false)

  const dataSetting = allCharts => {
    const signs = [
      'Aries',
      'Taurus',
      'Gemini',
      'Cancer',
      'Leo',
      'Virgo',
      'Libra',
      'Scorpio',
      'Sagittarius',
      'Capricorn',
      'Aquarius',
      'Pisces'
    ]

    const ZodiacSigns = signs

    const zodiacFromName = name => ZodiacSigns?.find(sign => sign === name)
    const zodiacFromIndex = index => ZodiacSigns[(index - 1 + 12) % 12]
    const zodiacToIndex = sign => ZodiacSigns?.indexOf(sign) + 1

    const houseData = {}

    allCharts?.house_no?.forEach(item => {
      houseData[parseInt(item.number)] = item?.planets
    })

    const lagnaZodiacIndex = (() => {
      const house1 = houseData[1]
      if (!house1) return 0
      const ascendant = house1.find(p => p.name === 'As')
      if (!ascendant) return 0
      const sign = zodiacFromName(ascendant.zodiac)
      return sign ? zodiacToIndex(sign) : 0
    })()

    const chartData = []

    for (let house = 1; house <= 12; house++) {
      const zodiacIndex = ((lagnaZodiacIndex + house - 2) % 12) + 1
      const zodiac = zodiacFromIndex(zodiacIndex)
      if (!zodiac) continue

      const planets = houseData[house]?.map(p => p.name) || []
      const signIndex = signs.findIndex(sign => sign === zodiac)
      const signNo = signIndex !== -1 ? signIndex + 1 : null

      chartData.push({
        house,
        zodiac,
        signNo,
        planets
      })
    }
    setData(chartData)
  }

  const isValid = value => value !== undefined && value !== null && value !== ''
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    mode: 'free',
    slides: { perView: 5.5, spacing: 15 },
    breakpoints: {
      '(max-width: 1440px)': {
        slides: { perView: 3.5, spacing: 15 }
      },
      '(max-width: 1024px)': {
        slides: { perView: 3.5, spacing: 15 }
      },
      '(max-width: 768px)': {
        slides: { perView: 2.5, spacing: 10 }
      },
      '(max-width: 480px)': {
        slides: { perView: 1.5, spacing: 8 }
      }
    }
  })

  const [sliderRef2, instanceRef2] = useKeenSlider({
    loop: false,
    mode: 'free',
    slides: { perView: 5.5, spacing: 15 },
    breakpoints: {
        '(max-width: 1440px)': {
        slides: { perView: 4.5, spacing: 15 }
      },
      '(max-width: 768px)': {
        slides: { perView: 2.5, spacing: 10 }
      },
      '(max-width: 480px)': {
        slides: { perView: 1.5, spacing: 8 }
      }
    }
  })

  useEffect(() => {
    instanceRef.current?.update()
  }, [predictionSubCategory])

  useEffect(() => {
    instanceRef2.current?.update()
  }, [fetchPrediction])

  const onContentChange = (activeMainCard, activeSubCard) => {
    openLoader(dispatch, 'predictionPage')
    if (PATHS?.PREDICTION === location?.pathname) {
      if (data?.length > 0) {
        // request.type = 'kundli_prediction';
        genralPredictionDetails({
          lagnaData: data,
          user_ids: loginUserData?._id,
          category: activeMainCard,
          subcategory: activeSubCard,
          lang: LocalLanguage,
          type: 'kundli_prediction'
        }).then(response => {
          if (response?.code === Codes?.SUCCESS) {
            setPredictionContent([{ value: response?.data }])
            setActiveCardData(activeMainCard)
            setActiveTab(activeSubCard)
            closeLoder(dispatch)
          } else {
            closeLoder(dispatch)
          }
        })
      }
    } else if (PATHS?.GENERAL_PREDICTION === location?.pathname) {
      // request.type = 'general_prediction';
      genralPredictionDetails({
        // lagnaData: data,
        category: activeMainCard,
        subcategory: activeSubCard,
        lang: LocalLanguage,
        type: 'general_prediction'
      }).then(response => {
        if (response?.code === Codes?.SUCCESS) {
          setPredictionContent([{ value: response?.data }])
          setActiveCardData(activeMainCard)
          setActiveTab(activeSubCard)
          closeLoder(dispatch)
        } else {
          closeLoder(dispatch)
        }
      })
    }
  }

  useEffect(() => {
    if (PATHS?.PREDICTION === location?.pathname) {
      if (
        isValid(loginUserData?.dob) &&
        isValid(loginUserData?.time_of_birth) &&
        isValid(loginUserData?.tz) &&
        isValid(loginUserData?.longitude) &&
        isValid(loginUserData?.latitude)
      ) {
        let charRequest = {
          dob: formatDate(loginUserData?.dob, DateFormat?.DATE_SLASH_FORMAT),
          tob: formatTime(
            loginUserData?.time_of_birth,
            TimeFormat?.TIME_24_HOUR_FORMAT
          ),
          tz: loginUserData?.tz,
          lat: loginUserData?.latitude,
          lon: loginUserData?.longitude,
          lang: LocalLanguage,
          div: KundliChartType.D1,
          transit_date: moment().format('DD/MM/YYYY'),
          year: moment().format('YYYY')
        }
        getDivisionalChartTh(charRequest).then(chartRes => {
          if (chartRes?.code === Codes?.SUCCESS) {
            dataSetting(chartRes?.data?.response)
          } else {
            setData([])
          }
        })
      } else {
        // navigate(PATHS?.PROFILE_SETTING)
        // openModel(dispatch, 'open_predict_model')
        setShowModal(true)
      }
    }
  }, [LocalLanguage, location.pathname])

  useEffect(() => {
    const request = {};
    if (PATHS?.PREDICTION === location?.pathname) {
      if (data?.length > 0) {
        request.type = 'kundli_prediction';
      }
    } else if (PATHS?.GENERAL_PREDICTION === location?.pathname) {
      request.type = 'general_prediction';
    }

    if (Object.keys(request).length > 0) {
      openLoader(dispatch, 'predictionPage')
      genralPrediction(request).then(response => {

        if (response?.code === Codes?.SUCCESS) {
          setFetchPrediction(response?.data)
          setPredictionSubCategory(
            response?.data?.contentList[0]?.subcategories
          )

          setPredictionContent([
            response?.data?.contentList[0]?.subcategories[0]
          ])

          setActiveTab(response?.data?.contentList[0]?.subcategories[0]?.value)
          setActiveCardData(response?.data?.contentList[0].value)

          genralPredictionDetails({
            // topic: response?.data?.contentList[0].value + ' ' + response?.data?.contentList[0]?.subcategories[0].value,
            ...(PATHS?.PREDICTION === location?.pathname && { lagnaData: data, user_ids: loginUserData?._id }),
            ...(PATHS?.PREDICTION === location?.pathname ? { type: 'kundli_prediction' } : { type: 'general_prediction' }),
            category: response?.data?.contentList[0].value,
            subcategory: response?.data?.contentList[0]?.subcategories[0].value,
            lang: LocalLanguage
          }).then(response => {
            if (response?.code === Codes?.SUCCESS) {
              setPredictionContent([{ value: response?.data }])
              closeLoder(dispatch)
            } else {
              closeLoder(dispatch)
            }
          })
          // closeLoder(dispatch)
        } else {
          setFetchPrediction([])
          closeLoder(dispatch)
        }
      })
    }
  }, [LocalLanguage, data, location.pathname])

  useEffect(() => {
    if (predictionSubCategory.length) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }, [predictionSubCategory, fetchPrediction, data])

  const formatWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <CommonBanner text={PATHS?.PREDICTION === location?.pathname ? t('kundali_prediction') : PATHS?.GENERAL_PREDICTION === location?.pathname ? t('genral_prediction') : t('prediction')} />

      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      {showModal ? (
        <div className='col-span-full flex justify-center items-center h-full mt-5'>
          <NoDataFound />
        </div>
      ) : (<>
        <section className='container mx-auto px-4 paddingTop100'>
          {fetchPrediction?.contentList?.length > 0 && (
            <div ref={sliderRef2} className='keen-slider py-0 flex '>

              {fetchPrediction.contentList.map((item, index) => {
                const isActive = activeCardData === item.value
                return (
            <div
  key={index}
  className="keen-slider__slide !w-auto min-w-[160px] sm:min-w-[180px] md:min-w-[200px] box_shadow_common new_border rounded-[8px]"
>
  <div
    onClick={() => {
      setActiveCard(index)
      setActiveCardData(item.value)
      onContentChange(item.value, item?.subcategories?.[0]?.value)
      setPredictionSubCategory(item?.subcategories)
      setActiveTab(item?.subcategories?.[0]?.value)
    }}
    className={`w-full h-full rounded-[8px] flex flex-col items-center justify-center cursor-pointer 
    p-[6px] sm:p-[10px] gap-[6px] text-center transition-all duration-300 box_shadow_common
    ${isActive ? 'gradient-background text-white' : 'bg-white new_body_font'}`}
  >
    <div
      className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] md:w-[50px] md:h-[50px] 
      flex items-center justify-center commonLightBack rounded-full"
    >
      <img
        src={item?.image}
        alt={item.category}
        className="object-contain w-full h-full"
      />
    </div>
    <div className={` ${isActive ? ' text-white' :""}`}>
      {item?.category}
    </div>
  </div>
</div>


                )
              })}
            </div>
          )}
        </section>

        <section className='container mx-auto px-4 paddingTop50 overflow-hidden'>
          <div ref={sliderRef} className='keen-slider px-0'>
            {predictionSubCategory.map((tab, index) => {
              const isActive = activeTab === tab?.value
              const roundedClass =
                index === 0
                  ? 'rounded-l-[10px]'
                  : index === predictionSubCategory.length - 1
                    ? 'rounded-r-[10px]'
                    : 'rounded-none'

              return (
                <div key={tab?._id} className='keen-slider__slide !w-auto '>
                  <button
                    onClick={() => {
                      setActiveTab(tab?.value)
                      onContentChange(activeCardData, tab?.value)
                    }}
                    className={`w-full min-w-max whitespace-nowrap px-[15px] py-[10px] md:px-[20px] md:py-[27px] text-[14px] md:text-[16px] font-medium transition-all duration-200 new_border box_shadow_common cursor-pointer
            ${isActive ? 'gradient-background text-white' : 'bg-white website_new_color'}
            ${roundedClass}`}
                  >
                    {tab?.name || tab}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {loder?.is_loading && loder?.loding_type === 'predictionPage' ? (
          <div className=''>
            <div className='pb-10 pt-24 min-h-[100vh]'>
              <Loader2 />
            </div>
          </div>
        ) : (
          <>
            <section className='mx-auto  flex flex-col gap-[50px] padding50 container'>
              {/* Lower cards content */}
              {predictionContent?.length > 0 &&
                predictionContent?.map((sub, i) => (
                  <div
                    key={i}
                    className='flex flex-col gap-[20px] bg-white rounded-[10px] p-[15px] md:p-[30px] new_border'
                  >
                    <p
                      className='commonQuesP '
                    >
                      {formatWithLineBreaks(sub?.value)}
                    </p>
                  </div>
                ))}
            </section>
          </>
        )}
      </>)}

      <ConfirmModal
        isOpen={showModal}
        title={t('title_model')}
        description={t('complate_profile_desc')}
        okText={t('go_to_profile_page')}
        cancelText={t('cancel')}
        onConfirm={() => {
          navigate(PATHS?.PROFILE_SETTING)
        }}
        onCancel={() => {
          navigate(PATHS?.HOMEPAGE)
          setShowModal(false)
        }}
      />
        </Suspense>

    </>
  )
}

export default React.memo(PredictionPage)
