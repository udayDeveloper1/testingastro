import React, { useCallback, useMemo, useState } from "react";
import Table from "antd/es/table";
import { useLocation } from "react-router-dom";
import { createStyles } from "antd-style";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const CustomTable = React.memo(
  ({
    columns,
    data,
    scroll,
    loading,
    serverPagination,
    pagination = true,
    ...rest
  }) => {
    const { styles } = useStyle();
    const { pathname } = useLocation();

    const itemRender = useCallback((_, type, originalElement) => {
      if (type === "prev") return <span>{" Previous"}</span>;
      if (type === "next") return <span>Next</span>;
      return originalElement;
    }, []);

    const paginationConfig = useMemo(() => {
      if (!pagination) return false;

      const defaultConfig = {
        defaultPageSize: 5,
        itemRender,
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 25, 50, 100, 1000, 10000],
      };

      return serverPagination
        ? { ...serverPagination, ...defaultConfig }
        : defaultConfig;
    }, [pagination, serverPagination, itemRender]);

    const getRowClassName = useCallback(
      (record, index) => {
        if (pathname === "/pending-Requests" && record?.errorFlag) {
          return "table-row error-flag";
        }
        return index % 2 === 0 ? "table-row even-row" : "table-row odd-row";
      },
      [pathname]
    );

    return (
      <div className="custom-table ">
        <Table
          rowClassName={getRowClassName}
          className={styles.customTable}
          columns={columns}
          dataSource={data}
          bordered
          expandable
          pagination={paginationConfig}
          loading={loading}
          scroll={scroll }
          sticky
          {...rest}
        />
      </div>
    );
  }
);

export default CustomTable;
