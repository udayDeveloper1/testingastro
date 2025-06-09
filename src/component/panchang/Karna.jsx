import React from "react";
import { Card, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;

const Karna = () => {
    const { t } = useTranslation()
  const introText = [
    t('karan_intro_1'),
    t('karan_intro_2')
  ];

  const movableKaran = [
 t('Bava_name'),
 t('Balava_name'),
 t('Kaulava_name'),
 t('Taitila_name'),
 t('Gara_name'),
 t('Vanij_name'),
 t('Vishti_name'),
  ];

  const fixedKaran = [
t('Sakuni_name'),
t('Chatushpad_name'),
t('Naag_name'),
t('Kintughna_name'),
  ];

  return (
    <Card
      title={
        <Title level={4} className="mb-0">
          <span className="commonQuesH2">5. Karna</span>
        </Title>
      }
      className="structureHinduCalender"
    >
      <div className="flex flex-col gap-5">
        {/* Introductory Text */}
        {introText.map((text, idx) => (
          <Paragraph key={idx} className="commonQuesP mb-0">
            {text}
          </Paragraph>
        ))}

        {/* Two-column grid */}
        <div className="grid  grid-cols-12  md:gap-4">
          <div className="col-span-6 sm:col-span-2">
            <h3 className="text-[16px] font-semibold mb-2">{t('movable_karan_title')}</h3>
            <ul className="flex flex-col gap-2">
              {movableKaran.map((item, idx) => (
                <li key={idx} className="commonQuesP">{item}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-6 sm:col-span-2">
            <h3 className="text-[16px] font-semibold mb-2">{t('fixed_karan_title')}</h3>
            <ul className="flex flex-col gap-2">
              {fixedKaran.map((item, idx) => (
                <li key={idx} className="commonQuesP">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Text */}
        <Paragraph className="commonQuesP mb-0">
        {t('karan_intro_3')}
        </Paragraph>
      </div>
    </Card>
  );
};

export default Karna;
