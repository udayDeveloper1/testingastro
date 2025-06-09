import React from 'react'
import { Typography } from "antd";
import { useTranslation } from 'react-i18next';

const { Title, Paragraph } = Typography;

function PitruDoshaSection({ pitraDosh }) {
  const { t } = useTranslation()

  return (
    <>
      <Typography className="flex flex-col gap-6 mt-5">
        {/* --- Section Title --- */}
        <div>
          <Title level={4} className="!mb-0">
            <span className="website_color commonQuesH2">{t('pitru_dosh_analysis')}</span>
          </Title>
        </div>
        <div
          className={`p-4 rounded-md flex items-center gap-4 border ${pitraDosh?.is_dosha_present == 'true' ? 'border-red-500' : 'border-green-500'
            }`}
        >
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${pitraDosh?.is_dosha_present == 'true' ? 'bg-red-500' : 'bg-green-500'
              }`}
          >
            {pitraDosh?.is_dosha_present == 'true' ? t('yes') : t('no')}
          </div>
          {/* <span className="text-base font-medium text-gray-800">
            {pitraDosh?.is_dosha_present == 'true'
              ? 'Kundli has Kaalsarp Dosha.'
              : 'Kundli is free from Kaalsarp Dosha.'}
          </span> */}

          <span className="text-base font-medium text-gray-800">
            {pitraDosh?.is_dosha_present == 'true'
              ? t('kundli_pitru_dosh')
              : t('kundli_pitru_free_dosh')}
          </span>

        </div>

        <div className="flex flex-col gap-5">
          {/* --- What is Pitru Dosh --- */}
          {/* <Paragraph className="commonQuesP border-b-2 commonLightBorder pb-4"> */}
          {/* <strong className="text-[18px] font-semibold new_body_fontblock mb-1">
              {pitraDosh?.bot_response}
            </strong> */}
          {/* The word Pitru Dosh itself decodes its meaning – "Pitru" means forefather. Hence, the word Pitru defines parental
            ancestry. Pitru Dosh denotes the bad karma created by the ancestors with their wrongdoing while living in the past.
            Any person whose forefathers have committed any crime, mistakes, or sins, then the person has Pitru Dosh in his
            horoscope.
            <br />
            <br />
            In simple words, it is playing the karmic debts of the ancestors. In Hindu Vedic astrology, the Sun is the *karaka*
            for the father. Suppose the Sun is placed at 9th or 9th house afflicted by natural malefic or Lagna malefic. Rahu
            conjunction with or in the lord will be considered as Pitru Dosh. */}
          {/* </Paragraph> */}

          <Paragraph className="commonQuesP  new_border_bottom pb-4">

            <strong className="text-[18px] font-semibold new_body_fontblock mb-3">
              {t('remedies_for_pitru_doshs')}
            </strong>

            {pitraDosh?.remedies?.length > 0 && (
              <>
                {pitraDosh?.remedies?.map((effect, index) => (
                  <p key={index} className="commonQuesP  pb-1 mt-3">
                    <b>{index + 1}.</b> {effect}
                  </p>
                ))}
              </>
            )}

          </Paragraph>

          {/* --- Types of Pitru Dosh --- */}
          <Paragraph className="commonQuesP  new_border_bottom pb-4">
            <strong className="text-[18px] font-semibold new_body_fontblock mb-3">
             {t('what_is_pitru_effects')}
            </strong>

            {/* Bot Response */}
            {/* <p className="mb-2">{pitraDosh?.bot_response}</p> */}

            {/* {pitraDosh?.effects?.length > 0 && (
              <ul className="pl-5 mt-2 space-y-1 list-decimal">
                {pitraDosh?.effects?.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            )} */}

            {pitraDosh?.effects?.length > 0 && (
              <>
                {pitraDosh?.effects?.map((effect, index) => (
                  <p key={index} className="commonQuesP  pb-1  mt-3">
                    <b>{index + 1}.</b> {effect}
                  </p>
                ))}
              </>
            )}
            {/* Additional Info */}
            {/* <p className="mt-4">
              Pitru Dosh can be attributed to three major causes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Effects of the planets.</li>
              <li>Deeds of ancestors.</li>
              <li>One’s own Karma.</li>
            </ul> */}
          </Paragraph>

          {/* --- Myths About Pitru Dosh --- */}


          {/* --- General Traits --- */}
          {/* <Paragraph className="commonQuesP border-b-2 commonLightBorder pb-4">
            <strong className="text-[18px] font-semibold new_body_fontblock mb-1">
              General Traits of Pitru Dosh
            </strong>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>One can have a dream of ancestors asking for food or clothes to an individual.</li>
              <li>
                If the person or any family member sees the snakes’ dreams, it hints towards a Pitru Dosh.
              </li>
            </ul>
          </Paragraph> */}

          {/* --- Effects of Pitru Dosh --- */}
          {/* <Paragraph className="commonQuesP border-b-2 commonLightBorder pb-4">
            <strong className="text-[18px] font-semibold new_body_fontblock mb-1">
              Effects of Pitru Dosh
            </strong>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>The person faces financial and physical problems due to continuous sickness.</li>
              <li>Fails to achieve success in any work; he starts lacking mental peace and stability.</li>
              <li>Unfavourable environment and arguments over small things in personal and social life.</li>
              <li>
                Sometimes, we cannot marry at the correct time that is delayed in marriage if he has Pitru Dosh in his horoscope.
              </li>
              <li>Children with Pitru Dosh may face physical or mental disabilities either later or from birth.</li>
              <li>It could lead to miscarriages during conceiving.</li>
              <li>Pitru Dosh food scuttle the successful married life.</li>
              <li>Unnatural deaths like suicides, murder, accidents within the family.</li>
              <li>Continuous loss of lives in a mysterious manner in the same family.</li>
              <li>
                There would be hurdles towards conducting any auspicious events in the family for a more extended period.
              </li>
            </ul>
          </Paragraph> */}
        </div>
      </Typography>
    </>
  )
}

export default PitruDoshaSection