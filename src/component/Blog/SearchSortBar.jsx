import React from 'react';
import { Input } from 'antd';
import commonSearch from '../../assets/img/common/search.svg';

const SearchSortBar = React.memo(({
  showSearchInput = true,
  searchValue = '',
  onSearchChange = () => {},
  sortOptions = [],
  onSortChange = () => {},
  placeholder = '',
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center rounded-lg px-2 w-full bg-white gap-2 SearchSortBar">
      <div className="col-span-2 grid grid-cols-2">
        {showSearchInput ? (
          <div className="col-span-2 flex items-center   py-2">
             <div className='w-[38px] h-[38px] min-h-[38px] min-w-[38px] flex items-center justify-center bg_light_back rounded-full'>
            <img src={commonSearch} alt='Search' className='object-contain w-[16px] h-[16px]' />
          </div>
            {/* <img src={commonSearch} alt="search icon" className="w-10 h-10" /> */}
            <Input
              placeholder={placeholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-2 outline-none bg-transparent commonQuesP placeholder-[#343434]"
              bordered={false}
              allowClear
            />
          </div>
        ) : (
          <div className={`text-[18px] md:text-[24px] font-medium py-5 px-2 ${showSearchInput ? 'col-span-1' : 'col-span-2'}`}>
            Ratings and Reviews
          </div>
        )}
      </div>
    </div>
  );
});

export default SearchSortBar;
