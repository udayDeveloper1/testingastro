import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

const CircularCharts = ({ horoScopDetails }) => {
  const extractScore = (path) => parseInt(path?.score, 10) || 0;
  const { t } = useTranslation();
  const chartData = useMemo(() => [
    { label: t('love'), value: extractScore(horoScopDetails?.relationship), color: "#E63946" },
    { label: t('career'), value: extractScore(horoScopDetails?.career), color: "#F4A261" },
    { label: t('money'), value: extractScore(horoScopDetails?.finances), color: "#2A9D8F" },
    { label: t('helth'), value: extractScore(horoScopDetails?.health), color: "#457B9D" },
    { label: t('travel'), value: extractScore(horoScopDetails?.travel), color: "#8E44AD" },
  ], [horoScopDetails]);

  const getChartOptions = (color) => ({
    chart: {
      type: "radialBar",
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "55%", // Decrease this for thicker bar (default is around 60%)
        },
        track: {
          show: true,
          background: "#f2f2f2",
          strokeWidth: "100%", // Controls the outer stroke
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontWeight: 700,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "-0.5px",
            offsetY: 6,
          },
        },
      },
    },
    colors: [color],
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {chartData.map(({ label, value, color }, index) => (
        <div
          key={index}
          className="bg-white box_shadow_common rounded-lg py-[50px] px-[45px] flex flex-col items-center"
        >
          <Chart
            className="w-[100px] md:w-full"
            options={getChartOptions(color)}
            series={[value]}
            type="radialBar"
            height={120}
          />
          <p className="mt-2 text-center font-medium commonQuesH3">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CircularCharts);