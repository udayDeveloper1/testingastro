import { useEffect, useState, lazy, Suspense, memo } from 'react';
import { useTranslation } from 'react-i18next';

// Lazy-loaded components
const CommonQuestionComp = lazy(() => import('../../component/CommonQuestionComp'));

// API & constants
import { getCmsPages } from '../../services/api/api.services';
import { Codes, LanguageOption } from '../../utils/CommonVariable';
import { Constatnt } from '../../utils/Constent';
import CommonBanner from '../../component/CommonBanner';

function PrivacyPolicy() {
  const { t } = useTranslation()
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH

  const [privarcyPolicyData, setPrivarcyPolicyData] = useState({})

  useEffect(() => {
    getCmsPages({ type: "privacy_policy" }).then((res) => {
      if (res?.code === Codes?.SUCCESS) {
        setPrivarcyPolicyData(res?.data?.content[0])
      } else {
        setPrivarcyPolicyData({})
      }
    }).catch((err) => {
      console.error('Error fetching privacy policy:', err)
    })
  }, [t,LocalLanguage])


  const content = [
    privarcyPolicyData?.description || ""
  ]

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={PrivacyBanner}
          text={t('privarcy_policy')}
          highlight=''
        />
      </section>
       <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section className=''>
        <div className='container mx-auto padding50 flex flex-col gap-10'>
          <CommonQuestionComp heading='' content={content} />
         
        </div>
      </section>
      </Suspense>
    </>
  )
}

export default memo(PrivacyPolicy)
