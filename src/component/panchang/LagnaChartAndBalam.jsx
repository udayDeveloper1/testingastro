import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ChartCard } from "../NewKundaliComp/ChartsGrid";

const Tag = ({ children, isLast }) => (
  <span className='inline-block text-[16px] new_body_font font-medium leading-5 p-4 rounded-[10px] border border-[#F2ECF6]'>
    {children}
    {!isLast && ','}
  </span>
)

const TagList = ({ items }) => (
  <div className='flex flex-wrap gap-2'>
    {items.map((item, idx) => (
      <Tag key={idx} isLast={idx === items.length - 1}>
        {item}
      </Tag>
    ))}
  </div>
)

const LagnaChartAndBalam = ({
  taraBala = [],
  chandraBala = [],
  lagnaChartData = {}
}) => {
  const { t } = useTranslation()

  return (
    <div className=''>

      <ChartCard
        title={t('lagna_chart_sunrise')}
        allCharts={lagnaChartData}
        classList='particular_Chart lagnbalamChart'
      />
    </div>
  )
}

export default memo(LagnaChartAndBalam)
