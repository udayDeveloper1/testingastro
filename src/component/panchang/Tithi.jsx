import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Tithi = ({ title, introText, data, footerText, arrayTitle, listStyle }) => {
  return (
    <Card
      title={<Title level={4} className="mb-0"><span className="new_body_font commonQuesH2">{title}</span></Title>}
      bordered={false}
      className="structureHinduCalender"
    >
      <div className="flex flex-col gap-5">
        {/* Intro Text */}
        {Array.isArray(introText) &&
  introText.map((text, idx) => (
    <Paragraph key={idx} className=" new_body_font commonQuesP mb-0">
      {text}
    </Paragraph>
))}

        {/* List Section Title */}
        {arrayTitle && (
          <Title level={5} className="commonQuesP">
            {arrayTitle}
          </Title>
        )}

        {/* Bullet List */}
        <ul className={`list-${listStyle} pl-5 flex flex-col gap-3`}>
          {data?.map((item, index) => (
            <li key={index} className="struct_title">
              <span className="commonQuesP !font-semibold">{item.title}</span>
              {item.description && (
                <span className="commonQuesP"> – {item.description}</span>
              )}
            </li>
          ))}
        </ul>

        {/* Footer Text */}
        {footerText && (
          <Paragraph className="text-base new_body_font font-bold">
            {footerText}
          </Paragraph>
        )}
      </div>
    </Card>
  );
};

export default Tithi;
