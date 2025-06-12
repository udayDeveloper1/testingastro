import { memo, useCallback } from 'react'
import FreeKundali from '../kundali/FreeKundaliForm'

const HeroSection = ({ backImg, cardData, navigate, t }) => {
  const handleNavigate = useCallback(path => () =>{
    
    navigate(path)}, [navigate])

  return (
    <div className='relative overflow-hidden'>
      <img
        src={backImg}
        alt='banner'
        className='absolute top-0 left-0 z-[-1] h-full w-full object-cover'
        decoding='async'
        // loading='lazy'
        width={4500}
        height={1750}
      />
      <div className='HeroSection pt-14 sm:pt-20 md:pt-28 lg:pt-20 z-[1] overflow-hidden'>
        <section className='text-center'>
          <div className='container mx-auto px-4'>
            <div className='grid grid-cols-12 items-center gap-6 sm:gap-10 lg:gap-12 pt-[70px] lg:pt-[76px] pb-[55px]'>
              <div className='flex flex-col items-center lg:items-start justify-center text-center lg:text-start text-white gap-[20px] md:gap-5 col-span-12 lg:col-span-6 xl:col-span-7'>
                <h1 className='font-semibold bannerH2 w-full hidden md:block mb-0'>
                  <span className='bannerSpan pr-1'>
                    {t('astrologer_count_message')}
                  </span>
                </h1>

                <p className='text-center lg:text-start max-w-full lg:max-w-[85%] leading-[150%] font-[400] hidden md:block mb-0'>
                  {t('lorem_ipsum_has_been_the')}
                </p>

                <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 mt-4 w-full book_pooja_chat_btns_part'>
                  {cardData.map((card, index) => (
                    <div
                      role='button'
                      key={index}
                      className='commonLightBack w-full flex flex-col items-center justify-between py-[15px] px-[30px] rounded-[10px] gap-[10px] cursor-pointer book_pooja_chat_btns'
                      onClick={handleNavigate(card.path)}
                    >
                      <div className='bg_website_color w-[50px] h-[50px] flex items-center justify-center rounded-full'>
                        <img
                          src={card.icon}
                          alt='icon'
                          className='w-[28px] h-[28px] object-contain'
                          loading='lazy'
                          decoding='async'
                          width={20}
                          height={20}
                        />
                      </div>
                      <p className='text-[14px] new_body_font font-medium text-center mb-0 leading-[18px]'>
                        {card.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className='hidden md:flex justify-center lg:justify-end col-span-12 lg:col-span-6 xl:col-span-5 freeKundliHomepageForm'>
                <FreeKundali />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default memo(HeroSection)
