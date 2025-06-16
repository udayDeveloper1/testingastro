import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';


const KundliParts = ({ svg, title, link, classList }) => {
  const location = useLocation();
  const isActive = (location.pathname)?.toLowerCase() === link?.toLowerCase() ? 'active' : '';

  return (
    <Link to={link} className=''>
      <div className={`KundliParts cursor-pointer px-5 ${classList} text-center ${isActive}`}>
        <div className='kundliParts_round mx-auto mb-5 rounded-full flex items-center justify-center transition-all'><img src={svg} alt={title} className='block mx-auto' /></div>
        <h3 className='text-center transition-all text-[16px] xl:text-[18px] font-semibold'>{title}</h3>
      </div>
    </Link>
  )
}

export default memo(KundliParts)
