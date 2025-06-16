import { lazy, memo, Suspense } from "react";
import bookpooja from "../../assets/img/bookpooja/bookPoojaCard.svg";
const CustomButton = lazy(() => import("../../component/Homepage/CustomButton"));

const BookPoojaCard = () => {
  const dummyPoojas = Array.from({ length: 10 }).map((_, i) => ({
    title: `Pitru dosh nivaran puja`,
    description: `Puja is an ancient Hindu ritual, a sacred act of worshiping...`,
    price: `₹ ${6100 + i * 100}`,
    image: bookpooja,
  }));

  return (
    <>
    <Suspense fallback={<div className='min-h-[100vh]'></div>}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dummyPoojas.map((puja, index) => (
        <div
          key={index}
          className="bg-white rounded-[10px] box_shadow_common flex flex-col transition new_border overflow-hidden relative bookPoojaCard max-h-[441px]"
        >
          {/* Image Section */}
          <div className="w-full overflow-hidden flex-grow">
            <img
              src={puja.image}
              alt={puja.title}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>

          {/* Remove button from content section */}

          {/* Content Section */}
          <div className="p-[20px] flex flex-col gap-[20px]">
            <div className="flex flex-col gap- customBookContDiv">
              <h3 className="commonQuesH3">{puja.title}</h3>
              <p className="text-[14px] new_body_font leading-[21px] font-[400]">
                {puja.description}
              </p>
              <CustomButton className="" parentClassName="customHoverBtn BOOK_NOW_pooja">BOOK NOW</CustomButton>

            </div>
          </div>

          {/* Hover Overlay with single button */}
          <div className="absolute bookPoojaHoverDiv text-white h-full w-full rounded-[10px]">
            <div className="hoverContentWrapper h-full flex flex-col justify-between rounded-[10px] p-[20px]">
              <div className="flex flex-col gap-[20px]">
                <h3 className="commonQuesH3 !text-white">{puja.title}</h3>
                <p className="commonQuesP !text-white mb-4">
                  Pitru Dosh Nivaran Puja is a sacred Hindu ritual performed to
                  appease ancestors and mitigate the effects of Pitru Dosha...
                </p>
              </div>
              {/* <button className="customHoverBtn">BOOK NOW</button> */}
            </div>
          </div>

        </div>
      ))}
    </div>
    </Suspense>
    </>
  );
};

export default memo(BookPoojaCard);
