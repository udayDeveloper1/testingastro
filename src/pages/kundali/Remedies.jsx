import { useMemo } from 'react'
import charity from '../../assets/img/remedies/charity.svg'
import fasting from '../../assets/img/remedies/fasting.svg'
import gemstone from '../../assets/img/remedies/gemstone.svg'
import rudraksh from '../../assets/img/remedies/rudraksh.svg'
import specialpooja from '../../assets/img/remedies/specialpooja.svg'
import spiritual from '../../assets/img/remedies/spiritual.svg'
import weekDay from '../../assets/img/remedies/weekDay.svg'
import Loader2 from '../../component/loader/Loader2'
import { useTranslation } from 'react-i18next'

export const Remedies = ({ allKundliDetails }) => {
  const { remedies } = allKundliDetails
  const { t } = useTranslation()

  const imageList = [
    rudraksh,
    gemstone,
    weekDay,
    fasting,
    specialpooja,
    charity,
    spiritual
  ]

  const RemedyCard = ({ title, imageSrc, content }) => {
    return (
      <div className='flex items-start p-4 md:p-8 border flex-wrap md:flex-nowrap rounded-[10px] bg-white gap-[20px] md:gap-[30px] border-[#F9E9EC]'>
        <img
          src={imageSrc}
          alt={title}
          onError={(e) => e.target.src = imageList[0]}
          className='min-w-[100px]    min-h-[100px] max-w-[100px] max-h-[100px] md:min-w-[149px] md:min-h-[149px] md:max-w-[149px] md:max-h-[149px] object-contain rounded-[10px] overflow-hidden border border-[#F9E9EC]'
        />
        <div className=''>
          <h3 className='text-lg font-semibold mb-2 remedies_title text-[18px] lg:text-[22px]'>
            {title}
          </h3>
          <div className='text-sm text-gray-700 space-y-1 remedies_content_set' />

          {Array.isArray(content) ? (
            content?.map((ele, ind) => {
              return <p key={ind} className='pt-3'>{ele}</p>
            })
          ) : (
            <p key={ind} className='pt-3'>
              {content}
            </p>
          )}
        </div>
      </div>
    )
  }

  const matchList = [
    {
      id: 'rudraksha',
      img: rudraksh,
      name: t('rudraksha')
    },
    {
      id: 'gemstone',
      img: gemstone,
      name: t('gemstone')
    },
    {
      id: 'daily_weekly_remedies',
      img: weekDay,
      name: t('daily_weekly_remedies')
    },
    {
      id: 'fasting',
      img: fasting,
      name: t('fasting')
    },
    {
      id: 'special_pooja_mantra',
      img: specialpooja,
      name: t('special_pooja_mantra')
    },
    {
      id: 'charity',
      img: charity,
      name: t('charity')
    },
    {
      id: 'final_spiritual_guidance',
      img: spiritual,
      name: t('final_spiritual_guidance')
    }
  ]

  const sanitizedRemedies = useMemo(() => {
    if (!remedies) return []

    return Object.keys(remedies)?.map((ele, ind) => {
      const content = Array.isArray(remedies[ele])
        ? remedies[ele]
        : [
          remedies[ele]?.description
            ? remedies[ele]?.description
            : remedies[ele]
        ]

      const data = matchList?.find((item) => item.id === ele)

      return (
        <RemedyCard
          key={ind}
          title={data?.name || ele}
          imageSrc={remedies?.[ele]?.image || imageList[ind]}
          content={content}
        />
      )
    })
  }, [remedies])

  return (
    <>
      {sanitizedRemedies?.length > 0 ?
        <div className='space-y-5 mt-4'>{sanitizedRemedies}</div>
        :
        <div className='space-y-5 mt-4'>
          <div className=''>
            <div className='pb-10 pt-24 min-h-[100vh]'>
              <Loader2 />
            </div>
          </div>
        </div>
      }
    </>
  )
}
