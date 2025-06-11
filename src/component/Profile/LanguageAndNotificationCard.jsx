import React, { lazy, useEffect, useState } from 'react';
import { Switch } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import ukImage from '../../assets/img/Profile/ukImage.webp';
import indiaImg from '../../assets/img/Profile/indiaImg.webp'; // reuse this for Hindi & Gujarati
import CustomWhiteButton from '../Homepage/CustomWhiteButton';
const CustomButton = lazy(() => import('../Homepage/CustomButton'))
import { deleteProfileUser, getUserDetails, updateLanguage } from '../../services/api/api.services';
import { Codes } from '../../utils/CommonVariable';
import { closeLoder, closeModel, logoutRedirection, openLoader, openModel, TOAST_ERROR, TOAST_SUCCESS } from '../../utils/CommonFunction';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage, setUserLoginData } from '../../storemain/slice/MasterSlice';
import { Constatnt } from '../../utils/Constent';
import i18n from "../../i18n";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft, faTrash } from '@fortawesome/free-solid-svg-icons'
import ConfirmModal from '../Modals/ConfirmModal';
import { useTranslation } from 'react-i18next';

const LanguageAndNotificationCard = () => {

  const dispatch = useDispatch();
  const { t } = useTranslation()
  const { is_loading, loding_type } = useSelector(
    state => state?.masterSlice?.loader
  )
  const { is_model, model_type } = useSelector(
    state => state?.masterSlice?.modal
  )
  const [notifications, setNotifications] = useState({
    chat: false,
    events: false,
  });

  const [selectedLanguage, setSelectedLanguage] = useState();
  const my_language = useSelector((state) => state?.masterSlice?.currentLanguage);

  const languages = [
    { name: 'English', flag: ukImage, value: 'en' },
    { name: 'Hindi', flag: indiaImg, value: 'hi' },
    { name: 'Gujarati', flag: indiaImg, value: 'gu' },
  ];

  useEffect(() => {
    if (my_language) {
      setSelectedLanguage(my_language);
    }
  }, []);

  // const changeLanguageFunc = () => {
  //   updateLanguage({ language: selectedLanguage }).then((response) => {
  //     if (response?.code === Codes?.SUCCESS) {
  //       dispatch(changeLanguage(selectedLanguage));
  //       localStorage.setItem(Constatnt?.LANGUAGE_KEY, selectedLanguage);
  //       i18n.changeLanguage(selectedLanguage);

  //       getUserDetails().then((response2) => {
  //         if (response2?.code === Codes?.SUCCESS) {
  //           dispatch(
  //             setUserLoginData({ is_login: true, loginUserData: response2?.data })
  //           );
  //           TOAST_SUCCESS(response?.message)
  //         }
  //       })
  //     } else {
  //       TOAST_ERROR(response?.message);
  //     }
  //   });
  // };

  // -------------------------------------Delete Function -------------------------------------------------

  const handleDeleteModal = async () => {
    openModel(dispatch, 'handleDeleteProfile')
  }

  const handleDeleteProfile = async () => {
    openLoader(dispatch, 'userProfileDelete')
    try {
      const response = await deleteProfileUser('')
      if (response.code === Codes.SUCCESS) {
        TOAST_SUCCESS(response?.message)
        // toast.success(response?.message)
        logoutRedirection()
      } else {
        TOAST_ERROR(response?.message)
        // toast.error(response?.message)
      }
    } catch (error) {
      // toast.error(error?.message)
      TOAST_ERROR(error?.message)
    } finally {
      closeLoder(dispatch)
    }
  }

  return (<>

    {is_loading && loding_type === 'userProfileLoader' && <Loader />}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Notifications Box */}

      <div className="border border-gray-200 rounded-[10px] p-5 languageBox flex flex-col justify-between gap-3">
        <h3 className="commonQuesH2 ">{t('Notifications')}</h3>
        <div className='flex flex-col gap-3'>
          <div className="flex justify-between items-center ">
            <span>{t('Astromall_chat')}</span>
            <Switch
              checked={notifications.chat}
              onChange={(checked) =>
                setNotifications((prev) => ({ ...prev, chat: checked }))
              }
              className=""
            />
          </div>
          <div className="flex justify-between items-center">
            <span>{t('Live_Events')}</span>
            <Switch
              checked={notifications.events}
              onChange={(checked) =>
                setNotifications((prev) => ({ ...prev, events: checked }))
              }
              className=""
            />
          </div>
        </div>

      </div>

      {/* Language Box (spanning 2 columns on md+) */}
      <div className=" rounded-[10px] p-5 md:col-span-2 languageBox flex flex-col justify-between gap-3 commonPaddingBottom">
        <h3 className="commonQuesH2 ">{t('My_Language')}</h3>
        <div className="flex items-center flex-wrap gap-4">
          {languages?.map((lang) => (<div key={lang?.value}>
            <CustomButton
              key={lang.value}
              onClick={() => setSelectedLanguage(lang.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200
                ${selectedLanguage === lang.value
                  ? 'setting_active_lang'
                  : 'setting_inactive_lang'
                }`}
            >
              <div className={` ${selectedLanguage === lang?.value ? '' : ' rounded-full flex items-center justify-center'
                }`}>
                {
                  selectedLanguage === lang?.value ?
                    <CheckCircleFilled
                      className={`text-base text-[24px] ${selectedLanguage === lang?.value ? 'website_color' : ''
                        }`}
                    /> : <span className='rounded-full w-[24px] h-[24px] bg-white new_border'></span>
                }

              </div>
              <img src={lang?.flag} alt={lang?.name} className="w-6 h-6" />
              <span className='text-[16px] font-semibold'>{lang.name}</span>
            </CustomButton>
          </div>))}

          <CustomButton
            className="ml-auto bg-[#7B61FF] text-white px-5 py-2 rounded-md text-sm font-medium"
          // onClick={changeLanguageFunc}
          >
            {t('DONE')}
          </CustomButton>
        </div>
      </div>
      <div className="border border-gray-200 rounded-[10px] p-5 languageBox flex flex-col justify-between gap-3">
        <div className='flex justify-between items-center'>
          <span>{t('Delete_Account')}</span>
          {/* <h1>Delete Account</h1> */}
          <CustomButton
            type='primary'
            // className='bg-[#7B61FF] px-13 py-3 rounded-md text-[16px] font-semibold'
            className=' py-3 rounded-md text-[16px] font-medium  px-3'
            onClick={handleDeleteModal}
          >
            {loding_type === 'userProfileDelete' ? (
              'Deleting...'
            ) : (
              <FontAwesomeIcon
                icon={faTrash}
                className=''
              />
            )}
          </CustomButton>
        </div>
      </div>
    </div>

    <ConfirmModal
      isOpen={is_model && model_type === 'handleDeleteProfile'}
      title='Delete Profile?'
      description='Are you sure you want to delete this Profile? This action cannot be undone.'
      okText={loding_type === 'userProfileDelete' ? 'Deleting...' : 'Delete'}
      cancelText='Cancel'
      onConfirm={handleDeleteProfile}
      onCancel={() => {
        closeModel(dispatch)
      }}
    />
  </>);

};

export default LanguageAndNotificationCard;
