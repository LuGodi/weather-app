import Day from "./day.js";
export default class Weather {
  static scale = {
    metric: {
      temperature: "celsius",
      wind: "km",
      precipitation: "%",
      humidity: "%",
    },
    us: {
      temperature: "fahrenheit",
      wind: "miles",
      precipitationChance: "%",
      humidity: "%",
    },
    uk: {
      temperature: "celsius",
      wind: "miles",
      precipitationChance: "%",
      humidity: "%",
    },
  };
  static activeScale = "us";
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
  static async init(location, unitGroup = this.activeScale) {
    // const weatherData = await this.load(location);
    // this.
    await this.load(location, unitGroup)
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
    const days = "next7days";
    const urlRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${days}?unitGroup=${unitGroup}&key=${k}`;

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
      moon: this.#processMoon(day.moonphase),

      moonValue: day.moonphase,
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
  static #processMoon(moonValue) {
    let moonphase;
    //switch or object
    switch (true) {
      case moonValue === 0:
        moonphase = "New Moon";
        break;
      case moonValue < 0.25:
        moonphase = "Waxing Crescent";
        break;
      case moonValue === 0.25:
        moonphase = "First Quarter";
        break;
      case moonValue < 0.5:
        moonphase = "Waxing Gibbous";
        break;
      case moonValue === 0.5:
        moonphase = "Full Moon";
        break;
      case moonValue < 0.75:
        moonphase = "Waning Gibbous";
        break;
      case moonValue === 0.75:
        moonphase = "Last Quarter";
        break;
      case moonValue < 1:
        moonphase = "Waning Crescent";
        break;
    }
    return moonphase;
  }
}
