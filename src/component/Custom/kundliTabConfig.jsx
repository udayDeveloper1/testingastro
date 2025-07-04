
// import FreeKundliKundliDetailsBasic from "../../pages/kundali/FreeKundliKundliDetailsBasic";
// import FreeKundliKundliDetailsCharts from "../../pages/kundali/FreeKundliKundliDetailsCharts";
// import Planets from "../../pages/kundali/Planets";
// import DashaVishontari from "../../pages/kundali/DashaVishontari";
// import CharDasha from "../../pages/kundali/CharDasha";
// import YoginiDasha from "../../pages/kundali/YoginiDasha";
// import MahadashaFal from "../../pages/kundali/MahadashaFal";
// import Prediction from "../../pages/kundali/Prediction";
// import DoshaReport from "../../pages/kundali/DoshaReport";
// import OthersDetail from "../../pages/kundali/OthersDetail";
// import { Remedies } from "../../pages/kundali/Remedies";

import React, { Suspense } from "react";

// export const kundliTabConfig = [
//   {
//     key: "basic",
//     label: "Basic",
//     bannerText: "basic_kundli",
//     bannerHighlight: "",
//     element: <FreeKundliKundliDetailsBasic />
//   },
//   {
//     key: "charts",
//     label: "Charts",
//     bannerText: "charts",
//     bannerHighlight: "",
//     element: <FreeKundliKundliDetailsCharts />
//   },
//   {
//     key: "prediction",
//     label: "Prediction",
//     bannerText: "prediction",
//     bannerHighlight: "",
//     element: <Prediction />
//   },
//   {
//     key: "remedies",
//     label: "Ramedies",
//     bannerText: "remedies",
//     bannerHighlight: "",
//     element: <Remedies />
//   },
//   {
//     key: "planets",
//     label: "Planets",
//     bannerText: "planets",
//     bannerHighlight: "",
//     element: <Planets />
//   },
//   {
//     key: "others",
//     label: "Others",
//     bannerText: "others",
//     bannerHighlight: "",
//     element: <OthersDetail />
//   },
//   {
//     key: "mahadasha_fal",
//     label: "Mahadasha Prediction",
//     bannerText: "mahadasha_fal",
//     bannerHighlight: "",
//     element: <MahadashaFal />
//   },
//   {
//     key: "dasha",
//     label: "Vishontari dasha",
//     bannerText: "vishontari_dasha",
//     bannerHighlight: "",
//     element: <DashaVishontari />

//   },
//   {
//     key: "yogini_dasha",
//     label: "Yogini dasha",
//     bannerText: "yogini_dasha",
//     bannerHighlight: "",
//     element: <YoginiDasha />

//   },
//   {
//     key: "char_dasha",
//     label: "Char dasha",
//     bannerText: "char_dasha",
//     bannerHighlight: "",
//     element: <CharDasha />
//   },

//   {
//     key: "dosha_report",
//     label: "Dosha report",
//     bannerText: "dosha_report",
//     bannerHighlight: "",
//     element: <DoshaReport />
//   }
// ];

// import FreeKundliKundliDetailsBasic from "../../pages/kundali/FreeKundliKundliDetailsBasic";
// import FreeKundliKundliDetailsCharts from "../../pages/kundali/FreeKundliKundliDetailsCharts";
// import Planets from "../../pages/kundali/Planets";
// import DashaVishontari from "../../pages/kundali/DashaVishontari";
// import CharDasha from "../../pages/kundali/CharDasha";
// import YoginiDasha from "../../pages/kundali/YoginiDasha";
// import MahadashaFal from "../../pages/kundali/MahadashaFal";
// import Prediction from "../../pages/kundali/Prediction";
// import DoshaReport from "../../pages/kundali/DoshaReport";
// import OthersDetail from "../../pages/kundali/OthersDetail";
// import { Remedies } from "../../pages/kundali/Remedies";

const FreeKundliKundliDetailsBasic = React.lazy(() => import("../../pages/kundali/FreeKundliKundliDetailsBasic"));
const FreeKundliKundliDetailsCharts = React.lazy(() => import("../../pages/kundali/FreeKundliKundliDetailsCharts"));
const Planets = React.lazy(() => import("../../pages/kundali/Planets"));
const DashaVishontari = React.lazy(() => import("../../pages/kundali/DashaVishontari"));
const CharDasha = React.lazy(() => import("../../pages/kundali/CharDasha"));
const YoginiDasha = React.lazy(() => import("../../pages/kundali/YoginiDasha"));
const MahadashaFal = React.lazy(() => import("../../pages/kundali/MahadashaFal"));
const Prediction = React.lazy(() => import("../../pages/kundali/Prediction"));
const DoshaReport = React.lazy(() => import("../../pages/kundali/DoshaReport"));
const OthersDetail = React.lazy(() => import("../../pages/kundali/OthersDetail"));
// const Remedies = React.lazy(() => import("../../pages/kundali/Remedies"));
import { Remedies } from "../../pages/kundali/Remedies";

export const kundliTabConfig = [
  {
    key: "basic",
    label: "Basic",
    bannerText: "basic_kundli",
    bannerHighlight: "",
    element: <FreeKundliKundliDetailsBasic />,
    highlightClass: ""
  },
  {
    key: "charts",
    label: "Charts",
    bannerText: "charts",
    bannerHighlight: "",
    element: <FreeKundliKundliDetailsCharts />,
    highlightClass: ""
  },
  {
    key: "prediction",
    label: "Prediction",
    bannerText: "prediction",
    bannerHighlight: "",
    element: <Prediction />,
    highlightClass: "highlight_Tab"
  },
  // {
  //   key: "remedies",
  //   label: "Ramedies",
  //   bannerText: "remedies",
  //   bannerHighlight: "",
  //   element: <>
  //       <Remedies />
  //   </>,// <Remedies />,
  //   highlightClass: "highlight_Tab"
  // },
  {
    key: "remedies",
    label: "Ramedies",
    bannerText: "remedies",
    bannerHighlight: "",
    element: <Remedies />,
    highlightClass: "highlight_Tab"
  },
  {
    key: "planets",
    label: "Planets",
    bannerText: "planets",
    bannerHighlight: "",
    element: <Planets />,
    highlightClass: ""
  },
  {
    key: "others",
    label: "Others",
    bannerText: "others",
    bannerHighlight: "",
    element: <OthersDetail />,
    highlightClass: ""
  },
  {
    key: "mahadasha_fal",
    label: "Mahadasha Prediction",
    bannerText: "mahadasha_fal",
    bannerHighlight: "",
    element: <MahadashaFal />,
    highlightClass: ""
  },
  {
    key: "dasha",
    label: "Vishontari dasha",
    bannerText: "vishontari_dasha",
    bannerHighlight: "",
    element: <DashaVishontari />,
    highlightClass: ""

  },
  {
    key: "yogini_dasha",
    label: "Yogini dasha",
    bannerText: "yogini_dasha",
    bannerHighlight: "",
    element:
      <YoginiDasha />,
    highlightClass: ""

  },
  {
    key: "char_dasha",
    label: "Char dasha",
    bannerText: "char_dasha",
    bannerHighlight: "",
    element:
      <CharDasha />,
    highlightClass: ""
  },

  {
    key: "dosha_report",
    label: "Dosha report",
    bannerText: "dosha_report",
    bannerHighlight: "",
    element:
      <DoshaReport />,
    highlightClass: ""
  }
];
