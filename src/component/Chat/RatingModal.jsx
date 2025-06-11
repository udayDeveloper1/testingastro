import React, { useCallback, useMemo, useState } from "react";
import { Modal, Avatar, Input, Rate } from "antd";
import { CloseOutlined } from "@ant-design/icons";
// import CustomButton from "../Homepage/CustomButton";
const CustomButton = React.lazy(() => import("../Homepage/CustomButton"));


const { TextArea } = Input;

const RatingModal = React.memo(({
  visible,
  onClose,
  onSubmit,
  expertName = "",
  imageUrl,
  astrologerId = ""
}) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const fallbackAvatar = useMemo(() => "https://i.pravatar.cc/100", []);

  const handleRatingChange = useCallback((value) => {
    setSelectedRating(value);
    if (error) setError("");
  }, [error]);

  const handleSubmit = useCallback(() => {
    if (!selectedRating) {
      setError("Minimum one star is required");
      return;
    }

    const payload = {
      astrologer_id: astrologerId,
      rating: selectedRating,
      review: review.trim()
    };

    onSubmit?.(payload);
    onClose();
    setSelectedRating(null);
    setReview("");
    setError("");
  }, [selectedRating, review, astrologerId, onSubmit, onClose]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined style={{ color: "white" }} />}
      centered
      width={500}
      className="custom-rating-modal"
    >
      {/* Header */}
      <div className="bg-[#f3e8ff] px-4 py-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-3">
          <Avatar size={40} src={imageUrl || fallbackAvatar} />
          <span className="text-sm font-semibold">{expertName}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <p className="text-center font-semibold text-base mb-4">
          How likely are you to promote the expert?
        </p>

        <div className="bg-white border border-[#E5E7EB] p-3 rounded-lg flex items-center">
          <p className="text-[18px] font-bold mb-0 pe-5">Ratings:</p>
          <Rate
            allowHalf
            value={selectedRating}
            onChange={handleRatingChange}
            style={{ fontSize: "35px", color: "#6C2BD9" }}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-1 px-1">{error}</p>
        )}

        <div className="flex justify-between text-[14px] new_body_font mt-2 px-1">
          <span>Not Likely</span>
          <span>Very Likely</span>
        </div>

        <div className="mt-5">
          <TextArea
            rows={4}
            placeholder="Write your review here 😃"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="rounded-md"
          />
        </div>

        <div className="w-full">
          <CustomButton
            block
            className="mt-6 bg-[#6C2BD9] text-white w-full rounded-md font-semibold py-2 text-sm hover:bg-[#5822b1] transition-all"
            onClick={handleSubmit}
          >
            SUBMIT
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
});

export default RatingModal;

