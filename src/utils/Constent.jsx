import { UpdatedPaths } from "../routers/Paths"

export const PRODUCTION = false

export const Constatnt = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  API_KEY: import.meta.env.VITE_APP_API_KEY,
  CONTENT_TYPE: import.meta.env.VITE_CONTENT_TYPE || 'Application/json',
  API_BASE_URL: PRODUCTION
    ? import.meta.env.VITE_APP_API_LOCAL_URL
    : import.meta.env.VITE_APP_API_LIVE_URL,

  // # ----------------------------- Encreption keys --------------------------------------

  KEY: import.meta.env.VITE_APP_KEY,
  IV: import.meta.env.VITE_APP_IV,

  // # ----------------------------- S3 bucket keys --------------------------------------

  PUBLIC_URL: import.meta.env.PUBLIC_URL,

  // Razorpay constants

  // VITE_APP_RAZORPAY_SECRET: import.meta.env.VITE_APP_RAZORPAY_SECRET,
  VITE_APP_RAZORPAY_KEY_ID: import.meta.env.VITE_APP_RAZORPAY_KEY_ID,

  // --------------------------- response code manage---------------------------------------

  SUCCESS: '1',
  INVALID_OR_FAIL: '0',
  NO_DATA_FOUND: '2',
  DELETE_ACCOUNT: '3',
  USER_SESSION_EXPIRE: '-1',

  // --------------------------local storage creandtials-----------------------------------------

  LOGIN_KEY: 'ASTRO_is_login',
  AUTH_KEY: 'ASTRO_auth',
  ACCESS_TOKEN_KEY: 'ASTRO_access_token',
  REFRESH_TOKEN_KEY: 'ASTRO_refresh_token',
  LANGUAGE_KEY: 'ASTRO_language',
  ROLE_KEY: 'ASTRO_role',
  THEME_KEY: 'ASTRO_theme',
  KUNDLI_KEY: 'Kundli_details',
  PANCHANGE_KEY: 'panchang_details',


  // -------------------------- Static content -----------------------------------------

  LANGUAGE: localStorage.getItem('ASTRO_language')
    ? localStorage.getItem('ASTRO_language')
    : 'en',
  IS_LOGIN_USER: localStorage.getItem('ASTRO_is_login')
    ? localStorage.getItem('ASTRO_is_login')
    : false,

  ROLE: 'astro_website',

  BASE_URL: 'assets/images/page-images/',
  ASTRO_LOGO: 'https://asset.brandfetch.io/idytuKuy3T/idAr5_YhOc.png?updated=1635890167830',
  DEFAULT_IMAGE: 'https://chatmyastrologer-assets.s3.us-east-1.amazonaws.com/chatmyastrologer/Profileimage/1742977887778.png',

  SEARCH_DELAY: 500,
  PER_PAGE_DATA: 8,
  COUNT_PER_PAGE: 10,

  //----------------  socket url  -----------------------
  
  SOCKETURL: import.meta.env.VITE_APP_SOCKETURL,

  // -------------------- Api for i love pdf-------------------------------------------

  PDF_API_BASE_URL: 'https://api.ilovepdf.com/v1/',
  PDF_API_SERVER_URL: 'https://api.ilovepdf.com/v1/',

  // PATHS: UpdatedPaths()
}
