import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import chatWithAstrologerBg from '../../assets/img/chat/chatWithAstrologerBanner.webp'
import { useTranslation } from 'react-i18next'
import {
  getAstrologerList,
  getFilterListing,
  setOnSubmitFilter
} from '../../storemain/slice/MasterSlice'
import { closeFilter, closeLoder } from '../../utils/CommonFunction'
import { Constatnt } from '../../utils/Constent'
import useDebounce from '../hooks/useDebounce'

const CommonBalanceBar = lazy(() => import('../../component/CommonBalanceBar'));
const CommonBanner = lazy(() => import('../../component/CommonBanner'));
const ChatWithAstrologerCard = lazy(() => import('../../component/CommonChatTalkAstrologerCard'));
const CommonQuestionComp = lazy(() => import('../../component/CommonQuestionComp'));
const HomeFAQs = lazy(() => import('../../component/Homepage/HomeFAQs'));
const Loader2 = lazy(() => import('../../component/loader/Loader2'));
const CustomPagination = lazy(() => import('../../component/Pagination/CustomPagination'));
const NoDataFound = lazy(() => import('../NoDataFound/NoDataFound'));

function ChatWithAstrologer() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation()
  // --------------------------- All Redux --------------------------------------------------------

  const homapageList =
    useSelector(state => state.HomePageSlice?.homapageList) || {}
  const homapageData = homapageList?.data || []
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY)
    : LanguageOption?.ENGLISH

  const { is_login, loginUserData } = useSelector((state) => state?.masterSlice?.loginUser);
  // const { contentList: data } = useSelector(state => state?.masterSlice?.getFilterList)
  const filterValue = useSelector((state) => state?.masterSlice?.filter_value);
  const shortValue = useSelector((state) => state?.masterSlice?.sort_by_value);

  const onSubmitFilter = useSelector(
    state => state?.masterSlice?.onSubmitFilter
  )
  const filterSearchValue = useSelector(
    state => state?.masterSlice?.filter_search
  )
  const astrologersList = useSelector(
    state => state?.masterSlice?.astrologerListData
  )

  // --------------------------- All state --------------------------------------------------------

  const isFetched = useRef(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setParPage] = useState(Constatnt.PER_PAGE_DATA)

  const debounce = useDebounce(
    typeof shortValue === 'string' && shortValue?.trim()
      ? shortValue?.trim()
      : '',
    100
  )

  const searchDebounce = useDebounce(
    typeof filterSearchValue === 'string' && filterSearchValue?.trim()
      ? filterSearchValue?.trim()
      : '',
    500
  )

  // ---------------------- AstrologerList Api Calling Start -----------------------------------------

  const fetchAstrologers = useCallback(async () => {
    setLoading(true)

    let request = {
      page: currentPage,
      per_page: perPage,
      search: filterSearchValue,
      skill: filterValue?.Skill ? [filterValue?.Skill] : [],
      category: [],
      languageFilter: filterValue?.Language ? [filterValue?.Language] : [],
      gender: filterValue?.Gender ? [filterValue?.Gender] : [],
      country: filterValue?.Country ? [filterValue?.Country] : [],
      offer: [],
      topAstrologer: [],
      sortBy: shortValue ? [String(shortValue)] : []
    }

    await dispatch(getAstrologerList(request))
    closeFilter(dispatch)
    dispatch(setOnSubmitFilter(false))
    closeLoder(dispatch)

    setLoading(false)
  }, [
    onSubmitFilter,
    dispatch,
    currentPage,
    debounce,
    searchDebounce,
    LocalLanguage
  ])

  useEffect(() => {
    fetchAstrologers()
  }, [fetchAstrologers, t])

  useEffect(() => {
    // if (!data?.length) {
    dispatch(getFilterListing());
    // }
  }, [t]);

  useEffect(() => {
    if (filterSearchValue.trim() || onSubmitFilter || filterValue) {
      setCurrentPage(1)
    }
  }, [filterSearchValue, onSubmitFilter, debounce, filterValue, LocalLanguage])

  // ---------------------- Pagination -----------------------------------------

  const handlePageChange = page => {
    setCurrentPage(page)
    isFetched.current = false
  }

  // ---------------------- All Logs --------------------------------------------

  return (
    <>

      <section>
        <CommonBanner text={t('Chat_With')} highlight={t('Astrologer')} />
      </section>
     <Suspense fallback={<div className='min-h-[100vh]'></div>}>

      <section>
        <div className='container mx-auto paddingTop50 flex flex-col gap-5 pb-5'>
          <CommonBalanceBar
            balance={loginUserData?.total_wallet_balance}
            onSearch={e => { }}
            onRecharge={() => { }}
            onFilter={() => { }}
            onSort={() => { }}
          />
        </div>
      </section>
      {loading ? (
        <div className='w-full flex justify-center items-center py-10'>
          <Loader2 />
        </div>
      ) : (
        <>
          <section className=''>
            <div className='container mx-auto paddingBottom50 pt-0 md:pt-[50px] flex flex-col gap-5 '>
              {astrologersList?.astrologerList?.length > 0 ? (
                <ChatWithAstrologerCard
                  astrologersList={astrologersList?.astrologerList}
                />
              ) : (
                <div className='w-full flex justify-center items-center py-10'>
                  <NoDataFound />
                </div>
              )}

              {!loading &&
                astrologersList?.totalAstrologerList >
                astrologersList?.perPage && (
                  <div className='pt-5'>
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
                heading={t('How_Chatting_with_an_astrologer_can_help_you')}
                content={[t('astro_para')]}
              />
            </div>
            <div className='container mx-auto padding50  flex flex-col gap-5 '>
              <CommonQuestionComp
                heading={t('How_Chatting_with_an_astrologer_can_help_you2')}
                content={[t('astro_para2')]}
              />
            </div>
          </section>

          <HomeFAQs
            text={t('FAQs')}
            highlightText={t('chat_with_astrologer')}
            subHeading={''}
          />
        </>
      )}
      </Suspense>
    </>
  )
}

export default memo(ChatWithAstrologer)
