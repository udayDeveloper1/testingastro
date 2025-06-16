import { memo } from "react";

const KundliChart = ({ data = "" }) => {
  return (
    <div className="container mx-auto">
      {/* <canvas ref={canvasRef} width={420} height={420} className="border" /> */}
      <div class="kundli">
        <div class="square"></div>
        <div class="diagonal"></div>
        <div class="house top-left">Sa-3.56°</div>
        <div class="house top-right">Ne-6.3°<br />Ur-15.83°</div>
        <div class="house bottom-left">Ra-2.08°</div>
        <div class="house bottom-right" style={{ color: "red" }}>Ma-9.43°</div>
        <div class="house center">2</div>
      </div>
    </div>
  );
};

export default memo(KundliChart);
