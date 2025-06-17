// import { cloneDeep } from 'lodash'
// import React, { memo, Suspense, useMemo, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import badge from '../../assets/img/astrologer/badge.svg'
// import call from '../../assets/img/astrologer/call.svg'
// import callWhite from '../../assets/img/astrologer/callWhite.svg'
// import messageWhite from '../../assets/img/astrologer/messageWhite.svg'
// import messageNewIcon from '/newThemeHomePage/messageNewIcon.svg'
// import phoneNewIcon from '/newThemeHomePage/phoneNewIcon.svg'

// import coach from '../../assets/img/astrologer/coach.svg'
// import experience from '../../assets/img/astrologer/experience.svg'
// import language from '../../assets/img/astrologer/language.svg'
// import message from '../../assets/img/astrologer/message.svg'
// import { addChatRequest, getUserDetails } from '../../services/api/api.services'
// import {
//   setAstroDetails,
//   setAstroPaymentDetails
// } from '../../storemain/slice/astroLogerDetailsSlice'
// import { setUserLoginData } from '../../storemain/slice/MasterSlice'
// import { Encryption, loginRedirection, navigateChat, openModel, setLoginUserData, TOAST_ERROR } from '../../utils/CommonFunction'
// import { Codes } from '../../utils/CommonVariable'
// import { Constatnt } from '../../utils/Constent'
// import { UpdatedPaths } from '../../routers/Paths'
// import { useTranslation } from 'react-i18next'
// import { useNavigate } from 'react-router'
// const PhoneAuthModal = React.lazy(() => import('../auth/PhoneAuthModals'))


// const CommonQuestionComp = React.lazy(() => import('../CommonQuestionComp'))
// const CustomButton = React.lazy(() => import('../Homepage/CustomButton'))

// const AstrologerImage = memo(({ src, alt }) => (
//   <div className='w-28 h-28 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow overflow-hidden'>
//     <img src={src || Constatnt?.DEFAULT_IMAGE}
//       alt={alt}
//       onError={e => {
//         e.target.onerror = null
//         e.target.src = Constatnt?.DEFAULT_IMAGE
//       }}
//       className='w-full h-full object-cover'
//     />
//   </div>
// ))

// const InfoRow = memo(({ icon, text }) => (
//   <p className='break-words commonQuesP flex gap-2 items-start text-start '>
//     <img src={icon} alt='' className='w-[30px] h-[30px]' />
//     {text}
//   </p>
// ))

// const AstrologerCard = ({ astrologer }) => {
//   const { t } = useTranslation()
//   const chatImgRef = useRef(null);
//   const callImgRef = useRef(null);
//   const PATHS = UpdatedPaths()

//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const { is_login, loginUserData } = useSelector(state => state?.masterSlice?.loginUser)
//   const LOGIN_KEY = localStorage.getItem(Constatnt?.LOGIN_KEY)

//   const modal = useSelector(state => state?.masterSlice?.modal)

//   const { astro_is_verified, astro_description, name, language: astroLanguages = '', experience: astroExperience = '0', price_per_min: chatMin = '0', astro_call_min: callMin = '0', price_per_min: pricePerMin = '0', category = 'Category', profile_image } = astrologer

//   const isVerified = useMemo(
//     () => astro_is_verified !== '0',
//     [astro_is_verified]
//   )

//   const content = useMemo(() => [astro_description ?? ''], [astro_description])

//   const handleChat = async (e, record) => {
//     e.preventDefault()
//     try {
//       const recordData = {
//         ...cloneDeep(record),
//         sessionID: `sessionID_${Date.now()}`
//       }

//       const res = await getUserDetails()
//       if (res.code !== Codes.SUCCESS) {
//         return TOAST_ERROR(res.message)
//       }

//       const userData = { ...loginUserData, ...res?.data }
//       setLoginUserData(dispatch, is_login, loginUserData, setUserLoginData, res?.data)
//       loginRedirection(userData)

//       const isAI = record?.is_ai_chat == '1'
//       const isFreeChatAvailable = res?.data?.is_freechat_count > 0
//       const walletBalance = +userData?.total_wallet_balance
//       const pricePerMin = +recordData.price_per_min

//       // Non-AI flow: make addChatRequest API call
//       if (!isAI) {
//         const response = await addChatRequest({
//           astrologer_id: record?._id,
//           conversation_types: 'chat'
//         })

//         if (response?.code !== Codes?.SUCCESS) {
//           return TOAST_ERROR(response?.message)
//         }

//         recordData.AstroData = response?.data
//       }

//       // Decide navigation
//       if (isFreeChatAvailable || walletBalance / pricePerMin >= 2) {
//         navigateChat(
//           navigate,
//           dispatch,
//           setAstroDetails,
//           Encryption,
//           recordData,
//           'new',
//           true
//         )
//       } else {
//         dispatch(setAstroPaymentDetails(recordData))
//         navigate(PATHS.MONEY_WALLET)
//       }
//     } catch (error) {
//       TOAST_ERROR(error.message)
//     }
//   }

//   return (<>
//     <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 w-full bg-transparent'>
//       {/* Left Section */}

//       <div className='relative box_shadow_common rounded-[10px] p-6 md:p-8 flex flex-col justify-between gap-6 h-full'>

//         {/* {isVerified && (
//           <div className='absolute bg_website_color text-white px-10 py-1.5 text-xs font-semibold rotate-[315deg] top-3 -left-8 astroDetailBadge rounded'>
//             Rising Star
//           </div>
//         )} */}

//         <div className='flex flex-col sm:flex-row sm:items-start gap-6'>
//           {/* Image */}
//           <div className='flex flex-col items-center gap-3'>
//             <AstrologerImage src={profile_image} alt={name} />
//           </div>

//           {/* Text Info */}
//           <div className='flex flex-col items-start text-center lg:text-left gap-[10px]'>
//             <div className='flex items-start gap-2'>
//               <h2 className='text-[24px] font-semibold'>{name}</h2>
//               {isVerified && (
//                 <img src={badge} alt='badge' className='w-[30px] h-[30px]' />
//               )}
//             </div>

//             <InfoRow icon={experience} text={category} />
//             <InfoRow icon={language} text={astroLanguages} />
//             <InfoRow icon={coach} text={`Exp: ${astroExperience} Years`} />

//             <div className='flex gap-4 mt-1'>
//               <span className='flex items-center gap-2 commonQuesP'>
//                 <img src={message} alt='chat' className='w-[30px] h-[30px]' />
//                 ₹{chatMin}/{t('mins')}
//               </span>
//               <span className='flex items-center gap-2 commonQuesP'>
//                 <img src={call} alt='call' className='w-[30px] h-[30px]' />
//                 ₹{chatMin || 0}/{t('mins')}
//               </span>
//             </div>

//             {/* <p className='website_new_color'>
//               <span className='text-[18px] font-semibold'> ₹{pricePerMin}/min</span>
//             </p> */}
//           </div>
//         </div>

//         {/* Chat / Call Buttons */}
//         <div className='flex gap-4 w-full flex-col sm:flex-row'>

//           <Suspense
//             fallback={<div className='w-full bg-gray-100 h-10 rounded-md' />}
//           >
//             <CustomButton
//               onMouseEnter={() => chatImgRef.current.src = messageNewIcon}
//               onMouseLeave={() => chatImgRef.current.src = messageWhite}
//               className='text-white w-full py-2 text-sm rounded-md flex items-center justify-center gap-2'
//               // onClick={e => handleChat(e, astrologer)}
//               onClick={(e) => {
//                 if (LOGIN_KEY) {
//                   handleChat(e, astrologer)
//                 } else {
//                   openModel(dispatch, 'chat_modal')
//                 }
//               }}
//             >
//               <img ref={chatImgRef} src={messageWhite} alt="" className='w-[23px] h-[22px]' /> {t('start_chat')}
//             </CustomButton>
//           </Suspense>

//           <Suspense fallback={<div className='w-full bg-gray-100 h-10 rounded-md' />} >
//             <CustomButton
//               onMouseEnter={() => callImgRef.current.src = phoneNewIcon}
//               onMouseLeave={() => callImgRef.current.src = callWhite}
//               onClick={(e) => {
//                 if (LOGIN_KEY) {
//                   handleChat(e, astrologer)
//                 } else {
//                   openModel(dispatch, 'chat_modal')
//                 }
//               }}
//               className=' text-white w-full py-2 text-sm rounded-md flex items-center justify-center gap-2'>
//               <img ref={callImgRef} src={callWhite} alt="" className='w-[23px] h-[22px]' />{t('start_call')}
//             </CustomButton>
//           </Suspense>

//         </div>
//       </div>

//       {/* About Me Section */}
//       {
//         astro_description && <div className='bg-white box_shadow_common p-6 md:p-8 rounded-xl h-full flex flex-col justify-between'>
//           <div>
//             <h3 className='text-[18px] font-medium mb-4'>{t('About_Me')}</h3>
//             <div className='max-h-[300px] overflow-y-auto pr-2'>
//               <Suspense
//                 fallback={<div className='min-h-[100vh]'></div>}
//               >
//                 <CommonQuestionComp heading='' content={content} />
//               </Suspense>
//             </div>
//           </div>
//         </div>
//       }

//     </div>

//     <Suspense fallback={<></>}
//     > <PhoneAuthModal
//         isPhoneModalOpen={
//           modal?.is_model && modal?.model_type === 'chat_modal'
//         }
//         issetIsModalOpen={() => {
//           closeModel(dispatch)
//         }}
//       />    </Suspense>

//   </>)
// }

// export default memo(AstrologerCard)



import { cloneDeep } from 'lodash'
import React, { memo, Suspense, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import badge from '../../assets/img/astrologer/badge.svg'
import call from '../../assets/img/astrologer/call.svg'
import callWhite from '../../assets/img/astrologer/callWhite.svg'
import messageWhite from '../../assets/img/astrologer/messageWhite.svg'
import messageNewIcon from '/newThemeHomePage/messageNewIcon.svg'
import phoneNewIcon from '/newThemeHomePage/phoneNewIcon.svg'

import coach from '../../assets/img/astrologer/coach.svg'
import experience from '../../assets/img/astrologer/experience.svg'
import language from '../../assets/img/astrologer/language.svg'
import message from '../../assets/img/astrologer/message.svg'
import { addChatRequest, getUserDetails } from '../../services/api/api.services'
import {
  setAstroDetails,
  setAstroPaymentDetails
} from '../../storemain/slice/astroLogerDetailsSlice'
import { setUserLoginData } from '../../storemain/slice/MasterSlice'
import { closeModel, Encryption, loginRedirection, navigateChat, openModel, setLoginUserData, TOAST_ERROR } from '../../utils/CommonFunction'
import { Codes } from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import { UpdatedPaths } from '../../routers/Paths'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
const PhoneAuthModal = React.lazy(() => import('../auth/PhoneAuthModals'))


const CommonQuestionComp = React.lazy(() => import('../CommonQuestionComp'))
const CustomButton = React.lazy(() => import('../Homepage/CustomButton'))

const AstrologerImage = memo(({ src, alt }) => (
  <div className='w-28 h-28 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow overflow-hidden'>
    <img src={src || Constatnt?.DEFAULT_IMAGE}
      alt={alt}
      onError={e => {
        e.target.onerror = null
        e.target.src = Constatnt?.DEFAULT_IMAGE
      }}
      className='w-full h-full object-cover'
    />
  </div>
))

const InfoRow = memo(({ icon, text }) => (
  <p className='break-words commonQuesP flex gap-2 items-start text-start '>
    <img src={icon} alt='' className='w-[30px] h-[30px]' />
    {text}
  </p>
))

const AstrologerCard = ({ astrologer }) => {
  const { t } = useTranslation()
  const chatImgRef = useRef(null);
  const callImgRef = useRef(null);
  const PATHS = UpdatedPaths()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { is_login, loginUserData } = useSelector(state => state?.masterSlice?.loginUser)
  const LOGIN_KEY = localStorage.getItem(Constatnt?.LOGIN_KEY)

  const modal = useSelector(state => state?.masterSlice?.modal)
  
  const { astro_is_verified, astro_description, name, language: astroLanguages = '', experience: astroExperience = '0', price_per_min: chatMin = '0', astro_call_min: callMin = '0', price_per_min: pricePerMin = '0', category = 'Category', profile_image } = astrologer

  const isVerified = useMemo(
    () => astro_is_verified !== '0',
    [astro_is_verified]
  )

  const content = useMemo(() => [astro_description ?? ''], [astro_description])

  const handleChat = async (e, record) => {
    e.preventDefault()
    try {
      const recordData = {
        ...cloneDeep(record),
        sessionID: `sessionID_${Date.now()}`
      }

      const res = await getUserDetails()
      if (res.code !== Codes.SUCCESS) {
        return TOAST_ERROR(res.message)
      }

      const userData = { ...loginUserData, ...res?.data }
      setLoginUserData(dispatch, is_login, loginUserData, setUserLoginData, res?.data)
      loginRedirection(userData)

      const isAI = record?.is_ai_chat == '1'
      const isFreeChatAvailable = res?.data?.is_freechat_count > 0
      const walletBalance = +userData?.total_wallet_balance
      const pricePerMin = +recordData.price_per_min

      // Non-AI flow: make addChatRequest API call
      if (!isAI) {
        const response = await addChatRequest({
          astrologer_id: record?._id,
          conversation_types: 'chat'
        })

        if (response?.code !== Codes?.SUCCESS) {
          return TOAST_ERROR(response?.message)
        }

        recordData.AstroData = response?.data
      }

      // Decide navigation
      if (isFreeChatAvailable || walletBalance / pricePerMin >= 2) {
        navigateChat(
          navigate,
          dispatch,
          setAstroDetails,
          Encryption,
          recordData,
          'new',
          true
        )
      } else {
        dispatch(setAstroPaymentDetails(recordData))
        navigate(PATHS.MONEY_WALLET)
      }
    } catch (error) {
      TOAST_ERROR(error.message)
    }
  }

  return (<>
    <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 w-full bg-transparent'>
      {/* Left Section */}

      <div className='relative box_shadow_common rounded-[10px] p-6 md:p-8 flex flex-col justify-between gap-6 h-full'>

        {/* {isVerified && (
          <div className='absolute bg_website_color text-white px-10 py-1.5 text-xs font-semibold rotate-[315deg] top-3 -left-8 astroDetailBadge rounded'>
            Rising Star
          </div>
        )} */}

        <div className='flex flex-col sm:flex-row sm:items-start gap-6'>

          {/* Image */}
          <div className='flex flex-col items-center gap-3'>
            <AstrologerImage src={profile_image} alt={name} />
          </div>

          {/* Text Info */}
          <div className='flex flex-col items-start text-center lg:text-left gap-[10px]'>
            <div className='flex items-start gap-2'>
              <h2 className='text-[24px] font-semibold'>{name}</h2>
              {isVerified && (
                <img src={badge} alt='badge' className='w-[30px] h-[30px]' />
              )}
            </div>
                
            <InfoRow icon={experience} text={category.replace(/,/g, ', ')} />
            <InfoRow icon={language} text={astroLanguages.replace(/,/g, ', ')} />
            <InfoRow icon={coach} text={`Exp: ${astroExperience} Years`} />

            <div className='flex gap-4 mt-1'>
              <span className='flex items-center gap-2 commonQuesP'>
                <img src={message} alt='chat' className='w-[30px] h-[30px]' />
                ₹{chatMin}/{t('mins')}
              </span>
              <span className='flex items-center gap-2 commonQuesP'>
                <img src={call} alt='call' className='w-[30px] h-[30px]' />
                ₹{chatMin || 0}/{t('mins')}
              </span>
            </div>

            {/* <p className='website_new_color'>
              <span className='text-[18px] font-semibold'> ₹{pricePerMin}/min</span>
            </p> */}
          </div>
        </div>

        {/* Chat / Call Buttons */}
        <div className='flex gap-4 w-full flex-col sm:flex-row'>
          <Suspense fallback={<div className='w-full bg-gray-100 h-10 rounded-md' />} >
            <CustomButton
              onMouseEnter={() => chatImgRef.current.src = messageNewIcon}
              onMouseLeave={() => chatImgRef.current.src = messageWhite}
              className='text-white w-full py-2 text-sm rounded-md flex items-center justify-center gap-2'
              // onClick={e => handleChat(e, astrologer)}
              onClick={(e) => {
                if (LOGIN_KEY) {
                  handleChat(e, astrologer)
                } else {
                  openModel(dispatch, 'chat_modal')
                }
              }}
            >
              <img ref={chatImgRef} src={messageWhite} alt="" className='w-[23px] h-[22px]' /> {t('start_chat')}
            </CustomButton>
          </Suspense>

          <Suspense fallback={<div className='w-full bg-gray-100 h-10 rounded-md' />} >
            <CustomButton
              onMouseEnter={() => callImgRef.current.src = phoneNewIcon}
              onMouseLeave={() => callImgRef.current.src = callWhite}
              onClick={(e) => {
                if (LOGIN_KEY) {
                  handleChat(e, astrologer)
                } else {
                  openModel(dispatch, 'chat_modal')
                }
              }}
              className=' text-white w-full py-2 text-sm rounded-md flex items-center justify-center gap-2'>
              <img ref={callImgRef} src={callWhite} alt="" className='w-[23px] h-[22px]' />{t('start_call')}
            </CustomButton>
          </Suspense>

        </div>
      </div>

      {/* About Me Section */}
      {
        astro_description && <div className='bg-white box_shadow_common p-6 md:p-8 rounded-xl h-full flex flex-col justify-between'>
          <div>
            <h3 className='text-[18px] font-medium mb-4'>{t('About_Me')}</h3>
            <div className='max-h-[300px] overflow-y-auto pr-2'>
              <Suspense
                fallback={<div className='min-h-[100vh]'></div>}
              >
                <CommonQuestionComp heading='' content={content} />
              </Suspense>
            </div>
          </div>
        </div>
      }

    </div>

    <Suspense fallback={<></>}
    > <PhoneAuthModal
        isPhoneModalOpen={
          modal?.is_model && modal?.model_type === 'chat_modal'
        }
        issetIsModalOpen={() => {
          closeModel(dispatch)
        }}
      />    </Suspense>

  </>)
}

export default memo(AstrologerCard)
