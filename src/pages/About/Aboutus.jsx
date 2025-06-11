import React from "react";
import CommonBanner from "../../component/CommonBanner";
import aboutUs from "../../assets/img/about/aboutUs.svg";
import letsstartRight from "../../assets/img/about/letsstartRight.svg";
import halflogoleft from "../../assets/img/about/halflogoleft.svg"
import halflogoright from "../../assets/img/about/halflogoright.svg"


import { t } from "i18next";
import "../../assets/css/aboutus.css";
import CustomButton from "../../component/Homepage/CustomButton";
import MissionVisionSection from "../../component/about/MissionVisionSection";
import HomeFAQs from "../../component/Homepage/HomeFAQs";

function Aboutus() {
  return (
    <>
      <section>
        <CommonBanner text={t("about_us")} highlight="" />
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 container padding100 gap-y-[40px] md:gap-x-[0px] md:gap-x-[40px]">
          <div>
            <div className="flex justify-center">
              <img src={aboutUs} alt="" />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center gap-y-[20px] md:gap-[40px]">
              <h2 className="newBannerH2 leading-[130%]">
                Best Astrologer in Chat My Astrologer
              </h2>
              <p className="commonQuesP">
                Astrology is the ancient art of interpreting celestial influences on human affairs. Since time immemorial, astrologers have studied the movements of planets and stars to guide individuals through life’s challenges. My Astrologer continues this timeless tradition, offering wisdom rooted in Vedic, Western, and modern astrological practices.

A skilled astrologer analyzes the positions of the Sun, Moon, and planets at the time of one’s birth to reveal hidden truths. Whether you seek clarity in love, career, health, or spiritual growth, the stars hold answers. Through personalized birth chart readings, transit predictions, and remedial solutions, we illuminate the path ahead.

The cosmos is ever-changing, and so are its messages. By consulting an astrologer, you align yourself with the universe’s rhythms, gaining insight into opportunities and obstacles. Trust in the stars, and let My Astrologer be your guide.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="commonLightBack overflow-hidden relative">
        <div className="grid grid-cols-1 md:grid-cols-2 container py-[40px] md:py-[130px] gap-y-[30px] md:gap-y-[40px] md:gap-x-[0px] md:gap-x-[40px] items-center">
          <div className="flex flex-col gap-[20px] md:gap-[50px] order-2 md:order-1 relative z-1">
            <div className="flex flex-col justify-center gap-y-[10px] md:gap-[40px]">
              <h2 className="newBannerH2 leading-[100%]">
                Best Astrologer in Chat My Astrologer
              </h2>
              <p className="commonQuesP">
               Astrology is simply the universal language of celestial influence. Astrology has been humanity's guiding light ever since ancient times, when Babylonian scholars first observed the movements of planets to predict earthly events. It has evolved not only through millennia of practice, but also adapted to modern interpretations, while maintaining its core wisdom essentially unchanged.

An unknown seer first mapped the zodiac's twelve signs, creating a system that would endure through ages. Just as typesetters arrange letters to form meaning, astrologers align planetary positions to reveal life's patterns. The birth chart, like a cosmic manuscript, contains the story of one's destiny written in celestial symbols.

This ancient art has survived not just the rise and fall of civilizations, but also transitioned seamlessly into the digital age. From clay tablets to computer-generated charts, the essence of astrological interpretation remains constant - helping souls navigate their path through the stars' eternal dance.
              </p>
            </div>
            <div>
              <CustomButton
                parentClassName="max-w-max min-w-[222px]"
                className="px-2 py-3"
              >
                CONTACT US
              </CustomButton>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="startBackground flex justify-center">
              <img src={letsstartRight} alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
         <div className="absolute left-0 top-[30px]">
            <img src={halflogoleft} alt="" />
          </div>
           <div className="absolute right-0 bottom-[30px] " >
            <img src={halflogoright} alt="" />
          </div>
        <div className="grid grid-cols-1 md:grid-cols-1 container mx-auto padding100 ">
         
          <MissionVisionSection />
        </div>
      </section>
      
      <HomeFAQs
        text={t('FAQs')}
        highlightText={t('about_us')}
        subHeading={''}
      />
    </>
  );
}

export default Aboutus;
