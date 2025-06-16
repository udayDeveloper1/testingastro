import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import plusImage from '../../assets/img/Horoscope/plusImage.webp';

const LuckyInfoCard = memo(({ horoScopDetails = {} }) => {
  const { t } = useTranslation()

  const {
    lucky_color_code = '',
    lucky_mood = '-',
    lucky_number = [],
    lucky_time = '-',
  } = horoScopDetails;

  const luckyColor = lucky_color_code || 'transparent';
  const luckyNumbers = lucky_number.length > 0 ? lucky_number.join(', ') : '-';

  return (
    <div className='relative'>
      <div className='  rounded-[10px] p-[15px] p-0  md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] md:gap-4 md:items-center text-center lukcyInfoCard '>
        {/* Lucky Colours */}
        <InfoBlock label={t('lucky_colours')} classList=' md:border-r'>
          <span
            className='h-5 w-5 rounded-full border'
            style={{ backgroundColor: luckyColor }}
          >
            {!lucky_color_code && '-'}
          </span>
        </InfoBlock>

        {/* Mood Day */}
        <InfoBlock label={t('mood_day')} value={lucky_mood} classList=' md:border-r' />

        {/* Lucky Number */}
        <InfoBlock label={t('lucky_number')} value={luckyNumbers} classList=' md:border-r' />

        {/* Lucky Time */}
        <InfoBlock label={t('lucky_time')} value={lucky_time} classList='border-r-none' />

        {/* Plus Image - Mobile only */}
        <img
          src={plusImage}
          alt='Plus Symbol'
          aria-hidden='true'
          className='absolute hidden sm:block md:hidden left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24'
        />
      </div>
    </div>
  );
});

const InfoBlock = ({ label, value = '-', children, classList = "" }) => (
  <div className={`flex flex-col items-center justify-start md:justify-center gap-[5px] md:gap-[20px] border-[#343434] ${classList} `}>
    <p className='luckyCardP  mb-0'>{label}</p>
    {children || <span className='luckyCardSpan commonQuesP'>{value}</span>}
  </div>
);

export default LuckyInfoCard;
