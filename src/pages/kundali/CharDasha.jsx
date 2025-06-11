import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import "../../assets/css/kundli/KundliParts.css";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import CharDashaComp from "../../component/NewKundaliComp/CharDashaComp";
// import CustomTabs from "../../component/Custom/CustomTabs";

const CharDasha = ({ allKundliDetails }) => {
  const { charDashaSub, charDashaMain } = allKundliDetails || {};
  const location = useLocation();
  const navigationData = location.state?.navigationData;
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state?.masterSlice?.loginUser);
  const [panchangDetailsData, setPanchangDetailsData] = useState({});


  return (
    <>
      <section>
        <div className=" paddingTop50">
          <CharDashaComp
            charDashaSub={charDashaSub}
            charDashaMain={charDashaMain}
          />
        </div>
      </section>
    </>
  );
};

export default memo(CharDasha);
