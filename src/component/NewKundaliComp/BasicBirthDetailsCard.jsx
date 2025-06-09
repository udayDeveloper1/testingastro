import { Card } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatTime } from '../../utils/CommonFunction'
import { TimeFormat } from '../../utils/CommonVariable'
import CustomTable from '../Custom/CustomTable'

const columns = [
  {
    // title: 'Field',
    dataIndex: 'label',
    key: 'label',
    render: text => (
      <span className='newKundaliTableKey capitalize'>{text}</span>
    ),
    width: 40,
    fixed: 'left'
  },
  {
    // title: 'Value',
    dataIndex: 'value',
    key: 'value',
    render: text => (
      <span className='newKundaliTableValue capitalize'>{text}</span>
    ),
    width: 200
  }
]

export default function BasicBirthDetailsCard({
  panchangeDetails,
  planetDetails
}) {
  const { t } = useTranslation()

  const { request = {}, response = {} } = panchangeDetails || {}

  return (
    <>
      <div className='flex flex-col gap-[24px]'>
        <div className='grid grid-cols-2 gap-6 sm:border  rounded-[10px] sm:p-[15px] md:p-[30px] basicBirthDetailsCard'>
          <Card
            className='rounded-[10px] overflow-hidden  col-span-2 md:col-span-1'
            styles={{ body: { padding: 0 } }}
          >
            {/* Header */}
            <div className='bg_website_color px-4 py-2'>
              <h3 className='new_common_heading capitalize'>
                {t('basic_birth_details')}
              </h3>
            </div>

            {/* Custom Table */}
            <CustomTable
              columns={columns}
              data={[
                {
                  key: '1',
                  label: t('name'),
                  value: `${request?.u_name || '-'}`
                },
                // { key: "2", label: "Time", value: `${formatTime(request?.time, TimeFormat?.TIME_12_HOUR_FORMAT) || '-'}` },
                {
                  key: '3',
                  label: t('place'),
                  value: `${request?.bop || '-'}`
                },
                {
                  key: '4',
                  label: t('latitude'),
                  value: `${request?.lat || '-'}`
                },
                {
                  key: '5',
                  label: t('longitude'),
                  value: `${request?.lon || '-'}`
                },
                {
                  key: '6',
                  label: t('timezone'),
                  value: `${request?.tz || '-'}`
                },
                {
                  key: '7',
                  label: t('sunrise'),
                  value: `${response?.advanced_details?.sun_rise || '-'}`
                },
                {
                  key: '8',
                  label: t('sunset'),
                  value: `${response?.advanced_details?.sun_set || '-'}`
                },
                {
                  key: '9',
                  label: t('ayanamsha'),
                  value: `${response?.ayanamsa?.name || '-'}`
                }
              ]}
              pagination={false}
              loading={false}
              bordered={false}
              scroll={{ x: 'max-content' }}
              showHeader={false}
              className='basic-table ronded-b-[10px] kundaliTable'
            />
          </Card>
          <Card
            className='rounded-[10px] overflow-hidden col-span-2 md:col-span-1 '
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div className='bg_website_color px-4 py-2'>
              <h3 className=' new_common_heading'>{t('panchang_details')}</h3>
            </div>

            {/* Custom Table */}
            <CustomTable
              columns={columns}
              data={[
                {
                  key: '1',
                  label: t('tithi'),
                  value: response?.tithi?.name || '-'
                },
                {
                  key: '2',
                  label: t('karana'),
                  value: response?.karana?.name || '-'
                },
                {
                  key: '3',
                  label: t('yog'),
                  value: response?.yoga?.name || '-'
                },
                // { key: '4', label: 'Second Karana', value: '21.41' },
                {
                  key: '4',
                  label: t('Nakshatra-Charan'),
                  value: response?.nakshatra?.name || '-'
                },
                // { key: '5', label: 'Sun Rise', value: response?.advanced_details?.sun_rise },
                // { key: '6', label: 'Sun Set', value: response?.advanced_details?.sun_set },
                {
                  key: '7',
                  label: t('MoonRise'),
                  value: response?.advanced_details?.moon_rise || '-'
                },
                {
                  key: '8',
                  label: t('MoonSet'),
                  value: response?.advanced_details?.moon_set || '-'
                },
                {
                  key: '9',
                  label: t('Paksha'),
                  value: response?.advanced_details?.masa?.paksha || '-'
                }
              ]}
              pagination={false}
              loading={false}
              bordered={false}
              showHeader={false}
              scroll={{ x: 'max-content' }}
              className='ronded-b-[10px] oveflow-hidden'
            />
          </Card>
        </div>
        <div className='grid grid-cols-2 gap-6  sm:p-[15px] md:p-[30px] sm:border commonLightBorder rounded-[10px]'>
          <Card
            className='col-span-4 overflow-hidden '
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div className='bg_website_color px-4 py-2'>
              <h3 className=' new_common_heading'>{t('personal_details')}</h3>
            </div>
            {/* Custom Table */}
            <CustomTable
              columns={columns}
              data={[
                {
                  key: '1',
                  label: t('sex'),
                  value: request?.gender
                    ? request.gender.charAt(0).toUpperCase() +
                    request?.gender?.slice(1)?.toLowerCase()
                    : 'N/A'
                },
                { key: '2', label: t('date_of_birth'), value: request?.date }, //formatDate(request?.date, DateFormat?.ABBREVIATED_FULL_DATE_FORMAT) },
                // { key: '10', label: 'Day of Birth', value: request?.time },
                {
                  key: '3',
                  label: t('time_of_birth'),
                  value:
                    formatTime(
                      request?.time,
                      TimeFormat?.TIME_12_HOUR_FORMAT
                    ) || '-'
                },
                {
                  key: '4',
                  label: t('place_of_birth'),
                  value: request?.bop || '-'
                },
                { key: '5', label: t('timezone'), value: request?.tz || '-' },
                // { key: '6', label: 'Local Time Correction', value: request?.tzon || '-' },
                { key: '7', label: t('latitude'), value: request?.lat || '-' },
                { key: '9', label: t('longitude'), value: request?.lon || '-' }
                // { key: '8', label: 'Hindu Week Day ', value: '2:26:25 PM' },
              ]}
              pagination={false}
              loading={false}
              bordered={false}
              scroll={{ x: 'max-content' }}
              showHeader={false}
              className='!border-none new_custom_table'
            />
          </Card>
        </div>
      </div>
    </>
  )
}
