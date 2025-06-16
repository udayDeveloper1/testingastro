import { ArrowRight } from "lucide-react";
import React, { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { UpdatedPaths } from "../../routers/Paths";
import { allHoroScopeDetailsNavigation } from "../../utils/navigations/NavigationPage";
const CustomButton  = lazy(() => import("../Homepage/CustomButton"))

const ZodiacCard = React.memo(({ iconUrl, sign, description, id, type, keyData }) => {
  const navigate = useNavigate();
  const PATHS = UpdatedPaths();
  const { t } = useTranslation()

  return (
    <div
      className="bg-white rounded-[10px] flex flex-col items-center new_drop_shadow">
      {/* Icon */}
      <div className="w-[60px] h-[60px] -mt-6 rounded-full bg-white flex items-center justify-center shadow-md z-10 gradient-background" >
        <img src={iconUrl} alt={sign} className="w-[40px] h-[40px] object-contain" decoding="async" loading="lazy" width={40} height={40} />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="px-4 py-4 text-center">
          <h3 className="text-[20px] font-semibold pb-2">{keyData}</h3>
          <p className="commonQuesP line-clamp-5">{description}</p>
        </div>

        {/* Button */}
        <Suspense fallback={<></>}>
        <CustomButton
          parentClassName="!rounded-b-[10px] !rounded-t-none"
          className="w-full bg_website_color  text-white !rounded-b-[10px] !rounded-t-none text-[15px] font-semibold py-4 flex items-center justify-center gap-2 transition-all cursor-pointer"
          onClick={() => allHoroScopeDetailsNavigation(navigate, type, sign, id, PATHS?.ALL_HOROSCOPE_DETAILS)}
        >
          {t('read_more')}<ArrowRight size={16} />
        </CustomButton>
        </Suspense>
      </div>
    </div>
  );
});

export default ZodiacCard;
