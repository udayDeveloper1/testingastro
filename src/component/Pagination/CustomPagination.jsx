import React from "react";
import { Pagination } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setPageScroll } from "../../storemain/slice/MasterSlice";

const CustomPagination = ({ current, total, onChange, perpage }) => {

  const dispatch = useDispatch()

  const handleChange = (page, pageSize) => {
    onChange(page, pageSize);
    dispatch(setPageScroll(true));
  };

  return (
    <Pagination
      current={current}
      total={total}
      // onChange={ () ={onChange() ; dispatch(setPageScroll(true))}}
      onChange={handleChange}
      pageSize={perpage}
      itemRender={(page, type, originalElement) => {
        if (type === "prev" || type === "next") {
          return type === "next" ? <RightOutlined /> : originalElement;
        }
        return originalElement;
      }}
      className="custom-pagination flex justify-center items-center"
    />
  );
};
export default CustomPagination;
