import { Card } from "antd";

import { formatDate } from "../../utils/CommonFunction";
import { DateFormat, LanguageOption } from "../../utils/CommonVariable";
import { useSelector } from "react-redux";
import { Constatnt } from "../../utils/Constent";
import { useTranslation } from "react-i18next";
import { lazy, memo } from "react";

const CustomTable = lazy(() => import("../Custom/CustomTable"))
const DataWrapper = lazy(() => import("../Custom/DataWrapper"))

function DashaVishontariCompo({ mahaDasha, antarDasha }) {
  const { t } = useTranslation()
  const undefine = useSelector((state) => state?.masterSlice?.undefine);
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH

  const columns = [
    {
      title: t('planets'),
      dataIndex: "label",
      key: "label",
      align: "center",
      render: (text) => (
        <span className="new_body_font font-bold font-medium">{text?.replaceAll('/', ' - ')}</span>
      ),
    },
    {
      title: t('date'),
      dataIndex: "value",
      key: "value",
      align: "center",

      render: (text) => <span className="text-gray-800">{LocalLanguage == LanguageOption?.ENGLISH ? formatDate(text, DateFormat?.DATE_SLASH_FORMAT_SPACE) : text}</span>,
    },
  ];

  const columnsMahaDasha = [
    {
      title: t('planets'),
      dataIndex: "label",
      key: "label",
      fixed: "left",
      align: "center",
      render: (text) => (
        <span className="new_body_fontnewKundaliTableKey">{text || '-'}</span>
      ),
    },
    {
      title: t('start_date'),
      dataIndex: "start_date",
      key: "start_date",
      align: "center",

      render: (text) => <span className="newKundaliTableValue">{text || '-'}</span>,
    },
    {
      title: t('end_date'),
      dataIndex: "end_date",
      key: "end_date",
      align: "center",

      render: (text) => <span className="newKundaliTableValue">{text || '-'}</span>,
    },
  ];


  const dataSourceMahaDasha = Array.isArray(mahaDasha?.mahadasha) ? mahaDasha.mahadasha.map((planet, index) => {
    const startDate = index === 0 ?
      LocalLanguage == LanguageOption?.ENGLISH ? formatDate(mahaDasha?.dasha_start_date || null, DateFormat?.DATE_SLASH_FORMAT_SPACE) : mahaDasha?.dasha_start_date
      : LocalLanguage == LanguageOption?.ENGLISH ? formatDate(mahaDasha?.mahadasha_order?.[index - 1] || null, DateFormat?.DATE_SLASH_FORMAT_SPACE) : mahaDasha?.mahadasha_order?.[index - 1];

    const endDate = LocalLanguage == LanguageOption?.ENGLISH ? formatDate(mahaDasha?.mahadasha_order?.[index] || null, DateFormat?.DATE_SLASH_FORMAT_SPACE) : mahaDasha?.mahadasha_order?.[index];

    return {
      key: index,
      label: planet || "-",
      start_date: startDate || '-',
      end_date: endDate || '-',
    };
  })
    : [];


  const tableDataArray = antarDasha?.antardashas?.map((planetList, i) =>
    planetList?.map((planet, j) => ({
      key: `${i}-${j}`,
      label: planet,
      value: antarDasha?.antardasha_order[i][j],
    }))
  );

  return (
    <DataWrapper data={mahaDasha} undefine={undefine || !hasAnyData}>
      <div className="flex flex-col gap-[24px]">
        <div className="commonCardBorderKundali commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px] ">
          <Card
            className="rounded-[10px] overflow-hidden col-span-2 mb-5"
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div className="bg_website_color px-4 py-2">
              <h3 className=" new_common_heading"> {t('mahadasha_fal')}</h3>
            </div>

            {/* Custom Table */}
            <CustomTable
              columns={columnsMahaDasha}
              data={dataSourceMahaDasha}
              pagination={false}
              loading={false}
              scroll={{ x: "max-content" }}
              bordered={false}
              className="lightBackHead"

            />
          </Card>
          <Card className="rounded-[10px] overflow-hidden new_custom_card border-none dashaVisnotari new_custom_table !border-none" bodyStyle={{ padding: 0 }}>
            {/* Grid layout for tables */}
            {/* <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading">Antardasha</h3>
          </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">

              {tableDataArray?.map((tableData, index) => {
                const mahaDashaTitle = tableData[0]?.label.split("/")[0]; // e.g., "Mercury"
                return (
                  <div key={index}>
                    {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">{mahaDashaTitle}</h3> */}
                    <CustomTable
                      columns={columns}
                      data={tableData}
                      pagination={false}
                      loading={false}
                      bordered={false}
                      scroll={{ x: "max-content" }}
                      className="new_custom_table panchang123 "
                    />
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </DataWrapper>
  );
}

export default memo(DashaVishontariCompo)