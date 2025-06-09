import BookPoojaCard from "./BookPoojaCard";

const BookPoojaCardList = () => {
  const dummyPoojas = Array.from({ length: 10 }).map((_, i) => ({
    title: `Pooja #${i + 1}`,
    description: `This is a description for Pooja #${i + 1}`,
    price: `₹ ${6100 + i * 100}`,
  }));

  return (
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
  );
};

export default BookPoojaCardList;
