import React from "react";
import { Tag, Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;
function MangalDoshaSection({ mangalDosh, mangalikDosh }) {
  const { t } = useTranslation()

  console.log('mangalDosh', mangalikDosh);

  return (
    <>
      {
        mangalDosh &&
        <Typography className="flex flex-col gap-6 mt-5">
          <div>
            <Title level={4} className="!mb-0">
              {" "}
              <span className="website_color commonQuesH2">
                {t('MangalDoshAnalysis')}
              </span>{" "}
            </Title>
          </div>
          <div className="flex flex-col gap-5">
            {/* <div className="border border-green-500 p-4 rounded-md flex items-center gap-4">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${mangalDosh?.is_dosha_present == 'true' ? 'bg-red-500' : 'bg-green-500'
                  }`}
              >
                {mangalDosh?.is_dosha_present == 'true' ? 'Yes' : 'No'}
              </div>
              <span className="text-base font-medium text-gray-800">
                {mangalDosh?.is_dosha_present == 'true'
                  ? 'Kundli has Mangal Dosha.'
                  : 'Kundli is free from Mangal Dosha.'}

              </span>
            </div> */}
            <div
              className={`p-4 rounded-md flex items-center gap-4 border ${mangalDosh?.is_dosha_present == 'true' ? 'border-red-500' : 'border-green-500'
                }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${mangalDosh?.is_dosha_present == 'true' ? 'bg-red-500' : 'bg-green-500'
                  }`}
              >
                {mangalDosh?.is_dosha_present == 'true' ? t('yes') : t('no')}
              </div>
              <span className="text-base font-medium text-gray-800">
                {mangalDosh?.is_dosha_present == 'true'
                  ? t('KundalihasMangalDosha')
                  : t('KundliMangalDosha')}
              </span>
            </div>
            <Paragraph className="flex flex-col gap-1 !mb-0  new_border_bottom pb-4">
              {/* <Tag color={mangalDosh?.is_dosha_present == 'true' ? "red" : "green"}>
                {mangalDosh?.is_dosha_present == 'true' ? "Yes" : "Kundli is free from Mangal Dosha."}
              </Tag>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${mangalDosh?.is_dosha_present === 'true' ? 'bg-red-500' : 'bg-green-500'
                  }`}
              >
                {mangalDosh?.is_dosha_present === 'true' ? 'Yes' : 'No'}
              </div> */}

              <strong className="text-[18px] font-semibold new_body_font">
                {mangalDosh?.bot_response?.includes('manglik')
                  ? mangalDosh?.bot_response?.replace(/manglik/gi, 'mangal')
                  : mangalDosh?.bot_response
                }
              </strong>

            </Paragraph>

            {mangalDosh?.cancellation?.cancellationReason?.length > 0 && (
              <Paragraph className="flex flex-col gap-1 !mb-0  new_border_bottom pb-4">
                <strong className="text-[18px] font-semibold text-[#797979]">
                  Cancellation Factors:
                </strong>
                {/* <ul className="list-disc ml-5 text-[#555]"> */}
                {mangalDosh?.cancellation?.cancellationReason?.map((reason, index) => (
                  <p key={index} className="commonQuesP">{reason}</p>
                ))}
                {/* </ul> */}
              </Paragraph>
            )}

            {mangalDosh?.factors &&
              Object.entries(mangalDosh.factors)?.map(([key, value], index) =>
                value ? (
                  <Paragraph
                    key={index}
                    className="flex flex-col gap-1 !mb-0  new_border_bottom pb-4"
                  >
                    <strong className="text-[18px] font-semibold new_body_font!mb-0 capitalize">
                      {t('factor')}: {key}
                    </strong>
                    <p className="commonQuesP">{value}</p>
                  </Paragraph>
                ) : null
              )}
            {/* <div className="flex flex-col gap-1 border-b-2 commonLightBorder pb-4">
            <Title level={5} className="!mb-0">
              <span className="text-[18px] font-semibold new_body_font">
                Remedies (needs to be performed before marriage)
              </span>
            </Title>
            <Paragraph className="commonQuesP !mb-0">
              Kumbha Vivah, Vishnu Vivah and Ashwatha Vivah are the most popular
              remedies for Mangal Dosha. Ashwatha vivaha means the marriage with
              peepal or banana tree and cutting the tree after that. Kumbha
              Vivah, also called Ghata Vivaha, means marriage with a pot and
              breaking it after that.
            </Paragraph>
          </div>

          <div className="flex flex-col gap-1 border-b-2 commonLightBorder pb-4">
            <Title level={5} className="!mb-0">
              <span className="text-[18px] font-semibold new_body_font!mb-0">
                Remedies (can be performed after marriage)
              </span>
            </Title>
            <ul className="list-disc pl-5 text-base new_body_font font-bold">
              <li className="commonQuesP">
                Keep Kesariya Ganapati (Orange coloured idol of Lord Ganesha) in
                worship room and worship daily.
              </li>
              <li className="commonQuesP">
                Worship Lord Hanuman by reciting Hanuman Chalisa daily.
              </li>
              <li className="commonQuesP">
                Mahamrityunjaya paath (recitation of Mahamrityunjaya mantra).
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1 border-b-2 commonLightBorder pb-4">
            <Title level={5}>
              <span className="text-[18px] font-semibold new_body_font!mb-0">
                Remedies (based on Lal Kitab, can be performed after marriage)
              </span>
            </Title>
            <ul className="list-disc pl-5 space-y-2 text-base new_body_font font-bold">
              <li className="commonQuesP">Feed birds with something sweet.</li>
              <li className="commonQuesP">
                Keep ivory (Haathi Daant) at home.
              </li>
              <li className="commonQuesP">
                Worship banyan tree with milk mixed with something sweet.
              </li>
            </ul>
          </div> */}
          </div>
        </Typography> }
      {
        mangalikDosh &&
        <Typography className="flex flex-col gap-6 mt-3 mt-5">
          <div>
            <Title level={4} className="!mb-0">
              {" "}
              <span className="website_color commonQuesH2">
                {t('MangalikDoshAnalysis')}
              </span>{" "}
            </Title>
          </div>
          <div className="flex flex-col gap-5">

            <div
              className={`p-4 rounded-md flex items-center gap-4 border ${mangalikDosh?.manglik_by_mars == 'true' ? 'border-red-500' : 'border-green-500'
                }`}
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold ${mangalikDosh?.manglik_by_mars == 'true' ? 'bg-red-500' : 'bg-green-500'
                  }`}
              >
                {mangalikDosh?.manglik_by_mars == 'true' ? t('yes') : t('no')}
              </div>
              <span className="text-base font-medium text-gray-800">
                {mangalikDosh?.manglik_by_mars == 'true'
                  ? t('KundlihasMangalikDosha')
                  : t('KundliisfreefromMangalikDosha')}
              </span>
            </div>

            <Paragraph className="flex flex-col gap-1 !mb-0  new_border_bottom pb-4">
              <strong className="text-[18px] font-semibold new_body_font">
                {mangalikDosh?.bot_response}
              </strong>
              {/* <p className="commonQuesP">
              Generally Manglik Dosha is considered from the position of Lagna
              and Moon in the birth chart. In the birth chart, Mangal is placed
              in Second house from Lagna, while in the Moon chart Mangal is
              placed in Ninth house.
            </p> */}
            </Paragraph>

            {mangalikDosh?.cancellation?.cancellationReason?.length > 0 && (
              <Paragraph className="flex flex-col gap-1 !mb-0  new_border_bottom pb-4">
                <strong className="text-[18px] font-semibold text-[#797979]">
                  Cancellation Factors:
                </strong>
                {/* <ul className="list-disc ml-5 text-[#555]"> */}
                {mangalikDosh?.cancellation?.cancellationReason?.map((reason, index) => (
                  <p key={index} className="commonQuesP">{reason}</p>
                ))}
                {/* </ul> */}
              </Paragraph>
            )}

            {mangalikDosh?.factors &&
              Object.entries(mangalikDosh?.factors)?.map(([key, value], index) =>
                value ? (
                  <Paragraph
                    key={index}
                    className="flex flex-col gap-1 !mb-0  new_border_bottom pb-4"
                  >
                    <strong className="text-[18px] font-semibold new_body_font!mb-0 capitalize">
                      {t('factor')}: {key}
                    </strong>
                    <p className="commonQuesP">{value}</p>
                  </Paragraph>
                ) : null
              )}
            {/* <div className="flex flex-col gap-1 border-b-2 commonLightBorder pb-4">
            <Title level={5} className="!mb-0">
              <span className="text-[18px] font-semibold new_body_font">
                Remedies (needs to be performed before marriage)
              </span>
            </Title>
            <Paragraph className="commonQuesP !mb-0">
              Kumbha Vivah, Vishnu Vivah and Ashwatha Vivah are the most popular
              remedies for Mangal Dosha. Ashwatha vivaha means the marriage with
              peepal or banana tree and cutting the tree after that. Kumbha
              Vivah, also called Ghata Vivaha, means marriage with a pot and
              breaking it after that.
            </Paragraph>
          </div>

          <div className="flex flex-col gap-1 border-b-2 commonLightBorder pb-4">
            <Title level={5} className="!mb-0">
              <span className="text-[18px] font-semibold new_body_font!mb-0">
                Remedies (can be performed after marriage)
              </span>
            </Title>
            <ul className="list-disc pl-5 text-base new_body_font font-bold">
              <li className="commonQuesP">
                Keep Kesariya Ganapati (Orange coloured idol of Lord Ganesha) in
                worship room and worship daily.
              </li>
              <li className="commonQuesP">
                Worship Lord Hanuman by reciting Hanuman Chalisa daily.
              </li>
              <li className="commonQuesP">
                Mahamrityunjaya paath (recitation of Mahamrityunjaya mantra).
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-1 border-b-2 commonLightBorder pb-4">
            <Title level={5}>
              <span className="text-[18px] font-semibold new_body_font!mb-0">
                Remedies (based on Lal Kitab, can be performed after marriage)
              </span>
            </Title>
            <ul className="list-disc pl-5 space-y-2 text-base new_body_font font-bold">
              <li className="commonQuesP">Feed birds with something sweet.</li>
              <li className="commonQuesP">
                Keep ivory (Haathi Daant) at home.
              </li>
              <li className="commonQuesP">
                Worship banyan tree with milk mixed with something sweet.
              </li>
            </ul>
          </div> */}
          </div>
        </Typography>
      }

    </>
  );
}

export default MangalDoshaSection;
