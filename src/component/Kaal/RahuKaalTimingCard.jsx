import React from "react";
import { useTranslation } from "react-i18next";

const RahuKaalTimingCard = ({ rahuKaalData }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-[20px]">
      {
        rahuKaalData?.map((ele, ind) => {
          return <div className="bg-white rounded-[10px] box_shadow_common p-[40px] flex flex-col gap-[20px] md:gap-[40px]" key={ind}>
            <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 items-center md:gap-4">
              <div className="flex flex-col gap-[5px]">
                <h2 className="commonQuesH2">
                  {ele.title}
                </h2>

              </div>

              <div className=" flex justify-start md:justify-end gap-2 ">
                <p className="commonQuesP !font-medium">{ele.date}</p>
              </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col gap-[10px]">
                <p className="commonQuesH3 !font-medium mb-0 ">{t('start_time')}</p>
                <p className="rahukaalCardP gradient-text !leading-[150%]">
                  {/* {LocalLanguage === LanguageOption?.ENGLISH ? formatTime(rahuKaalData?.timings?.start_time, TimeFormat?.TIME_12_HOUR_FORMAT) : rahuKaalData?.timings?.start_time || '-'} to {LocalLanguage === LanguageOption?.ENGLISH ? formatTime(rahuKaalData?.timings?.end_time, TimeFormat?.TIME_12_HOUR_FORMAT) || '-' : rahuKaalData?.timings?.end_time || '-'} */}
                  {ele?.start}
                </p>
              </div>
              <div className="flex flex-col gap-[10px] afterLines relative">
                <p className="commonQuesH3 !font-medium mb-0 ">{t('end_time')}</p>
                <p className="rahukaalCardP gradient-text !leading-[150%]">{ele?.end}</p>
              </div>
              <div className="flex flex-col gap-[10px]  ">
                <p className="commonQuesH3 !font-medium mb-0 ">{t('duretion')}</p>
                <p className="rahukaalCardP gradient-text !leading-[150%]">
                  <span>{ele?.duration || '-'}</span>
                </p>
              </div>

            </div>
          </div>
        })
      }

    </div>
  );
};

export default React.memo(RahuKaalTimingCard);
