import React from "react";
import NotesDosha from "./NotesDosha";
import CustomTable from "../../../Custom/CustomTable";

function Sadesati() {

 const rudrakshTop ={
    rudrakshaSuggestionReport: {
      title: "Shani Sade Sati: Rising Phase",
      content: [
        "Ascendant is one of the most sought concepts in astrology when it comes to predicting the minute events in your life. At the time of birth, the sign that rises in the sky is the person's ascendant. It helps in making predictions about the minute events, unlike your Moon or Sun sign that help in making weekly, monthly or yearly predictions for you.",
        "Your ascendant is Virgo"
      ]
    },
    rudrakshaImportance: {
      title: "Rudraksha & its importance",
      content: [
        "Those born with the Virgo ascendant are really polite and reserved individuals. They don't react much, even when situations seem to be going out of their control. These people sport a calm posture, and hence you feel very safe and content around them. However, some people misunderstand their calmness for them being cold and egoistic, which is rarely the case. These people have an eye for detail and have the ability to solve even the most complex problems. For some people, Virgo ascendant is really a lifeline. Also, these individuals can get very critical at times and thus don't shy away from saying the harshest truth. They believed that's how they make themselves useful to others. Virgo Ascendant people are prone to worry and hypochondria apart from being critical of self."
      ]
    },
    recommendation: {
      title: "Recommendation",
      content: [
        "Those born with the Virgo ascendant are really polite and reserved individuals. They don't react much, even when situations seem to be going out of their control. These people sport a calm posture, and hence you feel very safe and content around them. However, some people misunderstand their calmness for them being cold and egoistic, which is rarely the case. These people have an eye for detail and have the ability to solve even the most complex problems. For some people, Virgo ascendant is really a lifeline. Also, these individuals can get very critical at times and thus don't shy away from saying the harshest truth. They believed that's how they make themselves useful to others. Virgo Ascendant people are prone to worry and hypochondria apart from being critical of self."
      ]
    }
  };


  const doshaData = [
    {
      title: "No",
      subTitle: "Current Sadesati Status",
      content: "Your next Sadesati starts from 11-Dec-2043.",
    },
  ];

  const columns = [
    {
      title: "Start",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "End",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Sign Name",
      dataIndex: "sign",
      key: "sign",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];
  const dataSource = [
    {
      key: 1,
      start: "2-11-2014",
      end: "26-1-2017",
      sign: "Scorpio",
      type: "Rising",
    },
    {
      key: 2,
      start: "26-1-2017",
      end: "21-6-2017",
      sign: "Sagittarius",
      type: "Peak",
    },
    {
      key: 3,
      start: "2-11-2014",
      end: "26-1-2017",
      sign: "Scorpio",
      type: "Rising",
    },
    {
      key: 4,
      start: "26-1-2017",
      end: "21-6-2017",
      sign: "Sagittarius",
      type: "Peak",
    },
    {
      key: 5,
      start: "2-11-2014",
      end: "26-1-2017",
      sign: "Scorpio",
      type: "Rising",
    },
    {
      key: 6,
      start: "26-1-2017",
      end: "21-6-2017",
      sign: "Sagittarius",
      type: "Peak",
    },
    {
      key: 7,
      start: "2-11-2014",
      end: "26-1-2017",
      sign: "Scorpio",
      type: "Rising",
    },
    {
      key: 8,
      start: "26-1-2017",
      end: "21-6-2017",
      sign: "Sagittarius",
      type: "Peak",
    },
    {
      key: 9,
      start: "2-11-2014",
      end: "26-1-2017",
      sign: "Scorpio",
      type: "Rising",
    },
    {
      key: 10,
      start: "26-1-2017",
      end: "21-6-2017",
      sign: "Sagittarius",
      type: "Peak",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="commonQuesH2">Manglik Analysis</h2>

          {doshaData.map((item, index) => (
            <NotesDosha
              key={index}
              title={item.title}
              subTitle={item.subTitle}
              content={item.content}
              disclaimer={item.disclaimer}
            />
          ))}
        </div>

        <div>
          <CustomTable
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered
            className="dasha_siddha" 
          />
        </div>

        {Object.values(rudrakshTop).map((section, index) => (
    <section
      key={index}
      className="kundali-section pb-6 mb-5 flex flex-col gap-5 kundali_section_customBorderBottom"
    >
      <h2 className="commonQuesH2">{section.title}</h2>
      {section.content.map((paragraph, pIndex) => (
        <p key={pIndex} className="commonQuesP">
          {paragraph}
        </p>
      ))}
    </section>
  ))}

      </div>
    </>
  );
}

export default Sadesati;
