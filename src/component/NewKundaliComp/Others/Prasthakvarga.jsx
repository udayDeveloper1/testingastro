import { Card, Table } from "antd";
import React from "react";
import CustomTable from "../../Custom/CustomTable";

export default function Prasthakvarga() {
  const columns = [
    {
      title: "",
      dataIndex: "planet",
      key: "planet",
      fixed: "left",
      align: "center",
      width: 100,
      render: (text) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    "Ar", "Ta", "Ge", "Ca", "Le", "Ar2", "Vi", "Li", "Sc", "Sa", "Ca2", "Aq", "Pi"
  ].map((sign, index) =>
    typeof sign === "string"
      ? {
          title: sign === "Ar2" ? "Ar" : sign === "Ca2" ? "Ca" : sign,
          dataIndex: sign,
          key: sign,
          align: "center" ,
          width: 80,
          render: (text) => <span className="new_body_font font-bold">{text}</span>,
        }
      : sign
  );

  const dataSource = [
    {
      key: "1",
      planet: "SUN",
      Ar: 4,
      Ta: 4,
      Ge: 4,
      Ca: 4,
      Le: 4,
      Ar2: 4,
      Vi: 4,
      Li: 4,
      Sc: 4,
      Sa: 4,
      Ca2: 4,
      Aq: 4,
      Pi: 4,
    },
    {
      key: "2",
      planet: "MOON",
      Ar: 5,
      Ta: 5,
      Ge: 5,
      Ca: 5,
      Le: 5,
      Ar2: 5,
      Vi: 5,
      Li: 5,
      Sc: 5,
      Sa: 5,
      Ca2: 5,
      Aq: 5,
      Pi: 5,
    },
    {
      key: "3",
      planet: "MARS",
      Ar: 7,
      Ta: 7,
      Ge: 7,
      Ca: 7,
      Le: 7,
      Ar2: 7,
      Vi: 7,
      Li: 7,
      Sc: 7,
      Sa: 7,
      Ca2: 7,
      Aq: 7,
      Pi: 7,
    },
    {
      key: "4",
      planet: "MERC",
      Ar: 7,
      Ta: 7,
      Ge: 7,
      Ca: 7,
      Le: 7,
      Ar2: 7,
      Vi: 7,
      Li: 7,
      Sc: 7,
      Sa: 7,
      Ca2: 7,
      Aq: 7,
      Pi: 7,
    },
    {
      key: "5",
      planet: "JUPT",
      Ar: 6,
      Ta: 6,
      Ge: 6,
      Ca: 6,
      Le: 6,
      Ar2: 6,
      Vi: 6,
      Li: 6,
      Sc: 6,
      Sa: 6,
      Ca2: 6,
      Aq: 6,
      Pi: 6,
    },
    {
      key: "6",
      planet: "VENU",
      Ar: 7,
      Ta: 7,
      Ge: 7,
      Ca: 7,
      Le: 7,
      Ar2: 7,
      Vi: 7,
      Li: 7,
      Sc: 7,
      Sa: 7,
      Ca2: 7,
      Aq: 7,
      Pi: 7,
    },
    {
      key: "7",
      planet: "SATN",
      Ar: 2,
      Ta: 2,
      Ge: 2,
      Ca: 2,
      Le: 2,
      Ar2: 2,
      Vi: 2,
      Li: 2,
      Sc: 2,
      Sa: 2,
      Ca2: 2,
      Aq: 2,
      Pi: 2,
    },
    {
      key: "8",
      planet: "TOTAL",
      Ar: 25,
      Ta: 45,
      Ge: 32,
      Ca: 13,
      Le: 74,
      Ar2: 53,
      Vi: 42,
      Li: 31,
      Sc: 12,
      Sa: 31,
      Ca2: 14,
      Aq: 15,
      Pi: 42,
    },
  ];

  return (
    <>
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-2 gap-6  sm:border commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px]">
        <Card
          className="rounded-[10px] overflow-hidden  col-span-2"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading">Prasthakvarga</h3>
          </div>

          {/* Custom Table */}
          <CustomTable
            columns={columns}
            data={dataSource}
            pagination={false}
            loading={false}
            scroll={{ x: "max-content" }}
            bordered
          />
        </Card>
        
      </div>
    </div>
  </>
  );
}
