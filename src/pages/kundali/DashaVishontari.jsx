import { memo } from 'react'
import '../../assets/css/kundli/KundliParts.css'
import DashaVishontariCompo from '../../component/NewKundaliComp/DashaVishontariCompo'
// import CustomTabs from "../../component/Custom/CustomTabs";

const DashaVishontari = ({ allKundliDetails }) => {
  const { mahaDasha, antarDasha } = allKundliDetails

  return (
    <>
      <section>
        <div className=' paddingTop50'>
          <DashaVishontariCompo mahaDasha={mahaDasha} antarDasha={antarDasha} />
        </div>
      </section>

    </>
  )
}

export default memo(DashaVishontari)
