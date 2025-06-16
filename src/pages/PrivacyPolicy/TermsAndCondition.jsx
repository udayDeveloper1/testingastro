import  { useEffect, useState, lazy, Suspense, memo } from "react";
import { useTranslation } from "react-i18next";

// Lazy-loaded components
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));

// Utilities and constants
import { Constatnt } from "../../utils/Constent";
import { Codes, LanguageOption } from "../../utils/CommonVariable";
import { getCmsPages } from "../../services/api/api.services";
import CommonBanner from "../../component/CommonBanner";


function TermsAndCondition() {

  const { t } = useTranslation()

  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  const [termAndConditionData, setTermAndCoditionData] = useState({})

  useEffect(() => {
    getCmsPages({ type: "terms_condition" }).then((res) => {
      if (res?.code === Codes?.SUCCESS) {
        setTermAndCoditionData(res?.data?.content[0])
      } else {
        setTermAndCoditionData({})
      }
    }).catch((err) => {
      console.error('Error fetching privacy policy:', err)
    })
  }, [t,LocalLanguage])

  const content = [
    termAndConditionData?.description || ""
  ]

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={termsAndCondition}
          text={t('terms_conditions')}
          highlight=""
        />
      </section>
      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section className="">
        <div className="container mx-auto padding50 flex flex-col gap-10">
          <CommonQuestionComp heading="" content={content} />

          

        </div>
      </section>
      </Suspense>
    </>
  );
}

export default memo(TermsAndCondition);
