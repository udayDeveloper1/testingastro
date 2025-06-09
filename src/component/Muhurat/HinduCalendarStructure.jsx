import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

// Data array for dynamic rendering
const hinduCalendarData = [
  {
    title: "Lunar Months",
    description: "The calendar comprises 12 or 13 lunar months in a year, each beginning with the new moon.",
  },
  {
    title: "Tithi",
    description: "Tithi represents a lunar day and is calculated based on the angular distance between the Sun and the Moon. There are almost 30 tithis in a lunar month.",
  },
  {
    title: "Nakshatras",
    description: "Indian astrology divides the ecliptic into 27 or 28 nakshatras, or lunar mansions, each with its unique qualities.",
  }, 
  {
    title: "Solar Months",
    description: "The Indian calendar also incorporates solar months based on the Sun’s position in the zodiac.",
  },
  {
    title: "Leap Months",
    description: "To align the lunar and solar years, an additional month, called an 'Adhik Maas' or 'Mal Maas,' is inserted every few years.",
  },
  {
    title: "Saka Era",
    description: "The Indian calendar uses the Saka Era, which starts in 78 CE and is 78 years ahead of the Gregorian calendar.",
  },
  {
    title: "Festivals and Celebrations",
    description: "The calendar plays a pivotal role in determining the dates of various festivals and religious observances across India’s diverse regions and communities.",
  },
  {
    title: "Regional Variations",
    description: "India’s vastness leads to regional variations, with different states often following distinct calendars, like the Bengali, Tamil, or Malayalam calendars.",
  },
  {
    title: "Luni-Solar Adjustments",
    description: "Periodically, leap years or intercalary months are introduced to realign the lunar and solar cycles.",
  },
];

const HinduCalendarStructure = () => {
  return (
    <Card title="Structure Of Hindu Calendar" bordered={false} className="structureHinduCalender">
        <div className="flex flex-col gap-1">
      <Paragraph className="struct_heading">
        The Indian calendar, a complex and culturally rich system, exhibits a unique structure deeply intertwined with its history and traditions.
        Predominantly a lunisolar calendar, it combines lunar phases and solar cycles to reckon time.
        The primary components of the Indian calendar include:
      </Paragraph>

      {hinduCalendarData.map((item, index) => (
        <div key={index} className="flex flex-col">
          <Title level={5} className="struct_title">{index + 1}. {item.title}</Title>
          <Paragraph className="struct_Para">{item.description}</Paragraph>
        </div>
      ))}

      <Paragraph className="struct_heading">
        The Indian calendar is a dynamic and culturally significant timekeeping system, reflecting the diversity and richness of the nation’s heritage.
        Its structure serves as a guide for religious, social, and agricultural activities, connecting people to their traditions and the celestial rhythms of the universe.
      </Paragraph>
      </div>
    </Card>
  );
};

export default HinduCalendarStructure;
