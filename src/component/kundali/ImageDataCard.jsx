import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

const ImageDataCard = ({ title, period, content }) => {
  return (
    <Card 
      title={
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">   
            <span>{title}</span>
            {period && <Text type="secondary mb-0">({period})</Text>}
            </div>
         
        </div>
      } 
      bordered={false} 
      className="structureHinduCalender"
    >
      <div className="flex flex-col gap-5">
        {content && content.map((paragraph, index) => (
          <Paragraph key={index} className="struct_Para">
            {paragraph}
          </Paragraph>
        ))}
      </div>
    </Card>
  );
};


export default ImageDataCard;