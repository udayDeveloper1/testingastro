// import bhumipujaMuhurat from "../../assets/img/banner/bhumipujaMuhurat.webp";
import { useEffect } from 'react'
import CommonBanner from '../../component/CommonBanner'
import CommonQuestionComp from '../../component/CommonQuestionComp'
import DynamicCard from '../../component/Dynemic/DynamicCard'
import NewsletterComp from '../../component/Homepage/NewsLatterComp'
import BhoomiPujanCard from '../../component/Muhurat/BhoomiPujanCard'
import GoldBuyingMuhuratcomp from '../../component/Muhurat/GoldBuyingMuhuratcomp'
import Footer from '../../Layout/Footer'
import { generateMuhuratBlogThunk } from '../../storemain/slice/MasterSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Constatnt } from '../../utils/Constent'
import moment from 'moment'
import Loader from '../../component/loader/Loader'
import { openLoader } from '../../utils/CommonFunction'
import { useTranslation } from 'react-i18next'

function BhumiPujaMuhurat() {

  const dispatch = useDispatch()
  const { t } = useTranslation();

  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector((state) => state?.masterSlice?.loader);

  useEffect(() => {
    openLoader(dispatch, "bhoomi_muhrat");
    let request = {
      type: `bhoomi`,
      year: moment().year(),
      lang: localStorage.getItem(Constatnt?.LANGUAGE_KEY)
    }
    dispatch(generateMuhuratBlogThunk(request))
  }, [])

  return (
    <>
      {loder?.is_loading && loder?.loding_type === "bhoomi_muhrat" && (
        <Loader />
      )}
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text={t('bhoomi_poojan')}
          highlight={new Date().getFullYear()}
        />
      </section>


      <section>
        <div className='container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>
          <DynamicCard
            title={`${t('significance_bhiimi_pujan')} ${new Date().getFullYear()}`}
            introText=""
            data={muhratData}
            listStyle='decimal'
          />
        </div>
      </section>


    </>
  )
}

export default BhumiPujaMuhurat
