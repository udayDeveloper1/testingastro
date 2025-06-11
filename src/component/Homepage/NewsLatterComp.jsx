import { lazy, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router'
import { addNewsLatter } from '../../services/api/api.services'
import { TOAST_ERROR, TOAST_SUCCESS } from '../../utils/CommonFunction'
import { Codes, InputRegex } from '../../utils/CommonVariable'
import rightImage from '/homepage/newsLatterRight.webp'
const CustomButton = lazy(() => import('./CustomButton'))

const NewsletterComp = () => {
  const { t } = useTranslation()
  const location = useLocation()

  const {
    register,
    handleSubmit,
    // setValue,
    // clearErrors,
    reset,
    // watch,
    // control,
    formState: { errors }
  } = useForm()

  const onSubmitData = async data => {
    try {
      let request = {
        email: data?.email
      }
      addNewsLatter(request).then(response => {
        if (response?.code === Codes.SUCCESS) {
          TOAST_SUCCESS(response?.message)
          reset()
        } else {
          TOAST_ERROR(response.message)
        }
      })
    } catch (error) {
      TOAST_ERROR('Somthing went wrong')
    }
  }

  useEffect(() => {
    reset()
  }, [location.pathname])

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmitData)} className='relative z-[1]'>
        <div className='container mx-auto px-4 py-8'>
          <div className='newsLatterComp text-white p-6 md:p-[50px] rounded-2xl '>
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 items-center'>
              {/* Left Text Content */}
              <div className='lg:col-span-5  xl:col-span-4 text-center lg:text-left '>
                <h2 className='text-[30px] font-light mb-[5px]'>
                  {t('subscribe_our')}{' '}
                  <span className='text-[30px] font-bold'>
                    {t('newletter')}
                  </span>
                </h2>
                <p className='text-[16px] font-medium leading-[32px]'>
                  {t('get_your_daily_horoscope')}
                </p>
              </div>

              {/* Arrow Image */}
              <div className='hidden lg:flex lg:col-span-2 xl:col-span-2 justify-center'>
                <img
                  src={rightImage}
                  alt='arrow'
                  className=' h-auto'
                  width={123}
                  height={38}
                  decoding='async'
                  // loading='lazy'
                />
              </div>

              {/* Email Input + Button */}
              <div className='lg:col-span-5 xl:col-span-6 w-full space-y-2'>
                <div className='flex flex-col sm:flex-row items-stretch  px-2 rounded-[10px] py-2 md:ps-[20px]  w-full bg-white'>
                  <input
                    type='email'
                    placeholder={t('enter_email')}
                    className='flex-1  py-4 text-[#343434]  outline-none placeholder-[#343434] text-[16px] font-medium  w-full '
                    {...register('email', {
                      required: t('enter_email'),
                      pattern: {
                        value: InputRegex?.EMAIL_REGEX,
                        message: t('enter_valid_email')
                      }
                    })}
                  />
                  <CustomButton
                    className='py-[13px] px-[30px] text-center  font-semibold ronded-[10px] !border-none h-full'
                    parentClassName=''
                  >
                    {t('subscribe')}
                  </CustomButton>
                </div>

                {/* Error Message */}
                {errors?.email && (
                  <p className='text-red pl-2'>{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default NewsletterComp
