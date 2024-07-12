import Day from "./day.js";
export default class Weather {
  static prefer = { temperature: "celsius", wind: "km/h" };
  static days = [];
  static weatherReport = {
    location: null,
    humidity: null,
    temperature: { max: null, min: null, average: null, feelsLike: null },
    condition: null,
    moon: null,
    wind: null,
    datetime: null,
    precipitation: null,
    uvIndex: null,
    icon: null,
    description: null,
    sunrise: null,
    sunset: null,
  };
  //or should I use a constructor ? maybe the static initializator?
  static async init(location) {
    // const weatherData = await this.load(location);
    // this.
    await this.load(location)
      .then((data) => {
        return this.processData(data);
      })
      .then((weatherReport) => {
        return this.processDays(weatherReport);
      })
      .then((processedDays) => {
        console.log(processedDays);
        console.log("omg here should work");
        this.days.forEach((day) => console.log("hi this is a day", day));
        return;
      })
      .catch((e) => console.log(e));
  }

  //https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY
  //unit group metric us or uk
  static async load(location, unitGroup = "metric") {
    const k = "678D27DNS9385FAAA5R7NBRV3";
    const url = "https://api.weatherapi.com/v1";
    const days = "next7days";
    const urlRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&key=${k}`;
    const searchString = location;

    const urls = {
      current: `${url}/current.json?key=${k}&q=${searchString}`,
      astronomy: `${url}/astronomy.json?key=${k}&q=${searchString}`,
      forecast: `${url}/forecast.json?key=${k}&q=${searchString}&days=${days}`,
    };
    //TODO change here
    try {
      const response = await fetch(urlRequest);
      if (response.ok === false) {
        throw new Error("failed to fetch");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.log(error);
    }
  }

  //peharps this could be split on a class that handles the astronomy fetch and processing?
  static processData(weatherData) {
    // const { currentData, astronomyData, forecastData } = weatherData;

    const weatherReport = {
      location: weatherData.resolvedAddress,
      days: weatherData.days,
    };

    return weatherReport;
  }
  //TODO maybe move this to days instead of here?
  //actually this should process days, by giving it to days to destructure it makes coupling worse
  static processDays(processedWeather) {
    const { days, location } = processedWeather;

    days.forEach((day) => {
      const dayReport = this.#processDay(day);
      console.log(day);
      console.log(dayReport);
      const dayInstance = new Day(dayReport, location);
      this.days.push(dayInstance);
    });

    return this.days;
  }
  static #processDay(day) {
    const weatherReport = {
      humidity: day.humidity,
      temperature: {
        max: day.tempmax,
        min: day.tempmin,
        average: day.temp,
        feelsLike: day.feelsike,
      },
      condition: day.conditions,
      moon: day.moonphase,
      wind: day.windspeed,
      datetime: day.datetime,
      precipitation: day.precipprob,
      uvIndex: day.uvindex,
      icon: day.icon,
      description: day.description,
      sunrise: day.sunrise,
      sunset: day.sunset,
    };
    return weatherReport;
  }
}
