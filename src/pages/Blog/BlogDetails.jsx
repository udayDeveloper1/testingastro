import { lazy, memo, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import '../../assets/css/blogDetail.css'
// import bhumipujaMuhurat from '../../assets/img/banner/bhumipujaMuhurat.webp'
import { t } from 'i18next'
import calenderIcon from '../../assets/img/blog/calenderIcon.webp'
import { blogDetails } from '../../services/api/api.services'
import { blogListingThunk } from '../../storemain/slice/MasterSlice'
import { formatDate } from '../../utils/CommonFunction'
import { Codes, DateFormat, LanguageOption } from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import CommonBanner from '../../component/CommonBanner'

const BlogSidebar = lazy(() => import('../../component/Blog/BlogSidebar'));


const BlogDetails = () => {
  const { blogId } = useParams()
  const dispatch = useDispatch();

  const blogListData = useSelector(state => state?.masterSlice?.blogListData)
  const [blogDetailData, setBlogDetailData] = useState({});
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  
  const commonPagination = {
    page: 1,
    per_page: Constatnt?.PER_PAGE_DATA
  }

  useEffect(() => {
    blogDetails({ unique_id: blogId }).then((response) => {
      console.log(response);
      
      if (response?.code === Codes?.SUCCESS) {
        setBlogDetailData(response?.data)
        dispatch(blogListingThunk(commonPagination))
      } else {
        setBlogDetailData({})
      }
    })
  }, [blogId, LocalLanguage])

  return (
    <>
      {/* Banner Section */}
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text={t('blog')}
          highlight=''
        />
      </section>
      <Suspense fallback={<div className='min-h-[100vh]'></div>}>
        {/* Blog Content Section */}
        <section>
          <div className='container mx-auto padding100 '>
            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6   '>
              {/* Main Blog Content */}
              <div className='bg-white py-6 pt-0 rounded-lg '>
                <h2 className='commonheadingSpan mb-0 !leading-[120%] pb-[10px]'>{blogDetailData?.title}</h2>
                <p className='text-gray-500 text-sm my-2 flex items-center gap-3'>
                  {/* {t('By')} - {blogDetailData?.added_by?.name}{' '} */}
                  <div className='flex items-center gap-1'>
                    <img src={calenderIcon} alt='' className='ml-2 ' />{' '}
                    {formatDate(blogDetailData.created_at, DateFormat.DATE_TIME_MONTH_WISE_FORMAT)}
                  </div>
                </p>
                <img
                  src={blogDetailData?.cover_image}
                  alt={blogDetailData?.title}
                  className='w-full rounded-lg my-4 max-w-[900px] max-h-[500px]'
                />
                <div dangerouslySetInnerHTML={{ __html: blogDetailData?.description }}
                  className='blog_detail_description pt-4'
                ></div>
              </div>

              <aside>
                <BlogSidebar recentBlogs={blogListData?.blogList} relatedBlogs={blogListData?.blogList} />
              </aside>
            </div>
          </div>
        </section>
      </Suspense>
    </>
  )
}

export default memo(BlogDetails)
