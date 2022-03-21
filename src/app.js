function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  let year = date.getFullYear();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  return `${day}, ${month} ${hours}:${minutes} ${year}`;
}

function displayTemperature(response) {
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

  let dateTime = document.querySelector("#date");
  dateTime.innerHTML = formatDate(response.data.dt * 1000);

  let iconDisplay = document.querySelector(".weatherIcon");
  iconDisplay.setAttribute("src", `media/${response.data.weather[0].icon}.png`);
}

let apiKey = "bada8b7e78b2e8f21ed242b93f56b802";
let unit = "metric";
let city = "Lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);
