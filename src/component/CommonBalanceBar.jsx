import { lazy } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import filter from '../assets/img/common/filterIcon.svg'
import sortby from '../assets/img/common/sortby.svg'

import commonSearch from '../assets/img/common/search.svg'

import { useNavigate } from 'react-router'
// import { PATHS } from '../routers/Paths'
import { setAstroPaymentDetails } from '../storemain/slice/astroLogerDetailsSlice'
import { setFilterSearch } from '../storemain/slice/MasterSlice'
import {
  closeFilter,
  closeModel,
  openFilter,
  openModel
} from '../utils/CommonFunction'
import PhoneAuthModal from './auth/PhoneAuthModals'
import Filter from './filter/Filter'
import SortBy from './filter/SortBy'
import { UpdatedPaths } from '../routers/Paths'
import { useTranslation } from 'react-i18next'
const CustomButton = lazy(() => import('./Homepage/CustomButton'))

function CommonBalanceBar({ onSearch }) {
    const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const PATHS = UpdatedPaths()

  const isScroll = useSelector(state => state?.masterSlice?.isScroll)
  const filterValue = useSelector(state => state?.masterSlice?.filter_search)
  const modal = useSelector(state => state?.masterSlice?.modal)
  const { is_login, loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )

  const onSearchChange = e => {
    const value = e.target.value || ''
    dispatch(setFilterSearch(value))
  }

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-4 items-center rounded-lg lg:border border-[#E3725D4D] gap-3 lg:gap-0'>
        {/* Mobile view: Balance on top */}
        <div className='lg:hidden text-center text-[16px] font-semibold lg:border-b border-[#E3725D4D]'>
        
            {t('Available_Balance')}:₹{is_login && loginUserData?.total_wallet_balance}
        </div>

        {/* Search Input border-x border-y lg:border-r lg:border-y-none lg:border-l-none */}
        <div
          className="flex items-center px-4 py-2 lg:py-5  rounded-[10px] lg:rounded-none border border-[rgba(227,114,93,0.3)]
             lg:border-r lg:border-t-0 lg:border-l-0 lg:border-b-0 col-span-1"
        >

          <div className='w-[38px] h-[38px] min-h-[38px] min-w-[38px] flex items-center justify-center bg_light_back rounded-full'>
            <img src={commonSearch} alt='Search' className='object-contain w-[16px] h-[16px]' />
          </div>

          <input
            type='text'
            placeholder={t('search_name')}
            onChange={onSearchChange}
            className='ml-2 bg-transparent placeholder-500 placeholder-[#343434] text-[16px] outline-none w-full '
          />
        </div>

        <div className='hidden lg:flex text-[16px] font-semibold h-full  lg:border-r border-[#E3725D4D] items-center justify-center col-span-1 new_body_font px-1 text-center'>
                     {is_login ? (
  <span>{t('Available_Balance')}: ₹{loginUserData?.total_wallet_balance}</span>
) : (
  <div>
    <div className="">
      {t('Login_to_check_balance') || 'Login to check balance'}
    </div>
  </div>
)}

        </div>
      

        {/* Buttons - stacked on mobile, inline on desktop */}
        <div className='grid grid-cols-3 lg:col-span-2 h-full pt-2 lg:pt-0'>
          {/* Recharge Button */}
          <div className='lg:border-r border-[#E3725D4D] flex lg:justify-center items-center col-span-1 md:col-span-2 lg:col-span-1 '>
            <CustomButton
              className='bg-[#7b3fe4] text-white text-sm  py-2'
              onClick={() => {
                if (is_login) {
                  dispatch(setAstroPaymentDetails({}))
                  navigate(PATHS.MONEY_WALLET)
                } else {
                  openModel(dispatch, 'recharge_modal')
                }
              }}
            >
              {t('RECHARGE')}
            </CustomButton>
          </div>

          {/* Filter Button */}

          <div className=' grid grid-cols-2 col-span-2 md:col-span-1 lg:col-span-2 cursor-pointer gap-2 '>
            <div className='flex items-center gap-1 sm:gap-2  justify-end lg:justify-center lg:border-r border-[#E3725D4D]' onClick={() => openFilter(dispatch, 'filter')}
            >
              <span className='text-sm new_body_font'>{t('Filter')}</span>
              <div className='w-[38px] h-[38px] flex items-center justify-center bg_light_back rounded-full'>
                <img src={filter} alt='Sort' className='' />
              </div>
            </div>

            <div
              className='flex items-center gap-1 sm:gap-2 justify-center'
              onClick={
                () => openFilter(dispatch, 'sortBy')
                // dispatch(
                //   setIsScroll({ is_scroll: true, is_scroll_type: 'sortBy' })
                // )
              }
            >
              <span className='text-sm new_body_font'>{t('Sort_By')}</span>
              <div className='w-[38px] h-[38px] flex items-center justify-center bg_light_back rounded-full'>
                <img src={sortby} alt='Sort' className='' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isScroll?.is_scroll && isScroll?.is_scroll_type === 'filter' && (
        <Filter
          isOpen={isScroll?.is_scroll}
          // onFilterSubmit={onFilterSubmit}
          onClose={() => closeFilter(dispatch)}
        />
      )}

      {isScroll?.is_scroll && isScroll?.is_scroll_type === 'sortBy' && (
        <SortBy
          isOpen={isScroll?.is_scroll}
          onSortChange={value => {
          }}
          onClose={() => closeFilter(dispatch)}
        />
      )}

      {/* Phone Auth Modal */}
      <PhoneAuthModal
        isPhoneModalOpen={
          modal?.is_model && modal?.model_type === 'recharge_modal'
        }
        issetIsModalOpen={() => {
          closeModel(dispatch)
        }}
      />
    </>
  )
}

export default CommonBalanceBar
