// components/DataWrapper.jsx
// import NoDataFound from '../../pages/NoDataFound/NoDataFound';

import React, { memo, Suspense } from 'react';

// import Loader2 from '../loader/Loader2';
const NoDataFound = React.lazy(() => import('../../pages/NoDataFound/NoDataFound'));
const Loader2 = React.lazy(() => import('../loader/Loader2'));

const DataWrapper = ({ data, undefine, children }) => {
  const isEmptyArray = Array.isArray(data) && data.length === 0;
  const isEmptyObject = typeof data === 'object' && data !== null && Object.keys(data).length === 0;

  if ((!data)) {
    return (

      <Suspense fallback={<></>}>
        <div className="pb-10 pt-24 min-h-[100vh]">
          <Loader2 />
        </div>
      </Suspense>
    );
  } else if ((!data && isEmptyArray && isEmptyObject)) {

    return <Suspense fallback={<></>}> <NoDataFound /> </Suspense>;

  } else {
    return <>{children}</>;
  }

  // if ((!data || isEmptyArray || isEmptyObject) && undefine) {
  //   return <NoDataFound />;
  // }

};

export default memo(DataWrapper);
