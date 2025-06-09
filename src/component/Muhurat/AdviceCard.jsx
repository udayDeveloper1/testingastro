import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const AdviceCard = ({ title, description, advantages = [], disadvantages = [] }) => {
  return (
    <Card
      bordered={false}
      title={<Title level={4} className="m-0 ">{title}</Title>}
      className="shadow-md  bg-white rounded-lg structureHinduCalender"
    >
      {/* Description */}
      <Paragraph className="text-gray-600 struct_Para">{description}</Paragraph>

      {/* Advantages Section */}
      {advantages.length > 0 && (
        <>
          <Title level={5} className="font-semibold struct_heading mt-4">Advantages:</Title>
          <ul className="grid gap-2 pl-5 new_body_font font-bold list-disc">
            {advantages.map((adv, index) => (
              <li key={index} className="struct_Para">
                <span className="font-semibold">{adv.title}:</span> {adv.description}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Disadvantages Section */}
      {disadvantages.length > 0 && (
        <>
          <Title level={5} className="font-semibold struct_heading mt-4">Disadvantages:</Title>
          <ul className="grid gap-2 pl-5 new_body_font font-bold list-disc">
            {disadvantages.map((dis, index) => (
              <li key={index} className="struct_Para">
                <span className="font-semibold">{dis.title}:</span> {dis.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
};

export default AdviceCard;
