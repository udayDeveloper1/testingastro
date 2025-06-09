import { Card, Table } from "antd";

import { formatDate, formatTime } from "../../utils/CommonFunction";
import { DateFormat, TimeFormat } from "../../utils/CommonVariable";
import boyImage from "../../assets/img/kundali/boyImage.webp";
import girlImage from "../../assets/img/kundali/girlImage.webp";
import { useTranslation } from "react-i18next";

const KundaliDetails = ({ kundaliData }) => {

  const { t } = useTranslation();

  const boyData = [
    { key: "1", label: t('name'), value: kundaliData?.male?.name },
    {
      key: "2",
      label: t('birth_date'),
      value: formatDate(
        kundaliData?.male?.dob,
        DateFormat?.ABBREVIATED_FULL_DATE_FORMAT
      ),
    },
    {
      key: "3",
      label: t('place_of_birth'),
      value: kundaliData?.male?.place_of_birth,
    },
    {
      key: "4",
      label: t('time_of_birth'),
      value: formatTime(
        kundaliData?.male?.time_of_birth,
        TimeFormat.TIME_12_HOUR_FORMAT
      ),
    },
  ];

  const girlData = [
    { key: "1", label: t('name'), value: kundaliData?.female?.name },
    {
      key: "2",
      label: t('birth_date'),
      value: formatDate(
        kundaliData?.female?.dob,
        DateFormat?.ABBREVIATED_FULL_DATE_FORMAT
      ),
    },
    {
      key: "3",
      label: t('place_of_birth'),
      value: kundaliData?.female?.place_of_birth,
    },
    {
      key: "4",
      label: t('time_of_birth'),
      value: formatTime(
        kundaliData?.female?.time_of_birth,
        TimeFormat.TIME_12_HOUR_FORMAT
      ),
    },
  ];

  const columns = [
    {
      dataIndex: "label",
      key: "label",
      width: "40%",
      render: (text) => <strong className="userCardLabel capitalize">{text}</strong>,
    },
    {
      dataIndex: "value",
      key: "value",
      render: (text) => <span className="userCardValue capitalize">{text}</span>,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-6">
      {/* Boy's Details */}
      <Card className="relative userCard">
        <div className="bg_website_color text-white flex items-center justify-center p-3 rounded-t-[10px] relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 gradient-background rounded-full flex items-center justify-center border-2 border-white">
            <img
              src={boyImage}
              alt="Boy Icon"
              className=""
            />
          </div>
          <span className="userCardHeading font-bold text-lg text-start w-full pt-4 sm:pt-0">
            {t('boys_details')}
          </span>
        </div>
        <Table
          columns={columns}
          dataSource={boyData}
          pagination={false}
          showHeader={false}
          className="custom-table rounded-b-xl overflow-hidden"
        />
      </Card>

      {/* Girl's Details */}
      <Card className="relative userCard">

        <div className="bg_website_color text-white flex items-center justify-center p-3 rounded-t-[10px] relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 gradient-background rounded-full flex items-center justify-center border-2 border-white">
            <img
              src={girlImage}
              alt="Boy Icon"
              className=""
            />
          </div>
          <span className="userCardHeading font-bold text-lg text-start w-full pt-4 sm:pt-0">
            {t('girl_details')}
          </span>
        </div>

        <Table
          columns={columns}
          dataSource={girlData}
          pagination={false}
          showHeader={false}
          className="custom-table rounded-b-xl overflow-hidden"
        />
      </Card>
    </div>

  );
};

export default KundaliDetails;
