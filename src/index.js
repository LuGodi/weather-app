import "./style.css";

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

const info = document.querySelector(".weather-info");
Weather.init("rio de janeiro").then(() => {
  Weather.days.forEach((day) => {
    console.log(day);
    info.append(day.render());
  });
});
