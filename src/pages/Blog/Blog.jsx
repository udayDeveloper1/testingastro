import React, { useEffect, useState } from 'react'
import SearchSortBar from '../../component/Blog/SearchSortBar'
// import bhumipujaMuhurat from '../../assets/img/banner/bhumipujaMuhurat.webp'
import CommonBanner from '../../component/CommonBanner'
import { useTranslation } from 'react-i18next'
import HomeBlog from '../../component/Homepage/HomeBlog'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getHomePageListing } from '../../storemain/slice/HompageSlice'
import HomeFAQs from '../../component/Homepage/HomeFAQs'
import CommonBalanceBar from '../../component/CommonBalanceBar'
import { blogListingThunk } from '../../storemain/slice/MasterSlice'
import useDebounce from '../hooks/useDebounce'
import { Constatnt } from '../../utils/Constent'
import NoDataFound from '../NoDataFound/NoDataFound'
import CustomPagination from '../../component/Pagination/CustomPagination'

function Blog() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const blogListData = useSelector(state => state?.masterSlice?.blogListData)

  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setParPage] = useState(Constatnt?.PER_PAGE_DATA)

  // useEffect(() => {
  //   dispatch(getHomePageListing())
  // }, [dispatch])

  const [searchInput, setSearchInput] = useState('');
  const debounceSearch = useDebounce(searchInput, Constatnt?.SEARCH_DELAY || 500);

  useEffect(() => {
    if (debounceSearch?.trim() || currentPage) {
      dispatch(blogListingThunk({
        search: searchInput,
        page: currentPage,
        per_page: perPage
      }))
    }
  }, [debounceSearch, currentPage])

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

          {
            blogListData?.blogList?.length > 0 ?
              <HomeBlog BlogList={blogListData?.blogList} />
              :
              <div className='col-span-full flex justify-center'>
                <NoDataFound />
              </div>
          }

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
        </div>
      </section>

      {/* <HomeFAQs
        text={t('Frequently_Asked_Questions')}
        highlightText={t('blog')}
        subHeading={t('All_you_need_to_know_about_Guna_Milan_Kundli_Milan')}
      /> */}

    </>
  )
}

export default Blog
