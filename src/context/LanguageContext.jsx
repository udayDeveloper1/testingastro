import { createContext, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import i18n from '../i18n'
import { changeLanguage } from '../storemain/slice/MasterSlice'
import { Constatnt } from '../utils/Constent'

export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const dispatch = useDispatch()
  const language = useSelector(state => state?.masterSlice?.currentLanguage)
  const changeLanguageFunc = lng => {
    
    i18n.changeLanguage(lng)
    localStorage.setItem(Constatnt.LANGUAGE_KEY, lng)
    dispatch(changeLanguage(lng))
  }

  useEffect(() => {}, [language])

  return (
    <LanguageContext.Provider
      value={{ language: language || "", changeLanguage: changeLanguageFunc }}
    >
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LanguageContext.Provider>
  )
}
