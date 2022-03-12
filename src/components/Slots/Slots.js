import { React, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Button, Space } from "antd";
import Slot from "../Slot/Slot";
import dataRaw from "../../session.json";
const data = dataRaw["sessions"];
const areaSet = new Set();
const typeSet = new Set();
const feeSet = new Set();
console.log(data);
const convertToFilterData = (data) => {
  let result = [];
  data.forEach((element) => result.push({ text: element, value: element }));
  return result;
};

data.forEach((element) => {
  //console.log(element);
  areaSet.add(element["block_name"]);
  typeSet.add(element["vaccine"]);
  feeSet.add(element["fee"]);
});

const areaFilter = convertToFilterData(areaSet);
const typeFilter = convertToFilterData(typeSet);
const feeFilter = convertToFilterData(feeSet);

// console.log(areaFilter, typeFilter, feeFilter);

const Slots = ({ filteredData }) => {
  const [filteredInfo, setFilteredInfo] = useState();
  const [sortedInfo, setSortedInfo] = useState();

  let sortedInfonew = sortedInfo || {};
  let filteredInfonew = filteredInfo || {};

  const columns = [
    {
      title: "PHC Name",
      dataIndex: "name",
      key: "name",
      filteredValue: filteredInfonew.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfonew.columnKey === "name" && sortedInfonew.order,
      ellipsis: true,
    },
    {
      title: "Area",
      dataIndex: "block_name",
      key: "block_name",
      filters: areaFilter,
      filteredValue: filteredInfonew.name || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.age - b.age,
      sortOrder:
        sortedInfonew.columnKey === "block_name" && sortedInfonew.order,
      ellipsis: true,
      responsive: ["lg", "md"],
    },

    {
      title: "Type",
      dataIndex: "vaccine",
      key: "vaccine",
      filters: typeFilter,
      filteredValue: filteredInfonew.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfonew.columnKey === "vaccine" && sortedInfonew.order,
      ellipsis: true,
    },
    {
      title: "Available",
      dataIndex: "available_capacity",
      key: "available_capacity",
      sorter: (a, b) => a.age - b.age,
      sortOrder:
        sortedInfonew.columnKey === "available_capacity" && sortedInfonew.order,
      ellipsis: true,
      responsive: ["lg", "md"],
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
      filters: feeFilter,
      filteredValue: filteredInfonew.name || null,
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfonew.columnKey === "fee" && sortedInfonew.order,
      onFilter: (value, record) => record.address.includes(value),
      ellipsis: true,
    },
  ];

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setFilteredInfo(null);
    setSortedInfo(null);
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "vaccine",
    });
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};

export default Slots;
