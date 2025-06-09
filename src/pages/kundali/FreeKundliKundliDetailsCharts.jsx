import React, { useState } from "react";
import "../../assets/css/kundli/KundliParts.css";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import KundliReport from "../../component/kundali/KundliReport";
import ChartsGrid from "../../component/NewKundaliComp/ChartsGrid";

const FreeKundliKundliDetailsCharts = ({ allKundliDetails }) => {
  const {
    rashiLagnaChart,
    navamsaChart,
    chalitChart,
    sunChart,
    moonChart,
    transitChart,
    varshapalChart,
  } = allKundliDetails;

  return (
    <>
      <section className=" paddingTop50 ">
        <div className="">
          <div className=" mx-auto   ">
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
        </div>
      </section>


    </>
  );
};

export default FreeKundliKundliDetailsCharts;
