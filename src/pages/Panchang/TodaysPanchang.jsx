import React, { useCallback, useEffect, useState, lazy, Suspense, useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

// Lazy-loaded components
const CommonBanner = lazy(() => import('../../component/CommonBanner'));
const CustomTable = lazy(() => import('../../component/Custom/CustomTable'));
const GeoSearchInput = lazy(() => import('../../component/geo/GeoSearchInput'));
const LagnaChartAndBalam = lazy(() => import('../../component/panchang/LagnaChartAndBalam'));
const TodayPanchangCard = lazy(() => import('../../component/panchang/TodayPanchangCard'));
const Loader = lazy(() => import('../../component/loader/Loader'));
const HomeFAQs = lazy(() => import('../../component/Homepage/HomeFAQs'));

// API & store
import {
  getLagnaChartData,
  getPlanetDataForTodayPanchang,
  getTodaysPanchangAPi
} from '../../storemain/slice/HompageSlice';
import { setLoading, setUserLoginData } from '../../storemain/slice/MasterSlice';

// Utils & constants
import { closeLoder, openLoader, TOAST_SUCCESS } from '../../utils/CommonFunction';
import { Constatnt } from '../../utils/Constent';
import { DateFormat, LanguageOption } from '../../utils/CommonVariable';
import { KundliChartType } from '../../component/NewKundaliComp/KundliVariabls';
import RahuKaalForm from '../../component/Kaal/RahuKaalForm';


function TodaysPanchang() {
  const [locationValue, setLocationValue] = useState('Ahmedabad') // State for the input value
  const [selectedLocation, setSelectedLocation] = useState(null) // State for the selected location
    const [selectedDate, setSelectedDate] = useState(moment().format(DateFormat?.DATE_DASH_FORMAT));
  const [selectedDay, setSelectedDay] = useState('todays');
  const locationData = useSelector(state => state.masterSlice?.location)
  
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const LOGIN_KEY = localStorage.getItem(Constatnt?.LOGIN_KEY)
  const AUTH_KEY = JSON.parse(localStorage.getItem(Constatnt?.AUTH_KEY))
  const myLanguage = useSelector(state => state?.masterSlice?.currentLanguage)
  const todayPanchangs = useSelector(
    state => state?.HomePageSlice?.todayPanchang?.data
  )  
  const panchangeLagnaChart =
    useSelector(state => state?.HomePageSlice?.lagnaChart?.data) || {}
  const planetDataForTodayPanchang =
    useSelector(
      state => state?.HomePageSlice?.planetDataForTodayPanchang?.data
    ) || {}
  const loder = useSelector(state => state?.masterSlice?.loader)

  const now = new Date()
  const padZero = num => String(num).padStart(2, '0')

  // Format date as DD/MM/YYYY
  const dob = moment(selectedDate).format(DateFormat?.DATE_SLASH_FORMAT)

  // Format time as HH:MM
  const tob = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`

  const submitData = {
    date: dob,
    time: tob || moment().format('HH:mm'),
    lat: selectedLocation?.coordinates?.[0] || '23.02579000',
    lon: selectedLocation?.coordinates?.[1] || '72.58727000',
    tz: selectedLocation?.tz || '5.5',
    tzon: selectedLocation?.tzone[0],
    u_name: selectedLocation?.full_name,
    lang: myLanguage || "en",
  };

  const submitDataForPalnet = {
    dob: moment().format("DD/MM/YYYY"),
    tob: moment().format("HH:mm"),
    lat: selectedLocation?.coordinates?.[0] || "19.0760",
    lon: selectedLocation?.coordinates?.[1] || "72.8777",
    tz: selectedLocation?.tz || "5.5",
    lang: myLanguage || "en",
  };

  const submitDataForLagnaChart = {
    dob: moment().format('DD/MM/YYYY'),
    tob: moment().format('HH:mm'),
    lat: selectedLocation?.coordinates?.[0] || '23.02579000',
    lon: selectedLocation?.coordinates?.[1] || '72.58727000',
    tz: selectedLocation?.tz || '5.5',
    div: KundliChartType?.D1,
    lang: myLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
    transit_date: moment().format("DD/MM/YYYY"),
    year: `${moment().year()}`,
  };


  // const request = useMemo(() => ({
  //     date: moment().format('DD/MM/YYYY'),
  //     time: moment().format('HH:mm'),
  //     lat: locationData?.coordinates?.[0] || '23.02579000',
  //     lon: locationData?.coordinates?.[1] || '72.58727000',
  //     tz: locationData?.tz || '5.5',
  //     tzon: locationData?.tz || '5.5',
  //     bop: locationData?.full_name || 'Ahmedabad',
  //     u_name: '',
  //     lang: LocalLanguage
  //   }), [locationData, LocalLanguage])

  const fetchData = useCallback(() => {
    dispatch(setLoading({ is_loading: true, loading_type: 'todayPanchang' }))

    dispatch(getTodaysPanchangAPi({ submitData })).finally(() => {
      dispatch(setLoading({ is_loading: false, loading_type: 'todayPanchang' }))
    })
    dispatch(
      getPlanetDataForTodayPanchang({ submitData: submitDataForPalnet })
    ).finally(() => {
      dispatch(setLoading({ is_loading: false, loading_type: 'todayPanchang' }))
    })
    dispatch(
      getLagnaChartData({ submitData: submitDataForLagnaChart })
    ).finally(() => {
      dispatch(setLoading({ is_loading: false, loading_type: 'todayPanchang' }))
    })
    setLocationValue('')
    if (LOGIN_KEY) {
      dispatch(setUserLoginData({ is_login: true, loginUserData: AUTH_KEY }))
    }
  }, [dispatch, selectedLocation, locationValue])

  useEffect(() => {
    fetchData()
  }, [myLanguage])

  const todayPanchangData = todayPanchangs?.response
  // Format nakshatra with end time
  const formattedNakshatra = todayPanchangData?.nakshatra?.name
    ? `${todayPanchangData.nakshatra.name} upto ${new Date(
      todayPanchangData.nakshatra.end
    ).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })}`
    : ''

  const dataSource = [
    {
      key: '1',
      label: t('Tithi'),
      value: todayPanchangData?.tithi?.name || '—'
    },
    {
      key: '2',
      label: t('Nakshatra'),
      value: todayPanchangData?.nakshatra?.name || '—'
    },
    { key: '3', label: t('Yoga'), value: todayPanchangData?.yoga?.name || '—' },
    {
      key: '4',
      label: t('Karana'),
      value: todayPanchangData?.karana?.name || '—'
    },
    {
      key: '5',
      label: t('Paksha'),
      value: todayPanchangData?.advanced_details?.masa?.paksha || '—'
    },
    { key: '6', label: t('weekday'), value: todayPanchangData?.day?.name || '—' },
    {
      key: '7',
      label: t('Shaka_Samvat'),
      value:
        todayPanchangData?.advanced_details?.years?.saka +
        ' ' +
        todayPanchangData?.advanced_details?.years?.saka_samvaat_name || '—'
    },
    {
      key: '8',
      label: t('Vikram_Samvat'),
      value:
        todayPanchangData?.advanced_details?.years?.vikram_samvaat +
        ' ' +
        todayPanchangData?.advanced_details?.years?.vikram_samvaat_name || '—'
    }
  ]



  const columns = [
    {
      title: t('Panchang_Element'),
      dataIndex: 'label',
      key: 'label',
      render: text => <span className=''>{text || '-'}</span>
    },
    {
      title: t('Value'),
      dataIndex: 'value',
      key: 'value',
      render: text => <span className=''>{text || '-'}</span>
    }
  ]

  const columns1 = [
    {
      title: t('Kaal_Type'),
      dataIndex: 'label',
      key: 'label',
      fixed: "left",
      render: text => <span className='font-semibold'>{text || '-'}</span>
    },
    {
      title: t('Duration'),
      dataIndex: 'time',
      key: 'time',
      render: text => <span className='max-w-[250px]'>{text || '-'}</span>
    }
  ]

  const rawKaalData = [
    {
      label: t('Rahu_Kaal'),
      time: todayPanchangData?.rahukaal || '-'
    },
    {
      label: t('Gulika_Kaal'),
      time: todayPanchangData?.gulika || '-'
    },
    {
      label: t('Yamaganda'),
      time: todayPanchangData?.yamakanta || '-'
    },
    {
      label: t('Abhijit_Muhurta'),
      time: `${todayPanchangData?.advanced_details?.abhijit_muhurta?.start || '-'} To ${todayPanchangData?.advanced_details?.abhijit_muhurta?.end || '-'}`
    },
    {
      label: t('Tithi'),
      time: todayPanchangData?.tithi?.start && todayPanchangData?.tithi?.end
        ? `${myLanguage === LanguageOption?.ENGLISH ? new Date(todayPanchangData.tithi.start).toLocaleString() : todayPanchangData?.tithi?.start} to ${myLanguage === LanguageOption?.ENGLISH ? new Date(todayPanchangData.tithi.end).toLocaleString() : todayPanchangData.tithi.end}`
        : '-',
    },
    {
      label: t('Nakshatra'),
      time:
        todayPanchangData?.nakshatra?.start && todayPanchangData?.nakshatra?.end
          ? `${myLanguage === LanguageOption?.ENGLISH ? new Date(todayPanchangData.nakshatra.start).toLocaleString() : todayPanchangData?.tithi?.start} to ${myLanguage === LanguageOption?.ENGLISH ? new Date(todayPanchangData.nakshatra.end).toLocaleString() : todayPanchangData?.tithi?.start}`
          : '-',
    }
  ]

  const dataSource1 = rawKaalData?.map((item, index) => ({
    key: index + 1,
    label: item.label,
    time: `${myLanguage === LanguageOption?.ENGLISH ? `From ${item.time}` : item.time}`
  }))

  const convertToDMS = decimalDegree => {
    const degrees = Math.floor(decimalDegree)
    const minutesDecimal = (decimalDegree - degrees) * 60
    const minutes = Math.floor(minutesDecimal)
    const seconds = (minutesDecimal - minutes) * 60
    return `${degrees}°${minutes}′${Math.round(seconds)}″`
  }

  const planetColumns = [
    {
      title: t('Planet'),
      dataIndex: 'planet',
      key: 'planet',
      fixed: 'left'
    },
    {
      title: t('Rashi'),
      dataIndex: 'rashi',
      key: 'rashi'
    },
    {
      title: t('Longitude'),
      dataIndex: 'longitude',
      key: 'longitude'
    },
    {
      title: t('Nakshatra'),
      dataIndex: 'nakshatra',
      key: 'nakshatra',
      width: "150px"
    },
    {
      title: t('Pada'),
      dataIndex: 'pada',
      key: 'pada',
      width: "80px"

    }
  ]

  const planetData = (planetDataForTodayPanchang?.response?.planets || []).map(
    (planet, index) => ({
      key: index + 1,
      planet: planet.full_name || planet.name,
      rashi: planet.zodiac,
      longitude: convertToDMS(parseFloat(planet.local_degree)),
      nakshatra: (planet.nakshatra || '')?.replace(/\(.*\)/, ''),
      pada: String(planet.nakshatra_pada)
    })
  )

  const taraBala = [
    'Ashwini',
    'Krittika',
    'Mrigashirsha',
    'Pushya',
    'Magha',
    'Uttara Phalguni',
    'Chitra',
    'Anuradha',
    'Mula',
    'Uttara Ashadha',
    'Dhanishta',
    'Uttara Bhadrapada'
  ]

  const chandraBala = [...taraBala] // If same list, otherwise modify accordingly

  // Handle change for input field value
  const handleChange = value => {
    setLocationValue(value)
  }

  // Handle selection of location
  const handleSelectLocation = location => {
    
    setSelectedLocation(location)
  }

  const isValidLocation = (location) => {
    return (
      location &&
      typeof location === 'object' &&
      Object.keys(location).length > 0 &&
      typeof location.full_name === 'string' &&
      location.full_name.trim() !== '' &&
      Array.isArray(location.coordinates) &&
      location.coordinates.length === 2 &&
      location.coordinates[0] !== '' &&
      location.coordinates[1] !== ''
    );
  };


  const handleSubmit = async () => {
    if (isValidLocation(selectedLocation)) {
      openLoader(dispatch, 'panchang_loader')
      const submitData = {
        date: dob,
        time: moment().format('HH:mm'),
        lat: selectedLocation?.coordinates?.[0] || '',
        lon: selectedLocation?.coordinates?.[1] || '',
        tz: selectedLocation?.tz || '',
        tzon: selectedLocation?.tzone?.[0],
        u_name: selectedLocation?.full_name,
        lang: myLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
      };

      const submitDataForPalnet = {
        dob: moment().format("DD/MM/YYYY"),
        tob: moment().format("HH:mm"),
        lat: selectedLocation?.coordinates?.[0] || "",
        lon: selectedLocation?.coordinates?.[1] || "",
        tz: selectedLocation?.tz || "",
        lang: myLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
      };

      const submitDataForLagnaChart = {
        dob: moment().format('DD/MM/YYYY'),
        tob: moment().format('HH:mm'),
        lat: selectedLocation?.coordinates?.[0] || '',
        lon: selectedLocation?.coordinates?.[1] || '',
        tz: selectedLocation?.tz || '',
        div: KundliChartType?.D1,
        lang: myLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
        transit_date: moment().format("DD/MM/YYYY"),
        year: `${moment().year()}`,
      };

      // const submitDataForPalnet = { ...submitData }; // if needed separately
      await Promise.all([
        dispatch(getTodaysPanchangAPi({ submitData })),
        dispatch(
          getPlanetDataForTodayPanchang({ submitData: submitDataForPalnet })
        ),
        dispatch(getLagnaChartData({ submitData: submitDataForLagnaChart }))
      ])

      // setLocationValue('')
      await new Promise(resolve => setTimeout(resolve, 300))
      // dispatch(setLoading({ is_loading: false, loading_type: "todayPanchang" }));
      closeLoder(dispatch)
    } else {
      TOAST_SUCCESS('Please select a valid location')
    }

  }

  return (
    <>
      {loder?.is_loading && loder?.loding_type === 'panchang_loader' && (
        <>
          <Loader />
        </>
      )}
<Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <CommonBanner
          // backgroundImage={PrivacyBanner}
          text=''
          highlight={t('Panchang_Details')}
        />
      </section>

      <section>
        <div className="container mx-auto paddingTop100 flex flex-col gap-12">
          <div>
            {/* <GeoSearchInput
              value={locationValue} // Bind the value to the state
              onChange={handleChange} // Pass the handler for input change
              onSelectLocation={handleSelectLocation} // Handle location selection
              placeholder={t('enter_city_name')}
              showClear={true} // Show clear button if needed
              showButton={true} // Show GET PANCHANG button
              onSubmit={handleSubmit} // Handle submit
            /> */}
             <RahuKaalForm
            showClear={true} // Show clear button if needed
            showButton={true} // Show GET PANCHANG button
            showDate={true}
            value={locationValue} // Bind the value to the state
            onChange={handleChange} // Pass the handler for input change
            onSelectLocation={handleSelectLocation} // Handle location selection
            placeholder={t('enter_city_name')}
            onSubmit={handleSubmit}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedDay={selectedDay}
            locationData={locationData}
            form_button_text={t('Get_PANCHANG')}
          />
          </div>
          <TodayPanchangCard
            todayPanchangcardData={todayPanchangs?.response}
            todayRequest={todayPanchangs?.request}
            location={selectedLocation}
          />
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop100">
         
        </div>
      </section>
      <section>
        <div className=' container mx-auto paddingTop50 flex flex-col gap-10'>
          <div className='grid grid-cols-1 md:grid-cols-5 gap-y-8 lg:gap-6'>
            <div className='col-span-5 lg:col-span-2 '>
              <h3 className='commonQuesH2 pb-3 lg:pb-5'>
                {t('Today_s_Panchang')}
              </h3>

              <CustomTable
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                className='dasha_siddha new_panchang_table panchang123'
                scroll={{ x: 'max-content' }}
              />
            </div>

            <div className='col-span-5 lg:col-span-3'>
              <h3 className='commonQuesH2 pb-3 lg:pb-5'>
                {t('Inauspicious_Timings')} ({t('Ashubha_Muhurat')})
              </h3>
              <CustomTable
                columns={columns1}
                dataSource={dataSource1}
                pagination={false}
                bordered
                className='dasha_siddha new_panchang_table panchang123'
                scroll={{ x: 'max-content' }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className='mb-5'>
        <div className='container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-6 padding100'>
          {/* Lagna Chart + Bala Section */}
          <div className='flex justify-center'>
            <LagnaChartAndBalam
              taraBala={taraBala}
              chandraBala={chandraBala}
              lagnaChartData={panchangeLagnaChart?.response}
            />
          </div>

          {/* Planetary Position Table */}
          <div className='flex-1 flex flex-col overflow-x-auto'>
            <h3 className='commonQuesH2 pb-5'>
              {t('Planetary_Position_at_Sunrise')}
            </h3>
            <CustomTable
              columns={planetColumns}
              dataSource={planetData}
              pagination={false}
              bordered
              className='dasha_siddha new_panchang_table panchang123'
              scroll={{ x: '576px' }}
            />
          </div>

        </div>
      </section>


      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('panchange')}
        subHeading={''}
      />
</Suspense>
    </>
  )
}

export default memo(TodaysPanchang)




