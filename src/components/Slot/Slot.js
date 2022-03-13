import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Badge } from "antd";

const Slot = ({ session }) => {
  // return <DataInput></DataInput>;
  // console.log(session);
  let ageLimit =
    session["max_age_limit"] === "undefined"
      ? session["max_age_limit"]
      : session["min_age_limit"];

  return (
    <Col span={24}>
      <Badge.Ribbon text={session["vaccine"]}>
        <Card
          hoverable={true}
          title={session["address"] + " " + session["block_name"]}
        >
          {/* <Meta description={session["address"]} /> */}
          {session["name"]}
          <br />
          {"Age Limit: upto " + ageLimit + "years"}
          <br />

          {"Available Doses " + session["available_capacity"]}
        </Card>
      </Badge.Ribbon>
    </Col>
  );
};

export default Slot;
