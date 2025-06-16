import { ChevronDown, ChevronUp, Cog, Menu, X } from 'lucide-react'
import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router'
import '../assets/css/navbar.css'
import profileImg from '../assets/img/navbar/profileImg.webp'
import { getFAQList } from '../storemain/slice/HompageSlice'
import logoWeb from '/newThemeHomePage/logoWeb.svg'
const PhoneAuthModals = lazy(() => import('../component/auth/PhoneAuthModals'))
const ConfirmModal = lazy(() => import('../component/Modals/ConfirmModal'))
const LanguageDropdown = lazy(() =>
  import('../component/Homepage/LanguageDropDown')
)
const CustomButton = lazy(() => import('../component/Homepage/CustomButton'))
const ProfileIconWithDropdown = lazy(() => import('../component/Profile/ProfileIconWithDropdown'))

import { DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import PhoneAuthModal from '../component/auth/PhoneAuthModals'
import { UpdatedPaths } from '../routers/Paths'
import {
  changeLanguage,
  getGeoSearchLoaction,
  // resetStore,
  setFilterSearch,
  setFilterValue,
  setOnSubmitFilter,
  setPageScroll,
  setShortValue,
  setUserLoginData
} from '../storemain/slice/MasterSlice'
import {
  getCurrentCity,
  logoutRedirection,
  openModel
} from /*  */ '../utils/CommonFunction'
import { LanguageOption } from '../utils/CommonVariable'
import { Constatnt } from '../utils/Constent'
import {
  allHoroScopeNavigation,
  getBasePath
} from '../utils/navigations/NavigationPage'
import {
  setDispatcher,
  setNavigator
} from '../utils/navigations/NavigationService'
import walletIcon from '/newThemeHomePage/walletIcon.svg'

function NavBar() {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const PATHS = UpdatedPaths()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [checkPage, setCheckPage] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const LOGIN_KEY = localStorage.getItem(Constatnt?.LOGIN_KEY)
  const LANGUAGE_KEY = localStorage.getItem(Constatnt?.LANGUAGE_KEY)
  const AUTH_KEY = JSON.parse(localStorage.getItem(Constatnt?.AUTH_KEY))
  const modal = useSelector(state => state?.masterSlice?.modal)
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH;

  const labels = useMemo(
    () => ({
      chat: t('chat_with_astrologer'),
      kundli: t('kundali'),
      match: t('kundli_matching'),
      panchang: t('Todays_Panchang'),
      prediction: t('prediction'),
      horoscopes: t('horoscopes'),
      muhurat: t('Muhurat'),
      login: t('login'),
      marriage: t('Marriage_Muhurat'),
      bhumi: t('bhumi_Pujan_Muhurat'),
      namakaran: t('namakaran_Muhurat'),
      rahu: t('rahu_kaal'),
      offers: t('Offers'),
      blog: t('blogs'),
      genral_prediction: t('genral_prediction'),
      kundali_prediction: t('kundali_prediction'),
      choghadiya: t('choghadiya'),
    }),
    [LocalLanguage]
  )

  const topNavItems = useMemo(
    () => [
      {
        key: 'blogs',
        label: labels.blog,
        to: PATHS?.BLOG,
        type: 'link'
      }
    ],
    [labels]
  )

  const TopNavItem = React.memo(({ item, pathname }) => {

    const isActive = item.value && pathname.includes(item.value)
    if (item.type === 'link') {
      return (
        <Link to={item.to} className='customDisplayNavbar topNavLink'>
          {item.label}
        </Link>
      )
    }

    if (item.type === 'dropdown') {
      const dropdownItems = useMemo(() => {
        if (item.type !== 'dropdown') return []
        return item.children.map(child => ({
          key: child.key,
          label: (
            <div
              onClick={child.onClick}
              className={`py-1 font-[500] capitalize ${pathname.includes(child.value) ? 'nav_active_part' : ''
                } navbar_part`}
            >
              {child.label}
            </div>
          )
        }))
      }, [item.type, item.children, pathname])

      return (
        <Dropdown menu={{ items: dropdownItems }} trigger={['hover']}>
          <div
            className={`hidden md:block topNavLink cursor-pointer ${isActive ? 'active' : ''
              }`}
          >
            <p className='mb-0'>{item.label}</p>
          </div>
        </Dropdown>
      )

    }

    if (item.type === 'action') {
      return (
        <div
          onClick={item.onClick}
          className={`hidden md:block topNavLink cursor-pointer ${isActive ? 'active' : ''
            }`}
        >
          {item.label}
        </div>
      )
    }

    return null
  })

  const getHoroscopeNavItem = useCallback(
    (key, labelKey) => ({
      label: t(labelKey),
      key,
      onClick: () =>
        allHoroScopeNavigation(
          navigate,
          `${key}-horoscope`,
          PATHS?.ALL_HOROSCOPE
        ),
      value: `horoscope/${key}-horoscope`
    }),
    [navigate, LocalLanguage]
  )

  const openLoginModal = useCallback(() => setIsModalOpen(true), [])

  const horoscopeChildren = useMemo(
    () => [
      getHoroscopeNavItem('daily', 'Daily_Horoscope'),
      getHoroscopeNavItem('tomorrow', 'Tomorrow_Horoscope'),
      getHoroscopeNavItem('yesterday', 'Yesterday_Horoscope'),
      getHoroscopeNavItem('weekly', 'Weekly_Horoscope'),
      getHoroscopeNavItem('yearly', 'Yearly_Horoscope')
    ],
    [getHoroscopeNavItem]
  )

  const getPredictionNavItem = useCallback(
    (key, labelKey, path, requiresLogin = false) => ({
      label: t(labelKey),
      key,
      onClick: () =>
        requiresLogin && !LOGIN_KEY
          ? openModel(dispatch, 'nav_login')
          : navigate(path),
      value: path
    }),
    [navigate, dispatch, LocalLanguage, LOGIN_KEY]
  )

  const predictionChildren = useMemo(
    () => [
      getPredictionNavItem(
        'marriage',
        'genral_prediction',
        PATHS.GENERAL_PREDICTION
      ),
      getPredictionNavItem(
        'kundali_prediction',
        'kundali_prediction',
        PATHS.PREDICTION,
        true // requires login
      )
    ],
    [getPredictionNavItem, LocalLanguage]
  )

  const getMuhuratNavItem = useCallback(
    (key, labelKey, path) => ({
      label: t(labelKey), key, onClick: () => navigate(path),
      value: path
    }),
    [navigate, LocalLanguage]
  )

  const muhuratChildren = useMemo(
    () => [
      getMuhuratNavItem('marriage', 'Marriage_Muhurat', PATHS.MARRIAGE_MUHURAT),
      getMuhuratNavItem('bhumi', 'bhumi_Pujan_Muhurat', PATHS.BHUMIPUJA_MUHURAT),
      getMuhuratNavItem('namakaran', 'namakaran_Muhurat', PATHS.NAMKARAN_MUHURAT),
      getMuhuratNavItem('choghadiya', 'choghadiya', PATHS.CHOGADIYA),
      getMuhuratNavItem('rahu', 'rahu_kaal', PATHS.RAHU_KAAL),

    ],
    [getMuhuratNavItem]
  )

  const desktopNavItems = useMemo(
    () => [
      {
        key: 'chat',
        label: labels.chat,
        to: PATHS?.CHATWITHASTROLOGERS,
        type: 'link',
        highLightClass: ""
      },
      {
        key: 'kundli',
        label: labels.kundli,
        to: PATHS?.FREEKUNDALI,
        type: 'link',
        highLightClass: ""
      },
      {
        key: 'match',
        label: labels.match,
        to: PATHS?.KUNDALI_MATCHING,
        type: 'link',
        highLightClass: ""
      },
      {
        key: 'panchang',
        label: labels.panchang,
        type: 'link',
        to: PATHS?.TODAYS_PANCHANGAM,
        highLightClass: ""
      },
      {
        key: 'prediction',
        label: labels.prediction,
        type: 'dropdown',
        children: predictionChildren,
        highLightClass: "highlight_tab_nav_item"
      },
      {
        key: 'horoscope',
        label: labels.horoscopes,
        type: 'dropdown',
        value: '/horoscope/',
        children: horoscopeChildren,
        highLightClass: ""
      },
      {
        key: 'muhurat',
        label: labels.muhurat,
        type: 'dropdown',
        children: muhuratChildren,
        highLightClass: ""
      },
      {
        key: 'login',
        label: labels.login,
        type: 'button',
        show: !LOGIN_KEY,
        onClick: openLoginModal,
        highLightClass: ""
      }
    ],
    [t, LOGIN_KEY, navigate]
  )

  const horoscopeDropdownItems = useMemo(
    () =>
      horoscopeChildren.map(child => ({
        key: child.key,
        label: (
          <div
            onClick={child.onClick}
            className={`py-1 font-[500] capitalize ${
              // location.pathname.includes(child.value) ? 'nav_active_part' : ''
              location.pathname.toLowerCase() ===
                `/horoscope/${child.key.toLowerCase()}-horoscope`
                ? 'nav_active_part'
                : ''
              } navbar_part`}
          >
            {child.label}
          </div>
        )
      })),
    [horoscopeChildren, location.pathname, t]
  )

  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)

  const toggleDropdown = idx => {
    setOpenDropdownIndex(openDropdownIndex === idx ? null : idx)
  }

  const mobileNavItems = [
    {
      label: 'Home',
      type: 'link',
      to: PATHS?.HOMEPAGE,
      highLightClass: ""
    },
    {
      label: t('chat_with_astrologer'),
      type: 'link',
      to: PATHS?.CHATWITHASTROLOGERS,
      highLightClass: ""
    },
    {
      label: t('free_kundli'),
      type: 'link',
      to: PATHS?.FREEKUNDALI,
      highLightClass: ""
    },
    {
      label: t('kundli_matching'),
      type: 'link',
      to: PATHS?.KUNDALI_MATCHING,
      highLightClass: ""
    },
    {
      label: t('horoscopes'),
      type: 'dropdown',
      children: [
        {
          label: t('Daily_Horoscope'),
          type: 'action',
          onClick: () =>
            allHoroScopeNavigation(
              navigate,
              'daily-horoscope',
              PATHS?.ALL_HOROSCOPE
            ),
          to: `${getBasePath(PATHS?.ALL_HOROSCOPE)}/daily-horoscope`
        },
        {
          label: t('Tomorrow_Horoscope'),
          type: 'action',
          onClick: () =>
            allHoroScopeNavigation(
              navigate,
              'tomorrow-horoscope',
              PATHS?.ALL_HOROSCOPE
            ),
          to: `${getBasePath(PATHS?.ALL_HOROSCOPE)}/tomorrow-horoscope`
        },
        {
          label: t('Yesterday_Horoscope'),
          type: 'action',
          onClick: () =>
            allHoroScopeNavigation(
              navigate,
              'yesterday-horoscope',
              PATHS?.ALL_HOROSCOPE
            ),
          to: `${getBasePath(PATHS?.ALL_HOROSCOPE)}/yesterday-horoscope`
        },
        {
          label: t('Weekly_Horoscope'),
          type: 'action',
          onClick: () =>
            allHoroScopeNavigation(
              navigate,
              'weekly-horoscope',
              PATHS?.ALL_HOROSCOPE
            ),
          to: `${getBasePath(PATHS?.ALL_HOROSCOPE)}/weekly-horoscope`
        },
        {
          label: t('Yearly_Horoscope'),
          type: 'action',
          onClick: () =>
            allHoroScopeNavigation(
              navigate,
              'yearly-horoscope',
              PATHS?.ALL_HOROSCOPE
            ),
          to: `${getBasePath(PATHS?.ALL_HOROSCOPE)}/yearly-horoscope`
        }
      ],
      highLightClass: ""
    },
    {
      label: t('Todays_Panchang'),
      type: 'link',
      to: PATHS?.TODAYS_PANCHANGAM,
      highLightClass: ""
    },
    {
      label: t('Muhurat'),
      type: 'dropdown',
      children: [
        {
          label: t('Marriage_Muhurat'),
          type: 'link',
          to: PATHS?.MARRIAGE_MUHURAT
        },
        {
          label: t('bhumi_Pujan_Muhurat'),
          type: 'link',
          to: PATHS?.BHUMIPUJA_MUHURAT
        },
        {
          label: t('namakaran_Muhurat'),
          type: 'link',
          to: PATHS?.NAMKARAN_MUHURAT
        },

        {
          label: t('choghadiya'),
          type: 'link',
          to: PATHS?.CHOGADIYA
        },
        {
          label: t('rahu_kaal'),
          type: 'link',
          to: PATHS?.RAHU_KAAL
        },
      ],
      highLightClass: ""
    },
    {
      label: t('blog'),
      type: 'link',
      to: PATHS?.BLOG,
      highLightClass: ""
    },
    {
      label: t('prediction'),
      type: 'dropdown',
      children: [
        {
          label: t('genral_prediction'),
          type: 'link',
          to: PATHS?.GENERAL_PREDICTION
        },
        {
          label: t('kundali_prediction'),
          type: 'link',
          to: PATHS?.PREDICTION
        }

      ],
      highLightClass: "highlight_tab_nav_item"
    },
  ]

  const logoutFunction = () => {
    // dispatch(resetStore())
    dispatch(setUserLoginData({ is_login: false, loginUserData: '' }))
    logoutRedirection()
    navigate(PATHS.HOMEPAGE)
  }

  const handleLogout = useCallback(() => {
    logoutFunction()
    setShowModal(false)
  }, [logoutFunction])

  const buildDropdownItems = items => {
    return items.map(child => {
      const pathMatch = `/horoscope/${child.key.toLowerCase()}-horoscope`
      const isActive =
        location.pathname.toLowerCase() === pathMatch ||
        location.pathname.toLowerCase() === child.value?.toLowerCase()

      return {
        key: child.key,
        label: (
          <div
            onClick={child.onClick}
            className={`py-1 font-[500] capitalize ${isActive ? 'nav_active_part' : ''
              } navbar_part`}
          >
            {child.label}
          </div>
        )
      }
    })
  }

  const fetchData = useCallback(async () => {
    try {

      const cityName = await getCurrentCity()

      const apiCalls = [
        // dispatch(getHomePageListing()),
        dispatch(getGeoSearchLoaction({ city: cityName })),
        dispatch(getFAQList({ per_page: 1000 })),
        // dispatch(getFilterListing()),
        // dispatch(getDashboardCount()),
        // dispatch(blogListingThunk(commonPagination)),
        // dispatch(getAstrologerList(commonPagination)),
        // dispatch(generateMuhuratBlogThunk(muhuratRequest))
      ]
      await Promise.all(apiCalls)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [LocalLanguage])


  const NavItem = React.memo(({ item, horoscopeDropdownItems }) => {

    const isActives = item.to && location.pathname === item.to
    const childrenActive = item.children ? (item?.children?.find(ele => ele.value === location.pathname)) : false

    const baseClasses = `nav_text_font new_body_font capitalize ${(isActives || childrenActive) ? "active" : ""}`

    const isActive =
      location.pathname.startsWith(item.value) ||
      location.pathname.includes(item.value)

    if (item.type === 'link') {
      return (
        <li key={item.key} className='isActives'>
          <Link to={item.to} className={baseClasses}>
            {item.label}
          </Link>
        </li>
      )
    }

    if (item.type === 'dropdown') {
      const dropdownItems =
        item.key === 'horoscope'
          ? buildDropdownItems(horoscopeChildren)
          : buildDropdownItems(item.children || [])

      return (
        <li key={item.key} className={item.highLightClass}>
          <Dropdown menu={{ items: dropdownItems }} trigger={['hover']}>
            <div
              className={`relative cursor-pointer flex items-center gap-[6px]  py-1 rounded-md transition-all duration-200 hover:bg-gray-100 ${baseClasses} ${isActive ? 'active' : ''}`}
            >
              {item.highLightClass && (
                <div className="absolute new_tag_s -top-2 -right-3 text-[10px] bg-gradient-to-r from-[#c32853] to-[#ee7e49] !text-white px-2 py-[1px] rounded-full font-semibold shadow-lg animate-bounce z-10">
                  NEW
                </div>
              )}

              <span
                className={`relative tracking-wide ${item.highLightClass ? 'text-orange-600 animate-pulse' : 'text-gray-800'} leading-[150%]`}
              >
                {item.label}
              </span>

              <DownOutlined className="text-sm text-gray-500 group-hover:text-black transition-colors duration-200" />
            </div>
          </Dropdown>
        </li>
      )
    }

    if (item.type === 'action') {
      return (
        <li key={item.key}>
          <div
            onClick={item.onClick}
            className={`cursor-pointer ${baseClasses} ${isActive ? 'active' : ''
              }`}
          >
            {item.label}
          </div>
        </li>
      )
    }

    return null
  })

  const baseClassFn = isActive =>
    `block w-full text-left py-3 px-4 rounded-[10px] transition duration-200 ${isActive
      ? 'bg_website_color text-white'
      : 'hover:bg-gradient-to-r from-[#C32853] to-[#EE7E49] hover:text-white'
    }`

  const childClassFn = isActive =>
    `block w-full text-left py-2 px-3 rounded-[10px] transition duration-150 text-[14px] ${isActive
      ? 'bg_website_color text-white'
      : 'hover:bg-gradient-to-r from-[#C32853] to-[#EE7E49] hover:text-white'
    }`

  const renderNavItem = (
    item,
    idx,
    location,
    openDropdownIndex,
    toggleDropdown,
    setIsSidebarOpen
  ) => {
    const isActive = item.to && location.pathname === item.to

    switch (item.type) {
      case 'link':
        return (
          <li key={idx}>
            <Link
              to={item.to}
              onClick={() => setIsSidebarOpen(false)}
              className={baseClassFn(isActive)}
            >
              {item.label}
            </Link>
          </li>
        )

      case 'action':
        return (
          <li key={idx}>
            <div
              onClick={() => {
                item.onClick()
                setIsSidebarOpen(false)
              }}
              className={`${baseClassFn(isActive)} cursor-pointer`}
            >
              {item.label}
            </div>
          </li>
        )

      case 'dropdown':
        const isOpen = openDropdownIndex === idx

        return (
          <li key={idx} className={` mobile_nav_items_class`}>
            <button
              onClick={() => toggleDropdown(idx)}
              type='button'
              className={`flex  justify-between items-center w-full px-4 py-3 text-[#C32853] tracking-wide cursor-pointer rounded-[10px] hover:bg-gradient-to-r from-[#C32853] to-[#EE7E49] hover:text-white transition duration-200 ${item.highLightClass} `}
            >
              <div className={``}>      {item.label}

                {item.highLightClass && <span className="inline-block new_tag text-[9px] bg-gradient-to-r from-[#c32853] to-[#ee7e49] text-white px-2 pt-[2.3px] pb-[1px] rounded-full font-bold animate-pulse leading-tight">NEW</span>}

              </div>
              {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isOpen && (
              <ul className='pl-4 border-l border-gray-200 ml-3 space-y-1'>
                {item.children.map((child, childIdx) => {
                  const isChildActive =
                    child.to && location.pathname === child.to

                  if (child.type === 'link') {
                    return (
                      <li key={childIdx}>
                        <Link
                          to={child.to}
                          onClick={() => setIsSidebarOpen(false)}
                          className={childClassFn(isChildActive)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    )
                  }

                  if (child.type === 'action') {
                    return (
                      <li key={childIdx}>
                        <div
                          onClick={() => {
                            child.onClick()
                            setIsSidebarOpen(false)
                          }}
                          className={`${childClassFn(
                            isChildActive
                          )} cursor-pointer`}
                        >
                          {child.label}
                        </div>
                      </li>
                    )
                  }

                  return null
                })}
              </ul>
            )}
          </li>
        )

      default:
        return null
    }
  }

  const NavButtons = React.memo(
    ({ t, isLoggedIn, setIsModalOpen, setIsSidebarOpen, setShowModal }) => {
      const handleLoginClick = useCallback(() => {
        setIsModalOpen(true)
        setIsSidebarOpen(false)
      }, [setIsModalOpen, setIsSidebarOpen])

      const handleLogoutClick = useCallback(() => {
        setShowModal(true)
        setIsSidebarOpen(false)
      }, [setShowModal, setIsSidebarOpen])

      const handleChatClick = useCallback(() => {
        setIsSidebarOpen(false)
      }, [setIsSidebarOpen])

      const loginBtnClass = useMemo(
        () =>
          'w-full text-white bg_website_color hover:bg-[#63378A] px-4 py-3 rounded-[10px] transition',
        []
      )

      const chatBtnClass = useMemo(
        () =>
          'block text-center bg-white border border-[#E3725D] website_color px-4 py-2 rounded-md font-bold transition hover:!bg-[#E3725D] hover:!text-white',
        []
      )

      const logoutBtnClass = useMemo(
        () =>
          'mt-3 w-full text-white cursor-pointer font-bold bg_website_color border border-[#E3725D] px-4 py-[9px] rounded-md transition uppercase tracking-[1px] hover:!bg-white',
        []
      )

      return (
        <div className='px-4 pb-4 border-t border-gray-200 pt-4 nav_btns'>
          {!isLoggedIn ? (
            <CustomButton className={loginBtnClass} onClick={handleLoginClick}>
              {t('login')}
            </CustomButton>
          ) : (
            <>
              <Link
                to={PATHS?.CHATWITHASTROLOGERS}
                onClick={handleChatClick}
                className={chatBtnClass}
              >
                {t('chat_now')}
              </Link>
              <button onClick={handleLogoutClick} className={logoutBtnClass}>
                {t('logout')}
              </button>
            </>
          )}
        </div>
      )
    },
    (prev, next) =>
      prev.isLoggedIn === next.isLoggedIn &&
      prev.t === next.t && // assuming t is stable
      prev.setIsModalOpen === next.setIsModalOpen &&
      prev.setIsSidebarOpen === next.setIsSidebarOpen &&
      prev.setShowModal === next.setShowModal
  )

  useEffect(() => {
    setNavigator(navigate)
    setDispatcher(dispatch)

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    dispatch(setShortValue({}))
    dispatch(setFilterValue({}))
    dispatch(setFilterSearch(''))
    dispatch(setOnSubmitFilter(false))
    dispatch(setPageScroll(false))
    // if (location.pathname === '/') {
    //   homePageApi()
    // }
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname === '/') {
      setCheckPage(true)
    } else {
      setCheckPage(false)
    }
  }, [location.pathname])

  useEffect(() => {
    dispatch(changeLanguage(LANGUAGE_KEY))
    if (LOGIN_KEY) {
      dispatch(setUserLoginData({ is_login: true, loginUserData: AUTH_KEY }))
    }
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [LocalLanguage])

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen, location.pathname])

  const isPROFILE_SETTING = location?.pathname === `/${PATHS?.PROFILE_SETTING}`
  const linkClass = `flex items-center space-x-2 py-3 px-3 rounded-md mobileNavUl transition settingIcon ${isPROFILE_SETTING ? 'bg_website_color text-white' : 'hover:bg-[linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)] hover:text-white website_color'}`
  const iconClass = `w-5 h-5 cogIcon ${isPROFILE_SETTING ? '!text-white' : ''}`

  return (
    <header
      className={`customNavbar left-0 w-full z-50 box_shadow_common ${isSticky ? '' : ''
        }`}
    >
      {/* Top Bar */}
      <div className='text-white text-sm py-[14px] gradient-background relative'>
        <div className=' flex justify-end items-center px-[15px] md:px-[40px] space-x-4 md:gap-[10px]'>
          {/* Language Dropdown */}

          {topNavItems.map((item, idx) => (
            <TopNavItem
              key={item.key || idx}
              item={item}
              pathname={location.pathname}
            />
          ))}
          <Suspense fallback={<></>}>
            <LanguageDropdown className='LanguageDropdownblock topNavLink ' />
          </Suspense>
          {LOGIN_KEY && (
            <>
              <div
                className='w-8 h-8 flex items-center justify-center commonLightBack rounded-full box_shadow_common cursor_pointer    border border-white '
                onClick={() => navigate(PATHS?.MONEY_WALLET)} >
                <div className='w-[22px] h-[22px]'>
                  <img
                    src={walletIcon}
                    alt='wallet'
                    className=''
                    width={22}
                    height={22}
                    decoding='async'
                    loading='lazy'
                  />
                </div>
              </div>
              <div className='w-8 h-8 bg-gray-300 rounded-full'>
                <ProfileIconWithDropdown profileImg={profileImg} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full z-40 sticky-navbar-transition ${isSticky ? 'navbar-sticky' : ''
          }`}
      >
        <div className=' bg-white'>
          <div
            className={`flex items-center justify-between py-3   rounded-bl-xl rounded-br-xl px-[15px] md:px-[40px]  z-10 relative navbar_part_gt  
        ${checkPage ? '' : ''}`}
          >
            {/* Logo */}
            <div
              className='flex items-center space-x-3 cursor-pointer'
              onClick={() => navigate(`${PATHS?.HOMEPAGE}`)}
            >
              <img
                src={logoWeb}
                alt='Company Logo'
                className={`company_logo max-w-[177px] max-h-[67px] ${isSticky ? 'company_logo_sticky' : ''
                  }`}
                width={177}
                height={67}
                decoding='async'
                loading='lazy'
              />
            </div>

            {/* Desktop Navigation */}
            <nav className='customDisplayNavbar customDisplayNavbar items-center gap-5 '>
              <ul className='flex items-center  md:space-x-4 2xl:space-x-6 mb-0 new_body_font font-bold ps-5 md:ps-0'>
                {desktopNavItems.map(item => (
                  <NavItem
                    key={item.key}
                    item={item}
                    horoscopeDropdownItems={horoscopeDropdownItems}
                  />
                ))}
              </ul>

              {!LOGIN_KEY && (
                <CustomButton
                  className='text-white px-4 py-2 rounded-md uppercase'
                  onClick={openLoginModal}
                >
                  {t('login')}
                </CustomButton>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className='lg:hidden mobileMenuDisplay'
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className='w-8 h-8 new_body_font font-bold transition-transform transform hover:scale-110 cursor-pointer' />
            </button>
          </div>
        </div>
      </div>

      <Suspense fallback={<></>}>
        <PhoneAuthModals
          isPhoneModalOpen={isModalOpen}
          issetIsModalOpen={setIsModalOpen}
        />
      </Suspense>

      <Suspense fallback={<></>}>
        <ConfirmModal
          isOpen={showModal}
          title='LogOut?'
          description='Are you sure you want to delete this astrologer? This action cannot be undone.'
          okText='LogOut'
          cancelText='Cancel'
          onConfirm={() => handleLogout()}
          onCancel={() => setShowModal(false)}
        />
      </Suspense>

      {/* ------------------------------------------------------------------------------------ mobile Logic --------------------------------------------------------------------- */}

      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-opacity-40 backdrop-blur-md z-40 transition-opacity duration-300 mobileMenuDisplay'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 w-[300px] md:w-[320px] mobileMenuDisplay  h-full bg-white shadow-2xl transform ${isSidebarOpen
          ? 'translate-x-0 scale-100'
          : '-translate-x-full scale-95'
          } transition-all duration-300 ease-in-out z-40 rounded-r-xl flex flex-col`}
      >
        {/* Header */}
        <div className='bg-[#fff] p-5 flex justify-between items-center rounded-tr-xl'>
          <img
            src={logoWeb}
            alt='Company Logo'
            className={`company_logo object-contain max-w-[200px] ${isSticky ? 'company_logo_sticky' : ''
              }`}
            onClick={() => navigate(PATHS?.HOMEPAGE)}
            width={134.97}
            decoding='async'
            loading='lazy'
            height={47.5}
          />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='p-2 rounded-full  transition-all cursor-pointer'
          >
            <X className='w-6 h-6 website_color  hover:rotate-180 transition-all' />
          </button>
        </div>
        <hr className='border-[#E3725D]' />
        {/* Scrollable Nav */}
        <div className='flex-1 overflow-y-auto px-4 py-4 h-[calc(100%-223px)]'>
          <ul className='space-y-2 website_color font-medium'>
            {mobileNavItems.map((item, idx) =>
              renderNavItem(
                item,
                idx,
                location,
                openDropdownIndex,
                toggleDropdown,
                setIsSidebarOpen
              )
            )}
          </ul>

          <div className='border-t border-gray-200 pt-5 mt-5'>
            <Link
              to={PATHS?.PROFILE_SETTING}
              onClick={() => setIsSidebarOpen(false)}
              className={linkClass}
            >
              <Cog className={iconClass} />
              <span>{t('Setting')}</span>
            </Link>
          </div>
        </div>
        <NavButtons
          t={t}
          isLoggedIn={LOGIN_KEY}
          setIsModalOpen={setIsModalOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setShowModal={setShowModal}
        />
      </div>

      <PhoneAuthModal
        isPhoneModalOpen={modal?.is_model && modal?.model_type === 'nav_login'}
        issetIsModalOpen={setShowModal}
      />
    </header>
  )
}

export default React.memo(NavBar)
