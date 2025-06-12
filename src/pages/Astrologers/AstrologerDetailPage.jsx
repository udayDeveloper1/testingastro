import React, { useCallback, useEffect, useRef, useState, lazy, Suspense, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import astroDetailPageBanner from "../../assets/img/banner/astroDetailPageBanner.webp";
import CommonBanner from "../../component/CommonBanner";
import Loader from "../../component/loader/Loader";
import { astrologerDetailsAPI, rattingReviewList } from "../../services/api/api.services";
import { setLoading } from "../../storemain/slice/MasterSlice";
import { Codes } from "../../utils/CommonVariable";
import { useTranslation } from "react-i18next";

const AstrologerCard = lazy(() => import("../../component/Astrologer/AstrologerCard"));
const CommonHeadingSecond = lazy(() => import("../../component/Astrologer/CommonHeadingSecond"));
const ReviewsSection = lazy(() => import("../../component/Astrologer/ReviewsSection"));

function AstrologerDetailPageComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loader = useSelector(state => state?.masterSlice?.loader);
  const { t } = useTranslation()
  const [astrologerDetails, setAstrologerDetails] = useState({});
  const [rattingListReview, setRattingReviewList] = useState([]);

  const isFetched = useRef(false);

  const fetchAstrologerDetails = useCallback(async () => {
    if (isFetched.current) return;
    isFetched.current = true;
    dispatch(setLoading({ is_loading: true, loding_type: "astro_details" }));
    try {
      const request = { uniqueID: id };

      const astroResponse = await astrologerDetailsAPI(request);
      if (astroResponse?.code === Codes?.SUCCESS) {
        setAstrologerDetails(astroResponse?.data);
      }

      const reviewResponse = await rattingReviewList(request);
      if (reviewResponse?.code === Codes?.SUCCESS) {
        setRattingReviewList(reviewResponse?.data);
      }
    } finally {
      dispatch(setLoading({ is_loading: false, loding_type: "" }));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      // isFetched.current = false;
      fetchAstrologerDetails();
    }
  }, [fetchAstrologerDetails, id, t]);

  return (
    <>
      {loader?.is_loading && loader?.loding_type === "astro_details" ? (
        <div className="min-height">
          <Loader />
        </div>
      ) : (
        <>
          <section>
            <CommonBanner
              // backgroundImage={astroDetailPageBanner}
              text={t('Astrologer_Profile')}
              highlight=""
            />
          </section>
          {/* <section>
            <div className="container mx-auto padding50 flex flex-col gap-5 md:gap-10">
              <Suspense fallback={<div className='min-h-[100vh]'></div>}>
                <CommonHeadingSecond
                  heading={`${astrologerDetails?.name || ''} Profile`}
                  content={[`Yearly Aries Horoscope ${new Date().getFullYear()} Predictions`]}
                />
              </Suspense>
            </div>
          </section> */}

          <section>
            <div className="container mx-auto flex flex-col gap-10 padding50">
              <Suspense fallback={<></>}>
                <AstrologerCard astrologer={astrologerDetails} />
              </Suspense>
            </div>
          </section>

          {
            rattingListReview?.ratingReviewList?.length > 0 &&
            <section>
              <div className="container mx-auto padding50 flex flex-col gap-10 ">
                <Suspense fallback={<></>}>
                  <ReviewsSection RATTING_REVEW_LIST={rattingListReview} astrologerDetails={astrologerDetails} />
                </Suspense>
              </div>

            </section>
          }
        </>
      )}
    </>
  );
}

// Wrap component with memo for performance optimization
const AstrologerDetailPage = memo(AstrologerDetailPageComponent);

export default AstrologerDetailPage;
