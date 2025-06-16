import { memo } from 'react'
import noDataFound from '../../assets/img/noDataFound/No_Data_Found.webp'
const NoDataFound = ({ classList = "" }) => {
  return (
    <Suspense fallback={<div className='min-h-[100vh]'></div>}>
    <div className={`text-center ${classList}`}>
      <img src={noDataFound} alt='no-data-found' className='block mx-auto' />
      <h4 className='text-[#e3725d] font-black text-center -mt-8 text-[30px]'>
        No Data Found.
      </h4>
    </div>
    </Suspense>
  )
}

export default memo(NoDataFound)
