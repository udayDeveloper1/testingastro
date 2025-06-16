
import { CalendarOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import React, { memo, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
// import commonSearch from "../../assets/img/common/searchIcon.webp";
import commonSearch from "../../assets/img/common/search.svg";
// import { PATHS } from "../../routers/Paths";
import { useTranslation } from "react-i18next";
import { UpdatedPaths } from "../../routers/Paths";
import { formatDate } from "../../utils/CommonFunction";
import { DateFormat } from "../../utils/CommonVariable";
import { blogDetailsNavigation } from "../../utils/navigations/NavigationPage";

const BlogCard = React.memo(({ blog, onClick }) => (

  <div
    className="flex items-center gap-4 border-t py-4 last:border-b-0 mb-0 cursor-pointer"
    onClick={onClick}
    style={{ borderTop: "1px solid rgba(116, 65, 157, 0.3)" }}
  >
    <div className="overflow-hidden rounded-lg max-w-[70px] max-h-[70px] min-w-[70px] min-h-[70px]">
      <img
        src={blog.cover_image}
        alt="Blog"
        className="max-w-[70px] max-h-[70px] min-w-[70px] min-h-[70px] rounded-lg object-cover"
      />
    </div>
    <div className="flex flex-col gap-2 h-full">
      <p className="font-semibold new_body_font mb-0">{blog.title}</p>
      <p className="commonQuesP flex items-center gap-1 mb-0">
        <CalendarOutlined />{" "}
        {formatDate(blog.created_at, DateFormat.DATE_TIME_MONTH_WISE_FORMAT)}
      </p>
    </div>
  </div>
));

const BlogSidebar = ({ recentBlogs, relatedBlogs }) => {
  const { t } = useTranslation()

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const PATHS = UpdatedPaths()

  const blogOptions = useMemo(() => {
    return recentBlogs?.map((blog) => ({
      label: blog.title,
      value: blog.unique_id,
      data: blog,
    }));
  }, [recentBlogs]);

  const handleNavigate = (blog) => {
    // navigate(`${PATHS.BLOG_DETAILS}/${blogId}`);
    blogDetailsNavigation(navigate, PATHS.BLOG_DETAILS, blog.unique_id, blog?.title)
    setInputValue("");
  };

  return (
    <div className="bg-white p-6 rounded-lg box_shadow_common border border-gray-200">
      {/* Search Input */}
      <h3 className="commonQuesH2 pb-3">{t('Search')}</h3>

      <AutoComplete
        style={{ width: "100%" }}
        options={blogOptions}
        value={inputValue}
        placeholder="Try typing a blog title"
        onChange={(value) => {
          setInputValue(value);
          // Check if typed value exactly matches a blog
          const matchedBlog = blogOptions.find((blog) => blog.value === value);
          if (matchedBlog) {
            handleNavigate(matchedBlog.data); // send matched blog's data
          }
        }}
        onSelect={(value) => {
          const matchedBlog = blogOptions.find((blog) => blog.value == value);
          if (matchedBlog) {
            handleNavigate(matchedBlog.data); // send matched blog's data
          }
        }}
        filterOption={(inputValue, option) =>
          option.label.toLowerCase().includes(inputValue.toLowerCase())
        }
        className="min-h-[50px] autoComplete_min_h !w-full blogSideBarAutoComplete"
      >
        <Input
          prefix={
            <div className='w-[38px] h-[38px] min-h-[38px] min-w-[38px] flex items-center justify-center bg_light_back rounded-full'>
              <img src={commonSearch} alt='Search' className='object-contain w-[16px] h-[16px]' />
            </div>
          }
          className="p-2 outline-none border rounded-lg"
        />
      </AutoComplete>

      {/* Recent Blogs */}
      <h3 className="text-lg font-semibold mt-4">{t('Recent_Blog')}</h3>
      <div className="mt-2 pt-2 space-y-4">
        {recentBlogs?.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onClick={() => handleNavigate(blog)}
          />
        ))}
      </div>

      {/* <h3 className="text-lg font-semibold mt-6">Related Blog</h3>
      <div className="mt-2 pt-2 space-y-4">
        {relatedBlogs.map((blog) => (
          <BlogCard
            key={blog._id}
            blog={blog}
            onClick={() => handleNavigate(blog._id)}
          />
        ))}
      </div> */}
    </div>
  );
};

export default memo(BlogSidebar);
