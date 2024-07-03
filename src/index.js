import "./style.css";
import moonImg from "../assets/weather-icons/moon.png";
import termImg from "../assets/weather-icons/term_icon.png";
import tideImg from "../assets/weather-icons/tide_icon.png";
import humidityImg from "../assets/weather-icons/humidity_icon.png";
import windImg from "../assets/weather-icons/wind_icon.png";
import Weather from "./weather.js";

console.log(`hi`);
console.log("not againha");
console.log("weather data");
const weatherData = await Weather.load("brazil");
console.log(weatherData);
const weatherInfo = Weather.processData(
  weatherData.currentData,
  weatherData.astronomyData,
  weatherData.forecastData
);
Weather.processDays(weatherInfo.forecast, weatherInfo.location);

console.log(Weather.weatherReport);
