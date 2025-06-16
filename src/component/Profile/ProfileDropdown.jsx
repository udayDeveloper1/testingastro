import { lazy, memo, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import deleteIcon from "../../assets/img/Profile/delete.svg";
import history from "../../assets/img/Profile/history.svg";
import logout from "../../assets/img/Profile/logout.svg";
import profileEdit from "../../assets/img/Profile/profileEdit.svg";
import wallet from "../../assets/img/Profile/wallet.svg";
import {
  closeLoder,
  closeModel,
  logoutRedirection,
  openLoader,
  openModel,
  TOAST_ERROR,
  TOAST_SUCCESS,
} from "../../utils/CommonFunction";

import { useTranslation } from "react-i18next";
import { UpdatedPaths } from "../../routers/Paths";
import { deleteProfileUser } from "../../services/api/api.services";
import { Codes } from "../../utils/CommonVariable";

// import { PATHS } from "../../routers/Paths";

const CustomButton = lazy(() => import("../Homepage/CustomButton"));
const ConfirmModal = lazy(() => import("../Modals/ConfirmModal"));

const ProfileDropdownComponent = ({ setIsOpen = false }) => {
  const location = window.location.pathname;
  const modal = useSelector((state) => state.masterSlice?.modal);
  const loginUser = useSelector((state) => state.masterSlice?.loginUser?.loginUserData);
  const { is_loading, loding_type } = useSelector(state => state?.masterSlice?.loader);
  const { t } = useTranslation()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PATHS = UpdatedPaths();

  const dropDownItems = [
    {
      label: `${t('Wallet_Transactions')}`,
      path: PATHS?.TRANSACTION_WALLET, // "/transactionWallet",,
      icon: wallet,
    },
    {
      label: t('Order_History'),
      path: PATHS?.ORDER_HISTORY_CALL,
      icon: history,
    },
    // {
    //   label: t('Customer_Support_Chat'),
    //   path: PATHS?.HOMEPAGE,
    //   icon: support
    // },
    // {
    //   label: t('Order_History'),
    //   path: PATHS?.ORDER_HISTORY_CALL,
    //   icon: wallet
    // },
    // { label: t('delete'), 
    //   path: '',
    //   icon: wallet
    // },
    // {
    //   label: t('Order_History'),
    //   path: PATHS?.ORDER_HISTORY_CALL,
    //   icon: wallet
    // },
    // {
    //   label: t('delete'),
    //   path: '',
    //   icon: deleteIcon,
    // }
  ];

  const logoutFunction = () => {
    logoutRedirection();
    navigate(PATHS?.HOMEPAGE);
    closeModel(dispatch);
    // dispatch(resetStore());
    TOAST_SUCCESS("Logout successfully");
  };

  // ------------------------------------------------------ Delete Account -----------------------------------------------------------------------

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

  return (
    <div className="absolute top-8 right-0 w-[374px] max-w-[90vw] rounded-[10px] btaborder customProfileDiv bg-white z-50">
      {/* Profile Header */}
      <div
        className="flex items-center gap-4 commonLightBack px-2 sm:px-4 md:px-7 py-2 sm:py-4 md:py-7 rounded-[10px] flex-wrap sm:flex-nowrap cursor-pointer"
        onClick={() => navigate(PATHS.PROFILE_SETTING)}
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && navigate(PATHS.PROFILE_SETTING)}
        role="button"
        aria-pressed="false"
      >
        <img
          src={loginUser?.profile_image_url}
          alt={loginUser?.name || 'User Profile'}
          className="w-15 h-15 rounded-full object-cover profileImageDrop"
          loading="lazy"
        />
        <div className="flex-1">
          <p className="font-bold text-[20px] new_body_font mb-0 whitespace-normal">
            {loginUser?.name ?? 'User'}
          </p>
          <p className="font-semibold text-[16px] new_body_font mb-0 whitespace-normal">
            {`${loginUser?.country_code ?? ''} ${loginUser?.mobile_number ?? ''}`}
          </p>
        </div>

        <img src={profileEdit} alt="" onClick={() => navigate(PATHS.PROFILE_SETTING)} className="object-contain" />
      </div>


      {/* Button Grid */}
      <div className="grid grid-cols-3 gap-3 px-3 sm:px-4 md:px-[20px] py-[20px]">
        {dropDownItems.map(({ label, path, icon }, index) => (
          <CustomButton
            key={index}
            className={` h-[100px] w-[100px] flex flex-col gap-[10px] items-center justify-center text-center !text-[#343434] font-medium text-[14px] break-all rounded-[10px] !border-none customProfile ${location === path ? 'customProfileActive' : 'customProfileButton'
              }`}
            parentClassName="!p-0"
            styleinline={{ background: 'white' }}
            onClick={() => {
              navigate(path);
              // setIsOpen(false);
            }}
          >
            <div className="w-[40px] h-[40px] flex items-center justify-center  gradient-background rounded-full object-contain">
              <img src={icon} alt="" className="w-[25px] h-[25px]" />
            </div>
            {label}
          </CustomButton>
        ))}

        <CustomButton
          className="h-[100px] w-[100px] flex flex-col gap-[10px] items-center justify-center text-center !text-[#343434] font-semibold text-[14px] break-all rounded-md !border-none customProfileButton"

          styleinline={{ background: 'white' }}
          onClick={handleDeleteModal}
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center  gradient-background rounded-full object-contain">
            <img src={deleteIcon} alt="" className="w-[25px] h-[25px]" />
          </div>
          {t('delete')}
        </CustomButton>

        {/* Logout Button */}
        <CustomButton
          className="h-[100px] w-[100px] flex flex-col gap-[10px] items-center justify-center text-center !text-[#343434] font-semibold text-[14px] break-all rounded-md !border-none customProfileButton"

          styleinline={{ background: 'white' }}
          onClick={() => openModel(dispatch, 'logout_model')}
        >
          <div className="w-[40px] h-[40px] flex items-center justify-center  gradient-background rounded-full object-contain">
            <img src={logout} alt="" className="w-[25px] h-[25px]" />
          </div>
          {t('logout')}
        </CustomButton>
      </div>

      {/* Logout Modal */}
      <ConfirmModal
        isOpen={modal?.is_model && modal?.model_type === 'logout_model'}
        title={t('logout')}
        description={t("are_you_sure_you_want_to_log_out_of_your_account")}
        okText={t('logout')}
        cancelText={t('cancel')}
        onConfirm={logoutFunction}
        onCancel={() => closeModel(dispatch)}
      />

      {/* <ConfirmModal
        isOpen={modal?.is_model && modal?.model_type === 'handleDeleteProfile'}
        title='Delete Profile?'
        description='Are you sure you want to delete this Profile? This action cannot be undone.'
        okText={loding_type === 'userProfileDelete' ? 'Deleting...' : 'Delete'}
        cancelText='Cancel'
        onConfirm={handleDeleteProfile}
        onCancel={() => {
          closeModel(dispatch)
        }}
      /> */}
      <ConfirmModal
        isOpen={modal?.is_model && modal?.model_type === 'handleDeleteProfile'}
        title={t('delete_account')}
        description={t('delete_description')}
        okText={loding_type === 'userProfileDelete' ? 'Deleting...' : t('delete')}
        cancelText={t('cancel')}
        onConfirm={handleDeleteProfile}
        onCancel={() => {
          closeModel(dispatch);
        }}
      />

    </div>



  );
};

const ProfileDropdown = memo(() => (
  <Suspense fallback={<div className='min-h-[100vh]'></div>}>
    <ProfileDropdownComponent />
  </Suspense>
));

export default memo(ProfileDropdown);
