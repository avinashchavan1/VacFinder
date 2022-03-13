import { DatePicker, Select, Space } from "antd";
import "antd/dist/antd.css";
import data from "../../data2.json";
import React, { useState, useEffect } from "react";

const statesData = data.map((state) => {
  return { state_id: state["state_id"], state_name: state["state"] };
});
const districtData = data.map((state) => {
  return { state_id: state["state_id"], districts: state["districts"] };
});
// function disabledDate(current) {
//   // Can not select days before today and today
//   return current ;
// }

const { Option } = Select;

const DataInput = ({ handleChangeResponseData }) => {
  const [state, setState] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  const [currDate, setCurrDate] = useState();

  useEffect(() => {
    if (state && district && currDate) {
      // console.log("State:", state);
      // console.log("District:", district);
      // console.log("CurrDate:", currDate);
      let URL =
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
        String(district) +
        "&date=" +
        currDate +
        "\n";
      // console.log(URL);
      fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          handleChangeResponseData(res);
        })
        .catch((err) => console.log(err));
    }
  }, [state, district, currDate]); // eslint-disable-line react-hooks/exhaustive-deps

  function onChange(date) {
    setCurrDate(date.format("DD-MM-YYYY"));
  }

  const handleStateNameChange = (value) => {
    let districtVal = districtData.filter((state) => {
      return state["state_id"] === value;
    });
    districtVal = districtVal[0]["districts"];
    setState(value);
    setDistricts(districtVal);
    setDistrict(districtVal[0]["districtcode"]);
  };
  const handleDistrictNameChange = (value) => {
    console.log(value);
    setDistrict(value);
  };

  return (
    <Space
      direction="vertical"
      size={"large"}
      style={{ margin: "40px 0", padding: "0 2vw" }}
    >
      <Select
        placeholder={"Select State Name"}
        style={{ width: 200 }}
        onChange={handleStateNameChange}
      >
        {statesData.map((state) => (
          <Option key={state["state_name"]} value={state["state_id"]}>
            {state["state_name"]}
          </Option>
        ))}
      </Select>
      <Select
        style={{ width: 200 }}
        value={district}
        placeholder={"Select District Name"}
        onChange={handleDistrictNameChange}
      >
        {districts.map((district) => (
          <Option key={district["name"]} value={district["districtcode"]}>
            {district["name"]}
          </Option>
        ))}
      </Select>
      <DatePicker
        // disabledDate={disabledDate}
        style={{ width: 280 }}
        onChange={onChange}
      />
    </Space>
  );
};

export default DataInput;
