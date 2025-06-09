import { Card } from "antd";
import CustomTable from "../Custom/CustomTable";
import moment from 'moment';
import { getShortNakshatra } from "./KundliVariabls";
import React from "react";
import { useSelector } from "react-redux";
import { LanguageOption } from "../../utils/CommonVariable";

export default function YoginiDashaComp({ yoginiDashaSub }) {


  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
      ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
      : LanguageOption?.ENGLISH

  const getYoginiDashaFullPeriods = (yoginiDasha = []) => {
    const allMainPeriods = [];

    yoginiDasha?.length > 0 && yoginiDasha?.forEach((item) => {

      let currentStartDate = new Date(item?.sub_dasha_start_date);

      const sub_dasha_periods = item?.sub_dasha_list?.map((subName, i) => {
        const endDate = LocalLanguage === LanguageOption?.ENGLISH ? new Date(item.sub_dasha_end_dates[i]) : item.sub_dasha_end_dates[i] || '-';
        const formatDate = (date) =>
          `${date?.getDate()} / ${date?.getMonth() + 1} / ${date?.getFullYear()}`;

        const period = {
          sign: subName || '-',
          end_date: LocalLanguage === LanguageOption?.ENGLISH ? formatDate(endDate) : endDate || '-',
        };
        currentStartDate = new Date(endDate); // update for next loop
        return period;
      });

      allMainPeriods?.push({
        main_dasha: item.main_dasha || '-',
        main_dasha_lord: item?.main_dasha_lord || '-',
        sub_dasha_start_date: item?.sub_dasha_start_dates || '-',
        sub_dasha_periods,
      });

    });
    return allMainPeriods;
  };

  // Example usage:
  const finalData = getYoginiDashaFullPeriods(yoginiDashaSub);
  return (

    <div className="flex flex-col gap-[24px]">
      <div className="commonCardBorderKundali   rounded-[10px] sm:p-[15px] md:p-[30px] yoginiDashaCard  new_custom_table">
        <Card className="rounded-[10px] overflow-hidden  new_custom_card " bodyStyle={{ padding: 0 }}>
          {/* Grid layout for tables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 dashaVisnotari">
            {finalData?.length > 0 && finalData?.map((item, index) => (<>
              {/* <div key={index}> */}
              <React.Fragment key={`${index}`}>
                <CustomTable
                  key={index}
                  columns={[
                    {
                      title: (() => {
                        const dashaName = getShortNakshatra(item?.main_dasha)?.toUpperCase();
                        return `${dashaName}`;
                      })(),
                      dataIndex: "sign", // use the correct key for each row
                      key: "sign",
                      align: "center",
                      width: "150px",
                      fixed: "left",

                      render: (text) => (
                        <>{text?.toUpperCase()}</>
                      ),
                    },
                    {
                      title: (() => {

                        const startDate = moment(item?.sub_dasha_start_date[0], "ddd MMM DD YYYY");
                        const endDate = moment(item?.sub_dasha_periods[0]?.end_date, ["D/M/YY", "DD/MM/YYYY", "YYYY-MM-DD"]); // added multiple format fallback

                        let yearsDifference = endDate.diff(startDate, 'years');
                        let displayValue = '';

                        if (yearsDifference === 0) {
                          const monthsDifference = endDate?.diff(startDate, 'months');
                          displayValue = `${monthsDifference} Month${monthsDifference > 1 ? 's' : ''}`;
                        } else {
                          displayValue = `${yearsDifference} Year${yearsDifference > 1 ? 's' : ''}`;
                        }
                        const formattedStartDate = startDate.format('DD/MM/YYYY');
                        const dashaName = getShortNakshatra(item?.main_dasha)?.toUpperCase();
                        const retrunValue = LocalLanguage === LanguageOption?.ENGLISH ? `${displayValue} ( ${formattedStartDate} )` : item?.sub_dasha_start_date[0]
                        return retrunValue;

                      })(),
                      dataIndex: "value",
                      key: "value",
                      align: "center",
                      width: "250px",
                      render: (text) => (
                        <span className="new_body_font font-bold font-medium text-center">{text}</span>
                      ),
                    }
                  ]}
                  data={item?.sub_dasha_periods?.map((subItem, subIndex) => ({
                    key: subIndex + 1,
                    label: "Main Dasha",
                    sign: subItem?.sign,
                    value: `${subItem?.end_date}`
                  }))}
                  pagination={false}
                  loading={false}
                  bordered={false}
                  className="panchang123 new_custom_table kundaliTable  "
                  scroll={{ x: 'max-content' }}

                />
                {/* </div> */}
              </React.Fragment>
            </>))}
          </div>
        </Card>
      </div>
    </div>
  );
}
