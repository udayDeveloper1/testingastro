import { lazy, memo, Suspense } from "react";
const NotesDosha = lazy(() => import("./NotesDosha"))

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

        <Suspense fallback={<></>}>
        {doshaData.map((item, index) => (
          <NotesDosha
            key={index}
            title={item.title}
            subTitle={item.subTitle}
            content={item.content}
          />
        ))}
        </Suspense>
      </div>
    </>
  );
}

export default memo(Kalpasara);
