import FsLightbox from 'fslightbox-react'
import React, { useCallback, useMemo, useState } from 'react'
import plus from '../../assets/img/astrologer/plus.webp'

const GallerySection = ({ ASTRO_IMAGES }) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sources: [],
    slide: 1
  })

  const images = useMemo(() => {
    return ASTRO_IMAGES?.length
      ? ASTRO_IMAGES
      : [
          'https://chatmyastrologer-assets.s3.us-east-1.amazonaws.com/chatmyastrologer/Profileimage/1742977887778.png',
          'https://chatmyastrologer-assets.s3.us-east-1.amazonaws.com/chatmyastrologer/Profileimage/1742977887778.png',
          'https://chatmyastrologer-assets.s3.us-east-1.amazonaws.com/chatmyastrologer/Profileimage/1742977887778.png',
          'https://chatmyastrologer-assets.s3.us-east-1.amazonaws.com/chatmyastrologer/Profileimage/1742977887778.png'
        ]
  }, [ASTRO_IMAGES])

  const openLightbox = useCallback(
    index => {
      setLightboxController(prev => ({
        toggler: !prev.toggler,
        sources: images,
        slide: index + 1 // FsLightbox is 1-based
      }))
    },
    [images]
  )

  const thumbnails = useMemo(() => {
    return images.slice(0, 4).map((src, index) => (
      <div
        key={index}
        className='relative w-[35px] h-[35px] rounded-md overflow-hidden border border-gray-200 cursor-pointer'
        onClick={() => openLightbox(index)}
      >
        <img
          src={src}
          alt={`Thumb ${index}`}
          className='w-full h-full object-cover'
        />
        <div className='absolute inset-0 bg-[#0000008a] bg-opacity-60 flex items-center justify-center'>
          <img src={plus} alt='view' className='w-4 h-4' />
        </div>
      </div>
    ))
  }, [images, openLightbox])

  return (
    <>
      <div className='grid grid-cols-4 gap-1 w-full'>{thumbnails}</div>
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images}
        slide={lightboxController.slide}
      />
    </>
  )
}

export default React.memo(GallerySection)
