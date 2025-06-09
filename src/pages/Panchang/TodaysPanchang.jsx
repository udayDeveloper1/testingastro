import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";

// Lazy Load Components
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CustomTable = lazy(() => import("../../component/Custom/CustomTable"));
const GeoSearchInput = lazy(() => import("../../component/geo/GeoSearchInput"));
const LagnaChartAndBalam = lazy(() => import("../../component/panchang/LagnaChartAndBalam"));
const HomeFAQs = lazy(() => import("../../component/Homepage/HomeFAQs"));
const Loader = lazy(() => import("../../component/loader/Loader"));
// const TodayPanchangCard = lazy(() => import("../../component/Panchang/TodayPanchangCard"));


// Static Imports
import { KundliChartType } from "../../component/NewKundaliComp/KundliVariabls";
import {
  getLagnaChartData,
  getPlanetDataForTodayPanchang,
  getTodaysPanchangAPi,
} from "../../storemain/slice/HompageSlice";
import {
  getDashboardPanchang,
  setLoading,
  setUserLoginData,
} from "../../storemain/slice/MasterSlice";
import { closeLoder, openLoader } from "../../utils/CommonFunction";
import { LanguageOption } from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";
import TodayPanchangCard from "../../component/panchang/TodayPanchangCard";


function TodaysPanchang() {
  const [locationValue, setLocationValue] = useState("Mumbai"); // State for the input value
  const [selectedLocation, setSelectedLocation] = useState(null); // State for the selected location
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const LOGIN_KEY = localStorage.getItem(Constatnt?.LOGIN_KEY);
  const AUTH_KEY = JSON.parse(localStorage.getItem(Constatnt?.AUTH_KEY));
  const myLanguage = useSelector(
    (state) => state?.masterSlice?.currentLanguage
  );
  // const panchangDetailsData = useSelector((state) => state?.HomePageSlice?.todayPanchang?.data);

  const panchangDetailsData = useSelector(state => state.masterSlice?.panchangDetails)

  const panchangeLagnaChart = useSelector((state) => state?.HomePageSlice?.lagnaChart?.data) || {};
  const planetDataForTodayPanchang = useSelector((state) => state?.HomePageSlice?.planetDataForTodayPanchang?.data) || {};
  const loder = useSelector((state) => state?.masterSlice?.loader);

  const now = new Date();
  const padZero = (num) => String(num).padStart(2, "0");
  // Format date as DD/MM/YYYY
  const dob = `${padZero(now.getDate())}/${padZero(now.getMonth() + 1)}/${now.getFullYear()}`;
  // Format time as HH:MM
  const tob = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;

  const submitData = {
    date: dob || moment().format("DD/MM/YYYY"),
    time: tob || moment().format("HH:mm"),
    lat: selectedLocation?.coordinates?.[0] || "19.0760",
    lon: selectedLocation?.coordinates?.[1] || "72.8777",
    tz: selectedLocation?.tz || "5.5",
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
    dob: moment().format("DD/MM/YYYY"),
    tob: moment().format("HH:mm"),
    lat: selectedLocation?.coordinates?.[0] || "19.0760",
    lon: selectedLocation?.coordinates?.[1] || "72.8777",
    tz: selectedLocation?.tz || "5.5",
    div: KundliChartType?.D1,
    lang: myLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
    transit_date: moment().format("DD/MM/YYYY"),
    year: `${moment().year()}`,
  };

  const fetchData = useCallback(() => {
    dispatch(setLoading({ is_loading: true, loading_type: "todayPanchang" }));

    dispatch(getTodaysPanchangAPi({ submitData })).finally(() => {
      dispatch(
        setLoading({ is_loading: false, loading_type: "todayPanchang" })
      );
    });
    dispatch(
      getPlanetDataForTodayPanchang({ submitData: submitDataForPalnet })
    ).finally(() => {
      dispatch(
        setLoading({ is_loading: false, loading_type: "todayPanchang" })
      );
    });
    dispatch(
      getLagnaChartData({ submitData: submitDataForLagnaChart })
    ).finally(() => {
      dispatch(
        setLoading({ is_loading: false, loading_type: "todayPanchang" })
      );
    });
    setLocationValue("");
    if (LOGIN_KEY) {
      dispatch(setUserLoginData({ is_login: true, loginUserData: AUTH_KEY }));
    }
  }, [dispatch, selectedLocation, locationValue]);

  useEffect(() => {
    fetchData();
  }, [myLanguage]);

  const todayPanchangData = panchangDetailsData?.response;
  // Format nakshatra with end time
  const formattedNakshatra = todayPanchangData?.nakshatra?.name
    ? `${todayPanchangData.nakshatra.name} upto ${new Date(
      todayPanchangData.nakshatra.end
    ).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })}`
    : "";

  const dataSource = [
    {
      key: "1",
      label: t("Tithi"),
      value: todayPanchangData?.tithi?.name || "—",
    },
    {
      key: "2",
      label: t("Nakshatra"),
      value: todayPanchangData?.nakshatra?.name || "—",
    },
    { key: "3", label: t("Yoga"), value: todayPanchangData?.yoga?.name || "—" },
    {
      key: "4",
      label: t("Karana"),
      value: todayPanchangData?.karana?.name || "—",
    },
    {
      key: "5",
      label: t("Paksha"),
      value: todayPanchangData?.advanced_details?.masa?.paksha || "—",
    },
    {
      key: "6",
      label: t("weekday"),
      value: todayPanchangData?.day?.name || "—",
    },
    {
      key: "7",
      label: t("Shaka_Samvat"),
      value:
        todayPanchangData?.advanced_details?.years?.saka +
        " " +
        todayPanchangData?.advanced_details?.years?.saka_samvaat_name || "—",
    },
    {
      key: "8",
      label: t("Vikram_Samvat"),
      value:
        todayPanchangData?.advanced_details?.years?.vikram_samvaat +
        " " +
        todayPanchangData?.advanced_details?.years?.vikram_samvaat_name ||
        "—",
    },
  ];

  const content = t("panchang_description", { returnObjects: true });

  const columns = [
    {
      title: t("Panchang_Element"),
      dataIndex: "label",
      key: "label",
      render: (text) => <span className="">{text || "-"}</span>,
    },
    {
      title: t("Value"),
      dataIndex: "value",
      key: "value",
      render: (text) => <span className="">{text || "-"}</span>,
    },
  ];

  const columns1 = [
    {
      title: t("Kaal_Type"),
      dataIndex: "label",
      key: "label",
      fixed: "left",
      render: (text) => <span className="font-semibold">{text || "-"}</span>,
    },
    {
      title: t("Duration"),
      dataIndex: "time",
      key: "time",
      render: (text) => <span className="max-w-[250px]">{text || "-"}</span>,
    },
  ];

  const rawKaalData = [
    {
      label: t("Rahu_Kaal"),
      time: todayPanchangData?.rahukaal || "-",
    },
    {
      label: t("Gulika_Kaal"),
      time: todayPanchangData?.gulika || "-",
    },
    {
      label: t("Yamaganda"),
      time: todayPanchangData?.yamakanta || "-",
    },
    {
      label: t("Abhijit_Muhurta"),
      time: `${todayPanchangData?.advanced_details?.abhijit_muhurta?.start || "-"
        } To ${todayPanchangData?.advanced_details?.abhijit_muhurta?.end || "-"}`,
    },
    {
      label: t("Tithi"),
      time:
        todayPanchangData?.tithi?.start && todayPanchangData?.tithi?.end
          ? `${myLanguage === LanguageOption?.ENGLISH
            ? new Date(todayPanchangData.tithi.start).toLocaleString()
            : todayPanchangData?.tithi?.start
          } to ${myLanguage === LanguageOption?.ENGLISH
            ? new Date(todayPanchangData.tithi.end).toLocaleString()
            : todayPanchangData.tithi.end
          }`
          : "-",
    },
    {
      label: t("Nakshatra"),
      time:
        todayPanchangData?.nakshatra?.start && todayPanchangData?.nakshatra?.end
          ? `${myLanguage === LanguageOption?.ENGLISH
            ? new Date(todayPanchangData.nakshatra.start).toLocaleString()
            : todayPanchangData?.tithi?.start
          } to ${myLanguage === LanguageOption?.ENGLISH
            ? new Date(todayPanchangData.nakshatra.end).toLocaleString()
            : todayPanchangData?.tithi?.start
          }`
          : "-",
    },
  ];

  const dataSource1 = rawKaalData?.map((item, index) => ({
    key: index + 1,
    label: item.label,
    time: `${myLanguage === LanguageOption?.ENGLISH ? `From ${item.time}` : item.time
      }`,
  }));

  const convertToDMS = (decimalDegree) => {
    const degrees = Math.floor(decimalDegree);
    const minutesDecimal = (decimalDegree - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;
    return `${degrees}°${minutes}′${Math.round(seconds)}″`;
  };

  const planetColumns = [
    {
      title: t("Planet"),
      dataIndex: "planet",
      key: "planet",
      fixed: "left",
    },
    {
      title: t("Rashi"),
      dataIndex: "rashi",
      key: "rashi",
    },
    {
      title: t("Longitude"),
      dataIndex: "longitude",
      key: "longitude",
    },
    {
      title: t("Nakshatra"),
      dataIndex: "nakshatra",
      key: "nakshatra",
      width: "150px",
    },
    {
      title: t("Pada"),
      dataIndex: "pada",
      key: "pada",
      width: "80px",
    },
  ];

  const planetData = (planetDataForTodayPanchang?.response?.planets || []).map(
    (planet, index) => ({
      key: index + 1,
      planet: planet.full_name || planet.name,
      rashi: planet.zodiac,
      longitude: convertToDMS(parseFloat(planet.local_degree)),
      nakshatra: (planet.nakshatra || "")?.replace(/\(.*\)/, ""),
      pada: String(planet.nakshatra_pada),
    })
  );

  const avoidBhumiPujan = [
    {
      title: "",
      description: "Sunday (Sun)",
    },
    {
      title: "",
      description: "Monday (Moon)",
    },
    {
      title: "",
      description: "Tuesday (Mars)",
    },
    {
      title: "",
      description: "Wednesday (Mercury)",
    },
    {
      title: "",
      description: "Thursday (Jupiter)",
    },
    {
      title: "",
      description: "Friday (Venus)",
    },
    {
      title: "",
      description: "Saturday (Saturn)",
    },
  ];

  const introText = t("yoga_descriptions", { returnObjects: true });

  const data = [
    {
      name: t("Vishkumbha_name"),
      description: t("Vishkumbha"),
    },
    {
      name: t("Preeti_name"),
      description: t("Preeti"),
    },
    {
      name: t("Ayushman_name"),
      description: t("Ayushman"),
    },
    {
      name: t("Saubhagya_name"),
      description: t("Saubhagya"),
    },
    {
      name: t("Shobhana_name"),
      description: t("Shobhana"),
    },
    {
      name: t("Atiganda_name"),
      description: t("Atiganda"),
    },
    {
      name: t("Sukarma_name"),
      description: t("Sukarma"),
    },
    {
      name: t("Dhriti_name"),
      description: t("Dhriti"),
    },
    {
      name: t("Shoola_name"),
      description: t("Shoola"),
    },
    {
      name: t("Ganda_name"),
      description: t("Ganda"),
    },
    {
      name: t("Vridhi_name"),
      description: t("Vridhi"),
    },
    {
      name: t("Dhruva_name"),
      description: t("Dhruva"),
    },
    {
      name: t("Vyaghata_name"),
      description: t("Vyaghata"),
    },
    {
      name: t("Harshana_name"),
      description: t("Harshana"),
    },
    {
      name: t("Vajra_name"),
      description: t("Vajra"),
    },
    {
      name: t("Siddhi_name"),
      description: t("Siddhi"),
    },
    {
      name: t("Vyatipata_name"),
      description: t("Vyatipata"),
    },
    {
      name: t("Variyana_name"),
      description: t("Variyana"),
    },
    {
      name: t("Parigha_name"),
      description: t("Parigha"),
    },
    {
      name: t("Shiva_name"),
      description: t("Shiva"),
    },
    {
      name: t("Siddha_name"),
      description: t("Siddha"),
    },
    {
      name: t("Saadhya_name"),
      description: t("Saadhya"),
    },
    {
      name: t("Shubha_name"),
      description: t("Shubha"),
    },
    {
      name: t("Shukla_name"),
      description: t("Shukla"),
    },
    {
      name: t("Brahma_name"),
      description: t("Brahma"),
    },
    {
      name: t("Indra_name"),
      description: t("Indra"),
    },
    {
      name: t("Vaidhriti_name"),
      description: t("Vaidhriti"),
    },
  ];

  const taraBala = [
    "Ashwini",
    "Krittika",
    "Mrigashirsha",
    "Pushya",
    "Magha",
    "Uttara Phalguni",
    "Chitra",
    "Anuradha",
    "Mula",
    "Uttara Ashadha",
    "Dhanishta",
    "Uttara Bhadrapada",
  ];

  const chandraBala = [...taraBala]; // If same list, otherwise modify accordingly

  // Handle change for input field value
  const handleChange = (value) => {
    setLocationValue(value);
  };

  // Handle selection of location
  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  // Handle form submission (GET PANCHANG button)
  const handleSubmit = async () => {
    openLoader(dispatch, "panchang_loader");
    const submitData = {
      date: moment().format("DD/MM/YYYY"),
      time: moment().format("HH:mm"),
      lat: selectedLocation?.coordinates?.[0] || "",
      lon: selectedLocation?.coordinates?.[1] || "",
      tz: selectedLocation?.tz || "",
      tzon: selectedLocation?.tzone?.[0],
      bop: selectedLocation?.full_name || 'Mumbai',
      u_name: '',
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
      dob: moment().format("DD/MM/YYYY"),
      tob: moment().format("HH:mm"),
      lat: selectedLocation?.coordinates?.[0] || "",
      lon: selectedLocation?.coordinates?.[1] || "",
      tz: selectedLocation?.tz || "",
      div: KundliChartType?.D1,
      lang: myLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
      transit_date: moment().format("DD/MM/YYYY"),
      year: `${moment().year()}`,
    };

    // const submitDataForPalnet = { ...submitData }; // if needed separately
    await Promise.all([
      dispatch(getTodaysPanchangAPi({ submitData })),
      // dispatch(getDashboardPanchang(submitData)),
      dispatch(getPlanetDataForTodayPanchang({ submitData: submitDataForPalnet })),
      dispatch(getLagnaChartData({ submitData: submitDataForLagnaChart })),
    ]);

    setLocationValue("");
    await new Promise((resolve) => setTimeout(resolve, 500)); // ⏳ Wait 0.5s
    // dispatch(setLoading({ is_loading: false, loading_type: "todayPanchang" }));
    closeLoder(dispatch);
  };

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "panchang_loader" && (
        <>
          <Loader />
        </>
      )}

      <section>
        <CommonBanner
          // backgroundImage={PrivacyBanner}
          text=""
          highlight={t("Panchang_Details")}
        />
      </section>

      <section>
        <div className="container mx-auto paddingTop100 flex flex-col gap-12">
          <div>
            <GeoSearchInput
              value={locationValue} // Bind the value to the state
              onChange={handleChange} // Pass the handler for input change
              onSelectLocation={handleSelectLocation} // Handle location selection
              placeholder={t("enter_city_name")}
              showClear={true} // Show clear button if needed
              showButton={true} // Show GET PANCHANG button
              onSubmit={handleSubmit} // Handle submit
            />
          </div>
          <TodayPanchangCard
            todayPanchangcardData={panchangDetailsData?.response}
            todayRequest={panchangDetailsData?.request}
            location={selectedLocation}
          />
        </div>
      </section>
      <section>
        <div className=" container mx-auto paddingTop50 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-8 lg:gap-6">
            <div className="col-span-5 lg:col-span-2 ">
              <h3 className="commonQuesH2 pb-3 lg:pb-5">
                {t("Today_s_Panchang")}
              </h3>

              <CustomTable
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                className="dasha_siddha new_panchang_table panchang123"
                scroll={{ x: "max-content" }}
              />
            </div>

            <div className="col-span-5 lg:col-span-3">
              <h3 className="commonQuesH2 pb-3 lg:pb-5">
                {t("Inauspicious_Timings")} ({t("Ashubha_Muhurat")})
              </h3>
              <CustomTable
                columns={columns1}
                dataSource={dataSource1}
                pagination={false}
                bordered
                className="dasha_siddha new_panchang_table panchang123"
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="mb-5">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-6 padding100">
          {/* Lagna Chart + Bala Section */}
          <div className="flex justify-center">
            <LagnaChartAndBalam
              taraBala={taraBala}
              chandraBala={chandraBala}
              lagnaChartData={panchangeLagnaChart?.response}
            />
          </div>

          {/* Planetary Position Table */}
          <div className="flex-1 flex flex-col overflow-x-auto">
            <h3 className="commonQuesH2 pb-5">
              {t("Planetary_Position_at_Sunrise")}
            </h3>
            <CustomTable
              columns={planetColumns}
              dataSource={planetData}
              pagination={false}
              bordered
              className="dasha_siddha new_panchang_table panchang123"
              scroll={{ x: "576px" }}
            />
          </div>
        </div>
      </section>

      {/* <section className=''>
        <div className='container mx-auto padding50 flex flex-col gap-10'>
          <CommonQuestionComp
            heading={t('Hindu_Panchang_Info')}
            content={content}
          />
        </div>
      </section> */}

      {/* <section>
        <div className='container mx-auto paddingBottom100 flex flex-col gap-10'>
          <Vaar
            title={'1.  ' + t('information_collected_by_website')}
            introText={t('bhoomi_pujan_note')}
            data={avoidBhumiPujan}
            footerText=''
            listStyle='disc'
          />
          <Tithi
            title={t('tithi_title')}
            introText={t('tithi_introText', { returnObjects: true })}
            arrayTitle={t('tithi_arrayTitle')}
            listStyle='decimal'
            data={t('tithi_data', { returnObjects: true })}
          />
          <Nakshatra
            title={t('nakshatra_title')}
            introText={[t('nakshatra_introText_1'), t('nakshatra_introText_2')]}
            tableTitle={t('nakshatra_tableTitle')}
            data={[
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              },
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              },
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              },
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              },
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              },
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              },
              {
                english: 'Ashvini/Aswini',
                devanagari: 'अश्विनी',
                tamil: 'Aswini',
                malayalam: 'Aswathi'
              },
              {
                english: 'Bharani',
                devanagari: 'भरणी',
                tamil: 'Bharani',
                malayalam: 'Bharani'
              },
              {
                english: 'Krittika/Krithika',
                devanagari: 'कृत्तिका',
                tamil: 'Karthigai',
                malayalam: 'Kaarthika'
              },
              {
                english: 'Rohini',
                devanagari: 'रोहिणी',
                tamil: 'Rohini',
                malayalam: 'Rohini'
              }
              // ... continue up to 27
            ]}
          />

          <Yoga title='4. Yoga' introText={introText} data={data} />
          <Karna />
        </div>
      </section> */}

      <HomeFAQs
        text={t("FAQs")}
        highlightText={t("panchange")}
        subHeading={""}
      />
    </>
  );
}

export default TodaysPanchang;
