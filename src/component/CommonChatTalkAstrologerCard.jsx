import { cloneDeep } from 'lodash'
import React, { lazy, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Slider from 'react-slick'
import '../assets/css/commonChatAstro.css'
import NoDataFound from '../pages/NoDataFound/NoDataFound'
// import { PATHS } from '../routers/Paths'
import { addChatRequest, getUserDetails } from '../services/api/api.services'
import {
  setAstroDetails,
  setAstroPaymentDetails
} from '../storemain/slice/astroLogerDetailsSlice'
import { setUserLoginData } from '../storemain/slice/MasterSlice'
import {
  closeModel,
  Encryption,
  loginRedirection,
  navigateChat,
  openModel,
  setLoginUserData,
  TOAST_ERROR
} from '../utils/CommonFunction'
import { Codes } from '../utils/CommonVariable'
import { Constatnt } from '../utils/Constent'
import experience from '/newThemeHomePage/experience.svg'
import language from '/newThemeHomePage/language.svg'
import messageNewIcon from '/newThemeHomePage/messageNewIcon.svg'
import phoneNewIcon from '/newThemeHomePage/phoneNewIcon.svg'
import yelloStar from '/newThemeHomePage/star.svg'
import { useTranslation } from 'react-i18next'
import { UpdatedPaths } from '../routers/Paths'
import { astrologerDetailsRedirection } from '../utils/navigations/NavigationPage'
import PhoneAuthModal from './auth/PhoneAuthModals'

const CustomWhiteButton = lazy(() => import('./Homepage/CustomWhiteButton'))

function ChatWithAstrologerCard({ astrologersList, loading_type = '' }) {
  const { t } = useTranslation()
  const { is_login, loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )
  const is_login_local = localStorage.getItem(Constatnt?.LANGUAGE_KEY)
  const modal = useSelector(state => state?.masterSlice?.modal)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const PATHS = UpdatedPaths()

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
      setLoginUserData(
        dispatch,
        is_login,
        loginUserData,
        setUserLoginData,
        res?.data
      )
      loginRedirection(userData)

      const isAI = record?.is_ai_chat === '1'
      const isFreeChatAvailable = res?.data?.is_freechat_count > 0
      const walletBalance = +userData?.total_wallet_balance
      const pricePerMin = +recordData.price_per_min

      // Non-AI flow: make addChatRequest API call
      if (!isAI) {
        const response = await addChatRequest({
          astrologer_id: record?._id,
          conversation_types: 'chat'
        })

        if (response.code !== Codes.SUCCESS) {
          return TOAST_ERROR(response.message)
        }

        recordData.AstroData = response.data
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

  const renderCard1 = useCallback((astrologer, index) => {
    return (
      <div
        key={index}
        className={`w-full  rounded-[10px]  box_shadow_common flex flex-col gap-4 bg-white max-w-[350px] sm:max-w-[unset] mx-auto sm:mx-[unset] ${index === 0 ? "mt-4 sm:mt-0" : ""}`}
      >
        <div className='py-5 px-[15px] astroBg_part h-full flex flex-col justify-between '>
          {/* Header Section: Profile Image + Name + Skills + Minutes at bottom right */}
          <div className='pb-4'>
            <div className='flex justify-between items-start gap-2'>
              {/* Left: Profile Image + Name + Skills */}
              <div className='flex flex-col gap-[5px] w-full'>
                {/* Profile Image with Status Badge */}
                <div className=' flex items-center justify-center w-full'>
                  <img
                    src={astrologer?.profile_image || Constatnt?.DEFAULT_IMAGE}
                    alt={astrologer?.name}
                    className='w-[80px] h-[80px] rounded-full object-cover cursor-pointer'
                    onClick={() =>
                      // navigate(`/astrologerDetailPage/${astrologer?._id}`)
                      astrologerDetailsRedirection(navigate, PATHS?.ASTROLOGER_DETAIL_PAGE, astrologer?._id)
                    }
                    loading='lazy'
                    decoding='async'
                    width={60}
                    height={60}
                  />
                </div>

                {/* Name & Skills */}
                <div className='flex flex-col justify-center items-center gap-1'>
                  <h2
                    className='text-[18px] font-semibold text-gray-800 cursor-pointer capitalize new_body_font'
                    onClick={() =>
                      // navigate(`/astrologerDetailPage/${astrologer?._id}`)
                      astrologerDetailsRedirection(navigate, PATHS?.ASTROLOGER_DETAIL_PAGE, astrologer?._id)
                    }
                  >
                    {astrologer?.name || '-'}
                  </h2>
                  <span className='text-[14px] text-gray-600  line-clamp-1 new_body_font'>
                    {astrologer?.skills ? astrologer.skills.split(',').slice(0, 3).join(', ') : '-'}
                  </span>
                </div>
              </div>
            </div>
            {/* Bottom Right: Minutes */}
            {/* <div className="flex items-center gap-1 mt-auto text-xs text-gray-500 justify-end">
            <img src={messageTalk} className="w-[14px] h-[14px]" alt="Minutes" />
            <span>{astrologer?.minutes || '49k'} Mins</span>
          </div> */}
          </div>
          <div className='border_astro_parent relative'>
            <div className='border_astro_img'></div>
            <div className='border_astro_line'></div>
          </div>
          {/* Info Section */}
          <div className='grid grid-cols-2 gap-x-4 gap-y-4 text-sm text-gray-700 pt-5'>
            {/* Experience */}
            <div className='flex items-center gap-2 col-span-1'>
              <img
                src={experience}
                className='w-[18px] h-[18px]'
                alt='Experience'
                loading='lazy'
                decoding='async'
                width={18}
                height={18}
              />
              <span className='new_body_font'>
                Exp : {astrologer?.experience || 18} Years
              </span>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-2 col-span-1 justify-end'>
              <img
                src={yelloStar}
                alt='Rating'
                className='w-[16px] h-[16px]'
                loading='lazy'
                decoding='async'
                width={16}
                height={16}
              />
              <span className='font-medium text-[14px] text-[#343434]'>
                {astrologer?.orders || 0}
                {/* || 4.5} (
                {astrologer?.total_rating || '2k+'}) */}
              </span>
            </div>

            {/* Language */}
            <div className='flex items-center gap-2 col-span-2'>
              <img
                src={language}
                className='w-[18px] h-[18px]'
                alt='Languages'
                loading='lazy'
                decoding='async'
                width={18}
                height={18}
              />
              <span className='new_body_font'>
                {astrologer?.language?.split(',').slice(0, 3).join(', ') || '-'}
              </span>
            </div>
          </div>

          {/* Bottom: Rate & Actions */}
          <div className='flex justify-between items-center pt-5 w-full'>
            {/* Prices */}
            <div className='flex  items-center text-sm font-semibold text-primary w-full justify-between'>
              {/* Call Rate */}
              <div className='flex items-center gap-1 gradient-background rounded-[76px] p-[1px]'>
                <CustomWhiteButton
                  // onClick={e => {
                  //   e.stopPropagation()
                  //   // handleCall(astrologer?._id)
                  // }}
                  onClick={(e) => {
                    if (is_login && is_login_local) {
                      // handleChat(e, astrologer)
                    } else {
                      openModel(dispatch, 'chat_modal')
                    }
                  }}
                  className='px-3 py-1 rounded-[76px] text-sm !border-0'
                  parentClassName='!p-0'
                >
                  <div className='flex gap-1  items-center'>
                    <img
                      src={phoneNewIcon}
                      className='w-[15px] h-[15px]'
                      alt='Call'
                      loading='lazy'
                      decoding='async'
                      width={15}
                      height={15}
                    />
                    <span className='website_new_color text-left'>
                      ₹{astrologer?.call_rate || astrologer?.rate || 100} / {t('Min')}
                    </span>
                  </div>
                </CustomWhiteButton>
              </div>

              {/* Chat Rate */}
              <div className='flex items-center gap-1 gradient-background rounded-[76px]  p-[1px]'>
                <CustomWhiteButton
                  // onClick={e => handleChat(e, astrologer)}
                  onClick={(e) => {
                    if (is_login && is_login_local) {
                      handleChat(e, astrologer)
                    } else {
                      openModel(dispatch, 'chat_modal')
                    }
                  }}
                  className='px-3 py-1 rounded-[76px] text-sm !border-0'
                  parentClassName='!p-0'

                >
                  <div className='flex gap-1 items-center'>
                    <img
                      src={messageNewIcon}
                      className='w-[15px] h-[15px]'
                      alt='Chat'
                      loading='lazy'
                      decoding='async'
                      width={15}
                      height={15}
                    />
                    <span className='website_new_color text-left'>
                      {' '}
                      ₹{astrologer?.price_per_min || astrologer?.rate || 10} /
                      {t('Min')}
                    </span>
                  </div>
                </CustomWhiteButton>
              </div>
            </div>
            {/* Buttons */}
          </div>
        </div>
      </div>
    )
  }, [is_login_local, is_login])

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 400,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 600, // Tailwind's sm: 640px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    slidesToScroll: 1,
    arrows: false
  }

  return (
    <>
      {/* 🟡 Grid View for md+ screens */}
      {/* <div className='hidden md:grid gap-x-5 gap-y-[30px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  '>
        {astrologersList?.length > 0
          ? astrologersList?.map((astro, index) => (
              <React.Fragment key={index}>
                {renderCard1(astro, index)}
              </React.Fragment>
            ))
          : loading_type === '' && (
              <div className='col-span-full flex justify-center '>
                <NoDataFound />
              </div>
            )}
      </div>

      <div className='block md:hidden px-3 renderChatCard'>
        {astrologersList?.length > 0 ? (
          <Slider {...sliderSettings}>
            {astrologersList?.map((astro, index) => (
              <div key={index} className='px-2 py-10'>
                {renderCard1(astro, index)}
              </div>
            ))}
          </Slider>
        ) : (
          loading_type === '' && <NoDataFound />
        )}
      </div>
      {loading_type === 'chat_with_astrologer' && <Loader />} */}

      <div className='grid gap-x-[20px] gap-y-[20px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  '>
        {astrologersList?.length > 0
          ? astrologersList?.map((astro, index) => (
            <React.Fragment key={index}>
              {renderCard1(astro, index)}
            </React.Fragment>
          ))
          : loading_type === '' && (
            <div className='col-span-full flex justify-center '>
              <NoDataFound />
            </div>
          )}
      </div>

      <PhoneAuthModal
        isPhoneModalOpen={
          modal?.is_model && modal?.model_type === 'chat_modal'
        }
        issetIsModalOpen={() => {
          closeModel(dispatch)
        }}
      />
    </>
  )
}

export default React.memo(ChatWithAstrologerCard)
