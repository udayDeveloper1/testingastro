import React from "react";
import "../../../assets/css/newHomePage.css"; // Ensure your background image and colors are defined here

const PanchangDetails = ({ date, details }) => {


  return (
    <div className="w-full h-full">
      <div className="panchangDetailHomeBack text-white pb-[20px] pt-[20px] sm:pb-[50px] sm:pt-[50px] ps-[30px] md:ps-[70px]  rounded-[10px] flex flex-col gap-[20px] md:gap-[40px] h-full">
        <h3 className="text-white text-lg sm:text-xl font-semibold">{date}</h3>

        <div className="flex flex-col gap-4">
          {details.map(({ label, value }, index) => (
            <div
              key={index}
              className="flex sm:gap-[36px] text-[15px] sm:text-[16px]"
            >
              <span className="font-bold min-w-[130px] break-all">{label}</span>
              <span className="break-all">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(PanchangDetails);
