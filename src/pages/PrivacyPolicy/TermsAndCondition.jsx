import React, { useEffect, useState } from "react";
// import termsAndCondition from "../../assets/img/banner/termsAndCondition.webp";
import CommonBanner from "../../component/CommonBanner";
import CommonQuestionComp from "../../component/CommonQuestionComp";
import GoldBuyingMuhuratcomp from "../../component/Muhurat/GoldBuyingMuhuratcomp";
import { Constatnt } from "../../utils/Constent";
import { Codes, LanguageOption } from "../../utils/CommonVariable";
import { getCmsPages } from "../../services/api/api.services";
import { useTranslation } from "react-i18next";

function TermsAndCondition() {

  const { t } = useTranslation()

  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH
  const [termAndConditionData, setTermAndCoditionData] = useState({})

  useEffect(() => {
    getCmsPages({ type: "terms_condition" }).then((res) => {
      if (res?.code === Codes?.SUCCESS) {
        setTermAndCoditionData(res?.data?.content[0])
      } else {
        setTermAndCoditionData({})
      }
    }).catch((err) => {
      console.error('Error fetching privacy policy:', err)
    })
  }, [t])

  const content = [
    termAndConditionData?.description || ""
  ]

  const avoidBhumiPujan = [
    {
      title: "",
      description:
        "By using this website, you agree that you are over the age of 18 years and are allowed to enter into a legally binding and enforceable contract under Indian Contract Act, 1872. The Website would not be held responsible for any misuse that may occur by virtue of any person including a minor using the services provided through the Website. You are however allowed to ask questions related to minors in your family as per the terms and conditions outlined herewith in this policy.",
    },
    {
      title: "",
      description:
        "For the User to avail the services, the User will be directed to Register as a Member on the Website whereby You (User) agree to provide update, current and accurate information while filling up the sign-in form. All information that you fill and provide to the Website and all updates thereto are referred to in these Terms of Usage as “Registration Data“.",
    },
    {
      title: "",
      description:
        "An account could be created by you through the Website ID (Your Phone Number) and password (OTP) or other log - in ID and password which can include a facebook, gmail or any other valid email ID. The User while creating an account hereby represents and warrants that all the information provided by the User is current, accurate and complete and that the User will maintain the accuracy and keep the information updated from time to time. Use of another User’s account information for availing the services is expressly prohibited. If in case it is found that the information so supplied on the Website is inaccurate, incomplete, untrue and not current, the Website has the right to suspend or terminate the User’s account and restrict/refuse the use of the Website by such User in future.",
    },
    {
      title: "",
      description:
        "The right to use this Website is personal to the User and is not transferable to any other person or entity. The User would be responsible for protecting the confidentiality of User’s passwords and other information required for the purposes of registration. The User would be fully responsible for all the activities that occur under the User’s account with the Website. The Website cannot and will not be liable for any loss or damage arising from the User’s failure to maintain secrecy and confidentiality. The User shall notify the Website immediately if they become aware of any unauthorized use of their Account(s) or breach of any security. The User must log out from its account at the end of the session.",
    },
    {
      title: "",
      description:
        "The User while availing any service shall be informed whether the service so rendered is personal to the Website or is available from a Third party. The Website shall have no control or monitoring on the information disseminated to any third party via the Website.",
    },
    {
      title: "",
      description:
        "The User agrees, understands and confirms that his/her personal information including without limitation to details relating to debit card/ credit card details, shared online is handled with care and security, though minor risks of theft, misuse, or fraud may be inherent in any digital transaction. While the Website and its Payment Service Provider(s) are dedicated to ensuring a safe and reliable transaction experience, certain risks beyond their reasonable control may still exist despite best efforts.",
    },
    {
      title: "",
      description:
        "The Website does not permit the use of the Services by any User under the following conditions: -",
    },
    {
      title: "",
      description:
        "If the User is a resident of any jurisdiction that may prohibit the use of the Services rendered by the Website.",
    },
    {
      title: "",
      description:
        "If the User is a resident of any State/Country that prohibits by way of law, regulation, treaty or administrative act for entering into trade relations or/and",
    },
    {
      title: "",
      description: "Due to any religious practices.",
    },
    {
      title: "",
      description:
        "If the User has created multiple accounts using various mobile numbers. The User may not have more than one active account with the Website.",
    },
    {
      title: "",
      description:
        "By agreeing to the terms and conditions, the user consents to receive notifications through various channels, including push notifications, WhatsApp, RCS, SMS, and others.",
    },
  ];

  const websiteContent = [
    {
      title: "",
      description:
        "The Website and any individual Websites which may be available through external hyperlinks with the Website are private property.",
    },
    {
      title: "",
      description:
        "All interaction on this Website inclusive of the guidance and advice received directly from the Licensed Provider must comply with these Terms of Usage.",
    },
    {
      title: "",
      description:
        "The User shall not post or transmit through this Website any material which violates or infringes in any way upon the rights of others, or any material which is unlawful, abusive, defamatory, invasive of privacy, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offence, give rise to civil liability or otherwise violate any law.",
    },
    {
      title: "",
      description:
        "The Website shall have a right to suspend or terminate access by such User or terminate the User’s registration and such User shall not gain access to the Website.",
    },
    {
      title: "",
      description:
        "The User while availing any service shall be informed whether the service so rendered is personal to the Website or is available from a Third party. The Website shall have no control or monitoring on the information disseminated to any third party via the Website.",
    },
    {
      title: "",
      description:
        "The Website reserves the right to terminate the access or to change or discontinue any aspect or feature of the Website including, but not limited to, content, graphics, deals, offers, settings, etc.",
    },
    {
      title: "",
      description:
        "The Website does not take guarantee regarding the medical advice, if provided, by the third-party service provider inclusive of registered astrologers with the site. The User should always talk to an appropriately qualified health care professional for diagnosis and treatment including information regarding which medications or treatment may be appropriate for the User. None of the Content represents or warrants that any particular medication or treatment is safe, appropriate, or effective for you. ChatMyAstrologer does not endorse any specific tests, medications, products or procedures.",
    },
    {
      title: "",
      description:
        "The Website does not take guarantee of any untoward incident that may happen with the User after seeking the Service. The Website or the Service Provider providing the advice is not liable and does not guarantee any results as expected by the User and accessing the Website in such scenario is purely at the risk of the User.",
    },
    {
      title: "",
      description:
        "By using the Site, Application or Services, User hereby agrees that any legal remedy or liability that you seek to obtain for actions or omissions of other Members inclusive of the service provider registered with the Website or other third parties linked with the Website, shall be limited to claim against such particular party who may have caused any harm. You agree not to attempt to impose liability on or seek any legal remedy from the Website with respect to such actions or omissions.",
    },

  ];

  let content1 = [
    "The Website may update/amend/modify these Terms of Usage from time to time. The User is responsible to check the Terms of Usage periodically to remain in compliance with these terms.",
  ];
  let content2 = [
    "By accessing the Website and using it, you (“Member”, “You”, “Your”) indicate that you understand the terms and unconditionally & expressly consent to the Terms of Usage of this Website. If you do not agree with the Terms of Usage, please do not click on the “I AGREE” button. The User is advised to read the Terms of Usage carefully before using or registering on the Website or accessing any material, information or services through the Website. Your use and continued usage of the Website (irrespective of the amendments made from time to time) shall signify your acceptance of the terms of usage and your agreement to be legally bound by the same.",
  ];

  const userContent = [
    {
      title: "",
      description:
        "The Website and any individual Websites which may be available through external hyperlinks with the Website are private property.",
    },
    {
      title: "",
      description:
        "All interaction on this Website inclusive of the guidance and advice received directly from the Licensed Provider must comply with these Terms of Usage.",
    },
    {
      title: "",
      description:
        "The User shall not post or transmit through this Website any material which violates or infringes in any way upon the rights of others, or any material which is unlawful, abusive, defamatory, invasive of privacy, vulgar, obscene, profane or otherwise objectionable, which encourages conduct that would constitute a criminal offence, give rise to civil liability or otherwise violate any law.",
    },
    {
      title: "",
      description:
        "The Website shall have a right to suspend or terminate access by such User or terminate the User’s registration and such User shall not gain access to the Website.",
    },
    {
      title: "",
      description:
        "The User while availing any service shall be informed whether the service so rendered is personal to the Website or is available from a Third party. The Website shall have no control or monitoring on the information disseminated to any third party via the Website.",
    },
    {
      title: "",
      description:
        "The Website reserves the right to terminate the access or to change or discontinue any aspect or feature of the Website including, but not limited to, content, graphics, deals, offers, settings, etc.",
    },
    {
      title: "",
      description:
        "The Website does not take guarantee regarding the medical advice, if provided, by the third-party service provider inclusive of registered astrologers with the site. The User should always talk to an appropriately qualified health care professional for diagnosis and treatment including information regarding which medications or treatment may be appropriate for the User. None of the Content represents or warrants that any particular medication or treatment is safe, appropriate, or effective for you. ChatMyAstrologer does not endorse any specific tests, medications, products or procedures.",
    },
    {
      title: "",
      description:
        "The Website does not take guarantee of any untoward incident that may happen with the User after seeking the Service. The Website or the Service Provider providing the advice is not liable and does not guarantee any results as expected by the User and accessing the Website in such scenario is purely at the risk of the User.",
    },
    {
      title: "",
      description:
        "By using the Site, Application or Services, User hereby agrees that any legal remedy or liability that you seek to obtain for actions or omissions of other Members inclusive of the service provider registered with the Website or other third parties linked with the Website, shall be limited to claim against such particular party who may have caused any harm. You agree not to attempt to impose liability on or seek any legal remedy from the Website with respect to such actions or omissions.",
    },

  ];
  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={termsAndCondition}
          text={t('terms_conditions')}
          highlight=""
        />
      </section>
      <section className="">
        <div className="container mx-auto padding50 flex flex-col gap-10">
          <CommonQuestionComp heading="" content={content} />

          {/* <GoldBuyingMuhuratcomp
            title="Updation"
            introText="The Website may update/amend/modify these Terms of Usage from time to time. The User is responsible to check the Terms of Usage periodically to remain in compliance with these terms."
            // data={avoidBhumiPujan}
            footerText=""
            listStyle="disc"
          />
          <GoldBuyingMuhuratcomp
            title="User consent"
            introText="By accessing the Website and using it, you (“Member”, “You”, “Your”) indicate that you understand the terms and unconditionally & expressly consent to the Terms of Usage of this Website. If you do not agree with the Terms of Usage, please do not click on the “I AGREE” button. The User is advised to read the Terms of Usage carefully before using or registering on the Website or accessing any material, information or services through the Website. Your use and continued usage of the Website (irrespective of the amendments made from time to time) shall signify your acceptance of the terms of usage and your agreement to be legally bound by the same."
            // data={avoidBhumiPujan}
            footerText=""
            listStyle="disc"
          />
          <GoldBuyingMuhuratcomp
            title="information collected by website"
            introText="The Website is an internet-based portal having its existence on World Wide Web, Application and other electronic medium and provides astrological content, reports, data, telephone, video and email consultations (hereinafter referred as “Content”). The Website is offering “Free Services” and “Paid Services” (Collectively referred as “Services”). Free Services are easily accessible without becoming a member however for accessing the personalised astrological services and/or receive additional Content and get access to Paid Services, You are required to register as a member on the portal. By registering for Paid Services, a Member agrees to:"
            data={avoidBhumiPujan}
            footerText=""
            listStyle="disc"
          />

          <GoldBuyingMuhuratcomp
            title="Registration and eligibility"
            introText="The Website is an internet-based portal having its existence on World Wide Web, Application and other electronic medium and provides astrological content, reports, data, telephone, video and email consultations (hereinafter referred as “Content”). The Website is offering “Free Services” and “Paid Services” (Collectively referred as “Services”). Free Services are easily accessible without becoming a member however for accessing the personalised astrological services and/or receive additional Content and get access to Paid Services, You are required to register as a member on the portal. By registering for Paid Services, a Member agrees to:"
            data={avoidBhumiPujan}
            footerText=""
            listStyle="disc"
          />
          <GoldBuyingMuhuratcomp
            title="Feature “call with astrologer”"
            introText="The Website is providing certain service which is available through the medium of telecommunication with the Astrologer listed and enrolled with the Website. By agreeing to the present Terms of Usage, you are also giving your unconditional consent to the Website to arrange a call with you on your mobile number even though your number is on DND service provided by your mobile service provider."
            // data={avoidBhumiPujan}
            footerText=""
            listStyle="disc"
          />
          <GoldBuyingMuhuratcomp
            title="First Free Chat/Call"
            introText="ChatMyAstrologer offers the first free chat or call, lasting 1 to 5 minutes (varies among users), to each unique user. A unique user, as defined by ChatMyAstrologer, is an individual whose mobile number and device ID have never been registered on ChatMyAstrologer before."
            // data={avoidBhumiPujan}
            footerText=""
            listStyle="disc"
          />
          <GoldBuyingMuhuratcomp
            title="First Free Chat/Call"
            introText="ChatMyAstrologer offers the first free chat or call, lasting 1 to 5 minutes (varies among users), to each unique user. A unique user, as defined by ChatMyAstrologer, is an individual whose mobile number and device ID have never been registered on ChatMyAstrologer."
            data={websiteContent}
            footerText=""
            listStyle="disc"
          /> */}

        </div>
      </section>
    </>
  );
}

export default TermsAndCondition;
