import { Form, Input } from "antd";
import { t } from "i18next";
import { lazy, memo, Suspense } from "react";
import contact from "../../assets/img/contactUs/contact.svg";
import mail from "../../assets/img/contactUs/mail.svg";
import mapIcon from "../../assets/img/contactUs/mapIcon.svg";
import { addContactUs } from "../../services/api/api.services";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/CommonFunction";
import { Codes } from "../../utils/CommonVariable";

const CustomButton = lazy(() => import("../../component/Homepage/CustomButton"));
const CommonBanner = lazy(() => import("../../component/CommonBanner"));

const { TextArea } = Input;

const ContactSection = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    let request = {
      name: values?.name,
      email: values?.email,
      country_code: values?.country_code ? values?.country_code : '+91',
      mobile_number: values?.phone,
      description: values?.message
    }
    addContactUs(request).then((response) => {
      if (response?.code === Codes?.SUCCESS) {
        TOAST_SUCCESS(response?.message)
        form.resetFields()
      } else {
        TOAST_ERROR(response?.message)
      }
    })
  };

  return (
    <>
      <section>
        <CommonBanner
          text=""
          highlight={t("contact_us")}
        />
      </section>
 <Suspense fallback={<div className='min-h-[100vh]'></div>}>
      <div className="flex flex-col items-center justify-center gap-[40px] padding100 container mx-auto">
        <div className="flex flex-col items-center gap-[10px]">
          <h2 className="newBannerH2">{t("contact_get_in_touch")}</h2>
          <p className="commonQuesP">{t("contact_any_question")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] xl:gap-10  w-full">
          {/* Contact Form */}
          <div className="bg-white box_shadow_common rounded-[10px] p-[15px] p-[25px] xl:p-[40px] md:col-span-1 flex conactUsForm new_border">
            <Form layout="vertical" form={form} onFinish={onFinish} className="w-full">
              <Form.Item
                name="name"
                label={t("contact_form_name")}
                rules={[{ required: true, message: t("contact_validation_name") }]}
              >
                <Input
                  placeholder={t("contact_placeholder_name")}
                  size="large"
                  className="px-[24px] py-[20px]"
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={t("contact_form_email")}
                rules={[
                  { required: true, message: t("contact_validation_email") },
                  { type: "email", message: t("contact_validation_email_format") },
                ]}
              >
                <Input placeholder={t("contact_placeholder_email")} size="large" />
              </Form.Item>

              <Form.Item
                name="phone"
                label={t("contact_form_phone")}
                rules={[{ required: true, message: t("contact_validation_phone") }]}
              >
                <Input type="number" placeholder={t("contact_placeholder_phone")} maxLength={10} size="large" />
              </Form.Item>

              <Form.Item
                name="message"
                label={t("contact_form_message")}
                rules={[{ required: true, message: t("contact_validation_message") }]}
              >
                <TextArea
                  rows={4}
                  placeholder={t("contact_placeholder_message")}
                  size="large"
                />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  className="px-3 py-[12px]"
                  parentClassName="md:max-w-max min-w-[250px] md:min-w-[300px]"
                >
                  {t("contact_submit")}
                </CustomButton>
              </Form.Item>
            </Form>
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-[24px]">
            {[
              {
                icon: (
                  <img
                    src={mapIcon}
                    alt=""
                    className="object-contain max-w-[50px] max-h-[50px] min-w-[50px] min-h-[50px]"
                  />
                ),
                title: t("contact_info_address_title"),
                // desc: t("contact_info_address_value"),
                desc: 'B 511 Krish cubical, Govardhan partyplot Avalon hotel Road, Sindhu Bhavan Marg, Thaltej, Ahmedabad, Gujarat 380059',
              },
              {
                icon: <img src={contact} alt="" />,
                title: t("contact_info_contact_title"),
                // desc: t("contact_info_contact_value"),
                desc: '+91 8849870410',

              },
              {
                icon: <img src={mail} alt="" />,
                title: t("contact_info_email_title"),
                // desc: t("contact_info_email_value"),
                desc: 'chatmyastrologer@gmail.com',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="contactCard box_shadow_common rounded-[10px] flex-col sm:flex-row p-[15px] p-[25px] xl:p-[52px] flex items-start sm:items-center gap-[15px] xl:gap-[50px] new_border"
              >
                <div className="gradient-background rounded-full h-[70px] w-[70px] md:min-w-[90px] md:min-h-[90px] flex items-center justify-center">
                  {item.icon}
                </div>
                <div className="flex flex-col gap-[6px] md:gap-[12px]">
                  <h4 className="commonQuesH3">{item.title}</h4>
                  <p className="commonQuesP">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
</Suspense>
    </>
  );
};

export default memo(ContactSection);
