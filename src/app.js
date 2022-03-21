function displayTemperature(response) {
  console.log(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
}

let apiKey = "bada8b7e78b2e8f21ed242b93f56b802";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=${unit}`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
