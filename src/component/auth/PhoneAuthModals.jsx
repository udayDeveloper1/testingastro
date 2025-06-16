import React, { memo, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-phone-input-2/lib/style.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import phone from '../../assets/img/Phone/phone.webp'
// import { PATHS } from '../../routers/Paths'
import { login, sendOTP } from '../../services/api/api.services'

import { setUserLoginData } from '../../storemain/slice/MasterSlice'

import { useTranslation } from 'react-i18next'
import { UpdatedPaths } from '../../routers/Paths'
import {
  closeModel,
  loginRedirection,
  TOAST_ERROR
} from '../../utils/CommonFunction'
import { Codes } from '../../utils/CommonVariable'
const PhoneInput = React.lazy(() => import('react-phone-input-2'))
const CustomButton = React.lazy(() => import('../Homepage/CustomButton'))

const PhoneAuthModal = memo(({ isPhoneModalOpen, issetIsModalOpen }) => {
  const [isOtpOpen, setIsOtpOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [OTPMatch, setOTPMatch] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const phoneInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    setValue,
    formState: { errors },
    clearErrors,
    setError,
    setFocus
  } = useForm()

  const [countryCode, setCountryCode] = useState({
    country_code: '91', // Default India
    country_format: '+',
    short_name: 'in'
  })

  // Memoized validation function
  const validatePhoneNumber = useCallback(
    number => {
      const phoneRegex = /^\d{10}$/
      if (!number) {
        setError('phoneNumber', {
          type: 'manual',
          message: t('enter_mobile_number')
        })
        return false
      } else if (!phoneRegex.test(number)) {
        setError('phoneNumber', {
          type: 'manual',
          message: t('invalid_phon_number')
        })
        return false
      }
      clearErrors('phoneNumber')
      return true
    },
    [setError, clearErrors]
  )

  const handleChange = useCallback(
    (value, country) => {
      // Remove the country code (handles different country codes dynamically)
      let formattedNumber = value.startsWith(`${country.dialCode}`)
        ? value.replace(`${country.dialCode}`, '').trim()
        : value

      setPhoneNumber(formattedNumber)
      setCountryCode({
        country_code: country.dialCode,
        country_format: '+',
        short_name: country.countryCode
      })
      setValue('phoneNumber', formattedNumber)
      clearErrors('phoneNumber')

      validatePhoneNumber(formattedNumber)
    },
    [setValue, clearErrors, validatePhoneNumber]
  )

  const onSubmit = useCallback(
    submitData => {
      if (!validatePhoneNumber(submitData?.phoneNumber)) return

      const requestBody = {
        role: 'admin',
        country_code: `${countryCode?.country_format}${countryCode?.country_code}`,
        mobile_number: submitData?.phoneNumber
      }

      sendOTP(requestBody).then(response => {
        if (response?.code === Codes?.SUCCESS) {
          // TOAST_SUCCESS(response?.message)
          setOTPMatch(response?.data?.otp_code)
          setIsOtpOpen(true)
          closeModel(dispatch)
          issetIsModalOpen(false)
          setResendTimer(60)
        } else {
          TOAST_ERROR(response?.message)
          isPhoneModalOpen(false)
          closeModel(dispatch)
        }
      })
    },
    [
      countryCode,
      dispatch,
      issetIsModalOpen,
      isPhoneModalOpen,
      validatePhoneNumber
    ]
  )

  // -------------------------------------------------- OTP Code -----------------------------------------------------------------

  const [otp, setOtp] = useState(['', '', '', ''])
  const [customError, setCustomError] = useState('')
  const [resendTimer, setResendTimer] = useState(60)
  const inputRefs = useRef([])

  const handleOtpChange = useCallback(
    (index, value) => {
      if (/^\d?$/.test(value)) {
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)
        setCustomError('')
        // Move to next input if filled
        if (value && index < otp.length - 1) {
          inputRefs.current[index + 1].focus()
        }
      }
    },
    [otp]
  )



  const validateAndSubmitOTP = useCallback(() => {
    const enteredOTP = otp.join('')
    if (enteredOTP.length !== 4) {
      setCustomError(t('Please_enter_a_valid_4_digit_OTP'))
      return
    }
    setCustomError('')
    onOTPSubmit(enteredOTP)
  }, [otp])

  // Handle Backspace
  const handleBackspace = useCallback(
    (index, e) => {
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1].focus()
      }
      if (e.key === 'Enter') {
        validateAndSubmitOTP()
      }
    },
    [otp, validateAndSubmitOTP]
  )

  const onOTPSubmit = useCallback(
    otpCode => {
      if (resendTimer === 0) {
        TOAST_ERROR('OTP expired. Please resend new OTP.')
        setOtp(['', '', '', ''])
        setTimeout(() => inputRefs.current[0]?.focus(), 0)
        return
      }

      if (OTPMatch !== otpCode) {
        TOAST_ERROR('OTP does not match.')
        setOtp(['', '', '', ''])
        setTimeout(() => inputRefs.current[0]?.focus(), 0)
        return
      }

      const requestBody = {
        role: 'user',
        country_code: `${countryCode?.country_format}${countryCode?.country_code}`,
        mobile_number: phoneNumber,
        device_type: 'web',
        device_token: '123'
      }

      login(requestBody).then(response => {
        if (response?.code === Codes?.SUCCESS) {
          loginRedirection(response?.data)
          // TOAST_SUCCESS(response.message)
          setOTPMatch('')
          setOtp(['', '', '', ''])
          setIsOtpOpen(false)
          issetIsModalOpen(false)
          dispatch(
            setUserLoginData({ is_login: true, loginUserData: response?.data })
          )
          closeModel(dispatch)
          // navigate(PATHS?.HOMEPAGE)
          setResendTimer(0)
        } else {
          TOAST_ERROR(response?.message)
          closeModel(dispatch)
        }
      })
    },
    [
      OTPMatch,
      countryCode,
      phoneNumber,
      dispatch,
      navigate,
      issetIsModalOpen,
      resendTimer
    ]
  )

  const onResendOTP = useCallback(() => {
    const requestBody = {
      role: 'admin',
      country_code: `${countryCode?.country_format}${countryCode?.country_code}`,
      mobile_number: phoneNumber
    }

    sendOTP(requestBody).then(response => {
      if (response?.code === Codes?.SUCCESS) {
        // TOAST_SUCCESS(response?.message)
        setOTPMatch(response?.data?.otp_code)
        setIsOtpOpen(true)
        issetIsModalOpen(false)
        setResendTimer(60)
        const firstEmpty = otp.findIndex(digit => digit === '')
        if (firstEmpty !== -1) {
          inputRefs.current[firstEmpty].focus()
        }
      } else {
        TOAST_ERROR(response?.message)
      }
    })
  }, [countryCode, phoneNumber, issetIsModalOpen, otp])

  // Resend OTP Countdown
  useEffect(() => {
    if (!isOtpOpen || resendTimer <= 0) return
    const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
    return () => clearTimeout(timer)
  }, [isOtpOpen, resendTimer])

  // Focus first empty input on opening OTP modal
  useEffect(() => {
    if (isOtpOpen) {
      const firstEmpty = otp?.findIndex(digit => digit === '')
      if (firstEmpty !== -1) {
        inputRefs.current[firstEmpty].focus()
      }
    }
  }, [isOtpOpen, otp])

  useEffect(() => {
    setFocus('phoneNumber')
  }, [setFocus])

  useEffect(() => {
    if (isPhoneModalOpen && phoneInputRef.current) {
      const timer = setTimeout(() => phoneInputRef.current.focus(), 200)
      return () => clearTimeout(timer)
    }
  }, [isPhoneModalOpen])

  const closeAllModals = useCallback(() => {
    closeModel(dispatch)
    issetIsModalOpen(false)
    setIsOtpOpen(false)
    setOtp(['', '', '', ''])
  }, [dispatch, issetIsModalOpen])

  const watchedPhoneNumber = watch('phoneNumber')

  useEffect(() => {
    if (isOtpOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOtpOpen])

  useEffect(() => {
    if (isPhoneModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isPhoneModalOpen])

  return (
    <>
      {isPhoneModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-30 bg-[#00000080] z-50 reactPhone p-[15px]'>
          <div className='bg-white rounded-lg box_shadow_common w-full md:w-[450px] min-h-[320px]'>
            <div className='bg_website_color p-4 flex justify-between items-center rounded-t-lg'>
              <h2 className='text-white text-[18px] font-semibold mb-0'>
                {t('continue_phone')}
              </h2>

              <button
                onClick={closeAllModals}
                style={{ color: 'white' }}
                className='text-xl !text-white cursor-pointer'
              >
                ✖
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='p-4'>
                <p className='text-[16px] new_body_font font-[400] my-4 leading-[25px]'>
                  {t('recive_a_code')}
                </p>
                <p className='text-[16px] font-semibold new_body_font pb-4'>
                  {t('enter_your_number')}
                </p>
                <div className=''>
                  <div className='flex gap-3'>
                    <div className='aspect-square w-12 rounded-[5px] bg_website_color flex items-center justify-center'>
                      <img
                        src={phone}
                        alt='call'
                        className='block object-contain'
                      />
                    </div>
                   
                   <Suspense fallback={<></>}> <PhoneInput
                      country={'in'}
                      onlyCountries={['in']}
                      disableDropdown={true}
                      value={countryCode?.country_code}
                      onChange={handleChange}
                      inputClass='w-full border border-gray-300 rounded-md px-3 py-2 h-full'
                      inputProps={{
                        ref: phoneInputRef,
                        onKeyDown: e => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleSubmit(onSubmit)()
                          }
                        }
                      }}
                    />
                    </Suspense>
                    <input
                      type='hidden'
                      {...register('phoneNumber', {
                        required: t('enter_mobile_number')
                      })}
                    />
                  </div>
                  <label className='errorc pt-1 mt-1'>
                    {errors?.phoneNumber?.message}
                  </label>
                </div>
                <CustomButton
                  type='submit'
                  className='w-full py-2'
                  parentClassName='mt-6'
                >
                  {t('get_otp')}
                </CustomButton>
                <p className='text-[14px] new_body_font text-start font-[400] mt-5 mb-4'>
                  {t('sign_up_you')}
                  <span className='website_color cursor-pointer ms-1'>
                    {t('terms_of_use')}
                  </span>{' '}
                  {t('and')}
                  <span className='website_color cursor-pointer ms-1'>
                    {t('privarcy_policy')}
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {isOtpOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-opacity-30 bg-[#00000080] z-50 p-[15px] modelBodyCss'>
          <div className='bg-white rounded-lg box_shadow_common w-full md:w-[450px] min-h-[290px]'>
            <div className='bg_website_color p-4 flex justify-between items-center rounded-t-lg'>
              <h2 className='text-lg text-white font-semibold mb-0'>
                {t('Verify_OTP')}
              </h2>
              <button
                onClick={closeAllModals}
                className='text-xl text-white cursor-pointer'
              >
                ✖
              </button>
            </div>
            <div className='p-6 flex flex-col items-center justify-between'>
              <p className='text-[16px] font-[400] text-gray new_body_font mt-2'>
                {t('OTP_sent_to')}{' '}
                <span className='font-semibold new_body_font'>
                  {`${countryCode.country_format}${countryCode?.country_code + ' '
                    }${watchedPhoneNumber}`}
                </span>
              </p>
              <div className='flex justify-center gap-3 mt-4'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => (inputRefs.current[index] = el)}
                    type='number'
                    maxLength='1'
                    className='w-12 aspect-square text-center border border-gray-300 rounded-md text-lg outline-none'
                    value={digit}
                    placeholder=''
                    onChange={e => handleOtpChange(index, e.target.value)}
                    onKeyDown={e => handleBackspace(index, e)}
                  />
                ))}
              </div>
              <label className='errorc pt-1 mt-1'>{customError}</label>

              <CustomButton
                className='w-full py-2'
                parentClassName='mt-6 w-full'
                onClick={validateAndSubmitOTP}
              >
                {t('login')}
              </CustomButton>
              <div className='text-[14px] font-normal text-center mt-4 mb-0 w-full flex justify-between'>
                {resendTimer !== 0 ? (
                  <span>
                    {t('OTP_sent_to')}{' '}
                    <span className='website_color'>
                      {String(resendTimer).padStart(2, '0')}s
                    </span>
                  </span>
                ) : (
                  <span
                    className='website_color cursor-pointer font-bold'
                    onClick={onResendOTP}
                  >
                    Resend OTP
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
})

export default PhoneAuthModal
