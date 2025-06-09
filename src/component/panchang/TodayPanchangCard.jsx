import React from 'react';
import { formatDate } from '../../utils/CommonFunction';
import { DateFormat } from '../../utils/CommonVariable';
import { useTranslation } from 'react-i18next';
import sunrise from "../../assets/img/panchang/sunrise.svg"
import moon from "../../assets/img/panchang/moon.svg"

const TodayPanchangCard = ({ todayPanchangcardData, location, todayRequest }) => {
    const { t } = useTranslation();
  const todayStr = todayPanchangcardData?.advanced_details?.date;
  const todayDate = todayStr ? new Date(todayStr) : null;

  let formattedDate = "";
  if (todayDate) {
    const weekday = todayDate.toLocaleDateString('en-IN', { weekday: 'long' });   // e.g. Monday
    const day = todayDate.getDate();                                              // e.g. 14
    const month = todayDate.toLocaleDateString('en-IN', { month: 'long' });       // e.g. April
    const year = todayDate.getFullYear();                                         // e.g. 2025

    formattedDate = `${weekday} ${day} ${month}, ${year}`;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
      {/* Today's Panchang */}
      <div className="bg-white p-6 rounded-[10px] box_shadow_common col-span-2" >
        <h2 className="commonQuesH2">{t("Today's")} {t('Panchang')}</h2>
        <p className="text-sm new_body_font font-semibold mt-1">
          {formatDate(todayRequest?.dob, DateFormat?.DATE_WEEK_MONTH_NAME_FORMAT)} | {todayRequest?.u_name || location?.full_name}
        </p>
      </div>

      {/* Sunrise */}
      <div className="bg-white p-4 rounded-[10px] box_shadow_common flex flex-col sm:flex-row items-center gap-4 col-span-1">
        <div className="bg_website_color rounded-full w-12 h-12 flex items-center justify-center text-white text-xl ">
          {/* <ArrowUpOutlined /> */}
          <img src={sunrise} alt="" />
        </div>
        <div>
          <div className="commonQuesH3">{t('Sunrise')}</div>
          <div className=" new_body_font commonQuesP text-center md:text-start">{todayPanchangcardData?.advanced_details?.sun_rise}</div>
        </div>
      </div>

      {/* Moonrise */}
      <div className="bg-white p-4 rounded-[10px] box_shadow_common flex flex-col sm:flex-row items-center gap-4 col-span-1">
        <div className="bg_website_color rounded-full  min-w-12 min-h-12 flex items-center justify-center text-white text-xl ">
          {/* <MoonOutlined /> */}
          <img src={moon} alt="" className='object-contain' decoding='async' loading='lazy'/>

        </div>
        <div>
          <div className="commonQuesH3">{t("Moonrise")}</div>
          <div className=" new_body_font commonQuesP text-center md:text-start">{todayPanchangcardData?.advanced_details?.moon_rise
          }</div>
        </div>
      </div>
    </div>
  );
};

export default TodayPanchangCard;
