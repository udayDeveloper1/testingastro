import React from "react";
// import festivalCalender from "../../assets/img/banner/festivalCalender.webp";
import { lazy} from "react";

// Lazy-loaded components
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));
const FestivalMonthTable = lazy(() => import("../../component/Muhurat/FestivalMonthTable"));
const HinduCalendarStructure = lazy(() => import("../../component/Muhurat/HinduCalendarStructure"));
const IndianSolarCalender = lazy(() => import("../../component/Muhurat/IndianSolarCalender"));
const TypesofCalendars = lazy(() => import("../../component/Muhurat/TypesofCalendars"));
const Footer = lazy(() => import("../../Layout/Footer"));
const NewsletterComp = lazy(() => import("../../component/Homepage/NewsLatterComp"));
const HomeFAQs = lazy(() => import("../../component/Homepage/HomeFAQs"));


function FestivalCalender() {
  const content1 = [
    "In the diverse tapestry of cultures and traditions that adorn the Indian subcontinent, the calendar serves as an essential thread, weaving together the fabric of daily life. As we stand on the threshold of a new year, the Indian Calendar for 2024 emerges as a profound and intricate mosaic, encapsulating not only the passage of time but also the rich heritage, spirituality, and astrological insights that have guided generations.",
    "Steeped in history and deeply rooted in the ancient wisdom of India, the Indian calendar is far more than just a means of measuring time. It is a dynamic reflection of the nation's diverse festivals, traditions, and beliefs, all harmoniously synchronised with celestial movements. The pages of this calendar are adorned with auspicious moments, celestial conjunctions, and astrological predictions that influence every facet of life, from the timing of weddings and festivals to agricultural practices and personal growth.",
    "In this blog series, we will explore the significance of each month, delve into the cultural celebrations that define them, and decipher the cosmic symphony that guides the auspicious moments sprinkled throughout the year.",
    "Prepare to be enchanted, enlightened, and inspired as we delve into the depths of this age-old calendar, unlocking the secrets it holds for the year 2024 and gaining a deeper appreciation for the cultural heritage it embodies. Welcome to the mystical world of the Indian Calendar 2024, where tradition and time unite in a harmonious dance.",
  ];
  const content2 = [
    "The Indian Calendar for 2024 holds immense significance in the lives of millions of people across India and the Indian diaspora. Rooted in ancient traditions, this calendar plays a pivotal role in shaping various aspects of daily life, cultural events, and religious ceremonies.",
    "First and foremost, the Indian calendar determines the dates of major festivals and religious observances. Hindus, Sikhs, Buddhists, Jains, and other communities rely on it to plan their rituals and celebrations. Festivals like Diwali, Holi, Eid, Christmas, and various regional festivities are scheduled according to this calendar.",
    "Moreover, the Indian calendar is deeply connected to agriculture. It guides farmers in planning their crop cycles, sowing, and harvesting times, ensuring the nation's food security. The calendar's lunar influence also affects fishing and other traditional occupations.",
    "Beyond religious and agricultural aspects, the calendar influences social events, auspicious occasions, and even government functions. It reflects India's rich cultural tapestry, emphasising unity in diversity.",
  ];
  const content3 = [
    "The origin of the Indian calendar is a testament to the rich cultural and historical heritage of India. Dating back thousands of years, the Indian calendar has evolved through various phases, each influenced by different dynasties, religions, and astronomical advancements.",
    `One of the earliest Indian calendars was the Vedic calendar, which was lunar-based and rooted in the religious rituals of the Vedic period. Over time, this calendar system evolved into the Hindu calendar, known as the "Panchanga," incorporating lunar months, solar years, and a complex system of intercalation.`,
    "The Gupta dynasty played a significant role in refining the Indian calendar, incorporating advancements in astronomy. Later, the Islamic influence led to the development of the Islamic Hijri calendar in certain regions of India.",
    "The Indian National Calendar, also known as the Saka calendar, was adopted as the official civil calendar in 1957. It is a solar calendar based on the tropical year and is closely tied to the Gregorian calendar used worldwide.",
  ];
  const content4 = [
    "Embark on an enriching journey through India's cultural mosaic with ChatMyAstrologer's Indian Festival Calendar 2024. Explore the meticulously curated dates and events that define the rhythm of joyous celebrations throughout the year. Whether you're drawn to the spiritual ambiance of Hindu festivals, the vibrant traditions of regional events, or the unity found in cultural diversity, our calendar serves as your guide to unforgettable moments. Join us on this immersive experience, exclusively designed for ChatMyAstrologer, where each occasion becomes a cherished cultural celebration. Plan, participate, and revel in the essence of tradition with ChatMyAstrologer's Indian Festival Calendar 2024 – your personalized roadmap to a year brimming with joy and cultural richness.",
  ];
  return (
    <>
      <section>
        <CommonBanner
          text="Festival "
          highlight="Calendar 2025 "
        />
      </section>

      <section>
        <div className=" container mx-auto padding100 flex flex-col 
gap-7 md:gap-10">
          <CommonQuestionComp
            heading="Indian Festivals & Holidays"
            content={content1}
          />
          <CommonQuestionComp
            heading="Significance of Hindu Calendar"
            content={content2}
          />
          <CommonQuestionComp
            heading="Origin of Hindu Calendar"
            content={content3}
          />
        </div>
      </section>

       <section>
       <div className=" container mx-auto paddingBottom100 flex flex-col gap-10">
       <FestivalMonthTable />
       </div>
       </section>

       <section>
       <div className=" container mx-auto paddingBottom100 flex flex-col gap-10">
       <HinduCalendarStructure />
       </div>
       </section>

       <section>
       <div className=" container mx-auto paddingBottom100 flex flex-col gap-10">
       <IndianSolarCalender />
       </div>
       </section>

       <section>
       <div className=" container mx-auto paddingBottom100 flex flex-col gap-10">
       <TypesofCalendars />
       </div>
       </section>

       <section>
       <div className=" container mx-auto  flex flex-col gap-10">
       <CommonQuestionComp
            heading="Embrace the Festivities: Indian Festival Calendar 2024 | Dates, Events, and Cultural Celebrations"
            content={content4}
          />
       </div>
       </section>
       <HomeFAQs text={`${t('Frequently_Asked_Questions')} ${'about'}`} highlightText="ChatMyAstrologer's Indian Festival Calendar 2024" subHeading=""/>
 <NewsletterComp/>
       {/* Footer */}
       <footer>
         <Footer/>
        </footer>
    </>
  );
}

export default React.memo(FestivalCalender);
