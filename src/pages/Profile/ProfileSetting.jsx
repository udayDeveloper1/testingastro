import { lazy, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CommonBanner from '../../component/CommonBanner'
import UserProfileForm from '../../component/Profile/UserProfileForm'

function ProfileSetting() {
  const { t } = useTranslation()



  return (
    <>
    <Suspense fallback={<div className='min-h-[100vh]'></div>}>
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
</Suspense>
    </>
  )
}

export default Reat(ProfileSetting)
