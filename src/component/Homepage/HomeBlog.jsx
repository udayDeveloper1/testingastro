// import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
// import { PATHS } from "../../routers/Paths";
import { UpdatedPaths } from '../../routers/Paths'
import { getFormattedDay, getFormattedMonth } from '../../utils/CommonFunction'
import { blogDetailsNavigation } from '../../utils/navigations/NavigationPage'

function HomeBlog ({ BlogList }) {
  // const { t } = useTranslation()
  const navigate = useNavigate()
  const PATHS = UpdatedPaths()

  return (
    <div className='testimonial'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 max-w-[350px] sm:max-w-[unset] mx-auto sm:mx-[unset]'>
        {BlogList?.map((blog, index) => (
          <div
            key={index}
            className='bg-white p-3 box_shadow_common rounded-[10px] flex flex-col items-center w-full blogBoxShodow homeBlogCard h-auto astroNewCard cursor-pointer'
            onClick={() => {
              // navigate(`${PATHS.BLOG_DETAILS}/${blog._id}`);
              blogDetailsNavigation(navigate, PATHS.BLOG_DETAILS, blog.unique_id)
            }}
          >
            <div className='w-full h-44 overflow-hidden rounded-[10px] homeBlogImageDiv'>
              <img
                src={blog?.cover_image}
                alt={blog?.title}
                className='w-full h-full object-cover'
                width={332}
                height={240}
                decoding='async'
                loading='lazy'
              />
              <div className='homeBlogImageDivDate text-center'>
                {getFormattedDay(blog?.created_at)}{' '}
                <p>{getFormattedMonth(blog?.created_at)}</p>
              </div>
            </div>
            <div className='flex flex-col p-5 gap-2 flex-1 w-full'>
              <p className='new_body_font text-sm !mb-[5px]'>
                {/* {t('By')} - {blog?.added_by?.name} */}
              </p>
              <h3 className='text-[20px] text font-semibold line-clamp-2 homeBlogHead !mb-[5px]'>
                {blog?.title || 'NA'}
              </h3>
              <div
                className='commonQuesP line-clamp-2 mb-0'
                dangerouslySetInnerHTML={{
                  __html: blog?.description?.replace(/<br\s*\/?>/gi, '')
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeBlog
