// import logo from "./vaclogo.svg";
export const months = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};
// export let resp = { res: null };
export async function getcontents(id, dateData) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" +
      String(id) +
      "&date=" +
      dateData +
      "\n",
    requestOptions
  );
  const data = await response.json();
  //   console.log(data);

  return data;
  // var f =   fetch("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+String(id)+"&date=31-03-2021\n", requestOptions);
  // var res = f.then(response=>response.text());
  //   console.log(result);
}
export function AppHeader() {
  return (
    <header className="App-header">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <div className="main">
        <h1 className="main-heading">
          <span className="main-heading-primary">Covid-19 Vaccine </span>
          <span className="main-heading-secondary"> Availibility Checker</span>
        </h1>
      </div>
    </header>
  );
}
