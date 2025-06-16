import { lazy, memo, Suspense } from "react";

const BookPoojaCard = lazy(() => import("./BookPoojaCard"));
const BookPoojaCardList = () => {
  const dummyPoojas = Array.from({ length: 10 }).map((_, i) => ({
    title: `Pooja #${i + 1}`,
    description: `This is a description for Pooja #${i + 1}`,
    price: `₹ ${6100 + i * 100}`,
  }));

  return (
     <Suspense fallback={<div className='min-h-[100vh]'></div>}>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {dummyPoojas.map((puja, index) => (
        <BookPoojaCard
          key={index}
          title={puja.title}
          description={puja.description}
          price={puja.price}
        />
      ))}
    </div>
    </Suspense>
  );
};

export default memo(BookPoojaCardList);
