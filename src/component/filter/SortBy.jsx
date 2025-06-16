import { Modal, Radio, Typography } from 'antd'
import { memo, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import close from '../../assets/img/common/close.webp'
import { setShortValue } from '../../storemain/slice/MasterSlice'

const { Title } = Typography

function SortBy({ isOpen, onSortChange, onClose }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const shortValue = useSelector(state => state?.masterSlice?.sort_by_value)
  const { contentList: data } = useSelector(state => state?.masterSlice?.getFilterList)

  const sortByCategory = data?.find(item => item.value === 'Sortby')
  const subCategories = sortByCategory
    ? [{ _id: '123', name: 'None', value: '' }, ...sortByCategory.subcategories]
    : [{ _id: '123', name: 'None', value: '' }]

  const isEmptyObject = obj =>
    obj && typeof obj === 'object' && Object.keys(obj).length === 0

  const initialValue = shortValue && !isEmptyObject(shortValue) ? shortValue : subCategories[0]?.value || ''

  const [selectedValue, setSelectedValue] = useState(initialValue)

  const handleChange = e => {
    const value = e.target.value
    setSelectedValue(value)
    onSortChange(value)
    dispatch(setShortValue(value))
  }

  const radioOptions = useMemo(
    () =>
      subCategories?.map(filter => (
        <Radio
          key={filter.value}
          value={filter.value}
          className='new_body_font font-medium'
        >
          {filter.name}
        </Radio>
      )),
    [subCategories]
  )

  useEffect(() => {
    dispatch(setShortValue(initialValue))
  }, [initialValue])

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      closable={false}
      width={400}
      centered
      className='custom-sort-modal customSort'
    >
      {/* Header */}
      <div className='flex justify-between items-center px-5 py-4 rounded-t-lg bg_light_back'>
        <Title level={5} className='font-semibold text-[18px] m-0 !mb-0'>
          {t('Sort_By')}
        </Title>
        <img
          src={close}
          alt='Close'
          className='cursor-pointer'
          onClick={onClose}
          width={16}
          height={16}
        />
      </div>

      {/* Options */}
      <div className='p-7'>
        <Radio.Group value={selectedValue} onChange={handleChange}>
          <div className='flex flex-col gap-4 text-[16px] font-medium'>
            {radioOptions}
          </div>
        </Radio.Group>
      </div>
    </Modal>
  )
}

export default memo(SortBy)
