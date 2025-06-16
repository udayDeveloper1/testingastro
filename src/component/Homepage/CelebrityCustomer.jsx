import { Modal } from 'antd'
import { memo, useState } from 'react'
import ReactPlayer from 'react-player'
import poster1 from '/homepage/video1.webp'

const CelebrityCustomer = ({ CelebrityList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalVideoUrl, setModalVideoUrl] = useState('')
  const [title, setTitle] = useState('')

  const handleVideoClick = (videoUrl, title) => {
    setModalVideoUrl(videoUrl)
    setTitle(title)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setModalVideoUrl('')
  }

  const renderVideoCard = (video, index) => (
    <div
      key={index}
      className='relative flex flex-col items-center rounded-[10px] bg-white w-full mb-10 px-2 md:px-0 '
    >
      {/* Video Container */}
      <div className='relative w-full h-60 rounded-[10px] overflow-hidden box_shadow_common'>
        <div
          className='relative w-full h-60 rounded-[10px] overflow-hidden cursor-pointer'
          onClick={() => handleVideoClick(video?.link, video?.title)}
        >
          <img
            src={video?.thumb_nail || poster1}
            alt={video?.title}
            className='w-full h-full object-cover'
            width={332}
            height={240}
            decoding='async'
            loading='lazy'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            <div className='w-20 h-20  bg-opacity-80   transition-transform duration-200 hover:scale-110 shadow-lg border-gray-300 relative'>
              <div className='bg-white rounded-full relative z-1 w-full h-full flex items-center justify-center'>
                {' '}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-12 h-12 website_color relative z-1'
                >
                  <path d='M8 5v14l11-7z' />
                </svg>
              </div>
              <div class=''>
                <div class='waves wave-1'></div>
                <div class='waves wave-2'></div>
                <div class='waves wave-3'></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className='w-full px-4 py-3 absolute z-10 videoText'>
        <p className='text-center  p-4 bg-white videoP rounded-lg'>
          <span className='line-clamp-2 commonQuesP'>{video?.title}</span>
        </p>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Slick Slider */}
      {/* <div className='block md:hidden celebrity '>
        <Slider {...slickSettings}>
          {CelebrityList?.map((video, index) => (
            <div key={index} className='pb-[22px]'>
              {renderVideoCard(video, index)}
            </div>
          ))}
        </Slider>
      </div>


      <div className='hidden md:grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 md:gap-6'>
        {CelebrityList?.map((video, index) => renderVideoCard(video, index))}
      </div> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-12  md:gap-x-6 max-w-[350px] sm:max-w-[unset] mx-auto sm:mx-[unset]'>
        {CelebrityList?.map((video, index) => renderVideoCard(video, index))}
      </div>

      {/* Video Modal */}
      <Modal
        title={title}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={800}
        destroyOnClose
        className='videoPlayermodal'
      >
        <ReactPlayer url={modalVideoUrl} playing controls width='100%' />
      </Modal>
    </>
  )
}

export default memo(CelebrityCustomer)
