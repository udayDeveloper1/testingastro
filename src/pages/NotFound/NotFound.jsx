import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from "../../assets/img/noDataFound/No_Data_Found.webp";

const CommonBanner = lazy(() => import('../../component/CommonBanner'));
const NotFound = () => {
  const { t } = useTranslation()
  return (
    <section className=''>
      <CommonBanner
        text={t("Not_Found_Page")}
        highlight={''}
      />
      <div className='py-5 md:py-10 container '>
        <img src={notFoundImg} alt="not-Found-Img" className='block mx-auto ' />
     <div className='website_new_color'>
           <h2 className=' -mt-[40px] mb-[30px] md:mb-[50px]  text-center text-[30px]  lg:text-[40px]'><span className=''>Not Found</span></h2>
     </div>
      </div>
    </section>
  )
}

export default React.memo(NotFound)
