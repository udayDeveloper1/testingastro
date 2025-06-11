import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
// import { PATHS } from "../../routers/Paths";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { UpdatedPaths } from "../../routers/Paths";
import {
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
  getRemedies,
  getSadeSatiTh,
  getShadbalaTh,
  getYoginiDashaSubTh,
  kundliPredication,
} from "../../services/api/api.services";
import { setKundliDetailsData, setUndefine } from "../../storemain/slice/MasterSlice";
import {
  closeLoder,
  formatDate,
  formatTime,
  hasAtLeastOneResponseData,
  openLoader,
} from "../../utils/CommonFunction";
import {
  Codes,
  DateFormat,
  LanguageOption,
  TimeFormat,
} from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";
import { getBasePath } from "../../utils/navigations/NavigationPage";
import CommonBanner from "../CommonBanner";
import NewKundaliReport from "../kundali/NewKundaliReport";
import Loader from "../loader/Loader";
import { KundliChartType } from "../NewKundaliComp/KundliVariabls";
import { kundliTabConfig } from "./kundliTabConfig";
import "../../assets/css/Kundli.css";

const CustomTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PATHS = UpdatedPaths();

  const { t } = useTranslation();
  const { tab: tabParams } = useParams();
  const tabContainerRef = useRef(null);

  const navigationData = location.state?.kundliData;
  const kundliDetailsData = useSelector( (state) => state?.masterSlice?.kundliDetailsData );
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH;
  const loder = useSelector((state) => state?.masterSlice?.loader);
  const [activeKey, setActiveKey] = useState(
    kundliTabConfig?.find((tab) => tab.key === tabParams) ? tabParams : "basic"
  );
  const KundliItem =
    JSON.parse(localStorage.getItem(Constatnt?.KUNDLI_KEY)) || null;

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [allKundliDetails, setAllKUndliDetails] = useState({});

  useEffect(() => {
    if (kundliDetailsData) {
      setAllKUndliDetails(kundliDetailsData);
      closeLoder(dispatch);
    } else {
      setAllKUndliDetails([]);
      navigate(PATHS?.FREEKUNDALI);
    }

    if (!KundliItem) {
      navigate(PATHS?.FREEKUNDALI);
    }
    closeLoder(dispatch);
  }, [kundliDetailsData, KundliItem]);

  useEffect(() => {
    if (navigationData || KundliItem) {
      dispatch(setKundliDetailsData(KundliItem));
    }
    closeLoder(dispatch);
  }, [navigationData]);

  useEffect(() => {
    checkForScroll();
    window.addEventListener("resize", checkForScroll);
    return () => window.removeEventListener("resize", checkForScroll);
  }, []);

  const checkForScroll = () => {
    const el = tabContainerRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollWidth > el.clientWidth + el.scrollLeft);
    }
  };

  const scroll = (direction) => {
    if (tabContainerRef.current) {
      const scrollAmount = 150;
      tabContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [predicatioinApi, setPredicationApi] = useState({});
console.log('dsdsjddsdsjddsdsjd',hasAtLeastOneResponseData(allKundliDetails?.panchangeDetails));
console.log("dsdsjd");

if (hasAtLeastOneResponseData(allKundliDetails?.panchangeDetails)) {
  dispatch(setUndefine(true));
}

console.log(allKundliDetails);

  const tabConfigWithProps = kundliTabConfig?.map((tab) => ({
    ...tab,
    element: React.cloneElement(tab?.element, {
      allKundliDetails,
      predicatioinApi,
    }),
  }));

  const currentTab = kundliTabConfig?.find((tab) => tab.key === activeKey);

  // -----------------------------------------------------------------  Half Api Calling ---------------------------------------------------------------------------------------------------
  const kundliDetailsApiCalling = async data => {
  console.log(data);
  
// if (!data) {
//   dispatch(setUndefine(true))
// }


    console.log('kundliDetailsApiCalling data', data);
    let updatedRequest = {
      dob: data?.date,
      tob: formatTime(data?.time, TimeFormat?.TIME_24_HOUR_FORMAT),
      tz: data?.tz,
      lat: data?.lat,
      lon: data?.lon,
      lang: LocalLanguage,
    };

    let request = {
      date: data?.date,
      time: formatTime(data?.time, TimeFormat?.TIME_24_HOUR_FORMAT),
      lat: data?.lat,
      lon: data?.lon,
      tz: data?.tz,
      lang: LocalLanguage,
      bop: data?.bop,
      gender: data?.gender || '-',
      u_name: data?.u_name || '-',
      tzon: data?.tzone
    }

    const handleSuccess = (key, value) => {
      // ✅ Create a shallow clone of kundliDetails
      const prev =
        JSON.parse(localStorage.getItem(Constatnt?.KUNDLI_KEY)) || {};

      const updatedKundliDetails = { ...prev, [key]: value };
      localStorage.setItem(
        Constatnt?.KUNDLI_KEY,
        JSON.stringify(updatedKundliDetails)
      );
      // Save to localStorage and Redux
      dispatch(setKundliDetailsData(updatedKundliDetails));
    };

    try {
      const panchangRes = await getPanchangTh(request);
      if (panchangRes?.code === Codes.SUCCESS) {
        handleSuccess("panchangeDetails", panchangRes?.data);
      }

      const rashiLagnaChart = await getDivisionalChartTh({
        ...updatedRequest,
        div: KundliChartType.D1,
        transit_date: moment().format("DD/MM/YYYY"),
        year: moment().format("YYYY"),
      });

      if (rashiLagnaChart?.code === Codes.SUCCESS) {
        handleSuccess("rashiLagnaChart", rashiLagnaChart?.data?.response);
      }

      const navamsaChart = await getDivisionalChartTh({
        ...updatedRequest,
        div: KundliChartType.D9,
        transit_date: moment().format("DD/MM/YYYY"),
        year: moment().format("YYYY"),
      });
      if (navamsaChart?.code === Codes.SUCCESS) {
        handleSuccess("navamsaChart", navamsaChart?.data?.response);
      }

      const chalitChart = await getDivisionalChartTh({
        ...updatedRequest,
        div: KundliChartType.chalit,
        transit_date: moment().format("DD/MM/YYYY"),
        year: moment().format("YYYY"),
      });
      if (chalitChart?.code === Codes.SUCCESS) {
        handleSuccess("chalitChart", chalitChart?.data?.response);
      }

      const sunChart = await getDivisionalChartTh({
        ...updatedRequest,
        div: KundliChartType.sun,
        transit_date: moment().format("DD/MM/YYYY"),
        year: moment().format("YYYY"),
      });
      if (sunChart?.code === Codes.SUCCESS) {
        handleSuccess("sunChart", sunChart?.data?.response);
      }

      const moonChart = await getDivisionalChartTh({
        ...updatedRequest,
        div: KundliChartType.moon,
        transit_date: moment().format("DD/MM/YYYY"),
        year: moment().format("YYYY"),
      });
      if (moonChart?.code === Codes.SUCCESS) {
        handleSuccess("moonChart", moonChart?.data?.response);
      }

      const planetRes = await getPlanetsDetailsTh(updatedRequest);
      if (planetRes?.code === Codes.SUCCESS) {
        handleSuccess("planetDetails", planetRes?.data?.response);
      }

      const ashtakvarga = await getAshtakvargaTh(updatedRequest);
      if (ashtakvarga?.code === Codes.SUCCESS) {
        handleSuccess("ashtakvarga", ashtakvarga?.data?.response);
      }

      const mahaDasha = await getMahaDashaTh(updatedRequest);
      if (mahaDasha?.code === Codes.SUCCESS) {
        handleSuccess("mahaDasha", mahaDasha?.data?.response);
      }

      const charDashaMain = await getCharDashaMainTh(updatedRequest);
      if (charDashaMain?.code === Codes.SUCCESS) {
        handleSuccess("charDashaMain", charDashaMain?.data?.response);
      }

      const yoginiDashaSub = await getYoginiDashaSubTh(updatedRequest);
      if (yoginiDashaSub?.code === Codes.SUCCESS) {
        handleSuccess("yoginiDashaSub", yoginiDashaSub?.data?.response);
      }

      const charDashaSub = await getCharDashaSubTh(updatedRequest);
      if (charDashaSub?.code === Codes.SUCCESS) {
        handleSuccess("charDashaSub", charDashaSub?.data?.response);
      }

      const antarDasha = await getAntarDashaTh(updatedRequest);
      if (antarDasha?.code === Codes.SUCCESS) {
        handleSuccess("antarDasha", antarDasha?.data?.response);
      }

      const mahaDashaPrediction = await getMahaDashaPredictionTh(
        updatedRequest
      );
      if (mahaDashaPrediction?.code === Codes.SUCCESS) {
        handleSuccess(
          "mahaDashaPrediction",
          mahaDashaPrediction?.data?.response
        );
      }

      const getMangalDosh = await getMangalDoshTh(updatedRequest);
      if (getMangalDosh?.code === Codes.SUCCESS) {
        handleSuccess("mangalDosh", getMangalDosh?.data?.response);
      }

      const getKaalsarpDosh = await getKaalsarpDoshTh(updatedRequest);
      if (getKaalsarpDosh?.code === Codes.SUCCESS) {
        handleSuccess("KaalsarpDosh", getKaalsarpDosh?.data?.response);
      }

      const getMangalikDosh = await getMangalikDoshTh(updatedRequest);
      if (getMangalikDosh?.code === Codes.SUCCESS) {
        handleSuccess("mangalikDosh", getMangalikDosh?.data?.response);
      }

      const getPitraDosh = await getPitraDoshTh(updatedRequest);
      if (getPitraDosh?.code === Codes.SUCCESS) {
        handleSuccess("pitraDosh", getPitraDosh?.data?.response);
      }

      const shadBala = await getShadbalaTh(updatedRequest);
      if (shadBala?.code === Codes.SUCCESS) {
        handleSuccess("shadBala", shadBala?.data?.response);
      }

      const friendShip = await getFriendShipTh(updatedRequest);
      if (friendShip?.code === Codes.SUCCESS) {
        handleSuccess("friendShip", friendShip?.data?.response);
      }

      const sadeSati = await getSadeSatiTh(updatedRequest);
      if (sadeSati?.code === Codes.SUCCESS) {
        handleSuccess("sadeSati", sadeSati?.data?.response);
      }

      // const transitChart = await getDivisionalChartTh({
      //   ...updatedRequest,
      //   div: KundliChartType.transit,
      //   transit_date: moment().format('DD/MM/YYYY'),
      //   year: moment().format('YYYY')
      // })
      // if (transitChart?.code === Codes.SUCCESS) {
      //   handleSuccess('transitChart', transitChart?.data?.response)
      // }

      // const varshapalChart = await getDivisionalChartTh({
      //   ...updatedRequest,
      //   div: KundliChartType.varshapal,
      //   transit_date: moment().format('DD/MM/YYYY'),
      //   year: moment().format('YYYY')
      // })
      // if (varshapalChart?.code === Codes.SUCCESS) {
      //   handleSuccess('varshapalChart', varshapalChart?.data?.response)
      // }

      const remedies = await getRemedies({
        ...updatedRequest,
        place: data?.bop,
        type: "",
        nakshatra: "",
        name: data?.u_name,
      });
      if (remedies?.code === Codes.SUCCESS) {
        handleSuccess("remedies", remedies?.data);
      }

      const predicationDetails = {};

      const [
        kundliPredicationDaily,
        kundliPredicationMonthly,
        kundliPredicationLife,
      ] = await Promise.all([
        kundliPredication({
          ...updatedRequest,
          name: data?.u_name,
          type: "daily",
        }),

        kundliPredication({
          ...updatedRequest,
          name: data?.u_name,
          type: "monthly",
        }),

        kundliPredication({
          ...updatedRequest,
          name: data?.u_name,
          type: "life",
        }),
      ]);

      predicationDetails.kundliPredication = {
        daily:
          kundliPredicationDaily?.code === Codes?.SUCCESS
            ? kundliPredicationDaily?.data || ""
            : "",
        monthly:
          kundliPredicationMonthly?.code === Codes?.SUCCESS
            ? kundliPredicationMonthly?.data || ""
            : "",
        life:
          kundliPredicationLife?.code === Codes?.SUCCESS
            ? kundliPredicationLife?.data || ""
            : "",
      };

      setPredicationApi(predicationDetails);
    } catch (err) {
      console.error("Error while fetching kundli data sequentially:", err);
    }
  };

  const hasCalledApi = useRef(false)

  useEffect(() => {
    if (
      !hasCalledApi.current &&
      kundliDetailsData &&
      Object.keys(KundliItem)?.length !== 24
    ) {
      openLoader(dispatch, 'freeKundli_details')
      if(KundliItem?.panchangeDetails?.request){
        kundliDetailsApiCalling(KundliItem?.panchangeDetails?.request)
      }
      hasCalledApi.current = true
      const timer = setTimeout(() => {
        closeLoder(dispatch)
      }, 300)
      // ✅ Clean up timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [kundliDetailsData, KundliItem, LocalLanguage]);

  useEffect(() => {
    if (hasCalledApi.current === true && KundliItem?.panchangeDetails?.request?.lang !== LocalLanguage) {
      hasCalledApi.current = false
    }
  }, [LocalLanguage]);


  // useEffect(() => {
  //   const shouldCallApi =
  //     kundliDetailsData &&
  //     Object.keys(KundliItem || {}).length !== 24 &&
  //     (KundliItem?.panchangeDetails?.request?.lang !== LocalLanguage || !hasCalledApi.current);

  //   if (shouldCallApi) {
  //     openLoader(dispatch, 'freeKundli_details');
  //     kundliDetailsApiCalling({ ...KundliItem?.panchangeDetails?.request, lang: LocalLanguage });
  //     hasCalledApi.current = true;

  //     const timer = setTimeout(() => {
  //       closeLoder(dispatch);
  //     }, 300);
  //     return () => clearTimeout(timer);
  //   }
  // }, [kundliDetailsData, KundliItem, LocalLanguage]);

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "freeKundli_details" && (
        <Loader />
      )}

      <CommonBanner
        text={t(currentTab?.bannerText) || ""}
        highlight={currentTab?.bannerHighlight || ""}
      />

      <div className="w-full bg-white container paddingTop50 customTabs_">
        <div className="relative">
          {canScrollLeft && (
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => scroll("left")}
              className="left_btn absolute left-80 md:-left-10  top-1/2 transform  -translate-y-1/2 z-10 bg-white shadow hover:border-[#e3725d] hover:text-[#e3725d]"
              size="large"
            />
          )}

          <div
            ref={tabContainerRef}
            onScroll={checkForScroll}
            className="mx-auto overflow-x-auto flex no-scrollbar space-x-2 px-16 custom-tabs-container-main"
          >
            {kundliTabConfig?.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === kundliTabConfig.length - 1;
              const isActive = activeKey === item.key;
              return (
                <div
                  key={item.key}
                  className={`min-w-max cursor-pointer custom-tab ${isActive ? "active" : ""
                    } ${isFirst ? "rounded-l-full" : ""} ${isLast ? "rounded-r-full" : ""
                    }`}
                  onClick={(e) => {
                    setActiveKey(item.key);
                    navigate(
                      `${getBasePath(PATHS.FREEKUNDALI_DETAILS)}/${item.key}`
                    );

                    // Scroll the clicked tab into view
                    e.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }}
                >
                  {t(`${item.key}`)}
                </div>
              );
            })}
          </div>

          {canScrollRight && (
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => scroll("right")}
              className="absolute right_btn  top-1/2 transform  -translate-y-1/2 z-10 bg-white shadow hover:border-[#e3725d] hover:text-[#e3725d]"
              size="large"
            />
          )}
        </div>
      </div>

      <div className="container mx-auto ">
        {tabConfigWithProps?.map((tab) => (
          <div
            key={tab.key}
            style={{ display: activeKey === tab.key ? "block" : "none" }}
          >
            {tab.element}
          </div>
        ))}
      </div>

      <section className="padding100 px-[15px] md:px-[0]">
        <div className="KundliReportBg container mx-auto  rounded-[10px] ">
          <NewKundaliReport />
        </div>
      </section>
    </>
  );
};

export default CustomTabs;
