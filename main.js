// weather functions go here
const apiKey = "edeac25381f74542b78134423233110";
let howzuhData = {
  current: {},
  forecast: { dayOne: {}, dayTwo: {}, dayThree: {} },
  location: {},
};
let tempSetting = "F";
let dataFetched = false;

async function howzuhThen(locationId) {
  const response = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=id:" +
      locationId +
      "&days=3&aqi=yes&alerts=yes"
  );
  const weatherData = await response.json();
  console.log("Returned data: ");
  console.log(weatherData);
  howzuhTransform(weatherData);
  dataFetched = true;
  howzuhUpdate();
}

async function howzuhWhere() {
  let locationSearchValue = locationSearch.value;
  const response = await fetch(
    "https://api.weatherapi.com/v1/search.json?key=" +
      apiKey +
      "&q=" +
      locationSearchValue
  );
  if (response.status === 200) {
    const whereData = await response.json();
    howzuhThen(whereData[0].id);
  } else {
    alert("Location not found!");
  }
}

function howzuhTransform(weatherData) {
  // all the current info we need
  howzuhData.current.temp_f = Math.floor(weatherData.current.temp_f);
  howzuhData.current.feelslike_f = Math.floor(weatherData.current.feelslike_f);
  howzuhData.current.temp_c = Math.floor(weatherData.current.temp_c);
  howzuhData.current.feelslike_c = Math.floor(weatherData.current.feelslike_c);
  howzuhData.current.wind_mph = weatherData.current.wind_mph;
  howzuhData.current.wind_kph = weatherData.current.wind_kph;
  howzuhData.current.wind_degree = weatherData.current.wind_degree;
  howzuhData.current.wind_dir = weatherData.current.wind_dir;
  howzuhData.current.conditionImage = weatherData.current.condition.icon;
  howzuhData.current.conditionText = weatherData.current.condition.text;
  howzuhData.current.humidity = weatherData.current.humidity;
  howzuhData.current.uv = weatherData.current.uv;
  howzuhData.current.precip_in = weatherData.current.precip_in;
  howzuhData.current.precip_cm = weatherData.current.precip_mm;
  howzuhData.current.pressure_in = weatherData.current.pressure_in;
  howzuhData.current.pressure_mb = weatherData.current.pressure_mb;

  // all the forecast info that we need
  // day one
  howzuhData.forecast.dayOne.date = weatherData.forecast.forecastday[0].date;
  howzuhData.forecast.dayOne.mintemp_c = Math.floor(
    weatherData.forecast.forecastday[0].day.mintemp_c
  );
  howzuhData.forecast.dayOne.mintemp_f = Math.floor(
    weatherData.forecast.forecastday[0].day.mintemp_f
  );
  howzuhData.forecast.dayOne.maxtemp_c = Math.floor(
    weatherData.forecast.forecastday[0].day.maxtemp_c
  );
  howzuhData.forecast.dayOne.maxtemp_f = Math.floor(
    weatherData.forecast.forecastday[0].day.maxtemp_f
  );
  howzuhData.forecast.dayOne.uv = weatherData.forecast.forecastday[0].day.uv;
  howzuhData.forecast.dayOne.conditionText =
    weatherData.forecast.forecastday[0].day.condition.text;
  howzuhData.forecast.dayOne.conditionImage =
    weatherData.forecast.forecastday[0].day.condition.icon;
  // day two
  howzuhData.forecast.dayTwo.date = weatherData.forecast.forecastday[1].date;
  howzuhData.forecast.dayTwo.mintemp_c = Math.floor(
    weatherData.forecast.forecastday[1].day.mintemp_c
  );
  howzuhData.forecast.dayTwo.mintemp_f = Math.floor(
    weatherData.forecast.forecastday[1].day.mintemp_f
  );
  howzuhData.forecast.dayTwo.maxtemp_c = Math.floor(
    weatherData.forecast.forecastday[1].day.maxtemp_c
  );
  howzuhData.forecast.dayTwo.maxtemp_f = Math.floor(
    weatherData.forecast.forecastday[1].day.maxtemp_f
  );
  howzuhData.forecast.dayTwo.uv = weatherData.forecast.forecastday[1].day.uv;
  howzuhData.forecast.dayTwo.conditionText =
    weatherData.forecast.forecastday[1].day.condition.text;
  howzuhData.forecast.dayTwo.conditionImage =
    weatherData.forecast.forecastday[1].day.condition.icon;
  // day three
  howzuhData.forecast.dayThree.date = weatherData.forecast.forecastday[2].date;
  howzuhData.forecast.dayThree.mintemp_c = Math.floor(
    weatherData.forecast.forecastday[2].day.mintemp_c
  );
  howzuhData.forecast.dayThree.mintemp_f = Math.floor(
    weatherData.forecast.forecastday[2].day.mintemp_f
  );
  howzuhData.forecast.dayThree.maxtemp_c = Math.floor(
    weatherData.forecast.forecastday[2].day.maxtemp_c
  );
  howzuhData.forecast.dayThree.maxtemp_f = Math.floor(
    weatherData.forecast.forecastday[2].day.maxtemp_f
  );
  howzuhData.forecast.dayThree.uv = weatherData.forecast.forecastday[2].day.uv;
  howzuhData.forecast.dayThree.conditionText =
    weatherData.forecast.forecastday[2].day.condition.text;
  howzuhData.forecast.dayThree.conditionImage =
    weatherData.forecast.forecastday[2].day.condition.icon;
  // location info so we can display location that was queried
  howzuhData.location.name = weatherData.location.name;
  howzuhData.location.region = weatherData.location.region;
  howzuhData.location.country = weatherData.location.country;
  console.log("Transformed data: ");
  console.log(howzuhData);
}

function howzuhUpdate() {
  // current temp elements
  let tempElementArray = Array.from(
    document.querySelectorAll("#temperature li")
  );
  // update the current temp info
  try {
    if (tempSetting == "F") {
      tempElementArray[0].innerText =
        "Actual: " + howzuhData.current.temp_f + "º" + ` ${tempSetting}`;
      tempElementArray[1].innerText =
        "Feels Like: " +
        howzuhData.current.feelslike_f +
        "º" +
        ` ${tempSetting}`;
      tempElementArray[2].innerText =
        "High: " +
        howzuhData.forecast.dayOne.maxtemp_f +
        "º" +
        ` ${tempSetting}`;
      tempElementArray[3].innerText =
        "Low: " +
        howzuhData.forecast.dayOne.mintemp_f +
        "º" +
        ` ${tempSetting}`;
    } else if (tempSetting == "C") {
      tempElementArray[0].innerText =
        "Actual: " + howzuhData.current.temp_c + "º" + ` ${tempSetting}`;
      tempElementArray[1].innerText =
        "Feels Like: " +
        howzuhData.current.feelslike_c +
        "º" +
        ` ${tempSetting}`;
      tempElementArray[2].innerText =
        "High: " +
        howzuhData.forecast.dayOne.maxtemp_c +
        "º" +
        ` ${tempSetting}`;
      tempElementArray[3].innerText =
        "Low: " +
        howzuhData.forecast.dayOne.mintemp_c +
        "º" +
        ` ${tempSetting}`;
    } else {
      location.reload();
    }
  } catch (err) {
    console.log("I frew up: " + err);
  }
  // update the current wind info
  let windElementArray = Array.from(document.querySelectorAll("#wind li"));
  try {
    if (tempSetting == "F") {
      windElementArray[0].innerText =
        "Speed: " + howzuhData.current.wind_mph + " mph";
      windElementArray[1].innerText =
        "Direction: " +
        howzuhData.current.wind_degree +
        "º " +
        howzuhData.current.wind_dir;
    } else if (tempSetting == "C") {
      windElementArray[0].innerText =
        "Speed: " + howzuhData.current.wind_kph + " kph";
      windElementArray[1].innerText =
        "Direction: " +
        howzuhData.current.wind_degree +
        "º " +
        howzuhData.current.wind_dir;
    } else {
      location.reload();
    }
  } catch (err) {
    console.log("I frew up: " + err);
  }
  // update the current conditions info
  let conditionsArray = Array.from(document.querySelectorAll("#condition li"));
  try {
    conditionsArray[0].childNodes[1].src = `https:${howzuhData.current.conditionImage}`;
    conditionsArray[1].innerText = howzuhData.current.conditionText;
    conditionsArray[2].innerText =
      "Humidity: " + howzuhData.current.humidity + "%";
    conditionsArray[3].innerText = "UV: " + howzuhData.current.uv;
  } catch (err) {
    console.log("I frew up: " + err);
  }
  // update the current precipitation info
  let precipArray = Array.from(document.querySelectorAll("#precip li"));
  try {
    if (tempSetting == "F") {
      precipArray[0].innerText =
        "Amount: " + howzuhData.current.precip_in + " in";
      precipArray[1].innerText =
        "Pressure: " + howzuhData.current.pressure_in + " in";
    } else if (tempSetting == "C") {
      precipArray[0].innerText =
        "Amount: " + howzuhData.current.precip_cm + " cm";
      precipArray[1].innerText =
        "Pressure: " + howzuhData.current.pressure_mb + " mb";
    }
  } catch (err) {
    console.log("I frew up: " + err);
  }
  // update the forecast conditions
  if (tempSetting == "F") {
    document.querySelector("#forecastHighOne").innerText =
      "High: " + howzuhData.forecast.dayOne.maxtemp_f + "º F";
    document.querySelector("#forecastLowOne").innerText =
      "Low: " + howzuhData.forecast.dayOne.mintemp_f + "º F";
    document.querySelector("#forecastHighTwo").innerText =
      "High: " + howzuhData.forecast.dayTwo.maxtemp_f + "º F";
    document.querySelector("#forecastLowTwo").innerText =
      "Low: " + howzuhData.forecast.dayTwo.mintemp_f + "º F";
    document.querySelector("#forecastHighThree").innerText =
      "High: " + howzuhData.forecast.dayThree.maxtemp_f + "º F";
    document.querySelector("#forecastLowThree").innerText =
      "Low: " + howzuhData.forecast.dayThree.mintemp_f + "º F";
  } else if (tempSetting == "C") {
    document.querySelector("#forecastHighOne").innerText =
      "High: " + howzuhData.forecast.dayOne.maxtemp_c + "º C";
    document.querySelector("#forecastLowOne").innerText =
      "Low: " + howzuhData.forecast.dayOne.mintemp_c + "º C";
    document.querySelector("#forecastHighTwo").innerText =
      "High: " + howzuhData.forecast.dayTwo.maxtemp_c + "º C";
    document.querySelector("#forecastLowTwo").innerText =
      "Low: " + howzuhData.forecast.dayTwo.mintemp_c + "º C";
    document.querySelector("#forecastHighThree").innerText =
      "High: " + howzuhData.forecast.dayThree.maxtemp_c + "º C";
    document.querySelector("#forecastLowThree").innerText =
      "Low: " + howzuhData.forecast.dayThree.mintemp_c + "º C";
  }
  document.querySelector("#forecastUvOne").innerText =
    "UV: " + howzuhData.forecast.dayOne.uv;
  document.querySelector("#forecastUvTwo").innerText =
    "UV: " + howzuhData.forecast.dayTwo.uv;
  document.querySelector("#forecastUvThree").innerText =
    "UV: " + howzuhData.forecast.dayThree.uv;
  updateDates(false);
  //location display banner
  let locationDisplay = document.querySelector("#greetingsSign");
  if (howzuhData.location.region == howzuhData.location.name) {
    locationDisplay.innerText = `Greetings from ${howzuhData.location.name}, ${howzuhData.location.country}!`;
    document.querySelector("#greetingsSign").classList.remove("hidden");
  } else {
    locationDisplay.innerText = `Greetings from ${howzuhData.location.name}, ${howzuhData.location.region}!`;
    document.querySelector("#greetingsSign").classList.remove("hidden");
  }
}

function updateDates(firstRun) {
  // update forecast dates
  // time for date objects, booooo
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (firstRun == true) {
    let now = new Date();
    let nowDate = now.getUTCDate();
    let nowMonth = months[now.getUTCMonth()];
    document.querySelector("#forecastDateOne").innerText =
      nowMonth + " " + nowDate;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrowDate = tomorrow.getUTCDate();
    tomorrowMonth = months[tomorrow.getUTCMonth()];
    document.querySelector("#forecastDateTwo").innerText =
      tomorrowMonth + " " + tomorrowDate;
    let overmorrow = new Date();
    overmorrow.setDate(overmorrow.getDate() + 2);
    let overmorrowDate = overmorrow.getUTCDate();
    let overmorrowMonth = months[overmorrow.getUTCMonth()];
    document.querySelector("#forecastDateThree").innerText =
      overmorrowMonth + " " + overmorrowDate;
    document.querySelector("#dayThreeWeekday").innerText =
      days[overmorrow.getUTCDay()];
  } else {
    let dayOneDay = new Date(howzuhData.forecast.dayOne.date);
    let dayTwoDay = new Date(howzuhData.forecast.dayTwo.date);
    let dayThreeDay = new Date(howzuhData.forecast.dayThree.date);
    let dayThreeWeekday = days[dayThreeDay.getUTCDay()];
    let dayOneWeekdate = dayOneDay.getUTCDate();
    let dayOneMonth = months[dayOneDay.getUTCMonth()];
    let dayTwoWeekdate = dayTwoDay.getUTCDate();
    let dayTwoMonth = months[dayTwoDay.getUTCMonth()];
    let dayThreeWeekdate = dayThreeDay.getUTCDate();
    let dayThreeMonth = months[dayThreeDay.getUTCMonth()];
    document.querySelector("#forecastDateOne").innerText =
      dayOneMonth + " " + dayOneWeekdate;
    document.querySelector("#forecastDateTwo").innerText =
      dayTwoMonth + " " + dayTwoWeekdate;
    document.querySelector("#forecastDateThree").innerText =
      dayThreeMonth + " " + dayThreeWeekdate;
    document.querySelector("#dayThreeWeekday").innerText = dayThreeWeekday;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let searchButton = document.getElementById("searchGo");
  const locationSearch = document.getElementById("locationSearch");
  const tempButton = document.getElementById("tempButton");
  const tempToggle = document.getElementById("tempToggle");
  searchButton.addEventListener("click", () => {
    howzuhWhere();
  });
  tempButton.addEventListener("click", () => {
    if (tempToggle.checked == false && dataFetched == true) {
      tempSetting = "F";
      howzuhUpdate();
    } else if (tempToggle.checked == true && dataFetched == true) {
      tempSetting = "C";
      howzuhUpdate();
    } else {
      console.log("No data to toggle!");
    }
  });
  locationSearch.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      howzuhWhere();
    }
  });
  updateDates(true);
});
