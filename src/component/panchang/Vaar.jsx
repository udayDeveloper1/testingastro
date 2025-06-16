import { Card, Typography } from "antd";
import { memo } from "react";

const { Title, Paragraph } = Typography;

const Vaar = ({
  title,
  introText,
  data,
  footerText,
  arrayTitle,
  listStyle,
}) => {
  return (
    <Card title={title} bordered={false} className="structureHinduCalender">
      <div className="flex flex-col gap-5">
        {/* Dynamic Intro Text */}
        {introText && (
          <Paragraph className="struct_heading mb-0">
            <span>{introText}</span>
          </Paragraph>
        )}
        {arrayTitle && (
          <Title level={5} className="struct_heading">
            {arrayTitle}
          </Title>
        )}
        {/* Dynamic List Data */}
        <ul
          className={`list-${listStyle} pl-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-4`}
        >
          {data?.map((item, index) => (
            <li key={index} className="struct_title">
              {item.title ? `${item.title}:` : ""}
              <span className="struct_Para"> {item.description}</span>
            </li>
          ))}
        </ul>

        {/* Dynamic Footer Text */}
        {footerText && (
          <Paragraph className="struct_heading">{footerText}</Paragraph>
        )}
      </div>
    </Card>
  );
};

export default memo(Vaar);
