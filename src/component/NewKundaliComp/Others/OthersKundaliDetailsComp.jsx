import { Card } from "antd";
import { lazy, memo } from "react";

const CustomTable = lazy(() => import("../../Custom/CustomTable"))

function OthersKundaliDetailsComp() {

  const planets = [
    { key: "1", label: "Name", planets: "Sun", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "2", label: "Time", planets: "Moon", sign: "Gemini", sign_lord: "Me", degree: "Ju", house: "Su" },
    { key: "3", label: "Moon", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "4", label: "Mars", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "5", label: "Rahu", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "6", label: "Jupiter", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "7", label: "Saturn", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "8", label: "Mercury", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "9", label: "Ketu", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "10", label: "Venus", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "11", label: "Neptune", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "12", label: "Uranus", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
    { key: "13", label: "Pluto", planets: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", degree: "Tarot Mamta", house: "Tarot Mamta" },
  ];

  const planetSub = [
    { key: "1", label: "Name", cusp: "Sun", degree: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", star_lord: "Tarot Mamta", sub_lord: "Tarot Mamta" },
    { key: "2", label: "Name", cusp: "Sun", degree: "Tarot Mamta", sign: "Tarot Mamta", sign_lord: "Tarot Mamta", star_lord: "Tarot Mamta", sub_lord: "Tarot Mamta" },
  ];

  const columnsPlanets = [
    {
      title: "Planets",
      dataIndex: "planets",
      key: "planets",
      render: (text) => (
        <span className="new_body_font font-bold font-medium">{text}</span>
      ),
    },
    {
      title: "Sign",
      dataIndex: "sign",
      key: "sign",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "Sign Lord",
      dataIndex: "sign_lord",
      key: "sign_lord",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "House",
      dataIndex: "house",
      key: "house",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
  ];

  const columnsPlanetsSub = [
    {
      title: "Cusp",
      dataIndex: "cusp",
      key: "cusp",
      render: (text) => (
        <span className="new_body_font font-bold font-medium">{text}</span>
      ),
    },
    {
      title: "Degree",
      dataIndex: "degree",
      key: "degree",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "Sign",
      dataIndex: "sign",
      key: "sign",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "Sign lord",
      dataIndex: "sign_lord",
      key: "sign_lord",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "Star Lord",
      dataIndex: "star_lord",
      key: "star_lord",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "Sub Lord",
      dataIndex: "star_lord",
      key: "star_lord",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <div className="grid grid-cols-2 gap-6  border commonLightBorder  rounded-[10px] p-[15px] md:p-[30px]">
          <Card
            className="rounded-[10px] overflow-hidden  col-span-2"
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div className="bg_website_color px-4 py-2">
              <h3 className=" new_common_heading">Basic Birth Details</h3>
            </div>

            {/* Custom Table */}
            <CustomTable
              columns={columnsPlanets}
              data={planets}
              pagination={false}
              loading={false}
              bordered={false}
            />
          </Card>
          <Card
            className="rounded-[10px] overflow-hidden  col-span-2"
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div className="bg_website_color px-4 py-2">
              <h3 className=" new_common_heading">Basic Birth Details</h3>
            </div>

            {/* Custom Table */}
            <CustomTable
              columns={columnsPlanetsSub}
              data={planetSub}
              pagination={false}
              loading={false}
              bordered={false}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default memo(OthersKundaliDetailsComp)