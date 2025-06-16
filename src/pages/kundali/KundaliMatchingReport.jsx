import { lazy, memo, useCallback, useEffect, useRef, useState, } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../assets/css/Kundli.css";
// import freeKundali from "../../assets/img/banner/kundaliMatchingBanner.webp";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import '../../assets/css/Kundli.css';
import CommonBanner from "../../component/CommonBanner";
import { UpdatedPaths } from "../../routers/Paths";
import { addKundliMetching } from "../../services/api/api.services";
import { closeLoder, formatTime, hasAtLeastOneResponseData, TOAST_ERROR } from "../../utils/CommonFunction";
import { Codes, LanguageOption, TimeFormat } from "../../utils/CommonVariable";
import { Constatnt } from "../../utils/Constent";
import AshtakootTable from "../../component/kundali/AshtakootTable ";

const CompatibilityScoreCard = lazy(() => import("../../component/kundali/CompatibilityScoreCard"));
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));
const KundaliDetails = lazy(() => import("../../component/kundali/KundaliDetails"));
const KundliReport = lazy(() => import("../../component/kundali/KundliReport"));


function KundaliMatchingReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const PATHS = UpdatedPaths()

  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH

  // const navigationData = location.state?.navigationData;
  const [navigationData, setNavigationData] = useState(location.state?.navigationData)

  const fetchKundliMatchReport = useCallback(async () => {
    try {
      let request = {
        female: {
          // dob: `${value[InputTypesEnum?.DAY_2]}/${moment(value[InputTypesEnum?.MONTH_2], 'MMM').format('MM')}/${value[InputTypesEnum?.YEAR_2]}`,
          dob: navigationData?.female?.dob,
          tob: formatTime(navigationData?.male?.time_of_birth, TimeFormat?.TIME_24_HOUR_FORMAT), //navigationData?.female?.time_of_birth,
          tz: navigationData?.female?.details?.timezone,
          lat: navigationData?.female?.details?.latitude,
          lon: navigationData?.female?.details?.longitude,
          tzone: navigationData?.female?.details?.tzone,
          bop: navigationData?.female?.place_of_birth,
          gender: 'female',
          u_name: navigationData?.female?.name
        },
        male: {
          dob: navigationData?.male?.dob,
          tob: formatTime(navigationData?.male?.time_of_birth, TimeFormat?.TIME_24_HOUR_FORMAT), //navigationData?.male?.time_of_birth,
          tz: navigationData?.male?.details?.timezone,
          lat: navigationData?.male?.details?.latitude,
          lon: navigationData?.male?.details?.longitude,
          tzone: navigationData?.male?.details?.tzone,
          bop: navigationData?.male?.place_of_birth,
          gender: 'male',
          u_name: navigationData?.male?.name
        },
        lang: LocalLanguage
      }
      const request_2 = {
        male: {
          name: navigationData?.female?.name,
          // dob: `${value[InputTypesEnum?.YEAR]}-${moment( value[InputTypesEnum?.MONTH], 'MMM' ).format('MM')}-${value[InputTypesEnum?.DAY]}`,
          dob: navigationData?.female?.dob,
          // time_of_birth: formatTime(`${value?.[InputTypesEnum?.HOURS]}:${value?.[InputTypesEnum?.MINUTE]}:${value?.[InputTypesEnum?.SECOND]}`, TimeFormat?.TIME_WITH_SECONDS_12_HOUR_FORMAT),
          time_of_birth: formatTime(navigationData?.male?.time_of_birth, TimeFormat?.TIME_24_HOUR_FORMAT),
          place_of_birth: navigationData?.male?.place_of_birth,
          details: {
            year: navigationData?.male?.details?.year,
            month: navigationData?.male?.details?.month,
            date: navigationData?.male?.details?.date,
            hours: navigationData?.male?.details?.hours,
            minutes: navigationData?.male?.details?.minutes,
            seconds: navigationData?.male?.details?.seconds,
            latitude: navigationData?.male?.details?.latitude,
            longitude: navigationData?.male?.details?.longitude,
            timezone: navigationData?.male?.details?.timezone,
            tzone: navigationData?.male?.details?.tzone
          }
        },
        female: {
          name: navigationData?.female?.name,
          // dob: `${value[InputTypesEnum?.YEAR_2]}-${moment( value[InputTypesEnum?.MONTH_2], 'MMM' ).format('MM')}-${value[InputTypesEnum?.DAY_2]}`,
          dob: navigationData?.female?.dob,
          // time_of_birth: formatTime( `${value?.[InputTypesEnum?.HOURS_2]}:${value?.[InputTypesEnum?.MINUTE_2] }:${value?.[InputTypesEnum?.SECOND_2]}`, TimeFormat?.TIME_WITH_SECONDS_12_HOUR_FORMAT ),
          time_of_birth: formatTime(navigationData?.female?.time_of_birth, TimeFormat?.TIME_24_HOUR_FORMAT),
          place_of_birth: navigationData?.female?.place_of_birth,
          details: {
            year: navigationData?.female?.details?.year,
            month: navigationData?.female?.details?.month,
            date: navigationData?.female?.details?.date,
            hours: navigationData?.female?.details?.hours,
            minutes: navigationData?.female?.details?.minutes,
            seconds: navigationData?.female?.details?.seconds,
            latitude: navigationData?.female?.details?.latitude,
            longitude: navigationData?.female?.details?.longitude,
            timezone: navigationData?.female?.details?.timezone,
            tzone: navigationData?.female?.details?.tzone
          }
        }
      }
      addKundliMetching(request).then(response => {
        if (response?.code === Codes?.SUCCESS) {
          // const navigationData = { ...response?.data }
          const navigationData = {
            ...request_2,
            ...response?.data
          }
          // kundlimatchingRedirection(
          //   navigate,
          //   response?.data?.response?._id,
          //   navigationData,
          //   PATHS?.KUNDALI_MATCHING_REPORT
          // )
          setNavigationData(navigationData)

          // TOAST_SUCCESS(response?.message)
          // closeLoder(dispatch)
        } else {
          TOAST_ERROR(response?.message)
          closeLoder(dispatch)
        }
      })
    } catch (error) {
      console.error("Error fetching kundli match list:", error);
    }
  }, [t]);

  const hasCalledApi = useRef(false);
  useEffect(() => {
    if (navigationData?.request?.lang !== LocalLanguage) {
      if (hasAtLeastOneResponseData(navigationData)) {
        // if (!hasCalledApi.current) {
        fetchKundliMatchReport();
        // hasCalledApi.current = true;
        // }
      } else {
        navigate(PATHS?.KUNDALI_MATCHING);
      }
    }
  }, [t]);


  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={freeKundali}
          text={t('kundali_matching_report')}
        // highlight="Matching Report "
        />
      </section>

      <section className="paddingTop50">
        <div className="container mx-auto">
          <div className="grid gap-10">
            <div className="grid grid-cols-1  justify-items-center items-center gap-5 md:gap-10">
              {/* <h3 className="kundaliMatchingPageHEading text-center mb-0">
                Kundli Matching Report
              </h3> */}

              {/* Grid layout for names and rings */}
              <div className="paddingBottom50 w-full">
                <CompatibilityScoreCard
                  score={navigationData?.response?.score}
                  boyName={navigationData?.male?.name}
                  girlName={navigationData?.female?.name}
                />
              </div>
            </div>

            <div>
              <KundaliDetails kundaliData={navigationData} />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="planBackground padding50">
        <div className="container mx-auto   ">
          <DoshaCard />
        </div>
      </section> */}

      <section className="padding50">
        <div className="container mx-auto">
          <AshtakootTable AshtakootData={navigationData?.response} />
        </div>
      </section>
      <section className="KundliReportBg padding50 ">
        <div className="container mx-auto ">
          <KundliReport />
        </div>
      </section>

      <section className=" padding50">
        <div className="container mx-auto   ">
          <HoroscopeGrid />
        </div>
      </section>


    </>
  );
}

export default memo(KundaliMatchingReport);
