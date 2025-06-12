import { lazy, useState } from 'react'
import CommonBanner from '../../component/CommonBanner'
import Kalpasara from '../../component/kundali/FreeKundaliReport/Dosha/Kalpasara'
import Manglik from '../../component/kundali/FreeKundaliReport/Dosha/Manglik'
import Sadesati from '../../component/kundali/FreeKundaliReport/Dosha/Sadesati'
import GeneralTabFreeKundali from '../../component/kundali/FreeKundaliReport/General/GeneralTabFreeKundali'
import LifeStone from '../../component/kundali/FreeKundaliReport/Remedies/LifeStone'
import Rudraksha from '../../component/kundali/FreeKundaliReport/Remedies/Rudraksha'
import LanguageAndNotificationCard from '../../component/Profile/LanguageAndNotificationCard'
import UserProfileForm from '../../component/Profile/UserProfileForm'
import { useTranslation } from 'react-i18next'
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))

function ProfileSetting() {
  const [active, setActive] = useState('0')
  const [activeSubTab, setActiveSubTab] = useState('1')
  const { t } = useTranslation()



  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={getBannerImage()}
          text=''
          highlight={t('Edit_Your_Profile')}
        />
        {/* <KundliStepper /> */}
      </section>

     

      <section>
        <div className='container padding50 '>
           <UserProfileForm />
          
        </div>
      </section>
    </>
  )
}

export default ProfileSetting
