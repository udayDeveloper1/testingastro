import React, { useEffect } from "react";
// import namkaranBanner from "../../assets/img/banner/namkaranBanner.webp";
import CommonBanner from "../../component/CommonBanner";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import Footer from "../../Layout/Footer";
import NewsletterComp from "../../component/Homepage/NewsLatterComp";
import GoldBuyingMuhuratcomp from "../../component/Muhurat/GoldBuyingMuhuratcomp";
import DynamicCard from "../../component/Dynemic/DynamicCard";
import BhoomiPujanCard from "../../component/Muhurat/BhoomiPujanCard";
import NamingMuhuratList from "../../component/Muhurat/NamingMuhuratList";
import moment from "moment";
import { generateMuhuratBlogThunk } from "../../storemain/slice/MasterSlice";
import { useDispatch, useSelector } from "react-redux";
import { Constatnt } from "../../utils/Constent";
import { openLoader } from "../../utils/CommonFunction";
import Loader from "../../component/loader/Loader";
import { useTranslation } from "react-i18next";

function NamkaranMuhurat() {

  const dispatch = useDispatch()
  const { t } = useTranslation();
  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector((state) => state?.masterSlice?.loader);


  const muhuratDatas = [
    {
      month: "January 2025",
      muhurat_dates: [
        {
          date: "January 1, 2025",
          day: "Wednesday",
          naming_muhurat: "11:19 AM to 12:44 PM",
          nakshatra: "Uttarashada",
          tithi: "Dwitiya (2nd day)",
        },
        {
          date: "January 2, 2025",
          day: "Thursday",
          naming_muhurat: "11:16 AM to 12:40 PM",
          nakshatra: "Shravana",
          tithi: "Tritiya (3rd day)",
        },
        {
          date: "January 31, 2025",
          day: "Friday",
          naming_muhurat: "09:22 AM to 10:46 AM",
          nakshatra: "Shatabhisha",
          tithi: "Dwitiya (2nd day)",
          alternate_muhurat: {
            time: "12:22 PM to 12:56 PM",
            nakshatra: "Shatabhisha",
            tithi: "Dwitiya (2nd day)",
          },
        },
      ],
    },
    {
      month: "February 2025",
      muhurat_dates: [
        {
          date: "February 5, 2025",
          day: "Wednesday",
          naming_muhurat: "10:10 AM to 11:30 AM",
          nakshatra: "Rohini",
          tithi: "Panchami (5th day)",
        },
        {
          date: "February 15, 2025",
          day: "Saturday",
          naming_muhurat: "09:45 AM to 10:50 AM",
          nakshatra: "Anuradha",
          tithi: "Navami (9th day)",
        },
      ],
    },
    {
      month: "March 2025",
      muhurat_dates: [
        {
          date: "March 3, 2025",
          day: "Monday",
          naming_muhurat: "12:15 PM to 1:30 PM",
          nakshatra: "Mrigashira",
          tithi: "Dashami (10th day)",
        },
        {
          date: "March 22, 2025",
          day: "Saturday",
          naming_muhurat: "10:00 AM to 11:15 AM",
          nakshatra: "Chitra",
          tithi: "Ekadashi (11th day)",
        },
      ],
    },
  ];

  const content1 = [
    "In the vibrant and diverse traditions of Hinduism, the Bhoomi Pujan ceremony holds deep spiritual and cultural significance. This sacred ritual marks the auspicious beginning of any construction work, whether it be a new home, temple, or any other building. It is a powerful expression of reverence towards the Earth, symbolizing the connection between humanity and the land that sustains it. This ancient practice is not only about starting a construction project but also about invoking divine blessings for harmony, prosperity, and a smooth journey ahead.",
    "In 2025, the importance of the Bhoomi Pujan Muhurat continues to resonate with individuals looking to begin new ventures, particularly those in the process of building homes or undertaking new construction projects. The dates and times for Bhoomi Pujan in 2025 align celestial and earthly energies, creating an auspicious environment that promises well-being and success.",
    "This blog aims to guide you through the profound significance of Bhoomi Pujan in 2025, the best times for this sacred ceremony, and the cultural practices that surround it. Whether you are new to this tradition or have a deep-rooted understanding of its meaning, join us as we explore the importance of this ritual and the favorable Bhoomi Pujan Muhurat for the year 2025.",
  ];

  const content2 = [
    "A Guide to the Auspicious Name-Choosing Ceremony",
    "Namkaran, or the Naming Ceremony, is an important ritual in Hindu culture, where a child is given their name, which will carry them through life. The Namkaran ceremony is traditionally performed on an auspicious date or Muhurat to ensure the name brings positive energy and a bright future for the child. The event is full of joy and celebration, involving family and friends to bless the child with good fortune, health, and prosperity.",
    "In 2025, selecting the right time for the Namkaran ceremony, known as the Namkaran Muhurat, is crucial. A good Muhurat can create a positive foundation for the child's life, aligning them with favorable cosmic energies.",
  ];

  const content4 = [
    "The Bhoomi Pujan ceremony is integral to many construction projects in India, as it ensures a smooth and prosperous outcome. This ritual is performed to seek the blessings of the Earth and other divine forces before any building activity begins. It is a gesture of gratitude to the land and a request for its permission to initiate construction without causing harm or disturbance to its natural balance.",
    "On a spiritual level, Bhoomi Pujan is believed to invoke the protection of divine deities, ensuring the safety of the construction and those involved in it. It also acts as a call for blessings for prosperity, health, and happiness in the home or building being constructed.",
    "Ecologically, the ritual serves as a reminder to approach construction projects with respect for nature. It encourages sustainable and mindful building practices, emphasizing the importance of minimizing environmental damage. By recognizing the Earth as a source of abundance, Bhoomi Pujan encourages responsible stewardship of resources, promoting a balance between human development and environmental conservation.",
    "At its core, Bhoomi Pujan is a profound symbol of the relationship between humanity and nature. It fosters a deep sense of gratitude, respect, and responsibility, ensuring that any new construction project is carried out with divine blessings and harmony with the environment. In 2025, as we continue to honor these traditions, the importance of this ritual remains as relevant as ever, reminding us of the need to live in harmony with the Earth while embarking on new beginnings.",
  ];

  const muhuratData = [
    {
      title: "Tithi",
      description:
        "Ideal for starting construction, especially in the early hours after sunrise.",
    },
    {
      title: "Nakshatra",
      description:
        "The position of the moon in a specific Nakshatra influences the child’s personality. Some Nakshatras, like Pushya, Ashwini, and Swati, are considered highly favorable for the Namkaran ceremony",
    },
    {
      title: "Rahu-Ketu Transit",
      description:
        "The influence of Rahu and Ketu must be checked. Performing the ceremony during the Rahu Kalam or Ketu Kalam is avoided, as these are considered inauspicious times.",
    },
    {
      title: "Panchang: ",
      description:
        "The Panchang, a Hindu calendar, considers Tithi, Nakshatra, Vara (day of the week), Karana, and Yoga to determine the most propitious moment for the ceremony.",
    },
  ];

  const namkaranCeremony = [
    {
      title: "Preparation and Purification",
      description:
        "The home is purified before the ceremony. A Ganesh Puja or Vastu Shanti may be conducted to ensure a smooth and prosperous event. The baby is bathed and dressed in new clothes, often in traditional attire, symbolizing purity.",
    },
    {
      title: "Sankalp (Vow)",
      description:
        "The parents or elders take a Sankalp, pledging to perform the ceremony with devotion. They seek blessings for the child’s well-being, intelligence, and long life.",
    },
    {
      title: "Puja and Havan (Fire Offering)",
      description:
        "A havan is often conducted by a priest to invoke the blessings of various deities, such as Lord Ganesha for wisdom and the removal of obstacles, and Goddess Saraswati for knowledge and education.",
    },
    {
      title: "Name Announcement",
      description:
        "The baby’s name is revealed in front of family members and friends. The name is typically whispered into the baby’s ear or written on a sacred leaf or plate, and the parents offer prayers for the child’s future. ",
    },
    {
      title: "Gifts and Blessings",
      description:
        "Family members and friends offer blessings and gifts, such as clothes, jewelry, toys, and sweets, to the child. These symbolize good wishes for a prosperous life.",
    },
  ];

  const culturalVariation = [
    {
      title: "North India",
      description:
        "The ceremony is often held with traditional music, prayers, and a large gathering. The name is typically written on a leaf or plate and presented to the child. Sweets like laddoos and kheer are common.",
    },
    {
      title: "South India",
      description:
        "In Tamil Nadu and Andhra Pradesh, the naming ceremony is deeply spiritual, with prayers to Lord Vishnu or Goddess Lakshmi. Betel leaves and nuts may be offered to the child as part of the rituals.",
    },
    {
      title: "Bengal",
      description: `The ceremony, known as "Naamkaran", often includes the first feeding of rice and curd, along with the name being announced at a well-attended family gathering.`,
    },
    {
      title: "Maharashtra",
      description:
        "The Namkaran ceremony is performed with Marathi customs, often involving a havan and a puja for the family’s prosperity, where the baby is fed traditional sweets like Modaks or Puran Poli.",
    },
  ];

  const objNameSanskar = [
    {
      title: "Selecting an Auspicious Date",
      description:
        "Consulting an astrologer is essential to find the most favorable Muhurat based on Tithi, Nakshatra, and the Panchang. This will ensure that the ceremony aligns with positive cosmic energies.",
    },
    {
      title: "Purification and Blessings",
      description:
        "Before the ceremony, bathe the child and dress them in fresh, traditional clothing. The family priest or an elder can conduct a purification ritual to cleanse the environment and ensure divine blessings.",
    },
    {
      title: "Traditional Dress",
      description:
        "The baby should be dressed in beautiful, traditional clothing. For girls, this might include a lehenga or saree, while boys may wear kurta-pajama. Adorn the child with jewelry or a bindi (for girls) as a symbol of auspiciousness.",
    },
    {
      title: "Choosing the Name",
      description:
        "The name is often chosen based on astrological factors, aligning with the child’s birth star (Nakshatra). The name should have a meaningful and positive vibration.",
    },
    {
      title: "Family and Community Participation",
      description:
        "This is a family-centered event, and close family members and friends should be invited to bless the child. Their presence adds to the auspiciousness of the occasion.",
    },
    {
      title: "Offering Prayers and Blessings",
      description:
        "The priest or family elder will offer prayers to invoke blessings for health, prosperity, and success for the child. Relatives often offer blessings and gifts to the child.",
    },
    {
      title: "Vegetarian Food",
      description:
        "Traditional vegetarian dishes are served during the event. The food is prepared with devotion and symbolizes purity, nourishment, and prosperity.",
    },
    {
      title: "Celebratory Meal",
      description:
        "Following the ceremony, a festive meal with family and friends includes a variety of vegetarian dishes and sweets, bringing everyone together to rejoice in the new name and the child’s future.",
    },
  ];

  const precuBeforeName = [
    {
      title: "Selecting an Auspicious Date",
      description:
        "Make sure to consult an astrologer to ensure the Muhurat is favorable for the child.",
    },
    {
      title: "Invitations",
      description:
        "Send out invitations well in advance to ensure important relatives and friends are present.",
    },
    {
      title: "Arranging for a Priest",
      description:
        "Hiring a qualified priest is essential to ensure the rituals are performed correctly.",
    },
    {
      title: "Vastu",
      description: "Perform the ceremony in a clean and sacred place at home.",
    },
  ];
  const remediesForName = [
    {
      title: "Name Selection Remedies",
      description:
        "Choose a name that aligns with the child’s Nakshatra and numerology to bring prosperity and harmony.",
    },
    {
      title: "Mitigating Doshas",
      description:
        "Perform remedies like Mangal Stotra for Mangal Dosha or Kaal Sarp Puja for Kaal Sarp Dosha to reduce negative planetary influences.",
    },
    {
      title: "Rituals for Blessings",
      description:
        "Recite prayers like Ganesh Puja, Durga Saptashati, or Saraswati Vandana to invoke blessings of wisdom, success, and protection.",
    },
    {
      title: "Avoiding Inauspicious Times",
      description:
        "If the ceremony occurs during inauspicious times, perform a Rahu-Ketu Puja or Yagya to neutralize negative effects.",
    },
    {
      title: "Healing and Protection",
      description:
        "Sprinkle Ganga Jal on the child or perform Navagraha Puja for planetary protection and health.",
    },
    {
      title: "Offering Prayers for Prosperity",
      description:
        "Conduct Lakshmi Puja or Kubera Puja for wealth and success in the child’s life.",
    },
    {
      title: "Charitable Acts and Gratitude",
      description:
        "Donate food, clothes, or sponsor education to generate positive karma and blessings for the child.",
    },
  ];

  const auspiciousDaysData = [
    {
      title: "",
      description:
        "Here are the auspicious Muhurats for Naamkaran (Naming Ceremony) in 2025, with their start and end times:",
    },
    {
      title: "",
      description:
        "Here are the auspicious naming ceremony (Namkaran) muhurats for the year 2025:",
    },
  ];

  const content3 = [
    "As we look forward to 2025, several favorable dates and times have been identified for couples looking to marry. The following are some of the key Marriage Muhurat dates for 2025:",
  ];

  const goldMuhuratData = [
    {
      title: "Vrishabha (Taurus)",
      description: " Known for stability and material success.",
    },

    {
      title: "Simha (Leo)",
      description: "Represents strength, leadership, and success",
    },
    {
      title: "Tula (Libra)",
      description: "Brings harmony, peace, and prosperity.",
    },
    {
      title: "Meena (Pisces)",
      description: "Signifies spiritual blessings and fulfillment.",
    },
  ];

  const auspicious = [
    {
      title: "January 12, 2025 (Sunday): ",
      description:
        "Ideal for starting construction, especially in the early hours after sunrise.",
    },
    {
      title: "February 22, 2025 (Saturday)",
      description: "An auspicious day with favorable planetary positions.",
    },
    {
      title: "April 10, 2025 (Friday)",
      description: "A good day for initiating construction.",
    },
    {
      title: "May 25, 2025 (Monday)",
      description: "Especially favorable for residential construction.",
    },
    {
      title: "November 21, 2025 (Friday)",
      description:
        "Another auspicious day to begin the construction of a home.",
    },
  ];

  const avoidBhumiPujan = [
    {
      title: "Rahu Kalam",
      description:
        "This period is inauspicious for any new ventures, including construction. ",
    },
    {
      title: "Amavasya (New Moon)",
      description:
        "The energy during Amavasya is considered weak, and starting new projects is discouraged.",
    },
    {
      title: "Eclipses (Solar and Lunar Eclipses) ",
      description:
        "During these times, auspicious activities should be avoided as they are believed to cause negative effects.",
    },
    {
      title: "Chaturthi (Fourth Day)",
      description:
        "In some traditions, starting construction on this day is considered inauspicious.",
    },
  ];

  const moonImpact = [
    {
      title: "Rohini",
      description: "Signifies fertility and material success.",
    },
    {
      title: "Pushya",
      description: "Represents nourishment, prosperity, and growth.",
    },
    {
      title: "Uttara Phalguni",
      description: "Brings stability, good fortune, and long-term success.",
    },
    {
      title: "Shravana",
      description:
        "  Ideal for foundation ceremonies, offering good vibrations.",
    },
    {
      title: "Swati",
      description: "Promotes peace, prosperity, and progress.",
    },
    {
      title: "",
      description: " Avoid the following Nakshatras for Bhoomi Pujan:",
    },
    {
      title: "Ashlesha",
      description: " Known for obstacles and challenges.",
    },
    {
      title: "Moola",
      description:
        "Associated with destruction and is not considered favorable.",
    },
    {
      title: "Bharani",
      description:
        "Linked with aggression, so it’s better to avoid it for construction activities.",
    },
  ];

  const contructionPujan = [
    {
      title: "Location",
      description:
        "The ceremony should be held in the northeastern part of the land, where positive energy flows abundantly.",
    },
    {
      title: "Cleanliness",
      description:
        "Ensure that the site is clean and free of any debris before performing the puja.",
    },
    {
      title: "Direction of Facing",
      description:
        "The priest performing the puja should ideally face the east or northeast direction during the ceremony, as these are considered most favorable.",
    },
    {
      title: "Materials",
      description:
        "Use earth (soil), water, leaves, and flowers as offerings, symbolizing harmony between the five elements of nature.",
    },
  ];

  const ThingToBuy = [
    {
      title: "Kalash (Sacred Pot)",
      description: "Represents divinity and the earth's energy.",
    },
    {
      title: "Coconut",
      description: "Symbolizes the Earth and its fertility.",
    },
    {
      title: "Rice & Grains",
      description: " Offered to Bhoomi Devi and the deities.",
    },
    {
      title: "Flowers & Fruits",
      description: "To offer during prayers, representing purity and devotion.",
    },
    {
      title: "Ghee & Sesame Seeds (Til)",
      description: "For the havan/fire ritual, used to purify the environment.",
    },
    {
      title: "Gold or Silver Coins",
      description: "Symbolize prosperity and abundance.",
    },
    {
      title: "Turmeric & Vermilion (Kumkum)",
      description: " For applying to the site for purification.",
    },
    {
      title: "Incense Sticks",
      description: "To purify the air and invite positive vibrations.",
    },
    {
      title: "Holy Water or Ganga Jal",
      description: " For sprinkling on the land.",
    },
    {
      title: "Bricks or Stones",
      description:
        "Used to demarcate the site as a sign of beginning construction.",
    },
    {
      title: "Copper or Silver Utensils",
      description: "For offerings to deities during prayers.",
    },
    {
      title: "Navagraha Idols or Pictures",
      description: "For worshipping the nine planets.",
    },
    {
      title: "Holy Thread (Rakhi or Mauli)",
      description: "To tie around the Kalash, symbolizing protection.",
    },
  ];

  const whatShouldPerform = {
    title: "Who Should Perform Bhoomi Pujan?",
    description:
      "The Bhoomi Pujan is a sacred ritual, and certain individuals have key roles in ensuring its success. Below are the people who traditionally participate in the ceremony:",
    steps: [
      {
        title: "Head of the Family",
        details: [
          "The person responsible for the construction, such as the head of the family or the one investing in the property, should ideally lead the Bhoomi Pujan.",
          "They should recite the prayers and mantras, invoking divine blessings for the success and well-being of the family and construction project.",
          "Represents divinity and the earth's energy.",
        ],
      },
      {
        title: "Priest (Pandit)",
        details: [
          "A knowledgeable Pandit or Brahmin who is well-versed in Vedic rituals and mantras is essential to guide the ceremony.",
          "They perform the ritual with precision and ensure that the right procedures are followed.",
        ],
      },
      {
        title: "Vastu Shastra Expert",
        details: [
          "Sometimes, an expert in Vastu Shastra is invited to ensure that the construction site is in proper alignment with Vastu principles.",
          "They may also give guidance on the correct directions and placement of objects in the home.",
        ],
      },
      {
        title: "Elders of the Family",
        details: [
          "In many families, the elders (especially the father, grandfather, or any spiritual guide) are invited to offer their blessings during the Bhoomi Pujan.",
          "Their presence adds a sense of spiritual strength to the ceremony.",
        ],
      },
      {
        title: "Women of the House",
        details: [
          "It is customary in some households for the women of the house, particularly the mother or wife, to offer prayers and light the lamp (diya) during the ritual.",
          "This invokes peace and harmony in the house.",
        ],
      },
    ],
  };

  const bhoomiPujanData = {
    title: "Bhoomi Pujan Vidhi 2025: How To Perform The Bhoomi Pujan Ritual",
    description:
      "The Bhoomi Pujan ritual is a sacred act in Hinduism that marks the beginning of construction, be it for a home, temple, or any other structure. In 2025, the importance of this ceremony will continue to uphold its connection between the earth and the divine energies. Below is the Bhoomi Pujan Vidhi for 2025:",
    steps: [
      {
        title: "Site Preparation",
        details: [
          "Choose an auspicious day based on your horoscope and Nakshatra (star) placement for the Bhoomi Pujan.",
          "Ensure the site is clean, cleared of debris, and ideally aligned according to Vastu Shastra.",
          "Mark the central location for the puja, ideally in the Northeast (Ishaan Kon) of the construction site. This direction is known to bring positive energy and prosperity.",
        ],
      },
      {
        title: "Setting the Pujan Area",
        details: [
          "Place a Kalash (holy pot) in the center of the site, filled with water, mango leaves, and a coconut on top.",
          "The Kalash represents divine presence, while the coconut signifies the Earth’s fertility.",
          "Place rice and grains in a bowl and offer it to Bhoomi Devi (the Earth Goddess).",
        ],
      },
      {
        title: "Invocation of Deities",
        details: [
          "Lord Ganesha should be the first deity invoked to remove all obstacles (Vighnaharta).",
          "Offer prayers to Bhoomi Devi (Earth Goddess) by chanting the Bhoomi Gayatri Mantra for prosperity and good health.",
          '"Om Bhumi Devi Namah"',
        ],
      },
      {
        title: "Prayers to Nine Planets (Navagrahas)",
        details: [
          "The planets influence the success and stability of construction.",
          "Worship the Navagrahas during the Bhoomi Pujan for peace and success.",
          "This involves Navagraha Stotra recitation and offering grains, flowers, and water.",
        ],
      },
      {
        title: "Lighting the Sacred Fire (Havan)",
        details: [
          "Perform the Havan with sacred fire, offering ghee, sesame seeds (til), barley, and sugar into the fire while chanting Vedic mantras.",
          "This purifies the environment and invokes blessings of Agni Dev and other deities.",
        ],
      },
      {
        title: "Final Prayers and Blessings",
        details: [
          "After the fire ritual, make a final offering of prasad (holy food) and sacred water to the Earth and deities.",
          "Walk around the Kalash and take the blessed water to sprinkle around the construction area.",
        ],
      },
      {
        title: "Fencing the Area",
        details: [
          "It is customary to place a few bricks or stones around the area that marks the beginning of construction.",
          "This symbolizes the building foundation and asks for divine protection throughout the construction phase.",
        ],
      },
    ],
  };

  const vastuShastraGuidline = {
    title: "Vastu Shastra Guidelines for Bhoomi Pujan Location",
    footer:
      "By adhering to these rituals and guidelines in 2025, the Bhoomi Pujan will bring divine blessings, prosperity, and success to the construction project, ensuring that the venture is built on a strong spiritual foundation.",
    description:
      "As per Vastu Shastra, performing the Bhoomi Pujan in the right location on the construction site is paramount for the prosperity and success of the building. Here are some important points to consider:",
    steps: [
      {
        title: "Ideal Direction ",
        details: [
          "The Bhoomi Pujan should be performed in the Northeast corner of the plot, which is considered the most auspicious direction. This direction is believed to invite positive energy and blessings from the divine.",
        ],
      },
      {
        title: "Avoid the South-West Corner",
        details: [
          "The South-West corner is not suitable for Bhoomi Pujan as it is associated with stability and is the zone for the main entrance or master bedroom. Performing the puja in this direction can disturb the flow of energy.",
        ],
      },
      {
        title: "Level Ground ",
        details: [
          "The area chosen for the puja should be flat and level. Uneven ground may affect the energy flow and could cause disruptions during the construction phase.",
        ],
      },
      {
        title: "Clean and Sacred Space ",
        details: [
          "Ensure that the site is clean and free from any negative energy. It's important to remove any debris, stones, or waste before performing the puja.",
        ],
      },
      {
        title: "Place the Kalash in the Right Spot ",
        details: [
          "The Kalash should be placed facing the east or north direction, as it attracts the most positive cosmic energies.",
        ],
      },
    ],
  };

  useEffect(() => {
    openLoader(dispatch, "bhoomi_muhrat");
    let request = {
      type: 'namkaran muhurat',
      year: moment().year(),
      lang: localStorage.getItem(Constatnt?.LANGUAGE_KEY)
    }
    dispatch(generateMuhuratBlogThunk(request))
  }, [])

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "bhoomi_muhrat" && (
        <Loader />
      )}
      <section>
        <CommonBanner
          // backgroundImage={namkaranBanner}
          text={t('namkaran_muharat')}
          highlight={new Date().getFullYear()}
        />
      </section>

      {/* <section>
        <div className=" container mx-auto paddingTop100 pb-10 flex flex-col gap-10">
          <CommonQuestionComp heading="" content={content2} />
         
        </div>
      </section> */}

      <section>
        <div className="container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10">
          <DynamicCard
            title={`Astrological Significance of Namkaran ${new Date().getFullYear()}`}
            introText=""
            data={muhratData}
            listStyle='decimal'
            dangerouslyPara={true}
          />

          {/* <GoldBuyingMuhuratcomp
            title="Astrological Significance of Namkaran"
            introText="In astrology, the timing of the Namkaran ceremony is of utmost importance. The following factors are considered to select the perfect time for the ritual:"
            data={muhratData}
            footerText=""
            listStyle="decimal"
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title="The Namkaran Ceremony: Rituals and Traditions"
            introText="In astrology, the timing of the Namkaran ceremony is of utmost importance. The following factors are considered to select the perfect time for the ritual:"
            data={namkaranCeremony}
            footerText=""
            listStyle="decimal"
          />

          <GoldBuyingMuhuratcomp
            title="Cultural Variations"
            introText="In astrology, the timing of the Namkaran ceremony is of utmost importance. The following factors are considered to select the perfect time for the ritual:"
            data={culturalVariation}
            footerText=""
            listStyle="decimal"
          />

          <DynamicCard
            title="Shubh Muhurat for Namkaran Sanskar in 2025"
            introText=""
            data={auspiciousDaysData}
            listStyle=""
          />

          <NamingMuhuratList muhuratData={muhuratDatas} />
          <GoldBuyingMuhuratcomp
            title="Important Observances to Follow at Namkaran Sanskar in 2025"
            introText="The core rituals for the Namkaran ceremony remain the same, but here are some important guidelines for a successful Namkaran Sanskar in 2025:"
            data={objNameSanskar}
            footerText=""
            listStyle="decimal"
          />
          <GoldBuyingMuhuratcomp
            title="Precautions Before Performing Namkaran Sanskar in 2025"
            introText=""
            data={precuBeforeName}
            footerText="This ritual marks the start of the child's journey in the world, and choosing the right name and timing is vital in ensuring that the child leads a life filled with love, prosperity, and success."
            listStyle="decimal"
          />
          <GoldBuyingMuhuratcomp
            title="Remedies for a Successful Namkaran Ceremony and Positive Future for the Child"
            introText=""
            data={remediesForName}
            footerText=""
            listStyle="decimal"
          /> */}
        </div>
      </section>


    </>
  );
}

export default NamkaranMuhurat;
