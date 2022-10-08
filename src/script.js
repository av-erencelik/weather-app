import "./input.scss";
import broken from "./img/brokenclouds.jpg";
import clear from "./img/clearSky.jpg";
import few from "./img/fewClouds.jpg";
import scattered from "./img/scattered.jpg";
import shower from "./img/shower.jpg";
import rain from "./img/rain.png";
import thunderstorm from "./img/thunderstorm.jpeg";
import snow from "./img/snow.jpeg";
import mist from "./img/mist.jpg";
import weather from "./img/weather.jpg";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import "@fortawesome/fontawesome-free/js/brands";

const cityInput = document.getElementById("city");
const form = document.getElementById("form");
const error = document.getElementById("error");

getWeatherInfos("istanbul");

form.onsubmit = (e) => {
  e.preventDefault();
  if (error.textContent != "") {
    error.textContent = "";
  }
  let city = cityInput.value;
  cityInput.value = "";
  city = capitalizeFirstLetter(city);
  console.log(city);
  city = getWeatherInfos(city);
};

async function getWeatherInfos(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=71d372d0720a373c87565c0bc92d08ab&units=metric`,
      { mode: "cors" }
    );
    const weatherData = await response.json();
    console.log(weatherData);
    handleData(weatherData);
  } catch (err) {
    error.textContent = "Please Enter Valid Location!";
  }
}
function capitalizeFirstLetter(string) {
  string = string[0].toUpperCase() + string.slice(1);
  return string;
}
function handleBackground(icon, img) {
  switch (icon) {
    case "04d":
    case "04n":
      img.src = broken;
      break;
    case "01d":
    case "01n":
      img.src = clear;
      break;
    case "02d":
    case "02n":
      img.src = few;
      break;
    case "03d":
    case "03n":
      img.src = scattered;
      break;
    case "09d":
    case "09n":
      img.src = shower;
      break;
    case "10d":
    case "10n":
      img.src = rain;
      break;
    case "11d":
    case "11n":
      img.src = thunderstorm;
      break;
    case "13d":
    case "13n":
      img.src = snow;
      break;
    case "50d":
    case "50n":
      img.src = mist;
      break;
    default:
      img.src = weather;
      break;
  }
}
function handleData(data) {
  let name = document.getElementById("name");
  let temp = document.getElementById("temp");
  let img = document.getElementById("weatherImg");
  let description = document.getElementById("description");
  let extras = document.getElementById("extras");
  name.textContent = data.name + ", " + data.sys.country;
  temp.innerHTML = data.main.temp + "&#8451;";
  handleBackground(data.weather[0].icon, img);
  description.innerHTML = data.weather[0].description;
  extras.innerHTML = `Feels Like ${data.main.feels_like} | Humidity: ${data.main.humidity}% `;
}
