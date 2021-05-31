export function Slot(props) {
  var timing = props.slot;
  timing = String(timing).split("-");
  timing = timing[0];
  return <div className="Timing">{timing}</div>;
}
export function SlotComponent(props) {
  var sessionData = props.sessionData;
  // console.log(sessionData);
  var {
    available_capacity,
    block_name,
    fee_type,
    min_age_limit,
    name,
    slots,
    vaccine,
    fee,
  } = sessionData;
  if (available_capacity === 0) {
    return <></>;
  }
  var freeflag = false;
  if (block_name === "Not Applicable") {
    block_name = "";
  }
  if (fee_type === "Free" || fee_type === "") {
    freeflag = true;
    fee_type = "Free";
  }
  if (freeflag) {
    return (
      <div className="SlotRoot">
        <div className="Amount">
          {" "}
          <b>{fee_type}</b>
        </div>
        <div className="VaccineName">
          {" "}
          <h2>{vaccine}</h2>
        </div>
        <div className="Age">
          <h3>{min_age_limit} years+</h3>
        </div>
        <div className="BlockAddress">
          <address>{name + " " + block_name}</address>
        </div>
        <div className="AvailableCapcity">
          {"Available Doses : " + available_capacity}
        </div>
        <hr></hr>
        <div className="SlotAvailableHeading">
          {" "}
          <b>Slots Available</b>
        </div>
        <hr></hr>
        <div className="Slots">
          {slots.map((slot, index) => {
            return <Slot key={index} slot={slot} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="SlotRootPaid">
        <div className="AmountPaid">
          {" "}
          <b>{"Rs." + fee + " Per/Dose"}</b>
        </div>
        <div className="VaccineName">
          {" "}
          <h2>{vaccine}</h2>
        </div>
        <div className="Age">{min_age_limit} years+</div>
        <div className="BlockAddress">
          <address>{name + " " + block_name}</address>
        </div>
        <div className="AvailableCapcity">
          {"Available Doses : " + available_capacity}
        </div>
        <hr></hr>
        <div className="SlotAvailableHeading">
          {" "}
          <b>Slots Available</b>
        </div>
        <hr></hr>
        <div className="Slots">
          {slots.map((slot, index) => {
            return <Slot key={index} slot={slot} />;
          })}
        </div>
      </div>
    );
  }
}
