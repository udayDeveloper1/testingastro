import React, { useMemo } from 'react'
import KalsarpDoshaSection from './DoshaReport/KalsarpDoshaSection'
import MangalDoshaSection from './DoshaReport/MangalDoshaSection'
import PitruDoshaSection from './DoshaReport/PitruDoshaSection'
import SadeSatiSection from './DoshaReport/SadeSatiSection'

import rudraksh from '../../assets/img/remedies/rudraksh.svg'
import spiritual from '../../assets/img/remedies/spiritual.svg'
import charity from '../../assets/img/remedies/charity.svg'
import specialpooja from '../../assets/img/remedies/specialpooja.svg'
import fasting from '../../assets/img/remedies/fasting.svg'
import weekDay from '../../assets/img/remedies/weekDay.svg'
import gemstone from '../../assets/img/remedies/gemstone.svg'
import '../../assets/css/remedies.css'

import DOMPurify from 'dompurify'
import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import Loader2 from '../loader/Loader2'

const DoshaReportComp = ({
  mangalikDosh,
  mangalDosh,
  pitraDosh,
  KaalsarpDosh,
  sadeSati,
  remedies
}) => {

  const { t } = useTranslation()

  // const remedyImageMap = {
  //   "recommended rudraksha": rudraksh,
  //   "suitable gemstone": gemstone,
  //   "daily and weekly remedies": weekDay,
  //   "fasting (vrat)": fasting,
  //   "special pooja or mantra": specialpooja,
  //   "charity (daan)": charity,
  //   "final spiritual guidance": spiritual,
  // };

  // const RemedyCard = ({ title, imageSrc, content }) => {
  //   return (
  //     <div className="flex items-start p-4 border overflow-hidden rounded-[10px] bg-white box_shadow_common space-x-4 border border-[1px] [border-image-source:linear-gradient(270deg,_#FDF3EC_0%,_#F9E9EC_100%)] [border-image-slice:1]">
  //       <img
  //         src={imageSrc}
  //         alt={title}
  //         className="min-w-[130px] min-h-[130px] object-contain rounded-[10px] overflow-hidden border border-[1px] [border-image-source:linear-gradient(270deg,_#FDF3EC_0%,_#F9E9EC_100%)] [border-image-slice:1] rounded-xl p-4"
  //       />
  //       <div>
  //         <h3 className="text-lg font-semibold mb-2">{title}</h3>
  //         <div
  //           className="text-sm text-gray-700 space-y-1"
  //           dangerouslySetInnerHTML={{ __html: content }}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  // const formattedPredictionRemedies = remedies?.replace(/\n/g, "<br />");

  const items = [
    {
      key: '2',
      label: t('Mangal&MangalikDosh'),
      children: (
        <>
          {!mangalDosh ? <Loader2 /> :
            <>
              <MangalDoshaSection mangalDosh={mangalDosh} />
              <MangalDoshaSection mangalikDosh={mangalikDosh} />
            </>}
        </>
      )
    },
    {
      key: '3',
      label: t('KalsarpDosh'),
      children: (<>
        {!KaalsarpDosh ? <Loader2 /> :
          <KalsarpDoshaSection KaalsarpDosh={KaalsarpDosh} />
        }</>)
    },
    {
      key: '4',
      label: t('PitruDosh'),
      children: (<>
        {!pitraDosh ? <Loader2 /> :
          <PitruDoshaSection pitraDosh={pitraDosh} />
        }  </>)
    },
    {
      key: '5',
      label: t('SadeSati'),
      children: (<>
        {!sadeSati ? <Loader2 /> :
          <SadeSatiSection sadeSati={sadeSati} />
        } </>)
    },
    // {
    //   key: "6",
    //   label: `Remedies`,
    //   children: (
    //     <div className="space-y-5 mt-4">
    //       {(() => {
    //         const sections = DOMPurify.sanitize(formattedPredictionRemedies)
    //           .split(/<br\s*\/?>\s*<br\s*\/?>/)
    //           .map((section, index) => {
    //             const match = section.match(/<b>(.*?)<\/b>/i);
    //             const rawTitle = match ? match[1] : `Remedy ${index + 1}`;
    //             const normalizedTitle = rawTitle.trim().toLowerCase();
    //             const imageSrc = remedyImageMap[normalizedTitle] || gemstone;

    //             return (
    //               <RemedyCard
    //                 key={index}
    //                 title={rawTitle}
    //                 imageSrc={imageSrc}
    //                 content={section}
    //               />
    //             );
    //           });
    //         return sections;
    //       })()}
    //     </div>
    //   ),
    // },
  ];

  const onChange = key => {
    // console.log('Tab changed to:', key)
  }

  return (
    <div className='mx-auto bg-white rounded-[10px] space-y-8 report-custom-style'>
      <Tabs defaultActiveKey='2' items={items} onChange={onChange} />
    </div>
  )
}

export default DoshaReportComp
