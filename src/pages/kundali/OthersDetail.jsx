import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { lazy, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CustomButton = lazy(() => import("../../component/Homepage/CustomButton"));
const Ashtakvarg = lazy(() => import("../../component/NewKundaliComp/Others/Ashtakvarg"));
const Shadbal = lazy(() => import("../../component/NewKundaliComp/Others/Shadbal"));
const BhavMadhya = lazy(() => import("../../component/NewKundaliComp/Others/BhavMadhya"));
const Friendship = lazy(() => import("../../component/NewKundaliComp/Others/Friendship"));
const AvkhadaDetails = lazy(() => import("../../component/NewKundaliComp/Others/AvkhadaDetails"));
const GhatakAndFavorite = lazy(() => import("../../component/NewKundaliComp/Others/GhatakAndFavorite"));
const Prasthakvarga = lazy(() => import("../../component/NewKundaliComp/Others/Prasthakvarga"));
const ChalitComp = lazy(() => import("../../component/NewKundaliComp/Others/ChalitComp"));

import DataWrapper from "../../component/Custom/DataWrapper";
import Loader2 from "../../component/loader/Loader2";
import NoDataFound from "../../pages/NoDataFound/NoDataFound";

const OthersDetail = ({ allKundliDetails }) => {
  const { ashtakvarga, shadBala, friendShip } = allKundliDetails || {};
  const { t } = useTranslation();
  const undefine = useSelector((state) => state?.masterSlice?.undefine);
  const items = [
    // Uncomment as per release plan
    // { label: t("Chalit"), key: "1" },
    { label: t("Ashtakvarg"), key: "2" },
    { label: t("Shadbal"), key: "3" },
    // { label: t("Prasthakvarga"), key: "4" },
    // { label: t("Bhav Madhya"), key: "5" },
    { label: t("Friendship"), key: "6" },
    // { label: t("Avkhada details"), key: "7" },
    // { label: t("Ghatak and favorite"), key: "8" },
    // { label: t("Download PDF"), key: "9", disabled: true },
  ];

  const [activeItem, setActiveItem] = useState(items[0]);

  const handleMenuClick = ({ key }) => {
    const selected = items.find((item) => item.key === key);
    if (selected) setActiveItem(selected);
  };

  const renderComponentByKey = (key) => {
    switch (key) {
      case "2":
        if (!ashtakvarga) return <Loader2 />;
        if (Object.keys(ashtakvarga || {}).length === 0)
          return <NoDataFound message="Ashtakvarg data not found." />;
        return <Ashtakvarg ashtakvarga={ashtakvarga} />;

      case "3":
        if (!shadBala) return <Loader2 />;
        if (Object.keys(shadBala || {}).length === 0)
          return <NoDataFound message="Shadbal data not found." />;
        return <Shadbal shadBala={shadBala} />;

      case "6":
        if (!friendShip) return <Loader2 />;
        if (Object.keys(friendShip || {}).length === 0)
          return <NoDataFound message="Friendship data not found." />;
        return <Friendship friendShip={friendShip} />;

      case "1":
        return <ChalitComp />;
      case "4":
        return <Prasthakvarga />;
      case "5":
        return <BhavMadhya />;
      case "7":
        return <AvkhadaDetails />;
      case "8":
        return <GhatakAndFavorite />;
      default:
        return null;
    }
  };

  return (
    <DataWrapper data={allKundliDetails} undefine={undefine}>
      <section>
        <div className="container py-6">
          <div className="w-full flex justify-start">
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
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

      <div className="mt-4 commonPadMarBottomClass">
        {renderComponentByKey(activeItem.key)}
      </div>
    </DataWrapper>
  );
};

export default memo(OthersDetail);
