import React, { useCallback, useEffect, useState, } from "react";
import { useLocation, useParams } from "react-router";
import "../../assets/css/Kundli.css";
// import freeKundali from "../../assets/img/banner/kundaliMatchingBanner.webp";
import CommonBanner from "../../component/CommonBanner";
import AshtakootTable from "../../component/kundali/AshtakootTable ";
import CompatibilityScoreCard from "../../component/kundali/CompatibilityScoreCard";
import DoshaCard from "../../component/kundali/DoshaCard";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import KundaliDetails from "../../component/kundali/KundaliDetails";
import KundliReport from "../../component/kundali/KundliReport";
import '../../assets/css/Kundli.css'
import { useTranslation } from "react-i18next";


function KundaliMatchingReport() {
  const location = useLocation();
  const { t } = useTranslation();

  const navigationData = location.state?.navigationData;
  const fetchKundliMatchReport = useCallback(async () => {
    try {

    } catch (error) {
      console.error("Error fetching kundli match list:", error);
    }
  }, []);

  useEffect(() => {
    fetchKundliMatchReport();
  }, [fetchKundliMatchReport]);

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

export default KundaliMatchingReport;
