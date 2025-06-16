import React, { lazy, Suspense, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
const CustomButton = lazy(() => import('../../Homepage/CustomButton'));


const DayPanchangButton = ({ onClick }) => {
  const { t } = useTranslation()

  const handleClick = useCallback(() => { onClick?.()}, [onClick]);
  
  return (
    <Suspense fallback={<></>}>
      <CustomButton
        onClick={handleClick}
        className="w-full   text-[16px] font-semibold py-3 rounded-lg customBtnColor"
      >
        {t('Get_PANCHANG')}
      </CustomButton>
    </Suspense>
  );
};

export default React.memo(DayPanchangButton);
