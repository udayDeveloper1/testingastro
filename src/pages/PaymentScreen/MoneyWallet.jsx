import { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

// Lazy-loaded components
const PriceCard = lazy(() => import('../../component/Payment/PriceCard'));
const Loader2 = lazy(() => import('../../component/loader/Loader2'));

// API services
import {
  listWalletOffer,
  paymentAstrologerOfferWallet
} from '../../services/api/api.services';

// Utils and constants
import { Codes } from '../../utils/CommonVariable';
import { closeLoder, openLoader } from '../../utils/CommonFunction';
import { paymentScreenRedirection } from '../../utils/navigations/NavigationPage';
import { UpdatedPaths } from '../../routers/Paths';
import CommonBanner from '../../component/CommonBanner';


function MoneyWallet({ openInModel = false, handlePriceCardClick = () => { } }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const PATHS = UpdatedPaths()
  const { t } = useTranslation()
  const {  loginUserData } = useSelector(
    state => state?.masterSlice?.loginUser
  )
  const { loding_type } = useSelector(
    state => state?.masterSlice?.loader
  )
  const [walletList, setWalletList] = useState([])

  const astroPaymentDetails = useSelector(
    state => state?.AstroDetailsDataSlice?.astroPaymentDetails
  )

  const fetchWalletOffers = async () => {
    openLoader(dispatch, 'wallet_offers')

    try {
      let response
      if (Object.keys(astroPaymentDetails)?.length === 0) {
        response = await listWalletOffer()
      } else {
        let data = {
          price_per_minutes: astroPaymentDetails?.price_per_min
        }
        response = await paymentAstrologerOfferWallet(data)
      }

      if (response?.code === Codes?.SUCCESS) {
        setWalletList(response?.data)
      } else {
        setWalletList([])
      }
    } catch (error) {
      console.error('Failed to fetch wallet offers:', error)
      setWalletList([])
    } finally {
      closeLoder(dispatch)
    }
  }

  useEffect(() => {
    fetchWalletOffers()
  }, [astroPaymentDetails])

  return (
    <>
      {!openInModel && (
        <section>
          <CommonBanner
            // backgroundImage={walletScreen}
            text={t('add_mony_to_wallet')}
            highlight=''
          />
        </section>
      )}
      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section
        className={`${!openInModel ? 'paddingBottom100' : ''
          } `}
      >
        <div className='container mx-auto'>

          {/* Header */}
          <div className={`flex flex-wrap justify-between py-10 md:py-20 md:items-center gap-[20px] md:gap-0 ${!openInModel ? '' : 'hidden' }`}>
            <div
              className={`flex flex-col w-full sm:w-[48%]  `}
            >
              <h2 className='text-[24px]  md:text-[40px] font-semibold new_body_font mb-0 pb-2'>
                {t('add_mony_to_wallet')}
              </h2>
              <p className='text-[16px] font-semibold mb-0'>
                {t('choose_from_avilable_recharge_pack')}

              </p>
            </div>
            <div class='flex justify-between items-center p-[20px] md:p-[30px]  rounded-xl relative bg-[linear-gradient(90deg,_#fdf3ec_0%,_#f9e9ec_100%)] w-full sm:w-[48%] available_balance'>
              <span class='text-[16px] md:text-[18px] font-medium text-black'>
                {t('Available_Balance')}:{' '}
              </span>
              <span class='text-[25px] md:text-[30px] lg:text-[36px] font-semibold bg-[linear-gradient(90deg,_#c32853_0%,_#ee7e49_100%)] bg-clip-text text-transparent'>
                ₹{loginUserData?.total_wallet_balance}
              </span>
            </div>
          </div>

          {/* Price Cards Grid */}
          {loding_type === 'wallet_offers' ? (
            <div className=''>
              <div className='pb-10 pt-24 min-h-[100vh]'>
                <Loader2 />
              </div>
            </div>
          ) : (
            <div
              className={`grid ${!openInModel
                ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-[15px] md:gap-[30px]'
                : 'max-h-[30vh] overflow-y-auto justify-center sm:justify-start grid-cols-1 sm:grid-cols-3 md:grid-cols-5  gap-[20px] pt-5 py-3'
                } `}
            >

              {walletList?.length > 0 ? (
                walletList?.map((item, index) => (
                  <PriceCard
                    openInModel={openInModel}
                    data={item}
                    price={item?.price}
                    extraLabel={
                      item?.type === 'percentage'
                        ? `${t('get')} ${item?.offer}${`% ${t('extra')}`}`
                        : item?.type === 'flat'
                          ? '₹ ' + item?.offer + ' ' + t('flat')
                          : ''
                    }
                    onClick={data => {
                      const finalData={
                        data: JSON.stringify(data),
                        walletList:JSON.stringify(walletList)
                      };
                      if (!openInModel) {
                        
                        paymentScreenRedirection(
                          navigate,
                          finalData,
                          PATHS?.PAYMENT_SCREEN
                        )
                      } else {
                        handlePriceCardClick(data)
                      }
                    }}
                    key={index}
                  />
                ))
              ) : (
                <p>{t('no_data_found')}</p>
              )}
            </div>
          )}
        </div>
      </section>
      </Suspense>
    </>
  )
}

export default MoneyWallet
