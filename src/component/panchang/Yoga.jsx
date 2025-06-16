import React, { memo } from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Yoga = ({ title, introText, data }) => {
  return (
    <Card
      title={<Title level={4} className=" mb-0"><span className="new_body_font commonQuesH2">{title}</span> </Title>}
      bordered={false}
      className="structureHinduCalender "
    >
      <div className="flex flex-col gap-5">
        {/* Introductory Text */}
        {Array.isArray(introText) &&
          introText.map((text, idx) => (
            <Paragraph key={idx} className=" new_body_font font-bold mb-0">
              {text}
            </Paragraph>
          ))}

        {/* List of 27 Yogas */}
       <ul className="flex flex-col gap-2">
  {data.map((item, index) => (
    <li key={index} className="flex items-start gap-2 struct_title">
      <span className="min-w-[24px] font-medium">{index + 1}.</span>
      <div>
        <span className="text-[16px] font-semibold text-[#343434]">{item.name}</span>{" "}
        <span className="commonQuesP">{item.description}</span>
      </div>
    </li>
  ))}
</ul>
      </div>
    </Card>
  );
};

export default memo(Yoga);
