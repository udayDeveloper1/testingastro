import React from "react";

function LifeStone({ stones }) {
  return (
    <div className="life-stone-container ">
      {stones.map((stone, index) => (
        <div
          key={index}
          className={`py-4  rounded-md ${
            index !== stones.length - 1 ? "border-b border-gray-300 pb-8" : ""
          }`}
        >
          {/* Dynamic Main Title inside the loop */}
          <h2 className="commonQuesH2 pb-4">{stone.mainTitle}</h2>

          {/* Dynamic Subtitle inside the loop */}
          <p className="!font-bold commonQuesP pb-3">
            Life Stone for {stone.sign} ({stone?.lagna})
          </p>

          <p className="commonQuesP pb-7">{stone.description}</p>

          <div className="bg-[#F2ECF6] p-4  rounded-md">
            <table className="w-full text-left new_body_font font-bold">
              <tbody>
                <tr>
                  <td className=" py-2 commonQuesP">Life stone</td>
                  <td className="py-2 commonQuesP">{stone.gem}</td>
                </tr>
                <tr>
                  <td className=" py-2 commonQuesP">How to wear</td>
                  <td className="py-2 commonQuesP">{stone.howToWear}</td>
                </tr>
                <tr>
                  <td className=" py-2 commonQuesP">Mantra</td>
                  <td className="py-2 commonQuesP">{stone.mantra}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LifeStone;
