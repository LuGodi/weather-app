import Weather from "./weather";
import renderUtil from "./render_util";

export default class ScreenController {
  //theres most certainly a better way
  static scale = Weather.scale[Weather.activeScale];
  static cachedDom = {
    mainEl: document.querySelector(".main"),
    body: document.querySelector("body"),
    root: document.documentElement,
  };
  static conditionIcons = renderUtil.importedConditionIcons();
  static renderSearchInput() {
    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search-container");
    const inputSearch = document.createElement("input");
    inputSearch.type = "search";
    searchContainer.append(inputSearch);
    return searchContainer;
  }
  //TODO add date fns for proper date display
  static #renderDayDateInfo(day) {
    const divEl = document.createElement("div");
    divEl.textContent = day.datetime;
    return divEl;
  }
  static #setBackgroundColor(isNightFun) {
    if (isNightFun) {
      this.cachedDom.root.style.background = "var(--night-color)";
    } else {
      this.cachedDom.root.style.background = "var(--day-color)";
    }
  }

  //TODO Separate this in more functions, this should be for the top part only
  static renderDay(day) {
    const date = this.#renderDayDateInfo(day);
    const topElement = this.#renderDayTopInfo(day);
    const midElement = this.#renderDayAdditionalInfo(day);
    const hourChart = this.renderHoursChart(day);
    this.#setBackgroundColor(renderUtil.isNight(day));
    this.cachedDom.mainEl.replaceChildren(
      date,
      topElement,
      midElement,
      hourChart
    );
  }
  static #renderDayTopInfo(day) {
    const topEl = document.createElement("div");
    const locationEl = document.createElement("span");
    const feelsLikeEl = document.createElement("span");
    const temperatureContainer = this.#renderTemperatureInfo(day);
    const weatherDescription = document.createElement("span");
    const iconEl = document.createElement("span");
    const icon = document.createElement("img");
    iconEl.classList.add("icon-container");
    topEl.classList.add("weather-top");
    locationEl.classList.add("location-container");
    feelsLikeEl.classList.add("feelslike-container");
    weatherDescription.classList.add("weather-description");
    // iconEl.textContent = day.icon;
    icon.src = this.conditionIcons[day.icon + ".png"];
    locationEl.textContent = day.location;
    feelsLikeEl.textContent = `Feels like ${day.temperature.feelslike}`;
    feelsLikeEl.dataset.scale = this.scale.temperature;
    weatherDescription.textContent = day.description;
    iconEl.append(icon);
    locationEl.append(iconEl);
    topEl.append(
      locationEl,
      temperatureContainer,

      feelsLikeEl,
      weatherDescription
    );
    return topEl;
  }
  static #renderDayAdditionalInfo(day) {
    const midEl = document.createElement("div");
    const containers = {};

    day.list((weatherProperty, value, currentDay) => {
      const undesiredweatherProperties = [
        "temperature",
        "datetime",
        "icon",
        "location",
        "description",
        "condition",
        "hours",
      ];
      if (undesiredweatherProperties.includes(weatherProperty) === false) {
        const container = this.#additionalInfoContainer(
          currentDay,
          weatherProperty
        );
        containers[weatherProperty] = container;
      }
    });
    console.log("logging containers ");
    console.log(containers);
    midEl.classList.add("weather-mid");
    midEl.append(...Object.values(containers));

    return midEl;
  }

  static #additionalInfoContainer(day, attribute) {
    const container = document.createElement("div");
    const title = document.createElement("span");
    const value = document.createElement("span");
    container.classList.add("additional-container");
    container.classList.add(`${attribute}-container`);
    title.classList.add(`${attribute}-span`);
    title.textContent = renderUtil.splitOnUpperCase(attribute);
    title.dataset.icon = `${attribute}_icon`;
    if (this.scale[attribute]) value.dataset.scale = this.scale[attribute];

    value.textContent = day[attribute];
    container.append(title, value);
    return container;
  }
  static #renderTemperatureInfo(day, separator = " / ") {
    const temperatureContainer = document.createElement("div");
    const averageSpan = document.createElement("span");
    const minMaxContainer = document.createElement("div");
    const maxSpan = document.createElement("span");
    const minSpan = document.createElement("span");
    const minMaxDivisor = document.createElement("span");
    const conditionSpan = document.createElement("span");
    temperatureContainer.classList.add("temperature-info-container");
    averageSpan.classList.add("average-temperature");
    minMaxContainer.classList.add("min-max-temperature-container");
    minSpan.classList.add("min-temperature");
    maxSpan.classList.add("max-temperature");
    averageSpan.textContent = day.temperature.average;
    minSpan.textContent = day.temperature.min;
    maxSpan.textContent = day.temperature.max;
    minMaxDivisor.textContent = separator;
    conditionSpan.textContent = day.condition;
    [minSpan, maxSpan, averageSpan].forEach(
      (element) => (element.dataset.scale = this.scale.temperature[0])
    );
    minMaxContainer.append(minSpan, minMaxDivisor, maxSpan);
    temperatureContainer.append(averageSpan, conditionSpan, minMaxContainer);
    return temperatureContainer;
  }
  static renderHoursChart(day) {
    const mainContainer = document.createElement("div");
    mainContainer.classList.add("hours-chart");
    const hourElements = [];
    day.listHours((hourInstance) => {
      const hourEl = this.#renderHour(hourInstance);
      hourElements.push(hourEl);
    });
    mainContainer.append(...hourElements);
    return mainContainer;
  }
  //i can refactor this to make it use hour.list
  static #renderHour(hour) {
    const hourContainer = document.createElement("div");
    const hourValue = document.createElement("span");
    const iconWeather = document.createElement("img");
    const temperature = document.createElement("span");
    const wind = document.createElement("span");
    const precipitationProb = document.createElement("span");
    hourContainer.classList.add("hour-information");
    hourValue.textContent = hour.hour;
    iconWeather.src = this.conditionIcons[hour.icon + ".png"];
    temperature.textContent = hour.temperature.average;
    temperature.dataset.scale = this.scale["temperature"];
    wind.textContent = hour.wind;
    wind.dataset.scale = this.scale["wind"];
    precipitationProb.textContent = hour.precipitation;
    precipitationProb.dataset.scale = this.scale["precipitationChance"];
    hourContainer.append(
      hourValue,
      temperature,
      iconWeather,
      wind,
      precipitationProb
    );
    return hourContainer;
  }
}
