import React, { lazy, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Lazy-loaded components
const CommonBalanceBar = lazy(() => import("../../component/CommonBalanceBar"));
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const ChatWithAstrologerCard = lazy(() => import("../../component/CommonChatTalkAstrologerCard"));
const CommonQuestionComp = lazy(() => import("../../component/CommonQuestionComp"));
const HomeBlog = lazy(() => import("../../component/Homepage/HomeBlog"));
const HomeFAQs = lazy(() => import("../../component/Homepage/HomeFAQs"));
const CustomPagination = lazy(() => import("../../component/Pagination/CustomPagination"));

// Services & utils (no lazy loading)
import { getAstrologerList, setOnSubmitFilter } from "../../storemain/slice/MasterSlice";
import { closeFilter, closeLoder } from "../../utils/CommonFunction";
import { Constatnt } from "../../utils/Constent";
import useDebounce from "../hooks/useDebounce";


function TalkWithAstrologer() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --------------------------- All Redux --------------------------------------------------------

  const homapageList = useSelector((state) => state.HomePageSlice?.homapageList) || {};
  const {  loginUserData } = useSelector(state => state?.masterSlice?.loginUser)

  const filterValue = useSelector((state) => state?.masterSlice?.filter_value);
  const shortValue = useSelector((state) => state?.masterSlice?.sort_by_value);
  const onSubmitFilter = useSelector((state) => state?.masterSlice?.onSubmitFilter);
  const filterSearchValue = useSelector(state => state?.masterSlice?.filter_search);
  const astrologersList = useSelector((state) => state?.masterSlice?.astrologerListData);

  // --------------------------- All state --------------------------------------------------------

  const isFetched = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setParPage] = useState(Constatnt.PER_PAGE_DATA);
  // const [astrologersList, setAstrologersList] = useState(); // State for the current page

  const debounce = useDebounce(typeof shortValue === "string" && shortValue?.trim() ? shortValue?.trim() : "", 100);
  const searchDebounce = useDebounce(typeof filterSearchValue === "string" && filterSearchValue?.trim() ? filterSearchValue?.trim() : "", 500);

  // ---------------------- AstrologerList Api Calling Start -----------------------------------------

  const fetchAstrologers = useCallback(() => {
    // if (isFetched.current) return;
    // isFetched.current = true;

    let request = { page: currentPage, per_page: perPage, search: filterSearchValue };

    request = {
      ...request,
      skill: filterValue?.Skill ? [filterValue?.Skill?.toLowerCase()] : [],
      category: [], // Adjust if needed
      languageFilter: filterValue?.Language ? [filterValue?.Language.toLowerCase()] : [],
      gender: filterValue?.Gender ? [filterValue?.Gender.toLowerCase()] : [],
      country: filterValue?.Country ? [filterValue?.Country.toLowerCase()] : [],
      offer: [],
      topAstrologer: [],
      sortBy: shortValue ? [String(shortValue).toLowerCase()] : [],
    };
    dispatch(getAstrologerList(request))
    closeFilter(dispatch)
    dispatch(setOnSubmitFilter(false));
    closeLoder(dispatch)
  }, [onSubmitFilter, dispatch, currentPage, debounce, searchDebounce]);

  useEffect(() => {
    fetchAstrologers();
  }, [fetchAstrologers, t]);

  useEffect(() => {
    if (filterSearchValue.trim() || onSubmitFilter || filterValue) {
      setCurrentPage(1)
    }
  }, [filterSearchValue, onSubmitFilter, debounce, filterValue])

  // ---------------------- Pagination -----------------------------------------

  const handlePageChange = (page) => {
    setCurrentPage(page);
    isFetched.current = false;
  };

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={talkWithAstrologerBg}
          text={t('Talk_to')}
          highlight={` ${t('Astrologer')}`}
        />
      </section>
      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <CommonBalanceBar
            balance={loginUserData?.total_wallet_balance}
            onSearch={e => { }}
            onRecharge={() => { }}
            onFilter={() => { }}
            onSort={() => { }}
          />
        </div>
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5">
          <ChatWithAstrologerCard
            astrologersList={astrologersList?.astrologerList}
          />
          {
            astrologersList?.totalAstrologerList > astrologersList?.perPage &&
            <CustomPagination
              current={astrologersList?.currentPage}
              total={astrologersList?.totalAstrologerList}
              onChange={handlePageChange}
              perpage={perPage}
            />
          }
        </div>
      </section>
      {/* <OurAstrologer /> */}
      <HomeBlog />

      <section className="">
        <div className="container mx-auto padding50  flex flex-col gap-5 ">
          <CommonQuestionComp
            heading={t('How_Chatting_with_an_astrologer_can_help_you')}
            content={t('astro_para', { returnObjects: true })}
          />
        </div>
      </section>

      <HomeFAQs
        text={t('Frequently_Asked_Questions')}
        highlightText='Talk to Astrologer'
        subHeading={t('All_you_need_to_know_about_Guna_Milan_Kundli_Milan')}
      />

   
    </>
  );
}

export default React.memo(TalkWithAstrologer);
