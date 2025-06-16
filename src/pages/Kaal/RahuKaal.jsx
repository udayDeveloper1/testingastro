import { cloneDeep } from "lodash";
import moment from "moment";
import { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/rahukaal.css";
import { todaysPanchang } from "../../services/api/api.services";
import { closeLoder, openLoader, TOAST_ERROR } from "../../utils/CommonFunction";
import { Codes, DateFormat, LanguageOption, TimeFormat } from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";

const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CustomWhiteButton = lazy(() => import("../../component/Homepage/CustomWhiteButton"));
const CommonInfoCard = lazy(() => import("../../component/Kaal/CommonInfoCard"));
const RahuKaalForm = lazy(() => import("../../component/Kaal/RahuKaalForm"));
const RahuKaalTimingCard = lazy(() => import("../../component/Kaal/RahuKaalTimingCard"));
const Loader2 = lazy(() => import("../../component/loader/Loader2"));

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
  const [rahuKaalDataPara, setRahuKaalDataPara] = useState(null)
  const [selectedDate, setSelectedDate] = useState(moment().format(DateFormat?.DATE_DASH_FORMAT));
  const [selectedDay, setSelectedDay] = useState('todays');

  // ------------------------------------------------- For Geo Location ------------------------------------------------------------

  const handleChange = value => {
    setLocationValue(value)
  }

  // Handle selection of location
  const handleSelectLocation = location => {
    setSelectedLocation(location)
  }


  const handleSubmit = async () => {
    openLoader(dispatch, 'rahukal_loader');
    try {

      if (!locationData) {
        throw new Error("Location data not available");
      }

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

      const response1 = await todaysPanchang(submitData);

      if (response1?.code === Codes?.SUCCESS) {
        const { response } = response1?.data;

        if (response?.advanced_details) {
          const language = LocalLanguage;
          const responseData = response?.advanced_details;

          const separatorMap = { en: "to", gu: "થી", hi: "प्रथम " };
          const matchFn = matchFunctions[language] || matchFunctions.default;
          const separator = separatorMap[language] || "to";

          const arra = [];

          const createEntry = (key, titleKey) => {
            const value = response[key];
            const match = matchFn(value) || [];
            return {
              title: t(titleKey),
              start: match[1],
              end: match[2],
              duration: getTimeDuration(value, language),
              date: response.date
            };
          };

          // Add Abhijit Muhurat
          if (responseData?.abhijit_muhurta?.start && responseData?.abhijit_muhurta?.end) {
            const abhijit = cloneDeep(responseData.abhijit_muhurta);
            abhijit.title = t('Auspicious_');
            abhijit.duration = getTimeDuration(`${abhijit.start} ${separator} ${abhijit.end}`, language);
            abhijit.date = response.date;
            arra.push(abhijit);
          }

          // Add Rahu, Yamghant, Gulik
          ["rahukaal", "yamakanta", "gulika"].forEach(key => {
            const titleKeyMap = {
              rahukaal: "Rahu_Kaal_",
              yamakanta: "Yamghant_Kaal_",
              gulika: "Gulik_Kaal_"
            };
            arra.push(createEntry(key, titleKeyMap[key]));
          });

          setRahuKaalData(arra);


        }
      } else {
        TOAST_ERROR(response1?.message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      TOAST_ERROR(error.message || "Something went wrong");
    } finally {
      await new Promise(resolve => setTimeout(resolve, 200)); // ⏳ Wait 0.2s
      closeLoder(dispatch);
    }
  };

  const matchFunctions = {
    en: (data) => data.match(/(\d{1,2}:\d{2} [APM]{2}) to (\d{1,2}:\d{2} [APM]{2})/),
    hi: (text) => {
      const [start, end] = text.split("प्रथम ");
      return [, start?.trim(), end?.replace("तक", "").trim()];
    },
    gu: (text) => {
      const [start, end] = text.split("થી");
      return [, start?.trim(), end?.replace("સુધી", "").trim()];
    },
    default: (data) => data.match(/(\d{1,2}:\d{2} [APM]{2}) to (\d{1,2}:\d{2} [APM]{2})/)
  };

  const getTimeDuration = (data, language) => {
    const parseTimeRange = (data) => {
      if (language === "en") return data.split(" to ");
      if (language === "hi") {
        const match = data.match(/(?:सुबह|दोपहर|शाम|रात)?\s?\d{1,2}:\d{2}(?::\d{2})?\s?बजे/g);
        return match?.slice(0, 2).map(t => t.trim()) || ["", ""];
      }
      if (language === "gu") {
        const match = data.match(/(?:સવાર|બપોરે|સાંજે|રાત્રે)?\s?\d{1,2}:\d{2}(?::\d{2})?\s?વાગ્યે/g);
        return match?.slice(0, 2).map(t => t.trim()) || ["", ""];
      }
      return data.split(" to ");
    };

    const convertTo24HourFormat = (timeStr) => {
      let period = "AM";
      if (language === "hi" || language === "gu") {
        if (/दोपहर|શામ|સાંજે|रात|રાત્રે|બપોરે/.test(timeStr)) period = "PM";
        if (/सुबह|સવાર/.test(timeStr)) period = "AM";
        const timeMatch = timeStr.match(/\d{1,2}:\d{2}(?::\d{2})?/);
        return timeMatch ? `${timeMatch[0]} ${period}` : "";
      }
      return timeStr;
    };

    const [startRaw, endRaw] = parseTimeRange(data);
    const startStr = convertTo24HourFormat(startRaw);
    const endStr = convertTo24HourFormat(endRaw);
    const today = new Date();

    const start = new Date(`${today.toDateString()} ${startStr}`);
    const end = new Date(`${today.toDateString()} ${endStr}`);

    const diffMs = end - start;
    if (diffMs < 0) return "00:00";

    const totalMins = Math.floor(diffMs / 60000);
    const hours = String(Math.floor(totalMins / 60)).padStart(2, '0');
    const minutes = String(totalMins % 60).padStart(2, '0');
    return `${hours}:${minutes}`;
  };


  const formatedDateArray = [
    { key: 'yesterday', value: t('yesterday'), date: moment().subtract(1, 'days').format(DateFormat?.DATE_DASH_FORMAT) },
    { key: 'todays', value: t('today'), date: moment().format(DateFormat?.DATE_DASH_FORMAT) },
    { key: 'tommorw', value: t('tomorrow'), date: moment().add(1, 'days').format(DateFormat?.DATE_DASH_FORMAT) }
  ]

  const onChangeDateChange = (day) => {
    setSelectedDate(day)
    // onSubmit()
  }

  let matchedDateObj = {}

  useEffect(() => {
    if (!selectedDate || !Array.isArray(formatedDateArray)) return;

    matchedDateObj = formatedDateArray?.find(
      (item) => item.date === selectedDate
    );
    setSelectedDay(matchedDateObj ? matchedDateObj.key : null);
  }, [selectedDate, formatedDateArray]);

  useEffect(() => {
    if (selectedDay && selectedDate && locationData && selectedLocation && selectedLocation.tzone) {
      handleSubmit();
    }
  }, [selectedDate, selectedDay, selectedLocation, locationData]);

  return (
    <>
      {/* {loder?.is_loading && loder?.loding_type === "rahukal_loader" && (
        <Loader />
      )} */}
      <section>
        <CommonBanner text={t('Daily Auspicious & Inauspicious Timings ')} highlight="" />
      </section>

      <section>
        <div className="container mx-auto paddingTop100">
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
          />
        </div>
      </section>

      <section className="">
        <div className="container mx-auto paddingTop50">
          {rahuKaalDataPara && <CommonInfoCard
            title={rahuKaalDataPara?.title}
            description={rahuKaalDataPara?.description}
          />}
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 paddingBottom100 flex flex-col gap-[50px]">
          {
            matchedDateObj ?
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex justify-start md:justify-center gap-2 ">
                {/* "Yesterday", `Today's`, "Tomorrow" */}
                {/* {matchedDateObj } */}
                {
                  formatedDateArray?.map((day, ind) => (
                    <div className="" key={ind}>
                      <CustomWhiteButton
                        key={day?.key}
                        onClick={() => {
                          setSelectedDay(day?.key),
                            onChangeDateChange(day?.date)
                        }
                        }
                        parentClassName=""
                        className={`rounded-[10px] px-[15px] py-[15px] text-[18px] font-medium box_shadow_common !border-none min-w-[140px] xl:min-w-[140px]  w-full ${selectedDay == day?.key
                          ? "!text-white  gradient-background"
                          : "gradient-text"
                          }`}
                      >
                        {day?.value?.charAt(0).toUpperCase() + day?.value?.slice(1)}
                      </CustomWhiteButton>
                    </div>
                  ))
                }
              </div>
              : null
          }
         
            {loder?.is_loading && loder?.loding_type === "rahukal_loader"?
            <>
        <Loader2 />
        </>
     
:
          <RahuKaalTimingCard
            rahuKaalData={rahuKaalData}
            selectedDate={moment(selectedDate).format(DateFormat?.DATE_DASH_FORMAT)}
            setSelectedDate={setSelectedDate}
            apiCallTime={apiCallTime}
          />
          
          }
         
         
        </div>
      </section>


    </>
  );
}

export default memo(RahuKaal);
