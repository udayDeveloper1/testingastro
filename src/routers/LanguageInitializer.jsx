import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import i18n from '../i18n'
import { LanguageOption } from '../utils/CommonVariable'

const supportedLanguages = Object.values(LanguageOption)

export function LanguageInitializer() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const storedLang = localStorage.getItem('ASTRO_language') || LanguageOption.ENGLISH
    const urlLang = location.pathname.split('/')[1]
    const isValidLang = supportedLanguages.includes(urlLang)

    if (isValidLang && urlLang !== storedLang) {
      localStorage.setItem('ASTRO_language', urlLang)
      i18n.changeLanguage(urlLang)
    } else if (!isValidLang && storedLang !== LanguageOption.ENGLISH) {
      const redirectPath = `/${storedLang}${location.pathname}`
      navigate(redirectPath, { replace: true })
    } else {
      i18n.changeLanguage(storedLang)
    }
  }, [location.pathname, navigate])

  return null
}