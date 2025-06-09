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
  const onSubmitFilter = useSelector(
    (state) => state?.masterSlice?.onSubmitFilter
  );
  const filterSearchValue = useSelector(
    (state) => state?.masterSlice?.filter_search
  );
  const astrologersList = useSelector(
    (state) => state?.masterSlice?.astrologerListData
  );
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
      skill: filterValue?.Skill ? [filterValue.Skill.toLowerCase()] : [],
      category: [],
      languageFilter: filterValue?.Language
        ? [filterValue.Language.toLowerCase()]
        : [],
      gender: filterValue?.Gender ? [filterValue.Gender.toLowerCase()] : [],
      country: filterValue?.Country ? [filterValue.Country.toLowerCase()] : [],
      offer: [],
      topAstrologer: [],
      sortBy: shortValue ? [String(shortValue).toLowerCase()] : [],
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

  // Static content for the questions section
  const content = [
    `You don't always get along like a blaze on flames with people, but when you're with that "special person," you feel happy and in control of the situation. We encounter numerous people throughout life. One person would be your life partner out of all those who may be terrific friends or mentors for you. You must make the appropriate choice for that person. They must make you feel at home, never depressed or too uncared for.`,
    "Do you believe your heart might have jumped a beat if you had met that particular someone? If so, find out what your Sun sign conspires to have you do by checking your zodiac sign love compatibility.",
    "Zodiac sign compatibility reveals more than just compatibility in romantic relationships. You can also find information on your partner's and your own zodiac love and sexual compatibility. This can ensure a long-lasting relationship with shared understanding while also assisting you in learning further about your mate and your bond.",
    "Love compatibility can also forecast how your relationship will develop in the future, in addition to letting you know how things stand right now. Moreover, it reveals the strength of your current bond, what makes it successful, and if you and your loved one are about to experience harmony or conflict in the future. Hence, you may determine whether your connection is likely to progress in the ways you want by simply entering the appropriate zodiac sign. Kudos if your sign and your partner's sign align! Seamless times are predictable in advance.",
  ];

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
          <ChatWithAstrologerCard
            astrologersList={astrologersList?.astrologerList}
            loading={loder?.loding_type}
          />
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
      {/* </Suspense> */}

      {/* <section>
          <div className="container mx-auto paddingTop50 paddingBottom100 pb-10 flex flex-col gap-10">
           <NotificationCard
  userName="Ravi Kumar"
  question="Will I get a job this year?"
  onAccept={() => console.log('Accepted')}
  onReject={() => console.log('Rejected')}
/>

            </div>
          </section> */}

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

      {/* <Suspense fallback={<div>Loading FAQs...</div>}> */}
      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('About_Astrology')}
        // subHeading={t('Best_online_astrology_consultation')}
        subHeading={''}
      />
      {/* </Suspense> */}
    </>
  );
}

export default AstrologerListPage;
