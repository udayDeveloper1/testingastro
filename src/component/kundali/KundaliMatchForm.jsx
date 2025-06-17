import { AutoComplete, Avatar, Card, Form, Input, List, Select } from 'antd'
import moment from 'moment'
import { lazy, memo, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import commonSearch from '../../assets/img/common/search.svg'
import boyImage from '../../assets/img/kundali/boyImage.webp'
import Delete from '../../assets/img/kundali/delete.svg'
import girlImage from '../../assets/img/kundali/girlImage.webp'
import useDebounce from '../../pages/hooks/useDebounce'

import icon from '../../assets/img/common/suffixIcon.svg'
import checkLoginImage from '../../assets/img/kundali/kundalicheckLoginImage.webp'
import { UpdatedPaths } from '../../routers/Paths'
import {
  addKundliMatchDetails,
  addKundliMetching,
  geo_search,
  kundliMatchDelete,
  kundliMatchList
} from '../../services/api/api.services'
import { setModel } from '../../storemain/slice/MasterSlice'
import {
  closeLoder,
  closeModel,
  FORM_RULS,
  formatTime,
  getLocationValidationRule,
  openLoader,
  openModel,
  TOAST_ERROR,
  TOAST_SUCCESS
} from '../../utils/CommonFunction'
import {
  Codes,
  InputTypesEnum,
  LanguageOption,
  TimeFormat
} from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import { kundlimatchingRedirection } from '../../utils/navigations/NavigationPage'
const CustomButton = lazy(() => import('../Homepage/CustomButton'))
const Loader = lazy(() => import('../loader/Loader'))
const ConfirmModal = lazy(() => import('../Modals/ConfirmModal'))
const PhoneAuthModal = lazy(() => import('../auth/PhoneAuthModals'))
const { Option } = Select

const KundaliMatchForm = () => {
  const formRef = useRef(null);
  const customIcon = (
    <img src={icon} alt='dropdown' style={{ width: 16, height: 16 }} />
  )
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const PATHS = UpdatedPaths()

  const { t } = useTranslation()

  const modal = useSelector(state => state?.masterSlice?.modal)
  const loginUser = useSelector(state => state?.masterSlice?.loginUser);
  const localstorage_isLogin = localStorage.getItem(Constatnt?.LOGIN_KEY)
  const loder = useSelector(state => state?.masterSlice?.loader)
  const myLanguage = useSelector(state => state?.masterSlice?.currentLanguage)

  const [boyForm] = Form.useForm()
  const [girlForm] = Form.useForm()
  const [matchedData, setMatchedData] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState({})
  const [placeOptions, setPlaceOptions] = useState([])
  const [placeOptionsGirl, setPlaceOptionsGirl] = useState([])
  const currentYear = moment().year()
  const currentMonth = moment().month() + 1
  const searchTimeoutRef = useRef(null)
  const isPlaceSelected = useRef(false)
  const searchTimeoutRefGirl = useRef(null)
  const isPlaceSelectedGirl = useRef(false)
  const [selectedBoyPlaceOfBirth, setSelectedBoyPlaceOfBirth] = useState([])
  const [selectedGirlPlaceOfBirth, setSelectedGirlPlaceOfBirth] = useState([])
  const [selectedBoyPlaceOfBirthValue, setSelectedBoyPlaceOfBirthValue] = useState({})
  const [selectedGirlPlaceOfBirthValue, setSelectedGirlPlaceOfBirthValue] = useState({})

  // Infinite scroll states
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const listRef = useRef(null)

  // Generate days dynamically based on selected month and year
  const getDaysInMonth = (month, year) => {
    return Array.from(
      { length: moment(`${year}-${month}`, 'YYYY-MM').daysInMonth() },
      (_, i) => String(i + 1).padStart(2, '0')
    )
  }

  const locationRules1 = useMemo(
    () => getLocationValidationRule(isPlaceSelected, t, selectedBoyPlaceOfBirthValue),
    [t, selectedBoyPlaceOfBirthValue]
  );

  const locationRules2 = useMemo(
    () => getLocationValidationRule(isPlaceSelectedGirl, t, selectedGirlPlaceOfBirthValue),
    [t, selectedGirlPlaceOfBirthValue]
  );


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

  const handleInputBoyChange = (key, value) => {
    const rule = FORM_RULS[key]?.find(rule => rule.pattern)
    const filteredValue = value.replace(/[^A-Za-z\s]/g, '')
    boyForm.setFieldsValue({ [key]: filteredValue })
  }

  const handleInputGirlChange = (key, value) => {
    const rule = FORM_RULS[key]?.find(rule => rule.pattern)
    const filteredValue = value.replace(/[^A-Za-z\s]/g, '')
    boyForm.setFieldsValue({ [key]: filteredValue })
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
    if (loginUser?.is_login) {
      fetch()
    }
  }, [loginUser?.is_login, debounce])

  const onSubmit = value => {
    openLoader(dispatch, 'freeKundli_match_form')
    let request = {
      female: {
        // dob: `${value[InputTypesEnum?.DAY_2]}/${moment(value[InputTypesEnum?.MONTH_2], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR_2]}`,
        dob: `${value[InputTypesEnum?.DAY_2]}/${moment(value[InputTypesEnum?.MONTH_2], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR_2]}`,
        tob: `${value[InputTypesEnum?.HOURS_2]}:${value[InputTypesEnum?.MINUTE_2]}`,
        tz: selectedGirlPlaceOfBirthValue?.tz,
        lat: selectedGirlPlaceOfBirthValue?.coordinates[0],
        lon: selectedGirlPlaceOfBirthValue?.coordinates[1],
        tzone: selectedGirlPlaceOfBirthValue?.tzone[0],
        bop: value[InputTypesEnum?.LOCATION],
        gender: 'female',
        u_name: value[InputTypesEnum?.GIRL_NAME]
      },
      male: {
        dob: `${value[InputTypesEnum?.DAY]}/${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR]}`,
        tob: `${value[InputTypesEnum?.HOURS]}:${value[InputTypesEnum?.MINUTE]}`,
        tz: selectedBoyPlaceOfBirthValue?.tz,
        lat: selectedBoyPlaceOfBirthValue?.coordinates[0],
        lon: selectedBoyPlaceOfBirthValue?.coordinates[1],
        tzone: selectedBoyPlaceOfBirthValue?.tzone[0],
        bop: value[InputTypesEnum?.LOCATION_2],
        gender: 'male',
        u_name: value[InputTypesEnum?.NAME]
      },
      lang: myLanguage || LanguageOption?.ENGLISH
    }

    const request_2 = {
      male: {
        name: value[InputTypesEnum?.NAME],
        // dob: `${value[InputTypesEnum?.YEAR]}-${moment( value[InputTypesEnum?.MONTH], 'MMM' ).format('MM')}-${value[InputTypesEnum?.DAY]}`,
        dob: `${value[InputTypesEnum?.DAY]}/${moment(value[InputTypesEnum?.MONTH], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR]}`,
        // time_of_birth: formatTime(`${value?.[InputTypesEnum?.HOURS]}:${value?.[InputTypesEnum?.MINUTE]}:${value?.[InputTypesEnum?.SECOND]}`, TimeFormat?.TIME_WITH_SECONDS_12_HOUR_FORMAT),
        time_of_birth: formatTime(`${value?.[InputTypesEnum?.HOURS]}:${value?.[InputTypesEnum?.MINUTE]}:${value?.[InputTypesEnum?.SECOND]}`, TimeFormat?.TIME_WITH_SECONDS_24_HOUR_FORMAT),
        place_of_birth: value[InputTypesEnum?.LOCATION],
        details: {
          year: value[InputTypesEnum?.YEAR],
          month: moment().month(value[InputTypesEnum?.MONTH]).format('MM'),
          date: value[InputTypesEnum?.DAY],
          hours: value[InputTypesEnum?.HOURS],
          minutes: value[InputTypesEnum?.MINUTE],
          seconds: value[InputTypesEnum?.SECOND],
          latitude: selectedBoyPlaceOfBirthValue?.coordinates[0],
          longitude: selectedBoyPlaceOfBirthValue?.coordinates[1],
          timezone: selectedGirlPlaceOfBirthValue?.tz,
          tzone: selectedBoyPlaceOfBirthValue?.tzone[0]
        }
      },
      female: {
        name: value[InputTypesEnum?.GIRL_NAME],
        // dob: `${value[InputTypesEnum?.YEAR_2]}-${moment( value[InputTypesEnum?.MONTH_2], 'MMM' ).format('MM')}-${value[InputTypesEnum?.DAY_2]}`,
        dob: `${value[InputTypesEnum?.DAY_2]}/${moment(value[InputTypesEnum?.MONTH_2], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR_2]}`,
        // time_of_birth: formatTime( `${value?.[InputTypesEnum?.HOURS_2]}:${value?.[InputTypesEnum?.MINUTE_2] }:${value?.[InputTypesEnum?.SECOND_2]}`, TimeFormat?.TIME_WITH_SECONDS_12_HOUR_FORMAT ),
        time_of_birth: formatTime(`${value?.[InputTypesEnum?.HOURS_2]}:${value?.[InputTypesEnum?.MINUTE_2]}:${value?.[InputTypesEnum?.SECOND_2]}`, TimeFormat?.TIME_WITH_SECONDS_24_HOUR_FORMAT),
        place_of_birth: value[InputTypesEnum?.LOCATION_2],
        details: {
          year: value[InputTypesEnum?.YEAR_2],
          month: moment().month(value[InputTypesEnum?.MONTH_2]).format('MM'),
          date: value[InputTypesEnum?.DAY_2],
          hours: value[InputTypesEnum?.HOURS_2],
          minutes: value[InputTypesEnum?.MINUTE_2],
          seconds: value[InputTypesEnum?.SECOND_2],
          latitude: selectedGirlPlaceOfBirthValue?.coordinates[0],
          longitude: selectedGirlPlaceOfBirthValue?.coordinates[1],
          timezone: selectedGirlPlaceOfBirthValue?.tz,
          tzone: selectedGirlPlaceOfBirthValue?.tzone[0]
        }
      }
    }

    loginUser?.is_login
      ? addKundliMatchDetails(request_2).then(response1 => {
        if (response1?.code === Codes?.SUCCESS) {
          addKundliMetching(request).then(response => {
            if (response?.code === Codes?.SUCCESS) {
              const navigationData = {
                ...request_2,
                ...response?.data
              }
              kundlimatchingRedirection(
                navigate,
                response?.data?.response?._id,
                navigationData,
                PATHS?.KUNDALI_MATCHING_REPORT
              )
              // TOAST_SUCCESS(response?.message)
              closeLoder(dispatch)
            } else {
              TOAST_ERROR(response?.message)
              closeLoder(dispatch)
            }
          })
        } else {
          TOAST_ERROR(response1?.message)
          closeLoder(dispatch)
        }
      })
      : addKundliMetching(request).then(response => {
        if (response?.code === Codes?.SUCCESS) {
          const navigationData = {
            ...request_2,
            ...response?.data
          }
          kundlimatchingRedirection(
            navigate,
            response?.data?.response?._id,
            navigationData,
            PATHS?.KUNDALI_MATCHING_REPORT
          )
          // TOAST_SUCCESS(response?.message);
          closeLoder(dispatch)
        } else {
          TOAST_ERROR(response?.message)
          closeLoder(dispatch)
        }
      })
  }

  const handleDelete = () => {
    kundliMatchDelete({ kundli_id: selectedItem?._id }).then(response => {
      if (response?.code === Codes?.SUCCESS) {
        const updatedList = listKundliMatch?.KundliMatchList?.filter(
          item => item._id !== selectedItem?._id
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

  useEffect(() => {
    boyForm?.setFieldsValue({
      [InputTypesEnum?.DAY]: moment().format('DD'),
      [InputTypesEnum?.MONTH]: moment().format('MMM'),
      [InputTypesEnum?.YEAR]: moment().format('YYYY'),
      [InputTypesEnum?.HOURS]: moment().format('HH'),
      [InputTypesEnum?.MINUTE]: moment().format('mm'),
      [InputTypesEnum?.SECOND]: moment().format('ss'),
      [InputTypesEnum?.DAY_2]: moment().format('DD'),
      [InputTypesEnum?.MONTH_2]: moment().format('MMM'),
      [InputTypesEnum?.YEAR_2]: moment().format('YYYY'),
      [InputTypesEnum?.HOURS_2]: moment().format('HH'),
      [InputTypesEnum?.MINUTE_2]: moment().format('mm'),
      [InputTypesEnum?.SECOND_2]: moment().format('ss')
    })
  }, [])

  const handleListItemClick = Data => {

    if (formRef.current) {
      if (window.innerHeight < 768) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    if (Data?.gender == 'female') {
      // setIsGirlEdit(true)
      boyForm?.setFieldsValue({
        [InputTypesEnum?.GIRL_NAME]: Data?.name,
        // [InputTypesEnum?.DAY_2]: Data?.date,
        // [InputTypesEnum?.MONTH_2]: moment().month(Data?.month - 1).format('MMM'),
        // [InputTypesEnum?.YEAR_2]: Data?.year,
        [InputTypesEnum?.DAY_2]: moment(Data?.date, 'D').format('DD'),
        [InputTypesEnum?.MONTH_2]: moment().month(Data?.month - 1).format('MMM'),
        [InputTypesEnum?.YEAR_2]: moment(Data?.year, 'YYYY').format('YYYY'),
        // [InputTypesEnum?.HOURS_2]: Data?.hours,
        // [InputTypesEnum?.MINUTE_2]: Data?.minutes,
        // [InputTypesEnum?.SECOND_2]: Data?.seconds,
        [InputTypesEnum?.HOURS_2]: moment(Data?.hours, 'H').format('HH'),
        [InputTypesEnum?.MINUTE_2]: moment(Data?.minutes, 'm').format('mm'),
        [InputTypesEnum?.SECOND_2]: moment(Data?.seconds, 's').format('ss'),
        [InputTypesEnum?.LOCATION_2]: Data?.place_of_birth
      })
      setSelectedGirlPlaceOfBirthValue({
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
    }

    if (Data?.gender == 'male') {
      // setIsBoyEdit(true)
      boyForm?.setFieldsValue({
        [InputTypesEnum?.NAME]: Data?.name,
        [InputTypesEnum?.DAY]: moment(Data?.date, 'D').format('DD'),
        [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
        [InputTypesEnum?.YEAR]: moment(Data?.year, 'YYYY').format('YYYY'),
        // [InputTypesEnum?.DAY]: Data?.date,
        // [InputTypesEnum?.MONTH]: moment().month(Data?.month - 1).format('MMM'),
        // [InputTypesEnum?.YEAR]: Data?.year,
        [InputTypesEnum?.HOURS]: moment(Data?.hours, 'H').format('HH'),
        [InputTypesEnum?.MINUTE]: moment(Data?.minutes, 'm').format('mm'),
        [InputTypesEnum?.SECOND]: moment(Data?.seconds, 's').format('ss'),
        // [InputTypesEnum?.HOURS]: Data?.hours,
        // [InputTypesEnum?.MINUTE]: Data?.minutes,
        // [InputTypesEnum?.SECOND]: Data?.seconds,
        [InputTypesEnum?.LOCATION]: Data?.place_of_birth
      })
      setSelectedBoyPlaceOfBirthValue({
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
    }

    if (Data?.gender == 'other') {
      setIsGirlEdit(true)
      boyForm?.setFieldsValue({
        [InputTypesEnum?.GIRL_NAME]: Data?.name,
        [InputTypesEnum?.DAY_2]: Data?.date,
        [InputTypesEnum?.MONTH_2]: moment(Data?.month).format('MMM'),
        [InputTypesEnum?.YEAR_2]: Data?.year,
        [InputTypesEnum?.HOURS_2]: Data?.hours,
        [InputTypesEnum?.MINUTE_2]: Data?.minutes,
        [InputTypesEnum?.SECOND_2]: Data?.seconds,
        [InputTypesEnum?.LOCATION_2]: Data?.place_of_birth
      })
      setSelectedGirlPlaceOfBirthValue({
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
    }
  }

  const handleSearchPlace = value => {
    isPlaceSelected.current = false

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (value?.trim().length < 3) {
        setPlaceOptions([])
        setSelectedBoyPlaceOfBirth([])
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
          setSelectedBoyPlaceOfBirth(response.data.response)
        } else {
          setPlaceOptions([])
          setSelectedBoyPlaceOfBirth([])
        }
      } catch (error) {
        console.error('Geo search failed', error)
        setPlaceOptions([])
        setSelectedBoyPlaceOfBirth([])
      }
    }, 200)
  }

  const handleSearchPlace2 = value => {
    isPlaceSelectedGirl.current = false

    if (searchTimeoutRefGirl.current) {
      clearTimeout(searchTimeoutRefGirl.current)
    }

    searchTimeoutRefGirl.current = setTimeout(async () => {
      if (value.trim().length < 3) {
        setPlaceOptionsGirl([])
        setSelectedGirlPlaceOfBirth([])
        return
      }

      try {
        const data = { city: value }
        const response = await geo_search(data)

        if (response?.code === 1 && Array.isArray(response?.data?.response)) {
          const options = response.data.response.map(item => ({
            value: item.full_name
          }))
          setPlaceOptionsGirl(options)
          setSelectedGirlPlaceOfBirth(response.data.response)
        } else {
          setPlaceOptionsGirl([])
          setSelectedGirlPlaceOfBirth([])
        }
      } catch (error) {
        console.error('Geo search failed', error)
        setPlaceOptionsGirl([])
        setSelectedGirlPlaceOfBirth([])
      }
    }, 200)
  }

  return (
    <>
      {/* {loder?.is_loading && loder?.loding_type === 'freeKundli_match_form' && <Loader />} */}
      {loder?.is_loading && loder?.loding_type === 'freeKundli_match_form' && (
        <Suspense fallback={<></>}>    <Loader /></Suspense>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-4 w-full'>
        <Card className='w-full col-span-3 lg:col-span-2  kundaliCardForm customForm  h-full' ref={formRef}>
          <Form
            form={boyForm}
            onFinish={onSubmit}
            layout='vertical'
            className='h-full grid grid-cols-1 gap-4'
          >
            <div className='flex flex-col lg:flex-row gap-5 lg:gap-4'>
              {/* Boy's Details */}
              <div className=' rounded-md w-full lg:w-1/2 kundaliForm flex flex-col gap-4 lg:gap-5 border-none lg:border-r'>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-10 gradient-background background-cover flex items-center justify-center rounded-full '>
                    <img src={boyImage} alt='' />
                  </div>
                  <h2 className='customFormH2'> {t('boys_details')}</h2>
                </div>

                <Form.Item
                  name={InputTypesEnum?.NAME}
                  label={t('name')}
                  rules={FORM_RULS[InputTypesEnum?.NAME]}
                  className='mb-0'
                >
                  <Input
                    placeholder={t('enter_name')}
                    className='antDInput'
                    onChange={e =>
                      handleInputBoyChange(InputTypesEnum?.NAME, e.target.value)
                    }
                  />
                </Form.Item>

                <div className='flex-1 flex flex-col gap-3 lg:gap-3 lg:justify-between '>
                  {/* <h3 className="customFormH3">{t("birth_details")}</h3> */}

                  <div className='flex gap-2'>
                    <Form.Item
                      name={InputTypesEnum?.DAY}
                      label={t('day')}
                      rules={FORM_RULS[InputTypesEnum?.DAY]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
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
                      name={InputTypesEnum?.MONTH}
                      label={t('month')}
                      rules={FORM_RULS[InputTypesEnum?.MONTH]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
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
                      name={InputTypesEnum?.YEAR}
                      label={t('year')}
                      rules={FORM_RULS[InputTypesEnum?.YEAR]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {years?.map(y => (
                          <Option key={y} value={y}>
                            {y}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  {/* Time of Birth */}
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <Form.Item
                      name={InputTypesEnum?.HOURS}
                      label={t('hour')}
                      rules={FORM_RULS[InputTypesEnum?.HOURS]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {hours?.map(h => (
                          <Option key={h} value={h}>
                            {h}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={InputTypesEnum?.MINUTE}
                      label={t('minute')}
                      rules={FORM_RULS[InputTypesEnum?.MINUTE]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {minutes?.map(m => (
                          <Option key={m} value={m}>
                            {m}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={InputTypesEnum?.SECOND}
                      label={t('second')}
                      rules={FORM_RULS[InputTypesEnum?.SECOND]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {seconds?.map(s => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>

                  <Form.Item
                    label={t('birth_place')}
                    name={InputTypesEnum?.LOCATION}
                    // rules={FORM_RULS[InputTypesEnum?.LOCATION]}
                    rules={locationRules1}

                    className='col-span-1 autocomplete_boy_girl mb-0'
                  >
                    <AutoComplete
                      options={placeOptions}
                      onSearch={handleSearchPlace}
                      value={boyForm.getFieldValue(InputTypesEnum?.LOCATION)}
                      open={
                        !isPlaceSelected?.current && placeOptions.length > 0
                      }
                      onSelect={value => {
                        boyForm.setFieldsValue({
                          [InputTypesEnum?.LOCATION]: value
                        })

                        setSelectedBoyPlaceOfBirthValue(
                          selectedBoyPlaceOfBirth?.find(
                            ele => ele?.full_name === value
                          )
                        )
                        isPlaceSelected.current = true
                        setPlaceOptions([])
                        setSelectedBoyPlaceOfBirth([])
                      }}
                      onChange={value => {
                        boyForm.setFieldsValue({
                          [InputTypesEnum?.LOCATION]: value
                        })
                        isPlaceSelected.current = false
                      }}
                      placeholder={t('enter_place_birth')}
                      className='w-full  py-4 font-medium text-[16px] placeOfBirth'
                    />
                  </Form.Item>
                </div>
              </div>
              {/* <hr className="hidden lg:block kundaliHr"/> */}
              {/* Girl's Details */}
              <div className='  rounded-md w-full lg:w-1/2 flex flex-col gap-4md:p-4   kundaliForm  gap-4 lg:gap-5 border-none lg:border-r'>
                <div className='flex items-center gap-2'>
                  <div className='w-10 h-10 gradient-background background-cover flex items-center justify-center rounded-full '>
                    <img src={girlImage} alt='' />
                  </div>
                  <h2 className='customFormH2'>{t('girl_details')}</h2>
                </div>

                <Form.Item
                  name={InputTypesEnum?.GIRL_NAME}
                  label={t('name')}
                  rules={FORM_RULS[InputTypesEnum?.GIRL_NAME]}
                  className='mb-0'
                >
                  <Input
                    placeholder={t('enter_name')}
                    className='antDInput'
                    onChange={e =>
                      handleInputGirlChange(
                        InputTypesEnum?.GIRL_NAME,
                        e.target.value
                      )
                    }
                  />
                </Form.Item>
                <div className='flex-1 flex flex-col gap-3 lg:gap-0 lg:justify-between '>
                  {/* <h3 className="customFormH3">{t("birth_details")}</h3> */}
                  <div className='flex gap-2'>
                    <Form.Item
                      name={InputTypesEnum?.DAY_2}
                      label={t('day')}
                      rules={FORM_RULS[InputTypesEnum?.DAY_2]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
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
                      name={InputTypesEnum?.MONTH_2}
                      label={t('month')}
                      rules={FORM_RULS[InputTypesEnum?.MONTH_2]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
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
                      name={InputTypesEnum?.YEAR_2}
                      label={t('year')}
                      rules={FORM_RULS[InputTypesEnum?.YEAR_2]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {years?.map(y => (
                          <Option key={y} value={y}>
                            {y}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </div>
                  {/* Time of Birth */}
                  <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                    <Form.Item
                      name={InputTypesEnum?.HOURS_2}
                      label={t('hour')}
                      rules={FORM_RULS[InputTypesEnum?.HOURS_2]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {hours?.map(h => (
                          <Option key={h} value={h}>
                            {h}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={InputTypesEnum?.MINUTE_2}
                      label={t('minute')}
                      rules={FORM_RULS[InputTypesEnum?.MINUTE_2]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {minutes?.map(m => (
                          <Option key={m} value={m}>
                            {m}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name={InputTypesEnum?.SECOND_2}
                      label={t('second')}
                      rules={FORM_RULS[InputTypesEnum?.SECOND_2]}
                      className='w-1/3 mb-0'
                    >
                      <Select
                        className='antDInput'
                        suffixIcon={customIcon}
                        showSearch
                      >
                        {seconds?.map(s => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                  </div>
                  <Form.Item
                    label={t('birth_place')}
                    name={InputTypesEnum?.LOCATION_2}
                    rules={locationRules2}
                    // rules={FORM_RULS[InputTypesEnum?.LOCATION_2]}
                    className='col-span-1 autocomplete_boy_girl mb-0'
                  >
                    <AutoComplete
                      options={placeOptionsGirl}
                      onSearch={handleSearchPlace2}
                      value={girlForm.getFieldValue(InputTypesEnum?.LOCATION_2)}
                      open={
                        !isPlaceSelectedGirl.current &&
                        placeOptionsGirl.length > 0
                      }
                      onSelect={value => {
                        girlForm.setFieldsValue({
                          [InputTypesEnum?.LOCATION_2]: value
                        })
                        setSelectedGirlPlaceOfBirthValue(
                          selectedGirlPlaceOfBirth?.find(
                            ele => ele?.full_name === value
                          )
                        )
                        isPlaceSelectedGirl.current = true
                        setPlaceOptionsGirl([])
                        setSelectedGirlPlaceOfBirth([])
                      }}
                      onChange={value => {
                        girlForm.setFieldsValue({
                          [InputTypesEnum?.LOCATION_2]: value
                        })
                        isPlaceSelectedGirl.current = false
                      }}
                      placeholder={t('enter_place_birth')}
                      className='w-full py-4 font-medium text-[16px] placeOfBirth'
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <Form.Item className='!mb-0'>
              <Suspense fallback={<></>}>
                <CustomButton
                  type='primary'
                  htmltype='submit'
                  className='text-[16px] font-medium w-full py-3'
                >
                  {t('kundli_matching_report')}
                </CustomButton>
              </Suspense>
            </Form.Item>
          </Form>

          {matchedData && (
            <div className='p-4 mt-4 border rounded-md'>
              <h3 className='font-bold'>{t('Matched_Kundali_Data')}:</h3>
              <pre>{JSON.stringify(matchedData, null, 2)}</pre>
            </div>
          )}
        </Card>

        {/* Saved Kundli Section */}
        <Card className='col-span-3 lg:col-span-1 newKundaliCard  '>
          <h2 className='customFormH2 pb-3 mb-3'>{t('save_kundli')}</h2>
          {localstorage_isLogin ? (
            <>
              <Input
                prefix={
                  <div className='w-[30px] h-[30px] flex items-center justify-center rounded-full commonLightBack mr-2'>
                    <img className=' ' src={commonSearch} />
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
              <div
                className='max-h-[420px] overflow-y-auto overflow-x-hidden custom-scrollbar'
                ref={listRef}
              >
                <List
                  dataSource={listKundliMatch?.KundliMatchList}
                  renderItem={item => (
                    <List.Item className='!p-2 border-b'>
                      <div
                        className='grid grid-cols-5 gap-1 w-full cursor-pointer'
                        onClick={() => handleListItemClick(item)}
                      >
                        <div className='flex flex-col sm:flex-row gap-3 col-span-4'>
                          {/* <img
                          src={personImage}
                          alt="Avatar"
                          className="w-7 h-7 rounded-full"
                        /> */}

                          <Avatar
                            // src={personImage}
                            size={28}
                            // style={{ backgroundColor: '#87d068', fontSize: 14 }}
                            className='gradient-background background-cover '
                          >
                            {(item?.name?.[0] || '-')}
                          </Avatar>
                          <div className='text-sm'>
                            <div className='font-semibold text-base truncate capitalize'>
                              {item?.name || 'No Name'}
                            </div>
                            <div className='text-gray-600 truncate'>
                              {(item?.dob
                                ? item.dob //formatDate( item.dob, DateFormat?.ABBREVIATED_FULL_DATE_FORMAT )
                                : '') +
                                ' ' +
                                (item?.time_of_birth
                                  ? formatTime(
                                    item.time_of_birth,
                                    TimeFormat?.TIME_12_HOUR_FORMAT
                                  )
                                  : '')}
                            </div>
                            <div className='text-gray-600  '>
                              {item?.place_of_birth}
                            </div>
                          </div>
                        </div>
                        <div
                          className='flex gap-2 justify-end col-span-1'
                          onClick={e => e.stopPropagation()}
                        >
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
                {loadingMore && (
                  <div className='flex justify-center p-4'>
                    <Loader size='small' />
                  </div>
                )}
                {!hasMore && listKundliMatch?.KundliMatchList?.length > 0 && (
                  <div className='text-center p-4 text-gray-500'>
                    No more kundli matches to load
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* <div className='flex flex-col items-center justify-between h-[90%]'>
              <div className='flex flex-col items-center gap-[60px] pt-[60px]'>
                <h2 className='text-[18px] font-semibold text-center text-[#797979]'>
                  Please login to check your saved horoscope!
                </h2>
              
              </div>
              <CustomButton
                className='text-white w-full '
                onClick={() =>
                  dispatch(setModel({ is_model: true, model_type: 'login' }))
                }
              >
                {t('login')}
              </CustomButton>
            </div> */}
              <div className='flex flex-col items-center justify-between h-[90%]'>
                <div className='flex flex-col items-center gap-[60px] pt-[60px]'>
                  <h2 className='text-[18px] font-medium text-center text-[#343434]'>
                    {/* Please login to check your saved Kundli!
                     */}
                    {t('please_login_kundli')}
                  </h2>
                  <img
                    src={checkLoginImage}
                    alt='Login Required'
                    className='max-w-[263px] block mx-auto'
                  />
                </div>
                <Suspense fallback={<></>}>
                <CustomButton
                  className='text-white  py-3 '
                  parentClassName='mt-3 w-full'
                  onClick={() =>
                    dispatch(setModel({ is_model: true, model_type: 'login' }))
                  }
                >
                  {t('login')}
                </CustomButton>
                </Suspense>
              </div>
            </>
          )}
          <Suspense fallback={<></>}>
            <PhoneAuthModal
              isPhoneModalOpen={modal?.is_model && modal?.model_type == 'login'}
              issetIsModalOpen={setShowModal}
            />
          </Suspense>
          <Suspense fallback={<></>}>
            <ConfirmModal
              isOpen={
                modal?.is_model && modal?.model_type == 'free_kundli_delete'
              }
              title='Delete Astrologer?'
              description='Are you sure you want to delete this astrologer? This action cannot be undone.'
              okText='Delete'
              cancelText='Cancel'
              onConfirm={handleDelete}
              onCancel={() => {
                closeModel(dispatch)
              }}
            />
          </Suspense>
        </Card>

        <ConfirmModal
          isOpen={showModal}
          title='Delete Astrologer?'
          description='Are you sure you want to delete this astrologer? This action cannot be undone.'
          okText='Delete'
          cancelText='Cancel'
          onConfirm={() => {
            // your delete function here
          }}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </>
  )
}

export default memo(KundaliMatchForm)
