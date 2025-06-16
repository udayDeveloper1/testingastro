import { lazy, memo, Suspense } from "react";
const CustomButton = lazy(() => import('../../../Homepage/CustomButton'))

function Rudraksha({ sections }) {
  if (!sections) return null;

  return (
    <div className="kundali-container py-4">
      {Object.values(sections?.rudrakshTop).map((section, index) => (
        <section
          key={index}
          className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom"
        >
          <h2 className="commonQuesH2">{section.title}</h2>
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="commonQuesP">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <Suspense fallback={<></>}>
        <div className="flex gap-3 py-6">
          <CustomButton
            className="py-2 px-16 border font-semibold text-[16px] leading-[100%] transition-all 
          !bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
          >
            7-Mukhi
          </CustomButton>

          <CustomButton
            className="py-2 px-16 border font-semibold text-[16px] leading-[100%] transition-all 
          !bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
          >
            13-Mukhi
          </CustomButton>

          <CustomButton
            className="py-2 px-16 border font-semibold text-[16px] leading-[100%] transition-all 
          !bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
          >
            16-Mukhi
          </CustomButton>
        </div>
      </Suspense>
      {Object.values(sections?.rudrakshsecond).map((section, index) => (
        <section
          key={index}
          className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom"
        >
          <h2 className="commonQuesH2">{section.title}</h2>
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="commonQuesP">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {Object.values(sections?.rudrakshsecond).map((section, index) => (
        <section
          key={index}
          className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom"
        >
          <h2 className="commonQuesH2">{section.title}</h2>
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="commonQuesP">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {sections?.rudrakshUlListParent && (
        <section className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom">
          <h2 className="commonQuesH2">
            {sections?.rudrakshUlListParent?.rudrakshUlList?.title}
          </h2>
          <ul className="list-disc pl-8 flex flex-col mb-0">
            {sections?.rudrakshUlListParent?.rudrakshUlList?.content?.map(
              (paragraph, pIndex) => (
                <li key={pIndex} className="commonQuesP py-4">
                  {paragraph}
                </li>
              )
            )}
          </ul>
        </section>
      )}

      {Object.values(sections?.rudrakshThird).map((section, index) => (
        <section
          key={index}
          className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom"
        >
          <h2 className="commonQuesH2">{section.title}</h2>
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="commonQuesP">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {Object.values(sections?.rudrakshThird).map((section, index) => (
        <section
          key={index}
          className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom"
        >
          <h2 className="commonQuesH2">{section.title}</h2>
          {section.content.map((paragraph, pIndex) => (
            <p key={pIndex} className="commonQuesP">
              {paragraph}
            </p>
          ))}
        </section>
      ))}

      {sections?.rudrakshUlListUlBottom && (
        <section className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom">
          <h2 className="commonQuesH2">
            {sections?.rudrakshUlListUlBottom?.rudrakshUlList?.title}
          </h2>
          <ul className="list-disc pl-8 flex flex-col mb-0">
            {sections?.rudrakshUlListUlBottom?.rudrakshUlList?.content?.map(
              (paragraph, pIndex) => (
                <li key={pIndex} className="commonQuesP py-4">
                  {paragraph}
                </li>
              )
            )}
          </ul>
        </section>
      )}
    </div>
  );
}

export default memo(Rudraksha);
