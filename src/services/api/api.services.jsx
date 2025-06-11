// import { Encryption } from "../../utils/CommonFunction";

import AxiosClientApi from "../axios.services";
import thirdpartyAPI from "../thirdparty.services";


const AUTH = "user_auth";
const HOME = "home";
const COMMON = "common";
const APP = "app";
const ASTROLOGER = 'astrologers';
const CHAT = 'chat';

const RATTING_REVIEW = 'rating_review';
const THIRD_PARTY = 'third_party_api';
const PAYMENT = 'payment';
const KUNDALI_MATCH = 'kundli_match';
const UPLOAD = 'upload'
const API_V1 = 'api/v1'

/*====================================================
    Auth apis                                                                            
====================================================== */

export function login(request) {
    return AxiosClientApi.post(`${API_V1}/${AUTH}/login`, request, true)
}

export function updateToken(request) {
    return AxiosClientApi.post(`${API_V1}/${AUTH}/upd_refresh_token`, request, true)
}

export function sendOTP(request) {
    return AxiosClientApi.post(`${API_V1}/${AUTH}/send_otp`, request, true)
}

export function editProfile(request) {
    return AxiosClientApi.post(`${API_V1}/${AUTH}/edit_profile`, request, true)
}

export const deleteProfileUser = (request) => {
    return AxiosClientApi.post(`${API_V1}/${AUTH}/delete_account`, request, true)
}

export const uploadImage = (request, folderName) => {
    return AxiosClientApi.post(`${UPLOAD}/${folderName}`, request, true)
}

export function getUserDetails(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/get_details`, request, true)
}

export function updateLanguage(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/update_language`, request, true)
}

export function addNewsLatter(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/add_newsletter`, request, true)
}

export function filterDataList(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/filterdata_listing`, request, true)
}

export function genralPrediction(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/gen_predict_category_listing`, request, true)
}

export function genralPredictionDetails(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/get_general_prediction`, request, true)
}

export function addContactUs(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/add_contactus`, request, true)
}

export function getRahukalDetails(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/get_rahukalam`, request, true)
}

/*====================================================
    Home page apis                                                                        
====================================================== */

export function homePageListing(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${HOME}/homepage_listing`, request, true)
}

export function blogListing(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${HOME}/blog_listing`, request, true)
}

export function blogDetails(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${HOME}/blog_details`, request, true)
}

export function meetOurClient(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${HOME}/meetourclient_Listing`, request, true)
}


/*====================================================
   Astrologer LIst                                                              
====================================================== */


export function astrologerList(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${ASTROLOGER}/astrologers_filter`, request, true)
}

export function astrologerDetailsAPI(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${ASTROLOGER}/astrologers_details`, request, true)
}

/*====================================================
   Ratting Review Module                                                              
====================================================== */

export function rattingReviewList(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${RATTING_REVIEW}/rating_review_listing`, request, true)
}

export function addRattingReview(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${RATTING_REVIEW}/add_rating_review`, request, true)
}

/*====================================================
   Kundli Module                                                              
====================================================== */


export function addKundliMetching(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/getMatchmaking`, request, true)
}

export function kundliMatchList(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${KUNDALI_MATCH}/kundlimatch_listing`, request, true)
}

export function kundliMatchDelete(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${KUNDALI_MATCH}/delete_kundlimatch_details`, request, true)
}

export function addKundliMatchDetails(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${KUNDALI_MATCH}/add_kundlimatch_details`, request, true)
}

export function editFreeKundliDetails(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${KUNDALI_MATCH}/edit_kundlimatch_details`, request, true)
}

export function kundliPredication(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/prediction`, request, true)
}

//---------------------- Muhurat  Module ------------------------------//

export function generateMuhuratBlog(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/generateMuhuratBlog`, request, true)
}

export function getRemedies(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/get_remedies`, request, true)
}

/*====================================================
   FAQs LIst                                                              
====================================================== */

export function listFAQs(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/list_faqs`, request, true)
}

export function DashboardCount(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/dashboard_count`, request, true)
}


/*====================================================
   todays Panchang LIst                                                              
====================================================== */

export function todaysPanchang(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/getpanchang`, request, true)
}

export function planetDataTodayPanchang(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_planet_details`, request, true)
}

// chat with astrologer

export const getAstrologersDetails = (request) => {
    return AxiosClientApi.post(`${API_V1}/${APP}/${ASTROLOGER}/astrologers_details`, request, true)
}

export const giveStarPlusReview = (request) => {
    return AxiosClientApi.post(`${API_V1}/${APP}/${RATTING_REVIEW}/add_rating_review`, request, true)
}

export const chatHistory = (request) => {
    return AxiosClientApi.post(`${API_V1}/${CHAT}/chat_history`, request, true)
}

export const orderHistoryChat = (request) => {
    return AxiosClientApi.post(`${API_V1}/${CHAT}/chat_list`, request, true)
}

export const addChatduration = (request) => {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/add_chatduration`, request, true)
}

export const addChatRequest = request => {
    return AxiosClientApi.post(`${API_V1}/${CHAT}/add_chat_request`, request, true)
}


export const editChatRequest = request => {
    return AxiosClientApi.post(`${API_V1}/${CHAT}/edit_chat_request`, request, true)
}

// /*====================================================
//  S3 bucet upload api                                            
// ====================================================== */

export function s3BucketUploadAPI(request) {
    return AxiosClientApi.post(`${API_V1}/upload/${request?.folder_name}`, request, true)
}

/*====================================================
  Third party api                                                      
====================================================== */

export function getPanchangTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/getpanchang`, request, true)
}

export const geo_search = (request) => {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/geo_search`, request, true)
}

export function getPlanetsDetailsTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_planet_details`, request, true)
}

export function getCharDashaMainTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_chardasha_main`, request, true)
}

export function getCharDashaSubTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_chardasha_sub`, request, true)
}

export function getYoginiDashaSubTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_yoginidasha_sub`, request, true)
}

export function getMahaDashaPredictionTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_mahadasha_prediction`, request, true)
}

export function getDivisionalChartTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_divisional_chart`, request, true)
}

export function getAshtakvargaTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_ashtakvarga`, request, true)
}

export function getShadbalaTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_shadbala`, request, true)
}

export function getMahaDashaTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_mahadasha`, request, true)
}

export function getAntarDashaTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_antardasha`, request, true)
}

export function getFriendShipTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_friendship`, request, true)
}

// --------------------------------- Dosh report Start-----------------------------------------------

export function getMangalDoshTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_mangal_dosh`, request, true)
}

export function getKaalsarpDoshTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_kaalsarp_dosh`, request, true)
}

export function getMangalikDoshTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_manglik_dosh`, request, true)
}

export function getPitraDoshTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_pitra_dosh`, request, true)
}
export function getSadeSatiTh(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/get_sadesati_table`, request, true)
}
// --------------------------------- Dosh report End -----------------------------------------------



/*====================================================
  Payment module                                                    
====================================================== */

export function listWalletOffer(request) {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/wallet_offer_listing`, request, true)
}

export function applyCoupon(request) {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/apply_coupon`, request, true)
}

export function getWalletTransactions(request) {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/get_wallet_transactions`, request, true)
}

export function getPaymentLogs(request) {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/get_wallet_transactions`, request, true)
}

export function addRecharge(request) {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/add_recharge`, request, true)
}

export const verifyPayment = request => {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/verify_payment`, request, true)
}

export const deductMoneyFromWallet = (request) => {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/deduct_money_from_wallet`, request, true)
}

export const paymentAstrologerOfferWallet = (request) => {
    return AxiosClientApi.post(`${API_V1}/${PAYMENT}/chat_recharge_listing`, request, true)
}

// /*====================================================
//  I LOVE PDF                                                        
// ====================================================== */


export function pdfJpgStart(request) {
    return thirdpartyAPI.get(`/v1/start/pdfjpg`, request, true)
}

export function uploadFile(request) {
    return thirdpartyAPI.post(`${API_V1}/v1/upload`, request, true)
}

export function pdfProcess(request) {
    return thirdpartyAPI.post(`${API_V1}/v1/process`, request, true)
}

export function pdfDownload(request) {
    return thirdpartyAPI.get(`/v1/download/${'g27d4mrsg3ztmnzAgm5d3njAghbj4cAkrlk1zh75sylkjddpx5nx6fz6zml9bmfb883A8tf73h28x278fkAzvrwqs9prhmghbt73ydhzy3td8jh59zwAybnmvhy4y26spzv9lkzjz0998kwwvwtbsdxrh2'}`, request, true)
}

export function getHoroscope(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/horoscope`, request, true)
}

export function getHoroscopeList(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/horoscope_list`, request, true)
}

export function getWeeklyHoroscope(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/weekly_horoscope`, request, true)
}

export function getWeeklyHoroscopeList(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/weekly_horoscope_list`, request, true)
}

export function getYearlyHoroscope(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/yearly_horoscope`, request, true)
}

export function getYearlyHoroscopeList(request) {
    return AxiosClientApi.post(`${API_V1}/${THIRD_PARTY}/yearly_horoscope_list`, request, true)
}

// ----------------------kaal api -------------------

export function getRaahuKaal(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/get_rahukalam`, request, true)
}

// ---------------------- CMS PAGES api -------------------

export function getCmsPages(request) {
    return AxiosClientApi.post(`${API_V1}/${APP}/${COMMON}/list_pages`, request, true)
}