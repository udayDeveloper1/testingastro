
import { lazy } from 'react'
import { BASE_PATHS, PATHS_LANGUAGE } from './Paths'
const CustomTabs = lazy(() => import('../component/Custom/CustomTabs'))
const PhoneAuthModals = lazy(() => import('../component/auth/PhoneAuthModals'))
const AstrologerDetailPage = lazy(() => import('../pages/Astrologers/AstrologerDetailPage') )
const AstrologerListPage = lazy(() => import('../pages/Astrologers/AstrologerListPage'))
const Aboutus = lazy(() => import('../pages/About/Aboutus'))
const Blog = lazy(() => import('../pages/Blog/Blog'))
const BlogDetails = lazy(() => import('../pages/Blog/BlogDetails'))
const HomePage = lazy(() => import('../pages/HomePage'))
const Compatibility = lazy(() => import('../pages/Horoscope/Compatibility'))
const TodaysHoroscope = lazy(() => import('../pages/Horoscope/TodaysHoroscope'))
const YearlyHoroscope = lazy(() => import('../pages/Horoscope/YearlyHoroscope'))
const YearlySingleHoroscope = lazy(() => import('../pages/Horoscope/YearlySingleHoroscope') )
const BhumiPujaMuhurat = lazy(() => import('../pages/Muhurat/BhumiPujaMuhurat'))
const CarBikeMuhurat = lazy(() => import('../pages/Muhurat/CarBikeMuhurat'))
const FestivalCalender = lazy(() => import('../pages/Muhurat/FestivalCalender'))
const GoldBuyingMuhurat = lazy(() => import('../pages/Muhurat/GoldBuyingMuhurat') )
const MarriageMuhurat = lazy(() => import('../pages/Muhurat/MarriageMuhurat'))
const NamkaranMuhurat = lazy(() => import('../pages/Muhurat/NamkaranMuhurat'))
const OrderHistoryCall = lazy(() => import('../pages/OrderHistory/OrderHistoryCall') )
const TodaysPanchang = lazy(() => import('../pages/Panchang/TodaysPanchang'))
const MoneyWallet = lazy(() => import('../pages/PaymentScreen/MoneyWallet'))
const PaymentDetails = lazy(() => import('../pages/PaymentScreen/PaymentDetails') )
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy/PrivacyPolicy'))
const TermsAndCondition = lazy(() => import('../pages/PrivacyPolicy/TermsAndCondition') )
const ProfileSetting = lazy(() => import('../pages/Profile/ProfileSetting'))
const SupportChatPage = lazy(() => import('../pages/SupportChat/SupportChatPage') )
const TalkWithAstrologer = lazy(() => import('../pages/Talk/TalkWithAstrologer') )
const TransactionWallet = lazy(() => import('../pages/Transaction/TransactionWallet') )
const ChatUI = lazy(() => import('../pages/chat/ChatUI'))
const ChatWithAstrologer = lazy(() => import('../pages/chat/ChatWithAstrologer') )
const FreeKundali = lazy(() => import('../pages/kundali/FreeKundali'))
const FreeKundaliDetailsDashaVimshottariContent = lazy(() => import('../pages/kundali/FreeKundaliDetailsDashaVimshottariContent') )
const FreeKundaliDetailsKp = lazy(() => import('../pages/kundali/FreeKundaliDetailsKp') )
const FreeKundaliReport = lazy(() => import('../pages/kundali/FreeKundaliReport') )
const FreeKundliKundliDetailsAshtakvarga = lazy(() => import('../pages/kundali/FreeKundliKundliDetailsAshtakvarga') )
const FreeKundliKundliDetailsBasic = lazy(() => import('../pages/kundali/FreeKundliKundliDetailsBasic') )
const FreeKundliKundliDetailsCharts = lazy(() => import('../pages/kundali/FreeKundliKundliDetailsCharts') )
const FreeKundliKundliDetailsDashaVimshottari = lazy(() => import('../pages/kundali/FreeKundliKundliDetailsDashaVimshottari') )
const KundaliMatching = lazy(() => import('../pages/kundali/KundaliMatching'))
const KundaliMatchingReport = lazy(() => import('../pages/kundali/KundaliMatchingReport') )
const ContactSection = lazy(() => import('../pages/Contact/ContactSection'))
const PredictionPage = lazy(() => import('../pages/PredictionPage/PredictionPage') )
const RahuKaal = lazy(() => import('../pages/Kaal/RahuKaal'))
// const BookPooja = lazy(() => import('../pages/BookPooja/BookPooja'))
// const BookPoojaList = lazy(() => import('../pages/BookPooja/BookPoojaList'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
const ComingSoon = lazy(() => import('../component/comingSoon/ComingSoon'))

export const PathRedirection = [
  // { auth: false, path: BASE_PATHS.LOGIN, element: <Login /> },
  { auth: false, path: BASE_PATHS.HOMEPAGE, element: <HomePage /> },
  { auth: false, path: BASE_PATHS.TALKWITHASTROLOGER, element: <TalkWithAstrologer /> },
  { auth: false, path: BASE_PATHS.CHATWITHASTROLOGERS, element: <ChatWithAstrologer /> },
  { auth: false, path: BASE_PATHS.FREEKUNDALI, element: <FreeKundali /> },
  { auth: false, path: BASE_PATHS.KUNDALI_MATCHING, element: <KundaliMatching /> },
  { auth: false, path: BASE_PATHS.KUNDALI_MATCHING_REPORT, element: <KundaliMatchingReport /> },
  { auth: false, path: BASE_PATHS.HOROSCOPE, element: <YearlyHoroscope /> },
  { auth: false, path: BASE_PATHS.COMPATABILITY, element: <Compatibility /> },
  { auth: false, path: BASE_PATHS.PHONE_AUTH_MODALS, element: <PhoneAuthModals /> },
  { auth: false, path: BASE_PATHS.FESTIVAL_CALENDER, element: <FestivalCalender /> },
  { auth: false, path: BASE_PATHS.GOLD_BUYING_MUHURAT, element: <GoldBuyingMuhurat /> },
  { auth: false, path: BASE_PATHS.MARRIAGE_MUHURAT, element: <MarriageMuhurat /> },
  { auth: false, path: BASE_PATHS.BHUMIPUJA_MUHURAT, element: <BhumiPujaMuhurat /> },
  { auth: false, path: BASE_PATHS.NAMKARAN_MUHURAT, element: <NamkaranMuhurat /> },
  { auth: false, path: BASE_PATHS.CARBIKE_MUHURAT, element: <CarBikeMuhurat /> },
  { auth: false, path: BASE_PATHS.OUR_ASTROLOGER, element: <AstrologerListPage /> },
  { auth: false, path: BASE_PATHS.ASTROLOGER_DETAIL_PAGE, element: <AstrologerDetailPage /> },
  { auth: true, path: BASE_PATHS.PROFILE_SETTING, element: <ProfileSetting /> },
  { auth: false, path: BASE_PATHS.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { auth: false, path: BASE_PATHS.TERMS_CONDITIONS, element: <TermsAndCondition /> },
  { auth: false, path: BASE_PATHS.PAYMENT_SCREEN, element: <PaymentDetails /> },
  { auth: false, path: BASE_PATHS.WEEKLY_HOROSCOPE, element: <TodaysHoroscope /> },
  { auth: false, path: BASE_PATHS.WEEKLY_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
  { auth: false, path: BASE_PATHS.YEARLY_HOROSCOPE, element: <TodaysHoroscope /> },
  { auth: false, path: BASE_PATHS.YEARLY_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
  { auth: false, path: BASE_PATHS.TODAYS_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDLI_KUNDLI_DETAILS_BASIC, element: <FreeKundliKundliDetailsBasic /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDALI_DETAILS_KP, element: <FreeKundaliDetailsKp /> },
  { auth: false, path: BASE_PATHS.FREEKUNDALI_DETAILS, element: <CustomTabs /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDLI_KUNDLI_DETAILS_CHARTS, element: <FreeKundliKundliDetailsCharts /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA, element: <FreeKundliKundliDetailsAshtakvarga /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI, element: <FreeKundliKundliDetailsDashaVimshottari /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT, element: <FreeKundaliDetailsDashaVimshottariContent /> },
  { auth: false, path: BASE_PATHS.FREE_KUNDALI_REPORT, element: <FreeKundaliReport /> },
  { auth: false, path: BASE_PATHS.BLOG, element: <Blog /> },
  { auth: false, path: BASE_PATHS.BLOG_SINGLE_PAGE, element: <BlogDetails /> },
  { auth: false, path: BASE_PATHS.ALL_HOROSCOPE, element: <TodaysHoroscope /> },
  { auth: false, path: BASE_PATHS.ALL_HOROSCOPE_DETAILS, element: <YearlySingleHoroscope /> },
  { auth: true, path: BASE_PATHS.TRANSACTION_WALLET, element: <TransactionWallet /> },
  { auth: false, path: BASE_PATHS.ORDER_HISTORY_CALL, element: <OrderHistoryCall /> },
  { auth: false, path: BASE_PATHS.SUPPORT_CHAT, element: <SupportChatPage /> },
  { auth: true, path: BASE_PATHS.CHAT_SCREEN, element: <ChatUI /> },
  { auth: false, path: BASE_PATHS.CHAT_ID, element: <ChatUI /> },
  { auth: false, path: BASE_PATHS.TODAYS_PANCHANGAM, element: <TodaysPanchang /> },
  { auth: true, path: BASE_PATHS.MONEY_WALLET, element: <MoneyWallet /> },
  { auth: false, path: BASE_PATHS.PREDICTION, element: <PredictionPage /> },
  { auth: false, path: BASE_PATHS.GENERAL_PREDICTION, element: <PredictionPage /> },
  { auth: false, path: BASE_PATHS.NOT_FOUND, element: <NotFound /> },
  { auth: false, path: BASE_PATHS.CONTACT_US, element: <ContactSection /> },
  { auth: false, path: BASE_PATHS?.RAHU_KAAL, element: <RahuKaal /> },
  { auth: false, path: BASE_PATHS?.BOOK_POOJA, element: <ComingSoon /> },
  // { auth: false, path: BASE_PATHS?.BOOK_POOJA, element: <BookPooja /> },
  // { auth: false, path: BASE_PATHS?.BOOK_POOJA_LIST, element: <BookPoojaList /> },
  { auth: false, path: BASE_PATHS?.BOOK_POOJA_LIST, element: <ComingSoon /> },
  { auth: false, path: BASE_PATHS?.ABOUT_US, element: <Aboutus /> },
  { auth: false, path: BASE_PATHS?.ASTRO_MALL, element: <ComingSoon /> },
  // ---------------------------- language ------------------------------------------------
  { auth: false, path: PATHS_LANGUAGE.HOMEPAGE, element: <HomePage /> },
  { auth: false, path: PATHS_LANGUAGE.TALKWITHASTROLOGER, element: <TalkWithAstrologer /> },
  { auth: false, path: PATHS_LANGUAGE.CHATWITHASTROLOGERS, element: <ChatWithAstrologer /> },
  { auth: false, path: PATHS_LANGUAGE.FREEKUNDALI, element: <FreeKundali /> },
  { auth: false, path: PATHS_LANGUAGE.KUNDALI_MATCHING, element: <KundaliMatching /> },
  { auth: false, path: PATHS_LANGUAGE.KUNDALI_MATCHING_REPORT, element: <KundaliMatchingReport /> },
  { auth: false, path: PATHS_LANGUAGE.HOROSCOPE, element: <YearlyHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.COMPATABILITY, element: <Compatibility /> },
  { auth: false, path: PATHS_LANGUAGE.PHONE_AUTH_MODALS, element: <PhoneAuthModals /> },
  { auth: false, path: PATHS_LANGUAGE.FESTIVAL_CALENDER, element: <FestivalCalender /> },
  { auth: false, path: PATHS_LANGUAGE.GOLD_BUYING_MUHURAT, element: <GoldBuyingMuhurat /> },
  { auth: false, path: PATHS_LANGUAGE.MARRIAGE_MUHURAT, element: <MarriageMuhurat /> },
  { auth: false, path: PATHS_LANGUAGE.BHUMIPUJA_MUHURAT, element: <BhumiPujaMuhurat /> },
  { auth: false, path: PATHS_LANGUAGE.NAMKARAN_MUHURAT, element: <NamkaranMuhurat /> },
  { auth: false, path: PATHS_LANGUAGE.CARBIKE_MUHURAT, element: <CarBikeMuhurat /> },
  { auth: false, path: PATHS_LANGUAGE.OUR_ASTROLOGER, element: <AstrologerListPage /> },
  { auth: false, path: PATHS_LANGUAGE.ASTROLOGER_DETAIL_PAGE, element: <AstrologerDetailPage /> },
  { auth: true, path: PATHS_LANGUAGE.PROFILE_SETTING, element: <ProfileSetting /> },
  { auth: false, path: PATHS_LANGUAGE.PRIVACY_POLICY, element: <PrivacyPolicy /> },
  { auth: false, path: PATHS_LANGUAGE.TERMS_CONDITIONS, element: <TermsAndCondition /> },
  { auth: false, path: PATHS_LANGUAGE.PAYMENT_SCREEN, element: <PaymentDetails /> },
  { auth: false, path: PATHS_LANGUAGE.WEEKLY_HOROSCOPE, element: <TodaysHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.WEEKLY_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.YEARLY_HOROSCOPE, element: <TodaysHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.YEARLY_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.TODAYS_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDLI_KUNDLI_DETAILS_BASIC, element: <FreeKundliKundliDetailsBasic /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDALI_DETAILS_KP, element: <FreeKundaliDetailsKp /> },
  { auth: false, path: PATHS_LANGUAGE.FREEKUNDALI_DETAILS, element: <CustomTabs /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDLI_KUNDLI_DETAILS_CHARTS, element: <FreeKundliKundliDetailsCharts /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA, element: <FreeKundliKundliDetailsAshtakvarga /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI, element: <FreeKundliKundliDetailsDashaVimshottari /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT, element: <FreeKundaliDetailsDashaVimshottariContent /> },
  { auth: false, path: PATHS_LANGUAGE.FREE_KUNDALI_REPORT, element: <FreeKundaliReport /> },
  { auth: false, path: PATHS_LANGUAGE.BLOG, element: <Blog /> },
  { auth: false, path: PATHS_LANGUAGE.BLOG_SINGLE_PAGE, element: <BlogDetails /> },
  { auth: false, path: PATHS_LANGUAGE.ALL_HOROSCOPE, element: <TodaysHoroscope /> },
  { auth: false, path: PATHS_LANGUAGE.ALL_HOROSCOPE_DETAILS, element: <YearlySingleHoroscope /> },
  { auth: true, path: PATHS_LANGUAGE.TRANSACTION_WALLET, element: <TransactionWallet /> },
  { auth: false, path: PATHS_LANGUAGE.ORDER_HISTORY_CALL, element: <OrderHistoryCall /> },
  { auth: false, path: PATHS_LANGUAGE.SUPPORT_CHAT, element: <SupportChatPage /> },
  { auth: true, path: PATHS_LANGUAGE.CHAT_SCREEN, element: <ChatUI /> },
  { auth: false, path: PATHS_LANGUAGE.CHAT_ID, element: <ChatUI /> },
  { auth: false, path: PATHS_LANGUAGE.TODAYS_PANCHANGAM, element: <TodaysPanchang /> },
  { auth: true, path: PATHS_LANGUAGE.MONEY_WALLET, element: <MoneyWallet /> },
  { auth: false, path: PATHS_LANGUAGE.PREDICTION, element: <PredictionPage /> },
  { auth: false, path: PATHS_LANGUAGE.GENERAL_PREDICTION, element: <PredictionPage /> },
  { auth: false, path: PATHS_LANGUAGE.CONTACT_US, element: <ContactSection /> },
  { auth: false, path: PATHS_LANGUAGE?.RAHU_KAAL, element: <RahuKaal /> },
  { auth: false, path: PATHS_LANGUAGE?.BOOK_POOJA, element: <ComingSoon /> },
  // { auth: false, path: PATHS_LANGUAGE?.BOOK_POOJA, element: <BookPooja /> },
  // { auth: false, path: PATHS_LANGUAGE?.BOOK_POOJA_LIST, element: <BookPoojaList /> },
  { auth: false, path: PATHS_LANGUAGE?.BOOK_POOJA_LIST, element: <ComingSoon /> },
  { auth: false, path: PATHS_LANGUAGE?.ABOUT_US, element: <Aboutus /> },
  { auth: false, path: PATHS_LANGUAGE?.ASTRO_MALL, element: <ComingSoon /> },
]
