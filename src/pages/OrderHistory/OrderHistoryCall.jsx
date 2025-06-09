import { lazy, useLayoutEffect, useState } from 'react'
// import transactionPayment from '../../assets/img/banner/transactionPayment.webp'
// import TransactionWalletImage from '../../assets/img/banner/TransactionWallet.webp'
import CommonBanner from '../../component/CommonBanner'

import { cloneDeep } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import Loader from '../../component/loader/Loader'
import AstrologerChatCard from '../../component/Transaction/AstrologerChatCard'
// import { PATHS } from '../../routers/Paths'
import {
  addChatRequest,
  getUserDetails,
  orderHistoryChat
} from '../../services/api/api.services'
import {
  setAstroDetails,
  setAstroPaymentDetails
} from '../../storemain/slice/astroLogerDetailsSlice'

import {
  Encryption,
  loginRedirection,
  navigateChat,
  setLoginUserData,
  TOAST_ERROR
} from '../../utils/CommonFunction'

import NoDataFound from '../NoDataFound/NoDataFound'
import { Codes } from '../../utils/CommonVariable'
import CustomWhiteButton from '../../component/Homepage/CustomWhiteButton'
import { setUserLoginData } from '../../storemain/slice/MasterSlice'
import { UpdatedPaths } from '../../routers/Paths'
import { useTranslation } from 'react-i18next'
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))

function OrderHistoryCall () {
  const [active, setActive] = useState('1')
  const [astrologers, setAstrologers] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const PATHS = UpdatedPaths()

  const { is_login, loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )

  const [loading, setLoading] = useState(true)

  const getOrderChatDetails = async () => {
    setLoading(true)
    try {
      const response = await orderHistoryChat()
      if (response?.code === 1) {
        setAstrologers(response?.data)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }

  const handleChat = async (e, record) => {
    e.preventDefault()
    try {
      const recordData = {
        ...cloneDeep(record),
        sessionID: `sessionID_${Date.now()}`
      }
      recordData.price_per_min = recordData?.receiver_price_per_min
      recordData.profile_image = recordData?.receiver_profile
      recordData.name = recordData?.receiver_name
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

      const isAI = record?.is_ai_chat == '1'
      const isFreeChatAvailable = res?.data?.is_freechat_count > 0
      const walletBalance = +userData?.total_wallet_balance
      const pricePerMin = +recordData.receiver_price_per_min

      if (!isAI) {
        const response = await addChatRequest({
          astrologer_id: record?.receiver_id,
          conversation_types: 'chat'
        })

        if (response.code !== Codes.SUCCESS) {
          return TOAST_ERROR(response.message)
        }

        recordData.AstroData = response.data
      }

      if (isFreeChatAvailable || walletBalance / pricePerMin >= 2) {
        navigateChat(
          navigate,
          dispatch,
          setAstroDetails,
          Encryption,
          recordData,
          'history',
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

  useLayoutEffect(() => {
    getOrderChatDetails()
  }, [])

  return (
    <>
      <section>
        <div className=''>
          <CommonBanner text={t('order_history')} />
        </div>
      </section>

      <section>
        <div className='container padding50 '>
          {active === '0' ? (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {astrologers.map((astro, index) => (
                  <AstrologerChatCard
                    key={index}
                    astro={astro}
                    historyType='Call'
                  />
                ))}
              </div>
            </>
          ) : active === '1' ? (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {astrologers.map((astro, index) => {
                  return (
                    <AstrologerChatCard
                      key={index}
                      astro={astro}
                      historyType='Chat'
                      handleChat={e => handleChat(e, astro)}
                    />
                  )
                })}
              </div>
            </>
          ) : (
            <></>
          )}
          {loading && <Loader />}
          {!loading && astrologers?.length === 0 && (
            <>
              <NoDataFound classList='pt-10' />
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default OrderHistoryCall
