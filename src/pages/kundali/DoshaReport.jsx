import { lazy, memo } from "react";
import { useSelector } from "react-redux";
import "../../assets/css/kundli/KundliParts.css";


const DoshaReportComp = lazy(() => import("../../component/NewKundaliComp/DoshaReportComp"));
const DataWrapper = lazy(() => import("../../component/Custom/DataWrapper"));

const DoshaReport = ({ allKundliDetails }) => {
  const undefine = useSelector((state) => state?.masterSlice?.undefine);

  const {
    mangalikDosh,
    mangalDosh,
    pitraDosh,
    KaalsarpDosh,
    sadeSati,
    remedies,
  } = allKundliDetails || {};

  // Check if all dosha-related values are missing
  const isEmpty =
    !mangalikDosh &&
    !mangalDosh &&
    !pitraDosh &&
    !KaalsarpDosh &&
    !sadeSati &&
    !remedies;

  return (
    <DataWrapper data={allKundliDetails} undefine={undefine || isEmpty}>
      <section>
        <div className="paddingTop50">
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
    </DataWrapper>
  );
};

export default memo(DoshaReport);
