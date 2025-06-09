import React from 'react'
import { Card, Typography } from 'antd'
import { formatThirdPartyContent } from '../../utils/CommonFunction';

const { Title, Paragraph } = Typography

const DynamicCard = React.memo(
  ({
    title,
    introText = '',
    data = "",
    bottomText = '',
    dangerouslyPara = false,
    listStyle = 'disc'
  }) => {

    let stringData = typeof data === 'string' ? data : JSON.stringify(data || '');
    let formattedData = formatThirdPartyContent(stringData)

    return (
      <Card title={title} bordered={false} className='structureHinduCalender'>
        <div className='flex flex-col gap-2'>

          {introText && (
            <Paragraph className='struct_heading'>{introText}</Paragraph>
          )}

          {/* {Array.isArray(data) && data.length > 0 && (
            <ul className={`list-${listStyle} pl-5`}>
              {data.map(({ title, description }, index) => (
                <li key={index} className='mb-2'>
                  {title && (
                    <Title level={5} className='struct_title'>
                      {title}
                    </Title>
                  )}
               
                  {description &&
                    (!dangerouslyPara ? (
                      <Paragraph className='struct_Para'>
                        {description}
                      </Paragraph>
                    ) : (
                      <p
                        className='struct_Para'
                        dangerouslySetInnerHTML={{ __html: description }}
                      />
                    ))}
                </li>
              ))}
            </ul>
          )} */}

          <p
            className='struct_Para'
            dangerouslySetInnerHTML={{ __html: formattedData }}
          />

          {bottomText && (
            <Paragraph className='struct_heading'>{bottomText}</Paragraph>
          )}
        </div>
      </Card>
    )
  }
)

export default DynamicCard
