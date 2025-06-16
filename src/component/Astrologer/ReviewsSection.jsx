
import { Avatar, Card, Progress, Rate } from 'antd'
import React, { Suspense, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import reviewImage from '../../assets/img/astrologer/reviewImage.webp'
import { formatDate } from '../../utils/CommonFunction'
import { DateFormat } from '../../utils/CommonVariable'
const RatingsAndReviews = React.lazy(() => import('./RatingsAndReviews'));

const ReviewsSection = React.memo(({ RATTING_REVEW_LIST, astrologerDetails }) => {
  const { t } = useTranslation()

  // Memoize calculations related to ratings
  const ratings = useMemo(() => {
    const avgRatings = RATTING_REVEW_LIST?.avgRatings || {}
    return Object.fromEntries(
      Object.entries(avgRatings).map(([key, value]) => [
        key,
        parseFloat(value || '0')
      ])
    )
  }, [RATTING_REVEW_LIST])

  const totalRatings = useMemo(() => {
    return Object.values(ratings).reduce((sum, val) => sum + val, 0)
  }, [ratings])

  // Optimized rendering of reviews
  const renderReviews = useMemo(() => {
    const reviews = RATTING_REVEW_LIST?.ratingReviewList || []

    if (reviews.length > 0) {
      return reviews?.map((review, index) => (
        <Card
          key={index}
          className=' PersonReviewCard box_shadow_common w-full'
        >
          <div className='p-4 flex flex-col gap-3 items-start w-full'>
            <div className='flex gap-4 h-full'>
              <div className='h-full flex items-center justify-center'>
                <Avatar
                  size='large'
                  src={reviewImage}
                  className='h-full w-full'
                />
              </div>
              <div className='flex flex-col gap-1'>
                <h4 className='ratingCardHeadingH3'>
                  {review?.user_id?.mobile_number || 'User'}
                </h4>
                <p className='ratingCardHeadingP mb-0'>
                  {formatDate(
                    review?.created_at,
                    DateFormat?.ABBREVIATED_FULL_DATE_FORMAT
                  )}
                </p>
                <Rate
                  disabled
                  value={parseFloat(review?.rating) || 0}
                  className='website_color rateIcon'
                />
              </div>
            </div>
            <p className='commonQuesP'>{review?.review}</p>
          </div>
        </Card>
      ))
    }

    return (
      <Card className=' PersonReviewCard rating p-4 w-full border-none box_shadow_common'>
        <div className='flex flex-col items-start'>
          <h4 className='ratingCardHeadingH3 w-full text-center new_body_font'>
            {t('ratting_list_not_found')}
          </h4>
        </div>
      </Card>
    )
  }, [RATTING_REVEW_LIST, t])

  return (
    <div className='flex flex-col gap-4 rounded-lg review'>
      <div>
        <Suspense fallback={<></>}>
        <RatingsAndReviews />
        </Suspense>
      </div>
      <div className='grid grid-cols-4 gap-4'>

        <div className='col-span-4 md:col-span-2 flex flex-col justify-start gap-2 lg:gap-4 overflow-y-auto px-1 max-h-100 '>
          {renderReviews}
        </div>


        <div className='col-span-4 md:col-span-2 space-y-4 flex flex-col gap-4 justify-between'>
          <Card className='p-4 rating border-none rounded-[10px]'>
            <div className='flex justify-between items-center h-full w-full flex-col md:flex-row gap-6 md:gap-1'>
              <div className='h-full flex flex-col space-y-2 w-full md:w-[48%] justify-between order-2 md:order-1'>
                {[5, 4, 3, 2, 1].map(star => {
                  const starKey = `${star}Star`
                  const ratingCount = ratings[starKey] || 0
                  const percent =
                    totalRatings > 0 ? (ratingCount / totalRatings) * 100 : 0

                  return (
                    <div key={star} className='flex items-center gap-2'>
                      <span className='text-[18px] font-bold'>
                        {star} <span className='website_color'>★</span>
                      </span>
                      <Progress
                        percent={percent}
                        showInfo={false}
                        className='flex-1 website_color'
                      />
                    </div>
                  )
                })}
              </div>
              <div className='text-center flex flex-col gap-7 lg:gap-3 w-full md:w-[48%] justify-between h-full order-1 md:order-2'>
                <div className='flex flex-row md:flex-col justify-between md:justify-end items-start'>
                  <div className='flex flex-col items-start w-full'>
                    <h3 className='text-[24px] md:text-[52px] font-semibold mb-0 text-start md:text-end w-full'>
                      {RATTING_REVEW_LIST?.overallAvgRating || 0}
                    </h3>
                    <Rate
                      disabled
                      allowHalf
                      value={
                        parseFloat(RATTING_REVEW_LIST?.overallAvgRating) || 0
                      }
                      className='website_color text-start md:text-end w-full'
                    />
                  </div>
                  <div className='flex w-full'>
                    <div className='w-full h-full flex flex-col justify-between md:justify-end items-end gap-4'>
                      <p className='new_body_font font-[500] text-[18px] mb-0 text-end h-full w-full'>
                        {astrologerDetails?.orders} Orders
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
})

export default ReviewsSection
