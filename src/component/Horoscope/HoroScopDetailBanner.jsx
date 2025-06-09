
const HoroScopDetailBanner = ({ horoscopeListTab, active, onTabChange = () => { } }) => {
  const totalTabs = Object.keys(horoscopeListTab).length;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3  overflow-hidden">
      {Object.entries(horoscopeListTab).map(([idx, item], index) => {
        const isActive = active === item.period;

        const baseClasses = "flex items-center justify-center gap-4 p-4 sm:px-6 sm:py-6 md:px-8 lg:px-10 xl:px-[60px] cursor-pointer transition-all duration-200 ";
        const bgClasses = isActive ? " text-white activeImage" : " gradient-text";
        const roundClasses =
          index === 0
            ? "md:rounded-l-xl md:rounded-r-none"
            : index === totalTabs - 1
              ? "md:rounded-r-xl md:rounded-l-none"
              : "md:rounded-none";

        return (
          <div
            key={idx}
            onClick={() => onTabChange(item)}
            className={`bg_light_back h-full flex items-center justify-center ${roundClasses} ${isActive ? "gradient-background" : ""}`}
          >
            <div className={`${baseClasses} ${bgClasses} `}>
              <span className="text-sm sm:text-base md:text-[16px] font-semibold leading-snug text-center">
                {item.period}
              </span>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default HoroScopDetailBanner;









// import React from "react";

// const HoroScopDetailBanner = ({
//   horoscopeListTab,
//   active,
//   onTabChange = () => {},
// }) => {
//   const totalTabs = Object.keys(horoscopeListTab).length;
//   const isActive = (item) => active === item.period;

//   return (
//     <div className="w-full">
//       {/* Scrollable Tab Bar for Mobile */}
//       <div className="flex sm:hidden overflow-x-auto gap-3 pb-2 no-scrollbar">
//         {Object.entries(horoscopeListTab).map(([idx, item]) => (
//           <div
//             key={idx}
//             onClick={() => onTabChange(item)}
//             className={`whitespace-nowrap px-4 py-2 flex-shrink-0 rounded-full border font-medium text-sm cursor-pointer ${
//               isActive(item)
//                 ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {item.period}
//           </div>
//         ))}
//       </div>

//       {/* Grid Layout for Larger Screens */}
//       <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-3 sm:mt-0">
//         {Object.entries(horoscopeListTab).map(([idx, item], index) => {
//           const roundClasses =
//             index === 0
//               ? "md:rounded-l-xl md:rounded-r-none"
//               : index === totalTabs - 1
//               ? "md:rounded-r-xl md:rounded-l-none"
//               : "md:rounded-none";

//           return (
//             <div
//               key={idx}
//               onClick={() => onTabChange(item)}
//               className={`bg_light_back h-full flex items-center justify-center ${roundClasses} ${
//                 isActive(item) ? "gradient-background" : ""
//               }`}
//             >
//               <div
//                 className={`flex items-center justify-center gap-4 p-4 sm:px-6 sm:py-6 md:px-8 lg:px-10 xl:px-[60px] cursor-pointer transition-all duration-200 ${
//                   isActive(item) ? "text-white activeImage" : "gradient-text"
//                 }`}
//               >
//                 <span className="text-sm sm:text-base md:text-[16px] font-semibold leading-snug text-center">
//                   {item.period}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default HoroScopDetailBanner;
