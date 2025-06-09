import { useTranslation } from 'react-i18next'

import aries from '../../assets/img/rashiIcon/Aries.svg'
import taurus from '../../assets/img/rashiIcon/Taurus.svg'
import gemini from '../../assets/img/rashiIcon/gemini.svg'
import cancer from '../../assets/img/rashiIcon/cancer.svg'
import leo from '../../assets/img/rashiIcon/Leo.svg'
import virgo from '../../assets/img/rashiIcon/Virgo.svg'
import libra from '../../assets/img/rashiIcon/Libra.svg'
import scorpio from '../../assets/img/rashiIcon/scorpio.svg'
import sagittarius from '../../assets/img/rashiIcon/sagitarius.svg'
import capricon from '../../assets/img/rashiIcon/capricon.svg'
import aquarius from '../../assets/img/rashiIcon/aquarius.svg'
import pisces from '../../assets/img/rashiIcon/pisces.svg'

export const useHoroscopeList = () => {
  const { t } = useTranslation()

  return [
    {
      id: 1,
      key: t('Aries'),
      name: 'Aries',
      icon: aries,
      description: t('Today will be a great day for you. Whether you are single or taken, you are feeling the power of Venus. Married signs will feel the passion explode!')
    },
    {
      id: 2,
      key: t('Taurus'),
      name: 'Taurus',
      icon: taurus,
      description: t('Do something that will spark up the romance a bit more, and be a bit more sensual with your partner today.')
    },
    {
      id: 3,
      key: t('Gemini'),
      name: 'Gemini',
      icon: gemini,
      description: t('There might have been some conflicts in the past, just explain to your partner today what you like.')
    },
    {
      id: 4,
      key: t('Cancer'),
      name: 'Cancer',
      icon: cancer,
      description: t('Single signs are feeling confident. If you are in a relationship, today will be great for an indoor date.')
    },
    {
      id: 5,
      key: t('Leo'),
      name: 'Leo',
      icon: leo,
      description: t('Your relationship might feel a bit rocky and a bit more unstable, but this is only temporary.')
    },
    {
      id: 6,
      key: t('Virgo'),
      name: 'Virgo',
      icon: virgo,
      description: t('You might be thinking about someone from the past today. Be careful with Leos today.')
    },
    {
      id: 7,
      key: t('Libra'),
      name: 'Libra',
      icon: libra,
      description: t('You might be thinking about someone from the past today. Be careful with Leos today.')
    },
    {
      id: 8,
      key: t('Scorpio'),
      name: 'Scorpio',
      icon: scorpio,
      description: t('Scorpio signs who are in long distance relationships are going to miss their partner a lot today.')
    },
    {
      id: 9,
      key: t('Sagittarius'),
      name: 'Sagittarius',
      icon: sagittarius,
      description: t('Taken signs are going to have a wonderful day with their partner, full of love and care.')
    },
    {
      id: 10,
      key: t('Capricorn'),
      name: 'Capricorn',
      icon: capricon,
      description: t('Single signs will hit it off with fire signs today. Try out something that you haven’t done in a while.')
    },
    {
      id: 11,
      key: t('Aquarius'),
      name: 'Aquarius',
      icon: aquarius,
      description: t('Single signs feel powerful and ready to take on the world.')
    },
    {
      id: 12,
      key: t('Pisces'),
      name: 'Pisces',
      icon: pisces,
      description: t('Your mood will be very unstable, but fortunately, your partner knows how to deal with this.')
    }
  ]
}
