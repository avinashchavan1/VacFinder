import "./App.css";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import data from "./data2.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import sessionData from "./session.json";
import { AppHeader, months } from "./Req";
import { SlotComponent } from "./Slot";
import axios from "axios";

var date = new Date();
var maxdate = new Date();
maxdate.setDate(maxdate.getDate() + 14);

function SearchResult(props) {
  var session = props.session;
  // console.log(session);
  var sessions = "sessions";
  sessions = session[sessions];
  // console.log(sessions.length);
  console.log(sessions);
  if (sessions === undefined) {
    return (
      <div className="Start-Message">
        <h2>Please select the slot to view availibility</h2>
      </div>
    );
  } else if (sessions === "[]") {
    return (
      <div className="Search-result">
        <h2>No slot Available</h2>
      </div>
    );
  }
  var noSlotCount = 0;
  var entryFlag = 0;
  var SizeCount = 0;
  for (const row in sessions) {
    if (row !== null) {
      SizeCount++;
    }
    entryFlag++;
    if (sessions[row].available_capacity > 0) {
      noSlotCount++;
    }
  }
  if (SizeCount === 0) {
    return (
      <div className="Start-Message">
        <h2>No Slots Available</h2>
      </div>
    );
  }
  if (!noSlotCount && entryFlag) {
    return (
      <div className="Start-Message">
        <h2>All Slots Are Booked For The Day, Try Changing Date</h2>
      </div>
    );
  }
  // console.log(filteredData);
  // sessions = filteredData;
  return (
    <div className="Search-result">
      {sessions.map((session, index) => {
        // console.log(session);
        return <SlotComponent key={index} sessionData={session} />;
      })}
    </div>
  );
}
function App() {
  const [country, setCountry] = useState(null);
  const [lang, setLang] = useState(null);
  const [langList, setLangList] = useState([]);
  // const [link, setLink] = useState("");
  const [cal, setcal] = useState(null);
  const [resData, setResData] = useState([]);
  // const [sessionData, setSessionData] = useState(sessionData1);

  // handle change event of the country dropdown
  const handleCountryChange = (obj) => {
    setCountry(obj);
    setLangList(obj.districts);
    setLang(null);
  };
  const handleCalenderChange = (obj) => {
    setcal(obj);
  };
  // handle change event of the language dropdown
  const handleLanguageChange = (obj) => {
    setLang(obj);
  };
  // generate the link when both dropdowns are selected
  useEffect(() => {
    if (country && lang && cal) {
      var mdate = String(cal);
      // console.log(country, lang, cal);
      mdate = mdate.split(" ");
      mdate =
        mdate[2] +
        "-" +
        months[String(mdate["1"]).toLowerCase()] +
        "-" +
        mdate[3];
      // setLink(
      //   `https://www.${country.state}/search?q=Clue+Mediator&gl=${cal}&hl=${lang.districtcode}`
      // );
      var id = lang.districtcode;
      var dateData = mdate;
      // var result = getcontents(lang.districtcode, mdate);
      var URL =
        "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
        String(id) +
        "&date=" +
        dateData +
        "\n";
      async function fetchData() {
        const request = await axios.get(URL);
        // console.log(request.data);
        setResData(request.data);
      }
      fetchData();
    }
  }, [country, lang, cal]);
  return (
    <div>
      <div className="App">
        <AppHeader />
        <div className="App-body">
          <div style={{ width: 300, marginBottom: 40, marginTop: 40 }}>
            {/* <b>State</b> */}
            <Select
              placeholder="Select State"
              value={country}
              options={data}
              onChange={handleCountryChange}
              getOptionLabel={(x) => x.state}
              getOptionValue={(x) => x.state_id}
            />
            <br />
            {/* <b>District</b> */}
            <Select
              placeholder="Select District"
              value={lang}
              options={langList}
              onChange={handleLanguageChange}
              getOptionLabel={(x) => x.name}
              getOptionValue={(x) => x.districtcode}
            />
          </div>
          <div style={{ width: 300, marginBottom: 40 }}>
            <Calendar
              minDate={date}
              maxDate={maxdate}
              onChange={handleCalenderChange}
              value={cal}
            />
          </div>
          {/* <div>
            <b>Link:</b> {country && lang && cal ? link : "-"}
          </div> */}
        </div>
      </div>
      <SearchResult session={resData} />

      <footer>
        <div className="copyright">
          <p>Developed by CodeStormBreaker823</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
