import React from "react";

const RiseCard = ({ title, time,image }) => {
  return (
    <div className="new_border box_shadow_common p-[15px] md:p-[20px] rounded-lg  flex  flex-col md:flex-row  items-center gap-[10px] md:gap-[10px]">
      <div className="text-[#F47B5B] text-xl">
         <div className="gradient-background p-3 rounded-full text-white w-[50px] h-[50px] flex items-center justify-center">
                <img src={image} alt="map" width={26} height={29} decoding="async" loading="lazy"/>
              </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="commonQuesH3 mb-0 text-center md:text-start">{title}</p>
        <p className="commonQuesP !text-[18px] text-center md:text-start">{time}</p>
      </div>
    </div>
  );
};

export default React.memo(RiseCard);
