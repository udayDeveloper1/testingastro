import { Dropdown } from 'antd'
import { lazy, memo, Suspense, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { LanguageContext } from '../../context/LanguageContext'
import { LanguageOption } from '../../utils/CommonVariable'
const Loader = lazy(() => import('../loader/Loader'))

function LanguageDropdown({ className = '' }) {
  const { changeLanguage, language } = useContext(LanguageContext)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const handleLanguageChange = value => {
    setLoading(true) // Show loader

    changeLanguage(value)
    const supportedLanguages = Object.values(LanguageOption)
    const pathSegments = window.location.pathname.split('/')

    const isLangPrefix = supportedLanguages.includes(pathSegments[1])
    if (isLangPrefix) {
      pathSegments.splice(1, 1)
    }

    if (value !== LanguageOption.ENGLISH) {
      pathSegments.splice(1, 0, value)
    }
    const newPath = pathSegments.join('/') || '/'
    navigate(newPath)
    setLoading(false)
  }

  const languageLabels = {
    en: 'English',
    gu: 'ગુજરાતી',
    hi: 'हिंदी'
  }

  const dropdownItems = [
    {
      key: 'en',
      label: 'English',
      onClick: () => handleLanguageChange('en')
    },
    {
      key: 'gu',
      label: 'ગુજરાતી',
      onClick: () => handleLanguageChange('gu')
    },
    {
      key: 'hi',
      label: 'हिंदी',
      onClick: () => handleLanguageChange('hi')
    }
  ]

  return (
    <>
      {loading && <Suspense fallback={<></>}><Loader /></Suspense>}

      <Dropdown
        menu={{ items: dropdownItems }}
        trigger={['hover']}
        placement='bottomLeft'
      >
        <div
          className={`cursor-pointer language_dropdown_trigger ${className}`}
        >
          <p className='mb-0'>{languageLabels[language]}</p>
        </div>
      </Dropdown>
    </>
  )
}

export default memo(LanguageDropdown)
