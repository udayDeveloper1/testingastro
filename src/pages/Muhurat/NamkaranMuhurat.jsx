import { useEffect } from 'react'
// import namkaranBanner from "../../assets/img/banner/namkaranBanner.webp";
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import CommonBanner from '../../component/CommonBanner'
import DynamicCard from '../../component/Dynemic/DynamicCard'
import Loader from '../../component/loader/Loader'
import { generateMuhuratBlogThunk } from '../../storemain/slice/MasterSlice'
import { openLoader } from '../../utils/CommonFunction'
import { Constatnt } from '../../utils/Constent'

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
          // backgroundImage={namkaranBanner}
          text={t('namkaran_muharat')}
          highlight={new Date().getFullYear()}
        />
      </section>

      {/* <section>
        <div className=" container mx-auto paddingTop100 pb-10 flex flex-col gap-10">
          <CommonQuestionComp heading="" content={content2} />
         
        </div>
      </section> */}

      <section>
        <div className='container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>
          <DynamicCard
            title={`Astrological Significance of Namkaran ${new Date().getFullYear()}`}
            introText=''
            data={muhratData}
            listStyle='decimal'
            dangerouslyPara={true}
          />

          {/* <GoldBuyingMuhuratcomp
            title="Astrological Significance of Namkaran"
            introText="In astrology, the timing of the Namkaran ceremony is of utmost importance. The following factors are considered to select the perfect time for the ritual:"
            data={muhratData}
            footerText=""
            listStyle="decimal"
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title="The Namkaran Ceremony: Rituals and Traditions"
            introText="In astrology, the timing of the Namkaran ceremony is of utmost importance. The following factors are considered to select the perfect time for the ritual:"
            data={namkaranCeremony}
            footerText=""
            listStyle="decimal"
          />

          <GoldBuyingMuhuratcomp
            title="Cultural Variations"
            introText="In astrology, the timing of the Namkaran ceremony is of utmost importance. The following factors are considered to select the perfect time for the ritual:"
            data={culturalVariation}
            footerText=""
            listStyle="decimal"
          />

          <DynamicCard
            title="Shubh Muhurat for Namkaran Sanskar in 2025"
            introText=""
            data={auspiciousDaysData}
            listStyle=""
          />

          <NamingMuhuratList muhuratData={muhuratDatas} />
          <GoldBuyingMuhuratcomp
            title="Important Observances to Follow at Namkaran Sanskar in 2025"
            introText="The core rituals for the Namkaran ceremony remain the same, but here are some important guidelines for a successful Namkaran Sanskar in 2025:"
            data={objNameSanskar}
            footerText=""
            listStyle="decimal"
          />
          <GoldBuyingMuhuratcomp
            title="Precautions Before Performing Namkaran Sanskar in 2025"
            introText=""
            data={precuBeforeName}
            footerText="This ritual marks the start of the child's journey in the world, and choosing the right name and timing is vital in ensuring that the child leads a life filled with love, prosperity, and success."
            listStyle="decimal"
          />
          <GoldBuyingMuhuratcomp
            title="Remedies for a Successful Namkaran Ceremony and Positive Future for the Child"
            introText=""
            data={remediesForName}
            footerText=""
            listStyle="decimal"
          /> */}
        </div>
      </section>
    </>
  )
}

export default NamkaranMuhurat
