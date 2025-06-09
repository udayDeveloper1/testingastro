import { Card, Table } from "antd";
import React, { memo, useEffect, useMemo, useState } from "react";
import "../../assets/css/kundli/KundliParts.css";
import freeKundliKundliDetailsBasic from "../../assets/img/banner/freeKundliKundliDetailsBasic.webp";
import CommonBanner from "../../component/CommonBanner";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import KundliReport from "../../component/kundali/KundliReport";
import KundliStepper from "../../component/kundali/KundliStepper";
import { useLocation, useNavigate } from "react-router";
// import { PATHS } from "../../routers/Paths";
import { useSelector } from "react-redux";
import { Codes, TimeFormat } from "../../utils/CommonVariable";
import { formatTime } from "../../utils/CommonFunction";

import BasicBirthDetailsCard from "../../component/NewKundaliComp/BasicBirthDetailsCard";
import CustomTable from "../../component/Custom/CustomTable";
import PlanetsDetail from "../../component/NewKundaliComp/PlanetsDetail";
import { ChalitDetails } from "../../component/NewKundaliComp/ChalitDetails";
import { UpdatedPaths } from "../../routers/Paths";
// import CustomTabs from "../../component/Custom/CustomTabs";

const Others = ({ allKundliDetails }) => {
  const { panchangeDetails, planetDetails } = allKundliDetails;

  const location = useLocation();
  const PATHS = UpdatedPaths()

  const navigationData = location.state?.navigationData;
  const navigate = useNavigate();
  const loginUser = useSelector((state) => state?.masterSlice?.loginUser);

  return (
    <>
      <section>
        <div className="container padding50">
          <ChalitDetails planetDetails={planetDetails} />
        </div>
      </section>

      <section>
        <div className="container padding50">
          <HoroscopeGrid heading="Other zodiac signs" smallText="" />
        </div>
      </section>

      <div className="paddingBottom50"></div>
    </>
  );
};

export default memo(Others);
