import React from "react";
import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const Nakshatra = ({ title, introText, data, tableTitle }) => {
  // Split data into two columns
  const half = Math.ceil(data.length / 2);
  const leftColumn = data.slice(0, half);
  const rightColumn = data.slice(half);
  const { t } = useTranslation()
  return (
    <Card
      title={<Title level={4} className="mb-0"><span className="commonQuesH2">{title}</span></Title>}
      bordered={false}
      className="structureHinduCalender "
    >
      <div className="flex flex-col gap-5">
        {/* Intro Text */}
        {Array.isArray(introText) &&
          introText.map((text, idx) => (
            <Paragraph key={idx} className="text-base  mb-0">
              {text}
            </Paragraph>
          ))}

        {/* Table Title */}
        {tableTitle && (
          <Title level={5} className="text-lg font-semibold " >
           <span className="new_body_font text-[16px] font-semibold">{tableTitle}</span> 
          </Title>
        )}
         <Title level={5} className="text-lg font-semibold " >
           <span className=" text-[16px] font-medium">{t('No_English_Name_Devanagari_Name_Tamil_Name_Malayalam_Name')}</span> 
          </Title>
        {/* Grid Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[leftColumn, rightColumn].map((col, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-5">
              {col.map((item, index) => {
                const actualIndex = colIndex === 0 ? index : index + half;
                return (
                  <div key={actualIndex} className="flex gap-2 md:gap-5 ">
                    <span className="min-w-[24px] commonQuesP">{actualIndex + 1}</span>
                    <div className="">
                      <span className="commonQuesP">{item.english}</span>{" "}
                      <span className="commonQuesP">{item.devanagari}</span>{" "}
                      <span className="commonQuesP">{item.tamil}</span>{" "}
                      <span className="commonQuesP">{item.malayalam}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Nakshatra;
