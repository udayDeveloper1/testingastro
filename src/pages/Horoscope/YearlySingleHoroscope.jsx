import moment from "moment";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  Suspense,
} from "react";
import { useNavigate, useParams } from "react-router";
// import singleHoroscopeBanner from "../../assets/img/banner/singleHoroscopeBanner.webp";
import {
  getHoroscope,
  getWeeklyHoroscope,
  getYearlyHoroscope,
} from "../../services/api/api.services";
import { Codes, LanguageOption } from "../../utils/CommonVariable";
import { horoscopeTab } from "./HororScopVariable";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import AlsoCheckBanner from "../../component/AlsoCheckBanner";
import {
  allHoroScopeDetailsNavigation,
  allHoroScopeNavigation,
} from "../../utils/navigations/NavigationPage";
import { UpdatedPaths } from "../../routers/Paths";
import { useHoroscopeList } from "../hooks/useAllRashiInfo";

import love from "../../assets/img/newIcon/love.svg";
import career from "../../assets/img/newIcon/career.svg";
import education from "../../assets/img/newIcon/education.svg";
import finance from "../../assets/img/newIcon/finance.svg";
import health from "../../assets/img/newIcon/health.svg";
import life from "../../assets/img/newIcon/life.svg";
import travel from "../../assets/img/newIcon/travel.svg";
import family from "../../assets/img/newIcon/family.svg";
import physique from "../../assets/img/newIcon/physique.svg";
import friend from "../../assets/img/newIcon/friend.svg";
import friends from "../../assets/img/newIcon/friend.svg";

import { Constatnt } from "../../utils/Constent";

// Lazy loaded components
const CommonBanner = React.lazy(() => import("../../component/CommonBanner"));
const CommonQuestionComp = React.lazy(() =>
  import("../../component/CommonQuestionComp")
);
const HomeFAQs = React.lazy(() => import("../../component/Homepage/HomeFAQs"));
const CircularCharts = React.lazy(() =>
  import("../../component/Horoscope/CircularCharts")
);
const HoroscopeGrid = React.lazy(() =>
  import("../../component/kundali/HoroscopeGrid")
);
const HoroScopDetailBanner = React.lazy(() =>
  import("../../component/Horoscope/HoroScopDetailBanner")
);
const LuckyInfoCard = React.lazy(() =>
  import("../../component/Horoscope/LuckyInfoCard ")
);

// Moved static content outside the component
function YearlySingleHoroscope() {
  const { id, type, name } = useParams();
  const [signname, setSignName] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const PATHS = UpdatedPaths();
  const horoscopeList = useHoroscopeList();

  useEffect(() => {
    setSignName(name);
  }, [name])

  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH

  const [horoScopDetails, setHoroScopDetails] = useState({});
  const [horoScopDescription, setHoroScopDescription] = useState({});
  const [activeTab, setActiveTab] = useState(type);

  // Memoized current date and year
  const currentDate = useMemo(() => moment().format("DD/MM/YYYY"), []);
  const currentYear = useMemo(() => moment().format("YYYY"), []);

  // Memoized zodiac sign
  const zodiacSign = useMemo(
    () => horoscopeList.find((item) => item?.name === name)?.id,
    [name]
  );

  // Memoized horoscope tab label
  const horoscopeTabLabel = useMemo(
    () => horoscopeTab.find((item) => item?.type === type)?.label,
    [type]
  );

  const zodiacSignName = useMemo(
    () => horoscopeList.find((item) => item?.name === name)?.key,
    [name]
  );



  const iconMap = {
    Love: love,
    Career: career,
    Education: education,
    Money: finance,
    Health: health,
    Helth: health, // fallback for typo case
    Life: life,
    Travel: travel,
    Family: family,
    Friend: friend || friends,
    Physique: physique,
    "": "", // Fallback for empty label
  };

  // Function to get date by type
  const getDateByType = useCallback((type) => {
    switch (type) {
      case "daily-horoscope":
        return moment().format("DD/MM/YYYY");
      case "tomorrow-horoscope":
        return moment().add(1, "day").format("DD/MM/YYYY");
      case "yesterday-horoscope":
        return moment().subtract(1, "day").format("DD/MM/YYYY");
      case "weekly-horoscope":
        return moment().startOf("week").format("DD/MM/YYYY");
      case "yearly-horoscope":
        return moment().startOf("year").format("DD/MM/YYYY");
      default:
        return moment().format("DD/MM/YYYY");
    }
  }, []);

  // Fetch horoscope data
  useEffect(() => {
    if (!name || !horoscopeList?.length || !zodiacSign) return;

    const fetchData = async () => {
      try {
        let response;

        if (type === "weekly-horoscope") {
          response = await getWeeklyHoroscope({
            zodiac: zodiacSign,
            lang: LocalLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
          });
        } else if (type === "yearly-horoscope") {
          response = await getYearlyHoroscope({
            zodiac: zodiacSign,
            lang: LocalLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
            year: currentYear,
          });
        } else {
          response = await getHoroscope({
            zodiac: zodiacSign,
            lang: LocalLanguage ?? localStorage.getItem(Constatnt?.LANGUAGE_KEY),
            date: getDateByType(type),
          });
        }

        if (response?.code === Codes?.SUCCESS) {
          setHoroScopDetails(response?.data?.response);
          if (type === "yearly-horoscope" && response?.data?.response) {
            const firstItem = Object.values(response.data.response)[0];
            if (firstItem) {
              setActiveTab(firstItem?.period);
              setHoroScopDescription(firstItem);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching horoscope data:", error);
      }
    };
    fetchData();
  }, [name, type, zodiacSign, currentYear, getDateByType, LocalLanguage]);

  // Handle tab change for yearly horoscope
  const handleTabChange = useCallback((data) => {
    setActiveTab(data?.period);
    setHoroScopDescription(data);
  }, []);

  const DEFAULT_CONTENT = {
    overview: [],

    love: [
      {
        key: t('love'),
        label: "Love",
        pTag: horoScopDetails?.bot_response?.relationship?.split_response || "-",
      },
      {
        key: t('career'),
        label: "Career",
        pTag: horoScopDetails?.bot_response?.career?.split_response || "-",
      },
      {
        key: t('money'),
        label: "Money",
        pTag: horoScopDetails?.bot_response?.finances?.split_response || "-",
      },
      {
        key: t('helth'),
        label: "Helth",
        pTag: horoScopDetails?.bot_response?.health?.split_response || "-",
      },
      {
        key: t('travel'),
        label: "Travel",
        pTag: horoScopDetails?.bot_response?.travel?.split_response || "-",
      },
      {
        key: t('friend'),

        label: "Friend",
        pTag: horoScopDetails?.bot_response?.friends?.split_response || "-",
      },
      {
        key: t('physique'),

        label: "Physique",
        pTag: horoScopDetails?.bot_response?.physique?.split_response || "-",
      },
      {
        label: "Family",
        pTag: horoScopDetails?.bot_response?.family?.split_response || "-",
        key: t('family'),
      },
    ],

    remedies: [
      "Unlock the potential of 2025 with astrologer-recommended remedies tailored for Aries. Stay patient and focused amidst life's distractions, avoiding the allure of shiny distractions and unnecessary attractions. Nurture spiritual strength by visiting Lord Hanuman's temple regularly, seeking his blessings for success in all aspects of life.",
      "Elevate your energy by wearing a Rudraksha, activated through the right mantras and rituals, paving the way for positivity and growth. Consider adorning the powerful Pearl (Moti) after consulting an astrologer, enhancing concentration and balance in the Aries journey. Additionally, donate black-colored items on Saturdays to appease Saturn and minimize delays in achieving desired results.",
      "Craft your cosmic destiny in 2025 with these astrological remedies, ensuring success and harmony in every facet of your life.",
    ],
  };

  const normalizeLabel = (label) => {
    const lower = label?.toLowerCase();
    switch (lower) {
      case "helth":
        return "Health";
      case "finance":
        return "Money";
      case "relationship":
        return "Love"; // Handle empty label case
      case "finances":
        return "Money"; // Handle empty label case
      case "friends":
        return "Friend"; // Handle empty label case
      default:
        return label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();
    }
  };

  const renderContentSection = (title, contentKey, apiKey) => {
    const content = type === "yearly-horoscope" ? [{ label: "", key: apiKey, pTag: horoScopDescription?.[apiKey]?.prediction }] : DEFAULT_CONTENT[contentKey];
    return (
      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-3 md:gap-5">
          <h2 className="commonQuesH2">{title}</h2>
          <div className="flex flex-col gap-3 horoscopeContent">
            {content?.map((paragraph, index) => {
              console.log("Paragraph:", paragraph);
              const normalizedLabel = normalizeLabel(paragraph?.key);
              const icon = iconMap[normalizedLabel];
              return (
                <div key={index} className="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-start justify-start" >
                  {icon && (
                    <div className="flex items-center justify-center w-[60px] h-[60px] min-h-[60px] min-w-[60px] commonLightBack rounded-full ">
                      <img
                        src={icon}
                        alt={normalizedLabel}
                        className="w-[36px] h-[36px] object-contain"
                      />
                    </div>
                  )}

                  <div>
                    {paragraph.label ? (
                      <div className="flex flex-col items-start gap-0">
                        <h2 className="rashiHeading">{normalizedLabel}</h2>
                        <p
                          className="commonQuesP"
                          dangerouslySetInnerHTML={{
                            __html: (paragraph.pTag || "").replace(
                              /\n/g,
                              "<br />"
                            ),
                          }}
                        />
                      </div>
                    ) : (
                      <p
                        className="commonQuesP"
                        dangerouslySetInnerHTML={{
                          __html: (paragraph.pTag || "").replace(
                            /\n/g,
                            "<br />"
                          ),
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  // -----------------------------------Also Chek Banner Logic  -----------------------------------------------------------------------

  const [active, setActive] = useState(type);
  const onTabChange = (data) => {
    setActive(data?.type);
    // setType(data?.type)
    // allHoroScopeNavigation(navigate, data?.type, PATHS?.ALL_HOROSCOPE)
    allHoroScopeDetailsNavigation(
      navigate,
      data?.type,
      name,
      zodiacSign,
      PATHS?.ALL_HOROSCOPE_DETAILS
    );
  };

  return (
    <>
      <section>
        <Suspense fallback={<div className="min-h-[100vh]"></div>}>
          <CommonBanner
            // backgroundImage={singleHoroscopeBanner}
            text=""
            highlight={zodiacSignName || null}
          />
        </Suspense>
      </section>

      <section>
        <div className="paddingTop50 container mx-auto  ">
          <AlsoCheckBanner active={active} onTabChange={onTabChange} />
        </div>
      </section>

      <section className="">
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">

          <Suspense fallback={<div></div>}>
            {type === "yearly-horoscope" ? (
              <HoroScopDetailBanner
                horoscopeListTab={horoScopDetails}
                active={activeTab}
                onTabChange={handleTabChange}
              />
            ) : (
              <div className="">
                <LuckyInfoCard horoScopDetails={horoScopDetails} />
              </div>
            )}
          </Suspense>
        </div>
      </section>

      {type == "yearly-horoscope" && (
        <section className="">
          <div className="container mx-auto paddingTop50 flex flex-col gap-5">
            <Suspense fallback={<></>}>
              <CommonQuestionComp
                heading={type === "yearly-horoscope" ? t('overview') : ""}
                content={
                  type === "yearly-horoscope"
                    ? [horoScopDescription?.prediction]
                    : [] //DEFAULT_CONTENT.overview
                }
              />
            </Suspense>

            <Suspense fallback={<></>}>
              <CircularCharts
                horoScopDetails={
                  type === "yearly-horoscope"
                    ? horoScopDescription
                    : horoScopDetails?.bot_response
                }
              />
            </Suspense>
          </div>
        </section>
      )}

      {type === "yearly-horoscope" ? (
        <>
          {renderContentSection(t('love'), "love", "relationship")}
          {renderContentSection(t('money'), "finance", "finances")}
          {renderContentSection(t('friend'), "health", "friends")}
          {renderContentSection(t('career'), "career", "career")}
          {renderContentSection(t('family'), "family", "family")}
          {renderContentSection(t('helth'), "health", "health")}
        </>
      ) : (
        renderContentSection("", "love", "relationship")
      )}

      <section>
        <div className="container mx-auto padding50 flex flex-col gap-5">
          <Suspense fallback={<></>}>
            <HoroscopeGrid
              heading={t("sign")}
              smallText={t("Choose_Your_Sign")}
              type={"yearly"}
              signNameForHighlight={signname}
            />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<></>}>
        <HomeFAQs
          text={t('FAQs')}
          highlightText={t('horoscope')}
          subHeading=""
        />
      </Suspense>
    </>
  );
}

export default YearlySingleHoroscope;
