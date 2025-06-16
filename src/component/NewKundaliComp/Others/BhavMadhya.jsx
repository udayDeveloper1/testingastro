import { Card } from "antd";
import { lazy, memo } from "react";

const CustomTable = lazy(() => import("../../Custom/CustomTable"))
function BhavMadhya() {
  const prasthakvargaColumns = [
    {
      title: "",
      dataIndex: "planet",
      key: "planet",
      fixed: "left",
      align: "center",
      render: (text) => <span className="newKundaliTableKey">{text}</span>,
    },
    { title: "Ar", dataIndex: "Ar", key: "Ar", align: "center" },
    ...Array.from({ length: 12 }, (_, i) => ({
      title: `${i + 1}`,
      dataIndex: `${i + 1}`,
      key: `${i + 1}`,
      align: "center",
    })),
  ];

  const prasthakvargaData = [
    {
      key: "1",
      planet: "SUN",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "-",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "2",
      planet: "MOON",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "-",
      5: "-",
      6: "-",
      7: "Sx 0.12",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "3",
      planet: "MARS",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "-",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "4",
      planet: "MERC",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "Sx 2.5",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "5",
      planet: "JUPT",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "-",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "6",
      planet: "VENU",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "-",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "Op 3.88",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "7",
      planet: "SATN",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "Cn 3.88",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
    {
      key: "8",
      planet: "TOTAL",
      Ar: "-",
      1: "-",
      2: "-",
      3: "-",
      4: "-",
      5: "-",
      6: "-",
      7: "-",
      8: "-",
      9: "-",
      10: "-",
      11: "-",
      12: "-",
    },
  ];

  const aspectColumns = [
    {
      title: <span className="text-[18px] font-semibold">Abbr-Aspect</span>,
      dataIndex: "abbr",
      key: "abbr",
      width: 120,
      render: (text) => (
        <span className="text-[16px] font-semibold new_body_font">{text}</span>
      ),

    },
    {
      title: <span className="text-[18px] font-semibold">Degree</span>,
      dataIndex: "degree",
      key: "degree",
      align: "center",
      width: 100,
      render: (text) => <span className="text-[16px] font-medium">{text}</span>,
    },
    {
      title: <span className="text-[18px] font-semibold">Orb</span>,
      dataIndex: "orb",
      key: "orb",
      align: "center",
      width: 100,
      render: (text) => <span className="text-[16px] font-medium">{text}</span>,
    },
    {
      title: <span className="text-[18px] font-semibold">Weight</span>,
      dataIndex: "weight",
      key: "weight",
      align: "center",
      width: 100,
      render: (text) => <span className="text-[16px] font-medium">{text}</span>,
    },
  ];

  const aspectDataLeft = [
    { key: "1", abbr: "CONJ–CONJUNCTION", degree: "0", orb: "0", weight: "0" },
    { key: "2", abbr: "TRIN–TRINE", degree: "120", orb: "120", weight: "120" },
    { key: "3", abbr: "SEXT–SEXTILE", degree: "60", orb: "60", weight: "60" },
    { key: "4", abbr: "NONL–NONILE", degree: "40", orb: "40", weight: "40" },
    {
      key: "5",
      abbr: "SQOD–SESSQUQUADRATE",
      degree: "135",
      orb: "135",
      weight: "135",
    },
  ];

  const aspectDataRight = [
    {
      key: "6",
      abbr: "OPPN–OPPOSITION",
      degree: "180",
      orb: "15",
      weight: "10",

    },
    { key: "7", abbr: "SQU–SQUARE", degree: "90", orb: "6", weight: "3" },
    { key: "8", abbr: "SSQU–SEMI SQUARE", degree: "45", orb: "1", weight: "1" },
    { key: "9", abbr: "QUIN–QUINTILE", degree: "72", orb: "1", weight: "1" },
    { key: "10", abbr: "QUIN–QUINCUNC", degree: "150", orb: "1", weight: "1" },
  ];

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-[24px] sm:border commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px]">
          <Card
            className="rounded-[10px] overflow-hidden "
            bodyStyle={{ padding: 0 }}
          >
            <div className="bg_website_color px-4 py-2">
              <h3 className="new_common_heading">Prasthakvarga</h3>
            </div>
            <CustomTable
              columns={prasthakvargaColumns}
              data={prasthakvargaData}
              pagination={false}
              loading={false}
              scroll={{ x: 'max-content' }}
              bordered
            />
          </Card>
        </div>
        <div className="text-sm text-[#5A5A5A] leading-6">
          <p className="text-[18px] font-bold mb-0">
            <strong>Note.</strong>
          </p>
          <ol className="list-decimal pl-4 mb-0">
            <li className="commonQuesP">
              The table specifies the aspect if it exists and the weight. Weight
              of the aspect denotes strength of the aspect.
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-[24px]">
          <Card className="abbrCard" title="">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomTable
                columns={aspectColumns}
                dataSource={aspectDataLeft}
                pagination={false}
                size="small"
                bordered
                scroll={{ x: 'max-content' }}
                className="col-span-2 md:col-span-1 new_custom_table border commonLightBorder  rounded-[10px] overflow-hidden"
              />

              <CustomTable
                columns={aspectColumns}
                dataSource={aspectDataRight}
                pagination={false}
                size="small"
                bordered
                scroll={{ x: 'max-content' }}
                className="col-span-2 md:col-span-1 new_custom_table border commonLightBorder  rounded-[10px] overflow-hidden"
              />
            </div>
          </Card>
        </div>

        <div className="text-sm text-[#5A5A5A] leading-6">
          <ol className="list-decimal pl-4 flex flex-col gap-3 mb-0">
            <li className="commonQuesP">
              The table specifies the aspect if it exists and the weight. Weight
              of the aspect denotes strength of the aspect.
            </li>
            <li className="commonQuesP">
              The table specifies the aspect if it exists and the weight. Weight
              of the aspect denotes strength of the aspect.
            </li>
            <li className="commonQuesP">
              The table specifies the aspect if it exists and the weight. Weight
              of the aspect denotes strength of the aspect.
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default memo(BhavMadhya)