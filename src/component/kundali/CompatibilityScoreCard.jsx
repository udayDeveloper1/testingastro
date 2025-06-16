import { memo } from 'react'
import Chart from 'react-apexcharts'
import { useTranslation } from 'react-i18next'

const CompatibilityScoreCard = ({
  boyName = 'Aarav',
  girlName = 'Krishna',
  score = 23.5,
  total = 36
}) => {

  const { t } = useTranslation()
  const percentage = (score / total) * 100

  const options = {
    chart: {
      type: 'radialBar',
      offsetY: -25,
      sparkline: { enabled: true }
    },
    colors: ['#ee7e49'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 0,
          size: '60%'
        },
        track: {
          background: '#ffffff',
          strokeWidth: '100%'
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#000',
            offsetY: -30,
            formatter: () => `${score}/${total}`
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'horizontal',
        gradientToColors: ['#c32853'],
        colors: ['#ee7e49'],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: ''
    },
    labels: ['Score']
  }

  const series = [percentage]

  return (
    <div className='rounded-2xl px-4 pt-4 md:px-8 md:pt-6  text-white w-full mx-auto commonLightBack pb-4 md:pb-0'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center '>
        {/* Boy Name */}
        <div className='flex justify-center md:justify-end '>
          <div className=' text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-medium text-base md:text-lg gradient-background capitalize'>
            {boyName}
          </div>
        </div>

        {/* Gauge Chart */}
        <div className='mx-auto text-center relative w-full flex flex-col items-center justify-center'>

          <div className='text-sm md:text-base font-bold mb-2 text-[#343434]'>
            {t('compatibility_score')}
          </div>

          <div className=''>
            <div className='flex justify-center items-center'>
              <Chart
                options={options}
                series={series}
                type='radialBar'
                className='w-[370px]'
              />
            </div>
          </div>
          {/* <div className='text-xs md:text-[14.4px] font-medium mt-2 absolute bottom-[30px] text-[#343434]'>
            Score
          </div> */}
        </div>

        {/* Girl Name */}
        <div className='flex justify-center md:justify-start'>
          <div className='commonLightBack text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-medium text-base md:text-lg gradient-background capitalize'>
            {girlName}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(CompatibilityScoreCard)
