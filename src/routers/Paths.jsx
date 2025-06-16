import i18n from '../i18n'
import { LanguageOption } from '../utils/CommonVariable'

// export const BASE_PATHS = {
//   LOGIN: '/login',
//   HOMEPAGE: '/',
//   TALKWITHASTROLOGER: '/talkWithAstrologer',
//   CHATWITHASTROLOGERS: '/chatWithAstrologer',
//   FREEKUNDALI: '/freeKundli',
//   KUNDALI_MATCHING: '/kundaliMatching',
//   KUNDALI_MATCHING_REPORT: '/kundaliMatchingReport',
//   HOROSCOPE: '/todaysHoroscope',
//   YEARLY_SINGLE: '/horoscope-details-yearly',
//   YEARLY_SINGLE_HOROSCOPE: '/horoscope-details-yearly/:type/:name/:id',
//   YEARLY_HOROSCOPE: '/horoscope-yearly',
//   TODAYS_SINGLE: '/horoscope-details-daily',
//   TODAYS_SINGLE_HOROSCOPE: '/horoscope-details-daily/:type/:name/:id',
//   WEEKLY_SINGLE: '/horoscope-details-weekly',
//   WEEKLY_SINGLE_HOROSCOPE: '/horoscope-details-weekly/:type/:name/:id',
//   WEEKLY_HOROSCOPE: '/horoscope-weekly',
//   ALL_HOROSCOPE: '/horoscope/:type',
//   ALL_HOROSCOPE_DETAILS: '/horoscope-details/:type/:name',
//   COMPATABILITY: '/compatibility',
//   PHONE_AUTH_MODALS: '/phoneAuthModals',
//   FESTIVAL_CALENDER: '/festivalCalender',
//   GOLD_BUYING_MUHURAT: '/goldBuyingMuhurat',
//   MARRIAGE_MUHURAT: '/marrigeMuhurat',
//   BHUMIPUJA_MUHURAT: '/bhumipujaMuhurat',
//   NAMKARAN_MUHURAT: '/namkaranMuhurat',
//   CARBIKE_MUHURAT: '/carBikeMuhurat',
//   OUR_ASTROLOGER: '/ourAstrologer',
//   ASTROLOGER_DETAIL_PAGE: '/astrologerDetailPage/:id',
//   FREEKUNDALI_DETAILS: '/kundli-details/:tab',
//   FREE_KUNDLI_KUNDLI_DETAILS_BASIC: '/freeKundliKundliDetailsBasic',
//   FREE_KUNDALI_DETAILS_KP: '/freeKundaliDetailsKp',
//   FREE_KUNDLI_KUNDLI_DETAILS_CHARTS: '/freeKundliKundliDetailsCharts',
//   FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA: '/freeKundliKundliDetailsAshtakvarga',
//   FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI:
//     '/FreeKundliKundliDetailsDashaVimshottari',
//   FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT:
//     '/freeKundaliDetailsDashaVimshottariContent',
//   FREE_KUNDALI_REPORT: '/freeKundaliReport',
//   BLOG: '/blog',
//   BLOG_DETAILS: '/blogDetails',
//   BLOG_SINGLE_PAGE: '/blogDetails/:blogId',
//   TRANSACTION_WALLET: '/transactionWallet',
//   ORDER_HISTORY_CALL: '/orderHistorycall',
//   SUPPORT_CHAT: '/supportChat',
//   PROFILE_SETTING: '/profileSetting',
//   PRIVACY_POLICY: '/privacyPolicy',
//   TERMS_CONDITIONS: '/termsConditions',
//   CHAT_SCREEN: '/chat',
//   CHAT_ID: '/chat/:chatAstroId',
//   TODAYS_PANCHANGAM: '/todaysPanchang',
//   PAYMENT_SCREEN: '/paymentScreen/:id',
//   MONEY_WALLET: '/moneyWallet',
//   CONTACT_US: '/contactUs',
//   RAHU_KAAL: '/rahuKaal',
//   PREDICTION: '/kundali_prediction',
//   GENERAL_PREDICTION: '/general_prediction',
//   BOOK_POOJA: '/bookPooja',
//   BOOK_POOJA_LIST: '/bookPoojaList',
//   ABOUT_US:"/aboutus",
//   NOT_FOUND: '*'
// }

export const BASE_PATHS = {
  LOGIN: '/login',
  HOMEPAGE: '/',
  TALKWITHASTROLOGER: '/talk-with-astrologer',
  CHATWITHASTROLOGERS: '/chat-with-astrologer',
  FREEKUNDALI: '/free-kundli',
  KUNDALI_MATCHING: '/kundali-matching',
  KUNDALI_MATCHING_REPORT: '/kundali-matching-report',
  HOROSCOPE: '/todays-horoscope',
  YEARLY_SINGLE: '/horoscope-details-yearly',
  YEARLY_SINGLE_HOROSCOPE: '/horoscope-details-yearly/:type/:name/:id',
  YEARLY_HOROSCOPE: '/horoscope-yearly',
  TODAYS_SINGLE: '/horoscope-details-daily',
  TODAYS_SINGLE_HOROSCOPE: '/horoscope-details-daily/:type/:name/:id',
  WEEKLY_SINGLE: '/horoscope-details-weekly',
  WEEKLY_SINGLE_HOROSCOPE: '/horoscope-details-weekly/:type/:name/:id',
  WEEKLY_HOROSCOPE: '/horoscope-weekly',
  ALL_HOROSCOPE: '/horoscope/:type',
  ALL_HOROSCOPE_DETAILS: '/horoscope-details/:type/:name',
  COMPATABILITY: '/compatibility',
  PHONE_AUTH_MODALS: '/phone-auth-modals',
  FESTIVAL_CALENDER: '/festival-calendar',
  GOLD_BUYING_MUHURAT: '/gold-buying-muhurat',
  MARRIAGE_MUHURAT: '/marriage-muhurat',
  BHUMIPUJA_MUHURAT: '/bhoomi-pooja-muhurat',
  NAMKARAN_MUHURAT: '/namkaran-muhurat',
  CARBIKE_MUHURAT: '/car-bike-muhurat',
  OUR_ASTROLOGER: '/our-astrologer',
  ASTROLOGER_DETAIL_PAGE: '/astrologer-detail-page/:id',
  FREEKUNDALI_DETAILS: '/kundli-details/:tab',
  FREE_KUNDLI_KUNDLI_DETAILS_BASIC: '/free-kundli-details-basic',
  FREE_KUNDALI_DETAILS_KP: '/free-kundali-details-kp',
  FREE_KUNDLI_KUNDLI_DETAILS_CHARTS: '/free-kundali-details-charts',
  FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA: '/free-kundali-details-ashtakvarga',
  FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI: '/free-kundali-details-dasha-vimshottari',
  FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT: '/free-kundali-details-dasha-vimshottari-content',
  FREE_KUNDALI_REPORT: '/free-kundali-report',
  BLOG: '/blog',
  BLOG_DETAILS: '/blog-details',
  BLOG_SINGLE_PAGE: '/blog-details/:name/:blogId',
  TRANSACTION_WALLET: '/transaction-wallet',
  ORDER_HISTORY_CALL: '/order-history-call',
  SUPPORT_CHAT: '/support-chat',
  PROFILE_SETTING: '/profile-setting',
  PRIVACY_POLICY: '/privacy-policy',
  APP_PRIVACY_POLICY: '/app-privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  CHAT_SCREEN: '/chat',
  CHAT_ID: '/chat/:chatAstroId',
  TODAYS_PANCHANGAM: '/todays-panchang',
  PAYMENT_SCREEN: '/payment-screen/:id',
  MONEY_WALLET: '/money-wallet',
  CONTACT_US: '/contact-us',
  RAHU_KAAL: '/rahu-kaal',
  PREDICTION: '/kundali-prediction',
  GENERAL_PREDICTION: '/general-prediction',
  BOOK_POOJA: '/book-pooja',
  BOOK_POOJA_LIST: '/book-pooja-list',
  ASTRO_MALL: '/astro-mall',
  ABOUT_US: '/about-us',
  CHOGADIYA:'/choghadiya',
  NOT_FOUND: '*',
};

// export const PATHS_LANGUAGE = {
//   HOMEPAGE: '/:lang/',
//   TALKWITHASTROLOGER: '/:lang/talkWithAstrologer',
//   CHATWITHASTROLOGERS: '/:lang/chatWithAstrologer',
//   FREEKUNDALI: '/:lang/freeKundli',
//   KUNDALI_MATCHING: '/:lang/kundaliMatching',
//   KUNDALI_MATCHING_REPORT: '/:lang/kundaliMatchingReport',
//   HOROSCOPE: '/:lang/todaysHoroscope',
//   YEARLY_SINGLE: '/:lang/horoscope-details-yearly',
//   YEARLY_SINGLE_HOROSCOPE: '/:lang/horoscope-details-yearly/:type/:name/:id',
//   YEARLY_HOROSCOPE: '/:lang/horoscope-yearly',
//   TODAYS_SINGLE: '/:lang/horoscope-details-daily',
//   TODAYS_SINGLE_HOROSCOPE: '/:lang/horoscope-details-daily/:type/:name/:id',
//   WEEKLY_SINGLE: '/:lang/horoscope-details-weekly',
//   WEEKLY_SINGLE_HOROSCOPE: '/:lang/horoscope-details-weekly/:type/:name/:id',
//   WEEKLY_HOROSCOPE: '/:lang/horoscope-weekly',
//   ALL_HOROSCOPE: '/:lang/horoscope/:type',
//   ALL_HOROSCOPE_DETAILS: '/:lang/horoscope-details/:type/:name',
//   COMPATABILITY: '/:lang/compatibility',
//   PHONE_AUTH_MODALS: '/:lang/phoneAuthModals',
//   FESTIVAL_CALENDER: '/:lang/festivalCalender',
//   GOLD_BUYING_MUHURAT: '/:lang/goldBuyingMuhurat',
//   MARRIAGE_MUHURAT: '/:lang/marrigeMuhurat',
//   BHUMIPUJA_MUHURAT: '/:lang/bhumipujaMuhurat',
//   NAMKARAN_MUHURAT: '/:lang/namkaranMuhurat',
//   CARBIKE_MUHURAT: '/:lang/carBikeMuhurat',
//   OUR_ASTROLOGER: '/:lang/ourAstrologer',
//   ASTROLOGER_DETAIL_PAGE: '/:lang/astrologerDetailPage/:id',
//   FREEKUNDALI_DETAILS: '/:lang/kundli-details/:tab',
//   FREE_KUNDLI_KUNDLI_DETAILS_BASIC: '/:lang/freeKundliKundliDetailsBasic',
//   FREE_KUNDALI_DETAILS_KP: '/:lang/freeKundaliDetailsKp',
//   FREE_KUNDLI_KUNDLI_DETAILS_CHARTS: '/:lang/freeKundliKundliDetailsCharts',
//   FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA:
//     '/:lang/freeKundliKundliDetailsAshtakvarga',
//   FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI:
//     '/:lang/FreeKundliKundliDetailsDashaVimshottari',
//   FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT:
//     '/:lang/freeKundaliDetailsDashaVimshottariContent',
//   FREE_KUNDALI_REPORT: '/:lang/freeKundaliReport',
//   BLOG: '/:lang/blog',
//   BLOG_DETAILS: '/:lang/blogDetails',
//   BLOG_SINGLE_PAGE: '/:lang/blogDetails/:blogId',
//   TRANSACTION_WALLET: '/:lang/transactionWallet',
//   ORDER_HISTORY_CALL: '/:lang/orderHistorycall',
//   SUPPORT_CHAT: '/:lang/supportChat',
//   PROFILE_SETTING: '/:lang/profileSetting',
//   PRIVACY_POLICY: '/:lang/privacyPolicy',
//   TERMS_CONDITIONS: '/:lang/termsConditions',
//   CHAT_SCREEN: '/:lang/chat',
//   CHAT_ID: '/:lang/chat/:chatAstroId',
//   TODAYS_PANCHANGAM: '/:lang/todaysPanchang',
//   PAYMENT_SCREEN: '/:lang/paymentScreen/:id',
//   MONEY_WALLET: '/:lang/moneyWallet',
//   PREDICTION: '/:lang/kundali_prediction',
//   GENERAL_PREDICTION: '/:lang/general_prediction',
//   ABOUT_US: '/:lang/AboutUs',
//   CONTACT_US: '/:lang/contactUs',
//   RAHU_KAAL: '/:lang/rahuKaal',
//   BOOK_POOJA: '/:lang/bookPooja',
//   BOOK_POOJA_LIST: '/:lang/bookPoojaList',
//   // ABOUT_US:"/:lang/aboutus"
// }

export const PATHS_LANGUAGE = {
  HOMEPAGE: '/:lang/',
  TALKWITHASTROLOGER: '/:lang/talk-with-astrologer',
  CHATWITHASTROLOGERS: '/:lang/chat-with-astrologer',
  FREEKUNDALI: '/:lang/free-kundli',
  KUNDALI_MATCHING: '/:lang/kundali-matching',
  KUNDALI_MATCHING_REPORT: '/:lang/kundali-matching-report',
  HOROSCOPE: '/:lang/todays-horoscope',
  YEARLY_SINGLE: '/:lang/horoscope-details-yearly',
  YEARLY_SINGLE_HOROSCOPE: '/:lang/horoscope-details-yearly/:type/:name/:id',
  YEARLY_HOROSCOPE: '/:lang/horoscope-yearly',
  TODAYS_SINGLE: '/:lang/horoscope-details-daily',
  TODAYS_SINGLE_HOROSCOPE: '/:lang/horoscope-details-daily/:type/:name/:id',
  WEEKLY_SINGLE: '/:lang/horoscope-details-weekly',
  WEEKLY_SINGLE_HOROSCOPE: '/:lang/horoscope-details-weekly/:type/:name/:id',
  WEEKLY_HOROSCOPE: '/:lang/horoscope-weekly',
  ALL_HOROSCOPE: '/:lang/horoscope/:type',
  ALL_HOROSCOPE_DETAILS: '/:lang/horoscope-details/:type/:name',
  COMPATABILITY: '/:lang/compatibility',
  PHONE_AUTH_MODALS: '/:lang/phone-auth-modals',
  FESTIVAL_CALENDER: '/:lang/festival-calendar',
  GOLD_BUYING_MUHURAT: '/:lang/gold-buying-muhurat',
  MARRIAGE_MUHURAT: '/:lang/marriage-muhurat',
  BHUMIPUJA_MUHURAT: '/:lang/bhoomi-pooja-muhurat',
  NAMKARAN_MUHURAT: '/:lang/namkaran-muhurat',
  CARBIKE_MUHURAT: '/:lang/car-bike-muhurat',
  OUR_ASTROLOGER: '/:lang/our-astrologer',
  ASTROLOGER_DETAIL_PAGE: '/:lang/astrologer-detail-page/:id',
  FREEKUNDALI_DETAILS: '/:lang/kundli-details/:tab',
  FREE_KUNDLI_KUNDLI_DETAILS_BASIC: '/:lang/free-kundli-details-basic',
  FREE_KUNDALI_DETAILS_KP: '/:lang/free-kundali-details-kp',
  FREE_KUNDLI_KUNDLI_DETAILS_CHARTS: '/:lang/free-kundali-details-charts',
  FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA: '/:lang/free-kundali-details-ashtakvarga',
  FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI: '/:lang/free-kundali-details-dasha-vimshottari',
  FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT: '/:lang/free-kundali-details-dasha-vimshottari-content',
  FREE_KUNDALI_REPORT: '/:lang/free-kundali-report',
  BLOG: '/:lang/blog',
  BLOG_DETAILS: '/:lang/blog-details',
  BLOG_SINGLE_PAGE: '/:lang/blog-details/:name/:blogId',
  TRANSACTION_WALLET: '/:lang/transaction-wallet',
  ORDER_HISTORY_CALL: '/:lang/order-history-call',
  SUPPORT_CHAT: '/:lang/support-chat',
  PROFILE_SETTING: '/:lang/profile-setting',
  PRIVACY_POLICY: '/:lang/privacy-policy',
  APP_PRIVACY_POLICY: '/:lang/app-privacy-policy',

  TERMS_CONDITIONS: '/:lang/terms-conditions',
  CHAT_SCREEN: '/:lang/chat',
  CHAT_ID: '/:lang/chat/:chatAstroId',
  TODAYS_PANCHANGAM: '/:lang/todays-panchang',
  PAYMENT_SCREEN: '/:lang/payment-screen/:id',
  MONEY_WALLET: '/:lang/money-wallet',
  PREDICTION: '/:lang/kundali-prediction',
  GENERAL_PREDICTION: '/:lang/general-prediction',
  ABOUT_US: '/:lang/about-us',
  CONTACT_US: '/:lang/contact-us',
  RAHU_KAAL: '/:lang/rahu-kaal',
  BOOK_POOJA: '/:lang/book-pooja',
  BOOK_POOJA_LIST: '/:lang/book-pooja-list',
  ASTRO_MALL: '/:lang/astro-mall',
  CHOGADIYA:'/:lang/choghadiya',

  // ABOUT_US: '/:lang/about-us'
}

const supportedLanguages = Object.values(LanguageOption)

export function getCurrentLanguage () {
  // if (typeof window === 'undefined' || window.location.pathname === '/') {
  if (typeof window === 'undefined') {
    localStorage.setItem('ASTRO_language', 'en')
    return LanguageOption.ENGLISH
  }

  const storedLang = localStorage.getItem('ASTRO_language') || LanguageOption.ENGLISH
  const urlLang = window.location.pathname.split('/')[1]
  const isValidLang = supportedLanguages.includes(urlLang)
  let currentLang = storedLang
  if (isValidLang && urlLang !== storedLang) {
    localStorage.setItem('ASTRO_language', urlLang)
    i18n.changeLanguage(urlLang)
    currentLang = urlLang
  } else if (!isValidLang && storedLang !== LanguageOption.ENGLISH) {
    const redirectPath = `/${storedLang}${window.location.pathname}`
    i18n.changeLanguage(urlLang)
    window.location.replace(redirectPath)
    return LanguageOption.ENGLISH
  }
  return currentLang
}

let cachedLang = localStorage.getItem("ASTRO_language") || "en"
if(!localStorage.getItem("ASTRO_language")){
  localStorage.setItem("ASTRO_language", "en")
}
let cachedPaths = null

export function UpdatedPaths () {
  const lang = getCurrentLanguage()?.toLowerCase()
  // If language hasn’t changed, return cached paths
  if (cachedLang === lang && cachedPaths) {
    return cachedPaths
  }

  // Update cache
  cachedLang = lang
  if (lang === LanguageOption.ENGLISH.toLowerCase()) {
    cachedPaths = BASE_PATHS
  } else {
    const prefixedPaths = {}
    for (const key in BASE_PATHS) {
      const path = BASE_PATHS[key]
      prefixedPaths[key] = path === '*' ? '*' : `/${lang}${path}`
    }
    cachedPaths = prefixedPaths
  }
  return cachedPaths
}

export const PATHS = UpdatedPaths()

// export function UpdatedPaths () {
//   const lang = getCurrentLanguage()?.toLowerCase()
  
//   if (lang === LanguageOption.ENGLISH.toLowerCase()) {
//     return BASE_PATHS}
//   const prefixedPaths = {}
//   for (const key in BASE_PATHS) {
//     const path = BASE_PATHS[key]
//     prefixedPaths[key] = path === '*' ? '*' : `/${lang}${path}`
//   }  

  
//   return prefixedPaths
// }

// export const PATHS = UpdatedPaths()
