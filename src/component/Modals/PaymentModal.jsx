import React, { lazy, useState } from 'react'
import { Modal, Button } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const CustomButton = lazy(() => import('../Homepage/CustomButton'))
import CustomWhiteButton from '../Homepage/CustomWhiteButton'
import MoneyWallet from '../../pages/PaymentScreen/MoneyWallet'
import PaymentDetails from '../../pages/PaymentScreen/PaymentDetails'
import { closeModel } from '../../utils/CommonFunction'
import { useDispatch } from 'react-redux'

export default function PaymentModal ({
  isOpen,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  okText = 'Yes',
  cancelText = 'Cancel',
  onCancel,
  imageSrc = '',
  imgClass = '',
  onPaymentSuccess,
  className=""
}) {
  const [showWallet, setShowWallet] = useState(false)
  const [paymentDetailsData, setPaymentDetailsData] = useState({})

  const [showPaymentDetails, setShowPaymentDetails] = useState(false)

  const dispatch = useDispatch();
  const onConfirm = async () => {
    setShowWallet(true)
  }
  return (
    <Modal
      open={isOpen}
      title={
        <>
          <div className='flex items-center gap-2 text-lg font-semibold text-gray-800'>
            <ExclamationCircleOutlined className='text-[#E3725D] text-xl' />
            {title}
          </div>
          
        </>
      } 
      onCancel={onCancel}
      footer={[
        <>
          <>
            {(cancelText !== '' || okText !== '') && (
              <div className='flex justify-end gap-3'>
                {cancelText !== '' && (
                  <CustomWhiteButton
                    key='cancel'
                    onClick={onCancel}
                    className={`rounded-md border px-5 py-2 ${
                      showPaymentDetails || showWallet
                        ? ' '
                        : ''
                    }`}
                  >
                    {cancelText}
                  </CustomWhiteButton>
                )}
                {okText !== '' && !showPaymentDetails && !showWallet && (
                  <CustomButton
                    key='confirm'
                    onClick={onConfirm}
                    className={` bg-[#e3725d] hover:bg-[linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)] text-white rounded-md px-5 py-2`}
                  >
                    {okText}
                  </CustomButton>
                )}
              </div>
            )}
          </>
        </>
      ]}
      centered
      className={`custom-confirm-modal custom_payment_modal ${className}`}
    >
    {showWallet && (
            <MoneyWallet
              openInModel={true}
              handlePriceCardClick={data => {
                setPaymentDetailsData(data)
                setShowPaymentDetails(true)
                setShowWallet(false)
              }}
            />
          )}
          {showPaymentDetails && (
            <PaymentDetails
              paymentDetailsData={paymentDetailsData}
              openInModel={true}
              onPaymentSuccess={() => {
                onPaymentSuccess()
                setShowWallet(false)
                setShowPaymentDetails(false)
              }}
            />
          )}
    </Modal>
  )
}
