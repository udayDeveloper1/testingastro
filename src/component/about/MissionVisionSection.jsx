import React from 'react';

const MissionVisionSection = () => {
  return (
    <section className="flex flex-col gap-[30px] md:gap-[80px] items-center">
      {/* Title */}
  
      <h2 className="newBannerH2 leading-[130%]">
        Rooted In Purpose, Guided By Astrology
      </h2>

      {/* Mission and Vision Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[30px] md:gap-y-0 gap-x-0 md:gap-x-[26px] w-full">
        {/* Mission */}
        <div className='flex flex-col gap-[20px] md:gap-[30px]'>
          <h3 className="gradient-text-color commonQuesH3">OUR MISSION</h3>
          <ul className="flex flex-col gap-[10px] md:gap-[20px] text-gray-800 text-[16px] leading-relaxed ">
         
                
            <li className='commonQuesP flex gap-[10px]'> <span>•</span> Our Mission Is To Give Complete Satisfaction To His Clients.</li>
           
             
            <li className='commonQuesP flex gap-[10px]'><span>•</span>  He Always Listens Carefully To Their Needs And Expectations.</li>
            <li className='commonQuesP flex gap-[10px]'><span>•</span> He Offers Only Honest And True Astrological Advice.</li>
            <li className='commonQuesP flex gap-[10px]'><span>•</span> Promote Peace, Prosperity, And Fulfillment In Life.</li>
            <li className='commonQuesP flex gap-[10px]'><span>•</span> Offer Personalized Consultations And Horoscopes.</li>
          </ul>
        </div>

        {/* Vision */}
        <div className='flex flex-col gap-[20px] md:gap-[30px]'>
          <h3 className="gradient-text-color commonQuesH3">OUR VISION</h3>
          <ul className=" flex flex-col gap-[10px] md:gap-[20px] text-gray-800 text-[16px] leading-relaxed list-disc list-inside ">
            <li className='commonQuesP flex gap-[10px]'><span className='font-[20px]'>•</span> Our Vision Is Astrology Guides People To A Better Life.</li>
            <li className='commonQuesP flex gap-[10px]'><span className='font-[20px]'>•</span> Support Spiritual Growth By Revealing The Soul’s Purpose And Path.</li>
            <li className='commonQuesP flex gap-[10px]'><span className='font-[20px]'>•</span> Explain Past Karma And Future Intentions.</li>
            <li className='commonQuesP flex gap-[10px]'><span className='font-[20px]'>•</span> Help Individuals Face Life’s Challenges With Confidence And Clarity.</li>
            <li className='commonQuesP flex gap-[10px]'><span className='font-[20px]'>•</span> Promote Positive Change In Society Through Education And Research.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection
