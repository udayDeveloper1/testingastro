import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "../../assets/css/kundli/KundliParts.css";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";

import PlanetsDetail from "../../component/NewKundaliComp/PlanetsDetail";
// import CustomTabs from "../../component/Custom/CustomTabs";

const Planets = ({ allKundliDetails }) => {
  const { panchangeDetails, planetDetails } = allKundliDetails;

  const location = useLocation();

  return (
    <>
      <section>
        <div className=" paddingTop50">
          <PlanetsDetail planetDetails={planetDetails} />
        </div>
      </section>

    </>
  );
};

export default memo(Planets);
