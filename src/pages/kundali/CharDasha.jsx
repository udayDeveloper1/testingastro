import { memo } from "react";
import "../../assets/css/kundli/KundliParts.css";
import CharDashaComp from "../../component/NewKundaliComp/CharDashaComp";
// import CustomTabs from "../../component/Custom/CustomTabs";

const CharDasha = ({ allKundliDetails }) => {
  const { charDashaSub, charDashaMain } = allKundliDetails || {};

  return (
    <>
      <section>
        <div className=" paddingTop50">
          <CharDashaComp
            charDashaSub={charDashaSub}
            charDashaMain={charDashaMain}
          />
        </div>
      </section>
    </>
  );
};

export default memo(CharDasha);
