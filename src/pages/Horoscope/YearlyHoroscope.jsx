import React, { Suspense, lazy } from "react";
import { useTranslation } from "react-i18next";

const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));

// For images, React doesn't support lazy import natively like components,
// but you can dynamically import it or use a placeholder with lazy-loading <img> in HTML.

// Let's dynamically import the image as well:
// const importYearlyHoroscope = () => import("../../assets/img/banner/yearlyHoroscope.webp");



function YearlyHoroscope() {
  const [yearlyHoroscope, setYearlyHoroscope] = React.useState(null);
  const { t } = useTranslation()
  const content = t('horoscope_2025_content', { returnObjects: true });
  // React.useEffect(() => {
  //   importYearlyHoroscope().then((img) => setYearlyHoroscope(img.default));
  // }, []);

  return (
    <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        
        {yearlyHoroscope && (
          <CommonBanner
            // backgroundImage={yearlyHoroscope}
            text=""
            highlight={t('horoscopes')}
          />
        )}
      </section>

      <section className="container mx-auto py-12 flex flex-col gap-8">

        {/* <header className="text-center md:text-left">
          <h2 className="commonHeadingH2 mb-4">
            <span className="commonheadingSpan">Yearly Horoscope 2025</span>
          </h2>
          <p className="commonQuesP">Predictions for all zodiac signs</p>
        </header> */}

        <HoroscopeGrid heading={t('Choose_Your_Sign')} type="yearly" />
      </section>

      <section className="container mx-auto py-12 commonPadMarBottomClass">
        <CommonQuestionComp
          heading={t('Horoscope_2025_predictions_for_all_zodiac_signs')}
          content={content}
        />
      </section>
    </Suspense>
  );
}

export default React.memo(YearlyHoroscope);
