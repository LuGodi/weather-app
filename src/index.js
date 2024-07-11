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

Weather.init("rio de janeiro").then(() => {
  Weather.days.forEach((day) => {
    console.log(day);
    ScreenController.renderDay(day);
  });
});
