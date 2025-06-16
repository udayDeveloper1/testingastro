import { memo } from 'react';
import { useHoroscopeTabs } from './Horoscope/horoscopeTabsData'

const AlsoCheckBanner = ({ active, onTabChange }) => {
  const horoscopeTabs = useHoroscopeTabs()

  return (
    <>
      {/* Desktop & Tablet View */}
    <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 overflow-hidden">
  {horoscopeTabs.map((item, idx) => {
    const isActive = active === item.type;
    const isFirst = idx === 0;
    const isLast = idx === horoscopeTabs.length - 1;

    return (
      <div
        key={idx}
        onClick={() => onTabChange(item)}
        className={`flex sm:flex-col md:justify-between text-center items-center gap-2 p-4 sm:px-6 sm:py-4 md:px-8 lg:px-10 xl:px-[60px] cursor-pointer transition-all duration-200
          ${isActive ? 'bg_website_color text-white activeImage' : 'commonLightBack website_color'}
          ${isFirst ? ' xl:rounded-r-none xl:rounded-l-[10px] ' : ''}
          ${isLast ? 'rounded-r-[10px] rounded-l-[10px]  xl:rounded-r-[10px] xl:rounded-l-none' : ''}
          rounded-[10px] sm:rounded-[10px] xl:rounded-none
        `}
      >
        <div className="w-[40px] h-[40px] flex items-center justify-center">
          {isActive ? item.icon : item.iconActive}
        </div>
        <div className="flex flex-row md:flex-col gap-1">
          <span className="text-sm sm:text-base md:text-[16px] font-semibold leading-snug">
            {item.label}
          </span>
        </div>
      </div>
    );
  })}
</div>


      {/* Mobile View */}
      <div className="grid sm:hidden grid-cols-2 gap-1 ">
        {horoscopeTabs.map((item, idx) => {
          const isActive = active === item.type
          return (
            <div
              key={idx}
              onClick={() => onTabChange(item)}
              className={`flex flex-row md:flex-col gap-[5px] sm:gap-[10px] md:gap-0 items-center md:justify-center py-[14px] px-[10px] sm:px-[15px] rounded-md cursor-pointer text-[10px] transition-all duration-200 
                ${isActive ? 'bg_website_color text-white activeImage' : 'commonLightBack website_color'}
                ${idx === 0 ? 'rounded-[10px] md:rounded-l-xl' : ''}
                ${idx === horoscopeTabs.length - 1 ? 'rounded-[10px] md:rounded-r-xl' : 'rounded-[10px] md:rounded-none'}
              `}
            >
              <div className="min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px] flex items-center justify-center object-contain">
                {isActive ? item.icon : item.iconActive}
              </div>
              <span className="text-[16px] font-medium leading-tight text-start">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default memo(AlsoCheckBanner)
