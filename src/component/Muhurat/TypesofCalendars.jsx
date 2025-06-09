import React from "react";
import { Card, Typography } from "antd";

const { Title, Paragraph } = Typography;

// Updated Data for the Hindu Calendar Structure
const hinduCalendarData = [
  {
    title: "Hindu Calendar 2024",
    description:
      "The Hindu calendar, also known as the Panchang, follows a lunar system and is rich in cultural significance. In 2024, it marks various festivals, ceremonies, and auspicious dates based on lunar movements. It's widely used across India and neighboring countries to plan religious events and celebrations.",
  },
  {
    title: "Islamic Calendar 2024",
    description:
      "The Islamic calendar, or Hijri calendar, is a lunar calendar used by Muslims globally. It consists of 12 months, each 29 or 30 days long, totaling 354 or 355 days in a year. It is crucial for determining Islamic events and holidays, such as Ramadan and Eid al-Fitr, which are based on lunar observations.",
  },
  {
    title: "Sikh Holidays 2024",
    description:
      "Sikhism follows the Nanakshahi calendar, introduced by Guru Nanak in 1999. This solar calendar determines Sikh festivals and important dates. In 2024, it marks events like Vaisakhi and Gurpurab, celebrating the birth anniversaries of Sikh Gurus. The calendar is used by Sikhs worldwide to commemorate their religious heritage.",
  },
  {
    title: "Christian Calendar 2024",
    description:
      "The Christian calendar, based on the Gregorian calendar, is widely used globally for civil purposes. It marks Christian holidays like Christmas and Easter, following a solar system. In 2024, Christians will observe various religious events and Sundays, shaping their worship schedules and significant celebrations.",
  },
  {
    title: "Jain Calendar 2024",
    description:
      "The Jain calendar, also known as the Vira Nirvana Samvat, follows a lunar system. Jains commemorate important events in the lives of Tirthankaras (spiritual leaders) and observe fasting days. In 2024, the calendar guides Jains in their religious practices, including Paryushana, a significant fasting period aimed at spiritual purification.",
  },
  {
    title: "Buddhist Calendar 2024",
    description:
      "Buddhists use various regional lunar calendars, with the Theravada tradition following the Buddhist Era (BE) calendar. In 2024, Buddhists will observe events like Vesak, marking the birth, enlightenment, and death of Gautama Buddha. The lunar calendar plays a vital role in scheduling Buddhist rituals, meditation practices, and community gatherings.",
  },
];

const TypesofCalendars = () => {
  return (
    <Card title="Types Of Calendars" bordered={false} className="structureHinduCalender">
      <div className="flex flex-col gap-1">
        <Paragraph className="struct_heading">
          India is a culturally diverse nation with a rich history of various calendar systems used over the centuries. Here are some of the prominent types of calendars that have been traditionally followed in India:
        </Paragraph>

        {hinduCalendarData.map((item, index) => (
          <div key={index} className="flex flex-col">
            <Title level={5} className="struct_title">• {item.title}</Title>
            <Paragraph className="struct_Para">{item.description}</Paragraph>
          </div>
        ))}

        <Paragraph className="struct_heading">
          These diverse calendar systems highlight India's cultural mosaic and its ability to accommodate various traditions and beliefs. While the Gregorian calendar is widely used for practical purposes, the traditional calendars continue to play a vital role in the lives of people for religious, cultural, and astrological events.
        </Paragraph>
      </div>
    </Card>
  );
};

export default TypesofCalendars;
