import {
  AutoComplete,
  DatePicker,
  Form,
  Input,
  Radio,
  TimePicker,
  Upload
} from 'antd'
import axios from 'axios'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import moment from 'moment'
import { lazy, memo, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/css/userProfileForm.css'
import edit_icon from '../../assets/img/Profile/edit_icon.svg'
import profile_image from '../../assets/img/Profile/noUser.svg'
import {
  editProfile,
  geo_search,
  getUserDetails
} from '../../services/api/api.services'
import { setUserLoginData } from '../../storemain/slice/MasterSlice'
import {
  closeLoder,
  FORM_RULS_NO_REQUIRED,
  getLocationValidationRule,
  openLoader,
  TOAST_ERROR,
  TOAST_SUCCESS
} from '../../utils/CommonFunction'
import {
  Codes,
  InputTypesEnum
} from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import ProfileImageCropper from './ProfileImageCropper'
const CustomWhiteButton = lazy(() => import('../Homepage/CustomWhiteButton'))
const CustomButton = lazy(() => import('../Homepage/CustomButton'))
const Loader = lazy(() => import('../loader/Loader'))
dayjs.extend(customParseFormat)
const UserProfileForm = () => {
  const dispatch = useDispatch()
  const cropIamge = useSelector((state) => state?.masterSlice?.cropIamge);

  const [timeValue, setTimeValue] = useState(null)
  const loginUser = useSelector(state => state?.masterSlice?.loginUser)
  const { loding_type } = useSelector(state => state?.masterSlice?.loader)
  const loder = useSelector(state => state?.masterSlice?.loader)

  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [previewImage, setPreviewImage] = useState(profile_image)
  const [imageFile, setImageFile] = useState(null)
  const [placeOptions, setPlaceOptions] = useState([])
  const [selecteLocation, setSelectedLocation] = useState({})

  const searchTimeoutRef = useRef(null)
  const isPlaceSelected = useRef(false)
  const locationRules = useMemo(
    () => getLocationValidationRule(isPlaceSelected, t, selecteLocation),
    [t, selecteLocation]
  )

  const allowedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp'
  ]
  const convertTime24Hour = data => {
    return dayjs(data).format('HH:mm:ss')
  }
  const convertDate = dateString => {
    return dayjs(dateString).format('DD/MM/YYYY')
  }

  const updateProfile = async request => {
    try {
      const response = await editProfile(request)
      if (response?.code === Codes?.SUCCESS) {
        try {

          const response2 = await getUserDetails({
            id: loginUser?.loginUserData?._id
          })

          if (response2?.code === Codes?.SUCCESS) {
            dispatch(
              setUserLoginData({
                is_login: true,
                loginUserData: response2?.data
              })
            )
            if (response2.code === 1) {
              let getAuthData = localStorage.getItem(Constatnt.AUTH_KEY)
                ? JSON.parse(localStorage.getItem(Constatnt.AUTH_KEY))
                : {}
              if (Object.keys(getAuthData)?.length > 0) {
                let resData = response2?.data
                const mergedResponse = {
                  ...getAuthData,
                  ...resData
                }
                localStorage.setItem(
                  Constatnt.AUTH_KEY,
                  JSON.stringify(mergedResponse)
                )
                getProfileData()
              }
            }
            TOAST_SUCCESS(response?.message)
          }
        } catch (error) {
          // Error while getting user details
          console.error('Error in getUserDetails:', error)
        }
      } else {
        TOAST_ERROR(response?.message)
      }
    } catch (error) {
      // Error while editing profile
      console.error('Error in editProfile:', error)
    } finally {
      // dispatch(setLoading({ is_loading: false, loding_type: "updateProfile" }));
      closeLoder(dispatch)
    }
  }

  const uploadProfileImage = async (imageFile, folder) => {
    const response = await axios.post(`${Constatnt.API_BASE_URL}upload/${folder}`, imageFile, {
      headers: {
        'api-key': Constatnt.API_KEY,
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000,
    });
    return response.data;
  };

  const onFinish = async values => {
    let date = convertDate(values?.[InputTypesEnum?.DOB])
    if (imageFile !== null) {
      try {
        openLoader(dispatch, 'profile_form')
        let formdata = new FormData()
        formdata.append('image', imageFile)

        // let response = await uploadImage(formdata, 'Profileimage')
        const response = await uploadProfileImage(formdata, 'Profileimage')

        if (response.code === Codes.SUCCESS) {
          let request = {
            name: values?.[InputTypesEnum?.FIRSTNAME] || '  ',
            gender: values?.[InputTypesEnum?.GENDER], time_of_birth: timeValue ? convertTime24Hour(timeValue) : '',
            place_of_birth: values?.[InputTypesEnum?.PLACE_OF_BIRTH],
            curr_address: values?.[InputTypesEnum?.ADDRESS],
            city: values?.[InputTypesEnum?.CITY],
            pincode: values?.[InputTypesEnum?.PINCODE],
            email: values?.[InputTypesEnum?.EMAIL],
            dob: date,
            profile_image: response.data.file_name,
            latitude: selecteLocation?.coordinates?.[0]
              ? selecteLocation?.coordinates?.[0]
              : loginUser?.loginUserData?.latitude,
            longitude: selecteLocation?.coordinates?.[1]
              ? selecteLocation?.coordinates?.[1]
              : loginUser?.loginUserData?.longitude,
            tz: selecteLocation?.tz
              ? selecteLocation?.tz
              : loginUser?.loginUserData?.longitude
          }

          let res = updateProfile(request)

          if (res.code === Codes.SUCCESS) {
            closeLoder(dispatch)
            TOAST_SUCCESS(res.message)
          } else {
            closeLoder(dispatch)
            TOAST_ERROR(res.message)
          }
        } else {
          TOAST_ERROR(response.message)
          closeLoder(dispatch)
        }
      } catch (error) {
        console.log(error);
        closeLoder(dispatch)
        TOAST_ERROR(error.message)
      }
    } else {
      let request = {
        name: values?.[InputTypesEnum?.FIRSTNAME],
        gender: values?.[InputTypesEnum?.GENDER],
        time_of_birth: timeValue
          ? convertTime24Hour(timeValue)
          : '',
        place_of_birth: values?.[InputTypesEnum?.PLACE_OF_BIRTH],
        curr_address: values?.[InputTypesEnum?.ADDRESS],
        city: values?.[InputTypesEnum?.CITY],
        pincode: values?.[InputTypesEnum?.PINCODE],
        email: values?.[InputTypesEnum?.EMAIL],
        dob: date,
        latitude:
          selecteLocation?.coordinates?.[0] != null
            ? selecteLocation.coordinates[0]
            : loginUser?.loginUserData?.latitude,
        longitude:
          selecteLocation?.coordinates?.[1] != null
            ? selecteLocation.coordinates[1]
            : loginUser?.loginUserData?.longitude,
        tz: selecteLocation?.tz
          ? selecteLocation?.tz
          : loginUser?.loginUserData?.longitude
      }
      let res = updateProfile(request)

      if (res.code === Codes.SUCCESS) {
        TOAST_SUCCESS(res.message)
      } else {
        TOAST_ERROR(res.message)
      }
    }
  }

  // const handleImageChange = async({ file }) => {
  //   if (file) {
  //     if (!allowedTypes.includes(file?.type)) {
  //       TOAST_ERROR('Only PNG, JPG, JPEG, GIF, or WEBP images are allowed.')
  //       return
  //     }
  //        console.log(file);
  //       const resizedFile = await compressAndResizeImage(file);
  //       console.log(resizedFile);

  //     const imageUrl = URL.createObjectURL(resizedFile)
  //     setPreviewImage(imageUrl)
  //     setImageFile(resizedFile)
  //   }
  // }

  const [cropFile, setCropFile] = useState(null)

  const handleImageChange = ({ file }) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file?.type)) {
      TOAST_ERROR('Only PNG, JPG, JPEG, GIF, or WEBP images are allowed.')
      return
    }
    setCropFile(file) // show crop modal
    setImageFile(cropIamge)
  }

  const centerCropToSquare = (file, outputSize = 300) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const img = new Image()
        img.src = reader.result

        img.onload = () => {
          const side = Math.min(img.width, img.height)

          const canvas = document.createElement('canvas')
          canvas.width = outputSize
          canvas.height = outputSize

          const ctx = canvas.getContext('2d')
          ctx.drawImage(
            img,
            (img.width - side) / 2,
            (img.height - side) / 2,
            side,
            side,
            0,
            0,
            outputSize,
            outputSize
          )

          canvas.toBlob((blob) => {
            const croppedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            })
            resolve(croppedFile)
          }, file.type)
        }
      }
    })
  }


  const handleSearchPlace = value => {
    isPlaceSelected.current = false

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(async () => {
      if (value.trim().length < 3) {
        setPlaceOptions([])
        return
      }

      try {
        const data = { city: value }
        const response = await geo_search(data)

        if (response?.code === 1 && Array.isArray(response?.data?.response)) {
          const options = response.data.response.map(item => ({
            ...item,
            value: item.full_name
          }))
          setPlaceOptions(options)
        } else {
          setPlaceOptions([])
        }
      } catch (error) {
        console.error('Geo search failed', error)
        setPlaceOptions([])
      }
    }, 500)
  }

  const getProfileData = async () => {
    openLoader(dispatch, 'userProfileLoader')

    if (loginUser?.is_login === true) {
      let data = loginUser?.loginUserData
      form.setFieldsValue({
        [InputTypesEnum?.FIRSTNAME]: data?.name,
        [InputTypesEnum?.GENDER]: data?.gender,
        [InputTypesEnum?.DOB]: data?.dob ? dayjs(data?.dob, 'DD/MM/YYYY') : null,
        [InputTypesEnum?.TOB]: data?.time_of_birth
          ? moment(data?.time_of_birth, 'HH:mm')
          : null,
        [InputTypesEnum?.PLACE_OF_BIRTH]: data?.place_of_birth || '',
        [InputTypesEnum?.ADDRESS]: data?.curr_address,
        [InputTypesEnum?.CITY]: data?.city,
        [InputTypesEnum?.PINCODE]: data?.pincode,
        [InputTypesEnum?.EMAIL]: data?.email
      })
      if (data?.time_of_birth) {
        let timeOfBirth = dayjs(data?.time_of_birth, 'HH:mm:ss') || null
        setTimeValue(timeOfBirth)
      }
      setSelectedLocation({ PLACE_OF_BIRTH: data?.place_of_birth })

      if (data?.profile_image) {
        if (!data?.profile_image.startsWith('http')) {
          setPreviewImage(data?.profile_image_url)
        } else {
          setPreviewImage(data?.profile_image)
        }
      }
    }
    closeLoder(dispatch)
  }

  const handleTimeChange = value => {
    setTimeValue(value)
  }

  useEffect(() => {
    getProfileData()
  }, [loginUser])

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {loder?.is_loading && loder?.loding_type === 'profile_form' && <Loader />}

      <div className='mx-auto md:p-20 bg-white rounded-2xl ProfileCard ProfileCard_input'>
        {loding_type === 'userProfileLoader' && <Loader />}
        {/* Profile Header */}
        <div className=' border-opacity-30 rounded-[10px]  p-7 flex flex-col justify-between sm:flex-row items-center gap-5 sm:gap-10 mb-6 border border-[#f9eaec] [border-image-slice:1] [background:linear-gradient(270deg,_#FDF3EC_0%,_#F9E9EC_100%)]'>
          <div className=' flex flex-col sm:flex-row items-center gap-5 sm:gap-[30px] '>
            <div className='relative w-21 h-21 rounded-full  [box-shadow:0px_0px_14px_0px_#00000040]'>
              {previewImage ? (
                <img
                  src={previewImage}
                  alt='Profile'
                  className='w-full h-full object-cover rounded-full '
                // onError={(e) => }
                />
              ) : (
                <img
                  src={previewImage}
                  alt='Profile'
                  className='w-full h-full object-cover rounded-full '
                />
              )}
              <div className='w-[30px] h-[30px] absolute -bottom-[9px] -right-[9px] rounded-full cursor-pointer [background:linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)] flex items-center justify-center'>
                <img
                  src={edit_icon}
                  alt='edit-icon'
                  width={12}
                  height={12}
                  loading='lazy'
                  decoding='async'
                />
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleImageChange}
                  maxCount={1}
                  className='change_photo opacity-0 w-[30px] h-[30px] min-w-[30px] min-h-[30px] overflow-hidden absolute top-0 left-0 rounded-full'
                >
                  <CustomWhiteButton
                    type='link'
                    className='border py-2 px-4 text-[14px] font-semibold'
                  >
                    {t('CHANGE_PHOTO')}
                  </CustomWhiteButton>
                </Upload>

                {cropFile ? (
                  <ProfileImageCropper
                    file={cropFile}
                    onCropDone={(blob) => {
                      const url = URL.createObjectURL(blob)
                      setPreviewImage(url)
                      setImageFile(blob)
                      setCropFile(null)
                    }}
                    onCancel={() => setCropFile(null)}
                  />
                ) : null}
              </div>
            </div>
            <div className='text-center sm:text-left '>
              <p className='text-[16px] font-semibold new_body_font mb-0'>
                {loginUser?.loginUserData?.country_code +
                  ' ' +
                  loginUser?.loginUserData?.mobile_number}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          className='customForm profileForm'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4'>
            <Form.Item
              label={t('name')}
              name={InputTypesEnum?.FIRSTNAME}
              rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.FIRSTNAME]}
              className='col-span-1 '
            >
              <Input
                placeholder={t('enter_name')}
                className='px-6 py-4 font-medium text-[16px]  rounded-[10px] new_body_font'
              />
            </Form.Item>

            <Form.Item
              name={InputTypesEnum?.GENDER}
              label={t('gender')}
              rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.GENDER]}
              className='col-span-1 '
            >
              <Radio.Group>
                <Radio value='male'>{t('male')}</Radio>
                <Radio value='female'>{t('female')}</Radio>
                {/* <Radio value='others'>Others</Radio> */}
              </Radio.Group>
            </Form.Item>

            <div className='flex col-span-1 justify-between'>
              <Form.Item
                label={t('date_of_birth')}
                name={InputTypesEnum?.DOB}
                rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.DOB]}
                className='w-[49%]'
              >
                <DatePicker
                  format='DD/MM/YYYY'
                  className='w-full px-6 py-4 font-medium text-[16px]  rounded-[10px] new_body_font'
                />
              </Form.Item>

              <Form.Item
                label={t('time_of_birth')}
                // name={InputTypesEnum?.TOB}
                // rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.TOB]}
                className='w-[49%]'
              >
                <TimePicker
                  format='hh:mm A'
                  use12Hours
                  className='w-full px-6 py-4 font-medium text-[16px]  rounded-[10px] new_body_font'
                  minuteStep={1}
                  value={timeValue}
                  onChange={handleTimeChange}
                  allowClear
                />
              </Form.Item>
            </div>

            <Form.Item
              label={t('place_of_birth')}
              name={InputTypesEnum?.PLACE_OF_BIRTH}
              // rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.PLACE_OF_BIRTH]}
              rules={locationRules}
              className='nav'
            >
              <AutoComplete
                options={placeOptions}
                onSearch={handleSearchPlace}
                value={form.getFieldValue(InputTypesEnum?.PLACE_OF_BIRTH)}
                open={!isPlaceSelected.current && placeOptions.length > 0}
                onSelect={value => {
                  form.setFieldsValue({
                    [InputTypesEnum?.PLACE_OF_BIRTH]: value
                  })
                  setSelectedLocation(
                    placeOptions.find(ele => ele.full_name === value)
                  )
                  isPlaceSelected.current = true
                  setPlaceOptions([]) // Hide dropdown
                }}
                onChange={value => {
                  form.setFieldsValue({
                    [InputTypesEnum?.PLACE_OF_BIRTH]: value
                  })
                  isPlaceSelected.current = false
                }}
                placeholder={t('enter_place_of_birth')}
                className='w-full px-6 py-4 font-medium text-[16px] placeOfBirth  rounded-[10px] new_body_font'
              />
            </Form.Item>

            <Form.Item
              label={t('email')}
              name={InputTypesEnum?.EMAIL}
              rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.EMAIL]}
              className='col-span-1'
            >
              <Input
                placeholder={t('enter_email')}
                className='px-6 py-4 font-medium text-[16px]  rounded-[10px] new_body_font'
              />
            </Form.Item>

            <Form.Item
              label={t('current_address')}
              name={InputTypesEnum?.ADDRESS}
              rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.ADDRESS]}
              className='col-span-1'
            >
              <Input
                placeholder={t('enter_location')}
                className='px-6 py-4 font-medium text-[16px]  rounded-[10px] new_body_font'
              />
            </Form.Item>

            <Form.Item
              label={t('city')}
              name={InputTypesEnum?.CITY}
              rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.CITY]}
              className='col-span-1 '
            >
              <Input
                placeholder={t('enter_city')}
                className='px-6 py-4 font-medium text-[16px] rounded-[10px] '
              />
            </Form.Item>

            <Form.Item
              label={t('pincode')}
              name={InputTypesEnum?.PINCODE}
              rules={FORM_RULS_NO_REQUIRED[InputTypesEnum?.PINCODE]}
              className='col-span-1'
            >
              <Input
                placeholder={t('enter_pincode')}
                className='px-6 py-4 font-medium text-[16px] rounded-[10px]'
              />
            </Form.Item>
          </div>

          <div className='text-center mt-8 w-full flex justify-center'>
            <CustomButton
              type='primary'
              htmltype='submit'
              className='bg-[#7B61FF] px-13 py-3 rounded-md text-[16px] font-semibold'
            >
              {loding_type === 'userProfileLoader'
                ? `${t('UPDATING')}...`
                : t('UPDATE_PROFILE')}
            </CustomButton>
          </div>
        </Form>
      </div>
    </>
  )
}

export default memo(UserProfileForm)
