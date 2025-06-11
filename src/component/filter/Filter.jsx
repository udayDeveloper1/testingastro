import { Checkbox, Modal } from "antd";
import React, { lazy, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import close from "../../assets/img/common/close.webp";
import {
  setFilterValue,
  setOnSubmitFilter,
} from "../../storemain/slice/MasterSlice";
import CustomWhiteButton from "../Homepage/CustomWhiteButton";
import { useTranslation } from "react-i18next";
const CustomButton = lazy(() => import('../Homepage/CustomButton'))

function Filter({ isOpen, onClose }) {

  const { t } = useTranslation()

  const dispatch = useDispatch();
  const filterValue = useSelector((state) => state?.masterSlice?.filter_value);
  const { contentList: data } = useSelector((state) => state?.masterSlice?.getFilterList);

  const [selectedCategory, setSelectedCategory] = useState(data[0]?.value);
  const [selectedSubcategories, setSelectedSubcategories] = useState(data[0]?.subcategories);

  const [selectedFilters, setSelectedFilters] = useState(filterValue);

  const handleClear = () => {
    setSelectedFilters({});
    dispatch(setFilterValue({}));
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    const foundCategory = data.find((item) => item.value === categoryName);
    if (foundCategory) {
      setSelectedSubcategories(foundCategory.subcategories)
    } else {
      setSelectedSubcategories([])
    }
  }

  // -------------------------------- This function Comma sepred for use cant remove-----------------------------------------------------------------

  const handleSelection = (subcategoryName, categoryName) => {
    setSelectedFilters(prev => {
      const updatedFilters = { ...prev }

      // For single selection, just check if the selected is already chosen or not
      if (updatedFilters[categoryName] === subcategoryName) {
        // If already selected, unselect it (optional)
        updatedFilters[categoryName] = ''
      } else {
        // Set new selection (overwrite old one)
        updatedFilters[categoryName] = subcategoryName
      }

      const finalData = {}

      Object.keys(updatedFilters).forEach(key => {
        if (updatedFilters[key]) {
          finalData[key] = updatedFilters[key] // Convert to lowercase
        }
      })

      const selectedCategories = Object.keys(updatedFilters).filter(
        key => updatedFilters[key].toLo
      )
      finalData['category'] = selectedCategories.join(',')

      dispatch(setFilterValue(finalData))
      return updatedFilters
    })
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={500}
      centered
      className='custom-filter-modal rounded-[10px] overflow-hidden'
    >
      {/* Header */}
      <div className="flex justify-between items-center px-2 py-3 md:px-7 md:py-5 mb-2 commonLightBack">
        <h4 className="font-semibold text-[18px] m-0">{t('Filter')}</h4>
        <img
          src={close}
          alt="Close"
          className="cursor-pointer"
          onClick={onClose}
          height={16}
          width={16}
        />
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-300 py-4 pt-5">
          {data?.filter((item) => item?.value !== "Sortby").map((item) => (
            <div
              key={item._id}
              className={`ps-2 py-2 md:py-5 md:ps-5 cursor-pointer text-[16px] font-medium ${selectedCategory == item?.value
                ? " website_color commonLightBack  new_border_left"
                : "new_body_font "
                }`}

              onClick={() => handleCategoryClick(item?.value)}
            >
              {item?.category}
            </div>
          ))}
        </div>

        {/* Options */}
        <div className="w-2/3 p-4 md:ps-10 pt-5">
          {/* <div className="flex justify-between items-center mb-7">
            <span className="text-purple-700 font-semibold opacity-0">
              {selectedCategory}
            </span>

            <div></div>
          </div> */}

          <div className="flex flex-col gap-5 overflow-y-auto  md:h-[300px] CustomFilterOption md:pr-4">
            {selectedSubcategories?.map((option) => {

              const label = typeof option === "string" ? option : option?.name;
              const sub_value = typeof option === "string" ? option : option?.value;
              const description = typeof option === "string" ? null : option?.value;


              // Get currently selected subcategories for the category
              const selectedForCategory = selectedFilters[selectedCategory]?.split(",") || [];

              return (
                <Checkbox
                  key={sub_value}
                  checked={selectedForCategory?.includes(sub_value)}
                  onChange={() => handleSelection(sub_value, selectedCategory)}
                  className='new_body_font font-bold'
                >
                  <div className='flex flex-col'>
                    <span className='font-medium text-[15px]'>{label}</span>
                    {/* {description && (
                      <span className="text-[13px] text-[#797979]">
                        {description}
                      </span>
                    )} */}
                  </div>
                </Checkbox>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='grid grid-cols-2 gap-4 px-2 py-3 md:px-10 md:py-7 mt-4 commonLightBack '>
        <CustomWhiteButton
          className="px-5 py-2 text-[16px] font-semibold"
          onClick={() => {
            handleClear();
          }}
        >
          {t('RESET')}
        </CustomWhiteButton>
        <CustomButton
          className="px-5 py-2 text-[16px] font-semibold h-full"
          onClick={() => {
            dispatch(setOnSubmitFilter(true));
          }}
        >
          {t('APPLY')}
        </CustomButton>
      </div>
    </Modal>
  )

}

export default Filter
