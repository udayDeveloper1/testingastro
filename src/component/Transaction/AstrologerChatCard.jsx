import React from "react";
import {
  StarFilled,
  ShareAltOutlined,
  WechatWorkOutlined,
} from "@ant-design/icons";
import CustomWhiteButton from "../Homepage/CustomWhiteButton";
import Loader2 from "../loader/Loader2";
import Loader3 from "../loader/Loader3";
import messageIcon from '../../assets/img/Profile/message.svg'


// import { PATHS } from "../../routers/Paths";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

function AstrologerChatCard({ astro, historyType, handleChat = () => { } }) {
  const { t } = useTranslation()

  return (
    <div className="w-full  bg-white  rounded-[10px] overflow-hidden AstroChatCard flex flex-col justify-between ">
      {/* Top header */}
      <div className="commonLightBack p-4 flex items-center gap-4">
        {astro.receiver_profile ? (
          <img
            src={astro.receiver_profile}
            alt={astro.name}
            className="w-16 h-16 rounded-full object-cover shadow-[0px_0px_14px_0px_#00000040]"
          />
        ) : (
          <div className="w-16 h-16 rounded-full  relative">
            <Loader3 classList="shadow-[0px_0px_14px_0px_#00000040] zoom-[0.5] scale-[0.5]" />
          </div>
        )}
        <div className="flex-1 flex flex-col gap-2">
          <p className="font-semibold text-[18px] mb-0">{astro.receiver_name
          }</p>
          <div className="flex items-center text-yellow-500 text-xs ">
            {[...Array(5)].map((_, idx) => (
              <StarFilled key={idx} className="text-yellow-400 text-xs" />
            ))}
          </div>
          <p className="website_color text-[16px] font-semibold mb-0">
            ₹ {astro?.receiver_price_per_min}/min
          </p>
        </div>
        
      </div>

      {/* Content section */}
      <div className="p-4  space-y-1 flex flex-col gap-3">
        <p className="commonQuesP !font-medium ">
          Order Id: <span className="font-[400]">{astro?.random_id}</span>
        </p>
        <p className="commonQuesP !font-medium ">{astro?.dateTime}</p>
       
        <p className="commonQuesP !font-medium ">
          Rate: ₹  <span className="font-[400]">{astro?.receiver_price_per_min}/min</span>
        </p>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-4">
        <div className="flex gap-2 mb-3">
          {historyType === "Chat" && (
            <CustomWhiteButton
              className={` w-full  border  rounded-md text-[14px] font-semibold px-5 py-2`}
              onClick={(e) => handleChat(e, astro)}
            >
              <img src={messageIcon} alt="" />
              {t('chat')}
            </CustomWhiteButton>
          )}
        
        </div>
        
      </div>
    </div>
  );
}

export default AstrologerChatCard;
