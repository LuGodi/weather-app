import Day from "./day.js";
import Hour from "./hour.js";
import { parseISO } from "date-fns";
export default class Weather {
  static scale = {
    metric: {
      temperature: "c",
      wind: "km",
      precipitationChance: "%",
      humidity: "%",
    },
    us: {
      temperature: "f",
      wind: "miles",
      precipitationChance: "%",
      humidity: "%",
    },
    uk: {
      temperature: "c",
      wind: "miles",
      precipitationChance: "%",
      humidity: "%",
    },
  };
  static activeScale = "metric";
  static currentDay = null;
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
    this.activeScale = unitGroup;
    await this.load(location, unitGroup)
      .then((data) => {
        return this.processData(data);
      })
      .then((weatherReport) => {
        return this.processDays(weatherReport);
      })
      .then((processedDays) => {
        return;
        // return;
      })
      .catch((e) => {
        throw new Error("", { cause: e.cause });
      });
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
        throw new Error("failed to fetch", { cause: response.status });
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      throw new Error("faile in load function", { cause: error.cause });
    }
  }

  //peharps this could be split on a class that handles the astronomy fetch and processing?
  static processData(weatherData) {
    // const { currentData, astronomyData, forecastData } = weatherData;

    const weatherReport = {
      location: weatherData.resolvedAddress,
      days: weatherData.days,
      currentConditions: weatherData.currentConditions,
    };

    return weatherReport;
  }
  //TODO maybe move this to days instead of here?
  //actually this should process days, by giving it to days to destructure it makes coupling worse
  static processDays(processedWeather) {
    const { days, location, currentConditions } = processedWeather;
    this.days = [];

    days.forEach((day) => {
      const dayReport = this.#processDay(day);

      const dayInstance = new Day(dayReport, location);

      dayReport.hours.forEach((hour) => {
        const hourInstance = new Hour(hour.datetime, hour);
        dayInstance.hours.push(hourInstance);
      });

      this.days.push(dayInstance);
    });
    const currentDay = this.#processDay(currentConditions);
    this.currentDay = new Day(currentDay, location);
    return this.days;
  }
  static #processDay(day) {
    const weatherReport = {
      humidity: day.humidity,
      temperature: {
        max: day.tempmax,
        min: day.tempmin,
        average: day.temp,
        feelslike: day.feelslike,
      },
      condition: day.conditions,
      moon: this.#processMoon(day.moonphase),

      moonValue: day.moonphase,
      wind: day.windspeed,
      //if parse is used instead of parseISO it returns the wrong datetime (usually the previous day instead of the correct day)
      //to prevente using parseISO repetitively whevenever datetime is called, use it here instead
      datetime: day.datetime,
      precipitation: day.precipprob,
      uvIndex: day.uvindex,
      icon: day.icon,
      description: day.description,
      sunrise: day.sunrise,
      sunset: day.sunset,
    };
    //Hours in days means its a day instance, else its processing the conditions for an hour.
    if ("hours" in day) {
      weatherReport.datetime = this.#parseDate(weatherReport.datetime);
      weatherReport.hours = this.#processHours(day.hours);
    }
    return weatherReport;
  }
  static #processHours(hours) {
    const processedHours = [];
    hours.forEach((hour) => {
      processedHours.push(this.#processDay(hour));
    });
    return processedHours;
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
  static #parseDate(date) {
    return parseISO(date);
  }
}
