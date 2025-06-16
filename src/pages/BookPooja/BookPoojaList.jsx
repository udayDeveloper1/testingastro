import { useTranslation } from "react-i18next";
import "../../assets/css/BookPooja.css"
import { lazy, memo, Suspense } from "react";

const SearchSortBar = lazy(() => import("../../component/Blog/SearchSortBar"));
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const BookPoojaCard = lazy(() => import("./BookPoojaCard"));

function BookPoojaList() {
  const { t } = useTranslation();

  return (
    <>
    
      <section>
        <CommonBanner text="" highlight={t("Book_a_Pooja_banner")} />
      </section>
    <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <div className="container mx-auto paddingTop50 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <SearchSortBar
              // value={searchInput}
              // showSearchInput={true}
              // searchValue={searchInput}
              // onSearchChange={handleSearchChange}
              placeholder={t("search Blog")}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto padding100 flex flex-col gap-10">
          <BookPoojaCard />
        </div>
      </section>
      </Suspense>
    </>
  );
}

export default memo(BookPoojaList);
