import React from "react";
// import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Table, Button, Space } from "antd";
// import Slot from "../Slot/Slot";
// import dataRaw from "../../session.json";

const setupData = (dataRaw) => {
  let datasessions = dataRaw;
  // console.log(dataRaw);
  if (datasessions === undefined) return {};

  datasessions = datasessions.map((ele, i) => {
    return { ...ele, key: i };
  });
  const data = datasessions;
  const areaSet = new Set();
  const typeSet = new Set();
  const feeSet = new Set();
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
  return { areaFilter, typeFilter, feeFilter, data };
};

// console.log(areaFilter, typeFilter, feeFilter);

class Slots extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    // console.log(filters);

    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    // console.log(this.state);
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  setPriceSort = () => {
    this.setState({
      sortedInfo: {
        order: "ascend",
        columnKey: "vaccine",
      },
    });
  };

  render() {
    const { areaFilter, typeFilter, feeFilter, data } = setupData(
      this.props.filteredData
    );

    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    // console.log("from render: ", filteredInfo);
    const columns = [
      {
        title: "PHC Name",
        dataIndex: "name",
        key: "name",
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name < b.name,
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Area",
        dataIndex: "block_name",
        key: "block_name",
        filters: areaFilter,
        filteredValue: filteredInfo.block_name || null,
        onFilter: (value, record) => record.block_name.includes(value),
        sorter: (a, b) => a.block_name < b.block_name,
        sortOrder: sortedInfo.columnKey === "block_name" && sortedInfo.order,
        ellipsis: true,
        responsive: ["lg", "md"],
      },

      {
        title: "Type",
        dataIndex: "vaccine",
        key: "vaccine",
        filters: typeFilter,
        filteredValue: filteredInfo.vaccine || null,
        onFilter: (value, record) => record.vaccine.includes(value),
        sorter: (a, b) => a.vaccine < b.vaccine,
        sortOrder: sortedInfo.columnKey === "vaccine" && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: "Available",
        dataIndex: "available_capacity",
        key: "available_capacity",
        sorter: (a, b) => a.available_capacity < b.available_capacity,
        sortOrder:
          sortedInfo.columnKey === "available_capacity" && sortedInfo.order,
        ellipsis: true,
        responsive: ["lg", "md"],
      },
      {
        title: "Fee",
        dataIndex: "fee",
        key: "fee",
        filters: feeFilter,
        filteredValue: filteredInfo.fee || null,
        sorter: (a, b) => a.fee < b.fee,
        sortOrder: sortedInfo.columnKey === "fee" && sortedInfo.order,
        onFilter: (value, record) => record.fee.includes(value),
        ellipsis: true,
      },
    ];

    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          {/* <Button onClick={this.setPriceSort}>Sort Price</Button> */}
          <Button onClick={this.clearFilters}>Clear filters</Button>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          onChange={this.handleChange}
        />
      </>
    );
  }
}

export default Slots;
