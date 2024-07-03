export default class Day {
  static icons = {
    // "temperature",
    // "humidity",
    // "condition",
    // "moon",
    // "wind",
    // "tide",
  };
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
    console.log(`inside days ${astro} ${day}`);
    console.log(astro);
    console.log(day);
    console.log(this.toString());
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
  }
}
