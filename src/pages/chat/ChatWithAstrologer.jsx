import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import chatWithAstrologerBg from '../../assets/img/chat/chatWithAstrologerBanner.webp'
import { useTranslation } from "react-i18next";
import CommonBalanceBar from "../../component/CommonBalanceBar";
import CommonBanner from "../../component/CommonBanner";
import ChatWithAstrologerCard from "../../component/CommonChatTalkAstrologerCard";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import HomeFAQs from "../../component/Homepage/HomeFAQs";
import CustomPagination from "../../component/Pagination/CustomPagination";
import {
  getAstrologerList,
  setOnSubmitFilter,
} from "../../storemain/slice/MasterSlice";
import { closeFilter, closeLoder } from "../../utils/CommonFunction";
import { Constatnt } from "../../utils/Constent";
import useDebounce from "../hooks/useDebounce";

function ChatWithAstrologer() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
// --------------------------- All Redux --------------------------------------------------------

  const homapageList =
    useSelector((state) => state.HomePageSlice?.homapageList) || {};
  const homapageData = homapageList?.data || [];

  const { is_login, loginUserData } = useSelector(
    (state) => state?.masterSlice?.loginUser
  );

  const filterValue = useSelector((state) => state?.masterSlice?.filter_value);
  const shortValue = useSelector((state) => state?.masterSlice?.sort_by_value);

  const onSubmitFilter = useSelector(
    (state) => state?.masterSlice?.onSubmitFilter
  );
  const filterSearchValue = useSelector(
    (state) => state?.masterSlice?.filter_search
  );
  const astrologersList = useSelector(
    (state) => state?.masterSlice?.astrologerListData
  );

  // --------------------------- All state --------------------------------------------------------

  const isFetched = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setParPage] = useState(Constatnt.PER_PAGE_DATA);

  const debounce = useDebounce(
    typeof shortValue === "string" && shortValue?.trim()
      ? shortValue?.trim()
      : "",
    100
  );

  const searchDebounce = useDebounce(
    typeof filterSearchValue === "string" && filterSearchValue?.trim()
      ? filterSearchValue?.trim()
      : "",
    500
  );

  // ---------------------- AstrologerList Api Calling Start -----------------------------------------

  const fetchAstrologers = useCallback(() => {
    // if (isFetched.current) return;
    // isFetched.current = true;

    let request = {
      page: currentPage,
      per_page: perPage,
      search: filterSearchValue,
    };

    request = {
      ...request,
      skill: filterValue?.Skill ? [filterValue?.Skill] : [],
      category: [], // Adjust if needed
      languageFilter: filterValue?.Language ? [filterValue?.Language] : [],
      gender: filterValue?.Gender ? [filterValue?.Gender] : [],
      country: filterValue?.Country ? [filterValue?.Country] : [],
      offer: [],
      topAstrologer: [],
      sortBy: shortValue ? [String(shortValue)] : [],
    };
    dispatch(getAstrologerList(request));
    closeFilter(dispatch);
    dispatch(setOnSubmitFilter(false));
    closeLoder(dispatch);
  }, [onSubmitFilter, dispatch, currentPage, debounce, searchDebounce]);

  useEffect(() => {
    fetchAstrologers();
  }, [fetchAstrologers]);

  useEffect(() => {
    if (filterSearchValue.trim() || onSubmitFilter || filterValue) {
      setCurrentPage(1);
    }
  }, [filterSearchValue, onSubmitFilter, debounce, filterValue]);

  // ---------------------- Pagination -----------------------------------------

  const handlePageChange = (page) => {
    setCurrentPage(page);
    isFetched.current = false;
  };

  // ---------------------- All Logs --------------------------------------------

  return (
    <>
      <section>
        <CommonBanner text={t("Chat_With")} highlight={t("Astrologer")} />
      </section>

      <section>
        <div className="container mx-auto paddingTop50 flex flex-col gap-5 pb-5">
          <CommonBalanceBar
            balance={loginUserData?.total_wallet_balance}
            onSearch={(e) => {}}
            onRecharge={() => {}}
            onFilter={() => {}}
            onSort={() => {}}
          />
        </div>
      </section>

      <section className=''>
        <div className='container mx-auto paddingBottom50 pt-0 md:pt-[50px] flex flex-col gap-5 '>
          <ChatWithAstrologerCard
            astrologersList={
              astrologersList?.astrologerList?.length > 0 &&
              astrologersList?.astrologerList
            }
          />
          {astrologersList?.totalAstrologerList > astrologersList?.perPage && (
            <div className="pt-5">
              <CustomPagination
                current={astrologersList?.currentPage}
                total={astrologersList?.totalAstrologerList}
                onChange={handlePageChange}
                perpage={perPage}
              />
            </div>
          )}
        </div>
      </section>

      <section className='faqBackColor'>
        <div className='container mx-auto paddingTop50  flex flex-col gap-5 '>
          <CommonQuestionComp
            heading={t("How_Chatting_with_an_astrologer_can_help_you")}
            content={[t("astro_para")]}
          />
        </div>
        <div className="container mx-auto padding50  flex flex-col gap-5 ">
          <CommonQuestionComp
            heading={t("How_Chatting_with_an_astrologer_can_help_you2")}
            content={[t("astro_para2")]}
          />
        </div>
      </section>

      <HomeFAQs
        text={t("FAQs")}
        highlightText={t("chat_with_astrologer")}
        subHeading={""}
      />
    </>
  );
}

export default ChatWithAstrologer;
