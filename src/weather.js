import Day from "./day.js";
export default class Weather {
  static prefer = { temperature: "celsius", wind: "km/h" };
  static days = [];
  static weatherReport = {
    location: null,
    humidity: null,
    temperature: null,
    condition: null,
    moon: null,
    wind: null,
    forecast: null,
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
        this.days.forEach(() => console.log("hi this is a day"));
        return;
      })
      .catch((e) => console.log(e));
  }

  static async load(location) {
    const k = "4e4dde871a60444190235252243006";
    const url = "https://api.weatherapi.com/v1";
    const searchString = location;
    const days = 3;
    const urls = {
      current: `${url}/current.json?key=${k}&q=${searchString}`,
      astronomy: `${url}/astronomy.json?key=${k}&q=${searchString}`,
      forecast: `${url}/forecast.json?key=${k}&q=${searchString}&days=${days}`,
    };

    try {
      const [currentStream, astronomyStream, forecastStream] =
        await Promise.all([
          fetch(urls.current),
          fetch(urls.astronomy),
          fetch(urls.forecast),
        ]);

      const [currentData, astronomyData, forecastData] = await Promise.all([
        currentStream.json(),
        astronomyStream.json(),
        forecastStream.json(),
      ]);

      return { currentData, astronomyData, forecastData };
    } catch (error) {
      console.log(error);
    }
  }

  //peharps this could be split on a class that handles the astronomy fetch and processing?
  static processData(weatherData) {
    const { currentData, astronomyData, forecastData } = weatherData;

    const weatherReport = {
      location: currentData.location.name,
      temperature: currentData.current.temp_c,
      humidity: currentData.current.humidity,
      condition: currentData.current.condition.text,
      moon: astronomyData.astronomy.astro.moon_phase,

      wind: currentData.current.wind_kph,
      forecast: forecastData.forecast.forecastday,
    };
    this.weatherReport = weatherReport;

    return weatherReport;
  }
  //TODO maybe move this to days instead of here?
  static processDays(processedWeather) {
    const { forecast, location } = processedWeather;

    forecast.forEach((day) => {
      console.log(day);
      const dayInstance = new Day(day, location);
      this.days.push(dayInstance);
    });

    return this.days;
  }
}
