import moonImg from "../assets/weather-icons/moon.png";
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
  renderIcons() {
    //TODO implement the render function
    console.log("render icons");
    console.log(Object.entries(Day.icons));
    const iconElements = [];
    Object.entries(Day.icons).forEach(([name, url]) => {
      console.log(name, url);
      const icon = new Image();
      icon.src = url;
      icon.alt = name;
      console.log(icon);
      iconElements.push(icon);
    });
    return iconElements;
  }
  iconsLoop(func) {
    Object.entries(Day.icons).forEach(([key, value]) => {
      func(key, value);
    });
  }

  //structure will consist of [tagname,classname and childs]
  //if its a text, it will be [text, textcontent]
  //for images, [img,classname,img.src]
  render() {
    const childs = [];
    const container = ["div", "day-info", childs];
    // const boxContainer = ["div","container",[spanStructure,["text", this[value]]]]
    // const spanStructure = ["span","icon-container",[["img",`${key}-icon`,"imgsrc"],["text",`${key}`]]]
    console.log(this);
    this.iconsLoop((key, value) => {
      const spanStructure = [
        "span",
        "icon-container",
        [
          ["img", `${key}-icon`, value],
          ["text", `${key}`],
        ],
      ];
      const boxContainer = [
        "div",
        "container",
        [
          spanStructure,
          ["span", `${key}-value`, [["text", JSON.stringify(this[key])]]],
        ],
      ];
      childs.push(boxContainer);
    }, this);
    console.log(container);
    return container;
  }
}
