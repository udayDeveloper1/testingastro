import React from "react";
import { Card } from "antd";
import northIndianKundliImg from "../../assets/img/kundali/northIndianKundliSample.webp";
import KundliChart from "../kundali/KundliChart/KundliChart";
import { useTranslation } from "react-i18next";

export const ChartCard = ({ title, allCharts, classList = "" }) => (

  <Card
    className={`rounded-[10px] overflow-hidden shadow-md bg-[#FBF9FC] border-[2px] border-[#C32853] ${classList}`}
    bodyStyle={{ padding: 0 }}
  >
    <div className="bg_website_color px-4 py-2">
      <h3 className="new_common_heading">{title}</h3>
    </div>
    <div className="">
      <KundliChart allCharts={allCharts} />
    </div>
  </Card>
);

export default function ChartsGrid({
  rashiLagnaChart,
  navamsaChart,
  chalitChart,
  sunChart,
  moonChart,
  transitChart,
  varshapalChart,
}) {
  const { t } = useTranslation()


  //   chalitChart= {"house_no": [
  //     {
  //         "number": "1",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "As",
  //                 "zodiac": "Cancer",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Ma",
  //                 "zodiac": "Cancer",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "2",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Ke",
  //                 "zodiac": "Virgo",
  //                 "retro": "true"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "3",
  //         "planets": [ ]
  //     },
  //     {
  //         "number": "4",
  //         "planets": []
  //     },
  //     {
  //         "number": "5",
  //         "planets": [{
  //           "full_name": "",
  //           "name": "Sa",
  //           "zodiac": "Virgo",
  //           "retro": "false"
  //       },
  //       {
  //           "full_name": "",
  //           "name": "Ra",
  //           "zodiac": "Virgo",
  //           "retro": "true"
  //       }]
  //     },
  //     {
  //         "number": "6",
  //         "planets": []
  //     },
  //     {
  //         "number": "7",
  //        "planets": [

  //         ]
  //     },
  //     {
  //         "number": "8",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Sa",
  //                 "zodiac": "Pisces",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Ra",
  //                 "zodiac": "Pisces",
  //                 "retro": "true"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "9",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Me",
  //                 "zodiac": "Pisces",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Ve",
  //                 "zodiac": "Pisces",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "10",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Su",
  //                 "zodiac": "Aries",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "11",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Ju",
  //                 "zodiac": "Taurus",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "12",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Mo",
  //                 "zodiac": "Gemini",
  //                 "retro": "false"
  //             }
  //         ]
  //     }
  // ],
  // "zodiac_no": [
  //     {
  //         "number": "1",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Su",
  //                 "zodiac": "Aries",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "2",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Ju",
  //                 "zodiac": "Taurus",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "3",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Mo",
  //                 "zodiac": "Gemini",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "4",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "As",
  //                 "zodiac": "Cancer",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Ma",
  //                 "zodiac": "Cancer",
  //                 "retro": "false"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "5",
  //         "planets": []
  //     },
  //     {
  //         "number": "6",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Ke",
  //                 "zodiac": "Virgo",
  //                 "retro": "true"
  //             }
  //         ]
  //     },
  //     {
  //         "number": "7",
  //          "planets": [

  //         ]
  //     },
  //     {
  //         "number": "8",
  //         "planets": []
  //     },
  //     {
  //         "number": "9",
  //         "planets": []
  //     },
  //     {
  //         "number": "10",
  //         "planets": []
  //     },
  //     {
  //         "number": "11",
  //         "planets": []
  //     },
  //     {
  //         "number": "12",
  //         "planets": [
  //             {
  //                 "full_name": "",
  //                 "name": "Me",
  //                 "zodiac": "Pisces",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Ve",
  //                 "zodiac": "Pisces",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Sa",
  //                 "zodiac": "Pisces",
  //                 "retro": "false"
  //             },
  //             {
  //                 "full_name": "",
  //                 "name": "Ra",
  //                 "zodiac": "Pisces",
  //                 "retro": "true"
  //             }
  //         ]
  //     }
  // ]
  // } 

  return (
    <div className="flex flex-col gap-[24px]">
      <div className=" rounded-[10px] sm:p-[15px] md:p-[30px] flex flex-col gap-6 charts_list">
        {/* First Row */}
        <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
          <ChartCard title={t('LagnaChart')} allCharts={rashiLagnaChart} />
          <ChartCard title={t('NavamsaChart')} allCharts={navamsaChart} />
          <ChartCard title={t('ChalitChart')} allCharts={chalitChart} />
          <ChartCard title={t('SunChart')} allCharts={sunChart} />
          <ChartCard title={t('MoonChart')} allCharts={moonChart} />
        </div>

        {/* Second Row */}
        {/* <div className="flex flex-wrap gap-6 "> */}

        {/* <ChartCard title="transit" allCharts={transitChart} /> */}
        {/* </div> */}

        {/* Transit label */}
        {/* <div className="w-full flex justify-center py-2">
          <span className="text-center text-sm font-medium text-[#8A8A8A] border-t border-dashed border-[#C2C2C2] w-[200px] pt-2">
            Transit
          </span>
        </div> */}

        {/* Third Row (Transit Charts) */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ChartCard title="Moon" />
          <ChartCard title="Lagna" />
          <ChartCard title="Chalit" />
        </div> */}

        {/* <div className="flex flex-wrap">
          <KundliChart />
        </div> */}
      </div>
    </div>
  );
}
