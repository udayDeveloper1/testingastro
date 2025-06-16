import { Tabs } from 'antd'
import { lazy, memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import '../../assets/css/remedies.css'
import Loader2 from '../loader/Loader2'
const KalsarpDoshaSection = lazy(() => import("./DoshaReport/KalsarpDoshaSection"))
const MangalDoshaSection = lazy(() => import("./DoshaReport/MangalDoshaSection"))
const PitruDoshaSection = lazy(() => import("./DoshaReport/PitruDoshaSection"))
const SadeSatiSection = lazy(() => import("./DoshaReport/SadeSatiSection"))

const DoshaReportComp = ({
  mangalikDosh,
  mangalDosh,
  pitraDosh,
  KaalsarpDosh,
  sadeSati,
  remedies
}) => {
  const { t } = useTranslation()
  const tabNavRef = useRef(null)
  const [activeKey, setActiveKey] = useState('1')

  const items = [
    {
      key: '1',
      label: t('Mangal&MangalikDosh'),
      children: !mangalDosh ? <Loader2 /> : (
        <>
          <MangalDoshaSection mangalDosh={mangalDosh} />
          <MangalDoshaSection mangalikDosh={mangalikDosh} />
        </>
      )
    },
    {
      key: '2',
      label: t('KalsarpDosh'),
      children: !KaalsarpDosh ? <Loader2 /> : (
        <KalsarpDoshaSection KaalsarpDosh={KaalsarpDosh} />
      )
    },
    {
      key: '3',
      label: t('PitruDosh'),
      children: !pitraDosh ? <Loader2 /> : (
        <PitruDoshaSection pitraDosh={pitraDosh} />
      )
    },
    {
      key: '4',
      label: t('SadeSati'),
      children: !sadeSati ? <Loader2 /> : (
        <SadeSatiSection sadeSati={sadeSati} />
      )
    },
  ]

  const scrollActiveTabIntoView = () => {
    const activeTab = tabNavRef.current?.querySelector('.ant-tabs-tab-active')
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
    }
  }

  useEffect(() => {
    scrollActiveTabIntoView()
  }, [activeKey])

  return (
    <div className='mx-auto bg-white rounded-[10px] space-y-8 report-custom-style'>
      <div ref={tabNavRef}>
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          items={items}
          tabBarGutter={8}
          tabBarStyle={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          className="custom-tab-scroll"
        />
      </div>
    </div>
  )
}

export default memo(DoshaReportComp)
