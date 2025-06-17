import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import moment from "moment";
import React, { memo, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../assets/css/Kundli.css";
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
  formatTime,
  openLoader
} from "../../utils/CommonFunction";
import {
  Codes,
  LanguageOption,
  TimeFormat
} from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";
import { getBasePath } from "../../utils/navigations/NavigationPage";
import { KundliChartType } from "../NewKundaliComp/KundliVariabls";
import { kundliTabConfig } from "./kundliTabConfig";
import CommonBanner from "../CommonBanner";
const NewKundaliReport = React.lazy(() => import("../kundali/NewKundaliReport"));
const Loader = React.lazy(() => import("../loader/Loader"));


const CustomTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PATHS = UpdatedPaths();

  const { t } = useTranslation();
  const { tab: tabParams } = useParams();
  const tabContainerRef = useRef(null);

  const navigationData = location.state?.kundliData;
  const kundliDetailsData = useSelector((state) => state?.masterSlice?.kundliDetailsData);
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH;
  const loder = useSelector((state) => state?.masterSlice?.loader);
  const [activeKey, setActiveKey] = useState(kundliTabConfig?.find((tab) => tab.key === tabParams) ? tabParams : "basic");
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

  // if (hasAtLeastOneResponseData(!allKundliDetails?.panchangeDetails)) {
  dispatch(setUndefine(true));
  // }

  const tabConfigWithProps = kundliTabConfig?.map((tab) => ({
    ...tab,
    element: React.cloneElement(tab?.element, { allKundliDetails, predicatioinApi }),
  }));

  const currentTab = kundliTabConfig?.find((tab) => tab.key === activeKey);

  // -----------------------------------------------------------------  Half Api Calling ---------------------------------------------------------------------------------------------------

  const kundliDetailsApiCalling = async data => {
    if (!data) {
      return;
    }
    setActiveKey('basic')
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
      bop: data?.bop,
      gender: data?.gender || '-',
      u_name: data?.u_name || '-',
      tzon: data?.tzone,
      lang: LocalLanguage,
    }

    const handleSuccess = (key, value) => {
      // ✅ Create a shallow clone of kundliDetails
      const prev =
        JSON.parse(localStorage.getItem(Constatnt?.KUNDLI_KEY)) || {};

      const updatedKundliDetails = { ...prev, [key]: value };
      localStorage.setItem(Constatnt?.KUNDLI_KEY, JSON.stringify(updatedKundliDetails));
      // Save to localStorage and Redux
      dispatch(setKundliDetailsData(updatedKundliDetails));
    };

    try {

      const today = moment().format("DD/MM/YYYY");
      const year = moment().format("YYYY");

      const [
        panchangRes,
        rashiLagnaChart,
        navamsaChart,
        chalitChart,
        sunChart,
        moonChart,
        planetRes,
        ashtakvarga,
        mahaDasha,
        charDashaMain,
        yoginiDashaSub,
        charDashaSub,
        antarDasha,
        mahaDashaPrediction,
        getMangalDosh,
        getKaalsarpDosh,
        getMangalikDosh,
        getPitraDosh,
        shadBala,
        friendShip,
        sadeSati,
      ] = await Promise.all([
        getPanchangTh(request),

        getDivisionalChartTh({ ...updatedRequest, div: KundliChartType.D1, transit_date: today, year }),
        getDivisionalChartTh({ ...updatedRequest, div: KundliChartType.D9, transit_date: today, year }),
        getDivisionalChartTh({ ...updatedRequest, div: KundliChartType.chalit, transit_date: today, year }),
        getDivisionalChartTh({ ...updatedRequest, div: KundliChartType.sun, transit_date: today, year }),
        getDivisionalChartTh({ ...updatedRequest, div: KundliChartType.moon, transit_date: today, year }),

        getPlanetsDetailsTh(updatedRequest),
        getAshtakvargaTh(updatedRequest),


        getMahaDashaTh(updatedRequest),
        getCharDashaMainTh(updatedRequest),
        getYoginiDashaSubTh(updatedRequest),
        getCharDashaSubTh(updatedRequest),
        getAntarDashaTh(updatedRequest),

        getMahaDashaPredictionTh(updatedRequest),
        getMangalDoshTh(updatedRequest),
        getKaalsarpDoshTh(updatedRequest),
        getMangalikDoshTh(updatedRequest),
        getPitraDoshTh(updatedRequest),

        getShadbalaTh(updatedRequest),
        getFriendShipTh(updatedRequest),
        getSadeSatiTh(updatedRequest),
      ]);

      // ✅ Handle results
      if (panchangRes?.code === Codes.SUCCESS) handleSuccess("panchangeDetails", panchangRes.data);
      if (rashiLagnaChart?.code === Codes.SUCCESS) handleSuccess("rashiLagnaChart", rashiLagnaChart.data?.response);
      if (navamsaChart?.code === Codes.SUCCESS) handleSuccess("navamsaChart", navamsaChart.data?.response);
      if (chalitChart?.code === Codes.SUCCESS) handleSuccess("chalitChart", chalitChart.data?.response);
      if (sunChart?.code === Codes.SUCCESS) handleSuccess("sunChart", sunChart.data?.response);
      if (moonChart?.code === Codes.SUCCESS) handleSuccess("moonChart", moonChart.data?.response);
      if (planetRes?.code === Codes.SUCCESS) handleSuccess("planetDetails", planetRes.data?.response);
      if (ashtakvarga?.code === Codes.SUCCESS) handleSuccess("ashtakvarga", ashtakvarga.data?.response);
      if (mahaDasha?.code === Codes.SUCCESS) handleSuccess("mahaDasha", mahaDasha.data?.response);
      if (charDashaMain?.code === Codes.SUCCESS) handleSuccess("charDashaMain", charDashaMain.data?.response);
      if (yoginiDashaSub?.code === Codes.SUCCESS) handleSuccess("yoginiDashaSub", yoginiDashaSub.data?.response);
      if (charDashaSub?.code === Codes.SUCCESS) handleSuccess("charDashaSub", charDashaSub.data?.response);
      if (antarDasha?.code === Codes.SUCCESS) handleSuccess("antarDasha", antarDasha.data?.response);
      if (mahaDashaPrediction?.code === Codes.SUCCESS) handleSuccess("mahaDashaPrediction", mahaDashaPrediction.data?.response);
      if (getMangalDosh?.code === Codes.SUCCESS) handleSuccess("mangalDosh", getMangalDosh.data?.response);
      if (getKaalsarpDosh?.code === Codes.SUCCESS) handleSuccess("KaalsarpDosh", getKaalsarpDosh.data?.response);
      if (getMangalikDosh?.code === Codes.SUCCESS) handleSuccess("mangalikDosh", getMangalikDosh.data?.response);
      if (getPitraDosh?.code === Codes.SUCCESS) handleSuccess("pitraDosh", getPitraDosh.data?.response);
      if (shadBala?.code === Codes.SUCCESS) handleSuccess("shadBala", shadBala.data?.response);
      if (friendShip?.code === Codes.SUCCESS) handleSuccess("friendShip", friendShip.data?.response);
      if (sadeSati?.code === Codes.SUCCESS) handleSuccess("sadeSati", sadeSati.data?.response);

      // if (remedies?.code === Codes.SUCCESS) handleSuccess("remedies", remedies.data);
      // ⚡ Prediction calls already in parallel as you wrote:

      const [remedies, kundliPredicationDaily, kundliPredicationMonthly, kundliPredicationLife] = await Promise.all([
        getRemedies({ ...updatedRequest, place: data?.bop, type: "", nakshatra: "", name: data?.u_name }),
        kundliPredication({ ...updatedRequest, name: data?.u_name, type: "daily" }),
        kundliPredication({ ...updatedRequest, name: data?.u_name, type: "monthly" }),
        kundliPredication({ ...updatedRequest, name: data?.u_name, type: "life" }),
      ]);

      if (remedies?.code === Codes.SUCCESS) handleSuccess("remedies", remedies.data);
      setPredicationApi({
        kundliPredication: {
          daily: kundliPredicationDaily?.code === Codes.SUCCESS ? kundliPredicationDaily?.data || "" : "",
          monthly: kundliPredicationMonthly?.code === Codes.SUCCESS ? kundliPredicationMonthly?.data || "" : "",
          life: kundliPredicationLife?.code === Codes.SUCCESS ? kundliPredicationLife?.data || "" : "",
        },
      });
    }
    catch (err) {
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

      if (KundliItem?.panchangeDetails?.request) {
        kundliDetailsApiCalling(KundliItem?.panchangeDetails?.request)
      }

      hasCalledApi.current = true
      const timer = setTimeout(() => {
        closeLoder(dispatch)
      }, 100)
      // ✅ Clean up timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [kundliDetailsData, KundliItem, LocalLanguage]);

  useEffect(() => {
    if (hasCalledApi.current === true && KundliItem?.panchangeDetails?.request?.lang !== LocalLanguage) {
      hasCalledApi.current = false
    }
  }, [LocalLanguage]);

  const tabRefs = useRef({}); // Store references to all tabs

  useEffect(() => {
    // Auto scroll active tab into view
    const activeTab = tabRefs.current[activeKey];
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeKey]); // Trigger scroll when activeKey changes

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "freeKundli_details" && (<Suspense fallback={<></>}>
        <Loader /></Suspense>
      )}
      <Suspense fallback={<></>}>
        <CommonBanner
          text={t(currentTab?.bannerText) || ""}
          highlight={currentTab?.bannerHighlight || ""}
        />
      </Suspense>
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
                  ref={(el) => (tabRefs.current[item.key] = el)} // Attach ref
                  className={`min-w-max cursor-pointer custom-tab ${isActive ? "active" : ""}
              ${isFirst ? "rounded-l-full" : ""} ${isLast ? "rounded-r-full" : ""} ${item.highlightClass}`}
                  onClick={() => {
                    setActiveKey(item.key);
                    navigate(`${getBasePath(PATHS.FREEKUNDALI_DETAILS)}/${item.key}`);
                  }}
                >
                  {t(`${item.key}`)}
                  {item.highlightClass === 'highlight_Tab' && (
                    <span className="absolute -top-2 -right-2 text-[10px] bg-gradient-to-r from-[#c32853] to-[#ee7e49] text-white px-2 py-[1px] rounded-full font-semibold shadow-sm">
                      NEW
                    </span>
                  )}
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
        <Suspense fallback={<></>}>
          {tabConfigWithProps?.map((tab) => (
            <div
              key={tab.key}
              style={{ display: activeKey === tab.key ? "block" : "none" }}
            >
              {tab.element}
            </div>
          ))}
        </Suspense>
      </div>

      <section className="padding100 px-[15px] md:px-[0]">
        <div className="KundliReportBg container mx-auto  rounded-[10px] ">
          <Suspense fallback={<></>}>
            <NewKundaliReport />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default memo(CustomTabs);
