import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { lazy, Suspense } from 'react'
const CustomWhiteButton = lazy(() => import('../Homepage/CustomWhiteButton'))
const CustomButton = lazy(() => import('../Homepage/CustomButton'))

export default function ReloadModal({
  isOpen,
  title = 'Are you sure?',
  description = `This action Can't be undone.`,
  okText = 'Yes',
  cancelText = 'Cancel',
  onCancel,
  onConfirm
}) {
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
        <Suspense fallback={<></>}>
          <>
            {(cancelText !== '' || okText !== '') && (
              <div className='flex justify-end gap-3'>
                {cancelText !== '' && (
                  <CustomWhiteButton
                    key='cancel'
                    onClick={onCancel}
                    className={`py-2 rounded-md border px-5`}
                  >
                    {cancelText}
                  </CustomWhiteButton>
                )}
                {okText !== '' && (
                  <CustomButton
                    key='confirm'
                    onClick={onConfirm}
                    className={` bg-[#E3725D] hover:bg-[linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)] text-white rounded-md px-5 py-2`}
                  >
                    {okText}
                  </CustomButton>
                )}
              </div>
            )}
          </>
          </Suspense>
        </>
      ]}
      centered
      className='custom-confirm-modal custom_payment_modal'
    >
      <p className='text-[20px]'>{description}</p>
    </Modal>
  )
}
