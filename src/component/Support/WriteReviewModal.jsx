import React, { useState } from 'react';
import { Modal, Rate, Input, Button, message, Form } from 'antd';
import CustomButton from '../Homepage/CustomButton';
import { useDispatch } from 'react-redux';
import { closeModel, TOAST_ERROR, TOAST_SUCCESS } from '../../utils/CommonFunction';
import { addRattingReview } from '../../services/api/api.services';
import { Codes } from '../../utils/CommonVariable';
import { useParams } from 'react-router';

const { TextArea } = Input;

const WriteReviewModal = ({ open, setOpen }) => {
  const dispatch = useDispatch()
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    closeModel(dispatch);
    setRating(0);
    setReview('');
  };

  const handleSubmit = (data) => {
    let request = {
      astrologer_id: id,
      rating: data?.ratting,
      review: data?.review
    }
    addRattingReview(request).then((response) => {
      if (response?.code === Codes?.SUCCESS) {
        TOAST_SUCCESS(response?.message);
        closeModel(dispatch)
      } else {
        TOAST_ERROR(response?.message)
      }
    })
  };

  return (
    // <Modal
    //   title="Write a Review"
    //   open={open}
    //   onCancel={handleCancel}
    //   footer={[
    //     <>
    //       <div className='flex justify-end'>
    //         <CustomButton key="cancel" onClick={handleCancel}>
    //           Cancel
    //         </CustomButton>,
    //         <CustomButton
    //           key="submit"
    //           type="primary"
    //           loading={loading}
    //           onClick={handleSubmit}
    //         >
    //           Submit
    //         </CustomButton>,
    //       </div>
    //     </>

    //   ]}
    // >
    //   <div className="mb-3">
    //     <p className="font-medium">Your Rating:</p>
    //     <Rate value={rating} onChange={setRating} />
    //   </div>

    //   <div className="mb-3">
    //     <p className="font-medium">Your Review:</p>
    //     <TextArea
    //       rows={4}
    //       value={review}
    //       onChange={(e) => setReview(e.target.value)}
    //       placeholder="Write your thoughts here..."
    //     />
    //   </div>
    // </Modal>
    <Modal
      title="Write a Review"
      open={open}
      onCancel={handleCancel}
      footer={null} // Let the Form handle the submission button
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit} // Will be triggered on submit
      >
        <Form.Item
          label="Your Rating"
          name="rating"
          rules={[{ required: true, message: 'Please provide a rating!' }]}
        >
          <Rate />
        </Form.Item>

        <Form.Item
          label="Your Review"
          name="review"
          rules={[{ message: 'Please enter your review!' }]}
        >
          <TextArea rows={4} placeholder="Write your thoughts here..." />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <CustomButton onClick={handleCancel}>
            Cancel
          </CustomButton>
          <CustomButton
            htmltype="submit"
            type="primary"
            loading={loading}
          >
            Submit
          </CustomButton>
        </div>
      </Form>
    </Modal>
  );
};

export default WriteReviewModal;
