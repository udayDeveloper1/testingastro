

import {
  AutoComplete,
  Avatar,
  Card,
  Form,
  Input,
  List,
  Radio,
  Select
} from 'antd'
import moment from 'moment'
import { lazy, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import commonSearch from '../../assets/img/common/search.svg'
import icon from '../../assets/img/common/suffixIcon.svg'
import Delete from '../../assets/img/kundali/delete.svg'
import checkLoginImage from '../../assets/img/kundali/kundalicheckLoginImage.webp'
import Edit from '../../assets/img/kundali/kundli-icon-edit.svg'
import useDebounce from '../../pages/hooks/useDebounce'
// import { PATHS } from "../../routers/Paths";
import {
  addKundliMatchDetails,
  editFreeKundliDetails,
  geo_search,
  getAntarDashaTh,
  getAshtakvargaTh,
  getCharDashaMainTh,
  getCharDashaSubTh,
  getDivisionalChartTh,
  getFriendShipTh,
  getKaalsarpDoshTh,
  getMahaDashaPredictionTh,
  getMahaDashaTh,
  getMangalDoshTh,
  getMangalikDoshTh,
  getPanchangTh,
  getPitraDoshTh,
  getPlanetsDetailsTh,
  getSadeSatiTh,
  getShadbalaTh,
  getYoginiDashaSubTh,
  kundliMatchDelete,
  kundliMatchList,
  kundliPredication
} from '../../services/api/api.services'
import {
  setKundliDetailsData,
  setModel
} from '../../storemain/slice/MasterSlice'
import {
  closeLoder,
  closeModel,
  FORM_RULS,
  formatDate,
  formatTime,
  getLocationValidationRule,
  openLoader,
  openModel,
  TOAST_ERROR,
  TOAST_SUCCESS,
  Translate
} from '../../utils/CommonFunction'
import {
  Codes,
  DateFormat,
  InputTypesEnum,
  LanguageOption,
  TimeFormat
} from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import { kundaliDetailsNavigate } from '../../utils/navigations/NavigationPage'
import ConfirmModal from '../Modals/ConfirmModal'
import { KundliChartType } from '../NewKundaliComp/KundliVariabls'
import PhoneAuthModal from '../auth/PhoneAuthModals'
import Loader from '../loader/Loader'
import { UpdatedPaths } from '../../routers/Paths'
const CustomButton = lazy(() => import('../Homepage/CustomButton'))

const { Option } = Select

const FreeKundali = () => {
  const formRef = useRef(null)
  if (formRef.current) {
    if (window.innerHeight < 768) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  const customIcon = (
    <img src={icon} alt='dropdown' style={{ width: 16, height: 16 }} />
  )
  const location = useLocation()
  const PATHS = UpdatedPaths()

  const pathname = location?.pathname

  const [form] = Form.useForm()
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()

  const [selectedItem, setSelectedItem] = useState({})
  const [showModal, setShowModal] = useState(false)

  const modal = useSelector(state => state?.masterSlice?.modal)
  const loder = useSelector(state => state?.masterSlice?.loader)
  const loginUser = useSelector(state => state?.masterSlice?.loginUser)
  const localstorage_isLogin = localStorage.getItem(Constatnt?.LOGIN_KEY)
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH
  const myLanguage = useSelector(state => state?.masterSlice?.currentLanguage)

  const [placeOptions, setPlaceOptions] = useState([])
  const [selecteLocation, setSelectedLocation] = useState({})
  const searchTimeoutRef = useRef(null)
  const isPlaceSelected = useRef(false)

  const [_, setRender] = useState(0)
  const [freeKundliEdit, setFreeKundliEdit] = useState(false)
  const navigate = useNavigate()

  const currentYear = moment().year() // Get current year
  const currentMonth = moment().month() + 1 // Get current month (1-12)

  // Generate days dynamically based on selected month and year
  const getDaysInMonth = (month, year) => {
    return Array.from(
      { length: moment(`${year}-${month}`, 'YYYY-MM').daysInMonth() },
      (_, i) => String(i + 1).padStart(2, '0')
    )
  }

  // Generate months (01-12)
  const months = Array.from({ length: 12 }, (_, i) =>
    moment().month(i).format('MMM')
  )

  // Generate years (last 100 years)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

  // Generate hours (00-23)
  const hours = Array.from({ length: 24 }, (_, i) =>
    moment({ hour: i }).format('HH')
  )
  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) =>
    moment({ minute: i }).format('mm')
  )
  // Generate seconds (00-59)
  const seconds = Array.from({ length: 60 }, (_, i) =>
    moment({ second: i }).format('ss')
  )

  const kundliDetailsApiCalling = async data => {

    console.log('data kundliDetailsApiCalling', data);
    openLoader(dispatch, 'freeKundli_form')

    let updatedRequest = {
      dob: data?.date,
      tob: formatTime(data?.time, TimeFormat?.TIME_24_HOUR_FORMAT),
      tz: data?.tz,
      lat: data?.lat,
      lon: data?.lon,
      lang: data?.lang
    }

    let request = {
      date: data?.date,
      time: formatTime(data?.time, TimeFormat?.TIME_24_HOUR_FORMAT),
      lat: data?.lat,
      lon: data?.lon,
      tz: data?.tz,
      lang: data?.lang,
      bop: data?.bop,
      gender: data?.gender || '123',
      u_name: data?.u_name || '123',
      tzon: data?.tzone
    }

    const kundliDetails = {}
    try {
      const [
        panchangRes,
        planetRes,
        charDashaSub,
        yoginiDashaSub,
        mahaDashaPrediction,
        getMangalDosh,
        getKaalsarpDosh,
        getMangalikDosh,
        getPitraDosh,
        rashiLagnaChart,
        navamsaChart,
        chalitChart,
        sunChart,
        moonChart,
        transitChart,
        varshapalChart,
        ashtakvarga,
        shadBala,
        mahaDasha,
        antarDasha,
        charDashaMain,
        friendShip,
        sadeSati
        // kundliPredicationDaily,
        // kundliPredicationMonthly,
        // kundliPredicationLife,
      ] = await Promise.all([
        getPanchangTh(request),
        // getPlanetsDetailsTh(updatedRequest),
        // getCharDashaSubTh(updatedRequest),
        // getYoginiDashaSubTh(updatedRequest),
        // getMahaDashaPredictionTh(updatedRequest),

        // getMangalDoshTh(updatedRequest),
        // getKaalsarpDoshTh(updatedRequest),
        // getMangalikDoshTh(updatedRequest),
        // getPitraDoshTh(updatedRequest),

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.D1,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // })

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.D9,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // }),

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.chalit,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // }),

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.sun,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // }),

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.moon,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // }),

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.transit,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // }),

        // getDivisionalChartTh({
        //   ...updatedRequest,
        //   div: KundliChartType.varshapal,
        //   transit_date: moment().format('DD/MM/YYYY'),
        //   year: moment().format('YYYY')
        // }),

        // getAshtakvargaTh(updatedRequest),
        // getShadbalaTh(updatedRequest),
        // getMahaDashaTh(updatedRequest),
        // getAntarDashaTh(updatedRequest),
        // getCharDashaMainTh(updatedRequest),
        // getFriendShipTh(updatedRequest),
        // getSadeSatiTh(updatedRequest),

        // kundliPredication({
        //   ...updatedRequest,
        //   type: "daily",
        // }),

        // kundliPredication({
        //   ...updatedRequest,
        //   type: "monthly ",
        // }),

        // kundliPredication({
        //   ...updatedRequest,
        //   type: "life ",
        // })
      ])

      if (panchangRes?.code === Codes?.SUCCESS) {
        kundliDetails.panchangeDetails = panchangRes?.data
      } else {
        kundliDetails.panchangeDetails = {}
      }

      // if (planetRes?.code === Codes?.SUCCESS) {
      //   kundliDetails.planetDetails = planetRes?.data?.response
      // } else {
      //   kundliDetails.planetDetails = {}
      // }

      // if (charDashaSub?.code === Codes?.SUCCESS) {
      //   kundliDetails.charDashaSub = charDashaSub?.data?.response
      // } else {
      //   kundliDetails.charDashaSub = {}
      // }

      // if (yoginiDashaSub?.code === Codes?.SUCCESS) {
      //   kundliDetails.yoginiDashaSub = yoginiDashaSub?.data?.response
      // } else {
      //   kundliDetails.yoginiDashaSub = {}
      // }

      // if (mahaDashaPrediction?.code === Codes?.SUCCESS) {
      //   kundliDetails.mahaDashaPrediction = mahaDashaPrediction?.data?.response
      // } else {
      //   kundliDetails.mahaDashaPrediction = {}
      // }

      // if (getMangalDosh?.code === Codes?.SUCCESS) {
      //   kundliDetails.DoshReport = getMangalDosh?.data?.response
      // } else {
      //   kundliDetails.DoshReport = {}
      // }

      // if (getKaalsarpDosh?.code === Codes?.SUCCESS) {
      //   kundliDetails.KaalsarpDosh = getKaalsarpDosh?.data?.response
      // } else {
      //   kundliDetails.KaalsarpDosh = {}
      // }

      // if (getMangalikDosh?.code === Codes?.SUCCESS) {
      //   kundliDetails.mangalikDosh = getMangalikDosh?.data?.response
      // } else {
      //   kundliDetails.mangalikDosh = {}
      // }

      // if (getPitraDosh?.code === Codes?.SUCCESS) {
      //   kundliDetails.pitraDosh = getPitraDosh?.data?.response
      // } else {
      //   kundliDetails.pitraDosh = {}
      // }

      // if (getMangalDosh?.code === Codes?.SUCCESS) {
      //   kundliDetails.mangalDosh = getMangalDosh?.data?.response
      // } else {
      //   kundliDetails.mangalDosh = {}
      // }

      // if (rashiLagnaChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.rashiLagnaChart = rashiLagnaChart?.data?.response
      // } else {
      //   kundliDetails.rashiLagnaChart = {}
      // }

      // if (navamsaChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.navamsaChart = navamsaChart?.data?.response
      // } else {
      //   kundliDetails.navamsaChart = {}
      // }

      // if (chalitChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.chalitChart = chalitChart?.data?.response
      // } else {
      //   kundliDetails.chalitChart = {}
      // }

      // if (sunChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.sunChart = sunChart?.data?.response
      // } else {
      //   kundliDetails.sunChart = {}
      // }

      // if (moonChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.moonChart = moonChart?.data?.response
      // } else {
      //   kundliDetails.moonChart = {}
      // }

      // if (transitChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.transitChart = transitChart?.data?.response
      // } else {
      //   kundliDetails.transitChart = {}
      // }

      // if (varshapalChart?.code === Codes?.SUCCESS) {
      //   kundliDetails.varshapalChart = varshapalChart?.data?.response
      // } else {
      //   kundliDetails.varshapalChart = {}
      // }

      // if (ashtakvarga?.code === Codes?.SUCCESS) {
      //   kundliDetails.ashtakvarga = ashtakvarga?.data?.response
      // } else {
      //   kundliDetails.ashtakvarga = {}
      // }

      // if (shadBala?.code === Codes?.SUCCESS) {
      //   kundliDetails.shadBala = shadBala?.data?.response
      // } else {
      //   kundliDetails.shadBala = {}
      // }

      // if (mahaDasha?.code === Codes?.SUCCESS) {
      //   kundliDetails.mahaDasha = mahaDasha?.data?.response
      // } else {
      //   kundliDetails.mahaDasha = {}
      // }

      // if (antarDasha?.code === Codes?.SUCCESS) {
      //   kundliDetails.antarDasha = antarDasha?.data?.response
      // } else {
      //   kundliDetails.antarDasha = {}
      // }

      // if (charDashaMain?.code === Codes?.SUCCESS) {
      //   kundliDetails.charDashaMain = charDashaMain?.data?.response
      // } else {
      //   kundliDetails.charDashaMain = {}
      // }

      // if (friendShip?.code === Codes?.SUCCESS) {
      //   kundliDetails.friendShip = friendShip?.data?.response
      // } else {
      //   kundliDetails.friendShip = {}
      // }

      // if (sadeSati?.code === Codes?.SUCCESS) {
      //   kundliDetails.sadeSati = sadeSati?.data?.response
      // } else {
      //   kundliDetails.sadeSati = {}
      // }

      // kundliDetails.kundliPredication = {
      //   daily: kundliPredicationDaily?.code === Codes?.SUCCESS ? kundliPredicationDaily?.data || "" : "",
      //   monthly: kundliPredicationMonthly?.code === Codes?.SUCCESS ? kundliPredicationMonthly?.data || "" : "",
      //   life: kundliPredicationLife?.code === Codes?.SUCCESS ? kundliPredicationLife?.data || "" : "",
      // };

      return kundliDetails
    } catch (error) {
      console.error('Error fetching kundli details:', error)
      return kundliDetails
    }
  }
  // 06/06/2025
  const onFinish = async value => {

    console.log('onFinishonFinish 00000000', value);

    openLoader(dispatch, 'freeKundli_form')
    let request_2 = {
      [value?.gender]: {
        name: value[InputTypesEnum?.NAME],
        // dob: `${value[InputTypesEnum?.YEAR]}-${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}-${value[InputTypesEnum?.DAY]}`,
        dob: `${value[InputTypesEnum?.DAY]}/${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR]}`,
        time_of_birth: formatTime(`${value?.hours}:${value?.minute}:${value?.second}`, TimeFormat?.TIME_WITH_SECONDS_24_HOUR_FORMAT),
        place_of_birth: value[InputTypesEnum?.LOCATION],
        details: {
          year: value[InputTypesEnum?.YEAR],
          month: moment().month(value[InputTypesEnum?.MONTH]).format('MM'),
          date: value[InputTypesEnum?.DAY],
          hours: value[InputTypesEnum?.HOURS],
          minutes: value[InputTypesEnum?.MINUTE],
          seconds: value[InputTypesEnum?.SECOND],
          latitude: selecteLocation?.coordinates[0],
          longitude: selecteLocation?.coordinates[1],
          timezone: selecteLocation?.tz,
          tzone: selecteLocation?.tzone[0]
        }
      }
    }

    let request = {
      date: `${value[InputTypesEnum?.DAY]}/${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR]}`,
      time: `${value[InputTypesEnum?.HOURS]}:${value[InputTypesEnum?.MINUTE]}`,
      tz: selecteLocation?.tz,
      lat: selecteLocation?.coordinates[0],
      lon: selecteLocation?.coordinates[1],
      tzone: selecteLocation?.tzone[0],
      bop: value[InputTypesEnum?.LOCATION],
      gender: value[InputTypesEnum?.GENDER],
      u_name: value[InputTypesEnum?.NAME],
      lang: myLanguage || LanguageOption?.ENGLISH // myLanguage,
    }

    console.log('requestrequest', request_2);
    // return
    try {
      if (loginUser?.is_login) {
        if (freeKundliEdit) {
          let editKUndliRequest = {
            kundli_id: value?.[InputTypesEnum?.ID],
            name: value[InputTypesEnum?.NAME],
            // dob: `${value[InputTypesEnum?.YEAR]}-${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}-${value[InputTypesEnum?.DAY]}`,
            dob: `${value[InputTypesEnum?.DAY]}/${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR]}`,
            gender: value[InputTypesEnum?.GENDER],
            time_of_birth: formatTime(`${value?.[InputTypesEnum?.HOURS]}:${value?.[InputTypesEnum?.MINUTE]}:${value?.[InputTypesEnum?.SECOND]}`, TimeFormat?.TIME_WITH_SECONDS_24_HOUR_FORMAT),
            place_of_birth: value[InputTypesEnum?.LOCATION],
            year: value[InputTypesEnum?.YEAR],
            month: moment().month(value[InputTypesEnum?.MONTH]).format('MM'),
            date: value[InputTypesEnum?.DAY],
            hours: value[InputTypesEnum?.HOURS],
            minutes: value[InputTypesEnum?.MINUTE],
            seconds: value[InputTypesEnum?.SECOND],
            latitude: selecteLocation?.coordinates[0],
            longitude: selecteLocation?.coordinates[1],
            tzone: selecteLocation?.tz,
            timezone: selecteLocation?.tz
          }
          const response1 = await editFreeKundliDetails(editKUndliRequest)
          if (response1?.code === Codes?.SUCCESS) {
            // TOAST_SUCCESS(response1?.message);
            const kundliData = await kundliDetailsApiCalling(request)

            localStorage.setItem(Constatnt?.KUNDLI_KEY, JSON.stringify(kundliData))
            dispatch(setKundliDetailsData(kundliData))
            kundaliDetailsNavigate(navigate, 'basic', kundliData, PATHS.FREEKUNDALI_DETAILS)
            // closeLoder(dispatch);
          } else {
            TOAST_ERROR(response1?.message)
          }
        } else {
          const response1 = await addKundliMatchDetails(request_2)
          if (response1?.code === Codes?.SUCCESS) {
            // TOAST_SUCCESS(response1?.message);
            const kundliData = await kundliDetailsApiCalling(request)
            // return
            localStorage.setItem(
              Constatnt?.KUNDLI_KEY,
              JSON.stringify(kundliData)
            )
            dispatch(setKundliDetailsData(kundliData))
            // kundaliDetailsNavigate(navigate, "basic", kundliData); // Navigate after all done
            kundaliDetailsNavigate(
              navigate,
              'basic',
              kundliData,
              PATHS.FREEKUNDALI_DETAILS
            )

            // closeLoder(dispatch);
          } else {
            TOAST_ERROR(response1?.message)
            closeLoder(dispatch)
          }
        }
      } else {
        const response = await getPanchangTh(request)
        if (response?.code === Codes?.SUCCESS) {
          TOAST_SUCCESS(response?.message)
          const kundliData = await kundliDetailsApiCalling(request)

          localStorage.setItem(Constatnt?.KUNDLI_KEY, JSON.stringify(kundliData))
          dispatch(setKundliDetailsData(kundliData))
          // kundaliDetailsNavigate(navigate, "basic", kundliData); // Navigate after all done
          kundaliDetailsNavigate(
            navigate,
            'basic',
            kundliData,
            PATHS.FREEKUNDALI_DETAILS
          )
          // closeLoder(dispatch);
        } else {
          TOAST_ERROR(response?.message)
        }
      }
    } catch (err) {
      console.error(err)
      TOAST_ERROR('Something went wrong!')
    } finally {
      // closeLoder(dispatch);  // Always close loader after try/catch completes
    }
  }

  useEffect(() => {
    const handleLanguageChange = () => {
      setRender(prev => prev + 1) // Force re-render
    }

    i18n.on('languageChanged', handleLanguageChange)

    return () => {
      i18n.off('languageChanged', handleLanguageChange)
    }
  }, [])

  const handleInputChange = (key, value) => {
    const rule = FORM_RULS[key]?.find(rule => rule.pattern)
    const filteredValue = value.replace(/[^A-Za-z\s]/g, '')
    form.setFieldsValue({ [key]: filteredValue })
  }

  const handleSearchPlace = value => {
    isPlaceSelected.current = false // Reset when user types manually

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (value.trim().length < 3) {
        setPlaceOptions([])
        return
      }

      try {
        const data = { city: value }
        const response = await geo_search(data)

        if (response?.code === 1 && Array.isArray(response?.data?.response)) {
          const options = response.data.response.map(item => ({
            ...item,
            value: item.full_name
          }))
          setPlaceOptions(options)
          // setPlaceOptions(response.data.response)
        } else {
          setPlaceOptions([])
        }
      } catch (error) {
        console.error('Geo search failed', error)
        setPlaceOptions([])
      }
    }, 500)
  }

  const locationRules = useMemo(() => getLocationValidationRule(isPlaceSelected, t, selecteLocation),
    [t, selecteLocation]
  )

  useEffect(() => {
    form.setFieldsValue({
      [InputTypesEnum?.GENDER]: 'male',
      [InputTypesEnum?.DAY]: moment().format('DD'),
      [InputTypesEnum?.MONTH]: moment().format('MMM'),
      [InputTypesEnum?.YEAR]: moment().format('YYYY'),
      [InputTypesEnum?.HOURS]: moment().format('HH'),
      [InputTypesEnum?.MINUTE]: moment().format('mm'),
      [InputTypesEnum?.SECOND]: moment().format('ss'),
      [InputTypesEnum?.LOCATION]: ''
    })
  }, [form])

  const handleEditKundliClick = Data => {
    // if (formRef.current) {
    //   formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // }
    console.log('handleListItemClick Data', {
      name: Data?.place_of_birth,
      alternate_name: Data?.place_of_birth,
      country: '',
      country_name: '',
      full_name: Data?.place_of_birth,
      coordinates: [Data?.latitude, Data?.longitude],
      tz: Data?.timezone,
      tz_dst: Data?.timezone,
      current_dst: false,
      tzone: ['Asia/Kolkata'],
      value: Data?.place_of_birth
    });
    // return
    let req = {
      [InputTypesEnum?.ID]: Data?._id,
      [InputTypesEnum?.NAME]: Data?.name,
      // [InputTypesEnum?.DAY]: Data?.date,
      // [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
      // [InputTypesEnum?.YEAR]: Data?.year,
      [InputTypesEnum?.DAY]: moment(Data?.date, 'D').format('DD'),
      [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
      [InputTypesEnum?.YEAR]: moment(Data?.year, 'YYYY').format('YYYY'),
      // [InputTypesEnum?.HOURS]: Data?.hours,
      // [InputTypesEnum?.MINUTE]: Data?.minutes,
      // [InputTypesEnum?.SECOND]: Data?.seconds,
      [InputTypesEnum?.HOURS]: moment(Data?.hours, 'H').format('HH'),
      [InputTypesEnum?.MINUTE]: moment(Data?.minutes, 'm').format('mm'),
      [InputTypesEnum?.SECOND]: moment(Data?.seconds, 's').format('ss'),
      [InputTypesEnum?.LOCATION]: Data?.place_of_birth, // e.g., "45"
      [InputTypesEnum?.GENDER]: Data?.gender
    }
    console.log('handleListItemClick req', req);
    // return
    form?.setFieldsValue({
      [InputTypesEnum?.ID]: Data?._id,
      [InputTypesEnum?.NAME]: Data?.name,
      // [InputTypesEnum?.DAY]: Data?.date,
      // [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
      // [InputTypesEnum?.YEAR]: Data?.year,
      [InputTypesEnum?.DAY]: moment(Data?.date, 'D').format('DD'),
      [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
      [InputTypesEnum?.YEAR]: moment(Data?.year, 'YYYY').format('YYYY'),
      // [InputTypesEnum?.HOURS]: Data?.hours,
      // [InputTypesEnum?.MINUTE]: Data?.minutes,
      // [InputTypesEnum?.SECOND]: Data?.seconds,
      [InputTypesEnum?.HOURS]: moment(Data?.hours, 'H').format('HH'),
      [InputTypesEnum?.MINUTE]: moment(Data?.minutes, 'm').format('mm'),
      [InputTypesEnum?.SECOND]: moment(Data?.seconds, 's').format('ss'),
      [InputTypesEnum?.LOCATION]: Data?.place_of_birth, // e.g., "45"
      [InputTypesEnum?.GENDER]: Data?.gender
    })

    console.log('selecteLocation', selecteLocation);

    setSelectedLocation({
      name: Data?.place_of_birth,
      alternate_name: Data?.place_of_birth,
      country: '',
      country_name: '',
      full_name: Data?.place_of_birth,
      coordinates: [Data?.latitude, Data?.longitude],
      tz: Data?.timezone,
      tz_dst: Data?.timezone,
      current_dst: false,
      tzone: ['Asia/Kolkata'],
      value: Data?.place_of_birth
    })

    setFreeKundliEdit(true)
  }

  const handleListItemClick = Data => {

    // console.log('selecteLocation', Data);

    // console.log('handleListItemClick Data', {
    //   [InputTypesEnum?.ID]: Data?._id,
    //   [InputTypesEnum?.NAME]: Data?.name,
    //   // [InputTypesEnum?.DAY]: Data?.date,
    //   // [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
    //   // [InputTypesEnum?.YEAR]: Data?.year,
    //   [InputTypesEnum?.DAY]: moment(Data?.date, 'D').format('DD'),
    //   [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
    //   [InputTypesEnum?.YEAR]: moment(Data?.year, 'YYYY').format('YYYY'),
    //   // [InputTypesEnum?.HOURS]: Data?.hours, // e.g., "13"
    //   // [InputTypesEnum?.MINUTE]: Data?.minutes, // e.g., "07"
    //   // [InputTypesEnum?.SECOND]: Data?.seconds,
    //   [InputTypesEnum?.HOURS]: moment(Data?.hours, 'H').format('HH'),
    //   [InputTypesEnum?.MINUTE]: moment(Data?.minutes, 'm').format('mm'),
    //   [InputTypesEnum?.SECOND]: moment(Data?.seconds, 's').format('ss'),
    //   [InputTypesEnum?.LOCATION]: Data?.place_of_birth, // e.g., "45"
    //   [InputTypesEnum?.GENDER]: Data?.gender
    // });
    // return

    form?.setFieldsValue({
      [InputTypesEnum?.ID]: Data?._id,
      [InputTypesEnum?.NAME]: Data?.name,
      // [InputTypesEnum?.DAY]: Data?.date,
      // [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
      // [InputTypesEnum?.YEAR]: Data?.year,
      [InputTypesEnum?.DAY]: moment(Data?.date, 'D').format('DD'),
      [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
      [InputTypesEnum?.YEAR]: moment(Data?.year, 'YYYY').format('YYYY'),
      // [InputTypesEnum?.HOURS]: Data?.hours, // e.g., "13"
      // [InputTypesEnum?.MINUTE]: Data?.minutes, // e.g., "07"
      // [InputTypesEnum?.SECOND]: Data?.seconds,
      [InputTypesEnum?.HOURS]: moment(Data?.hours, 'H').format('HH'),
      [InputTypesEnum?.MINUTE]: moment(Data?.minutes, 'm').format('mm'),
      [InputTypesEnum?.SECOND]: moment(Data?.seconds, 's').format('ss'),
      [InputTypesEnum?.LOCATION]: Data?.place_of_birth, // e.g., "45"
      [InputTypesEnum?.GENDER]: Data?.gender
    })
    setSelectedLocation({
      name: Data?.place_of_birth,
      alternate_name: Data?.place_of_birth,
      country: '',
      country_name: '',
      full_name: Data?.place_of_birth,
      coordinates: [Data?.latitude, Data?.longitude],
      tz: Data?.timezone,
      tz_dst: Data?.timezone,
      current_dst: false,
      tzone: ['Asia/Kolkata'],
      value: Data?.place_of_birth
    })

    setFreeKundliEdit(true)
    form?.submit()
  }

  const [listKundliMatch, setListKundliMatch] = useState(null)
  const [searchText, setSearchText] = useState('')
  const debounce = useDebounce(searchText, Constatnt?.SEARCH_DELAY)

  const fetch = async (page = 1) => {
    const response = await kundliMatchList({
      page: page,
      search: searchText,
      per_page: 1000
    })
    if (response?.code === Codes?.SUCCESS) {
      setListKundliMatch(response?.data)
    } else if (response?.code === Codes?.NO_DATA_FOUND) {
      setListKundliMatch([])
    }
  }

  useEffect(() => {

    if (pathname == PATHS?.FREEKUNDALI) {
      if (loginUser?.is_login) {
        fetch()
      }
    }
  }, [loginUser?.is_login, debounce, pathname])

  const handleDelete = () => {
    kundliMatchDelete({ kundli_id: selectedItem?._id }).then(response => {
      if (response?.code === Codes?.SUCCESS) {
        const updatedList = listKundliMatch?.KundliMatchList?.filter(
          item => item?._id !== selectedItem?._id
        )
        setListKundliMatch({
          ...listKundliMatch,
          KundliMatchList: updatedList
        })
        closeModel(dispatch)
        TOAST_SUCCESS(response?.message)
      } else {
        TOAST_ERROR(response?.message)
      }
    })
  }

  return (
    <>
      <div
        className={`grid grid-cols-1 ${pathname == PATHS?.FREEKUNDALI ? 'lg:grid-cols-3' : ''
          } gap-y-4 lg:gap-4 w-full`}
        ref={formRef}
      >
        <Card className='w-full col-span-3 lg:col-span-2 relative freeKundaliCardNew h-full '>
          {loder?.is_loading && loder?.loding_type === 'freeKundli_form' && (
            <Loader />
          )}

          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            className='customForm flex flex-col gap-4 justify-between h-full'
          >
            {pathname == PATHS?.FREEKUNDALI && (
              <h2 className='customFormH2 text-start'>
                {freeKundliEdit ? t('edit_title') : t('title')}
              </h2>
            )}

            <div className='flex flex-col md:flex-row gap-4'>
              <Form.Item name={InputTypesEnum.ID} hidden>
                <Input />
              </Form.Item>
              <Form.Item
                name={InputTypesEnum.NAME}
                label={t('name')}
                rules={FORM_RULS[InputTypesEnum.NAME]}
                className='w-full md:w-1/2 mb-0'
              >
                <Input
                  placeholder={t('enter_name')}
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  onChange={e =>
                    handleInputChange(InputTypesEnum.NAME, e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                name={InputTypesEnum.GENDER}
                label={t('gender')}
                rules={FORM_RULS[InputTypesEnum.GENDER]}
                className='w-full md:w-1/2 mb-0'
              >
                <Radio.Group>
                  <Radio value='male'>{t('male')}</Radio>
                  <Radio value='female'>{t('female')}</Radio>
                  {/* <Radio value='other'>{t('other')}</Radio> */}
                </Radio.Group>
              </Form.Item>
            </div>

            <div className='flex gap-4'>
              <Form.Item
                name={InputTypesEnum.DAY}
                label={t('day')}
                rules={FORM_RULS[InputTypesEnum.DAY]}
                className='w-1/3 mb-0'
              >
                <Select
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  suffixIcon={customIcon}
                  showSearch
                >
                  {getDaysInMonth(currentMonth, currentYear).map(d => (
                    <Option key={d} value={d}>
                      {d}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={InputTypesEnum.MONTH}
                label={t('month')}
                rules={FORM_RULS[InputTypesEnum.MONTH]}
                className='w-1/3 mb-0'
              >
                <Select
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  suffixIcon={customIcon}
                  showSearch
                >
                  {months.map(m => (
                    <Option key={m} value={m}>
                      {m}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={InputTypesEnum.YEAR}
                label={t('year')}
                rules={FORM_RULS[InputTypesEnum.YEAR]}
                className='w-1/3 mb-0'
              >
                <Select
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  suffixIcon={customIcon}
                  showSearch
                >
                  {years.map(y => (
                    <Option key={y} value={y}>
                      {y}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Time */}
            <div className='flex gap-4'>
              <Form.Item
                name={InputTypesEnum.HOURS}
                label={t('hour')}
                rules={FORM_RULS[InputTypesEnum.HOURS]}
                className='w-1/3 mb-0'
              >
                <Select
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  suffixIcon={customIcon}
                  showSearch
                >
                  {hours.map(h => (
                    <Option key={h} value={h}>
                      {h}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={InputTypesEnum.MINUTE}
                label={t('minute')}
                rules={FORM_RULS[InputTypesEnum.MINUTE]}
                className='w-1/3 mb-0'
              >
                <Select
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  suffixIcon={customIcon}
                  showSearch
                >
                  {minutes.map(m => (
                    <Option key={m} value={m}>
                      {m}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name={InputTypesEnum.SECOND}
                label={t('second')}
                rules={FORM_RULS[InputTypesEnum.SECOND]}
                className='w-1/3 mb-0'
              >
                <Select
                  className={`${pathname == PATHS?.FREEKUNDALI
                    ? 'antDInput'
                    : 'antDNewInput'
                    }`}
                  suffixIcon={customIcon}
                  showSearch
                >
                  {seconds.map(s => (
                    <Option key={s} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            {/* Place */}
            <Form.Item
              name={InputTypesEnum.LOCATION}
              label={t('birth_place')}
              rules={locationRules}
              className='mb-0'
            >
              <AutoComplete
                options={placeOptions}
                onSearch={handleSearchPlace}
                value={form.getFieldValue(InputTypesEnum.LOCATION)}
                open={!isPlaceSelected.current && placeOptions.length > 0}
                onSelect={value => {
                  form.setFieldsValue({ [InputTypesEnum.LOCATION]: value })
                  isPlaceSelected.current = true
                  setSelectedLocation(
                    placeOptions.find(ele => ele.full_name === value)
                  )
                }}
                onChange={value => {
                  form.setFieldsValue({ [InputTypesEnum.LOCATION]: value })
                  isPlaceSelected.current = false
                }}
                placeholder={t('enter_place_birth')}
                className={`antDInput w-full mb-0 ${pathname == PATHS?.FREEKUNDALI ? 'antDInput' : 'antDNewInput'
                  }`}
              />
            </Form.Item>

            {/* Submit */}
            <Form.Item className='w-full mb-0'>
              <CustomButton
                type='primary'
                htmltype='submit'
                className='w-full  py-3 text-[16px] font-medium'
              >
                {freeKundliEdit
                  ? t('update_free_kundli')
                  : t('submit_free_kundli')}
              </CustomButton>
            </Form.Item>
          </Form>
        </Card>

        {pathname == PATHS?.FREEKUNDALI && (
          <>
            <Card className='col-span-3 lg:col-span-1 newKundaliCard'>
              <h2 className='customFormH2 pb-3  '>{t('save_kundli')}</h2>
              {localstorage_isLogin ? (
                <>
                  <Input
                    prefix={
                      <div className='w-[30px] h-[30px] flex items-center justify-center rounded-full commonLightBack mr-2'>
                        <img className='w-[15px] h-[15px]' src={commonSearch} />
                      </div>
                    }
                    placeholder={t('search_kundli')}
                    className='antDInput mb-2'
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                  <h4 className='text-md font-semibold mb-2'>
                    {t('Recently_Opened')}
                  </h4>
                  <div className='max-h-[400px] overflow-y-auto custom-scrollbar'>
                    <List
                      dataSource={listKundliMatch?.KundliMatchList}
                      // dataSource={listKundliMatch?.KundliMatchList}
                      // pagination={{
                      //   current: currentPage,
                      //   pageSize: pageSize,
                      //   total: listKundliMatch?.KundliMatchList?.length || 0,
                      //   onChange: (page) => {
                      //     setCurrentPage(page);
                      //   },
                      // }}
                      className=''
                      renderItem={item => (
                        <List.Item className=' border-b'>
                          <div
                            className='grid grid-cols-5 gap-4 w-full cursor-pointer pr-3'
                            onClick={() => handleListItemClick(item)}
                          >
                            <div className='flex flex-col sm:flex-row gap-3 col-span-4'>
                              {/* <img
                                src={personImage}
                                alt='Avatar'
                                className='w-7 h-7 rounded-full'
                              /> */}
                              <Avatar
                                // src={personImage}
                                size={28}
                                // style={{ backgroundColor: '#87d068', fontSize: 14 }}
                                className='gradient-background background-cover'
                              >
                                {(item?.name?.[0] || 'N').toUpperCase()}
                              </Avatar>
                              <div className='text-sm'>
                                <div className='font-semibold text-base capitalize '>
                                  {item?.name || '-'}
                                </div>
                                <div className='commonQuesP'>
                                  {(item?.dob ? item.dob
                                    : '') +
                                    ' ' +
                                    (item?.time_of_birth
                                      ? formatTime(
                                        item.time_of_birth,
                                        TimeFormat?.TIME_12_HOUR_FORMAT
                                      )
                                      : '')}
                                </div>
                                <div className='commonQuesP'>
                                  {item?.place_of_birth}
                                </div>
                              </div>
                            </div>
                            <div
                              className='flex gap-2 justify-end col-span-1'
                              onClick={e => e.stopPropagation()}
                            >
                              <img
                                src={Edit}
                                onClick={() => handleEditKundliClick(item)}
                                className='w-[30px] h-[30px] cursor-pointer'
                                alt='Edit'
                              />
                              <img
                                src={Delete}
                                onClick={() => {
                                  openModel(dispatch, 'free_kundli_delete')
                                  setSelectedItem(item)
                                }}
                                className='w-[30px] h-[30px] cursor-pointer'
                                alt='Delete'
                              />
                            </div>
                          </div>
                        </List.Item>
                      )}
                    />
                    {/* <div ref={bottomRef} className="h-4" /> */}
                  </div>
                </>
              ) : (
                <div className='flex flex-col items-center justify-between h-[calc(100%-22px)]'>
                  <div className='flex flex-col items-center gap-[60px] pt-[60px] h-full w-full'>
                    <h2 className='text-[18px] font-medium text-center text-[#343434] '>
                      {t('please_login_kundli')}
                    </h2>

                    <div className='flex-1 flex flex-col pb-[25px] justify-between w-full'>
                      <img
                        src={checkLoginImage}
                        alt='Login Required'
                        className='max-w-[263px] block mx-auto'
                      />
                      <CustomButton
                        className='text-white  py-3 uppercase font-semibold'
                        parentClassName='mt-3 w-full'
                        onClick={() =>
                          dispatch(
                            setModel({ is_model: true, model_type: 'login' })
                          )
                        }
                      >
                        {t('login')}
                      </CustomButton>
                    </div>
                  </div>
                </div>
              )}

              {/* Modals */}
              <PhoneAuthModal
                isPhoneModalOpen={
                  modal?.is_model && modal?.model_type === 'login'
                }
                issetIsModalOpen={setShowModal}
              />

              <ConfirmModal
                isOpen={
                  modal?.is_model && modal?.model_type === 'free_kundli_delete'
                }
                title='Delete Kundli?'
                description='Are you sure you want to delete this Kundli? This action cannot be undone.'
                okText='Delete'
                cancelText='Cancel'
                onConfirm={handleDelete}
                onCancel={() => {
                  closeModel(dispatch)
                }}
              />
            </Card>
          </>
        )}
      </div>
    </>
  )
}

export default FreeKundali
