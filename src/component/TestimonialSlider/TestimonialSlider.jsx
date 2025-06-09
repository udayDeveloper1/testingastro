import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import quotes from '/newThemeHomePage/quotes.webp'
import { meetOurClient } from '../../services/api/api.services'
import { Codes } from '../../utils/CommonVariable'

const testimonials = [
  {
    name: 'Guy Hawkins',
    role: 'President of Sales',
    image: 'https://i.pravatar.cc/100?img=1',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  },
  {
    name: 'Jane Cooper',
    role: 'Marketing Lead',
    image: 'https://i.pravatar.cc/100?img=2',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
  }
  // Add more as needed
]

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  }

  const [data, setData] = useState(false)

  useEffect(() => {
    meetOurClient().then((response) => {
      if (response?.code === Codes?.SUCCESS) {
        setData(response?.data)
      } else {
        setData([])
      }
    })
    
  }, [])
  return (
    <div className='testimonial'>
      <Slider {...settings}>
        {data.length > 0 && data?.map((item, index) => (
          <div key={index} className='px-3 '>
            <div className='bg-white p-[15px] md:p-[40px] rounded-lg  h-full flex flex-col justify-between new_border box_shadow_common'>
              <p className='commonQuesP mb-4'>{item.description}</p>
              <hr className='my-[20px] md:my-[40px] testHr' />
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[20px]'>
                  <img
                    src={'https://chatmyastrologer-assets.s3.us-east-1.amazonaws.com/chatmyastrologer/Profileimage/1742977887778.png' }
                    alt={item.name}
                    className='w-12 h-12 rounded-full object-cover'
                    width={48}
                    height={48}
                    decoding='async'
                    loading='lazy'
                  />
                  <div>
                    <h4 className='commonQuesH2'>{item.name}</h4>
                    <p className='commonQuesP'>{item.position}</p>
                  </div>
                </div>
                <img src={quotes} alt='quotes' width={31}
                  height={23}
                  decoding='async'
                  loading='lazy' />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default TestimonialSlider
