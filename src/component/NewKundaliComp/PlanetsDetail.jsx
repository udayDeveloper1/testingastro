import { Card } from "antd";
import CustomTable from "../Custom/CustomTable";
import { convertDegree, getShortNakshatra } from "./KundliVariabls";
import { useTranslation } from "react-i18next";
import Loader2 from "../loader/Loader2";

export default function PlanetsDetail({ planetDetails }) {
  const { t } = useTranslation()

  const columnsPlanets = [
    {
      title: t('Planets'),
      dataIndex: "planets",
      key: "planets",
      align: "center",
      width: "100px",
      fixed: "left",
      render: (text) => (
        <span className="newKundaliTableValue capitalize">{text}</span>
      ),
    },
    {
      title: t('sign'),
      dataIndex: "sign",
      key: "sign",
      align: "center",
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
    {
      title: t('SignLord'),
      dataIndex: "sign_lord",
      key: "sign_lord",
      align: "center",
      width: "120px",
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
    {
      title: t('Degree'),
      dataIndex: "degree",
      key: "degree",
      align: "center",
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
    {
      title: t('House'),
      dataIndex: "house",
      key: "house",
      align: "center",
      width: "100px",
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
  ];

  const columnsPlanetsSub = [
    {
      title: t('Planets'),
      dataIndex: "planets",
      key: "planets",
      align: "center",
      width: "100px",
      fixed: "left",
      render: (text) => (
        <span className="newKundaliTableValue capitalize">{text || '-'}</span>
      ),
    },
    {
      title: t('Degree'),
      dataIndex: "degree",
      key: "degree",
      align: "center",
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
    {
      title: t('Signlord'),
      dataIndex: "sign_lord",
      key: "sign_lord",
      align: "center",
      width: "120px",
      render: (text) => <span className="newKundaliTableValue capitalize">{text}</span>,
    },
    {
      title: t('NakshatraLord'),
      dataIndex: "naksatra_lord",
      key: "naksatra_lord",
      align: "center",
      width: 150,
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
    {
      title: t('SubLord'),
      dataIndex: "sub_lord",
      key: "sub_lord",
      align: "center",
      width: 150,
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
    {
      title: t('SubSubLord'),
      dataIndex: "sub_sub_lord",
      key: "sub_sub_lord",
      width: 150,
      align: "center",
      render: (text) => <span className="newKundaliTableValue capitalize">{text || '-'}</span>,
    },
  ];

  function formatLocalDegree(degree) {
    if (degree == null || isNaN(degree)) return "";

    const degrees = Math.floor(degree);
    const minutesDecimal = (degree - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const secondsDecimal = (minutesDecimal - minutes) * 60;
    const seconds = Math.floor(secondsDecimal);
    return `${degrees}°${minutes}'${seconds}"`;
  }

  return (
    <>
    
      <div className="flex flex-col gap-[24px]">
        <div className="grid grid-cols-2 gap-6 rounded-[10px] sm:p-[15px] md:p-[30px] planetDetailsCard commonCardBorderKundali">
          {!planetDetails || Object.keys(planetDetails?.planets || {}).length === 0 ? (
            <div className='space-y-5 mt-4'>
              <div className=''>
                <div className='pb-10 pt-24 min-h-[100vh]'>
                  <Loader2 /> 
                </div>
              </div>
            </div>
          ) : (<>
            <Card
              className="rounded-[10px] overflow-hidden  col-span-2"
              bodyStyle={{ padding: 0 }}
            >
              {/* Header */}
              <div className="bg_website_color px-4 py-2">
                <h3 className=" new_common_heading">{t('Planets')}</h3>
              </div>

              {/* Custom Table */}
              <CustomTable
                columns={columnsPlanets}
                data={
                  planetDetails?.planets && typeof planetDetails?.planets === 'object'
                    ? Object.keys(planetDetails?.planets)?.map((key, index) => {
                      const planet = planetDetails?.planets[key] || {};
                      console.log('planet columnsPlanets', planet);

                      return {
                        key: (index + 1).toString(),
                        label: planet?.full_name || "-",
                        planets: planet?.name || "-",
                        sign: planet?.zodiac || "-",
                        sign_lord: planet?.zodiac_lord || "-",
                        degree: convertDegree(planet?.local_degree) || "-",
                        house: planet?.house || "-",

                      };
                    })
                    : []
                }
                pagination={false}
                loading={false}
                scroll={{ x: "max-content" }}
                bordered={false}
                className="lightBackHead"
              />
            </Card>

            <Card
              className="rounded-[10px] overflow-hidden  col-span-2"
              bodyStyle={{ padding: 0 }}
            >
              {/* Header */}
              <div className="bg_website_color px-4 py-2">
                <h3 className=" new_common_heading capitalize">{t('PlanetsSub')}</h3>
              </div>

              <CustomTable
                columns={columnsPlanetsSub}
                data={planetDetails && Object?.keys(planetDetails?.planets || {})?.map((key, index) => {
                  const planet = planetDetails?.planets[key] || {};
                  return {
                    key: (index + 1).toString(),
                    planets: planet?.full_name || "-",
                    degree: convertDegree(planet?.local_degree) || "-",
                    sign_lord: planet?.zodiac_lord,
                    naksatra_lord: getShortNakshatra(planet?.nakshatra_lord) || "-",
                    sub_lord: getShortNakshatra(planet?.name) || "-",
                    sub_sub_lord: getShortNakshatra(planet?.house) || "-",
                  };
                })}
                pagination={false}
                loading={false}
                scroll={{ x: "max-content" }}
                bordered={false}
              />
            </Card>
          </>)}
        </div>
      </div>
    </>
  );

}
