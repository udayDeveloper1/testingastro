import { Typography } from "antd";
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;
function KalsarpDoshaSection({ KaalsarpDosh }) {
  const { t } = useTranslation()

  return (
    <>
      <Typography className="flex flex-col gap-6 mt-5">
        {/* --- Section Title --- */}
        <div>
          <Title level={4} className="!mb-0">
            <span className="website_color commonQuesH2">
              {t('kalsharp_dosh_analysis')}
            </span>
          </Title>
        </div>

        <div className={`p-4 rounded-md flex items-center gap-4 border ${KaalsarpDosh?.is_dosha_present == 'true' ? 'border-red-500' : 'border-green-500'}`} >
          <div className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${KaalsarpDosh?.is_dosha_present == 'true' ? 'bg-red-500' : 'bg-green-500'}`} >
            {KaalsarpDosh?.is_dosha_present == 'true' ? t('yes') : t('no')}
          </div>
          <span className="text-base font-medium text-gray-800">
            {KaalsarpDosh?.is_dosha_present == 'true'
              ? t('kundli_kaalsharo_dosh')
              : t('kundli_kaalsharo_free_dosh')}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {/* --- Main Report Text Block --- */}
          <Paragraph className="commonQuesP border-b-2 new_border_bottom pb-4">
            {/* <strong className="text-[16px] font-semibold new_body_fontblock mb-1">Result:</strong> */}
            Result: {KaalsarpDosh?.bot_response}
            <br />
            {/* Book Kalsarp Dosh Nivaran Puja Now To Get Rid Of Kalsarp Dosh In Your Kundli */}
          </Paragraph>
          {KaalsarpDosh?.remedies?.map((a, idx) => (
            // <li key={idx}>{a}</li>

            <Paragraph className="commonQuesP border-b-2 new_border_bottom pb-4" key={idx}>
              {/* <strong className="text-[18px] font-semibold new_body_fontblock mb-1"> */}
              <p key={idx} className="commonQuesP"><b>{idx + 1}.</b> {a} {a}</p>

              {/* </strong> */}
              {/* As per the popular definition, when all planets are situated in between Rahu and Ketu in birth-chart or horoscope,
            the astrologers call it Kalsarp Dosh. In present days, discussions about this dosh are vogue among Jyotishi or
            Hindu Astrologers of India. Many of troubles in one’s life are attributed to Kalsarp Dosh.
            <br />
            <br />
            Without analyzing other areas of astrology, most astrologers, in fact, accept Kalsarp dosh as main root of problems.
            But the reality is that if all planets are well posited in horoscope, Kalsarp dosh will not be harmful,
            and can be supportive to beneficial results endowed by good positions of planets. Kalsarp dosh is inauspicious only
            when positions of other planets are unfavorable in one’s horoscope.
            <br />
            <br />
            Therefore, it is not wise to fear hearing just about “Kalsarp Dosh”. It is in fact always better to reach on remedies
            only after consulting jyotishi for deep analysis on negative influences of Kalsarp dosh. Interestingly,
            influence of kalsarp dosh is different in different people. Because influence of kalsarp dosh is based on points
            - which sign is posited in which house, and what other planets occupied that house, what are their influences and so on. */}
            </Paragraph>
          ))}
          {/* --- Result Section --- */}
          {/* <Paragraph className="commonQuesP border-b-2 commonLightBorder pb-4">
            <strong className="text-[16px] font-semibold new_body_fontblock mb-1">Result:</strong>
            Your Horoscope is free from Kalsarp Yog.
            <br />
            Book Kalsarp Dosh Nivaran Puja Now To Get Rid Of Kalsarp Dosh In Your Kundli
          </Paragraph> */}
        </div>
      </Typography>

    </>
  )
}

export default memo(KalsarpDoshaSection)