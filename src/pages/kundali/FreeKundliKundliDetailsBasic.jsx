import { memo } from 'react'
import '../../assets/css/kundli/KundliParts.css'
import BasicBirthDetailsCard from '../../component/NewKundaliComp/BasicBirthDetailsCard'
// import CustomTabs from "../../component/Custom/CustomTabs";

const FreeKundliKundliDetailsBasic = ({ allKundliDetails }) => {
  const { panchangeDetails, planetDetails } = allKundliDetails

  return (
    <>
      <section>
        <div className='paddingTop50'>
          <BasicBirthDetailsCard
            panchangeDetails={allKundliDetails?.panchangeDetails}
            planetDetails={planetDetails}
          />
        </div>
      </section>

    </>
  )
}

export default memo(FreeKundliKundliDetailsBasic)
