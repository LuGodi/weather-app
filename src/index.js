import "./style.css";
import ScreenController from "./screen_Controller.js";

import Weather from "./weather.js";

export default class App {
  static loadData(location, scale) {
    this.simulateLowEnd(5000)
      .then(() => {
        return Weather.init(location, scale);
        //if theres no return here, then wont return a promise therefore the next then will not wait for this promise to solve
      })
      .then(() => {
        console.log(Weather.days);
        console.log(Weather.currentDay);
        ScreenController.render(Weather.days, Weather.currentDay);
      });
  }
  static simulateLowEnd(time) {
    console.log("simulate low end");
    return new Promise((res) => {
      setTimeout(() => res("hi"), time);
    });
  }
}

ScreenController.init();
