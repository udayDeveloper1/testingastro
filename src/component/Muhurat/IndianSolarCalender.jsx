import { Card } from "antd";
import { lazy, memo } from "react";
const CustomTable = lazy(() => import("../Custom/CustomTable"))
const IndianSolarCalendar = () => {
  const columns = [
    {
      title: "S.No.",
      dataIndex: "sNo",
      key: "sNo",
    },
    {
      title: "Indian Religious Calendar (Solar Month)",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Approx. Greg. Date",
      dataIndex: "gregorianDate",
      key: "gregorianDate",
    },
  ];

  const data = [
    { sNo: 1, month: "Caitra", gregorianDate: "Mar. 14" },
    { sNo: 2, month: "Vaisakha", gregorianDate: "Apr. 13" },
    { sNo: 3, month: "Jyeshtha", gregorianDate: "May. 14" },
    { sNo: 4, month: "Asadha", gregorianDate: "June 14" },
    { sNo: 5, month: "Sravana", gregorianDate: "July. 16" },
    { sNo: 6, month: "Bhadrapada", gregorianDate: "Aug. 16" },
    { sNo: 7, month: "Asvina", gregorianDate: "Sept. 16" },
    { sNo: 8, month: "Kartika", gregorianDate: "Oct. 17" },
    { sNo: 9, month: "Margashirsha", gregorianDate: "Nov. 16" },
    { sNo: 10, month: "Pausa", gregorianDate: "Dec. 15" },
    { sNo: 11, month: "Magha", gregorianDate: "Jan. 14" },
    { sNo: 12, month: "Phalgura", gregorianDate: "Feb. 12" },
  ];

  return (
    <div className="rounded-lg">
      <Card title="Indian Solar Calendar" className="festivalTableCard">
        <CustomTable columns={columns} data={data} pagination={false} className="px-6 pb-6" />
      </Card>
    </div>
  );
};

export default memo(IndianSolarCalendar);
