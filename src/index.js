import "./style.css";
import ScreenController from "./screen_Controller.js";

import Weather from "./weather.js";

export default class App {
  static loadData(location, scale) {
    Weather.init(location, scale).then(() => {
      ScreenController.render(Weather.days, Weather.currentDay);
    });
  }
}

ScreenController.init();
