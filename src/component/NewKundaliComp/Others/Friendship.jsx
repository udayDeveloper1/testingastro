import React from "react";
import { Card, Table } from "antd";
import CustomTable from "../../Custom/CustomTable";
import { useTranslation } from "react-i18next";

export default function Friendship({ friendShip }) {
  const { t } = useTranslation()
  // const planets = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

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

  const getRelationship = (from, to) => {
    if (!from || !to || from === to) return "-";
    const relationData = friendShip?.permanent_table?.[from];

    if (!relationData) return "--";

    if (Array.isArray(relationData.Friends) && relationData.Friends.includes(to)) return 'Friend';
    if (Array.isArray(relationData.Neutral) && relationData.Neutral.includes(to)) return 'Neutral';
    if (Array.isArray(relationData.Enemies) && relationData.Enemies.includes(to)) return 'Enemy';

    return "--";
  };

  const dataSource = planets?.map((rowPlanet, index) => {
    const row = {
      key: index + 1,
      planet: rowPlanet?.value?.toUpperCase()
    };

    planets?.forEach((colPlanet) => {
      row[colPlanet?.key?.toLowerCase()] = getRelationship(rowPlanet?.key, colPlanet?.key);
    });
    return row;
  });

  // const getTemporaryRelationship = (from, to) => {
  //   if (!from || !to || typeof from !== "string" || typeof to !== "string" || from === to) {
  //     return "-";
  //   }

  //   const relationData = friendShip?.temporary_friendship?.[from];

  //   if (!relationData || typeof relationData !== "object") {
  //     return "--";
  //   }

  //   const friends = Array.isArray(relationData.Friends) ? relationData.Friends : [];
  //   const enemies = Array.isArray(relationData.Enemies) ? relationData.Enemies : [];

  //   if (friends.includes(to)) return t('friend');
  //   if (enemies.includes(to)) return t('neutral');

  //   return t('neutral');
  // };

  const getTemporaryRelationship = (from, to) => {
    if (!from || !to || typeof from !== "string" || typeof to !== "string" || from === to) {
      return "-";
    }

    const relationData = friendShip?.temporary_friendship?.[from];

    if (!relationData || typeof relationData !== "object") {
      return "--";
    }

    const {
      Friends = [],
      Neutral = [],
      Enemies = [],
      IntimateFriend = [],
      BitterEnemy = [],
    } = relationData;

    if (IntimateFriend.includes(to)) return t('intimate_friend');
    if (Friends.includes(to)) return t('friend');
    if (Neutral.includes(to)) return t('neutral');
    if (Enemies.includes(to)) return t('enemy');
    if (BitterEnemy.includes(to)) return t('bitter_enemy');

    return t('neutral'); // default
  };


  const columns = [
    {
      title: "",
      dataIndex: "planet",
      key: "planet",
      fixed: "left",
      align: "center",
      width: 100,
      render: (text) => (
        <span className="newKundaliTableKey">{text || '-'}</span>
      ),
    },
    ...planets.map((planet) => ({
      title: <span className="newKundaliTableKey">{planet?.value}</span>,
      dataIndex: planet?.key?.toLowerCase(),
      key: planet?.key?.toLowerCase(),
      align: "center",
      width: 120,
      render: (text) => <span className="newKundaliTableValue">{text || '-'}</span>,
    })),
  ];

  // const dataSourceTemporary = Array.isArray(planets) ? planets?.map((rowPlanet, index) => {
  //   const row = {
  //     key: index + 1,
  //     planet: rowPlanet?.value?.toUpperCase() ?? "-"
  //   };
  //   Array.isArray(planets) &&
  //     planets.forEach((colPlanet) => {
  //       const key = colPlanet?.key?.toLowerCase() ?? "";
  //       row[key] = getTemporaryRelationship(rowPlanet?.key, colPlanet?.key);
  //     });

  //   return row;
  // }) : [];

  const dataSourceTemporary = Array.isArray(planets) ? planets.map((rowPlanet, index) => {
    const row = {
      key: index + 1,
      planet: rowPlanet?.value?.toUpperCase() ?? "-"
    };

    planets.forEach((colPlanet) => {
      const key = colPlanet?.key?.toLowerCase() ?? "";
      row[key] = getTemporaryRelationship(rowPlanet?.key, colPlanet?.key);
    });

    return row;
  })
    : [];


  // const getFiveFoldRelationship = (from, to) => {
  //   if (!from || !to || typeof from !== "string" || typeof to !== "string" || from === to) {
  //     return "-";
  //   }

  //   const relationData = friendShip?.five_fold_friendship?.[from];

  //   if (!relationData || typeof relationData !== "object") {
  //     return "--";
  //   }

  //   const friends = Array.isArray(relationData?.Friends) ? relationData?.Friends : [];
  //   const enemies = Array.isArray(relationData?.Enemies) ? relationData?.Enemies : [];

  //   // if (friends.includes(to)) return "Friend";
  //   // if (enemies.includes(to)) return "Enemy";

  //   // return "Neutral";
  //   if (friends.includes(to)) return t('friend');
  //   if (enemies.includes(to)) return t('neutral');
  //   return t('neutral');
  // };

  const getFiveFoldRelationship = (from, to) => {
    if (!from || !to || typeof from !== "string" || typeof to !== "string" || from === to) {
      return "-";
    }

    const relationData = friendShip?.five_fold_friendship?.[from];

    if (!relationData || typeof relationData !== "object") {
      return "--";
    }

    const {
      IntimateFriend = [],
      Friends = [],
      Neutral = [],
      Enemies = [],
      BitterEnemy = []
    } = relationData;

    if (IntimateFriend.includes(to)) return t('intimate_friend');
    if (Friends.includes(to)) return t('friend');
    if (Neutral.includes(to)) return t('neutral');
    if (Enemies.includes(to)) return t('enemy');
    if (BitterEnemy.includes(to)) return t('bitter_enemy');

    return t('neutral'); // fallback
  };

  const dataFiveFoldRelationshipSource = planets?.map((rowPlanet, index) => {
    const row = {
      key: index + 1,
      planet: rowPlanet?.value?.toUpperCase() || '-'
    };

    planets?.forEach((colPlanet) => {
      row[colPlanet?.key?.toLowerCase()] = getFiveFoldRelationship(rowPlanet?.key, colPlanet?.key);
    });

    return row;
  });



  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-2 gap-6  sm:border commonLightBorder  rounded-[10px] sm:p-[15px] md:p-[30px]">
        <Card
          className="rounded-[10px] overflow-hidden  col-span-2"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading">{t('permanent_friend')}</h3>
          </div>

          {/* Custom Table */}
          <CustomTable
            columns={columns}
            data={dataSource}
            pagination={false}
            loading={false}
            bordered={false}
            centered
            scroll={{ x: 'max-content' }}
             className="lightBackHead"
          />
        </Card>
        <Card
          className="rounded-[10px] overflow-hidden  col-span-2"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading"> {t('temporary_friend')}</h3>
          </div>

          {/* Custom Table */}
          <CustomTable
            columns={columns}
            data={dataSourceTemporary}
            pagination={false}
            loading={false}
            bordered={false}
            scroll={{ x: 'max-content' }}

          />
        </Card>
        <Card
          className="rounded-[10px] overflow-hidden col-span-2"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading">{t('fivefold_friend')}</h3>
          </div>

          {/* Custom Table */}
          <CustomTable
            columns={columns}
            data={dataFiveFoldRelationshipSource}
            pagination={false}
            loading={false}
            bordered={false}
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </div>
    </div>
  );
}
