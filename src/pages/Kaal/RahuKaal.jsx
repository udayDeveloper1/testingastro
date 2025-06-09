import React, { useEffect, useState } from "react";
import CommonBanner from "../../component/CommonBanner";
import RahuKaalForm from "../../component/Kaal/RahuKaalForm";
import RahuKaalTimingCard from "../../component/Kaal/RahuKaalTimingCard";
import GeoSearchInput from "../../component/geo/GeoSearchInput";
import CommonInfoCard from "../../component/Kaal/CommonInfoCard";
import { getRahuKaalData, getTodaysPanchangAPi } from "../../storemain/slice/HompageSlice";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { closeLoder, formatTime, openLoader, TOAST_ERROR } from "../../utils/CommonFunction";
import moment from "moment";
import { Constatnt } from "../../utils/Constent";
import { Codes, DateFormat, LanguageOption, TimeFormat } from "../../utils/CommonVariable";
import { getRahukalDetails, todaysPanchang } from "../../services/api/api.services";
import Loader from "../../component/loader/Loader";
import "../../assets/css/rahukaal.css"

function RahuKaal() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const todayPanchangs = useSelector(state => state?.HomePageSlice?.todayPanchang?.data)
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  const loder = useSelector((state) => state?.masterSlice?.loader);
  const locationData = useSelector(state => state.masterSlice?.location)

  // ------------------------------------------------- For Geo Location ------------------------------------------------------------

  const [locationValue, setLocationValue] = useState('Ahmedabad')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [apiCallTime, setApiCallTime] = useState(moment().format(TimeFormat?.TIME_WITH_SECONDS_12_HOUR_FORMAT))

  const [rahuKaalData, setRahuKaalData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(moment().format(DateFormat?.DATE_DASH_FORMAT));

  // ------------------------------------------------- For Geo Location ------------------------------------------------------------

  const handleChange = value => {
    setLocationValue(value)
  }

  // Handle selection of location
  const handleSelectLocation = location => {
    setSelectedLocation(location)
  }

  // Handle form submission (GET PANCHANG button)
  const handleSubmit = async () => {
    openLoader(dispatch, 'rahukal_loader')
    if (locationData) {
      const submitData = {
        date: moment(selectedDate).format(DateFormat?.DATE_SLASH_FORMAT),
        time: moment().format('HH:mm'),
        lat: selectedLocation?.coordinates?.[0] || locationData?.coordinates?.[0] || '23.02579000',
        lon: selectedLocation?.coordinates?.[1] || locationData?.coordinates?.[1] || '72.58727000',
        tz: selectedLocation?.tz || locationData?.tz || '5.5',
        tzon: selectedLocation?.tzone?.[0],
        u_name: selectedLocation?.full_name || locationData?.u_name,
        lang: LocalLanguage,
      };

      // await Promise.all([
      //   dispatch(getTodaysPanchangAPi({ submitData })),
      // ])

      todaysPanchang(submitData).then((response1) => {
        if (response1?.code === Codes?.SUCCESS) {
          const { request, response } = response1?.data
          if (response?.advanced_details) {
            getRahukalDetails({
              date: moment(selectedDate).format(DateFormat?.DATE_DASH_FORMAT),
              place: request?.u_name || locationData?.full_name,
              lang: LocalLanguage,
              sunrise: formatTime(response?.advanced_details?.sun_rise, TimeFormat?.TIME_24_HOUR_FORMAT),
              sunset: formatTime(response?.advanced_details?.sun_set, TimeFormat?.TIME_24_HOUR_FORMAT)
            }).then((response) => {
              if (response?.code === Codes?.SUCCESS) {
                setRahuKaalData(response?.data)
                setApiCallTime((moment().format(TimeFormat.TIME_WITH_SECONDS_12_HOUR_FORMAT)))
              } else {
                setRahuKaalData([])
              }
            })
          }
        } else {
          TOAST_ERROR(response1?.message)
        }
      })
    }

    // setLocationValue('')
    await new Promise(resolve => setTimeout(resolve, 200)) // ⏳ Wait 0.5s
    closeLoder(dispatch)
  }

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "rahukal_loader" && (
        <Loader />
      )}
      <section>
        <CommonBanner text={t('rahu_kaal')} highlight="" />
      </section>

      <section>
        <div className="container mx-auto paddingTop100">
          <RahuKaalForm
            // value={ }
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
          />
        </div>
      </section>

      <section className="">
        <div className="container mx-auto paddingTop50">
          <CommonInfoCard
            title={rahuKaalData?.title}
            description={rahuKaalData?.description}
          />
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 ">
          <RahuKaalTimingCard
            rahuKaalData={rahuKaalData}
            selectedDate={moment(selectedDate).format(DateFormat?.DATE_DASH_FORMAT)}
            setSelectedDate={setSelectedDate}
            onSubmit={handleSubmit}
            apiCallTime={apiCallTime}
          />
        </div>
      </section>

      <section className="">
        <div className="container mx-auto paddingTop50 paddingBottom100 flex flex-col gap-[30px]">
          <CommonInfoCard
            title={t('rahukal_title_1')}
            description={t('rahukal_description_1')}
          />
          <CommonInfoCard
            title={t('rahukal_title_2')}
            description={t('rahukal_descreption_2')}
          />
        </div>
      </section>

    </>
  );
}

export default RahuKaal;
