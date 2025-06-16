import { Avatar, Card, Rate } from "antd";
import { t } from "i18next";
import { lazy, memo, Suspense, useMemo } from "react";

import { DatePicker, Form, Input, Modal, TimePicker } from "antd";
import { useState } from "react";
import bookpooja from "../../assets/img/bookpooja/bookpooja.svg";


const RatingsAndReviews = lazy(() => import("../../component/Astrologer/RatingsAndReviews"));
const CommonBanner = lazy(() => import("../../component/CommonBanner"));
const CustomButton = lazy(() => import("../../component/Homepage/CustomButton"));
const CustomWhiteButton = lazy(() => import("../../component/Homepage/CustomWhiteButton"));
const CommonInfoCard = lazy(() => import("../../component/Kaal/CommonInfoCard"));

// 🔧 Assumed utility import for date formatting

const BookPooja = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleSubmit = (values) => {
    setIsModalOpen(false);
  };

  const DUMMY_REVIEW_LIST = [
    {
      user_id: {
        mobile_number: "+91 9876543210",
      },
      created_at: "2025-06-01T10:30:00Z",
      rating: 4.5,
      review: "Very satisfied with the service. Would recommend to others!",
    },
    {
      user_id: {
        mobile_number: "+91 9123456780",
      },
      created_at: "2025-05-28T15:00:00Z",
      rating: 5,
      review: "Excellent and authentic experience. Thank you!",
    },
    {
      user_id: {
        mobile_number: "",
      },
      created_at: "2025-05-25T08:15:00Z",
      rating: 4,
      review: "Helpful insights from the astrologer. Nice platform!",
    },
  ];

  const renderReviews = useMemo(() => {
    const reviews = DUMMY_REVIEW_LIST;

    if (reviews.length > 0) {
      return reviews.map((review, index) => (
        <Card key={index} className="PersonReviewCard box_shadow_common w-full">
          <div className="p-[15px] md:p-[30px] flex flex-col gap-[20px] items-start w-full">
            <div className="flex gap-4 h-full">
              <Avatar
                size="large"
                src={"reviewImage"}
                className="w-[40px] h-[40px]"
              />
              <div className="flex flex-col justify-between">
                <h4 className="ratingCardHeadingH3">
                  {review?.user_id?.mobile_number || "User"}
                </h4>
                <p className="ratingCardHeadingP mb-0">
                  {/* {formatDate(review?.created_at, DateFormat?.ABBREVIATED_FULL_DATE_FORMAT)} */}
                </p>
                <Rate
                  disabled
                  value={parseFloat(review?.rating) || 0}
                  className="website_color rateIcon"
                />
              </div>
            </div>
            <p className="commonQuesP">{review?.review}</p>
          </div>
        </Card>
      ));
    }

    return (
      <Card className="PersonReviewCard rating p-4 w-full border-none box_shadow_common">
        <div className="flex flex-col items-start">
          <h4 className="ratingCardHeadingH3 w-full text-center text-gray-600">
            {t("ratting_list_not_found")}
          </h4>
        </div>
      </Card>
    );
  }, [t]);

  const cardList = [
    "Tension in home without reason?",
    "Frequent obstacles in business or job?",
    "Health issues without medical explanation?",
  ];

  return (
    <>
      {/* Banner Section */}
      <section>
        <CommonBanner text={t("Book_a_Pooja_banner")} highlight="" />
      </section>
<Suspense fallback={<div className='min-h-[100vh]'></div>}>

      {/* Pooja Card Section */}
      <section className="">
        <div className="container mx-auto paddingTop100 paddingBottom50 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 2xl:gap-[24px] items-center">
            {/* Left Image */}
            <div className="w-full flex justify-center lg:justify-start">
              <div className="max-h-[261px] lg:max-h-[unset] max-w-[423px] xl:max-w-[603px] xl:max-w-[unset] xl:w-full h-full overflow-hidden rounded-[10px]">
                <img
                  src={bookpooja}
                  alt="Pitru Dosh Nivaran Puja"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="p-[15px] md:p-[30px] flex flex-col justify-between box_shadow_common rounded-[10px] bg-white h-full">
              <div className="flex flex-col gap-[20px]">
                <h2 className="commonQuesH2">Pitru Dosh Nivaran Puja</h2>
                <p className="commonQuesP">
                  Pitru Dosh Nivaran Puja is a sacred Hindu ritual performed to
                  appease ancestors and mitigate the effects of Pitru Dosha.
                </p>
                <div className="flex flex-col gap-[10px] xl:gap-[20px]">
                  <h3 className="commonQuesH3 mb-2">About Pooja</h3>
                  <ul className="pl-6 list-disc list-outside space-y-2">
                    {cardList.map((item, i) => (
                      <li key={i} className="commonQuesP">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex flex-row lg:flex-col xl:flex-row items-center md:items-start xl:items-center gap-[10px] justify-between mt-[20px] xl:mt-[35px]">
                <div className="commonQuesH2 gradient-text">₹ 6,100</div>
                <CustomButton
                  className="text-white px-6 py-2"
                  parentClassName="md:min-w-[272px]"
                  onClick={handleOpenModal}
                >
                  BOOK NOW
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section>
        <div className="container mx-auto flex flex-col gap-[10px] paddingBottom50">
          <CommonInfoCard title={t("rahukal_title_1")} list={cardList} />
          <CommonInfoCard title={t("rahukal_title_1")} list={cardList} />
        </div>
      </section>

      {/* Reviews Section */}
      <section>
        <div className="container mx-auto flex flex-col gap-[10px] paddingBottom100">
          <RatingsAndReviews />
          {/* <ReviewsSection /> */}
          {renderReviews}
        </div>
      </section>

      <Modal
        title={
          <div className="commonQuesH2 px-[40px] py-[30px]">
            Enter Your Pooja Details.
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="customPoojaModal"
        width={800}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 p-[40px] bookPoojaForm"
        >
          <Form.Item
            name="date"
            label="Pooja Date"
            rules={[{ required: true, message: "Please select a date" }]}
            className=""
          >
            <DatePicker className="w-full" format="DD-MM-YYYY" />
          </Form.Item>

          <Form.Item
            name="time"
            label="Pooja Time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker className="w-full" format="HH:mm" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone number"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter Your Phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            className="md:col-span-2"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter Your Address" />
          </Form.Item>

          <div className="md:col-span-2 flex justify-between gap-4 mt-2">
            <CustomWhiteButton
              type="button"
              onClick={handleCancel}
              className="w-full px-3 py-2"
              parentClassName="w-full "
            >
              CANCEL
            </CustomWhiteButton>
            <CustomButton
              type="submit"
              className="w-full px-3 py-2"

              parentClassName="w-full "
            >
              SUBMIT
            </CustomButton>
          </div>
        </Form>
      </Modal>
      </Suspense>
    </>
  );
};

export default memo(BookPooja);
