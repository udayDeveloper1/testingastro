import React from "react";
// import freeKundali from "../../assets/img/banner/freeKundali.webp";
import CommonBanner from "../../component/CommonBanner";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import HomeFAQs from "../../component/Homepage/HomeFAQs";
import KundaliMatchForm from "../../component/kundali/KundaliMatchForm";
import { useTranslation } from "react-i18next";
import '../../assets/css/Kundli.css'


function KundaliMatching() {
  const { t } = useTranslation();

  let content = [
    {
      label: t('varnaLabel'),
      pTag: t('varnaDescription'),
    },
    {
      label: t('vashyaLabel'),
      pTag: t('vashyaDescription'),
    },
    {
      label: t('taraLabel'),
      pTag: t('taraDescription'),
    },
    {
      label: t('yoniLabel'),
      pTag: t('yoniDescription'),
    },
    {
      label: t('rashyadhipatiLabel'),
      pTag: t('rashyadhipatiDescription'),
    },
    {
      label: t('ganaLabel'),
      pTag: t('ganaDescription'),
    },
    {
      label: t('rashiLabel'),
      pTag: t('rashiDescription'),
    },
    {
      label: t('nadiLabel'),
      pTag: t('nadiDescription'),
    },
  ];

  let contentForP1 = [t("kundli_matching_content1")];

  let contentForP2 = [t("kundli_matching_content2")];

  let contentForP3 = [t("kundli_matching_content3")];

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={freeKundali}
          text=""
          highlight={t("kundli_matching")}
        />
      </section>

      <section className="">
        <div className="container mx-auto  flex flex-wrap w-full gap-6 paddingTop100 paddingBottom50">
          <KundaliMatchForm />
        </div>
      </section>

      <section className="padding50 planBackground">
        <div className="container mx-auto  flex flex-col gap-10">
          <CommonQuestionComp
            heading={t("kundlimatching_title")}
            content={contentForP1}
          />
        </div>
      </section>
      <div className="container mx-auto padding50 flex flex-col gap-6 md:gap-10">
        {/* Section 1: Common Questions */}
        <CommonQuestionComp
          heading={t("kundli_matching_milan")}
          content={contentForP2}
        />

        {/* <CommonQuestionComp
          heading={t("kundli_friend_foe")}
          content={contentForP3}
        /> */}

        {/* Section 2: Kundli Milan Explanation */}
        <div className="flex flex-col gap-4 ">
          {/* <h2 className="commonQuesH2">{t('What_happens_during_Kundli_milan')}</h2> */}
          {/* <div>
            <p className="commonQuesP">
              {t('whole_process_of_horoscope')}
            </p>
            <p className="commonQuesP">
              {t('The_eight_parameters_or_categories_among_which_the_points_have_been_divided_are')}
            </p>
          </div> */}

          <div className="flex flex-col">
            {content?.map((paragraph, index) => (
              <div key={index}>
                <h2 className="rashiHeading">{paragraph?.label}</h2>
                <p className="commonQuesP">{paragraph?.pTag}</p>
                <hr className="my-3 md:my-5 hrBorderBottom" />
              </div>
            ))}
          </div>
        </div>
      </div>
            <div className="planBackground">
      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('kundli_matching')}
        // subHeading={t('All_you_need_to_know_about_Guna_Milan_Kundli_Milan')}
        subHeading={''}

      />
</div>
      {/* <NewsletterComp/>
       Footer
       <footer>
         <Footer/>
        </footer> */}
    </>
  );
}

export default KundaliMatching;
