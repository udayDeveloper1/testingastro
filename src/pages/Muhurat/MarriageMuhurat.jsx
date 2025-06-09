import goldBuyingMuhurat from "../../assets/img/banner/goldBuyingMuhurat.webp";
import { useEffect, useState } from 'react'
import CommonBanner from '../../component/CommonBanner'
import CommonQuestionComp from '../../component/CommonQuestionComp'
import DynamicCard from '../../component/Dynemic/DynamicCard'
import NewsletterComp from '../../component/Homepage/NewsLatterComp'
import GoldBuyingMuhuratcomp from '../../component/Muhurat/GoldBuyingMuhuratcomp'
import Footer from '../../Layout/Footer'
import { generateMuhuratBlog } from '../../services/api/api.services'
import { useDispatch, useSelector } from 'react-redux'
import { Codes } from '../../utils/CommonVariable'
import { closeLoder, openLoader, TOAST_ERROR } from '../../utils/CommonFunction'
import { setMarriageMuhuratData } from '../../storemain/slice/muhuratDataSlice'
import moment from "moment";
import { Constatnt } from "../../utils/Constent";
import { generateMuhuratBlogThunk } from "../../storemain/slice/MasterSlice";
import Loader from "../../component/loader/Loader";
import { useTranslation } from "react-i18next";

function MarriageMuhurat() {

  // const marriageMuhuratData = useSelector(
  //   state => state.muhuratDataSlice.marriageMuhuratData
  // )

  const dispatch = useDispatch()
  const { t } = useTranslation();
  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector((state) => state?.masterSlice?.loader);

  const content1 = [
    'Marriage is a sacred union that brings together not only two individuals but also their families, cultures, and traditions. It is a life-altering commitment that is celebrated with joy and reverence. In the world of astrology, the concept of Marriage Muhurat holds immense importance, as it marks the most auspicious time to begin the lifelong journey of marriage. In 2025, couples and families will continue the time-honored tradition of selecting the perfect Muhurat for this joyous occasion, ensuring that the union is blessed with harmony, prosperity, and eternal love.',
    'A Marriage Muhurat is an astrologically calculated date and time deemed most favorable for weddings. This careful selection takes into account the positioning of celestial bodies, lunar phases, and astrological factors that align with the couple’s well-being and future. In 2025, astrologers have identified a series of auspicious dates and times to guide couples as they embark on this life-changing journey.'
  ]

  const muhuratData = [
    {
      title: 'Harmonious Astrological Influences',
      description:
        'A marriage performed at the right time ensures that the couple begins their married life under favorable planetary positions. This alignment is believed to bring peace, prosperity, and a smooth journey together.'
    },
    {
      title: 'Cultural and Spiritual Importance',
      description:
        "In many cultures, particularly in Hinduism, selecting an auspicious Muhurat for marriage is deeply rooted in tradition. It is believed that a wedding during a favorable Muhurat invites divine blessings, ensuring the couple's life together is prosperous and filled with joy."
    },
    {
      title: 'Minimizing Challenges',
      description:
        'By tying the knot during an auspicious Muhurat in 2025, couples believe they are reducing the likelihood of obstacles and hardships in their married life. This sacred time is seen as a divine moment where all cosmic energies align in favor of the couple’s happiness.'
    },
    {
      title: 'Strengthening Family Bonds',
      description:
        'The marriage Muhurat brings together families in a moment of shared celebration, creating strong familial and societal bonds. It is a time when the couple is surrounded by the blessings and good wishes of loved ones, fortifying the foundation of their relationship.'
    }
  ]

  const auspiciousDaysData = [
    {
      title: 'Dwitiya:',
      description:
        'Dwitiya is a prosperous day, symbolizing wealth and stability, making it an ideal choice for couples looking to start their married life on a solid foundation.'
    },
    {
      title: 'Tritiya:',
      description:
        'Known for its association with growth and balance, Tritiya is perfect for couples seeking a harmonious relationship based on mutual respect and understanding.'
    },
    {
      title: 'Panchami:',
      description:
        'A day associated with success and abundance, Panchami is ideal for couples desiring financial stability and a prosperous future together.'
    },
    {
      title: 'Saptami:',
      description:
        'Symbolizing marital bliss and happiness, Saptami is considered one of the most auspicious Tithis for weddings.'
    },
    {
      title: 'Ekadashi:',
      description:
        'While generally avoided for major activities, Ekadashi can sometimes be favorable for spiritual couples or those seeking inner growth and harmony in marriage.'
    },
    {
      title: 'Trayodashi:',
      description:
        'This day is considered highly auspicious for weddings, ensuring a prosperous and joyful married life for the couple.'
    }
  ]

  const nakshatraForMarrige = [
    {
      title: 'Rohini',
      description:
        'Known for its association with beauty, abundance, and fertility, Rohini is a highly favorable Nakshatra for marriage, ensuring a prosperous and happy life together.'
    },
    {
      title: 'Mrigashira',
      description:
        'Symbolizing curiosity and adaptability, Mrigashira promotes a marriage based on mutual understanding, trust, and harmony.'
    },
    {
      title: 'Magha',
      description:
        'This Nakshatra is linked with power, respect, and success, making it an ideal choice for couples who wish for a marriage filled with honor and prosperity.'
    },
    {
      title: 'Uttara Phalguni',
      description:
        'Associated with kindness, stability, and mutual support, Uttara Phalguni is perfect for a long-lasting, fulfilling partnership.'
    },
    {
      title: 'Swati',
      description:
        'A Nakshatra representing independence and strength, Swati ensures that both partners maintain their individuality while growing together in their shared journey.'
    },
    {
      title: 'Anuradha',
      description:
        'Signifying loyalty, devotion, and harmony, Anuradha is ideal for couples seeking a faithful and committed union.'
    },
    {
      title: 'Uttara Bhadrapada',
      description:
        'Known for its qualities of wisdom and peace, Uttara Bhadrapada brings stability and harmony to the marriage, ensuring a harmonious partnership.'
    }
  ]

  const content3 = [
    'As we look forward to 2025, several favorable dates and times have been identified for couples looking to marry. The following are some of the key Marriage Muhurat dates for 2025:'
  ]

  const goldMuhuratData = {
    January: [
      {
        title: 'January 16 (Thursday)',
        description: '04:06 AM - 07:15 AM (Magha, Chaturthi)'
      },
      { title: 'January 17 (Friday)', description: '07:15' },
      {
        title: 'January 18 (Saturday)',
        description: '02:51 PM - 01:16 AM (Jan 19) (Uttara Phalguni, Panchami)'
      },
      {
        title: 'January 19 (Sunday)',
        description: '01:58 AM - 07:14 AM (Hasta, Shashthi)'
      },
      {
        title: 'January 20 (Monday)',
        description: '07:14 AM - 09:58 AM (Hasta, Shashthi)'
      },
      {
        title: 'January 21 (Tuesday)',
        description: '11:36 PM - 03:50 AM (Jan 22) (Swati, Ashtami)'
      },
      {
        title: 'January 23 (Thursday)',
        description: '05:08 AM - 06:36 AM (Anuradha, Dashami)'
      },
      {
        title: 'January 24 (Friday)',
        description: '07:25 PM - 07:07 AM (Jan 25) (Anuradha, Ekadashi)'
      },
      {
        title: 'January 26 (Sunday)',
        description: '03:34 AM - 07:12 AM (Jan 27) (Mula, Trayodashi)'
      },
      {
        title: 'January 27 (Monday)',
        description: '07:12 AM - 09:02 AM (Mula, Trayodashi)'
      }
    ],
    February: [
      {
        title: 'February 2 (Sunday)',
        description:
          '09:14 AM - 07:08 AM (Feb 3) (Uttara Bhadrapada, Revati, Panchami)'
      },
      {
        title: 'February 3 (Monday)',
        description: '07:08 AM - 05:40 PM (Revati, Shashthi)'
      },
      {
        title: 'February 6 (Thursday)',
        description: '07:29 PM - 07:06 AM (Feb 7) (Rohini, Navami, Dashami)'
      },
      {
        title: 'February 7 (Friday)',
        description: '07:06 AM - 04:17 PM (Rohini, Dashami)'
      },
      {
        title: 'February 12 (Wednesday)',
        description: '01:58 AM - 07:01 AM (Feb 13) (Magha, Pratipada)'
      },
      {
        title: 'February 13 (Thursday)',
        description: '07:01 AM - 07:31 AM (Magha, Pratipada)'
      },
      {
        title: 'February 14 (Friday)',
        description: '11:09 PM - 06:59 AM (Feb 15) (Uttara Phalguni, Tritiya)'
      },
      {
        title: 'February 15 (Saturday)',
        description: '06:59 AM - 10:48 AM (Uttara Phalguni, Tritiya)'
      },
      {
        title: 'February 18 (Tuesday)',
        description: '02:59 AM - 06:56 AM (Feb 19) (Swati, Shashthi)'
      },
      {
        title: 'February 19 (Wednesday)',
        description: '06:56 AM - 07:32 AM (Swati, Saptami, Shashthi)'
      },
      {
        title: 'February 21 (Friday)',
        description: '11:59 AM - 03:54 PM (Anuradha, Navami)'
      },
      {
        title: 'February 23 (Sunday)',
        description: '01:55 PM - 06:43 PM (Mula, Ekadashi)'
      },
      {
        title: 'February 25 (Tuesday)',
        description:
          '08:15 AM - 06:31 PM (Uttara Ashadha, Dwadashi, Trayodashi)'
      }
    ],
    march: [
      {
        title: '',
        description: 'there are no auspicious dates available for weddings.'
      }
    ]
  }

  const parseMarkdownSections = markdown => {
    // const parts = markdown.split(/\*\*(.*?)\*\*/).filter(Boolean)

    // const result = []
    // for (let i = 0; i < parts.length; i += 2) {
    //   const title = parts[i].trim()
    //   let description = (parts[i + 1] || '').trim()

    //   // Replace markdown list and newlines with HTML
    //   description = description
    //     .replace(/\n\s*-\s*\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    //     .replace(/\n\s*-\s*/g, '')
    //     .replace(
    //       /\n\d+\.\s*\*\*(.*?)\*\*/g,
    //       (match, p1) =>
    //         `${match.trim().replace(`**${p1}**`, `<strong>${p1}</strong>`)}`
    //     )
    //     .replace(/\n\d+\.\s*/g, '$&')
    //     .replace(/\n/g, '<br>')

    //   result.push({
    //     title,
    //     description
    //   })
    // }
    const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdown));
    return sanitizedHTML
  }

  const getData = async () => {
    try {
      // const payload = {
      //   type: 'marriage',
      //   year: `${new Date().getFullYear()}`
      // }
      // const response = await generateMuhuratBlog(payload)
      // if (response.code === Codes.SUCCESS) {
      //   console.log(response.data);

      //   const parsed = parseMarkdownSections(response.data)
      //   dispatch(setMarriageMuhuratData(parsed))
      // } else {
      //   TOAST_ERROR(response.message)
      // }
      let data = `**Marriage Muhurat 2025: Your Guide to Choosing the Perfect Wedding Date**
Hey there, future newlyweds! Planning your big day can be both exhilarating and overwhelming, but fear not, I've got you covered with some practical tips on picking the best date for your wedding in 2025. Let's dive in!

**Why Does the Wedding Date Matter?**

Choosing the right marriage muhurat can have a real impact on the success and happiness of your marriage. It sets the tone for your future life together and can influence the energy and vibes surrounding your special day.

**Best Marriage Muhurat Dates in 2025**

Here are some of the most auspicious dates for tying the knot in 2025:

- **May 17th**: This date is aligned with positive planetary energies that signify harmony and love.
- **June 21st**: A great day for a wedding as it symbolizes growth, prosperity, and new beginnings.
- **September 5th**: Perfect for couples seeking stability and long-lasting love.

**Why Are These Dates Special?**

Each of these dates is considered auspicious due to their alignment with celestial energies that promote love, harmony, and prosperity. By choosing one of these dates, you are setting a strong foundation for your future together.

**Tips for Choosing Your Wedding Date**

1. **Consider Personal Significance**: Choose a date that holds special meaning for you as a couple, such as the anniversary of your first date or a significant milestone.
   
2. **Consult with Elders**: Seek advice from family members or elders who may have insights into auspicious dates or traditions that hold importance for your culture or heritage.
   
3. **Check for Conflicts**: Make sure there are no major events, holidays, or conflicting planetary positions on your chosen date that could disrupt the harmony of your wedding day.

**In Conclusion**

Your wedding day is a celebration of love, commitment, and joy. By selecting an auspicious marriage muhurat in 2025, you are setting the stage for a harmonious and prosperous future together. Trust your instincts, consider the tips provided, and most importantly, remember that the most important thing is the love you share with your partner. Happy planning and here's to a lifetime of happiness together!`
      const parsed = parseMarkdownSections(data)
      dispatch(setMarriageMuhuratData(parsed))
    } catch (error) {
      // TOAST_ERROR(error.message)
    }
  }

  useEffect(() => {
    openLoader(dispatch, "marrige_muhrat");
    let request = {
      type: 'marriage',
      year: moment().year(),
      lang: localStorage.getItem(Constatnt?.LANGUAGE_KEY)
    }
    dispatch(generateMuhuratBlogThunk(request))
  }, [])

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "marrige_muhrat" && (
        <Loader />
      )}
      <section>
        <CommonBanner text={t('marrige_muharat')} highlight={new Date().getFullYear()} />
      </section>

      {/* <section>
        <div className=' container mx-auto paddingTop100 pb-10 flex flex-col gap-10'>
          <CommonQuestionComp heading='' content={content1} />
        </div>
      </section> */}

      <section>
        <div className=' container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>

          {/* <DynamicCard
            title={`Why Choosing a Marriage Muhurat in ${new Date().getFullYear()} is Important`}
            introText="The marriage Muhurat is more than just a date—it is a moment that aligns the energies of the stars and planets with the couple’s union. Here's why selecting the right Muhurat in 2025 is of utmost importance:"
            data={marriageMuhuratData}
            listStyle='decimal'
            dangerouslyPara={true}
          /> */}

          <DynamicCard
            title={`${t('marrige_muharat')} ${new Date().getFullYear()}`}
            introText=""
            data={muhratData}
            listStyle='decimal'
            dangerouslyPara={true}
          />

          {/* <DynamicCard
            title='Favorable Dates and Tithis for Marriage in 2025'
            introText='The Tithi (lunar day) also plays an important role in selecting a wedding date. Certain Tithis are believed to be more favorable for marriages, promoting happiness, wealth, and harmony. In 2025, these Tithis are considered especially beneficial:'
            data={auspiciousDaysData}
            listStyle='decimal'
          />

          <CommonQuestionComp
            heading='Marriage Muhurat in 2025: Key Dates and Times'
            content={content3}
          />
          {Object.keys(goldMuhuratData).map((month, index) => (
            <GoldBuyingMuhuratcomp
              key={index}
              title={`${month} 2025`}
              data={goldMuhuratData[month]}
            />
          ))}
          <DynamicCard
            title='Auspicious Nakshatras for Marriage in 2025'
            introText='The Nakshatras (lunar constellations) play a important role in determining the best time for weddings. Certain Nakshatras are believed to be more favorable for marriages, bringing success and happiness to the couple’s life. In 2025, the following Nakshatras are considered especially auspicious:'
            data={auspiciousDaysData}
            listStyle='decimal'
          /> */}
        </div>
      </section>
    </>
  )
}

export default MarriageMuhurat
