import { useLocation } from 'react-router'
import { UpdatedPaths } from './routers/Paths'
import { LanguageOption } from './utils/CommonVariable'
import { Constatnt } from './utils/Constent'
import { SEOTITLE } from './utils/CommonFunction'
import React from 'react'
// import { PATHS } from './routers/Paths'

 const SEO = () => {
  const location = useLocation()
  const PATHS = UpdatedPaths()
  const currentLang = localStorage.getItem(Constatnt.LANGUAGE_KEY) || LanguageOption.ENGLISH

  let defaultTitle = {
    en: {
      title: 'Chat My Astrologer - Talk to the Best Astrologers Online',
      description: 'Get accurate astrology predictions, horoscope readings, kundli matching and personal consultations with expert astrologers.',
      keyword: 'online astrologer, talk to astrologer, live astrology consultation, kundli matching, horoscope, astrology prediction, Chat My Astrologer'
    },
    hi: {
      title: 'Chat My Astrologer - शीर्ष ज्योतिषियों से ऑनलाइन बात करें',
      description: 'विशेषज्ञ ज्योतिषियों से सटीक भविष्यवाणी, राशिफल, कुंडली मिलान और व्यक्तिगत परामर्श प्राप्त करें।',
      keyword: 'ऑनलाइन ज्योतिषी, ज्योतिषी से बात करें, लाइव ज्योतिष परामर्श, कुंडली मिलान, राशिफल, ज्योतिष भविष्यवाणी, Chat My Astrologer'
    },
    gu: {
      title: 'Chat My Astrologer - શ્રેષ્ઠ જ્યોતિષીઓ સાથે ઑનલાઇન વાત કરો',
      description: 'નિષ્ણાત જ્યોતિષીઓ પાસેથી ચોક્કસ ભવિષ્યવાણી, રાશિફળ, કુંડળી મેળવણી અને વ્યક્તિગત સલાહ મેળવો.',
      keyword: 'ઑનલાઇન જ્યોતિષી, જ્યોતિષી સાથે વાત કરો, લાઇવ જ્યોતિષ સલાહ, કુંડળી મેળવણી, રાશિફળ, જ્યોતિષ ભવિષ્યવાણી, Chat My Astrologer'
    }
  }

  const tagArray = [
    {
      routername: PATHS?.LOGIN,
      en: {
        title: 'Login - Chat My Astrologer',
        description: 'Access your Chat My Astrologer account to get personalized astrology insights and consultations.',
        keyword: 'login, astrologer chat login, user login, Chat My Astrologer'
      },
      hi: {
        title: 'लॉगिन - Chat My Astrologer',
        description: 'अपना Chat My Astrologer अकाउंट एक्सेस करें और व्यक्तिगत ज्योतिष सलाह प्राप्त करें।',
        keyword: 'लॉगिन, ज्योतिषी चैट लॉगिन, यूजर लॉगिन, Chat My Astrologer'
      },
      gu: {
        title: 'લૉગિન - Chat My Astrologer',
        description: 'તમારું Chat My Astrologer એકાઉન્ટ ઍક્સેસ કરો અને વ્યક્તિગત જ્યોતિષ સલાહ મેળવો.',
        keyword: 'લૉગિન, જ્યોતિષી ચેટ લૉગિન, યુઝર લૉગિન, Chat My Astrologer'
      }
    },
    {
      routername: PATHS?.HOMEPAGE,
      en: {
        title: 'Best Online Astrology Services - Chat My Astrologer',
        description: 'Get accurate astrology predictions, horoscopes, kundli matching and consultations with top astrologers.',
        keyword: 'online astrology, horoscope, kundli matching, astrologer chat'
      },
      hi: {
        title: 'सर्वश्रेष्ठ ऑनलाइन ज्योतिष सेवाएं - Chat My Astrologer',
        description: 'शीर्ष ज्योतिषियों से सटीक भविष्यवाणी, कुंडली मिलान और परामर्श प्राप्त करें।',
        keyword: 'ऑनलाइन ज्योतिष, राशिफल, कुंडली मिलान, ज्योतिषी चैट'
      },
      gu: {
        title: 'શ્રેષ્ઠ ઑનલાઇન જ્યોતિષ સેવાઓ - Chat My Astrologer',
        description: 'ટોચના જ્યોતિષીઓ પાસેથી ચોક્કસ ભવિષ્યવાણી, કુંડળી મેળવણી અને સલાહ મેળવો.',
        keyword: 'ઑનલાઇન જ્યોતિષ, રાશિફળ, કુંડળી મેળવણી, જ્યોતિષી ચેટ'
      }
    },
    {
      routername: PATHS?.TALKWITHASTROLOGER,
      en: {
        title: 'Talk with Astrologer Online | Live Astrology Consultation',
        description: 'Get instant solutions to your problems through live call with expert astrologers.',
        keyword: 'talk to astrologer, live astrology consultation, call astrologer'
      },
      hi: {
        title: 'ज्योतिषी से बात करें | लाइव ज्योतिष परामर्श',
        description: 'विशेषज्ञ ज्योतिषियों के साथ लाइव कॉल के माध्यम से अपनी समस्याओं का तत्काल समाधान प्राप्त करें।',
        keyword: 'ज्योतिषी से बात, लाइव ज्योतिष सलाह, ज्योतिषी को कॉल'
      },
      gu: {
        title: 'જ્યોતિષી સાથે વાત કરો | લાઇવ જ્યોતિષ સલાહ',
        description: 'નિષ્ણાત જ્યોતિષીઓ સાથે લાઇવ કોલ દ્વારા તમારી સમસ્યાઓનું તાત્કાલિક સમાધાન મેળવો.',
        keyword: 'જ્યોતિષી સાથે વાત, લાઇવ જ્યોતિષ સલાહ, જ્યોતિષીને કોલ'
      }
    },
    {
      routername: PATHS?.CHATWITHASTROLOGERS,
      en: {
        title: 'Chat with Astrologers Online | 24/7 Astrology Help',
        description: 'Chat with expert astrologers anytime for personalized astrology guidance and solutions.',
        keyword: 'chat with astrologer, online astrology chat, astrology help'
      },
      hi: {
        title: 'ज्योतिषियों से चैट करें | 24/7 ज्योतिष सहायता',
        description: 'व्यक्तिगत ज्योतिष मार्गदर्शन और समाधान के लिए किसी भी समय विशेषज्ञ ज्योतिषियों से चैट करें।',
        keyword: 'ज्योतिषी से चैट, ऑनलाइन ज्योतिष चैट, ज्योतिष सहायता'
      },
      gu: {
        title: 'જ્યોતિષીઓ સાથે ચેટ કરો | 24/7 જ્યોતિષ સહાય',
        description: 'વ્યક્તિગત જ્યોતિષ માર્ગદર્શન અને સમાધાન માટે કોઈપણ સમયે નિષ્ણાત જ્યોતિષીઓ સાથે ચેટ કરો.',
        keyword: 'જ્યોતિષી સાથે ચેટ, ઑનલાઇન જ્યોતિષ ચેટ, જ્યોતિષ સહાય'
      }
    },
    {
      routername: PATHS?.FREEKUNDALI,
      en: {
        title: 'Free Kundli Online | Birth Chart Analysis',
        description: 'Generate your free kundli online and get detailed birth chart analysis with predictions.',
        keyword: 'free kundli, birth chart, horoscope chart, kundli online'
      },
      hi: {
        title: 'मुफ्त कुंडली ऑनलाइन | जन्म कुंडली विश्लेषण',
        description: 'अपनी मुफ्त कुंडली ऑनलाइन बनाएं और भविष्यवाणियों के साथ विस्तृत जन्म कुंडली विश्लेषण प्राप्त करें।',
        keyword: 'मुफ्त कुंडली, जन्म कुंडली, राशिफल चार्ट, ऑनलाइन कुंडली'
      },
      gu: {
        title: 'મફત કુંડળી ઑનલાઇન | જન્મ કુંડળી વિશ્લેષણ',
        description: 'તમારી મફત કુંડળી ઑનલાઇન જનરેટ કરો અને ભવિષ્યવાણી સાથે વિસ્તૃત જન્મ કુંડળી વિશ્લેષણ મેળવો.',
        keyword: 'મફત કુંડળી, જન્મ કુંડળી, રાશિફળ ચાર્ટ, ઑનલાઇન કુંડળી'
      }
    },
    {
      routername: PATHS?.KUNDALI_MATCHING,
      en: {
        title: 'Kundali Matching for Marriage | Horoscope Compatibility',
        description: 'Check marriage compatibility through detailed kundali matching and get accurate gun milan results.',
        keyword: 'kundali matching, horoscope matching, marriage compatibility, gun milan'
      },
      hi: {
        title: 'विवाह के लिए कुंडली मिलान | राशिफल अनुकूलता',
        description: 'विस्तृत कुंडली मिलान के माध्यम से विवाह अनुकूलता की जांच करें और सटीक गुण मिलान परिणाम प्राप्त करें।',
        keyword: 'कुंडली मिलान, राशिफल मिलान, विवाह अनुकूलता, गुण मिलान'
      },
      gu: {
        title: 'લગ્ન માટે કુંડળી મેળવણી | રાશિફળ સુસંગતતા',
        description: 'વિસ્તૃત કુંડળી મેળવણી દ્વારા લગ્ન સુસંગતતા તપાસો અને ચોક્કસ ગુણ મિલન પરિણામો મેળવો.',
        keyword: 'કુંડળી મેળવણી, રાશિફળ મેળવણી, લગ્ન સુસંગતતા, ગુણ મિલન'
      }
    },
    {
      routername: PATHS?.KUNDALI_MATCHING_REPORT,
      en: {
        title: 'Kundali Matching Report | Marriage Compatibility Analysis',
        description: 'Detailed kundali matching report with 36 gunas analysis for marriage compatibility.',
        keyword: 'kundali matching report, marriage report, gun milan report'
      },
      hi: {
        title: 'कुंडली मिलान रिपोर्ट | विवाह अनुकूलता विश्लेषण',
        description: 'विवाह अनुकूलता के लिए 36 गुणों के विश्लेषण के साथ विस्तृत कुंडली मिलान रिपोर्ट।',
        keyword: 'कुंडली मिलान रिपोर्ट, विवाह रिपोर्ट, गुण मिलान रिपोर्ट'
      },
      gu: {
        title: 'કુંડળી મેળવણી અહેવાલ | લગ્ન સુસંગતતા વિશ્લેષણ',
        description: 'લગ્ન સુસંગતતા માટે 36 ગુણોના વિશ્લેષણ સાથે વિસ્તૃત કુંડળી મેળવણી અહેવાલ.',
        keyword: 'કુંડળી મેળવણી અહેવાલ, લગ્ન અહેવાલ, ગુણ મિલન અહેવાલ'
      }
    },
    {
      routername: PATHS?.HOROSCOPE,
      en: {
        title: "Today's Horoscope | Daily Astrology Predictions",
        description: "Read your daily horoscope predictions for all zodiac signs. Get accurate daily astrology guidance.",
        keyword: "daily horoscope, today's horoscope, zodiac predictions, astrology forecast"
      },
      hi: {
        title: "आज का राशिफल | दैनिक ज्योतिष भविष्यवाणी",
        description: "सभी राशियों के लिए अपना दैनिक राशिफल पढ़ें। सटीक दैनिक ज्योतिष मार्गदर्शन प्राप्त करें।",
        keyword: "दैनिक राशिफल, आज का राशिफल, राशि भविष्यवाणी, ज्योतिष पूर्वानुमान"
      },
      gu: {
        title: "આજનું રાશિફળ | દૈનિક જ્યોતિષ ભવિષ્યવાણી",
        description: "બધા રાશિઓ માટે તમારું દૈનિક રાશિફળ વાંચો. ચોક્કસ દૈનિક જ્યોતિષ માર્ગદર્શન મેળવો.",
        keyword: "દૈનિક રાશિફળ, આજનું રાશિફળ, રાશિ ભવિષ્યવાણી, જ્યોતિષ અંદાજ"
      }
    },
    {
      routername: PATHS?.YEARLY_SINGLE_HOROSCOPE,
      en: {
        title: "Yearly Horoscope | Zodiac Sign Predictions for [name]",
        description: "Get detailed yearly horoscope predictions for your zodiac sign [name]. Plan your year with astrology guidance.",
        keyword: "yearly horoscope, zodiac predictions, astrology forecast, [name] horoscope"
      },
      hi: {
        title: "वार्षिक राशिफल | [name] राशि के लिए भविष्यवाणी",
        description: "अपनी राशि [name] के लिए विस्तृत वार्षिक राशिफल भविष्यवाणियां प्राप्त करें। ज्योतिष मार्गदर्शन के साथ अपने वर्ष की योजना बनाएं।",
        keyword: "वार्षिक राशिफल, राशि भविष्यवाणी, ज्योतिष पूर्वानुमान, [name] राशिफल"
      },
      gu: {
        title: "વાર્ષિક રાશિફળ | [name] રાશિ માટે ભવિષ્યવાણી",
        description: "તમારી રાશિ [name] માટે વિસ્તૃત વાર્ષિક રાશિફળ ભવિષ્યવાણીઓ મેળવો. જ્યોતિષ માર્ગદર્શન સાથે તમારા વર્ષની યોજના બનાવો.",
        keyword: "વાર્ષિક રાશિફળ, રાશિ ભવિષ્યવાણી, જ્યોતિષ અંદાજ, [name] રાશિફળ"
      }
    },
    {
      routername: PATHS?.YEARLY_HOROSCOPE,
      en: {
        title: "Yearly Horoscope 2024 | Zodiac Sign Predictions",
        description: "Get complete yearly horoscope predictions for all 12 zodiac signs. Plan your year with astrology.",
        keyword: "yearly horoscope 2024, zodiac predictions, astrology forecast, yearly astrology"
      },
      hi: {
        title: "वार्षिक राशिफल 2024 | सभी 12 राशियों की भविष्यवाणी",
        description: "सभी 12 राशियों के लिए पूर्ण वार्षिक राशिफल भविष्यवाणियां प्राप्त करें। ज्योतिष के साथ अपने वर्ष की योजना बनाएं।",
        keyword: "वार्षिक राशिफल 2024, राशि भविष्यवाणी, ज्योतिष पूर्वानुमान, वार्षिक ज्योतिष"
      },
      gu: {
        title: "વાર્ષિક રાશિફળ 2024 | બધી 12 રાશિઓની ભવિષ્યવાણી",
        description: "બધી 12 રાશિઓ માટે સંપૂર્ણ વાર્ષિક રાશિફળ ભવિષ્યવાણીઓ મેળવો. જ્યોતિષ સાથે તમારા વર્ષની યોજના બનાવો.",
        keyword: "વાર્ષિક રાશિફળ 2024, રાશિ ભવિષ્યવાણી, જ્યોતિષ અંદાજ, વાર્ષિક જ્યોતિષ"
      }
    },
    {
      routername: PATHS?.TODAYS_SINGLE_HOROSCOPE,
      en: {
        title: "Today's Horoscope for [name] | Daily Predictions",
        description: "Get your personalized daily horoscope predictions for [name] zodiac sign. Know what the stars have in store for you today.",
        keyword: "daily horoscope, today's predictions, [name] horoscope, zodiac forecast"
      },
      hi: {
        title: "[name] राशि का आज का राशिफल | दैनिक भविष्यवाणी",
        description: "[name] राशि के लिए अपना व्यक्तिगत दैनिक राशिफल प्राप्त करें। जानें कि आज आपके लिए तारों में क्या छिपा है।",
        keyword: "दैनिक राशिफल, आज की भविष्यवाणी, [name] राशिफल, राशि पूर्वानुमान"
      },
      gu: {
        title: "[name] રાશિ માટે આજનું રાશિફળ | દૈનિક ભવિષ્યવાણી",
        description: "[name] રાશિ માટે તમારું વ્યક્તિગત દૈનિક રાશિફળ મેળવો. જાણો કે આજે તારાઓમાં તમારા માટે શું છે.",
        keyword: "દૈનિક રાશિફળ, આજની ભવિષ્યવાણી, [name] રાશિફળ, રાશિ અંદાજ"
      }
    },
    {
      routername: PATHS?.WEEKLY_SINGLE_HOROSCOPE,
      en: {
        title: "Weekly Horoscope for [name] | 7-Day Predictions",
        description: "Get your weekly horoscope predictions for [name] zodiac sign. Plan your week with astrology guidance.",
        keyword: "weekly horoscope, zodiac predictions, [name] horoscope, weekly astrology"
      },
      hi: {
        title: "[name] राशि का साप्ताहिक राशिफल | 7-दिन की भविष्यवाणी",
        description: "[name] राशि के लिए अपना साप्ताहिक राशिफल प्राप्त करें। ज्योतिष मार्गदर्शन के साथ अपने सप्ताह की योजना बनाएं।",
        keyword: "साप्ताहिक राशिफल, राशि भविष्यवाणी, [name] राशिफल, साप्ताहिक ज्योतिष"
      },
      gu: {
        title: "[name] રાશિ માટે સાપ્તાહિક રાશિફળ | 7-દિવસની ભવિષ્યવાણી",
        description: "[name] રાશિ માટે તમારું સાપ્તાહિક રાશિફળ મેળવો. જ્યોતિષ માર્ગદર્શન સાથે તમારા સપ્તાહની યોજના બનાવો.",
        keyword: "સાપ્તાહિક રાશિફળ, રાશિ ભવિષ્યવાણી, [name] રાશિફળ, સાપ્તાહિક જ્યોતિષ"
      }
    },
    {
      routername: PATHS?.WEEKLY_HOROSCOPE,
      en: {
        title: "Weekly Horoscope | Zodiac Sign Predictions",
        description: "Get complete weekly horoscope predictions for all 12 zodiac signs. Plan your week with astrology.",
        keyword: "weekly horoscope, zodiac predictions, astrology forecast, weekly astrology"
      },
      hi: {
        title: "साप्ताहिक राशिफल | सभी 12 राशियों की भविष्यवाणी",
        description: "सभी 12 राशियों के लिए पूर्ण साप्ताहिक राशिफल भविष्यवाणियां प्राप्त करें। ज्योतिष के साथ अपने सप्ताह की योजना बनाएं।",
        keyword: "साप्ताहिक राशिफल, राशि भविष्यवाणी, ज्योतिष पूर्वानुमान, साप्ताहिक ज्योतिष"
      },
      gu: {
        title: "સાપ્તાહિક રાશિફળ | બધી 12 રાશિઓની ભવિષ્યવાણી",
        description: "બધી 12 રાશિઓ માટે સંપૂર્ણ સાપ્તાહિક રાશિફળ ભવિષ્યવાણીઓ મેળવો. જ્યોતિષ સાથે તમારા સપ્તાહની યોજના બનાવો.",
        keyword: "સાપ્તાહિક રાશિફળ, રાશિ ભવિષ્યવાણી, જ્યોતિષ અંદાજ, સાપ્તાહિક જ્યોતિષ"
      }
    },
    {
      routername: PATHS?.ALL_HOROSCOPE_DETAILS,
      en: {
        title: "[name] Horoscope | [type] Predictions",
        description: "Get detailed [type] horoscope predictions for [name] zodiac sign. Accurate astrology guidance.",
        keyword: "[name] horoscope, [type] predictions, zodiac forecast, astrology"
      },
      hi: {
        title: "[name] राशिफल | [type] भविष्यवाणी",
        description: "[name] राशि के लिए विस्तृत [type] राशिफल भविष्यवाणियां प्राप्त करें। सटीक ज्योतिष मार्गदर्शन।",
        keyword: "[name] राशिफल, [type] भविष्यवाणी, राशि पूर्वानुमान, ज्योतिष"
      },
      gu: {
        title: "[name] રાશિફળ | [type] ભવિષ્યવાણી",
        description: "[name] રાશિ માટે વિસ્તૃત [type] રાશિફળ ભવિષ્યવાણીઓ મેળવો. ચોક્કસ જ્યોતિષ માર્ગદર્શન.",
        keyword: "[name] રાશિફળ, [type] ભવિષ્યવાણી, રાશિ અંદાજ, જ્યોતિષ"
      }
    },
    {
      routername: PATHS?.COMPATABILITY,
      en: {
        title: "Love Compatibility Calculator | Zodiac Sign Match",
        description: "Check love compatibility between two zodiac signs. Get detailed relationship analysis and compatibility score.",
        keyword: "love compatibility, zodiac match, relationship compatibility, astrology calculator"
      },
      hi: {
        title: "प्रेम अनुकूलता कैलकुलेटर | राशि चक्र मिलान",
        description: "दो राशियों के बीच प्रेम अनुकूलता की जांच करें। विस्तृत संबंध विश्लेषण और अनुकूलता स्कोर प्राप्त करें।",
        keyword: "प्रेम अनुकूलता, राशि मिलान, संबंध अनुकूलता, ज्योतिष कैलकुलेटर"
      },
      gu: {
        title: "પ્રેમ સુસંગતતા કેલ્ક્યુલેટર | રાશિ ચક્ર મેળ",
        description: "બે રાશિઓ વચ્ચે પ્રેમ સુસંગતતા તપાસો. વિસ્તૃત સંબંધ વિશ્લેષણ અને સુસંગતતા સ્કોર મેળવો.",
        keyword: "પ્રેમ સુસંગતતા, રાશિ મેળ, સંબંધ સુસંગતતા, જ્યોતિષ કેલ્ક્યુલેટર"
      }
    },
    {
      routername: PATHS?.FESTIVAL_CALENDER,
      en: {
        title: "Hindu Festival Calendar 2024 | Astrological Dates",
        description: "Complete list of Hindu festivals, holidays and auspicious dates with astrological significance.",
        keyword: "festival calendar, Hindu festivals, auspicious dates, astrological dates"
      },
      hi: {
        title: "हिंदू त्योहार कैलेंडर 2024 | ज्योतिषीय तिथियां",
        description: "ज्योतिषीय महत्व के साथ हिंदू त्योहारों, छुट्टियों और शुभ तिथियों की पूरी सूची।",
        keyword: "त्योहार कैलेंडर, हिंदू त्योहार, शुभ तिथियां, ज्योतिषीय तिथियां"
      },
      gu: {
        title: "હિંદુ તહેવાર કેલેન્ડર 2024 | જ્યોતિષી તારીખો",
        description: "જ્યોતિષી મહત્વ સાથે હિંદુ તહેવારો, રજાઓ અને શુભ તારીખોની સંપૂર્ણ યાદી.",
        keyword: "તહેવાર કેલેન્ડર, હિંદુ તહેવારો, શુભ તારીખો, જ્યોતિષી તારીખો"
      }
    },
    {
      routername: PATHS?.GOLD_BUYING_MUHURAT,
      en: {
        title: "Best Muhurat to Buy Gold | Auspicious Timings",
        description: "Find the most auspicious dates and timings to buy gold according to Vedic astrology.",
        keyword: "gold buying muhurat, auspicious time for gold, shubh time for gold, astrology muhurat"
      },
      hi: {
        title: "सोना खरीदने का शुभ मुहूर्त | शुभ समय",
        description: "वैदिक ज्योतिष के अनुसार सोना खरीदने के लिए सबसे शुभ तिथियां और समय जानें।",
        keyword: "सोना खरीदने का मुहूर्त, सोने का शुभ समय, सोने का शुभ मुहूर्त, ज्योतिष मुहूर्त"
      },
      gu: {
        title: "સોનું ખરીદવા માટે શ્રેષ્ઠ મુહૂર્ત | શુભ સમય",
        description: "વૈદિક જ્યોતિષ મુજબ સોનું ખરીદવા માટે સૌથી શુભ તારીખો અને સમય શોધો.",
        keyword: "સોનું ખરીદવાનો મુહૂર્ત, સોનાનો શુભ સમય, સોનાનો શુભ મુહૂર્ત, જ્યોતિષ મુહૂર્ત"
      }
    },
    {
      routername: PATHS?.MARRIAGE_MUHURAT,
      en: {
        title: "Marriage Muhurat 2024 | Wedding Auspicious Dates",
        description: "Find the best dates and timings for marriage according to Hindu astrology and panchang.",
        keyword: "marriage muhurat, wedding dates, shubh vivah muhurat, marriage astrology"
      },
      hi: {
        title: "विवाह मुहूर्त 2024 | शादी की शुभ तिथियां",
        description: "हिंदू ज्योतिष और पंचांग के अनुसार विवाह के लिए सर्वोत्तम तिथियां और समय जानें।",
        keyword: "विवाह मुहूर्त, शादी की तिथियां, शुभ विवाह मुहूर्त, विवाह ज्योतिष"
      },
      gu: {
        title: "લગ્ન મુહૂર્ત 2024 | લગ્નની શુભ તારીખો",
        description: "હિંદુ જ્યોતિષ અને પંચાંગ મુજબ લગ્ન માટે શ્રેષ્ઠ તારીખો અને સમય શોધો.",
        keyword: "લગ્ન મુહૂર્ત, લગ્નની તારીખો, શુભ લગ્ન મુહૂર્ત, લગ્ન જ્યોતિષ"
      }
    },
    {
      routername: PATHS?.BHUMIPUJA_MUHURAT,
      en: {
        title: "Bhoomi Pujan Muhurat | Land Worship Auspicious Time",
        description: "Find the most auspicious dates and timings for Bhoomi Pujan according to Vedic astrology.",
        keyword: "bhoomi pujan muhurat, land worship time, shubh time for bhoomi puja, astrology muhurat"
      },
      hi: {
        title: "भूमि पूजन मुहूर्त | भूमि पूजा का शुभ समय",
        description: "वैदिक ज्योतिष के अनुसार भूमि पूजन के लिए सबसे शुभ तिथियां और समय जानें।",
        keyword: "भूमि पूजन मुहूर्त, भूमि पूजा का समय, भूमि पूजा का शुभ मुहूर्त, ज्योतिष मुहूर्त"
      },
      gu: {
        title: "ભૂમિ પૂજન મુહૂર્ત | જમીન પૂજા શુભ સમય",
        description: "વૈદિક જ્યોતિષ મુજબ ભૂમિ પૂજન માટે સૌથી શુભ તારીખો અને સમય શોધો.",
        keyword: "ભૂમિ પૂજન મુહૂર્ત, જમીન પૂજા સમય, ભૂમિ પૂજાનો શુભ મુહૂર્ત, જ્યોતિષ મુહૂર્ત"
      }
    },
    {
      routername: PATHS?.NAMKARAN_MUHURAT,
      en: {
        title: "Namkaran Muhurat | Baby Naming Ceremony Dates",
        description: "Find auspicious dates and timings for Namkaran ceremony (baby naming) according to Hindu astrology.",
        keyword: "namkaran muhurat, baby naming dates, shubh time for namkaran, astrology muhurat"
      },
      hi: {
        title: "नामकरण मुहूर्त | बच्चे का नाम रखने की शुभ तिथियां",
        description: "हिंदू ज्योतिष के अनुसार नामकरण संस्कार (बच्चे का नाम रखने) के लिए शुभ तिथियां और समय जानें।",
        keyword: "नामकरण मुहूर्त, बच्चे का नाम रखने की तिथियां, नामकरण का शुभ समय, ज्योतिष मुहूर्त"
      },
      gu: {
        title: "નામકરણ મુહૂર્ત | બાળકનું નામ આપવાની શુભ તારીખો",
        description: "હિંદુ જ્યોતિષ મુજબ નામકરણ સંસ્કાર (બાળકનું નામ આપવું) માટે શુભ તારીખો અને સમય શોધો.",
        keyword: "નામકરણ મુહૂર્ત, બાળકનું નામ આપવાની તારીખો, નામકરણનો શુભ સમય, જ્યોતિષ મુહૂર્ત"
      }
    },
    {
      routername: PATHS?.CARBIKE_MUHURAT,
      en: {
        title: "Car/Bike Purchase Muhurat | Vehicle Buying Dates",
        description: "Find auspicious dates and timings to buy new car or bike according to Hindu astrology.",
        keyword: "car muhurat, bike muhurat, vehicle purchase dates, shubh time to buy car"
      },
      hi: {
        title: "कार/बाइक खरीदने का मुहूर्त | वाहन खरीदने की शुभ तिथियां",
        description: "हिंदू ज्योतिष के अनुसार नई कार या बाइक खरीदने के लिए शुभ तिथियां और समय जानें।",
        keyword: "कार मुहूर्त, बाइक मुहूर्त, वाहन खरीदने की तिथियां, कार खरीदने का शुभ समय"
      },
      gu: {
        title: "કાર/બાઈક ખરીદવા માટે મુહૂર્ત | વાહન ખરીદવાની શુભ તારીખો",
        description: "હિંદુ જ્યોતિષ મુજબ નવી કાર અથવા બાઈક ખરીદવા માટે શુભ તારીખો અને સમય શોધો.",
        keyword: "કાર મુહૂર્ત, બાઈક મુહૂર્ત, વાહન ખરીદવાની તારીખો, કાર ખરીદવાનો શુભ સમય"
      }
    }]

  const matchedRoute = tagArray?.find(tag => {
    return tag.routername === location?.pathname;
  });

  // const matchedRoute = tagArray?.find(tag => tag.routername === location?.pathname)
  const metaData = matchedRoute ? matchedRoute[currentLang] || matchedRoute[currentLang] : defaultTitle[currentLang]

  return (
    <>
      <div>
        <SEOTITLE
          title={metaData?.title}
          description={metaData?.description}
          keyword={metaData?.keyword}
        />
      </div>
    </>
  )
}

export default React.memo(SEO)