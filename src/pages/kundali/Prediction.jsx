import { lazy, memo } from 'react'
import '../../assets/css/kundli/KundliParts.css'
const PredictionComp = lazy(() => import('../../component/NewKundaliComp/PredictionComp'));

// import CustomTabs from "../../component/Custom/CustomTabs";

const Prediction = ({ allKundliDetails, predicatioinApi }) => {
  const { kundliPredication } = predicatioinApi || {}
  return (
    <>
      <section>
        <div className='paddingTop50 '>
          <PredictionComp kundliPredication={kundliPredication} />
        </div>
      </section>
    </>
  )
}

export default memo(Prediction)
