// import bhumipujaMuhurat from "../../assets/img/banner/bhumipujaMuhurat.webp";
import { lazy, Suspense } from 'react';

// Lazy-loaded components
const CommonBanner = lazy(() => import('../../component/CommonBanner'));
const SupportChatPageComp = lazy(() => import('../../component/Support/SupportChatPage'));


function SupportChatPage () {
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={bhumipujaMuhurat}
          text='Bhoomi pujan '
          highlight='muhurat 2025'
        />
      </section>
      <div className='w-full h-screen flex text-sm font-medium container padding50'>
        <SupportChatPageComp />
      </div>
    </>
  )
}

export default React.memo(SupportChatPage)
