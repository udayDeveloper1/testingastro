import React, { Suspense, useEffect } from 'react'
// import namkaranBanner from "../../assets/img/banner/namkaranBanner.webp";
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// Lazy-load React components
import { lazy} from 'react';

const DynamicCard = lazy(() => import('../../component/Dynemic/DynamicCard'));
const Loader = lazy(() => import('../../component/loader/Loader'));

// Non-component imports (keep them direct)
import { generateMuhuratBlogThunk } from '../../storemain/slice/MasterSlice';
import { openLoader } from '../../utils/CommonFunction';
import { Constatnt } from '../../utils/Constent';
import CommonBanner from '../../component/CommonBanner';

function NamkaranMuhurat() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH
  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector(state => state?.masterSlice?.loader)

  useEffect(() => {
    openLoader(dispatch, 'bhoomi_muhrat')
    let request = {
      type: 'namkaran muhurat',
      year: moment().year(),
      lang: localStorage.getItem(Constatnt?.LANGUAGE_KEY)
    }
    dispatch(generateMuhuratBlogThunk(request))
  }, [LocalLanguage])

  return (
    <>
      {loder?.is_loading && loder?.loding_type === 'bhoomi_muhrat' && (
        <Loader />
      )}
      <section>
        <CommonBanner
          text={t('namkaran_muharat')}
          highlight={new Date().getFullYear()}
        />
      </section>
<Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <div className='container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>
        <Suspense fallback={<></>}>   <DynamicCard
            title={`Astrological Significance of Namkaran ${new Date().getFullYear()}`}
            introText=''
            data={muhratData}
            listStyle='decimal'
            dangerouslyPara={true}
          /></Suspense>
        </div>
      </section>
      </Suspense>
    </>
  )
}

export default React.memo(NamkaranMuhurat)
