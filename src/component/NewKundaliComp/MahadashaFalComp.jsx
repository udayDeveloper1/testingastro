import React from "react";
import NoDataFound from "../../pages/NoDataFound/NoDataFound";
import Loader2 from "../loader/Loader2";
import DataWrapper from "../Custom/DataWrapper";

export default function MahadashaFalComp({ mahaDashaPrediction }) {
  const hasData = mahaDashaPrediction?.dashas?.length > 0;

  return (
    <DataWrapper data={mahaDashaPrediction} undefine={!hasData}>
      <div className="bg-white rounded-[10px] flex flex-col gap-[30px]">
        <h2 className="text-[18px] font-semibold new_body_font border-b commonLightBorderBottom border-opacity-30 pb-3">
          {mahaDashaPrediction?.translated_mahadasha || "Mahadasha Prediction"}
        </h2>

        <div>
          {mahaDashaPrediction?.dashas?.map((item, index) => (
            <div
              key={index}
              className="space-y-2 new_border_bottom pb-[30px] mb-[30px]"
            >
              <h3 className="text-[18px] font-bold py-[10px] new_body_font">
                {`${item.dasha} (${item.dasha_start_year} - ${item.dasha_end_year})`}
              </h3>
              <p className="commonQuesP leading-relaxed">
                {item.prediction || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DataWrapper>
  );
}
