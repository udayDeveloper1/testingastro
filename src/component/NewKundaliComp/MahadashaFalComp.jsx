import React from "react";

const dashaPhalData = [
  {
    title: "MARS Mahadasha Phal (Birth - May 10, 2027)",
    content:
      "Your MARS is in Gemini sign which is a Enemy sign for MARS. MARS is lord of 12,2 house and situated in 2nd House. MARS aspects 5th, 8th, 9th house and aspected by MERCURY. This is not a favorable time for financial gains. There can be a bad news in your family. Family disputes may also disturb your peace of mind. You may get in trouble because of your own harsh words or speech. There may be some bad news regarding business. Heavy losses are indicated. Health problem may disturb you.",
  },
  {
    title: "RAHU Mahadasha Phal (May 10, 2027 - May 10, 2045)",
    content:
      "Your RAHU is in Pisces Sign. RAHU is situated in 11th House. RAHU aspects 3rd, 5th, 7th house and aspected by KETU. During this period you will be courageous and rise to a high level. You will enjoy conjugal happiness during this time. Your contacts with influential people will definitely increase. Your opponents will lack conviction and courage to face you. Long distance travel is going to be beneficial. For love and romance this is going to be a boon. You will be heroic in strife and overcome your enemies. Minor ailment can be seen. Family relation will be quite satisfactory. Though relationship with your children may not be good.",
  },
  {
    title: "RAHU Mahadasha Phal (May 10, 2027 - May 10, 2045)",
    content:
      "Your RAHU is in Pisces Sign. RAHU is situated in 11th House. RAHU aspects 3rd, 5th, 7th house and aspected by KETU. During this period you will be courageous and rise to a high level. You will enjoy conjugal happiness during this time. Your contacts with influential people will definitely increase. Your opponents will lack conviction and courage to face you. Long distance travel is going to be beneficial. For love and romance this is going to be a boon. You will be heroic in strife and overcome your enemies. Minor ailment can be seen. Family relation will be quite satisfactory. Though relationship with your children may not be good.",
  },
  {
    title: "RAHU Mahadasha Phal (May 10, 2027 - May 10, 2045)",
    content:
      "Your RAHU is in Pisces Sign. RAHU is situated in 11th House. RAHU aspects 3rd, 5th, 7th house and aspected by KETU. During this period you will be courageous and rise to a high level. You will enjoy conjugal happiness during this time. Your contacts with influential people will definitely increase. Your opponents will lack conviction and courage to face you. Long distance travel is going to be beneficial. For love and romance this is going to be a boon. You will be heroic in strife and overcome your enemies. Minor ailment can be seen. Family relation will be quite satisfactory. Though relationship with your children may not be good.",
  },
  {
    title: "RAHU Mahadasha Phal (May 10, 2027 - May 10, 2045)",
    content:
      "Your RAHU is in Pisces Sign. RAHU is situated in 11th House. RAHU aspects 3rd, 5th, 7th house and aspected by KETU. During this period you will be courageous and rise to a high level. You will enjoy conjugal happiness during this time. Your contacts with influential people will definitely increase. Your opponents will lack conviction and courage to face you. Long distance travel is going to be beneficial. For love and romance this is going to be a boon. You will be heroic in strife and overcome your enemies. Minor ailment can be seen. Family relation will be quite satisfactory. Though relationship with your children may not be good.",
  },
  {
    title: "RAHU Mahadasha Phal (May 10, 2027 - May 10, 2045)",
    content:
      "Your RAHU is in Pisces Sign. RAHU is situated in 11th House. RAHU aspects 3rd, 5th, 7th house and aspected by KETU. During this period you will be courageous and rise to a high level. You will enjoy conjugal happiness during this time. Your contacts with influential people will definitely increase. Your opponents will lack conviction and courage to face you. Long distance travel is going to be beneficial. For love and romance this is going to be a boon. You will be heroic in strife and overcome your enemies. Minor ailment can be seen. Family relation will be quite satisfactory. Though relationship with your children may not be good.",
  },
  // Add more entries as needed
];

export default function MahadashaFalComp({ mahaDashaPrediction }) {
  return (
    <div className=" bg-white  rounded-[10px]  flex flex-col gap-[30px]">

      <h2 className="text-[18px] font-semibold new_body_font  border-b commonLightBorderBottom border-opacity-30 pb-3">
        {mahaDashaPrediction?.translated_mahadasha}
      </h2>

      <div className="">
        {mahaDashaPrediction?.dashas?.length > 0 && mahaDashaPrediction?.dashas?.map((item, index) => (
          <div key={index} className="space-y-2 new_border_bottom pb-[30px] mb-[30px]">
            <h3 className="text-[18px] font-bold text- py-[10px] new_body_font">
              {item?.dasha + ' ' + '( ' + item?.dasha_start_year + ' - ' + item?.dasha_end_year + ')'}
            </h3>
            <p className="commonQuesP  leading-relaxed">
              {item?.prediction || '-'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
