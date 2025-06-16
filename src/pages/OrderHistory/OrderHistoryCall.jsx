import { cloneDeep } from 'lodash';
import { lazy, Suspense, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Eagerly loaded components
import CommonBanner from '../../component/CommonBanner';

const Loader = lazy(() => import('../../component/loader/Loader'));
const AstrologerChatCard = lazy(() => import('../../component/Transaction/AstrologerChatCard'));
const NoDataFound = lazy(() => import('../NoDataFound/NoDataFound'));

// API services
import {
  getUserDetails,
  orderHistoryChat
} from '../../services/api/api.services';

// Redux slices
import {
  setAstroDetails,
} from '../../storemain/slice/astroLogerDetailsSlice';
import { setUserLoginData } from '../../storemain/slice/MasterSlice';

// Constants & utility functions
import {
  Encryption,
  loginRedirection,
  navigateChat,
  setLoginUserData,
  TOAST_ERROR
} from '../../utils/CommonFunction';
import { Codes } from '../../utils/CommonVariable';



function OrderHistoryCall() {
  const [active, setActive] = useState('1')
  const [astrologers, setAstrologers] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

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

      const isAI = recordData?.is_ai_chat == '1'
      const isFreeChatAvailable = res?.data?.is_freechat_count > 0
      const walletBalance = +userData?.total_wallet_balance
      const pricePerMin = +recordData.receiver_price_per_min



      recordData.isAI = isAI
      recordData.isFreeChatAvailable = isFreeChatAvailable
      recordData.walletBalance = walletBalance
      recordData.pricePerMin = pricePerMin

      navigateChat(
        navigate,
        dispatch,
        setAstroDetails,
        Encryption,
        recordData,
        'history',
        true
      )
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
<Suspense fallback={<div className='min-h-[100vh]'></div>}>
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
                      historyType='Call'
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
      </Suspense>
    </>
  )
}

export default React.memo(OrderHistoryCall)

