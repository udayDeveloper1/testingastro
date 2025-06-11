import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  lazy,
  Suspense,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import bhumipujaMuhurat from "../../assets/img/banner/bhumipujaMuhurat.webp";
// import { PATHS } from "../../routers/Paths";
import {
  getAstrologerList,
  getFilterListing,
  setOnSubmitFilter,
} from "../../storemain/slice/MasterSlice";
import {
  closeFilter,
  closeLoder,
  openLoader,
} from "../../utils/CommonFunction";
import { Constatnt } from "../../utils/Constent";
import useDebounce from "../hooks/useDebounce";
import NotificationCard from "./NotificationCard";
import { UpdatedPaths } from "../../routers/Paths";
import NoDataFound from "../NoDataFound/NoDataFound";

// Lazy load heavy components
const CommonBalanceBar = lazy(() => import("../../component/CommonBalanceBar"));
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const ChatWithAstrologerCard = lazy(() =>
  import("../../component/CommonChatTalkAstrologerCard")
);
const CommonQuestionComp = lazy(() =>
  import("../../component/CommonQuestionComp")
);
const HomeFAQs = lazy(() => import("../../component/Homepage/HomeFAQs"));
const CustomPagination = lazy(() =>
  import("../../component/Pagination/CustomPagination")
);

function AstrologerListPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const PATHS = UpdatedPaths()

  // Redux state selectors
  const loginUser = useSelector((state) => state?.masterSlice?.loginUser);
  const filterValue = useSelector((state) => state?.masterSlice?.filter_value);
  const shortValue = useSelector((state) => state?.masterSlice?.sort_by_value);
  const { contentList: data } = useSelector(state => state?.masterSlice?.getFilterList)
  const onSubmitFilter = useSelector(
    (state) => state?.masterSlice?.onSubmitFilter
  );
  const filterSearchValue = useSelector(
    (state) => state?.masterSlice?.filter_search
  );
  const astrologersList = useSelector((state) => state?.masterSlice?.astrologerListData);
  const loder = useSelector((state) => state?.masterSlice?.loader);

  // Local states
  const isFetched = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(Constatnt?.PER_PAGE_DATA);

  // Debounced values for filtering/searching
  const debounceSort = useDebounce(
    typeof shortValue === "string" && shortValue.trim()
      ? shortValue.trim()
      : "",
    1000
  );
  const debounceSearch = useDebounce(
    typeof filterSearchValue === "string" && filterSearchValue.trim()
      ? filterSearchValue.trim()
      : "",
    500
  );

  const fetchAstrologers = useCallback(() => {
    openLoader(dispatch, "chat_with_astrologer");

    let request = {
      page: currentPage,
      per_page: perPage,
      search: filterSearchValue,
      skill: filterValue?.Skill ? [filterValue.Skill] : [],
      category: [],
      languageFilter: filterValue?.Language
        ? [filterValue.Language]
        : [],
      gender: filterValue?.Gender ? [filterValue.Gender] : [],
      country: filterValue?.Country ? [filterValue.Country] : [],
      offer: [],
      topAstrologer: [],
      sortBy: shortValue ? [String(shortValue)] : [],
    };

    dispatch(getAstrologerList(request));
    closeFilter(dispatch);
    dispatch(setOnSubmitFilter(false));
    closeLoder(dispatch);
  }, [
    dispatch,
    currentPage,
    perPage,
    filterSearchValue,
    filterValue,
    shortValue,
  ]);

  useEffect(() => {
    fetchAstrologers();
  }, [fetchAstrologers]);

  // Reset page on filter/search change
  useEffect(() => {
    if (filterSearchValue.trim() || onSubmitFilter || filterValue) {
      setCurrentPage(1);
      isFetched.current = false;
    }
  }, [filterSearchValue, onSubmitFilter, filterValue]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    isFetched.current = false;
  };

  // const { t } = useTranslation()

  useEffect(() => {
    if (!data?.length) {
      dispatch(getFilterListing());
    }
  }, [astrologersList]);

  return (
    <>
      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
        <section>
          <CommonBanner
            // backgroundImage={bhumipujaMuhurat}
            text={t("our_astrologer")}
            highlight=""
          />
        </section>
      </Suspense>

      <Suspense fallback={<></>}>
        <section>
          <div className="container mx-auto paddingTop50 flex flex-col gap-5">
            <CommonBalanceBar
              balance={loginUser?.loginUserData?.total_wallet_balance || 0}
              onSearch={(e) => { }}
              onRecharge={() => navigate(PATHS?.MONEY_WALLET)}
              onFilter={() => { }}
              onSort={() => { }}
            />
          </div>
        </section>
      </Suspense>

      {/* <Suspense fallback={<div>Loading astrologers...</div>}> */}
      <section className="">
        <div className="container mx-auto paddingBottom50 pt-[10px] md:pt-[50px] flex flex-col gap-5">
          {/* <ChatWithAstrologerCard
            astrologersList={astrologersList?.astrologerList}
            loading={loder?.loding_type}
          /> */}
          {astrologersList?.astrologerList?.length > 0 ? (
            <ChatWithAstrologerCard
              astrologersList={astrologersList?.astrologerList}
            />
          ) : (
            <div className='w-full flex justify-center items-center py-10'>
              <NoDataFound />
            </div>
          )}
        </div>

        {astrologersList?.totalAstrologerList > astrologersList?.perPage && (
          <CustomPagination
            current={astrologersList?.currentPage}
            total={astrologersList?.totalAstrologerList}
            onChange={handlePageChange}
            perpage={perPage}
          />
        )}
      </section>

      <Suspense fallback={<></>}>
        <section className="">
          <div className="container mx-auto padding50 flex flex-col gap-5">
            <CommonQuestionComp
              heading={t('How_Chatting_with_an_astrologer_can_help_you')}
              content={[t('astro_para')]}
            />
          </div>
        </section>
      </Suspense>

      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('About_Astrology')}
        subHeading={''}
      />
      {/* </Suspense> */}
    </>
  );
}

export default AstrologerListPage;
