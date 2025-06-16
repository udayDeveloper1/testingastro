import { lazy, memo } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../assets/css/kundli/KundliParts.css";
// import { PATHS } from "../../routers/Paths";
import { useSelector } from "react-redux";

import { UpdatedPaths } from "../../routers/Paths";
const ChalitDetails = lazy(() =>
  import("../../component/NewKundaliComp/ChalitDetails").then(module => ({
    default: module.ChalitDetails
  }))
);
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));

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
