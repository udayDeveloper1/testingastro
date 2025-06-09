import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importing translation files

import translationEN from "./locals/en.json";
import translationHIN from "./locals/hin.json";
import translationGU from "./locals/gu.json";

import { Constatnt } from "./utils/Constent";

//Creating object with the variables of imported translation files
const resources = {
  en: {
    translation: translationEN,
  },
  hi: {
    translation: translationHIN,
  },
  gu: {
    translation: translationGU
  }
};

//i18N Initialization

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('ASTRO_language') || "en", //default language
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;