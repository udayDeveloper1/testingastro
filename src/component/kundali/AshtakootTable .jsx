import React from 'react'
import CustomTable from '../Custom/CustomTable'
import { useTranslation } from 'react-i18next'

const AshtakootTable = ({ AshtakootData }) => {

  const { t } = useTranslation()

  const {
    tara = null,
    gana,
    yoni,
    bhakoot,
    grahamaitri,
    vasya,
    nadi,
    varna,
    score,
    bot_response
  } = AshtakootData || {}

  const columns = [
    {
      title: '',
      dataIndex: 'attribute',
      key: 'attribute',
      fixed: 'left',
      width: '120px',
      align: 'center',
    },
    {
      title: t('male'),
      dataIndex: 'male',
      key: 'male',
      width: '120px',
      align: 'center',

      // fixed: 'left',
      // sorter: true,
    },
    {
      title: t('female'),
      dataIndex: 'female',
      key: 'female',
      width: '120px',
      align: 'center',
    },
    {
      title: t('out_of'),
      dataIndex: "outOf",
      key: "outOf",
    },
    {
      title: t('score'),
      dataIndex: 'received',
      key: 'received',
      width: '120px',
      align: 'center',
    },
    {
      title: t('area_of_life'),
      dataIndex: 'areaOfLife',
      key: 'areaOfLife',
    }
  ]

  const data = [
    {
      key: 1,
      attribute: t('varna'),
      male: `${varna?.boy_varna || '-'}`,
      female: `${varna?.girl_varna || '-'}`,
      outOf: `${varna?.full_score || '-'}`,
      received: `${varna?.varna || '-'}`,
      areaOfLife: `${varna?.description || '-'}`,
    },
    {
      key: 2,
      attribute: t('vashya'),
      male: `${vasya?.boy_vasya || '-'}`,
      female: `${vasya?.girl_vasya || '-'}`,
      outOf: `${vasya?.full_score || '-'}`,
      received: `${vasya?.vasya || '-'}`,
      areaOfLife: `${vasya?.description || '-'}`,
    },
    {
      key: 3,
      attribute: t('tara'),
      male: `${tara?.boy_tara || '-'}`,
      female: `${tara?.boy_tara || '-'}`,
      outOf: `${tara?.full_score || '-'}`,
      received: `${tara?.tara || '-'}`,
      areaOfLife: `${tara?.description || '-'}`,
    },
    {
      key: 4,
      attribute: t('yoni'),
      male: `${yoni?.boy_yoni || '-'}`,
      female: `${yoni?.girl_yoni || '-'}`,
      outOf: `${yoni?.full_score || '-'}`,
      received: `${yoni?.yoni || '-'}`,
      areaOfLife: `${yoni?.description || '-'}`,
    },
    {
      key: 5,
      attribute: t('maitri'),
      male: `${grahamaitri?.boy_lord || '-'}`,
      female: `${grahamaitri?.girl_lord || '-'}`,
      outOf: `${grahamaitri?.full_score || '-'}`,
      received: `${grahamaitri?.grahamaitri || '-'}`,
      areaOfLife: `${grahamaitri?.description || '-'}`,
    },
    {
      key: 6,
      attribute: t('gana'),
      male: `${gana?.boy_gana || '-'}`,
      female: `${gana?.girl_gana || '-'}`,
      outOf: `${gana?.full_score || '-'}`,
      received: `${gana?.gana || '-'}`,
      areaOfLife: `${gana?.description || '-'}`,
    },
    {
      key: 7,
      attribute: t('bhakoot'),
      male: `${bhakoot?.boy_rasi || '-'}`,
      female: `${bhakoot?.girl_rasi || '-'}`,
      outOf: `${bhakoot?.full_score || '-'}`,
      received: `${bhakoot?.bhakoot || '-'}`,
      areaOfLife: `${bhakoot?.description || '-'}`,
    },
    {
      key: 8,
      attribute: t('nadi'),
      male: `${nadi?.boy_nadi || '-'}`,
      female: `${nadi?.girl_nadi || '-'}`,
      outOf: `${nadi?.full_score || '-'}`,
      received: `${nadi?.nadi || '-'}`,
      areaOfLife: `${nadi?.description || '-'}`,
    },
    {
      key: 9,
      attribute: t('total'),
      male: `${"-"}`,
      female: `${"-"}`,
      outOf: `${score || '-'}`,
      received: `${score || '-'}`,
      areaOfLife: `${bot_response || '-'}`,
    },
  ];

  return (
    <div className='rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>{t('match_ashtakoot_point')}</h2>
      <CustomTable
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: 'max-content' }}
        className='new_panchang_table panchang123'
      />
      {/* Recommendation Box */}
      {bot_response && <div className='mt-6  rounded-[10px] text-start commonQuesP recommendationBox p-[15px] md:p-10'>
        {bot_response}
      </div>}
    </div>
  )
}

export default AshtakootTable
