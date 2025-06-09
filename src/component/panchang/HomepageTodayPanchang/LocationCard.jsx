import React from "react";
import map from "/homepage/mapIcon.svg"
import { useTranslation } from "react-i18next";

const LocationCard = ({ location }) => {
      const { t } = useTranslation();
  return (
    <div className="new_border box_shadow_common p-[15px] md:p-[30px] rounded-lg flex items-center gap-[10px] md:gap-[20px] ">
      <div className="gradient-background p-3 rounded-full text-white w-[50px] h-[50px] flex items-center justify-center">
        <img src={map} alt="map" width={26} height={29} decoding="async" loading="lazy" />
      </div>
      <div className="flex flex-col gap-[5px]">
        <p className="commonQuesH2">{t('Current_Location')}</p>
        <p className="commonQuesP !text-[18px]">{location}</p>
      </div>
    </div>
  );
};

export default React.memo(LocationCard);
