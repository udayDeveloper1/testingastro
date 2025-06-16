import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { cloneDeep } from 'lodash';

// Lazy-loaded components
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'));
const PriceCard = lazy(() => import('../../component/Payment/PriceCard'));

// Static assets
import appLogo from '/loader.png';

// API services
import {
  addRecharge,
  verifyPayment
} from '../../services/api/api.services';

// Redux actions
import { setLoading, setUserLoginData } from '../../storemain/slice/MasterSlice';

// Utilities & constants
import {
  closeModel,
  openModel
} from '../../utils/CommonFunction';
import { Constatnt } from '../../utils/Constent';
import { UpdatedPaths } from '../../routers/Paths';
import { paymentScreenRedirection } from '../../utils/navigations/NavigationPage';


function PaymentDetails ({
  openInModel = false,
  paymentDetailsData = {},
  onPaymentSuccess = () => { }
}) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const PATHS = UpdatedPaths()

  // const [couponCode, setCouponCode] = useState('')
  const { is_login, loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )
  const modal = useSelector(state => state?.masterSlice?.modal)

  // const loading = useSelector(state => state?.masterSlice?.loader?.is_loading)
  // const [appliedCoupon, setAppliedCoupon] = useState(false)
  // const [couponError, setCouponError] = useState('')
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)
  const [urlObj, setUrlObj] = useState({})
  const [walletList, setWalletList] = useState([])
  const [animateCoupon, setAnimateCoupon] = useState(false);

  const [paymentCalculation, setPaymentCalculation] = useState({
    price: 0,
    gst: 0,
    totalAmount: 0,
    addRechargeAmount: 0,
    offerInPercentage: "0",
    currency: 'INR',
    currencySymbol: '₹'
  })
  useEffect(() => {
    if (urlObj?.offer) {
      setAnimateCoupon(false); // Reset
      // Slight delay to allow class removal
      setTimeout(() => {
        setAnimateCoupon(true); // Trigger animation again
      }, 10);
    }
  }, [paymentCalculation]);

  const cancelOffer = async () => {
    let datas = cloneDeep(urlObj)
    datas.offer = ''
    const price = parseFloat(datas?.price) || 0
    let offerInPercentage = 0
    let addRechargeAmount = price
    setPaymentCalculation(prev => ({
      ...prev,
      addRechargeAmount,
      offerInPercentage
    }))
    setUrlObj(datas)
  }

  const handlePayment = async () => {
    let loaderPayload = {
      is_loading: true,
      loding_type: 'payment'
    }
    dispatch(setLoading(loaderPayload))
    try {
      let order_id = ''
      const payload = {
        amount: paymentCalculation?.addRechargeAmount,
        currency: paymentCalculation?.currency,
        receipt: `order_rcptid-${Date.now()}`,
        coupon_code: ""
      }
      let response = await addRecharge(payload)
      if (response?.code === 1) {
        order_id = response?.data?.order?.id
        if (!isRazorpayLoaded) {
          alert('Razorpay SDK not loaded yet. Please try again in a moment.')
          let loaderPayload = {
            is_loading: false,
            loding_type: 'payment'
          }
          dispatch(setLoading(loaderPayload))
          return
        }

        const options = {
          key: Constatnt?.VITE_APP_RAZORPAY_KEY_ID,
          amount: paymentCalculation?.totalAmount * 100,
          currency: paymentCalculation?.currency,
          name: 'Chat My Astrologer',
          description: 'Test Transaction',
          image: appLogo,
          prefill: {
            email: '',
            contact: ''
          },
          handler: async function (response) {
            let loaderPayload = {
              is_loading: false,
              loding_type: 'payment'
            }

            let payload = {
              order_id: order_id,
              payment_id: response?.razorpay_payment_id,
              signature: `${Date.now()}`,
              extraPercentage: paymentCalculation?.offerInPercentage
            }

            try {
              let res = await verifyPayment(payload)

              if (res?.code === 1) {
                let ASTRO_auth = localStorage.getItem(Constatnt.AUTH_KEY)
                  ? JSON.parse(localStorage.getItem(Constatnt.AUTH_KEY))
                  : {}
                if (Object.keys(ASTRO_auth)?.length > 0) {
                  ASTRO_auth.total_wallet_balance =
                    res?.data?.total_wallet_balance
                  localStorage.setItem(
                    Constatnt.AUTH_KEY,
                    JSON.stringify(ASTRO_auth)
                  )
                  let loginUserData = cloneDeep(ASTRO_auth)
                  dispatch(
                    setUserLoginData({
                      is_login: is_login,
                      loginUserData: loginUserData
                    })
                  )
                }
                if (!openInModel) {
                  navigate(PATHS.CHATWITHASTROLOGERS)
                } else {
                  onPaymentSuccess()
                }
              }
            } catch (error) {
              console.error('Verification failed', error)
            }

            dispatch(setLoading(loaderPayload))
          },
          config: {
            display: {
              preferences: {
                show_default_blocks: true
              }
            }
          },
          modal: {
            ondismiss: function () {
              const confirmClose = window.confirm(
                'Are you sure you want to close the payment form?'
              )
              let loaderPayload = {
                is_loading: false,
                loding_type: 'payment'
              }
              dispatch(setLoading(loaderPayload))
            }
          }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
      }
    } catch (error) { }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setIsRazorpayLoaded(true)
    script.onerror = () => console.error('Failed to load Razorpay SDK')
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (Object.keys(paymentDetailsData)?.length > 0) {
      let dataa
      if (Object.keys(paymentDetailsData)?.length > 0) {
        dataa = paymentDetailsData

      } else {
        const base64Decoded = atob(id)
        dataa = Object.fromEntries(new URLSearchParams(base64Decoded).entries())

      }
      const parsedData = {
        data: dataa,
        walletList: dataa.walletList
      };
      setWalletList(parsedData?.walletList)
      setUrlObj(parsedData?.data)
    
      const price = parseFloat(parsedData?.data?.price) || 0
      const gst = parseFloat((price * 0.18).toFixed(2))
      const offer = parseFloat(parsedData?.data?.offer) || 0
      const totalAmount = parseFloat((price + gst).toFixed(2))
      let offerInPercentage = 0
      let addRechargeAmount = 0
      if (dataa?.type === 'percentage') {
        addRechargeAmount = (price + (price * offer) / 100)?.toFixed(2)
        offerInPercentage = offer
      } else {
        addRechargeAmount = (price + offer)?.toFixed(2)
        offerInPercentage = ((offer * 100) / price)?.toFixed(2)
      }

      setPaymentCalculation(prev => ({
        ...prev,
        price,
        gst,
        totalAmount,
        addRechargeAmount,
        offerInPercentage
      }))
      if (offer !== '' && !openInModel) {
        openModel(dispatch, 'coupon_model')
        setTimeout(() => {
          closeModel(dispatch)
        }, 2000)
      }
    }
         
 else {
   let dataa
        const base64Decoded = atob(id)
        dataa = Object.fromEntries(new URLSearchParams(base64Decoded).entries())
const parsedData = {
        data: JSON.parse(dataa.data),
        walletList: JSON.parse(dataa.walletList)
      };
      setWalletList(parsedData?.walletList)
      setUrlObj(parsedData?.data)
    
      const price = parseFloat(parsedData?.data?.price) || 0
      const gst = parseFloat((price * 0.18).toFixed(2))
      const offer = parseFloat(parsedData?.data?.offer) || 0
      const totalAmount = parseFloat((price + gst).toFixed(2))
      let offerInPercentage = 0
      let addRechargeAmount = 0
      if (dataa?.type === 'percentage') {
        addRechargeAmount = (price + (price * offer) / 100)?.toFixed(2)
        offerInPercentage = offer
      } else {
        addRechargeAmount = (price + offer)?.toFixed(2)
        offerInPercentage = ((offer * 100) / price)?.toFixed(2)
      }

      setPaymentCalculation(prev => ({
        ...prev,
        price,
        gst,
        totalAmount,
        addRechargeAmount,
        offerInPercentage
      }))
         if (offer !== '' && !openInModel) {
        openModel(dispatch, 'coupon_model')
        setTimeout(() => {
          closeModel(dispatch)
        }, 2000)
      }
      }
  }, [id])

  return (
    <>
    <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section className={`pt-3   ${!openInModel ? "paddingBottom100" : "" }`}>
        {/* Header Section */}
{!openInModel &&            <div className="flex flex-wrap justify-between paddingTop100 paddingBottom50 md:items-center gap-5 container mx-auto">
          <div className="flex flex-col w-full sm:w-[48%]">
            <h2 className="text-[24px] md:text-[40px] font-semibold new_body_font pb-2 mb-0">
              {t('add_mony_to_wallet')}
            </h2>
            <p className="text-[16px] font-semibold mb-0">
              {t('choose_from_avilable_recharge_pack')}
            </p>
          </div>

          <div className="flex justify-between items-center p-[20px] md:p-[30px] rounded-xl relative bg-[linear-gradient(90deg,_#fdf3ec_0%,_#f9e9ec_100%)] w-full sm:w-[48%] available_balance">
            <span className="text-[16px] md:text-[18px] font-medium text-black">
              {t('Available_Balance')}:
            </span>
            <span className="text-[25px] md:text-[30px] lg:text-[36px] font-semibold bg-[linear-gradient(90deg,_#c32853_0%,_#ee7e49_100%)] bg-clip-text text-transparent">
              ₹{loginUserData?.total_wallet_balance}
            </span>
          </div>
        </div>}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px] container mx-auto">
          {/* PriceCard List */}
 {!openInModel &&         <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {walletList?.length > 0 ? (
                walletList.map((item, index) => (
                  <PriceCard
                    key={index}
                    openInModel={openInModel}
                    data={item}
                    price={item?.price}
                    extraLabel={
                      item?.type === 'percentage'
                        ? `${t('get')} ${item?.offer}% ${t('extra')}`
                        : item?.type === 'flat'
                          ? `₹ ${item?.offer} ${t('flat')}`
                          : ''
                    }
                    onClick={(data) => {
                      const finalData = {
                        data: JSON.stringify(data),
                        walletList: JSON.stringify(walletList),
                      };

                      if (!openInModel) {
                        paymentScreenRedirection(navigate, finalData, PATHS?.PAYMENT_SCREEN);
                      } else {
                        handlePriceCardClick(data);
                      }
                    }}
                    classList={`${paymentCalculation?.price == item?.price ? "new_border_3" : ""}`}
                  />
                ))
              ) : (
                <p>{t('no_data_found')}</p>
              )}
            </div>
          </div>}

          {/* Payment Details */}
          <div className={`bg-white rounded-[10px] shadow-[0px_0px_35px_0px_#0000000D] p-4 md:p-10 w-full max-w-[800px] order-1 lg:order-2 ${!openInModel ? "" : "col-span-2" }`}>
            <h1 className="text-2xl font-semibold mb-6">Payment Details</h1>

            <div className="space-y-2 mb-6 border border-[#F2ECF6] rounded-[10px] overflow-hidden">
              <div className="flex justify-between commonLightBack py-4 px-7">
                <span className="font-medium">Total Amount</span>
                <span>
                  {paymentCalculation?.currencySymbol}
                  {paymentCalculation?.price}
                </span>
              </div>

              <div className="flex justify-between py-4 px-7 border-t border-b border-[#F2ECF6]">
                <span className="font-medium">GST @ 18%</span>
                <span>
                  {paymentCalculation?.currencySymbol}
                  {paymentCalculation?.gst}
                </span>
              </div>

              <div className="flex justify-between py-4 px-7">
                <span className="font-medium">Total Payable Amount</span>
                <span>
                  {paymentCalculation?.currencySymbol}
                  {paymentCalculation?.totalAmount}
                </span>
              </div>
            </div>

            {/* Coupon Applied */}
            {urlObj?.offer && (
              <div
                className={`commonLightBack p-4 rounded-lg mb-6 ${animateCoupon ? 'coupon-effect' : ''
                  }`}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-4 items-center">
                  <p className="website_color font-bold text-[30px] m-0">%</p>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="website_color font-bold mb-0">Coupon Applied</p>
                      <p className="new_body_font md:text-lg font-semibold mb-0">
                        {paymentCalculation?.currencySymbol} {urlObj?.offer} Cashback in Wallet after Recharge
                      </p>
                    </div>
                    <div
                      className="bg_website_color rounded-full p-1 w-[20px] h-[20px] flex items-center justify-center cursor-pointer"
                      onClick={cancelOffer}
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}



            {/* Pay Button */}
            <div className="w-full flex justify-end">
              <CustomButton
                className="text-white py-3 px-6 rounded font-medium"
                onClick={handlePayment}
              >
                PAY NOW
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
      </Suspense>
    </>
  )
}

export default React.memo(PaymentDetails)
