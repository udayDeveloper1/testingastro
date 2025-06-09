import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { cloneDeep } from 'lodash'
import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import appLogo from '../../assets/img/mainLogo.webp'
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))
import {
  addRecharge,
  applyCoupon,
  verifyPayment
} from '../../services/api/api.services'
import { Codes } from '../../utils/CommonVariable'
import {
  closeModel,
  openModel,
  TOAST_ERROR,
  TOAST_SUCCESS
} from '../../utils/CommonFunction'
import PaymentIntegration from '../../component/PaymentIntegration/PaymentIntegration'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { paymentScreenRedirection } from '../../utils/navigations/NavigationPage'
import { Constatnt } from '../../utils/Constent'
import { setLoading, setUserLoginData } from '../../storemain/slice/MasterSlice'
import celebrationimg from '../../assets/img/transaction/celebration.gif'
// import { PATHS } from '../../routers/Paths'
import ConfirmModal from '../../component/Modals/ConfirmModal'
import { UpdatedPaths } from '../../routers/Paths'

export default function PaymentDetails ({
  openInModel = false,
  paymentDetailsData = {},
  onPaymentSuccess = () => {}
}) {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
    const PATHS = UpdatedPaths()

  const [couponCode, setCouponCode] = useState('')
  const { is_login, loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )
  const modal = useSelector(state => state?.masterSlice?.modal)

  const loading = useSelector(state => state?.masterSlice?.loader?.is_loading)
  const [appliedCoupon, setAppliedCoupon] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false)
  const [urlObj, setUrlObj] = useState({})

  const [paymentCalculation, setPaymentCalculation] = useState({
    price: 0,
    gst: 0,
    totalAmount: 0,
    addRechargeAmount: 0,
    offerInPercentage: 0,
    currency: 'INR',
    currencySymbol: '₹'
  })

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code.')
      return
    }

    applyCoupon().then(response => {
      if (response?.code === Codes?.SUCCESS) {
        TOAST_SUCCESS(response?.message)
        setCouponError('')
        setAppliedCoupon(true)
      } else {
        TOAST_ERROR(response?.message)
      }
    })
  }

  const handleRemoveCoupon = () => {
    setCouponCode('')
    setAppliedCoupon(false)
  }

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
        coupon_code: ''
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
          name: 'Chat My Astrologer App Recharge',
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
    } catch (error) {}
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
    if (id || Object.keys(paymentDetailsData)?.length > 0) {
      let dataa
      if (Object.keys(paymentDetailsData)?.length > 0) {
        dataa = paymentDetailsData
      } else {
        const base64Decoded = atob(id)
        dataa = Object.fromEntries(new URLSearchParams(base64Decoded).entries())
      }

      setUrlObj(dataa)
      const price = parseFloat(dataa?.price) || 0
      const gst = parseFloat((price * 0.18).toFixed(2))
      const offer = parseFloat(dataa?.offer) || 0
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
      <section className='pt-3'>
        <div className='bg-white rounded-[10px]  w-full container padding100 mx-auto '>
          <div className='shadow-[0px_0px_35px_0px_#0000000D] p-[15px] md:p-10 w-full rounded-[10px] max-w-[800px] mx-auto'>
            <h1 className='text-2xl font-semibold mb-3 md:mb-6'>Payment Details</h1>
            <div className='space-y-2 mb-6 border-[#F2ECF6] border  rounded-[10px] '>
              <div className='flex justify-between  commonLightBack rounded py-4 px-7 mb-0'>
                <span className='font-medium'>Total Amount</span>
                <span>
                  {paymentCalculation?.currencySymbol}
                  {paymentCalculation?.price}
                </span>
              </div>

              <div className='flex justify-between py-4 px-7 border-t border-[#F2ECF6] border-b'>
                <span className='font-medium'>GST @ 18%</span>
                <span>
                  {paymentCalculation?.currencySymbol}
                  {paymentCalculation?.gst}
                </span>
              </div>

              <div className='flex justify-between py-4 px-7'>
                <span className='font-medium'>Total Payable Amount</span>
                <span>
                  {paymentCalculation?.currencySymbol}
                  {paymentCalculation?.totalAmount}
                </span>
              </div>
            </div>

            {urlObj?.offer !== '' && (
              <div className='commonLightBack p-4 rounded-lg mb-6 '>
                <div className='grid md:gap-5 md:grid-cols-[auto_3fr] items-start md:items-center '>
                  <div className=''>
                    <p className='website_color font-bold mb-0 text-[30px]'>
                      %
                    </p>
                  </div>
                  <div className=' flex justify-between flex-row items-start'>
                    <div>
                      <p className='website_color font-bold mb-0'>
                        Coupon Applied
                      </p>
                      <p className='new_body_font md:text-lg  font-semibold mb-0'>
                        {paymentCalculation?.currencySymbol} {urlObj?.offer}{' '}
                        Cashback in Wallet after Recharge
                      </p>
                    </div>
                    <div
                      className='bg_website_color rounded-[50%] p-1 w-[20px] h-[20px] flex items-center justify-center cursor-pointer'
                      onClick={cancelOffer}
                    >
                      <FontAwesomeIcon icon={faTimes} className='text-white' />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className='w-full flex justify-between items-center'>
              <CustomButton
                className=' text-white py-3 rounded font-medium'
                onClick={handlePayment}
              >
                {/* {modal?.model_type == 'coupon_model' ? 'Paying...' : ''} */}
                PAY NOW
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
      <ConfirmModal
        isOpen={modal?.is_model && modal?.model_type == 'coupon_model'}
        title={`Wow ${paymentCalculation?.offerInPercentage}% Coupon Applied!!`}
        description=''
        okText=''
        cancelText=''
        imageSrc={celebrationimg}
        imgClass='max-w-[100px] mx-auto block mt-5'
      />
    </>
  )
}
