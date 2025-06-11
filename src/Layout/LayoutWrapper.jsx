// components/LayoutWrapper.jsx
import  React ,{ useRef, useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { setPageScroll } from '../storemain/slice/MasterSlice';
import SEO from '../SEO';
import { Outlet } from 'react-router-dom';
const Footer = lazy(() => import('./Footer'))
const LayoutWrapper = ({ children, showFooter = true }) => {
  const scrolltoTopRef = useRef();
  const location = useLocation();
  const dispatch = useDispatch();
  const pageScroll = useSelector(state => state?.masterSlice?.pageScroll);

  useEffect(() => {
    if (scrolltoTopRef.current) {
      scrolltoTopRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (pageScroll) {
      dispatch(setPageScroll(false));
    }
  }, [location?.pathname, pageScroll]);


  return (
    <div ref={scrolltoTopRef}>
      <SEO />
      {children}
      <Outlet />
      {showFooter && <Footer />}
    </div>
  );
};

export default React.memo(LayoutWrapper);
