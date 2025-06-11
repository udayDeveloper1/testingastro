import React from "react";
import astakoot from "../../assets/img/kundali/astakoot.svg"
import manglikMatch from "../../assets/img/kundali/manglikMatch.svg"
import rajjooDosha from "../../assets/img/kundali/rajjooDosha.svg"
import VedaDosh from "../../assets/img/kundali/VedaDosh.svg"



const doshaData = [
  { title: "Ashtakoot", value: "30.5/36", icon:astakoot },
  { title: "Rajjoo Dosha", value: "No", icon: manglikMatch },
  { title: "Vedha Dosha", value: "No", icon: rajjooDosha },
  { title: "Manglik Match", value: "Yes", icon: VedaDosh },
];

function DoshaCard() {
  return (
    <div className=" rounded-lg" >
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Dosha</h2>

      {/* Dosha Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {doshaData.map((dosha, index) => (
          <div
            key={index}
            className="bg-white py-10 px-10 rounded-lg shadow-lg flex flex-col items-center text-center DoshaCard gap-10 justify-between "
          >
            <div className="bg_website_color text-white p-4 rounded-full text-2xl w-[80px] h-[80px] flex items-center justify-center shadow-[0_0_34px_rgba(209,67,80,0.6)]">
                <img src={dosha.icon} alt="" className="object-contain" height={40} width={44}/>
             
            </div>
            <div className="flex flex-col gap-2">
            <h3 className="mt-3 font-semibold">{dosha.title}</h3>
            <p className="commonQuesP">{dosha.value}</p>
            </div>
            
          </div>
        ))}
      </div>

      {/* Recommendation Box */}
      <div className="mt-6 p-4 rounded-lg text-start new_body_font font-bold recommendationBox py-[34px] px-10" >
      Marriage between the prospective bride and groom is highly recommended. The couple would have a long-lasting relationship, which would be filled with happiness and affluence.
      </div>
    </div>
  );
}

export default DoshaCard;
