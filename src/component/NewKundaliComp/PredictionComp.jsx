import { Tabs } from 'antd'
import DOMPurify from 'dompurify'
import { lazy, memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import '../../assets/css/dailyData.css'
import career from '../../assets/img/newIcon/career.svg'
import education from '../../assets/img/newIcon/education.svg'
import finance from '../../assets/img/newIcon/finance.svg'
import health from '../../assets/img/newIcon/health.svg'
import life from '../../assets/img/newIcon/life.svg'
import love from '../../assets/img/newIcon/love.svg'
import marriage from '../../assets/img/newIcon/marriage.svg'
import travel from '../../assets/img/newIcon/travel.svg'

const DataWrapper = lazy(() => import("../Custom/DataWrapper"));

function PredictionComp({ kundliPredication }) {
  const undefine = useSelector(state => state?.masterSlice?.undefine)
  const { t } = useTranslation()

  const matchList = [
    {
      id: 'life',
      name: t('life'),
      img: life
    },
    {
      id: 'career',
      name: t('career'),
      img: career
    },
    {
      id: 'love',
      name: t('love'),
      img: love
    },
    {
      id: 'marriage',
      name: t('marriage'),
      img: marriage
    },
    {
      id: 'finance',
      name: t('money'),
      img: finance
    },
    {
      id: 'health',
      name: t('health'),
      img: health
    },
    {
      id: 'education',
      name: t('education'),
      img: education
    },
    {
      id: 'travel',
      name: t('travel'),
      img: travel
    }
  ]


  const dailyDataOutput = useCallback((data) => {
    // if (!data) return ""
    if (data) {
      // let parsedData = isValidJSON(data) ? JSON.parse(data) : '';
      let outputDiv = ''

      for (let key in data) {
        const content = data[key]
        let findName = matchList?.find(ele => ele.id === key)

        // If content includes a colon, treat it as structured
        if (content.includes(':')) {
          outputDiv += `<div class="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-start justify-start">
   <div class="flex items-center justify-center w-[60px] h-[60px] min-h-[60px] min-w-[60px] commonLightBack rounded-full ">
     ${findName ? `<img src="${findName.img}" alt="${findName.name}" />` : ''}
    </div>
   <div>
      <div class="flex flex-col items-start gap-0">
         <h2 class="rashiHeading">${findName ? findName.name : key}</h2>
         <p class="commonQuesP">${content}</p>
      </div>
   </div>
</div>`
        } else {
          outputDiv += `<div class="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-start justify-start">
   <div class="flex items-center justify-center w-[60px] h-[60px] min-h-[60px] min-w-[60px] commonLightBack rounded-full ">
     ${findName ? `<img src="${findName.img}" alt="${findName.name}" />` : ''}
    </div>
   <div>
      <div class="flex flex-col items-start gap-0">
         <h2 class="rashiHeading">${findName ? findName.name : key}</h2>
         <p class="commonQuesP">${content}</p>
      </div>
   </div>
</div>`
        }
      }

      return outputDiv
    }
    return ""
  }, [kundliPredication?.daily, kundliPredication?.monthly, kundliPredication?.life])

  const items = useMemo(() => [
    {
      key: '1',
      label: t('DailyPrediction'),
      children: (
        <>
          <DataWrapper data={kundliPredication?.daily} undefine={undefine}>
            <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
              <div
                className='leading-relaxed mt-3 lg:mt-10 gap-5 horoscopeContent dailyDataOutput flex flex-col'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dailyDataOutput(kundliPredication?.daily))
                }}
              />
            </div>
          </DataWrapper>
        </>
      )
    },
    {
      key: '2',
      label: t('MonthlyPrediction'),
      children: (
        <>
          <DataWrapper data={kundliPredication?.monthly} undefine={undefine}>
            <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
              <p
                className='leading-relaxed mt-3 lg:mt-10 gap-5 horoscopeContent dailyDataOutput flex flex-col'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dailyDataOutput(kundliPredication?.monthly))
                }}
              />
            </div>
          </DataWrapper>
        </>
      )
    },
    {
      key: '3',
      label: t('LifePrediction'),
      children: (
        <>
          <DataWrapper data={kundliPredication?.life} undefine={undefine}>
            <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
              <p
                className='leading-relaxed mt-3 lg:mt-10 gap-5 horoscopeContent dailyDataOutput flex flex-col'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dailyDataOutput(kundliPredication?.life))
                }}
              />
            </div>
          </DataWrapper>
        </>
      )
    }
  ], [kundliPredication, dailyDataOutput, undefine, t])

  return (
    <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
      <Tabs defaultActiveKey='2' items={items} className='prediction' />
    </div>
  )
}

export default memo(PredictionComp)