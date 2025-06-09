import React, { lazy, useRef } from 'react'
const CustomButton = lazy(() => import('../Homepage/CustomButton'))
import newLogo from "../../assets/img/logo/newLogo.png";
import callSvg from '../../assets/img/kundali/call.svg'
import chatSvg from '../../assets/img/kundali/chat.svg'
import { navigate } from '../../utils/navigations/NavigationService'
// import { PATHS } from '../../routers/Paths'
import callWhite from '../../assets/img/astrologer/callWhite.svg'
import messageWhite from '../../assets/img/astrologer/messageWhite.svg'
import messageNewIcon from '/newThemeHomePage/messageNewIcon.svg'
import phoneNewIcon from '/newThemeHomePage/phoneNewIcon.svg'
import call from '../../assets/img/astrologer/call.svg'
import { UpdatedPaths } from '../../routers/Paths';
import { useTranslation } from 'react-i18next';


const NewKundaliReport = () => {

  const chatImgRef = useRef(null);
  const callImgRef = useRef(null);
  const PATHS = UpdatedPaths()
  const { t } = useTranslation()


  return (
    <div className=' flex flex-col md:flex-row md:items-center md:justify-between  rounded-lg text-center md:text-left newKundaliReport px-[5px] py-[20px] md:px-[50px] md:py-[50px]'>
      <div className='flex flex-col md:flex-row items-center justify-center md:justify-start md:items-start gap-[20px] md:gap-12  md:w-[48%] lg:w-[52%] xl:w-[59%] pb-4 md:pb-0'>
        <div className=' max-w-[140px] max-h-[140px]'>
          <img
            src={newLogo}
            alt='Kundli Icon'
            className='block kundliIcon object-contain'
          />
        </div>

        <div className='flex flex-col items-center md:items-start gap-[30px] md:gap-0'>
          <h2 className='text-[30px] leading-[100%] text-center md:text-left xl:text-4xl font-bold new_body_font  pb-1 md:pb-[30px]'>
            {t('download_share')}
          </h2>
          <CustomButton
            className=' text-white  px-4 py-2 lg:px-8 lg:py-3 text-md rounded-md' parentClassName='w-full md:min-w-max md:max-w-max'>
            {t('download_kundli_pdf')}
          </CustomButton>
        </div>
      </div>

      {/* Right Side: Image and Buttons */}
      <div className='flex flex-col md:flex-row justify-center md:justify-end gap-4  w-full md:w-[50%] lg:w-[48%] xl:w-[41%]  my-1 relative'>
        {/* <div className='  md:w-[40%]  md:block'>
          <img
            src={pandit}
            alt='Priest'
            className='absolute left-0 z-10 panditjiImg'
          />
        </div> */}

        <div className='flex flex-col justify-center md:justify-end gap-[20px] md:gap-7  items-center md:items-end flex-wrap'>
          <CustomButton 
          parentClassName='w-full md:max-w-max'
          className='text-white px-6 py-2 lg:px-8 lg:py-3 text-md rounded-md flex items-center gap-2  justify-center  '
            onMouseEnter={() => callImgRef.current.src = phoneNewIcon}
            onMouseLeave={() => callImgRef.current.src = callWhite}
            onClick={() => { navigate(PATHS.CHATWITHASTROLOGERS) }}>
            <img ref={callImgRef} src={callWhite} alt='call' className='transition-all w-[20px] h-[20px]' /> {t('start_call')}
          </CustomButton>
          <CustomButton 
          parentClassName='w-full md:max-w-max'
          className=' text-white  px-6 py-2 lg:px-8 lg:py-3 text-md rounded-md flex items-center gap-2  justify-center  '
            onMouseEnter={() => chatImgRef.current.src = messageNewIcon}
            onMouseLeave={() => chatImgRef.current.src = messageWhite}
            onClick={() => { navigate(PATHS.CHATWITHASTROLOGERS) }}>
            <img ref={chatImgRef} src={messageWhite} alt='chat' className='transition-all w-[20px] h-[20px]' /> {t('start_chat')}
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default NewKundaliReport
