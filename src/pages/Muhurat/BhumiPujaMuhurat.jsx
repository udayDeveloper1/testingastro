import moment from 'moment';
import React, { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

// Lazy loaded components
import { lazy } from 'react';

const DynamicCard = lazy(() => import('../../component/Dynemic/DynamicCard'));
const Loader = lazy(() => import('../../component/loader/Loader'));

import { generateMuhuratBlogThunk } from '../../storemain/slice/MasterSlice';
import { openLoader } from '../../utils/CommonFunction';
import { Constatnt } from '../../utils/Constent';
import CommonBanner from '../../component/CommonBanner';

function BhumiPujaMuhurat() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector(state => state?.masterSlice?.loader)

  useEffect(() => {
    openLoader(dispatch, 'bhoomi_muhrat')
    let request = {
      type: `bhoomi`,
      year: moment().year(),
      lang: localStorage.getItem(Constatnt?.LANGUAGE_KEY)
    }
    dispatch(generateMuhuratBlogThunk(request))
  }, [LocalLanguage])

  return (
    <>
      <Suspense fallback={<></>}>    {loder?.is_loading && loder?.loding_type === 'bhoomi_muhrat' && (
        <Loader />
      )}</Suspense>
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text={t('bhoomi_poojan')}
          highlight={new Date().getFullYear()}
        />
      </section>

      <section>
        <div className='container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>
          <Suspense fallback={<></>}>  <DynamicCard
            title={`${t(
              'significance_bhiimi_pujan'
            )} ${new Date().getFullYear()}`}
            introText=''
            data={muhratData}
            listStyle='decimal'
          /></Suspense>
        </div>
      </section>

    </>
  )
}

export default React.memo(BhumiPujaMuhurat)
