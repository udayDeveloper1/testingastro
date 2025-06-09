import React from "react";
// import goldBuyingMuhurat from "../../assets/img/banner/goldBuyingMuhurat.webp";
import CommonBanner from "../../component/CommonBanner";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import FestivalMonthTable from "../../component/Muhurat/FestivalMonthTable";
import HinduCalendarStructure from "../../component/Muhurat/HinduCalendarStructure";
import IndianSolarCalender from "../../component/Muhurat/IndianSolarCalender";
import TypesofCalendars from "../../component/Muhurat/TypesofCalendars";
import Footer from "../../Layout/Footer";
import NewsletterComp from "../../component/Homepage/NewsLatterComp";
import HomeFAQs from "../../component/Homepage/HomeFAQs";
import GoldBuyingMuhuratcomp from "../../component/Muhurat/GoldBuyingMuhuratcomp";
import DynamicCard from "../../component/Dynemic/DynamicCard";

function GoldBuyingMuhurat() {
  const content1 = [
    "In Hindu culture, buying gold is considered an auspicious activity, symbolizing wealth, prosperity, and good fortune. The selection of the right Gold Buying Muhurat in 2025 holds immense importance, as it is believed that making this purchase during an astrologically favorable time can enhance the financial well-being of the individual and family. Astrologers calculate these special times based on the alignment of celestial bodies, Tithis, and Nakshatras, ensuring that the transaction is aligned with positive cosmic energies.",
  ];
 

  const content2 = [
    "The right Muhurat for buying gold ensures that the wealth accumulated brings prosperity and stability, while also protecting the individual from any negative influences. It is believed that buying gold during an auspicious time strengthens the foundation of financial security and invites blessings of Lakshmi, the Goddess of wealth.",
    "By aligning your gold purchase with a Shubh Muhurat in 2025, you can ensure the longevity and success of your financial endeavors, making this tradition a powerful and meaningful step toward attracting wealth and abundance into your life.",
  ];
  const goldMuhuratData1 = [
    {
      title: "Pushya Nakshatra",
      description:
        "This is considered one of the most auspicious times for buying gold, as Pushya is ruled by Jupiter and is believed to bring wealth and prosperity. In 2025, Pushya Nakshatra will occur on January 22 and August 10.",
    },
    {
      title: "Makar Sankranti - 14 January 2025",
      description:
        "Celebrated as a harvest festival, Makar Sankranti marks a time of new beginnings and is considered a favorable day to make important purchases, including gold.",
    },
    {
      title: "Ugadi / Gudi Padwa - 30 March 2025",
      description:
        "This is the Hindu New Year and is marked as an ideal day for purchasing new items, especially gold, to invite good fortune and success in the year ahead.",
    },
    {
      title: "Akshaya Tritiya - 30 April 2025",
      description:
        "Known as one of the most powerful days for buying gold, Akshaya Tritiya is believed to bring infinite prosperity.",
    },
    {
      title: "Navratri - 30 Mar, 2025 to 7 Apr, 2025",
      description:
        "During this 9-day festival celebrating the Goddess Durga, it is believed that buying gold during the period of Navratri ensures a year of wealth, strength, and success.",
    },
    {
      title: "Dussehra - October 2, 2025",
      description:
        "Dussehra signifies the victory of good over evil and is considered a propitious time to buy gold to mark new beginnings.",
    },
    {
      title: "Dhanteras / Diwali - 17 October & 20 October 2025",
      description:
        "Buying gold on Dhanteras ensures divine blessings for abundance in the coming year. Diwali is also a prime time to buy gold as it ushers in good fortune.",
    },
  ];
  
  const goldMuhuratData2 = [
    {
      title: "April 29 (Tuesday)",
      description: "05:31 PM to 05:41 AM (April 30)",
    },
    {
      title: "April 30 (Wednesday)",
      description: "05:41 AM to 02:12 PM",
    },
    {
      title: "October 14, 2025 (Tuesday) - Pushya Yoga",
      description: "11:54 AM to 06:22 AM (October 15)",
    },
    {
      title: "October 15, 2025 (Wednesday) - Pushya Yoga",
      description: "06:22 AM to 12:00 PM",
    },
    {
      title: "October 18, 2025 (Saturday) - Dhanteras",
      description: "12:18 PM to 06:24 AM (October 19)",
    },
    {
      title: "October 19, 2025 (Sunday) - Dhanteras",
      description: "06:24 AM to 01:51 PM",
    },
  ];
 
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={goldBuyingMuhurat}
          text="Festival "
          highlight="Calendar 2025 "
        />
      </section>

      <section>
        <div className=" container mx-auto paddingTop100 pb-10 flex flex-col gap-10">
          <CommonQuestionComp
            heading=""
            content={content1}
          />
           <CommonQuestionComp
            heading="Why Gold Buying Muhurat Matters in 2025"
            content={content2}
          />
        </div>
      </section>

       <section>
       <div className=" container mx-auto paddingBottom100 flex flex-col gap-10">
       <DynamicCard
        title="Key Gold Buying Muhurats For 2025"
        introText=""
        data={goldMuhuratData1}
        listStyle="decimal"
      />
      
      <GoldBuyingMuhuratcomp 
      title="Key Gold Buying Muhurats For 2025" 
      data={goldMuhuratData2}  
      introText={`Akshaya Tritiya is considered an auspicious day in Hindu culture, symbolizing wealth, prosperity, and good fortune. It is believed that buying gold on this day brings lasting benefits and attracts wealth. The word "Akshaya" means "never diminishing," signifying that any investments made on this day, especially gold, will continue to grow and never lose value. Therefore, many people choose to buy gold on Akshaya Tritiya to ensure lasting prosperity and financial growth.`}
      footerText=" These timings are considered highly auspicious for making gold
          purchases, associated with wealth and prosperity."
      />
       </div>
       </section>

      <NewsletterComp/>
       {/* Footer */}
       <footer>
         <Footer/>
        </footer>
    </>
  );
}

export default GoldBuyingMuhurat;
