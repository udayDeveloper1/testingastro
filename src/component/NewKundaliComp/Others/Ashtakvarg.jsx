import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { lazy, memo } from "react";
const CustomTable = lazy(() => import("../../Custom/CustomTable"))
function Ashtakvarg({ ashtakvarga }) {
  const { t } = useTranslation()

  // const signs = ["Ar", "Ta", "Ge", "Ca", "Le", "Vi", "Li", "Sc", "Sa", "Aq", "Pi", "Cp",];

  const signs = [{ key: "Ar", value: t('Ar') }, { key: "Ta", value: t('Ta') }, { key: "Ge", value: t("Ge") }, { key: "Ca", value: t('Ce') }, { key: "Le", value: t("Le") }, { key: "Vi", value: t("Vi") }, { key: "Li", value: t("Li") }, { key: "Sc", value: t("Sc") }, { key: "Sa", value: t("Sa") }, { key: "Aq", value: t("Aq") }, { key: "Pi", value: t("Pi") }, { key: "Cp", value: t("Cp") },];

  const dataSource = ashtakvarga?.ashtakvarga_order?.map((planet, i) => {
    const points = ashtakvarga?.ashtakvarga_points[i];
    const row = {
      key: i + 1,
      planet: planet?.toUpperCase()?.slice(0, 4),
    };

    signs?.forEach((sign, index) => {
      row[sign?.key] = Number(points[index] ?? 0);
    });

    //     const signObjects = signs.map(sign => ({
    //   key: sign,
    //   value: t(sign.toLowerCase())  // Assuming your translation keys are in lowercase like 'ar'
    // }));

    return row;
  });

  // Add TOTAL row
  const totalRow = {
    key: "total",
    planet: t('total'),
  };

  if (Array.isArray(signs) && Array.isArray(ashtakvarga?.ashtakvarga_total)) {
    signs.forEach((sign, index) => {
      totalRow[sign.key] = Number(ashtakvarga.ashtakvarga_total?.[index] ?? 0);
    });


  }

  dataSource?.push(totalRow);

  // Build columns
  const columns = [
    {
      title: t('planets'),
      dataIndex: "planet",
      key: "planet",
      fixed: "left",
      align: "center",
      width: "100px",
      render: (text) => (
        <span className="font-semibold text-gray-800">{text || '-'}</span>
      ),
    },
    ...signs.map((sign) => ({
      title: sign.value,
      dataIndex: sign?.key,
      key: sign?.key,
      align: "center",
      width: "60px",
      render: (text) => <span className="new_body_font font-semibold">{text}</span>,
    })),
  ];

  return (
    <>
      <div className="flex flex-col gap-[24px]">
        <div className="grid grid-cols-2 gap-6 commonCardBorderKundali  rounded-[10px] md:p-[15px] md:p-[30px]">
          <Card
            className="rounded-[10px] overflow-hidden  col-span-2"
            bodyStyle={{ padding: 0 }}
          >
            {/* Header */}
            <div className="bg_website_color px-4 py-2">
              <h3 className=" new_common_heading">{t('Ashtakvarg')}</h3>
            </div>

            {/* Custom Table */}
            <CustomTable
              columns={columns}
              data={dataSource}
              pagination={false}
              loading={false}
              scroll={{ x: "max-content" }}
              bordered={false}
              className="lightBackHead"
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export default memo(Ashtakvarg)