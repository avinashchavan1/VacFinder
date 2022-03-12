import DataInput from "./components/DataInput/DataInput";
import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Breadcrumb, Divider } from "antd";
import Slots from "./components/Slots/Slots";
import { useState, useEffect } from "react";

const { Header, Content, Footer, Sider } = Layout;
// const DataInput = require("./components/DataInput/DataInput");
// const DataInput = () => {
//   return <h1>1111</h1>;
// };
const App = () => {
  // return <DataInput></DataInput>;
  const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    console.log("ResData: ", responseData);
  }, [responseData]);
  const handleChangeResponseData = (value) => {
    setResponseData(value["sessions"]);
    setFilteredData(value["sessions"]);
  };
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key={1}>Home</Menu.Item>
          <Menu.Item key={2}>Dashboard</Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 20px" }}>
        <DataInput
          // style={{ margin: "16px 0" }}
          handleChangeResponseData={handleChangeResponseData}
        ></DataInput>
        <Divider />
        <Slots filteredData={filteredData}></Slots>
      </Content>
      <Divider />
      <Footer style={{ textAlign: "center" }}>
        Vaccine India ©2021 Created by Avinash Chavan
      </Footer>
    </Layout>
  );
};

export default App;
