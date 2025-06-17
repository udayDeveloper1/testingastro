import { lazy, memo } from "react";
import "../../assets/css/kundli/KundliParts.css";

const PlanetsDetail = lazy(() => import("../../component/NewKundaliComp/PlanetsDetail"));

// import CustomTabs from "../../component/Custom/CustomTabs";

const Planets = ({ allKundliDetails }) => {
  const { panchangeDetails, planetDetails } = allKundliDetails;

  return (
    <>
      <section>
        <div className="paddingTop50">
          <PlanetsDetail planetDetails={planetDetails} />
        </div>
      </section>

    </>
  );
};

export default memo(Planets);
