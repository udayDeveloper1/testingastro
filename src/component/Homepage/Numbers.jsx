import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual, useSelector } from 'react-redux'
import '../../assets/css/numbers.css'
import logoWeb from '../../assets/img/logo/logoWeb.png'

function Numbers () {
  const { t } = useTranslation()
  const dashboardCount = useSelector(
    state => state?.masterSlice?.dashboardCount,
    shallowEqual
  )

  const numbers = useMemo(
    () => [
      {
        label: dashboardCount?.totalAstrologerList || '0',
        description: t('Total_Astrologers'),
        class: ''
      },
      {
        label: dashboardCount?.totalChatMinutes || '0',
        description: t('Total_Chat_Call_Minutes'),
        class: 'firstLine_secondLine relative'
      },
      {
        label: dashboardCount?.totalCustomerList || '0',
        description: t('Total_Customers'),
        class: ''
      }
    ],
    [dashboardCount, t]
  )

  return (
    <div className='flex justify-between w-full '>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full  gap-y-6 md:gap-y-0 md:gap-x-10 lg:gap-x-0'>
        {numbers.map((num, index) => (
          <div
            key={num.description}
            className={`relative flex items-center ${num.class}`}
          >
            {/* Content Block */}
            <div
              className={`flex flex-col md:flex-row items-center gap-[10px] lg:gap-[20px] w-full 
            ${
              index === 0
                ? 'justify-start'
                : index === 1
                ? 'justify-center'
                : 'justify-end'
            }`}
            >
              <img
                src={logoWeb}
                alt='stat icon'
                className='w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] xl:w-[78px] xl:h-[78px] object-contain'
                // loading='lazy'
                decoding='async'
                width={78}
                height={78}
              />
              <div className='flex flex-col justify-center'>
                <h2 className='text-[24px] md:text-[27px] lg:text-[30px] xl:text-[38px] font-semibold mb-[3px] lg:mb-[5px] new_body_font leading-[110%] text-center md:text-start'>
                  {num.label}
                  {index !== 0 ? '+' : '+'}
                </h2>
                <p className='text-[14px] xl:text-[16px] font-semibold text-[#E3725D] uppercase tracking-wide leading-[170%] text-center md:text-start'>
                  {num.description}
                </p>
              </div>
            </div>

            {/* Dividers only around center block */}
            {index === 1 && (
              <>
                {/* Left Divider */}
                {/* <div className="hidden md:block absolute top-1/2 left-0 transform -translate-y-1/2 h-[60px] border-l-2 border-[#E3725D]" /> */}
                {/* Right Divider */}
                {/* <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 h-[60px] border-r-2 border-[#E3725D]" /> */}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(Numbers)
