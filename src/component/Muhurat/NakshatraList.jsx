import { Card, Typography } from "antd";
import { memo } from "react";

const { Title, Paragraph } = Typography;

const NakshatraList = ({ title, nakshatras, summary, listStyle }) => {
  return (
    <Card bordered={false} className="shadow-sm p-5 bg-white rounded-lg">
      <Title level={4} className="font-semibold">{title}</Title>
      {nakshatras.map((nakshatra, index) => (
        <div key={index} className="mb-5">
          <Title level={5} className="font-semibold">{index + 1}. {nakshatra.name}</Title>
          <ul className={`list-${listStyle} pl-0 new_body_font font-bold`}>
            <li><strong>Symbol:</strong> {nakshatra.symbol}</li>
            <li><strong>Significance:</strong> {nakshatra.significance}</li>
            <li><strong>Why:</strong> {nakshatra.why}</li>
          </ul>
        </div>
      ))}
      <Paragraph className="new_body_font font-bold"><strong>{summary}</strong></Paragraph>
    </Card>
  );
};

export default memo(NakshatraList);
