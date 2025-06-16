import moment from "moment";
import { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/css/chogadiya.css";
import "../../assets/css/rahukaal.css";
import moon from "../../assets/img/chogadiya/moon.svg";
import sun from "../../assets/img/chogadiya/sun.svg";
import { getChoghadiyamuhurta, todaysPanchang } from "../../services/api/api.services";
import { closeLoder, openLoader, TOAST_ERROR } from "../../utils/CommonFunction";
import { Codes, DateFormat, LanguageOption } from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";

const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CustomWhiteButton = lazy(() => import("../../component/Homepage/CustomWhiteButton"));
const CommonInfoCard = lazy(() => import("../../component/Kaal/CommonInfoCard"));
const RahuKaalForm = lazy(() => import("../../component/Kaal/RahuKaalForm"));
const Loader2 = lazy(() => import("../../component/loader/Loader2"));

function Chogadiya() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // const todayPanchangs = useSelector(state => state?.HomePageSlice?.todayPanchang?.data)
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH;
  const loder = useSelector((state) => state?.masterSlice?.loader);
  const locationData = useSelector((state) => state.masterSlice?.location);

  // ------------------------------------------------- For Geo Location ------------------------------------------------------------
  const [locationValue, setLocationValue] = useState("Ahmedabad");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [choghadiya, setChoghadiya] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    moment().format(DateFormat?.DATE_DASH_FORMAT)
  );
  const [selectedDay, setSelectedDay] = useState("todays");

  // ------------------------------------------------- For Geo Location ------------------------------------------------------------

  const handleChange = (value) => {
    setLocationValue(value);
  };

  // Handle selection of location
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleSubmit = async () => {
    openLoader(dispatch, "rahukal_loader");
    try {
      if (!locationData) {
        throw new Error("Location data not available");
      }

      const submitData = {
        date: moment(selectedDate).format(DateFormat?.DATE_SLASH_FORMAT),
        time: moment().format("HH:mm"),
        lat:
          selectedLocation?.coordinates?.[0] ||
          locationData?.coordinates?.[0] ||
          "23.02579000",
        lon:
          selectedLocation?.coordinates?.[1] ||
          locationData?.coordinates?.[1] ||
          "72.58727000",
        tz: selectedLocation?.tz || locationData?.tz || "5.5",
        tzon: selectedLocation?.tzone?.[0],
        u_name: selectedLocation?.full_name || locationData?.u_name,
        lang: LocalLanguage,
      };

      const response1 = await todaysPanchang(submitData);

      if (response1?.code === Codes?.SUCCESS) {
        let payload = {
          date: moment(selectedDate).format(DateFormat?.DATE_SLASH_FORMAT),
          time: moment().format("HH:mm"),
          lat:
            selectedLocation?.coordinates?.[0] ||
            locationData?.coordinates?.[0] ||
            "23.02579000",
          lon:
            selectedLocation?.coordinates?.[1] ||
            locationData?.coordinates?.[1] ||
            "72.58727000",
          tz: selectedLocation?.tz || locationData?.tz || "5.5",
          lang: LocalLanguage,
        };
        const response2 = await getChoghadiyamuhurta(payload);
        if (response2?.code === Codes?.SUCCESS) {
          setChoghadiya(response2?.data?.response);
        } else {
          TOAST_ERROR(response2?.message);
        }
      } else {
        TOAST_ERROR(response1?.message);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      TOAST_ERROR(error.message || "Something went wrong");
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 200)); // ⏳ Wait 0.2s
      closeLoder(dispatch);
    }
  };

  const formatedDateArray = [
    // { key: 'yesterday', value: t('yesterday'), date: moment().subtract(1, 'days').format(DateFormat?.DATE_DASH_FORMAT) },
    {
      key: "todays",
      value: t("today"),
      date: moment().format(DateFormat?.DATE_DASH_FORMAT),
    },
    {
      key: "tommorw",
      value: t("tomorrow"),
      date: moment().add(1, "days").format(DateFormat?.DATE_DASH_FORMAT),
    },
  ];

  const onChangeDateChange = (day) => {
    setSelectedDate(day);
    // onSubmit()
  };

  const colorCodes = [
    {
      title: t("Auspicious"),
      color: "#A8FFBB",
    },
    {
      title: t("Good"),
      color: "#A9DCFF",
    },
    {
      title: t("Inauspicious"),
      color: "#FFB4B5",
    },
  ];

  let matchedDateObj = {};

  useEffect(() => {
    if (!selectedDate || !Array.isArray(formatedDateArray)) return;

    matchedDateObj = formatedDateArray?.find(
      (item) => item.date === selectedDate
    );
    setSelectedDay(matchedDateObj ? matchedDateObj.key : null);
  }, [selectedDate, formatedDateArray]);

  useEffect(() => {
    if (
      selectedDay &&
      selectedDate &&
      locationData &&
      selectedLocation &&
      selectedLocation.tzone
    ) {
      handleSubmit();
    }
  }, [selectedDate, selectedDay, selectedLocation, locationData]);

  return (
    <>
      <section>
        <CommonBanner text={t("choghadiya")} highlight="" />
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
            placeholder={t("enter_city_name")}
            onSubmit={handleSubmit}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedDay={selectedDay}
            locationData={locationData}
            form_button_text={t('Get_Choghadiya')}
          />
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50  flex flex-col gap-[30px] md:gap-[50px]">
          {matchedDateObj ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex justify-start md:justify-between gap-8 md:gap-2 ">
              <div className="flex flex-wrap gap-[10px]">
                {formatedDateArray?.map((day, ind) => (
                  <div className="" key={ind}>
                    <CustomWhiteButton
                      key={day?.key}
                      onClick={() => {
                        setSelectedDay(day?.key), onChangeDateChange(day?.date);
                      }}
                      parentClassName=""
                      className={`rounded-[10px] px-[15px] py-[15px] text-[18px] font-medium box_shadow_common !border-none min-w-[140px] xl:min-w-[140px]  w-full ${
                        selectedDay == day?.key
                          ? "!text-white  gradient-background"
                          : "gradient-text"
                      }`}
                    >
                      {day?.value?.charAt(0).toUpperCase() +
                        day?.value?.slice(1)}
                    </CustomWhiteButton>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-[30px]">
                {colorCodes?.map((ele, ind) => {
                  return (
                    <div key={ind} className="flex gap-[10px] items-center">
                      <div
                        style={{ background: ele.color }}
                        className="w-[26px] h-[26px] rounded-full"
                      ></div> 
                      <p className="text-[20px] leading-[150%] font-[500] text-[#343434] mb-0">
                        {ele.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div>
            {loder?.is_loading && loder?.loding_type === "rahukal_loader" ? (
              <Loader2 />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] choghadiya_border_style">
                <div className="bg-white rounded-[10px] new_border box_shadow_common w-full ">
                  <div className="flex items-center gap-3 md:gap-5 px-[15px] md:px-[30px] py-[16px]">
                    <div className="w-[50px] h-[50px] ">
                      <img src={sun} alt="" />
                    </div>
                    <h2 className="chogadiyaHeadingTable gradient-text !leading-[150%] mb-0">
                      {t("Day_Choghadiya")}
                    </h2>
                  </div>
                  <div className="w-full text-sm  bg-white rounded-[12px] ">
                    <div className="flex chogadiyaTableTh  px-[30px] py-[12px] commonLightBack">
                      <div className="w-1/3">{t("Muhurat")}</div>
                      <div className="w-1/3">{t("Time")}</div>
                    </div>

                    <div className="px-[15px] md:px-[30px] py-[16px] flex flex-col gap-[20px]">
                      {choghadiya?.day?.map((ele, ind) => {
                        return (
                          <div
                            className="flex items-center new_border_bottom pb-[14px] text-[#333] gap-[10px]"
                            key={ind}
                          >
                            <div className="w-1/3 chogadiyaTitle commonQuesH3 ">
                              {ele?.muhurat}
                            </div>
                            <div className="w-1/3 text-[18px] !font-medium chogadiyaDate">
                              {ele?.start} – {ele?.end}
                            </div>
                            <div className="w-1/3 flex justify-end">
                              <span
                                className={`  commonQuesP px-3 py-[4px] rounded-full  chogadiyaBadge`}
                                style={{ backgroundColor: ele?.color }}
                              >
                                {ele?.type}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-[10px] new_border box_shadow_common w-full ">
                  <div className="flex items-center gap-5 px-[15px] md:px-[30px] py-[16px]">
                    <div className="w-[50px] h-[50px]">
                      <img src={moon} alt="" />
                    </div>
                    <h2 className="chogadiyaHeadingTable gradient-text !leading-[150%] mb-0">
                      {t("Night_Choghadiya")}
                    </h2>
                  </div>
                  <div className="w-full text-sm  bg-white rounded-[12px] ">
                    <div className="flex chogadiyaTableTh  px-[30px] py-[12px] commonLightBack">
                      <div className="w-1/3">{t("Muhurat")}</div>
                      <div className="w-1/3">{t("Time")}</div>
                      {/* <div className="w-1/3">Status</div> */}
                    </div>

                    <div className="px-[30px] py-[16px] flex flex-col gap-[20px]">
                      {choghadiya?.night?.map((ele, ind) => {
                        return (
                          <div
                            className="flex items-center new_border_bottom pb-[14px] text-[#333] gap-[10px]"
                            key={ind}
                          >
                            <div className="w-1/3 chogadiyaTitle commonQuesH3 ">
                              {ele?.muhurat}
                            </div>
                            <div className="w-1/3 text-[18px] !font-medium chogadiyaDate">
                              {ele?.start} – {ele?.end}
                            </div>
                            <div className="w-1/3 flex justify-end">
                              <span
                                className={`  commonQuesP px-3 py-[4px] rounded-full  chogadiyaBadge`}
                                style={{ backgroundColor: ele?.color }}
                              >
                                {ele?.type}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto paddingTop50 paddingBottom100 flex flex-col gap-[30px]">
          <CommonInfoCard
            title={t("What_is_Choghadiya")}
            description={t("What_is_Choghadiya_text")}
          />
        </div>
      </section>
    </>
  );
}

export default memo(Chogadiya);
