import aboutUs from "../../assets/img/about/aboutUs.svg";
import halflogoleft from "../../assets/img/about/halflogoleft.svg";
import halflogoright from "../../assets/img/about/halflogoright.svg";
import letsstartRight from "../../assets/img/about/letsstartRight.svg";


import { useTranslation } from "react-i18next";
import "../../assets/css/aboutus.css";
import { PATHS } from "../../routers/Paths";
import { navigate } from "../../utils/navigations/NavigationService";
import { lazy, memo } from "react";

const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const MissionVisionSection = lazy(() => import("../../component/about/MissionVisionSection"));
const CustomButton = lazy(() => import("../../component/Homepage/CustomButton"));
const HomeFAQs = lazy(() => import("../../component/Homepage/HomeFAQs"));

function Aboutus() {
  const { t } = useTranslation()

  return (
    <>
      <section>
        <CommonBanner text={t("about_us")} highlight="" />
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 container padding100 gap-y-[40px] md:gap-x-[0px] md:gap-x-[40px]">
          <div>
            <div className="flex justify-center">
              <img src={aboutUs} alt="Astrologer guiding the stars" />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center gap-y-[20px] lg:gap-[40px]">
              <h2 className="newBannerH2 leading-[130%]">
                {t("Trusted_Astrology")}
              </h2>
              <p className="commonQuesP">
                {t('Astrology_more_then')} <strong>{t('chat_my_astrologer')}</strong>, {t('we_combine')}
                <br /><br />
                {t('Whether_you')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="commonLightBack overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 container py-[40px] md:py-[130px] gap-y-[30px] md:gap-y-[40px] md:gap-x-[0px] md:gap-x-[40px] items-center">
          <div className="flex flex-col gap-[20px] md:gap-[50px] order-2 md:order-1 relative z-1">
            <div className="flex flex-col justify-center gap-y-[10px] lg:gap-[40px]">
              <h2 className="newBannerH2 leading-[100%]">
                {t('why_choose')}
              </h2>
              <p className="commonQuesP">
                {t('Astrology_has')}
                <br /><br />
                {t('at')} <strong>{t('chat_my_astrologer')}</strong>, {t('we_honor_these')}
                <br /><br />
                ✨ <em>{t('Empower_journey')}</em>
              </p>
            </div>
            <div>
              <CustomButton
                parentClassName="max-w-max min-w-[222px]"
                className="px-2 py-3"
                onClick={() => { navigate(PATHS?.CONTACT_US) }}
              >
                {t('contact_us_about')}
              </CustomButton>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="startBackground flex justify-center">
              <img src={letsstartRight} alt="Digital astrology experience" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="absolute left-0 top-[30px]">
          <img src={halflogoleft} alt="Decorative half logo left" />
        </div>
        <div className="absolute right-0 bottom-[30px]">
          <img src={halflogoright} alt="Decorative half logo right" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 container mx-auto padding100">
          <MissionVisionSection />
        </div>
      </section>

      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('about_us')}
        subHeading={''}
      />
    </>
  );

}

export default memo(Aboutus);
