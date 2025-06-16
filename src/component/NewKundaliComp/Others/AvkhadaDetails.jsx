import { Card } from "antd";
import { lazy, memo } from "react";
const CustomTable = lazy(() => import("../../Custom/CustomTable"))

const AvkhadaDetails = () => {
  const data = [
    { key: "1", col1: "Sex", col2: "Male", col3: "Longitude", col4: "71 : 13 : E" },
    { key: "2", col1: "Date of Birth", col2: "16 : 4 : 2025", col3: "Local Time Correction", col4: "00.45.07" },
    { key: "3", col1: "Time of Birth", col2: "11 : 53 : 24", col3: "War Time Correction", col4: "00.00.00" },
    { key: "4", col1: "Day of Birth", col2: "Wednesday", col3: "LMT at Birth", col4: "11:08:16" },
    { key: "5", col1: "Ishtkaal", col2: "013-41-35", col3: "GMT at Birth", col4: "06:23:24" },
    { key: "6", col1: "Place of Birth", col2: "Amreli", col3: "Tithi", col4: "TRITIYA" },
    { key: "7", col1: "Time Zone", col2: "5.5", col3: "Hindu Week Day", col4: "Wednesday" },
    { key: "8", col1: "Sunset", col2: "2:26:25 PM", col3: "Paksha", col4: "KRISHNA" },
    { key: "9", col1: "Latitude", col2: "21 : 37 : N", col3: "Yoga", col4: "VYATIPATA" },
  ];

  const columns = [
    {
      title: "",
      dataIndex: "col1",
      key: "col1",
      width: "20%",
      fixed: "left",
      render: (text) => <span className=" newKundaliTableKey">{text}</span>,
    },
    {
      title: "",
      dataIndex: "col2",
      key: "col2",
      width: "30%",
      render: (text) => <span className=" newKundaliTableValue">{text}</span>,
    },
    {
      title: "",
      dataIndex: "col3",
      key: "col3",
      width: "20%",
      render: (text) => <span className="newKundaliTableKey">{text}</span>,
    },
    {
      title: "",
      dataIndex: "col4",
      key: "col4",
      width: "30%",
      render: (text) => <span className="newKundaliTableValue ">{text}</span>,
    },
  ];


  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-2 gap-6 sm:border commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px]">
        <Card
          className="rounded-[10px] overflow-hidden  col-span-2"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg_website_color px-4 py-2">
            <h3 className="new_common_heading">Person Details</h3>
          </div>

          {/* Custom Table */}
          <CustomTable
            columns={columns}
            data={data}
            pagination={false}
            loading={false}
            bordered
            scroll={{ x: "max-content" }}
            showHeader={false}
          />
        </Card>
      </div>
    </div>
  );
};

export default memo(AvkhadaDetails);
