//Current Date and Time
function showDate() {
    let now = new Date();
  
    let date = now.getDate();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[now.getDay()];
  
    // let months = [
    //   "January",
    //   "Febuary",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "Jule",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December"
    // ];
    // let month = months[now.getMonth()];
    let month = now.toLocaleString("en", { month: "long" });
    let year = now.getFullYear();
    let h3 = document.querySelector("h3");
    h3.innerHTML = ` ${month}, ${date}, ${year}`;
  
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = document.querySelector("h4");
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    // console.log( hours, minutes);
    if (hours < 10) {
      hours = `0${hours}`;
    }
    // console.log(hours, minutes);
    time.innerHTML = `${day}, ${hours}:${minutes}`;
  }
  showDate();
  // 2
  
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  //  Celcius and Fahrenheit
  function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 66;
  }
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 19;
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", convertToCelsius);
  
  // Search Engine
  let form = document.querySelector(".search-form");
  form.addEventListener("submit", citySubmit);
  
  function citySubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchCity(city) {
    let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayAttributes);
  }
  
  function displayAttributes(response) {
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windELement = document.querySelector("#windspeed");
  
    humidityElement.innerHTML = response.data.main.humidity + `%`;
    windELement.innerHTML = Math.round(response.data.wind.speed) + ` km/h`;
    descriptionElement.innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector(".temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  }
  searchCity("Kyiv");
  
  // Current location
  function getCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "metric";
    let apiKey = "f8edd982a4a7077051d3a896edb21fe6";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayAttributes);
  }
  
  function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  
  let getCurrentCity = document.querySelector("#get-current-city");
  getCurrentCity.addEventListener("click", getPosition);
  