import CryptoJS from 'crypto-js'
import { toast } from 'react-toastify'
import { Constatnt } from './Constent'
// import ExcelJS from 'exceljs'
// import jsPDF from 'jspdf'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import i18next from 'i18next'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { updateToken } from '../services/api/api.services'
import imageCompression from 'browser-image-compression';

import {
  setIsScroll,
  setLoading,
  setModel,
  setUserLoginData
} from '../storemain/slice/MasterSlice'
import {
  Codes,
  InputRegex,
  InputTypesEnum,
  LanguageOption,
  TimeFormat
} from './CommonVariable'
import { getDispatcher } from './navigations/NavigationService'
import axios from 'axios'

dayjs.extend(utc)
dayjs.extend(timezone)

const KEY = CryptoJS.enc.Utf8.parse(Constatnt.KEY)
const IV = CryptoJS.enc.Utf8.parse(Constatnt.IV)
// ------------------------------------------------------- Encryption Decreption ---------------------------------------------------------------------------

export const Encryption = (request = {}, isStringify) => {
  const requestData = isStringify ? JSON.stringify(request) : request
  let encrypted = CryptoJS.AES.encrypt(requestData, KEY, { iv: IV }).toString()
  return encrypted
}

export const Decryption = async response => {
  let decrypted = await CryptoJS.AES.decrypt(response.toString(), KEY, {
    iv: IV
  })
  let decryptedData = await JSON.parse(decrypted.toString(CryptoJS.enc.Utf8))
  if (decryptedData?.code === '0') {
    TOAST_ERROR(decryptedData?.message)
  }
  if (decryptedData?.code === -1) {
    logoutRedirection()
  }
  return decryptedData
}

export const hasAtLeastOneResponseData = response => {
  return (
    response &&
    Object.values(response).some(
      value => value && Object.keys(value).length > 0
    )
  )
}
// ------------------------------------------------------- Login/Logout Redirection -----------------------------------------------------------------------

export const loginRedirection = data => {
  // const navigate = useNavigate();
  localStorage.setItem(Constatnt.LOGIN_KEY, true)
  localStorage.setItem(Constatnt.ROLE_KEY, data?.role)
  localStorage.setItem(Constatnt.ACCESS_TOKEN_KEY, data?.accessToken)
  localStorage.setItem(Constatnt.REFRESH_TOKEN_KEY, data?.refreshToken)
  localStorage.setItem(Constatnt.AUTH_KEY, JSON.stringify(data))
}

export const logoutRedirection = () => {
  localStorage.removeItem(Constatnt.LOGIN_KEY)
  localStorage.removeItem(Constatnt.AUTH_KEY)
  // localStorage.removeItem(Constatnt.ROLE_KEY)
  localStorage.removeItem(Constatnt.ACCESS_TOKEN_KEY)
  localStorage.removeItem(Constatnt.REFRESH_TOKEN_KEY)
  // localStorage.clear()
  const dispatch = getDispatcher()
  if (dispatch) {
    dispatch(setUserLoginData({ is_login: false, loginUserData: '' }))
  }
}

// export const ManageTokan = async response => {
//   const refresh_token = localStorage.getItem(Constatnt?.REFRESH_TOKEN_KEY)
//   if (refresh_token) {
//     updateToken({ refresh_token: refresh_token }).then(response => {
//       if (response?.code === Codes.SUCCESS) {
//         localStorage.setItem(
//           Constatnt.ACCESS_TOKEN_KEY,
//           response?.data?.accessToken
//         )
//         localStorage.setItem(
//           Constatnt.REFRESH_TOKEN_KEY,
//           response?.data?.refreshToken
//         )
//       } else if (response?.code === Codes?.USER_SESSION_EXPIRE) {
//         logoutRedirection()
//       } else {
//         logoutRedirection()
//       }
//     })
//   } else {
//     logoutRedirection()
//   }
// }

export const ManageTokan = async response => {
  try {
    const refresh_token = localStorage.getItem(Constatnt?.REFRESH_TOKEN_KEY)
    if (!refresh_token) {
      logoutRedirection()
      return false
    }
    const res = await updateToken({ refresh_token })
    if (res?.code === Codes.SUCCESS) {
      localStorage.setItem(Constatnt.ACCESS_TOKEN_KEY, res?.data?.accessToken)
      localStorage.setItem(Constatnt.REFRESH_TOKEN_KEY, res?.data?.refreshToken)
      return true
    } else if (res?.code === Codes.USER_REFRESH_SESSION_EXPIRE) {
      logoutRedirection()
      return false
    } else {
      logoutRedirection()
      return false
    }
  } catch (error) {
    console.error('Error while managing token:', error)
    logoutRedirection()
    return false
  }
}

export const getFileNameFromUrl = url => {
  return url ? url.split('/').pop() : ''
}

export const formatDate = (dateString, formatPattern) => {
  return moment(dateString).format(formatPattern)
}

export const setLoginUserData = ( dispatch, is_login, loginUserData, sliceMethod, changeData ) => {
   let preparedData = {
    ...loginUserData,
    ...changeData
  }
  localStorage.setItem(Constatnt.AUTH_KEY, JSON.stringify(preparedData))
  dispatch(sliceMethod({ is_login: is_login, loginUserData: preparedData }))
}

export const formatTime = (timeString, formatPattern) => {
  return moment(timeString, ['hh:mm:ss A', 'HH:mm:ss']).format(formatPattern)
}

export const getFormattedDay = dateString => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)
}

export const getFormattedMonth = dateString => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', { month: 'short' })
    .format(date)
    .toUpperCase()
}

//  const dateString = "2025-03-28T09:44:09.091Z";

export const getArrayFromCommaSeparated = str => {
  return str.split(',')
}

// ------------------------------------------------------- Toast Modal ------------------------------------------------------------------------------------

export const TOAST_ERROR = message => {
  return toast.error(message)
}

export const TOAST_SUCCESS = message => {
  return toast.success(message)
}

export const TOAST_INFO = message => {
  return toast.info(message)
}

export const TOAST_WARNING = message => {
  return toast.warning(message)
}

export const getDateProfile = date => {
  return date && dayjs(date, 'DD/MM/YYYY', true).isValid()
    ? dayjs(date, 'DD/MM/YYYY')
    : null
}

export const sendDateProfile = date => {
  if (date === null || date === undefined) return null
  else {
    const formattedDate = moment(date?.$d)?.format('DD/MM/YYYY') || null
    return formattedDate
  }
}

// ------------------------------------------------------- chat navigate --------------------------------------------------------------------------------------

export const navigateChat = (navigate, dispatch, dispatchEventName, Encryption, record, chatType, EncryptionType) => {
  let findLang = Object.keys(LanguageOption).find(ele => {
    if (LanguageOption?.[ele] === window.location.pathname.split('/')[1]) {
      return LanguageOption?.[ele]
    }
  })

  let rec = cloneDeep(record)
  rec.chatType = chatType
  let encry = Encryption(rec, EncryptionType)
  const safeEncrypted = encodeURIComponent(encry)
  dispatch(dispatchEventName(rec))

  if (findLang) {
    navigate(`/${LanguageOption?.[findLang]}/chat/${safeEncrypted}`)
  } else {
    navigate(`/chat/${safeEncrypted}`)
  }
}

export const utcToTst = time => {
  return dayjs(time).utc().tz('Asia/Kolkata').format('hh:mm A') || ''
}

// ------------------------------------------------------- Export file --------------------------------------------------------------------------------------

const toGuDigits = numberString => {
  const gujaratiDigits = ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯']
  return numberString.replace(/\d/g, digit => gujaratiDigits[digit])
}

const toHiDigits = numberString => {
  const hindiDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
  return numberString.replace(/\d/g, digit => hindiDigits[digit])
}

export const getLocalizedDigits = numberString => {
  if (typeof window === 'undefined') return null
  const lang = window.location.pathname.split('/')[1]
  if (lang === 'gu') return toGuDigits(numberString)
  if (lang === 'hi') return toHiDigits(numberString)
  return numberString
}

const convertToBase64 = async file => {
  if (file.type.includes('video')) return URL.createObjectURL(file)
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = reject
    file && fileReader.readAsDataURL(file)
  })
}

// ------------------------------------------------------- Page Loadable manage ------------------------------------------------------------------------------------

export const Loadable = Component => props =>
(
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
)

// ------------------------------------------------------- Manage maodels ------------------------------------------------------------------------------------

export const closeModel = dispatch => {
  dispatch(setModel({ model_type: '', is_model: false }))
}

export const openModel = (dispatch, type) => {
  dispatch(setModel({ is_model: true, model_type: type }))
}

export const closeLoder = dispatch => {
  dispatch(setLoading({ loding_type: '', is_loading: false }))
}

export const openLoader = (dispatch, type) => {
  dispatch(setLoading({ is_loading: true, loding_type: type }))
}

export const closeFilter = dispatch => {
  dispatch(setIsScroll({ is_scroll: false, is_scroll_type: '' }))
}

export const openFilter = (dispatch, type) => {
  dispatch(setIsScroll({ is_scroll: true, is_scroll_type: type }))
}

// ------------------------------------------------------- Form Validation manage ------------------------------------------------------------------------------------

// export const Translate = keyword => {
//   const { t, i18n } = useTranslation()
//   return t(keyword)
// }

export const Translate = key => i18next.t(key)

export const getLocationValidationRule = (isPlaceSelectedRef, t, selecteLocation) => [
  { required: true, message: t('enter_place_of_birth') },
  {
    validator: (_, value) => {
      if (!value) return Promise.resolve()

      if (
        !isPlaceSelectedRef.current &&
        Object.keys(selecteLocation).length === 0
      ) {
        return Promise.reject(
          new Error(t('please_select_place_from_suggestion'))
        )
      }

      return Promise.resolve()
    }
  }
]

export const FORM_RULS = {
  [InputTypesEnum?.NAME]: [
    { required: true, message: Translate('enter_your_name') },
    {
      pattern: InputRegex?.CHAR_REGEX,
      message: Translate('only_character_is_allowed')
    }
  ],
  [InputTypesEnum?.EMAIL]: [
    { required: true, message: Translate('enter_email') }
  ],
  [InputTypesEnum?.GIRL_NAME]: [
    { required: true, message: Translate('enter_your_name') },
    { pattern: InputRegex?.CHAR_REGEX, message: 'only_character_is_allowed' }
  ],

  [InputTypesEnum?.GENDER]: [
    { required: true, message: Translate('select_gender') }
  ],

  [InputTypesEnum?.DAY]: [{ required: true, message: 'Select day' }],
  [InputTypesEnum?.DAY_2]: [{ required: true, message: 'Select day' }],

  [InputTypesEnum?.MONTH]: [{ required: true, message: 'Select month' }],
  [InputTypesEnum?.MONTH_2]: [{ required: true, message: 'Select day' }],

  [InputTypesEnum?.YEAR]: [{ required: true, message: 'Select year' }],
  [InputTypesEnum?.YEAR_2]: [{ required: true, message: 'Select year' }],

  [InputTypesEnum?.HOURS]: [{ required: true, message: 'Select hours' }],
  [InputTypesEnum?.HOURS_2]: [{ required: true, message: 'Select hours' }],

  [InputTypesEnum?.MINUTE_2]: [{ required: true, message: 'Select minute' }],
  [InputTypesEnum?.MINUTE]: [{ required: true, message: 'Select minute' }],

  [InputTypesEnum?.SECOND]: [{ required: true, message: 'Select second' }],
  [InputTypesEnum?.SECOND_2]: [{ required: true, message: 'Select second' }],

  [InputTypesEnum?.LOCATION]: [
    { required: true, message: Translate('enter_place_of_birth') },
    {}
  ],
  [InputTypesEnum?.LOCATION_2]: [
    { required: true, message: Translate('enter_place_of_birth') }
  ],

  [InputTypesEnum?.FIRSTNAME]: [
    { required: false, message: 'Enter first name' },
    { pattern: InputRegex?.CHAR_REGEX, message: 'Only character is allowed' }
  ],
  [InputTypesEnum?.LASTNAME]: [
    { required: false, message: 'Enter last name' },
    { pattern: InputRegex?.CHAR_REGEX, message: 'Only character is allowed' }
  ]
}

export const FORM_RULS_NO_REQUIRED = {
  [InputTypesEnum?.NAME]: [
    { required: false, message: 'Enter your name' },
    { pattern: InputRegex?.CHAR_REGEX, message: 'Only character is allowed' }
  ],
  [InputTypesEnum?.EMAIL]: [
    { required: false, message: 'Enter Email' },
    { pattern: InputRegex?.EMAIL_REGEX, message: 'Enter valid email' }
  ],

  [InputTypesEnum?.GIRL_NAME]: [
    { required: false, message: 'Enter your name' },
    { pattern: InputRegex?.CHAR_REGEX, message: 'Only character is allowed' }
  ],

  [InputTypesEnum?.GENDER]: [{ required: false, message: 'Select gender' }],

  [InputTypesEnum?.DAY]: [{ required: false, message: 'Select day' }],
  [InputTypesEnum?.DAY_2]: [{ required: false, message: 'Select day' }],

  [InputTypesEnum?.MONTH]: [{ required: false, message: 'Select month' }],
  [InputTypesEnum?.MONTH_2]: [{ required: false, message: 'Select day' }],

  [InputTypesEnum?.YEAR]: [{ required: false, message: 'Select year' }],
  [InputTypesEnum?.YEAR_2]: [{ required: false, message: 'Select year' }],

  [InputTypesEnum?.HOURS]: [{ required: false, message: 'Select hours' }],
  [InputTypesEnum?.HOURS_2]: [{ required: false, message: 'Select hours' }],

  [InputTypesEnum?.MINUTE_2]: [{ required: false, message: 'Select minute' }],
  [InputTypesEnum?.MINUTE]: [{ required: false, message: 'Select minute' }],

  [InputTypesEnum?.SECOND]: [{ required: false, message: 'Select second' }],
  [InputTypesEnum?.SECOND_2]: [{ required: false, message: 'Select second' }],

  [InputTypesEnum?.LOCATION]: [
    { required: false, message: 'Enter place of birth' }
  ],

  [InputTypesEnum?.DOB]: [
    { required: true, message: Translate('enter_date_of_birth') }
  ],
  [InputTypesEnum?.TOB]: [
    { required: true, message: Translate('enter_time_of_birth') }
  ],
  [InputTypesEnum?.PLACE_OF_BIRTH]: [
    { required: true, message: Translate('enter_place_of_birth') }
  ],

  [InputTypesEnum?.LOCATION_2]: [
    { required: false, message: Translate('enter_place_of_birth') }
  ],

  [InputTypesEnum?.FIRSTNAME]: [
    { required: false, message: 'Enter first name' },
    { pattern: InputRegex?.CHAR_REGEX, message: 'Only character is allowed' }
  ],
  [InputTypesEnum?.LASTNAME]: [
    { required: false, message: 'Enter last name' },
    { pattern: InputRegex?.CHAR_REGEX, message: 'Only character is allowed' }
  ]
}

const handleInputChange = (key, value) => {
  // Validate the input using regex
  const isValid = FORM_RULS[key]?.some(rule =>
    rule.pattern ? rule.pattern?.test(value) : false
  )

  // If valid, update the form field directly
  if (isValid || value === '') {
    form.setFieldsValue({ [key]: value })
  }
}

export const formatMomentToYYYYMMDD = momentObj => {
  return moment(momentObj.$d).format('YYYY-MM-DD')
}

export const formatTimeTo12Hour = momentObj => {
  return moment(momentObj._d).format(TimeFormat?.TIME_24_HOUR_FORMAT)
}

export const getCurrentTimeFormatted = () => {
  const now = new Date()

  return now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
}

export const getTodayDateFormatted = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatThirdPartyContent = (stringData = '') => {
  if (!stringData || typeof stringData !== 'string') return ''

  return stringData
    .replace(/\n/g, '<br />')
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/<\/b><br\s*\/?>/g, '</b>')
}

export function isValidJSON(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

// ------------------------------------------------------- Seo Page ------------------------------------------------------------------------------------

export const SEOTITLE = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />

      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:url' content={window.location.href} />

      {/* <meta
        name='apple-itunes-app'
        content='app-id=6738792695'
        app-argument={window.location.href}
      /> */}

      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='keywords' content={keyword} />
    </Helmet>
  )
}

// export const getCurrentCity = async () => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       async position => {
//         try {
//           const lat = position.coords.latitude
//           const lon = position.coords.longitude

//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
//           )
//           const data = await response.json()

//           const cityName =
//             data.address.state_district ||
//             data.address.city ||
//             data.address.town ||
//             data.address.village ||
//             data.address.state ||
//             ''
//           resolve(cityName)
//         } catch (err) {
//           resolve('Ahmedabad')
//         }
//       },
//       geoError => {
//         resolve('Ahmedabad')
//       }
//     )
//   })
// }

export const getCurrentCity = async () => {
  return `Ahmedabad`

  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const response = await axios.get(
            'https://nominatim.openstreetmap.org/reverse',
            {
              params: {
                format: 'json',
                lat,
                lon
              }
            }
          );

          const data = response.data;

          const cityName =
            data.address.state_district ||
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state ||
            '';

          resolve(cityName);
        } catch (err) {
          resolve('Ahmedabad');
        }
      },
      geoError => {
        resolve('Ahmedabad');
      }
    );
  });
};

export const compressAndResizeImage = async (file, width = 184, height = 184) => {
  // Step 1: Compress
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 0.2,
    maxWidthOrHeight: Math.max(width, height),
    useWebWorker: true
  });

  // Step 2: Resize using Canvas
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], compressedFile.name, { type: compressedFile.type });
          resolve(resizedFile);
        }, compressedFile.type, 0.8); // quality
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(compressedFile);
  });
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const weekdayNames = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export const formatDateReadable = (dateStr) => {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const getOrdinalSuffix = (n) => {
    if (n > 3 && n < 21) return n + "th";
    switch (n % 10) {
      case 1: return n + "st";
      case 2: return n + "nd";
      case 3: return n + "rd";
      default: return n + "th";
    }
  };

  const formattedDate = `${getOrdinalSuffix(day)} ${monthNames[month - 1]} ${year}`;
  const weekday = weekdayNames[date.getDay()];

  return {
    formattedDate,
    weekday
  };
}

export const convertTo12Hour = (timeStr) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export default {
  convertToBase64,
  Encryption,
  Decryption,
  TOAST_ERROR,
  TOAST_WARNING,
  TOAST_INFO,
  toGuDigits,
  toHiDigits
  // ExportToCSV,
  // ExportToExcel,
  // ExportToPdf
}

// -------------------------corp image

// utils/CommonFunction.js or cropUtils.js
export const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = 'anonymous'

    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = pixelCrop.width
      canvas.height = pixelCrop.height

      // Draw circular clipping path
      ctx.beginPath()
      ctx.arc(
        pixelCrop.width / 2,
        pixelCrop.height / 2,
        pixelCrop.width / 2,
        0,
        2 * Math.PI
      )
      ctx.closePath()
      ctx.clip()

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )

      // Compress with 70% quality (0.7)
      canvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error('Canvas is empty'))
          resolve(blob)
        },
        'image/jpeg',
        0.7 // <-- compression quality (range: 0 to 1)
      )
    }

    image.onerror = (err) => reject(err)
  })
}



