// get date
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

// type in location and start event
let cityForm = document.querySelector("#type-location-form");
cityForm.addEventListener("submit", button);

function button(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city");
  let cityInput = document.querySelector("#location-input");
  city.innerHTML = cityInput.value;
  citySearch(event);
}

function citySearch(event) {
  event.preventDefault();
  let units = "metric";
  let apiKey = "bada8b7e78b2e8f21ed242b93f56b802";
  let city = document.querySelector("#location-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}
&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

//temperature display
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

  celsiusTemperature = response.data.main.temp;
}

//current location
function displayPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "bada8b7e78b2e8f21ed242b93f56b802";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}
&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

// unit conversion
function changeTempF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp.classList.add("inactive");
  fahrenheitTemp.classList.remove("inactive");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitTemp = document.querySelector("#fahrenheit");
fahrenheitTemp.addEventListener("click", changeTempF);

let celsiusTemperature = null;

function changeTempC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemp.classList.remove("inactive");
  fahrenheitTemp.classList.add("inactive");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemp = document.querySelector("#celsius");
celsiusTemp.addEventListener("click", changeTempC);

// multiplying forecast and remove content from html
function displayForecast() {
  let forecastElement = document.querySelector("#forecast-wrapper");
  let forecastHTML = `<div class="testGrid">`;
  let days = ["THU", "FRI", "SAT", "SUN", "MON"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="testGrid">
        <div class="forecastGrid" id="forecastGrid">
          <div class="days" id="days">
            <p>${day}</p>
          </div>
          <div class="icons" id="icons">
            <span class="cloudy" id="cloudy"
              ><img class="sunny" src="media/04n.png" alt="cloud" width="110px"
            /></span>
          </div>
          <div class="forecast" id="forecast">
            <p>13°C/10°C</p>
          </div>
        </div>
      </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
