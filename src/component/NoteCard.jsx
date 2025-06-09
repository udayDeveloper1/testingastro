import React from 'react'
import '../assets/css/notecard.css'
import lineImg from '../assets/img/kundali/line_chart.webp'

const NoteCard = ({ title = '', content }) => {
  return (
    <div
      className='mt-6  rounded-lg text-start new_body_font font-bold recommendationBox p-[15px] md:p-10 flex items-center'
      
    >
      {title?.trim() !== '' && (
        <div className='pe-[20px] flex'>
          <div className='note_card_head_bg px-[21px] py-[10.5px]  max-w-max text-white rounded-[100%]'>
            <h3 className='mb-0'>{title}</h3>
          </div>
          <div className='ps-[20px]'> 
            <img src={lineImg} alt='line-img' />
          </div>
        </div>
      )}
      <p className='mb-0'> {content}</p>
    </div>
  )
}

export default NoteCard
