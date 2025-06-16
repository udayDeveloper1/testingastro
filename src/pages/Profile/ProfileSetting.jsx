import { lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CommonBanner from '../../component/CommonBanner'
import UserProfileForm from '../../component/Profile/UserProfileForm'
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))

function ProfileSetting() {
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
