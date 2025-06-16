import { memo, useEffect, useState } from 'react'

const KundliChart = ({ allCharts }) => {

  const [data, setData] = useState([])

  const dataSetting = () => {

    const signs = [
      "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
      "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const ZodiacSigns = signs;

    const zodiacFromName = (name) => ZodiacSigns?.find(sign => sign === name);
    const zodiacFromIndex = (index) => ZodiacSigns[((index - 1 + 12) % 12)];
    const zodiacToIndex = (sign) => ZodiacSigns?.indexOf(sign) + 1;

    // Convert array to object for easy access
    const houseData = {};

    allCharts?.house_no?.forEach(item => {
      houseData[parseInt(item.number)] = item?.planets;
    });

    const lagnaZodiacIndex = (() => {
      const house1 = houseData[1];
      if (!house1) return 0;
      const ascendant = house1.find(p => p.name === "As");
      if (!ascendant) return 0;
      const sign = zodiacFromName(ascendant.zodiac);
      return sign ? zodiacToIndex(sign) : 0;
    })();

    const chartData = [];

    for (let house = 1; house <= 12; house++) {
      const zodiacIndex = ((lagnaZodiacIndex + house - 2) % 12) + 1;
      const zodiac = zodiacFromIndex(zodiacIndex);
      if (!zodiac) continue;

      const planets = houseData[house]?.map(p => p.name) || [];
      const signIndex = signs.findIndex(sign => sign === zodiac);
      const signNo = signIndex !== -1 ? signIndex + 1 : null;

      chartData.push({
        house,
        zodiac,
        signNo,
        planets
      });
    }

    setData(chartData);
  }

  useEffect(() => {

    dataSetting(); // Ensure this function is updating the data correctly
  }, [allCharts]);

  return (
    <div className='kundliBox'>
      <div className='kundliBox_line1'></div>
      <div className='kundliBox_line2'></div>
      <div className='kundliBox_line3'></div>
      <div className='kundliBox_line4'></div>
      {data?.map((ele, ind) => {
        const houseClass = `house${ele?.house}`;
        return (
          <div className={houseClass} key={ind}>
            <div className='mainTitle'>
              <p>{ele?.signNo}</p>
            </div>
            <div className='planetList'>
              <ul>
                {ele?.planets?.map((planet, index) => (
                  <li key={index} data-planet={planet}>
                    {planet}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default memo(KundliChart)
