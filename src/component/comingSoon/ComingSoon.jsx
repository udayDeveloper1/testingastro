import React from "react";
import { useTranslation } from "react-i18next";
// import comingSoonBanner from "../../assets/img/banner/comingSoon.webp";
import CommonHeadingSecond from "../../component/Astrologer/CommonHeadingSecond";
import CommonBanner from "../../component/CommonBanner";

function ComingSoon() {
  const { t } = useTranslation();
  
  const content = [
    "We're working hard to bring you something amazing. Stay tuned for updates!",
  ];

  return (
    <>
      <section>
        <CommonBanner 
          // backgroundImage={comingSoonBanner}
          text={t("coming_soon")} 
          highlight="" 
        />
      </section>


      <section>
        <div className="container mx-auto pb-20 flex flex-col gap-10">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold new_body_font mb-4">
                {t("coming_soon")} 
              </h2>
              <p className="text-lg md:text-xl new_body_font">
               {t('working_on_amazing')}
              </p>
            </div>
          </div>
        </div>
        </section>
        </>
  )
}

export default ComingSoon