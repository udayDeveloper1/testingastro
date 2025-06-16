import { lazy, memo } from "react";
import "../../assets/css/kundli/KundliParts.css";

const MahadashaFalComp = lazy(() => import("../../component/NewKundaliComp/MahadashaFalComp") );
// import CustomTabs from "../../component/Custom/CustomTabs";

const MahadashaFal = ({ allKundliDetails }) => {
  const { mahaDashaPrediction = {} } = allKundliDetails || {};


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
