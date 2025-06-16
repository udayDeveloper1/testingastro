import { lazy, memo } from "react";
import { useSelector } from "react-redux";
import "../../assets/css/kundli/KundliParts.css";

const DataWrapper = lazy(() => import("../../component/Custom/DataWrapper"));
const ChartsGrid = lazy(() => import("../../component/NewKundaliComp/ChartsGrid"));

const FreeKundliKundliDetailsCharts = ({ allKundliDetails }) => {
  const undefine = useSelector((state) => state?.masterSlice?.undefine);

  const {
    rashiLagnaChart,
    navamsaChart,
    chalitChart,
    sunChart,
    moonChart,
    transitChart,
    varshapalChart,
  } = allKundliDetails || {};

  const hasChartData =
    rashiLagnaChart ||
    navamsaChart ||
    chalitChart ||
    sunChart ||
    moonChart ||
    transitChart ||
    varshapalChart;

  return (
    <section className="paddingTop50 min-h-[300px] flex items-center justify-center">
      <DataWrapper data={hasChartData} undefine={undefine}>
        <div className="w-full">
          <ChartsGrid
            rashiLagnaChart={rashiLagnaChart}
            navamsaChart={navamsaChart}
            chalitChart={chalitChart}
            sunChart={sunChart}
            moonChart={moonChart}
            transitChart={transitChart}
            varshapalChart={varshapalChart}
          />
        </div>
      </DataWrapper>
    </section>
  );
};

export default memo(FreeKundliKundliDetailsCharts);
