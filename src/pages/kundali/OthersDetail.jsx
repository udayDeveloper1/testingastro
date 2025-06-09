import React, { lazy, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const CustomButton = lazy(() => import('../../component/Homepage/CustomButton'))
import Ashtakvarg from "../../component/NewKundaliComp/Others/Ashtakvarg";
import Shadbal from "../../component/NewKundaliComp/Others/Shadbal";
import BhavMadhya from "../../component/NewKundaliComp/Others/BhavMadhya";
import Friendship from "../../component/NewKundaliComp/Others/Friendship";
import AvkhadaDetails from "../../component/NewKundaliComp/Others/AvkhadaDetails";
import GhatakAndFavorite from "../../component/NewKundaliComp/Others/GhatakAndFavorite";
import Prasthakvarga from "../../component/NewKundaliComp/Others/Prasthakvarga";
import ChalitComp from "../../component/NewKundaliComp/Others/ChalitComp";
import { useTranslation } from "react-i18next";

// Individual components


const OthersDetail = ({ allKundliDetails }) => {
  const { ashtakvarga, shadBala, friendShip } = allKundliDetails;
  const { t } = useTranslation()


  const items = [
    // { label: "Chalit", key: "1" },
    { label: t('Ashtakvarg'), key: "2" },
    { label: t('Shadbal'), key: "3" },
    // { label: "Prasthakvarga", key: "4" },
    // { label: "Bhav Madhya", key: "5" },
    { label: t('Friendship'), key: "6" },
    // { label: "Avkhada details", key: "7" },
    // { label: "Ghatak and favorite", key: "8" },
    // { label: "Download pdf", key: "9", disabled: true },
  ];

  const componentsMap = {
    "1": <ChalitComp />,
    "2": <Ashtakvarg ashtakvarga={ashtakvarga} />,
    "3": <Shadbal shadBala={shadBala} />,
    "4": <Prasthakvarga />,
    "5": <BhavMadhya />,
    "6": <Friendship friendShip={friendShip} />,
    "7": <AvkhadaDetails />,
    "8": <GhatakAndFavorite />,
  };

  const [activeItem, setActiveItem] = useState(items[0]);

  const handleMenuClick = ({ key }) => {
    const selected = items.find((item) => item.key === key);
    if (selected) setActiveItem(selected);
  };

  return (
    <>
      <section>
        <div className="container py-6">
          <div className="w-full flex justify-start">
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}

              overlayClassName="custom-dropdown"
            >
              <CustomButton className="bg-[#7834C6] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#692BB1] transition-all">
                <Space>
                  {activeItem.label}
                  <DownOutlined />
                </Space>
              </CustomButton>
            </Dropdown>
          </div>
        </div>
      </section>

      <div className=" mt-4 commonPadMarBottomClass">{componentsMap[activeItem.key]}</div>
    </>
  );
};

export default OthersDetail;
