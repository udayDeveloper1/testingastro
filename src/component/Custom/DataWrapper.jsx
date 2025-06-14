// components/DataWrapper.jsx
import React from 'react';
import Loader2 from '../loader/Loader2';
import NoDataFound from '../../pages/NoDataFound/NoDataFound';

const DataWrapper = ({ data, undefine, children }) => {
  const isEmptyArray = Array.isArray(data) && data.length === 0;
  const isEmptyObject = typeof data === 'object' && data !== null && Object.keys(data).length === 0;

  if ((!data)) {
    return (
      <div className="pb-10 pt-24 min-h-[100vh]">
        <Loader2 />
      </div>
    );
  } else if ((!data && isEmptyArray && isEmptyObject)) {

    return <NoDataFound />;

  } else {
    return <>{children}</>;
  }

  // if ((!data || isEmptyArray || isEmptyObject) && undefine) {
  //   return <NoDataFound />;
  // }

};

export default DataWrapper;
