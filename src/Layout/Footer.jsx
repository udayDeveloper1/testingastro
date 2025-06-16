import React, { lazy, useCallback, useEffect, useMemo } from 'react'
import facebookIcon from '../assets/img/Icons/facebook.svg'
import instagram from '../assets/img/Icons/instagram.svg'
import twitter from '../assets/img/Icons/twitter.svg'
import youtube from '../assets/img/Icons/youtube.svg'
import appStore from '/homepage/applePlay.svg'
import footerLogo from '/homepage/footerLogo.svg'
import googlePlay from '/homepage/googlePlay.svg'
import right_arrow_news_letter from '/homepage/right_arrow_news_letter.svg'
import { BsThreads } from "react-icons/bs";
import { FaWhatsapp } from "react-icons/fa";


import { Link, useNavigate } from 'react-router'
import '../assets/css/footer.css'
// import NewsletterComp from '../component/Homepage/NewsLatterComp'
// import { PATHS } from '../routers/Paths'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { UpdatedPaths } from '../routers/Paths'
import { addNewsLatter } from '../services/api/api.services'
import { TOAST_ERROR, TOAST_SUCCESS } from '../utils/CommonFunction'
import { Codes, InputRegex } from '../utils/CommonVariable'
import { allHoroScopeNavigation } from '../utils/navigations/NavigationPage'
const CustomButton = lazy(() => import('../component/Homepage/CustomButton'))

function Footer() {
  const navigate = useNavigate()
  const PATHS = UpdatedPaths()
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmitData = useCallback(async data => {
    try {
      let request = {
        email: data?.email
      }
      addNewsLatter(request).then(response => {
        if (response?.code === Codes.SUCCESS) {
          TOAST_SUCCESS(response?.message)
          reset()
        } else {
          TOAST_ERROR(response.message)
        }
      })
    } catch (error) {
      TOAST_ERROR('Somthing went wrong')
    }
  }, [])

  const translatedServices = useMemo(() => {
    return [
      {
        label: 'free_kundli',
        path: PATHS?.FREEKUNDALI,
        translatedLabel: t('free_kundli')
      },
      {
        label: 'kundli_matching',
        path: PATHS?.KUNDALI_MATCHING,
        translatedLabel: t('kundli_matching')
      },
      {
        label: 'chat_with_astrologer',
        path: PATHS?.CHATWITHASTROLOGERS,
        translatedLabel: t('chat_with_astrologer')
      },
      {
        label: 'live_astrology_consulations',
        path: PATHS?.CHATWITHASTROLOGERS,
        translatedLabel: t('live_astrology_consulations')
      },
      {
        label: 'panchang_muharat',
        path: PATHS?.TODAYS_PANCHANGAM,
        translatedLabel: t('panchang_muharat')
      }
    ]
  }, [PATHS, t])

  const ServiceItem = React.memo(({ label, path, onNavigate }) => {
    const handleClick = () => onNavigate(path)
    return (
      <li onClick={handleClick} className='cursor_pointer new_body_font'>
        {label}
      </li>
    )
  })

  const handleNavigate = useCallback(
    path => {
      navigate(path)
    },
    [navigate]
  )

  const translatedHoroscopeItems = useMemo(
    () => [
      {
        label: 'weekly_horoscop',
        slug: 'weekly-horoscope',
        path: PATHS?.ALL_HOROSCOPE,
        translatedLabel: t('weekly_horoscop')
      },
      // {
      //   label: 'monthly_horoscop',
      //   slug: 'daily-horoscope',
      //   path: PATHS?.ALL_HOROSCOPE,
      //   translatedLabel: t('monthly_horoscop')
      // },
      {
        label: 'yearly_horoscop',
        slug: 'yearly-horoscope',
        path: PATHS?.ALL_HOROSCOPE,
        translatedLabel: t('yearly_horoscop')
      },
      {
        label: 'privarcy_policy',
        slug: null,
        path: PATHS?.PRIVACY_POLICY,
        translatedLabel: t('privarcy_policy')
      },
      {
        label: 'termsConditions',
        slug: null,
        path: PATHS?.TERMS_CONDITIONS,
        translatedLabel: t('terms_conditions')
      },
      {
        label: 'aboutus',
        slug: null,
        path: PATHS?.ABOUT_US,
        translatedLabel: t('about_us')
      },

      {
        label: 'contact_us',
        slug: null,
        path: PATHS?.CONTACT_US,
        translatedLabel: t('contact_us')
      },
    ],
    [PATHS, t]
  )

  const handleHoroscopeNavigate = useCallback(
    (slug, path) => {
      if (slug) {
        allHoroScopeNavigation(navigate, slug, path)
      } else {
        navigate(path)
      }
    },
    [navigate]
  )

  const HoroscopeItem = React.memo(({ slug, path, translatedLabel }) => {
    const onClick = () => handleHoroscopeNavigate(slug, path)
    return (
      <li onClick={onClick} className='cursor_pointer'>
        {translatedLabel}
      </li>
    )
  })

  const storeImages = useMemo(
    () => (
      <>
        <img
          src={googlePlay}
          alt='Google Play'
          className='w-36 cursor-pointer'
          width={144}
          height={42.92}
          decoding='async'
          loading='lazy'
        />
        <img
          src={appStore}
          alt='App Store'
          className='w-36 cursor-pointer'
          width={144}
          height={42.92}
          decoding='async'
          loading='lazy'
        />
      </>
    ),
    []
  )

  const emailErrorMessage = useMemo(
    () => errors?.email?.message || null,
    [errors?.email]
  )

  const socialLinks = [
    { href: 'https://www.facebook.com/people/Chat-My-Astrologer/61577001614547/', icon: facebookIcon, alt: 'Facebook' },
    { href: 'https://www.instagram.com/chatmyastrologer/', icon: instagram, alt: 'Instagram' },
    { href: 'https://x.com/chatmyastro', icon: twitter, alt: 'Twitter' },
    { href: 'https://www.youtube.com/@ChatMyAstrologer', icon: youtube, alt: 'YouTube' }
  ]

  const FooterLeftColumn = React.memo(({ t }) => {
    const socialIcons = useMemo(
      () =>
        socialLinks.map(({ href, icon, alt }) => (
          <a
            key={alt}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 flex items-center justify-center rounded-full transition'
          >
            <img
              src={icon}
              alt={alt}
              width={40}
              height={41}
              decoding='async'
              loading='lazy'
            />
          </a>
        )),
      []
    )

    return (
      <div className='col-span-4 md:col-span-1 flex flex-col text-center md:text-left gap-[15px]'>
        <img
          src={footerLogo}
          alt='Footer Logo'
          width={221}
          height={67}
          className='mx-auto md:mx-0 !mb-0'
          decoding='async'
          loading='lazy'
        />

        <p className='commonQuesP mb-[20px] md:mb-[35px] lg:mb-[45px]'>
          {t('footer_text')}
        </p>

        <div className='flex justify-center md:justify-start space-x-3 md:mt-[20px]'>
          {socialIcons}
          <a
            key={"thread"}
            href={"https://www.threads.com/@chatmyastrologer"}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 flex items-center justify-center rounded-full transition'
          >
            <div className='footer_socilaIcon_border'>
              <BsThreads className="footer_social_icon " />
            </div></a>
          <a
            key={"whats-app"}
            href={"https://whatsapp.com/channel/0029VbAomKXBPzjdTLei0j1I"}
            target='_blank'
            rel='noopener noreferrer'
            className='w-10 h-10 flex items-center justify-center rounded-full transition'
          >
            <div className='footer_socilaIcon_border'>
              <FaWhatsapp className="footer_social_icon " />
            </div></a>
        </div>
      </div>
    )
  })

  useEffect(() => {
    reset()
  }, [location.pathname])

  return (
    <footer>
      <div className='footerBackground '>
        <div className=''>
          {/* <NewsletterComp /> */}
          <div className='container mx-auto new_body_font pb-0 py-12 pt-24 px-6 padding100'>
            {/* Main Flex Container */}
            <div className='grid grid-cols-4 gap-6 md:gap-8'>
              {/* Left Section */}
              {/* <div className='col-span-4 md:col-span-1 flex flex-col  text-center md:text-left gap-[15px]'>
                <img
                  src={footerLogo}
                  alt='Footer Logo'
                  className='mx-auto md:mx-0  !mb-0 lg:!mb-[0]'
                  width={221}
                  height={67}
                  decoding='async'
                  loading='lazy'
                />
                <p className='commonQuesP mb-[20px] md:mb-[35px] lg:mb-[45px] '>
                  {t('footer_text')}
                </p>

                <div className='flex justify-center md:justify-start space-x-3 md:mt-[20px]'>
                  <a
                    href='https://facebook.com'
                    className='w-10 h-10 flex items-center justify-center rounded-full transition new_body_font'
                  >
       
                    <img
                      src={facebookIcon}
                      alt='facebook'
                      width={40}
                      height={41}
                      decoding='async'
                      loading='lazy'
                    />
                  </a>
                  <a
                    href='https://instagram.com'
                    className='w-10 h-10 flex items-center justify-center rounded-full transition'
                  >
                    <img
                      src={instagram}
                      alt='facebook'
                      width={40}
                      height={41}
                      decoding='async'
                      loading='lazy'
                    />
                  </a>
                  <a
                    href='https://x.com'
                    className='w-10 h-10 flex items-center justify-center rounded-full transition'
                  >
                    <img
                      src={twitter}
                      alt='facebook'
                      width={40}
                      height={41}
                      decoding='async'
                      loading='lazy'
                    />
                  </a>
                  <a
                    href='https://youtube.com'
                    className='w-10 h-10 flex items-center justify-center rounded-full transition'
                  >
                    <img
                      src={youtube}
                      alt='facebook'
                      width={40}
                      height={41}
                      decoding='async'
                      loading='lazy'
                    />
                  </a>
                </div>
              </div> */}
              <FooterLeftColumn t={t} />
              <hr className='w-full block md:hidden opacity-20 col-span-4' />

              {/* Services Section */}

              <div className='col-span-2 md:col-span-1 flex flex-col justify-start  items-center md:items-center lg:ps-[40px]'>
                <div>
                  <h3 className='font-semibold !mb-5 lg:!mb-6 text-[20px]'>
                    {t('Our_Services')}
                  </h3>
                  <ul className=' text-[16px] leading-[23px] flex flex-col gap-[15px] md:gap-[20px] items-start w-full'>
                    {translatedServices.map(
                      ({ label, path, translatedLabel }) => (
                        <ServiceItem
                          key={label}
                          label={translatedLabel} // Already translated
                          path={path}
                          onNavigate={handleNavigate}
                        />
                      )
                    )}
                  </ul>
                </div>
              </div>

              {/* Useful Links Section */}
              <div className='col-span-2 md:col-span-1 flex flex-col justify-start  items-center md:items-start lg:ps-[40px]'>
                <div>
                  <h3 className='font-semibold !mb-5 lg:!mb-6 text-[20px]'>
                    {t('Useful_Links')}
                  </h3>
                  <ul
                    className={`text-[16px] leading-[23px] flex flex-col items-start gap-[15px] md:gap-[20px] `}
                  >
                    {translatedHoroscopeItems.map(
                      ({ slug, path, translatedLabel, label }) => (
                        <HoroscopeItem
                          key={label}
                          slug={slug}
                          path={path}
                          translatedLabel={translatedLabel}
                        />
                      )
                    )}
                  </ul>
                </div>
              </div>
              <hr className='w-full block md:hidden opacity-20 col-span-4' />

              <div className='col-span-4 md:col-span-1 text-center md:text-left flex flex-col justify-start md:items-end'>
                <div>
                  <h3 className='font-semibold !mb-5 lg:!mb-[15px] text-[20px]'>
                    {t('Subscribe_Our_Newletter')}
                  </h3>

                  <p className='text-[14px] leading-[23px] mb-[15px] md:mb-[30px]'>
                    {t('Download_App')}
                  </p>

                  <div className='lg:col-span-5 xl:col-span-6 w-full space-y-2 mb-[15px] md:mb-[30px] flex justify-center md:justify-start'>
                    <form
                      onSubmit={handleSubmit(onSubmitData)}
                      className='w-full flex justify-center md:justify-start'
                    >
                      <div className='flex flex-row items-stretch px-2 rounded-[10px] py-2 md:ps-[20px] w-full bg-white news_letter_bg'>
                        <input
                          type='email'
                          placeholder={t('enter_email')}
                          className='flex-1 py-[9px] text-[#343434] outline-none placeholder-[#343434] text-[16px] font-medium w-full'
                          {...register('email', {
                            required: t('enter_valid_email'),
                            pattern: {
                              value: InputRegex?.EMAIL_REGEX,
                              message: t('enter_valid_email')
                            }
                          })}
                        />
                        <CustomButton className='px-3 py-[0px] text-center font-semibold ronded-[10px] !border-none h-full newsLetterIcon'>
                          <img
                            src={right_arrow_news_letter}
                            alt='right-arrow'
                            width={16}
                            height={15}
                            className='transition-all'
                          />
                        </CustomButton>
                      </div>
                    </form>

                    {emailErrorMessage && (
                      <p className='text-red pl-2'>{emailErrorMessage}</p>
                    )}
                  </div>

                  <div className='flex items-center flex-wrap sm:items-start sm:flex-row justify-center md:justify-start gap-2'>
                    {storeImages}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className=' text-white text-center p-4 bg_website_color footer_line_2'>
        <Link to={'/'}>
          <p className='mb-0'>
            &copy; {new Date().getFullYear()} Tracewave Transparency PVT LTD. All Rights Reserved.
          </p>
        </Link>
      </div>
    </footer>
  )
}

export default React.memo(Footer)
