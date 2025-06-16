import { t } from 'i18next';

const MissionVisionSection = () => {
  return (
    <section className="flex flex-col gap-[30px] md:gap-[80px] items-center">
      {/* Title */}

      <h2 className="newBannerH2 leading-[130%]">
        Rooted In Purpose, Guided By Astrology
      </h2>

      {/* Mission and Vision Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[30px] md:gap-y-0 gap-x-0 md:gap-x-[26px] w-full">
        {/* Mission */}
        <div className='flex flex-col gap-[20px] md:gap-[30px]'>
          <h3 className="gradient-text-color commonQuesH3">{t("mission_title")}</h3>
          <ul className="flex flex-col gap-[10px] md:gap-[20px] text-gray-800 text-[16px] leading-relaxed ">
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("mission_point1")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("mission_point2")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("mission_point3")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("mission_point4")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("mission_point5")}</li>

          </ul>
        </div>

        {/* Vision */}
        <div className='flex flex-col gap-[20px] md:gap-[30px]'>
          <h3 className="gradient-text-color commonQuesH3">{t("vision_title")}</h3>
          <ul className=" flex flex-col gap-[10px] md:gap-[20px] text-gray-800 text-[16px] leading-relaxed list-disc list-inside ">
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("vision_point1")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("vision_point2")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("vision_point3")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("vision_point4")}</li>
            <li className="commonQuesP flex gap-[10px]"><span>•</span> {t("vision_point5")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default React.memo(MissionVisionSection)
