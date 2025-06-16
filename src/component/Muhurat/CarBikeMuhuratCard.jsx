import { Card, Typography } from "antd";
import { memo } from "react";

const { Title, Paragraph, Text } = Typography;

const CarBikeMuhuratCard = ({ title, data, listStyle }) => {
  return (
    <Card title={title} bordered={false} className="structureHinduCalender">
      <div className="flex flex-col gap-5">
        {data.length > 0 ? (
          <ul className={`list-${listStyle} list-disc pl-5 grid grid-cols-1 md:grid-cols-2 gap-4`} >
            {data.map((item, index) => (
              <li key={index} className="struct_title mb-0">
                <Text strong>{item.date} ({item.day})</Text>:
                <Text className="struct_Para"> {item.time}</Text>
              </li>
            ))}
          </ul>
        ) : (
          <Paragraph className="text-center">No Muhurat timings available.</Paragraph>
        )}
      </div>
    </Card>
  );
};

export default memo(CarBikeMuhuratCard);
