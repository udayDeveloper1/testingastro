// import kundaliChart from "../../assets/img/kundali/kundaliChart.svg";
import kundaliChart from "../../assets/img/kundali/kundliReport.webp";
import CustomTable from "../Custom/CustomTable";

const columns = [
  {
    title: "--",
    dataIndex: "planet",
    key: "planet",
    render: (text, record) => ({
      children: (
        <div className={record.key === "3" ? "text-center" : ""}>{text}</div>
      ),
      props: {
        colSpan: record.key === "3" ? 2 : 1, // Merge first two columns
      },
    }),
  },
  {
    title: "Sign Lord",
    dataIndex: "signLord",
    key: "signLord",
    render: (text, record) => ({
      children: (
        <div className={record.key === "3" ? "text-center" : ""}>{text}</div>
      ),
      props: {
        colSpan: record.key === "3" ? 0 : 1, // Hide this column for key 3
      },
    }),
  },
  {
    title: "Star Lord",
    dataIndex: "starLord",
    key: "starLord",
    render: (text, record) => ({
      children: (
        <div className={record.key === "3" ? "text-center" : ""}>{text}</div>
      ),
      props: {
        colSpan: record.key === "3" ? 2 : 1, // Merge last two columns
      },
    }),
  },
  {
    title: "Sub Lord",
    dataIndex: "subLord",
    key: "subLord",
    render: (text, record) => ({
      children: (
        <div className={record.key === "3" ? "text-center" : ""}>{text}</div>
      ),
      props: {
        colSpan: record.key === "3" ? 0 : 1, // Hide this column for key 3
      },
    }),
  },
];

const data = [
  {
    key: "1",
    planet: "Mo",
    signLord: "Sun",
    starLord: "Ketu",
    subLord: "Saturn",
  },
  {
    key: "2",
    planet: "Asc",
    signLord: "Jupiter",
    starLord: "Mercury",
    subLord: "Jupiter",
  },
  {
    key: "3",
    planet: "Day Lord",
    signLord: "",
    starLord: "Jupiter",
    subLord: "",
  },
];

const AstrologyComponent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-6  items-start">
      <div className="flex justify-center">
        <div>
          <h3 className="text-lg font-semibold mb-4 ">Ruling Planets</h3>
          <div>
            <img
              src={kundaliChart}
              alt="Kundali Chart"
              className="w-full max-w-xs md:max-w-sm"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2  rounded-[10px]  bg-white w-full">
        <h3 className="text-lg font-semibold mb-4 ">Ruling Planets</h3>
        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          scroll={{ x: "1750px", y: 500 }}
          className="text-center h-full"
        />
      </div>
    </div>
  );
};

export default AstrologyComponent;
