import { Input } from 'antd'
import React, { lazy } from 'react'
import close from '../../assets/img/panchang/close.webp'
const CustomButton = lazy(() => import('../Homepage/CustomButton'))

const PanchangSearch = () => {
  return (
    <div
      className='p-10 rounded-lg  flex items-center justify-between gap-4 '
      style={{
        background: 'rgba(116, 65, 157, 0.1)',
        border: '1px dashed #74419D'
      }}
    >
      {/* Input Field */}
      <div className='flex-1 relative'>
        <Input
          placeholder='Enter City Name'
          className='w-full rounded-lg py-5 px-6 text-sm'
        />
        {/* <CloseOutlined className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 cursor-pointer text-xs" /> */}
        <img
          src={close}
          alt=''
          className='absolute top-1/2 right-4 -translate-y-1/2  cursor-pointer '
        />
      </div>

      {/* Button */}
      <div className='h-full flex justify-center items-center'>
        <CustomButton className=' text-white text-[16px] font-semibold px-20 py-4  font-medium h-full '>
          GET PANCHANG
        </CustomButton>
      </div>
    </div>
  )
}

export default PanchangSearch
