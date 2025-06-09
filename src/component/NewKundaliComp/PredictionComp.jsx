// import React from 'react'
// import DOMPurify from 'dompurify'
// import { Tabs } from 'antd'
// import "../../assets/css/dailyDataOutput.css"

// export default function PredictionComp ({ kundliPredication }) {
//   // console.log('kundliPredication', kundliPredication);
//   const formattedPredictionDaily = kundliPredication?.daily?.replace(
//     /\n/g,
//     '<br />'
//   )
//   const formattedPredictionMonthly = kundliPredication?.monthly?.replace(
//     /\n/g,
//     '<br />'
//   )
//   const formattedPredictionLife = kundliPredication?.life?.replace(
//     /\n/g,
//     '<br />'
//   )
//   let dailyData = formattedPredictionDaily?.split(/<br\s*\/?>\s*<br\s*\/?>/)
//   let dailyDataOutput = ''
//   dailyData?.forEach(section => {
//     let titleMatch = section.match(/<b>(.*?)<\/b>/)
//     let title = titleMatch ? titleMatch[1] : ''
//     let text = section.replace(/<b>.*?<\/b>:/, '').trim()
//     dailyDataOutput += `
//     <div>
//       <h4>${title}</h4>
//       <p>${text}</p>
//     </div>
//   `
//   })

//   const items = [
//     {
//       key: '1',
//       label: `Daily Prediction`,
//       children: (
//         <>
//           <div className=' bg-white  rounded-[10px]  flex flex-col gap-[30px] report-custom-style'>
//             <div
//               className='leading-relaxed mt-3 dailyDataOutput'
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(dailyDataOutput)
//               }}
//             />
//           </div>
//         </>
//       )
//     },
//     {
//       key: '2',
//       label: `Monthly Prediction`,
//       children: (
//         <>
//           <div className=' bg-white  rounded-[10px]  flex flex-col gap-[30px] report-custom-style'>
//             <p
//               className='commonQuesP leading-relaxed mt-3'
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(formattedPredictionMonthly)
//               }}
//             />
//           </div>
//         </>
//       )
//     },
//     {
//       key: '3',
//       label: `Life Prediction`,
//       children: (
//         <>
//           <div className=' bg-white  rounded-[10px]  flex flex-col gap-[30px] report-custom-style'>
//             <p
//               className='commonQuesP leading-relaxed mt-3'
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(formattedPredictionLife)
//               }}
//             />
//           </div>
//         </>
//       )
//     }
//   ]

//   const onChange = key => {
//     console.log(key)
//   }

//   return (
//     <div className=' bg-white  rounded-[10px]  flex flex-col gap-[30px] report-custom-style'>
//       <Tabs
//         defaultActiveKey='2'
//         items={items}
//         onChange={onChange}
//         className='prediction'
//       />
//     </div>
//   )
// }

import React, { useCallback, useMemo } from 'react'
import DOMPurify from 'dompurify'
import { Tabs } from 'antd'
import '../../assets/css/dailyData.css'
import love from '../../assets/img/newIcon/love.svg'
import marriage from '../../assets/img/newIcon/marriage.svg'
import career from '../../assets/img/newIcon/career.svg'
import education from '../../assets/img/newIcon/education.svg'
import finance from '../../assets/img/newIcon/finance.svg'
import health from '../../assets/img/newIcon/health.svg'
import life from '../../assets/img/newIcon/life.svg'
import travel from '../../assets/img/newIcon/travel.svg'
import family from '../../assets/img/newIcon/family.svg'
import physique from '../../assets/img/newIcon/physique.svg'
import friend from '../../assets/img/newIcon/friend.svg'
import { useTranslation } from 'react-i18next'
import Loader2 from '../loader/Loader2'
import { isValidJSON } from '../../utils/CommonFunction'
const imageList = [
  life,
  career,
  love,
  marriage,
  finance,
  health,
  education,
  travel
]
export default function PredictionComp({ kundliPredication }) {
  const { t } = useTranslation()
  // const formatPrediction = (text = '') => text.replace(/\n/g, '<br />');
  const formatPrediction = (text = '') => {
    if (!text) return null;
    // return text?.replace(/\n/g, '<br />');
    return text;
  };

  //   const dailyDataOutput = useMemo(() => {
  //   const formatted = formatPrediction(kundliPredication?.daily)
  //   const sections = formatted?.split(/<br\s*\/?>\s*<br\s*\/?>/)

  //   if (!sections) return ''

  //   return sections
  //     .map((section, ind) => {
  //       const titleMatch = section.match(/<b>(.*?)<\/b>/)
  //       const hasTitle = !!titleMatch
  //       const title = hasTitle ? titleMatch[1] : ''
  //       const text = hasTitle
  //         ? section.replace(/<b>.*?<\/b>:/, '').trim()
  //         : section.trim()

  //       const img = imageList?.[ind] || career

  //       if (hasTitle) {
  //         return `
  //           <div class="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-start justify-start" data-key="section-${ind}">
  //             <div class="flex items-center justify-center w-[60px] h-[60px] min-h-[60px] min-w-[60px] commonLightBack rounded-full">
  //               <img alt="${title}" src="${img}" class="w-[36px] h-[36px] object-contain" />
  //             </div>
  //             <div>
  //               <div class="flex flex-col items-start gap-0">
  //                 <h2 class="rashiHeading">${title}</h2>
  //                 <p class="commonQuesP">${text || "No Data Available"}</p>
  //               </div>
  //             </div>
  //           </div>
  //         `
  //       } else {
  //         // Special case for the final paragraph without a <b> tag
  //         return `
  //           <div class="flex flex-col items-start justify-start" data-key="final-note">
  //             <p class="">${text || "No Data Available"}</p>
  //           </div>
  //         `
  //       }
  //     })
  //     .join('')
  // }, [kundliPredication?.daily])

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
      name: t('helth'),
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
    if (data) {
      // let parsedData = isValidJSON(data) ? JSON.parse(data) : '';
      let outputDiv = ''

      for (let key in data) {
        const content = data[key]
        let findName = matchList.find(ele => ele.id === key)

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

  const formattedPredictionMonthly = useMemo(() => {
    if (!kundliPredication?.monthly) return ''

    // Sanitize and normalize line breaks
    let sanitizedData = DOMPurify.sanitize(
      formatPrediction(kundliPredication?.monthly)
    )
    const normalizedData = `<br><br>${sanitizedData.trim()}`

    // Split into sections using double line breaks
    const sections = normalizedData.split(/<br\s*\/?>\s*<br\s*\/?>/)
    if (sections[0]?.trim() === '') {
      sections.shift()
    }

    const result = sections
      .map((section, index) => {
        const trimmed = section.trim()
        if (!trimmed) return ''

        // Determine hasTitle

        const containsColon = trimmed.includes(':')
        const containsBr = /<br\s*\/?>/.test(trimmed)
        const hasTitle = containsColon || containsBr
        const img = imageList?.[index] || career
        let title = ''
        let body = ''

        if (hasTitle) {
          const [headingPart, ...rest] = trimmed.split(/<br\s*\/?>/)
          title = headingPart.split(':')[0].replace(/^#+/, '').trim()

          body = rest.join('<br />').trim()
        } else {
          body = trimmed
        }

        return hasTitle
          ? `
            <div class="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-start justify-start" data-key="section-${index}">
            <div class="flex items-center justify-center w-[60px] h-[60px] min-h-[60px] min-w-[60px] commonLightBack rounded-full">
              <img alt="${title}" src="${img}" class="w-[36px] h-[36px] object-contain" />
            </div>
            <div>
              <div class="flex flex-col items-start gap-0">
                <h2 class="rashiHeading">${title}</h2>
                <p class="commonQuesP">${body || 'No Data Available'}</p>
              </div>
            </div>
          </div>
        `
          : `
         <div class="flex flex-col items-start justify-start" data-key="final-note">
            <p class="">${body || 'No Data Available'}</p>
          </div>
        `
      })
      .join('')

    return result
  }, [kundliPredication?.monthly])

  const formattedPredictionLife = useMemo(() => {
    if (!kundliPredication?.life) return ''

    const rawData = formatPrediction(kundliPredication.life)
    const sanitized = DOMPurify.sanitize(rawData)
    const sections = sanitized.split(/<br\s*\/?>\s*<br\s*\/?>/)

    const result = sections.map((section, index) => {
      const trimmed = section.trim()
      const bTagMatch = trimmed?.match(/<b>(.*?)<\/b>/i)
      const hasTitle = !!bTagMatch
      const title = bTagMatch?.[1]
      const text = trimmed?.replace(/<b>.*?<\/b>:/i, '').trim()
      const img = imageList?.[index] || career
      if (hasTitle) {
        return `
        <div class="flex gap-[10px] md:gap-[20px] flex-col md:flex-row items-start justify-start" data-key="section-${index}">
            <div class="flex items-center justify-center w-[60px] h-[60px] min-h-[60px] min-w-[60px] commonLightBack rounded-full">
              <img alt="${title}" src="${img}" class="w-[36px] h-[36px] object-contain" />
            </div>
            <div>
              <div class="flex flex-col items-start gap-0">
                <h2 class="rashiHeading">${title}</h2>
                <p class="commonQuesP">${text || 'No Data Available'}</p>
              </div>
            </div>
          </div>
      `
      } else {
        return `
        <div class="flex flex-col items-start justify-start" data-key="final-note">
            <p class="">${text || 'No Data Available'}</p>
          </div>
      `
      }
    })

    return result.join('')
  }, [kundliPredication?.life])

  const items = useMemo(
    () => [
      {
        key: '1',
        label: t('DailyPrediction'),
        children: (<>
          {!kundliPredication?.daily ?
            <div className=''>
              <div className='pb-10 pt-24 min-h-[100vh]'>
                <Loader2 />
              </div>
            </div> :
            <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
              <div
                className='leading-relaxed mt-3 lg:mt-10 gap-5 horoscopeContent dailyDataOutput flex flex-col'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dailyDataOutput(kundliPredication?.daily || ""))
                }}
              />
            </div>
          }
        </>)
      },
      {
        key: '2',
        label: t('MonthlyPrediction'),
        children: (<>

          {!kundliPredication?.monthly ? <div className=''>
            <div className='pb-10 pt-24 min-h-[100vh]'>
              <Loader2 />
            </div>
          </div> :
            <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
              <p
                className='leading-relaxed mt-3 lg:mt-10 gap-5 horoscopeContent dailyDataOutput flex flex-col'
                dangerouslySetInnerHTML={{ __html: dailyDataOutput(kundliPredication?.monthly) }}
              />
            </div>
          }
        </>)
      },
      {
        key: '3',
        label: t('LifePrediction'),
        children: (<>
          {
            !kundliPredication?.life ?
              <div className=''>
                <div className='pb-10 pt-24 min-h-[100vh]'>
                  <Loader2 />
                </div>
              </div> :
              <div className='bg-white rounded-[10px] flex flex-col gap-[30px] report-custom-style'>
                <p
                  className='leading-relaxed mt-3 lg:mt-10 gap-5 horoscopeContent dailyDataOutput flex flex-col'
                  dangerouslySetInnerHTML={{ __html: dailyDataOutput(kundliPredication?.life) }}
                />
              </div>
          }
        </>)
      }
    ],
    [dailyDataOutput]
    // [dailyDataOutput, formattedPredictionMonthly, formattedPredictionLife]
  )

  return (
    <div className='bg-white  rounded-[10px]  flex flex-col gap-[30px] report-custom-style'>
      <Tabs defaultActiveKey='2' items={items} className='' />
    </div>
  )

}
