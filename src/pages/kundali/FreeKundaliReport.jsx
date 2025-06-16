import { lazy, memo, useState } from "react";
import { useTranslation } from "react-i18next";
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const Kalpasara = lazy(() => import("../../component/kundali/FreeKundaliReport/Dosha/Kalpasara"));
const Manglik = lazy(() => import("../../component/kundali/FreeKundaliReport/Dosha/Manglik"));
const Sadesati = lazy(() => import("../../component/kundali/FreeKundaliReport/Dosha/Sadesati"));
const GeneralTabFreeKundali = lazy(() => import("../../component/kundali/FreeKundaliReport/General/GeneralTabFreeKundali"));
const LifeStone = lazy(() => import("../../component/kundali/FreeKundaliReport/Remedies/LifeStone"));
const Rudraksha = lazy(() => import("../../component/kundali/FreeKundaliReport/Remedies/Rudraksha"));
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));
const KundliReport = lazy(() => import("../../component/kundali/KundliReport"));
const KundliStepper = lazy(() => import("../../component/kundali/KundliStepper"));
const TabNavigation = lazy(() => import("../../component/kundali/TabNavigation"));
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'));

function FreeKundaliReport() {
  const [active, setActive] = useState("0");
  const [activeSubTab, setActiveSubTab] = useState("1");
  const { t } = useTranslation()
  const sections = [
    {
      title: "Description",
      content: [
        "Ascendant is one of the most sought concepts in astrology when it comes to predicting the minute events in your life. At the time of birth, the sign that rises in the sky is the person's ascendant. It helps in making predictions about the minute events, unlike your Moon or Sun sign that help in making weekly, monthly or yearly predictions for you.",
        "Your ascendant is Virgo",
      ],
    },
    {
      title: "Personality",
      content: [
        "Those born with the Virgo ascendant are really polite and reserved individuals. They don't react much, even when situations seem to be going out of their control. These people sport a calm posture, and hence you feel very safe and content around them. However, some people misunderstand their calmness for them being cold and egoistic, which is rarely the case. These people have an eye for detail and have the ability to solve even the most complex problems. For some people, Virgo ascendant is really a lifeline. Also, these individuals can get very critical at times and thus don't shy away from saying the harshest truth. They believed that's how they make themselves useful to others. Virgo Ascendant people are prone to worry and hypochondria apart from being critical of self.",
      ],
    },
    {
      title: "Physical",
      content: [
        `Ruled by the planet Mercury, Virgo ascendants often present an impression of laid-back bohemianism or overall strangeness. The visual aspect of Virgo, notably the face, is usually characterized as "small" and "thin." Their deliberate gait, symmetrical physique, and young, naïve looks are all evident. They have a fine forehead, a clear nose, and big cheeks and make slow, deliberate steps while moving. Virgos are often appealing and of medium height. Their personality is appealing to people, and their facial characteristics are appealing. Virgo rising individuals possess eyes that are usually alluring and have profundity.`,
      ],
    },
    {
      title: "Health",
      content: [
        "The Virgo ascendant is very much prone to mood swings. Though they don't react and show it off, such encounters usually change the way they react to their surroundings. Apart from this, problems near the stomach chakra and problems related to constipation are common for people born under the rising sign of Virgo. These health issues can hamper the function of sexual organs and even your intimacy if not taken care of. Thus you must be careful about your diet. Lessen the dependency on fast food to be in good shape for a long period of time.",
      ],
    },
    {
      title: "Career",
      content: [
        "They enjoy taking something and improving it. These people, who are always the critics, do great in any profession that allows them to offer their opinion, counsel, and aid. Although their dedication to precision and intolerance with carelessness might drive their coworkers crazy, they are certain to execute a good job. They work well on their own if not overseeing. It enables them to be as picky as they want to be to fulfill their own feeling of accomplishment in their job without being burdened by others. Remember, however, the fact that they must take things and improve them qualifies them to assist others. It comes naturally to them to counsel someone who is attempting to reach a goal in any pursuit. Whether it's assisting someone in losing weight, starting a business, or working on a creative project, they always provide honest counsel and practical assistance.",
      ],
    },
    {
      title: "Relationship",
      content: [
        "Virgo Ascendant people often project an image of easygoing individuals, and this doesn't change even when they are looking out for love. These people not only take their time to fall in love but also look out for something long-term. Usually, flings don't excite the natives of the Virgo rising sign. Conservative by nature and cautious with their hearts to a certain point, they benefit from a more flirtatious aggressive partner to start things off. They appreciate a direct and gentle lover and give preference to honesty and openness. Also, Virgos appreciate you being reasonable even if it means you are breaking their heart. All in all, they want you to appreciate their love, and if you can do so, they go miles for you.",
      ],
    },
  ];

  const rudrakshSections = {
    rudrakshTop: {
      rudrakshaSuggestionReport: {
        title: "Rudraksha Suggestion Report",
        content: [
          "Ascendant is one of the most sought concepts in astrology when it comes to predicting the minute events in your life. At the time of birth, the sign that rises in the sky is the person's ascendant. It helps in making predictions about the minute events, unlike your Moon or Sun sign that help in making weekly, monthly or yearly predictions for you.",
          "Your ascendant is Virgo",
        ],
      },
      rudrakshaImportance: {
        title: "Rudraksha & its importance",
        content: [
          "Those born with the Virgo ascendant are really polite and reserved individuals. They don't react much, even when situations seem to be going out of their control. These people sport a calm posture, and hence you feel very safe and content around them. However, some people misunderstand their calmness for them being cold and egoistic, which is rarely the case. These people have an eye for detail and have the ability to solve even the most complex problems. For some people, Virgo ascendant is really a lifeline. Also, these individuals can get very critical at times and thus don't shy away from saying the harshest truth. They believed that's how they make themselves useful to others. Virgo Ascendant people are prone to worry and hypochondria apart from being critical of self.",
        ],
      },
      recommendation: {
        title: "Recommendation",
        content: [
          "Those born with the Virgo ascendant are really polite and reserved individuals. They don't react much, even when situations seem to be going out of their control. These people sport a calm posture, and hence you feel very safe and content around them. However, some people misunderstand their calmness for them being cold and egoistic, which is rarely the case. These people have an eye for detail and have the ability to solve even the most complex problems. For some people, Virgo ascendant is really a lifeline. Also, these individuals can get very critical at times and thus don't shy away from saying the harshest truth. They believed that's how they make themselves useful to others. Virgo Ascendant people are prone to worry and hypochondria apart from being critical of self.",
        ],
      },
    },
    rudrakshsecond: {
      rudrakshaSuggestionReport: {
        title: "Rudraksha Suggestion Report",
        content: [
          "Ascendant is one of the most sought concepts in astrology when it comes to predicting the minute events in your life. At the time of birth, the sign that rises in the sky is the person's ascendant. It helps in making predictions about the minute events, unlike your Moon or Sun sign that help in making weekly, monthly or yearly predictions for you.",
          "Your ascendant is Virgo",
        ],
      },
    },
    rudrakshUlListParent: {
      rudrakshUlList: {
        title: "Rudraksha Suggestion Report",
        content: [
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
          "The seven-Mukhi rudraksha can be worn by anyone suffering from physical miseries for a long time as it helps you heal faster.",
        ],
      },
    },
    rudrakshThird: {
      rudrakshaSuggestionReport: {
        title: "How to wear",
        content: [
          "The seven-Mukhi Rudraksha Dharan should be done on Monday or on the occasion of Shivaratri. Before donning the Rudraksha, rinse it with Ganga water. Once done, smear the Rudraksha with tilak and sandalwood paste. In addition, you can also light a Diya of Pure cow ghee before wearing the Rudraksha for maximum results. The wearer of the Rudraksha must Chant the Rudraksha Utpatti mantra - Om Hreem Hum Namah - daily at least nine times while wearing and removing the Rudraksha before going to sleep at night",
        ],
      },
    },

    rudrakshUlListUlBottom: {
      rudrakshUlList: {
        title: "Precautions",
        content: [
          "As mentioned above, the Seven Mukhi Rudraksha must be rinsed with Ganga water and dipped in cow’s milk for one day before wearing.",
          "As mentioned above, the Seven Mukhi Rudraksha must be rinsed with Ganga water and dipped in cow’s milk for one day before wearing.",
          "As mentioned above, the Seven Mukhi Rudraksha must be rinsed with Ganga water and dipped in cow’s milk for one day before wearing.",
          "As mentioned above, the Seven Mukhi Rudraksha must be rinsed with Ganga water and dipped in cow’s milk for one day before wearing.",
          "As mentioned above, the Seven Mukhi Rudraksha must be rinsed with Ganga water and dipped in cow’s milk for one day before wearing.",
        ],
      },
    },
  };

  const lifeStoneData = {
    stones: [
      {
        mainTitle: "Life Stone Recommendations",
        sign: "Taurus",
        lagna: "Vrishabha Lagna",
        description:
          "A life stone is a gem for the Lagna lord, which the native can wear throughout his or her life. A life stone collectively influences everything that makes your self-image, i.e. your wealth, education, health, business, spouse, intellect, etc. The lord of the Taurus ascendant/Lagna is Venus, and to please Venus, the person born with Taurus Ascendant (Vrishabha Lagna) must wear Diamond.",
        gem: "Diamond (Heera)",
        howToWear: "Gold or silver on middle finger",
        mantra: "Om dram drim draum sah shukraya namah",
      },
      {
        mainTitle: "Life Stone Recommendations",
        sign: "Leo",
        lagna: "Simha Lagna",
        description:
          "A lucky gemstone is worn to enhance the native's luck and open new doors to success for him. An individual's lucky stone is one that keeps luck ticking for him while ensuring the blessing of favourable planets upon him. As Mercury and Saturn are beneficial planets for Taurus, hence the Lucky gemstone for the Taurus Ascendant is: Emerald (Panna)",
        gem: "Ruby (Manikya)",
        howToWear: "Gold on ring finger",
        mantra: "Om suryaya namah",
      },
      {
        mainTitle: "Life Stone Recommendations",
        sign: "Capricorn",
        lagna: "Makara Lagna",
        description:
          "The Bhagya stone is suggested by the astrologers based on the Lord governing the 9th house of the native's birth chart. The Bhagya stone helps the native attract fortune when s/he needs it the most. Wearing Bhagya stone as per ascendant sign helps in fighting obstacles and enhances prosperity both in personal and professional life.",
        gem: "Blue Sapphire (Neelam)",
        howToWear: "Silver on middle finger",
        mantra: "Om shan shanishcharaya namah",
      },
    ],
  };

  // const getBannerImage = () => {
  //   if (active === "0") {
  //     if (activeSubTab === "1") return KundaliReportGeneral;
  //     if (activeSubTab === "2") return KundaliReportGeneral; // You can change per sub-tab if needed
  //     return KundaliReportGeneral;
  //   } else if (active === "1") {
  //     if (activeSubTab === "1") return KundaliReportRemedies;
  //     if (activeSubTab === "2") return kundaliRemediesGemstone;
  //     return KundaliReportRemedies;
  //   } else if (active === "2") {
  //     if (activeSubTab === "1") return kundaliReportDoshaManglik;
  //     if (activeSubTab === "2") return kundaliReportDoshaKalpasara;
  //     if (activeSubTab === "3") return kundaliReportDashaSadesthi;
  //     return kundaliReportDoshaManglik;
  //   }
  // };

  const tabItems = [
    {
      key: "1",
      label: "General",
      children: <GeneralTabFreeKundali sections={sections} />,
    },
    {
      key: "2",
      label: "Planetary",
      children: "Remedies content goes here",
    },
    {
      key: "3",
      label: "Vimshottari Dasha",
      children: "Dosha content goes here",
    },
    {
      key: "4",
      label: "Yoga",
      children: "Dosha content goes here",
    },
  ];

  const tabItemsRemedies = [
    {
      key: "1",
      label: "Rudraksha",
      children: <Rudraksha sections={rudrakshSections} />,
    },
    {
      key: "2",
      label: "Gemstones",
      children: <LifeStone stones={lifeStoneData.stones} />,
    },
  ];

  const tabItemsDosha = [
    {
      key: "1",
      label: "Manglik",
      children: <Manglik />,
    },
    {
      key: "2",
      label: "Kalsarpa",
      children: <Kalpasara />,
    },
    {
      key: "3",
      label: "Sadesati",
      children: <Sadesati />,
    },
  ];

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={getBannerImage()}
          text=""
          highlight="Kundli Details"
        />
        <KundliStepper />
      </section>

      <section>
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            <div>
              <CustomButton
                className={`w-full py-2 border font-semibold text-[16px] leading-[100%] transition-all ${active === "0"
                  ? " !bg-[#e3725d] !border-[#e3725d] !text-[#fff]"
                  : "!bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
                  }`}
                onClick={() => {
                  setActive("0");
                }}
              >
                General
              </CustomButton>
            </div>
            <div>
              <CustomButton
                className={`w-full py-2 border font-semibold text-[16px] leading-[100%] transition-all ${active === "1"
                  ? " !bg-[#e3725d] !border-[#e3725d] !text-[#fff]"
                  : "!bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
                  }`}
                onClick={() => {
                  setActive("1");
                }}
              >
                Remedies
              </CustomButton>
            </div>
            <div>
              <CustomButton
                className={`w-full py-2 border font-semibold text-[16px] leading-[100%] transition-all ${active === "2"
                  ? " !bg-[#e3725d] !border-[#e3725d] !text-[#fff]"
                  : "!bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
                  }`}
                onClick={() => {
                  setActive("2");
                }}
              >
                Dosha
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container padding50">
          {active === "0" ? (
            <div>
              <TabNavigation
                items={tabItems}
                className="my-container-class"
                tabBarClassName="purple-theme small-tabs"
                contentClassName="large-padding custom-background"
                onChange={(key) => setActiveSubTab(key)}
              />
            </div>
          ) : active === "1" ? (
            <div>
              {/* Content for Tab 1 */}
              <div>
                <TabNavigation
                  items={tabItemsRemedies}
                  className="my-container-class"
                  tabBarClassName="purple-theme small-tabs"
                  contentClassName="large-padding custom-background"
                  onChange={(key) => setActiveSubTab(key)}
                />
              </div>
            </div>
          ) : active === "2" ? (
            <div>
              {/* Content for Tab 2 */}
              <div>
                <TabNavigation
                  items={tabItemsDosha}
                  className="my-container-class"
                  tabBarClassName="purple-theme small-tabs"
                  contentClassName="large-padding custom-background"
                  onChange={(key) => setActiveSubTab(key)}
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className=" paddingTop50 ">
        <div className="KundliReportBg">
          <div className="container mx-auto   ">
            <KundliReport />
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto  padding100 ">
          <HoroscopeGrid heading={t('Choose_Your_Sign')} smallText="" type={""} />
        </div>
      </section>
    </>
  );
}

export default memo(FreeKundaliReport);
