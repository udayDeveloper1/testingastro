import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "../../assets/css/kundli/KundliParts.css";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";

import MahadashaFalComp from "../../component/NewKundaliComp/MahadashaFalComp";
// import CustomTabs from "../../component/Custom/CustomTabs";

const MahadashaFal = ({ allKundliDetails }) => {
  const { mahaDashaPrediction = {} } = allKundliDetails || {};

  const location = useLocation();
  const navigationData = location.state?.navigationData;
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state?.masterSlice?.loginUser);

  return (
    <>
      <section>
        <div className=" paddingTop50">
          <MahadashaFalComp mahaDashaPrediction={mahaDashaPrediction} />
        </div>
      </section>

    </>
  );
};

export default memo(MahadashaFal);
