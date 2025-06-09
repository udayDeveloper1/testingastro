import { Card } from 'antd'
import React from 'react'
import CustomTable from '../../Custom/CustomTable'
import { useTranslation } from 'react-i18next'

export default function Shadbal({ shadBala }) {
  const { t } = useTranslation()

  // const columns = [
  //     {
  //       title: "",
  //       dataIndex: "balaType",
  //       key: "balaType",
  //       fixed: "left",
  //       width: 200,
  //       render: (text) => (
  //         <span className="font-semibold text-gray-800">{text}</span>
  //       ),
  //     },
  //     "SUN", "MOON", "MARS", "MERCURY", "JUPITER", "VENUS", "SATURN"
  //   ].map((sign, index) =>
  //     typeof sign === "string"
  //       ? {
  //           title: sign === "Ar2" ? "Ar" : sign === "Ca2" ? "Ca" : sign,
  //           dataIndex: sign,
  //           key: sign,
  //           align: "center" ,
  //           render: (text) => <span className="new_body_font font-bold">{text}</span>,
  //         }
  //       : sign
  //   );
  // ---------------------------------------------------------
  // const planets = [
  //   'Sun',
  //   'Moon',
  //   'Mars',
  //   'Mercury',
  //   'Jupiter',
  //   'Venus',
  //   'Saturn',
  //   'Rahu',
  //   'Ketu'
  // ]
  // t('sun')

  const planets = [
    { key: 'Sun', value: t('sun') },
    { key: 'Moon', value: t('moon') },
    { key: 'Mars', value: t('mars') },
    { key: 'Mercury', value: t('mercury') },
    { key: 'Jupiter', value: t('jupiter') },
    { key: 'Venus', value: t('venus') },
    { key: 'Saturn', value: t('saturn') },
    { key: 'Rahu', value: t('rahu') },
    { key: 'Ketu', value: t('ketu') },
  ]

  const columns = [
    {
      title: '',
      dataIndex: 'bala_type',
      key: 'bala_type',
      fixed: 'left',
      width: 100
    },
    ...planets.map(planet => ({
      title: planet?.value,
      dataIndex: planet.key,
      key: planet?.key,
      width: 100
    }))
  ]

  // const result = Object.entries(shadBala)?.map(([key, values]) => {
  //   const row = {
  //     bala_type: key?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  //   };
  //   planets?.forEach(planet => {
  //     const val = values[planet];
  //     if (!isNaN(parseFloat(val))) {
  //       row[planet] = `${parseFloat(val)?.toFixed(2)}`;
  //     } else {
  //       row[planet] = val ?? "-";
  //     }
  //   });
  //   return row;
  // });

  const result = Object.entries(shadBala ?? {})?.map(([key, values = {}]) => {
    const row = {
      bala_type:
        key?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? ''
    }
    planets?.forEach(planet => {
      const val = values?.[planet?.key]
      if (!isNaN(parseFloat(val))) {
        row[planet?.key] = `${parseFloat(val).toFixed(2)}`
      } else {
        row[planet?.key] = val ?? '-'
      }
    })
    return row
  })

  return (
    <div className='flex flex-col gap-[24px]'>
      <div className='grid grid-cols-2 gap-6 sm:border commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px]'>
        <Card
          className='rounded-[10px] overflow-hidden shadow-md col-span-2'
          bodyStyle={{ padding: 0 }}
        >
          <div className='bg_website_color px-4 py-2'>
            <h3 className='new_common_heading'>{t('Shadbal')}</h3>
          </div>
          <CustomTable
            columns={columns}
            data={result}
            pagination={false}
            loading={false}
            scroll={{ x: 'max-content' }}
            bordered={false}
            className="lightBackHead"
          />
        </Card>
      </div>
    </div>
  )
}
