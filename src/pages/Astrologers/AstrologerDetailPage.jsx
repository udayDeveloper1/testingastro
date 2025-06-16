import { lazy, memo, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import astroDetailPageBanner from "../../assets/img/banner/astroDetailPageBanner.webp";
import { useTranslation } from "react-i18next";
import { astrologerDetailsAPI, rattingReviewList } from "../../services/api/api.services";
import { setLoading } from "../../storemain/slice/MasterSlice";
import { Codes } from "../../utils/CommonVariable";
import CommonBanner from "../../component/CommonBanner";

const AstrologerCard = lazy(() => import("../../component/Astrologer/AstrologerCard"));
const ReviewsSection = lazy(() => import("../../component/Astrologer/ReviewsSection"));
const Loader = lazy(() => import("../../component/loader/Loader"));

function AstrologerDetailPageComponent() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const loader = useSelector(state => state?.masterSlice?.loader);
  const { t } = useTranslation()
  const [astrologerDetails, setAstrologerDetails] = useState({});
  const [rattingListReview, setRattingReviewList] = useState([]);

  const fetchAstrologerDetails = useCallback(async () => {

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
  }, [id, t]);

  useEffect(() => {
    if (id) {
      // if (isFetched.current) return;
      // isFetched.current = true;
      fetchAstrologerDetails();
    }
  }, [fetchAstrologerDetails]);

  return (
    <>
      {loader?.is_loading && loader?.loding_type === "astro_details" ? (
        <div className="min-height">
          <Loader />
        </div>
      ) : (
        <>
        <Suspense fallback={<div className='min-h-[100vh]'></div>}>
          <section>
            <CommonBanner
              // backgroundImage={astroDetailPageBanner}
              text={t('Astrologer_Profile')}
              highlight=""
            />
          </section>
         
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
          </Suspense>
        </>
      )}
    </>
  );
}

// Wrap component with memo for performance optimization
const AstrologerDetailPage = memo(AstrologerDetailPageComponent);

export default AstrologerDetailPage;
