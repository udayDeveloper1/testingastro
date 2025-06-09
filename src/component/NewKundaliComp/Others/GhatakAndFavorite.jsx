import React from 'react'
import { Card } from "antd";
import CustomTable from '../../Custom/CustomTable';
function GhatakAndFavorite() {
    
const columns = [
    {
      // title: 'Field',
      dataIndex: 'label',
      key: 'label',
      render: (text) => <span className="newKundaliTableKey">{text}</span>,
    },
    {
      // title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align:"center",
      render: (text) => <span className="newKundaliTableValue">{text}</span>,
    },
  ];
  return (
   <div className='grid grid-cols-2 gap-6 border commonLightBorder  rounded-[10px] p-[30px]'>
             <Card
               className="rounded-[10px] overflow-hidden  col-span-2 md:col-span-1"
               bodyStyle={{ padding: 0 }}
             >
               {/* Header */}
               <div className="bg_website_color px-4 py-2">
                 <h3 className=' new_common_heading'>Ghatak (Malefics)</h3>
               </div>
   
               {/* Custom Table */}
               <CustomTable
                 columns={columns}
                 data={[
                   { key: "1", label: "Tithi", value: `${"Name" || '-'}` },
                   { key: "3", label: "Bad Karan", value: `${"Name" || '-'}` },
                   { key: "4", label: "Bad Lagna", value: `${"Name" || '-'}` },
                   { key: "5", label: "Bad Month", value: `${"Name" || '-'}` },
                   { key: "6", label: "Bad Nakshatra", value: `${"Name" || '-'}` },
                   { key: "7", label: "Bad Prahar", value: `${"Name" || '-'}` },
                   { key: "8", label: "Bad Rasi", value: `${"Name" || '-'}` },
                   { key: "9", label: "Bad Tithi", value: `${"Name" || '-'}` },
                 ]}
                 pagination={false}
                 loading={false}
                 bordered
                 showHeader={false}
               />
             </Card>
             <Card
               className="rounded-[10px] overflow-hidden  col-span-2 md:col-span-1"
               bodyStyle={{ padding: 0 }}
             >
               {/* Header */}
               <div className="bg_website_color px-4 py-2">
                 <h3 className=' new_common_heading'>Favourable Points</h3>
               </div>
   
               {/* Custom Table */}
               <CustomTable
                 columns={columns}
                 data={[
                    { key: "1", label: "Lucky Numbers", value: `${"Name" || '-'}` },
                    // { key: "2", label: "Time", value: `${formatTime("Name", TimeFormat?.TIME_12_HOUR_FORMAT) || '-'}` },
                    { key: "3", label: "Good Numbers", value: `${"Name" || '-'}` },
                    { key: "4", label: "Evil Numbers", value: `${"Name" || '-'}` },
                    { key: "5", label: "Good Years", value: `${"Name" || '-'}` },
                    { key: "6", label: "Lucky Days", value: `${"Name" || '-'}` },
                    { key: "7", label: "Good Planets", value: `${"Name" || '-'}` },
                    { key: "8", label: "Friendly Signs", value: `${"Name" || '-'}` },
                    { key: "9", label: "Good Lagna", value: `${"Name" || '-'}` },
                  ]}
                 pagination={false}
                 loading={false}
                 bordered
                 showHeader={false}
               />
             </Card>
   
           </div>
  )
}

export default GhatakAndFavorite