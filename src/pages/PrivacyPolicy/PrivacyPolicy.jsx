// import PrivacyBanner from "../../assets/img/banner/PrivacyBanner.webp";
import { useEffect, useState } from 'react'
import CommonBanner from '../../component/CommonBanner'
import CommonQuestionComp from '../../component/CommonQuestionComp'
import GoldBuyingMuhuratcomp from '../../component/Muhurat/GoldBuyingMuhuratcomp'
import { getCmsPages } from '../../services/api/api.services'
import { Codes, LanguageOption } from '../../utils/CommonVariable'
import { Constatnt } from '../../utils/Constent'
import { formatThirdPartyContent } from '../../utils/CommonFunction'
import DOMPurify from 'dompurify'
import { useTranslation } from 'react-i18next'

function PrivacyPolicy() {
  const { t } = useTranslation()
  const LocalLanguage = localStorage?.getItem(Constatnt?.LANGUAGE_KEY) ? localStorage?.getItem(Constatnt?.LANGUAGE_KEY) : LanguageOption?.ENGLISH

  const [privarcyPolicyData, setPrivarcyPolicyData] = useState({})

  useEffect(() => {
    getCmsPages({ type: "privacy_policy" }).then((res) => {
      if (res?.code === Codes?.SUCCESS) {
        setPrivarcyPolicyData(res?.data?.content[0])
      } else {
        setPrivarcyPolicyData({})
      }
    }).catch((err) => {
      console.error('Error fetching privacy policy:', err)
    })
  }, [t])


  const content = [
    privarcyPolicyData?.description || ""
  ]

  const content1 = [
    {
      title: '',
      description: privarcyPolicyData?.description
    }
  ];

  const content2 = [
    {
      title: '',
      description:
        "Creating a user profile with ChatMyAstrologer involves providing specific information. The mandatory details include your phone number for OTP (One-Time Password) verification, which is necessary to ensure the security and validity of the registration process. Additionally, you are required to provide your first name, last name, and date of birth (DOB) are optional. The date of birth can be considered an optional detail, which means it's not mandatory to provide it during the registration process."
    }
  ]

  const content3 = [
    {
      title: '',
      description:
        "By collecting this information, ChatMyAstrologer aims to create a personalized user profile that can cater to your specific needs and preferences. However, if you choose not to provide your date of birth, it won't hinder the registration process, and you can still access the services offered by ChatMyAstrologer with your verified phone number."
    }
  ]
  const content4 = [
    {
      title: '',
      description:
        "By collecting this information, ChatMyAstrologer aims to create a personalized user profile that can cater to your specific needs and preferences. However, if you choose not to provide your date of birth, it won't hinder the registration process, and you can still access the services offered by ChatMyAstrologer with your verified phone number."
    }
  ]

  const content5 = [
    {
      title: '',
      description: `Delete Profile: If you wish to delete your entire ChatMyAstrologer profile, including personal information associated with it, you might find an option to "Delete your account" Click on this setting option in side menu and follow the instructions and complete the account deletion process.`
    }
  ]

  const content6 = [
    {
      title: '',
      description: `The Website intends to protect the privacy of all kinds of users visiting the platform irrespective whether the user is a registered user or merely a visitor. It is recommended to every user to understand what types of personally identifiable information is collected. The Website employs the personally identifiable information for certain predictions however it is guaranteed that no direct or indirect use of such information which is revealed in the prediction for a member will be done except for the explicit purpose of communicating the horoscope charts and predictions to the member itself disclosing such information. It is further clarified that the Website does not in any manner deal in selling or renting the information supplied to the Website.`
    },
    {
      title: '',
      description: `The Website does not commit to treat or provide solutions for users with weak mental health which is inclusive of any user who have thoughts related to committing suicide, self-destruction etc. Such users are advised to stop the use of the present website with immediate effect and any continued use of the website by such person would be considered solely at the user’s risk and the Website shall have no liability for any untoward event in such scenario. The Website declares that the information provided by such kind of user can be shared, if required, with law enforcement authorities. Such information is not protected from any kind of non-disclosure or confidential agreements either with the Website or with any third-party involved herein.`
    },
    {
      title: '',
      description: `The Website does not commit to treat or provide solutions for users with weak mental health which is inclusive of any user who have thoughts related to committing suicide, self-destruction etc. Such users are advised to stop the use of the present website with immediate effect and any continued use of the website by such person would be considered solely at the user’s risk and the Website shall have no liability for any untoward event in such scenario. The Website declares that the information provided by such kind of user can be shared, if required, with law enforcement authorities. Such information is not protected from any kind of non-disclosure or confidential agreements either with the Website or with any third-party involved herein.`
    },
    {
      title: '',
      description: `The Website does not commit in any manner whatsoever for the accuracy of the predictions made by the astrologers to any user. The Website does not take any guarantee/responsibility/liability regarding the reliability or reality of the gems and other related items represented and sold on the website. It is further declared by the Website that no warranty on such service is provided by the Website in any manner.`
    }
  ]

  const avoidBhumiPujan = [
    {
      title: 'Creating an account / Registration data',
      description:
        ' While accessing the Website, the User of the Website may be required to create an account. The personal information which may be sought while creating an account shall include, but not limited to the Full name, Address, Telephone Number, Email-address, Date of Birth, Gender, Location, Photograph, any other items of ‘sensitive personal data or information” as such term is defined under the Information Technology (Reasonable Security Practices And Procedures And Sensitive Personal Data Of Information) Rules, 2011 enacted under the Information Technology Act, 2000, and any other detail required on the website during registration. It is hereby informed to all the Users that the e-mail address or phone number together with a password or OTP is used for the purpose of securing User’s profile and for effective implementation of the personalized E-mail and SMS Services provided by the Website to the User. In the event that no registration is made by the User, the Website may not be able to provide any services due to non-availability of the personal identifiable information of the User.'
    },
    {
      title: 'Booking a paid service',
      description:
        'While booking a service through Order Form, the personal information which may be sought would include, but not limited to the information as mentioned in Column 1(a), financial information inclusive of bank account information, credit card or debit card details or other payment instrument details through a secure third party gateway, IP (Internet protocol) Address and any other information that a User may provide during booking a paid service on the Website. Such information is kept highly confidential.'
    },
    {
      title: 'Log Files, IP Address and Cookies',
      description:
        ' The website collects information that is stored by your browser on your computer’s hard drive i.e. through cookies. It further automatically log generic information about the user’s computer connection to the Internet i.e. Session Data. The website may store temporary or permanent ‘cookies’ on the user’s computer. Cookies would allow the web server to recognize the user computer each time the user returns to the website including the time and date of the visit, viewing of page, length of time, verify registration or password information etc. Such cookies are usually only read by the server placed and the user may choose to block these cookies on their computers. Please note that if the cookies are turned off, the user may be prevented from using certain features of the website. The website uses the cookies to personalize the user’s experience on the website and to display an advertisement according to the user’s preferences. Some of the services provided by the Website may direct the User to platform of third parties. Any Information provided by the User on such platforms may be dealt by them in the manner provided by the privacy policy formulated by such third-party platforms. The Website in this regard fully disclaims any liability(ies) or claim(s) which may arise by use/misuse of such information shared by the User, to any third party or any party not known to the Website. The website would not liable for the mis-use of such information shared by the User or by any third party. We also collect details including but not limited to User feedback, comments, etc. that may be disclosed/informed/mentioned on any article/blog or groups/forums or other pages which the User may have access to while visiting the Website. For such information which is in public domain and accessible to all the Users and visitors of the Website, the User is advised to exercise its discretion before disclosing it as this information is susceptible to misuse.'
    },
    {
      title: 'Miscellaneous Activities',
      description:
        'The Website may collect any other information which may be mandatory to be disclosed and further may receive any other information via email or other method inclusive of contract with regard to specific services availed from the Website or any products bought from the Website, such information may not be made part of the User-Member’s Profile but shall be used only for addressing the specific need or concern of the User.'
    }
  ]

  return (
    <>
      <section>
        <CommonBanner
          // backgroundImage={PrivacyBanner}
          text={t('privarcy_policy')}
          highlight=''
        />
      </section>
      <section className=''>
        <div className='container mx-auto padding50 flex flex-col gap-10'>
          <CommonQuestionComp heading='' content={content} />
          {/* <GoldBuyingMuhuratcomp
            title='User’s consent'
            introText=''
            data={content1}
            footerText=''
            listStyle=''
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title='Collection of Personal Information'
            introText=''
            data={content2}
            footerText=''
            listStyle=''
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title='Collection of Personal Information'
            introText=''
            data={content3}
            footerText=''
            listStyle=''
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title='Purpose and use of data/information collection'
            introText=''
            data={content4}
            footerText=''
            listStyle=''
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title='Data Deletion'
            introText=''
            data={content5}
            footerText=''
            listStyle=''
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title='Commitment'
            introText=''
            data={content6}
            footerText=''
            listStyle=''
          /> */}

          {/* <GoldBuyingMuhuratcomp
            title='information collected by website'
            introText='While certain days are ideal for Bhoomi Pujan, some must be avoided. It is important not to perform this ceremony during:'
            data={avoidBhumiPujan}
            footerText=''
            listStyle='disc'
          /> */}
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicy
