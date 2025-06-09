import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import CustomButton from "../Homepage/CustomButton";
import CustomWhiteButton from "../Homepage/CustomWhiteButton";
import { DateFormat, LanguageOption, TimeFormat } from "../../utils/CommonVariable";
import { formatDate, formatTime } from "../../utils/CommonFunction";
import { useSelector } from "react-redux";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Constatnt } from "../../utils/Constent";

const RahuKaalTimingCard = ({ city = "Ahmedabad", start = "07:36", end = "09:16", duration = "01:40", rahuKaalData, selectedDate, setSelectedDate, onSubmit , apiCallTime}) => {
  const { t } = useTranslation();

  const [selectedDay, setSelectedDay] = useState('todays');
  const [currentTime, setCurrentTime] = useState(dayjs());

  const todayPanchangs = useSelector(state => state?.HomePageSlice?.todayPanchang?.data)
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.format("D MMMM YYYY (dddd)");
  const currentClock = currentTime.format("h:mm:ss A");

  const formatedDateArray = [
    { key: 'yesterday', value: t('yesterday'), date: moment().subtract(1, 'days').format(DateFormat?.DATE_DASH_FORMAT) },
    { key: 'todays', value: t('today'), date: moment().format(DateFormat?.DATE_DASH_FORMAT) },
    { key: 'tommorw', value: t('tomorrow'), date: moment().add(1, 'days').format(DateFormat?.DATE_DASH_FORMAT) }
  ]

  const onChangeDateChange = (day) => {
    setSelectedDate(day)
    // onSubmit()
  }

  let matchedDateObj = {}

  useEffect(() => {
    if (!selectedDate || !Array.isArray(formatedDateArray)) return;

    matchedDateObj = formatedDateArray?.find(
      (item) => item.date === selectedDate
    );
    setSelectedDay(matchedDateObj ? matchedDateObj.key : null);
  }, [selectedDate, formatedDateArray]);

  useEffect(() => {
    if (selectedDay && selectedDate) {
      onSubmit();
    }
  }, [selectedDate, selectedDay]);

  return (
    <div className="w-full bg-white rounded-[10px] box_shadow_common p-[15px] md:p-[40px] flex flex-col gap-[40px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">

        <div className="flex flex-col gap-[5px]">
          {/* <h2 className="commonQuesH2">
            Rahu Kaal Timings {selectedDay === "today" && "Today"} In {city}
            {rahuKaalData?.title}
          </h2> */}
          <p className="commonQuesP !font-medium">{formatDate(rahuKaalData?.date, DateFormat?.DATE_WITH_DAY_FORMAT)}</p>
        </div>
        {
          matchedDateObj ?
            <div className="grid grid-cols-1 md:grid-cols-3 lg:flex justify-start md:justify-end gap-2 ">
              {/* "Yesterday", `Today's`, "Tomorrow" */}
              {/* {matchedDateObj } */}
              {
                formatedDateArray?.map((day) => (
                  <div className="w-full">
                    <CustomWhiteButton
                      key={day?.key}
                      onClick={() => {
                        setSelectedDay(day?.key),
                          onChangeDateChange(day?.date)
                      }
                      }
                      parentClassName=""
                      className={`rounded-[10px] px-[15px] py-[15px] text-[18px] font-medium box_shadow_common !border-none min-w-[140px] xl:min-w-[140px]  w-full ${selectedDay == day?.key
                        ? "!text-white  gradient-background"
                        : "gradient-text"
                        }`}
                    >
                      {day?.value?.charAt(0).toUpperCase() + day?.value?.slice(1)}
                    </CustomWhiteButton>
                  </div>
                ))
              }
            </div>
            : null
        }
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="flex flex-col gap-[10px]">
          <p className="commonQuesH3 !font-medium">{t('start_time')}</p>
          <p className="rahukaalCardP gradient-text">
            {/* {LocalLanguage === LanguageOption?.ENGLISH ? formatTime(rahuKaalData?.timings?.start_time, TimeFormat?.TIME_12_HOUR_FORMAT) : rahuKaalData?.timings?.start_time || '-'} to {LocalLanguage === LanguageOption?.ENGLISH ? formatTime(rahuKaalData?.timings?.end_time, TimeFormat?.TIME_12_HOUR_FORMAT) || '-' : rahuKaalData?.timings?.end_time || '-'} */}
            {formatTime(rahuKaalData?.timings?.start_time, TimeFormat?.TIME_12_HOUR_FORMAT) } to {formatTime(rahuKaalData?.timings?.end_time, TimeFormat?.TIME_12_HOUR_FORMAT)}
          </p>
        </div>
        <div className="flex flex-col gap-[10px] afterLines relative">
          <p className="commonQuesH3 !font-medium">{t('duretion')}</p>
          <p className="rahukaalCardP gradient-text">
            {" "}
            <span>{rahuKaalData?.timings?.duration || '-'}</span>{" "}
          </p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="commonQuesH3 !font-medium">{t('current_time')}</p>
          <p className="rahukaalCardP gradient-text">{apiCallTime}</p>
        </div>
      </div>
    </div>
  );
};

export default RahuKaalTimingCard;
