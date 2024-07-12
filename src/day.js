import moonImg from "../assets/weather-icons/moon_icon.png";
import termometerImg from "../assets/weather-icons/term_icon.png";
import tideImg from "../assets/weather-icons/tide_icon.png";
import humidityImg from "../assets/weather-icons/humidity_icon.png";
import windImg from "../assets/weather-icons/wind_icon.png";

export default class Day {
  static icons = {
    temperature: termometerImg,
    humidity: humidityImg,
    moon: moonImg,
    wind: windImg,
    tide: tideImg,
  };
  iconElements = {};

  constructor(dayReport, location) {
    this.location = location;
    this.temperature = {
      average: dayReport.temperature.average,
      min: dayReport.temperature.min,
      max: dayReport.temperature.max,
    };
    this.humidity = dayReport.humidity;
    this.condition = dayReport.condition;
    this.moon = dayReport.moon;
    //use the date library that I used before
    this.datetime = dayReport.datetime;
    this.wind = dayReport.wind;
    this.sunrise = dayReport.sunrise;
    this.sunset = dayReport.sunset;
    this.description = dayReport.description;
    this.condition = dayReport.condition;
    this.icon = dayReport.icon;
    this.#renderIcons();
    // this.tide = tide;
  }
  static async load() {}
  toString() {
    return {
      location: this.location,
      temperature: this.temperature,
      humidity: this.humidity,
      condition: this.condition,
      moon: this.moon,
      date: this.date,
      wind: this.wind,
    };
  }
  #renderIcons() {
    //TODO implement the render function
    console.log("render icons");
    console.log(Object.entries(Day.icons));

    Object.entries(Day.icons).forEach(([name, url]) => {
      console.log(name, url);
      const icon = new Image();
      icon.src = url;
      icon.alt = name;
      console.log(icon);
      this.iconElements[name] = icon;
    });

    console.log(this.iconElements);
    return this.iconElements;
  }
  iconsLoop(func) {
    Object.entries(Day.icons).forEach(([key, value]) => {
      func(key, value);
    });
  }
}
