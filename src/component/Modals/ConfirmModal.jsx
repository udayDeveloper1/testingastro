import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import { lazy, memo, Suspense } from 'react'
const CustomWhiteButton = lazy(() => import('../Homepage/CustomWhiteButton'))
const CustomButton = lazy(() => import('../Homepage/CustomButton'))

 function ConfirmModal({
  isOpen,
  title = 'Are you sure?',
  description = 'This action cannot be undone.',
  okText = 'Yes',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  imageSrc = '',
  imgClass = ''
}) {
  return (
    <Modal
      open={isOpen}
      title={
        <>
          {' '}
          <div className='flex items-center gap-2 text-lg font-semibold text-gray-800'>
            <ExclamationCircleOutlined className='text-[#E3725D] text-xl' />
            {title}
          </div>
          {imageSrc !== '' && (
            <img
              src={imageSrc}
              alt='celebration'
              className={`w-full object-contain ${imgClass}`}
            />
          )}
        </>
      }
      onCancel={onCancel}
      footer={[
        <>
          <>
            {(cancelText !== '' || okText !== '') && (
              <div className='flex justify-end gap-3'>
                <Suspense fallback={<></>}>
                {cancelText !== '' && (
                  <CustomWhiteButton
                    key='cancel'
                    onClick={onCancel}
                    className='rounded-[10px] border px-5 py-2'
                  >
                    {cancelText}
                  </CustomWhiteButton>
                )}
                {okText !== '' && (
                  <CustomButton
                    key='confirm'
                    onClick={onConfirm}
                    className='bg-[#E3725D] hover:bg-[linear-gradient(90deg,_#C32853_0%,_#EE7E49_100%)] text-white rounded-[10px] px-5 py-2 h-full'
                    parentClassName=''
                  >
                    {okText}
                  </CustomButton>
                )}
                </Suspense>
              </div>
            )}
          </>{' '}
        </>
      ]}
      centered
      className='custom-confirm-modal'
    >
      <p className='text-gray-600'>{description}</p>

    </Modal>
  )
}

export default memo(ConfirmModal)