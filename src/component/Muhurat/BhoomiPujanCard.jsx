import { Card, Divider, Typography } from "antd";
import { memo } from "react";

const { Title, Paragraph } = Typography;

const BhoomiPujanCard = ({ title, description, steps, listStyle, footer }) => {
  return (
    <Card title={title} bordered={false} className="structureHinduCalender">
      {/* Dynamic Intro Text */}
      {description && <Paragraph className="struct_heading">{description}</Paragraph>}

      <Divider />

      {/* Dynamic Steps */}
      <div className="flex flex-col">

        {steps?.map((step, index) => (
          <Card
            key={index}
            title={<Title level={5} className="struct_title ">{`${index + 1}. ${step.title}`}</Title>}
            bordered={true}
            style={{ marginBottom: 16, background: "#fafafa" }}
            className="innerCardForBhoomipujan mb-0"
          >
            <ul className={`list-${listStyle} pl-8 flex flex-col mb-0`}>
              {step.details.map((detail, i) => (
                <li key={i} className="mb-1 struct_Para">{detail}</li>
              ))}
            </ul>

          </Card>
        ))}
      </div>
      <div >
        <Typography.Text type="struct_heading">
          {footer && <Paragraph className="struct_heading">{footer}</Paragraph>}

        </Typography.Text>
      </div>
    </Card>
  );
};

export default memo(BhoomiPujanCard);
