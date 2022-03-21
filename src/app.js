function displayTemperature(response) {
  console.log(response.data);
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(response.data.main.temp);
  let cityDisplay = document.querySelector("#current-city");
  cityDisplay.innerHTML = response.data.name;
  let humidityDisplay = document.querySelector("#hum");
  humidityDisplay.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  let windDisplay = document.querySelector("#wind");
  windDisplay.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let descriptionDisplay = document.querySelector("#weather-state");
  descriptionDisplay.innerHTML = response.data.weather[0].description;
}

let apiKey = "bada8b7e78b2e8f21ed242b93f56b802";
let unit = "metric";
let city = "New York";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);
