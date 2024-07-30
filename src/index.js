import "./style.css";
import ScreenController from "./screen_Controller.js";
import FormController from "./form_controller.js";
import Weather from "./weather.js";

export default class App {
  static loadData(location, scale) {
    this.simulateLowEnd(0)
      .then(() => {
        return Weather.init(location, scale);
        //if theres no return here, then wont return a promise therefore the next then will not wait for this promise to solve
      })
      .then(() => {
        console.log(Weather.days);
        console.log(Weather.currentDay);
        ScreenController.render(Weather.days, Weather.currentDay);
      })
      .catch((e) => {
        console.log({ e });
        const errorObj = {
          location: location,
          scale: scale,
          code: e.cause,
        };
        FormController.renderFailedToFetch(errorObj);
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
