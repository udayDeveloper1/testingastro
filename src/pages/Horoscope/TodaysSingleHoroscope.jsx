import moment from "moment";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import HomeFAQs from "../../component/Homepage/HomeFAQs";
import CircularCharts from "../../component/Horoscope/CircularCharts";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
// import { PATHS } from "../../routers/Paths";
import { getHoroscope } from "../../services/api/api.services";
import { Codes } from "../../utils/CommonVariable";
import { UpdatedPaths } from "../../routers/Paths";
import { useTranslation } from "react-i18next";

const LuckyInfoCard = React.lazy(() => import('../../component/Horoscope/LuckyInfoCard '));

function TodaysSingleHoroscope() {
  const PATHS = UpdatedPaths()
  const { t } = useTranslation()
  const content = [
    "Aries is the first sign in the zodiac jungle. As the first zodiac sign, Aries like to go head first into any situation, i.e. these natives are always ready to take innumerable risks in life. Aries today's horoscope conveys that Aries natives belong to the fire element, hence have a normal tendency to be bold with their words, thoughts, and actions. When we speak of an Aries, there is surely a lot more that we can add on to describe the amazing personality that these natives are, and Today's Aries horoscope helps one in understanding the same. ",
    "The best quality of Aries people is their truthfulness. An Aries will always convey everything with absolute frankness that may occasionally border on rudeness. Yet, if you can pardon them one's for being rude and give your conversation with them a thought, you will release the absolute sense they make in everything they tell you. The Aries today's horoscope often pinpoints yet another habit of Aries, i.e., their fiery temper. Aggressive as a Ram, Aries peeps can't resist being called wrong. The fact is that these people do everything with utter precaution and hence can't hear their effort being called wrong. Learning how to work out their anger—whether by going to the gym every day, taking some deep breaths, or learning to chill before they Tweet their thoughts to the world—is a lifelong process for Rams.",
    "There is a lot more about Aries that one might want to learn and a great way to do it is through the Aries today's horoscope. Whether it is you who wishes to understand yourself better or someone else who you wish to know closely, Today's horoscope for Aries serves both purposes equally. At ChatMyAstrologer, astrologers consider various aspects before breaking down the daily horoscope for you so that you get a full insight into your life in a few words. Nevertheless, before you jump on to your Daily horoscope, here are some additional things you can know about your zodiac sign. ",
    "An astrologer through your horoscope can predict details regarding various aspects of your life, such as love, marriage, career, and much more. The Horoscope today for different zodiac signs can clear the dust of doubt around these aspects that often surround us. In a nutshell, the horoscope for the day can help the native take crucial decisions from the smallest to the biggest things in life. Wondering if it is the best day to begin something new? Look at your Today’s horoscope to find out. Or want to propose love to someone? Look at your Love horoscope before you make the decision. At ChatMyAstrologer, we have a team of highly experienced astrologers who work to brew the most authentic daily, weekly, monthly and yearly horoscopes. The free horoscope by astrologers gives you an authentic insight into what your future beholds and how to go for it. Also, just in case the day is not good enough for you as per your chart, the astrologers also recommend astrological remedies to make it better. This way, you are always one step ahead of others in life and can be assured of things you are trying to reach out for.",
  ];

  let content1 = [
    {
      label: "Leadership: ",
      pTag: "As the first sign, Aries natives are born leaders. They do everything possible to leave a mark and give their best while doing so. In fact, the desire to lead is not just prevalent in their professional life but also personal life. Thus when they enter the company of other people, they not only do their best to unite others but also try to be the centre of attention, says their Today's horoscope. Leadership: As the first sign, Aries natives are born leaders. They do everything possible to leave a mark and give their best while doing so. In fact, the desire to lead is not just prevalent in their professional life but also personal life. Thus when they enter the company of other people, they not only do their best to unite others but also try to be the centre of attention, says their Today's horoscope.  ",
    },
    {
      label: "Energy:",
      pTag: "The Aries horoscope today often highlights the energy that the Aries natives are born with. It's a fact that Aries natives do not get tired of doing things they enjoy, be it sleeping on the couch or even working all night long. These people are very particular about what they want in life and work hard to achieve it whatsoever. ",
    },
    {
      label: "Creativity: ",
      pTag: "Fewer people understand how creative Aries can be. They are not the first choice of someone who wants a piece of creative advice, but if they make them their first, they will have a lot of ideas to work with. Aries today's horoscope is all about revealing these little things about the zodiac that most people don't know.",
    },
    {
      label: "Optimism:  ",
      pTag: "Last but not the least, Aries people are very optimistic, i.e., no matter what the situation is like, these people never lose hope and keep on looking for solutions. You can hardly ever see people born at the end of March or beginning of April complain about anything, for they know that only they can change their life and no one else.",
    },
  ];

  let content2 = [
    {
      label: "Attention:",
      pTag: " As the first zodiac sign, Aries seek a lot of attention. This Aries characteristic can be a pain for the Aries lover as they have to pamper them always. Nevertheless, Aries makes sure to reward you for your hard work. ",
    },
    {
      label: "Challenges:  ",
      pTag: "Aries is always up for a challenge but rarely in academics. The Aries today's horoscope tells us that these natives are good at creative thinking and sports and come up with great ideas if given a chance. ",
    },
    {
      label: "Sensuality: ",
      pTag: "Aries is a very sensual sign. The natives crave touch and can't easily get their hands off their partner. It's the Aries sensuality that makes them careless at love as they might even consider getting into flings. ",
    },
    {
      label: "Aries isn't fake: ",
      pTag: "One of the best qualities of Aries is that these people say things as they are. They don't fake themselves and neither like fake people to make up their circle of friends.   ",
    },
    {
      label: "Aries isn't fake: ",
      pTag: "One of the best qualities of Aries is that these people say things as they are. They don't fake themselves and neither like fake people to make up their circle of friends.      ",
    },
    {
      label: "",
      pTag: "Furthermore, for anyone wondering what Aries Today's horoscope can help them with, here is a breakdown. ",
    },
  ];

  let content3 = [
    {
      label: "",
      pTag: "Health takes priority in 2025, Taurus. A balanced routine with regular exercise and healthy eating will be essential for maintaining well-being. Yoga, walking, or swimming can help reduce stress and improve physical stamina.",
    },
    {
      label: "",
      pTag: "Pay attention to your mental health by practicing relaxation techniques such as meditation or journaling. Avoid overindulgence in food or drinks, especially during social events, to maintain balance.",
    },
    {
      label: "Health Tip:",
      pTag: "Include nutrient-rich foods like leafy greens, nuts, and fresh fruits in your diet. Stay hydrated and ensure proper sleep to recharge your body and mind",
    },
    {
      label: "Health Remedy:",
      pTag: "Practice deep-breathing exercises daily to enhance focus and calm your mind. Drinking water stored in a copper vessel can also improve immunity and overall vitality.",
    },
  ];

  const content4 = [
    "Unlock the potential of 2025 with astrologer-recommended remedies tailored for Aries. Stay patient and focused amidst life's distractions, avoiding the allure of shiny distractions and unnecessary attractions. Nurture spiritual strength by visiting Lord Hanuman's temple regularly, seeking his blessings for success in all aspects of life.",
    "Elevate your energy by wearing a Rudraksha, activated through the right mantras and rituals, paving the way for positivity and growth. Consider adorning the powerful Pearl (Moti) after consulting an astrologer, enhancing concentration and balance in the Aries journey. Additionally, donate black-colored items on Saturdays to appease Saturn and minimize delays in achieving desired results.",
    "Craft your cosmic destiny in 2025 with these astrological remedies, ensuring success and harmony in every facet of your life.",
  ];

  let content5 = [
    {
      label: "",
      pTag: "Professional recognition and growth await Taurus in 2025. The first quarter is ideal for launching new projects, applying for promotions, or acquiring additional skills. Mid-year may bring workplace challenges such as tight deadlines or increased responsibilities. Use these moments to showcase your dedication and problem-solving abilities.",
    },
    {
      label: "",
      pTag: "For those seeking career changes, 2025 offers favorable opportunities, especially in fields aligned with your interests and values. Entrepreneurs will find success in creative and innovative ventures.",
    },
    {
      label: "Career Tip:",
      pTag: "Stay organized and focused on your long-term goals. Avoid procrastination and build strong professional relationships.",
    },
    {
      label: "Career Remedy:",
      pTag: "Place a green jade crystal on your desk for clarity and confidence. Chanting 'Om Shukraya Namaha' daily can enhance your career growth.",
    },
  ];

  let content6 = [
    {
      label: "",
      pTag: "Our career is what affects our life the most. If we are doing fine career-wise, a lot of things begin to fall into place. Hence, keeping a track of one's career on a regular basis is necessary. The Aries today's horoscope brings you day-to-day information about your career prospects through the Aries career horoscope. So, whether planning a business or anything new at the job, it is wise to look at the Daily career horoscope to find if the day is approving the prospect. ",
      heading: "Aries career horoscope ",
    },
    {
      label: "",
      pTag: "Love is something we all need in life. Honestly, love is what makes us full. The Aries love horoscope is about finding how lucky you are going to be in terms of love on a particular day. The love horoscope is especially a need if you are, let's say, planning to propose love to someone. The horoscope can also reveal the likes and dislikes of the Aries that can help you in surprising the one you love with what they might be expecting. ",
      heading: "Aries love horoscope  ",
    },
    {
      label: "",
      pTag: "Health is wealth, and we all want to manage it for ourselves for the best outcomes. Yet, we, most of the time, fail to keep a track of it due to various reasons. Well, fear not, as the Aries health horoscope is here to help. By keeping track of the stars, the Aries health horoscope conveys to the native if he or she is going too fast or slow in life. The horoscope predictions are about making sure that you are able to manage your health well and tune it whenever needed. ",
      heading: "Aries health horoscope   ",
    },
    {
      label: "",
      pTag: "We all wish to find ourselves the most compatible partner but finding the right one is always a tough task. Zodiac signs that are compatible with Aries are the only ones they can be happy with for a long time. But which zodiac sign is exactly compatible with Aries? Well, the compatibility varies on a regular basis, and the Aries compatibility horoscope included in the daily horoscope is one of the ways to find out who the Aries can consider spending time with. ",
      heading: "Aries compatibility horoscope ",
    },
    {
      label: "",
      pTag: "Managing finance is an art, and the Arians clearly aren't the artist. The Aries finance horoscope, however, has got the Aries covered. The Today's Aries horoscope for finance is a remarkable way to ensure that you are treading on the right path with your investments and savings. The Aries horoscope doesn't give you finance tips, but absolutely makes you notice if the planets are supporting your financial goals or not.  ",
      heading: "Aries finance horoscope ",
    },
    {
      label: "",
      pTag: "Getting accurate predictions about the Aries' future is fairly simple with Today's horoscope, and you have to try it for yourself.  ",
      heading: "",
    },
  ];

  // ------------------------------------ Api Calling ----------------------------------------------------------
  const { id } = useParams();
  const currentDate = moment().format("DD/MM/YYYY");
  const [horoScopDetails, setHoroScopDetails] = useState({});
  const location = useLocation();
  useEffect(() => {
    let request = {
      zodiac: id,
      lang: "en",
      date: currentDate,
    };
    getHoroscope(request).then((response) => {
      if (response?.code === Codes?.SUCCESS) {
        setHoroScopDetails(response?.data?.response);
      } else {
        setHoroScopDetails({});
        TOAST_ERROR(response?.message);
      }
    });
  }, [id]);
  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <>
      <section className="">
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <div className="flex flex-col items-start justify-center md:justify-start text-center">
            <h2 className=" mb-4 commonHeadingH2 flex flex-col justify-center text-center md:text-start md:block w-full gap-1">
              {" "}
              <span className="commonheadingSpan">
                Yearly Horoscope 2025
              </span>{" "}
            </h2>
            <p className="commonQuesP w-full text-center md:text-start">
              {`/${pathParts[0]}` === PATHS?.TODAYS_SINGLE_HOROSCOPE
                ? t('Predictions_for_all_zodiac_signs')
                : "signs"}
            </p>
          </div>

          <div className="">
            <LuckyInfoCard horoScopDetails={horoScopDetails} />
          </div>
        </div>
      </section>

      <section className="">
        <div className="container mx-auto paddingTop50  flex flex-col gap-5">
          <CommonQuestionComp heading="Overview" content={content} />
          <div>
            <CircularCharts horoScopDetails={horoScopDetails} />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Love Horoscope</h2>
          <div className="flex flex-col gap-3">
            {content1?.map((paragraph, index) => (
                <div key={index}>
                  <h2 className="rashiHeading">{paragraph?.label}</h2>
                  <p key={index} className="commonQuesP">
                    {paragraph?.pTag}
                  </p>
                </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Finance Horoscope</h2>
          <div className="flex flex-col gap-3">
            {content2?.map((paragraph, index) => (
              <>
                <div key={index}>
                  <h2 className="rashiHeading">{paragraph?.label}</h2>
                  <p key={index} className="commonQuesP">
                    {paragraph?.pTag}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Finance Horoscope</h2>
          <div className="flex flex-col gap-3">
            {content3?.map((paragraph, index) => (
              <>
                <div key={index}>
                  <h2 className="rashiHeading">{paragraph?.label}</h2>
                  <p key={index} className="commonQuesP">
                    {paragraph?.pTag}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Career Horoscope</h2>
          <div className="flex flex-col gap-3">
            {content5?.map((paragraph, index) => (
              <>
                <div key={index}>
                  <h2 className="rashiHeading">{paragraph?.label}</h2>
                  <p key={index} className="commonQuesP">
                    {paragraph?.pTag}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Family Horoscope</h2>
          <div className="flex flex-col gap-3">
            {content6?.map((paragraph, index) => (
              <>
                <div key={index}>
                  <h2 className="rashiHeading">{paragraph?.label}</h2>
                  <p key={index} className="commonQuesP">
                    {paragraph?.pTag}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Health Horoscope</h2>
          <div className="flex flex-col gap-3">
            {content3?.map((paragraph, index) => (
              <>
                <div key={index}>
                  <h2 className="rashiHeading">{paragraph?.label}</h2>
                  <p key={index} className="commonQuesP">
                    {paragraph?.pTag}
                  </p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <h2 className="commonQuesH2">
            Aries Horoscope 2025: Astrological Insights for a Year of Love,
            Career, and Well-being
          </h2>
          <div className="flex flex-col gap-3">
            {content4?.map((paragraph, index) => (
              <>
                <div key={index}>
                  <p className="commonQuesP">{paragraph}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto padding50 flex flex-col gap-5">
          <h2 className="commonQuesH2">Other zodiac signs</h2>
          <HoroscopeGrid
            heading={t('Choose_Your_Sign')}
            smallText=""
            type={"yearly"}
          />
        </div>
      </section>

      <HomeFAQs
        text={`${t('Frequently_Asked_Questions')} ${'about'}`}
        highlightText="Aries Horoscope 2025"
        subHeading={t('All_you_need_to_know_about_Guna_Milan_Kundli_Milan')}
      />
    </>
  );
}

export default TodaysSingleHoroscope;
