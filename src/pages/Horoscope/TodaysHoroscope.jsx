import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import moment from 'moment';
import { useLocation, useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CommonBanner from '../../component/CommonBanner';
import AlsoCheckBanner from '../../component/AlsoCheckBanner';
import ZodiacCard from '../../component/Horoscope/ZodiacCard';

const CommonQuestionComp = lazy(() => import('../../component/CommonQuestionComp'));
const HomeFAQs = lazy(() => import('../../component/Homepage/HomeFAQs'));

import {
  getHoroscopeList,
  getWeeklyHoroscopeList,
  getYearlyHoroscopeList
} from '../../services/api/api.services';

import { Codes, LanguageOption } from '../../utils/CommonVariable';
import { allHoroScopeNavigation } from '../../utils/navigations/NavigationPage';
import { UpdatedPaths } from '../../routers/Paths';
import { useHoroscopeTabs } from '../../component/Horoscope/horoscopeTabsData';
import { useHoroscopeList } from '../hooks/useAllRashiInfo';
import { Constatnt } from '../../utils/Constent';

function TodaysHoroscope() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type: typeParams } = useParams();

  const { t } = useTranslation();
  const PATHS = UpdatedPaths();
  const horoscopeTabs = useHoroscopeTabs();
  const horoscopeList = useHoroscopeList();

  const myLanguage = useSelector(state => state?.masterSlice?.currentLanguage);
  const LocalLanguage =
    localStorage.getItem(Constatnt.LANGUAGE_KEY) || LanguageOption.ENGLISH;

  const [active, setActive] = useState('0');
  const [type, setType] = useState('daily');
  const [updateZodicList, setUpdateZodicList] = useState([]);

  useEffect(() => {
    setActive(typeParams);
    setType(typeParams);
  }, [typeParams]);

  const onTabChange = data => {
    setActive(data?.type);
    setType(data?.type);
    allHoroScopeNavigation(navigate, data?.type, PATHS?.ALL_HOROSCOPE);
  };

  const fetchHoroscopeData = async (type) => {
    const apiMap = {
      'daily-horoscope': getHoroscopeList,
      'yesterday-horoscope': getHoroscopeList,
      'tomorrow-horoscope': getHoroscopeList,
      'weekly-horoscope': getWeeklyHoroscopeList,
      'yearly-horoscope': getYearlyHoroscopeList
    };

    const date =
      type === 'yesterday-horoscope'
        ? moment().subtract(1, 'day').format('DD/MM/YYYY')
        : type === 'tomorrow-horoscope'
        ? moment().add(1, 'day').format('DD/MM/YYYY')
        : moment().format('DD/MM/YYYY');

    const request = {
      zodiac: '1', // Placeholder zodiac ID, can be improved by batching
      date: ['daily-horoscope', 'yesterday-horoscope', 'tomorrow-horoscope'].includes(type)
        ? date
        : undefined,
      year: type === 'yearly-horoscope' ? moment().format('YYYY') : undefined,
      lang: LocalLanguage
    };

    try {
      const response = await apiMap[type](request);

      if (response?.code === Codes.SUCCESS) {
        const updated = horoscopeList.map(horoscope => {
          const matched = response.data?.find(
            item => Number(item.request.zodiac) === horoscope.id
          );
          return matched
            ? {
                ...horoscope,
                updateDescription:
                  matched.response?.bot_response?.total_score?.split_response ||
                  matched.response?.phase_1?.prediction ||
                  ''
              }
            : horoscope;
        });
        setUpdateZodicList(updated);
      } else {
        setUpdateZodicList(horoscopeList);
      }
    } catch (err) {
      setUpdateZodicList(horoscopeList);
    }
  };

  useEffect(() => {
    if (typeParams) {
      fetchHoroscopeData(typeParams);
    }
  }, [typeParams, myLanguage]);

  return (
    <>
      <section>
        <CommonBanner text='' highlight={t('horoscopes')} />
      </section>

      <section>
        <div className='paddingTop50 container mx-auto'>
          <AlsoCheckBanner active={active} onTabChange={onTabChange} />
        </div>
      </section>

      <section>
        <div className='container paddingTop100'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-14 gap-x-8 md:gap-y-14 md:gap-x-8'>
            {updateZodicList?.map((item, idx) => (
              <ZodiacCard
                key={idx}
                iconUrl={item?.icon}
                keyData={item?.key}
                sign={item?.name}
                description={item?.updateDescription}
                id={item?.id}
                type={typeParams}
              />
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="text-center my-10">Loading...</div>}>
        <section>
          <div className='container mx-auto paddingTop50 flex flex-col gap-5'>
            <CommonQuestionComp
              heading={t('Overview')}
              content={[t('today_horoscope_para')]}
            />
          </div>
        </section>

        <section>
          <div className='container mx-auto padding50 flex flex-col gap-5'>
            <CommonQuestionComp
              heading={t('introduction')}
              content={[t('introduction_horoscope_para')]}
            />
          </div>
        </section>

        <HomeFAQs
          text={t('FAQs')}
          highlightText={t('Horoscope')}
          subHeading=''
        />
      </Suspense>
    </>
  );
}

export default TodaysHoroscope;
