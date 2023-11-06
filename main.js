// weather functions go here
const apiKey = "edeac25381f74542b78134423233110";
const locationSearch = document.getElementById("locationSearch");
let locationSearchValue = "Orlando";

async function howzaNow() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/current.json?key=" +
      apiKey +
      "&q=" +
      locationSearchValue +
      "&aqi=yes"
  );
  const nowData = await response.json();
  console.log(nowData);
  return nowData;
}

async function howzaThen() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=" +
      locationSearchValue +
      "&days=3&aqi=yes&alerts=yes"
  );
  const thenData = await response.json();
  console.log(thenData);
  return thenData;
}

async function howzaWhere() {
  const response = await fetch(
    "https://api.weatherapi.com/v1/search.json?key=" +
      apiKey +
      "&q=" +
      locationSearchValue
  );
  const whereData = await response.json();
  console.log(whereData);
}

document.addEventListener("DOMContentLoaded", () => {
  let searchButton = document.getElementById("searchGo");
  searchButton.addEventListener("click", () => {
    howzaNow();
    howzaThen();
    howzaWhere();
  });
});
