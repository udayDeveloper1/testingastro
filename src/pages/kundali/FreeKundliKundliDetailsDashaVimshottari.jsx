import React, { lazy, memo, useState } from "react";
import "../../assets/css/kundli/KundliParts.css";
// import freeKundliKundliDetailsBasic from "../../assets/img/banner/freeKundliKundliDetailsBasic.webp";
import northIndianKundliImg from "../../assets/img/kundali/northIndianKundliSample.webp";
import CommonBanner from "../../component/CommonBanner";

const CustomTable = lazy(() => import("../../component/Custom/CustomTable"));
const CustomButton = lazy(() => import("../../component/Homepage/CustomButton"));
const HoroscopeGrid = lazy(() => import("../../component/kundali/HoroscopeGrid"));
const KundliReport = lazy(() => import("../../component/kundali/KundliReport"));
const KundliStepper = lazy(() => import("../../component/kundali/KundliStepper"));
const NoteCard = lazy(() => import("../../component/NoteCard"));

const FreeKundliKundliDetailsDashaVimshottari = () => {
  const [active, setActive] = useState("0");
  const planetColumns = [
    {
      title: "Planet",
      dataIndex: "planet",
      key: "planet",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
  ];
  const planetData = [
    {
      key: 1,
      planet: "SAN",
      startDate: "15-Dec-2014",
      endDate: "25-Dec-2014",
    },
    {
      key: 2,
      planet: "MAN",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
    {
      key: 3,
      planet: "PIN",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
    {
      key: 4,
      planet: "DHA",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
    {
      key: 5,
      planet: "BHR",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
    {
      key: 6,
      planet: "BHA",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
    {
      key: 7,
      planet: "ULK",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
    {
      key: 8,
      planet: "SID",
      startDate: "15-Dec-2014",
      endDate: "15-Dec-2014",
    },
  ];
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={freeKundliKundliDetailsBasic}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[25px]">
              <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
                <h3 className="font-bold text-[18px] leading-[100%]">Chalit</h3>
                <img
                  src={northIndianKundliImg}
                  alt="northIndianKundli"
                  className="block "
                />
              </div>
              <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
                <h3 className="font-bold text-[18px] leading-[100%]">Chalit</h3>
                <img
                  src={northIndianKundliImg}
                  alt="northIndianKundli"
                  className="block "
                />
              </div>
              <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
                <h3 className="font-bold text-[18px] leading-[100%]">Chalit</h3>
                <img
                  src={northIndianKundliImg}
                  alt="northIndianKundli"
                  className="block "
                />
              </div>
              <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
                <h3 className="font-bold text-[18px] leading-[100%]">Chalit</h3>
                <img
                  src={northIndianKundliImg}
                  alt="northIndianKundli"
                  className="block "
                />
              </div>
              <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
                <h3 className="font-bold text-[18px] leading-[100%]">Chalit</h3>
                <img
                  src={northIndianKundliImg}
                  alt="northIndianKundli"
                  className="block "
                />
              </div>
              <div className="border border-[#F2ECF6] p-5 rounded-[10px]">
                <h3 className="font-bold text-[18px] leading-[100%]">Chalit</h3>
                <img
                  src={northIndianKundliImg}
                  alt="northIndianKundli"
                  className="block "
                />
              </div>
            </div>
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

      <section className=" padding50 ">
        <div className="KundliReportBg">
          <div className="container mx-auto   ">
            <KundliReport />
          </div>
        </div>
      </section>

      <section>
        <div className="container padding50">
          <HoroscopeGrid heading="Other zodiac signs" smallText="" />
        </div>
      </section>

      <div className="paddingBottom50"></div>
    </>
  );
};

export default memo(FreeKundliKundliDetailsDashaVimshottari);
