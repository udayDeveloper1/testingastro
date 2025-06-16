import { Card, Typography } from "antd";
import { memo } from "react";


const { Title, Paragraph } = Typography;

const ZodiacLuckyColors = ({ title, icon, colors, tip }) => {
  return (
    <Card
      bordered={false}
      title={
        <div className="flex items-center gap-3 ">
          <img src={icon} alt={title} className="w-10 h-10" />
          <Title level={4} className="m-0 text-lg font-semibold">{title}</Title>
        </div>
      }
      className=" shadow-md structureHinduCalender zodiac-card"
    >
      {/* Lucky Colors Section */}
      <Paragraph className="text-base font-semibold struct_heading mb-2">
        Lucky Color: {colors.map((c) => c.name).join(" and ")}
      </Paragraph>

      {/* Color Description List */}
      <ul className="pl-5 flex flex-col gap-3">
        {colors.map((color, index) => (
          <li key={index} className="flex items-center gap-2">
            {/* Custom Colored Circle */}
            <div
              className="w-3 h-3 rounded-full border"
              style={{
                backgroundColor: color.code,
                borderColor: color.code.toLowerCase() === "#ffffff" ? "#333" : "transparent",
                boxShadow: color.code.toLowerCase() === "#ffffff" ? "0px 0px 3px #333" : "none",
              }}
            ></div>

            {/* Text Information */}
            <span className="struct_title font-semibold">{color.name}:</span>
            <span className="struct_Para new_body_font font-bold">{color.description}</span>
          </li>
        ))}
      </ul>

      {/* Tip Section */}
      {tip && <Paragraph className="mt-4 struct_heading">{tip}</Paragraph>}
    </Card>
  );
};

export default memo(ZodiacLuckyColors);
