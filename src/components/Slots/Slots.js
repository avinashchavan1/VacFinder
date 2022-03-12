import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Card, Col, Row, Space, Badge } from "antd";
import Slot from "../Slot/Slot";

const Slots = ({ filteredData }) => {
  // return <DataInput></DataInput>;
  return (
    <Space direction="vertical" size={"large"}>
      {filteredData.length > 0 &&
        "Available slots in district: " + filteredData.length}
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {filteredData.map((data, i) => {
          return <Slot key={i} session={data} />;
        })}
      </Row>
    </Space>
  );
};

export default Slots;
