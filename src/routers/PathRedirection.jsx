import { lazy, useMemo } from 'react'
import { PATHS_LANGUAGE, UpdatedPaths } from './Paths'

const CustomTabs = lazy(() => import('../component/Custom/CustomTabs'))
const Login = lazy(() => import('../component/auth/Login'))
const PhoneAuthModals = lazy(() => import('../component/auth/PhoneAuthModals'))
const AstrologerDetailPage = lazy(() =>
  import('../pages/Astrologers/AstrologerDetailPage')
)
const AstrologerListPage = lazy(() =>
  import('../pages/Astrologers/AstrologerListPage')
)
const Blog = lazy(() => import('../pages/Blog/Blog'))
const BlogDetails = lazy(() => import('../pages/Blog/BlogDetails'))
const HomePage = lazy(() => import('../pages/HomePage'))
const Compatibility = lazy(() => import('../pages/Horoscope/Compatibility'))
const TodaysHoroscope = lazy(() => import('../pages/Horoscope/TodaysHoroscope'))
const YearlyHoroscope = lazy(() => import('../pages/Horoscope/YearlyHoroscope'))
const YearlySingleHoroscope = lazy(() =>
  import('../pages/Horoscope/YearlySingleHoroscope')
)
const BhumiPujaMuhurat = lazy(() => import('../pages/Muhurat/BhumiPujaMuhurat'))
const CarBikeMuhurat = lazy(() => import('../pages/Muhurat/CarBikeMuhurat'))
const FestivalCalender = lazy(() => import('../pages/Muhurat/FestivalCalender'))
const GoldBuyingMuhurat = lazy(() =>
  import('../pages/Muhurat/GoldBuyingMuhurat')
)
const MarriageMuhurat = lazy(() => import('../pages/Muhurat/MarriageMuhurat'))
const NamkaranMuhurat = lazy(() => import('../pages/Muhurat/NamkaranMuhurat'))
const OrderHistoryCall = lazy(() =>
  import('../pages/OrderHistory/OrderHistoryCall')
)
const TodaysPanchang = lazy(() => import('../pages/Panchang/TodaysPanchang'))
const MoneyWallet = lazy(() => import('../pages/PaymentScreen/MoneyWallet'))
const PaymentDetails = lazy(() =>
  import('../pages/PaymentScreen/PaymentDetails')
)
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy/PrivacyPolicy'))
const TermsAndCondition = lazy(() =>
  import('../pages/PrivacyPolicy/TermsAndCondition')
)
const ProfileSetting = lazy(() => import('../pages/Profile/ProfileSetting'))
const SupportChatPage = lazy(() =>
  import('../pages/SupportChat/SupportChatPage')
)
const TalkWithAstrologer = lazy(() =>
  import('../pages/Talk/TalkWithAstrologer')
)
const TransactionWallet = lazy(() =>
  import('../pages/Transaction/TransactionWallet')
)
const ChatUI = lazy(() => import('../pages/chat/ChatUI'))
const ChatWithAstrologer = lazy(() =>
  import('../pages/chat/ChatWithAstrologer')
)
const FreeKundali = lazy(() => import('../pages/kundali/FreeKundali'))
const FreeKundaliDetailsDashaVimshottariContent = lazy(() =>
  import('../pages/kundali/FreeKundaliDetailsDashaVimshottariContent')
)
const FreeKundaliDetailsKp = lazy(() =>
  import('../pages/kundali/FreeKundaliDetailsKp')
)
const FreeKundaliReport = lazy(() =>
  import('../pages/kundali/FreeKundaliReport')
)
const FreeKundliKundliDetailsAshtakvarga = lazy(() =>
  import('../pages/kundali/FreeKundliKundliDetailsAshtakvarga')
)
const FreeKundliKundliDetailsBasic = lazy(() =>
  import('../pages/kundali/FreeKundliKundliDetailsBasic')
)
const FreeKundliKundliDetailsCharts = lazy(() =>
  import('../pages/kundali/FreeKundliKundliDetailsCharts')
)
const FreeKundliKundliDetailsDashaVimshottari = lazy(() =>
  import('../pages/kundali/FreeKundliKundliDetailsDashaVimshottari')
)
const KundaliMatching = lazy(() => import('../pages/kundali/KundaliMatching'))
const KundaliMatchingReport = lazy(() =>
  import('../pages/kundali/KundaliMatchingReport')
)
const ContactSection = lazy(() => import('../pages/Contact/ContactSection'))
const PredictionPage = lazy(() =>
  import('../pages/PredictionPage/PredictionPage')
)
const RahuKaal = lazy(() => import('../pages/Kaal/RahuKaal'))
const BookPooja = lazy(() => import('../pages/BookPooja/BookPooja'))
const BookPoojaList = lazy(() => import('../pages/BookPooja/BookPoojaList'))

const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

export const usePathRedirection = () => {
  const ROUTES = UpdatedPaths()

  const PathRedirection = useMemo(() => {
    const routes = [
      { auth: false, path: ROUTES.LOGIN, element: <Login /> },
      { auth: false, path: ROUTES.HOMEPAGE, element: <HomePage /> },
      { auth: false, path: ROUTES.TALKWITHASTROLOGER, element: <TalkWithAstrologer /> },
      { auth: false, path: ROUTES.CHATWITHASTROLOGERS, element: <ChatWithAstrologer /> },
      { auth: false, path: ROUTES.FREEKUNDALI, element: <FreeKundali /> },
      { auth: false, path: ROUTES.KUNDALI_MATCHING, element: <KundaliMatching /> },
      { auth: false, path: ROUTES.KUNDALI_MATCHING_REPORT, element: <KundaliMatchingReport /> },
      { auth: false, path: ROUTES.HOROSCOPE, element: <YearlyHoroscope /> },
      { auth: false, path: ROUTES.COMPATABILITY, element: <Compatibility /> },
      { auth: false, path: ROUTES.PHONE_AUTH_MODALS, element: <PhoneAuthModals /> },
      { auth: false, path: ROUTES.FESTIVAL_CALENDER, element: <FestivalCalender /> },
      { auth: false, path: ROUTES.GOLD_BUYING_MUHURAT, element: <GoldBuyingMuhurat /> },
      { auth: false, path: ROUTES.MARRIAGE_MUHURAT, element: <MarriageMuhurat /> },
      { auth: false, path: ROUTES.BHUMIPUJA_MUHURAT, element: <BhumiPujaMuhurat /> },
      { auth: false, path: ROUTES.NAMKARAN_MUHURAT, element: <NamkaranMuhurat /> },
      { auth: false, path: ROUTES.CARBIKE_MUHURAT, element: <CarBikeMuhurat /> },
      { auth: false, path: ROUTES.OUR_ASTROLOGER, element: <AstrologerListPage /> },
      { auth: false, path: ROUTES.ASTROLOGER_DETAIL_PAGE, element: <AstrologerDetailPage /> },
      { auth: true, path: ROUTES.PROFILE_SETTING, element: <ProfileSetting /> },
      { auth: false, path: ROUTES.PRIVACY_POLICY, element: <PrivacyPolicy /> },
      { auth: false, path: ROUTES.TERMS_CONDITIONS, element: <TermsAndCondition /> },
      { auth: false, path: ROUTES.PAYMENT_SCREEN, element: <PaymentDetails /> },
      { auth: false, path: ROUTES.WEEKLY_HOROSCOPE, element: <TodaysHoroscope /> },
      { auth: false, path: ROUTES.WEEKLY_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
      { auth: false, path: ROUTES.YEARLY_HOROSCOPE, element: <TodaysHoroscope /> },
      { auth: false, path: ROUTES.YEARLY_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
      { auth: false, path: ROUTES.TODAYS_SINGLE_HOROSCOPE, element: <YearlySingleHoroscope /> },
      { auth: false, path: ROUTES.FREE_KUNDLI_KUNDLI_DETAILS_BASIC, element: <FreeKundliKundliDetailsBasic /> },
      { auth: false, path: ROUTES.FREE_KUNDALI_DETAILS_KP, element: <FreeKundaliDetailsKp /> },
      { auth: false, path: ROUTES.FREEKUNDALI_DETAILS, element: <CustomTabs /> },
      { auth: false, path: ROUTES.FREE_KUNDLI_KUNDLI_DETAILS_CHARTS, element: <FreeKundliKundliDetailsCharts /> },
      { auth: false, path: ROUTES.FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA, element: <FreeKundliKundliDetailsAshtakvarga /> },
      { auth: false, path: ROUTES.FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI, element: <FreeKundliKundliDetailsDashaVimshottari /> },
      { auth: false, path: ROUTES.FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT, element: <FreeKundaliDetailsDashaVimshottariContent /> },
      { auth: false, path: ROUTES.FREE_KUNDALI_REPORT, element: <FreeKundaliReport /> },
      { auth: false, path: ROUTES.BLOG, element: <Blog /> },
      { auth: false, path: ROUTES.BLOG_SINGLE_PAGE, element: <BlogDetails /> },
      { auth: false, path: ROUTES.ALL_HOROSCOPE, element: <TodaysHoroscope /> },
      { auth: false, path: ROUTES.ALL_HOROSCOPE_DETAILS, element: <YearlySingleHoroscope /> },
      { auth: true, path: ROUTES.TRANSACTION_WALLET, element: <TransactionWallet /> },
      { auth: false, path: ROUTES.ORDER_HISTORY_CALL, element: <OrderHistoryCall /> },
      { auth: false, path: ROUTES.SUPPORT_CHAT, element: <SupportChatPage /> },
      { auth: true, path: ROUTES.CHAT_SCREEN, element: <ChatUI /> },
      { auth: false, path: ROUTES.CHAT_ID, element: <ChatUI /> },
      { auth: false, path: ROUTES.TODAYS_PANCHANGAM, element: <TodaysPanchang /> },
      { auth: true, path: ROUTES.MONEY_WALLET, element: <MoneyWallet /> },
      { auth: false, path: ROUTES.PREDICTION, element: <PredictionPage /> },
      { auth: false, path: ROUTES.GENERAL_PREDICTION, element: <PredictionPage /> },
      { auth: false, path: ROUTES.NOT_FOUND, element: <NotFound /> },
      { auth: false, path: ROUTES.CONTACT_US, element: <ContactSection /> },
      { auth: false, path: ROUTES?.RAHU_KAAL, element: <RahuKaal /> },
      { auth: false, path: ROUTES?.BOOK_POOJA, element: <BookPooja /> },
      { auth: false, path: ROUTES?.BOOK_POOJA_LIST, element: <BookPoojaList /> },
//------------------------------------------------------------ language------------------------------------------------------------
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
      { auth: false, path: PATHS_LANGUAGE?.BOOK_POOJA, element: <BookPooja /> },
      { auth: false, path: PATHS_LANGUAGE?.BOOK_POOJA_LIST, element: <BookPoojaList /> }
    ]
    return routes
  }, [UpdatedPaths])

  return PathRedirection
}
