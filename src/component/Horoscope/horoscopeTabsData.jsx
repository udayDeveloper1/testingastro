import { useTranslation } from 'react-i18next'

// Image imports
import todayIcon from '../../assets/img/Horoscope/today.svg'
import todayWhite from '../../assets/img/Horoscope/todayWhite.svg'

import yesterdayIcon from '../../assets/img/Horoscope/yesterday.svg'
import yesterdayWhite from '../../assets/img/Horoscope/yesterdayWhite.svg'

import tommorowIcon from '../../assets/img/Horoscope/tommorow.svg'
import tommorowWhite from '../../assets/img/Horoscope/tomorrowWhite.svg'

import yearIcon from '../../assets/img/Horoscope/horoscope.svg'
import yearWhite from '../../assets/img/Horoscope/YearWhite.svg'

import moment from 'moment'
import weekIcon from '../../assets/img/Horoscope/week.svg'
import weekWhite from '../../assets/img/Horoscope/weekWhite.svg'

export const useHoroscopeTabs = () => {
  const { t } = useTranslation()

  const horoscopeTab = [
    {
      label: t('Yesterday'),
      label2: t('Horoscope'),
      value: '2',
      type: 'yesterday-horoscope',
      icon: <img src={yesterdayWhite} alt='' className='w-full h-full object-contain' />,
      iconActive: <img src={yesterdayIcon} alt='' className='w-full h-full object-contain' />
    },
    {
      label: t("Today's"),
      label2: t('Horoscope'),
      value: '0',
      type: 'daily-horoscope',
      icon: <img src={todayWhite} alt='' className='w-full h-full object-contain' />,
      iconActive: <img src={todayIcon} alt='' className='w-full h-full object-contain' />
    },
    {
      label: t('Tomorrow'),
      label2: t('Horoscope'),
      value: '1',
      type: 'tomorrow-horoscope',
      icon: <img src={tommorowWhite} alt='' className='w-full h-full object-contain' />,
      iconActive: <img src={tommorowIcon} alt='' className='w-full h-full object-contain' />
    },
    {
      label: t('Weekly'),
      label2: t('Horoscope'),
      value: '4',
      type: 'weekly-horoscope',
      icon: <img src={weekWhite} alt='' className='w-full h-full object-contain' />,
      iconActive: <img src={weekIcon} alt='' className='w-full h-full object-contain' />
    },
    {
      label: `${t('yearly')} ${moment().format('YYYY')}`,
      label2: moment().format('YYYY'),
      value: '3',
      type: 'yearly-horoscope',
      icon: <img src={yearWhite} alt='' className='w-full h-full object-contain' />,
      iconActive: <img src={yearIcon} alt='' className='w-full h-full object-contain' />
    }
  ]

  return horoscopeTab
}
