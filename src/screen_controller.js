import Weather from "./weather";

export default class ScreenController {
  //theres most certainly a better way
  static scale = Weather.scale[Weather.activeScale];
  static cachedDom = {
    mainEl: document.querySelector(".main"),
  };
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

  //TODO Separate this in more functions, this should be for the top part only
  static renderDay(day) {
    const date = this.#renderDayDateInfo(day);
    const topElement = this.#renderDayTopInfo(day);
    const midElement = this.#renderDayAdditionalInfo(day);
    this.cachedDom.mainEl.replaceChildren(date, topElement, midElement);
  }
  static #renderDayTopInfo(day) {
    const topEl = document.createElement("div");
    const locationEl = document.createElement("span");
    const feelsLikeEl = document.createElement("span");
    const temperatureContainer = this.#renderTemperatureInfo(day);
    const weatherDescription = document.createElement("span");
    const iconEl = document.createElement("span");
    iconEl.classList.add("icon-container");
    topEl.classList.add("weather-top");
    locationEl.classList.add("location-container");
    feelsLikeEl.classList.add("feelslike-container");
    weatherDescription.classList.add("weather-description");
    iconEl.textContent = day.icon;
    locationEl.textContent = day.location;
    feelsLikeEl.textContent = `Feels like ${day.temperature.feelslike}`;
    feelsLikeEl.dataset.scale = this.scale.temperature;
    weatherDescription.textContent = day.description;
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
}
//TODO

class renderUtil {
  //TODO
  static splitOnUpperCase(string) {
    const regex = /(\w)([A-Z])/g;
    return string.replace(regex, "$1 $2");
  }
}
