import { memo } from 'react'
import noDataFound from '../../assets/img/noDataFound/No_Data_Found.webp'
const NoDataFound = ({ classList = "" }) => {
  return (
    <div className={`text-center ${classList}`}>
      <img src={noDataFound} alt='no-data-found' className='block mx-auto' />
      <h4 className='text-[#e3725d] font-black text-center -mt-8 text-[30px]'>
        No Data Found.
      </h4>
    </div>
  )
}

export default memo(NoDataFound)
