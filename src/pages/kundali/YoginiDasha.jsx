import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "../../assets/css/kundli/KundliParts.css";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import YoginiDashaComp from "../../component/NewKundaliComp/YoginiDashaComp";
// import CustomTabs from "../../component/Custom/CustomTabs";

const YoginiDasha = ({ allKundliDetails }) => {
  const { yoginiDashaSub = [] } = allKundliDetails;
  return (
    <>
      <section>
        <div className=" paddingTop50">
          <YoginiDashaComp yoginiDashaSub={yoginiDashaSub} />
        </div>
      </section>

    </>
  );
};

export default memo(YoginiDasha);
