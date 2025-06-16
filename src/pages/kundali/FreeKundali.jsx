// import freeKundali from "../../assets/img/banner/freeKundali.webp";
import { useTranslation } from 'react-i18next'
import '../../assets/css/Kundli.css'
import { lazy, memo } from 'react';

const CommonBanner = lazy(() => import('../../component/CommonBanner'));
const CommonQuestionComp = lazy(() => import('../../component/CommonQuestionComp'));
const HomeFAQs = lazy(() => import('../../component/Homepage/HomeFAQs'));
const FreeKundaliForm = lazy(() => import('../../component/kundali/FreeKundaliForm'));

function FreeKundali () {
  const { t } = useTranslation()
  const content = [t('content')]

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

export default memo(FreeKundali)
