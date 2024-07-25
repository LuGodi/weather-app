import "./style.css";
import ScreenController from "./screen_Controller.js";

import Weather from "./weather.js";

// console.log(`hi`);
// console.log("not againha");
// console.log("weather data");
// const weatherData = await Weather.load("brazil");
// console.log(weatherData);
// const weatherInfo = Weather.processData(
//   weatherData.currentData,
//   weatherData.astronomyData,
//   weatherData.forecastData
// );
// Weather.processDays(weatherInfo.forecast, weatherInfo.location);
ScreenController.init();
Weather.init("rio de janeiro").then(() => {
  ScreenController.render(Weather.days, Weather.currentDay);
  // ScreenController.renderDay(Weather.days[0], Weather.currentDay);
  // ScreenController.renderNextDays(Weather.days);
});
