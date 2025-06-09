import React from "react";
import { Card, Typography } from "antd";

const { Title, Text } = Typography;

const NamingMuhuratList = ({ muhuratData }) => {
  return (
    <div className="py-4 flex flex-col gap-10">
      {muhuratData.map((monthData, monthIndex) => (
        <Card
          key={monthIndex}
          title={<Title level={3}>{monthData.month}</Title>}
          className="namingMainDiv structureHinduCalender"
        >
          <div className="space-y-4 flex flex-col gap-5">
            {monthData.muhurat_dates.map((muhurat, index) => (
              <Card key={index} bordered={false} className="namingCard">
                <Title level={5} className="namingTitle">
                  <span className="struct_heading">
                    {muhurat.date}, {muhurat.day}
                  </span>
                </Title>

                <div className="flex flex-wrap space-x-5 text-gray-600">
                  <Text className="mr-1">
                    <strong className="struct_title">Naming Muhurat:</strong>{" "}
                    <span className="struct_Para">{muhurat.naming_muhurat},</span>
                  </Text>
                  <Text className="mr-1">
                    <strong className="struct_title">Nakshatra:</strong>
                    <span className="struct_Para"> {muhurat.nakshatra}, </span>
                  </Text>
                  <Text className="mr-1">
                    <strong className="struct_title">Tithi:</strong>{" "}
                    <span className="struct_Para">{muhurat.tithi} </span>
                  </Text>
                </div>

                {muhurat.alternate_muhurat && (
                  <div className="flex flex-wrap space-x-5 text-gray-600">
                    <Text className="mr-1">
                      <strong className="struct_title">Alternate Muhurat:</strong>
                      <span className="struct_Para"> {muhurat.alternate_muhurat.time} </span>
                    </Text>
                    <Text className="mr-1">
                      <strong className="struct_title">Nakshatra:</strong>
                      <span className="struct_Para"> {muhurat.alternate_muhurat.nakshatra}</span>
                    </Text>
                    <Text className="mr-1">
                      <strong className="struct_title">Tithi:</strong>
                      <span className="struct_Para"> {muhurat.alternate_muhurat.tithi}</span>
                    </Text>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NamingMuhuratList;
