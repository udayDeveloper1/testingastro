import React from 'react';


function GeneralTabFreeKundali({sections}) {
  return (
    <>
    
    <div className="kundali-container">
      {sections?.map((section, index) => (
        <section 
          key={index} 
          className={`kundali-section pb-6 mb-5 flex flex-col gap-5 ${index !== sections?.length - 1 ? 'kundali_section_customBorderBottom' : ''}`}
        >
          <h2 className="commonQuesH2">{section.title}</h2>
          {section?.content.map((paragraph, pIndex) => (
            <p key={pIndex} className='commonQuesP'>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
    </>
  );
}

export default GeneralTabFreeKundali;