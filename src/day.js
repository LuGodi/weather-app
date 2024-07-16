import moonImg from "../assets/weather-icons/moon_icon.png";
import termometerImg from "../assets/weather-icons/term_icon.png";
import tideImg from "../assets/weather-icons/tide_icon.png";
import humidityImg from "../assets/weather-icons/humidity_icon.png";
import windImg from "../assets/weather-icons/wind_icon.png";

export default class Day {
  hours = [];
  static icons = {
    temperature: termometerImg,
    humidity: humidityImg,
    moon: moonImg,
    wind: windImg,
    tide: tideImg,
  };
  #moonValue;
  constructor(dayReport, location) {
    this.location = location;
    this.temperature = {
      average: dayReport.temperature.average,
      min: dayReport.temperature.min,
      max: dayReport.temperature.max,
      feelslike: dayReport.temperature.feelslike,
    };
    this.humidity = dayReport.humidity;
    this.condition = dayReport.condition;
    this.moon = dayReport.moon;
    this.#moonValue = dayReport.moonValue;
    //use the date library that I used before
    this.datetime = dayReport.datetime;
    this.wind = dayReport.wind;
    this.sunrise = dayReport.sunrise;
    this.sunset = dayReport.sunset;
    this.description = dayReport.description;
    this.condition = dayReport.condition;
    this.icon = dayReport.icon;
    this.precipitationChance = dayReport.precipitation;
    this.uvIndex = dayReport.uvIndex;

    // this.tide = tide;
  }

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

  list(func) {
    for (const [weatherProperty, value] of Object.entries(this)) {
      func(weatherProperty, value, this);
    }
  }
  listHours(func) {
    this.hours.forEach((hour) => {
      func(hour);
    });
  }
}
