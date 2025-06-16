// import React from "react";
import { useTranslation } from "react-i18next";
import "../../assets/css/kundli/KundliParts.css";
// import KundaliAstavarga from "../../assets/img/banner/KundaliAstavarga.webp";
import { lazy, memo } from "react";
import northIndianKundliImg from "../../assets/img/kundali/northIndianKundliSample.webp";
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));
const KundliReport = lazy(() => import("../../component/kundali/KundliReport"));
const KundliStepper = lazy(() => import("../../component/kundali/KundliStepper"));

const FreeKundliKundliDetailsAshtakvarga = () => {
  const { t } = useTranslation()
  let contentForP1 = [
    "Ashtakvarga is used to assess the strength and patterns that are present in a birth chart. The Ashtakvarga or Ashtakavarga is a numerical quantification or score of each planet placed in the chart with reference to the other 7 planets and the Lagna. In Sarva Ashtaka Varga the total scores of all the BAVs are overlaid and then totalled. This makes the SAV of the chart. The total of all the scores should be 337.",
  ];

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={KundaliAstavarga}
          text=""
          highlight="Kundli Details"
        />

        <KundliStepper />
      </section>

      <section className=" ">
        <div className="container mx-auto  flex flex-col gap-10">
          <CommonQuestionComp
            heading="Ashtakvarga Chart"
            content={contentForP1}
          />
        </div>
      </section>

      <section>
        <div className="container padding50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px]">
            <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
              <h3 className="font-bold text-[18px] leading-[100%] pb-5">
                Chalit
              </h3>
              <img
                src={northIndianKundliImg}
                alt="northIndianKundli"
                className="block w-full"
              />
            </div>
            <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
              <h3 className="font-bold text-[18px] leading-[100%] pb-5">
                Chalit
              </h3>
              <img
                src={northIndianKundliImg}
                alt="northIndianKundli"
                className="block w-full"
              />
            </div>
            <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
              <h3 className="font-bold text-[18px] leading-[100%] pb-5">
                Chalit
              </h3>
              <img
                src={northIndianKundliImg}
                alt="northIndianKundli"
                className="block w-full"
              />
            </div>
            <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
              <h3 className="font-bold text-[18px] leading-[100%] pb-5">
                Chalit
              </h3>
              <img
                src={northIndianKundliImg}
                alt="northIndianKundli"
                className="block w-full"
              />
            </div>
            <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
              <h3 className="font-bold text-[18px] leading-[100%] pb-5">
                Chalit
              </h3>
              <img
                src={northIndianKundliImg}
                alt="northIndianKundli"
                className="block w-full"
              />
            </div>
            <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
              <h3 className="font-bold text-[18px] leading-[100%] pb-5">
                Chalit
              </h3>
              <img
                src={northIndianKundliImg}
                alt="northIndianKundli"
                className="block w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" padding50 ">
        <div className="KundliReportBg">
          <div className="container mx-auto   ">
            <KundliReport />
          </div>
        </div>
      </section>

      <section>
        <div className="container padding50">
          <HoroscopeGrid heading={t('Choose_Your_Sign')} smallText="" type={''} />
        </div>
      </section>

      <div className="paddingBottom50"></div>
    </>
  );
};

export default memo(FreeKundliKundliDetailsAshtakvarga);
