import moment from "moment";
import React, { lazy, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
// import { PATHS } from "../../routers/Paths";
import { useNavigate } from "react-router";
import sunrise from "../../assets/img/panchang/sunrise.svg"
import moon from "../../assets/img/panchang/moon.svg"
import { useTranslation } from "react-i18next";
import { UpdatedPaths } from "../../routers/Paths";

const DayPanchangButton = lazy(() => import("./HomepageTodayPanchang/DayPanchangButton"));
const LocationCard = lazy(() => import("./HomepageTodayPanchang/LocationCard"));
const PanchangDetails = lazy(() => import("./HomepageTodayPanchang/PanchangDetails"));
const RiseCard = lazy(() => import("./HomepageTodayPanchang/RiseCard"));

const TodaysPanchangHomePage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const PATHS = UpdatedPaths()

  const panchangDetailsData = useSelector(state => state.masterSlice?.panchangDetails)

  const panchangDetails = useMemo(
    () => [
      { label: t('Tithi'), value: panchangDetailsData?.response?.tithi?.name },
      { label: t('Nakshatra'), value: panchangDetailsData?.response?.nakshatra?.name },
      { label: t('Yoga'), value: panchangDetailsData?.response?.yoga?.name },
      { label: t('First_Karana'), value: panchangDetailsData?.response?.karana?.name },
      { label: t('Paksha'), value: panchangDetailsData?.response?.advanced_details?.masa?.paksha },
      { label: t('Vaar'), value: panchangDetailsData?.response?.advanced_details?.vaara },
      { label: t('Rahu_Kalam'), value: panchangDetailsData?.response?.nakshatra?.name },
    ],
    [panchangDetailsData]
  );

  const handlePanchangClick = useCallback(() => {
    navigate(PATHS?.TODAYS_PANCHANGAM)
  }, []);

  return (
    <div className=" rounded-[10px] w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 items-start" >
      {/* Left Panel */}
      <div className="flex flex-col justify-between h-full gap-[20px]">
        {/* Heading */}

        <div>
          <h2 className="text-center md:text-start commonHeadingH2 mb-0">
            {t("Today's")}  <span className="commonheadingSpan"> {t('Panchang')}</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-[20px]">
          <div className="grid grid-cols-2 gap-4">

            <div className="col-span-2">
              <LocationCard location={panchangDetailsData?.request?.bop} />
            </div>

            <div className="col-span-1">
              <RiseCard
                iconClass="bx bx-sun"
                title={t('Sunrise')}
                time={panchangDetailsData?.response?.advanced_details?.sun_rise}
                image={sunrise}
              />
            </div>

            {/* Moonrise */}
            <div className="col-span-1">
              <RiseCard
                iconClass="bx bx-moon"
                title={t('Moonrise')}
                time={panchangDetailsData?.response?.advanced_details?.moon_rise}
                image={moon}
              />
            </div>
          </div>

          {/* Button */}
          <div className="w-full">
            <DayPanchangButton
              onClick={handlePanchangClick}
            />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <PanchangDetails
        date={moment().format("MMMM DD, YYYY")}
        details={panchangDetails}
      />
    </div>

  );
};

export default React.memo(TodaysPanchangHomePage);
