import { lazy, memo } from 'react';
import '../../assets/css/kundli/KundliParts.css';
// import CustomTabs from "../../component/Custom/CustomTabs";
const BasicBirthDetailsCard = lazy(() => import("../../component/NewKundaliComp/BasicBirthDetailsCard"));

const FreeKundliKundliDetailsBasic = ({ allKundliDetails }) => {
  const { planetDetails } = allKundliDetails

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
