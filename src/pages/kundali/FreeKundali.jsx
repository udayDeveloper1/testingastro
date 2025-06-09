// import freeKundali from "../../assets/img/banner/freeKundali.webp";
import { useTranslation } from 'react-i18next'
import '../../assets/css/Kundli.css'
import CommonBanner from '../../component/CommonBanner'
import CommonQuestionComp from '../../component/CommonQuestionComp'
import HomeFAQs from '../../component/Homepage/HomeFAQs'
import FreeKundaliForm from '../../component/kundali/FreeKundaliForm'
import { useParams } from 'react-router'

function FreeKundali () {
  const { t } = useTranslation()
const {lang} = useParams()
  const content = [t('content')]

  const content1 = [t('kundli_content_1')]

  const content2 = [t('kundli_content_2')]

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={freeKundali}
          text=''
          highlight={t('free_kundli')}
        />
      </section>

     
      <section className=''>
        <div className='container mx-auto px-6 py-[30px] lg:py-[50px] flex flex-wrap justify-between w-full gap-6 paddingTop100'>
          <FreeKundaliForm />
        </div>
      </section>
       <section className='padding50 planBackground'>
        <div className='container mx-auto  flex flex-col gap-10'>
          <CommonQuestionComp
            heading={t('free_kundli_description')}
            content={content}
          />
        </div>
      </section>
      {/* <div className=' container mx-auto paddingBottom100 flex flex-col gap-5 md:gap-10'>
        <CommonQuestionComp
          heading={t('how_talking_astrologer')}
          content={content1}
        />
        <hr className='kundaliHr' />
        <CommonQuestionComp
          heading={t('how_does_astrologer')}
          content={content2}
        />
      </div> */}

      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('free_kundli')}
        // subHeading={t('All_you_need_to_know_about_Guna_Milan_Kundli_Milan')}
        subHeading={""}

      />

      {/* <NewsletterComp/>
       <footer>
         <Footer/>
        </footer> */}
    </>
  )
}

export default FreeKundali
