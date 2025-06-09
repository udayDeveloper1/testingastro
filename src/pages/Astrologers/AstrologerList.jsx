import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
// import bhumipujaMuhurat from "../../assets/img/banner/bhumipujaMuhurat.webp";
import CommonHeadingSecond from "../../component/Astrologer/CommonHeadingSecond";
import CommonBanner from "../../component/CommonBanner";
import { astrologerList } from "../../services/api/api.services";
import { Codes } from "../../utils/CommonVariable";

// Lazy load these components
const OurAstrologer = lazy(() => import("../../component/Homepage/OurAstrologer"));
const CustomPagination = lazy(() => import("../../component/Pagination/CustomPagination"));

function AstrologerList() {
  const { t } = useTranslation();

  const content2 = [
    "13000+ Best Astrologers from India for Online Consultation",
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  const [astrologersList, setAstrologersList] = useState({
    astrologerList: [],
    totalAstrologerList: 0,
    currentPage: 1,
    perPage: perPage,
  });

  const isFetched = useRef(false);

  useEffect(() => {
    isFetched.current = false; // Reset before fetch

    if (isFetched.current) return;
    isFetched.current = true;

    const request = { page: currentPage, per_page: perPage };

    astrologerList(request).then((response) => {
      if (response?.code === Codes?.SUCCESS) {
        setAstrologersList(response?.data);
      }
    });
  }, [currentPage, perPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    isFetched.current = false;
  };

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text={t("our_astrologer")}
          highlight=""
        />
      </section>

      <section>
        <div className="container mx-auto paddingTop50 paddingBottom100  flex flex-col gap-10">
          <CommonHeadingSecond heading="Our Astrologers" content={content2} />
        </div>
      </section>

      <section>
        <div className="container mx-auto pb-10 flex flex-col gap-10">
          <Suspense fallback={<div className='min-h-[100vh]'></div>}>
            <OurAstrologer
              AstrologerList={astrologersList?.astrologerList}
              viewAll={false}
            />
          </Suspense>
        </div>

        {astrologersList?.totalAstrologerList > astrologersList?.perPage && (
          <Suspense fallback={<></>}>
            <CustomPagination
              current={astrologersList?.currentPage}
              total={astrologersList?.totalAstrologerList}
              onChange={handlePageChange}
              perpage={perPage}
            />
          </Suspense>
        )}
      </section>
    </>
  );
}

export default React.memo(AstrologerList);
