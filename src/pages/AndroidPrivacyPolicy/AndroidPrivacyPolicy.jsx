import { useEffect, useState, lazy, Suspense, memo } from 'react';
import { useTranslation } from 'react-i18next';

// Lazy-loaded components
const CommonQuestionComp = lazy(() => import('../../component/CommonQuestionComp'));

// API & constants
import { getCmsPages } from '../../services/api/api.services';
import { Codes, LanguageOption } from '../../utils/CommonVariable';
import { Constatnt } from '../../utils/Constent';
import CommonBanner from '../../component/CommonBanner';

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
    }, [t, LocalLanguage])


    const content = [
        privarcyPolicyData?.description || ""
    ]

    const privacyPolicySections = [
        {
            id: 'information-we-collect',
            title: '1. Information We Collect',
            subsections: [
                {
                    title: 'A. Without Login',
                    description: 'You can access the following features without creating an account or sharing any personal information:',
                    list: [
                        {
                            heading: 'Kundali Generation & Comparison',
                            content: 'View your birth chart or compare two Kundalis based on planetary positions. No data is stored.',
                        },
                        {
                            heading: 'Daily Horoscope',
                            content: 'Access generalized predictions for today, yesterday, and tomorrow based on zodiac signs. These are algorithmic and not personalized.',
                        },
                        {
                            heading: 'Astrologer Directory',
                            content: 'Browse astrologer profiles (categories, languages). Contact features require login.',
                        },
                    ],
                },
                {
                    title: 'B. With Login',
                    subsections: [
                        {
                            title: 'i. Information You Provide',
                            list: [
                                {
                                    heading: 'Mobile Number for Login',
                                    content: 'To access certain features, you must log in using your mobile number via OTP (One-Time Password). We do not collect any other personal information unless you voluntarily provide it.',
                                },
                                {
                                    heading: 'Profile Information (Optional)',
                                    content: 'If you choose to update your profile, you may provide Name, Date of Birth, Birth Time. This information is stored securely and used solely for generating personalized astrological reports.',
                                    sublist: ['Name', 'Date of Birth', 'Birth Time'],
                                    postSublist:
                                        'This information is stored securely and used solely for generating personalized astrological reports.',
                                },
                            ],
                        },
                        {
                            title: 'ii. Third-Party Services',
                            list: [
                                {
                                    heading: 'RazorPay (Payment Gateway)',
                                    content: 'For wallet recharges, payments are processed via Razor Pay. No card details are stored by us.',
                                },
                                {
                                    heading: 'Agora SDK (Audio Calls)',
                                    content: 'Requires microphone permission. Calls are processed via Agora. We do not record or store call data.',
                                },
                                {
                                    heading: 'Firebase Cloud Messaging (FCM)',
                                    content: 'Used for push notifications.',
                                },
                                {
                                    heading: 'Microsoft Clarity',
                                    content: 'Used for user behavior analytics.',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            id: 'how-we-use-info',
            title: '2. How We Use Your Information',
            subParagraph: 'We use your data to:',
            list: [
                'Core Services: Deliver Kundali reports, horoscopes, and astrologer matchmaking.',
                'Payments: Process wallet top-ups and maintain transaction history.',
                'Communication: Facilitate chat/call with astrologers (logged-in users only).',
                'Improvements: Analyze usage patterns to enhance app functionality.',
                'Legal Compliance: Respond to lawful requests (e.g., court orders).',
            ],
        },
        {
            id: 'data-sharing',
            title: '3. Data Sharing & Disclosure',
            list: [
                'We do not sell or share your personal data with third parties, except:',
                'Astrologers: Only necessary details (name, birth details) are shared for consultations.',
                'Service Providers: RazorPay (payments), Agora (calls), and Firebase (notifications) comply with privacy standards.',
                'Legal Requirements: We may disclose data if required by law.',
            ],
        },
        {
            id: 'user-rights',
            title: '4. User Controls & Rights',
            list: [
                'Edit/Delete Profile: You can update or delete profile details anytime.',
                'Delete Account:  You may delete your account at any time using the “Delete Account” option in the app settings. This will permanently erase your data from our system, including Kundalis, chat history, and wallet information.',
                'Permissions:  You can revoke RECORD_AUDIO or POST_NOTIFICATIONS in device settings.',
            ],
        },
        {
            id: 'data-security',
            title: '5. Data Security',
            description:
                'Personal data is transmitted via SSL. All details are stored in secure databases with restricted access. We implement industry-standard security measures to protect your data. However, no method is 100% secure, and we cannot guarantee absolute security.',
        },
        {
            id: 'age-restriction',
            title: '6. Age Restriction',
            description:
                'This App is intended for users aged 18+. Minors may use this app only under parental guidance and for informational purposes. We do not knowingly collect information from individuals below 18. Parents may request deletion of inadvertently collected information.',
        },
        {
            id: 'disclaimer',
            title: '7. Disclaimer',
            description:
                'ChatMyAstrologer is not responsible for any communication between the user and any Third-Party service integrated within the app(e.g.,Razorpay, Agora, Firebase). The users are advised to read the Privacy Policy and other Policies of the third party on their related sites and we shall not be held liable for such usage made only because a link to the third-party was provided on our APP..',
        },
        {
            id: 'policy-changes',
            title: '8. Changes to This Policy',

            description:
                'We may update this Privacy Policy from time to time. You will be notified about any material changes via the app or other communication channels. We encourage you to review this policy periodically.',
        },
        {
            id: 'contact-us',
            title: '9. Contact Us',
            subParagraph: 'For privacy-related queries, contact us at:',
            list: [
                'Email: info@tracewavetransparency.com',
                'Business Hours: Monday to Friday, 09:30 AM – 6:00 PM (excluding public holidays)',
            ],
            closing: 'By using ChatMyAstrologer, you acknowledge that you have read and understood this Privacy Policy.',
        },
    ];

    return (
        <>
            <section>
                <CommonBanner
                    // backgroundImage={PrivacyBanner}
                    text={t('Privacy_Policy_for_Astrology_App')}
                    highlight=''
                />
            </section>
            <section>
                <div className="container pt-10">
                    <h3 className='h3'>Last Updated: 16-06-2025</h3>
                    <p className='commonQuesP pt-2'>Welcome to ChatMyAstrologer("we," "our," or "us"). We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our astrology app ("App").
                        By using the App, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the App.
                    </p>
                </div>
            </section>


            <div className="container pb-20">
                {privacyPolicySections.map((section, index) => (
                    <section key={section.id} id={section.id} className="pt-10">
                        <h2 className={`text-xl font-bold ${index === 0 ? "" : "pt-5"}`}>{section.title}</h2>
                        {section.subParagraph && <p className='pt-3'>{section.subParagraph}</p>}

                        {section.description && <p className="pt-2">{section.description}</p>}

                        {section.subsections &&
                            section.subsections.map((sub, idx) => (
                                <article key={idx} className="">
                                    <h3 className="text-lg font-semibold pt-5">{sub.title}</h3>
                                    {sub.description && <p className="pt-3">{sub.description}</p>}
                                    {sub.list && (
                                        <ol className="list-disc pl-5 pt-2 space-y-2">
                                            {sub.list.map((item, i) => (
                                                <li key={i}>
                                                    <strong>{item.heading}:</strong> {item.content}
                                                    {item.sublist && (
                                                        <ol className="list-disc pl-5 mt-1">
                                                            {item.sublist.map((s, si) => (
                                                                <li key={si}>{s}</li>
                                                            ))}

                                                        </ol>
                                                    )}


                                                </li>
                                            ))}
                                        </ol>
                                    )}
                                    {sub.subsections &&
                                        sub.subsections.map((ss, i) => (
                                            <div key={i} className="pt-3">
                                                <h4 className="font-semibold">{ss.title}</h4>
                                                <ul className="list-disc pl-5 space-y-2 pt-5">
                                                    {ss.list.map((item, j) => (
                                                        <li key={j}>

                                                            <strong>{item.heading}:</strong> {item.content}
                                                            {item.sublist && (
                                                                <ul className="list-disc pl-5 mt-1">
                                                                    {item.sublist.map((s, si) => (
                                                                        <li key={si}>{s}</li>
                                                                    ))}
                                                                </ul>
                                                            )}

                                                            {item.postSublist && <p className="pt-1">{item.postSublist}</p>}
                                                        </li>
                                                    ))}
                                                </ul>


                                            </div>
                                        ))}
                                </article>
                            ))}

                        {section.list && (
                            <ol className=" pl-5 pt-2 space-y-2">
                                {section.list.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ol>
                        )}

                        {section.closing && <p className="pt-5 font-[500]">{section.closing}</p>}
                    </section>
                ))}
            </div>
         
        </>
    )
}

export default memo(PrivacyPolicy)
{/* <section id="information-we-collect" className='pt-5'>
                <div className="container">
                    <h2>1. Information We Collect</h2>

                    <article className='pt-2'>
                        <h3 className='pt-2'>A. Without Login:</h3>
                        <p>You can access the following features without creating an account or sharing any personal information:</p>

                        <ol className='pt-2'>
                            <li>
                                <p className='p font-medium'>Kundali Generation & Comparison: </p>
                                <p className='p'>View your birth chart or compare two Kundalis based on planetary positions. <em>No data is stored</em>.</p>
                            </li>
                            <li>
                                <p className='p font-medium'>Daily Horoscope: </p>
                                <p className='p'>Access generalized predictions for today, yesterday, and tomorrow based on zodiac signs. These are algorithmic and not personalized.</p>
                            </li>
                            <li>
                                <p className='p font-medium'>Astrologer Directory: </p>
                                <p className='p'>Browse astrologer profiles (categories, languages). <em>Contact features require login</em>.</p>
                            </li>
                        </ol>
                    </article>
                </div>
            </section> */}
{/* <section id="information-we-collect" className="pt-5">
                <div className="container">
                    <h2>1. Information We Collect</h2>

                    <article className="pt-2">
                        <h3 className="pt-2">A. Without Login:</h3>
                        <p>You can access the following features without creating an account or sharing any personal information:</p>

                        <ol className="pt-2 list-decimal pl-5 space-y-3">
                            <li>
                                <p className="font-medium">Kundali Generation & Comparison:</p>
                                <p>View your birth chart or compare two Kundalis based on planetary positions. <em>No data is stored</em>.</p>
                            </li>
                            <li>
                                <p className="font-medium">Daily Horoscope:</p>
                                <p>Access generalized predictions for today, yesterday, and tomorrow based on zodiac signs. These are algorithmic and not personalized.</p>
                            </li>
                            <li>
                                <p className="font-medium">Astrologer Directory:</p>
                                <p>Browse astrologer profiles (categories, languages). <em>Contact features require login</em>.</p>
                            </li>
                        </ol>

                        <h3 className="pt-5">B. With Login:</h3>

                        <h4 className="font-semibold pt-3">i. Information You Provide</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Mobile Number for Login:</strong> To access certain features, you must log in using your mobile number via OTP (One-Time Password). We do not collect any other personal information unless you voluntarily provide it.</li>
                            <li><strong>Profile Information (Optional):</strong> If you choose to update your profile for more accurate astrological predictions, you may provide:
                                <ul className="list-disc pl-5">
                                    <li>Name</li>
                                    <li>Date of Birth</li>
                                    <li>Birth Time</li>
                                </ul>
                                This information is stored securely and used solely for generating personalized astrological reports.
                            </li>
                        </ul>

                        <h4 className="font-semibold pt-3">ii. Third-Party Services</h4>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>RazorPay (Payment Gateway):</strong> For wallet recharges, payments are processed via Razor Pay. We do not collect or store any type of card details. We only store a reference of successful transactions to maintain your order history and wallet.</li>
                            <li><strong>Agora SDK (Audio Calls):</strong> Requires microphone permission. Calls are processed through Agora. We do not record or store call data.</li>
                            <li><strong>Firebase Cloud Messaging (FCM):</strong> Used for push notifications.</li>
                            <li><strong>Microsoft Clarity:</strong> Used for user behavior analytics.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section id="how-we-use-info" className="pt-5">
                <div className="container">
                    <h2>2. How We Use Your Information</h2>
                    <ul className="list-disc pl-5 space-y-2 pt-2">
                        <li><strong>Core Services:</strong> Deliver Kundali reports, horoscopes, and astrologer matchmaking.</li>
                        <li><strong>Payments:</strong> Process wallet top-ups and maintain transaction history.</li>
                        <li><strong>Communication:</strong> Facilitate chat/call with astrologers (logged-in users only).</li>
                        <li><strong>Improvements:</strong> Analyze usage patterns to enhance app functionality.</li>
                        <li><strong>Legal Compliance:</strong> Respond to lawful requests (e.g., court orders).</li>
                    </ul>
                </div>
            </section>

            <section id="data-sharing" className="pt-5">
                <div className="container">
                    <h2>3. Data Sharing & Disclosure</h2>
                    <ul className="list-disc pl-5 space-y-2 pt-2">
                        <li>We do not sell or share your personal data with third parties, except:</li>
                        <li><strong>Astrologers:</strong> Only necessary details (name, birth details) are shared for consultations.</li>
                        <li><strong>Service Providers:</strong> RazorPay, Agora, and Firebase comply with privacy standards.</li>
                        <li><strong>Legal Requirements:</strong> We may disclose data if required by law.</li>
                    </ul>
                </div>
            </section>

            <section id="user-rights" className="pt-5">
                <div className="container">
                    <h2>4. User Controls & Rights</h2>
                    <ul className="list-disc pl-5 space-y-2 pt-2">
                        <li><strong>Edit/Delete Profile:</strong> You can update or delete profile details anytime.</li>
                        <li><strong>Delete Account:</strong> Available in app settings. This deletes all data permanently.</li>
                        <li><strong>Permissions:</strong> You can revoke RECORD_AUDIO or POST_NOTIFICATIONS in device settings.</li>
                    </ul>
                </div>
            </section>

            <section id="data-security" className="pt-5">
                <div className="container">
                    <h2>5. Data Security</h2>
                    <p className="pt-2">Personal data is transmitted via SSL. We store it in secure databases with limited access. We follow industry-standard security practices, but no method is 100% secure.</p>
                </div>
            </section>

            <section id="age-restriction" className="pt-5">
                <div className="container">
                    <h2>6. Age Restriction</h2>
                    <p className="pt-2">This app is for users aged 18+. Minors should use it only under parental guidance. We do not knowingly collect data from users under 18.</p>
                </div>
            </section>

            <section id="disclaimer" className="pt-5">
                <div className="container">
                    <h2>7. Disclaimer</h2>
                    <p className="pt-2">ChatMyAstrologer is not responsible for interactions with third-party services (e.g., Razorpay, Agora, Firebase). Users are advised to read those services’ Privacy Policies before use.</p>
                </div>
            </section>

            <section id="policy-changes" className="pt-5">
                <div className="container">
                    <h2>8. Changes to This Policy</h2>
                    <p className="pt-2">We may update this policy occasionally. Material changes will be communicated via app or email. Please review this policy periodically.</p>
                </div>
            </section>

            <section id="contact-us" className="pt-5 pb-10">
                <div className="container">
                    <h2>9. Contact Us</h2>
                    <p className="pt-2">For privacy-related queries:</p>
                    <ul className="pl-5 list-disc space-y-1">
                        <li>Email: <a href="mailto:info@tracewavetransparency.com" className="text-blue-600 underline">info@tracewavetransparency.com</a></li>
                        <li>Business Hours: Monday to Friday, 09:30 AM – 6:00 PM (excluding public holidays)</li>
                    </ul>
                    <p className="pt-2">By using ChatMyAstrologer, you acknowledge that you have read and understood this Privacy Policy.</p>
                </div>
            </section> */}