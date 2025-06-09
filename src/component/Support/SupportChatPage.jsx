import React from 'react';
import { AudioOutlined } from '@ant-design/icons';

const categories = [
  "First Free Session", "Previous Order", "Payment Failure", "Technical Issue",
  "Astrologer Related", "Live Event Related", "AstroMall Related",
  "Offers & Coupons", "General FAQs", "Escalate The Issue"
];

const messages = [
  { text: "Hey there! How can I assist you today?", time: "08:22 AM", sender: "agent" },
  { text: "Hi", time: "08:20 AM", sender: "user" },
  { text: "Hello", time: "08:20 AM", sender: "user" },
  { text: "Hey! How can I help you today?", time: "08:22 AM", sender: "agent" },
];

function SupportChatPageComp() {
  return (
    <div className="w-full h-screen flex bg-[#f5f3fa] text-sm font-medium">
      {/* Sidebar */}
      <div className="w-[280px] bg-white border-r border-gray-200 flex flex-col justify-between rounded-l-xl overflow-hidden">
        <div>
          <div className="bg-[#7B61FF] text-white px-4 py-3 font-semibold">Help And Support</div>
          <ul className="divide-y divide-gray-100">
            {categories.map((cat, i) => (
              <li key={i} className="px-4 py-3 hover:bg-[#f1e9ff] flex justify-between items-center cursor-pointer">
                <span>{cat}</span>
                <span>{'>'}</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="m-4 bg-[#7B61FF] text-white rounded-full py-2 w-full">CREATE NEW CHAT</button>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col bg-white rounded-r-xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#7B61FF] text-white px-6 py-3 font-semibold">
          Support Chat
        </div>

        {/* Chat Body */}
        <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[60%] px-4 py-2 rounded-lg text-sm relative
                ${msg.sender === 'user' ? 'bg-[#7B61FF] text-white rounded-br-none' : 'bg-[#f5edf9] new_body_font font-bold rounded-bl-none'}`}>
                <p>{msg.text}</p>
                <span className="text-xs text-right block mt-1 opacity-70">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="px-6 py-4 border-t bg-[#f3edff]">
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm">
            <input
              type="text"
              placeholder="Write your message"
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <button className="text-[#7B61FF] text-xl">
              <AudioOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportChatPageComp;
