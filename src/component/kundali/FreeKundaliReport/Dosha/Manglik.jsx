import { lazy, memo, Suspense } from "react";

const NotesDosha = lazy(() => import("./NotesDosha"))

function Manglik() {
    const doshaData = [
        {
          title: "No",
          content: "Since Mars is in the tenth house and in the Gemini sign, the person is Non-Manglik.",
          disclaimer: "[This is a computer-generated result. Please consult an Astrologer to confirm & understand this in detail.]"
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
          disclaimer={item.disclaimer}
        />
      ))}
      </Suspense>
    </div>
    </>
  );
}

export default memo(Manglik);
