import { lazy, useEffect, useState } from 'react'
import CommonBanner from '../../component/CommonBanner'

import { useSelector } from 'react-redux'
import CustomTable from '../../component/Custom/CustomTable'
import BalanceActionBar from '../../component/Transaction/BalanceActionBar'
import { getWalletTransactions } from '../../services/api/api.services'
import { formatDate } from '../../utils/CommonFunction'
import { useTranslation } from 'react-i18next'
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))

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
    // {
    //   title: 'ID',
    //   dataIndex: '_id',
    //   key: '_id'
    // },
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
        <div className='container padding50'>
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
                {/* <CustomTable
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  bordered
                  className="dasha_siddha "
                /> */}
                <CustomTable
                  columns={transactionColumns}
                  dataSource={paymentLogsData}
                  pagination={false}
                  bordered
                  className='dasha_siddha'
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}

export default TransactionWallet
