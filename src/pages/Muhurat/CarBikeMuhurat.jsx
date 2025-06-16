import React from "react";
// import namkaranBanner from "../../assets/img/banner/namkaranBanner.webp";
import { lazy } from "react";

// Assets (should not be lazy loaded)
import ariesHeading from "../../assets/img/Horoscope/ariesHeading.webp";

// Lazy-loaded components
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));
const Footer = lazy(() => import("../../Layout/Footer"));
const NewsletterComp = lazy(() => import("../../component/Homepage/NewsLatterComp"));
const GoldBuyingMuhuratcomp = lazy(() => import("../../component/Muhurat/GoldBuyingMuhuratcomp"));
const DynamicCard = lazy(() => import("../../component/Dynemic/DynamicCard"));
const BhoomiPujanCard = lazy(() => import("../../component/Muhurat/BhoomiPujanCard"));
const CarBikeMuhuratCard = lazy(() => import("../../component/Muhurat/CarBikeMuhuratCard"));
const ZodiacLuckyColors = lazy(() => import("../../component/Muhurat/ZodiacLuckyColors"));
const AdviceCard = lazy(() => import("../../component/Muhurat/AdviceCard"));

function CarBikeMuhurat() {
  const content1 = [
    "The importance of Muhurat is deeply embedded in Indian tradition. It is believed that actions taken during an auspicious time are more likely to yield positive results. When you purchase a vehicle, it marks the start of numerous journeys, both literal and metaphorical. A well-timed purchase is thought to protect the buyer from mishaps, improve the longevity of the vehicle, and even enhance the prosperity that the vehicle brings.",
    `In the case of buying a car or bike, the benefits of selecting the right Muhurat go beyond the car itself. It is said to influence the smoothness of your travels, minimize the chances of mechanical failures, and offer protection from any untoward incidents on the road. Astrologers recommend choosing a date and time where the planetary positions favor new beginnings, bringing a sense of peace, security, and confidence to the new vehicle owner.`,
  ];

  const content2 = [
    "In today's fast-paced world, where mobility is central to our daily routines, acquiring a vehicle is not just a matter of convenience; it's a significant milestone in life. For many, owning a car or bike symbolizes freedom, success, and the promise of endless journeys. However, in Indian culture, it's not just about the purchase—timing plays a crucial role in ensuring that the experience is not only fulfilling but also brings prosperity and positive energy.",
    `In 2025, the Car/Bike Muhurat takes on renewed importance. The auspicious moments, or "Muhurats," are the ideal times in which to make significant purchases or initiate new ventures, including buying vehicles. These moments, governed by astrological and planetary positions, are believed to be charged with positive cosmic energy that enhances the success of the action and ensures the buyer’s well-being. Whether you’re buying your first car, upgrading to a new one, or purchasing your dream bike, selecting the right Muhurat can be an essential step towards a smoother, more prosperous road ahead.`,
  ];

  const namkaranCeremony = [
    {
      title: "",
      description:
        "Colors play an essential role in astrology, and each zodiac sign is associated with particular colors that enhance positive energy and bring good fortune. In 2025, these colors are believed to have a unique influence on the lives of individuals according to their sun signs. Below is a guide to the lucky colors for each zodiac sign in 2025, helping you make the most of the vibrant energies around you.",
    },
  ];

  const allMonthsData = {
    "January 2025": [
      {
        date: "January 2",
        day: "Thursday",
        time: "7:14 AM to 1:08 AM (Jan 3)",
      },
      {
        date: "January 13",
        day: "Monday",
        time: "10:38 AM to 7:15 AM (Jan 14)",
      },
      { date: "January 20", day: "Monday", time: "7:14 AM to 9:58 AM" },
      {
        date: "January 24",
        day: "Friday",
        time: "7:13 AM to 7:07 AM (Jan 25)",
      },
      { date: "January 6", day: "Monday", time: "7:06 PM to 7:15 AM (Jan 7)" },
      {
        date: "January 19",
        day: "Sunday",
        time: "5:30 PM to 7:14 AM (Jan 20)",
      },
      { date: "January 22", day: "Wednesday", time: "7:14 AM to 3:18 PM" },
      { date: "January 31", day: "Friday", time: "1:59 PM to 4:14 AM (Feb 1)" },
    ],
    "February 2025": [
      { date: "February 5", day: "Wednesday", time: "6:00 AM to 10:00 AM" },
      { date: "February 18", day: "Tuesday", time: "8:00 AM to 12:00 PM" },
    ],
    "March 2025": [
      { date: "March 10", day: "Monday", time: "9:00 AM to 11:45 AM" },
      { date: "March 25", day: "Tuesday", time: "10:00 AM to 2:00 PM" },
    ],
  };

  const zodiacData = [
    {
      title: "Aries (March 21 - April 19)",
      icon: ariesHeading,
      colors: [
        {
          name: "Red",
          code: "red",
          description: "Symbolizes passion, courage, and vitality.",
        },
        {
          name: "White",
          code: "white",
          description: "Symbolizes purity, clarity, and fresh beginnings.",
        },
      ],
      tip: "Wearing red or white on important days will bring Aries the energy they need to conquer their goals.",
    },
    {
      title: "Taurus (April 20 - May 20)",
      icon: ariesHeading,
      colors: [
        {
          name: "Green",
          code: "green",
          description: "Represents growth, prosperity, and harmony.",
        },
        {
          name: "Pink",
          code: "pink",
          description: "Symbolizes love, beauty, and affection.",
        },
      ],
      tip: "Wearing green or pink can enhance Taurus' inner peace and stability.",
    },
    {
      title: "Gemini (May 21 - June 20)",
      icon: "geminiIcon",
      colors: [
        {
          name: "Yellow",
          code: "yellow",
          description: "Boosts intellect, energy, and creativity.",
        },
        {
          name: "Green",
          code: "green",
          description: "Promotes balance and adaptability.",
        },
      ],
      tip: "Wearing yellow or green can sharpen Gemini’s communication skills.",
    },
    {
      title: "Cancer (June 21 - July 22)",
      icon: "cancerIcon",
      colors: [
        {
          name: "White",
          code: "white",
          description: "Represents purity, peace, and intuition.",
        },
        {
          name: "Silver",
          code: "silver",
          description: "Encourages emotional balance and sensitivity.",
        },
      ],
      tip: "Wearing white or silver enhances Cancer’s emotional strength.",
    },
    {
      title: "Leo (July 23 - August 22)",
      icon: "leoIcon",
      colors: [
        {
          name: "Gold",
          code: "gold",
          description: "Symbolizes power, confidence, and royalty.",
        },
        {
          name: "Orange",
          code: "orange",
          description: "Represents enthusiasm and warmth.",
        },
      ],
      tip: "Wearing gold or orange can boost Leo’s leadership qualities.",
    },
    {
      title: "Virgo (August 23 - September 22)",
      icon: "virgoIcon",
      colors: [
        {
          name: "Green",
          code: "green",
          description: "Represents growth, healing, and practicality.",
        },
        {
          name: "Brown",
          code: "brown",
          description: "Symbolizes stability and reliability.",
        },
      ],
      tip: "Wearing green or brown enhances Virgo’s sense of order and focus.",
    },
    {
      title: "Libra (September 23 - October 22)",
      icon: "libraIcon",
      colors: [
        {
          name: "Blue",
          code: "blue",
          description: "Promotes balance, harmony, and wisdom.",
        },
        {
          name: "Pink",
          code: "pink",
          description: "Symbolizes love, charm, and diplomacy.",
        },
      ],
      tip: "Wearing blue or pink helps Libra maintain emotional balance and charm.",
    },
    {
      title: "Scorpio (October 23 - November 21)",
      icon: "scorpioIcon",
      colors: [
        {
          name: "Black",
          code: "black",
          description: "Symbolizes mystery, depth, and power.",
        },
        {
          name: "Red",
          code: "red",
          description: "Represents intensity and passion.",
        },
      ],
      tip: "Wearing black or red enhances Scorpio’s charisma and determination.",
    },
    {
      title: "Sagittarius (November 22 - December 21)",
      icon: "sagittariusIcon",
      colors: [
        {
          name: "Purple",
          code: "purple",
          description: "Represents wisdom, spirituality, and ambition.",
        },
        {
          name: "Blue",
          code: "blue",
          description: "Symbolizes exploration and freedom.",
        },
      ],
      tip: "Wearing purple or blue boosts Sagittarius' adventurous spirit.",
    },
    {
      title: "Capricorn (December 22 - January 19)",
      icon: "capricornIcon",
      colors: [
        {
          name: "Brown",
          code: "brown",
          description: "Represents discipline, structure, and stability.",
        },
        {
          name: "Gray",
          code: "gray",
          description: "Symbolizes wisdom and resilience.",
        },
      ],
      tip: "Wearing brown or gray enhances Capricorn’s focus and determination.",
    },
    {
      title: "Aquarius (January 20 - February 18)",
      icon: "aquariusIcon",
      colors: [
        {
          name: "Blue",
          code: "blue",
          description: "Symbolizes creativity, innovation, and vision.",
        },
        {
          name: "Silver",
          code: "silver",
          description: "Represents futuristic thinking and clarity.",
        },
      ],
      tip: "Wearing blue or silver enhances Aquarius’ originality and intellect.",
    },
    {
      title: "Pisces (February 19 - March 20)",
      icon: "piscesIcon",
      colors: [
        {
          name: "Sea Green",
          code: "#2E8B57",
          description: "Symbolizes intuition, healing, and calmness.",
        },
        {
          name: "Lavender",
          code: "#E6E6FA",
          description: "Encourages spiritual growth and imagination.",
        },
      ],
      tip: "Wearing sea green or lavender enhances Pisces' emotional depth and creativity.",
    },
  ];

  const vehicleAdviceData = {
    title: "Is It Advisable To Buy A Vehicle On Saturday?",
    description: "Buying a vehicle on a Saturday can be a convenient choice for many individuals, but whether it’s advisable depends on various factors. It’s important to consider both the advantages and disadvantages before making such a significant decision.",
    advantages: [
      { title: "Weekend Convenience", description: "Saturdays often provide more free time for potential buyers to visit dealerships, test drive vehicles, and complete paperwork without the rush of a workday." },
      { title: "Sales and Promotions", description: "Many dealerships offer special weekend promotions and discounts, making it a potentially cost-effective time to buy a vehicle." },
      { title: "Availability", description: "Saturdays may see a higher inventory of vehicles, giving buyers more options to choose from." }
    ],
    disadvantages: [
      { title: "Crowds", description: "Saturdays can be busy at dealerships, resulting in longer wait times and less personal attention from sales staff." },
      { title: "Limited Negotiation", description: "Salespeople may be less inclined to negotiate on weekends when customer traffic is high." },
      { title: "Impulse Purchases", description: "The excitement of the weekend can lead to impulsive decisions. It’s crucial to do your research and not rush into buying a vehicle." }
    ]
  };
  const avoidBuying = [
    {
      title: "",
      description:
        "Firstly, Rahu Kaal is believed to be governed by the malefic planet Rahu, which symbolises confusion, deception, and unpredictability. Buying a vehicle during this period may lead to hidden problems, undisclosed issues, or unexpected complications in the future.",
    },
    {
      title: "",
      description:
        "Secondly, Rahu Kaal is regarded as a time when cosmic energies are unfavourable for new beginnings. It is best to align significant life decisions, such as buying a vehicle, with auspicious timings to ensure a smooth and positive outcome.",
    },
    {
      title: "",
      description:
        "Furthermore, adhering to astrological guidance showcases respect for cultural beliefs and traditions. It reflects a conscious effort to make choices that are harmonious with the cosmic energies, contributing to a sense of balance and well-being.",
    },
  ]


  const bhoomiPujanData = {
    "title": "The Most Auspicious Nakshatras For Purchasing A Vehicle In 2025 Are",
    "description": "The Bhoomi Pujan ritual is a sacred act in Hinduism that marks the beginning of construction, be it for a home, temple, or any other structure. In 2025, the importance of this ceremony will continue to uphold its connection between the earth and the divine energies. Below is the Bhoomi Pujan Vidhi for 2025:",
    "steps": [
      {
        "title": "Symbol: ",
        "details": [
          "Chariot or Cart",
          "Ensure the site is clean, cleared of debris, and ideally aligned according to Vastu Shastra.",
          "Mark the central location for the puja, ideally in the Northeast (Ishaan Kon) of the construction site. This direction is known to bring positive energy and prosperity."
        ]
      },
      {
        "title": "Setting the Pujan Area",
        "details": [
          "Place a Kalash (holy pot) in the center of the site, filled with water, mango leaves, and a coconut on top.",
          "The Kalash represents divine presence, while the coconut signifies the Earth’s fertility.",
          "Place rice and grains in a bowl and offer it to Bhoomi Devi (the Earth Goddess)."
        ]
      },
      {
        "title": "Invocation of Deities",
        "details": [
          "Lord Ganesha should be the first deity invoked to remove all obstacles (Vighnaharta).",
          "Offer prayers to Bhoomi Devi (Earth Goddess) by chanting the Bhoomi Gayatri Mantra for prosperity and good health.",
          "\"Om Bhumi Devi Namah\""
        ]
      },
      {
        "title": "Prayers to Nine Planets (Navagrahas)",
        "details": [
          "The planets influence the success and stability of construction.",
          "Worship the Navagrahas during the Bhoomi Pujan for peace and success.",
          "This involves Navagraha Stotra recitation and offering grains, flowers, and water."
        ]
      },
      {
        "title": "Lighting the Sacred Fire (Havan)",
        "details": [
          "Perform the Havan with sacred fire, offering ghee, sesame seeds (til), barley, and sugar into the fire while chanting Vedic mantras.",
          "This purifies the environment and invokes blessings of Agni Dev and other deities."
        ]
      },
      {
        "title": "Final Prayers and Blessings",
        "details": [
          "After the fire ritual, make a final offering of prasad (holy food) and sacred water to the Earth and deities.",
          "Walk around the Kalash and take the blessed water to sprinkle around the construction area."
        ]
      },
      {
        "title": "Fencing the Area",
        "details": [
          "It is customary to place a few bricks or stones around the area that marks the beginning of construction.",
          "This symbolizes the building foundation and asks for divine protection throughout the construction phase."
        ]
      }
    ]
  }
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={namkaranBanner}
          text="Car/Bike "
          highlight="Muhurat 2025"
        />
      </section>
      <section>
        <div className=" container mx-auto paddingTop100 pb-10 flex flex-col gap-10">
          <CommonQuestionComp
            heading="The Perfect Time for Your Dream Ride"
            content={content2}
          />
          <CommonQuestionComp
            heading="Why is Muhurat Important for Buying a Car or Bike?"
            content={content1}
          />
        </div>
      </section>
      <section>
        <div className=" container mx-auto paddingBottom100 flex flex-col gap-10">
          {Object.entries(allMonthsData).map(([month, data]) => (
            <CarBikeMuhuratCard
              key={month}
              title={month}
              data={data}
              listStyle="disc"
            />
          ))}
          <GoldBuyingMuhuratcomp
            title="Lucky Colors for Each Zodiac Sign in 2025"
            introText=""
            data={namkaranCeremony}
            footerText=""
            listStyle="decimal"
          />
          {zodiacData?.map((sign, index) => (
            <ZodiacLuckyColors key={index} {...sign} />
          ))}
          <AdviceCard {...vehicleAdviceData} />
          <DynamicCard
            title="Avoid buying a vehicle at Rahu Kaal period"
            introText="In Vedic astrology, Rahu Kaal is considered an inauspicious time when it is advised to avoid important activities, including buying a vehicle. This period, which occurs daily, typically lasts for one and a half hours and is associated with malefic energy. Here are compelling reasons to steer clear of purchasing a vehicle during Rahu Kaal:"
            bottomText="The most auspicious Nakshatras for purchasing a vehicle in 2025 are:"
            data={avoidBuying}
            listStyle="decimal"
          />

          <BhoomiPujanCard
            title={bhoomiPujanData.title}
            description={bhoomiPujanData.description}
            steps={bhoomiPujanData.steps}
            listStyle="disc" // Use "disc", "decimal", "circle", etc.
          />
          {/* <NakshatraList {...nakshatraData} listStyle="disc"/> */}
        </div>
      </section>
      <NewsletterComp />
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default React.memo(CarBikeMuhurat);
