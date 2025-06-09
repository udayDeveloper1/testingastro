import React from "react";
import NotesDosha from "./NotesDosha";

function Kalpasara() {
  const doshaData = [
    {
      title: "No",
      subTitle: "",
      content: "Kundli is free from Kalsharpa Dosha.",
    },
  ];

  return (
    <>
      <div>
        <h2 className="commonQuesH2">Manglik Analysis</h2>

        {doshaData.map((item, index) => (
          <NotesDosha
            key={index}
            title={item.title}
            subTitle={item.subTitle}
            content={item.content}
          />
        ))}
      </div>
    </>
  );
}

export default Kalpasara;
