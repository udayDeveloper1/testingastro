import { Select } from 'antd'
import { memo, useContext } from 'react'
import { LanguageContext } from './context/LanguageContext'

const LanguageSwitcher = () => {
  const { changeLanguage, language } = useContext(LanguageContext)

  return (
    <>
      <Select
        value={language}
        onChange={value => changeLanguage(value)}
        style={{ width: 120 }}
      >
        <Select.Option value='en'>English</Select.Option>
        <Select.Option value='gu'>Gujarati</Select.Option>
      </Select>
    </>
  )
}

export default memo(LanguageSwitcher)
