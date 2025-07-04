import { lazy, memo, Suspense, useEffect, useState } from 'react'
import SearchSortBar from '../../component/Blog/SearchSortBar'
// import bhumipujaMuhurat from '../../assets/img/banner/bhumipujaMuhurat.webp'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { blogListingThunk } from '../../storemain/slice/MasterSlice'
import { Constatnt } from '../../utils/Constent'
import useDebounce from '../hooks/useDebounce'
import CommonBanner from '../../component/CommonBanner'


const HomeBlog = lazy(() => import('../../component/Homepage/HomeBlog'));
const CustomPagination = lazy(() => import('../../component/Pagination/CustomPagination'));
const Loader2 = lazy(() => import('../../component/loader/Loader2'));
const NoDataFound = lazy(() => import('../NoDataFound/NoDataFound'));

function Blog() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const blogListData = useSelector(state => state?.masterSlice?.blogListData)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setParPage] = useState(9)
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  // useEffect(() => {
  //   dispatch(getHomePageListing())
  // }, [dispatch])

  const [searchInput, setSearchInput] = useState('');
  const debounceSearch = useDebounce(searchInput, Constatnt?.SEARCH_DELAY || 500);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      await dispatch(blogListingThunk({
        search: searchInput,
        page: currentPage,
        per_page: perPage
      }));
      setLoading(false);
    };

    fetchBlogs();
  }, [debounceSearch, currentPage, LocalLanguage]);

  const handleSearchChange = (value) => {
    setSearchInput(value);
    setCurrentPage(1);
  };

  // ---------------------------------------- Pagination ---------------------------------------------------------------------

  const handlePageChange = page => {
    setCurrentPage(page)
  }

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text=""
          highlight={t('blogs')}
        />
      </section>
<Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <section>
        <div className='container mx-auto paddingTop50 '>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <SearchSortBar
              value={searchInput}
              showSearchInput={true}
              searchValue={searchInput}
              onSearchChange={handleSearchChange}
              placeholder={t('search Blog')}
            />
          </div>

        </div>
      </section>

      <section>
        <div className='container mx-auto padding50  flex flex-col gap-10'>

          {loading ? (
            <div className='col-span-full flex justify-center py-10'>
              <Loader2 /> {/* You can replace this with a spinner component */}
            </div>
          ) : (
            <>
              {blogListData?.blogList?.length > 0 ? (
                <HomeBlog BlogList={blogListData?.blogList} />
              ) : (
                <div className='col-span-full flex justify-center'>
                  <NoDataFound />
                </div>
              )}

              <div className='container flex justify-center'>
                {blogListData?.totalBlogs > blogListData?.perPage && (
                  <CustomPagination
                    current={blogListData?.currentPage}
                    total={blogListData?.totalBlogs}
                    onChange={handlePageChange}
                    perpage={perPage}
                  />
                )}
              </div>
            </>
          )}

        </div>
      </section>
</Suspense>

    </>
  )
}

export default memo(Blog)
