import React, { lazy, useState } from "react";
import CommonBanner from "../../component/CommonBanner";
import KundliStepper from "../../component/kundali/KundliStepper";
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))
import ImageDataCard from "../../component/kundali/ImageDataCard";
import KundliReport from "../../component/kundali/KundliReport";
import HoroscopeGrid from "../../component/kundali/HoroscopeGrid";
import NoteCard from "../../component/NoteCard";
import CustomTable from "../../component/Custom/CustomTable";
import northIndianKundliImg from "../../assets/img/kundali/northIndianKundliSample.webp";
import { useTranslation } from "react-i18next";

function FreeKundaliDetailsDashaVimshottariContent() {
  const [active, setActive] = useState("0");
    const { t } = useTranslation()
  const venusMahadashaData = {
    title: "Venus Mahadasha",
    period: "16-11-1998 - 16-11-2018",
    content: [
      "The planet Venus is in the eleventh house of the Kundli. During this Dasha period, immense wealth will be there in your bag. Because of the same, you will attain comforts and happiness and have a luxurious life. There would be gain in business and promotion in job life. As the Dasha time moves ahead, you will possess a love for perfumes and scents and own many ornaments and garlands. Your family life will be blissful, and children will become your way to success. With Venus in the eleventh house in the Dasha period, gains from mercantile speculations shall be there. Also, many charities and published works with your name would come along in this Dasha time.",

      "When the planet Venus is Camping with Cancer at birth, the person affected by this conjunction will go through a period of varied experiences and education. The person will travel by land and venture on many short and long trips. Albeit these changes in place could result in the native’s unstable job and career, he or she will always be in control of what he/she wants to do and will aspire to achieve it. The person is a skilled planner and an accomplished strategist, which will help him or her undertake any enterprise with care.",
    ],
  };
  const planetColumns = [
    {
      title: "Planets",
      dataIndex: "planets",
      key: "planets",
      width: "100px",
    },
    {
      title: "Cusp",
      dataIndex: "cusp",
      key: "cusp",
      width: "100px",
    },
    {
      title: "Sign",
      dataIndex: "sign",
      key: "sign",
      width: "150px",
    },
    {
      title: "Sign Lord",
      dataIndex: "signLord",
      key: "signLord",
      width: "150px",
    },
    {
      title: "Star Lord",
      dataIndex: "starLord",
      key: "starLord",
      width: "150px",
    },
    {
      title: "Sub Lord",
      dataIndex: "subLord",
      key: "subLord",
      width: "150px",
    },
  ];
  const planetData = [
    {
      key: 1,
      planets: "Sun",
      cusp: 10,
      sign: "Gemini",
      signLord: "Me",
      starLord: "Ju",
      subLord: "Su",
    },
    {
      key: 2,
      planets: "Moon",
      cusp: 11,
      sign: "Sagittarius",
      signLord: "Ju",
      starLord: "Ve",
      subLord: "Ve",
    },
    {
      key: 3,
      planets: "Mars",
      cusp: 3,
      sign: "Gemini",
      signLord: "Me",
      starLord: "Ju",
      subLord: "Me",
    },
    {
      key: 4,
      planets: "Rahu",
      cusp: 5,
      sign: "Cancer",
      signLord: "Mo",
      starLord: "Ju",
      subLord: "Ma",
    },
    {
      key: 5,
      planets: "Jupiter",
      cusp: 4,
      sign: "Taurus",
      signLord: "Ve",
      starLord: "Su",
      subLord: "Sa",
    },
    {
      key: 6,
      planets: "Saturn",
      cusp: 5,
      sign: "Taurus",
      signLord: "Ve",
      starLord: "Su",
      subLord: "Sa",
    },
    {
      key: 7,
      planets: "Mercury",
      cusp: 8,
      sign: "Gemini",
      signLord: "Me",
      starLord: "Ju",
      subLord: "Me",
    },
    {
      key: 8,
      planets: "Ketu",
      cusp: 5,
      sign: "Capricorn",
      signLord: "Sa",
      starLord: "Ra",
      subLord: "Ra",
    },
    {
      key: 9,
      planets: "Venus",
      cusp: 8,
      sign: "Cancer",
      signLord: "Mo",
      starLord: "Sa",
      subLord: "Ve",
    },
    {
      key: 10,
      planets: "Neptune",
      cusp: 7,
      sign: "Capricorn",
      signLord: "Sa",
      starLord: "Mo",
      subLord: "Ra",
    },
    {
      key: 11,
      planets: "Uranus",
      cusp: 3,
      sign: "Capricorn",
      signLord: "Sa",
      starLord: "Ma",
      subLord: "Ra",
    },
    {
      key: 12,
      planets: "Pluto",
      cusp: 2,
      sign: "Scorpio",
      signLord: "Ma",
      starLord: "Sa",
      subLord: "Ju",
    },
  ];
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={active=='0' ? KundaliDashaVimnotti : KundaliDashaYogini}
          text=""
          highlight="Kundli Details"
        />
        <KundliStepper />
      </section>

      <section>
        <div className="container">
          <div className="flex justify-between">
            <div className="w-[49.5%]">
              <CustomButton
                className={`w-full py-2 border  font-semibold text-[16px] leading-[100%] transition-all ${
                  active === "0"
                    ? " !bg-[#e3725d] !border-[#e3725d] !text-[#fff]"
                    : "!bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
                }`}
                onClick={() => {
                  setActive("0");
                }}
              >
                Vimshottari
              </CustomButton>
            </div>
            <div className="w-[49.5%]">
              <CustomButton
                className={`w-full py-2 border  font-semibold text-[16px] leading-[100%] transition-all ${
                  active === "1"
                    ? " !bg-[#e3725d] !border-[#e3725d] !text-[#fff]"
                    : "!bg-[#F2ECF6] !border-[#F2ECF6] !text-[#e3725d] hover:!bg-[#e3725d] hover:!border-[#e3725d] hover:!text-[#fff]"
                }`}
                onClick={() => {
                  setActive("1");
                }}
              >
                Yogini
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container padding50">
          {active === "0" ? (
            <>
              <div className="flex flex-col gap-10">
                <h2 className="commonQuesH2">Understanding your dasha</h2>
                <ImageDataCard
                  title={venusMahadashaData.title}
                  period={venusMahadashaData.period}
                  content={venusMahadashaData.content}
                />
                <ImageDataCard
                  title={venusMahadashaData.title}
                  period={venusMahadashaData.period}
                  content={venusMahadashaData.content}
                />
                <ImageDataCard
                  title={venusMahadashaData.title}
                  period={venusMahadashaData.period}
                  content={venusMahadashaData.content}
                />
                <ImageDataCard
                  title={venusMahadashaData.title}
                  period={venusMahadashaData.period}
                  content={venusMahadashaData.content}
                />
                <ImageDataCard
                  title={venusMahadashaData.title}
                  period={venusMahadashaData.period}
                  content={venusMahadashaData.content}
                />
                <ImageDataCard
                  title={venusMahadashaData.title}
                  period={venusMahadashaData.period}
                  content={venusMahadashaData.content}
                />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Siddha</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-[25px]">
                <div className="sm:col-span-2">
                  <CustomTable
                    columns={planetColumns}
                    dataSource={planetData}
                    pagination={false}
                    bordered
                    className="dasha_siddha"
                  />
                </div>
                <div className=" !mx-auto lg:!mx-0 ChalitImg_sec">
                  <div className="border border-[#F2ECF6] p-5  rounded-[10px] ">
                    <h3 className="font-bold text-[18px] leading-[100%] pb-2">
                      Chalit
                    </h3>
                    <img
                      src={northIndianKundliImg}
                      alt="northIndianKundli"
                      className="block w-full "
                    />
                  </div>
                </div>
              </div>
              <div className="container pt-[26px]">
                <NoteCard
                  title="Note"
                  content="MAN: Mangala, PIN: Pingala, DHA: Dhanya, BHR: Bhramari, BHA: Bhadrika, ULK: Ulka, SID: Siddha, SAN: Sankata"
                />
              </div>
            </>
          )}
        </div>
      </section>
      <section className="paddingTop50">
        <div className="KundliReportBg">
          <div className="container mx-auto">
            <KundliReport />
          </div>
        </div>
      </section>
      <section className="">
        <div className="container mx-auto  padding100 ">
          <HoroscopeGrid heading={t('Choose_Your_Sign')} smallText="" type={'yearly'} />
        </div>
      </section>
    </>
  );
}

export default FreeKundaliDetailsDashaVimshottariContent;
