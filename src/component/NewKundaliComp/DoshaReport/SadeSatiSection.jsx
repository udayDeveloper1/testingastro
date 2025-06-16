import { Card, Tag, Typography } from "antd";
import { lazy, memo } from "react";
import { useTranslation } from "react-i18next";
import { LanguageOption } from "../../../utils/CommonVariable";
import { Constatnt } from "../../../utils/Constent";
const CustomTable = lazy(() => import("../../Custom/CustomTable"))

const { Title, Paragraph } = Typography;
function SadeSatiSection({ sadeSati }) {
  const { t } = useTranslation()
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH


  // Check if sadeSati is defined and is an array
  if (!Array.isArray(sadeSati)) {
    return <div>Invalid data</div>; // Or handle the error case as needed
  }

  const currentDate = new Date();
  const hundredYearsFromNow = new Date();
  hundredYearsFromNow.setFullYear(currentDate.getFullYear() + 100); // 100 years from now

  const filteredSadeSati = sadeSati?.filter((item) => {
    const itemDate = LocalLanguage === LanguageOption?.ENGLISH ? new Date(item.start_date) : item.start_date;
    return LocalLanguage === LanguageOption?.ENGLISH ? itemDate <= hundredYearsFromNow : itemDate; // Only include entries within 100 years from now
  });

  // const columns = [
  //   {
  //     title: 'Retro',
  //     dataIndex: 'retro',
  //     key: 'retro',
  //     render: (retro) => (
  //       <Tag color={retro === "true" ? "red" : "green"}>
  //         {retro === "true" ? "Yes" : "No"}
  //       </Tag>
  //     ),
  //   },
  //   { title: 'Start Date', dataIndex: 'start_date', key: 'start_date' },
  //   { title: 'End Date', dataIndex: 'end_date', key: 'end_date' },
  //   { title: 'Zodiac', dataIndex: 'zodiac', key: 'zodiac' },
  //   { title: 'Type', dataIndex: 'type', key: 'type' },
  //   { title: 'Dhaiya', dataIndex: 'dhaiya', key: 'dhaiya' },
  //   { title: 'Direction', dataIndex: 'direction', key: 'direction' },
  // ];

  const columns = [
    {
      title: t('retro'),
      dataIndex: 'retro',
      key: 'retro',
      align: "center",
      fixed: "left",
      render: (retro) => (
        <Tag color={retro === "true" ? "red" : "green"}>
          {retro === "true" ? t('yes') : t('no')}
        </Tag>
      ),
    },
    {
      title: t('start_date'),
      dataIndex: 'start_date',
      key: 'start_date',
      align: "center",
      render: (value) => value || '-',
    },
    {
      title: t('end_date'),
      dataIndex: 'end_date',
      key: 'end_date',
      align: "center",
      render: (value) => value || '-',
    },
    {
      title: t('zodic'),
      dataIndex: 'zodiac',
      align: "center",
      key: 'zodiac',
      render: (value) => value || '-',
    },
    {
      title: t('type'),
      dataIndex: 'type',
      key: 'type',
      align: "center",
      render: (value) => value || '-',
    },
    {
      title: t('daiya'),
      dataIndex: 'dhaiya',
      key: 'dhaiya',
      align: "center",
      render: (value) => value || '-',
    },
    {
      title: t('drection'),
      dataIndex: 'direction',
      key: 'direction',
      align: "center", width: "120px",
      render: (value) => value || '-',
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-[24px] mt-5">
        <div>
          <Title level={4} className="!mb-0">
            <span className="website_color commonQuesH2">{t('sade_sati_report')}</span>
          </Title>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:border commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px]">
          <Card
            className="rounded-[10px] overflow-hidden col-span-2"
            bodyStyle={{ padding: 0 }}
          >
            <div className="bg_website_color px-4 py-2">
              <h3 className="new_common_heading">{t('sade_sati_report_table')}</h3>
            </div>

            <CustomTable
              columns={columns}
              data={filteredSadeSati}
              pagination={false}
              loading={false}
              bordered={false}
              scroll={{ x: "max-content" }}
              className="lightBackHead"
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default memo(SadeSatiSection);
