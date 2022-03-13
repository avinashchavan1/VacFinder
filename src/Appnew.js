import DataInput from "./components/DataInput/DataInput";
import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Divider } from "antd";
import Slots from "./components/Slots/Slots";
import { useState } from "react";
import Page404 from "./components/Page404/Page404";
import Welcome from "./components/Welcome/Welcome";

const { Header, Content, Footer } = Layout;
const App = () => {
  // const [responseData, setResponseData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  // useEffect(() => {
  //   console.log("ResData: ", responseData);
  // }, [responseData]);
  const handleChangeResponseData = (value) => {
    // setResponseData(value["sessions"]);
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
        {/* {console.log(filteredData)} */}
        {filteredData === undefined && <Welcome />}
        {filteredData !== undefined && filteredData.length === 0 && <Page404 />}

        {filteredData !== undefined && filteredData.length > 0 && (
          <Slots filteredData={filteredData}></Slots>
        )}
      </Content>
      <Divider />
      <Footer style={{ textAlign: "center" }}>
        Vaccine India ©2021 Created by Avinash Chavan
      </Footer>
    </Layout>
  );
};

export default App;
