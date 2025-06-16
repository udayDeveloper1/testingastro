import { Select } from "antd";
import "antd/dist/reset.css"; // Ensure Ant Design styles are applied
import React from "react";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const HoroscopeCard = React.memo(() => {
  const { t } = useTranslation()
  return (
    <div className="pt-0 grid grid-cols-1 lg:grid-cols-3 gap-2">
      {/* Left Content */}
      <div className="md:col-span-2 space-y-6 flex flex-col">
        <Section title="Personal" text="Today will be a great day for you. Whether you are single or taken, you are feeling the power of Venus. Married signs will feel the passion explode!" />
        <Section title="Travel" text="Take lots of photos when traveling, because years from now, it's going to make you feel a certain type of way." />
        <Section title="Money" text="The numbers 22 and 34 will bring you good luck. Jupiter has your back today." />
        <Section title="Career" text="Divide your workload to make it easier for you to actually get the job done. Talking to a co-worker will put you at ease today." />
        <Section title="Health" text="Don't forget to stay hydrated and stay away from very greasy food. Your stomach won't take it well." />
        <Section title="Emotions" text="Someone from the family might be going through a tough time today, and they need your shoulder to cry on. Try your best to support them and to be there for them." />
      </div>

      {/* Right Sidebar */}
      <div className="rounded-[10px] p-1 md:p-6 px-3 w-full md:w-80 selectSide">
        <h3 className="horoscopeListSidebarH3 pb-6">Select Other Sign</h3>
        <Select defaultValue="Aries" className="w-full mb-4">
          {[
            "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
            "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
          ].map((sign) => (
            <Option key={sign} value={sign}>
              {sign}
            </Option>
          ))}
        </Select>

        <h3 className="horoscopeListSidebarH3 pt-4">{t('horoscopes')}</h3>
        <ul className="space-y-2">
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Today's Horoscope</li>
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Today's Love Horoscope</li>
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Tomorrow's Horoscope</li>
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Yesterday's Horoscope</li>
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Weekly Horoscope</li>
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Monthly Horoscope</li>
          <li className="horoscopeListSidebarLi py-6 cursor-pointer">Annual Horoscope</li>
        </ul>
      </div>
    </div>
  );
});

// Memoized Section Component
const Section = React.memo(({ title, text }) => (
  <div>
    <h2 className="horoscopeListSidebarH3">{title}</h2>
    <p className="commonQuesP">{text}</p>
  </div>
));

export default HoroscopeCard;
