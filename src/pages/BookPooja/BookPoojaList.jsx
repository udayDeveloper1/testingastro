import SearchSortBar from "../../component/Blog/SearchSortBar";
// import bhumipujaMuhurat from '../../assets/img/banner/bhumipujaMuhurat.webp'
import { useTranslation } from "react-i18next";
import CommonBanner from "../../component/CommonBanner";
import BookPoojaCard from "./BookPoojaCard";
import "../../assets/css/BookPooja.css"

function BookPoojaList() {
  const { t } = useTranslation();

  return (
    <>
      <section>
        <CommonBanner text="" highlight={t("Book_a_Pooja_banner")} />
      </section>

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
    </>
  );
}

export default BookPoojaList;
