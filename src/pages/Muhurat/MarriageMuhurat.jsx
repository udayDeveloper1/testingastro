import moment from "moment";
import React, { Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

// Lazy-loaded components
import { lazy} from "react";

const DynamicCard = lazy(() => import("../../component/Dynemic/DynamicCard"));
const Loader = lazy(() => import("../../component/loader/Loader"));

// Utility functions and constants (not lazy-loaded)
import { generateMuhuratBlogThunk } from "../../storemain/slice/MasterSlice";
import { openLoader } from "../../utils/CommonFunction";
import { Constatnt } from "../../utils/Constent";
import CommonBanner from "../../component/CommonBanner";

function MarriageMuhurat() {

  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector((state) => state?.masterSlice?.loader);

  useEffect(() => {
    openLoader(dispatch, "marrige_muhrat");
    let request = {
      type: 'marriage',
      year: moment().year(),
      lang: localStorage.getItem(Constatnt?.LANGUAGE_KEY)
    }
    dispatch(generateMuhuratBlogThunk(request))
  }, [LocalLanguage])

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "marrige_muhrat" && (
        <Loader />
      )}
      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <CommonBanner text={t('marrige_muharat')} highlight={new Date().getFullYear()} />
      </section>
      <section>
        <div className=' container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>
          <Suspense fallback={<></>}> 
          <DynamicCard
            title={`${t('marrige_muharat')} ${new Date().getFullYear()}`}
            introText=""
            data={muhratData}
            listStyle='decimal'
            dangerouslyPara={true}
          />
          </Suspense>
        </div>
      </section>
      </Suspense>
    </>
  )
}

export default React.memo(MarriageMuhurat)
