import { lazy, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Lazy-loaded components
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'));
const CustomTable = lazy(() => import('../../component/Custom/CustomTable'));
const BalanceActionBar = lazy(() => import('../../component/Transaction/BalanceActionBar'));

// API & utility functions
import { getWalletTransactions } from '../../services/api/api.services';
import { formatDate } from '../../utils/CommonFunction';
import CommonBanner from '../../component/CommonBanner';


function TransactionWallet () {
  const [active, setActive] = useState('0')
  const [transactionData, setTransactionData] = useState([])
  const [paymentLogsData, setPaymentLogsData] = useState([])
  const [activeBalance, setactiveBalance] = useState('0')
    const { t } = useTranslation()
  const total_wallet_balance = useSelector(
    state => state?.masterSlice?.loginUser?.loginUserData?.total_wallet_balance
  )

  const transactionColumns = [
 
    {
      title: t('Type_transcation'),
      dataIndex: 'type',
      key: 'type',
       render: (_, record) => (
        <p className='capitalize'>{record?.type}</p>
      )
    },
    {
      title: `(₹) ${t('Amount_transcation')}`,
      dataIndex: 'amount',
      key: 'amount',
         render: (_, record) => (
        <>₹{record?.amount}</>
      )
    },
    {
      title: t('Created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      render: (_, record) => (
        <>{formatDate(record?.created_at, 'DD-MM-YYYY hh:mm A')}</>
      )
    }
  ]

  const getWalletTransacations = async () => {
    try {
      let response = await getWalletTransactions()
      if (response?.code === 1) {
        let resData = response?.data?.transactions
        setactiveBalance(response?.data?.total_balance)
        setTransactionData(resData)
        setPaymentLogsData(resData?.filter(ele => ele?.type === 'credit'))
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    getWalletTransacations()
  }, [])

  return (
    <>
      <section>
        <div className=''>
          <CommonBanner
            // backgroundImage={ active == '0' ? TransactionWalletImage : transactionPayment }
            text=''
            highlight={`${
              active == '0' ? t('Wallet_Transactions') : t('Payment_Logs')
            }`}
          />
        </div>
        {/* <KundliStepper /> */}
      </section>
<Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <div className='container paddingTop50'>
          <div className='grid gap-6 md:gap-12'>
            {/* Grid for Buttons */}
            <div className='grid grid-cols-1  sm:grid-cols-3 xl:grid-cols-5  gap-3'>
              <CustomButton
                className={`   w-full  border font-semibold text-[16px] leading-[100%] transition-all py-[13px] ${
                  active === '0' ? 'setting_active' : 'setting_inactive'
                }`}
                parentClassName='h-full '
                onClick={() => {
                  setActive('0')
                }}
              >
                {t('Wallet_Transactions')}
              </CustomButton>

              <CustomButton
                className={`  w-full  border font-semibold text-[16px] leading-[100%] transition-all py-[13px] h-full ${
                  active === '1' ? 'setting_active ' : 'setting_inactive'
                }`}
                parentClassName='h-full '
                onClick={() => {
                  setActive('1')
                }}
              >
              {t('Payment_Logs')}
              </CustomButton>
            </div>

            {/* Grid for Heading & Bar */}
            <div className='grid gap-5'>
              <h2 className='commonQuesH2'>{t('Transactions')}</h2>
              <BalanceActionBar balance={total_wallet_balance} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='container padding50 '>
          {active === '0' ? (
            <>
              <div className='flex flex-col gap-6'>
                <CustomTable
                  columns={transactionColumns}
                  dataSource={transactionData}
                  pagination={false}
                  bordered
                  className='dasha_siddha transaction_table'
                />
              </div>
            </>
          ) : (
            <>
              <h2 className='text-2xl font-bold mb-4'>Siddha</h2>
              <div className=''>
               
                <CustomTable
                  columns={transactionColumns}
                  dataSource={paymentLogsData}
                  pagination={false}
                  bordered
                  className='dasha_siddha transaction_table'
                />
              </div>
            </>
          )}
        </div>
      </section>
      </Suspense>
    </>
  )
}

export default React.memo(TransactionWallet)
