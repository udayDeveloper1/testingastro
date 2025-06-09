import { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import '../../assets/css/kundli/KundliParts.css'
import PredictionComp from '../../component/NewKundaliComp/PredictionComp'
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
