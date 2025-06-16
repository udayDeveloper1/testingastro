import { lazy, memo, Suspense } from "react";
import { useTranslation } from "react-i18next";
// import comingSoonBanner from "../../assets/img/banner/comingSoon.webp";
import CommonBanner from "../../component/CommonBanner";
import { useLocation } from "react-router";
import {  UpdatedPaths } from "../../routers/Paths";
import { useState, useEffect } from "react";
import { Constatnt } from "../../utils/Constent";
function ComingSoon() {
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const location = useLocation();
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
const PATHS =UpdatedPaths();
  useEffect(() => {
    switch (location?.pathname) {
      case PATHS?.ASTRO_MALL:
        setText(t("astro_mall"));
        break;
         case PATHS?.BOOK_POOJA_LIST:
        setText(t("book_a_pooja"));
        break;

      default:
        // setText(t("coming_soon"));
        break;
    }
  }, [location?.pathname, LocalLanguage,t]); // re-run when pathname or translation changes

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={comingSoonBanner}
          text={text}
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
                {t("working_on_amazing")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(ComingSoon)
