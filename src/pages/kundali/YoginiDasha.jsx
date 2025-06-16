import { lazy, memo } from "react";
import "../../assets/css/kundli/KundliParts.css";
const YoginiDashaComp = lazy(() => import("../../component/NewKundaliComp/YoginiDashaComp") );
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
