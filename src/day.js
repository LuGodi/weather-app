import moonImg from "../assets/weather-icons/moon.png";
import termImg from "../assets/weather-icons/term_icon.png";
import tideImg from "../assets/weather-icons/tide_icon.png";
import humidityImg from "../assets/weather-icons/humidity_icon.png";
import windImg from "../assets/weather-icons/wind_icon.png";

export default class Day {
  static icons = {
    temperature: termImg,
    humidity: humidityImg,

    moon: moonImg,
    wind: windImg,
    tide: tideImg,
  };
  elements = {};
  constructor({ astro, date, day }, location) {
    this.location = location;
    this.temperature = {
      average: { celsius: day.avgtemp_c, fahrenheit: day.avgtemp_f },
      min: { celsius: day.mintemp_c, fahrenheit: day.mintemp_f },
      max: { celsius: day.maxtemp_c, fahrenheit: day.maxtemp_f },
    };
    this.humidity = day.avghumidity;
    this.condition = day.condition.text;
    this.moon = astro.moon_phase;
    //use the date library that I used before
    this.date = date;
    this.wind = { kph: day.maxwind_kph, mph: day.maxwind_mph };
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
  render() {
    //TODO implement the render function
    Day.icons.array.forEach((element) => {
      console.log(element);
    });
  }
}
