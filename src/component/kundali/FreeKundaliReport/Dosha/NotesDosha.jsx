import { memo } from 'react';
import lineImg from '../../../../assets/img/kundali/line_chart.webp';

const NotesDosha = ({ title = '', subTitle = '', content = '', disclaimer = '' }) => {
  return (
    <div className="mt-6 p-4 rounded-lg new_body_font font-bold flex items-center recommendationBox py-6 px-6"
      style={{ background: 'rgba(116, 65, 157, 0.1)' }}
    >
      {/* Icon & Optional Line */}
      {title?.trim() !== '' && (
        <div className="pe-[20px] flex items-center">
          <div className="note_card_head_bg h-10 w-10   text-white rounded-full flex items-center justify-center text-[18px] font-bold">
            {title}
          </div>
          <div className='ps-[20px]'>
            <img src={lineImg} alt='line-img' />
          </div>

        </div>
      )}

      {/* Text Content */}
      <div className="flex flex-col">
        {subTitle && <h3 className="text-[18px] font-bold new_body_font">{subTitle}</h3>}
        <p className="commonQuesP pb-4">{content}</p>
        {!subTitle && disclaimer && <p className="commonQuesP">{disclaimer}</p>}
      </div>
    </div>
  );
};

export default memo(NotesDosha);
