// import KundaliKp from "../../assets/img/banner/KundaliKp.webp";
import { useTranslation } from 'react-i18next'
import { lazy, memo } from 'react'

const CommonBanner = lazy(() => import('../../component/CommonBanner'));
const CustomTable = lazy(() => import('../../component/Custom/CustomTable'));
const AstrologyComponent = lazy(() => import('../../component/kundali/AstrologyComponent'));
const HoroscopeGrid = lazy(() => import('../../component/kundali/HoroscopeGrid'));
const KundliReport = lazy(() => import('../../component/kundali/KundliReport'));
const KundliStepper = lazy(() => import('../../component/kundali/KundliStepper'));
// import { PATHS } from "../../routers/Paths";

function FreeKundaliDetailsKp () {
    const { t } = useTranslation()
  const planetColumns = [
    {
      title: 'Planets',
      dataIndex: 'planets',
      key: 'planets',
      width: '100px'
    },
    {
      title: 'Cusp',
      dataIndex: 'cusp',
      key: 'cusp',
      width: '100px'
    },
    {
      title: 'Sign',
      dataIndex: 'sign',
      key: 'sign',
      width: '150px'
    },
    {
      title: 'Sign Lord',
      dataIndex: 'signLord',
      key: 'signLord',
      width: '150px'
    },
    {
      title: 'Star Lord',
      dataIndex: 'starLord',
      key: 'starLord',
      width: '150px'
    },
    {
      title: 'Sub Lord',
      dataIndex: 'subLord',
      key: 'subLord',
      width: '150px'
    }
  ]

  const planetData = [
    {
      key: 1,
      planets: 'Sun',
      cusp: 10,
      sign: 'Gemini',
      signLord: 'Me',
      starLord: 'Ju',
      subLord: 'Su'
    },
    {
      key: 2,
      planets: 'Moon',
      cusp: 11,
      sign: 'Sagittarius',
      signLord: 'Ju',
      starLord: 'Ve',
      subLord: 'Ve'
    },
    {
      key: 3,
      planets: 'Mars',
      cusp: 3,
      sign: 'Gemini',
      signLord: 'Me',
      starLord: 'Ju',
      subLord: 'Me'
    },
    {
      key: 4,
      planets: 'Rahu',
      cusp: 5,
      sign: 'Cancer',
      signLord: 'Mo',
      starLord: 'Ju',
      subLord: 'Ma'
    },
    {
      key: 5,
      planets: 'Jupiter',
      cusp: 4,
      sign: 'Taurus',
      signLord: 'Ve',
      starLord: 'Su',
      subLord: 'Sa'
    },
    {
      key: 6,
      planets: 'Saturn',
      cusp: 5,
      sign: 'Taurus',
      signLord: 'Ve',
      starLord: 'Su',
      subLord: 'Sa'
    },
    {
      key: 7,
      planets: 'Mercury',
      cusp: 8,
      sign: 'Gemini',
      signLord: 'Me',
      starLord: 'Ju',
      subLord: 'Me'
    },
    {
      key: 8,
      planets: 'Ketu',
      cusp: 5,
      sign: 'Capricorn',
      signLord: 'Sa',
      starLord: 'Ra',
      subLord: 'Ra'
    },
    {
      key: 9,
      planets: 'Venus',
      cusp: 8,
      sign: 'Cancer',
      signLord: 'Mo',
      starLord: 'Sa',
      subLord: 'Ve'
    },
    {
      key: 10,
      planets: 'Neptune',
      cusp: 7,
      sign: 'Capricorn',
      signLord: 'Sa',
      starLord: 'Mo',
      subLord: 'Ra'
    },
    {
      key: 11,
      planets: 'Uranus',
      cusp: 3,
      sign: 'Capricorn',
      signLord: 'Sa',
      starLord: 'Ma',
      subLord: 'Ra'
    },
    {
      key: 12,
      planets: 'Pluto',
      cusp: 2,
      sign: 'Scorpio',
      signLord: 'Ma',
      starLord: 'Sa',
      subLord: 'Ju'
    }
  ]

  const planetColumns1 = [
    {
      title: 'Cusp',
      dataIndex: 'cusp',
      key: 'cusp',
      width: '100px'
    },
    {
      title: 'Degree',
      dataIndex: 'degree',
      key: 'degree',
      width: '100px'
    },
    {
      title: 'Sign',
      dataIndex: 'sign',
      key: 'sign',
      width: '100px'
    },
    {
      title: 'Sign Lord',
      dataIndex: 'signLord',
      key: 'signLord',
      width: '150px'
    },
    {
      title: 'Star Lord',
      dataIndex: 'starLord',
      key: 'starLord',
      width: '150px'
    },
    {
      title: 'Sub Lord',
      dataIndex: 'subLord',
      key: 'subLord',
      width: '150px'
    }
  ]

  const planetData1 = [
    {
      key: 1,
      cusp: 1,
      degree: 156.66,
      sign: 'Gemini',
      signLord: 'Me',
      starLord: 'Ju',
      subLord: 'Su'
    },
    {
      key: 2,
      cusp: 2,
      degree: 184.71,
      sign: 'Sagittarius',
      signLord: 'Ju',
      starLord: 'Ve',
      subLord: 'Ve'
    },
    {
      key: 3,
      cusp: 3,
      degree: 215.15,
      sign: 'Gemini',
      signLord: 'Me',
      starLord: 'Ju',
      subLord: 'Me'
    },
    {
      key: 4,
      cusp: 4,
      degree: 246.68,
      sign: 'Cancer',
      signLord: 'Mo',
      starLord: 'Ju',
      subLord: 'Ma'
    },
    {
      key: 5,
      cusp: 5,
      degree: 278.23,
      sign: 'Taurus',
      signLord: 'Ve',
      starLord: 'Su',
      subLord: 'Ve'
    },
    {
      key: 6,
      cusp: 6,
      degree: 308.66,
      sign: 'Taurus',
      signLord: 'Ve',
      starLord: 'Su',
      subLord: 'Sa'
    },
    {
      key: 7,
      cusp: 7,
      degree: 336.66,
      sign: 'Gemini',
      signLord: 'Me',
      starLord: 'Ju',
      subLord: 'Me'
    },
    {
      key: 8,
      cusp: 8,
      degree: 4.71,
      sign: 'Capricorn',
      signLord: 'Sa',
      starLord: 'Su',
      subLord: 'Ra'
    },
    {
      key: 9,
      cusp: 9,
      degree: 35.15,
      sign: 'Cancer',
      signLord: 'Mo',
      starLord: 'Ju',
      subLord: 'Ra'
    },
    {
      key: 10,
      cusp: 10,
      degree: 66.68,
      sign: 'Capricorn',
      signLord: 'Sa',
      starLord: 'Su',
      subLord: 'Ra'
    },
    {
      key: 11,
      cusp: 11,
      degree: 98.23,
      sign: 'Capricorn',
      signLord: 'Sa',
      starLord: 'Ma',
      subLord: 'Ra'
    },
    {
      key: 12,
      cusp: 12,
      degree: 128.66,
      sign: 'Scorpio',
      signLord: 'Ma',
      starLord: 'Sa',
      subLord: 'Ju'
    }
  ]
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={KundaliKp}
          text=''
          highlight='Kundli Details'
        />
        <KundliStepper />
      </section>
      <section>
        <div className=' container'>
          <div>
            <AstrologyComponent />
          </div>
        </div>
      </section>
      <section>
        <div className='padding50 container'>
          <div>
            <h2 className='text-2xl font-bold mb-4'>Match Ashtakoot Points</h2>
            <CustomTable
              columns={planetColumns}
              dataSource={planetData}
              pagination={false}
              bordered
              scroll={{ x: 'max-content' }}
              className=''
            />
          </div>
          <div className='paddingTop50'>
            <h2 className='text-2xl font-bold mb-4'>Cusps</h2>
            <CustomTable
              columns={planetColumns1}
              dataSource={planetData1}
              pagination={false}
              bordered
              scroll={{ x: '1750px', y: 500 }}
              className=''
            />
          </div>
        </div>
      </section>
      <section className=' paddingTop50 '>
        <div className='KundliReportBg'>
          <div className='container mx-auto   '>
            <KundliReport />
          </div>
        </div>
      </section>
      <section className=''>
        <div className='container mx-auto  padding100 '>
          <HoroscopeGrid heading={t('Choose_Your_Sign')} smallText='' type={''} />
        </div>
      </section>
    </>
  )
}

export default memo(FreeKundaliDetailsKp)
