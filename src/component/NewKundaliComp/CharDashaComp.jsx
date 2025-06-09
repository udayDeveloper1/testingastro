import moment from 'moment';
import { Card } from "antd";
import CustomTable from "../Custom/CustomTable";
import { formatDate } from "../../utils/CommonFunction";
import { getShortNakshatra } from "./KundliVariabls";
import { DateFormat, LanguageOption } from '../../utils/CommonVariable';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function CharDashaComp({ charDashaSub, charDashaMain }) {
  const { t } = useTranslation()

  const myLanguage = useSelector(state => state?.masterSlice?.currentLanguage)

  const columnsCharDasha = [
    {
      title: t('Planet'),
      dataIndex: "planet",
      key: "planet",
      align: "center",
      fixed: "left",

      render: (text) => (
        <span className="new_body_font font-bold font-medium">{text || '-'}</span>
      ),
    },
    {
      title: t('start_date'),
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      render: (text) => <span className="text-gray-800">{text || '-'}</span>,
    },
    {
      title: t('end_date'),
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      render: (text) => <span className="text-gray-800">{text || '-'}</span>,
    },
  ];

  // const finelCharDashaMain = charDashaMain?.dasha_list.map((planet, index) => {
  //   const startDate =
  //     index === 0
  //       ? moment(charDashaMain?.start_date)
  //       : moment(charDashaMain?.dasha_end_dates[index - 1]);
  //   const endDate = moment(charDashaMain?.dasha_end_dates[index]);

  //   return {
  //     key: index,
  //     label: planet,
  //     start_date: formatDate(startDate, DateFormat?.DATE_SLASH_FORMAT_SPACE),
  //     end_date: formatDate(endDate, DateFormat?.DATE_SLASH_FORMAT_SPACE),
  //   };
  // });

  const finelCharDashaMain = Array.isArray(charDashaMain?.dasha_list) ?
    charDashaMain.dasha_list.map((planet, index) => {
      const startDate = index === 0 ? myLanguage == LanguageOption?.ENGLISH ? moment(charDashaMain?.start_date) : charDashaMain?.start_date :
        myLanguage == LanguageOption?.ENGLISH ? moment(charDashaMain?.dasha_end_dates?.[index - 1]) : charDashaMain?.dasha_end_dates?.[index - 1];

      const endDate = myLanguage == LanguageOption?.ENGLISH ? moment(charDashaMain?.dasha_end_dates?.[index]) : charDashaMain?.dasha_end_dates?.[index];

      return {
        planet,
        start_date: myLanguage == LanguageOption?.ENGLISH ? startDate.isValid() ? formatDate(startDate, DateFormat?.DATE_SLASH_FORMAT_SPACE) : '-' : startDate || '-',
        end_date: myLanguage == LanguageOption?.ENGLISH ? endDate.isValid() ? formatDate(endDate, DateFormat?.DATE_SLASH_FORMAT_SPACE) : '-' : endDate || '-',
      };
    })
    : [];

  const getCharDashaFullPeriods = (charDasha = []) => {
    const allMainPeriods = [];

    charDasha?.length > 0 && charDasha?.forEach((item) => {

      let currentStartDate = myLanguage == LanguageOption?.ENGLISH ? new Date(item?.sub_dasha_start_date) : item?.sub_dasha_start_date;
      const sub_dasha_periods = item?.sub_dasha_list?.map((subName, i) => {
        const endDate = myLanguage == LanguageOption?.ENGLISH ? new Date(item.sub_dasha_end_dates[i]) : item.sub_dasha_end_dates[i];
        // const formatDate = (date) =>
        //   `${date?.getDate()} / ${date?.getMonth() + 1} / ${date?.getFullYear().toString().slice(2)}`;

        const period = {
          sign: subName || '-',
          start_date: myLanguage == LanguageOption?.ENGLISH ? formatDate(currentStartDate, DateFormat?.DATE_SLASH_FORMAT_SPACE) : currentStartDate || '-',
          end_date: myLanguage == LanguageOption?.ENGLISH ? formatDate(endDate, DateFormat?.DATE_SLASH_FORMAT_SPACE) : endDate || '-',
        };

        currentStartDate = myLanguage == LanguageOption?.ENGLISH ? new Date(endDate) : endDate; // update for next loop
        return period;
      });

      allMainPeriods?.push({
        main_dasha: item.main_dasha || '-',
        main_dasha_lord: item?.main_dasha_lord || '-',
        sub_dasha_start_date: item?.sub_dasha_start_date || '-',
        sub_dasha_periods,
      });
    });
    return allMainPeriods;
  };

  // Example usage:
  const finalCharDashaSub = getCharDashaFullPeriods(charDashaSub);
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="  rounded-[10px] sm:p-[15px] md:p-[30px] commonCardBorderKundali ">
        <Card
          className="rounded-[10px] overflow-hidden  col-span-2 mb-5 "
          bodyStyle={{ padding: 0 }}
        >
          <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading">{t('chardashamain')}</h3>
          </div>
          <CustomTable
            columns={columnsCharDasha}
            data={finelCharDashaMain}
            pagination={false}
            loading={false}
            scroll={{ x: "max-content" }}
            bordered={false}
            className="lightBackHead"
          />
        </Card>
        <Card className="rounded-[10px] overflow-hidden  new_custom_card !border-none  new_custom_table" bodyStyle={{ padding: 0 }}>
          {/* Grid layout for tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 charDashaGrid dashaVisnotari">
            {finalCharDashaSub?.length > 0 && finalCharDashaSub?.map((item, index) => (
              <CustomTable
                key={index}
                columns={[
                  {
                    title: (() => {
                      const dashaName = getShortNakshatra(item?.main_dasha)?.toUpperCase();
                      return `${dashaName}`;
                    })(),
                    dataIndex: "sign",
                    key: "sign",
                    align: "center",
                    width: "40%",
                    render: (text) => (
                      <>{text?.toUpperCase()}</>
                    ),
                  },
                  {
                    title: (() => {
                      const startDate = myLanguage == LanguageOption?.ENGLISH ? moment(item?.sub_dasha_start_date, "ddd MMM DD YYYY") : item?.sub_dasha_start_date;
                      const endDate = myLanguage == LanguageOption?.ENGLISH ? moment(item?.sub_dasha_periods?.[0]?.end_date,
                        [
                          "D/M/YY",
                          "DD/MM/YYYY",
                          "YYYY-MM-DD",
                        ]) : item?.sub_dasha_periods?.[0]?.end_date;

                      let yearsDifference = myLanguage == LanguageOption?.ENGLISH ? endDate.diff(startDate, "years") : startDate;
                      let displayValue = "";

                      if (yearsDifference === 0) {
                        const monthsDifference = myLanguage == LanguageOption?.ENGLISH ? endDate.diff(startDate, "months") : startDate;
                        displayValue = `${monthsDifference} Month${monthsDifference > 1 ? "s" : ""}`;
                      } else {
                        displayValue = `${yearsDifference} Year${yearsDifference > 1 ? "s" : ""}`;
                      }
                      const dashaName = getShortNakshatra(item?.main_dasha)?.toUpperCase();

                      const returnValue = myLanguage == LanguageOption?.ENGLISH ? `${displayValue} (${formatDate(startDate, DateFormat?.DATE_SLASH_FORMAT_SPACE)})` : startDate
                      return returnValue;
                    })(),

                    dataIndex: "range", // custom column for the range
                    key: "range",
                    align: "center",
                    render: (text, record) => (
                      <span className="new_body_font font-bold font-medium text-center">
                        {record?.start_date} - {record?.end_date}
                      </span>
                    ),
                  },
                ]}

                data={item?.sub_dasha_periods?.map((subItem, subIndex) => ({
                  key: subIndex + 1,
                  sign: subItem?.sign, // for first column
                  start_date: subItem?.start_date,
                  end_date: subItem?.end_date,
                }))}

                pagination={false}
                loading={false}
                bordered={false}
                className="panchang123 new_custom_table "
              />

            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
