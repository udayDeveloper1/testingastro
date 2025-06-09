import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import CustomButton from '../../component/Homepage/CustomButton';

const NotificationCard = ({ userName, question, onAccept, onReject }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
          <MessageOutlined />
        </div>
        <div>
          <p className="text-sm font-semibold new_body_font font-bold">{userName} has asked a question</p>
        </div>
      </div>

      <div className="bg-gray-50 p-3 rounded-[10px] text-gray-600 text-sm mb-4 border border-dashed border-gray-300">
        “{question}”
      </div>

      <div className="flex justify-end gap-3">
        <CustomButton danger onClick={onReject} className=' px-5 py-2'>
          Reject
        </CustomButton>
        <CustomButton type="primary" onClick={onAccept} className=' px-5 py-2'>
          Accept
        </CustomButton>
      </div>
    </div>
  );
};

export default NotificationCard;
