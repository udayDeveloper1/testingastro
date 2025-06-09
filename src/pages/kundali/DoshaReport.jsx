import { memo } from 'react'
import '../../assets/css/kundli/KundliParts.css'
import DoshaReportComp from '../../component/NewKundaliComp/DoshaReportComp'
// import CustomTabs from "../../component/Custom/CustomTabs";

const DoshaReport = ({ allKundliDetails }) => {

  const { mangalikDosh, mangalDosh, pitraDosh, KaalsarpDosh, sadeSati, remedies } = allKundliDetails

  return (
    <>
      <section>
        <div className='paddingTop50 '>
          <DoshaReportComp
            mangalikDosh={mangalikDosh}
            mangalDosh={mangalDosh}
            pitraDosh={pitraDosh}
            KaalsarpDosh={KaalsarpDosh}
            sadeSati={sadeSati}
            remedies={remedies}
          />
        </div>
      </section>
    </>
  )
}

export default memo(DoshaReport)
