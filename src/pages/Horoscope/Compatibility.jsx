import React, { memo, useMemo } from "react";
// import yearlyHoroscope from "../../assets/img/banner/yearlyHoroscope.webp";
import CommonBanner from "../../component/CommonBanner";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import { useTranslation } from "react-i18next";

const Compatibility = () => {
  // Memoize the content array to avoid recreating it on every render
    const { t } = useTranslation()
  const content = useMemo(
    () => [
      `You don't always get along like a blaze on flames with people, but when you're with that "special person," you feel happy and in control of the situation. We encounter numerous people throughout life. One person would be your life partner out of all those who may be terrific friends or mentors for you. You must make the appropriate choice for that person. They must make you feel at home, never depressed or too uncared for.`,
      "Do you believe your heart might have jumped a beat if you had met that particular someone? If so, find out what your Sun sign conspires to have you do by checking your zodiac sign love compatibility.",
      "Zodiac sign compatibility reveals more than just compatibility in romantic relationships. You can also find information on your partner's and your own zodiac love and sexual compatibility. This can ensure a long-lasting relationship with shared understanding while also assisting you in learning further about your mate and your bond.",
      "Love compatibility can also forecast how your relationship will develop in the future, in addition to letting you know how things stand right now. Moreover, it reveals the strength of your current bond, what makes it successful, and if you and your loved one are about to experience harmony or conflict in the future. Hence, you may determine whether your connection is likely to progress in the ways you want by simply entering the appropriate zodiac sign. Kudos if your sign and your partner's sign align! Seamless times are predictable in advance.",
    ],
    [] 
  );

  return (
    <>
      <section>
        <CommonBanner 
        // backgroundImage={yearlyHoroscope}
         highlight="Compatibility" />
      </section>

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
    </>
  );
};

export default memo(Compatibility);
