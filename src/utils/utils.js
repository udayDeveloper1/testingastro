
const PATHS1 = {
    LOGIN: "/login",
    HOMEPAGE: "/",
    TALKWITHASTROLOGER: "/talkWithAstrologer",
    CHATWITHASTROLOGERS: "/chatWithAstrologer",
    FREEKUNDALI: "/freeKundli",
    KUNDALI_MATCHING: "/kundaliMatching",
    KUNDALI_MATCHING_REPORT: "/kundaliMatchingReport",
    HOROSCOPE: "/horoscope",
    YEARLY_SINGLE_HOROSCOPE: "/yearlySingleHoroscope",
    TODAYS_HOROSCOPE: "/todaysHoroscope",
    TODAYS_SINGLE_HOROSCOPE: "/todaysSingleHoroscope",
    COMPATABILITY: "/compatibility",
    PHONE_AUTH_MODALS: "/phoneAuthModals",
    FESTIVAL_CALENDER: "/festivalCalender",
    GOLD_BUYING_MUHURAT: "/goldBuyingMuhurat",
    MARRIAGE_MUHURAT: "/marrigeMuhurat",
    BHUMIPUJA_MUHURAT: "/bhumipujaMuhurat",
    NAMKARAN_MUHURAT: "/namkaranMuhurat",
    CARBIKE_MUHURAT: "/carBikeMuhurat",
    OUR_ASTROLOGER: "/ourAstrologer",
    ASTROLOGER_DETAIL_PAGE: "/astrologerDetailPage/:id",
    FREE_KUNDLI_KUNDLI_DETAILS_BASIC: "/freeKundliKundliDetailsBasic",
    FREE_KUNDALI_DETAILS_KP: "/freeKundaliDetailsKp",
    FREE_KUNDLI_KUNDLI_DETAILS_CHARTS: "/freeKundliKundliDetailsCharts",
    FREE_KUNDLIKUNDLI_DETAILS_ASHTAKVARGA: "/freeKundliKundliDetailsAshtakvarga",
    FREE_KUNDLIKUNDLI_DETAILS_DASHA_VIMSHOTTARI: "/FreeKundliKundliDetailsDashaVimshottari",
    FREE_KUNDALI_DETAILS_DASHA_VIMSHOTTARI_CONTENT: "/freeKundaliDetailsDashaVimshottariContent",
    FREE_KUNDALI_REPORT: "/freeKundaliReport",
  };
 
  const BASE_URL = "https://vkwjr60f-5500.inc1.devtunnels.ms";
  const openPathInNewTab = (path) => {
    window.open(`${BASE_URL}${path}`, "_blank");
  };
 
 export  const openAllPaths = () => {
    // Object.values(PATHS1).forEach(openPathInNewTab);

    Object?.values(PATHS1)?.forEach((path, index) => {
        setTimeout(() => {
          window.open(`${BASE_URL}${path}`, "_blank");
        }, index * 500); // 500ms delay between each window open
      });
};
 
 
 
