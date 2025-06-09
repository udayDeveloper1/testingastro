import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import '../../assets/css/blogDetail.css'
// import bhumipujaMuhurat from '../../assets/img/banner/bhumipujaMuhurat.webp'
import calenderIcon from '../../assets/img/blog/calenderIcon.webp'
import BlogSidebar from '../../component/Blog/BlogSidebar'
import CommonBanner from '../../component/CommonBanner'
import { formatDate } from '../../utils/CommonFunction'
import { Codes, DateFormat } from '../../utils/CommonVariable'
import { t } from 'i18next'
import { blogDetails } from '../../services/api/api.services'

const BlogDetails = () => {
  const { blogId } = useParams()
  const BlogList = useSelector(state => state.HomePageSlice?.homapageList?.data?.BlogList) || [];
  const blogListData = useSelector(state => state?.masterSlice?.blogListData)

  const [blogDetailData, setBlogDetailData] = useState({});

  useEffect(() => {
    blogDetails({ blog_id: blogId }).then((response) => {
      if (response?.code === Codes?.SUCCESS) {
        setBlogDetailData(response?.data)
      } else {
        setBlogDetailData({})
      }
    })
  }, [blogId])

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

      {/* Blog Content Section */}
      <section>
        <div className='container mx-auto padding100 commonPadMarBottomClass'>
          <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6   '>
            {/* Main Blog Content */}
            <div className='bg-white py-6 pt-0 rounded-lg '>

              <h2 className='commonheadingSpan mb-0 !leading-[120%] pb-[10px]'>{blogDetailData?.title}</h2>
              <p className='text-gray-500 text-sm my-2 flex items-center gap-3'>
                {/* {t('By')} - {blogDetailData?.added_by?.name}{' '} */}
                <div className='flex items-center gap-1'>
                  <img src={calenderIcon} alt='' className='ml-2 ' />{' '}
                  {formatDate(
                    blogDetailData.created_at,
                    DateFormat.DATE_TIME_MONTH_WISE_FORMAT
                  )}
                </div>
              </p>

              <img
                src={blogDetailData?.cover_image}
                alt={blogDetailData?.title}
                className='w-full rounded-lg my-4 max-w-[900px] max-h-[500px]'
              />

              <div
                dangerouslySetInnerHTML={{ __html: blogDetailData?.description }}
                className='blog_detail_description pt-4'
              ></div>
            </div>

            <aside>
              <BlogSidebar recentBlogs={blogListData?.blogList} relatedBlogs={blogListData?.blogList} />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogDetails
