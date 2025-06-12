import moment from "moment";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import CommonBanner from '../../component/CommonBanner';
import DynamicCard from '../../component/Dynemic/DynamicCard';
import Loader from "../../component/loader/Loader";
import { generateMuhuratBlogThunk } from "../../storemain/slice/MasterSlice";
import { openLoader } from '../../utils/CommonFunction';
import { Constatnt } from "../../utils/Constent";

function MarriageMuhurat() {

  // const marriageMuhuratData = useSelector(
  //   state => state.muhuratDataSlice.marriageMuhuratData
  // )
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const muhratData = useSelector(state => state?.masterSlice?.muhratData)
  const loder = useSelector((state) => state?.masterSlice?.loader);


  const parseMarkdownSections = markdown => {
    const sanitizedHTML = DOMPurify.sanitize(marked.parse(markdown));
    return sanitizedHTML
  }


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
      <section>
        <CommonBanner text={t('marrige_muharat')} highlight={new Date().getFullYear()} />
      </section>

      {/* <section>
        <div className=' container mx-auto paddingTop100 pb-10 flex flex-col gap-10'>
          <CommonQuestionComp heading='' content={content1} />
        </div>
      </section> */}

      <section>
        <div className=' container mx-auto paddingTop100 paddingBottom100 flex flex-col gap-10'>

          {/* <DynamicCard
            title={`Why Choosing a Marriage Muhurat in ${new Date().getFullYear()} is Important`}
            introText="The marriage Muhurat is more than just a date—it is a moment that aligns the energies of the stars and planets with the couple’s union. Here's why selecting the right Muhurat in 2025 is of utmost importance:"
            data={marriageMuhuratData}
            listStyle='decimal'
            dangerouslyPara={true}
          /> */}

          <DynamicCard
            title={`${t('marrige_muharat')} ${new Date().getFullYear()}`}
            introText=""
            data={muhratData}
            listStyle='decimal'
            dangerouslyPara={true}
          />

          {/* <DynamicCard
            title='Favorable Dates and Tithis for Marriage in 2025'
            introText='The Tithi (lunar day) also plays an important role in selecting a wedding date. Certain Tithis are believed to be more favorable for marriages, promoting happiness, wealth, and harmony. In 2025, these Tithis are considered especially beneficial:'
            data={auspiciousDaysData}
            listStyle='decimal'
          />

          <CommonQuestionComp
            heading='Marriage Muhurat in 2025: Key Dates and Times'
            content={content3}
          />
          {Object.keys(goldMuhuratData).map((month, index) => (
            <GoldBuyingMuhuratcomp
              key={index}
              title={`${month} 2025`}
              data={goldMuhuratData[month]}
            />
          ))}
          <DynamicCard
            title='Auspicious Nakshatras for Marriage in 2025'
            introText='The Nakshatras (lunar constellations) play a important role in determining the best time for weddings. Certain Nakshatras are believed to be more favorable for marriages, bringing success and happiness to the couple’s life. In 2025, the following Nakshatras are considered especially auspicious:'
            data={auspiciousDaysData}
            listStyle='decimal'
          /> */}
        </div>
      </section>
    </>
  )
}

export default MarriageMuhurat
