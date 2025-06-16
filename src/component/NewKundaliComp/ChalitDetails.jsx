
import { Card } from 'antd';
const CustomTable = lazy(() => import("../Custom/CustomTable"))
export const ChalitDetails = ({ planetDetails }) => {

  const columnsPlanets = [
    {
      title: "Bhav",
      dataIndex: "bhav",
      key: "bhav",
      render: (text) => (
        <span className="new_body_font font-bold font-medium">{text}</span>
      ),
    },
    {
      title: "Sign",
      dataIndex: "sign",
      key: "sign",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "BhavBegin",
      dataIndex: "bhavbegin",
      key: "bhavbegin",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
    {
      title: "MidBhav",
      dataIndex: "midbhav",
      key: "midbhav",
      render: (text) => <span className="text-gray-800">{text}</span>,
    },
   
  ];

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-2 gap-6  rounded-[10px] p-[15px] md:p-[30px]">
        <Card
          className="rounded-[10px] overflow-hidden  col-span-2"
          bodyStyle={{ padding: 0 }}
        >
          {/* Header */}
          <div className="bg_website_color px-4 py-2">
            <h3 className=" new_common_heading">Chalit Table</h3>
          </div>

          {/* Custom Table */}
          <CustomTable
            columns={columnsPlanets}
            data={planetDetails && Object?.keys(planetDetails?.planets)?.map((key, index) => {
              const planet = planetDetails?.planets[key] || {};
              return {
                key: (index + 1).toString(),
                label: "*",
                bhav:  "*",
                sign: '*',
                bhavbegin: "*",
                midbhav: "*"
              };
            })}
            pagination={false}
            loading={false}
            bordered={false}
          />
        </Card>
      </div>
    </div>
  )
}
