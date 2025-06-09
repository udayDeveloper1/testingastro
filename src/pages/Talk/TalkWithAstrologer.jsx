import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// import talkWithAstrologerBg from "../../assets/img/talk/talkwithAstro.webp";
import CommonBalanceBar from "../../component/CommonBalanceBar";
import CommonBanner from "../../component/CommonBanner";
import ChatWithAstrologerCard from "../../component/CommonChatTalkAstrologerCard";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import HomeBlog from "../../component/Homepage/HomeBlog";
import HomeFAQs from "../../component/Homepage/HomeFAQs";
import CustomPagination from "../../component/Pagination/CustomPagination";
import { astrologerList } from "../../services/api/api.services";
import { Codes } from "../../utils/CommonVariable";
import useDebounce from "../hooks/useDebounce";
import { getAstrologerList, setOnSubmitFilter } from "../../storemain/slice/MasterSlice";
import { closeFilter, closeLoder } from "../../utils/CommonFunction";
import { Constatnt } from "../../utils/Constent";

function TalkWithAstrologer() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --------------------------- All Redux --------------------------------------------------------

  const homapageList = useSelector((state) => state.HomePageSlice?.homapageList) || {};
  const homapageData = homapageList?.data || [];
  const { is_login, loginUserData } = useSelector(state => state?.masterSlice?.loginUser)

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
  }, [fetchAstrologers]);

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

  const content = [
    `You don't always get along like a blaze on flames with people, but when you're with that "special person," you feel happy and in control of the situation. We encounter numerous people throughout life. One person would be your life partner out of all those who may be terrific friends or mentors for you. You must make the appropriate choice for that person. They must make you feel at home, never depressed or too uncared for.`,
    "Do you believe your heart might have jumped a beat if you had met that particular someone? If so, find out what your Sun sign conspires to have you do by checking your zodiac sign love compatibility.",
    "Zodiac sign compatibility reveals more than just compatibility in romantic relationships. You can also find information on your partner's and your own zodiac love and sexual compatibility. This can ensure a long-lasting relationship with shared understanding while also assisting you in learning further about your mate and your bond.",
    "Love compatibility can also forecast how your relationship will develop in the future, in addition to letting you know how things stand right now. Moreover, it reveals the strength of your current bond, what makes it successful, and if you and your loved one are about to experience harmony or conflict in the future. Hence, you may determine whether your connection is likely to progress in the ways you want by simply entering the appropriate zodiac sign. Kudos if your sign and your partner's sign align! Seamless times are predictable in advance.",
  ];

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
            content={t('astro_para', {returnObjects: true})}
          />
        </div>
      </section>

      <HomeFAQs
        text={t('Frequently_Asked_Questions')}
        highlightText='Talk to Astrologer'
        subHeading={t('All_you_need_to_know_about_Guna_Milan_Kundli_Milan')}
      />

      {/* <NewsletterComp/>
       <footer>
         <Footer/>
        </footer> */}
    </>
  );
}

export default TalkWithAstrologer;
