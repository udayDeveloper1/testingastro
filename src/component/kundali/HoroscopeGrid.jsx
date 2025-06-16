import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router'
import "../../assets/css/horoscopeGrid.css"
import { horoscopeList } from '../../pages/Horoscope/HororScopVariable'
import { UpdatedPaths } from '../../routers/Paths'
import { allHoroScopeDetailsNavigation } from '../../utils/navigations/NavigationPage'

const HoroscopeCard = memo(({ sign, isSlider, signNameForHighlight }) => {

  const navigate = useNavigate();
  const { type } = useParams();
  const { t } = useTranslation();
  const PATHS = UpdatedPaths();

  return (
    <div
      className={`bg-white rounded-[10px] box_shadow_common cursor-pointer ${isSlider ? 'p-4 ' : 'py-[32px]'
        } flex flex-col items-center new_border hover:shadow-lg transition-all`}
      onClick={() => allHoroScopeDetailsNavigation(navigate, type, sign.name, sign?.id, PATHS?.ALL_HOROSCOPE_DETAILS)}
    >
      <div className={`${isSlider ? 'mb-3 w-[60px] h-[60px]' : 'w-[100px] h-[100px] mb-[25px]'
        } rounded-full gradient-background flex items-center justify-center shadow-[0_0_50px_0_#D143504D] p-3`}>
        <img src={sign?.icon} alt={sign?.name} className="object-contain" loading="lazy" decoding='async' height={60} width={60} />
      </div>
      <h3 className={`text-[16px] md:text-[20px] md:font-semibold new_body_font !mb-[10px] ${sign?.name === signNameForHighlight ? "gradient-text" : ""}`}>
        {t(`${sign?.name}`)}
      </h3>
    </div>
  );
});

const HoroscopeGrid = memo(({ heading, smallText, signNameForHighlight }) => {

  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "free",
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 3, spacing: 10 }
      },
      '(max-width: 480px)': {
        slides: { perView: 2, spacing: 8 }
      }
    }
  });

  const desktopCards = useMemo(() =>
    horoscopeList?.map(sign => (
      <HoroscopeCard
        key={sign?.name}
        sign={sign}
        isSlider={false}
        signNameForHighlight={signNameForHighlight}
      />
    )), [signNameForHighlight]); // ✅ Add dependency

  const sliderCards = useMemo(() =>
    horoscopeList.map(sign => (
      <div key={sign?.name} className='keen-slider__slide'>
        <HoroscopeCard
          sign={sign}
          isSlider
          signNameForHighlight={signNameForHighlight}
        />
      </div>
    )), [signNameForHighlight]); // ✅ Add dependency

  return (
    <div className='flex flex-col gap-5 md:gap-10'>
      {(heading || smallText) && (
        <h2 className='commonHeadingH2'>
          {smallText} <span className='commonheadingSpan'>{heading}</span>
        </h2>
      )}

      {/* 🖥️ Desktop Grid */}
      <div className='hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-[24px] justify-center'>
        {desktopCards}
      </div>

      {/* 📱 Mobile Slider */}
      <div className='block md:hidden'>
        <div ref={sliderRef} className='keen-slider'>
          {sliderCards}
        </div>
      </div>
    </div>
  );
});

export default HoroscopeGrid;
