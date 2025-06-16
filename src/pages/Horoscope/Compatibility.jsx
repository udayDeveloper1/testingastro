import  { lazy, memo, Suspense, useMemo } from "react";
// import yearlyHoroscope from "../../assets/img/banner/yearlyHoroscope.webp";
import { useTranslation } from "react-i18next";
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));

const Compatibility = () => {
  // Memoize the content array to avoid recreating it on every render
    const { t } = useTranslation()


  return (
    <>
      <section>
        <CommonBanner 
        // backgroundImage={yearlyHoroscope}
         highlight="Compatibility" />
      </section>
 <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <div className="container mx-auto padding50 flex flex-col gap-5">
          <CommonQuestionComp heading="Check your love compatibility" content={t('astro_para', {returnObjects: true})} />
        </div>
      </section>

      <section>
        <div className="container mx-auto padding50 flex flex-col gap-5">
          <HoroscopeGrid heading={t('Choose_Your_Sign')} smallText="" type="" />
        </div>
      </section>
      </Suspense>
    </>
  );
};

export default memo(Compatibility);
